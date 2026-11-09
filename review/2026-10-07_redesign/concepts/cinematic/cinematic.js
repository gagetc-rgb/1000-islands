// Home concept "Cinematic chapters": owner labels toggle + floating chapter index.
(function () {
  // 1. Owner annotation labels ("01 · Hero" ...): hidden by default; ?labels=1 shows them, the L key toggles.
  var root = document.documentElement;
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'l' && e.key !== 'L') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    root.classList.toggle('show-labels');
  });

  // 2. Chapter index: visible only while Raja Ampat, North Sulawesi or Yacht charters fills the middle of the screen;
  //    the chapter on screen is marked. Desktop and tablet only (hidden by CSS on phones).
  var nav = document.querySelector('.chapters');
  var chapters = Array.prototype.slice.call(document.querySelectorAll('[data-chapter]'));
  if (!nav || !chapters.length) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var ticking = false;
  var update = function () {
    ticking = false;
    var mid = window.innerHeight / 2, cur = null;
    chapters.forEach(function (c) { var r = c.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) cur = c; });
    nav.classList.toggle('is-on', !!cur);
    links.forEach(function (a) {
      if (cur && a.getAttribute('href') === '#' + cur.id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
