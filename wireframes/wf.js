// Shared wireframe behaviour for the site pages (v5, 7 Oct 2026).
(function () {
  var root = document.documentElement;
  var fmt = function (n) { return '$' + n.toLocaleString('en-US'); };
  var region = (document.querySelector('.trips') || {}).dataset ? document.querySelector('.trips').dataset.region : null;

  // 0. Design notes (block labels, photo specs, section lines): hidden by default.
  //    On with ?notes=1 (or the old ?labels=1), the N key or the footer link; remembered in this browser.
  var store = { get: function () { try { return localStorage.getItem('wf-notes'); } catch (e) { return null; } },
                set: function (v) { try { localStorage.setItem('wf-notes', v); } catch (e) { /* private mode: not remembered */ } } };
  var q = new URLSearchParams(location.search);
  var qn = q.get('notes') || q.get('labels');
  if (qn === '1' || (qn === null && store.get() === '1')) root.classList.add('notes');
  if (qn === '0') root.classList.remove('notes');
  var toggleNotes = function () { var on = root.classList.toggle('notes'); store.set(on ? '1' : '0'); };
  document.addEventListener('keydown', function (e) {
    if ((e.key !== 'n' && e.key !== 'N') || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target; if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    toggleNotes();
  });
  Array.prototype.forEach.call(document.querySelectorAll('.notes-toggle'), function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); toggleNotes(); });
  });

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
  var barPlan = document.querySelector('.mbar a.btn.primary');
  if (range) {
    var out = document.querySelector('.days-picker output b');
    var cards = Array.prototype.slice.call(document.querySelectorAll('.trip'));
    var update = function () {
      var days = +range.value;
      out.textContent = days;
      cards.forEach(function (c) {
        var r = JSON.parse(c.dataset.rates);
        c.querySelector('.trip-price b').textContent = fmt(total(r, days));
        c.querySelector('.buy a.btn').href = 'plan.html?' + new URLSearchParams({ region: region, level: c.dataset.level, days: days });
      });
      // the phone bar keeps the visitor's region and length
      if (barPlan) barPlan.href = 'plan.html?' + new URLSearchParams({ region: region, days: days });
    };
    range.addEventListener('input', update);
    update();
  } else if (barPlan && region) {
    barPlan.href = 'plan.html?' + new URLSearchParams({ region: region });
  }

  // 2. Plan form: show the trip picked on a landing or a story, so nothing has to be typed again.
  var form = document.getElementById('plan-form');
  if (form && q.get('region')) {
    var box = document.createElement('p');
    box.className = 'picked';
    var b = document.createElement('b');
    b.textContent = 'Your trip:';
    box.appendChild(b);
    box.appendChild(document.createTextNode([q.get('region'), q.get('level'), q.get('days') ? q.get('days') + ' days' : ''].filter(Boolean).join(' · ')));
    var back = document.createElement('a');
    back.className = 'link';
    back.href = document.referrer && document.referrer.indexOf(location.host) > -1 ? document.referrer : 'home.html';
    back.textContent = 'change';
    box.appendChild(back);
    var f = form.querySelector('.form');
    f.insertBefore(box, f.firstChild);
    Array.prototype.forEach.call(form.querySelectorAll('.chip'), function (c) {
      var t = c.textContent.trim();
      if (c.closest('[data-group="where"]')) c.classList.toggle('on', t === q.get('region') || (q.get('region') === 'Yacht charter' && t === 'Yacht charter'));
      if (c.closest('[data-group="level"]') && q.get('level')) c.classList.toggle('on', t === q.get('level'));
    });
  }

  // 3. WhatsApp buttons carry the page and trip as a ready message (shown as a tooltip in the prototype; not clickable on purpose).
  var topic = region || (document.querySelector('h1') || {}).textContent || '';
  Array.prototype.forEach.call(document.querySelectorAll('a'), function (a) {
    if (!/^WhatsApp/.test(a.textContent.trim()) || a.getAttribute('href') !== '#') return;
    a.title = 'Opens WhatsApp with: "Hi, I\'m looking at ' + topic.trim() + (range ? ', ' + range.value + ' days' : '') + '"';
  });

  // 4. Video pause control (WCAG 2.2.2): in the wireframe it only flips its own state and label.
  Array.prototype.forEach.call(document.querySelectorAll('.pause'), function (btn) {
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function () {
      var paused = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', paused ? 'false' : 'true');
      btn.setAttribute('aria-label', paused ? 'Pause video' : 'Play video');
    });
  });

  // 5. Phone: the header slides away while scrolling down and comes back on scroll up.
  var header = document.querySelector('.site-header');
  if (header) {
    var last = window.scrollY;
    var phone = window.matchMedia('(max-width: 768px), (max-height: 560px)');
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('is-hidden', phone.matches && y > last && y > 120 && !document.querySelector('details.menu[open]'));
      last = y;
    }, { passive: true });
  }
})();

// 6. Phone: sticky contact bar. Quiet while the page shows its own contact buttons (hero, first-screen story,
//    trip cards, the closing call to action), a form or the footer, and while the menu or a cookie banner is open.
(function () {
  var bar = document.querySelector('.mbar');
  if (!bar || !('IntersectionObserver' in window)) { if (bar) bar.classList.add('is-on'); return; }
  var hero = document.querySelector('.hero, .first-screen');
  var quiet = Array.prototype.slice.call(document.querySelectorAll('.cta, .trips, .form-box, .site-footer'));
  var past = !hero, menu = false, seen = new Set();
  var apply = function () { bar.classList.toggle('is-on', past && !seen.size && !menu); };
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.target === hero) past = !e.isIntersecting && e.boundingClientRect.top < 0;
      else if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target);
    });
    apply();
  });
  if (hero) io.observe(hero);
  quiet.forEach(function (el) { io.observe(el); });
  if (!hero) { var y0 = function () { past = window.scrollY > window.innerHeight * 0.6; apply(); }; window.addEventListener('scroll', y0, { passive: true }); y0(); }
  var m = document.querySelector('details.menu');
  if (m) m.addEventListener('toggle', function () { menu = m.open; apply(); });
  apply();
  // transitions start only after the first state is set, so the bar never slides out on load
  requestAnimationFrame(function () { requestAnimationFrame(function () { bar.classList.add('is-ready'); }); });
})();

// 7. Tabs row: fade on the side with more tabs; the current section is underlined.
(function () {
  var nav = document.querySelector('.subnav');
  if (!nav) return;
  var row = nav.querySelector('.wrap');
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.tab-cta)'));
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
    var a = links[cur]; if (a && row.scrollWidth > row.clientWidth) row.scrollTo({ left: Math.max(0, a.offsetLeft - 16), behavior: 'smooth' });
  };
  var t; window.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(spy, 80); }, { passive: true });
  spy();
})();
