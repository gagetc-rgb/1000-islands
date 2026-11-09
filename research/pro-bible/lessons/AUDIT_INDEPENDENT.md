# Independent provenance audit of the "where AI / people err" boxes (lessons 01-09)

Auditor: blind second opinion, 15 Oct 2026. I did not open `PROVENANCE_ERRORS.md`, `EXTERNAL_CHECK.md` or any other auditor's file. I did not edit the lessons.

## 1. Method

1. I pulled every `<div class="note ai">` and `<div class="note human">` from `01-*.html` to `09-*.html` (lesson 08 has none). I split them into single claims: **98 AI claims in 22 boxes** and **24 human claims in 11 boxes**. Line numbers below are the `<li>` lines in the HTML.
2. Corpus searched: `research/pro-bible/` (94 transcripts, `answers/01-16`, `skills-read/` with Vercel, Osmani and Anthropic frontend-design, `BEST_PRACTICES_2026.md`, `PRIMARY_SOURCES.md`, `meta*.tsv`), `research/design-kb/` (83 transcripts, digests, the 14 Codrops articles were skimmed: studio profiles, no AI-error content) and `.claude/skills/impeccable/` (SKILL.md, all `reference/*.md`, plus the rule texts extracted from the detector binary `scripts/bin/windows-x64/impeccable.exe` v0.1.11, skill v4.5.0).
3. For each claim I ran regex searches across all four corpora with a flag for AI context nearby, then read the passages and, for every claim that depends on one source, the full transcript around the timestamp. I read these AI-focused transcripts in full: DesignCode M4DNgmI7MIM, PA3f3MdRc08, KOZjqVNHIo8; Flux Academy DLzzhG1ORm8, jT5YdajTg6I, inRonh4mTYQ, eiz7FwVSBNk; femke 7OXaHQKABkM; Kole Jain RCneB_MQ7qs; DesignCourse YSYqFBq68Wk; Malewicz GzDBkU0irpA. I read targeted passages of about 20 others.
4. Keyword false positives I hit and discarded: "lazy" ("it's lazy because it's just a border", DesignCode), "Intel" (caption for Inter, used about Figma's default font by a human, Flux UNjkPUhRg0s), "accessible" meaning affordable or available (Dive Club RaKFP_DuqpA, Will Paterson), "focus" meaning attention, "slider" (a personality slider), "announce" (product launches), "Cloud" (caption for Claude), "skeleton" (wireframe sense). I also discarded one human-attributed item that looks like an AI item: Dive Club Y0n6F9VlLVc 9:10, "when you open new modals the focus is always going to the wrong place in our app". That is a Shopify designer describing his own team's human-built app.

### Grades

- **F**: a source says AI models do this, either because it was seen in 2025-2026 model output or because a model vendor's document says so. I split F into two kinds:
  - **F1**: seen in output from a named model, or stated by a model vendor (Anthropic).
  - **F2**: a 2025-2026 practitioner says AI does this, but names no model and shows no output.
- **G**: a real mistake documented in the corpus, but no source attributes it to AI. **G\*** marks a G claim that has a nearby AI observation which does not quite match the claim.
- **N**: not found in the corpus at all.
- **Voices**: sources that are independent of each other. One company or one person counts as one voice (Meng To = DesignCode, his Dive Club interview and his Aura product). Vercel's guidelines count as a rule source, not as an AI attribution: they are a review checklist written for agents, and they never say that models make these errors.

## 2. Sources table: who actually tests AI output

| Voice | Items (date) | Model(s) observed | What is actually shown | Technical / a11y / perf content | Bias |
|---|---|---|---|---|---|
| **Anthropic** (model vendor) | `skills-read/anthropic-frontend-design.md` (current skill); talks fHWFF_pnqDk, gv0WHhKelSE (2025-07-31) | Claude in general (vendor calibration list) | Explicit list: "AI-generated design right now clusters around": cream + serif + terracotta; near-black + acid accent; broadsheet hairlines; SaaS-card kit (identical rounded cards, same grey shadow, gradient washes); template chrome (tracked ALL-CAPS eyebrow above every heading, middle-dot meta strings, "WORD — fragment" labels, tinted near-black, **monospace small data labels**, **"→" appended to buttons**). Also: big-number hero is "the default treatment"; all-caps labels and labels above content are "the commonest tells"; **"fade-and-slide-up entrances on each section and hover transitions on every card ... read as AI-generated"**; "easy to generate CSS classes that cancel each other out ... often with padding/margin between sections" | Only a quality floor ("responsive, visible keyboard focus, reduced motion respected, visually accessible"), stated as a requirement, not as an observed error. The 2025 talk mentions "people leaking API keys" in vibe-coded apps (anecdote) | Vendor describing its own model. Its own calibration list never mentions purple or Inter |
| **Impeccable** (Paul Bakaus, third-party skill) | SKILL.md, `reference/craft-floor.md`, detector rule texts | "AI-generated UIs" in general, no model named | Rules that say "AI": side-tab border ("most recognizable tell"), overused fonts (Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk), gradient text, purple/violet gradient and cyan-on-dark, cream background, glow shadows, radial halo, spotlight, icon tile above heading, italic serif hero, hero eyebrow or pill, kicker or eyebrow (banned), numbered section labels, em-dash, buzzwords, aphoristic copy, hairline + wide shadow, stripes, grid background, image hover zoom. The craft floor adds that unthemed browser surfaces are "the one models skip most reliably". Rules with **no** AI wording: monotonous spacing, gray on color, low contrast, skipped heading level, content invisible at rest, line length, tight line height, oversized hero headline, overflow, text occlusion | A11y and perf checks exist (contrast, heading skip, layout-property animation) but are not attributed to AI | Commercial tool; no published observation data |
| **DesignCode / Meng To** | M4DNgmI7MIM (2026-06-04), PA3f3MdRc08 (2026-09-25), KOZjqVNHIo8 (2026-09-20), T1WTGQesbrE (2026-05-25), 7MEsUtvEbyU (2025-10-27), Dive Club SznrOQYiahg (2026-06-30) | **Opus 4.8, GPT-5.5, Gemini 3.1 Pro** (side by side, one prompt); **Opus 5.5**; **GPT-6 Astra**; Gemini 3.5 Flash in Aura | Purple, too many colors, "random lights", caps eyebrow, uneven spacing, unnecessary status pill, grey clashing with purple (0:00-4:05); illustrations where photos belong (6:09); Unsplash images (8:14; T1WTGQesbrE 0:00); Inter ("AI used that all the time", 9:14); Lucide icons (18:31); button label wrapping (11:19); text overlapping image (T1WTGQesbrE 22:24); generic out-of-context images "in every single AI-generated website" (T1WTGQesbrE 2:01); Opus 5.5 builds a **React project by default** (31:43) and draws icons and images "from scratch" in HTML (18:27-19:29); "AI tends to kind of bring all the fonts" (7MEsUtvEbyU 23:40); GPT-6 Astra "makes a lot of mistakes, needs a lot of steering" (2:02) | None: no a11y, Lighthouse, SEO or forms check of any model's output | Sells Aura and courses; videos sponsored by Mobbin and diffui. One prompt per comparison, judged by eye |
| **Flux Academy** (one channel; guests Julian/Ship Studio and Riley) | DLzzhG1ORm8 (2026-04-01), jT5YdajTg6I (2026-05-18), uStjewbLoA0 (2026-04-20), sUMHUMNtGaY (2026-05-08), inRonh4mTYQ (2026-08-20), eiz7FwVSBNk (2026-08-26) | Claude Code (version unnamed); Claude desktop (unnamed); **Opus 4.6**; Claude Design; **Fable 5** | Blue and purple gradients "on every button", emojis, left colored border, "Inter or a System font" 9 times in 10, clean but forgettable (DLz 0:00-1:01); Claude output with purple gradient, soft shadows, misaligned cards, emojis, gradient text, heavy weights (jT5 3:02, 8:07); with the Anthropic skill installed, Claude still added fade-ins on scroll and hover states on cards (jT5 5:04); Opus 4.6 turns a Figma file without auto layout into absolute positions and fixed px (uSt 1:01), yet picked **vanilla HTML/CSS/JS** by default (uSt 3:04); Unsplash API images (sUM 7:05); Fable 5 + Impeccable produced "not slop" but dated work and missed the favicon (inR 20:20, 22:25); "Inter or Montserrat or Roboto ... the ones Claude normally picks" (eiz 12:11) | **The only accessibility audit of model output in the corpus**: Vercel skill run on Claude's page found keyboard users lose anchor navigation, no focus on the CTA, avatars without an accessible name, stars without aria-label; "Claude doesn't always do a great job at considering accessibility" (jT5 15:13) | Sells courses and an "AI sprint"; Ship Studio is a commercial tool |
| **Chromatic / Brad Frost** | Vg78K3t9KYc (2025-12-11) | **Claude Sonnet 4.5** (Copilot) | Agent invented a text area that lacked contrast (35:52); axe flagged heading order, H4 where H2 belongs (37:55) | Yes: axe checks on agent output | Launch demo for Storybook MCP |
| **Malewicz** | IkspcJdeP3U (2026-04-18), lpqTva43Bxo (2026-06-23), GzDBkU0irpA (2026-08-27) | Claude Design (unnamed model) | "same average approaches" (Ikp 1:02); AI word-salad copy and "get started" CTA (lpq 4:03); "blobby light leak", AI images that "don't make sense" (Gz 3:04, 4:04) | None | Sells books and a course |
| **DesignCourse** | YSYqFBq68Wk (2026-07-24) | Claude Design 2.0 on **Fable** | Default design system "very generic", "corporate"; accent colors "all over the place"; cream background everywhere (6:07, 7:09, 11:12) | None | Not sponsored (states so) |
| **Kole Jain** | RCneB_MQ7qs (2026-08-19) | unnamed vibe-coded site | "no images anywhere ... telltale sign that this was vibe coded" (1:00); a monospace font that "is not working" (2:02, not attributed to AI) | None | Sponsored by Relume |
| Vercel (rules only) | `skills-read/vercel-web-interface-guidelines.md` | none | Rules (div onClick, aria-label, width/height, lazy, reduced motion, text-wrap balance, overscroll in modals) | Many rules | Not an attribution: it never says models break them |
| Pro-bible web corpus | 94 videos, Osmani skills, primary pages | none (almost all pre-AI or non-AI) | General mistakes and rules | All the technical and a11y depth lives here | Many course sellers; noted in digests |

**Who tests current frontier models?** Opus 5.5: one sponsored showcase (DesignCode). GPT-6 Astra: one sponsored brainstorm video, no defect data. Gemini 3.x: one side-by-side (Gemini 3.1 Pro, June 2026). Fable 5: three videos (Flux x2, DesignCourse). No source runs a structured test, and none uses more than one prompt per model.

**How much is technical?** Across all model-output observations, the technical findings come down to two demos: jT5YdajTg6I (focus, accessible names, anchor navigation; Claude, version unnamed) and Brad Frost (heading order, contrast; Sonnet 4.5, Dec 2025). Nothing measures performance, Core Web Vitals, SEO/Open Graph, forms or secrets in model output. The one exception is Anthropic's anecdote about leaked API keys. Everything else about AI is visual style.

## 3. Per-claim table: "Где ошибаются нейронки" (98 claims)

Column "AI?" says whether the supporting source attributes the behavior to AI. Pro-bible transcripts are given by video ID.

### Lesson 01 (layout)

| Line | Claim | AI-attribution source | General-mistake source | AI? | Model / date | Grade | Voices |
|---|---|---|---|---|---|---|---|
| 162 | Landing built as an app; empty `div#root`, text only after JS | DesignCode PA3f3MdRc08 31:43: Opus 5.5 "by default ... create a React project" (said about portability, not client-side rendering). Counter-evidence: Flux uStjewbLoA0 3:04, Opus 4.6 chose vanilla HTML/CSS/JS | Fireship -B58GgsehKQ 7:06 (SPA shell); Beyond Fireship 0fONene3OIA 2:01; Chrome AQqFZ5t8uNc 18:27; Osmani CWV ("LCP element in initial HTML") | Partly (React default, not empty root) | Opus 5.5, Sep 2026 | G\* | 1 AI voice, contested |
| 163 | Content hidden at `opacity:0` until animation; script fails, page blank | The reveal habit is F (Anthropic: fade-and-slide-up on each section; jT5 5:04). The failure mode is not attributed to AI | Impeccable rule content-hidden-at-rest ("failed-reveal signature"); craft floor "already-visible default" | Partly | - | G\* | - |
| 164 | Button with handler where a link belongs | jT5 15:13 "keyboard users lose all anchor navigation" (cause not stated) | Vercel; freeCodeCamp e2nkq3h1P68 | Unclear | Claude, May 2026 | G\* | - |
| 226a | Models "almost always" set `border-box` | none | - | - | - | **N** | 0 |
| 226b | Mixed gap/margin/spacers; spacing drifts after edits | Anthropic skill ("CSS classes that cancel each other out ... padding/margin between sections"); DesignCode M4DNgmI7MIM 0:00 "uneven in terms of spacing" | Comeau Xt1Cw4qM3Ec 42:03 (margin collapse) | Yes | vendor; Opus 4.8/GPT-5.5, Jun 2026 | F1 | 2 |
| 316 | Card grid on flex with 33.33% | none | Powell x4u1yp3Msao 16:10 (auto-fit); Chrome qm0IfG1GyZU | No | - | G | - |
| 317 | `position:absolute` for ordinary layout | Flux uStjewbLoA0 1:01: without Figma auto layout "it'll just see a bunch of absolute positions and try to recreate those with fixed pixel values" (advice, conditional, not shown) | Comeau | Yes (conditional) | Opus 4.6, Apr 2026 | F2 | 1 |
| 318 | Flex nested five levels instead of one grid | none | - | - | - | **N** | 0 |
| 394 | Fixed heights (`h-[600px]`, `100vh`) | only "fixed pixel values" (uSt, Figma case) | Powell (min-height); midulive hrxjBqZWsb0 1:24:30 (100vh scroll); BEST_PRACTICES | No | - | G | - |
| 395 | Equal card height via `height` | none | BEST_PRACTICES (min-height over height); weak | No | - | G | - |
| 396 | `line-clamp` / `overflow:hidden` hide the problem with the text | none. Note: Vercel *recommends* `truncate`/`line-clamp` for long content | - | - | - | **N** (disagreement) | 0 |
| 441 | Font sizes in px | none | answers/03 (5 authors); Powell; WCAG 1.4.4 | No | - | G | - |
| 442 | `100vw` overflows by the scrollbar on Windows | none | Powell x4u1yp3Msao 9:06 | No | - | G | - |
| 524 | Desktop-first, patched with `max-width` queries | none | Powell; Impeccable adapt.md | No | - | G | - |
| 525 | `overflow-x:hidden` on body to hide sideways scroll | none. Vercel: "overflow-x-hidden on containers, fix content overflow" | - | - | - | **N** | 0 |
| 526 | 768-1024 gap forgotten | none | Impeccable audit ("missing breakpoints"); weak | No | - | G | - |
| 527 | Hover as the only way to see information | none | Impeccable adapt.md; Vercel gestures | No | - | G | - |
| 601 | Decorative absolute blobs overlap text at other widths | DesignCode T1WTGQesbrE 22:24 (AI page: title and description overlaying the image, fixed by prompt); Meng To SznrOQYiahg 17:25 ("it's overlaying ... edge cases AI will never be able to fix") | Impeccable text-occlusion rule | Yes | Aura models (GPT-5.5 / Gemini 3.5 Flash named), May-Jun 2026 | F1 | 1 |
| 602 | Fixed panels cover content and form fields on phones | none | Vercel ("sticky headers ... must not cover the focused element") | No | - | G | - |
| 603 | `z-index:9999` in ten places | none | - | - | - | **N** | 0 |
| 604 | Page scrolls under an open modal | none | Vercel (`overscroll-behavior: contain`) | No | - | G | - |
| 648 | `<div onclick>` instead of button/link | none | Vercel; Osmani a11y; Impeccable audit | No | - | G | - |
| 649 | Heading levels by size (h3 after h1, three h1) | Brad Frost Vg78K3t9KYc 37:55 (axe: H4 where H2) | Web Dev Simplified 2oiBKSjOOFE 14:07; freeCodeCamp 1:03:37; Impeccable rule | Yes | Sonnet 4.5, Dec 2025 | F1 | 1 |
| 650 | Icon buttons without text or `aria-label` | jT5 15:13 (avatars without accessible name, stars without aria-label) | Vercel; Soueidan ob_M_qXeDVE | Yes | Claude (unnamed), May 2026 | F1 | 1 |

### Lesson 02 (hierarchy)

| Line | Claim | AI-attribution source | General source | AI? | Model / date | Grade | Voices |
|---|---|---|---|---|---|---|---|
| 248 | Evenly tidy, same weight everywhere, bland | Flux DLzzhG1ORm8 1:01 ("everything looks clean ... can't point to a single memorable thing"); Anthropic "SaaS-card kit"; Brad Frost "milquetoast" (digest 6:08); Malewicz IkspcJdeP3U 1:02; DesignCourse 7:09 | Impeccable flat-type-hierarchy and monotonous-spacing (no AI wording) | Yes | Claude Code, Claude Design, Fable, Sonnet 4.5 | F1 | 5 |
| 249 | Hero template: big number, small label, three stats | Anthropic ("the default treatment"); Impeccable craft floor | - | Yes | vendor | F1 | 2 |
| 250 | Decorations (labels, badges, pills) outrank content | Anthropic template chrome; Impeccable hero pill; DesignCode M4DNgmI7MIM 0:00 ("the status. Totally unnecessary, out of nowhere") | - | Yes | Opus 4.8/GPT-5.5 | F1 | 3 |
| 288 | Two equal filled CTAs "Get Started" + "Learn More" | only Malewicz lpqTva43Bxo 4:03 ("get started" vague; copy point, not button weight) | BEST_PRACTICES [V] one dominant action | No | - | G | - |
| 289 | Main CTA repeated equally loud everywhere | none | - | - | - | **N** | 0 |
| 290 | Gradient button with shadow and arrow | Anthropic ("'→' appended to link and button text", gradient washes); Flux DLz 1:01 (gradients "on every button"); jT5 3:02 (soft shadows); Impeccable glow | - | Yes | Claude, 2026 | F1 | 3 |
| 366 | Same 24 px spacing everywhere | none (DesignCode saw *uneven* spacing) | Impeccable monotonous-spacing; Chainlift 9ElrcTtAxzA; Schoger | No | - | G | - |
| 367 | Random values (13, 22, 37) after edits | DesignCode 0:00 (uneven spacing); Anthropic (classes cancel out) | Impeccable layout.md (scale, not one-offs) | Yes (effect) | Opus 4.8/GPT-5.5 | F1 (weak) | 2 |
| 368 | Desktop spacing kept on mobile (80 px gaps) | none | - | - | - | **N** | 0 |
| 410 | Everything centered, including five-line paragraphs | none | Pamental HEaNIWSW1g8 51:21 | No | - | G | - |
| 411 | Three different vertical axes on one page | jT5 3:02 "improper vertical alignment of these cards" (different issue) | Impeccable polish (align to grid) | No | - | G | - |
| 412 | Container width differs per section | none | - | - | - | **N** | 0 |
| 478 | Same font in every project; DesignCode names Inter | DesignCode M4DNgmI7MIM 9:14; Flux DLz 1:01 (Inter/system 9 in 10); eiz 12:11 (Inter/Montserrat/Roboto); Meng To SznrOQYiahg 0:00; Impeccable overused-font; Anthropic ("not the default families") | - | Yes | Opus 4.8/GPT-5.5; Claude incl. Fable-era | F1 | 4 (attribution correct) |
| 479 | Giant desktop headline that floods or overflows the phone | none (Impeccable oversized-hero rule has no AI wording) | Impeccable; Pamental | No | - | G | - |
| 480 | Monospace for small labels to look "technical" | Anthropic ("a monospace face for small data labels"); Impeccable craft floor and new-work ("small tracked mono labels") | Kole Jain 2:02 (not attributed) | Yes | vendor | F1 | 2 |
| 481 | One-word last line in headings; `text-wrap: balance` (◆ Vercel) | none. Vercel gives the rule, not an AI attribution | Vercel; Impeccable "balanced headings" | No | - | G | - |
| 547 | Light grey secondary text, lighter placeholders | Brad Frost 35:52 (agent's text area lacked contrast) | Impeccable low-contrast; craft floor (placeholder ≥4.5:1) | Yes (weak) | Sonnet 4.5 | F1 (weak) | 1 |
| 548 | Grey text on colored surface (◆ Impeccable, ◈ Schoger) | DesignCode 0:00 ("the gray doesn't fit with the purple") | Impeccable gray-on-color (no AI wording); Schoger S6-q5BheEYU | Yes (weak) | Opus 4.8/GPT-5.5 | F1 (weak) | 1 |
| 549 | White text straight on a photo with no scrim | none (T1WTGQesbrE is overlap, not contrast) | BEST_PRACTICES ◆ (contrast vs pixels behind); Impeccable colorize | No | - | G | - |
| 550 | State shown only by color (red border, no text) | none | Osmani a11y (exact example); Impeccable critique; Web Dev Simplified | No | - | G | - |
| 601 | Purple/blue-violet gradient with glowing blobs; "DesignCode calls it the main sign" | DesignCode 0:00-4:05 (lights, purple; Opus 4.8, GPT-5.5); Flux DLz, jT5; Meng To SznrOQYiahg; Malewicz Ikp 5:09; Impeccable ai-color-palette, glow, radial halo, spotlight | - | Yes | Jun 2026 and earlier | F1 (see §6: dating) | 4 |
| 602 | Gradient text in headings | Impeccable ("common AI tell"); jT5 8:07 (audit of Claude output: "gradient text everywhere") | - | Yes | Claude, May 2026 | F1 | 2 |
| 603 | Three or four accents; each card icon its own color | DesignCode 3:03 (Opus 4.8 "too many colors"); DesignCourse 6:07 (accents "all over the place") | - | Yes | Opus 4.8; Claude Design/Fable | F1 | 2 |
| 604 | Mixed warm, cool and bluish greys (◇ Schoger) | none | Schoger S6-q5BheEYU 11:12 | No | - | G | - |

### Lesson 03 (speed)

| Line | Claim | AI-attribution source | General source | AI? | Grade | Voices |
|---|---|---|---|---|---|---|
| 268 | Images without width/height | none | Chrome AQqFZ5t8uNc 2:04; Beyond Fireship 3:02; Vercel; Osmani | No | G | - |
| 269 | Banners and cookie bars inserted on top push the page | none | Syntax KY6Cr6t-cuA 4:04; Chrome; Impeccable optimize | No | G | - |
| 270 | Web font with different metrics reflows text | none | Syntax 4:04; Leatherman FbguhX3n3Uc; Impeccable typeset | No | G | - |
| 271 | Late blocks without reserved height | none | Chrome 2:04 (injected content); Syntax (skeletons) | No | G | - |
| 320 | Heavy libraries for a couple of effects | none (DesignCode presents three.js positively) | Chrome 33:48; Impeccable audit | No | G | - |
| 321 | Scroll or mousemove handlers recalculating layout | none | Osmani perf; Vercel; Impeccable harden | No | G | - |
| 322 | Submit without instant feedback, double clicks | none | Vercel (spinner); answers/08 | No | G | - |
| 452 | `loading="lazy"` on everything including the hero | none | web.dev (PRIMARY); Vercel; Osmani | No | G | - |
| 453 | Hero as CSS background or JS slider | none | Osmani CWV (LCP in initial HTML; background image as LCP) | No | G | - |
| 454 | One file for all screens, no dimensions | none | Beyond Fireship 3:02; Chrome 6:09; Osmani | No | G | - |
| 455 | Images inlined as base64 | none. Note: Impeccable new-work itself inlines plates as data URIs for single-file deliverables | Leatherman 45:03 (about fonts, not images) | - | **N** | 0 |
| 456 | Hotlinking images from other sites and stocks | Flux sUMHUMNtGaY 7:05 (Claude "took all these from a Unsplash API"); DesignCode M4DNgmI7MIM 8:14, T1WTGQesbrE 0:00 | - | Yes | F1 | 2 |
| 516 | Two families with every weight "just in case" | DesignCode 7MEsUtvEbyU 23:40 ("AI tends to kind of bring all the fonts"; ambiguous) | Impeccable optimize ("limit font weights loaded"); Leatherman | Yes (weak) | F1 (weak) | 1 |
| 517 | Fonts via `@import` from another server | none | Osmani audit ("Avoid @import"); Leatherman (self-host) | No | G | - |
| 518 | Whole icon font for five icons | G\*: DesignCode says AI defaults to Lucide (a library, not a font) | Leatherman 20:29; Impeccable document.md | No | G | - |
| 560 | Tailwind via Play CDN (◆ tailwindcss.com) | none. The Tailwind doc is outside the corpus | - | - | **N** | 0 |
| 561 | Static landing built as a React app, hundreds of KB | DesignCode PA3f3MdRc08 31:43 (Opus 5.5 React by default); contradicted by Flux uStjewbLoA0 3:04 (Opus 4.6 vanilla) | Beyond Fireship 2:01 | Yes (contested) | F1 (weak) | 1 |
| 562 | Animation library for a fade that CSS can do | none | - | - | **N** | 0 |
| 563 | Same rise-up reveal on every block, hover effect on every card | Anthropic (exact wording); Impeccable craft floor; jT5 5:04 (Claude with the Anthropic skill still did it) | - | Yes | F1 | 3 |
| 564 | `prefers-reduced-motion` ignored (◆ Vercel) | none (Anthropic lists it as a floor; no source says models skip it) | Vercel; Osmani; Web Dev Simplified 29:20 | No | G | - |

### Lesson 04 (accessibility)

| Line | Claim | AI-attribution source | General source | AI? | Grade | Voices |
|---|---|---|---|---|---|---|
| 157 | div/span "buttons" with `role=button`, no keyboard | none | Osmani a11y; Vercel | No | G | - |
| 158 | Menus and modals hidden off-screen or by opacity stay in Tab order | none | Soueidan ob_M_qXeDVE (hiding techniques and the a11y tree) | No | G | - |
| 159 | Modal does not take focus or return it | none (Dive Club 9:10 is a human app) | Soueidan (trap focus, return focus, inert); Osmani; Impeccable harden | No | G | - |
| 160 | Carousel or menu that opens only on hover | none | Vercel (gesture alternatives); Impeccable adapt | No | G | - |
| 271 | Icon buttons without a name | jT5 15:13 (Claude: avatars, stars) | Vercel; Soueidan | Yes | F1 | 1 |
| 272 | Headings faked with large-font divs | none | freeCodeCamp 1:03:37; Web Dev Simplified 14:07 | No | G | - |
| 273 | Skipped levels, h1 to h4 | Brad Frost 37:55 (Sonnet 4.5) | Soy Dalto m67d6q_oYHo; freeCodeCamp; Impeccable rule | Yes | F1 | 1 |
| 274 | Redundant ARIA; label not matching visible text (◆ WCAG 2.5.3) | none | Soueidan 29:34 (2.5.3); Osmani; WebAIM note in BEST_PRACTICES | No | G | - |
| 275 | No `lang` on the page | none | Osmani best-practices (`<html lang>`) | No | G | - |

### Lessons 05, 06, 07, 09

| Line | Claim | AI-attribution source | General source | AI? | Grade | Voices |
|---|---|---|---|---|---|---|
| 05:150 | "Full" template form (title, split name, country, how-did-you-hear, confirm email, captcha) | none | Baymard DlQ1wcHFxBo; Friedman qktwIWZNFY4; GOV.UK in answers/08 | No | G | - |
| 05:151 | Newsletter box pre-ticked | none | Friedman 45:38; GDPR Recital 32, EDPB (PRIMARY) | No | G | - |
| 05:152 | Every field required | none | Grundy hPS7LUW7SlA 22:42 | No | G | - |
| 05:238 | One generic "Please fix the errors" | none | Friedman 21:12; Silktide ffxwEyBcdf0 44:45 | No | G | - |
| 05:239 | All fields wiped after a failed submit | none | Friedman ~21:12 ("input is fully cleared on an error") | No | G | - |
| 05:240 | Error shown only as a red border | none | Osmani a11y (exact example) | No | G | - |
| 05:241 | `role="alert"` on every error (◈ Weakley, Silktide) | none | Weakley 9aSEd7R4GjY 11:19; Silktide 42:43 | No | G | 2 general voices |
| 06:216 | Same image and description on every page | none | answers/09 (unique title/description per page); weak for images | No | G | - |
| 06:217 | Relative `og:image` URL | none | Meta 8Tn2aiWUOfY ("full URLs") | No | G | - |
| 06:218 | `og:image:alt` forgotten (◆ ogp.me) | none; the corpus only recommends adding it (answers/09) | - | - | **N** | 0 |
| 06:219 | Duplicate tags from template and plugin | none | answers/09 (PP; Google structured data "one source") | No | G | - |
| 07:155 | Key pasted into page script "for simplicity", prototype becomes the site | Anthropic fHWFF_pnqDk 2:08 and Q&A ("people leaking API keys" in vibe-coded apps; anecdote, cause not shown) | answers/05 (project rule, not a source) | Yes (anecdote) | F2 | 1 |
| 07:156 | `.env` with keys committed or published | none | - | - | **N** | 0 |
| 07:157 | Admin password in a code comment | none | - | - | **N** | 0 |
| 09:144 | Default font (Inter, Roboto, system stack) is "the first sign"; Impeccable catches it | same as 02:478 | - | Yes | F1 ("first sign" overstated) | 4 |
| 09:145 | Trendy font with no Cyrillic check | none | BEST_PRACTICES ◆◈; Photofox 1dSjHlQTzw8 | No | G | - |
| 09:146 | Third and fourth font "for accent" | none (7MEsUtvEbyU "bring all the fonts" is about loading) | Anthropic ("one family or two", a rule); BEST_PRACTICES ◈ | No | G | - |
| 09:147 | Spaced caps label above every heading | Anthropic ("a tracked-out ALL-CAPS eyebrow label above every heading", exact); Impeccable kicker ban ("Generated kickers never earn their place"); DesignCode 0:00 (eyebrow seen in Opus 4.8/GPT-5.5 era output) | - | Yes | F1 | 3 |
| 09:278 | Photos hotlinked from Unsplash: foreign server, licence, link rot | Behavior: sUMHUMNtGaY 7:05, DesignCode 8:14. The reasons (licence, link rot) are not in any AI source | BEST_PRACTICES (stock licence, Pexels ◆) | Yes (behavior) | F1 | 2 |
| 09:279 | Generic scenes instead of the actual tour place | DesignCode T1WTGQesbrE 2:01 ("generic images that we see in every single AI-generated website ... out of context"); sUMHUMNtGaY 7:05; Malewicz Gz 4:04 | Flux BN8pC91rJaU; photographer bhOE0ndV2Gc | Yes | F1 | 3 |
| 09:280 | Headline on the busiest part of the photo, shadow instead of a better frame | none | answers/15 (Gray, Segall: free space for headline) | No | G | - |

## 4. Totals

### AI boxes (98 claims)

| Lesson | F | G | N | Total |
|---|---|---|---|---|
| 01 layout | 5 | 14 | 5 | 24 |
| 02 hierarchy | 12 | 9 | 3 | 24 |
| 03 speed | 4 | 13 | 3 | 20 |
| 04 access | 2 | 7 | 0 | 9 |
| 05 forms | 0 | 7 | 0 | 7 |
| 06 search | 0 | 3 | 1 | 4 |
| 07 security | 1 | 0 | 2 | 3 |
| 09 type/photo | 4 | 3 | 0 | 7 |
| **All** | **28 (28.6%)** | **56 (57.1%)** | **14 (14.3%)** | **98** |

- Within F: 26 F1 and 2 F2. Only **16 F claims** have two or more independent voices: 01:226b, 02:248, 02:249, 02:250, 02:290, 02:478, 02:480, 02:601, 02:602, 02:603, 03:456, 03:563, 09:144, 09:147, 09:278, 09:279. The other 12 rest on one channel or one demo: 01:317, 01:601, 01:649, 01:650, 02:367, 02:547, 02:548, 03:516, 03:561, 04:271, 04:273, 07:155.
- **Visual style vs technical.** Of the 28 F claims, 22 are visual style or imagery. Six are technical: 01:226b, 01:649, 01:650, 03:561, 04:271, 04:273. Four of those six rest on the same two demos.
- **Lessons 03 to 07** (speed, accessibility, forms, search, security) have 43 AI claims. Seven are F, and only two of those are technical failures seen in model output (heading order and missing accessible names, each from one demo). The rest of these boxes describe general web mistakes relabelled as AI mistakes.

### Human boxes (24 claims)

G: 21 (87.5%). N: 3 (12.5%): 04:316 "Image of" in alt text, 05:348 no second channel (answers/08 says explicitly "WhatsApp or phone alternatives ... not covered by any source"), 06:119 expecting results from an SEO plugin. Grade F does not apply here.

| Line | Claim | Source | Grade |
|---|---|---|---|
| 01:220 | width:100% + padding overflows | Comeau (answers/03) | G |
| 01:221 | Margin on every element, spacing conflicts | Comeau 42:03 margin collapse; weak | G |
| 01:517 | Testing only on own laptop/phone | Impeccable (real hardware); weak | G |
| 01:518 | Device breakpoints 375/768/1024 | Powell 22:17 (choose breakpoints from content); weak | G |
| 02:241 | Emphasising everything | Schoger S6-q5BheEYU; Sajid 9-oefwZ6Z74 | G |
| 02:242 | Size only; weight and color are subtler | Showalter uwNClNmekGU; Sajid | G |
| 02:470 | 150 characters per line | Pamental; Impeccable line-length; Anthropic <80 | G |
| 02:471 | Five sizes 1-2 px apart | Impeccable flat-type-hierarchy; answers/14 | G |
| 02:472 | Font with no Cyrillic | BEST_PRACTICES ◆◈ | G |
| 03:203 | Testing speed on a fast, cached machine | web.dev lab vs field (answers/13 E); Syntax | G |
| 03:204 | Uploading camera files | BEST_PRACTICES (resize/compress) | G |
| 04:316 | "Image of" in alt | not found | N |
| 04:317 | Keyword-stuffed alt (◆ Google) | Google images page (PRIMARY) | G |
| 04:318 | Describing decorative images | BEST_PRACTICES ◆◈ (empty alt) | G |
| 05:346 | No test submission, mail lands in spam | Stewart Gauld fsZaEce18FE (SPF/DKIM/DMARC); answers/11 "test before you trust" | G |
| 05:347 | Counting thank-you page views as leads | answers/11 treats a thank-you page event as acceptable (see §7) | G (disagreement) |
| 05:348 | No second channel | answers/08: not covered | N |
| 06:117 | Promising rankings | answers/09 ("Do not promise rankings"); Osmani | G |
| 06:118 | "200 factors", bounce, dwell (◇) | BEST_PRACTICES ◇ (Fireship unsourced) | G (consistent) |
| 06:119 | Expecting results from an SEO plugin | not found | N |
| 07:269 | 2FA (◈ three authors) | answers/16 | G |
| 07:270 | No default passwords (◈) | answers/16 (RINKU 5:05) | G |
| 07:271 | Update plugins (◈ four) | answers/16 | G |
| 07:272 | Treat downloaded skills, plugins and MCP servers as untrusted code | answers/16 ("from trusted sources"); Osmani polyfill supply chain; the extension to AI skills is the lesson's own | G (weak) |

## 5. Strongest and weakest claims

**Strongest.** Each has a vendor or exact-wording source, observed output and two or more voices.
1. **09:147** Caps eyebrow above every heading: Anthropic's exact wording, Impeccable's outright ban, DesignCode's observation.
2. **03:563** Same reveal on every block plus hover on every card: Anthropic's exact wording. Flux shows Claude doing it *with* Anthropic's skill installed (jT5 5:04).
3. **02:249** Big-number hero: Anthropic calls it "the default treatment"; Impeccable lists it.
4. **02:480** Monospace labels: Anthropic and Impeccable.
5. **02:602** Gradient text: Impeccable, plus an audit of Claude output.
6. **02:248** Bland uniformity: five voices.
7. **09:279** Generic photos: three voices.
8. **02:478 / 09:144** Default fonts: four voices. But see §6.

**Weakest.** Graded N or carried only by a rule that never mentions AI.
- N: 01:226a (border-box), 01:318, 01:396, 01:525, 01:603, 02:289, 02:368, 02:412, 03:455, 03:560, 03:562, 06:218, 07:156, 07:157.
- Labelled ◆ or ◈, but the mark certifies the rule, not the AI attribution: 01:442 (◈ Powell), 02:481 (◆ Vercel), 03:560 (◆ tailwindcss.com), 03:564 (◆ Vercel), 04:274 (◆ WCAG 2.5.3), 05:241 (◈ Weakley, Silktide), 06:218 (◆ ogp.me).
- Every claim in lesson 05 (forms) and lesson 06 (search) is G or N. Nothing in the corpus shows a model making a form, SEO or Open Graph mistake.

## 6. Claims likely outdated for the newest models

- **02:601 Purple gradient and glow.** DesignCode, the lesson's own source, calls the purple gradient "very 2025" (M4DNgmI7MIM 1:03). He found Gemini 3.1 Pro already less prone to "lights". In the Opus 5.5 video he says the output "does not look AI slop at all" (45:01). The Fable 5 outputs in the corpus are not described as purple. Anthropic's current calibration list for its own models leaves purple out and lists instead: cream + high-contrast serif + terracotta, near-black + acid green or vermilion, broadsheet hairlines, the SaaS-card kit. Impeccable now flags cream as well. In the Fable 5 run, the model itself predicted the AI default as "cream background, elegant serif fonts, terracotta accent" (inRonh4mTYQ 3:02). Purple fits Opus 4.8 and GPT-5.5 (mid-2026). It is weak evidence for Opus 5.5 and Fable 5, and there is none for GPT-6 Astra.
- **02:478 / 09:144 Inter.** The evidence is contested. Riley (Fable 5 era, Aug 2026) still says Claude "normally picks" Inter, Montserrat or Roboto. But Anthropic's current list and Impeccable's newer lists point to serif display faces (Fraunces, Playfair, Newsreader italic), mono labels, Space Grotesk, Geist, DM Sans and Instrument Sans. Calling Inter "the first sign" (09:144) is too strong for 2026-Q3 models.
- **01:162 / 03:561 React by default.** Not outdated, but unstable across versions: Opus 4.6 chose vanilla HTML (Apr 2026), Opus 5.5 picked React (Sep 2026, one voice). The "empty `div#root`" mechanism is not observed anywhere; a React project may also be server-rendered.
- **Current tells the lessons leave out** (documented for 2026 models in the corpus): cream/serif/terracotta, italic serif hero, near-black + neon accent, side-tab colored left border ("most recognizable", Impeccable and Flux), numbered 01/02/03 markers, middle-dot meta strings, emoji or Unicode glyphs as icons (Flux, Impeccable), Lucide as the default icon set (DesignCode), illustrations hand-drawn in HTML/SVG where a photo belongs (DesignCode, both Opus 4.8-era and Opus 5.5 videos), text overlapping images, browser surfaces (selection, scrollbars, focus ring) left unthemed ("the one models skip most reliably", Impeccable), missing favicon (Fable 5 run).

## 7. Disagreements with the lesson text

1. **The evidence marks in AI boxes prove the rule, not the AI attribution.** A reader sees "◆ Vercel" or "◆ WCAG" in a box titled "where AI models err" and assumes a primary source says models do this. None does. This affects about seven claims (listed in §5).
2. **02:601 "DesignCode calls it the main sign."** DesignCode says the thing he hates most is the "random lights"; he calls the purple gradient "very 2025", which marks it as dated, not as the main current sign.
3. **01:396 line-clamp.** Vercel's guideline recommends `truncate` / `line-clamp-*` for long content. The lesson should say "line-clamp *without a way to read the full text*" rather than present it as an AI error.
4. **01:525 `overflow-x:hidden`.** Vercel suggests `overflow-x-hidden` on containers together with fixing the overflow. The lesson's "on body as the cure" is a narrower point and should say so.
5. **03:455 base64.** The project's own Impeccable skill inlines raster plates as data URIs for single-file deliverables. The lesson is right for multi-page sites, but the claim is not attributed to AI anywhere.
6. **01:226 "models almost always set border-box."** Unsupported. It is a positive claim about model behavior with no source.
7. **02:366 vs 02:367.** The observed AI defect is *uneven* spacing (DesignCode), which supports 367, not "the same 24 px everywhere" (366). Impeccable's monotonous-spacing rule is not attributed to AI.
8. **05:347 thank-you page (human box).** answers/11 summarises eight videos as "define a specific event (thank-you page, form success)" and calls a success page "more honest than a click". The lesson treats thank-you page views as wrong outright. The technical argument (reload, direct visits) is sound, but it is the lesson's own stricter position, not the corpus consensus. It should be marked ◇.
9. **01:166 note.** Accurate as written. Fireship is the only voice for "serve ready HTML", and the CSR-indexing claim is marked as overstated in BEST_PRACTICES.

## 8. Bottom line for the owner's standard

The standard is "true for current frontier models". Under it, about one claim in six (16 of 98) is well supported: the visual-template tells in lessons 02 and 09, plus the reveal animation in 03. Those tells are best documented for Opus 4.8, GPT-5.5 and Claude in general (mid-2026). For Opus 5.5, Fable 5, GPT-6 Astra and Gemini 3.x the corpus has only a handful of sponsored showcase videos and no defect audits. The technical boxes (speed, accessibility, forms, search, security) are mostly sound web best practice, but the corpus does not show that current models make these mistakes. To keep the box titles honest, either retitle those boxes along the lines of "what to check in AI output" (a checklist, not an observation), or gather real audits of current-model output (Lighthouse, axe, a keyboard pass on a few generated pages) before claiming them as AI errors.
