# Provenance: "Where people err" / "Where AI errs" boxes in the lessons

> **Status 15 Oct 2026: fixes applied to lessons 01-09 and index**, based on this file, `AUDIT_INDEPENDENT.md` and `EXTERNAL_CHECK.md`. AI boxes now hold only observed (F) claims with model and date; G claims moved to new "Частые ошибки: у людей и у нейронок" boxes (`.note.common`) with practice sources; unsupported N claims removed or marked ◇; AIMAC data added to lessons 02, 04, 05; corpus disagreements fixed (line-clamp, thank-you page, shadow over photos, React default, Inter "first sign", purple gradient dating); missing 2026 tells added to lesson 02; demo buttons "Как сделала нейронка" renamed "Типичная ошибка". Line numbers below refer to the pre-fix files.

Audit date: 15 Oct 2026. Scope: all 37 `note human` / `note ai` boxes in `lessons/01-09`.
Question audited: is each claim taken from our sources, and do those sources describe **current frontier models** (Opus 5.5, Fable 5, GPT-6 Astra, Gemini 3.x), not "AI" in general?

## Corpora checked

| Corpus | Path | What it can support |
|---|---|---|
| Pro-bible general | `pro-bible/transcripts`, `digests`, `answers` (89 non-AI videos, 2013-2026) | Common **human** mistakes and best practice. Says nothing about what models do. |
| Pro-bible AI | 5 videos `ai-en` (Anthropic x2 Jul 2025, YC Apr 2025, ForrestKnight Oct 2025, DevForge Feb 2026) | AI **workflow** (plan, test, review). No catalogue of frontend errors. Pre-dates current frontier models. |
| Rule sets | `pro-bible/skills-read` (Vercel guidelines, Osmani web-quality) | Generic UI/perf/a11y rules. Not AI-specific. |
| Design-KB AI videos | `design-kb/transcripts`, 2026 videos that test models (see list below) | The **only** corpus that observes real model output. |
| Vendor skill | `pro-bible/skills-read/anthropic-frontend-design.md` | Anthropic's current list of "AI-generated design clusters". One vendor voice, but written for current Claude models. |
| Impeccable | project skill v0.1.11 | Detector rules are compiled into a binary; rule texts were not readable in this audit. Lesson citations of "Impeccable" are therefore unverified at rule level. |

Frontier-model evidence in Design-KB (model named in the video):

| Date | Video | Models observed | Error content |
|---|---|---|---|
| 2026-04-01 | Flux, "Why All AI Generated Designs Look The Same" | unnamed (Claude Code, Lovable) | blue/purple gradients, emojis, left colour bar on cards, Inter/system font "9 of 10" |
| 2026-05-18 | Flux, "I Tested Claude Skills" | Claude, no skill (baseline) | purple gradients, white bg, soft shadows, misaligned cards, emojis; Impeccable audit found gradient text, heavy weights; "doesn't always do a great job at accessibility" |
| 2026-06-04 | DesignCode, "How to Avoid AI Slop" | GPT-5.5, Opus 4.8, Gemini 3.1 Pro | uneven selected state, ALL-CAPS eyebrows, needless status chips, uneven spacing, glowing lights, grey vs purple clash, purple gradient, too many colours, Unsplash stock, Inter, Lucide icons |
| 2026-08-19 | Kole Jain, "vibe coding CAN'T fix" | unnamed vibe-coded site | no images, generic layout, monospace face |
| 2026-08-20 | Flux, "Fable 5 vs Web Designer" | Fable 5 + Impeccable | cliché named by the skill: cream bg, elegant serif, terracotta accent, rustic full-bleed photos; model "always picks number one" |
| 2026-08-26 | Flux, "prompt Fable 5" | Fable 5, Opus 4.8 | defaults to Inter, Montserrat, Roboto; generic two-column layout |
| 2026-09-20 | DesignCode, "GPT-6 Astra" | GPT-6 Astra | crams layouts; needs explicit "retina" or outputs low-res assets; "slow and makes mistakes" |
| 2026-09-25 | DesignCode, "Opus 5.5" | Opus 5.5 | creates a React project unless told "single HTML file"; draws objects in HTML/CSS badly unless told the technology; generated people look sloppy |

Key observation: the two videos on the newest models (Astra, Opus 5.5) contain almost no error catalogue. They are sponsored effects demos. **No source in our corpus tests the technical/accessibility behaviour of current frontier models.**

## Grades

- **F** = stated by at least one source that observed 2025-2026 model output (table above) or by Anthropic's current skill. Number of independent voices given.
- **G** = the mistake is real and present in our general corpus or rule sets, but **no source says models make it**. The "AI" attribution was the lesson author's inference.
- **N** = no source in our corpus at all.

## Claims in "Where AI errs" boxes

| Lesson:line | Claim | Grade | Basis |
|---|---|---|---|
| 01:159 | Landing built as app, empty `<div id="root">` | G (partial F) | Fireship/Chrome on server HTML (general). Opus 5.5 video: makes a React project by default (1 voice). Empty-root detail itself not in sources |
| 01:159 | Content hidden at `opacity:0` until script | N | |
| 01:159 | Button handler instead of link | G | Vercel rules |
| 01:224 | Mixed gap/margin/spacer blocks drift | G | |
| 01:313 | Flex 33.33% card grids, `absolute` for layout, 5-level nested flex | N / G | Powell, Chrome layouts teach Grid; no AI attribution |
| 01:391 | Fixed heights, `100vh`, line-clamp hiding text | G | Vercel/Osmani rules |
| 01:438 | px font sizes; `100vw` adds scrollbar width | G | Powell (◈ cited) is a general CSS talk, not about AI |
| 01:521 | Desktop-first `max-width`, `overflow-x:hidden`, 768-1024 gap, hover-only info | G | general responsive corpus |
| 01:598 | Absolute decorations overlap, fixed bars cover forms, `z-index:9999`, scroll behind modal | N / G | |
| 01:645 | `div onclick`, heading levels by size, icon buttons without label | G | Vercel rules; Flux: Vercel audit flagged unnamed avatar group and stars without aria-label on a Claude page (1 voice, weak F) |
| 02:245 | Everything equal weight, "clean but forgettable" | F (2) | Flux Apr 2026 ("clean but forgettable"), Anthropic skill |
| 02:245 | Hero "big number, small label, three stats" | F (1) | Anthropic skill only; Impeccable citation unverified |
| 02:245 | Decoration (labels, badges, chips) outweighs content | F (2) | DesignCode (status chips), Anthropic skill (eyebrows, labels) |
| 02:285 | Two equal filled buttons "Get Started / Learn More"; CTA repeated equally loud; gradient button with shadow and arrow | N / F (1) | No source for the first two. Arrow on buttons: Anthropic skill. Glowing gradient button: Flux Fable-5 video (human's own exploration, not AI) |
| 02:363 | Same spacing everywhere; random values 13/22/37; desktop spacing on phone | F (1) for uneven spacing / N for the rest | DesignCode (uneven top/left spacing). Specific numbers are invented illustrations |
| 02:407 | Centres everything; three verticals; different container widths | N | |
| 02:475 | Same default font (Inter) everywhere | F (4) | Flux Apr, DesignCode Jun, Flux/Riley Aug (Fable 5 era: Inter, Montserrat, Roboto), Anthropic skill ("default families") |
| 02:475 | Giant heading overflowing on phone | N | |
| 02:475 | Monospace for small labels | F (2) | Anthropic skill, Kole Jain |
| 02:475 | Orphan last word, fix with `text-wrap: balance` | G | Vercel rule (not AI-attributed) |
| 02:544 | Light grey secondary text, grey on colour | G | Impeccable/Schoger cited; Schoger is a 2018-era human craft talk |
| 02:544 | White text on photo without scrim; state shown by colour only | G | |
| 02:598 | Purple / blue-violet gradient with glows | F (3), **possibly dated** | Flux Apr, Flux May, DesignCode Jun (Opus 4.8, GPT-5.5). Anthropic's current skill and the Fable 5 test name *different* clusters (cream + serif + terracotta; black + acid green; broadsheet; SaaS card kit). The tell moves with each model generation |
| 02:598 | Gradient text in headings | F (1) | Flux May (Impeccable audit result) |
| 02:598 | Three-four accents, mixed greys | F (1) / G | DesignCode "too many colors" (Opus 4.8); mixed greys = Schoger (human) |
| 03:265 | Images without width/height, banners pushing layout, font swap shift, no placeholders | G | Chrome CWV talks, Osmani rules |
| 03:317 | Heavy libraries, layout thrash on scroll, no instant submit feedback | G | |
| 03:449 | `loading="lazy"` on hero, hero as CSS bg/slider, one file for all screens, base64, hotlinked images | G / N | lazy/LCP = Chrome, Osmani. base64 = N. Hotlinked stock = F (1, DesignCode "avoid the Unsplash images") |
| 03:513 | All font weights, `@import` from foreign server, whole icon font | G | Osmani rules |
| 03:557 | Tailwind Play CDN in production | G | Tailwind docs verified (◆) for the rule; **no source says models do it** |
| 03:557 | Static landing as React app | F (2) | Opus 5.5 video, Malewicz (Claude Design outputs React) |
| 03:557 | Animation library for a simple fade | N | |
| 03:557 | Same fade-up on every block, hover on every card | F (1) | Anthropic skill |
| 03:557 | Ignore `prefers-reduced-motion` | G | Vercel rule |
| 04:154 | div buttons, hidden menus still tabbable, modal focus not moved/returned, hover-only menus | G | a11y corpus (freeCodeCamp, WDS, Soueidan) |
| 04:268 | Unnamed icon buttons, div headings, skipped levels, redundant ARIA, no `lang` | G | WCAG 2.5.3 ◆ for the rule; no AI attribution |
| 05:147 | Template "full" form, pre-checked newsletter, all fields required | G | Baymard, Friedman, Grundy (human form practice) |
| 05:235 | Generic "fix the errors", fields wiped, red border only, `role=alert` on every error | G | Weakley, Silktide (cited ◈, but they describe human-built forms) |
| 06:213 | Same og:image everywhere, relative URL, no og:image:alt, duplicate tags | G | ogp.me ◆, Meta talk |
| 07:152 | API key in client script, `.env` committed, password in comment | G / ◇ | General security corpus. Only AI-specific mention: Anthropic VP talk, anecdotal, Jul 2025 (answers/13 marks it "not verified") |
| 08:162 | Model fills gaps with plausible invented facts (prices, licences, awards, reviews) | N in corpus | Cited as "our checklist", but `CHECKLIST_2026.md` §6 is our own DRAFT, marked "general practice, to be verified". No video in either corpus documents it |
| 09:141 | Default Inter / Roboto / system stack | F (4) | as 02:475 |
| 09:141 | Trendy font without Cyrillic; 3rd-4th font for accents | G / N | |
| 09:141 | ALL-CAPS spaced labels over every heading | F (2) | DesignCode, Anthropic skill |
| 09:275 | Hotlinked Unsplash/stock photos | F (1) | DesignCode |
| 09:275 | Generic stock scenes instead of the real place | F (1) | Kole Jain ("acts like it's never heard of a restaurant") |
| 09:275 | Heading over busiest part of photo + shadow | N | |

## Claims in "Where people err" boxes

All 9 human boxes are grade G: they come from the general pro-bible corpus, where human practitioners describe their own and clients' mistakes. That is the right kind of source for human errors. Per-claim timestamps were not re-checked in this audit; topic presence was confirmed by search (box-sizing, breakpoints, line length, Cyrillic, camera-original photos, "image of" alt, spam folder, thank-you page, ranking-factor myths, plugins, 2FA all appear in transcripts or answers). Two items have no match in the corpus: "default passwords on admin panels" (07:266, marked "three authors") and "margin on every element" (01:217).

## Totals (AI boxes, about 75 sub-claims)

- F, frontier-observed: about 18 (24%). Almost all are **visual tells**: default fonts, gradients/glow, eyebrows, monospace labels, equal-weight layouts, decoration chips, fade-up everywhere, stock photos, React-by-default.
- G, real mistake but AI attribution unsourced: about 45 (60%). Almost all **technical, performance, accessibility, forms, SEO, security** items.
- N, no source: about 12 (16%).
- Strongest (4 voices): default Inter-type font. Next (3 voices): purple gradient/glow, but it is already being replaced by other clusters in the newest models.

## Recommended fixes in the lessons

1. Retitle G items: "Typical mistakes (people and AI alike)" or "Check this in any build", instead of "Where AI errs". They are still worth checking; they are just not proven to be AI habits.
2. Delete or rewrite N items, or move them to a "hypotheses to test" list.
3. Add a date and model note to F items: "observed in 2026 on Opus 4.8 / GPT-5.5 / Gemini 3.1 / Fable 5; tells shift with each model generation".
4. Add Anthropic's current clusters (cream + serif + terracotta, black + acid accent, broadsheet, SaaS card kit, middle-dot meta strings, '→' on buttons) to lesson 02, since they describe current Claude models better than the purple gradient.
5. The gap that only an experiment can close: give the same brief to Opus 5.5, Fable 5, GPT-6 Astra and Gemini, run the Impeccable detector plus a technical checklist (Lighthouse, axe, keyboard pass) on each output, and record what actually occurs.
