# Tipografías web: formatos necesarios
- Source: Joan Morci (YouTube, es) · 2018-04-04 · 13 min · https://youtu.be/DCLYz2W-N9k
- Speaker(s) and why they matter: Joan Morci, a Spanish-language web/WordPress teacher; practical tutorial on serving your own fonts. Dated (2018) format advice (Internet Explorer 9, SVG and EOT fonts).
- Relevance to course: 2 (lesson 9; formats now reduced to WOFF2) · Freshness matters? strongly dated
- Codes: TYPE, PERF, HOST
- Notes: the video says TTF/OTF only render when installed on the visitor's device (inaccurate for @font-face); treat as unreliable on details.

## Core thesis
For fonts not on Google Fonts, upload the files to your own hosting and provide web formats; keep the WOFF family and generate them from your font file with an online converter.

## Claims and advice
- [TYPE][HOST] You can self-host a font from Google Fonts instead of depending on a third party; a client's licensed font must be uploaded to your own server. (1:01-3:04) — type: practice
- [TYPE][PERF] WOFF2 compresses better and loads faster (he says up to about 50% faster); WOFF is the compatible fallback; his advice: keep WOFF and WOFF2; SVG/EOT only for ancient browsers. (4:05-7:07) — type: opinion (numbers not sourced)
- [TYPE] Convert a TTF/OTF to WOFF/WOFF2 using an online generator (he uses Transfonter), then paste the generated @font-face CSS; he warns that a subset or a TTF lacks accents unless the OTF is used. (8:08-11:11) — type: practice

## Techniques and steps
1. Obtain OTF/TTF; 2. generate WOFF2 and WOFF; 3. upload; 4. add the generated CSS.

## Tools and resources
- Transfonter (8:08); a file-manager plugin for WordPress (1:01)

## Quotes
- "web y web 2 y con eso siempre vas a acertar" (7:07, caption: WOFF and WOFF2 are enough)

## Disagreements and contrarian points
- None; consistent with web.dev's current statement that WOFF2 is the best format.

## For the course
Lesson 9: only the recommendation of WOFF2 (and self-hosting as a choice); the rest is obsolete.

## Other
None.
