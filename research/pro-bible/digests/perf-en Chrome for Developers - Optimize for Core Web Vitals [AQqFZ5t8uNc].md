# Optimize for Core Web Vitals
- Source: Chrome for Developers (YouTube, en; Addy Osmani of the Chrome team) · 2020-07-08 · 38 min · https://youtu.be/AQqFZ5t8uNc
- Speaker(s) and why they matter: Addy Osmani, Google Chrome engineering lead, walking through one real brand's optimisation (a French luxury fashion house, "Chloé") step by step with Lighthouse and DevTools. Primary-source quality for method, but a Google tooling showcase, and a 2020 case study from a large e-commerce site.
- Relevance to course: 4 (lesson 3 speed: how each metric is diagnosed and fixed, hero images) · Freshness matters? yes (FID is now INP; HTTP/2 server push, discussed 30:45-33:48, has been dropped from browsers since: I believe Chrome removed it in 2022, **not verified here**)
- Codes: PERF, IMG, CSS, HOST
- Notes: vendor bias: promotes Google tools (Lighthouse, CrUX dashboard, web-vitals extension) and Akamai's automatic server push used by the brand. Results are one site's lab numbers, not general. The date also means "FID" is used throughout.

## Core thesis
Core Web Vitals problems usually come from a few common, fixable things: layout shifts from images and injected content without reserved space, a slow LCP from heavy or late-discovered hero images and render-blocking resources, and long JavaScript tasks. The case study shows each fix and its measured effect.

## Claims and advice
- [PERF] CLS causes: images without dimensions, embeds/iframes without dimensions, dynamically injected content, web fonts causing a flash of unstyled content. (1:02-2:04) — type: evidence (matches web.dev)
- [PERF][IMG] "Always include width and height size attributes on your images and video elements" (or reserve space with CSS aspect-ratio boxes); modern browsers compute a default aspect ratio from the attributes before the image loads; with responsive images give all candidates the same aspect ratio. (3:05-6:09) — type: practice/evidence (matches web.dev, verified in `PRIMARY_SOURCES.md`)
- [PERF] Reserve space for ads, promo banners and embeds (fixed container, `overflow:hidden`, sized to the median or 95th-percentile content); never insert new content above existing content except after a user action. (9:12-12:17) — type: practice. Example: CLS 0.24 to about 0; a promo banner on a listing page took CLS from 0.4 to near zero after moving its API call server-side and reserving height. (12:17-14:23)
- [PERF][IMG] Skeleton/placeholder loading (a block of the image's dominant colour or a tiny blurred image) "don't strictly improve LCP but they do improve perceived performance". (8:12-9:12) — type: practice
- [PERF] Causes of poor LCP: slow server, render-blocking JS/CSS, slow resources (unoptimised images), client-side rendering that fetches hero images behind JavaScript. LCP candidates are images, images inside SVG, video, block-level text. (17:25-19:29) — type: evidence
- [PERF][IMG] "For many sites images are the largest element in view... especially as UX patterns have shifted towards ... more hero images in our pages so it's very very important to optimize our images". Options: remove the image if not relevant, compress, convert to modern formats, use responsive images, consider an image CDN. (19:29-20:30) — type: practice
- [PERF][IMG] Case numbers: serving at most about two times the viewport width (cut sources over 828 px wide) cut a phone's image bytes from about 245 KB to 125 KB ("a 51 percent decrease... with no noticeable difference"); a stray off-screen image of 248 KB defeated their lazy-loading heuristics; above-the-fold image download size brought down to about 14.5 KB; page weight down 57%; home-page LCP from about 11 s to about 4 s. (22:31-25:34) — type: evidence (one site's lab results)
- [PERF] Inline critical CSS and defer the rest: FCP 2.1 s to 1.1 s, LCP 2.9 s to 1.5 s. (25:34-29:44) — type: practice (build-tool dependent)
- [PERF][HOST] Reduce server response time; Lighthouse "reduce initial server response time"; preload and HTTP/2 server push (LCP from about 4 s to 2.5 s in lab) with a warning that push "is not HTTP cache aware". (29:44-33:48) — type: practice at the time, **dated** (server push)
- [PERF] FID causes: long main-thread tasks, large JS bundles, render-blocking scripts; fix by breaking up work, possibly a web worker. (33:48-34:48) — type: practice (FID replaced by INP)
- [PERF] How to find the LCP element in DevTools (Performance panel, Timings, LCP record, Related node) and Lighthouse's "largest contentful paint element" audit; CrUX dashboard and API for field data. (21:30-22:31, 36:50) — type: practice

## Techniques and steps
1. Add width/height to all images and reserve space for injected content.
2. Find the LCP element in DevTools; optimise it first.
3. Serve images at most about 2x the displayed size, compressed, modern format, optionally via an image CDN.
4. Inline critical CSS; defer the rest.
5. Verify in Lighthouse (lab) and CrUX (field).

## Tools and resources
- Lighthouse, DevTools Performance panel, web-vitals Chrome extension, CrUX dashboard/API, WebPageTest.

## Quotes
- "always include width and height size attributes on your images and video elements" (3:05)
- "for many sites images are the largest element in view when the page is finished loading" (19:29)
- "server push is not HTTP cache aware" (31:47, near-verbatim)

## Disagreements and contrarian points
- The claim that a 51% byte reduction came "with no noticeable difference" is a visual judgement on one phone model; compare Gray's and Silva's different size targets (see `answers/15-imagery.md` section C).

## For the course
Lesson 3: the best single walkthrough of fixes in the performance set; use the CLS causes, the hero-image paragraph, the "two times viewport" idea, and the field-vs-lab pair (CrUX versus Lighthouse). Skip server push and FID.

## Other
Long (37 min); the only talk in the set that gives before/after metrics.
