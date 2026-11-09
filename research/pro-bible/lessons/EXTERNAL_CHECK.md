# External check of the unsourced (N) claims and of frontier-model behaviour

Date: 15 Oct 2026. Companion to `PROVENANCE_ERRORS.md`. Two questions per claim:
1. **Practice**: is the advice itself backed by an authoritative source (standard body, browser vendor, major research group)?
2. **AI attribution**: is there independent evidence that current frontier models actually make this mistake?

Tags: ◆ primary or standard source, ◈ independent benchmark or several sources, ◇ single or weak source.

## New frontier-model evidence found outside our corpus

| Source | Type | Models | What it shows |
|---|---|---|---|
| AIMAC, aimac.ai (update 3 Oct 2026) | Public benchmark: 70 models, 28 page categories, **no accessibility guidance in the prompt**, axe-core against WCAG 2.2 AA, all pages published | Opus 5.5 (#49, 854 violations), Fable 5.1 (#51), Sonnet 5.5 (#43), GPT-6 Astra Pro (#12), GPT-6 Sol (#3-#6), Gemini 3.1 Pro (#27), Gemini 3.x Flash (#49-#70) | Top issues across all models: low contrast text 86.9%, empty links 18.3%, missing form labels 15.3%, ARIA roles missing required children 4.1%, target size 4.0%, empty buttons 3.9%. Opus 5.5 page: color-contrast 27x, aria-required-children 11x, link-name 1x. Fable 5.1: color-contrast 23x, links distinguished only by colour 9x, aria-required-children 8x. ◈ (operator not stated on the site; method transparent and reproducible) |
| CHI 2026 extended abstract, "Measuring the Semantic Accessibility Gap in LLM-Generated Web UIs" (dl.acm.org/doi/10.1145/3772363.3799364) | Peer-reviewed, 300 UIs | claude-sonnet-4, gemini-2.5-flash, gpt-4o (one generation older than today's frontier) | Issues that pass automated tools: generic button labels 27%, vague link text 26%, poor alt text 20%, ARIA issues 14%, generic form labels 12% ◆ for those models |
| W4A 2025, "When LLM-Generated Code Perpetuates UI Accessibility Barriers" | Peer-reviewed | ChatGPT, Claude (2024-25) | Without accessibility prompt: no skip link, missing landmarks, incomplete heading structure; missing `lang` was the top automated issue ◆ for those models |
| Fable 5 hallucination figures (searchfit.ai blog, citing AA-Omniscience 36%) | Vendor blog, secondary | Fable 5 | Invented facts in about a third of factual writing prompts ◇, not checked against the primary benchmark |

What this changes:
- **Low-contrast grey text** (lesson 02:544) moves from "general mistake" to **the most common measured frontier-model error** ◈.
- **Redundant or wrong ARIA** (lesson 04:268) is measured on Opus 5.5 and Fable 5.1 ◈.
- **Unnamed buttons/links, generic labels, poor alt** (01:645, 04:268, 04:313-adjacent) are measured, but mainly on older models; on Opus 5.5 / Fable 5.1 automated counts are small ◈/◇.
- **Missing `lang`, skipped heading levels**: shown for 2024-25 models, **not** in the current Claude rows of AIMAC. Likely outdated for the newest models ◇.
- Everything else in the technical lists (px fonts, 100vw, lazy hero, base64, Tailwind CDN, z-index, etc.) still has **no** frontier-model evidence anywhere we looked.

## The N claims: practice vs AI attribution

| Lesson:line | Claim | Practice backed? | AI attribution backed? |
|---|---|---|---|
| 01:159 | Content at `opacity:0` until a script reveals it | ◆ Yes. Chrome excludes opacity-0 paints from LCP (Chromium change Aug 2020, documented by DebugBear, Shopify dev docs). Several 2026 post-mortems show 5-6 s LCP from motion/react `initial={{opacity:0}}` | ◇ Indirect: the pattern comes from animation libraries (Framer Motion/motion) that models reach for; no model-specific study |
| 01:313 | Card grid built with flex + 33.33% widths | ◆ Yes. MDN: "if you are setting widths on flex items to make items in one row … line up … you should instead opt for a two-dimensional grid layout" | ✗ none |
| 01:313 | `position:absolute` for normal layout | ◈ general CSS practice (MDN normal flow) | ✗ none |
| 01:598 | Scroll continues behind a modal; background not inert | ◆ Yes. W3C WAI-ARIA APG Dialog (Modal) pattern: windows under a modal are inert, focus moves in and returns to the trigger | ✗ none |
| 01:598 | `z-index: 9999` everywhere | ◈ craft practice (MDN stacking context); no standard forbids it | ✗ none |
| 02:285 | Two equal filled buttons side by side | ◈ Yes. One primary action per decision point is consensus (NN/g button states, Microsoft Fluent, Baymard via secondary summaries) | ✗ none. The CHI 2026 study does find **vague "Learn more"** links/buttons in model output, which is related but not the same claim |
| 02:363 | Random spacing values (13/22/37) | ◆ Yes as practice: Material Design 3 defines an 8dp spacing scale with tokens | ◇ DesignCode Jun 2026 notes uneven spacing (Opus 4.8); the numbers in the lesson are invented illustrations |
| 02:407 | Centring long paragraphs | ◈ Yes. Consensus that multi-line centred text slows reading (NN/g F-pattern research 2006/2017 is the usual basis; the alignment rule itself is typographic practice, not an NN/g study) | ✗ none |
| 02:475 | Giant heading that overflows on phones | ◆ WCAG 1.4.10 Reflow (320 px width) covers the failure | ✗ none |
| 03:449 | Images inlined as base64 | ◆ Mechanically true: base64 adds about 33% and defeats separate caching (math of the encoding; multiple 2026 engineering write-ups) | ✗ none |
| 03:557 | Animation library for a simple fade | ◆ web.dev: animate `transform`/`opacity`; CSS animations run on the compositor; "it doesn't matter if the animation is handled by JavaScript or CSS". So the cost is bundle weight, not the animation itself | ◇ Opus 5.5 video: model prefers React projects; libraries arrive with them |
| 08:162 | Model fills gaps with invented facts | ◆ Hallucination is documented by every vendor and many benchmarks | ◈ for factual writing in general (PhantomFill, Jul 2026, GPT-5.5: forced fields → fabrication 40/40); ◇ for Fable 5 (secondary blog). **No study of invented business facts on generated websites specifically** |
| 09:141 | Third and fourth font for accents | ◈ typographic practice (one or two families) — Anthropic skill says the same | ◇ Anthropic skill only |
| 09:275 | Heading over the busiest part of a photo, fixed with a shadow | ◆ NN/g "Ensure High Contrast for Text Over Images" + WCAG 1.4.3; peer-reviewed study (PubMed 32425139): a 30% scrim beats blur; drop shadow beats outline | ✗ none. Note: the research says a **shadow does help**, so "adds a shadow instead of choosing a calmer frame" is a taste judgement, not an error |
| 07:266 (human box) | Default passwords on admin panels | ◆ Yes. CISA Secure by Design Alert, Dec 2023: default credentials are "a top weakness that threat actors exploit" | n/a (human box). The "three authors" tag is not supported by our corpus |
| 01:217 (human box) | Margin on every element | ◈ practice (use `gap` / layout-level spacing) | n/a |

## Summary

- All 14 checked N claims describe **real problems backed by good sources** (W3C/WCAG, MDN, web.dev, NN/g, Material, CISA). None is junk.
- **None** of them has evidence that frontier models specifically make the mistake. One (09:275) is partly contradicted: research shows a shadow is a valid fix.
- The independent benchmarks that exist measure **accessibility only**. For performance, layout and CSS habits of current models there is no published measurement; only our own test can answer that.
