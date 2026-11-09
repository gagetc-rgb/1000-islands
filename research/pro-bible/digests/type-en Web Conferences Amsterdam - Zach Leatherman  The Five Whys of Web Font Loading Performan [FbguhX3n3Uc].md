# Zach Leatherman | The Five Whys of Web Font Loading Performance | performance.now() 2018
- Source: Web Conferences Amsterdam (performance.now()), YouTube, en · 2018-11-12 · 46 min · https://youtu.be/FbguhX3n3Uc
- Speaker(s) and why they matter: Zach Leatherman, a front-end developer known for web-font loading research (his blog has dozens of posts, he maintains recipes). Measurement-driven with WebPageTest on 3G; one site (a default WordPress theme) as the case study.
- Relevance to course: 5 (lesson 9, font loading performance; lesson 3 tie-in) · Freshness matters? medium: browser support has moved on (2018)
- Codes: TYPE, PERF
- Notes: no sponsor; humour throughout; the tested site and numbers are one case.

## Core thesis
Web fonts cause two problems: invisible text and text in motion (reflow). Fix them by self-hosting (if your host is fast), `font-display`, preloading only one or two critical files, grouping reflows with the CSS Font Loading API, and keeping file counts and sizes low.

## Claims and advice
- [PERF][TYPE] Test site: 595 KB, 35 requests, 5 web font files totalling about 100 KB; first render 3.3 s on 3G with invisible text until 5.7 s. (1:07-4:14) — type: evidence (case)
- [TYPE][PERF] Enemies: invisible text and text in motion; example: a news headline "Mitt Romney is running for president" where the italic (the word "not") had not loaded. (4:14-7:17) — type: evidence (anecdote)
- [PERF] Measure when all text is readable and how many reflows happen, not just first paint. (7:17-9:20) — type: practice
- [PERF][TYPE] System fonts give instant text (first render 200 ms faster, about 10% faster completion on the test), but web fonts are increasing and designers ask for them. (10:20-12:29) — type: evidence
- [PERF] Google Fonts is a good CDN; `preconnect` helps; self-hosting alone was not faster in his test (priority issues), moving to a separate subdomain helped but is an anti-pattern on HTTP/2. (13:21-19:27) — type: evidence
- [PERF][TYPE] `font-display: swap` shows fallback immediately; `optional` shows the web font only if cached; do not use `optional` with icon fonts or Ajax-navigation sites; avoid icon fonts altogether (use SVG). (19:27-22:32) — type: practice
- [PERF] `preload` the WOFF2 files with `crossorigin`; preloading all five cost 500 ms of first render; preload one or two (by user-disruption or by "one per family"). (22:32-28:38) — type: evidence (case)
- [TYPE][PERF] Safari's font synthesis (fake bold/italic while the real one loads) makes the later reflow less disruptive. (28:38-31:43) — type: evidence
- [PERF] The CSS Font Loading API can load several fonts and add them to the document together, producing a single reflow; can also skip fonts on slow connections, save-data, or reduced motion. (31:43-35:50) — type: practice
- [PERF][TYPE] Variable fonts reduce file count but can be larger: his example 115 KB for one family; on v-fonts.com the median is 54 KB, mean 69 KB, max 250 KB. (35:50-39:55) — type: evidence
- [PERF] Data-URI/local-storage font strategies are an anti-pattern; do not hide web fonts on mobile via media queries (assumes better desktop networks). (44:03-46:04) — type: opinion

## Techniques and steps
1. WOFF2 files; subset to needed characters.
2. `@font-face` with `font-display: swap` (or `optional` for non-critical).
3. Preload only the one or two files that matter most.
4. Test on a throttled connection.

## Tools and resources
- WebPageTest, Lighthouse, Axis-Praxis and v-fonts.com for variable fonts (36:52-38:53)

## Quotes
- "We don't want invisible text, and we don't want unstyled text." (7:17)

## Disagreements and contrarian points
- Disagrees with Pamental 2016 on the mechanics (JavaScript class loaders) because `font-display` now does it in CSS.

## For the course
Lesson 9 and 3: the minimum recipe to demand from the AI: WOFF2, `font-display: swap`, preload at most one or two, few weights, no icon fonts. Verified in PRIMARY_SOURCES.md.

## Other
Mentions HTTP/2 prioritisation bugs in 2018 (Patrick Meenan); dated.
