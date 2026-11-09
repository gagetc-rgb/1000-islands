// force text relayout on the cover while it is on screen: bump font size, toggle auto-width only for auto-width texts
const c = penpot.currentPage.root.children.find(s => s.name.startsWith("00 Cover"));
let n = 0;
for (const t of c.children.filter(k => k.type === "text")) {
  const fs = t.fontSize; t.fontSize = String(+fs + 1); await new Promise(r => setTimeout(r, 80)); t.fontSize = fs;
  if (t.growType === "auto-width") { t.growType = "auto-height"; await new Promise(r => setTimeout(r, 80)); t.growType = "auto-width"; }
  await new Promise(r => setTimeout(r, 80)); n++;
}
return n;
