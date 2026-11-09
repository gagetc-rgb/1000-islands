// Behaviour check for v1–v5: video playback, pause button, phone menu, bottom bar, console errors, broken media.
const path = require("path");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
  for (const id of [1, 2, 3, 4, 5]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("console", m => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", e => errors.push(e.message));
    page.on("requestfailed", r => errors.push("failed " + r.url()));
    page.on("response", r => r.status() >= 400 && errors.push(r.status() + " " + r.url()));
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    // NET=mbps emulates a mobile link (e.g. NET=10 ≈ decent 4G) to time the loading screen
    if (process.env.NET) {
      const cdp = await page.target().createCDPSession();
      await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 60, downloadThroughput: +process.env.NET * 125000, uploadThroughput: 375000 });
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    }
    await page.goto(`http://localhost:5210/v${id}.html`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.documentElement.style.scrollBehavior = "auto");
    const r = {};
    await page.waitForFunction(() => document.documentElement.classList.contains("is-loaded"), { timeout: 8000 }).catch(() => {});
    r.revealed = await page.$eval("html", h => h.classList.contains("is-loaded"));
    r.revealAtMs = await page.$eval("html", h => +h.dataset.revealMs);
    r.revealBy = await page.$eval("html", h => h.dataset.revealBy);
    const t0 = await page.$eval(".hero video", v => v.currentTime);
    await sleep(1500);
    r.heroPlays = (await page.$eval(".hero video", v => v.currentTime)) > t0;
    r.heroSrc = await page.$eval(".hero video", v => v.currentSrc.split("/").pop());
    await page.click(".pause");
    r.pausePauses = await page.$eval(".hero video", v => v.paused);
    r.pauseLabel = await page.$eval(".pause", b => b.textContent);
    await page.click(".pause");
    r.pauseResumes = !(await page.$eval(".hero video", v => v.paused));
    r.barOnHero = await page.$eval(".mbar", b => b.classList.contains("on"));
    await page.evaluate(() => scrollTo(0, document.querySelector(".easy").offsetTop)); await sleep(500);
    r.barMidPage = await page.$eval(".mbar", b => b.classList.contains("on"));
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight)); await sleep(500);
    r.barAtFooter = await page.$eval(".mbar", b => b.classList.contains("on"));
    await page.evaluate(() => scrollTo(0, 0)); await sleep(300);
    await page.click(".menu summary"); await sleep(200);
    r.menuOpens = await page.$eval(".menu-panel", p => getComputedStyle(p).display !== "none" && p.getBoundingClientRect().height > 100);
    await page.click(".menu-panel a[href='#yachts']"); await sleep(600);
    r.menuClosesOnNav = !(await page.$eval(".menu", d => d.open));
    r.headerSolidAfterScroll = await page.$eval(".hdr", h => h.classList.contains("solid"));
    r.overflowX = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    r.brokenImgs = await page.evaluate(() => [...document.images].filter(i => i.complete && !i.naturalWidth).length);
    console.log(`v${id}`, JSON.stringify(r), errors.length ? "ERR " + errors.join(" | ") : "no errors");
    await page.close();
  }
  await browser.close();
})();
