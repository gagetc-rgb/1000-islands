# The ultimate guide to web performance
- Source: Beyond Fireship (YouTube, en) · 2023-05-08 · 7 min · https://youtu.be/0fONene3OIA
- Speaker(s) and why they matter: a developer-education channel (sister channel of Fireship) giving a fast overview of Core Web Vitals and two tools. Developer-oriented, not for owners. Ends by promoting the paid "pro" membership at fireship.io (6:04).
- Relevance to course: 4 (lesson 3 speed: the three metrics and what usually causes them) · Freshness matters? yes: First Input Delay was replaced by INP in 2024 (see `PRIMARY_SOURCES.md`, Core Web Vitals)
- Codes: PERF, IMG, CSS, SEO
- Notes: no sponsor beyond his own membership. Thresholds are spoken and match the web.dev values for LCP (verified earlier). Tools named: the Web Vitals Chrome extension and "unlite house" (the caption's spelling of Unlighthouse).

## Core thesis
Slow pages lose visitors; learn the three Core Web Vitals (LCP, FID, CLS), measure them with DevTools and the Web Vitals extension, and fix the usual causes: heavy images, render-blocking JavaScript and images without dimensions.

## Claims and advice
- [PERF] LCP is the loading metric; Google says "within 2.5 seconds" is good, "beyond 4 seconds is bad" and may affect SEO. (0:00-1:00) — type: evidence (thresholds verified against web.dev; "affect SEO" is general)
- [PERF][IMG] To improve LCP: compress images and use modern formats like WebP, use the "bare minimum number of fonts", serve assets from a CDN (Firebase, Vercel do this automatically). (1:00-2:01) — type: practice
- [PERF] Avoid JavaScript that must run before the main image shows; server-rendered frameworks are favoured over single-page apps for this reason. (2:01) — type: opinion (framework preference)
- [PERF][IMG] Use `preload` links and `fetchpriority` high/low on images so important images load first. (2:01) — type: practice (web.dev confirms `fetchpriority="high"` for the LCP image)
- [PERF] FID: 100 ms or less is good, 300 ms bad; reduce JavaScript execution, use web workers or Partytown, lazy-load code. (2:01-3:02) — type: evidence at the time; **outdated metric** (INP since 2024)
- [PERF][IMG] CLS: images "should always have a width and height or alternatively use the CSS aspect ratio property"; responsive images that change ratio need `srcset`; ads and over-ambitious animations also cause shift. (3:02-4:02) — type: practice (matches web.dev)
- [PERF] Measure with the Web Vitals extension (console logging shows which element is the LCP and which elements shifted) and run Unlighthouse to audit every page of a site in parallel. (4:02-5:03) — type: practice
- [PERF] Observed results: Amazon did well but had layout-shift issues; Google, Reddit and others scored about 90; astro.build almost 100. (5:03-6:04) — type: evidence (one-off lab runs, not general)

## Techniques and steps
1. Open DevTools Network waterfall; find the wide bars.
2. Compress images, trim fonts, use a CDN.
3. Give images dimensions.
4. Verify with the Web Vitals extension or Lighthouse.

## Tools and resources
- Web Vitals Chrome extension, Unlighthouse (open source, crawls the whole site), Lighthouse.

## Quotes
- "when using images they should always have a width and height or alternatively use the CSS aspect ratio property" (3:02)
- "you should only use the bare minimum number of fonts that you need to render the page" (1:00)

## Disagreements and contrarian points
- Prefers server-rendered frameworks over client-side SPAs for LCP; this is a framework opinion, not a standard.

## For the course
Lesson 3: use for the three metrics in plain words, the "largest element" idea, and the dimension rule (agrees with Chrome and Syntax; see `answers/15-imagery.md` rule 2). Do not use FID.

## Other
Date 2023: the Web Vitals extension "new" at the time.
