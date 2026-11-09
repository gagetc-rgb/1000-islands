// WARNING: overwrites the generated service/state/email/admin pages in wireframes/. Edit the HTML directly instead, unless you mean to regenerate them all.
// Generate the new wireframe pages (service, states, emails, previews, admin) from the shared header/footer.
const fs = require("fs");
const dir = "C:/Users/Kirill/Desktop/1000 islands/wireframes/";
const home = fs.readFileSync(dir + "home.html", "utf8");
const header = home.match(/<header class="site-header">[\s\S]*?<\/header>/)[0];
const footer = home.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0];
const mbar = '<div class="mbar"><a class="btn primary" href="plan.html">Plan Your Journey</a><a class="btn ghost" href="#">WhatsApp</a></div>';

const L = (n = 2, cls = "") => `<div class="lines${cls ? " " + cls : ""}" aria-hidden="true">${"<i></i>".repeat(n)}</div>`;
const page = (file, title, body, { site = true, foot = true, bodyClass = "" } = {}) => {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WF · ${title} — 1000 Islands Travel</title>
<link rel="stylesheet" href="wf.css?v=14">
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>

${site ? header + "\n\n" : ""}${body}
${site ? "\n" + (foot ? footer + "\n\n" : "") + mbar + "\n" : ""}
</body>
</html>
`;
  fs.writeFileSync(dir + file, html);
  console.log("wrote", file);
};

const docPage = (file, title, h1, updated, sections, note) => page(file, title, `<main>
<section>
  <span class="label">${title}</span>
  <div class="wrap">
    <div class="head"><h1>${h1}</h1><p class="small" style="margin-top:12px">${updated}</p></div>
    <div class="doc">
      <nav class="toc" aria-label="On this page">${sections.map((s, i) => `<a href="#s${i + 1}">${s}</a>`).join("")}</nav>
      <div class="doc-body">
${sections.map((s, i) => `        <div id="s${i + 1}"><h2>${s}</h2>${L(i % 2 ? 3 : 4)}</div>`).join("\n")}
        <p class="note">${note}</p>
      </div>
    </div>
  </div>
</section>
</main>`);

// ---------- legal ----------
docPage("privacy.html", "Privacy & cookies", "Privacy & cookies", "Last updated: date",
  ["Who we are", "What we collect", "Why we use it", "Cookies and analytics", "Who we share it with", "How long we keep it", "Your rights", "Contact us"],
  "Owner: company name, address and contact go here. Template text, not legal advice; check it for your markets before launch.");
docPage("terms.html", "Booking terms", "Booking terms", "For travellers booking direct. Travel advisors receive separate trade terms.",
  ["How a booking works", "Prices and currency", "Deposit and payment", "Changes you make", "Cancellations", "Weather, safety and changes on the ground", "Travel and dive insurance", "Our responsibility", "Complaints", "Contact us"],
  "Owner: these terms come from you (deposit %, payment dates, cancellation scale, currency). Legal review recommended before launch.");

// ---------- 404 ----------
page("404.html", "404 · Page not found", `<main>
<section class="system">
  <span class="label">404 · Page not found</span>
  <div class="wrap">
    <p class="code">Error 404</p>
    <div class="head" style="margin-bottom:0"><h1>This page is off the map</h1>${L(2, "lead")}</div>
    <div class="btns"><a class="btn primary" href="home.html">Back to home</a><a class="btn ghost" href="journeys.html">See journeys</a></div>
    <nav class="links-list" aria-label="Popular pages"><a href="raja-ampat.html">Raja Ampat</a><a href="north-sulawesi.html">North Sulawesi</a><a href="yachts.html">Private Yachts</a><a href="plan.html">Plan Your Journey</a><a href="advisors.html">For Travel Advisors</a></nav>
  </div>
</section>
</main>`);

// ---------- temporarily unavailable (standalone, no site chrome) ----------
page("unavailable.html", "Temporarily unavailable", `<div class="standalone">
<header class="bare-header"><div class="wrap"><span class="logo"><b>1000 Islands Travel</b><small>Remote Indonesia</small></span></div></header>
<main>
<section class="system" style="border:0;width:100%">
  <span class="label">Temporarily unavailable (maintenance)</span>
  <div class="wrap">
    <p class="code">Back shortly</p>
    <div class="head" style="margin-bottom:0"><h1>We're updating the site</h1>${L(2, "lead")}</div>
    <p style="margin-top:24px">You can still reach us right now:</p>
    <div class="btns"><a class="btn primary" href="#">WhatsApp us</a><a class="btn ghost" href="#">Email us</a></div>
    <p class="small" style="margin-top:16px">We reply within 24 hours, 7 days a week.</p>
  </div>
</section>
</main>
</div>`, { site: false });

// ---------- cookie banner + settings (states over the home hero) ----------
const heroState = `<section class="hero"><div class="ph media" style="min-height:calc(100svh - var(--header))"><div class="scrim"></div><span class="ph-tag">Hero video · above- & underwater</span>
    <div class="wrap hero-copy"><h1>Remote Indonesia.<br>Off the map.</h1>${L(2, "lead")}<div class="btns"><a class="btn light" href="journeys.html">Explore journeys</a><a class="btn outline-light" href="plan.html">Plan your journey</a></div></div></div></section>`;
page("state-cookies.html", "State · Cookie banner (first visit)", `<main class="state">
<span class="label">State · Cookie banner, first visit</span>
${heroState}
</main>
<div class="cookie" role="region" aria-label="Cookies">
  <div><h2>We use cookies</h2>${L(1)}<p class="small" style="margin-top:8px"><a class="link" href="privacy.html">Privacy &amp; cookies</a></p></div>
  <div class="btns"><a class="btn ghost" href="state-cookie-settings.html">Settings</a><a class="btn ghost" href="home.html">Reject</a><a class="btn primary" href="home.html">Accept all</a></div>
</div>`, { site: true, foot: false });
page("state-cookie-settings.html", "State · Cookie settings", `<main class="state">
<span class="label">State · Cookie settings dialog</span>
${heroState}
</main>
<div class="backdrop">
  <div class="dialog" role="dialog" aria-label="Cookie settings">
    <h2>Cookie settings</h2>
    ${L(2)}
    <div>
      <div class="toggle-row"><div><h3>Necessary</h3>${L(1)}<p class="small" style="margin-top:6px">Always on</p></div><span class="switch locked" aria-hidden="true"></span></div>
      <div class="toggle-row"><div><h3>Analytics</h3>${L(1)}</div><span class="switch on" aria-hidden="true"></span></div>
      <div class="toggle-row"><div><h3>Marketing</h3>${L(1)}</div><span class="switch" aria-hidden="true"></span></div>
    </div>
    <div class="btns" style="margin-top:0"><a class="btn ghost" href="home.html">Save choices</a><a class="btn primary" href="home.html">Accept all</a></div>
  </div>
</div>`, { site: true, foot: false });

// ---------- form states (on the Plan page form) ----------
const planIntro = `<div><h1>Plan Your Journey</h1><div style="margin-top:24px">${L(2, "lead")}</div></div>`;
page("state-form-errors.html", "State · Form errors", `<main>
<section>
  <span class="label">State · Form with errors (same pattern on every form)</span>
  <div class="wrap">
    <div class="split top">
      ${planIntro}
      <div><div class="form-box">
        <div class="form">
          <div class="field full"><div class="alert" role="alert"><span class="mark" aria-hidden="true">!</span><div><b>Please check 2 fields</b><span class="small">Your idea is still here, nothing is lost.</span></div></div></div>
          <div class="field error"><label>Name</label><div class="input"></div><span class="msg">Enter your name</span></div>
          <div class="field error"><label>Email</label><div class="input">you@example</div><span class="msg">Check the email address</span></div>
          <div class="field"><label>WhatsApp <em>(optional)</em></label><div class="input">+61 …</div></div>
          <div class="field"><label>Travellers</label><div class="input select">2</div></div>
          <div class="field full"><label>Dates</label><div class="input">Approximate dates</div></div>
          <div class="field full"><a class="btn primary" href="thank-you.html">Send my idea</a><p class="consent">By sending, you agree to our <a href="privacy.html">Privacy policy</a>.</p></div>
        </div>
      </div></div>
    </div>
  </div>
</section>
</main>`);
page("state-form-failed.html", "State · Sending failed", `<main>
<section>
  <span class="label">State · Sending failed (network or server)</span>
  <div class="wrap">
    <div class="split top">
      ${planIntro}
      <div><div class="form-box">
        <div class="form">
          <div class="field full"><div class="alert" role="alert"><span class="mark" aria-hidden="true">!</span><div><b>Your idea didn't send</b><span class="small">Nothing is lost: try again, or send it straight to us.</span></div></div></div>
          <div class="field full"><a class="btn primary" href="thank-you.html">Try again</a></div>
          <div class="field"><a class="btn ghost" href="#" style="width:100%">Send on WhatsApp</a></div>
          <div class="field"><a class="btn ghost" href="#" style="width:100%">Email us</a></div>
          <div class="field full"><p class="small">We reply within 24 hours, 7 days a week.</p></div>
        </div>
      </div></div>
    </div>
  </div>
</section>
</main>`);

// ---------- emails ----------
const mail = (file, title, meta, body, foot = "You get this email because you sent a request on 1000islands.travel.") => page(file, title, `<div class="mail-canvas">
  <div class="mail-meta"><span class="label" style="position:static;justify-self:start">${title}</span>${meta.map(m => `<span>${m}</span>`).join("")}</div>
  <div class="mail">
    <div class="mail-head"><span class="logo"><b>1000 Islands Travel</b><small>Remote Indonesia</small></span></div>
    <div class="mail-body">${body}</div>
    <div class="mail-foot">1000 Islands Travel · company address · <a href="privacy.html">Privacy</a><br>${foot}</div>
  </div>
</div>`, { site: false });
mail("email-traveller.html", "Email · Auto-reply to traveller", ["From: 1000 Islands Travel", "Subject: We've got your idea", "Sent: right after the form"],
  `<h1>We've got your idea</h1>${L(2)}
      <div class="kv"><span>Where</span><b>Raja Ampat</b><span>Dates</span><b>Approximate dates</b><span>Travellers</span><b>2</b><span>Message</span><b>Your message, quoted</b></div>
      <div><h2 class="h3">What happens next</h2><div class="days" style="margin-top:12px"><div class="day"><small>Within 24 hours</small>${L(1)}</div><div class="day"><small>Next</small>${L(1)}</div></div></div>
      <div class="person" style="justify-content:flex-start;margin-top:0"><div class="ph"></div><div><b>Name, the person who answers you</b><br><span class="small">Role</span></div></div>
      <div class="btns" style="margin-top:0"><a class="btn primary" href="#">Reply on WhatsApp</a></div>`);
mail("email-advisor.html", "Email · Auto-reply to travel advisor", ["From: 1000 Islands Travel", "Subject: Thanks, we've got your partner request", "Sent: right after the form"],
  `<h1>Thanks, we've got your request</h1>${L(2)}
      <div class="kv"><span>Company</span><b>Agency name</b><span>Request</span><b>Register as partner</b><span>Client trip</span><b>Raja Ampat · dates · 4 travellers</b></div>
      <div><h2 class="h3">What happens next</h2><div class="days" style="margin-top:12px"><div class="day"><small>Within 24 hours</small>${L(1)}</div><div class="day"><small>Then</small>${L(1)}</div></div></div>
      <div class="btns" style="margin-top:0"><a class="btn primary" href="#">Reply by email</a><a class="btn ghost" href="#">WhatsApp</a></div>`);
mail("email-owner.html", "Email · New enquiry alert to the owner", ["To: owner and team", "Subject: New enquiry · B2C · Raja Ampat", "Sent: the moment a form arrives"],
  `<h1>New enquiry · B2C</h1>
      <div class="kv"><span>Name</span><b>Client name</b><span>Contact</span><b>email · WhatsApp</b><span>Where</span><b>Raja Ampat</b><span>Dates</span><b>Approximate dates</b><span>Travellers</span><b>2</b><span>Source</span><b>Google · campaign code</b><span>Page</span><b>Journey: Raja Ampat by lodge</b></div>
      <div><h2 class="h3">Message</h2>${L(3)}</div>
      <div class="btns" style="margin-top:0"><a class="btn primary" href="admin-lead.html">Open in leads</a><a class="btn ghost" href="#">Reply by email</a><a class="btn ghost" href="#">WhatsApp</a></div>`, "Internal alert: sent only to the owner and the team.");

// ---------- link previews ----------
const og = (title, desc) => `<div class="og"><div class="ph"><span>Share image 1200 × 630</span></div><div class="og-text"><b>${title}</b><span>${desc}</span><span>1000islands.travel</span></div></div>`;
page("link-preview.html", "Link previews", `<main>
<section>
  <span class="label">Link previews (how a shared link looks)</span>
  <div class="wrap">
    <div class="head"><h1>Link previews</h1><p style="margin-top:12px">One share image, title and short description per page. Set in the content editor.</p></div>
    <div class="previews">
      <div><h2 class="h3">WhatsApp: home page</h2><div class="chat"><div class="bubble">${og("Remote Indonesia. Off the map.", "Private journeys to Raja Ampat and North Sulawesi")}https://1000islands.travel</div></div></div>
      <div><h2 class="h3">WhatsApp: a journey</h2><div class="chat"><div class="bubble">${og("Raja Ampat & Misool by private phinisi", "X days · from $X,XXX per person")}https://1000islands.travel/journeys/…</div></div></div>
      <div><h2 class="h3">Facebook, LinkedIn, Instagram DM</h2>${og("For Travel Advisors · 1000 Islands Travel", "Your local partner for remote Indonesia")}</div>
      <div><h2 class="h3">Google search result</h2><div class="serp"><span class="url">1000islands.travel › raja-ampat</span><span class="t">Raja Ampat private journeys · 1000 Islands Travel</span><p>Page description, about 150 characters, written for each page.</p></div></div>
    </div>
  </div>
</section>
</main>`);

// ---------- admin ----------
const adminTop = (crumb) => `<div class="admin-top"><b>1000 Islands · Admin</b><span class="small">${crumb}</span><span class="small">Owner ▾</span></div>`;
const contentNav = (on) => `<nav class="pane" aria-label="Content"><h2>Content</h2>${[["Reviews", "12"], ["Photos & galleries", "8"], ["Prices & seasons", "4"], ["Contacts", ""], ["Link previews", "15"]].map(([n, c]) => `<a class="item${n === on ? " on" : ""}" href="${n === "Prices & seasons" ? "admin-prices.html" : "admin-content.html"}">${n}<small>${c}</small></a>`).join("")}<h2 style="margin-top:24px">Edited by us</h2><span class="item"><span>Journeys, regions, pages</span><small>locked</small></span><h2 style="margin-top:24px">Enquiries</h2><a class="item" href="admin-leads.html">Leads<small>3 new</small></a></nav>`;
page("admin-content.html", "Admin · Content (reviews)", `<div class="admin">
  ${adminTop("Content › Reviews › Edit")}
  <div class="admin-cols">
    ${contentNav("Reviews")}
    <div class="pane"><h2>Reviews</h2><span class="label" style="position:static;justify-self:start;margin-bottom:8px">Admin · Content editor</span>${["Guest name · Raja Ampat", "Guest name · Private yacht", "Guest name · Lembeh", "Guest name · Bunaken"].map((t, i) => `<div class="row-card${i === 0 ? " on" : ""}"><b>${t}</b><span class="small">${i === 0 ? "Published · on 3 pages" : "Published"}</span></div>`).join("")}<a class="btn ghost" href="#" style="margin-top:12px">+ New review</a></div>
    <div class="pane">
      <h2>Edit review</h2>
      <div class="form">
        <div class="field"><label>Guest name</label><div class="input">Guest name</div></div>
        <div class="field"><label>Trip</label><div class="input select">Raja Ampat by lodge</div></div>
        <div class="field full"><label>Quote</label><div class="input textarea">Review text</div></div>
        <div class="field"><label>Photo</label><div class="ph" style="height:120px"><span>Drop a photo</span></div></div>
        <div class="field"><label>Show on</label><div class="chips"><span class="chip on">Home</span><span class="chip on">Raja Ampat</span><span class="chip on">Journey</span><span class="chip">Stories</span></div></div>
      </div>
      <div class="publish"><a class="btn ghost" href="#">Unpublish</a><a class="btn primary" href="#">Publish</a></div>
    </div>
  </div>
</div>`, { site: false });
page("admin-prices.html", "Admin · Prices & seasons", `<div class="admin">
  ${adminTop("Content › Prices & seasons › Raja Ampat")}
  <div class="admin-cols">
    ${contentNav("Prices & seasons")}
    <div class="pane"><h2>Regions and formats</h2><span class="label" style="position:static;justify-self:start;margin-bottom:8px">Admin · Prices & seasons</span>${["Raja Ampat", "North Sulawesi", "Private Yachts", "Journeys (each)"].map((t, i) => `<div class="row-card${i === 0 ? " on" : ""}"><b>${t}</b><span class="small">Updated: date</span></div>`).join("")}</div>
    <div class="pane">
      <h2>Raja Ampat · from prices</h2>
      <table class="ptable"><thead><tr><th>Trip length</th><th>From, per person</th><th>Show</th></tr></thead><tbody><tr><td>7 days</td><td>$X,XXX</td><td>Yes</td></tr><tr><td>10 days</td><td>$X,XXX</td><td>Yes</td></tr><tr><td>14 days</td><td>$X,XXX</td><td>Yes</td></tr></tbody></table>
      <div class="field"><label>Best months</label><div class="months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span class="good">Oct</span><span class="good">Nov</span><span class="good">Dec</span></div></div>
      <div class="publish"><a class="btn ghost" href="#">Discard</a><a class="btn primary" href="#">Publish</a></div>
    </div>
  </div>
</div>`, { site: false });
const leadsNav = `<nav class="pane" aria-label="Leads"><h2>Leads</h2>${[["All", "48"], ["New", "3"], ["Contacted", "6"], ["Proposal", "4"], ["Negotiation", "2"], ["Won", "21"], ["Lost", "12"]].map(([n, c], i) => `<a class="item${i === 1 ? " on" : ""}" href="admin-leads.html">${n}<small>${c}</small></a>`).join("")}<h2 style="margin-top:24px">Type</h2><span class="item">B2C travellers<small>39</small></span><span class="item">B2B advisors<small>9</small></span><h2 style="margin-top:24px">Content</h2><a class="item" href="admin-content.html">Content editor</a></nav>`;
page("admin-leads.html", "Admin · Leads list", `<div class="admin">
  ${adminTop("Leads › New")}
  <div class="admin-cols two">
    ${leadsNav}
    <div class="pane">
      <span class="label" style="position:static;justify-self:start">Admin · Leads list (tool to be chosen; fields agreed)</span>
      <div class="chips"><span class="chip on">New</span><span class="chip">B2C</span><span class="chip">B2B</span><span class="chip">Source ▾</span><span class="chip">Region ▾</span></div>
      <table class="table"><thead><tr><th>Received</th><th>Name</th><th>Type</th><th>Where</th><th>Dates</th><th>Travellers</th><th>Source</th><th>Stage</th></tr></thead><tbody>
${[["Today 09:14", "Client name", "B2C", "Raja Ampat", "Oct", "2", "Google"], ["Today 07:02", "Agency name", "B2B", "Private yacht", "Mar", "6", "Advisor outreach"], ["Yesterday", "Client name", "B2C", "North Sulawesi", "Jul", "4", "Instagram"]].map(r => `        <tr><td>${r[0]}</td><td><b><a href="admin-lead.html">${r[1]}</a></b></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${r[6]}</td><td><span class="stage new">New</span></td></tr>`).join("\n")}
      </tbody></table>
    </div>
  </div>
</div>`, { site: false });
page("admin-lead.html", "Admin · Lead card", `<div class="admin">
  ${adminTop("Leads › New › Client name")}
  <div class="admin-cols two">
    ${leadsNav}
    <div class="pane">
      <span class="label" style="position:static;justify-self:start">Admin · Lead card</span>
      <div class="split top" style="gap:32px">
        <div style="display:grid;gap:24px">
          <div><h1 style="font-size:2rem">Client name</h1><p class="small" style="margin-top:4px">B2C · received today 09:14 · from the Raja Ampat lodge journey page</p></div>
          <div class="stepper"><span class="now">New</span><span>Contacted</span><span>Proposal</span><span>Negotiation</span><span>Won</span><span>Lost</span></div>
          <div class="kv"><span>Email</span><b>client@example.com</b><span>WhatsApp</span><b>+61 …</b><span>Where</span><b>Raja Ampat</b><span>Dates</span><b>October, flexible</b><span>Travellers</span><b>2</b><span>Source</span><b>Google · campaign code</b></div>
          <div><h2 class="h3">Message</h2>${L(3)}</div>
        </div>
        <div style="display:grid;gap:16px;align-content:start">
          <div class="btns" style="margin-top:0"><a class="btn primary" href="#">Reply by email</a><a class="btn ghost" href="#">WhatsApp</a></div>
          <h2 class="h3">Comments</h2>
          <div class="comment"><b class="small">Owner · today 10:02</b>${L(1)}</div>
          <div class="input textarea">Add a comment</div>
        </div>
      </div>
    </div>
  </div>
</div>`, { site: false });
