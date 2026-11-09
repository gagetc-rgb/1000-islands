// Extract cover-phone.html (390 px) into phone-cover.json for `node push.mjs phonecover`.
// 390 px like the other phone boards, so the cover never needs sideways scrolling on a phone.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const { prepare, extract } = require("./extract.cjs");
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("file:///" + (__dirname + "/cover-phone.html").split("\\").join("/"), { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(prepare);
  const data = await page.evaluate(extract, false);
  const btn = await page.evaluate(() => { const r = document.querySelector(".btn").getBoundingClientRect(); return { x: r.left, y: r.top + scrollY, w: r.width, h: r.height }; });
  await page.screenshot({ path: __dirname + "/qa/cover-phone_o.png", fullPage: true });
  fs.writeFileSync(__dirname + "/phone-cover.json", JSON.stringify({ name: "00 Cover · Mobile", w: 390, h: data.h, items: data.items, btn }));
  console.log("phone cover h", data.h, "items", data.items.length, "btn", JSON.stringify(btn));
  await browser.close();
})();
