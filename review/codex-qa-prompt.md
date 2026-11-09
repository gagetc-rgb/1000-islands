# QA prompt for an independent reviewer (Codex or any other model)

Copy everything below the line into the other model. It assumes no prior context.

---

You are a QA tester. Test a website prototype and its design mirror for **conformance, layout and functionality**. You do **not** judge taste, visual style, copy quality or UX strategy. Report only things that are broken, inconsistent or do not match each other.

## What exists

1. **HTML prototype (source of truth).** A grey, clickable wireframe of a travel website "1000 Islands Travel" (private trips to Raja Ampat and North Sulawesi, Indonesia).
   - Live: https://islands-1000-prototype.pages.dev (index page lists every screen)
   - Pages: home, raja-ampat, north-sulawesi, yachts, stories, about, advisors, plan, thank-you, thank-you-advisor, privacy, terms, 404, unavailable, state-cookies, state-cookie-settings, state-form-errors, state-form-failed, email-traveller, email-advisor, email-owner, link-preview, admin-simple. Clean URLs work without `.html` (e.g. `/yachts`).
   - If you have the local repo: the HTML is in `wireframes/`, CSS in `wireframes/wf.css`, JS in `wireframes/wf.js`; layout rules in `LAYOUT_RULES.md`; the pre-send checklist in `PIPELINE.md`.
2. **Penpot mirror.** Static boards drawn from the HTML, for the client to view and comment. View-only share links (no login needed):
   - Desktop (1440 px boards): https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ad&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Phone (390 px boards): https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce251986e65&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Emails & link previews: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce2552ae348&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Admin: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce2565ba647&share-id=b69977d8-2db0-4b3f-abec-8297a130fb3f&section=interactions&index=0
   - Penpot View mode keys: arrows = previous/next board, F = toggle fit/fill, Shift+0 = 100 %, Shift+F = full screen.

## Intentional, NOT bugs (do not report)

- Everything is grey. Photos and videos are grey boxes with a caption; body text is grey bars; prices are `$X,XXX`; names like "Boat 1", "X cabins", "X years" are placeholders.
- Not clickable on purpose: WhatsApp, email, Instagram, PDF downloads, "View all photos". In Penpot, jumps within a page (anchors, tabs) are also not clickable; in the HTML they work.
- The days slider works only in the HTML; Penpot shows it fixed at 7 days.
- Design notes (block numbers, photo specs) are hidden by default in the HTML; `?notes=1` or the N key shows them. Penpot boards show them.
- Penpot boards are static pictures. Desktop boards are 1440 px wide with a first screen of 1440×640, phone boards 390 px wide with a first screen of 390×660 (a typical browser window, not the whole monitor). On a taller window the next block starts to show under the hero; that is expected. The HTML stretches to any window instead.
- Penpot's own top bar (48 px) covers part of the board in normal View mode; Shift+F removes it.
- The site copy is English; that is correct.

## What to test

### A. HTML prototype: functionality
1. Every link and button on every page: does it go somewhere that exists (no 404 except the 404 page itself, no dead `#`)? List each broken one with page + link text + target.
2. Header menu on desktop and the burger menu on phone (≤768 px): opens, closes, every item works, current page is marked.
3. Every "Plan your trip" / "Plan this trip" path ends at the Plan page. The Plan form's "Send request" (a link styled as a button; the form does not really submit) leads to `thank-you`. The agent form on the advisors page leads to `thank-you-advisor`.
4. In-page tabs / jump links (the sticky tabs row on region pages, "Where we go ↓" on home): each lands with its heading visible, not hidden under the sticky header.
5. Days slider on raja-ampat, north-sulawesi, yachts: moving it changes the shown price; no JS errors in the console on any page.
6. Footer: Privacy & cookies and Booking terms are linked from every page.
7. Cookie banner and cookie settings states, form-error and send-failed states exist and are reachable from the index.

### B. HTML prototype: layout at real browser window sizes
Test at least these viewports (CSS px): 1440×640, 1280×620, 1366×657, 1536×730, 1920×950, 1024×690, 768×950, 390×660, 360×640, 844×340 (phone sideways).
1. No horizontal scrollbar on any page at any size.
2. No overlapping or clipped text, no element sticking out of its container, no button text wrapping out of its button.
3. Home: the hero fills exactly the first screen (its bottom edge = bottom of the window), nothing from the next section shows.
4. Region and yacht pages: the first screen (photo + facts + tabs row) fits one window; each block opened from a tab fits one window (on phones: slider + all prices visible together).
5. No photo box taller than the window.
6. Phone: the sticky contact bar does not cover form fields or the footer; it is hidden on the hero.

### C. Penpot vs HTML: conformance
For each Penpot board, compare with the same HTML page at the same width (desktop 1440, phone 390):
1. Same sections in the same order, same headings and button labels, same placeholders.
2. Nothing missing, nothing extra, no shifted or overlapping elements, no text drawn as a black box or invisible.
3. Clickable hotspots in Penpot (menu items, buttons, cards) go to the same page as in the HTML. List any hotspot that goes nowhere or to the wrong board.
4. Board names match page names; the cover board lists every board and its thumbnails link to the right boards.
5. Phone boards: the open-menu board (M1) matches the HTML burger menu.

### D. Consistency across the whole set
Same page names everywhere (menu, page titles, board names, buttons); same order of items in desktop menu, phone menu and footer.

## How to report

Return one table, most severe first. Columns: `#`, `Where` (URL or board name + viewport), `What is wrong` (one sentence), `Expected`, `Evidence` (what you clicked/measured, or a screenshot name), `Severity` (blocker / major / minor).
Mark each finding **confirmed** (you reproduced it) or **suspected** (you could not reproduce reliably). Do not pad: if a section has no problems, write "no issues found" for it. Do not report anything from the "Intentional" list. Do not suggest redesigns.
