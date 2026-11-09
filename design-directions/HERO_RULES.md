# Hero composition rules (1 Nov 2026)

Shared by all five directions (`base.css`, block "Hero composition"). Directions change type and colour only, never position.

## Evidence
- `_build/hero-layout-bench.cjs` measured the first screen of reference travel sites at 1440x900 (screenshots kept per run).
  Readable results: Explora (the owner's favourite), Six Senses, Scott Dunn, Black Tomato, Voyageurs du Monde / Original Travel,
  Abercrombie & Kent, Rosewood, Audley, One&Only. Aman, Belmond and andBeyond blocked the headless browser or hid the hero
  behind a cookie layer.
- Pattern on the left-aligned majority (Explora, Six Senses, Scott Dunn, Original Travel, A&K): one stacked group,
  headline → lead → button, starting on the same left edge as the logo; the group's centre sits at 50–66% of the
  viewport height; the button sits directly under the lead (30–64 px gap), never pushed to the opposite edge.
  Centred blocks (Rosewood, Audley, One&Only) exist, but the user rejected centred copy over video (round 1).
- Type sizes from the earlier `hero-bench.cjs`: H1 46–80 px at 1440 (median ~60–66), H1:lead 3.4–4.2, 1–2 lines.
- Impeccable layout and typeset references: group by proximity, tight intervals inside a group and generous
  around it, body measure in range, obvious size steps.

## Rules
1. **One group, left, on the logo line.** H1, lead and actions stack in one column aligned to the header's inner edge
   (`--max-hdr`, `--gutter`). Nothing in the hero is spread across the full width.
2. **Lower-middle, not the corner.** Bottom padding `clamp(72px, 19vh, 200px)` puts the group's centre at 62–68%
   of the viewport height on 1280x720, 1440x900 and 1920x1080. The centre and the right two thirds of the video stay clear.
3. **Type.** H1 `clamp(40px, 4.3vw, 62px)` times a per-direction factor for the face's width (Saira Condensed 1.12,
   Source Serif 1.05, Archivo expanded caps 0.86), always two lines. Lead `clamp(17px, 1.3vw, 19px)`, ratio ≈ 3.3–3.6.
4. **Rhythm.** H1 → lead 16–24 px (tight: one thought); lead → actions 28–40 px (generous: a new step);
   button → text link 32 px.
5. **Lead breaks by meaning.** Two lines on desktop, broken after "North Sulawesi," (explicit `<br>`, hidden on phones).
6. **Legibility without a grey veil.** A radial scrim from the bottom-left corner sits only behind the copy, plus a thin
   top band for the header; a soft text shadow on H1 and lead. The rest of the frame keeps its colour.
7. **Phone (≤760 px).** Same group, bottom-anchored in the thumb zone (padding ≥ 48 px), H1 34–42 px, lead 16 px full width
   (two lines), buttons in one row.
8. **Video control.** Only v3 Quiet: a 14 px pause/play glyph and a 1 px hairline that fills with the loop, on the copy's
   left edge at the bottom (after Aman). The other directions have no control.

## Copy
H1 "Indonesia. Off the map." (user, 1 Nov: the logo descriptor already says "Remote Indonesia"; the full line was the owner's).
Lead: "Private journeys to Raja Ampat and North Sulawesi, led by our own team on the ground."
("far beyond the usual routes" repeated "Off the map"; "Planned and" added nothing.)

## Checks run
Measured and screenshotted v1–v5 at 1280x720, 1440x900, 1920x1080 and 390x844: H1 two lines and lead two lines everywhere;
Impeccable detect shows the same 32 findings as before this change (none in the hero).

## Header: two doors (1 Nov, late)
- "Travel agents" is an outlined twin of the main button, at the end of the header next to "Plan your trip" (filled):
  travellers and agents each get a door of the same shape and type, the B2B one set apart from the travel links.
  Same in the phone menu. Class `.btn-trade` in base.css; each direction's `.btn` gives it its shape.
- No text below 16px anywhere (user rule, 1 Nov). At 16px the header switches to the menu where links + both buttons
  stop fitting with 12px clearance (measured with web fonts loaded, `.hdr .logo` text boxes): v1 ≤1080 (one "Destinations" dropdown since 2 Nov), v2 ≤1219,
  v3 ≤1519, v4 ≤1199, v5 ≤1199 (one-line caps wordmark, no descriptor in the header since 2 Nov) (2 Nov, after lighter header buttons: 40 px tall, 18 px sides). Nav gap clamp(12px,1.1vw,20px).

## Hero video per design
v1 hill first (r1), v2 turtle first with fish (r2), v3 cape first (r3), v4 coral first with fish (r4), v5 under the rock (r5);
the hill and the cape as shot (the warm grade made the jungle acid green). `_build/hero_v3.py` r1–r5, `hero_final.py`.

## Contrast check
Lead over the video, sampled every 1.5 s across the loop (text hidden, white-on-pixel ratio): median 10–13:1, 90% of
pixels ≥4.8:1 on desktop and phone, before the text shadow. The live-URL detector's v3 finding (1.1:1) is the light
loading screen captured before reveal.

## Full-screen video vs solid header (2 Nov)
Two families on purpose, so the five directions differ: v2 Field kit and v3 Quiet put a transparent header over the video
(video fills the whole window; header turns solid once the hero scrolls away, base.js `.solid`); v1 (black, 72 px),
v4 and v5 keep a solid header bar.

## v1 Expedition: frosted glass panel (2 Nov)
User's idea, "like frosted glass, with a little refraction". Headline, lead and actions sit on one panel (`.hero-group`,
a wrapper in the template, styled only in v1.css): dark tint .30, blur 16-18px, rim light on the upper edge, a faint sheen
from the top-left; Chromium also bends the video through an SVG displacement filter (`#glass`, build.py GLASS_SVG),
Safari and Firefox show the plain frost. Panel edge on the logo line; on phones 8px from the screen edges, H1
clamp(30px,9.1vw,40px) so it keeps two lines. Corner scrim lowered to .45. Buttons in v1: 10px corners (not pills).
Contrast, measured on real screenshots with the text hidden, 6 moments of the loop, 1280/1440/390: min 6.4:1, p5 >= 7:1,
median 10-13:1. The live-URL detector reports 1.0-1.1:1 on the lead and headline: its sampling does not see the
backdrop blur, so this is a false positive (no ignore added yet).

## Final pass before the owner (2 Nov)
- Hover: every button and link now answers the pointer (Puppeteer hover test on all controls of v1-v5 at 1440: only the
  logos stay still, by convention). Added: v1 header/trade white buttons, v2 yellow buttons over video and dark trade
  button, v4 trade button, v5 dark CTA button, "Where we go" hero link, footer links, burger, phone-menu links.
- Keyboard focus ring: `--focus` is white on dark and video sections, dark inside the light menu panel.
- Copy: cut repeats ("built around your days" x2, "7 days a week" x2, "Nine days"/"9 days", "Yacht charters" heading +
  "See yacht charters" button -> "Plan a charter", footer "Remote Indonesia" + "remote eastern Indonesia" -> line removed,
  footer column "Where we go" holding yachts -> "Journeys").
- Audit at 1440/1280/390/320: no dead anchors, all images and videos load, no text under 16px, no tap target under 24px,
  no horizontal scroll, no heading skips, no console errors.
- Live-URL detector: v2-v5 exit 0 (v5 advisory: chart grid, deliberate); v1 exit 2 only for the glass panel false
  positive above. A file-scoped ignore does not reach live-URL scans, so none is kept.

## Independent review, fixed (2 Nov)
- v3 final CTA button was --bg on --bg: now ink. v2/v4 yacht price no longer a pill that reads as a button (plain type).
- "Travel agents" hover now fills solid in every header and in the phone menu; v1/v5 lost the doubled outline.
- Phone header fits at 320 px (wordmark 16px, tracking .05em below 360 px). Phone menu closes on Escape and outside tap.
- Copy: "About us" -> "How it works" (it points at the four steps); "the rest is on us" (= we pay) -> "and we handle the rest";
  "on the ground" kept in the hero and the 8-years line only; story meta "Guest story"; review placeholders neutral.
- v3: r3 opens on the same reef island as atoll.mp4, so the v3 story uses lagoon.mp4 (left/bottom gradient so the copy
  holds 5:1+). The r3 cape puts white sand under the lead: corner scrim .82 held to 34% (`--hero-scrim-hold`, base.css).
  Whole-loop screenshots, text hidden: lead min 4.6:1, p5 >= 6:1; H1 p5 >= 5.3:1 (large text, 3:1).
- Left as is, on purpose: v3 full nav only from 1520 (centred wordmark, Aman-style); v1-only "Destinations" dropdown
  (trial for the owner to compare); in-page self-links ("Read the story", "Get trade rates", CTA, footer contacts)
  because inner pages and the form are not part of the home-page directions.
- Live-URL detector: v2, v4, v5 exit 0 (v5 advisory: chart grid). v1 (glass) and v3 (hero lead, min 1.1 / median 4.9:1)
  flag low-contrast that whole-loop screenshots do not reproduce.

## v1 glass, revised (2 Nov, later)
The user meant glass on the "Plan your trip" button only, not a panel behind the copy. Panel, wrapper and SVG refraction
filter removed; `.btn-hero` in v1 is a light frost (white 26% -> 12% gradient, blur 14px, hairline rim) that fills white on
hover; corner scrim back to .84. Button text over the whole loop: min 5.5:1. Nav kept as in the owner's Stage 1 mockup:
five links (Raja Ampat, North Sulawesi, Yacht charters, Guest stories, About us) + Travel agents + Plan your trip.

## Back to the Stage 1 mockup (2 Nov, user)
The directions only dress wireframes/home.html; structure is the owner's. Removed: the "Above the water" gallery (my
29 Oct addition, never in the mockup). Restored from the mockup: section 04 title "Remote, made easy"; story meta
"Guest story · Comfort · 9 days · Month, year" and the "All guest stories" link; reviews "Google rating X.X · XX reviews ·
Read on Google", month and year in captions, third review Raja Ampat; CTA "WhatsApp us" and the person who answers
(portrait placeholder, "Role · replies within 24 hours, 7 days a week"); footer with Where we go / Travel / Company /
Contact, legal links and the company line. Kept the user's explicit copy edits (hero lead, yacht block, header wordmark).
v2/v3 long meta lines no longer in caps (detector all-caps-body).

## Owner's words + travel-agent block (2 Nov, user)
Owner phrases kept after review (user, 2 Nov): "Living between volcanoes and the sea", "We design the route around you.", footer "Private journeys and expeditions across Indonesia." Rejected as weak or clunky: "We know many of these places personally.", "We handle the logistics in Indonesia.", "You do not need to know the exact route." (reverted). Earlier list:
change: "We know many of these places personally." (where we go), "Living between volcanoes and the sea" (North
Sulawesi), "We design the route around you." (step 2), "Your client remains your client. We handle the logistics in
Indonesia." (agents), "You do not need to know the exact route." (CTA), "Private journeys and expeditions across
Indonesia." (footer). Agent block: v1 black band -> warm sand #ebe2d3 with black button; v3 hairlines -> stone band
#ddd5c7; both with a larger heading. v2, v4, v5 unchanged; a fuller agent block is an owner question.

## About us link (2 Nov, user)
In the mockup "About us", "How we travel" and "FAQ" live on their own page (about.html); the home page has no about
block. The home designs therefore point these links at fragments that do not exist on the page (#about,
#how-we-travel, #faq): a click does nothing, instead of landing on the four steps, which are not an about block.

## Travel agents block, round 3 and design 5 (2 Nov, evening)
- `trade-options/round-3.html`: 8 motion variants. User review: the swimmer frame (DJI_0442) is off-topic; open ocean instead. Four graded frames in `assets/img/ocean-*.webp` (deep and glint from DJI_0074, Sangihe; shallow from DJI_0080 29 s, Siau/Sangihe; above from DJI_0759 20 s, Triton Bay), switchable in the dark bars of 1 and 4. Variants 1 and 7 fit one laptop screen (`.fit`, media height from `100svh`). Variant 2 looked cheap (beige marker, dots on a spine): redone as statements sliding in from alternating sides, key words settle into bronze `#7d5e35` (5.3:1 on ivory), hairline under each. Variant 8 has a second film: `assets/video/whaleshark(-m).mp4`, DJI_0759 16.5–30.5 s, Triton Bay, graded bluer.
- Design 5 only: the travel agents band became variant 3 of round 3 (user: "ideal for design 5, the chart already uses these frames"). Paper card, double navy frame drawn like a pen, Lucide handshake / layers / tag in the mark red, copy dropping in behind line masks (`.m`, translate only, no opacity or blur, so contrast checks never catch a half-faded state). `{{trade}}` slot in the template; v1–v4 keep the Stage 1 band. This is a deliberate departure from the mockup, at the user's request. Reveal: `[data-reveal]` in base.js arms a section only just before it enters the viewport, then plays once.
- Live detector on v5: 1280×800 exit 0; 390×844 only the known rail finding (off-screen step card "Flights, boats, permits and local guides.").

## Travel agents block in every design (2 Nov, late)
User picked from `trade-options/round-3.html`: design 1 = variant 8 (smoked glass over the film), 2 = variant 5 (film inside the letters), 3 = variant 4 (WebGL ripple, water only), 4 = variant 7 (slanted shutters), 5 = variant 3 (framed card). Variant 6 removed from the page (user: "idiotic"); 1 and 2 not used.
- Film for 1 and 2: `assets/video/bluelagoon(-m).mp4`, DJI_0832 14.0–16.6 s (the water-only end of the lagoon flight, Raja Ampat), HLG tone-mapped, half speed, 5.2 s, 2 MB desktop. In the letters it shows the frame at 60 % height (water).
- Photos: 8 = 2O4A3267 (yacht in the lagoon, `water8-2400.webp`), 18 = IMG_9812 (`water18-2400.webp`), 23 = _RBE2063, 28 = DJI_0832 still (`lagoon28-2400.webp`). Ripple masks `water8/18-mask.png`: 8 by colour below the horizon + large connected regions (yacht and one islet sit inside the water area), 18 = everything below the shoreline.
- Structure in base.css (`.trade-x`, `.tg-*`, `.tl-*`, `.tw-*`, `.tsh-*`), looks appended at the end of v1–v4.css, behaviour in base.js (data-reveal + `revealed` event, glass tilt, letters pan, ripple, shutters). jQuery + jquery.ripples load only in v3 (`{{extra_js}}`). Each block, padding included, stays ~90 px under the window height.
- Entrances never fade text (translate / clip-path only); the design-1 film opens like a window on its dark panel, the glass itself is never clipped.
- Gate (live, 2 Nov): desktop 1280: v2, v4, v5 exit 0; v3 only the known hero-lead finding; v1 glass flagged on pixel minima (2.0–2.9) while my own measurement at rest over 6 film frames gives min 10.1:1 under every glass text line, so a capture artefact, disclosed, no ignore. Phone 390: v4/v5 known rail card; v1–v3 flag the destination card captions (white on the photo gradient, read against the page colour), pre-existing, not the agents block.

### Agents block, owner review 2 (2 Nov, late)
- Design 1: glass-over-film dropped (too many films on the page). It now uses round-3 variant 2 (statements sliding in from
  alternating sides, key words settle into dark bronze #6b4f2a, hairlines draw) on the sand band. `trade_says()`, `.ts-*`.
- Design 3: the "Nine days in Raja Ampat" story shows photo 18 (IMG_9812) instead of the lagoon film (`story_img`).
  The ripple block runs edge to edge and square, with a desktop gap below it (`--tgap`) so the daylight lagoon never touches
  the sunset CTA. Ripple smaller and weaker: dropRadius 11, perturbance .018, intro drops 14 / .035.
- Design 4: shutters edge to edge; desktop `--tpad` raised to clamp(56px,9vh,104px), equal above and below. Phone unchanged.
- Gates at 1280: v1, v4 exit 0; v3 only the known hero-lead finding. Phone v1: only the known destination captions.
