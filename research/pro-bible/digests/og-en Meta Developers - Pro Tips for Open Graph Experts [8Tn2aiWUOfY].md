# Pro Tips for Open Graph Experts
- Source: Meta Developers (official, then "Facebook Developers"; YouTube, en) · 2013-03-01 · 12 min (a clip of a longer talk) · https://youtu.be/8Tn2aiWUOfY
- Speaker(s) and why they matter: a Facebook platform engineer (name not in the caption). **Vendor primary source but very old**: it covers the 2013 Open Graph Actions API (login, publish_actions, timelines), which is largely discontinued.
- Relevance to course: 1 (lesson 6; only two durable ideas) · Freshness matters? strongly: most of the content is obsolete
- Codes: SEO
- Notes: skip 0:07-5:13 (authentication, permissions, actions). Do not reuse permission names.

## Core thesis
For Open Graph objects to work, each URL must return real HTML with Open Graph markup to Facebook's crawler; Facebook caches the scraped data and can be told to re-scrape.

## Claims and advice
- [SEO] Open Graph objects require "real URLs": an HTTP GET on the URL must return HTML containing Open Graph markup; hash-fragment (`#!`) URLs do not work. (5:13-6:14) — type: evidence (2013)
- [SEO] Facebook's crawler does not respect JavaScript redirects; for single-page apps return OG HTML to the crawler's user agent (`facebookexternalhit`) and redirect browsers. (6:14-7:14) — type: evidence (2013; likely still true that the crawler needs server-rendered tags, verify before reuse)
- [SEO] Facebook caches scraped metadata for about 7 days; to update, re-scrape by posting to the Graph API with `scrape=true`; no domain-wide refresh. (7:14-8:16) — type: evidence (2013, current details not verified)

## Techniques and steps
1. Serve OG tags in the HTML response, not via client-side JavaScript.
2. Force re-scrape after changing an image or title.

## Tools and resources
- Facebook scraper user agent; Graph API scrape call (7:14-8:16)

## Quotes
- None.

## Disagreements and contrarian points
- None.

## For the course
Lesson 6: only the server-rendered-tags point and the cache note, after checking Meta's current docs (not fetched yet; see PRIMARY_SOURCES.md).

## Other
Includes large sections about publishing "actions" (listen, read, cook) to users' timelines; ignore.
