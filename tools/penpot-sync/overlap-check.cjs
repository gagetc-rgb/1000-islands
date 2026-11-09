// Find overlapping text lines (different elements) and text running outside its box, per page and width.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const files = fs.readdirSync("C:/Users/Kirill/Desktop/1000 islands/wireframes").filter(f => f.endsWith(".html") && f !== "index.html").map(f => f.replace(".html", ""));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  let total = 0;
  for (const w of [1440, 390]) {
    await page.setViewport({ width: w, height: w < 600 ? 660 : 640 });
    for (const k of files.filter(f => !(w < 600 && f.startsWith("admin")))) {
      await page.goto(`http://localhost:5173/${k}.html?n=${Date.now()}`, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);
      const issues = await page.evaluate(() => {
        const out = [];
        const lines = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = walker.nextNode());) {
          if (!n.textContent.trim()) continue;
          const el = n.parentElement;
          if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true })) continue;
          const fixed = (() => { for (let e = el; e; e = e.parentElement) if (getComputedStyle(e).position === "fixed") return true; return false; })();
          if (fixed) continue; // fixed bars/banners overlap by design
          const r = document.createRange(); r.selectNodeContents(n);
          for (const rc of r.getClientRects()) if (rc.width > 1) lines.push({ el, t: n.textContent.trim().slice(0, 30), x: rc.left, y: rc.top + scrollY, w: rc.width, h: rc.height });
          // text spilling out of a clipped/bordered ancestor box horizontally
          const box = el.getBoundingClientRect(); const rr = r.getBoundingClientRect();
          const inScroller = (() => { for (let e = el; e; e = e.parentElement) { const ox = getComputedStyle(e).overflowX; if (ox === "auto" || ox === "scroll") return true; } return false; })();
          if (!inScroller && rr.right > document.documentElement.clientWidth + 1) out.push(`off-screen →  "${n.textContent.trim().slice(0, 30)}"`);
        }
        for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) {
          const a = lines[i], b = lines[j];
          if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
          const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox > 2 && oy > 3) out.push(`overlap  "${a.t}"  ×  "${b.t}"  @y${Math.round(a.y)}`);
        }
        return out;
      });
      if (issues.length) { total += issues.length; console.log(`${k} @${w}:`); issues.slice(0, 8).forEach(s => console.log("   " + s)); }
    }
  }
  console.log("TOTAL", total);
  await browser.close();
})();
