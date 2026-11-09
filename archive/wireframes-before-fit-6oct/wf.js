// Shared wireframe behaviour for the site pages.
(function () {
  var fmt = function (n) { return '$' + n.toLocaleString('en-US'); };

  // 1. Trips block: price for N days = sum of the daily rates.
  //    The owner sets a daily rate and can lower it from a given day (e.g. from day 8), so longer trips cost less per day.
  function total(r, days) {
    var t = 0;
    for (var d = 1; d <= days; d++) {
      var rate = r.base;
      r.steps.forEach(function (s) { if (d >= s[0]) rate = s[1]; });
      t += rate;
    }
    return t;
  }
  var range = document.querySelector('.days-picker input[type=range]');
  if (range) {
    var out = document.querySelector('.days-picker output b');
    var region = document.querySelector('.trips').dataset.region;
    var cards = Array.prototype.slice.call(document.querySelectorAll('.trip'));
    var update = function () {
      var days = +range.value;
      out.textContent = days;
      cards.forEach(function (c) {
        var r = JSON.parse(c.dataset.rates);
        c.querySelector('.trip-price b').textContent = fmt(total(r, days));
        c.querySelector('.btn.primary').href = 'plan.html?' + new URLSearchParams({ region: region, level: c.dataset.level, days: days });
      });
    };
    range.addEventListener('input', update);
    update();
  }

  // 2. Plan form: show the trip picked on a landing, so nothing has to be typed again.
  var form = document.getElementById('plan-form');
  var q = new URLSearchParams(location.search);
  if (form && q.get('region')) {
    var box = document.createElement('p');
    box.className = 'picked';
    var b = document.createElement('b');
    b.textContent = 'Your trip: ';
    box.appendChild(b);
    box.appendChild(document.createTextNode(q.get('region') + ' · ' + (q.get('level') || '') + ' · ' + (q.get('days') || '') + ' days '));
    var back = document.createElement('a');
    back.className = 'link';
    back.href = 'javascript:history.back()';
    back.textContent = 'change';
    box.appendChild(back);
    form.insertBefore(box, form.firstChild);
    Array.prototype.forEach.call(form.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('on', c.textContent.trim() === q.get('region'));
    });
  }

  // 3. Phone: the header slides away while scrolling down and comes back on scroll up; the bottom bar stays.
  var header = document.querySelector('.site-header');
  if (header) {
    var last = window.scrollY;
    var phone = window.matchMedia('(max-width: 768px)');
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('is-hidden', phone.matches && y > last && y > 120 && !document.querySelector('details.menu[open]'));
      last = y;
    }, { passive: true });
  }
})();

// 4. Phone: sticky contact bar. Hidden while the hero (with its own buttons), a form or the footer is on screen,
//    so it never covers what the visitor is reading or filling in. Without script it simply stays visible.
(function () {
  var bar = document.querySelector('.mbar');
  if (!bar || !('IntersectionObserver' in window)) return;
  bar.classList.add('is-armed');
  var hero = document.querySelector('.hero');
  var quiet = Array.prototype.slice.call(document.querySelectorAll('.form-box, .site-footer'));
  var past = !hero, inQuiet = 0, menu = false;
  var apply = function () { bar.classList.toggle('is-on', past && !inQuiet && !menu); };
  var seen = new Set();
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.target === hero) past = !e.isIntersecting && e.boundingClientRect.top < 0; else if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); });
    inQuiet = seen.size; apply();
  });
  if (hero) io.observe(hero);
  quiet.forEach(function (q) { io.observe(q); });
  if (!hero) { var y0 = function () { past = window.scrollY > window.innerHeight * 0.6; apply(); }; window.addEventListener('scroll', y0, { passive: true }); y0(); }
  var m = document.querySelector('details.menu');
  if (m) m.addEventListener('toggle', function () { menu = m.open; apply(); });
  apply();
})();

// 5. Tabs row ("How we work · What we handle · …"): fade + arrow on the side with more tabs; the current section is underlined.
(function () {
  var nav = document.querySelector('.subnav');
  if (!nav) return;
  var row = nav.querySelector('.wrap');
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var cues = function () {
    nav.classList.toggle('more-l', row.scrollLeft > 4);
    nav.classList.toggle('more-r', row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
  };
  row.addEventListener('scroll', cues, { passive: true });
  window.addEventListener('resize', cues);
  cues();
  nav.classList.add('spy');
  var secs = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var spy = function () {
    var line = window.innerHeight * 0.35, cur = 0;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= line) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle('on', i === cur); });
    var a = links[cur]; if (a) row.scrollTo({ left: Math.max(0, a.offsetLeft - 16), behavior: 'smooth' });
  };
  var t; window.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(spy, 80); }, { passive: true });
  spy();
})();

// 6. Phone: sideways card rows get arrows and a "1 / 3" counter, so it is clear there is more to swipe.
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('.grid.scroll, .moments.scroll'), function (row) {
    var n = row.children.length; if (n < 2) return;
    var pager = document.createElement('div'); pager.className = 'pager';
    var mk = function (label, sym) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', label); b.textContent = sym; return b; };
    var prev = mk('Previous', '\u2039'), next = mk('Next', '\u203A'), out = document.createElement('output');
    pager.appendChild(prev); pager.appendChild(out); pager.appendChild(next);
    row.insertAdjacentElement('afterend', pager);
    var idx = function () { var step = row.children[1].offsetLeft - row.children[0].offsetLeft || row.clientWidth; return Math.min(n - 1, Math.round(row.scrollLeft / step)); };
    var upd = function () { var i = idx(); out.textContent = (i + 1) + ' / ' + n; prev.disabled = i === 0; next.disabled = i === n - 1; };
    var go = function (d) { var i = Math.max(0, Math.min(n - 1, idx() + d)); row.scrollTo({ left: row.children[i].offsetLeft - row.children[0].offsetLeft, behavior: 'smooth' }); };
    prev.addEventListener('click', function () { go(-1); }); next.addEventListener('click', function () { go(1); });
    row.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  });
})();
