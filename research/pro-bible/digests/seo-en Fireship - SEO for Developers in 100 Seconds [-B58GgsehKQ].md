# SEO for Developers in 100 Seconds
- Source: Fireship (YouTube, en) · 2021-02-08 · 12 min (the "100 seconds" is a joke; it runs long) · https://youtu.be/-B58GgsehKQ
- Speaker(s) and why they matter: Jeff Delaney of Fireship, a developer educator. Opinionated developer-oriented summary of SEO and rendering strategies. Promotes his own paid Next.js/Firebase course and "pro" membership (2:03, 11:10).
- Relevance to course: 3 (lesson 8: semantic HTML, titles, meta, share previews, rendering trade-offs) · Freshness matters? yes (2021; framework features such as incremental static regeneration)
- Codes: SEO, PERF, A11Y, HOST
- Notes: sells a course; states ranking claims as fact without sources ("over 200 factors", bounce and dwell time). I have not verified those claims against Google's own pages and treat them as ◇.

## Core thesis
Four SEO rules: create really good content, render HTML that bots can understand, load it fast; choose a rendering approach (client, static, server, incremental) by the freshness-performance-interactivity trade-off.

## Claims and advice
- [SEO] "The first rule of SEO is create really good content"; content that people do not engage with will not rank; stuffing keywords no longer works. (0:00-1:01) — type: opinion
- [SEO] Google uses "over 200 factors"; bounce and dwell time are described as ranking signals ("the higher your bounce rate ... the less likely your site is to rank"). (0:00-3:03) — type: opinion/unverified (Google's public statements on engagement signals differ; not checked here)
- [SEO][A11Y] Put main content in `<main>`/`<article>`, use headings, `alt` text and ARIA; the head holds metadata that bots read. (1:01, 4:04-6:06) — type: practice
- [SEO] The `<title>` controls click-through rate on results pages; meta tags (description, image, author, canonical URL) also drive social previews. (6:06-7:06) — type: practice (title/description roles confirmed in Google docs; see `answers/09`)
- [SEO] schema.org markup (e.g. Article with an author and links to author pages) is optional; "whether or not it will improve your search engine ranking is debatable" but can help rich results (recipes, reviews). (4:04-5:05) — type: opinion; note: Google has since restricted FAQ rich results (verified in `PRIMARY_SOURCES.md`)
- [SEO] Outbound links to authoritative sites "signal what the page is about"; known authors improve ranking. (4:04-5:05) — type: opinion/unverified
- [SEO][PERF] Client-side rendered single-page apps give bots a shell; Google can index them, "but the reliability is questionable"; links shared on social show only the shell's meta tags. (7:06-8:07) — type: opinion (partly dated: Google's rendering has improved; social crawlers still do not run JavaScript)
- [SEO][HOST] Pre-rendered static HTML is fast and cheap on a CDN but can go stale; server-side rendering is fresh but costs more; incremental static regeneration (Next.js) combines both but needs a more complex host. (8:07-11:10) — type: practice (framework-specific)
- [SEO] Check shared links in the "Twitter card validator". (6:06) — type: practice (the tool has since changed; **not verified** whether it still exists)

## Techniques and steps
1. Write content for the audience.
2. Use semantic tags, a good title and description.
3. Make sure bots receive finished HTML (static or server-rendered).
4. Test a shared link in the platform's preview tool.

## Tools and resources
- Chrome DevTools elements panel, schema.org, a social-card validator, Next.js.

## Quotes
- "the third rule of SEO is to render HTML that can be reliably understood by bots" (1:01)
- "I wouldn't trust client rendering if SEO was a business critical requirement" (8:07, near-verbatim)

## Disagreements and contrarian points
- Compared with Google's Chrome SEO talk ("a good page experience doesn't override having great relevant content"): Fireship's "rule four" (load fast) is correct but second to content.
- Dwell time/bounce rate as signals: stated as fact here; treat as ◇.

## For the course
Lesson 8: use semantic HTML and the title/meta/OG roles, and the point that shared links need server-side meta tags. Do not use the bounce/dwell/200-factors claims or the validator name.

## Other
None.
