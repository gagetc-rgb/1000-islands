# Cross-check 4: performance and SEO (NotebookLM, 11 Oct 2026)

Sources: Chrome for Developers (3 videos), Beyond Fireship, Syntax, Fireship (SEO in 100 s), midulive (es). Attribution by the notebook's model (unverified). Three of the Chrome videos are 2020-2021, so FID appears in them; FID was replaced by INP as a Core Web Vital in March 2024 (general knowledge, verify on web.dev). Use INP.

## Agreed by 3+ authors
1. Track and fix the Core Web Vitals: LCP < 2.5 s, CLS < 0.1, INP < 200 ms (Chrome, Beyond Fireship, Syntax).
2. Give every image explicit width and height, or CSS aspect-ratio, to stop layout shift (Chrome, Beyond Fireship, Syntax, midulive).
3. Serve compressed modern formats (WebP, AVIF) (Chrome, Beyond Fireship, Syntax).
4. Pre-rendered HTML (SSR or static generation) for faster first load and reliable indexing (Chrome, Beyond Fireship, Syntax, Fireship).
5. Core Web Vitals / page experience are search ranking signals (Chrome, Beyond Fireship, Fireship). Osmani's README adds: passing does not promise a ranking change.
6. Lazy-load below-the-fold images and assets (Chrome, Beyond Fireship, midulive).
7. Defer or cut non-essential JavaScript so the main thread stays free (Chrome, Beyond Fireship, Fireship).
8. Preload critical fonts and use font-display: swap (Chrome, Beyond Fireship, Syntax).
9. Semantic HTML and meta description so crawlers understand the page (Chrome, Fireship, midulive).

## Single-author
- Field data (CrUX) and Search Console "Validate Fix" (Chrome). Web Workers for heavy JS (Beyond Fireship). Framework image components (Syntax). PageRank history (Fireship). Open Graph tags for social cards (midulive; we still keep this in our checklist from general practice).

## Disagreement
- Single-page apps and SEO: Fireship says client-side rendering is unreliable for indexing and wants SSR; Chrome says Googlebot executes JavaScript. Practical reading: for a brochure/travel site, ship real HTML (static or pre-rendered), no dependence on client rendering.
- Lab vs field: Chrome stresses real-user data (CrUX) over Lighthouse lab scores; Syntax and Beyond Fireship lean on Lighthouse. Matches Osmani's skill: field data = impact, lab = diagnosis.

## Our reading
- For our static HTML builds, items 2, 3, 6, 8 are directly checkable. Add "hero image preloaded, not lazy-loaded" (Vercel guidelines: fetchpriority high for above-fold images).
