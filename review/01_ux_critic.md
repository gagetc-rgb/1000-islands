# 01 — UX / conversion critique of wireframes v1

**Reviewer:** UI/UX & conversion (premium tailor-made travel) · **Date:** 2 Oct 2026 · **Scope:** `wireframes/home.html`, `landing.html`, `journey.html`, `plan.html` + all `review/shots/*_partN.png`, checked against STRUCTURE_v3, PLAN, SITEMAP §2/§5, competitor scan, owner copy (PART 1), strategy, offer.
Markers: ◆ confirmed (source / project file / measured) · ◈ likely · ◇ opinion. Severity: **P1** fix before the owner sees it · **P2** this stage · **P3** later.
Measurements (◆) come from my own Playwright run of the wireframe files on 2 Oct 2026 (390×844 mobile, 800/1024/1280 desktop).

---

## Scores

| Area | Score | Why |
|---|---|---|
| Selling | **5/10** | B2C path is clear and short, but proof is generic, late and faceless; there is no B2B endpoint at all. |
| Fidelity to plan | **7/10** | Home, Landing and Journey follow STRUCTURE_v3 almost block for block; the B2B and Yachts pages promised for week 1 (PLAN.md l.13, l.208) are missing. |
| Clarity / IA | **6/10** | Labels are plain and the landing sub-nav is good. The 8-item menu breaks below ~1,020 px, and the Journeys listing and Stories pages have no template. |
| Layout & premium potential | **4/10** | Every section uses the same container, padding and h2, with alternating split blocks and four 4-column grids. It reads like a generic template, and the hero hides the photo. |
| Mobile | **4/10** | It is a collapsed desktop rather than a mobile design: 7–10k px pages, the hero photo covered, the Plan form below the fold and 21 % of the screen taken by sticky chrome. |

---

## Top 10 issues (ranked)

1. **P1 — The B2B path ends in "#", and the "Landing" template cannot serve For Travel Advisors.** Week 1 promised wireframes of Home, Raja Ampat, Private Yachts, Travel Advisors and Plan (◆ PLAN.md l.13, l.208). D4 requires "B2B and B2C paths to the enquiry" (◆ PLAN.md l.67), and the offer promises the B2B part separately (◆ Offer l.62). All four advisor links go to `#`. The advisor page shares almost no blocks with a region landing: it has a terms block, credentials and its own form with a partner / client toggle, and no prices or journeys (◆ SITEMAP T8). **Fix:** add `advisors.html` (terms + B2B form) and `yachts.html` (packages by days, boat cards, whole boat vs cabin). Rename the template "Landing kit" and add a table of which blocks each landing uses.
2. **P1 — Proof is thin, generic, late and has no face.** The strategy asks for "richer Guest Stories instead of generic testimonial cards" (◆ strategy §8). The wireframes use star cards with no source. "8 years" (◆ STRUCTURE_v3 l.4) appears nowhere, and no person appears on any page. The flagship helicopter story is a small text box (Home 05). On desktop Home the first proof sits about 3,000 px down. **Fix:** (a) a proof line under the hero ("8 years in eastern Indonesia · private trips only · reply within 24 h, 7 days"); (b) a story-format review card (photo, route, quote, name, country, platform); (c) a "who will answer you" module (owner photo + name) beside the final CTAs and on Plan. Jacada and Steppes both show a named expert with a photo (◆ [Jacada Indonesia](https://www.jacadatravel.com/asia/indonesia/), [Steppes Raja Ampat](https://www.steppestravel.com/destinations/south-east-asia/indonesia/raja-ampat/)). (d) Make the flagship story a photo-led block.
3. **P1 — The wireframe is not ready to present.** (a) The owner's click path is broken: Home journey cards are `<div>`s, and "Explore journeys", "All journeys", "Guest stories" and the yacht CTAs go to `#`. (b) Anchor slugs show in the content ("#central-raja-ampat"). (c) Diving-tag pills stretch to full card width and look like empty inputs. (d) Home 02: the map is centred vertically, leaving a gap of about 110 px. (e) There is no legend. **Fix:** wire Home → Raja Ampat → Journey → Plan, and Home → Advisors. Hide the slugs, fix the pills, top-align the map. Add a legend per page: "grey box = photo · [brackets] = text we need from you · yellow = question for you".
4. **P2 — Mobile is the desktop stacked, not designed.** The offer says mobile is made separately, "not just shrunk" (◆ Offer l.157). Measured heights (◆): Home 7,036 px, Landing 9,977 px (≈ 12 screens), Journey 6,602 px with placeholder copy. Landing "Why go" alone is about 1,900 px. The hero card covers 74 % (Home), 91 % (Landing) and 87 % (Journey) of the hero (◆). See Mobile.
5. **P2 — The CTA does not follow intent or keep context.** (a) The landing has no B2C CTA between the hero and block 12 (about 6,000 px on desktop), and none right after the price table, the highest-intent moment. Jacada repeats "Start Planning" 4+ times (◆ Jacada page above; competitor scan). (b) On the Journey page the mobile bar goes to the generic `plan.html`, not the pre-filled `#enquire`, so the journey context is lost. (c) On Plan, the bar links to itself. (d) "Add Triton Bay to my trip" leads to a form with no Triton Bay option. **Fix:** an inline CTA after prices. A context-aware mobile bar. Pre-fill the form via `?where=` / `?journey=`.
6. **P2 — Price presentation is ambiguous for an Australian buyer.** Prices show "$" with no currency, which Australians read as AUD (◈). "pp" is in the facts bar but not on cards. The yacht column is per person, while charters are usually quoted per night for the whole boat (◈ competitor scan). There are two trip styles, not the three tiers in H3 (◆ PLAN.md l.111). **Fix:** "from US$X,XXX pp" everywhere (or AUD, the owner decides), "based on N guests" under yacht prices, and confirm the tiers.
7. **P2 — Form friction and missing qualifiers (Plan, Journey).** Required and optional fields are not marked; Baymard recommends marking both (◆ [Baymard](https://baymard.com/blog/required-optional-form-fields)). "Email or WhatsApp" is one field with an email placeholder, so it cannot be validated or routed. Trip length is missing, although the owner's own form has "Number of days" (◆ PART 1 l.360) and every price is by days. **Fix:** email (required) plus WhatsApp with country code (optional), and trip-length chips (7 / 10 / 14 / flexible). Marketing opt-in optional and unticked (◇ legal check separate).
8. **P2 — The menu does not fit.** At 1,024 px "Plan Your Journey" is clipped, and from 769 to about 1,015 px the header overflows and the page scrolls sideways (◆ measured). **Fix (◇):** move "For Travel Advisors" and WhatsApp to a small utility bar above the header, leaving 6 items + button. Set the burger breakpoint at about 1,100 px.
9. **P2 — Objections that are not handled.** Nothing on (a) payment safety (deposit, how to pay, cancellation), (b) the company's legal identity: the footer has no registered name, although the entity exists (◆ PLAN §8), (c) getting there from Australia, or (d) medical and dive safety in remote areas. The owner's "Travel with confidence" copy (◆ PART 1 l.298–306) is used nowhere. **Fix:** a "Travel with confidence" strip on landings, payment and safety questions in the FAQs, the legal entity in the footer.
10. **P2 — Monotonous rhythm sets up a generic design.** Every section has the same 1,200 px container, 80 px padding, 36 px h2 and white/grey bands. The landing has five image/text splits and three 4-column grids. **Fix (◇):** build three pacing devices into the skeleton: a full-bleed photo or video interlude, a large guest pull-quote and a compact "practicalities" module (see Landing).

---

## Findings by page

### Home
- **01 Hero.** In 5 seconds it says what, where and why us (◇ good). "Made easy." is the first word of a paragraph, although it is the promise (◆ PLAN H2; strategy §7 "Remote Indonesia, made easy"). Give it its own line. **P2.** Annotate "text on the image, no box". **P2.**
- **02 Where we go.** The map is the most "off the map" asset and here it is a box beside cards. Make it full width, with places numbered and linked to landing anchors (◇). An interactive map is **P3**.
- **03 Featured journeys.** Diving tags and the "No diving needed" card are right (◆ v3). Add "pp" and the currency (Top 6).
- **05 Yachts + luxury story.** The strongest differentiator (◆ H3) is styled as a footnote. Give it its own photo-led block with route, helicopter image and pull-quote. **P2.**
- **06 Reviews.** The "★★★★★" placeholders imply ratings we do not have yet (Top 2). **P2.**
- **07 Advisors teaser.** Good terms bullets; both buttons are dead (Top 1).
- **08 Start with an idea.** v3 says "form / WhatsApp" (◆). Buttons add one click; a 3-field inline form would remove it (◇). **P3.**

### Landing (Raja Ampat)
- **Fidelity:** all 13 v3 steps are present and in order (◆). The "Agent rates" link appears 3 times. The hero one competes with the B2C CTA, and advisors arrive on their own page from outreach anyway (◆ SITEMAP §6). Drop it from the hero. **P3.**
- **Sub-nav:** useful, similar to Steppes' in-page tabs (◆ competitor scan). It has 9 anchors and still misses "Reviews". **P3.**
- **03 Areas.** There is no locator map, so an Australian will not know where Misool or Triton Bay is relative to Sorong. Central has "What's special / What you do", Misool does not; use one pattern. **P2.**
- **Missing "Where you stay & sail".** Jacada and Steppes sell Raja Ampat through named lodge and boat cards (◆ competitor scan; Steppes shows them with a £ scale). This was the scan's first takeaway but is not in v3. Ask the owner which suppliers can be named. **P2.**
- **Order (◇).** How it works (05), best time and what to expect (09) are three blocks of the same kind, and logistics interrupts the move from inspiration to product. Merge them into one "Practicalities" module (tabs: Getting there · Best time · What to expect) after reviews. That saves about 1,000 px on mobile and keeps the sequence desire → product + price → proof → practicalities → CTA. It changes v3, so the owner must approve. **P2.**

### Journey
- **Fidelity:** all v3 blocks are present, plus "Not included" (◆ good).
- **There is no social proof on the page where the decision is made.** SITEMAP T5 had "related story" (◆). Add one review or story card from this route before the form. **P2.**
- **Facts bar:** add "Style / comfort" so the honest-comfort promise is visible at a glance (◇). **P3.**
- **Day by day** will grow with real copy: specify an accordion on mobile now. **P2.**
- **08 Form:** short and pre-filled (◆ good). The hidden fields and consent note shown on Plan are missing here, although it should be the same component. On mobile the journey name overflows its box. **P3.**
- **Desktop:** a sticky price + "Enquire" bar after the hero would keep the ask visible (◇). **P3.**

### Plan Your Journey
- **Good:** "What happens next", 24 h / 7 days, WhatsApp as an alternative, the advisor redirect, hidden fields annotated (◆ v3, SITEMAP T10).
- **Mobile:** the form starts at 934 px (◆ measured), below the steps and the WhatsApp box. Put the form first on mobile. **P2.**
- **No proof or person next to the ask** (Top 2c). **P2.**
- The pre-selected chips may look like defaults to the owner; annotate "pre-filled from the page the visitor came from". **P3.**
- "Content / form template" shows only a form. About, Stories (home of the flagship story, ◆ v3 #10) and the Journeys grid (#5) have no wireframe and no assigned template. Add at least a block list for each. **P2.**

---

## Cross-template / components

- **Header:** the grey "For Travel Advisors" (#8a8a8a) has a contrast of about 3.5:1, below the AA minimum of 4.5:1 (◆ [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)). Eyebrows and `.small` use the same grey. Fix in design. **P3.**
- **Mobile menu:** a burger with no drawer wireframe. Specify its contents. **P2.**
- **CTA band:** present on every page (◆ v3). Add the owner's face or name (◇). **P2.**
- **WhatsApp:** an equal path in the journey hero, the CTA bands and the mobile bar (◆ good). Annotate the pre-filled message with page + campaign code for attribution (◆ PLAN §7 rule 2). **P2.**
- **Footer:** add the registered company name, address and the WhatsApp number in text (Top 9). Printing "1000islands.travel" is right (◆ PLAN H6). **P2.**
- **Time zone (◇ idea):** Raja Ampat is UTC+9 and Sydney UTC+10/+11 (◈). "Same time zone as you" is a cheap differentiator for Australia. **P3.**

---

## Mobile

- **Above the fold:** on all three hero pages the user sees a white text box and almost no photo (Top 4). Specify image-first: photo at 55–60 % of the viewport, h1 on a gradient, one button (◇). **P2.**
- **Sticky chrome:** header 60 + sub-nav 52 + bottom bar 65 = 177 px, 21 % of an 844 px screen (◆ measured). NN/g: keep persistent headers minimal; partially persistent headers that reappear on scroll up are common on mobile (◆ [NN/g](https://www.nngroup.com/articles/sticky-headers/)). Hide the header on scroll down. **P2.**
- **Carousels:** cards show a peek of the next one (◆ good: NN/g finds half-visible items signal more content better than dots). Best items should come first, and the last should be reachable in 3–4 swipes (◆ [NN/g](https://www.nngroup.com/articles/mobile-carousels/)). For the 4 Home journeys, a vertical list of compact cards shows every product without swiping (◇). **P2.**
- **Length:** "Why go" as a 2×2 grid or icon list saves about 1,300 px. Highlights: one image + list. **P2.**
- **Bottom bar:** 44 px buttons, Plan + WhatsApp, as in v3 (◆). Make it context-aware (Top 5).
- **Tap targets:** chips are 39 px (◆). That passes WCAG 2.2's 24 px (◆ [2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)) but is below NN/g's ≈1 cm guideline. Use 44 px. **P3.**

---

## What works

- Block order follows STRUCTURE_v3 on Home, Landing and Journey almost exactly (◆), so the owner is approving the agreed structure.
- Honest framing is built in: Triton Bay is "A neighbouring region, not part of Raja Ampat", along with "What to expect", "Not included" and "What can change" (◆ H2, v3).
- The non-diver path is visible: diving tags on every card, a "No diving needed" journey, a "Why go" tile and the FAQ (◆ PLAN §9).
- The landing price table by days and style is the right replacement for a configurator, and it is easy to scan (◆ v3, SITEMAP v0.3).
- Plan Your Journey removes uncertainty with "What happens next" and 24 h / 7 days, and offers WhatsApp as an equal path.

---

## Questions the wireframes cannot answer without the owner

1. **Currency and unit:** USD or AUD? Yachts per person (for how many guests) or per boat per night?
2. **Trip styles:** two tiers (lodge + speedboat / private yacht) or three (+ premium)? Price rows at 7 / 10 / 14 days?
3. **The human face:** can the owner's name and photo appear as "who answers you"? Is the WhatsApp number his own or the team's?
4. **Review sources:** are there Google / TripAdvisor profiles, and how many reviews? Can guests be named with their country?
5. **Flagship story:** written permission, which photos, and can we link the guests' Instagram (◆ H3)?
6. **Named suppliers:** which lodges and boats can be shown by name on landings and journeys?
7. **Payments (B2C):** deposit %, how guests pay, cancellation terms; the registered company name and address for the footer.
8. **B2B proof:** which licences, insurance and memberships can be shown? This decides whether the advisor page's proof block can be built (◆ H4).
9. **Getting there:** the usual routing from Australia to Sorong and Manado, and the typical total travel time.
10. **Private Yachts scope:** Raja Ampat only, or North Sulawesi too (◆ PLAN §9 open item 4)? This decides "Where we sail".
