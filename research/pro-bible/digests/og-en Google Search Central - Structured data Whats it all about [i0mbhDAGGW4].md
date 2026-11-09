# Structured data: What's it all about? (Search Off the Record podcast)
- Source: Google Search Central (official YouTube channel, en) · 2022-04-07 · 30 min · https://youtu.be/i0mbhDAGGW4
- Speaker(s) and why they matter: Lizzi Sassman and Martin Splitt (Google Search Relations) interview Ryan Levering, a Google engineer on structured data. **Vendor primary source**, informal podcast format with banter; useful for nuance not in documentation.
- Relevance to course: 3 (lesson 6; nuance on what structured data does and does not do) · Freshness matters? medium
- Codes: SEO
- Notes: long chatty openings (0:01-4:05); no sponsor.

## Core thesis
Structured data is machine-readable markup that tells search engines what a page means; Google uses it for rich results and as an extra signal, but features change and schema.org itself is only a vocabulary. Keep the markup in sync with what the page shows.

## Claims and advice
- [SEO] The term "structured data" overlaps with "markup"/"schema markup"; here it means standardised, machine-readable data on the page, not shown to people (JSON-LD). (4:05-5:06) — type: evidence (definition)
- [SEO] Google prefers being given the data over inferring it with machine learning: "much easier to just ask people to give us their data", more accurate and less work. (5:06-8:07) — type: opinion (vendor)
- [SEO] The main challenges are verification (abuse) and sync: structured data can drift from the visible content. (9:08-10:08) — type: evidence
- [SEO] Where to start: generic features that apply to most sites (breadcrumbs, sitelinks search box), then types that fit your vertical (events, products, review snippets). (10:08-11:09) — type: practice
- [SEO] schema.org is a shared vocabulary, not an API; it does not say what is required; Google's docs add the restrictions for each feature. "It does not mean it is incorrect" if Google can't use a property. (12:10-13:12) — type: evidence
- [SEO] Structured data can help beyond rich results as one signal for what a page is about, mostly at the edges; "I never advise people to not put structured data on their web page if it makes semantic sense". (14:12-16:13) — type: opinion
- [SEO] More data that is correct and reflects the page is never worse. (17:14) — type: opinion (vendor)
- [SEO] Rule from the guidelines: structured data must match the visible content; use data from your database or CMS fields rather than manual copies to avoid drift. (19:16-22:19) — type: practice
- [SEO] JSON-LD is preferred because it is harder to mess up than microdata/RDFa; but it is a separate resource so it can desync if scripts load late; a missing block shows in testing tools. (22:19-25:22) — type: practice
- [SEO] The medium-term plan: ingest structured data more through channels with CMS plugins; support more features. (26:22-28:24) — type: opinion

## Techniques and steps
1. Prefer templates that read the same database fields as the page.
2. Test with the Rich Results Test and watch Search Console.

## Tools and resources
- Rich Results Test, Search Console, Google search gallery (10:08-25:22)

## Quotes
- "it's much easier to just ask people to give us their data" (6:06, near-verbatim)

## Disagreements and contrarian points
- Says JSON-LD is preferred but concedes microdata/RDFa stays in sync better; most other authors do not mention this.

## For the course
Lesson 6: a source for "do not fake markup, keep it in sync" and the plain explanation that schema.org is a vocabulary while Google decides which parts it shows.

## Other
Ryan's favourite type is events (2:03); irrelevant.
