# DrupalCon Vienna 2017: Responsive Images and Art Direction in Drupal 8
- Source: Drupal Association (YouTube, en; conference talk by a designer and front-end developer from a Drupal agency) · 2017-09-27 · 38 min · https://youtu.be/PHPmXhouaUw
- Speaker(s) and why they matter: a front-end developer at a Drupal agency who admits she "was doing responsive images wrong for years" (1:01) and is explaining the correct split between `srcset`/`sizes` and `<picture>`. Technically accurate in outline, Drupal-specific in implementation; 2017, so Internet Explorer and `picturefill` are mentioned.
- Relevance to course: 4 (lesson 9 photography half: responsive images, art direction, focal point; also lesson 3 speed) · Freshness matters? high for implementation (Drupal 8, IE), low for the concepts
- Codes: IMG, PERF, CSS, UX, A11Y
- Notes: no sponsor segment. The caption is noisy ("SLC set" for `srcset`, "Poco focal point" for Focal Point module). Page weight and traffic numbers from 2015-2016 ("about 60 percent of the traffic ... images", 2:04) are spoken without source and are dated.

## Core thesis
Do not mix two different problems: `srcset` + `sizes` on one `<img>` serves the same picture at different resolutions (the browser chooses the file); `<picture>` with `<source media>` is for art direction, where a different crop or image is needed per breakpoint. Plan the image sizes before building, and give editors a simple way to protect the important part of an image (focal point).

## Claims and advice
- [PERF][IMG] The goal: "deliver the highest quality images supported and nothing more"; images are the majority of page weight, load asynchronously, and are usually too big. (1:01-2:04) — type: practice; the "60 percent" figure is unsourced and dated
- [IMG][CSS] The browser knows viewport size and screen density but not the file's size until it fetches it; the author knows the layout width but not the viewport. `srcset` lists candidate files and their widths, `sizes` states how wide the image will be at each viewport width, and the browser chooses. (3:06-5:10) — type: evidence (this is how `srcset` works; see the web.dev/MDN checks)
- [IMG] Art direction means changing the image itself per breakpoint (not the same image scaled); for that use `<picture>` with `<source>` and a `media` attribute and an `<img>` fallback inside. (6:12-7:14) — type: practice; she says she had used `<picture>` for everything and that was wrong
- [IMG][PERF] Plan the image sizes first: take the widest size at each breakpoint, subtract margins and gutters, then divide by the columns; "increase by 20-25%" per image style so you end with about four image styles instead of dozens. (11:22-13:24; she credits a one-hour DrupalCon New Orleans talk, named "Mart Ramon" in the caption, a garbled name I could not identify) — type: practice (not verified)
- [IMG] Name image styles by component rather than size (keep dimensions in the label), or by size on large projects; both are valid, it depends on project size. (14:25, 33:04-34:06) — type: opinion
- [IMG][UX] Give editors control of the crop: full manual crop per ratio (Image Widget Crop) is precise but "requires a long implementation and a long effort from the final users" because they must set it on every upload; Focal Point (editor marks the important spot once, the CMS crops around it) gives "basic art direction" at low effort. Recommendation: use focal point unless full control is needed. (18:33-24:45) — type: practice
- [IMG][UX] In Q&A: a questioner (cinematography) says faces should sit with the eyes at one third from the top; the speaker agrees this cannot be automated by focal point alone because it only stores a point; a person must choose it. (28:59-31:02) — type: practice
- [IMG][UX] Breakpoints: use the CMS defaults only if the design has no requirements; ideally set breakpoints where the layout breaks (e.g. two columns become three). (25:48-26:49) — type: practice
- [A11Y][IMG] Q&A: alt text and title are separate attributes; if different images show at different breakpoints, `srcset` implies the same image, so use `<picture>` when the content differs; she says she would consult someone who knows screen readers for photographer sites with repeated captions. (27:53, 35:09-37:12) — type: opinion/practice
- [IMG] Maintaining the `sizes` attribute by hand is annoying (a questioner's point); she knows of no tool that generates it automatically. (32:02-33:04) — type: practice

## Techniques and steps
1. Plan breakpoints and sizes from the layout.
2. Create the smallest useful set of image styles.
3. Use `srcset` + `sizes` for resolution switching; `<picture>` for art direction.
4. Add a focal-point field so editors can mark the subject.

## Tools and resources
- Drupal 8 core Responsive Image and Breakpoint modules; Image Widget Crop; Focal Point; `picturefill` polyfill for Internet Explorer (7:14-8:16).

## Quotes
- "the main goal is to deliver the highest quality images supported and nothing more" (2:04, caption near-verbatim)
- "it's not mobile first it's actually mobile second but first because we have the 100% the second value" (5:10, garbled caption about `sizes` order; paraphrase only)
- "users are going to be super happy for the first five minutes" (21:39, caption: the manual crop widget is great until editors realise they must do it on every upload)

## Disagreements and contrarian points
- Image style naming: component-based vs size-based, both accepted.
- Focal point vs full manual crop: control vs editor effort.
- The `srcset` model leaves the browser in charge ("who has all the control is the browser", 4:08), so the author cannot force a specific file.

## For the course
Lesson 9 (photography half) and lesson 3 (speed). Use: (a) `srcset`/`sizes` for the same image at different sizes, `<picture>` for different crops (verify with MDN and web.dev); (b) plan a few image sizes, do not generate dozens; (c) ask for focal-point control so a crop never cuts the subject; (d) this speaker's CMS (Drupal) is not the course's CMS, take only the concepts. Travel-specific art direction is not covered.

## Other
2017 talk; the `loading="lazy"` attribute, AVIF/WebP and `fetchpriority` do not appear.
