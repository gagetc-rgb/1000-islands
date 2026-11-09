# The Open Graph Protocol - Why And How You Should Use it On Your Website
- Source: ProgrammingPercy (YouTube, en) · 2022-12-09 · 9 min · https://youtu.be/RW5HCOMbvuQ
- Speaker(s) and why they matter: Percy, a hobbyist front-end developer ("I'm not a front-end developer first", 9:16); a beginner's discovery tutorial. Not an authority, but the steps are standard.
- Relevance to course: 3 (lesson 6, social preview tags) · Freshness matters? tool-dependent (debugger UIs)
- Codes: SEO
- Notes: no sponsor. Twitter is "X" now; the Twitter card validator he shows no longer renders cards (7:11).

## Core thesis
Social platforms build link previews from Open Graph meta tags in your page head; four tags (title, description, image, URL) make a share look good; Twitter needs its own card tag for a large image; debug with each platform's tool.

## Claims and advice
- [SEO] Open Graph is a standard way of describing a page for other sites, "a business card" per page; implemented as `<meta property="og:...">` tags in the head. (0:00-2:02) — type: evidence
- [SEO] Four tags to start: `og:title` (short, descriptive), `og:description` (a few sentences), `og:image`, `og:url`. (3:04-4:05) — type: practice
- [SEO] Extra properties exist (type, author, published time); full list on the Open Graph protocol site. (4:05) — type: evidence
- [SEO] Platform-specific tags exist: for Twitter, `twitter:card` with `summary_large_image` makes the image fill the post; most platforms fall back to OG tags. (5:08-6:10) — type: practice
- [SEO] If duplicates exist, the latest one wins. (2:02-3:04) — type: opinion/unverified
- [SEO] Debug with the Twitter card tool and Facebook's Sharing Debugger; it shows the tags found, the image and how the post will look. (7:11-8:13) — type: practice

## Techniques and steps
1. Add the four og tags and a `twitter:card` tag to each page.
2. Open the Facebook Sharing Debugger with the URL and check.

## Tools and resources
- Facebook Sharing Debugger; Twitter card validator (obsolete rendering); ogp.me (4:05-8:13)

## Quotes
- None.

## Disagreements and contrarian points
- Meta Developers (2013) says the crawler needs real HTML at the URL; see its digest.

## For the course
Lesson 6: the minimal tags list. The statement "latest duplicate wins" is not verified; tell the AI "one set of tags per page".

## Other
None.
