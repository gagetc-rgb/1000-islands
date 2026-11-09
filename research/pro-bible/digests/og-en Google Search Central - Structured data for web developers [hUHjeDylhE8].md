# Structured data for web developers
- Source: Google Search Central (official YouTube channel, en) · 2022-08-23 · 9 min · https://youtu.be/hUHjeDylhE8
- Speaker(s) and why they matter: Ryan Levering, a Google software engineer working on how search features consume web data. **Vendor primary source** for what Google does with structured data; not neutral on whether other engines care.
- Relevance to course: 5 (lesson 6, structured data) · Freshness matters? medium: Google keeps changing which rich results it shows
- Codes: SEO
- Notes: a podcast plug at 3:03 (skip). Companion to the longer "Structured data: What's it all about?" talk.

## Core thesis
Structured data tells Google exactly what a page is about so it can show richer results; use schema.org with JSON-LD, test it, and make sure it is relevant, accurate and matches the visible page.

## Claims and advice
- [SEO] Google can interpret page text itself, but structured data lets it interpret contents more accurately and show visual treatments (review stars, cook-time filters). (0:00-1:02) — type: evidence (vendor)
- [SEO] First make sure Google can crawl your content; if it cannot crawl, it cannot find the structured data. (1:02-2:02) — type: practice
- [SEO] Google primarily uses schema.org; it is interested in a subset related to its search features; "we never penalize you for having more accurate structured data" but the best use of time is the types Google actively uses (see its search gallery). (1:02-2:02) — type: evidence
- [SEO] With a CMS (WordPress, Squarespace) use a plugin that outputs structured data; with direct HTML control the recommended syntax is JSON-LD, "because it's the simplest". (3:03-4:05) — type: practice
- [SEO] Test a few pages manually with the Rich Results Test; later Search Console reports validity and sends notifications; issues affect only the use of that structured data in Google features, not the rest of your page's indexing. (4:05-5:05) — type: practice/evidence
- [SEO] Best practices: keep it relevant (markup unrelated to page content "is considered abuse and can result in penalties"); describe the page's core meaning (mark the main product, not every related one); use unique identifiers (street address not just city; ISBN); avoid conflicting or redundant blocks from several plugins. (6:05-7:05) — type: practice

## Techniques and steps
1. Pick types from the search gallery that fit the content.
2. Add JSON-LD, test, then roll out through templates.
3. Monitor Search Console reports; remove duplicate plugin output.

## Tools and resources
- Rich Results Test, Search Console reports, Google search gallery (4:05-5:05)

## Quotes
- "usually our recommended approach is to use json ld because it's the simplest" (4:05)

## Disagreements and contrarian points
- Jaume Ros and Le Référenceur Local agree on JSON-LD; the Google podcast notes JSON-LD can desync if loaded separately (see the companion digest).

## For the course
Lesson 6: the three rules to give the AI: JSON-LD, only what is visible and true on the page, one source of markup (no duplicate plugin and template output). Primary documents to verify before reciting (see PRIMARY_SOURCES.md, "Search and sharing").

## Other
None.
