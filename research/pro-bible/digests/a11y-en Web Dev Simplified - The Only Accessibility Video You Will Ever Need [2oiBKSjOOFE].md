# The Only Accessibility Video You Will Ever Need
- Source: Web Dev Simplified (Kyle Cook, YouTube, en) · 2024-11-02 · 38 min · https://youtu.be/2oiBKSjOOFE
- Speaker(s) and why they matter: Kyle Cook, popular web-dev teacher; sells courses (mentions his course site and other videos). Broad checklist of 30+ items grouped by visual, keyboard, hearing, motor, general.
- Relevance to course: 5 (lesson 4) · Freshness matters? mostly timeless; DevTools menu paths change
- Codes: A11Y, UX, CSS, FORM
- Notes: no sponsor segments. "Double A / triple A" are WCAG levels; he does not give the ratio numbers (those are in PRIMARY_SOURCES.md). Mentions Lighthouse failing on a nearly empty page.

## Core thesis
Accessibility is a large checklist, but most items are cheap native-HTML and CSS habits: label inputs, use semantic elements, keep focus visible, allow zoom, check contrast, honour user preferences, and test with a keyboard and a screen reader. These features also make the site better for everyone.

## Claims and advice
- [A11Y][FORM] Label every input; `label for` + `id` links it, `aria-label` or `aria-labelledby` can name it when no visible label exists; the DevTools accessibility pane shows the computed name. (1:01-5:03) — type: practice
- [A11Y] Content that appears without a page reload (toast messages) must be put in an `aria-live` region; use `polite` by default, `assertive` only for urgent errors because it interrupts the reader. (5:03-7:04) — type: practice
- [A11Y][UI] Check contrast in DevTools' colour picker; AA is "probably good enough", AAA the gold standard; small colour changes can raise the ratio a lot. (8:05-10:06) — type: practice
- [A11Y] Emulate vision deficiencies (blur, reduced contrast, colour blindness) in DevTools Rendering. (10:06-11:06) — type: practice
- [A11Y][UI] Do not rely on colour alone (green for success, red for error); add other cues. (11:06) — type: practice
- [A11Y][UI] Dark themes: avoid pure white text on pure black; use a dark grey; the default theme should be the most accessible. (12:07-13:07) — type: opinion
- [A11Y] Test in forced-colors/high-contrast mode (Windows: left Alt + left Shift + Print Screen). (13:07) — type: practice
- [A11Y][IMG] Alt text on meaningful images. (14:07) — type: practice
- [A11Y][SEO] Semantic landmarks (main, nav, aside); exactly one h1; headings in order; never use h-tags just to make text bigger; use a real button, not a div with onclick. (14:07-15:08) — type: practice
- [A11Y] Link text must say what the link does ("click here" fails). (15:08-16:08) — type: practice
- [A11Y][CSS] The site must work when zoomed in or out; do not block zoom. (16:08) — type: practice
- [A11Y] Offer a contact method that does not need sight (phone) and one that does not need hearing (chat/text); test with a screen reader; consider paying a full-time screen-reader user to test. (16:08, 17:09, 26:18) — type: practice/opinion
- [A11Y] `tabindex`: never a positive value (it reorders focus unpredictably); 0 for custom widgets and scrollable regions; -1 for programmatic focus. (17:09-21:14) — type: practice
- [A11Y] Never remove the outline without a replacement; use `:focus-visible`. (21:14-23:15) — type: practice
- [A11Y] Operate the entire site by keyboard only; if it is possible but annoying, improve it. (23:15) — type: practice
- [A11Y] Add a skip link as the first focusable element on pages with long navigation. (23:15-24:17) — type: practice
- [A11Y] Captions and (ideally) searchable transcripts for video/audio; a short written synopsis beside long media; test with sound off. (24:17-26:18) — type: practice
- [A11Y][UI] Motor access: space clickable elements apart; make targets large; a label linked to a checkbox enlarges its click area; avoid time-limited interactions. (27:18-29:20) — type: practice
- [A11Y][CSS] Respect user preferences with media queries (`prefers-reduced-motion`, `prefers-color-scheme`, forced colors). (29:20-31:20) — type: practice
- [A11Y] Offer a dyslexia-friendly font option on text-heavy sites. (31:20) — type: opinion (no evidence given; the benefit of such fonts is disputed, not checked here)
- [A11Y][UX] Use `autofocus` on a single search field; he calls the missing use his "biggest pet peeve". (31:20-32:21) — type: opinion (disputed; autofocus can disorient some users, not verified here)
- [A11Y] Set the viewport meta tag and make the site responsive; Lighthouse flags touch targets and heading order. (32:21, 34:21-35:22) — type: practice

## Techniques and steps
1. Open DevTools: accessibility tree, Rendering tab emulations, colour picker contrast.
2. Navigate with Tab only; check order and focus ring.
3. Run Lighthouse; add `eslint-plugin-jsx-a11y` if using JSX.
4. Test with a real screen-reader user once the site looks done.

## Tools and resources
- Chrome DevTools accessibility pane and Rendering tab (3:01, 10:06); Lighthouse (33:21); `eslint-plugin-jsx-a11y` (33:21); Chrome accessibility event recording (35:22, advanced)

## Quotes
- "if you remove the outline from your element for actual visual reasons, you need to make sure you add in some other type of replacement" (21:14-22:14, paraphrase of the sentence)

## Disagreements and contrarian points
- Dyslexia fonts and autofocus are his opinions; neither is in WCAG as a requirement.
- Recommends "AA is probably good enough"; consistent with WCAG AA being the usual legal target.

## For the course
Lesson 4: strongest single source for a "30 things" checklist and DevTools how-to; use the tabindex and :focus-visible items, the live-region polite/assertive rule, forced-colors test and the skip link. Do not state the dyslexia-font and autofocus items as rules.

## Other
Mentions that Lighthouse fails on near-empty pages; useful warning when testing small wireframes.
