// Extract the overview covers (cover-desktop.html 1440 px, cover-phone.html 390 px, written by covers-gen.py)
// into covers.json for `node push.mjs newcovers`: texts, boxes, thumbnails, and a link hotspot per data-board tile.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const { prepare, extract } = require("./extract.cjs");
const COVERS = [{ page: "Desktop", file: "cover-desktop.html", w: 1440, h: 900 }, { page: "Mobile", file: "cover-phone.html", w: 390, h: 844 }];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  const out = [];
  for (const c of COVERS) {
    await page.setViewport({ width: c.w, height: c.h });
    await page.goto("file:///" + (__dirname + "/" + c.file).split("\\").join("/"), { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(prepare);
    const data = await page.evaluate(extract, false);
    const links = await page.evaluate(() => [...document.querySelectorAll("[data-board]")].map(e => { const r = e.getBoundingClientRect(); return { board: e.dataset.board, x: r.left, y: r.top + scrollY, w: r.width, h: r.height }; }));
    await page.screenshot({ path: __dirname + "/qa/" + c.file.replace(".html", "_o.png"), fullPage: true });
    out.push({ page: c.page, w: c.w, h: data.h, items: data.items, links });
    console.log(c.page.padEnd(8), "h", data.h, "items", data.items.length, "images", data.items.filter(i => i.k === "img").length, "links", links.length);
  }
  fs.writeFileSync(__dirname + "/covers.json", JSON.stringify(out));
  await browser.close();
})();
