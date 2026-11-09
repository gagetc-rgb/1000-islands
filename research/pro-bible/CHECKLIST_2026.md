# Director's checklist 2026: what to watch when AI builds the site

Reader: someone who directs AI and does not write code. Goal: know what to demand and how to verify it.
Status: DRAFT v0.1 (11 Oct 2026). Thresholds marked [src] come from Addy Osmani's web-quality-skills README and Vercel's web-design-guidelines descriptions (third-party summaries, not yet checked against web.dev / WCAG text). Everything else is general practice, to be verified before it becomes a hard rule.

## 1. Speed (measurable)
- LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1, judged on real-user data at the 75th percentile when it exists [src].
- Budget guide: page < 1.5 MB, JS < 300 KB, CSS < 100 KB [src]. Photo-led site: images are the risk (modern formats, correct sizes, explicit width/height, lazy-load below the fold, hero image preloaded).
- A Lighthouse score is a guardrail, not proof [src].

## 2. Accessibility (WCAG 2.2 AA)
- Contrast ≥ 4.5:1 for body text, 3:1 for large text [src].
- Everything works by keyboard; focus is always visible; no color-only meaning.
- Every image has alt (decorative = empty alt); every form field has a label; page language set.
- Animations respect prefers-reduced-motion [src].
- Automated tools catch only part of this; one manual keyboard pass is mandatory.

## 3. Mobile
- Design and test the phone first; tap targets large enough; no accidental page-level horizontal scroll (WCAG 1.4.10 Reflow: readable at 320 px wide; intentional carousels and rails are fine if the next item peeks in and there are arrows and keyboard control); sticky bars never cover content or forms (we already have these rules in LAYOUT_RULES.md).

## 4. Search and sharing
- One h1, logical headings, unique title and description per page, descriptive link text, sitemap, canonical URLs, HTTPS, structured data where it fits (tours, business, FAQ) [src].
- Social preview image and title per page.

## 5. Security hygiene (the AI-code trap)
- No keys or passwords in the code or the client; forms validated server-side and protected from spam; third-party scripts kept to the minimum.
- Treat every downloaded skill, plugin and MCP server as untrusted code: read SKILL.md before installing. One blog cites Snyk's Feb 2026 audit finding flaws in about 37% of 3,984 scanned skills (secondary source, verify).

## 6. What AI does badly (check on every build)
- Missing states: empty, loading, error, success, 404.
- Invented components, links or facts (prices, tour names, contact details).
- Generic look and drifting styles (fonts, spacing, colors differ page to page): enforce design tokens.
- Dead buttons and fake forms in prototypes: label them as prototype.

## 7. Trust and business
- Real contact data, clear single call to action per page, cookie/consent only where analytics or ads need it, privacy page, analytics set up before launch with the conversion events defined.

## 8. Handoff and ownership
- Domain, DNS and hosting accounts in the client's name; who pays what; backups; who edits content later; how to roll back a bad deploy.

## 9. Proof before showing anything
- Evidence beats claims: Lighthouse/DevTools run, screenshots at phone and desktop width, keyboard walk-through, link check. Impeccable detector must exit 0 (project rule).

## Next step (needs the owner's decision, nothing installed yet)
- Review gate candidates: Vercel `web-design-guidelines` (UI review against ~100 rules), Addy Osmani `web-quality-skills` (Lighthouse-based audits), Chrome DevTools MCP (live Lighthouse and performance traces for the agent). We already have Impeccable (design) and a Playwright MCP.

## Small watch-list (metadata verified, not watched or transcribed)
| Topic | Video | id |
|---|---|---|
| Usability rules that do not expire | NNgroup, Nielsen keynote "The Immutable Rules of UX" (39 min) | OtBeg5eyEHU |
| Speed | Chrome for Developers, "Optimize for Core Web Vitals" (38 min) | AQqFZ5t8uNc |
| Accessibility | freeCodeCamp, "Learn Accessibility - Full a11y Tutorial" (93 min) | e2nkq3h1P68 |
| AI code in production | Anthropic, "Vibe coding in prod" (31 min) | fHWFF_pnqDk |
| UI craft | Steve Schoger, "Refactoring UI: Bad About" (14 min) | S6-q5BheEYU |
| Why AI-only builds fail | DevForge, "Vibe Coding is a Trap" (6 min) | ya6520zh4pQ |
