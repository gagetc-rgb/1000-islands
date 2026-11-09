# Cross-check 2: accessibility (NotebookLM, 11 Oct 2026)

Sources: freeCodeCamp (en), Web Dev Simplified (en), Sara Soueidan (en), Script Raccoon (de), Soy Dalto (es). Attribution by the notebook's model, not yet spot-checked (unverified).

## Agreed by 3+ authors (best practice)
1. Everything works by keyboard alone.
2. Visible focus outline on every interactive element.
3. Semantic HTML (native elements) instead of generic divs.
4. Meaningful alt text; decorative images hidden from assistive tech.
5. Every input has an explicit label.
6. High text/background contrast (four of five authors).
7. Heading levels in sequence.
8. Test manually with keyboard and a screen reader, not only with tools.

## Single-author
- `display: contents` can strip roles (Soueidan). Do not autoplay media on load (Soy Dalto).

## Disagreements
- ARIA: Soy Dalto warns that pages with ARIA show more errors (cites 41%, figure not verified); Soueidan uses ARIA-aware CSS selectors to repair stripped semantics. Practical reading: native HTML first, ARIA only where native elements cannot do the job.
- Hiding text: two authors recommend a "visually hidden" class; Soueidan warns that off-screen positioning can break touch exploration on mobile screen readers.

## Overlap with the skills we read
- Vercel guidelines and Osmani's accessibility skill list the same items plus: skip link, aria-live for async updates, `prefers-reduced-motion`, `:focus-visible`, never `outline: none` without a replacement. Contrast thresholds 4.5:1 / 3:1 come only from the skills and need a check against WCAG text.
