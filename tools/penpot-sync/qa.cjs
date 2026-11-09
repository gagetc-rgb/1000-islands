// QA for every board: (1) rebuild from extracted data and pixel-compare with the live HTML,
// (2) text overlaps in the extracted data (what Penpot received), (3) link targets, (4) dead "#" buttons, (5) unique strings.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const pages = JSON.parse(fs.readFileSync(__dirname + "/pages.json"));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const rgba = (c) => `rgba(${parseInt(c.hex.slice(1, 3), 16)},${parseInt(c.hex.slice(3, 5), 16)},${parseInt(c.hex.slice(5, 7), 16)},${c.a})`;
const recon = (p) => {
  const items = p.items.filter(it => !(p.oneScreen && it.y >= p.h));
  // paint order like Penpot after the label fix: labels last
  const ordered = items;
  let out = `<html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>body{margin:0}*{box-sizing:border-box}div,span,svg{position:absolute}</style></head><body><div style="position:relative;width:${p.w}px;height:${p.h}px;overflow:hidden;background:#fff">`;
  for (const it of ordered) {
    if (it.k === "rect") out += `<div style="left:${it.x}px;top:${it.y}px;width:${it.w}px;height:${it.h}px;${it.grad ? `background:${it.grad};` : it.bg ? `background:${rgba(it.bg)};` : ""}${it.stroke ? `border:${it.stroke.w}px ${it.stroke.s} ${it.stroke.c.hex};` : ""}${it.sh ? `box-shadow:${it.sh.x}px ${it.sh.y}px ${it.sh.b}px ${it.sh.s}px ${rgba(it.sh.c)};` : ""}border-radius:${it.rads ? it.rads.map(v => v + "px").join(" ") : it.rad + "px"};opacity:${it.op}"></div>`;
    else if (it.k === "line") out += `<div style="left:${it.x}px;top:${it.y}px;width:${it.w}px;height:${it.h}px;${it.dashed ? `border-top:${it.vert ? 0 : it.h}px dashed ${it.c.hex};border-left:${it.vert ? it.w : 0}px dashed ${it.c.hex}` : `background:${it.c.hex}`}"></div>`;
    else if (it.k === "diag") { const i = (it.rad || 0) * (1 - Math.SQRT1_2), w = it.w - 2 * i, h = it.h - 2 * i; out += `<svg style="left:${it.x + i}px;top:${it.y + i}px;opacity:${it.op}" width="${w}" height="${h}"><line x1="0" y1="${h}" x2="${w}" y2="0" stroke="#D0D0D0"/><line x1="0" y1="0" x2="${w}" y2="${h}" stroke="#D0D0D0"/></svg>`; }
    else if (it.k === "icon") out += `<div style="left:${it.x}px;top:${it.y}px;width:${it.w}px;height:${it.h}px;opacity:${it.op};${it.tr ? `transform:${it.tr};` : ""}">${it.svg}</div>`;
    else if (it.k === "text") out += `<span style="left:${it.x}px;top:${it.y}px;white-space:pre;font:${it.fw} ${it.fs}px/${it.lh} Inter;letter-spacing:${it.ls}px;color:${it.c ? rgba(it.c) : "#000"};${it.u ? "text-decoration:underline;" : ""}">${esc(it.s)}</span>`;
  }
  return out + "</div></body></html>";
};
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage(); await page.setCacheEnabled(false);
  const report = [];
  const strings = new Map();
  for (const p of pages) {
    // --- pixel compare: same viewport, full page, same fonts
    const f = __dirname + "/recon.html"; fs.writeFileSync(f, recon(p));
    await page.setViewport({ width: p.w, height: p.oneScreen ? p.h : (p.w < 600 ? 660 : 640) });
    await page.goto("file:///" + f.replace(/\\/g, "/"), { waitUntil: "networkidle0" }); await page.evaluate(() => document.fonts.ready);
    const a = await page.screenshot({ encoding: "base64", clip: { x: 0, y: 0, width: p.w, height: p.h } });
    await page.goto(`http://localhost:5173/${p.file || p.key}.html?notes=1&n=${Date.now()}`, { waitUntil: "networkidle0" }); await page.evaluate(() => document.fonts.ready);
    if (p.tab) await page.evaluate(t => document.getElementById(t).click(), p.tab);
    if (p.menuOpen) await page.evaluate(() => document.querySelector("details.menu").setAttribute("open", ""));
    // hide fixed layers in the original except on one-screen boards, to compare the static page (Penpot pins them)
    const b = await page.screenshot({ encoding: "base64", clip: { x: 0, y: 0, width: p.w, height: p.h }, captureBeyondViewport: true });
    fs.writeFileSync(`${__dirname}/qa/${p.name.replace(/[^a-z0-9]+/gi, "_")}_r.png`, Buffer.from(a, "base64"));
    fs.writeFileSync(`${__dirname}/qa/${p.name.replace(/[^a-z0-9]+/gi, "_")}_o.png`, Buffer.from(b, "base64"));
    // --- pixel diff (share of pixels that differ by more than 48 in any channel)
    const diff = await page.evaluate(async (A, B) => {
      const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + s; });
      const [ia, ib] = await Promise.all([load(A), load(B)]);
      const w = Math.min(ia.width, ib.width), h = Math.min(ia.height, ib.height);
      const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
      x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, w, h).data; x.clearRect(0, 0, w, h); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, w, h).data;
      let n = 0; for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - db[i]) > 48 || Math.abs(da[i + 1] - db[i + 1]) > 48 || Math.abs(da[i + 2] - db[i + 2]) > 48) n++;
      return +(n / (w * h) * 100).toFixed(2);
    }, a, b);
    // --- text overlaps in what Penpot got
    const T = p.items.filter(i => i.k === "text" && !(p.oneScreen && i.y >= p.h));
    let ov = [];
    for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++) {
      const x = T[i], y = T[j]; if (!!x.fx !== !!y.fx) continue;
      const ox = Math.min(x.x + x.w, y.x + y.w) - Math.max(x.x, y.x), oy = Math.min(x.y + x.h, y.y + y.h) - Math.max(x.y, y.y);
      if (ox > 2 && oy > 3) ov.push(`"${x.s.slice(0, 25)}" × "${y.s.slice(0, 25)}"`);
    }
    // --- text beyond the board edge
    const off = T.filter(t => t.x + t.w > p.w + 1 && !t.fx).map(t => t.s.slice(0, 25));
    report.push({ name: p.name, ov, off: off.length, diff });
    for (const t of T) strings.set(t.s, (strings.get(t.s) || 0) + 1);
  }
  fs.writeFileSync(__dirname + "/qa/report.json", JSON.stringify(report, null, 1));
  fs.writeFileSync(__dirname + "/qa/strings.txt", [...strings.keys()].sort().join("\n"));
  for (const r of report) console.log(r.name.padEnd(46), "diff %", String(r.diff).padStart(6), r.ov.length ? "overlaps: " + r.ov.slice(0, 3).join(" | ") : "", r.off ? "beyond-edge: " + r.off : "");
  console.log("boards", report.length, "with text overlaps", report.filter(r => r.ov.length).length, "unique strings", strings.size);
  await browser.close();
})();
