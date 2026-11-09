---
target: wireframes/home.html
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\Kirill\\Desktop\\1000 islands\\wireframes\\home.html"
target_fingerprint: "sha256:7d015bba757b5b3a40f6b9ca39b8d6b00984788ed86dba3043731e0c7690554f"
target_path: "C:\\Users\\Kirill\\Desktop\\1000 islands\\wireframes\\home.html"
timestamp: 2026-10-04T04-26-36Z
slug: wireframes-home-html
---
Method: dual-agent (A: a8ae283316e9da00f, B: afa7da1dea031752d)

# Critique: wireframes/home.html (Stage 1 low-fi, Persuade mode)

## Health score: 22/32 (69%, Acceptable). Heuristics 7 and 10 n/a (Persuade surface).

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | 3 | No active-nav state; 17 of 24 links are href="#" |
| 2 | Match system / real world | 3 | "phinisi", "muck diving" unglossed; price has no unit |
| 3 | User control and freedom | 3 | Burger is a span, mobile nav has no menu |
| 4 | Consistency and standards | 3 | Region cards are links, journey cards are divs; CTA case varies |
| 5 | Error prevention | 2 | Advisors can misroute via "Plan Your Journey" to a consumer-only form |
| 6 | Recognition rather than recall | 3 | Place chips look clickable, are spans |
| 7 | Flexibility and efficiency | n/a | Persuade surface |
| 8 | Aesthetic and minimalist | 3 | "Plan your journey" x5, "made easy" x3 |
| 9 | Error recovery | 2 | Dead-end links give no recovery |
| 10 | Help and documentation | n/a | FAQ lives on About by design |

## Design specificity
Copy is ownable ("Follow the islands, not the roads"); the skeleton is category-standard. The differentiator ("Remote, made easy") is told, not shown.

Detector: exit 0 on wireframes/ (only suppressed rule: overused-font=inter, accepted Stage 1 ignore). URL mode: heading-rhythm on 3 journey-card h3 (likely false positive, caused by margin-top:auto on card meta). Contrast: 0 failures over 42 pairs (lowest 4.73:1).

## Priority issues
1. [P1] Core promise has no proof; the only people slot is inside the B2B block. No experience fact, no face, no safety/medical/support evidence, reviews are placeholders. Fix: proof strip under hero, founder/guide face + WhatsApp in closing band, real facts only.
2. [P1] Section 4 "Remote, made easy" is the differentiator but the most generic block (4 generic steps, leads with the negative). Fix: one real "what we handle" chain with a CTA to a sample itinerary; positive-first lead; map shows access legs.
3. [P1] Nav and CTA hierarchy noisy: 8 header items from mixed taxonomies, "Plan Your Journey" x5, "Private Yachts" x3, hero secondary CTA duplicates header button. Fix: nav to 5 + CTA (needs owner decision, STRUCTURE_v3:41), different hero secondary CTA, one canonical label.
4. [P2] Shelf sequencing and false affordances: first bookable product at ~1,727px desktop / ~1,876px mobile; hero "Explore journeys" is href="#"; journey cards not links; prices without unit; footer items not links.
5. [P2] Advisor teaser sits right before the closing CTA and has a filled primary button; B2B is priority #1 but gets one block at ~75% scroll depth.

## Accessibility / structure (verified)
No <main>, no skip link, burger not focusable and inoperable, no :focus-visible styling (browser default ring), tap targets under 44px: burger 40x40, logo 31px, "Read the story" 23px. One h1, no skipped heading levels (footer column titles are h2).

## Persona red flags
Jordan: no map/price context above fold, jargon, dead "Explore journeys", no mobile menu. Riley: 17 dead links, div cards, non-tappable chips inside anchor. Casey: sticky bar good, hero card covers ~75% of hero media, page 6,970px tall. Dana (advisor): muted grey nav link, unproven claims, no trade contact.

## Minor
.label chips read as eyebrows (house ban), hide in review build; section 3 h2 has no word "journeys"; hero lead starts "Made easy." duplicating section 4; star rows have no accessible text; footer has no phone/email/entity.

## Questions
1. If B2B is priority #1, should advisors land on the home at all?
2. What is the single scariest part of getting to Misool, and can the page show it being solved?
3. Which idea does a guest repeat at dinner, and should the helicopter-and-phinisi shot own the page?

---
## Correction (added after reading the project folder)
- Issue 5 (move the advisor teaser after the closing CTA / make it quieter) is WITHDRAWN: it contradicts strategy.md section 13 ("do not bury B2B") and review/03_devils_advocate.md R2. B2B is priority #1.
- Issue 3 (nav 8 -> 5) is NOT a P1: the 8-item menu is locked in STRUCTURE_v3 line 41; the earlier decision was to fix the overflow (burger breakpoint, M5), not cut items. Keep only as an owner question.
- Issues 1, 2 and 4 duplicate review/01_ux_critic.md and review/03_devils_advocate.md (MUST list M1-M14, dated 2026-10-02). As of 2026-10-04 most of those MUST items are still not applied to wireframes/ (no advisors.html / yachts.html, 17 of 24 links on home still href="#", star rows still present, no "US$" prices, "West Papua" still in landing.html). Acting on that list comes before any new critique.
- New in this run (not in the earlier reviews): no <main> and no skip link, burger not focusable, region chips are spans inside an anchor, hero primary CTA "Explore journeys" is href="#", "Plan your journey" repeated 5x, tap targets under 44px (logo 31px, "Read the story" 23px).
