// Push pages.json → Penpot. One Penpot page per group, cover board, row titles, pinned layers, links, flows.
// Usage: node push.mjs setup | draw | resume | links | covers | redo "<board>|<board>" | labels | fixdiag | titles | verify
import fs from "node:fs";
const URL_ = "http://localhost:4401/mcp";
let sid = null, rid = 10;
async function rpc(body) {
  const res = await fetch(URL_, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...(sid ? { "mcp-session-id": sid } : {}) }, body: JSON.stringify(body) });
  sid = res.headers.get("mcp-session-id") || sid;
  const t = await res.text(); if (!t) return null;
  if ((res.headers.get("content-type") || "").includes("event-stream")) { const d = t.split("\n").filter(l => l.startsWith("data:")).map(l => l.slice(5).trim()); return d.length ? JSON.parse(d[d.length - 1]) : null; }
  return JSON.parse(t);
}
async function run(code) {
  const out = await rpc({ jsonrpc: "2.0", id: rid++, method: "tools/call", params: { name: "execute_code", arguments: { code } } });
  const txt = (out?.result?.content || []).map(c => c.text).join("\n");
  if (out?.error || out?.result?.isError || txt.startsWith("Tool execution failed")) throw new Error(txt || JSON.stringify(out?.error));
  try { return JSON.parse(txt).result; } catch { return txt; }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function ping() { for (let i = 0; i < 60; i++) { try { if (await run("return 1;") === 1) return; } catch { } await sleep(5000); } throw new Error("plugin not responding"); }
async function safe(code, label) { try { return await run(code); } catch (e) { console.log(`  ! ${label}: ${String(e.message).slice(0, 100)}`); await ping(); return null; } }

async function switchTo(name) {
  await safe(LIB, "lib"); // storage is empty after a plugin reconnect
  for (let i = 0; i < 10; i++) {
    const r = await safe(`await storage.page(${JSON.stringify(name)}); return penpot.currentPage.name;`, "switch " + name);
    if (r === name) return true;
    const cur = await safe("return penpot.currentPage.name;", "current page");
    if (cur === name) return true;
  }
  console.log("cannot switch to", name); return false;
}
await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "push2", version: "1" } } });
await rpc({ jsonrpc: "2.0", method: "notifications/initialized" });

const boards = JSON.parse(fs.readFileSync(new URL("./pages.json", import.meta.url)));
const GROUPS = [
  { g: "desktop", page: "Desktop", gap: 160, rows: [b => /^\d\d /.test(b.name) && +b.name.slice(0, 2) <= 10, b => !(/^\d\d /.test(b.name) && +b.name.slice(0, 2) <= 10)], rowTitles: ["Website pages", "Service pages & states"] },
  { g: "mobile", page: "Mobile", gap: 110, rows: [b => /^\d\d /.test(b.name) && +b.name.slice(0, 2) <= 10, b => !(/^\d\d /.test(b.name) && +b.name.slice(0, 2) <= 10)], rowTitles: ["Website pages · phone", "Service pages, states & menu · phone"] },
  { g: "emails", page: "Emails & previews", gap: 160, rows: [b => b.w === 760, b => b.w === 390, b => b.key === "link-preview"], rowTitles: ["Emails · desktop mail client", "Emails · phone", "Link previews"] },
  { g: "admin", page: "Admin", gap: 160, rows: [() => true], rowTitles: ["Admin · one screen, four tabs"] },
];
const idsFile = new URL("./board-ids.json", import.meta.url);
const R = n => Math.round(n * 10) / 10;

// ---------- layout plan: positions per board ----------
function plan() {
  const out = [];
  for (const G of GROUPS) {
    const list = boards.filter(b => b.group === G.g);
    let y = 0;
    G.rows.forEach((pred, ri) => {
      const row = list.filter(pred); let x = 1600, maxH = 0;
      for (const b of row) { out.push({ ...b, px: x, py: y + 300, pageName: G.page, row: ri }); x += b.w + G.gap; maxH = Math.max(maxH, b.h); }
      out.push({ title: G.rowTitles[ri], pageName: G.page, px: 1600, py: y + 60 });
      y += 300 + maxH + 500;
    });
  }
  return out;
}

const LIB = `
storage.font = penpot.fonts.all.find(f => f.fontFamily === "Inter");
storage.B = storage.B || {};
storage.page = async (name) => {
  let p = penpot.currentFile.pages.find(p => p.name === name); if (!p) { p = penpot.createPage(); p.name = name; }
  if (penpot.currentPage.id !== p.id) { penpot.openPage(p); for (let i = 0; i < 150 && penpot.currentPage.id !== p.id; i++) await new Promise(r => setTimeout(r, 100)); await new Promise(r => setTimeout(r, 500)); }
  if (penpot.currentPage.id !== p.id) throw new Error("page switch failed: " + name);
  storage.B = {}; return p;
};
storage.board = (id) => storage.B[id] || (storage.B[id] = penpot.currentPage.root.children.find(s => s.id === id));
storage.draw = (boardId, items) => {
  const bd = storage.board(boardId); const font = storage.font; let n = 0; const errs = [];
  for (const it of items) { try {
    let s;
    if (it.k === "r") {
      s = penpot.createRectangle(); s.name = it.n || "Box"; s.resize(Math.max(it.w, 0.5), Math.max(it.h, 0.5));
      s.fills = it.f; if (it.st) s.strokes = it.st; if (it.rad) s.borderRadius = it.rad; if (it.rads) { s.borderRadiusTopLeft = it.rads[0]; s.borderRadiusTopRight = it.rads[1]; s.borderRadiusBottomRight = it.rads[2]; s.borderRadiusBottomLeft = it.rads[3]; } if (it.op < 1) s.opacity = it.op; if (it.sh) s.shadows = it.sh;
    } else if (it.k === "i") {
      s = penpot.createRectangle(); s.name = "Thumbnail"; s.resize(Math.max(it.w, 0.5), Math.max(it.h, 0.5));
      s.fills = [{ fillOpacity: 1, fillImage: storage.imgs[it.src] }]; if (it.rad) s.borderRadius = it.rad;
    } else if (it.k === "p") {
      s = penpot.createPath(); s.name = it.n; s.content = it.d; s.fills = []; s.strokes = it.st; if (it.op < 1) s.opacity = it.op;
    } else if (it.k === "v") {
      s = penpot.createShapeFromSvg(it.svg); if (!s) continue; s.name = "Icon"; if (it.op < 1) s.opacity = it.op;
    } else if (it.k === "t") {
      s = penpot.createText(it.s); if (!s) continue;
      const v = font.variants.find(x => x.fontWeight == String(it.fw) && x.fontStyle === "normal") || font.variants.find(x => x.fontWeight == "400");
      font.applyToText(s, v); s.fontSize = String(it.fs); s.lineHeight = String(it.lh); if (it.ls) s.letterSpacing = String(it.ls);
      s.fills = [{ fillColor: it.c, fillOpacity: it.ca }]; if (it.u) s.textDecoration = "underline";
      s.growType = "auto-width"; s.name = it.s.replace(/\\//g, " ").trim().slice(0, 40) || "Text";
    }
    bd.appendChild(s); s.x = bd.x + it.x; s.y = bd.y + it.y; if (it.rot) s.rotate(it.rot); if (it.fx) s.fixedWhenScrolling = true; n++;
  } catch (e) { errs.push([it.k, (it.s || it.n || "").slice(0, 24), String(e.message || e).slice(0, 70)]); } }
  return { n, errs };
};
storage.link = (boardId, links, targets) => {
  const bd = storage.board(boardId); let n = 0;
  for (const l of links) {
    const action = l.to === "__back" ? { type: "previous-screen" } : (() => { const d = storage.board(targets[l.to]); return d ? { type: "navigate-to", destination: d } : null; })();
    if (!action) continue;
    const r = penpot.createRectangle(); r.name = "Link → " + l.to.replace("__", ""); r.resize(Math.max(l.w, 4), Math.max(l.h, 4)); r.fills = [{ fillColor: "#FFFFFF", fillOpacity: 0.01 }];
    bd.appendChild(r); r.x = bd.x + l.x; r.y = bd.y + l.y; if (l.fx) r.fixedWhenScrolling = true;
    r.addInteraction("click", action); n++;
  }
  return n;
};
return "lib ok";`;

// ---------- spec conversion ----------
const gradFill = (g) => {
  const cols = [...g.matchAll(/rgba?\(([^)]+)\)\s*([\d.]+%)?/g)].map(m => { const p = m[1].split(/[\s,\/]+/).map(Number); return { hex: "#" + p.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase(), a: p.length > 3 ? p[3] : 1, off: m[2] ? parseFloat(m[2]) / 100 : null }; });
  const dir = (g.match(/linear-gradient\(\s*(to [a-z ]+)/) || [])[1] || "to bottom";
  const deg = (g.match(/linear-gradient\(\s*(-?[\d.]+)deg/) || [])[1];
  if (deg !== undefined) {  // v5 placeholders: CSS angle (0deg = up, clockwise); the line runs corner to corner like in CSS
    const a = deg * Math.PI / 180, sx = Math.sin(a), sy = -Math.cos(a), k = (Math.abs(sx) + Math.abs(sy)) / 2;
    const st = [0.5 - sx * k, 0.5 - sy * k, 0.5 + sx * k, 0.5 + sy * k].map(x => Math.round(x * 1000) / 1000);
    return [{ fillOpacity: 1, fillColorGradient: { type: "linear", startX: st[0], startY: st[1], endX: st[2], endY: st[3], width: 1, stops: cols.map((c, i) => ({ color: c.hex, opacity: c.a, offset: c.off ?? (cols.length > 1 ? i / (cols.length - 1) : 0) })) } }];
  }
  const v = { "to top": [0.5, 1, 0.5, 0], "to bottom": [0.5, 0, 0.5, 1], "to left": [1, 0.5, 0, 0.5], "to right": [0, 0.5, 1, 0.5] }[dir] || [0.5, 0, 0.5, 1];
  return [{ fillOpacity: 1, fillColorGradient: { type: "linear", startX: v[0], startY: v[1], endX: v[2], endY: v[3], width: 1, stops: cols.map((c, i) => ({ color: c.hex, opacity: c.a, offset: c.off ?? (cols.length > 1 ? i / (cols.length - 1) : 0) })) } }];
};
function specs(b) {
  const out = [];
  for (const it of b.items) {
    if (b.oneScreen && it.y >= b.h) continue;
    if (it.k === "rect") out.push({ k: "r", x: it.x, y: it.y, w: it.w, h: it.h, f: it.grad ? gradFill(it.grad) : it.bg ? [{ fillColor: it.bg.hex, fillOpacity: it.bg.a }] : [], st: it.stroke ? [{ strokeColor: it.stroke.c.hex, strokeOpacity: it.stroke.c.a, strokeWidth: it.stroke.w, strokeAlignment: "inner", strokeStyle: it.stroke.s === "dashed" ? "dashed" : it.stroke.s === "dotted" ? "dotted" : "solid" }] : null, rad: R(it.rad || 0), rads: it.rads, rot: it.rot, op: it.op, sh: it.sh ? [{ style: "drop-shadow", offsetX: it.sh.x, offsetY: it.sh.y, blur: it.sh.b, spread: it.sh.s, hidden: false, color: { color: it.sh.c.hex, opacity: it.sh.c.a } }] : null, fx: it.fx });
    else if (it.k === "line" && !it.dashed) out.push({ k: "r", n: "Rule", x: it.x, y: it.y, w: Math.max(it.w, 1), h: Math.max(it.h, 1), f: [{ fillColor: it.c.hex, fillOpacity: it.c.a }], st: null, rad: 0, op: 1, fx: it.fx });
    else if (it.k === "line") { const t = it.vert ? it.w : it.h; out.push({ k: "p", n: "Dashed rule", x: it.x, y: it.y, d: it.vert ? `M${t / 2} 0 L${t / 2} ${it.h}` : `M0 ${t / 2} L${it.w} ${t / 2}`, st: [{ strokeColor: it.c.hex, strokeOpacity: it.c.a, strokeWidth: t, strokeAlignment: "center", strokeStyle: "dashed" }], op: 1, fx: it.fx }); }
    else if (it.k === "diag") { const ins = R((it.rad || 0) * (1 - Math.SQRT1_2)), w = R(it.w - 2 * ins), h = R(it.h - 2 * ins); for (const d of [`M0 ${h} L${w} 0`, `M0 0 L${w} ${h}`]) out.push({ k: "p", n: "Placeholder diagonal", x: R(it.x + ins), y: R(it.y + ins), d, st: [{ strokeColor: "#D0D0D0", strokeOpacity: 1, strokeWidth: 1, strokeAlignment: "center", strokeStyle: "solid" }], op: it.op, fx: it.fx }); }
    else if (it.k === "img") out.push({ k: "i", x: it.x, y: it.y, w: it.w, h: it.h, src: it.src, rad: R(it.rad || 0), fx: it.fx });
    else if (it.k === "icon") { const m = (it.tr || "").match(/matrix\(([-\d.e]+), ([-\d.e]+)/); out.push({ k: "v", x: it.x, y: it.y, svg: it.svg, op: it.op, rot: m ? Math.round(Math.atan2(+m[2], +m[1]) * 180 / Math.PI) : 0, fx: it.fx }); }
    else if (it.k === "text") out.push({ k: "t", s: it.s, x: it.x, y: it.y, fs: it.fs, fw: it.fw, c: it.c ? it.c.hex : "#1F1F1F", ca: it.c ? it.c.a : 1, lh: it.lh, ls: it.ls, u: it.u, fx: it.fx });
  }
  return out;
}

// Penpot View mode fires a click interaction on pointer-DOWN, so on a phone every swipe that starts on a hotspot
// navigates away (8 Oct 2026: viewers kept landing on Plan). Phone boards therefore get no hotspot on the pinned
// bottom bar, and a link taller than 80 px (a whole card) is cut to its title line (300x48), or dropped if it has none.
function touchSafe(b) {
  // 8 Oct 2026, decided with the user: content boards carry no links at all. Penpot is for viewing and comments;
  // clicking through the site happens in the HTML prototype. Covers keep their own links (drawn by newcovers, not here).
  return [];
}
const mode = process.argv[2], only = process.argv[3];
const P = plan();

if (mode === "setup") {
  await ping(); console.log(await run(LIB));
  const ids = fs.existsSync(idsFile) && only ? JSON.parse(fs.readFileSync(idsFile)) : {};
  for (const G of GROUPS) {
    if (only && !only.split(",").includes(G.page)) continue;
    if (!(await switchTo(G.page))) { console.log("cannot switch to", G.page); continue; }
    await safe(LIB, "lib");
    // rename Page 1 → Desktop the first time, wipe old boards on that page
    console.log(G.page, await safe(`
      if (${JSON.stringify(G.page)} === "Desktop") { const p1 = penpot.currentFile.pages.find(p => p.name === "Page 1"); if (p1) p1.name = "Desktop"; }
      const pg = await storage.page(${JSON.stringify(G.page)});
      for (const s of [...penpot.currentPage.root.children]) s.remove();
      for (const f of [...penpot.currentPage.flows]) penpot.currentPage.removeFlow(f);
      return penpot.currentPage.name;`, "wipe " + G.page));
    for (let i = 0; i < 20; i++) { const n = await safe("return penpot.currentPage.root.children.length;", "count"); if (n === 0) break; await sleep(3000); }
    // boards in reverse so View mode lists the cover, then pages in order
    const list = P.filter(b => b.pageName === G.page && !b.title).reverse();
    for (const b of list) {
      ids[b.name] = await run(`const b = penpot.createBoard(); b.name = ${JSON.stringify(b.name)}; b.resize(${b.w}, ${b.h}); b.x = ${b.px}; b.y = ${b.py};
        b.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }]; b.clipContent = true; storage.B[b.id] = b; return b.id;`);
    }
    // row titles on the canvas
    for (const t of P.filter(b => b.pageName === G.page && b.title)) await run(`const t = penpot.createText(${JSON.stringify(t.title)}); storage.font.applyToText(t, storage.font.variants.find(v => v.fontWeight == "700" && v.fontStyle === "normal")); t.fontSize = "96"; t.fills = [{ fillColor: "#1F1F1F", fillOpacity: 1 }]; t.growType = "auto-width"; t.x = ${t.px}; t.y = ${t.py}; t.name = "Row title"; return 1;`);
    fs.writeFileSync(idsFile, JSON.stringify(ids, null, 1));
    console.log("  boards", list.length);
  }
}

const ids = fs.existsSync(idsFile) ? JSON.parse(fs.readFileSync(idsFile)) : {};
if (mode === "draw") {
  await ping(); await run(LIB);
  for (const G of GROUPS) {
    const list = P.filter(b => b.pageName === G.page && !b.title && (!only || b.name.includes(only)));
    if (!list.length) continue;
    await run(`await storage.page(${JSON.stringify(G.page)}); return penpot.currentPage.name;`);
    for (const b of list) {
      const items = specs(b); let done = 0; const errs = [];
      for (let i = 0; i < items.length; i += 40) {
        const r = await safe(`return storage.draw(${JSON.stringify(ids[b.name])}, ${JSON.stringify(items.slice(i, i + 40))});`, `${b.name} #${i / 40}`);
        if (r && typeof r === "object") { done += r.n; errs.push(...r.errs); }
      }
      console.log(b.name.padEnd(46), "shapes", items.length, "drawn", done, errs.length ? "ERRS " + JSON.stringify(errs.slice(0, 3)) : "");
    }
  }
}
if (mode === "links") {
  await ping(); await run(LIB);
  for (const G of GROUPS) {
    if (!(await switchTo(G.page))) continue; await safe(LIB, "lib");
    const list = P.filter(b => b.pageName === G.page && !b.title);
    const targets = {}; for (const b of list) if (!targets[b.key] || b.name.match(/^\d\d /)) targets[b.key] = ids[b.name];
    const menu = list.find(b => b.menuOpen); if (menu) targets.__menu = ids[menu.name];
    for (const b of list) {
      const links = touchSafe(b).filter(l => targets[l.to] || l.to === "__back").map(l => ({ x: R(l.x), y: R(l.y), w: R(l.w), h: R(l.h), to: l.to, fx: l.fx }));
      if (!links.length) continue;
      const have = await safe(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); return bd.children.filter(c => c.name.startsWith("Link")).length;`, "count links");
      if (have === links.length) { console.log(b.name.padEnd(46), "links complete", have); continue; }
      if (have) await safe(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); for (const c of bd.children.filter(c => c.name.startsWith("Link"))) c.remove(); return 1;`, "clear links");
      const r = await safe(`return storage.link(${JSON.stringify(ids[b.name])}, ${JSON.stringify(links)}, ${JSON.stringify(targets)});`, b.name + " links");
      const after = await safe(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); return bd.children.filter(c => c.name.startsWith("Link")).length;`, "count links");
      console.log(b.name.padEnd(46), "links", links.length, "now", after, after === links.length ? "OK" : "<<");
    }
  }
}
if (mode === "resume") {
  // verify each board; draw empty ones, rebuild partial ones, skip complete ones
  await ping(); await run(LIB);
  for (const G of GROUPS) {
    if (only && G.page !== only) continue;
    let sw = null; for (let i = 0; i < 5 && sw !== G.page; i++) { sw = await safe(`await storage.page(${JSON.stringify(G.page)}); return penpot.currentPage.name;`, "switch " + G.page); }
    if (sw !== G.page) { console.log("cannot switch to", G.page); continue; }
    await run(LIB);
    for (const b of P.filter(b => b.pageName === G.page && !b.title)) {
      const items = specs(b);
      const cnt = await safe(`const b = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); return b ? b.children.length : -1;`, "count");
      if (cnt === null) { console.log(b.name.padEnd(46), "count timed out, skipped"); continue; }
      if (cnt === items.length) { console.log(b.name.padEnd(46), "complete", cnt); continue; }
      if (cnt !== 0) {
        ids[b.name] = await safe(`const old = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); if (old) old.remove();
          const n = penpot.createBoard(); n.name = ${JSON.stringify(b.name)}; n.resize(${b.w}, ${b.h}); n.x = ${b.px}; n.y = ${b.py};
          n.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }]; n.clipContent = true; storage.B[n.id] = n; return n.id;`, "rebuild " + b.name);
        fs.writeFileSync(idsFile, JSON.stringify(ids, null, 1));
      }
      let done = 0; const errs = [];
      for (let i = 0; i < items.length; i += 25) {
        const r = await safe(`return storage.draw(${JSON.stringify(ids[b.name])}, ${JSON.stringify(items.slice(i, i + 25))});`, `${b.name} #${i / 25}`);
        if (r && typeof r === "object") { done += r.n; errs.push(...r.errs); }
      }
      const after = await safe(`const b = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); return b ? b.children.length : -1;`, "count");
      console.log(b.name.padEnd(46), cnt === 0 ? "drawn" : "rebuilt (was " + cnt + ")", "now", after, "of", items.length, after === items.length ? "OK" : "<<", errs.length ? "ERRS " + JSON.stringify(errs.slice(0, 3)) : "");
    }
  }
}
if (mode === "covers") {
  await ping(); await run(LIB);
  const COMMON = [
    "Серый блок с подписью: здесь будет фото или видео, в подписи сказано, какое именно",
    "Серые полосы: здесь будет текст",
    "Подписи вроде «01 · Hero»: номера блоков, ссылайся на них в комментариях",
    "Цветов, шрифтов и финальных текстов пока нет: это этап 2, дизайн",
  ];
  const COVERS = {
    "Desktop": { sub: "Website · desktop (1440 px)", start: "01 Home · Desktop", notes: ["Press ▶ (top right) and click through like a real site.", "Row 1: the 10 website pages. Row 2: privacy, booking terms, 404, maintenance, cookie banner and form states.", "Other pages of this file (top left): Mobile · Emails & previews · Admin.", "Not clickable on purpose: WhatsApp, email, Instagram, “Read on Google”, “View all photos” and jumps within a page (FAQ, forms). The days slider works in the HTML prototype; here it shows 7 days."] },
    "Mobile": { sub: "Website · phone (390 px)", start: "01 Home · Mobile", notes: ["Press ▶ and scroll like on a phone. ☰ opens the menu.", "The bottom bar (Plan your trip · WhatsApp) is not drawn here: Penpot cannot pin it to the screen bottom. See it in the live HTML prototype.", "Row 1: the 10 pages. Row 2: service pages, states and the open menu.", "Not clickable on purpose: WhatsApp, email, Instagram, “Read on Google”, “View all photos” and jumps within a page (FAQ, forms). The days slider works in the HTML prototype; here it shows 7 days."] },
    "Emails & previews": { sub: "Письма, которые сайт отправляет сам", count: "3 письма для компьютера и телефона и превью ссылок: около 15 экранов", startY: 800, start: "E1 Email · Auto-reply to traveller · Desktop", leftTitle: "Что здесь", common: ["Когда человек отправляет заявку на сайте, сайт сам отправляет письма. Здесь видно, как они будут выглядеть.", "Писем три: подтверждение путешественнику, подтверждение турагенту и уведомление тебе о новой заявке.", "Каждое письмо показано два раза: как оно выглядит в почте на компьютере и на телефоне.", "Последний экран, Link previews: как выглядит ссылка на сайт, когда её пересылают в WhatsApp или соцсетях и когда сайт находят в Google."], rightTitle: "Как смотреть", notes: ["Нажми Start или листай стрелками по краям экрана.", "Над каждым письмом есть плашка на русском: кто его получает, когда и зачем. Сама плашка в письмо не входит.", "Серые полосы: здесь будет текст письма. Его напишем на этапе дизайна.", "Кнопки в письмах здесь не нажимаются: это картинка письма, а не настоящая почта."] },
    "Admin": { sub: "Админка: одна страница, четыре вкладки", count: "около 5 экранов", start: "A1 Admin · Enquiries", notes: ["Enquiries: сюда приходит каждая заявка с пометкой, откуда она; этапы New → Contacted → Proposal → Won / Lost, заметки, WhatsApp и почта в одно касание.", "Reviews: добавить, скрыть или удалить отзыв и отметить направление. Photos & video: заменить или добавить фото на странице, видео по ссылке YouTube или Vimeo.", "Prices: цена за день для каждого уровня, её можно снизить начиная с любого дня. Сайт сам складывает дни для ползунка.", "Страницы, тексты и новые направления меняем мы. Эти экраны нужны, чтобы согласовать разделы и поля, а не финальный вид."] },
  };
  const coverIds = {};
  for (const G of GROUPS) {
    const C = COVERS[G.page];
    if (only && !only.split(",").includes(G.page)) continue;
    if (G.page === "Mobile") { console.log("cover Mobile: skipped, built by `node phone-cover.cjs && node push.mjs phonecover` (390 px phone cover with the Fill tip)"); continue; }
    if (!(await switchTo(G.page))) continue; await safe(LIB, "lib");
    coverIds[G.page] = await safe(`
      for (const s of [...penpot.currentPage.root.children]) if (s.name.startsWith("00 Cover")) s.remove();
      const f = storage.font; const V = w => f.variants.find(v => v.fontWeight == String(w) && v.fontStyle === "normal");
      const b = penpot.createBoard(); b.name = "00 Cover · ${G.page}"; b.resize(1440, 900); b.x = 0; b.y = 300; b.fills = [{ fillColor: "#FFFFFF", fillOpacity: 1 }]; b.clipContent = true;
      const T = (s, size, w, color, x, y, maxW) => { const t = penpot.createText(s); f.applyToText(t, V(w)); t.fontSize = String(size); t.lineHeight = "1.35"; t.fills = [{ fillColor: color, fillOpacity: 1 }]; b.appendChild(t); if (maxW) { t.resize(maxW, size * 1.4); t.growType = "auto-height"; } else t.growType = "auto-width"; t.x = b.x + x; t.y = b.y + y; t.name = s.slice(0, 40).replace(/\\//g, " "); return t; };
      const box = (x, y, w, h, fill, stroke, rad) => { const r = penpot.createRectangle(); r.resize(w, h); r.fills = fill ? [{ fillColor: fill, fillOpacity: 1 }] : []; if (stroke) r.strokes = [{ strokeColor: stroke, strokeOpacity: 1, strokeWidth: 1, strokeAlignment: "inner", strokeStyle: "solid" }]; if (rad) r.borderRadius = rad; b.appendChild(r); r.x = b.x + x; r.y = b.y + y; return r; };
      box(0, 0, 1440, 8, "#2F2F2F");
      T("1000 Islands Travel", 72, 700, "#1F1F1F", 120, 96, 1200);
      T(${JSON.stringify(C.sub)}, 32, 600, "#1F1F1F", 120, 196, 1200);
      T("Этап 1: структура и переходы · v5 · 7 октября 2026", 18, 400, "#616161", 120, 256, 1200);
      box(120, 312, 1200, 1, "#D0D0D0");
      T("Как читать макет", 22, 600, "#1F1F1F", 120, 352, 540);
      const legend = ${JSON.stringify(COMMON)};
      legend.forEach((s, i) => T(s, 18, 400, "#4D4D4D", 120, 400 + i * 40, 540));
      T("Эта страница", 22, 600, "#1F1F1F", 760, 352, 560);
      const notes = ${JSON.stringify(C.notes)};
      let y = 400; for (const s of notes) { const t = T(s, 18, 400, "#4D4D4D", 760, y, 560); y += Math.ceil(s.length / 52) * 26 + 22; }
      // start button
      const btn = box(120, 760, 260, 56, "#2F2F2F", null, 8); btn.name = "Start button";
      const bt = T("Start: первый экран →", 16, 600, "#FFFFFF", 144, 777, 236);
      const dest = penpot.currentPage.root.children.find(s => s.name === ${JSON.stringify(C.start)});
      if (dest) { btn.addInteraction("click", { type: "navigate-to", destination: dest }); bt.addInteraction("click", { type: "navigate-to", destination: dest }); }
      for (const fl of [...penpot.currentPage.flows]) penpot.currentPage.removeFlow(fl);
      if (dest) penpot.currentPage.createFlow(${JSON.stringify(G.page === "Admin" ? "Admin" : G.page === "Emails & previews" ? "Emails" : "Website · " + G.page)}, dest);
      return b.id;`, "cover " + G.page);
    console.log("cover", G.page, coverIds[G.page]);
  }
}
if (mode === "redo") {
  // redraw named boards in place (keeps board ids, so links pointing at them stay valid)
  await ping();
  const names = only.split("|");
  for (const G of GROUPS) {
    const list = P.filter(b => b.pageName === G.page && !b.title && names.includes(b.name));
    if (!list.length) continue;
    if (!(await switchTo(G.page))) continue; await safe(LIB, "lib");
    const all = P.filter(b => b.pageName === G.page && !b.title);
    const targets = {}; for (const b of all) if (!targets[b.key] || b.name.match(/^\d\d /)) targets[b.key] = ids[b.name];
    const menu = all.find(b => b.menuOpen); if (menu) targets.__menu = ids[menu.name];
    for (const b of list) {
      // clear the board and resize it to the new page height (HTML changes can make a page shorter or taller)
      await safe(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); for (const c of [...bd.children]) c.remove(); bd.resize(${b.w}, ${b.h}); return bd.children.length;`, "clear " + b.name);
      const items = specs(b); let done = 0;
      for (let i = 0; i < items.length; i += 25) { const r = await safe(`return storage.draw(${JSON.stringify(ids[b.name])}, ${JSON.stringify(items.slice(i, i + 25))});`, `${b.name} #${i / 25}`); if (r && typeof r === "object") done += r.n; }
      const links = touchSafe(b).filter(l => targets[l.to] || l.to === "__back").map(l => ({ x: R(l.x), y: R(l.y), w: R(l.w), h: R(l.h), to: l.to, fx: l.fx }));
      await safe(`return storage.link(${JSON.stringify(ids[b.name])}, ${JSON.stringify(links)}, ${JSON.stringify(targets)});`, b.name + " links");
      const cnt = await safe(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); return [bd.children.filter(c => !c.name.startsWith("Link")).length, bd.children.filter(c => c.name.startsWith("Link")).length];`, "count");
      console.log(b.name.padEnd(46), "shapes", items.length, "links", links.length, "now", JSON.stringify(cnt), cnt && cnt[0] === items.length && cnt[1] === links.length ? "OK" : "<<");
    }
  }
}
if (mode === "fixdiag") {
  // replace placeholder diagonals on rounded placeholders (avatars) with inset ones that stay inside the circle
  await ping();
  for (const G of GROUPS) {
    const list = P.filter(b => b.pageName === G.page && !b.title && b.items.some(i => i.k === "diag" && i.rad > 2));
    if (!list.length) continue;
    if (!(await switchTo(G.page))) continue; await safe(LIB, "lib");
    for (const b of list) {
      const D = b.items.filter(i => i.k === "diag" && i.rad > 2 && !(b.oneScreen && i.y >= b.h)).map(i => { const ins = R(i.rad * (1 - Math.SQRT1_2)); return { x: i.x, y: i.y, ins, w: R(i.w - 2 * ins), h: R(i.h - 2 * ins), op: i.op, fx: i.fx }; });
      const r = await safe(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); let n = 0;
        for (const d of ${JSON.stringify(D)}) {
          const kids = bd.children; const hits = [];
          kids.forEach((c, i) => { if (c.name === "Placeholder diagonal" && Math.abs(c.x - bd.x - d.x) < 0.6 && Math.abs(c.y - bd.y - d.y) < 0.6) hits.push([c, i]); });
          if (!hits.length) continue;
          const idx = Math.min(...hits.map(h => h[1]));
          for (const [c] of hits) c.remove();
          for (const path of [\`M0 \${d.h} L\${d.w} 0\`, \`M0 0 L\${d.w} \${d.h}\`]) {
            const p = penpot.createPath(); p.name = "Placeholder diagonal"; p.content = path; p.fills = [];
            p.strokes = [{ strokeColor: "#D0D0D0", strokeOpacity: 1, strokeWidth: 1, strokeAlignment: "center", strokeStyle: "solid" }]; if (d.op < 1) p.opacity = d.op;
            bd.insertChild(idx, p); p.x = bd.x + d.x + d.ins; p.y = bd.y + d.y + d.ins; if (d.fx) p.fixedWhenScrolling = true;
          }
          n++;
        }
        return n;`, "fixdiag " + b.name);
      console.log(b.name.padEnd(46), "rounded placeholders", D.length, "fixed", r);
    }
  }
}
if (mode === "phonecover") {
  // Phone cover: 390 px like the phone boards (Penpot has no mobile viewport; a wider cover scrolls sideways on a phone).
  // Redraws the existing "00 Cover · Mobile" board in place (keeps it first in View mode), from phone-cover.json.
  await ping();
  const C = JSON.parse(fs.readFileSync(new URL("./phone-cover.json", import.meta.url)));
  const ids = JSON.parse(fs.readFileSync(idsFile));
  if (!(await switchTo("Mobile"))) throw new Error("cannot open Mobile");
  await safe(LIB, "lib");
  const cid = await safe(`const c = penpot.currentPage.root.children.find(s => s.name.startsWith("00 Cover")); for (const k of [...c.children]) k.remove(); c.resize(${C.w}, ${C.h}); return c.id;`, "clear cover");
  const items = specs({ items: C.items }); let done = 0;
  for (let i = 0; i < items.length; i += 25) { const r = await safe(`return storage.draw(${JSON.stringify(cid)}, ${JSON.stringify(items.slice(i, i + 25))});`, "cover #" + i / 25); if (r && typeof r === "object") done += r.n; }
  const home = ids["01 Home · Mobile"];
  await safe(`return storage.link(${JSON.stringify(cid)}, ${JSON.stringify([{ x: R(C.btn.x), y: R(C.btn.y), w: R(C.btn.w), h: R(C.btn.h), to: "home" }])}, ${JSON.stringify({ home })});`, "cover link");
  const cnt = await safe(`const c = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(cid)}); return [c.width, c.height, c.children.length];`, "count");
  console.log("phone cover", JSON.stringify(cnt), "drawn", done, "of", items.length);
}
if (mode === "newcovers") {
  // Overview covers for Desktop and Mobile from covers.json (cover-build.cjs): every board as a clickable thumbnail.
  // Redraws "00 Cover · <page>" in place, so it stays the first screen in View mode. Then removes stray flows.
  await ping();
  const covers = JSON.parse(fs.readFileSync(new URL("./covers.json", import.meta.url)));
  const ids = JSON.parse(fs.readFileSync(idsFile));
  for (const C of covers) {
    if (only && !only.split(",").includes(C.page)) continue;
    if (!(await switchTo(C.page))) continue; await safe(LIB, "lib");
    await safe("storage.imgs = {}; return 1;", "imgs");
    const srcs = [...new Set(C.items.filter(i => i.k === "img").map(i => i.src))];
    for (const src of srcs) {
      const b64 = fs.readFileSync(new URL("./" + src, import.meta.url)).toString("base64");
      await safe(`const bytes = Uint8Array.from(atob(${JSON.stringify(b64)}), c => c.charCodeAt(0)); storage.imgs[${JSON.stringify(src)}] = await penpot.uploadMediaData(${JSON.stringify(src.split("/").pop())}, bytes, "image/jpeg"); return 1;`, "upload " + src);
    }
    const up = await safe(`return Object.keys(storage.imgs).length;`, "count imgs");
    const cid = await safe(`const c = penpot.currentPage.root.children.find(s => s.name.startsWith("00 Cover")); for (const k of [...c.children]) k.remove(); c.resize(${C.w}, ${C.h}); return c.id;`, "clear cover");
    const items = specs({ items: C.items }); let done = 0;
    for (let i = 0; i < items.length; i += 25) { const r = await safe(`return storage.draw(${JSON.stringify(cid)}, ${JSON.stringify(items.slice(i, i + 25))});`, "cover #" + i / 25); if (r && typeof r === "object") { done += r.n; if (r.errs.length) console.log("  errs", JSON.stringify(r.errs.slice(0, 3))); } }
    const targets = Object.fromEntries(C.links.map(l => [l.board, ids[l.board]]));
    const links = C.links.map(l => ({ x: R(l.x), y: R(l.y), w: R(l.w), h: R(l.h), to: l.board }));
    const nl = await safe(`return storage.link(${JSON.stringify(cid)}, ${JSON.stringify(links)}, ${JSON.stringify(targets)});`, "cover links");
    const keep = C.page === "Mobile" ? "Website · Mobile" : "Website · Desktop";
    const fl = await safe(`const pg = penpot.currentPage; for (const f of [...pg.flows]) if (f.name !== ${JSON.stringify(keep)}) pg.removeFlow(f); return pg.flows.map(f => f.name);`, "flows");
    console.log(C.page, "cover", C.w + "x" + C.h, "images", up + "/" + srcs.length, "drawn", done + "/" + items.length, "links", nl, "flows", JSON.stringify(fl));
  }
}
if (mode === "labels") {
  // bring block-label chips ("01 · Hero") above the photo placeholders that cover them
  await ping();
  for (const G of GROUPS) {
    if (only && !only.split(",").includes(G.page)) continue;
    if (!(await switchTo(G.page))) continue; await safe(LIB, "lib");
    for (const b of P.filter(b => b.pageName === G.page && !b.title && !b.menuOpen)) { // the open menu covers the labels on purpose
      const L = b.items.filter(i => i.lb && !(b.oneScreen && i.y >= b.h)).map(i => ({ t: i.k === "text" ? "text" : "rectangle", x: i.x, y: i.y }));
      if (!L.length) continue;
      const r = await safe(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); const L = ${JSON.stringify(L)}; let n = 0;
        const kids = [...bd.children];
        for (const l of L) { const c = kids.find(c => c.type === l.t && Math.abs(c.x - bd.x - l.x) < 0.6 && Math.abs(c.y - bd.y - l.y) < 0.6); if (c) { c.bringToFront(); n++; } }
        return n;`, "labels " + b.name);
      console.log(b.name.padEnd(46), "label shapes", L.length, "raised", r);
    }
  }
}
if (mode === "titles") {
  await ping();
  for (const G of [...GROUPS].reverse()) {
    if (!(await switchTo(G.page))) continue; await safe(LIB, "lib");
    console.log(G.page, await safe(`let n = 0; for (const t of penpot.currentPage.root.children.filter(s => s.name === "Row title")) { if (!t.getPluginData || t.getPluginData("moved") !== "1") { t.y = t.y - 260; if (t.setPluginData) t.setPluginData("moved", "1"); n++; } } return n;`, "titles " + G.page));
  }
}
if (mode === "verify") {
  await ping(); await run(LIB);
  for (const G of GROUPS) {
    if (only && !only.split(",").includes(G.page)) continue;
    if (!(await switchTo(G.page))) continue; await safe(LIB, "lib");
    for (const b of P.filter(b => b.pageName === G.page && !b.title)) {
      const exp = specs(b).length;
      const got = await safe(`const b = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])}); return b ? [b.children.filter(c => !c.name.startsWith("Link")).length, b.children.filter(c => c.name.startsWith("Link")).length] : null;`, "verify");
      console.log(b.name.padEnd(46), "expected", String(exp).padStart(4), "actual", got && got[0], "links", got && got[1], got && got[0] === exp ? "OK" : "<<");
    }
  }
}
