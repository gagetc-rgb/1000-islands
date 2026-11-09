// Concept C · Off the map — page behaviour on top of the shared wf.js
(function () {
  var root = document.documentElement;

  // 1. Block labels for owner comments: hidden by default, shown with ?labels=1 or the L key.
  if (new URLSearchParams(location.search).get('labels') === '1') root.classList.add('show-labels');
  document.addEventListener('keydown', function (e) {
    if ((e.key !== 'l' && e.key !== 'L') || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    root.classList.toggle('show-labels');
  });

  // 2. Map: wide view on desktop, a tighter crop on phones; map labels keep a constant on-screen size.
  var map = document.querySelector('.map');
  if (!map) return;
  var svg = map.querySelector('svg');
  var compact = window.matchMedia('(max-width: 860px)');
  var WIDE = [0, 0, 1060, 860], TIGHT = [80, 230, 920, 600];
  var fit = function () {
    var vb = compact.matches ? TIGHT : WIDE;
    svg.setAttribute('viewBox', vb.join(' '));
    var r = svg.getBoundingClientRect();
    var s = Math.min(r.width / vb[2], r.height / vb[3]);
    if (s > 0) svg.style.setProperty('--s', s.toFixed(4));
  };
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(map); else window.addEventListener('resize', fit);
  fit();

  // 3. The index lights its region: hover or keyboard focus on a destination; the last one stays lit.
  var items = Array.prototype.slice.call(document.querySelectorAll('.dest[data-region]'));
  var set = function (r) {
    map.setAttribute('data-active', r);
    items.forEach(function (i) { i.classList.toggle('is-on', i.getAttribute('data-region') === r); });
  };
  items.forEach(function (i) {
    i.addEventListener('pointerenter', function () { set(i.getAttribute('data-region')); });
    i.addEventListener('focus', function () { set(i.getAttribute('data-region')); });
  });
  // the hero's bottom row hands over: "Raja Ampat" scrolls to the map with Raja Ampat already lit
  Array.prototype.forEach.call(document.querySelectorAll('[data-go]'), function (a) {
    a.addEventListener('click', function () { set(a.getAttribute('data-go')); });
  });
})();
