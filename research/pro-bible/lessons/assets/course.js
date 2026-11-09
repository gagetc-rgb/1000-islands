/* Shared behaviour for the course pages. No dependencies. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // localStorage may be blocked (private window, preview): every access is guarded.
  const store = {
    get(k, d) { try { const v = localStorage.getItem('course:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('course:' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  };

  const ICONS = {
    check: '<path d="M4 12.5l5 5L20 6.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    ai: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V4M9.5 13v2M14.5 13v2M2.5 12.5v3M21.5 12.5v3"/>',
    human: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>',
    say: '<path d="M4 5h16v11H10l-6 4z"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    play: '<path d="M7 5l12 7-12 7z"/>',
    redo: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/>'
  };
  const icon = (name) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  function initIcons(root = document) {
    $$('[data-ic]', root).forEach((el) => { el.outerHTML = icon(el.dataset.ic); });
    const auto = [['.note.human > .nt', 'human'], ['.note.ai > .nt', 'ai'], ['.note.check > .nt', 'eye'], ['.note.good > .nt', 'check'], ['.say > .nt', 'say']];
    auto.forEach(([sel, name]) => $$(sel, root).forEach((h) => { if (!h.querySelector('.ic')) h.insertAdjacentHTML('afterbegin', icon(name)); }));
    $$('.tag.bad', root).forEach((t) => { if (!t.querySelector('.ic')) t.insertAdjacentHTML('afterbegin', icon('x')); });
    $$('.tag.good', root).forEach((t) => { if (!t.querySelector('.ic')) t.insertAdjacentHTML('afterbegin', icon('check')); });
  }

  const targetOf = (el) => (el.dataset.for ? $(el.dataset.for) : el.closest('.stage'));
  const notify = (t) => t && t.dispatchEvent(new CustomEvent('statechange', { bubbles: true }));

  // <button data-set="mode=bad"> sets data-mode="bad" on the stage (or data-for target)
  function initState() {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-set]');
      if (b) {
        const t = targetOf(b);
        b.dataset.set.split(';').forEach((p) => { const [k, v] = p.split('='); t.setAttribute('data-' + k.trim(), v.trim()); });
        const seg = b.closest('.seg');
        if (seg) $$('button', seg).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        notify(t);
        return;
      }
      const g = e.target.closest('[data-toggle]');
      if (g) {
        const t = targetOf(g);
        const on = g.getAttribute('aria-pressed') !== 'true';
        g.setAttribute('aria-pressed', String(on));
        t.setAttribute('data-' + g.dataset.toggle, on ? 'on' : 'off');
        notify(t);
      }
    });
    $$('input[data-var]').forEach((inp) => {
      const t = targetOf(inp);
      const out = inp.closest('.field') && $('output', inp.closest('.field'));
      const apply = () => {
        const unit = inp.dataset.unit || '';
        t.style.setProperty(inp.dataset.var, inp.value + unit);
        if (out) out.textContent = inp.value + (inp.dataset.show != null ? inp.dataset.show : unit);
        notify(t);
      };
      inp.addEventListener('input', apply);
      apply();
    });
    $$('input[type=checkbox][data-flag]').forEach((inp) => {
      const t = targetOf(inp);
      const apply = () => { t.setAttribute('data-' + inp.dataset.flag, inp.checked ? 'on' : 'off'); notify(t); };
      inp.addEventListener('change', apply);
      apply();
    });
  }

  function initToc() {
    const toc = $('.toc ol');
    const secs = $$('main .sec[id]');
    if (!toc || !secs.length) return;
    toc.innerHTML = secs.map((s) => `<li><a href="#${s.id}">${s.dataset.short || $('h2', s).textContent}</a></li>`).join('');
    const links = $$('a', toc);
    const wide = window.matchMedia('(min-width:70rem)');
    const details = $('.toc');
    const sync = () => { details.open = wide.matches; };
    sync();
    wide.addEventListener('change', sync);
    toc.addEventListener('click', () => { if (!wide.matches) details.open = false; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + en.target.id)));
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    secs.forEach((s) => io.observe(s));
  }

  function initProgress() {
    const bar = $('.progress i');
    if (!bar) return;
    const upd = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0) + '%';
    };
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove();
      return ok;
    }
  }
  function initCopy() {
    $$('.say').forEach((box) => {
      if ($('.copy-all', box) || !$('li', box)) return;
      const b = document.createElement('button');
      b.className = 'btn copy-all'; b.type = 'button';
      b.innerHTML = icon('copy') + '<span>Скопировать всё</span>';
      box.appendChild(b);
    });
    document.addEventListener('click', async (e) => {
      const b = e.target.closest('.copy-all,[data-copy]');
      if (!b) return;
      let text;
      if (b.dataset.copy) text = $(b.dataset.copy).textContent;
      else text = $$('li', b.closest('.say')).map((li) => li.textContent.trim()).join('\n');
      const ok = await copyText(text);
      const label = $('span', b) || b;
      const old = label.textContent;
      label.textContent = ok ? 'Скопировано' : 'Не вышло, выдели вручную';
      setTimeout(() => { label.textContent = old; }, 1600);
    });
  }

  // Quiz: <div class="quiz" data-quiz="l1"><script type="application/json">[{q,opts,a,why}]</script></div>
  function renderQuiz(box, data) {
    const id = box.dataset.quiz;
    let right = 0; let done = 0;
    $$('.q,.quiz-score', box).forEach((n) => n.remove());
    const score = document.createElement('div');
    score.className = 'quiz-score'; score.setAttribute('aria-live', 'polite');
    const prev = store.get('quiz:' + id, null);
    if (prev) score.textContent = `Прошлый результат: ${prev.right} из ${prev.total}.`;
    const finish = () => {
      store.set('quiz:' + id, { right, total: data.length });
      const pct = right / data.length;
      const msg = pct === 1 ? 'Без ошибок.' : pct >= 0.7 ? 'Хорошо. Ошибки перечитай по объяснениям.' : 'Стоит вернуться к разделам, где ошибся.';
      score.innerHTML = `<span>Результат: ${right} из ${data.length}. ${msg}</span>`;
      const again = document.createElement('button');
      again.type = 'button'; again.className = 'btn ghost'; again.innerHTML = icon('redo') + '<span>Пройти заново</span>';
      again.addEventListener('click', () => renderQuiz(box, data));
      score.appendChild(again);
    };
    data.forEach((item, qi) => {
      const q = document.createElement('div');
      q.className = 'q';
      q.innerHTML = `<p class="qt">${qi + 1}. ${item.q}</p><div class="opts"></div><p class="why" hidden></p>`;
      const opts = $('.opts', q);
      // Shuffle the options so the right answer is not always in the same place.
      const order = item.opts.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
      order.forEach((oi) => {
        const txt = item.opts[oi];
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'opt'; b.dataset.i = oi; b.innerHTML = `<span>${txt}</span>`;
        b.addEventListener('click', () => {
          $$('.opt', q).forEach((x) => {
            x.disabled = true;
            if (Number(x.dataset.i) === item.a) { x.classList.add('right'); x.insertAdjacentHTML('afterbegin', icon('check')); }
          });
          if (oi === item.a) right += 1;
          else { b.classList.add('wrong'); b.insertAdjacentHTML('afterbegin', icon('x')); }
          const why = $('.why', q);
          why.hidden = false;
          why.innerHTML = (oi === item.a ? '<strong>Верно.</strong> ' : '<strong>Не совсем.</strong> ') + item.why;
          done += 1;
          if (done === data.length) finish();
        });
        opts.appendChild(b);
      });
      box.appendChild(q);
    });
    box.appendChild(score);
  }
  function initQuiz() {
    $$('.quiz').forEach((box) => {
      const src = $('script[type="application/json"]', box);
      if (src) renderQuiz(box, JSON.parse(src.textContent));
    });
  }

  function initChecklist() {
    $$('.checklist[data-id]').forEach((list) => {
      const key = 'check:' + list.dataset.id;
      const saved = store.get(key, []);
      $$('input[type=checkbox]', list).forEach((inp, i) => {
        inp.checked = !!saved[i];
        inp.addEventListener('change', () => {
          store.set(key, $$('input[type=checkbox]', list).map((x) => x.checked));
        });
      });
    });
  }

  /* Device frame: an iframe with its own viewport, scaled down when wider than the stage.
     device(stage, { build(state) -> srcdoc, onReady(doc, width) }) */
  function device(stageSel, opts) {
    const stage = typeof stageSel === 'string' ? $(stageSel) : stageSel;
    const view = $('.device-view', stage);
    const frame = $('iframe', stage);
    const range = $('input[data-device-width]', stage);
    const out = range && $('output', range.closest('.field'));
    const H = Number(frame.getAttribute('height')) || 420;
    let w = range ? Number(range.value) : 390;
    const layout = () => {
      const avail = view.parentElement.clientWidth - 32;
      const scale = Math.min(1, avail / w);
      frame.style.width = w + 'px';
      frame.style.height = H + 'px';
      frame.style.transform = `scale(${scale})`;
      view.style.width = w * scale + 'px';
      view.style.height = H * scale + 'px';
      if (out) out.textContent = w + ' px' + (scale < 1 ? ` (показано в ${Math.round(scale * 100)}%)` : '');
      if (opts.onReady && frame.contentDocument && frame.contentDocument.body) opts.onReady(frame.contentDocument, w);
    };
    const state = () => { const s = {}; for (const a of stage.attributes) if (a.name.startsWith('data-')) s[a.name.slice(5)] = a.value; return s; };
    const rebuild = () => { frame.srcdoc = opts.build(state()); };
    frame.addEventListener('load', layout);
    if (range) range.addEventListener('input', () => { w = Number(range.value); layout(); });
    $$('[data-w]', stage).forEach((b) => b.addEventListener('click', () => { w = Number(b.dataset.w); if (range) range.value = w; layout(); }));
    stage.addEventListener('statechange', rebuild);
    new ResizeObserver(layout).observe(view.parentElement);
    rebuild();
    return { rebuild, layout, frame, get width() { return w; } };
  }

  // Demo pages live in srcdoc iframes. There a link like href="#" resolves against the lesson URL
  // and would load the whole lesson inside the frame, so link navigation is blocked in every frame.
  function initFrames() {
    $$('iframe').forEach((f) => f.addEventListener('load', () => {
      try {
        const d = f.contentDocument;
        if (d) d.addEventListener('click', (e) => { if (e.target.closest && e.target.closest('a')) e.preventDefault(); });
      } catch (err) { /* cross-origin frame: nothing to guard */ }
    }));
  }

  // Keep the main thread busy on purpose (used by speed demos).
  function busy(ms) { const end = performance.now() + ms; while (performance.now() < end) { /* spin */ } }

  window.Course = { $, $$, store, icon, device, busy, copyText, notify, initIcons };

  document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initFrames();
    initState();
    initToc();
    initProgress();
    initCopy();
    initQuiz();
    initChecklist();
  });
})();
