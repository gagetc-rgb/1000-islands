# Branch B log (Impeccable, human in the loop)

## Round 1: 15 Oct 2026, 21:00–21:45 (about 45 min)

**Evaluation.** `/impeccable critique` ran dual-agent (A: design review, B: detector and browser evidence).

- **Score:** 20/32 (63%, Acceptable). Heuristics 7 and 10 were marked n/a for a landing page.
- **Specificity verdict:** category-interchangeable. The page looked like a boutique-travel template: Cormorant serif, sand/coral, pill buttons, numbered-circle step cards, three equal review cards.
- **Detector:** 17 CLI findings.
  - Real: white on coral CTA at 3.2:1, and 4.1:1 on hover.
  - False positives: hero and header text read as "white on #fbf9f5", because the detector cannot see the absolutely positioned dark slot; tight-leading 1.28 is rounding.
  - Debatable: cream-palette, and a cyan gradient on the photo placeholders.
  - 21 of 31 tap targets under 44px at 390px.

**Top issues:**
1. P1: no visual signature for "remote / off the map"; five identical teal slabs.
2. P1: coral CTA contrast.
3. P1: advisors and the main CTA vanish on scroll (absolute header, trade box at 80% of the page, no phone bar).
4. P2: eyebrow above the guest-story heading.
5. P2: template step cards and review cards.

**Questions: answered by the user.**
- Priority: "all P1 at once".
- Tone: "expedition" (no serif).
- Scope: "all 5".
- The tone answer meant a replacement visual world, so Impeccable routed through new-work. `concept-seed` (key 340f6941) assigned candidate 5 of my grounded expedition list ("team field book"), dealt six catalog challengers (all declined) and offered my pick ("route diagram") and the category canon.
- The user chose **the category canon**, then left the reference sites to me: "a tidy modern expedition operator, upper-middle, not luxury".
- The build path is code-led because this harness has no image generation.

**What changed (all in `b/`):**
- **New world.** One grotesque family (Archivo, width axis): heavy and wide for display, plain for body. Deep ocean ink bands, cool white plus a pale sea-grey band, kayak yellow reserved for actions/focus/selection with ink text. Square corners, no card boxes. Contract recorded in `b/DIRECTION.md`.
- **Remote signature.** Each destination now has a drawn route: Your gateway → Sorong/Manado (solid flight leg, X h) → islands (dashed boat leg, X h).
  - Real coordinates on the Raja Ampat, Siau and story slots: 0°14′S 130°30′E and 2°46′N 125°24′E, checked against Wikipedia.
  - Photo slots are flat tones per place.
- **Contrast.** Ink on yellow CTAs replaces white on coral.
- **Advisors and CTA.**
  - Sticky solid-ink header that keeps "Travel agents" and "Plan your trip" in view.
  - A quiet advisor line in the hero ("Travel advisor? Trade rates and a partner on the ground").
  - A phone bottom bar (Plan your trip / WhatsApp), hidden on the hero, the closing CTA and the footer.
  - The mobile menu closes after a tap and on Esc.
- **Eyebrow removed.** The story meta line now sits under the h2 ("A guest story · 9 days · Comfort level").
- **Template sections reworked.**
  - Steps are now stops on one measured line, not numbered circles.
  - Reviews are one lead quote plus two stacked, with the rating in the section head.
- **Craft floor.**
  - Tap targets ≥44px on phone.
  - 100svh hero.
  - Skip link.
  - prefers-reduced-motion guard.
  - Themed selection and focus ring.
  - Inline styles removed.

**Finish review (impeccable-finish-reviewer).**
1. First pass: `fix`, 5 material fixes:
   - steps were still circles;
   - the route was a list, not a line;
   - hero and Raja Ampat slots shared a tone; no slot devices;
   - 4px radii against "square corners";
   - the header contract did not match the render.
2. Applied in one batch. Verdict pass: all 5 resolved, plus 2 regressions:
   - "Jakarta" was an unsupported gateway claim;
   - the dashed boat leg had a solid tail.
3. Both fixed. Second verdict: **ship**. The optional 4px tick overshoot was fixed afterwards.
- Detector: `impeccable detect` exits 0 on `b/index.html`. No ignores were added.
- DESIGN.md: written by `impeccable-documenter` into `b/DESIGN.md` and `b/design.json`.

**Notes.**
- Impeccable keeps its critique snapshots in the project's `.impeccable/critique/`. That is the tool's own bookkeeping, not a project file.
- The direction contract went to `b/DIRECTION.md`, not `.impeccable/surfaces/`, to stay inside `b/`.
- The canon choice was not written to PRODUCT.md as a brand commitment (PRODUCT.md is read-only in this experiment).

## Round 2: 15 Oct 2026, 21:45–22:17 (about 32 min)

**Evaluation.** `/impeccable critique` ran dual-agent again.
- **Score:** 23/32 (72%, Good). Trend 20 → 23.
- **Specificity:** partly authored. The route line and step line belong to the product; the hero and the close are category canon.
- **Detector:** exit 0, 0 anti-patterns. 7 design-system advisories against the new DESIGN.md:
  - six font sizes off the ramp;
  - the Menu border read as black (currentColor).
- **Overlay:** 7 text-occlusion false positives at 390px (links inside the closed `<details>`).
- **Measured:** contrast at least 6.7:1, no overflow, phone bar and menu behave as specified.

**Top issues:**
1. P1: the header breaks at 961–1010px (logo and nav wrap to two lines).
2. P1: thin advisor credibility layer.
3. P2: destination blocks are giant links (screen-reader name starts with coordinates; no visible affordance).
4. P2: the close does not land.
5. P3: the hidden phone bar stays focusable; `aria-label` on a div; wraps at 320px.

**Questions: answered by the user.**
- Advisors: "visual only, no new content".
- Close: "presentation only".
- Scope: "all 5 + font drift".

**What changed:**
- **adapt.** Nav becomes the Menu at 1100px and tightens below 1240px. The wordmark never wraps. Measured at 961, 1000, 1101, 1180 and 1240: no wrap; gap 78px at 1101.
- **harden.**
  - Destinations are `article`s with the h3 as a stretched link plus a visible "See Raja Ampat / See North Sulawesi →" text link. The nav points to `#raja-ampat` and `#north-sulawesi` instead of both going to `#where`.
  - The phone bar is a `nav` that is `inert` and `visibility: hidden` while off screen, with no wrap at 320px.
  - The menu label switches Menu/Close and an outside tap closes it.
  - FAQ and Email links are 44px wide. The advisor link is 44px tall.
  - The dead footer padding is gone. An SVG favicon fixes the 404.
- **Trade, visual only (same words).** A 2px ink rule opens the grid. "Your client remains your client. We handle Indonesia on the ground." is set in the Quote role. The three facts are hairline-divided rows.
- **Close, presentation only (same words).** An ink field. The heading is at Display size on the left; the lead and actions are bottom-aligned on the right. A hairline separates it from the footer.
- **typeset.** Sizes snapped to the DESIGN.md ramp:
  - buttons 15px;
  - wordmark 19px;
  - hero sub 19/17px;
  - prices 19px;
  - steps body 17px;
  - legal 13px;
  - footer wordmark 24px;
  - body stays 17px on phones.

  Quote line height is 1.4 (the detector flagged 1.25 on the multi-line trade quote). The Menu and line-button borders use tokens, not currentColor.
- The duplicated coordinates on the guest-story slot are removed.
- DESIGN.md and design.json are updated for the deliberate system changes (breakpoints, close at Display size, quote line height, sizes), with a "Revision, round 2" note.
- `impeccable detect` exits 0 with 0 advisories. No ignores were added.

## Round 3: 15–16 Oct 2026, 22:17–22:45 (about 28 min, evaluation only)

**Evaluation.** `/impeccable critique` ran dual-agent.
- **Score:** 26/32 (81%, Good). Trend 20 → 23 → 26.
- **Specificity:** specific, a committed coherent world (route line, coordinates, yellow only for actions). The remaining risk is that ink + safety yellow + heavy wide grotesque is shared with outdoor brands.
- **Detector:** exit 0, 0 findings, 0 advisories. The overlay at 390px again shows 7 text-occlusion false positives (links inside the closed `<details>` menu).
- **Measured:**
  - contrast at least 6.72:1;
  - every tap target ≥44px;
  - no overflow at 320–1440;
  - no 404s;
  - the bar and the menu behave as specified.

**Issues (no P0/P1):**
- P2: no persistent action at 961–1100px. The header is already collapsed to Menu, but the phone bar only starts at ≤960.
- P3: the hero advisor line wraps or is orphaned on phones.
- P3: the ink close fuses with the ink footer.
- Minor:
  - two tab stops per destination;
  - the bar stays visible while the menu is open;
  - © baseline 4px off;
  - the volcano tone reads as dead grey.

**Questions: answered by the user.**
- Scope: **"stop"**. Nothing material is left, so the branch finishes without edits.
- Warm note in the system: "no, wait for photos".

**What changed:** nothing (by decision). Final screenshots: `node experiments/harness-ab/shoot.cjs b final`.

## Totals

- 3 rounds, about 1 h 45 min including subagent runs. The user answered questions in all three rounds.
- Files in `b/`:
  - index.html (the page);
  - DIRECTION.md (direction contract);
  - DESIGN.md + design.json (system, written by impeccable-documenter, revised in round 2);
  - LOG.md.
- No detector ignores were added in Branch B.
