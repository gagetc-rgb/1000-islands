// Export every board from Penpot (as Penpot renders it) to review/penpot-v5/*.png, then pixel-compare with the live HTML.
// Usage: node export-check.mjs [export|compare|all] ["Page,Page"]
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const OUT = fileURLToPath(new URL("../../review/penpot-v5/", import.meta.url));
fs.mkdirSync(OUT, { recursive: true });
const URL_ = "http://localhost:4401/mcp"; let sid = null, rid = 10;
async function rpc(body) { const res = await fetch(URL_, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...(sid ? { "mcp-session-id": sid } : {}) }, body: JSON.stringify(body) }); sid = res.headers.get("mcp-session-id") || sid; const t = await res.text(); if (!t) return null; if ((res.headers.get("content-type") || "").includes("event-stream")) { const d = t.split("\n").filter(l => l.startsWith("data:")).map(l => l.slice(5).trim()); return d.length ? JSON.parse(d[d.length - 1]) : null; } return JSON.parse(t); }
async function run(code) { const out = await rpc({ jsonrpc: "2.0", id: rid++, method: "tools/call", params: { name: "execute_code", arguments: { code } } }); const txt = (out?.result?.content || []).map(c => c.text).join("\n"); try { return JSON.parse(txt).result; } catch { return txt; } }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const fileOf = n => OUT + n.replace(/[^a-z0-9]+/gi, "_") + ".png";
const SCALE = 0.5;
const mode = process.argv[2] || "all"; const only = process.argv[3];
const boards = JSON.parse(fs.readFileSync(new URL("./pages.json", import.meta.url)));
const ids = JSON.parse(fs.readFileSync(new URL("./board-ids.json", import.meta.url)));
const PAGES = { desktop: "Desktop", mobile: "Mobile", emails: "Emails & previews", admin: "Admin" };

if (mode === "export" || mode === "all") {
  await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "export-check", version: "1" } } });
  await rpc({ jsonrpc: "2.0", method: "notifications/initialized" });
  for (const [g, page] of Object.entries(PAGES)) {
    if (only && !only.split(",").includes(page)) continue;
    await run(`const p = penpot.currentFile.pages.find(p => p.name === ${JSON.stringify(page)}); if (penpot.currentPage.id !== p.id) penpot.openPage(p); return 1;`);
    for (let i = 0; i < 40; i++) { if ((await run("return penpot.currentPage.name;")) === page) break; await sleep(5000); }
    const list = boards.filter(b => b.group === g && (!process.env.BOARD || b.name === process.env.BOARD));
    for (const b of process.env.BOARD ? list : [...list, { name: "00 Cover · " + page, cover: true }]) {
      const f = fileOf(b.name);
      if (fs.existsSync(f) && fs.statSync(f).size > 1000) { console.log(b.name.padEnd(46), "exists"); continue; }
      const start = await run(`const b = penpot.currentPage.root.children.find(s => ${b.cover ? `s.name.startsWith("00 Cover")` : `s.id === ${JSON.stringify(ids[b.name])}`});
        if (!b) return "missing"; storage.exp = null; storage.expErr = null;
        b.export({ type: "png", scale: ${SCALE} }).then(u => storage.exp = u).catch(e => storage.expErr = String(e)); return "started";`);
      if (start !== "started") { console.log(b.name.padEnd(46), "!!", String(start).slice(0, 80)); continue; }
      let st = null;
      for (let i = 0; i < 60; i++) { await sleep(3000); st = await run("return { n: storage.exp ? storage.exp.length : 0, err: storage.expErr };"); if (st && (st.n || st.err)) break; }
      if (!st || !st.n) { console.log(b.name.padEnd(46), "!! export failed", JSON.stringify(st)); continue; }
      const parts = []; const CH = 240000;
      for (let off = 0; off < st.n; off += CH) {
        parts.push(await run(`const u = storage.exp.subarray(${off}, ${off + CH}); let s = ""; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s);`));
      }
      fs.writeFileSync(f, Buffer.concat(parts.map(p => Buffer.from(p, "base64"))));
      console.log(b.name.padEnd(46), "exported", st.n, "bytes");
    }
  }
}

if (mode === "compare" || mode === "all") {
  const puppeteer = require("puppeteer-core");
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: fileURLToPath(new URL("./.chrome-profile", import.meta.url)) });
  const page = await browser.newPage();
  const rows = [];
  for (const b of boards.filter(b => !process.env.BOARD || b.name === process.env.BOARD)) {
    const f = fileOf(b.name); if (!fs.existsSync(f)) { rows.push([b.name, "no export"]); continue; }
    // the live HTML in the same state as the extraction, at the export scale
    await page.setViewport({ width: b.w, height: b.oneScreen ? b.h : (b.w < 600 ? 844 : 900), deviceScaleFactor: SCALE });
    await page.goto(`http://localhost:5173/${b.file || b.key}.html?n=${Date.now()}`, { waitUntil: "networkidle0" }); await page.evaluate(() => document.fonts.ready);
    if (b.tab) await page.evaluate(t => document.getElementById(t).click(), b.tab);
    if (b.menuOpen) await page.evaluate(() => document.querySelector("details.menu").setAttribute("open", ""));
    const html = await page.screenshot({ encoding: "base64", clip: { x: 0, y: 0, width: b.w, height: b.h }, captureBeyondViewport: true });
    const pen = fs.readFileSync(f).toString("base64");
    const r = await page.evaluate(async (A, B) => {
      const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + s; });
      const [ia, ib] = await Promise.all([load(A), load(B)]);
      const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height);
      const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
      x.fillStyle = "#fff"; x.fillRect(0, 0, w, h); x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, w, h).data;
      x.fillRect(0, 0, w, h); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, w, h).data;
      let n = 0; const rowsBad = new Set();
      for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - db[i]) > 64 || Math.abs(da[i + 1] - db[i + 1]) > 64 || Math.abs(da[i + 2] - db[i + 2]) > 64) { n++; rowsBad.add(Math.floor(i / 4 / w / 20)); }
      return { diff: +(n / (w * h) * 100).toFixed(2), size: [ia.width, ia.height, ib.width, ib.height], bands: rowsBad.size };
    }, html, pen);
    rows.push([b.name, r]);
    console.log(b.name.padEnd(46), "diff %", String(r.diff).padStart(6), "size html/penpot", r.size.join("x"));
  }
  fs.writeFileSync(OUT + "compare.json", JSON.stringify(rows, null, 1));
  await browser.close();
}
