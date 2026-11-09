// v2: render wireframes in headless Chrome and dump exactly what is visible:
// boxes, borders, shadows, placeholder diagonals, pseudo-elements (materialised), text split into visual lines, links, fixed layers.
const puppeteer = require("puppeteer-core");
const fs = require("fs");

const MAIN = [
  ["home", "01 Home"], ["raja-ampat", "02 Raja Ampat"], ["north-sulawesi", "03 North Sulawesi"], ["yachts", "04 Private Yachts"],
  ["journeys", "05 Journeys"], ["journey-raja-ampat-lodge", "06 Journey · RA lodge"], ["journey-raja-ampat-phinisi", "07 Journey · RA phinisi"],
  ["journey-lembeh-bunaken", "08 Journey · Lembeh & Bunaken"], ["journey-sangihe-siau", "09 Journey · Sangihe & Siau"],
  ["stories", "10 Stories"], ["about", "11 About"], ["advisors", "12 For Travel Advisors"], ["plan", "13 Plan Your Journey"],
  ["thank-you", "14 Thank-you · traveller"], ["thank-you-advisor", "15 Thank-you · advisor"],
];
const SERVICE = [
  ["privacy", "16 Privacy & cookies"], ["terms", "17 Booking terms"], ["404", "18 404 · Page not found"], ["unavailable", "19 Temporarily unavailable"],
  ["state-cookies", "S1 State · Cookie banner"], ["state-cookie-settings", "S2 State · Cookie settings"], ["state-form-errors", "S3 State · Form errors"], ["state-form-failed", "S4 State · Sending failed"],
];
const EMAILS = [["email-traveller", "E1 Email · Auto-reply to traveller"], ["email-advisor", "E2 Email · Auto-reply to advisor"], ["email-owner", "E3 Email · New enquiry alert (owner)"]];
const ADMIN = [["admin-content", "A1 Admin · Content editor"], ["admin-prices", "A2 Admin · Prices & seasons"], ["admin-leads", "A3 Admin · Leads list"], ["admin-lead", "A4 Admin · Lead card"]];

const JOBS = [
  ...[...MAIN, ...SERVICE].map(([k, n]) => ({ group: "desktop", key: k, name: n + " · Desktop", w: 1440, h: 900 })),
  ...[...MAIN, ...SERVICE].map(([k, n]) => ({ group: "mobile", key: k, name: n + " · Mobile", w: 390, h: 844 })),
  { group: "mobile", key: "home", name: "M1 Mobile menu (open) · Mobile", w: 390, h: 844, menuOpen: true, oneScreen: true },
  ...EMAILS.map(([k, n]) => ({ group: "emails", key: k, name: n + " · Desktop", w: 760, h: 900 })),
  ...EMAILS.map(([k, n]) => ({ group: "emails", key: k, name: n + " · Mobile", w: 390, h: 844 })),
  { group: "emails", key: "link-preview", name: "P1 Link previews", w: 1440, h: 900 },
  ...ADMIN.map(([k, n]) => ({ group: "admin", key: k, name: n, w: 1440, h: 900 })),
];

function prepare() {
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
    const rad = Math.min(px(cs.borderTopLeftRadius), b.h / 2, b.w / 2);
    const sh = shadowOf(cs.boxShadow);
    const op = +cs.opacity;
    if (bg || grad || uniform || sh) out.items.push({ k: "rect", ...b, bg, grad, op, rad, sh, fx, lb, stroke: uniform ? { c: bc[0], w: bw[0], s: bs[0] } : null });
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

(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  const result = [];
  for (const j of JOBS) {
    await page.setViewport({ width: j.w, height: j.h });
    await page.goto(`http://localhost:5173/${j.key}.html?n=${Date.now()}`, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    if (j.menuOpen) await page.evaluate(() => document.querySelector("details.menu").setAttribute("open", ""));
    const n = await page.evaluate(prepare);
    const oneScreen = j.oneScreen || /^(state-|unavailable)/.test(j.key);
    const data = await page.evaluate(extract, oneScreen);
    result.push({ ...j, ...data });
    console.log(j.group.padEnd(8), j.name.padEnd(46), "h", String(data.h).padStart(5), "items", String(data.items.length).padStart(4), "links", data.links.length, "pseudo", n);
  }
  fs.writeFileSync(__dirname + "/pages.json", JSON.stringify(result));
  await browser.close();
})();
