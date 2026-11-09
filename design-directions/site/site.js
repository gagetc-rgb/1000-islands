// The v5 site (5 Nov 2026): base.js behaviour made safe for pages without a video hero, plus the site's own parts:
// days slider prices, sticky in-page tabs, forms (checks, failed state, prefill), cookie banner and settings.
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const q = new URLSearchParams(location.search);
  const root = document.documentElement;
  const hero = $('.hero');
  const heroVideo = hero && hero.querySelector('video');
  const conn = navigator.connection || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowData = conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');
  const phone = matchMedia('(max-width: 760px)').matches;

  // ---- loading screen (only pages whose first screen is a film) ----
  const loadBar = $('.loader-bar i');
  const t0 = performance.now();
  let revealed = false, fontsIn = false, pending = null;
  const setBar = p => { if (loadBar) loadBar.style.transform = `scaleX(${Math.max(0.06, Math.min(1, p))})`; };
  const reveal = e => {
    if (!fontsIn) { pending = e || { type: 'load' }; return; }
    if (revealed) return;
    revealed = true;
    setBar(1);
    setTimeout(() => { root.classList.add('is-loaded'); setTimeout(() => root.classList.remove('is-loading'), 900); },
      Math.max(0, 700 - (performance.now() - t0)));
  };
  const firstScreen = ['h1', '.hero-lead', '.hdr .logo-name', '.nav a', '.hdr .btn'].map(s => $(s)).filter(Boolean).map(el => getComputedStyle(el).font);
  Promise.all(firstScreen.map(f => document.fonts.load(f).catch(() => {}))).then(() => document.fonts.ready)
    .then(() => { fontsIn = true; if (pending) reveal(pending); });
  setTimeout(() => { fontsIn = true; reveal({ type: 'timeout' }); }, 5000);

  if (heroVideo && !reduce && !lowData) {
    heroVideo.addEventListener('progress', () => {
      const b = heroVideo.buffered;
      if (b.length && heroVideo.duration) setBar(b.end(b.length - 1) / heroVideo.duration);
    });
    heroVideo.addEventListener('canplaythrough', reveal, { once: true });
    const h264 = phone ? heroVideo.dataset.srcSm : heroVideo.dataset.src;
    const av1Smooth = () => (navigator.mediaCapabilities && heroVideo.dataset.av1 !== undefined ? navigator.mediaCapabilities.decodingInfo({ type: 'file', video: {
      contentType: 'video/mp4; codecs="av01.0.08M.08"', width: phone ? 1080 : 1920, height: phone ? 1920 : 1080, bitrate: 4e6, framerate: 30 } })
      .then(r => r.supported && r.smooth).catch(() => false) : Promise.resolve(false));
    av1Smooth().then(ok => {
      heroVideo.src = ok ? h264.replace(/\.mp4$/, '.av1.mp4') : h264;
      heroVideo.preload = 'auto';
      heroVideo.play().catch(() => heroVideo.addEventListener('loadeddata', reveal, { once: true }));
    });
    matchMedia('(max-width: 760px)').addEventListener('change', e => {
      if (!heroVideo.getAttribute('src')) return;
      const av1 = heroVideo.currentSrc.endsWith('.av1.mp4'), t = heroVideo.currentTime;
      let next = e.matches ? heroVideo.dataset.srcSm : heroVideo.dataset.src;
      if (av1) next = next.replace(/\.mp4$/, '.av1.mp4');
      heroVideo.src = next; heroVideo.currentTime = t; heroVideo.play().catch(() => {});
    });
  } else if (document.readyState === 'complete') reveal(); else addEventListener('load', reveal);

  // ---- every other film: loads near the screen, pauses off it ----
  if (!reduce && !lowData) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.src) { v.src = phone ? v.dataset.srcSm : v.dataset.src; v.preload = 'auto'; } v.play().catch(() => {}); }
      else if (v.src) v.pause();
    }), { rootMargin: '300px 0px' });
    $$('video[data-src]').filter(v => v !== heroVideo).forEach(v => io.observe(v));
  }

  // ---- phone bottom bar: hidden over films, forms, the final call to action and the footer ----
  const bar = $('.mbar');
  if (bar) {
    const quiet = ['.hero', '.yacht', '.story', '.cta', '.ftr', '.trips', '.form-box', '.page-head'].flatMap(s => $$(s));
    const seen = new Set();
    const bio = new IntersectionObserver(es => {
      es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));
      bar.classList.toggle('on', seen.size === 0);
    }, { threshold: 0.05 });
    quiet.forEach(el => bio.observe(el));
  }

  // ---- entrances (travel agents block) ----
  const revealers = $$('[data-reveal]');
  if (revealers.length && !reduce) {
    const arm = s => { s.classList.add('reset', 'armed'); void s.offsetWidth; s.classList.remove('reset'); };
    const armIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      armIO.unobserve(e.target);
      if (e.boundingClientRect.bottom > 0 && !e.target.classList.contains('in')) arm(e.target);
    }), { rootMargin: '0px 0px 50% 0px' });
    const playIO = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const s = e.target; playIO.unobserve(s);
      if (!s.classList.contains('armed')) { armIO.unobserve(s); arm(s); }
      requestAnimationFrame(() => s.classList.add('in'));
    }), { rootMargin: '0px 0px -28% 0px' });
    revealers.forEach(s => { armIO.observe(s); playIO.observe(s); });
  }
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce;
  const tl = $('.tl-media');   // the film inside the letters follows the pointer, inside its box
  if (tl && fine) {
    tl.addEventListener('pointermove', e => {
      const r = tl.getBoundingClientRect();
      tl.style.setProperty('--vx', (50 - ((e.clientX - r.left) / r.width - .5) * 30).toFixed(1) + '%');
      tl.style.setProperty('--vy', (60 - ((e.clientY - r.top) / r.height - .5) * 24).toFixed(1) + '%');
    });
    tl.addEventListener('pointerleave', () => { tl.style.setProperty('--vx', '50%'); tl.style.setProperty('--vy', '60%'); });
  }

  // ---- phone menu ----
  $$('.menu-panel a').forEach(a => a.addEventListener('click', () => a.closest('details').open = false));
  const menu = $('details.menu');
  if (menu) {
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
    document.addEventListener('click', e => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  }

  // ---- in-page tabs: the one for the section in view is marked ----
  const tabs = $$('.subnav a[href^="#"]');
  if (tabs.length) {
    const targets = tabs.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const mark = () => {
      const line = innerHeight * 0.35;
      let cur = null;
      targets.forEach(t => { if (t.getBoundingClientRect().top < line) cur = t; });
      tabs.forEach(a => a.toggleAttribute('aria-current', !!cur && a.getAttribute('href') === '#' + cur.id && !a.classList.contains('tab-cta')));
    };
    addEventListener('scroll', mark, { passive: true }); mark();
  }

  // ---- days slider: each level's "from" price follows the days (demo rates from the mockup) ----
  const range = $('#days');
  const fmt = n => '$' + n.toLocaleString('en-US');
  const total = (r, days) => { let t = 0; for (let d = 1; d <= days; d++) { let rate = r.base; r.steps.forEach(s => { if (d >= s[0]) rate = s[1]; }); t += rate; } return t; };
  const tripsBox = $('.trips');
  if (range && tripsBox) {
    const out = $('.days output b'), region = tripsBox.dataset.region;
    const paint = () => {
      const p = (range.value - range.min) / (range.max - range.min) * 100;
      range.style.setProperty('--p', p + '%');
    };
    const update = () => {
      const days = +range.value;
      out.textContent = days; paint();
      $$('.trip', tripsBox).forEach(c => {
        c.querySelector('.trip-price b').textContent = fmt(total(JSON.parse(c.dataset.rates), days));
        c.querySelector('.buy a').href = 'plan.html?' + new URLSearchParams({ region, level: c.dataset.level, days });
      });
      if (bar) bar.querySelector('.btn-primary').href = 'plan.html?' + new URLSearchParams({ region, days });
    };
    range.addEventListener('input', update); update();
  }

  // ---- forms: plain-language checks, the failed state (?state=failed), prefill from a trip (?region=&level=&days=) ----
  $$('form[data-form]').forEach(form => {
    const errBox = $('.alert-errors', form), failBox = $('.alert-failed', form);
    const want = q.get('want');
    if (want === 'request' || location.hash === '#request') { const r = $('input[value="Send a client request"]', form); if (r) r.checked = true; }
    $$('[data-want="request"]').forEach(a => a.addEventListener('click', () => { const r = $('input[value="Send a client request"]', form); if (r) r.checked = true; }));
    if (form.id === 'plan-form' && q.get('region')) {
      const region = q.get('region');
      $$('input[name="region"]', form).forEach(r => { r.checked = r.value === region; });
      const box = document.createElement('p');
      box.className = 'picked';
      box.innerHTML = '<b>Your trip:</b> <span></span> <a class="text-link" href="#">change</a>';
      box.querySelector('span').textContent = [region, q.get('level'), q.get('days') ? q.get('days') + ' days' : ''].filter(Boolean).join(' · ');
      const back = box.querySelector('a');
      back.href = document.referrer && document.referrer.includes(location.host) ? document.referrer : 'index.html';
      $('.form', form).before(box);
    }
    const rules = {
      name: v => v.trim() ? '' : 'Enter your name',
      agency: v => v.trim() ? '' : 'Enter your agency',
      email: v => !v.trim() ? 'Enter your email' : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Check the email address',
      dates: v => v.trim() ? '' : 'Tell us roughly when',
      country: v => v ? '' : 'Choose a country',
    };
    const check = el => {
      const f = rules[el.name]; if (!f) return '';
      const msg = f(el.value), m = $('#m-' + el.name, form), wrap = el.closest('.field');
      wrap.classList.toggle('error', !!msg);
      el.setAttribute('aria-invalid', String(!!msg));
      if (m) { m.textContent = msg; m.hidden = !msg; el.setAttribute('aria-describedby', 'm-' + el.name); }
      return msg;
    };
    $$('input, select, textarea', form).forEach(el => el.addEventListener('blur', () => { if (el.closest('.field.error') || el.value) check(el); }));
    $$('input, select, textarea', form).forEach(el => el.addEventListener('input', () => { if (el.closest('.field.error')) check(el); }));
    // 'instant', not 'auto': base.css sets scroll-behavior:smooth on html, and 'auto' follows it
    const showFailed = now => { failBox.hidden = false; errBox.hidden = true; failBox.scrollIntoView({ block: 'center', behavior: now || reduce ? 'instant' : 'smooth' }); };
    if (q.get('state') === 'failed') showFailed(true);
    let instant = false;   // the ?state=errors preview lands on the form at once; a real click scrolls smoothly
    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = $$('input, select, textarea', form).map(check).filter(Boolean);
      if (bad.length) {
        failBox.hidden = true; errBox.hidden = false;
        $('.alert-n', errBox).textContent = `Please check ${bad.length} field${bad.length > 1 ? 's' : ''}`;
        errBox.focus({ preventScroll: true });
        errBox.scrollIntoView({ block: 'center', behavior: reduce || instant ? 'instant' : 'smooth' });
        instant = false;
        return;
      }
      if (q.get('state') === 'failed' && !form.dataset.retried) { form.dataset.retried = '1'; showFailed(); return; }
      const fd = new FormData(form), p = new URLSearchParams();
      ['region', 'travellers', 'want'].forEach(k => { if (fd.get(k)) p.set(k, fd.get(k)); });
      ['level', 'days'].forEach(k => { if (q.get(k)) p.set(k, q.get(k)); });
      location.href = form.getAttribute('action') + (p.toString() ? '?' + p : '');
    });
    if (q.get('state') === 'errors') { instant = true; form.requestSubmit(); }
  });
  // thank-you: the summary line repeats what was sent
  const tline = $('[data-trip]');
  if (tline && (q.get('region') || q.get('want'))) {
    tline.textContent = q.get('want') || [q.get('region'), q.get('level'), q.get('days') && q.get('days') + ' days',
      q.get('travellers') && q.get('travellers') + (q.get('travellers') === '1' ? ' traveller' : ' travellers')].filter(Boolean).join(' · ');
  }

  // ---- cookies: banner on the first visit (or ?cookies=1), settings from the footer link (or ?cookies=settings) ----
  const ck = $('#cookies'), dlg = $('.ck-dialog');
  const store = { get: () => { try { return localStorage.getItem('ck-choice'); } catch (e) { return null; } },
                  set: v => { try { localStorage.setItem('ck-choice', v); } catch (e) {} } };
  const choice = store.get();
  if (ck && ((!choice && !q.has('nocookies')) || q.get('cookies') === '1')) ck.hidden = false;
  const close = v => { store.set(v); if (ck) ck.hidden = true; };
  $$('[data-ck]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.ck;
    if (k === 'all') { $('#ck-an').checked = $('#ck-mk').checked = true; close('all'); }
    else if (k === 'none') close('none');
    else close(JSON.stringify({ analytics: $('#ck-an').checked, marketing: $('#ck-mk').checked }));
    if (dlg.open && k !== 'save' && k !== 'all') dlg.close();
  }));
  const openSettings = e => {
    if (e) e.preventDefault();
    try { const c = JSON.parse(store.get()); if (c && typeof c === 'object') { $('#ck-an').checked = !!c.analytics; $('#ck-mk').checked = !!c.marketing; } } catch (err) {}
    if (store.get() === 'all') { $('#ck-an').checked = $('#ck-mk').checked = true; }
    dlg.showModal();
  };
  $$('[data-cookie-settings]').forEach(a => a.addEventListener('click', openSettings));
  if (q.get('cookies') === 'settings') openSettings();
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
})();

// landing first screen = film + facts band + tabs in one window (LAYOUT_RULES R1): measure the two bands
(() => {
  const set = () => {
    const f = document.querySelector('.facts-band'), s = document.querySelector('.subnav');
    if (f) document.documentElement.style.setProperty('--facts-h', f.offsetHeight + 'px');
    if (s) document.documentElement.style.setProperty('--sub-h', s.offsetHeight + 'px');
  };
  set(); addEventListener('resize', set);
  if (document.fonts) document.fonts.ready.then(set);
})();
