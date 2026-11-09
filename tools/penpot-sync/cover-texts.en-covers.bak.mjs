// Re-create cover texts with the same code path as the page boards (one auto-width text per line),
// because texts made by the cover routine can stay invisible in View mode.
// Usage: node cover-texts.mjs "<Penpot page>"   (the page must be open in the workspace)
import fs from "node:fs";
const URL_ = "http://localhost:4401/mcp";
let sid = null, rid = 10;
async function rpc(body) {
  const res = await fetch(URL_, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...(sid ? { "mcp-session-id": sid } : {}) }, body: JSON.stringify(body) });
  sid = res.headers.get("mcp-session-id") || sid; const t = await res.text(); if (!t) return null;
  if ((res.headers.get("content-type") || "").includes("event-stream")) { const d = t.split("\n").filter(l => l.startsWith("data:")).map(l => l.slice(5).trim()); return d.length ? JSON.parse(d[d.length - 1]) : null; }
  return JSON.parse(t);
}
async function run(code) { const out = await rpc({ jsonrpc: "2.0", id: rid++, method: "tools/call", params: { name: "execute_code", arguments: { code } } }); return (out?.result?.content || []).map(c => c.text).join("\n"); }
await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "covertexts", version: "1" } } });
await rpc({ jsonrpc: "2.0", method: "notifications/initialized" });

// cover copy (keep in sync with push.mjs COVERS)
const src = fs.readFileSync(new URL("./push.mjs", import.meta.url), "utf8");
const COMMON = eval(src.match(/const COMMON = (\[[\s\S]*?\]);/)[1]);
const COVERS = eval("(" + src.match(/const COVERS = (\{[\s\S]*?\n  \});/)[1] + ")");
const page = process.argv[2]; const C = COVERS[page];
const wrap = (s, n) => { const out = []; let line = ""; for (const w of s.split(" ")) { if ((line + " " + w).trim().length > n) { out.push(line.trim()); line = w; } else line += " " + w; } if (line.trim()) out.push(line.trim()); return out; };
const items = [];
const T = (s, fs, fw, c, x, y) => items.push({ k: "t", s, x, y, fs, fw, c, ca: 1, lh: 1.35 });
T("1000 Islands Travel", 72, 700, "#1F1F1F", 120, 96);
T(C.sub, 32, 600, "#1F1F1F", 120, 196);
T("Stage 1 wireframes · structure and click paths · version 4 · 5 October 2026", 18, 400, "#616161", 120, 256);
T("How to read it", 22, 600, "#1F1F1F", 120, 352);
let y = 400; for (const s of COMMON) { for (const l of wrap(s, 54)) { T(l, 18, 400, "#4D4D4D", 120, y); y += 26; } y += 14; }
T("This page", 22, 600, "#1F1F1F", 760, 352);
y = 400; for (const s of C.notes) { for (const l of wrap(s, 56)) { T(l, 18, 400, "#4D4D4D", 760, y); y += 26; } y += 14; }
T("Start: open the first screen →", 16, 600, "#FFFFFF", 144, 777);

const LIB = src.match(/const LIB = `([\s\S]*?)`;/)[1];
console.log(await run(LIB));
console.log(await run(`
  const c = penpot.currentPage.root.children.find(s => s.name.startsWith("00 Cover"));
  if (!c) return "no cover on " + penpot.currentPage.name;
  if (penpot.currentPage.name !== ${JSON.stringify(page)}) return "wrong page " + penpot.currentPage.name;
  for (const t of c.children.filter(k => k.type === "text")) t.remove();
  storage.B[c.id] = c;
  const r = storage.draw(c.id, ${JSON.stringify(items)});
  // the start text must stay clickable like the button under it
  const dest = penpot.currentPage.root.children.find(s => s.name === ${JSON.stringify(C.start)});
  const st = c.children.find(k => k.type === "text" && k.characters.startsWith("Start:"));
  if (dest && st) st.addInteraction("click", { type: "navigate-to", destination: dest });
  return JSON.stringify({ drawn: r.n, errs: r.errs.length, lines: ${items.length} });`));
