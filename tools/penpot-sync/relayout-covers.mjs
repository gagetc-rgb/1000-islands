// Make cover texts visible in View mode: open each page, put its cover on screen, force a text relayout.
// Usage: node relayout-covers.mjs ["Page,Page"]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
const pages = (process.argv[2] || "Desktop,Mobile,Emails & previews,Admin").split(",");
const tmp = new URL("./.relayout.tmp.js", import.meta.url);
const call = (code) => { fs.writeFileSync(tmp, code); try { return execFileSync("node", [fileURLToPath(new URL("./mcp-call.mjs", import.meta.url)), "code", fileURLToPath(tmp)], { encoding: "utf8", timeout: 120000 }); } catch (e) { return "ERR " + String(e.stdout || e.message).slice(0, 200); } };
for (const name of pages) {
  // 1) open the page (may take longer than one call)
  for (let i = 0; i < 6; i++) {
    const r = call(`const p = penpot.currentFile.pages.find(p => p.name === ${JSON.stringify(name)}); if (penpot.currentPage.id !== p.id) { penpot.openPage(p); for (let i = 0; i < 250 && penpot.currentPage.id !== p.id; i++) await new Promise(r => setTimeout(r, 100)); } return penpot.currentPage.name;`);
    if (r.includes(`"result": ${JSON.stringify(name)}`)) break;
  }
  // 2) select the cover, bring it on screen, relayout its texts
  console.log(name, call(`
    const c = penpot.currentPage.root.children.find(s => s.name.startsWith("00 Cover"));
    if (!c) return "no cover";
    penpot.selection = [c]; if (penpot.viewport && penpot.viewport.zoomIntoView) penpot.viewport.zoomIntoView([c]);
    await new Promise(r => setTimeout(r, 1500));
    let n = 0;
    for (const t of c.children.filter(k => k.type === "text")) {
      const fs = t.fontSize; t.fontSize = String(+fs + 1); await new Promise(r => setTimeout(r, 60)); t.fontSize = fs;
      if (t.growType === "auto-width") { t.growType = "auto-height"; await new Promise(r => setTimeout(r, 60)); t.growType = "auto-width"; }
      n++;
    }
    penpot.selection = [];
    return "relayout texts: " + n;`).replace(/\s+/g, " ").slice(0, 160));
}
fs.rmSync(tmp, { force: true });
