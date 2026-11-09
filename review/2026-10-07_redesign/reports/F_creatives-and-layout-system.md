# F — Creatives and layout system (art direction)

Agent F · 7 Oct 2026 · scope: every image/video slot (what it shows, shape, size, file spec) and the layout system for the grey hi-fi redesign.
Markers: ◆ confirmed (source or measured in this run) · ◈ likely · ◇ opinion / disputed. Severity: **P1** fix before the owner sees it · **P2** should fix now · **P3** later.

**Method.** Read BRIEF, `wf.css`, `wf.js`, `LAYOUT_RULES.md`, all page HTML; looked at every shot in `shots-v4/` and every sheet in `sheets-v4/`. Then measured the rendered box of every image slot on the live v4 (`localhost:5173`) in headless Chrome at 1366x657, 1440x790, 1920x950, 2560x1300, 390x664 and 360x640, and tested the proposed proportions by injecting CSS into the live pages (no project file changed; scripts in the session scratchpad). All "measured" and "tested" numbers below come from that run ◆.

---

## 0. The verdict in six lines

1. **Root cause.** The 6 Oct screen-fit pass sized photos by screen *height* (`vh`, `--peek`, `clamp(…21vh…)`) while their *width* comes from the grid. So every slot's shape floats with the monitor: heroes become 2.5–3.0:1 letterboxes on laptops, product photos become 2.3–2.8:1 strips, and the home destination photos drift from landscape 1.30:1 to tall portrait 0.67:1 depending on the screen ◆ (measured, table 1.1). Nobody can shoot or crop for a slot whose shape is unknown.
2. **Fix.** Ratio-first slots: five ratios site-wide, each slot with a declared master ratio, a bounded drift range, a text-safe zone and, for full-bleed media, a separate phone crop ◇.
3. **Biggest creative wins:** full-screen heroes (≈16:9 on desktop and ≈9:16 on phones once the header sits over the image), 3:2 photos for the things people actually buy (trip levels, boats), three 4:5 destination panels on home instead of 255px thumbnails beside a bigger map, one large underwater video in each region gallery.
4. **Home handover:** drop the "next heading peeks" rule. Hero fills the screen, ends on the screen edge, a quiet scroll cue + the "See destinations" anchor carry the continuation; "Where we go" starts on a fresh screen with images that fit one screen ◆ (tested: 384x480 panels, captions end at 648px of 790).
5. **Premium in grey comes from composition:** fewer type sizes with bigger jumps, 600 not 700, no boxes, no dashed section lines, no pills for metadata, notes hidden by default, tonal placeholders instead of crossed boxes.
6. **Keep:** 12-col / 1200px grid, height-aware type steps, R3, R4, the tabs row as the clean edge of landing first screens, the 4:5 portrait slots (Why a yacht, How we travel, route stops), 3:2 More stories, pause buttons and scrims.

---

# PART 1 — CREATIVE SPEC

## 1.1 What is wrong with the current slots (measured on v4)

Rendered size (w x h, ratio). "Free photo" = share of the hero photo above the headline.

| Slot | 1440x790 | 1366x657 | 2560x1300 | 390x664 | Problem | Sev |
|---|---|---|---|---|---|---|
| Home hero video | 1440x586 · **2.46:1** | 1366x473 · **2.89:1** | 2560x1083 · 2.36:1 | 390x502 · 0.78 | `--peek` takes 18–28% of the screen; a 16:9 video loses 28% (1440) to 38% (1366) of its height; the cut "02 · Where we go" + heading under it reads as an accident | **P1** |
| Region / yacht hero | 1440x585 · 2.46:1 + 80px dark facts slab | 1366x452 · **3.02:1** | 2.34:1 | 390x378 · 1.03, only **37% free photo** (138px), then 169px facts band | On phones the first screen is grey text, not a place; on laptops a letterbox | **P1** |
| Advisors hero | 1440x585 · 2.46:1, 42% free | 28% free | — | **20% free** (77px) | Photo exists only as a dark backdrop for copy + person + facts | P2 |
| Home destination photos (3) | 255x237 · 1.08 | 255x197 · 1.30 | 255x380 · **0.67** | 299x199 · 1.5, carousel 1/3 | The three products are thumbnails, smaller than the map beside them (356x483); shape swings landscape→portrait with screen height | **P1** |
| Trip level photos (3) | 382x166 · **2.30:1** | 382x138 · **2.77:1** | 382x260 · 1.47 | 299x120 · **2.5:1** | The lodge/resort you pay for is a strip | **P1** |
| Boat photos (3) | 382x166 · **2.30:1** | 382x138 · 2.77:1 | 1.47 | 299x120 · 2.5:1 | A $31k+ product sold through a 166px strip | **P1** |
| Region gallery (bento) | video 584x348 + four 292x166 | 584x292 (2.0) + 292x138 (2.12) | 584x536 (1.09) | 358x201 + 171x114 x2 | The selling video is half-width; four thumbnails; ratio drifts 1.09→2.12 | P2 |
| Area cards | RA 254x318 (4:5) · NS 254x191 (**4:3**) | same | same | RA 165x206 + 356x200 | Same template, two different ratios; odd third card changes shape on phones | P2 |
| Home story band | 1440x553 · 2.60:1 | 1366x460 · 2.97:1 | 2560x640 · **4.0:1** | 390x465 · 0.84 | `min(70svh, 640px)` caps height, so wide screens get a ribbon | P2 |
| Stories featured band | 1440x526 · 2.74:1 | 1366x408 · **3.35:1** | 2.50:1 | 390x411 · 0.95 | Thinnest full-bleed slot on the site | P2 |
| Yacht "Where we sail" photos | 471x202 · 2.33:1 | same | same | 356x153 · 2.33:1 | Duplicate region imagery as strips; map (663x497) is the largest element on the page after the hero | P3 |
| Home map | 356x483 portrait | 356x443 | 356x626 | 358x201 | Map dominates the destinations it should explain | P2 |
| About team | 4 circles 232px, 2x2 | same | same | 167px circles | Circles read as "avatar UI", not as people you'd trust on a boat | P2 |
| Reviews | 48px avatar circles | | | | Grey circles look like stock UI; real Google reviewers rarely give usable photos | P3 |
| "Person who answers you" | 72px circle | | | | The one face that sells "made easy" is the smallest image on the page | P2 |

Right as is ◆ (measured, sensible): Why a yacht 473x592 (4:5) · How we travel 473x592 (4:5) · route stops 379x473 (4:5) · More stories 586x391 (3:2) · helicopter video 599x337 (16:9, size fine, box not) · "What you can sell" 382x287 (4:3, acceptable).

## 1.2 Standards used

- ◆ LCP "good" = **≤2.5 s at the 75th percentile**, mobile and desktop separately; LCP candidates include `<img>`, CSS background images and `<video>` (poster load or first frame, **whichever is earlier**). [web.dev/articles/lcp](https://web.dev/articles/lcp)
- ◆ **Never lazy-load the LCP image**; mark it `fetchpriority="high"`; preload it if it is referenced from CSS; use AVIF/WebP and responsive sizes. [web.dev/articles/optimize-lcp](https://web.dev/articles/optimize-lcp)
- ◆ Google indexes images from `<img>` (not CSS backgrounds); use `srcset`/`<picture>` with a `src` fallback; AVIF and WebP are supported; descriptive `alt` and file names; preferred share image via `og:image`. [developers.google.com/search/docs/appearance/google-images](https://developers.google.com/search/docs/appearance/google-images)
- ◆ Google Discover large previews need images **≥1200 px wide**, >300k pixels, 16:9 works best, `max-image-preview:large`. [developers.google.com/search/docs/appearance/google-discover](https://developers.google.com/search/docs/appearance/google-discover)
- ◆ Meta link preview: **at least 1200x630**, keep close to **1.91:1**, ≥600x315 for large previews, ≤8 MB. [developers.facebook.com/docs/sharing/webmasters/images](https://developers.facebook.com/docs/sharing/webmasters/images/)
- ◈ WhatsApp: no official spec; Branch.io's help centre says previews show for images **up to ~300 KB** and fail silently above. [help.branch.io](https://help.branch.io/faq/docs/why-are-some-quick-link-thumbnails-not-shown-in-whatsapp)
- ◆ Background video: `autoplay loop muted playsinline`, offer WebM + MP4. [web.dev/articles/replace-gifs-with-videos](https://web.dev/articles/replace-gifs-with-videos) · ◆ iOS autoplays muted/silent video inline only with `playsinline`, and only while on screen. [webkit.org/blog/6784](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- ◆ Anything that moves automatically for >5 s needs a pause control (WCAG 2.2.2); text on images needs ≥4.5:1 (WCAG 1.4.3) → scrims. [w3.org/WAI/WCAG22/Understanding/pause-stop-hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- ◆ Screens: MacBook Air 13" is 2560x1664 physical (2x) [support.apple.com/en-us/118551](https://support.apple.com/en-us/118551); iPhone 14 is 2532x1170 at 460 ppi (3x on a 390px-wide viewport) [support.apple.com/en-us/111850](https://support.apple.com/en-us/111850).
- ◈ Serving more than 2x on phones adds bytes with no visible gain (Twitter capped at 2x in 2019, ~1/3 less data, "no visible quality change"). [blog.x.com engineering](https://blog.x.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices) → **exports stop at 2x** (desktop 2880 wide; phone crops 828 wide).
- ◆ False floors: large heroes "without peeking elements" can stop scrolling; cues help. [nngroup.com/articles/illusion-of-completeness](https://www.nngroup.com/articles/illusion-of-completeness/) (2016) · ◆ 57% of viewing time above the fold, 74% in the first two screenfuls (2018). [nngroup.com/articles/scrolling-and-attention](https://www.nngroup.com/articles/scrolling-and-attention/)
- File weight targets below are **budgets** ◇ (engineering judgment for LCP ≤2.5 s on mobile), not published standards.

## 1.3 The slot system: five ratios, bounded drift, two crops for full-bleed

| Family | Master | Allowed rendered range | Used for | Subject safe zone |
|---|---|---|---|---|
| **Full-bleed desktop** | 16:9 (2880x1620 still / 1920x1080 video) | 1.78–2.6:1 | heroes, story bands | key subject inside the middle 65% of the height; text zone = left 50% x bottom 45% kept calm or darkened |
| **Full-bleed phone** | 9:16 (1080x1920) or 4:5 (1080x1350) | 0.56–0.8 | same slots on ≤768px | subject in the top half; bottom 45% is text. Note: a 9:16 cut of a 16:9 frame keeps only the central **32%** of its width ◆ (arithmetic), so the phone version is a separate reframe, not a responsive squeeze |
| **Landscape content** | 3:2 (1200x800; big tiles 1800x1200) | 3:2–2:1 (desktop short laptops); 16:10 phone | trip levels, boats, gallery tiles, story cards, case study | subject in the middle 75% of height |
| **Portrait content** | 4:5 (1200x1500) | 4:5–1:1 | destination panels, Why a yacht, How we travel, route stops, team | subject in the central square |
| **Video inset** | 16:9 (1280x720) | fixed | helicopter proof | — |
| *Share image* | 1.91:1 (1200x630) | fixed | og:image only | subject in the central 630x630 |

Rules ◇: no 21:9, no 4:3 in content (v4 uses 21:9, 16:9, 3:2, 4:3, 4:5, 1:1 plus floating vh shapes); never let one asset cross from landscape to portrait; fixed `aspect-ratio` inside the container, height-driven sizing only for full-bleed media and only inside the family's range.

Delivery: `<picture>` with a phone `<source media>` for full-bleed slots; `srcset` widths 1280/1920/2560/2880 (full-bleed), 828 max for phone crops, 400/800/1200 (content), 1200/1800/2400 (lightbox). AVIF first, WebP, JPEG fallback; sRGB; strip EXIF except copyright ◇. Heroes: `<img fetchpriority="high">` poster under the `<video>` (the LCP element), never lazy ◆ (web.dev). Everything below the first screen: `loading="lazy"`, videos `preload="none"` and started by IntersectionObserver ◇.

## 1.4 Slot spec by page

Rendered sizes are for the **proposed** layout (Part 2) at 1440x790 and 390x664; "tested" = verified by CSS injection on the live page. Weight = per file at the size a 2x screen actually downloads.

### Home

| ID | Slot · what it shows | Desktop | Phone | Master we cut | Weight | Current proportion |
|---|---|---|---|---|---|---|
| H1 | **Hero video** · above- and underwater in one loop: aerial over karst islets → split over/under shot → reef → boat wake. No people close-up, no text burned in | full-bleed; 1440x790 (1.82:1) with header over the image, 1440x718 (2.0:1) with a solid header ◆ tested; 1366x585 (2.34:1) | 390x664 (0.59 ≈ 9:16) header over image; 390x600 (0.65) solid ◆ tested | video 1920x1080 + 720x1280 vertical cut; poster stills 2880x1620 + 1080x1920 | poster ≤200 KB @1920 (≤350 KB @2880), phone poster ≤120 KB @828; video ≤4 MB desk / ≤2 MB phone ◇ | Wrong (2.46–2.89:1) **P1** |
| H2 | **Destination panels x3** · RA: aerial of islets/lagoon with a small boat for scale (avoid the over-used viewpoint shot; owner's own copy rejects "prepared Instagram viewpoints" ◆ UX doc) · NS: Siau volcano from the sea or a Bunaken wall diver · Yachts: whole phinisi under sail, golden hour | 3 x 4 cols, **384x480 (4:5)** ◆ tested; 384x457 at 1366x657 (stays in 4:5–1:1) | stacked, **358x358 (1:1)** ◆ tested | 4:5 1200x1500 (central square safe) | ≤90 KB @800w | Wrong: 255px thumbnails, 1.30→0.67 drift **P1** |
| H2b | **Map** · Indonesia locator: Bali, Sorong, Manado | SVG strip 6 cols, ~588x147 (4:1) in the heading row | 358x179 (2:1) under the heading | vector (SVG) | ≤20 KB | Too dominant **P2** |
| H4 | **Story band (muted loop)** · one slow shot of the featured guests' trip: deck at dusk, dinghy reaching a beach | full-bleed, height = width/2.4 → **1440x600**; 2560x1067 (no 640px cap) | **390x488 (4:5)** | video 1920x1080 + 720x900 (4:5) cut; stills 2880x1620 + 1080x1350 | ≤3 MB / ≤1.5 MB video; poster ≤180 KB | Too thin (2.6–4.0:1) **P2** |
| H5 | Reviews | text only, no avatar circles (use a real reviewer photo only if Google provides it and the guest agrees) | — | 96x96 if used | ≤8 KB | P3 |
| H6 | **Person who answers you** (CTA band) | 96px circle (from the 4:5 portrait) | 80px | 4:5 1200x1500 portrait, shared with Plan, Thank-you, Advisors | ≤15 KB | Too small (72px) P2 |

### Raja Ampat and North Sulawesi (same template)

| ID | Slot · what it shows | Desktop | Phone | Master | Weight | Current |
|---|---|---|---|---|---|---|
| R1 | **Hero video** · RA: drone over karst islands with *our* speedboat (private + scale). NS: Bunaken wall from above / Siau volcano from the boat. Key facts sit **on** the image bottom, not in a slab | full-bleed; header over image + facts overlaid → **1440x737 (1.95:1)**, 1366x604 (2.26:1); solid header 1440x665 / 1366x532 | **390x612 (0.64)**; one-line facts under the H1, one primary button + text link; tabs row closes the screen | as H1 | as H1 | Wrong: 2.46–3.02:1, phone 37% free **P1** |
| R2 | **Why-go gallery: 1 video + 2 photos** (was 1+4) · big = underwater loop (reef, mantas / wall, turtles) · small 1 = people in the scene (snorkelling guests, beach) · small 2 = detail (village, macro critter, local boat) | big 8 cols **792x490 (~3:2)**; two stacked 4-col tiles **384x233**; at 1366x657 floor 2:1 (792x396) | big 358x239 (3:2); two smalls 171x114 side by side | video 1280x854 (3:2); stills 1800x1200 (big), 1200x800 (small) | video ≤1.5 MB; stills ≤200 KB / ≤70 KB | Video half-width, 4 thumbs **P2** |
| R3 | **Areas** · RA: Central, Misool, Triton Bay · NS: Bunaken, Sangihe & Siau, Halmahera & Widi. Map leads, photos support | map 6 cols **588x441 (4:3, SVG)** + 3 rows, each a 3:2 thumb **180x120** + name + 2 lines | map 358x269; rows with 120x80 thumbs | thumbs 600x400; map SVG | ≤25 KB thumb | RA 4:5 vs NS 4:3 **P2** |
| R4 | **Trip levels x3** · the actual property for each level (guesthouse / island lodge / eco resort; NS: dive / boutique / premium resort): over-water bungalow or room with the view. Must be the real place | 4 cols **382x256 (3:2)**, floor 2:1 (382x187 at 1366x657); slider + all three prices + buttons on one screen ◆ tested (button bottom 699/790 and 625/657) | carousel 84%: **299x188 (~16:10)**, cap `100svh − 476px` so the first price clears the bottom bar (3:2 put it 11px under the bar ◆ tested) | 3:2 1200x800 | ≤70 KB | Strips 2.3–2.8:1 **P1** |
| R5 | Reviews, FAQ | text only | | | | ok |

### Yacht charters

| ID | Slot · what it shows | Desktop | Phone | Master | Weight | Current |
|---|---|---|---|---|---|---|
| Y1 | **Hero video** · phinisi at anchor in a lagoon (drone), then life on deck | as R1 | as R1 | as H1 | as H1 | **P1** |
| Y2 | **Why a yacht** · people on deck: guests relaxing, crew serving, sails | 5 cols **486x608 (4:5)** | 358x448 | 4:5 1200x1500 | ≤90 KB | Right, keep |
| Y3 | **Boats x3** · card = the boat under sail or at anchor, whole hull in frame; tap opens a **gallery of 8–12**: exterior x2, deck lounge, dining, master cabin, en-suite, dive deck/tender, crew | card **382x256 (3:2)** as R4, small "1 / 12" photo count; lightbox up to 1440x960 | card 299x188; lightbox full width | card 1200x800; gallery 3:2 2400x1600 (+ some 4:5) | card ≤70 KB; gallery ≤220 KB @1800w, lazy | Strips **P1** |
| Y4 | **Helicopter + yacht** (luxury, shown once, quietly) · aerial of the helicopter near the boat | 7 cols **690x388 (16:9)**, no card box, text in 5 cols beside | 358x201 | video 1280x720, 6–8 s; poster 1600x900 | ≤1.5 MB; poster ≤90 KB | Size right, box wrong P3 |
| Y5 | **Where we sail** · route map | map 7 cols **690x518 (4:3, SVG)**; region links as text, no photo strips | 358x269 | SVG | ≤30 KB | Strips P3 |

### Guest stories

| ID | Slot · what it shows | Desktop | Phone | Master | Weight | Current |
|---|---|---|---|---|---|---|
| S1 | **Featured story band** · wide establishing shot with the real guests in it (written permission) | full-bleed, height = width/2.4 → **1440x600**; on ≤720px-tall laptops the button may need a short scroll | **390x488 (4:5)** | video or still as H4 (same asset can serve both) | as H4 | 2.74–3.35:1 **P2** |
| S2 | **Route stops x3** · day 1 arrival / an anchorage / last evening: moments, not postcards | 4 cols **384x480 (4:5)** | 326x217 (3:2) | two crops per photo: 4:5 1200x1500 and 3:2 1200x800 (we cut both) | ≤90 / ≤60 KB | Right, keep |
| S3 | **More stories x2** · cover per story | 6 cols **588x392 (3:2)** | 358x239 | 3:2 1200x800 | ≤70 KB | Right, keep |
| S4 | "View all photos" gallery per story (6–12) | lightbox 3:2 / 4:5 | full width | 2400 long edge | ≤220 KB, lazy | — |

### About

| ID | Slot · what it shows | Desktop | Phone | Master | Weight | Current |
|---|---|---|---|---|---|---|
| A1 | **Team portraits x4** · environmental, waist-up, on the boat / at the dock, natural light, same eye level and framing for all | one row of 4 x 3 cols, **282x352 (4:5)** under the title (first screen: title + row fits; 72+64+150+352+40 = 678 < 790 ◈ computed) | 2x2, 171x214 (4:5) | 4:5 1200x1500 | ≤60 KB | Circles **P2** |
| A2 | **How we travel** · team at work: guide briefing guests, crew loading the boat | 5 cols 486x608 (4:5) | 358x448 | 4:5 1200x1500 | ≤90 KB | Right, keep |

### Travel agents

| ID | Slot · what it shows | Desktop | Phone | Master | Weight | Current |
|---|---|---|---|---|---|---|
| B1 | **Hero** · the owner/team at work with guests or at the dock (who the agent deals with) | **split**: text 6 cols on white, image 6 cols **588x588 (1:1)**; a business page should look calmer than the B2C landings ◇ | text first, image after it **358x239 (3:2)** | 1:1 1600x1600 + 3:2 crop | ≤110 KB | 20% free photo on phones P2 |
| B2 | Licence / registration / insurance / membership marks | 140x72 | 2x2 | SVG (PNG 280x144 fallback), monochrome | ≤10 KB | Right, keep |
| B3 | Case study (yacht + helicopter) | 4 cols 384x256 (3:2), reuse Y4 poster | 358x239 | reuse | — | 16:9 in a box P3 |
| B4 | What you can sell x3 | reuse **H2 panels** 384x480 (4:5) | 358x358 | reuse H2 | — | 4:3 ok, reuse saves 3 assets P3 |
| B5 | Your contact | 96px circle | 80px | reuse portrait | — | 72px P3 |

### Plan your trip · Thank-you

| ID | Slot | Desktop | Phone | Master | Current |
|---|---|---|---|---|---|
| P1 | **Person who answers you** beside "What happens next": 4:5 portrait, the only image on the page (forms stay image-free) | **240x300 (4:5)** in the left column | 80px circle row (form comes first on phones) | shared 4:5 portrait | 72px circle P2 |
| T1 | Same portrait next to "Want an answer sooner?" | 240x300 | 80px circle | shared | none P3 |

### Link previews (one per page; set in the content editor)

| Spec | Value |
|---|---|
| Size / ratio | **1200x630 (1.91:1)** ◆ Meta; ≥1200 wide also satisfies Discover ◆ Google |
| Format / weight | JPEG (widest crawler support ◈), **≤300 KB** for WhatsApp ◈ (Branch.io) |
| Composition | subject in the central 630x630 (some chat apps show a square thumbnail ◈); no small text; logo optional, small, bottom-left |
| Set | home (H1 still) · Raja Ampat · North Sulawesi · Yachts · Guest stories + one per story · About (team) · Travel agents (B1) · Plan (generic). All cut from the assets above, nothing extra to shoot |

## 1.5 Video rules

| Slot | Loop | Shots | Exports | Poster frame |
|---|---|---|---|---|
| H1, R1 x2, Y1 heroes | **8–12 s**, seamless (cut on continuous motion: water, wake, clouds) | 3–4 max, slow; no fast cuts, no speed ramps | 1920x1080 + 720x1280; MP4 H.264 (yuv420p) + WebM (VP9 or AV1) first ◆ web.dev | the first frame, also the LCP still and the og:image source |
| H4 / S1 story band | 6–10 s | 1 shot | 1920x1080 + 720x900 (4:5) | a frame with the guests clearly in it |
| R2 gallery tile x2 | 5–8 s | 1 underwater shot | 1280x854 + 960x640 | a sharp, bright frame (no blue murk) |
| Y4 helicopter | 6–8 s | 1–2 shots | 1280x720 | helicopter and boat both in frame |

Common ◇ unless marked: no audio track (strip it; also lets iOS autoplay ◆ WebKit); 24/25/30 fps as shot; target ~3 Mbps (1080p) / ~1.5 Mbps (vertical, insets); pause button on every loop ◆ WCAG 2.2.2 (v4 already has it); `prefers-reduced-motion` or Save-Data → poster only; below-the-fold loops start only when visible ◆ WebKit does this on iOS anyway.

## 1.6 Owner shot list: the launch minimum

For the owner this list must go out **in Russian** (project rule); it is in English here because report files are English. The owner has 8 years of material (above/underwater, video, yachts, helicopter) ◆ PLAN.md, so this is a **selection brief**, not a shoot.

**How to send.** Originals only, not from WhatsApp/Instagram (both recompress ◈). Stills: ≥3000 px on the long side for anything full-screen, ≥2000 px for the rest (phone photos from recent phones are fine ◈). Video: original camera/drone files, **4K preferred** (a vertical phone cut from 4K keeps 1215x2160; from 1080p only 607x1080, too small for a sharp 720x1280 ◆ arithmetic), ≥15 s per take, steady, no music, titles, filters or speed changes. For each file: place, month/year, trip. Confirm rights (own or photographer's permission) and written permission from recognisable guests. One shared folder with a subfolder per page below.

| Page | Videos | Photos | Notes |
|---|---|---|---|
| Home | V1 hero mix (can be edited from V2–V5) | 3 destination panels: RA aerial, NS volcano/diver, phinisi under sail (can be picked from region sets) | portrait-friendly frames |
| Raja Ampat | V2 hero: drone over islands with our boat · V4 underwater reef/mantas | 2 gallery (guests in the water / on a beach; a detail or village) · 3 areas (Central, Misool, Triton Bay) · 3 levels: the **actual** guesthouse, island lodge, eco resort | levels must match what is sold |
| North Sulawesi | V3 hero: Bunaken / Siau from the sea · V5 underwater wall/turtles/macro | 2 gallery · 3 areas (Bunaken, Sangihe & Siau, Halmahera & Widi) · 3 levels (actual resorts) | |
| Yacht charters | V6 hero: phinisi in a lagoon (drone) · V7 helicopter + boat | 1 life on deck (people) · **per boat 5 minimum, 8–12 ideal**: under sail, at anchor, deck, dining, master cabin, bathroom, dive deck/tender, crew | whole hull visible in the main boat photo |
| Guest stories | V8 featured story clip (optional; a still works) | per story (3): 1 cover + 3 route moments (+6–12 for "all photos", can come after launch) | guests' written permission |
| About | — | 4 team portraits (same framing) · 1 team at work | shot fresh if no matching set exists |
| Travel agents | — | 1 owner/team at work · licence/membership logos (vector) | |
| Plan / Thank-you / CTA | — | 1 portrait of the person who answers enquiries (4:5, friendly, looking at camera) | used on 5 pages |

**Totals for launch:** 7 video clips (+1 optional) and about **50 stills** with 5 photos per boat (about 70 with full boat galleries), plus 4 logos. Link previews and the advisors' "What you can sell" reuse these; nothing extra to shoot.

---

# PART 2 — LAYOUT SYSTEM FOR THE GREY HI-FI

Principle ◇: with greys and a placeholder face, premium comes from **scale contrast, fewer elements, exact alignment and air**. Every block must earn its box; most don't need one.

## 2.1 Grid

| | Desktop ≥1025 | Tablet 769–1024 | Phone ≤768 |
|---|---|---|---|
| Columns | 12 | 8 | 4 |
| Content width | **1200** max (wrap 1264 incl. 32 padding) — keep ◆ v4 | fluid | fluid |
| Gutter | 24 | 20 | 16 |
| Outer margin | ≥32 (120 at 1440) | 24 | 16 (keep; tested sizes assume it) |
| Spans at 1440 | 3 col = 282 · 4 = 384 · 5 = 486 · 6 = 588 · 7 = 690 · 8 = 792 · 12 = 1200 | | 4 col = 358 at 390 |

**Widths, only three:** text column (max 8 cols / ~65ch; WCAG 1.4.8 advises ≤80 characters ◆), content (12 cols), full-bleed. Full-bleed is allowed only for: the hero, **one** image band per page (story band), the dark CTA band background and lightboxes. No "breakout" widths between content and full-bleed ◇.

**Section patterns (the whole site uses these ten)** ◇: M1 full-bleed media with text bottom-left (cols 1–6) · M2 heading + 12-col content · M3 split 7/5 (text / 4:5 image) · M4 triptych 4/4/4 portrait panels · M5 product row 4/4/4 at 3:2 (6/6 for stories) · M6 gallery 8 + 4/4 · M7 map-led 6–7 + list · M8 text-only (FAQ in 8 cols, reviews, steps) · M9 dark CTA band (8 cols, centred) · M10 form split 5/7.

## 2.2 Type scale (Inter as placeholder; tokens per role so the brand face can be dropped in)

Steps in px. Classes keep v4's height-aware idea ◆ (it is right) with new values.

| Role | XL ≥1280w & >820h | Laptop >720h & ≤820h (1440x790) | Short ≤720h (1366x657) | Tablet | Phone | lh | weight | tracking |
|---|---|---|---|---|---|---|---|---|
| Display (home H1) | **88** | 76 | 64 | 64 | **clamp(34, 10.2vw, 42)** → 40 at 390 | 1.0 | 600 | −0.03em |
| H1 (landing hero, page title, statement) | 64 | 56 | 48 | 52 | 34 | 1.05 | 600 | −0.025em |
| H2 (section) | 40 | 36 | 32 | 34 | 28 | 1.12 | 600 | −0.022em |
| H3 (card, item) | 22 | 21 | 20 | 21 | 19 | 1.25 | 600 | −0.018em |
| Lead | 20 | 19 | 18 | 19 | 18 | 1.5 | 400 | −0.017em |
| Body | 17 | 17 | 16 | 17 | 16 | 1.6 (phone 1.55) | 400 | −0.013em |
| Small / meta | 14 | 14 | 13 | 14 | 14 | 1.45 | 400/500 | −0.006em |
| Micro caps (fact labels, footer heads only) | 12 | 12 | 12 | 12 | 12 | 1.3 | 600 | +0.06em |

- ◆ Tracking for H2 → small follows Inter's own dynamic-metrics formula `a + b·e^(c·size)`, a = −0.0223, b = 0.185, c = −0.1745 ([rsms Inter v3 dynmetrics](https://d.rsms.me/inter-website/v3/dynmetrics/)), which gives ≈−0.022em at display sizes, −0.018 at 22px, −0.013 at 17px, −0.006 at 14px. Display and H1 go a little tighter than the formula ◇ (art-direction choice; re-tune for the brand face).
- ◆ Fit checked in Chrome: "Remote Indonesia." at 88px/600/−0.03em = 740px (fits 8 cols = 792); at 40px = 336px (fits 358 on a 390 phone); at 36.7px = 309px (fits 328 on a 360 phone). Current 40px/700 = 349px, so the lighter weight also buys room.
- Weights: **400 / 500 / 600 only** ◇. v4 sets every h1/h2 at 700, which is what makes the grey pages shout. 500 for nav, buttons, meta.
- Sizes total: 8 roles (v4 has ~12 including `.statement` 48/40/30, `.trip-price b` 24, facts 18/17/15, footer heads 13…). Fold `.statement` into H1, price into H3, facts values into Body-semibold.
- The jump from H3 (22) to H2 (40) is deliberate: no 28–32 step on desktop ◇. Fewer, bigger steps read editorial; many close steps read "dashboard".

## 2.3 Spacing rhythm

8-pt scale ◆ v4: 4 8 12 16 24 32 48 64 96 128 160. Proposed tokens ◇:

| Token | Desktop (value at 1440x790 / 1366x657) | Phone |
|---|---|---|
| `--sec` standard section | clamp(64px, 11vh, 112px) → 87 / 72 | 64 |
| `--sec-l` showpiece | clamp(80px, 15vh, 160px) → 118 / 99 | 88 |
| `--sec-s` compact | clamp(40px, 6vh, 64px) → 47 / 40 | 48 |
| heading → lead | 16 | 12 |
| heading block → content (`--gap-head`) | clamp(32px, 5vh, 56px) → 40 / 33 | 32 |
| between groups inside a section | 64 | 48 |
| card image → title / title → meta | 16 / 8 | 12 / 6 |
| grid rows | 48 | 32 |

Rule ◇: inner spacing is always visibly smaller than outer spacing (proximity does the grouping that borders do now).

## 2.4 Image placeholders (agency-grade grey)

Replace the crossed boxes (`.ph::before/::after` diagonals, 1px border, 12px radius) ◇:

- **Tonal fill that predicts the photo's brightness**, three tones: deep `#4a4a4a` (underwater, dusk, anything with text on it) · mid `#8f8f8f` (sea, aerial, boats in daylight) · pale `#cdcdcd` (portraits, interiors, beach). The owner then sees the light/dark rhythm of the page the way real photos will make it. Contrast ◆ computed: white on deep 8.9:1, ink `#1f1f1f` on mid 5.1:1 (white on mid fails at 3.2:1), ink on pale 11.7:1.
- Slots with overlaid text are always **deep**, which also tells the photo editor "needs a dark area or a scrim".
- **Caption** bottom-left, 12px/500, inside the image: shot type + subject, e.g. `AERIAL · karst islets with our speedboat`. Visible in Clean mode (it is the content brief), low-key.
- **Spec line + safe zones only in Notes mode**: `16:9 master 2880×1620 · shows 1.8–2.6:1 · loop 10 s`, plus a dashed outline of the text zone and the subject zone.
- Video slots: a small "▶ loop 8–12 s" mark beside the caption and the real pause button.
- Radius: **0 on photos** (editorial), 6px on controls, 12px on panels/dialogs only ◇ (visual-direction stage may change it).

## 2.5 Cards, boxes, borders, pills: when to use none

| Element | Rule ◇ | Changes on v4 |
|---|---|---|
| Image cards (destinations, levels, boats, stories, areas) | **no border, no box**: image, then text under it on the page background; hover = title underline + slight image scale (motion stage) | remove `.card` border/radius on these |
| Boxes (filled panel) | only for the **form** and dialogs | drop the days-picker box (inline row), drop review boxes, drop `.tile` boxes on advisors |
| Borders | 1px hairline only as **dividers in lists** (FAQ, price row, footer) and the tabs row; never around a block; **no dashed section borders** (`section { border-bottom: 1px dashed }` makes a false floor under every block ◆ NN/g lists full-width rules among false-floor causes) | remove |
| Pills | only for **interactive** choices (form chips, filters) | metadata (`Central · Misool · + Triton Bay`, `Add-on`, `Air-con`, `Chef`) becomes one small text line with middots |
| Icons in circles | none as page structure (house rule) | advisors "What we handle" `.icon` circles go |
| Reviews | typographic quote, 3 columns separated by air or a top hairline, name + country + trip under it | no box, no avatar circle |
| Buttons | one filled per view; second action is a text link with arrow | hero pairs (light + outline) → 1 button + link |

## 2.6 Section background rhythm

Rules ◇: **white is the default**; image bands count as "dark" in the rhythm; **one tint zone per page at most**; tint never touches another tint; the dark CTA band closes every page and is followed by the pale footer.

| Page | Proposed sequence | Change |
|---|---|---|
| Home | hero (image) → Where we go (white) → Remote, made easy (white) → story band (image) → reviews (**white**) → travel agents band (tint) → CTA (dark) → footer | v4 has reviews tint + agents band tint adjacent → one merged grey slab **P2** |
| Regions | hero → tabs → Why go (white) → Trips (white) → Reviews + FAQ (tint) → CTA | keep |
| Yachts | hero → tabs → Why (white) → Boats (tint) → Where we sail (white) → FAQ (white) → CTA | keep |
| Stories | title (white) → featured band (image) → route (white) → more stories (tint) → CTA | keep |
| About | title + team (white) → How we travel (white) → FAQ (tint) → CTA | keep |
| Travel agents | white → tint → white → tint → white → tint → white (zebra) | one tint only (FAQ), rest white **P2** |

## 2.7 Annotation labels: hidden by default

- **Clean mode is the default** (how the site will feel): no "01 · Hero" labels, no photo-spec notes, no dashed lines. **Notes mode** adds labels, spec lines, safe-zone outlines and section boundaries **P1** (cheap; the visible labels and dashed lines are the main thing that makes v4 look like a wireframe).
- Toggle: `?notes=1` in the URL (so a comment link can open with notes), key **N**, and a quiet "Show design notes" link in the footer (works on phones; nothing new floats over the bottom bar). State in `localStorage` wrapped in try/catch ◇.
- Implementation as a class on `<html>` so the DOM keeps the labels: `tools/penpot-sync/extract.cjs` reads `.label` ◆ (line 127) and must run in Notes mode; `fit-check.cjs` and the screenshot tools should run in Clean mode.
- House rule check: the small meta line **above** the story-band headings (`Guest story · Comfort · X days…` above "Nine days in Raja Ampat", home and Stories) is a kicker above a heading → move it under the H2 **P2**.

## 2.8 Home: how the hero hands over to "Where we go"

**Recommendation (A).** ◇ with evidence:
1. Header sits **over** the hero image (white logo/nav on a 120px top scrim), turns solid on scroll; on phones it already hides on scroll down ◆ `wf.js`. This alone gives the hero 72px.
2. Hero = **100svh**: 1440x790 → **1.82:1** (≈ the 16:9 source, almost no crop); phones → 390x664 (≈9:16, exactly the vertical video). With a solid header: 1440x718 (2.0:1), 390x600 ◆ tested. The first screen ends on the screen edge: a clean edge, no cut heading.
3. Continuation is carried by (a) "See destinations" as the one hero button (anchor), (b) a small scroll cue bottom-centre (a short line, still under reduced motion), (c) the video itself. NN/g's false-floor warning ◆ is answered by these cues; NN/g 2018 also shows 43% of viewing time is below the fold ◆, so visitors do scroll when the page signals more ◈.
4. **"Where we go" opens on a fresh screen**: H2 + one-line lead left (6 cols), the Indonesia locator strip right (6 cols, ~147px tall), then the **three 4:5 panels** (M4). Scrolled to (or reached by the button), the panels with names and prices fit one screen: captions end at 648px of 790 and 625px of 657 ◆ tested. On phones: stacked 1:1 panels (358x358) instead of the 1/3 carousel, so the yacht product is never hidden behind a swipe ◇.

Why not keep the peek: in v4 it costs 18–28% of the hero, pushes the video to 2.46–2.89:1, and what peeks is a heading cut by the screen edge plus an annotation label, which is exactly what the owner noticed ◆ (shots `1440x790_home_00`, `390x664_home_00`). The peek idea itself (NN/g) is sound; the execution shows the wrong thing.

**Fallback (B), only if the owner wants something visible below the hero:** hero 100svh − 64px and the section starts with the tops of the three panel images (heading moves into a left column, panels shrink to 3 cols ≈ 282x352). Images peeking read as intended, a cut heading does not. Costs ~25% of panel area; not recommended ◇.

## 2.9 LAYOUT_RULES.md: what I would change

| Rule | Keep / change | New wording (short) | Why |
|---|---|---|---|
| R1 Home | **Change** | "Hero fills the screen (header over the image). No heading may be cut by the bottom edge of the first screen. A scroll cue and an anchor button show that the page continues." | 2.8; `fit-check.cjs` line 28–29 enforces the peek and must be updated ◆ |
| R1 Landings | **Change** | "Header over image + hero + facts row (on the image) + tabs row = one screen. Phones: facts become one line under the H1, one button + one link." | +72–150px of photo; phone first screen shows a place, not text |
| R1 Stories / About / Plan | Change slightly | Stories: on ≤720px-tall screens the featured band's button may need a short scroll (ratio wins). About: title + one row of four 4:5 portraits. | full-bleed never thinner than 2.4:1 |
| R2 Trips / boats | **Change** | "Slider and all three prices visible together. Photos 3:2; on short laptops never thinner than 2:1; phones 16:10 so the first price clears the bottom bar." | tested at 1440x790, 1366x657, 390x664, 360x640 ◆ |
| R2 Photo groups | Change | "Gallery = 1 large + 2 small, visible under its heading; tiles 3:2, never thinner than 2:1." | fewer, bigger |
| R2 Home "Where we go" | **Change** | "The three destination panels with names and prices fit one screen; the map is a strip in the heading row." | map no longer outweighs products |
| R3 | Keep | No photo taller than the visible screen. | still right |
| R4 | Keep | Short screens: nothing forced to screen height. | still right |
| **R5 new** | Add | "Every image slot declares a master ratio and an allowed range (1.3); fixed `aspect-ratio` in the container; height-driven sizing only for full-bleed media and only inside its range. Full-bleed phone versions use their own crop." | removes the root cause |
| **R6 new** | Add | "Notes (labels, specs, section lines) are hidden by default; tools state which mode they run in." | 2.7 |
| "What is normal" | Add one line | "A full-screen hero followed by a fresh section is normal. A heading cut by the bottom of the first screen is not." | |

Token updates follow 2.2–2.3; `fit-check.cjs` rules R1-home and R2 need rewriting before the next gate ◆ (it currently checks the old wording).

## 2.10 What should stay as it is

- 12-col grid, 1200px content cap, 8-pt spacing, 48px targets ◆ v4.
- Height-aware type and spacing (steps at ≤820 and ≤720 tall): the mechanism is right; only the values change.
- R3 and R4; the tabs row as the clean bottom edge of landing first screens.
- 4:5 portrait slots for Why a yacht, How we travel, route stops; 3:2 More stories; 16:9 helicopter inset size.
- Pause button on every loop and a dark scrim under hero text (WCAG 2.2.2 / 1.4.3).
- Dark CTA band + pale footer as the page ending.

## 2.11 Findings by severity

- **P1:** hero letterbox and peek on home (1.1, 2.8) · landing heroes 2.46–3.02:1 and phone first screen 37% photo (R1) · trip-level and boat photos as 2.3–2.8:1 strips (R4, Y3) · home destinations as 255px thumbnails with 1.30→0.67 drift (H2) · labels and dashed section lines visible by default (2.7).
- **P2:** region gallery: half-width video + 4 thumbs (R2) · story bands 2.6–4.0:1 (H4, S1) · maps outweighing products (H2b) · RA 4:5 vs NS 4:3 areas (R3) · advisors hero 20% photo on phones (B1) · team as circles (A1) · person-who-answers at 72px (H6, P1) · kicker lines above story H2s · double tint on home, zebra on advisors (2.6) · all-700 headings and ~12 type sizes (2.2) · boxes and pills on every card (2.5).
- **P3:** yacht "Where we sail" photo strips (Y5) · helicopter card box (Y4) · review avatars (H5) · advisors case study and "What you can sell" asset reuse (B3, B4) · thank-you portrait (T1).

## Sources

- web.dev, Largest Contentful Paint: https://web.dev/articles/lcp
- web.dev, Optimize LCP: https://web.dev/articles/optimize-lcp
- web.dev, Replace animated GIFs with video: https://web.dev/articles/replace-gifs-with-videos
- Google Search Central, Image SEO: https://developers.google.com/search/docs/appearance/google-images
- Google Search Central, Discover: https://developers.google.com/search/docs/appearance/google-discover
- Meta for Developers, Images in link shares: https://developers.facebook.com/docs/sharing/webmasters/images/
- Branch.io help, WhatsApp thumbnails: https://help.branch.io/faq/docs/why-are-some-quick-link-thumbnails-not-shown-in-whatsapp
- WebKit, New video policies for iOS: https://webkit.org/blog/6784/new-video-policies-for-ios/
- X (Twitter) Engineering, Capping image fidelity (2019): https://blog.x.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices
- NN/g, The Illusion of Completeness (2016): https://www.nngroup.com/articles/illusion-of-completeness/
- NN/g, Scrolling and Attention (2018): https://www.nngroup.com/articles/scrolling-and-attention/
- W3C, Understanding WCAG 2.2.2 Pause, Stop, Hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html · 1.4.8 Visual Presentation: https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html
- Inter dynamic metrics (rsms, v3 archive): https://d.rsms.me/inter-website/v3/dynmetrics/
- Apple tech specs: MacBook Air 13" M3 https://support.apple.com/en-us/118551 · iPhone 14 https://support.apple.com/en-us/111850
- Project files: `BRIEF.md`, `wireframes/wf.css`, `wireframes/*.html`, `LAYOUT_RULES.md`, `PLAN.md` (owner's material), `1000-islands-website-ux-content-structure.md` (owner's photo/UX notes), `tools/penpot-sync/fit-check.cjs`, `extract.cjs`.
