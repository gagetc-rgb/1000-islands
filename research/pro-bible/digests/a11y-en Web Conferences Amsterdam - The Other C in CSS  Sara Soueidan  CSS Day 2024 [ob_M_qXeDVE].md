# The "Other" C in CSS | Sara Soueidan | CSS Day 2024
- Source: Web Conferences Amsterdam (CSS Day) · 2024-08-19 · 56 min incl. Q&A · https://youtu.be/ob_M_qXeDVE
- Speaker(s) and why they matter: Sara Soueidan, independent inclusive-design engineer (Lebanon), widely cited accessibility specialist; sells the course "Practical Accessibility" (mentions it at the end, 55:09). Expert-level, CSS-focused.
- Relevance to course: 3 (lesson 4; mostly for the "how CSS can break accessibility" mini-section; too advanced for the core) · Freshness matters? browser-bug details expire
- Codes: A11Y, CSS, UX
- Notes: no sponsor; a trailing course plug. Caption garbles "screen reader" as "screen meter" and "ARIA" as "Arya/ARA/Rd"; I normalise these. She cut one section for time.

## Core thesis
CSS is not only visual: it changes what the browser exposes in the accessibility tree (role, name, description, state, whether the element exists at all). So CSS choices can silently remove list semantics, hide labels, or add noise to accessible names. The remedy: prefer native HTML, test with a screen reader, and do not build interactive widgets in CSS only.

## Claims and advice
- [A11Y] The accessibility tree exposes role, name, description/properties and state of each element; native HTML maps to roles and brings state updates for free. (2:06-5:10) — type: evidence/practice
- [A11Y][CSS] `list-style: none` can remove list semantics in Safari/VoiceOver (more strictly in Safari 16+ unless the list is inside a nav landmark); workaround: `role="list"` or `list-style-type: ""`. A WebKit engineer said the change is deliberate (anti list-overuse). (5:10-7:12) — type: evidence (browser-specific, may change)
- [A11Y] Always run a screen reader to check; browsers change heuristics. (7:12) — type: practice
- [CSS][A11Y] `display:none` and `visibility:hidden` remove from the accessibility tree for everyone; `display: contents` has a long history of bugs, still broken in places (e.g. in-page anchor target in Firefox); use it only on meaningless generic containers. (8:14-10:16) — type: evidence
- [A11Y][CSS] The "visually hidden" utility (1px, clip, no wrap, absolute) is for text; on interactive elements it must only hide until focus (skip links, shown on focus, IKEA example). (10:16-13:21) — type: practice
- [A11Y] Hidden-but-focusable controls: for a custom-styled checkbox, do not shrink to 1px or move off-screen because Android TalkBack explore-by-touch cannot find it; instead keep it in place, absolutely positioned on top of the replacement image with `opacity: 0`; hide the decorative SVG with `aria-hidden`. Demonstrated with TalkBack. (13:21-18:25) — type: evidence (demo)
- [A11Y] Accessible-name computation: `aria-labelledby` then `aria-label` beat native methods; but when you author, choose in nearly the opposite order: content, then native attribute/label element, then `aria-labelledby`, then `aria-label` last. Avoid `title` except on iframes. (19:26-24:31) — type: practice
- [A11Y][UX] Do not put both a label and `aria-label` on the same control; it can break WCAG 2.5.3 Label in Name. (21:28-22:28) — type: practice
- [CSS][A11Y] Text added via `::before/::after` `content` is read aloud as part of link names (VoiceOver reads "Latin small letter i"); CSS alt text syntax (`content: "x" / "alt"`) exists but Firefox did not support it then; do not use CSS-generated content for meaningful content (not translated, no CSS in some AT, forced-colors problems, WCAG 2.5.3). Decorative generated content can be given empty alt, but support was inconsistent. (24:31-34:39) — type: evidence
- [A11Y] If a label is hidden with `display:none`, an input loses its name; reuse a hidden element as a name with `aria-labelledby`; `aria-label` translates poorly and is a last resort. (36:42-38:44) — type: practice
- [A11Y][UX] CSS-only show/hide widgets (checkbox hack, `:has`) do not convey state and cannot give modal dialogs focus trapping, inert background and role; use `dialog`; the popover API is non-modal and still needs JavaScript for modal cases. Hover/focus popovers must meet WCAG 1.4.13 and focus must not be obscured (2.4.11 / 2.4.12). (39:45-47:50) — type: practice
- [A11Y][UX] Avoid unannounced context changes on input (WCAG 3.2.2); apply the rule of least power: HTML for semantics and behaviour, ARIA and JS only where needed. (47:50-50:55) — type: practice
- [A11Y] Q&A: you cannot know who uses a screen reader; screen readers are not only blind users; the same info feeds speech-control software. (53:05-54:07) — type: opinion

## Techniques and steps
1. Inspect the accessibility panel in DevTools to see name/role/state and the order of name sources.
2. Test lists, controls, hidden elements with a screen reader after each CSS reset.
3. For hidden-but-focusable controls: keep in place, `opacity:0`, positioned over the replacement.
4. For custom widgets: add role, state, keyboard, focus rules in HTML/JS; do not rely on CSS.

## Tools and resources
- DevTools accessibility pane; VoiceOver, TalkBack, NVDA (cited for her demos); Adrian Roselli's posts on `display: contents` and CSS widgets; Eric Bailey's `display: contents` article (9:15-10:16)

## Quotes
- "if anyone tells you to just use the visually hidden utility class to hide interactive elements remember that that is an oversimplification" (18:25)
- "put user needs above all" (50:55, paraphrase of the closing)

## Disagreements and contrarian points
- Against blanket use of "visually hidden"; two other authors in this set recommend it for hiding text (answers/02). She agrees for text, disagrees for interactive controls.
- Against ARIA-first thinking, yet uses `aria-labelledby` and `role="list"` as targeted fixes: native first, ARIA deliberately.

## For the course
Lesson 4: only a short "CSS can break accessibility" aside: list-style reset, `display:none` on labels, hiding custom controls, CSS-only modals. Use as a "tell the AI" rule: no CSS-only widgets for dialogs; keep native controls. Browser-version specifics are `◇` until re-tested.

## Other
Mentions WCAG 2.5.3 Label in Name, 1.4.13, 2.4.11/2.4.12, 3.2.2; all are checkable against the W3C pages (see PRIMARY_SOURCES.md).
