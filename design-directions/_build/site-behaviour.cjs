// Behaviour test of the v5 site (5 Nov 2026): days slider, form checks and the failed state, thank-you summary,
// cookie banner + settings, phone menu, in-page links. Needs the "directions" server on 5210.
// Run: node design-directions/_build/site-behaviour.cjs
const path = require("path");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const U = p => `http://localhost:5210/site/${p}`;
let fails = 0;
const ok = (c, m) => { console.log(`${c ? "PASS" : "FAIL"} ${m}`); if (!c) fails++; };
(async () => {
  const b = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 810 });

  // slider
  await p.goto(U("raja-ampat.html?nocookies&noloader"), { waitUntil: "networkidle2" });
  const before = await p.$$eval(".trip-price b", e => e.map(x => x.textContent));
  await p.$eval("#days", r => { r.value = 12; r.dispatchEvent(new Event("input")); });
  const after = await p.$$eval(".trip-price b", e => e.map(x => x.textContent));
  const href = await p.$eval(".trip .buy a", a => a.getAttribute("href"));
  ok(before[0] !== after[0] && /^\$\d/.test(after[0]), `slider changes prices ${before[0]} -> ${after[0]}`);
  ok(href.includes("days=12") && href.includes("level=Essential"), `trip button carries the trip: ${href}`);

  // plan form: empty submit shows errors; prefill from the trip; good submit reaches thank-you with the summary
  await p.goto(U("plan.html?nocookies&region=Raja+Ampat&level=Comfort&days=9"), { waitUntil: "networkidle2" });
  ok(await p.$eval(".picked", e => e.textContent.includes("Raja Ampat · Comfort · 9 days")), "plan form shows the picked trip");
  ok(await p.$eval('input[name=region][value="Raja Ampat"]', e => e.checked), "region chip preselected");
  await p.click('#plan-form .form button[type=submit]');
  ok(await p.$eval(".alert-errors", e => !e.hidden && e.textContent.includes("3 fields")), "empty submit: 'Please check 3 fields'");
  ok(await p.$eval("#m-email", e => !e.hidden && e.textContent === "Enter your email"), "email message shown");
  await p.type("#f-name", "Anna"); await p.type("#f-email", "anna@example"); await p.type("#f-dates", "March");
  await p.click('#plan-form .form button[type=submit]');
  ok(await p.$eval("#m-email", e => e.textContent === "Check the email address"), "bad email caught");
  await p.type("#f-email", ".com");
  await Promise.all([p.waitForNavigation(), p.click('#plan-form .form button[type=submit]')]);
  ok(p.url().includes("thank-you.html"), "good submit goes to thank-you");
  ok(await p.$eval("[data-trip]", e => e.textContent === "Raja Ampat · Comfort · 9 days · 2 travellers"), "thank-you repeats the trip");

  // failed state
  await p.goto(U("plan.html?nocookies&state=failed"), { waitUntil: "networkidle2" });
  ok(await p.$eval(".alert-failed", e => !e.hidden), "?state=failed shows 'Your idea didn't send'");

  // agent form
  await p.goto(U("advisors.html?nocookies"), { waitUntil: "networkidle2" });
  await p.click('a[data-want="request"]');
  ok(await p.$eval('input[value="Send a client request"]', e => e.checked), "'Send a client request' preselects the chip");
  await p.click('#partner-form .form button[type=submit]');
  ok(await p.$eval("#partner-form .alert-errors", e => !e.hidden && e.textContent.includes("4 fields")), "agent form: 4 fields to check");

  // cookies
  const c = await b.createBrowserContext(); const p2 = await c.newPage();
  await p2.goto(U("index.html?noloader"), { waitUntil: "networkidle2" });
  ok(await p2.$eval("#cookies", e => !e.hidden), "cookie banner on first visit");
  await p2.click('#cookies [data-ck="none"]');
  ok(await p2.$eval("#cookies", e => e.hidden), "Reject all closes it");
  await p2.reload({ waitUntil: "networkidle2" });
  ok(await p2.$eval("#cookies", e => e.hidden), "choice remembered");
  await p2.click("[data-cookie-settings]");
  ok(await p2.$eval(".ck-dialog", e => e.open), "footer 'Cookie settings' opens the dialog");
  await c.close();

  // phone menu + links
  await p.setViewport({ width: 390, height: 660, isMobile: true, hasTouch: true });
  await p.goto(U("about.html?nocookies"), { waitUntil: "networkidle2" });
  await p.click(".menu summary");
  ok(await p.$eval(".menu-panel", e => getComputedStyle(e).display !== "none"), "phone menu opens");
  ok(await p.$eval('.menu-panel a[aria-current="page"]', e => e.textContent === "About us"), "phone menu marks the page");

  // every internal link resolves to a page and an existing anchor
  const pages = ["index", "home-card", "raja-ampat", "north-sulawesi", "yachts", "stories", "about", "advisors", "plan", "thank-you", "thank-you-advisor", "404", "unavailable", "privacy", "terms"];
  const bad = [];
  for (const pg of pages) {
    await p.goto(U(pg + ".html?nocookies&noloader"), { waitUntil: "domcontentloaded" });
    const links = await p.$$eval("a[href]", as => as.map(a => a.getAttribute("href")));
    for (const h of links) {
      if (h === "#" || /^(https?:|mailto:)/.test(h) || h === "#cookies") continue;
      const [file, hash] = h.split("#");
      const target = (file || pg + ".html").split("?")[0];
      if (!pages.includes(target.replace(".html", ""))) { bad.push(`${pg}: ${h}`); continue; }
      if (hash) {
        const has = await (await b.newPage()).goto(U(target + "?nocookies&noloader"), { waitUntil: "domcontentloaded" })
          .then(r => r.frame().$(`#${hash}`)).catch(() => null);
        if (!has) bad.push(`${pg}: ${h}`);
      }
    }
  }
  ok(!bad.length, "all internal links and anchors resolve" + (bad.length ? ": " + [...new Set(bad)].join(", ") : ""));
  console.log(fails ? `${fails} FAILED` : "ALL PASS");
  await b.close();
})();
