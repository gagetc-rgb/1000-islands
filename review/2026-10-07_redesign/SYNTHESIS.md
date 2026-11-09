# Synthesis — v4 review → v5 plan (7 Oct 2026)

Inputs: reports A (design critique), B (detector + measurements), C (category canon, 15 sites), D (marketing and sales), E (mobile UX), F (creatives + layout system); home concepts G1 cinematic, G2 editorial, G3 map (pending at time of writing). All in `review/2026-10-07_redesign/`.
Markers: ◆ confirmed by evidence (measured / several agents / sources) · ◈ likely · ◇ judgment call.

## 1. Where the agents agree (high confidence)

| # | Finding | Who | Evidence |
|---|---|---|---|
| 1 | Home first screen: the bare "Where we go" heading peeking under a 74% hero reads as a crop, not a cue. Desktop hero should fill the screen. | A, C, D, E, F, G1, G2 | ◆ B: hero 74% desktop / 76% phone; C: 12/15 category sites fill the screen, only the most dated one peeks a bare heading |
| 2 | "Where we go" must be photo-led: no map tile as the largest element, no boxed cards, no pills. Yachts are a format, not a place. | A, C, D, F, G1, G2 | ◆ C: 0/15 homes show a map; F: destination photos are 255px thumbnails whose ratio drifts 1.30→0.67 with screen height |
| 3 | Photo shapes float with screen height (vh-sized heights + grid widths): heroes 2.5–3:1 letterboxes, product photos 2.3–2.8:1 strips. Fix with fixed ratios per slot. | F (measured), A, E | ◆ F table 1.1 |
| 4 | The look is a component library: too many boxes, pills, borders, dashed section lines, 12 font sizes, all headings 700. | A, B, F, G1, G2 | ◆ B: up to 25 boxes (advisors), 12 pills (yachts), 8–13 font sizes per page |
| 5 | Annotation labels + dashed lines are on every block and make the prototype look worse than its layout. Hide by default, toggle on. | A, B, F | ◆ B: on every block of every main page |
| 6 | Travel agents page: too long (7.8 desktop / 14.2 phone screens), proof third, after a banned icon-tile grid. Reorder: proof first, terms as a list, ≤5 desktop screens. | A, B, D, E | ◆ B/D/E measured |
| 7 | Phones: compare by stacking, not swiping. Trip levels and home destinations stacked; carousels only for browse content. | A, C, D, E | ◆ NN/g mobile carousels; E: only Basic visible |
| 8 | Phone bottom bar: duplicates the CTA band, drops the configured trip, flashes on load. | A, D, E | ◆ E measured (S1–S3) |
| 9 | Phone heroes are text slabs: two stacked buttons + 5-fact band leave 111–138px of photo. One button, 3 facts in one row. | A, E, F | ◆ E/F measured |
| 10 | Keep: region page skeleton (hero → facts → sticky tabs → why → trips → reviews+FAQ → CTA), days slider + 3 levels + prefilled form, trust list at the price, person who answers, short form, luxury shown once, block order on home. | A, C, D, E | ◆ canon 4/4 (C); D |

## 2. Decisions for v5

### Home (base: G2 "Editorial split"; G1 and G3 kept as alternatives in `concepts/`)
- **Hero = the whole first screen** (100svh − header) on desktop and phone. Ends on the screen edge. One button "Plan your trip" + quiet "Where we go ↓" cue. Sub-line adds the proof placeholder: "Private trips to Raja Ampat and North Sulawesi · X years on the ground".
- **Where we go = one screen**: narrow text column (heading, lead, small locator map) + two tall portrait panels Raja Ampat | North Sulawesi with places and "from" price on the image. Phone: stacked 4:5 panels.
- **Yacht charters = a separate panoramic band** (≈3:1, phone 4:3) right after, "whole boat · from $X per day". Different shape = different product; the one quiet luxury moment.
- **Remote, made easy**: the 4 real steps as a typographic row (numerals carry meaning) + one line naming what we handle (flights to Sorong/Manado, pick-up, boats and guides, dive safety, medical evacuation plan, team on the ground 24/7). D's point: the promise must be concrete.
- **Guest story**: image bleeding off the left edge + heading, pull-quote, actions. Meta line under the heading (house rule: no kicker).
- **Reviews**: unboxed, hairline-separated, rating line. White background.
- **For travel agents**: ruled band, strategy line "Your client stays your client. We handle Indonesia on the ground." + "Get trade rates". Nav item no longer greyed.
- **Start with an idea**: dark band, person as a 4:5 portrait (not a 72px circle).
- Map tile removed from home as a block; survives as a small locator in "Where we go".

### System (wf.css v5, per F)
- Type: 8 roles (display 88/76/64 · h1 64/56/48 · h2 40/36/32 · h3 22 · lead 20 · body 17 · small 14 · micro caps 12), weights 400/500/600 only, Inter tracking; phone steps.
- Ratios: 16:9 full-bleed (phone own crop), 3:2 landscape content, 4:5 portrait content, 16:9 video inset, 1.91:1 share. Fixed `aspect-ratio`, no vh-driven product photos.
- Placeholders: tonal fills in three tones (deep/mid/pale, predicting the photo's brightness) with a shot caption; size spec only in notes mode. No crossed boxes. Photos square-cornered.
- No boxes except form and dialogs; hairlines only as list dividers, tabs row, footer; pills only for interactive choices; one tint zone per page; dark CTA band + pale footer close every page.
- Notes mode: labels, photo specs and section lines hidden by default; `?notes=1`, key N, or a footer link turn them on (Penpot extract runs in notes mode).

### Region pages (Raja Ampat, North Sulawesi)
- First screen: header + photo + facts row **on** the photo + tabs row (desktop). Phone: H1, one line, one button, 3 facts in one row, tabs row; tabs stick while the header is hidden.
- Why go: one large video (8 cols) + two photos (4 cols), not 1+4.
- Areas: map (6 cols) beside a typographic list of the three areas with small 3:2 thumbs. Same ratio on both regions.
- Trips: unboxed level cards, 3:2 photo = the actual property, one shared basis line under the cards ("per person, 2 travelling · includes … · not included: flights to Sorong"), rating line beside the trust list, "See a real 9-day trip →" link to the story. Comfort keeps the filled button (compromise effect, no claim). Phone: live 3-price summary under the slider + stacked compact rows.
- Reviews + FAQ, CTA: keep, unboxed reviews.

### Yacht charters
- Same first screen. Why a yacht: keep (4:5, larger). Boats: unboxed 3:2 cards, specs as one middot line, price "whole boat · 7 days" + per-day. Helicopter: unboxed 16:9 inset beside text. Where we sail: map + text links (no photo strips). FAQ in 8 columns.

### Guest stories
- First screen keeps (title + featured story). Meta under the heading. Stories 2–3 expand in place (route + quote) so "Read the story" links from Yachts/Agents land on a real story. "Plan a trip like this" pre-fills region, level, days.

### About
- First screen: title, lead, a proof line (X years · X private trips · ★ X.X Google, placeholders) and one large field photo; team as a row of four 4:5 portraits with names. How we travel and FAQ keep.

### Travel agents
- Hero keeps (best composed on the site). Tabs ≤5. Order: hero → Track record (licences, case study, two agent quotes) → How we work ("Indonesia is easy. Until it isn't." as heading, 6 terms as a 2-column list, what we handle as one line, booking in 4 steps as a line) → What you can sell (reuse the home panels) → FAQ → form. Trade-kit PDF button removed (content not in the offer; can return when a PDF exists).

### Plan your trip / Thank-you
- Phone: reassurance strip (face + reply time + "Prefer WhatsApp?") above the form. Optional level chips (Basic / Comfort / Premium / Not sure). Form single-column when its column is narrow (fixes 90px fields in landscape / iPad).
- Thank-you: recap of the picked trip, the person's face and reply window, one photo.

### Phone behaviour (wf.js)
- Bar hidden by default (no flash), quiet over hero, CTA band, first-screen story, trip cards, forms, footer; on region pages it carries region + days; WhatsApp links use `wa.me/?text=` with page and trip.
- Pager arrow size fix; burger shows ✕ and locks page scroll; compact phone footer; landscape (max-height 500px) uses phone header/type.

### Footer
- Legal line placeholder: "PT … · registered address · licence no. … · since 20XX" (credibility, Stanford guideline via D).

## 3. Not doing now (and why)

- Transparent header over heroes: a visual-direction choice (C: category split), Stage 3.
- Cinematic chapters (G1): ~9 screens, weaker comparison; its hero index idea is noted as an option.
- Days slider → day chips (D): owner's own idea and a category differentiator (C); keep the slider, consider −/+ steppers later.
- Renaming "Basic" → "Classic" (D): naming is the user's open decision.
- New pages, trade-kit PDF, admin "+ Add enquiry" (WhatsApp leads): outside this design pass; listed for the owner discussion.
- Brand typeface and colour: next stage.

## 4. Rules to update
- `LAYOUT_RULES.md`: R1 home (full screen, no cut heading), R1 landings (facts on photo; phone 1 button + 3 facts), R2 trips/gallery/Where we go, R5 slot ratios (new), R6 notes hidden by default (new). R3, R4 keep.
- `tools/penpot-sync/fit-check.cjs`: R1-home and R2 checks rewritten to the new wording.
- Penpot mirror becomes stale after v5; re-sync only after the user approves v5.
