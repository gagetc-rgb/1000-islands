# QA prompt #2: cross-check that every part is current and consistent (8 Oct 2026)

Copy everything below the line into the other model. It assumes no prior context.

---

You are a QA tester. A website prototype exists in three linked parts. Your job: prove that the three parts are **up to date and agree with each other**, that **no stale information from older versions** survives anywhere, and that **nothing is broken**. You do **not** judge taste, visual style, copy quality or UX strategy. Report only things that are wrong, outdated, inconsistent or broken.

## The three parts

1. **HTML prototype (source of truth).** Grey clickable wireframe of the travel site "1000 Islands Travel" (private trips to Raja Ampat and North Sulawesi, Indonesia). Version **v5** (grey hi-fi redesign of 7 Oct 2026; boards resized to the browser window on 8 Oct).
   - Live: https://islands-1000-prototype.pages.dev
   - `/` is a Russian hub page listing every screen with its number (01–14, S1–S4, E1–E3, P1, A).
   - Pages: home, raja-ampat, north-sulawesi, yachts, stories, about, advisors, plan, thank-you, thank-you-advisor, privacy, terms, 404, unavailable, state-cookies, state-cookie-settings, state-form-errors, state-form-failed, email-traveller, email-advisor, email-owner, link-preview, admin-simple. Clean URLs work without `.html`.
   - `?notes=1` (or the N key) shows design notes: block numbers like "01 · Hero" and photo specs.
2. **Penpot mirror.** Static boards drawn from the HTML for the client to view and comment. File name: "1000 Islands · Wireframes v5 · 7 Oct 2026". Share links (open without login):
   - Desktop: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ad&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Phone: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce251986e65&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Emails & link previews: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce2552ae348&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Admin: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce2565ba647&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Expected: 48 boards (Desktop 18, Mobile 19, Emails & previews 7, Admin 4) plus one cover board per page ("00 Cover · …"). The covers are in Russian; board content is English.
   - View mode keys: arrows = previous/next board, Shift+F = full screen.
3. **Owner guide ("the elephant page").** A Russian how-to page for the client: how to open the site and the Penpot mockup, how to comment, what to comment on, what is dead on purpose, FAQ.
   - Live: https://islands-1000-guide.pages.dev
   - It quotes facts about parts 1 and 2 (links, screen counts, version and date, button names, Penpot steps, the list of things that are not clickable, slider and FAQ behaviour).

If you have the local repo (`C:\Users\Kirill\Desktop\1000 islands`): HTML in `wireframes/`; guide in `guide/index.html`; Penpot cover sources in `tools/penpot-sync/covers-gen.py` → `cover-desktop.html`, `cover-phone.html` → `covers.json`, Emails/Admin cover texts in `tools/penpot-sync/cover-texts.mjs`. **Ignore as history, never as current:** `archive/`, every `*.bak.*` file, `review/` (old reports), `STRUCTURE_v1–v3.md`. But do flag any *current* file or live page that still carries something from them.

## Known and intentional (do not report)

- Everything grey; photos are grey boxes with a caption; body text is grey bars; prices `$X,XXX`; placeholders like "Boat 1", "X years".
- Not clickable on purpose: WhatsApp, email, Instagram, "Read on Google" (reviews), "View all photos". In Penpot, in-page jumps (anchors, tabs) are not clickable either; in the HTML they work.
- Days slider works only in the HTML; Penpot shows it fixed at 7 days. In Penpot only the first FAQ question is open.
- Design notes hidden by default in the HTML, shown on Penpot boards.
- Penpot boards are static: desktop first screen 1440×640, phone 390×660. Penpot's own 48 px bar covers part of the board in View mode.
- Penpot Admin boards: "Open the site ↗" has no hotspot (cross-page links do not work in Penpot). Emails/Admin covers have no per-board links.
- Footer order differs from the menu (grouped in columns). Maintenance and one-screen state pages have no legal footer links.
- The guide's elephant in the top-right corner (its line is the page scrollbar) is a deliberate joke. Leave its drawing alone; do check that the scrollbar works.
- Site copy is English. Guide, hub page and Penpot covers are Russian, address the reader as «ты», and keep English UI words (Start, Fill, Post, Hero, page names) untranslated. That is all correct.
- Phone boards in Penpot have **no sticky bottom bar** (Plan your trip · WhatsApp). The HTML keeps it; Penpot pins such a layer at a fixed distance from the top of the viewer, so it floated mid-screen. The Mobile cover says so.
- Penpot fires links on touch-*down*, so on phone boards big hotspots were cut on purpose: trip tier cards on Raja Ampat, North Sulawesi and Yacht charters are not clickable, and the destination cards on Home and Travel agents link only from their title line. The full-width "Plan this trip" buttons still link. Do report any other hotspot on a phone board taller than 80 px (except the cover and the open-menu board).
- Email pages (HTML and Penpot) carry a dashed Russian note "Что это за письмо" above each email: it is an explanation for the owner, not part of the email.
- There is no PDF download anywhere in v5. If "PDF" appears in any current text, report it.

## What to check

### A. Stale information (main goal)
Find anything that belongs to an older version and has not been updated. Typical tails from earlier versions:
- features that no longer exist (e.g. a PDF download, old blocks, old page names such as "06 About" instead of "06 About us");
- old version labels or dates ("v4", "version 4", "5 October", "6 October") where v5 · 7 Oct is meant;
- old share links (share-id `c252e8c6…` or `46a064e3…`); only `b69977d8…` is current;
- old screen counts, old board names, old step wording that no longer matches Penpot's current UI.
Search every live page (all three parts), every Penpot cover text and every board name.

### B. Guide ↔ prototype ↔ Penpot
For every factual claim in the guide, check it against the real thing and report every mismatch:
1. Every link opens what its label says (site/phone/computer/emails/admin/account sign-up/prototype with block numbers). The "Сайт: телефон / компьютер" links go to the Mobile / Desktop Penpot pages respectively.
2. Version, date and "48 экранов" in the guide footer match the Penpot file.
3. The 6 commenting steps match Penpot's current View mode UI (Start on the cover, "100%" → Fill, arrows and ← →, comment icon top centre and key C, click a spot, Post, numbered pins). If Penpot's UI differs (labels, positions, login flow for a logged-out viewer), report it.
4. The "Не кликается специально" list matches what is really dead in the HTML and in Penpot: nothing missing, nothing that does not exist.
5. The "О чём писать сейчас" section says each block has a label like "01 · Hero": check the labels exist on Penpot boards and in the HTML with `?notes=1`.
6. FAQ answers are true (screen list in the top-left dropdown, behaviour without login, white screen, etc.).
7. Penpot cover texts (all 4 covers) agree with the guide and with the boards: screen counts per page ("19" on Desktop, "20" on Mobile include the cover), button names, non-clickable list, slider note.

### C. Hub page ↔ Penpot
Every screen in the hub at `/` exists, opens, and has the same number and name as the Penpot board (e.g. "13 404" ↔ "13 404 · Page not found · Desktop"). The hub's Penpot links work.

### D. Penpot ↔ HTML conformance (spot check, then widen if you find anything)
For at least Home, Raja Ampat, Yacht charters, Plan your trip, Travel agents, one email and one Admin tab, at both widths: same sections in the same order, same headings, button labels and placeholders, same block numbers; hotspots go to the same page as in the HTML; nothing missing, extra, shifted, invisible or drawn as a black box.

### E. Nothing broken
1. HTML: every link and button on every page goes to a page that exists (only the intentional dead ones above may be `#`); menu and burger menu work; every "Plan your trip" path ends at Plan; Plan's "Send request" → thank-you; agent form → thank-you-advisor; no console errors on any page; no horizontal scroll at 1440×640, 1280×620, 1024×690, 768×950, 390×660, 360×640.
2. Guide: no console errors; the checkboxes on the 6 steps tick and are remembered after reload; FAQ items open; copy-link button copies the right URL; the elephant scrollbar drags and scrolls the page; layout works at 390 px wide with no horizontal scroll; every image and font loads (no 404 in the network tab).
3. Penpot: all boards load in View mode through the share links; arrows move through every board; cover thumbnails and Start go to the right boards.

## How to report

One table, most severe first. Columns: `#`, `Part` (prototype / Penpot / guide / hub), `Where` (URL or board name + viewport), `What is wrong` (one sentence), `Expected / source of truth`, `Evidence` (what you clicked, read or measured), `Severity` (blocker / major / minor), `Status` (confirmed / suspected).
Then a short list "Checked, no issues" naming each section A–E you passed. Do not pad, do not report the "Known and intentional" items, do not suggest redesigns. Write the report in English.
