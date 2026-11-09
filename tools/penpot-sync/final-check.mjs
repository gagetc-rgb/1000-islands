// Final parity check: what is really in Penpot vs a fresh extraction of the live HTML (pages.fresh.json).
// Per board: size, every text line (string + position), photo placeholders (gradient boxes), icons, click targets.
// Usage: node extract.cjs (writes pages.json) → cp pages.json pages.fresh.json → node final-check.mjs
import fs from "node:fs";
const URL_ = "http://localhost:4401/mcp"; let sid = null, rid = 10;
async function rpc(body) { const res = await fetch(URL_, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...(sid ? { "mcp-session-id": sid } : {}) }, body: JSON.stringify(body) }); sid = res.headers.get("mcp-session-id") || sid; const t = await res.text(); if (!t) return null; if ((res.headers.get("content-type") || "").includes("event-stream")) { const d = t.split("\n").filter(l => l.startsWith("data:")).map(l => l.slice(5).trim()); return d.length ? JSON.parse(d[d.length - 1]) : null; } return JSON.parse(t); }
async function run(code) { const out = await rpc({ jsonrpc: "2.0", id: rid++, method: "tools/call", params: { name: "execute_code", arguments: { code } } }); const txt = (out?.result?.content || []).map(c => c.text).join("\n"); try { return JSON.parse(txt).result; } catch { return txt; } }
// same rule as push.mjs (keep in sync): phone boards drop touch-trap links on purpose
// Penpot View mode fires a click interaction on pointer-DOWN, so on a phone every swipe that starts on a hotspot
// navigates away (8 Oct 2026: viewers kept landing on Plan). Phone boards therefore get no hotspot on the pinned
// bottom bar, and a link taller than 80 px (a whole card) is cut to its title line (300x48), or dropped if it has none.
function touchSafe(b) {
  // 8 Oct 2026, decided with the user: content boards carry no links at all. Penpot is for viewing and comments;
  // clicking through the site happens in the HTML prototype. Covers keep their own links (drawn by newcovers, not here).
  return [];
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

const fresh = JSON.parse(fs.readFileSync(new URL("./pages.fresh.json", import.meta.url)));
const ids = JSON.parse(fs.readFileSync(new URL("./board-ids.json", import.meta.url)));
const PAGES = { desktop: "Desktop", mobile: "Mobile", emails: "Emails & previews", admin: "Admin" };
const idToName = Object.fromEntries(Object.entries(ids).map(([n, i]) => [i, n]));
const keyOf = {}; for (const b of fresh) keyOf[b.name] = b.key;

await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "final-check", version: "1" } } });
await rpc({ jsonrpc: "2.0", method: "notifications/initialized" });

const report = []; let problems = 0;
for (const [g, page] of Object.entries(PAGES)) {
  await run(`const p = penpot.currentFile.pages.find(p => p.name === ${JSON.stringify(page)}); if (penpot.currentPage.id !== p.id) penpot.openPage(p); return 1;`);
  for (let i = 0; i < 40; i++) { if ((await run("return penpot.currentPage.name;")) === page) break; await sleep(5000); }
  // 1) board set on this Penpot page
  const onPage = await run(`return penpot.currentPage.root.children.filter(s => s.type === "board").map(s => ({ id: s.id, name: s.name, w: Math.round(s.width), h: Math.round(s.height) }));`);
  const want = fresh.filter(b => b.group === g);
  const extra = onPage.filter(s => !s.name.startsWith("00 Cover") && !want.some(b => ids[b.name] === s.id));
  if (extra.length) { problems += extra.length; report.push({ page, extraBoards: extra.map(s => s.name) }); }
  for (const b of want) {
    const pb = onPage.find(s => s.id === ids[b.name]);
    if (!pb) { problems++; report.push({ board: b.name, missing: true }); continue; }
    const d = await run(`const bd = penpot.currentPage.root.children.find(s => s.id === ${JSON.stringify(ids[b.name])});
      const out = { name: bd.name, t: [], ph: 0, icons: 0, links: [] };
      for (const c of bd.children) {
        if (c.type === "text") out.t.push([c.characters, Math.round(c.x - bd.x), Math.round(c.y - bd.y)]);
        else if (c.name === "Icon") out.icons++;
        else if (c.name.startsWith("Link")) { const a = (c.interactions || [])[0]?.action; out.links.push(a && a.destination ? a.destination.id : a ? a.type : "none"); }
        else if (c.type === "rectangle" && c.fills && c.fills[0] && c.fills[0].fillColorGradient) out.ph++;
      }
      return out;`);
    const H = b.items.filter(it => !(b.oneScreen && it.y >= b.h));
    const ht = H.filter(it => it.k === "text").map(it => [it.s, Math.round(it.x), Math.round(it.y)]);
    // texts: multiset match by string, then position within 3 px
    const pool = [...d.t]; const missingT = [], moved = [];
    for (const [s, x, y] of ht) {
      const i = pool.findIndex(p => p[0] === s && Math.abs(p[1] - x) <= 3 && Math.abs(p[2] - y) <= 3);
      if (i >= 0) { pool.splice(i, 1); continue; }
      const j = pool.findIndex(p => p[0] === s);
      if (j >= 0) { moved.push(`${s} (${x},${y} → ${pool[j][1]},${pool[j][2]})`); pool.splice(j, 1); } else missingT.push(s);
    }
    const extraT = pool.map(p => p[0]);
    const hph = H.filter(it => it.k === "rect" && it.grad).length, hic = H.filter(it => it.k === "icon").length;
    // click targets: HTML link targets that have a board, vs Penpot destinations (by page key)
    const targetKeys = new Set(want.map(x => x.key));
    const hl = touchSafe(b).filter(l => l.to === "__back" || l.to === "__menu" ? true : targetKeys.has(l.to)).map(l => l.to === "__back" ? "previous-screen" : l.to === "__menu" ? "menu" : l.to).sort();
    const pl = d.links.map(x => x === "previous-screen" ? x : idToName[x] ? (fresh.find(f => f.name === idToName[x])?.menuOpen ? "menu" : keyOf[idToName[x]]) : "?" + x).sort();
    const linkDiff = JSON.stringify(hl) === JSON.stringify(pl) ? null : { html: hl.length, penpot: pl.length, onlyHtml: hl.filter(x => !pl.includes(x)), onlyPenpot: pl.filter(x => !hl.includes(x)) };
    const sizeBad = pb.w !== Math.round(b.w) || pb.h !== Math.round(b.h);
    const row = { board: b.name, texts: `${ht.length}/${d.t.length}`, missingT, extraT, moved, ph: `${hph}/${d.ph}`, icons: `${hic}/${d.icons}`, size: sizeBad ? `${b.w}x${b.h} vs ${pb.w}x${pb.h}` : "ok", links: linkDiff };
    const bad = missingT.length || extraT.length || moved.length || hph !== d.ph || hic !== d.icons || sizeBad || linkDiff;
    if (bad) problems++;
    report.push(row);
    console.log((bad ? "!! " : "ok ") + b.name.padEnd(46), "texts", row.texts, "photos", row.ph, "icons", row.icons, "size", row.size, linkDiff ? "links " + JSON.stringify(linkDiff) : "links ok",
      missingT.length ? "\n     missing: " + missingT.join(" | ") : "", extraT.length ? "\n     extra: " + extraT.join(" | ") : "", moved.length ? "\n     moved: " + moved.slice(0, 5).join(" | ") : "");
  }
}
fs.writeFileSync(new URL("./final-check.json", import.meta.url), JSON.stringify(report, null, 1));
console.log("boards with problems:", problems);
