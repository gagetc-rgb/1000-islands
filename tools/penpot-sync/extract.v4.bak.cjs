// v2: render wireframes in headless Chrome and dump exactly what is visible:
// boxes, borders, shadows, placeholder diagonals, pseudo-elements (materialised), text split into visual lines, links, fixed layers.
const puppeteer = require("puppeteer-core");
const fs = require("fs");

// v4 (5 Oct 2026): no journey pages; trips live on the region pages
const MAIN = [
  ["home", "01 Home"], ["raja-ampat", "02 Raja Ampat"], ["north-sulawesi", "03 North Sulawesi"], ["yachts", "04 Yacht charters"],
  ["stories", "05 Guest stories"], ["about", "06 About"], ["advisors", "07 Travel agents"], ["plan", "08 Plan your trip"],
  ["thank-you", "09 Thank-you · traveller"], ["thank-you-advisor", "10 Thank-you · agent"],
];
const SERVICE = [
  ["privacy", "11 Privacy & cookies"], ["terms", "12 Booking terms"], ["404", "13 404 · Page not found"], ["unavailable", "14 Temporarily unavailable"],
  ["state-cookies", "S1 State · Cookie banner"], ["state-cookie-settings", "S2 State · Cookie settings"], ["state-form-errors", "S3 State · Form errors"], ["state-form-failed", "S4 State · Sending failed"],
];
const EMAILS = [["email-traveller", "E1 Email · Auto-reply to traveller"], ["email-advisor", "E2 Email · Auto-reply to agent"], ["email-owner", "E3 Email · New enquiry alert (owner)"]];
// one admin screen, one board per tab
const ADMIN = [["t-leads", "A1 Admin · Enquiries"], ["t-reviews", "A2 Admin · Reviews"], ["t-photos", "A3 Admin · Photos & video"], ["t-prices", "A4 Admin · Prices"]];

const JOBS = [
  ...[...MAIN, ...SERVICE].map(([k, n]) => ({ group: "desktop", key: k, name: n + " · Desktop", w: 1440, h: 900 })),
  ...[...MAIN, ...SERVICE].map(([k, n]) => ({ group: "mobile", key: k, name: n + " · Mobile", w: 390, h: 844 })),
  { group: "mobile", key: "home", name: "M1 Mobile menu (open) · Mobile", w: 390, h: 844, menuOpen: true, oneScreen: true },
  ...EMAILS.map(([k, n]) => ({ group: "emails", key: k, name: n + " · Desktop", w: 760, h: 900 })),
  ...EMAILS.map(([k, n]) => ({ group: "emails", key: k, name: n + " · Mobile", w: 390, h: 844 })),
  { group: "emails", key: "link-preview", name: "P1 Link previews", w: 1440, h: 900 },
  ...ADMIN.map(([t, n]) => ({ group: "admin", key: "admin-" + t, file: "admin-simple", tab: t, name: n, w: 1440, h: 900 })),
];

function prepare() {
  // 0) native form controls -> plain elements with the same box
  for (const el of [...document.querySelectorAll("input, textarea")]) {
    if (!el.checkVisibility()) continue;
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    const box = document.createElement("span");
    box.style.cssText = `display:inline-block;position:relative;vertical-align:middle;width:${r.width}px;height:${r.height}px;flex:0 0 ${r.width}px;order:${cs.order};align-self:${cs.alignSelf};margin:${cs.margin};`;
    if (el.type === "range") {
      const min = +el.min || 0, max = +el.max || 100, f = (el.value - min) / (max - min);
      box.innerHTML = `<span style="position:absolute;left:0;right:0;top:${r.height / 2 - 3}px;height:6px;border-radius:3px;background:#d6d6d6"></span><span style="position:absolute;left:0;width:${f * 100}%;top:${r.height / 2 - 3}px;height:6px;border-radius:3px;background:#2f2f2f"></span><span style="position:absolute;left:calc(${f * 100}% - 10px);top:${r.height / 2 - 10}px;width:20px;height:20px;border-radius:50%;background:#2f2f2f"></span>`;
    } else if (el.type === "checkbox") {
      box.innerHTML = `<span style="position:absolute;inset:0;border-radius:4px;border:1.5px solid #2f2f2f;background:${el.checked ? "#2f2f2f" : "#fff"};color:#fff;font:600 14px/${r.height - 3}px Inter;text-align:center">${el.checked ? "✓" : ""}</span>`;
    } else {
      let style = ""; for (const p of Array.from(cs)) { const v = cs.getPropertyValue(p); if (v) style += `${p}:${v};`; }
      box.style.cssText = style + `display:inline-flex;align-items:${el.tagName === "TEXTAREA" ? "flex-start" : "center"};overflow:hidden;white-space:nowrap;box-sizing:border-box;width:${r.width}px;height:${r.height}px;`;
      box.textContent = el.value || el.placeholder || "";
      if (!el.value) box.style.color = "#616161";
    }
    el.replaceWith(box);
  }
  // 1) materialise ::before/::after (except placeholder diagonals) into real spans so they can be measured
  const props = Array.from(getComputedStyle(document.documentElement));
  const todo = [];
  for (const el of document.body.querySelectorAll("*")) {
    for (const which of ["before", "after"]) {
      if (el.classList.contains("ph")) continue;
      const cs = getComputedStyle(el, "::" + which);
      if (!cs.content || cs.content === "none" || cs.content === "normal") continue;
      todo.push([el, which]);
    }
  }
  const resolveCounter = (el, name) => {
    let root = el.parentElement;
    while (root && !getComputedStyle(root).counterReset.split(/\s+/).includes(name)) root = root.parentElement;
    root = root || document.body;
    const all = [...root.querySelectorAll("*")].filter(x => getComputedStyle(x, "::before").counterIncrement.split(/\s+/).includes(name));
    return all.indexOf(el) + 1;
  };
  const made = [];
  for (const [el, which] of todo) {
    const cs = getComputedStyle(el, "::" + which);
    let text = "";
    for (const m of cs.content.matchAll(/"((?:[^"\\]|\\.)*)"|counter\(([^)]+)\)/g)) {
      if (m[1] !== undefined) text += m[1].replace(/\\([0-9a-fA-F]{1,6})\s?/g, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/\\(.)/g, "$1");
      else text += resolveCounter(el, m[2].trim());
    }
    let style = ""; for (const p of props) { const v = cs.getPropertyValue(p); if (v) style += `${p}:${v};`; }
    made.push([el, which, text, style]);
  }
  for (const [el, which, text, style] of made) {
    const s = document.createElement("span"); s.style.cssText = style; s.textContent = text; s.dataset.pseudo = which;
    // a closed <details> hides its children except <summary>: host the pseudo inside the summary (same containing block)
    const host = el.tagName === "DETAILS" ? el.querySelector(":scope > summary") || el : el;
    if (which === "before") host.prepend(s); else host.append(s);
    el.setAttribute("data-no-" + which, "");
  }
  const st = document.createElement("style");
  st.textContent = "[data-no-before]::before{content:none!important}[data-no-after]::after{content:none!important}";
  document.head.append(st);
  return made.length;
}

function extract(oneScreen) {
  const vw = document.documentElement.clientWidth, vh = innerHeight;
  const out = { h: oneScreen ? vh : Math.max(Math.ceil(document.documentElement.scrollHeight), vh), items: [], links: [] };
  const col = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null;
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
    const a = p.length > 3 ? p[3] : 1; if (a === 0) return null;
    return { hex: "#" + p.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase(), a: +a.toFixed(3) };
  };
  const px = (v) => parseFloat(v) || 0;
  const R = (n) => Math.round(n * 10) / 10;
  const box = (r) => ({ x: R(r.left), y: R(r.top + scrollY), w: R(r.width), h: R(r.height) });
  // pinned layers: position:fixed, or the sticky site header (top:0) — Penpot "fix when scrolling"
  const isFixed = (el) => { for (let e = el; e && e !== document.body; e = e.parentElement) { const c = getComputedStyle(e); if (c.position === "fixed") return true; if (c.position === "sticky" && e.classList.contains("site-header")) return true; } return false; };
  const zkey = (el) => { const k = []; for (let e = el; e && e !== document.body; e = e.parentElement) { const c = getComputedStyle(e); if (c.position !== "static" && c.zIndex !== "auto") k.unshift(+c.zIndex); } return k; };
  const vis = (el) => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true });
  // clip rect from overflow:hidden/auto ancestors (scroll rows, cards)
  const clipOf = (el) => {
    let r = { l: -1e9, t: -1e9, r: 1e9, b: 1e9 };
    for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.overflowX !== "visible" || cs.overflowY !== "visible") { const b = e.getBoundingClientRect(); r = { l: Math.max(r.l, b.left), t: Math.max(r.t, b.top + scrollY), r: Math.min(r.r, b.right), b: Math.min(r.b, b.bottom + scrollY) }; }
    }
    return r;
  };
  const shadowOf = (s) => {
    if (!s || s === "none") return null;
    const m = s.match(/(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px(?:\s+(-?[\d.]+)px)?/); if (!m) return null;
    const c = col(m[1]); return c ? { c, x: +m[2], y: +m[3], b: +m[4], s: +(m[5] || 0) } : null;
  };
  for (const el of document.body.querySelectorAll("*")) {
    if (["SCRIPT", "STYLE", "BR"].includes(el.tagName) || !vis(el)) continue;
    const r = el.getBoundingClientRect(); if (r.width < 0.5 || r.height < 0.5) continue;
    const cs = getComputedStyle(el); const b = box(r); const clip = clipOf(el);
    if (b.x >= clip.r || b.x + b.w <= clip.l || b.y >= clip.b || b.y + b.h <= clip.t) continue; // fully clipped (scroll rows)
    const fx = isFixed(el); const lb = !!el.closest(".label"); const zk = zkey(el); const n0 = out.items.length;
    const bg = col(cs.backgroundColor);
    const grad = cs.backgroundImage.startsWith("linear-gradient") && !el.classList.contains("ph") ? cs.backgroundImage : null;
    const bw = ["Top", "Right", "Bottom", "Left"].map(s => px(cs["border" + s + "Width"]));
    const bc = ["Top", "Right", "Bottom", "Left"].map(s => col(cs["border" + s + "Color"]));
    const bs = ["Top", "Right", "Bottom", "Left"].map(s => cs["border" + s + "Style"]);
    const uniform = bw.every(w => w > 0 && w === bw[0]) && bc.every(c => c && bc[0] && c.hex === bc[0].hex) && bs.every(s => s === bs[0]);
    // computed radius keeps "50%" as a percentage: resolve it against the box, otherwise a 167px circle becomes a 50px rounded square
    const rv = cs.borderTopLeftRadius;
    const rad = Math.min(rv.endsWith("%") ? parseFloat(rv) / 100 * Math.min(b.w, b.h) : px(rv), b.h / 2, b.w / 2);
    const sh = shadowOf(cs.boxShadow);
    const op = +cs.opacity;
    // overflow:hidden + rounded ancestor (cards, tables): the browser clips the child's corners, Penpot does not,
    // so a square photo box would stick out over the card's rounded corner. Give the child the clip radius on the corners it shares.
    const rads = [0, 0, 0, 0];
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const ac = getComputedStyle(a);
      if (ac.overflowX === "visible" && ac.overflowY === "visible") continue;
      const A = box(a.getBoundingClientRect()); const abw = px(ac.borderTopWidth);
      const ar = [ac.borderTopLeftRadius, ac.borderTopRightRadius, ac.borderBottomRightRadius, ac.borderBottomLeftRadius].map(v => Math.max(0, (v.endsWith("%") ? parseFloat(v) / 100 * Math.min(A.w, A.h) : px(v)) - abw));
      if (!ar.some(v => v > 0)) continue;
      const tol = abw + 1.5, near = (p, q) => Math.abs(p - q) <= tol;
      const Lf = near(b.x, A.x), Rt = near(b.x + b.w, A.x + A.w), Tp = near(b.y, A.y), Bt = near(b.y + b.h, A.y + A.h);
      if (Lf && Tp) rads[0] = Math.max(rads[0], ar[0]); if (Rt && Tp) rads[1] = Math.max(rads[1], ar[1]);
      if (Rt && Bt) rads[2] = Math.max(rads[2], ar[2]); if (Lf && Bt) rads[3] = Math.max(rads[3], ar[3]);
    }
    const cap = Math.min(b.w, b.h) / 2; const rads2 = rads.map(v => Math.min(R(v), cap));
    const clipRads = rads2.some(v => v > rad + 0.5) ? rads2.map(v => Math.max(v, rad)) : null;
    if (el.tagName === "IMG") out.items.push({ k: "img", ...b, src: el.getAttribute("src"), rad, op, fx });  // overview covers: board thumbnails (border drawn on top by the rect below)
    if (bg || grad || uniform || sh) out.items.push({ k: "rect", ...b, bg, grad, op, rad, ...(clipRads ? { rads: clipRads } : {}), sh, fx, lb, stroke: uniform ? { c: bc[0], w: bw[0], s: bs[0] } : null });
    if (!uniform) bw.forEach((w, i) => {
      if (w > 0 && bc[i] && bs[i] !== "none" && bs[i] !== "hidden") {
        const s = [{ x: b.x, y: b.y, w: b.w, h: w }, { x: b.x + b.w - w, y: b.y, w, h: b.h }, { x: b.x, y: b.y + b.h - w, w: b.w, h: w }, { x: b.x, y: b.y, w, h: b.h }][i];
        out.items.push({ k: "line", ...s, c: bc[i], dashed: bs[i] === "dashed" || bs[i] === "dotted", vert: i % 2 === 1, fx });
      }
    });
    if (el.classList.contains("ph")) out.items.push({ k: "diag", ...b, rad, op: +getComputedStyle(el, "::before").opacity, fx });
    // text: one Penpot text per visual line (no re-wrapping in Penpot)
    for (const n of el.childNodes) {
      if (n.nodeType !== 3 || !n.textContent.trim()) continue;
      const txt = n.textContent; const words = [];
      const re = /\S+/g; let m;
      while ((m = re.exec(txt))) {
        const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length);
        const rc = rg.getClientRects()[0]; if (!rc || rc.width < 0.5) continue;
        words.push({ s: m.index, e: m.index + m[0].length, top: rc.top, l: rc.left, r: rc.right, t: rc.top, b: rc.bottom });
      }
      const lines = [];
      for (const w of words) { const L = lines[lines.length - 1]; if (L && Math.abs(L.top - w.top) < 2) { L.e = w.e; L.l = Math.min(L.l, w.l); L.r = Math.max(L.r, w.r); L.b = Math.max(L.b, w.b); } else lines.push({ ...w }); }
      const fs = px(cs.fontSize);
      for (const L of lines) {
        let s = txt.slice(L.s, L.e).replace(/\s+/g, " ");
        if (cs.textTransform === "uppercase") s = s.toUpperCase();
        const y = L.t + scrollY;
        if (L.l >= clip.r || L.r <= clip.l || y >= clip.b || L.b + scrollY <= clip.t) continue;
        out.items.push({ k: "text", s, x: R(L.l), y: R(y), w: R(L.r - L.l), h: R(L.b - L.t), fs, fw: +cs.fontWeight, c: col(cs.color), lh: +((L.b - L.t) / fs).toFixed(4), ls: cs.letterSpacing === "normal" ? 0 : px(cs.letterSpacing), u: cs.textDecorationLine.includes("underline"), fx, lb });
      }
    }
    for (let i = n0; i < out.items.length; i++) out.items[i].zk = zk;
    if (el.tagName === "SUMMARY" && el.classList.contains("burger")) out.links.push({ ...b, to: el.closest("details").open ? "__back" : "__menu", fx });
    if (el.tagName === "BUTTON" && el.classList.contains("tab") && el.id) out.links.push({ ...b, to: "admin-" + el.id, fx });
    if (el.tagName === "A") {
      const href = el.getAttribute("href") || ""; const mm = href.match(/^([a-z0-9-]+)\.html/);
      if (mm) out.links.push({ ...b, to: mm[1], fx });
    }
  }
  // paint order like the browser: stable sort by stacking key (missing levels = 0)
  const cmp = (a, b) => { for (let i = 0; i < Math.max(a.length, b.length); i++) { const d = (a[i] || 0) - (b[i] || 0); if (d) return d; } return 0; };
  out.items = out.items.map((it, i) => [it, i]).sort((x, y) => cmp(x[0].zk || [], y[0].zk || []) || x[1] - y[1]).map(x => x[0]);
  return out;
}

module.exports = { prepare, extract };
if (require.main === module) (async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  const result = [];
  // optional: node extract.cjs "about|plan" re-extracts only those page keys and merges them into the existing pages.json
  const only = process.argv[2] ? process.argv[2].split("|") : null;
  for (const j of only ? JOBS.filter(j => only.includes(j.key)) : JOBS) {
    await page.setViewport({ width: j.w, height: j.h });
    await page.goto(`http://localhost:5173/${j.file || j.key}.html?n=${Date.now()}`, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: ".mbar.is-armed{transform:none!important;visibility:visible!important}" });  // the mirror is static: always draw the bar on pages that have one
    if (j.tab) await page.evaluate(t => document.getElementById(t).click(), j.tab);
    if (j.menuOpen) await page.evaluate(() => document.querySelector("details.menu").setAttribute("open", ""));
    const n = await page.evaluate(prepare);
    const oneScreen = j.oneScreen || /^(state-|unavailable)/.test(j.key);
    const data = await page.evaluate(extract, oneScreen);
    result.push({ ...j, ...data });
    console.log(j.group.padEnd(8), j.name.padEnd(46), "h", String(data.h).padStart(5), "items", String(data.items.length).padStart(4), "links", data.links.length, "pseudo", n);
  }
  let out = result;
  if (only) { const byName = Object.fromEntries(result.map(r => [r.name, r])); out = JSON.parse(fs.readFileSync(__dirname + "/pages.json")).map(o => byName[o.name] || o); }
  fs.writeFileSync(__dirname + "/pages.json", JSON.stringify(out));
  await browser.close();
})();
