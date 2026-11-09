// Header state, video loading and pause, phone bottom bar. Shared by all five directions.
(() => {
  const hdr = document.querySelector('.hdr');
  const hero = document.querySelector('.hero');
  const onScroll = () => hdr.classList.toggle('solid', window.scrollY > hero.offsetHeight - 90);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  // Videos: nothing downloads until a clip is near the screen. The phone gets its own smaller cut.
  // Reduced motion, Save-Data or a 2G connection: posters only, no video at all. 3G no longer counts (1 Nov): the browser's
  // estimate said "3g" on a local server and hid the hero video; the loading screen covers slower connections.
  const conn = navigator.connection || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowData = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');
  const phone = matchMedia('(max-width: 760px)').matches;
  const videos = [...document.querySelectorAll('video[data-src]')];
  const heroVideo = hero.querySelector('video');
  const btn = document.querySelector('.pause');   // only in directions that carry a video control
  const line = document.querySelector('.vctl-line i');

  // Loading screen: reveal when the hero clip can play through, after at least 0.7 s and at most 5 s.
  const root = document.documentElement;
  const loadBar = document.querySelector('.loader-bar i');
  const t0 = performance.now();
  let revealed = false;
  const setBar = p => { loadBar.style.transform = `scaleX(${Math.max(0.06, Math.min(1, p))})`; };
  const reveal = e => {
    if (!fontsIn) { pending = e || { type: 'load' }; return; }
    if (revealed) return;
    revealed = true;
    root.dataset.revealMs = Math.round(performance.now());
    root.dataset.revealBy = e && e.type ? e.type : 'timeout';
    setBar(1);
    setTimeout(() => {
      root.classList.add('is-loaded');
      setTimeout(() => root.classList.remove('is-loading'), 900);
    }, Math.max(0, 700 - (performance.now() - t0)));
  };
  // Web fonts must be in before the reveal, or the header and headline jump from the fallback face (max 5 s anyway)
  let fontsIn = false, pending = null;
  // ask for the faces the first screen uses (fonts.ready alone can resolve before any load has started)
  const firstScreen = ['.hero h1', '.hero-lead', '.hdr .logo-name', '.hdr .logo-sub', '.nav a', '.hdr .btn']
    .map(s => document.querySelector(s)).filter(Boolean).map(el => getComputedStyle(el).font);
  Promise.all(firstScreen.map(f => document.fonts.load(f).catch(() => {})))
    .then(() => document.fonts.ready).then(() => { fontsIn = true; if (pending) reveal(pending); });
  setTimeout(() => { fontsIn = true; reveal({ type: 'timeout' }); }, 5000);

  if (reduce || lowData) {
    if (btn) btn.closest('.vctl').hidden = true;
    if (document.readyState === 'complete') reveal(); else addEventListener('load', reveal);
  } else {
    heroVideo.addEventListener('progress', () => {
      const b = heroVideo.buffered;
      if (b.length && heroVideo.duration) setBar(b.end(b.length - 1) / heroVideo.duration);
    });
    heroVideo.addEventListener('canplaythrough', reveal, { once: true });
    // The hero has an AV1 twin (name.av1.mp4, ~40% lighter); use it only where the browser says it decodes AV1 smoothly
    const h264 = phone ? heroVideo.dataset.srcSm : heroVideo.dataset.src;
    const av1Smooth = () => (navigator.mediaCapabilities ? navigator.mediaCapabilities.decodingInfo({ type: 'file', video: {
      contentType: 'video/mp4; codecs="av01.0.08M.08"', width: phone ? 1080 : 1920, height: phone ? 1920 : 1080, bitrate: 4e6, framerate: 30 } })
      .then(r => r.supported && r.smooth).catch(() => false) : Promise.resolve(false));
    av1Smooth().then(ok => {
      heroVideo.src = ok && heroVideo.dataset.av1 !== undefined ? h264.replace(/\.mp4$/, '.av1.mp4') : h264;
      heroVideo.preload = 'auto';
      // Autoplay can be refused (iOS Low Power Mode): then the first frame is enough to reveal
      heroVideo.play().catch(() => heroVideo.addEventListener('loadeddata', reveal, { once: true }));
    });
  }

  // Crossing the phone width while the page is open (window resized, the compare page's phone toggle) swaps the hero to the
  // right file; before, a 9:16 phone cut stayed and looked zoomed on a wide screen
  matchMedia('(max-width: 760px)').addEventListener('change', e => {
    if (reduce || lowData || !heroVideo.getAttribute('src')) return;
    const av1 = heroVideo.currentSrc.endsWith('.av1.mp4'), t = heroVideo.currentTime;
    let next = e.matches ? heroVideo.dataset.srcSm : heroVideo.dataset.src;
    if (av1) next = next.replace(/\.mp4$/, '.av1.mp4');
    heroVideo.src = next; heroVideo.currentTime = t;
    if (!heroVideo.dataset.paused) heroVideo.play().catch(() => {});
  });

  if (!reduce && !lowData) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) { v.src = phone ? v.dataset.srcSm : v.dataset.src; v.preload = 'auto'; }
        if (!v.dataset.paused) v.play().catch(() => {});
      } else if (v.src) {
        v.pause();
      }
    }), { rootMargin: '300px 0px' });
    videos.forEach(v => io.observe(v));

    if (btn) btn.addEventListener('click', () => {
      const paused = heroVideo.paused;
      if (paused) { delete heroVideo.dataset.paused; heroVideo.play().catch(() => {}); }
      else { heroVideo.dataset.paused = '1'; heroVideo.pause(); }
      btn.setAttribute('aria-label', paused ? 'Pause video' : 'Play video');
      btn.setAttribute('aria-pressed', String(!paused));
    });
    if (line) {
      const tick = () => {
        if (heroVideo.duration) line.style.transform = `scaleX(${heroVideo.currentTime / heroVideo.duration})`;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  // Accordion gallery (only where the row carries data-accordion): one photo open; pointing at a photo opens it,
  // tap, click or Enter/Space too
  const hoverable = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const phoneWidth = matchMedia('(max-width: 760px)');
  document.querySelectorAll('.gallery-row[data-accordion]').forEach(row => {
    if (phoneWidth.matches) return;   // phones get the swipe rail instead
    const items = [...row.querySelectorAll('.g')];
    const open = it => items.forEach(g => { g.classList.toggle('on', g === it); g.setAttribute('aria-expanded', String(g === it)); });
    items.forEach(g => {
      g.tabIndex = 0; g.setAttribute('role', 'button');
      g.setAttribute('aria-label', 'Show photo: ' + (g.querySelector('img')?.alt || ''));
      g.addEventListener('click', () => open(g));
      g.addEventListener('mouseenter', () => { if (hoverable) open(g); });
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(g); } });
    });
    open(items[0]);
  });

  // Phone carousels: dots under each rail show the card in view and jump to a card (hidden on desktop by CSS)
  const rails = [...document.querySelectorAll('.gallery-row')];   // the gallery rail on phones, every design
  if (document.body.hasAttribute('data-rails')) rails.push(...document.querySelectorAll('.dest-grid, .steps, .rev-grid'));
  rails.forEach(rail => {
    const items = [...rail.children];
    if (items.length < 2) return;
    const dots = document.createElement('div');
    dots.className = 'rail-dots';
    const left = it => it.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft - parseFloat(getComputedStyle(rail).paddingLeft);
    items.forEach((it, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Show ${i + 1} of ${items.length}`);
      b.addEventListener('click', () => rail.scrollTo({ left: left(it), behavior: 'smooth' }));
      dots.append(b);
    });
    rail.after(dots);
    const update = () => {
      const x = rail.scrollLeft, end = x >= rail.scrollWidth - rail.clientWidth - 2;
      let best = 0, bd = Infinity;
      items.forEach((it, i) => { const d = Math.abs(left(it) - x); if (d < bd) { bd = d; best = i; } });
      if (end) best = items.length - 1;
      [...dots.children].forEach((b, i) => b.setAttribute('aria-current', String(i === best)));
    };
    rail.addEventListener('scroll', update, { passive: true });
    update();
  });

  // Header dropdown (v1): click toggles, Escape or a click elsewhere closes; hover and focus open it in CSS
  document.querySelectorAll('.nav-drop').forEach(d => {
    const btn = d.querySelector('.nav-drop-btn');
    const set = on => { d.classList.toggle('open', on); btn.setAttribute('aria-expanded', String(on)); };
    btn.addEventListener('click', () => set(!d.classList.contains('open')));
    d.addEventListener('keydown', e => { if (e.key === 'Escape') { set(false); btn.focus(); } });
    document.addEventListener('click', e => { if (!d.contains(e.target)) set(false); });
  });

  // Bottom bar hides on hero, yachts, story, final CTA and footer
  const bar = document.querySelector('.mbar');
  const hide = new Set();
  const bio = new IntersectionObserver(es => {
    es.forEach(e => e.isIntersecting ? hide.add(e.target) : hide.delete(e.target));
    bar.classList.toggle('on', hide.size === 0);
  }, { threshold: 0.05 });
  // also over yachts and stories (2 Nov): their own button is right there, and the bar sat on top of the picture
  [hero, document.querySelector('.yacht'), document.querySelector('.story'), document.querySelector('.cta'), document.querySelector('.ftr')].forEach(el => bio.observe(el));

  // Sections with data-reveal (v5 travel agents card, 2 Nov): .armed only just before they reach the viewport, so nothing
  // sits hidden that is not about to play; .in plays the entrance once. Reduced motion never arms.
  const revealers = document.querySelectorAll('[data-reveal]');
  if (revealers.length && !reduce) {
    const arm = s => { s.classList.add('reset', 'armed'); void s.offsetWidth; s.classList.remove('reset'); };
    const armIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      armIO.unobserve(e.target);
      if (e.boundingClientRect.bottom > 0 && !e.target.classList.contains('in')) arm(e.target);
    }), { rootMargin: '0px 0px 50% 0px' });
    // data-reveal="late" (design 1, user 2 Nov): plays only once the block's top is in the upper third of the window
    const play = (e, io) => {
      if (!e.isIntersecting) return;
      const s = e.target;
      io.unobserve(s);
      if (!s.classList.contains('armed')) { armIO.unobserve(s); arm(s); }
      requestAnimationFrame(() => { s.classList.add('in'); s.dispatchEvent(new Event('revealed')); });
    };
    const playIO = new IntersectionObserver(es => es.forEach(e => play(e, playIO)), { rootMargin: '0px 0px -28% 0px' });
    const lateIO = new IntersectionObserver(es => es.forEach(e => play(e, lateIO)), { rootMargin: '0px 0px -66% 0px' });
    revealers.forEach(s => { armIO.observe(s); (s.dataset.reveal === 'late' ? lateIO : playIO).observe(s); });
  }

  // Travel agents blocks (2 Nov): pointer effects only with a fine pointer and motion allowed
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce;
  const tgStage = document.querySelector('.tg-stage');           // 1: the glass tilts toward the pointer, a sheen follows it
  if (tgStage && fine) {
    const gl = tgStage.querySelector('.tg-glass');
    tgStage.addEventListener('pointermove', e => {
      const r = gl.getBoundingClientRect();
      const px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      gl.style.setProperty('--rx', ((.5 - py) * 6).toFixed(2) + 'deg'); gl.style.setProperty('--ry', ((px - .5) * 8).toFixed(2) + 'deg');
      gl.style.setProperty('--sx', (px * 100).toFixed(1) + '%'); gl.style.setProperty('--sy', (py * 100).toFixed(1) + '%'); gl.style.setProperty('--so', 1);
    });
    tgStage.addEventListener('pointerleave', () => { gl.style.setProperty('--rx', '0deg'); gl.style.setProperty('--ry', '0deg'); gl.style.setProperty('--so', 0); });
  }
  const tl = document.querySelector('.tl-media');                // 2: the film inside the letters pans after the pointer, inside its box
  if (tl && fine) {
    tl.addEventListener('pointermove', e => {
      const r = tl.getBoundingClientRect();
      tl.style.setProperty('--vx', (50 - ((e.clientX - r.left) / r.width - .5) * 30).toFixed(1) + '%');
      tl.style.setProperty('--vy', (60 - ((e.clientY - r.top) / r.height - .5) * 24).toFixed(1) + '%');
    });
    tl.addEventListener('pointerleave', () => { tl.style.setProperty('--vx', '50%'); tl.style.setProperty('--vy', '60%'); });
  }
  const tw = document.querySelector('.tw-water');                // 3: WebGL ripple (jquery.ripples 0.5.3), masked to the water in CSS
  if (tw && window.jQuery && jQuery.fn.ripples) {
    let ok = true;
    try { jQuery(tw).ripples({ resolution: innerWidth > 768 ? 512 : 256, dropRadius: 11, perturbance: .018 }); } catch (err) { ok = false; }
    if (ok && !reduce) tw.closest('section').addEventListener('revealed', () => {
      const w = tw.clientWidth, h = tw.clientHeight;
      [[.6, .62], [.5, .5], [.9, .6]].forEach(([x, y], i) => setTimeout(() => { try { jQuery(tw).ripples('drop', x * w, y * h, 14, .035); } catch (err) {} }, 700 + i * 420));
    });
  }
  const panes = [...document.querySelectorAll('.tsh-pane')];      // 4: hover, focus or tap opens a shutter
  const openPane = p => panes.forEach(q => q.classList.toggle('is-on', q === p));
  panes.forEach(p => {
    p.addEventListener('pointerenter', () => { if (fine) openPane(p); });
    p.addEventListener('focus', () => openPane(p));
    p.addEventListener('click', () => openPane(p));
  });

  document.querySelectorAll('.menu-panel a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));
  // phone menu also closes on Escape (focus back on the burger) and on a tap outside it (review, 2 Nov)
  const menu = document.querySelector('details.menu');
  if (menu) {
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
    document.addEventListener('click', e => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  }
})();
