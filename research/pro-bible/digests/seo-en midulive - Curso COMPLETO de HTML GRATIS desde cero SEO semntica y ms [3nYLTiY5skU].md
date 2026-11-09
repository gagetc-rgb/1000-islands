# Curso completo de HTML gratis desde cero: SEO, semántica y más [original in Spanish; English caption is machine-translated]
- Source: midulive (YouTube, es; live-streamed lesson; the file's caption is an English machine translation, `en-US-orig`, with garbles such as "Openraph" for Open Graph, "NAP tag" for `nav`, "Asite" for `aside`, "Fabicon") · 2023-10-13 · 1 h 54 min · https://youtu.be/3nYLTiY5skU
- Speaker(s) and why they matter: the host of the midulive channel (known as midudev; identity from general knowledge, not stated in the caption), a popular Spanish-language programming educator, teaching HTML from scratch to beginners with a portfolio page.
- Relevance to course: 3 (lessons 4 and 8: alt text, semantic elements, meta/OG tags, canonical, image dimensions and lazy loading, input types) · Freshness matters? low
- Codes: SEO, A11Y, FORM, IMG, PERF
- Notes: **method note: digest built from every third minute-block (~200 characters) of the 22,300-word caption plus targeted reading of nine blocks; wording of the many demonstrations was not read in full, and the caption is machine-translated.** No sponsor segment seen in the sampled text; the course is free.

## Core thesis
HTML is the foundation: use the right element for the meaning of the content (semantic HTML), give images alternative text and dimensions, put the correct metadata in the head (title, description, Open Graph, canonical), and use the correct input types.

## Claims and advice
- [A11Y][SEO][IMG] `alt` text appears when the image fails, helps people who cannot see the image, and also helps search engines ("Google is now increasingly doing better and better things with" images; the sentence is cut off). (24:32) — type: practice (consistent with Google's image documentation, see `PRIMARY_SOURCES.md` "Images for websites")
- [SEO] The `<head>` carries metadata: title, description, icon, viewport (without the viewport tag mobile devices show only a piece of the page, 39:56); Open Graph tags (`og:title`, `og:description`) set the title and description on shared cards; "if you don't put this metadata, by default it's going to make an error". (39:56-49:03) — type: practice (matches `answers/09-search-sharing.md`; the protocol's required tags are `og:title`, `og:type`, `og:image`, `og:url`, verified there)
- [SEO] `rel="canonical"` tells Google which URL is the main one so duplicates (www and non-www) are treated as the same page; the better fix is a redirect to one version. (49:03) — type: practice
- [SEO][A11Y] Semantic HTML means "with meaning": `article`, `nav`, `aside`, `header`, `footer`, `main`, `p`; an `article` should still make sense if extracted elsewhere. (52:05-1:04:16) — type: practice
- [A11Y] `role` is for accessibility; where a native element exists (a `button` instead of a clickable `div`) use the native one first. (1:10:25) — type: practice (matches the accessibility group)
- [FORM][UX] Use the right `type` on inputs (`email`, `tel`, `number`) so the keyboard and validation fit; buttons in a form are `submit` by default. (1:16:32-1:22:38, 1:31:48) — type: practice (consistent with the forms answers)
- [IMG][PERF] Set `width` and `height` on images so the aspect ratio is known; `loading="lazy"` "doesn't guarantee that it's going to do the lazy thing" (the browser decides) but delays off-screen images, visible in the Network waterfall. (1:37:53-1:40:58) — type: practice (matches web.dev; lazy loading must not be applied to the first-screen image, see `answers/15-imagery.md`)
- [A11Y][UX] The `<details>`/`<summary>` element gives expandable FAQs without JavaScript. (1:28:45) — type: practice
- [SEC][CSS] `<iframe>` has an `allow` attribute for permissions; script tags can sit anywhere; every element ID creates a property on `window`, which can collide with native names (his `window.open` example), so avoid abusing IDs. (1:44:01-1:50:07) — type: practice

## Techniques and steps
1. Write semantic structure (header, nav, main, article, aside, footer).
2. Add alt text and image dimensions; lazy-load images below the first screen.
3. Add title, description, Open Graph tags and canonical in the head.
4. Use correct input types; prefer native elements to ARIA roles.

## Tools and resources
- VS Code, a live preview extension, Chrome DevTools Network panel.

## Quotes
- "Google is now increasingly doing better and better things with ..." (24:32, cut off in the caption)
- "this doesn't guarantee that it's going to do the lazy thing" (1:37:53, near-verbatim)

## Disagreements and contrarian points
- Fireship's SEO video recommends structured data and outbound links as ranking help; this course teaches only meta tags and semantics and does not mention schema.org. No conflict, different scope.
- Does not warn about the LCP image and `loading="lazy"`; web.dev does (verified in `PRIMARY_SOURCES.md`).

## For the course
Lessons 4 and 8: strong beginner-level agreement with web.dev and Google on alt text, canonical, Open Graph, semantic elements and image dimensions. Use as a Spanish-language voice in `answers/09-search-sharing.md` only after confirming the wording in the original Spanish (the English caption is machine-translated).

## Other
The finishing minutes direct viewers to the next week's CSS course.
