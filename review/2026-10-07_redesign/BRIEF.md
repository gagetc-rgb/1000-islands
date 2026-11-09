# Brief — 1000 Islands Travel, full-site review + layout redesign (7 Oct 2026)

## Why this run exists

The user (the studio owner building this site for a client, "the owner") looked at the grey prototype v4 after the 6 Oct screen-fit pass and is not happy. Their words, translated:

> "The home first screen relates badly to the destinations section: the first screen shows the next section, 'Where we go', peeking at the bottom. I don't know if that's right. (Guest stories does the same; I can forgive that one.) Think hard about how the screens should look, how the creatives (photos/video) should look and what size they should be. Make the layout genuinely stylish, as if an agency did it for many thousands of dollars. I want to see that the whole site was really gone through, desktop and phone: is the user experience built right, is everything where it canonically belongs for our sector, is it modern. Same for the UI: sizes of creatives, how good it all looks, are the sections in the right order. From every angle. This is our final analysis, also from a marketing and sales point of view. Fresh eyes from different agents, then a synthesis. Keep the old version, build the new one, show me the difference and why the new one is better, or keep the old one if it's fine. Don't change things for the sake of change. Our style is minimalism, simplification, strong creative, strong design: that's where our craft shows."

So: honest, expert, evidence-based judgment. "Keep it as is" is a valid verdict for any block.

## The business (short)

- Private, tailor-made trips in remote eastern Indonesia. Regions: **Raja Ampat** (Central, Misool; Triton Bay as an add-on) and **North Sulawesi** (Bunaken, Sangihe & Siau; Halmahera & Widi as add-on). Plus **Yacht charters** (phinisi, whole boat) and a **Travel agents (B2B)** landing.
- Owner has run trips for 8 years. Typical spend $2–2.5k pp; luxury capability exists (yacht + helicopter) but the core B2C buyer is **upper-middle class, not luxury** (show luxury once, quietly). B2C market: **Australia**. Reply within 24 h, 7 days a week. WhatsApp is a primary channel.
- **Strategy says B2B (travel advisors) is priority #1**, B2C #2; the site is the proof an advisor checks after outbound outreach. B2B must not be buried.
- Positioning: desire "Remote Indonesia. Off the map." → promise "made easy" → proof "we've done it many times".
- Fixed-price build (35m IDR). Scope = what the offer promises; no new pages without a P1 reason (flag "not in offer"). Group tours, luxury camping, Komodo must NOT appear anywhere.

## Current state (v4)

- Stage: **grey clickable prototype**, before the owner's written approval. Visual direction (colour, brand typeface) is the NEXT stage. Inter is a placeholder face.
- Pages: home, raja-ampat, north-sulawesi, yachts, stories, about, advisors, plan, thank-you, thank-you-advisor (+ privacy, terms, 404, unavailable, states, emails, admin — service screens, lower priority).
- Menu: Raja Ampat · North Sulawesi · Yacht charters · Guest stories · About · Travel agents · [Plan your trip]. Phone: burger + bottom bar "Plan your trip / WhatsApp" (hidden over hero, forms, footer).
- Region pages: photo hero + key-facts band + sticky in-page tabs (Why go · Trips and prices · Reviews · FAQ); trips have a "how many days" slider changing the "from" price on 3 level cards (Basic/Comfort/Premium).
- Small grey tags like "01 · Hero" are annotation labels so the owner can reference blocks in comments. They are not design, but they are on every block.
- Screen-fit rules (`LAYOUT_RULES.md`, adopted 6 Oct) include R1 "Home: the hero photo ends where the next heading ('Where we go') is fully visible". **The user now doubts exactly this rule.** You may challenge any rule there with reasons.

## What is in scope NOW vs later

- NOW (judge and propose): structure, section order, page set, navigation, click paths, UX patterns, conversion path, composition/layout, grid, type scale and hierarchy, whitespace and rhythm, image/video slot proportions and sizes ("creatives"), phone layouts, how premium the grey layout itself feels.
- LATER (mention only if critical): final colour palette, brand typeface, real copy, real photos, real prices. Don't grade placeholder copy lines.

## Where to look

- Live v4: `http://localhost:5173/<page>.html` (e.g. `/home.html`). Same files also at `http://localhost:5174/wireframes/<page>.html`; frozen copy at `http://localhost:5174/archive/wireframes-v4-before-redesign-7oct/<page>.html`.
- Screens already captured, screen by screen as a visitor scrolls: `review/2026-10-07_redesign/shots-v4/<WxH>_<page>_<NN>.png` at 1440x790 (MacBook Air) and 390x664 (iPhone 13/14). Tiled per page: `review/2026-10-07_redesign/sheets-v4/<WxH>_<page>.png`. Look at the individual shots for detail, the sheets for flow.
- Your own captures: `node tools/penpot-sync/snap.cjs <baseUrl> <outDir> <WxH> <scale> <cols> <page,page>` (run from the project root; outDir must be your own folder under `review/2026-10-07_redesign/`). Headless Chrome via puppeteer-core is installed in `tools/penpot-sync/node_modules`.
- Source: `wireframes/*.html`, `wireframes/wf.css`, `wireframes/wf.js`.
- Docs: `1000-islands-travel-strategy.md` (strategy), `STRUCTURE_v3.md` (structure; v4 later cut journey pages), `PLAN.md`, `SITEMAP.md`, `1000-islands-website-ux-content-structure.md` (PART 1 = owner's own copy), `Offer_Sent_to_Owner.md` (Russian, scope), `research/competitor_structure.md`, `review/2026-10-05_internal-walkthrough-notes.md` (latest decisions), `LAYOUT_RULES.md`, `CLAUDE.md` (house design rules).

## House rules (apply to proposals)

- No eyebrow/kicker labels above headings; no skipped heading levels; secondary grey text ≥4.5:1; em-dashes rare in visible copy; no section numbers as decoration; no icon+heading+text card grids as page structure.
- Minimalism: fewer blocks, fewer borders/boxes/pills, bigger imagery, one clear action per screen.

## Rules for every agent

- **Do not edit anything in `wireframes/`** (concept builders write only in their own folder).
- **No invented facts.** Market facts, best practices, statistics, competitor details: cite a URL or mark as your opinion. If you don't know, say so. Mark claims: ◆ confirmed (source or project file) · ◈ likely · ◇ disputed / opinion.
- Prefer primary sources (Baymard, Nielsen Norman Group, real competitor sites you actually opened) over blog opinion. Web search allowed, keep it light. **Do not use Firecrawl.**
- Be concrete: page → block → what is wrong → why it matters (selling / trust / clarity / mobile / premium feel) → the fix. Severity on every finding: **P1** fix before the owner sees it · **P2** should fix now · **P3** later.
- Say plainly what should stay as it is and why (max 6 bullets).
- English, direct, no praise padding. Target 1500–3000 words.
