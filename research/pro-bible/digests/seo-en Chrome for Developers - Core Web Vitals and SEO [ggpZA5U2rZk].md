# Core Web Vitals and SEO
- Source: Chrome for Developers (YouTube, en; Google session) · 2020-12-14 · 11 min · https://youtu.be/ggpZA5U2rZk
- Speaker(s) and why they matter: a Google search/web speaker explaining how Core Web Vitals feed into Google Search ranking ("page experience") and how Search Console reports them. First-party for Google Search, December 2020, before the ranking change was rolled out.
- Relevance to course: 3 (lessons 3 and 8: what search does and does not reward) · Freshness matters? yes (the page experience signal and AMP/top-stories details were later changed)
- Codes: SEO, PERF
- Notes: Google's own claims. The statement that users are "24% less likely to abandon page loads" is Google's internal finding, with no method given. The ranking change date ("first half of 2021") is historical.

## Core thesis
Page experience (Core Web Vitals plus mobile-friendliness, HTTPS, Safe Browsing and no intrusive interstitials) is one input to ranking; relevant content comes first, and Search Console's field-data report shows how real users experience your pages.

## Claims and advice
- [SEO] SEO is improving the quality and quantity of traffic from normal results; make relevant content, make it accessible to search engines, and show why the site is good using signals. "SEO is a bit like usability: a little information helps, but when it gets serious you want help from experts." (0:00-2:03) — type: opinion (Google speaker)
- [SEO][PERF] For ranking Google uses field data (Chrome User Experience Report, about a month of real users), not lab tests. (2:03-3:04) — type: evidence (first party)
- [SEO] The "page experience" ranking factor combines the Core Web Vitals with mobile-friendliness, Safe Browsing, HTTPS and intrusive-interstitial rules; mobile and desktop are assessed separately. (3:04-4:04) — type: evidence at the time (since changed)
- [SEO] Search Console's Core Web Vitals report groups URLs by shared templates; changes take about a month to show; use "Validate Fix" after fixing. (5:05-7:09) — type: practice
- [SEO] "A good page experience doesn't override having great relevant content"; page experience matters most when several pages have similar content. (8:09) — type: evidence (first-party statement)
- [SEO][UX] Google's finding that good page experience means users are 24% less likely to abandon page loads (22% for new sites, 24% for shopping sites). (8:09-9:10) — type: evidence (Google internal; method not given)
- [SEO] Embeds from Google products count like any other embedded resource. (7:09) — type: evidence (first-party)

## Techniques and steps
1. Verify ownership in Search Console.
2. Read the Core Web Vitals report (mobile, desktop).
3. Fix a big issue group, then press Validate Fix.

## Tools and resources
- Search Console (Core Web Vitals report), CrUX, PageSpeed Insights.

## Quotes
- "A good page experience doesn't override having great relevant content." (8:09)
- "we use field data as this is what your site's users have experienced over time" (3:04)

## Disagreements and contrarian points
- Contrasts with SEO-vendor claims that speed alone ranks pages: Google says content relevance comes first.

## For the course
Lessons 3 and 8: use the statement that content relevance outranks page experience, and the field-vs-lab point. The ranking-change dates and AMP remarks are historical.

## Other
No mention of titles, snippets or structured data; those are in the Fireship video and in `answers/09-search-sharing.md`.
