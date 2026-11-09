# E — Mobile UX review (phones), grey prototype v4

**Reviewer:** agent E (mobile UX) · **Date:** 7 Oct 2026 · **Scope:** home, raja-ampat, north-sulawesi, yachts, stories, about, advisors, plan, thank-you on phones.
**Markers:** ◆ confirmed (measured here, project file or cited source) · ◈ likely · ◇ opinion / disputed. **Severity:** P1 fix before the owner sees it · P2 fix now · P3 later.

## Method

- Screens: existing `shots-v4/390x664_*`, plus my own `E-shots/360x640_*`, `E-shots/430x830_*`, `E-shots/844x340_*` (snap.cjs).
- Interactions driven in headless Chrome (puppeteer-core, isMobile + hasTouch, real touch taps and swipes): burger menu, hero buttons, in-page tabs, carousel arrows and swipes, days slider drag, FAQ taps, bottom bar jumps, plan form with a picked trip. States in `E-shots/states/`, tiled in `E-shots/sheets/E-sheet-*.png`.
- Metrics (scroll length, first-screen geometry, bar on/off every quarter screen, small text, tap targets) over 4 viewports; peer sites opened at 390x664 with an iPhone user agent (`E-shots/peers/`).
- **Limit:** the form fields are `<div class="input">` placeholders and the chips are `<span>`s ◆ (`plan.html`, `advisors.html`). Keyboards, autofill and validation could not be tested; I give the spec they need.

## Verdict

The phone version works mechanically: 44–52px targets, a bottom bar that hides over heroes, forms and the footer, a header that slides away and comes back on scroll-up, FAQ accordions that behave. Pages are not too long: Raja Ampat is 8.9 screens at 390x664, and the peers I opened run 15–19 (◆ table below). What makes the phone version feel like a squeezed desktop is not length. It is three things:

1. Every desktop pair of buttons becomes two stacked full-width bars.
2. Information bands (key facts, tiles, boxed cards) eat the space the photo should get.
3. Sideways carousels hide the two comparisons a phone visitor most needs: which destination, and which level.

The bottom bar has two real defects: it duplicates the CTA band, and it throws away the trip the visitor just configured. Fix those before the owner sees the site.

## Measurements (◆, measured 7 Oct)

| Page | Screens 360x640 | Screens 390x664 | Screens 430x830 | Footer (390) | Where the money block starts (390) |
|---|---|---|---|---|---|
| home | 7.3 | 7.0 | 6.0 | 1.26 | "Where we go" at 0.9 |
| raja-ampat / north-sulawesi | 9.3 / 9.2 | 8.9 / 8.9 | 7.4 / 7.3 | 1.26 | Trips at 3.6 |
| yachts | 9.3 | 9.0 | 7.5 | 1.26 | Boats at 2.2 |
| stories | 7.4 | 7.2 | 6.1 | 1.26 | — |
| about | 5.4 | 5.2 | 4.3 | 1.26 | — |
| advisors | 14.7 | 14.2 | 11.6 | 1.26 | Form at 11.4 |
| plan | 4.3 | 4.0 | 3.2 | 1.26 | Form on screen 1, Send at 1.9 |
| thank-you | 2.2 | 2.1 | 1.7 | 1.26 | — |

Peers at 390x664 (◆, `E-shots/peers/`): Jacada Raja Ampat 18.6 screens, Audley Indonesia 17.1, luxuryrajaampat.com charter 16.0, Steppes Raja Ampat 14.9.

First screen, hero photo visible above the hero text: home 111px at 360x640, 177px at 390x664, 372px at 430x830. Region pages: 114 / 138 / 304px. Key-facts band on region pages: 169px, 25% of a 664 screen. ◆

## Site-wide findings (shared components, fix once)

### S1. The bottom bar shows on top of the CTA band: four contact buttons on one screen. P1 ◆
`wf.js` §4 keeps the bar quiet only over `.hero`, `.form-box` and `.site-footer`. When the dark closing CTA band ("Plan your trip / WhatsApp us") enters the screen, the bar stays on underneath it. Seen on every page with a bar (`shots-v4/390x664_home_05.png`, `390x664_raja-ampat_07.png`; script log: "06 · Call to action [dup: Plan your trip | WhatsApp us]"). Stories does the same at 0.75 screens: it has no `.hero`, so the 60%-scroll fallback turns the bar on while the featured story's "Plan a trip like this" is still on screen.
**Fix:** add `.cta` and `.first-screen` to the quiet list. That is one selector in `wf.js`.

### S2. The bottom bar loses the visitor's trip. P1 ◆
On a region page, after a tap on "Trips and prices", the card's "Plan this trip" sits about 12px above the bar's "Plan your trip" (`states/390_ra_tab-trips.png`). Two dark primaries with near-identical labels, and the one under the thumb is the dumb one. After dragging the slider to 14 days, the card link becomes `plan.html?region=Raja+Ampat&level=Basic&days=14` but the bar stays `plan.html` (script log "SLIDER"). A visitor who taps the bar retypes everything; the form's "Your trip: …" box (`states/390_plan_picked.png`) is never shown to them.
**Fix (pick one, ◇ I prefer the first):**
(a) On region and yacht pages, the bar's primary is "Plan a Raja Ampat trip" with `?region=`, and the slider updates its `days`.
(b) While `.trips` is on screen, hide the bar, since every card has its own button.
Also make the bar's WhatsApp a `wa.me/<number>?text=` link with the page and trip pre-filled ("Hi, I'm looking at Raja Ampat, 14 days…"). WhatsApp documents the pre-filled `text` parameter ◆ ([WhatsApp FAQ](https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat)), and WhatsApp is a primary channel for this business ◆ (BRIEF).

### S3. The bottom bar flashes on every page load. P2 ◆
The bar is painted visible, then `wf.js` arms it and it slides out over the hero in about 250ms. Measured at 390x664: bar top 603px at DOMContentLoaded, 664px (gone) about 300ms later. `states/360_home_first-screen.png` and `360_ra_first-screen.png` caught it mid-flash, covering "Where we go" and the tabs row.
**Fix:** hide it in CSS by default when JS is present (`html.js .mbar:not(.is-on)`), keep it visible for no-JS.

### S4. Hero on phones: a text slab, not a photo. P2 ◇ (geometry ◆)
The desktop hero copy is kept whole and stacked: H1 + lead + two full-width buttons (108px of buttons). On region pages the 169px key-facts band follows. At 360x640 only about 111px of photo stays clear of text. With a real photo under a 60% scrim, the phone hero reads as a dark text panel, the opposite of "strong creative".
**Fix for phones only:**
- One button in the hero. Home: "Plan your trip" (scrolling already does "See destinations"). Region and yacht pages: "See trips and prices" (the bar does "Plan" once the hero is gone).
- H1 + one line of lead.
- Key facts cut to 3 (see S5).
- The photo gets the freed 150–250px.

Jacada's phone page does exactly this: photo hero, H1, a single "Start Planning" button, tabs row under it ◆ (`peers/jacada-raja-ampat_00.png`).

### S5. Key-facts band: 25% of the first screen, 11px labels. P2 ◆/◇
Five facts in a 3-column grid make 2 rows, 169px. Labels are 11px uppercase ◆ (script: smallText 11px "Where, Best months, Trip length, Diving, From").
**Fix ◇:** one row of 3 on phones (Best months · Trip length · From $X), about 64px, labels at least 12–13px. "Where: West Papua" goes into the lead line; "Diving: optional" is already an FAQ.

### S6. The tabs row is not sticky on phones, so the scroll-spy does nothing. P2 ◆/◇
`wf.css` sets `.subnav { position: relative }` under 768px ◆. On phones the tabs row is a one-time jump list at the bottom of screen 1. It duplicates the hero button "See trips and prices" two rows above it. It scrolls away, and the scroll-up header comes back without it (`states/390_ra_scroll-up-header-back.png`, subnav at −1688px). The scroll-spy underline moves on an element nobody can see.
**Fix ◇:** make it sticky at `top: 0` only while the header is hidden, so the top strip is either the header or the tabs, never both (53px). The spy then earns its keep and a 9-screen region page gets "jump to prices" from anywhere. Jacada does this on phones ◆ (tabs sticky at 61–122px after scrolling, `peers/jacada-raja-ampat_01.png`). With S4, drop the duplicated hero button. Advisors: 7 tabs is too many to scan sideways; keep 4 on phones (◇).

### S7. Carousel versus stack: the choice is inverted. P2 ◇ (research ◆)
Sideways rows are used for the 3 destinations (home), the 3 levels (region pages) and the 3 boats. Reviews are stacked as 3 boxed cards (about 1.3 screens on home).
- NN/g: mobile carousels suffer "low discoverability and sequential access"; a half-visible next item is a strong cue ([NN/g, Carousels on Mobile Devices](https://www.nngroup.com/articles/mobile-carousels/)) ◆.
- Baymard: users miss items in truncated horizontal rows; arrows at the ends work well as a signifier ([Baymard](https://baymard.com/research-articles/truncating-product-gallery-thumbnails)) ◆.
- The v4 row has a peek, arrows and a "1 / 3" counter ◆. That is a good carousel. It is the wrong content for one.

**Fix ◇:**
- **Stack** what the visitor must compare or route through: the destinations on home, and the levels. This costs about 0.3 screen on home.
- **Carousel** what is browse-only and interchangeable: reviews, story photos, boat galleries.

For levels, make the slider's job visible: a 3-line price summary right under the slider (Basic $2,100 · Comfort $3,500 · Premium $7,000, all updating live), then the 3 cards stacked. Today one drag changes one visible price (`states/390_ra_slider-moved.png`). The comparison takes two swipes and the slider has scrolled away (`390_ra_trips-premium.png`).
**Is "1 / 3" right?** For a carousel that stays (reviews, galleries): yes. A counter plus arrows beats dots, which NN/g calls weak signifiers ◆. Keep it for those rows only.

### S8. Pager arrows render at 13px. P2 ◆
`.pager button { font: 600 20px/1 inherit }` is an invalid shorthand (`inherit` cannot sit inside `font`), so the whole declaration is dropped. Measured: computed 13.33px / 400. The chevrons are specks in 44px circles (`states/390_home_carousel-next1.png`).
**Fix:** `font-size: 20px; font-weight: 600; line-height: 1` as separate declarations.

### S9. Menu. P2/P3 ◆/◇
- Order and content are right for a phone: 6 destination and page links, then "Plan your trip" and "WhatsApp" as buttons at the bottom of the list, the thumb end (`states/390_home_menu-open.png`) ◆.
- P2: the burger keeps the ☰ icon when open, with only a grey fill. Show ✕ and an accessible "Close menu" label.
- P3: the page scrolls under the open menu (measured: scrollY 0 → 620 after a swipe on the panel) ◆. Lock body scroll while it is open.
- P3 ◇: put "Travel agents" under a divider as "For travel agents →". B2B is priority #1 (BRIEF) and the last item in a plain list reads as an afterthought. Add one line under the buttons: "Replies within 24 h, 7 days a week". It is the strongest trust line for a menu.
- In landscape the panel is 267px tall with 484px of content ◆, so the two buttons sit below the fold. Put them first in short-height layouts (P3).

### S10. Footer: 1.26 screens of repeated menu. P3 ◆/◇
The footer is 839px at 390 and 1.37 screens at 360: four link groups in 2x2 that repeat the menu, plus 13px uppercase group titles ◆.
**Fix ◇:** on phones, logo + one-line promise + WhatsApp/Email/Instagram row + 6 links in one column + legal line. About 0.6 screen.

### S11. Type and targets. P3 ◆
- Body 17px, H1 40px on photo, H2 30px: fine.
- Tags 13px, facts labels and logo strapline 11px uppercase. Raise anything that carries information to at least 12px, preferably 13px.
- Tap targets: everything interactive is at least 44px tall ◆. A few narrow text links ("FAQ" 29x44 in the tabs row and footer) pass WCAG 2.2's 24px minimum. Keep.
- Annotation labels inflate phone spacing: compact sections get `padding: 56px 0 40px` so the label clears the heading ◆ (`wf.css`, 5 Oct (2) block). Take it back when the labels go in stage 2.

### S12. Landscape (844x340) gets tablet styles. P2 (P1 for the form) ◆
At 844px wide the phone media queries do not apply:
- 72px header (21% of the height) and a 56px H1 that pushes the hero buttons below the fold (`states/844_home_first-screen.png`).
- No bottom bar.
- **The plan form goes 2 columns inside a 2-column split. The Name field is 90px wide** and its placeholder is cut to "Your" (`states/844_plan_first-screen.png`). The same layout gives 78px fields on an iPad in portrait (820px) ◆ (measured). That is broken, not a style choice: P1.

**Fix:**
- Make the form single-column whenever its container is narrower than about 560px (a container query, or single-column below 1100px when inside `.split`).
- For `max-height: 500px`, use the phone header height and phone heading sizes.

### S13. Forms: spec for the build (cannot be tested in the prototype). P2 ◆ (spec sources) / ◇
- Name `autocomplete="name"`. Email `type="email" autocomplete="email"`. WhatsApp `type="tel" autocomplete="tel"` with the +61 hint kept as placeholder, not as a value.
- "Where" chips as real checkboxes: combinations like "Raja Ampat + yacht" are plausible.
- Travellers: a native `<select>` or a −/+ stepper.
- Dates: a "month + flexible" select rather than a date picker (◇).
- `enterkeyhint="next"` on fields, `"send"` on the last.
- Inputs stay at 16px or more (they are 16px ◆), so iOS does not zoom.

web.dev: correct `type` gives the right keyboard and `autocomplete` enables autofill ([web.dev sign-up form best practices](https://web.dev/articles/sign-up-form-best-practices)) ◆. NN/g lists the right keyboard per field and autocomplete support among its mobile input requirements ([NN/g mobile input checklist](https://www.nngroup.com/articles/mobile-input-checklist/)) ◆.

P3: on phones drop the `.form-box` card. 16px gutter + 24px inner padding leaves 308px inputs on a 390 screen ◆; full-bleed gives 358px.

### S14. Days slider: precision on a phone. P3 ◆/◇
19 steps (3–21 days) on a track of about 290px is about 15px per day. NN/g: picking a precise value with a slider is hard; pair it with a linked fine control ([NN/g, Slider Design](https://www.nngroup.com/articles/gui-slider-controls/)) ◆.
**Fix:** add −/+ buttons beside "7 days" (44px each). The slider stays for exploring.

### S15. Creative proportions on phones. P2 (production brief) ◆/◇
One `.media` box serves all widths ◆. A 16:9 hero video cropped into the 390x502 phone hero box (aspect 0.78) keeps about 44% of the frame width ◆ (0.78 / 1.78).
**Fix ◇:** brief the shoot/edit for a separate vertical cut (4:5 or 9:16) of both hero videos and the story loop now. It is cheap at the shoot, expensive later.

Content photos are mostly right:
- Yacht "Why" 4:5, About "How we travel" 4:5, story stops 3:2, bento 16:9 + 2× 3:2: keep.
- The exception is the trip-card photo: a 300x120 sliver (2.5:1, `clamp(110px,18vh,200px)`) ◆ that reads as a desktop strip squeezed. On phones use 3:2, or drop it in the compact price summary (S7).

## Page by page

### Home
- **First screen (P2, S4):** on a phone the hero should be about 100svh − header − 56px, with one button. The owner doubts R1's heading peek. On a phone I agree with them ◇: the cut edge at 390 is a bare heading plus an annotation label, which reads as a mistake, not a cue. Phone users scroll by default (◇). If something must show below the photo, make it the top edge of the first destination photo, not a heading.
- **Where we go (P2, S7):** stack the 3 destinations as full-width photo tiles (4:3 or 5:4) with name and "from $X" on the photo. About 1.3 screens, no pager. Map after the tiles, smaller (it already moves below on phones ◆).
- **Guest story band:** two stacked buttons. Keep "Read the story", make "All guest stories" a text link (P3).
- **Reviews:** 3 boxed cards stacked, about 1.3 screens ◆. Make it the one carousel on the page, or show 1 quote + "4.9 · 48 reviews on Google" (P3 ◇).
- **For travel agents band:** a dark full-width primary on the same screens as the bar's dark primary: two primaries. Make it an outline button or a full-width text row with an arrow (P3 ◇). B2B stays visible; it just stops competing.
- **CTA band + bar:** S1 (P1).

### Raja Ampat / North Sulawesi
- **First screen:** S4 + S5 + S6 (P2). Target at 390: photo ≥ 300px clear, H1, one line, one button, a 64px facts row, tabs row.
- **Why go + areas:** 2.5 screens before prices ◆. Bento (3 photos on phones) is good, keep. Areas: map 4:3 + two 4:5 cards + one 16:9 card ◆. On phones make the 3 areas a list with 1:1 thumbnails (◇, saves about 0.8 screen) and keep one small map. Prices then start near screen 2.8 instead of 3.6.
- **Trips:** S2 (P1), S7 and S14 (P2/P3). Tab landing passes R2 at 390 (slider 149–197px, first price 497–535px, button visible) ◆. At 360x640 the card button is under the bar (539–587 vs bar top 579) ◆, which S2(b) or the stacked layout fixes.
- **Reviews + FAQ:** FAQ is good on phones: 64px rows, first item open, several can open (`states/390_ra_faq-opened.png`) ◆. Keep. The 2 boxed reviews could lose their boxes (P3).
- **CTA band:** S1.

### Yachts
- **Hero/facts:** 4 facts in 2x2, 169px ◆. Same fix as S5.
- **Why a yacht:** the 4:5 portrait photo is the best phone creative on the site ◇. Keep.
- **Boats:** for boats a carousel is defensible (visual browse, galleries), but with 3 boats a stack is calmer. If kept, fix S8 and S2. From the hero button, the slider and first price are visible, the button is under the bar ◆ (`states/390_yachts_see-boats.png`).
- **Helicopter proof card, included / not included:** fine stacked.
- **Where we sail:** 21:9 region cards + 4:3 map; on phones the map adds little after the two cards (P3, ◇ drop or shrink).

### Stories
- **First screen** (title + featured story with button) works on phones ◆ (`states/390_stories_first-screen.png`). Keep.
- The bar turns on at 0.75 screens over the story's own button (S1).
- Route with timeline and 3:2 stops reads well vertically ◆. "View all photos" has no target yet: if it opens a gallery, it must be swipeable full-screen on phones (P3).

### About
- 5.2 screens. Title + lead + 2x2 team circles (167px) ◆. Fine. On phones one group photo (4:5) would be warmer than four grey circles (◇, P3).
- The bar appears after 60% of a screen; nothing duplicates it until the CTA band (S1). Otherwise keep.

### Travel agents (B2B priority #1)
- 14.2 screens; the form starts at 11.4 ◆. The bar's "Get trade rates" lands the form at 16px from the top and the bar hides ◆ (`states/390_adv_mbar-to-form.png`). That path is good, keep it.
- The length comes from 12 bordered tiles stacked one per row ("How we work" 6 = 1.6 screens, "What we handle" 6 with icon circles = 2.2 screens) and 3 product cards with 4:3 photos (2.3 screens) ◆. "What we handle" is an icon+heading+text card grid, which the house rules ban as page structure ◆ (BRIEF); "How we work" is the same grid without icons.
- **Fix (P2 ◇):** terms as a plain 6-line list (bold term + one line, no boxes); "What we handle" as a tick list; products as rows with 1:1 thumbnails and "from" price; booking steps as a compact numbered list. Target about 8 screens.
- The hero's contact row (photo, name, "direct email · WhatsApp") is exactly right for an agent on a phone. Make the WhatsApp part a real link (P2).

### Plan your trip
- R1 holds: title + the start of the form on screen 1; with `?region=` the "Your trip: Raja Ampat · Comfort · 10 days · change" box leads the form ◆. Keep both.
- **P2:** "WhatsApp us" and the person sit below the form, about screen 2.5 ◆. Add one line above the first field: "Prefer WhatsApp? Message [Name] →". WhatsApp-first visitors should not have to fill a form first.
- S13 (spec), S12 (landscape and iPad width, P1), form box (P3).

### Thank-you
- Fine on phones: WhatsApp is the primary, stories secondary ◆.
- P3 ◇: echo what was sent ("Raja Ampat · Comfort · 10 days · 2 travellers") and show the person's face and name, so the 24h promise has an owner.
- The footer is 1.3 screens under 0.7 screens of content. S10 matters most here.

## Phone patterns to adopt site-wide

1. **One action per screen, one button in each hero.** The bar carries "Plan" everywhere else. It is context-aware (region, level, days) and goes quiet wherever the page shows its own contact buttons (hero, CTA band, trip cards, forms, footer).
2. **Stack to compare, swipe to browse.** Destinations and levels stacked; reviews, galleries and boat photos sideways with peek + arrows + "n / N".
3. **One strip at the top, never two:** header on scroll-up, tabs row on scroll-down.
4. **Phone-specific creative:** vertical cuts of hero and story video, 4:5 or 1:1 single images, nothing thinner than 16:9.
5. **Lists, not boxes:** on phones, a row of bordered tiles becomes a typographic list; borders only where a thing is tappable.
6. **WhatsApp links carry context** (`wa.me/?text=` with page and trip).
7. **Height-aware layout** (`max-height: 500px`) for phones turned sideways: phone header, phone type, single-column forms.

## Keep as is

- Bar hidden over hero, forms and footer, and on the plan and thank-you pages; header that slides away and returns on scroll-up. Matches NN/g's partially persistent header for mobile ([NN/g, Sticky Headers](https://www.nngroup.com/articles/sticky-headers/)) ◆. Audley's phone header behaves the same ◆ (`peers/audley-indonesia_*`).
- Bottom placement of the main actions: Hoober observed 49% one-handed grip and 75% of touches by thumb ([UXmatters, 2013](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)) ◆. Peers do it too: Jacada's floating "Start Planning" bar, luxuryrajaampat.com's fixed bar with WhatsApp ◆.
- 44–52px targets, 16px+ inputs, 17px body.
- FAQ accordions (64px rows, first open).
- Plan form first on phones, with the picked-trip box.
- Page lengths: half of the peers'. Do not cut blocks to shorten the page; cut boxes and duplicate buttons.

## Evidence files

All in `review/2026-10-07_redesign/E-shots/`: `states/` (31 interaction states, `<width>_<page>_<state>.png`), `sheets/E-sheet-*.png` (tiled states), `peers/` (6 sites), `<WxH>_<page>_NN.png` (360x640, 430x830, 844x340). Measurement scripts stayed in the session scratchpad, not in the project.
