// Editorial concept: owner annotation labels + wireframe pause buttons.
(function () {
  var root = document.documentElement;

  // Block labels ("01 · Hero" ...) are hidden by default. Show them with ?labels=1 or toggle with the L key.
  try {
    if (new URLSearchParams(location.search).get('labels') === '1') root.classList.add('show-labels');
  } catch (e) { /* old browser: labels stay hidden */ }
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'l' && e.key !== 'L') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    root.classList.toggle('show-labels');
  });

  // Phone contact bar: wf.js hides it over the hero; enable its slide only after that first state is set.
  var bar = document.querySelector('.mbar');
  if (bar) requestAnimationFrame(function () { requestAnimationFrame(function () { bar.classList.add('is-ready'); }); });

  // Video pause control (WCAG 2.2.2): in the wireframe it only flips its own state and label.
  Array.prototype.forEach.call(document.querySelectorAll('.pause'), function (b) {
    b.addEventListener('click', function () {
      var paused = b.getAttribute('aria-pressed') === 'true';
      b.setAttribute('aria-pressed', paused ? 'false' : 'true');
      b.setAttribute('aria-label', paused ? 'Pause video' : 'Play video');
    });
  });
})();
