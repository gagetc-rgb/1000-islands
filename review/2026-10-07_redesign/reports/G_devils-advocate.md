# G · Devil's advocate: the case against the v5 plan (7 Oct 2026)

Inputs: BRIEF, SYNTHESIS, reports A–F, PRODUCT, PIPELINE, LAYOUT_RULES, CLAUDE.md, the 5 Oct notes, the offer, SITEMAP, v4 sheets and the three home concepts. I measured page length in headless Chrome (:5174).
Markers: ◆ confirmed (file or measurement) · ◈ likely · ◇ opinion.

## 0. Verdict

The plan's core should stay. That core is photo-led destinations, fixed slot shapes, fewer boxes/pills/sizes, the advisors reorder and the phone-bar fixes. The problems:
1. It misreports dissent on the two most contested calls.
2. It picks the home direction (G2) on the owner's behalf, and it did so before G3 existed.
3. Home gets **longer**, not simpler ◆. At 1440x790 / 390x664, v4 is 4.5 / 7.0 screens. G2 is 6.4 / 10.1 (+42% / +44%), G3 is 5.4 / 9.7, G1 is 7.7 / 9.3.
4. It reworks pages the user rated "Good"/"OK" on 5 Oct beyond their defects.

## 1. Fair to the reports? Not in three places

- ◆ Row 1 counts A as backing a full-screen desktop hero. A proposed `100svh − header − ~96px`, with the next block's **photos** peeking, and ~88svh on phones.
- ◆ Phone hero: three of four analysts want imagery to peek.
  - A: ~88svh.
  - C: ≤75svh, heading plus photo top; 5 of 9 tailor-made sites do this.
  - E: 100svh − header − 56px; anything that shows should be "the top edge of the first destination photo".
  - Only F (and the concepts built on F) goes full-screen. The synthesis records no dissent.
- ◆ Three "keeps" are dropped.
  - A, C and D said keep the desktop region first screen. The plan adopts F's facts-on-photo.
  - A said keep the full-bleed home story band. The plan swaps it for G2's bleed-left image.
  - F gave ratio *ranges* ("never thinner than 2:1" at 1366x657). The plan turned them into "fixed aspect-ratio".

## 2. Cosmetic churn

| Change | Verdict | Reason |
|---|---|---|
| Weights 400/500/600, Inter tracking, 88px display | **CHANGE PLAN** | Cut 12 sizes to ~8 roles: hierarchy is in scope, and B measured it. Skip weight/tracking tuning. Both depend on the typeface and get redone next stage, while every text node in Penpot changes. |
| Square corners, hairline system, "one tint zone" | **DROP for now** | G2's own rationale: "Square corners and hairlines feel austere in grey. They depend on the stage-2 brand typeface and colour." |
| Region desktop: facts on the photo | **DROP** | A, C and D said keep. Without the transparent header (deferred), the gain is ~80px, at the cost of more text on the photo. **KEEP** the phone fix (1 button, 3 facts), which A, E and F agree on. |
| Home story: bleed-left image | **DROP** | Keep v4's full-bleed band. Fix its 2.6–4.0:1 ratio (F) and move the meta line under the H2. |
| Yacht as a full-bleed panorama | **CHANGE PLAN** | Two full-bleed bands on home breaks F's "one image band per page", and the yacht becomes the second-largest image. That is not "luxury once, quietly". Use D's line under the panels, or a 3:1 band at content width. |
| Yachts: "whole boat · 7 days" + per day | **DROP** | The 5 Oct audit fixed one unit (per day, whole boat). The unit is owner question 4. "7 days" contradicts the days slider. |
| About: proof line, field photo, team row | **CHANGE → keep v4 structure** | The user rated About "Good" (5 Oct #7), and R1 = title + 2x2 team. Real portraits fix the empty circles. A "★ X.X" slot invites numbers nobody has (PRODUCT.md). |
| Stories 2–3 expand in place | **CHANGE PLAN** | Only story 2 (the yacht case study) is linked from elsewhere. Expand that one only. |
| Plan: optional level chips | **DROP** | Plan was rated "OK" (#9), and C says "do not lengthen". The prefill already carries the level. |
| Tonal placeholders | **KEEP** | Cheap, reversible. |

## 3. Reversals of agreed decisions

- **Home map → small locator: CHANGE PLAN.** STRUCTURE_v3 home block 2 is "map: the two regions with their places" ◆, and 5 Oct pass 2 says "Home 'Where we go' gets a map of Indonesia" ◆. Shrinking it is defensible (A, C, F), but it is a reversal, and the user should see it as one.
  - G3, still "pending" when G2 was chosen, keeps the map as the index of offers.
  - G3 is the shortest concept on desktop and answers the "far and complicated" fear. An editorial map was A's own signature idea.
  - Compare G2 and G3 before locking. G3 costs an illustrated map plus routes the owner must confirm.
- **Labels hidden by default: CHANGE PLAN.** PIPELINE has the owner comment by block label, and pass 2 kept the labels. Owner links (HTML and Penpot) should open in notes mode; clean mode is for our own review. The cover should explain the toggle.
- **LAYOUT_RULES (adopted 6 Oct after the user's laptop complaint): CHANGE PLAN.** R2's invariant (slider, all prices and button on one screen at 1366x657) stays the hard rule; F measured that a fixed 3:2 breaks it there. Use F's floors. "When adding a page" step 2 ("height in vh… avoid tall fixed aspect ratios") contradicts R5 and is not on the plan's list.
- **Carousels → stacks: KEEP.** It undoes the 6 Oct pager work but fixes the same complaint better (NN/g, four reviewers).
- **Trade-kit button removal: KEEP.** It is not a reversal. SITEMAP T8 says "Partner kit (sent after registration, not on the site)" ◆.
- Advisors tabs: the plan allows ≤5; A and E say ≤4.

## 4. Visual direction too early: CHANGE PLAN

PIPELINE Stage 3 is "2–3 directions for the home hero". CLAUDE.md asks for a 4–6 variant shotgun from which **the owner picks** ◆. The offer shows structure "без финального дизайна" first ◆. The synthesis ran that shotgun internally and baked G2 into the grey prototype, so the owner's later choice shrinks to skins over G2. Grey does not protect against this: owners anchor on layout more than colour ◇.

Where to draw the line:
- **Now:** composition that encodes structure and creative sizes. That means a full-bleed hero, two large region images, fixed slot ratios, no boxes and one button.
- **Stage 3 input:** asymmetry, bleed-left images, giant numerals, square corners, hairlines, 88px display and weights.

Keep G1, G2 and G3 as shotgun seeds.

## 5. Phone hero: CHANGE PLAN

**Phone:** about 85svh, ending on the top 80–120px of the first region photo with its name on it, not on a heading band.
- (a) The user's complaint is the bare heading. They "forgive" Guest stories, whose first screen shows story content with its photo ◆. Peeking content reads as intended; a cut heading does not.
- (b) Three of four analysts, half the category on phones, and NN/g all point this way.
- (c) "Full screen" can't hold a clean edge on phones. svh assumes expanded browser bars ◆ (CSS Values 4). Once they collapse, whatever sits below shows anyway ◈, and in-app browsers (Instagram) differ again ◈. Design the peek rather than inherit an accidental one.

**Desktop:** KEEP full-screen plus the cue (C and F; A dissents), and check scroll depth after launch (analytics are in the offer, item 8).

## 6. Missing (two or more reviewers)

- **Content brief to the owner now** (E S15, F 1.4–1.5): vertical video cuts, 4K originals, the real property per level, 5–12 photos per boat. PIPELINE collects content "from Stage 1 onward" ◆. G2 itself says it "needs real vertical photography".
- **Direct line in the desktop header** (C, D): a WhatsApp text link.
- **"Not included: flights to Sorong" → a link to the FAQ answer** (A, D). Instead, the plan's home line says we handle "flights to Sorong/Manado". That contradicts the trip cards ◆ and is an unconfirmed fact. Fix it.
- **The before/after "why" sheet the user asked for.** It is also the churn filter: drop any change that has neither a measured defect nor two reviewers behind it.

## 7. Scope: KEEP PLAN, with flags

There are no new pages or products, and no group tours, camping or Komodo ◆. Flags:
1. The owner's content load grows: stories, portraits, six properties, boat sets, proof numbers, vertical video. List it as a checklist, not as promises.
2. G3's illustrated map is outside the offer unless we draw the SVG ourselves ◇.
3. If vertical photos don't exist, a shoot is the owner's cost. Say so now.
4. The Penpot rebuild, `extract.cjs` notes mode and the `fit-check.cjs` rewrite are unpaid hours on a fixed price.

PLAN set approval #1 for 2–8 Oct ◆, and there is no written sign-off yet. v5 will delay it ◈.

**Recommendation:** v5 = structure + measured defects + slot ratios + the phone peek. Show the owner, then take the style layer to Stage 3.
