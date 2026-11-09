# Cross-check 09: search and sharing, Open Graph, social preview, structured data (digest-based, quotes from transcripts, Google/ogp.me/Meta pages fetched 11 Oct 2026)

Lesson feed: lesson 6 (search and sharing). Sections A-E cover structured data and sharing (seven `og-*` videos); **section F** adds the basics of search (content first, titles, headings, canonical, rendering, page experience) from the three `seo-en` videos plus three videos from other topics; Search Console reporting is in `answers/11-analytics.md`.

Sources (7 videos; en x5, ru machine-translated, fr): **GS1** = og-en Google Search Central "Structured data for web developers" [hUHjeDylhE8] (2022); **GS2** = og-en Google "Structured data: what's it all about" podcast [i0mbhDAGGW4] (2022); **JR** = og-en Jaume Ros [jep0DWoPkDc] (2022); **PP** = og-en ProgrammingPercy, Open Graph [RW5HCOMbvuQ] (2022); **MD** = og-en Meta Developers [8Tn2aiWUOfY] (2013, mostly obsolete); **AV** = og-en AVIS TV (Russian, machine-translated) [BkP-a3J-yTg] (2021); **LR** = og-fr Le Référenceur Local [CZsY3zOWlk0] (2025). Files in `transcripts/`, digests in `digests/`.

Tags: ◆ primary page verified (PRIMARY_SOURCES.md "Search and sharing"), ◈ several authors, ◇ one author or disputed.
Independence: GS1 and GS2 are both Google and count as **one** voice; they are also the vendor, so they are authoritative about what Google does and silent about other engines. AV's English is machine-translated (garbled); its claims are summarised, not quoted.

## A. Rules agreed by at least three voices

1. ◆◈ **Use JSON-LD for structured data (or a plugin that writes it).** (GS1, GS2, JR, LR; AV uses microdata)
   - GS1 [4:05]: "usually our recommended approach is to use json ld because it's the simplest"
   - GS2 [22:19]: "jason ld is sort of preferred these days is that it's it's um harder to mess up"
   - JR [7:07]: "JSON-LD is actually the recommended markup, the recommended way that we want to present structured data on our website"
   - LR [8:12-9:12]: generate JSON-LD or use an SEO plugin; "c'est vraiment celle que je te commande si tu es un site WordPress" (caption garble of "recommande")
   - Primary ◆ Google: "In general, Google recommends using JSON-LD for structured data if your site's setup allows it, as it's the easiest solution for website owners to implement and maintain at scale (in other words, less prone to user errors)."
   - Independence: two Google voices, so ◈ at three independent authors only if JR and LR count; fine.

2. ◆◈ **Test the markup and watch reports.** (GS1, GS2, LR, AV)
   - GS1 [4:05]: "test them with the rich results test in search console to see whether we are interpreting the structured data correctly"
   - LR [9:12]: "l'outil de test justement de Google des résultats enrichis" and "l'outil de validation du site schema.org"
   - GS2 [25:22]: testing tools show a missing block, though race conditions are hard to catch
   - AV [10:14-12:18]: validate the generated markup; the generator's output initially failed (machine-translated)

3. ◆◈ **Markup must describe what is visible and true on the page; avoid duplicates.** (GS1, GS2 as one voice; JR indirectly)
   - GS1 [6:05]: "using structured data that has nothing to do with the contents of the page is considered abuse and can result in penalties"
   - GS1 [7:05]: "multiple cms plugins or separately author json ld blocks generating the same data with slightly different information"
   - GS2 [21:18]: "what you have in the structured data must match the content on the page to not be spammy"
   - Primary ◆ Google policy: "Don't mark up content that is not visible to readers of the page." and "Provide up-to-date information."
   - Weak independence (one vendor); still ◆ by primary text.

4. ◈ **On a CMS, use a plugin that outputs structured data rather than hand-writing it.** (GS1, JR, LR)
   - GS1 [3:03]: "your best bet is to find a plugin that exposes structured data automatically for the content you already have"
   - JR [8:07]: "if you're using something like a WordPress, there's actually quite a few things we can do to add structured data"
   - LR [9:12]: "des extensions SEO qui vont ajouter cette fonction données structurées je pense par exemple à rankm" (caption cut-off, Rank Math)

5. ◈ **Open Graph tags drive link previews; set title, image and URL at least.** (PP, LR, MD indirectly)
   - PP [3:04-4:05]: og:title, og:description, og:image and url "are the most important to have so you can have this really nice preview whenever somebody shares your link" (PP calls these "the first four")
   - LR [3:03]: "le balisage Open Graph ... va donner des informations pour être utilisé sur les réseaux sociaux notamment le titre de la page le nom du site ou encore la petite miniature"
   - MD [5:13]: "the URL that represents an object you need to be able to ... do an HTTP get on that URL and have HTML return that contains open graph markup"
   - Primary ◆ ogp.me: "The four required properties for every page are: og:title ... og:type ... og:image ... og:url". **The description is optional, so PP's "four" differs from the spec** (see disagreements).
   - Primary ◆ Meta image guidance: "The minimum allowed image dimension is 200 x 200 pixels.", "Use images that are at least 1200 x 630 pixels for the best display on high resolution devices.", file not above "8 MB".

6. ◈ **Schema.org and Open Graph are different layers and can coexist.** (LR, PP, GS2 on schema.org as vocabulary)
   - LR [4:05]: "ces deux types de balisage là ils sont totalement compatibles et les deux peuvent être utilisés en même temps"
   - GS2 [12:10]: "schema.org is a collaboration between multiple companies to create a common vocabulary that vocabulary is not by any means an api"
   - PP [5:08]: platforms also have their own tags (Twitter card) and most fall back to OG.

## B. Single-voice items

- LR [4:05-8:12]: starter types for a small business: LocalBusiness (home page), Organization, BreadcrumbList ("adapté absolument à toutous les sites internet", caption), Author, Article; Product and Recipe for shops and recipe blogs. ◇ one consultant's experience. ◆ Google's LocalBusiness page: "You must include the required properties for your content to be eligible for display as a rich result" with "address" (PostalAddress) required. ◆ schema.org has `TravelAgency` and `TouristTrip` types; **not verified** whether Google shows rich results for them.
- GS1 [2:02]: Google "never" penalises more accurate structured data, but the best use of time is the types its docs use. ◇ vendor statement.
- GS2 [14:12-16:13]: structured data can also act as one signal of what a page is about even without a rich result. ◇ vendor, not verifiable.
- GS2 [22:19-24:22]: JSON-LD can desync if loaded as a separate resource or late; microdata/RDFa stays in sync more naturally. ◇.
- MD [7:14-8:16] (2013): Facebook caches scraped data for about 7 days; re-scrape by posting `scrape=true`; its crawler ignored JavaScript redirects. ◇ **not verified for today**; use Meta's debugger instead.
- PP [2:02-3:04]: if duplicate og tags exist, the latest wins. ◇ **not verified**; just avoid duplicates.
- JR [3:04]: schema.org was "started by Google, Bing and Yahoo". ◇ as stated (not checked here).

## C. Disagreements and corrections

- **What are the "four required" OG tags?** PP: title, description, image, URL. ogp.me ◆: title, type, image, url (description optional). Reading: ask for all five (title, description, image, url, type) plus `og:image:alt`.
- **FAQ markup.** JR (2022) shows an FAQ rich result; LR (2025) says he thinks Google no longer shows it but adds it "dans le doute". ◆ Google's FAQ page now says the FAQ rich result "is no longer shown in Google Search results, as announced in the changelog entry in May 2026." Do not recommend FAQ markup for display purposes.
- **JSON-LD vs microdata.** AV teaches microdata; Google's own docs prefer JSON-LD ◆; GS2 admits microdata/RDFa is easier to keep in sync with visible content.
- **Obsolete source.** MD (2013) is mostly about the Open Graph Actions/publishing API, which is no longer relevant; only the "real URL returning HTML with tags" and cache points are reusable.
- **Platform names.** PP's Twitter card tool "stopped rendering"; X's current rules not verified.

## D. Not covered by any video here (primary pages only)

- ◆ `<title>` (Google title-link page): "Make sure every page on your site has a title specified in the <title> element." and "Write descriptive and concise text for your <title> elements."
- ◆ Meta description (Google snippet page): "Google primarily uses the content on the page to automatically determine the appropriate snippet." and "A meta description tag generally informs and interests users with a short, relevant summary of what a particular page is about." So a description is a suggestion; do not promise it will be shown.
- The three `seo-en` videos are now digested and used in section F.

## E. Notes for the lesson

- Phrases for the AI: "Add a unique title and meta description per page; add Open Graph tags (title, description, image 1200x630 with alt, url, type) and a twitter:card tag; add JSON-LD for Organization/LocalBusiness and BreadcrumbList that matches visible content; no duplicate markup from plugins and templates; validate with Rich Results Test and the Facebook Sharing Debugger."
- Check-in-a-minute: paste a page URL into Google's Rich Results Test and a social debugger.

## F. Search basics: content, titles, headings, canonical, rendering, speed (added after the seo-en digests)

Sources for this section. **CS** = `seo-en Chrome for Developers - Core Web Vitals and SEO [ggpZA5U2rZk].md` (Google, 2020). **FS** = `seo-en Fireship - SEO for Developers in 100 Seconds [-B58GgsehKQ].md` (2021; sells a course). **MH** = `seo-en midulive - Curso COMPLETO de HTML GRATIS desde cero SEO semntica y ms [3nYLTiY5skU].md` (**English caption is a machine translation of Spanish**; quotes are of the caption). **LS** = `img-es Luis R. Silva - Imgenes para tu pgina web  Cmo obtener fotos gratis editar y [ufIAEVjgjYY].md`. **EW** = `type-fr Easyweb Academy - TUTO Tout ce que vous devez savoir sur les polices de caract [HRdGuFZhhTI].md`. Primary pages are in `PRIMARY_SOURCES.md` ("Search basics").

### F-A. Three or more independent voices

1. ◆◈ **Give every page its own descriptive title and a description; the title decides what people see in results.** (FS, MH, LS; Google primary)
   - FS [6:06]: "you should choose your title carefully because it's displayed in a cert page and will ultimately control your ctr rating"
   - MH [45:59] (machine-translated): the title and description set the text on the shared card: "this title, this description and this is thanks to all these tags"
   - LS [15:20]: "aquí puedo modificar el título le recomiendo que veas la lección sobre seo" (the SEO plugin lets you edit the title that Google shows)
   - Primary ◆ Google title-link page (section D above): "Make sure every page on your site has a title specified in the <title> element." and the snippet page: a description "generally informs and interests users". A description is a suggestion, not a guarantee.
2. ◆◈ **Use semantic HTML, and real heading tags for headings.** (FS, MH, EW)
   - FS [1:01]: "when google crawls your site it will use semantic html elements to understand the content on the page"
   - MH [52:05]: "Semantic HTML means with meaning." (the course teaches `article`, `nav`, `aside`, `main`, `header`, `footer` at 52:05-1:04:16)
   - EW [20:31]: a heading must be a real `h1` "et que donc les moteurs de recherche vont être contents ils vont bien comprendre que ça c'est un titre"
   - Primary ◆ Google SEO Starter Guide: "Break up long content into paragraphs and sections, and provide headings to help users navigate your pages." The Google text gives the **user** benefit. EW [18:28] adds that words in headings "sont plus importants que les mots qui sont placés dans du simple paragraphe", a ranking-weight claim that Google's text does **not** make (◇, not verified).
3. ◆◈ **Alt text on images helps search and accessibility.** (FS, MH, LS, plus the five authors of `answers/07-accessibility.md`)
   - FS [5:05]: "one of the most fundamental techniques is to add an alt attribute to images which is basically just some text that describes the image this metadata can be used by search engines and also by screen readers"
   - MH [24:32]: "this Alt attribute is also important for search engines"
   - LS [13:16]: descriptive alt text "ayuda muchísimo" to people with disabilities and positions the page on Google
   - Primary ◆ Google images page: alt text "improves accessibility for people who can't see images" (see `answers/15-imagery.md` rule 5).

### F-B. Two voices plus a primary page

- ◆◈2 **Relevant content comes first; speed and page experience are second.** CS [8:09]: "A good page experience doesn't override having great relevant content." FS [0:00]: "the first rule of search engine optimization is create really good content". Primary ◆ Google: "Google Search always seeks to show the most relevant content, even if the page experience is sub-par." and "Core Web Vitals are used by our ranking systems."
- ◆◈2 **For ranking, Google uses field data (real visitors), not lab scores.** CS [3:04]: "For search rankings, we use field data as this is what your site's users have experienced over time". The Chrome "Understanding performance" talk says the same: "If you want to check a Core Web Vital score, you should always look at real user field data" ([3:13], `perf-en Chrome for Developers - Understanding performance with Core Web Vitals [F0NYT7DIlDQ].md`). Primary ◆ page above: Core Web Vitals "used by our ranking systems"; the "page experience ranking factor" and its 2021 dates in CS are historical.
- ◆◈2 **Pick one canonical address (redirect www to non-www or the reverse).** MH [49:03]: "What canonical means is that we're indicating which page is really the main one on our site" and the correct fix is a redirect. Primary ◆ Google: "Redirects: A strong signal that the target of the redirect should become canonical. rel="canonical" link annotations: A strong signal ..." and sitemap inclusion "A weak signal". One independent voice only (MH), so the rule is ◆ by primary rather than ◈ by authors.

### F-C. Single voice, disputed or not verified

- ◇ **Client-side rendering is risky for SEO and shared links.** FS [7:06]: "because the initial html is just a shell search engines may have a hard time understanding and indexing it"; [8:07]: "i wouldn't trust client rendering if seo was a business critical requirement". Primary ◆ Google: "Google processes JavaScript web apps in three main phases: Crawling Rendering Indexing." so Google does render, with delay; social crawlers were not checked. For a static or server-rendered brochure site this does not apply.
- ◇ **Bounce rate, dwell time and "over 200 factors" as ranking signals.** FS [0:00]-[3:03] states them as fact. No fetched Google page supports them (**not verified**). Do not teach as a rule.
- ◇ **Schema.org "debatable" for ranking.** FS [4:04]: "whether or not it will improve your search engine ranking is debatable"; consistent with section B above, where Google's page says the required properties make content "eligible for display as a rich result" (eligibility, not a ranking promise).
- ◇ **Outbound links to authority sites help ranking.** FS [5:05]; no support found.
- ◇ **The "Twitter card validator" named by FS [6:06].** Tool status not verified; use Facebook's Sharing Debugger and the platform's current preview tool.
- ◇ **Mobile and desktop are ranked on their own data.** CS [4:04]; historical statement, 2020.

### F-D. Notes for the lesson (search half)

- Do not promise rankings. The honest chain is: content that answers the visitor, a unique title and description per page, real headings, alt text, one address per page, fast and stable pages (field data), then optional structured data for rich results.
- Paste into the AI: "Unique `<title>` (about one clear phrase) and meta description per page; one `h1`, then `h2`/`h3` in order; descriptive alt text; `rel=canonical` and a redirect from www to the chosen host; sitemap with canonical URLs only; pages work without JavaScript for text content."
- Thin: how Google treats very small local-business sites, local SEO (Business Profile), multilingual (`hreflang`) for an English plus Russian or Indonesian site, sitemaps/robots detail, and any independent (non-Google, non-course) evidence on how much each on-page factor matters.
