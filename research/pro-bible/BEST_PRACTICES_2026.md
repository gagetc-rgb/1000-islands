# Web best practices 2026: consensus only

Built 11 Oct 2026. Round 1: 44 video transcripts cross-checked in NotebookLM, plus the source text of three agent-skill packs (Vercel web-interface-guidelines, Addy Osmani web-quality-skills, Anthropic frontend-design). Round 2 (same day): 50 more transcripts on the gap topics, so **94 transcripts, 84 channels, original languages en, es, fr, de, pt, ru, ja, ko; 12 captions are machine translations and are flagged as weak**, plus primary pages (W3C, web.dev, MDN, Google, OWASP, EU law and regulators, Cloudflare, GOV.UK, Baymard) in `PRIMARY_SOURCES.md`. Nothing installed.

Evidence tags (round 1 tags kept as they were):
- **[C]** consensus: at least 3 independent authors AND the skills agree.
- **[V]** videos only (3+ authors, skills silent).
- **[S]** skills only (not yet confirmed by the videos).
- Round 2 tags: **◆** a primary page confirms the exact point (URL and quote in `PRIMARY_SOURCES.md`); **◈** three or more independent authors (same vendor, same author, or same book count as one); **◇** one author, disputed, or not verified. A rule can carry ◆◈.
- Authors who cite the same book or checklist count as weaker. Sponsor and sales bias is noted in each digest (`digests/`).
- Per-author attributions in round 1 came from the notebook and are partly unverified (one misattribution in 3 spot checks of 4). Round 2 attributions are quoted from the transcripts with timestamps in `answers/07..16`.

Raw cross-check answers: `answers/01..06` (round 1) and `answers/07..16` (round 2). Rules we deliberately skip: single-author ideas, authors' personal style.

## UX and visual UI
- [V] One dominant primary action per page or section; secondary actions visually quieter.
- [V] Group related things close together (proximity); build hierarchy with size, weight, contrast. Space should express how related things are (closer = more related), taken from a short scale rather than by eye. ◈ (Schoger, Showalter, Chainlift, Soy Dalto, Polito)
- [V] Make the key element visibly distinct; make primary targets large and easy to reach (Fitts). ◆ WCAG 2.5.8: targets at least 24 by 24 CSS px (AA), 44 at AAA.
- [V] Fewer choices and short steps; split long forms and menus into chunks. The "7 plus or minus 2" figure is a memory finding and contested as a menu rule: ◇, not a hard gate.
- [V] Use familiar patterns; users expect sites to behave like other sites.
- [V] Test with real users and iterate; "test before you launch" (Nielsen, NN/g). Check both utility (does it do what people need) and usability (can they use it). ◈ in spirit, but the strongest statements are from one institution.
- [V] Good looks raise perceived usability (so polish is not optional).
- ◇ Gestalt/UX "laws" lists (Todaro, Soy Dalto, Polito) are secondary summaries of one collection; use them as vocabulary, not as numeric rules (400 ms Doherty threshold, 7±2).

## Layout and CSS (what to demand from the AI)
- [V] Grid for 2-D layouts, flexbox for 1-D rows/columns.
- [V] Relative units (rem, em, %) over fixed pixels; no fixed pixel widths on containers. CSS pixels are not device pixels.
- [V] Self-adjusting layout (flex-wrap, grid `repeat(auto-fit, minmax(…, 1fr))`, `clamp()`) over piles of media queries; use `min-height` instead of `height`, `max-width` on wrappers; avoid `width: 100vw` (scrollbar overflow). ◈ (Powell, Chrome one-line layouts, Comeau; MDN for the image rule)
- [V] `img { max-width: 100%; display: block }` as the baseline; media queries mobile-first (`min-width`) where a layout must switch. ◈ (Powell, Chrome, MDN)
- ◇ `100vh` on phones overshoots with browser toolbars (2022 talk; newer viewport units have since shipped, not re-verified).
- [S] No accidental page-level sideways scroll; readable at 320 px wide (WCAG 1.4.10).
- [S] Safe areas for notched phones; `color-scheme` and `theme-color` for dark themes.

## Accessibility
- [C] ◆◈ Everything works by keyboard; focus always visible (never remove outline without a replacement).
- [C] ◆◈ Semantic HTML first (button for actions, a for navigation); ARIA only when native HTML cannot do it. Caveat: WebAIM Million 2026 shows pages with ARIA had about 41% more errors, but WebAIM itself says this does not prove ARIA caused them.
- [C] ◆◈ Real alt text; decorative images get empty alt. Every input has a real label (a placeholder is not a label). Headings in order, one h1 (the "one h1" is practice, WCAG only asks that headings convey structure). Link text says where it goes.
- [C] ◆◈ Contrast: 4.5:1 normal text, 3:1 large text, where "large" means at least 18 pt or 14 pt bold (not "24 px"); 3:1 for UI component boundaries (1.4.11). AAA (7:1) is not recommended as a blanket requirement for whole sites; AA is the floor, AAA where cheap. Text over a photo must meet the ratio against the pixels actually behind it.
- [C] ◈ Test by hand with keyboard and screen reader; automated tools find only part (a Lighthouse score is not compliance).
- [C] ◈ Text must scale to 200% without loss (relative units, never block zoom); dynamic updates use `aria-live` (polite by default); a skip link is the first focusable item on long navigation (3 authors).
- [S] Respect `prefers-reduced-motion`; no autoplay motion over 5 s without a pause control; errors inline and focus the first error.

## Speed
- [C] ◆ Core Web Vitals "good" thresholds: LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms (75th percentile). INP replaced FID in 2024 (transition deadline 9 Sept 2024); videos before that still mention FID.
- [C] ◆◈ Images: explicit `width` and `height` on every image (CH, Beyond Fireship, Syntax; web.dev); resize and compress before upload; modern formats (WebP/AVIF; AVIF support is recent); lazy-load images below the first screen; **never lazy-load the hero/LCP image** and give it `fetchpriority="high"` (web.dev). No primary source gives a byte budget; the targets in videos (about 400 KB, under 100 KB) are habits (◇).
- [C] Ship real HTML (static or pre-rendered) rather than relying on client-side rendering. ◇ The claim that Google cannot index client-rendered apps is overstated: Google documents a crawl-render-index process with delay; social crawlers not checked.
- [C] Defer or remove non-essential JavaScript; preload at most one or two critical fonts with `font-display: swap`; WOFF2.
- [C] ◆ Field (real-user) data decides; Lighthouse lab runs diagnose. A score is a guardrail, not proof ("do not fix something just to make Lighthouse happy", Syntax).
- [S] ◇ Budget guide: page under ~1.5 MB, JS under ~300 KB, CSS under ~100 KB. **Not a standard**: only the "critical CSS about 14 KB" figure was found in a primary page; treat as a team preference.

## Images and photography (new, round 2; the thinnest topic)
- ◈ Plan the picture for its layout: free space at one side for the headline, simple background, enough contrast; shoot or request both landscape and portrait of each scene. (Gray, Segall; host of Gray's podcast for orientation)
- ◆ Different crops per screen are art direction: `<picture>` with `<source media>`; the same picture at different sizes is `srcset` + `sizes` (MDN, web.dev). `object-fit: cover` crops; `object-position` defaults to the centre. ◇ Let the editor mark a focal point so crops do not cut the subject (one talk, CMS-specific).
- ◈ Prefer your own, authentic photos of the real place; if you use stock, read that site's licence (◆ Pexels: free to use, no attribution needed, but identifiable people must not appear in a bad light; Pixabay not verified).
- ◆◈ Descriptive file names and alt text (Google images page; five authors on alt text).
- ◇ Portfolio-site advice (Mott: lead with your strongest image of what you sell, hard edit, large images with enlarge option, neutral background) is from photographers' sites and does not transfer word for word to a tour operator.
- Not found: any source on travel or hospitality art direction, destination photography briefs, model releases, video hero loops.

## Typography (new, round 2)
- ◆◈ Do not hide text while fonts load: `font-display: swap` with a metric-matched fallback; WOFF2; few font files; preload one or two at most. (Leatherman, Pamental, Joan Morci, Syntax; MDN, web.dev)
- ◈ Sizes in relative units from a 100% base; heading sizes scale per screen; ◆ WCAG 1.4.4 (200% resize) and 1.4.12 (text spacing) must not break the layout.
- ◈ At most two typefaces (heading and body) with clear contrast: practice (no standard).
- ◆◈ Check that the typeface includes the scripts you need (Cyrillic, Latin extended): use the language filter; `unicode-range` lets browsers fetch only needed subsets. One video's example (Oswald lacks Cyrillic) is out of date; Google Fonts now offers Cyrillic for Oswald, Roboto, Montserrat, Playfair Display.
- ◇ Left-aligned ragged text, about 80 characters maximum (WCAG 1.4.8 is AAA); serif vs sans on screens is taste; Pamental's three videos count as one author.
- Not found: pairing theory beyond "limit and contrast", Cyrillic typesetting detail, CJK.

## Forms and conversion (new, round 2)
- ◆◈ Visible label for every field; a placeholder is not a label or a place for hints; hints and error text tied to the field (`aria-describedby`).
- ◆◈ Labels above the field, one column; native input types and `autocomplete`; ask only for data you need (Baymard 2024 averages are cited in `answers/08`; field removal anecdotes are unverified).
- ◈ Do not show an error before the user has tried; validate on leaving the field; errors say what is wrong and how to fix it, next to the field; long forms add a summary with links.
- ◈ Test with real users and with keyboard and screen readers.
- ◇ No Reset button; one "full name" field; mark optional fields (GOV.UK) rather than required ones; do not ask to repeat email.
- Disagreements: browser (HTML5) validation vs custom messages (GOV.UK says do not use native messages; Silktide accepts them as a baseline); disabled submit button before submit (one author says never; keep a guard against double submission after submit); contact pages without forms (Mott, portfolio sites) vs normal enquiry forms.

## SEO and sharing
- [V] Semantic structure with real heading tags, unique `<title>` and meta description per page, crawlable HTML. ◆◈ (Fireship, midulive, Easyweb; Google Starter Guide: headings "help users navigate"). The claim that words in headings weigh more for ranking is ◇.
- ◆ Relevant content comes before page experience ("Google Search always seeks to show the most relevant content, even if the page experience is sub-par"); Core Web Vitals are one input, measured on field data.
- [S] ◆ Sitemap, one canonical address (redirect www to the chosen host; `rel=canonical` is a strong signal, sitemap inclusion a weak one), HTTPS, descriptive link text.
- ◆◈ Structured data: JSON-LD preferred by Google; must match visible content; one source (plugin or hand-written, not both); test with the Rich Results Test. Google no longer shows FAQ rich results (changelog May 2026): do not add FAQ markup for display.
- ◆◈ Social previews: Open Graph tags; the protocol's required properties are `og:title`, `og:type`, `og:image`, `og:url` (description is optional); Meta recommends at least 1200 x 630 px and under 8 MB; re-scrape with the platform's debugger after changing an image.
- ◇ Bounce rate, dwell time and "200 ranking factors" (Fireship) are stated as fact without a source; not verified.
- Open question: Core Web Vitals as ranking signal is a small factor; do not oversell it to clients.

## Privacy and consent (new, round 2; EU law and regulators verified, other countries not)
- ◆◈ Non-essential cookies and similar tracking need prior opt-in; strictly necessary ones do not. Silence, pre-ticked boxes, scrolling or continued use are not consent.
- ◆◈ Tell the visitor what is set, for how long and who gets access; the banner must actually block scripts until consent (test it); consent must be as easy to withdraw as to give; refusing must be as easy as accepting.
- ◈ Installing a banner product does not make you compliant; the site owner remains responsible.
- ◆ A non-EU business is covered by GDPR when it offers goods or services to people in the EU (Art 3(2)); EDPB: legitimate interest cannot replace consent for Art 5(3) cookies; CNIL exempts audience measurement only under strict conditions.
- Not researched: Indonesian personal-data law, Australian, UK and US state rules. This must be checked with a lawyer before launch; the lesson should say so.

## Analytics (new, round 2)
- ◆◈ A conversion is an event you flag; GA4 calls the flag "key event" (renamed in 2024). Flag a specific success event (thank-you page, form success), never `page_view`.
- ◆◈ Name events consistently in snake_case; use Google's recommended names where they exist.
- ◈ Test before you trust (GTM preview/Tag Assistant, real-time report, DebugView); reports lag, allow a day or two (the ranges differ by author; Google's own lag figures not verified).
- ◈ Google Tag Manager is the usual way to send events, and it adds a third-party script: list it, and connect it to the consent banner.
- ◇ "Up to 30 key events" and similar limits were stated by one author and not verified.

## Domains, DNS and hosting hand-off (new, round 2)
- ◈ The client should own the domain (and ideally hosting and billing accounts); the developer gets delegated access.
- ◈◆ Know the common records (A/AAAA, CNAME, MX, TXT); TTL is cache lifetime, so changes appear as caches expire; verify from outside your own cache after each change. Propagation times differ by author (minutes to 48 hours) and are not resolvable from primary pages; one video's Cloudflare TTL claim contradicts Cloudflare's own docs.
- ◆◈ Email from your domain needs SPF, DKIM and DMARC records.
- Use the hand-over checklist in `answers/12-domains-dns-hosting.md` section D.

## Security (matters once there is a form, login or database)
- [V] Validate on the server; escape output (never insert user input as HTML); parameterised queries; deny-by-default access control checked on the server. ◆ OWASP Top 10 is now the **2025** edition (several videos describe 2021); broken access control is still first.
- [V] Auth cookies: HttpOnly, Secure, SameSite; anti-CSRF tokens on state-changing requests.
- [V] Keep dependencies and plugins updated; MFA and no default credentials; CSP when third-party scripts exist; keep installs minimal and configs consistent; log failures. ◈ (Round 2 added business-logic abuse: enforce quantities, discounts, coupons on the server.)
- Our rule for AI-built sites: no secrets in client code or repo; list every third-party script and why it is there.

## Working with AI on code (professional habits) and accepting AI work
- [V] Verify, never trust: run tests/checks; read what changed and be able to explain it; commit often so every step is reversible (reset rather than stack fixes). ◈
- [V] Plan first (in a file or in plain language), review it, then build in small steps. ◈
- [V] Precise context and constraints (a rules file plus a specific prompt); human keeps the architecture and the risky parts; use the model to explain unfamiliar code. ◈
- [V] Prefer a few end-to-end tests over many low-level tests; the human must understand what the tests check. ◈
- [V] Periodically simplify AI output so it does not rot.
- [C] Design: pick a concrete direction before coding; avoid template defaults; spend boldness in one place; build to a quality floor (responsive, focus, reduced motion, contrast). Plan, check the plan against the brief, build, then critique with screenshots (Anthropic frontend-design; matches our Impeccable workflow).
- ◇ Vendor note: the Anthropic and YC talks come from tool vendors; sponsorship is listed in `answers/13-accepting-llm-work.md` section D.

## Known disagreements (do not force a rule)
- Formal research methods vs empathy-first (and corridor tests with acquaintances vs real usability tests); optical vs mathematical spacing; ARIA caution vs ARIA-aware CSS; where to store auth tokens; no-code vs hand-coded builds; whether vibe coding is acceptable (yes with tests and guardrails; prototypes may be loose, client work goes through the gate); must you read all AI code (two say yes, one says verify an abstraction instead).
- Native HTML validation vs custom; disabled submit buttons; labels-optional vs labels-required; AA as floor vs AAA as goal.
- Is audience measurement exempt from consent (strict conditions, regulator by regulator); should banners be optimised for acceptance (clarity yes, coercion no).
- Hosting and billing ownership (client, developer, or shared); DNS propagation times.
- Serif vs sans on screens; self-hosted fonts vs Google Fonts (measure); variable fonts vs static.
- File-size targets for images (about 400 KB vs under 100 KB); contact forms on portfolio sites.

## Gaps still open
- **Legal and compliance beyond the EU**: Indonesian (and Australian, UK, US) privacy and consent rules; booking-specific legal text (terms, refunds); not researched at all.
- **Travel and hospitality specifics**: photography briefs and art direction for destinations, number of photos per tour page, video hero loops, model releases for identifiable people, alt text for atmospheric photos; booking-form patterns (date pickers, group size, payment); no source found.
- **Typography**: pairing theory, brand-typeface selection, Cyrillic/Latin typesetting details; typography evidence rests on one author for most items (Pamental) plus dated tutorials.
- **Analytics**: GA4 specifics are stated by few authors and Google's lag and limit figures are unverified (the "30 key events" statement); Search Console workflows beyond the Core Web Vitals report; UK ICO statistical-exception detail not read.
- **Hosting**: Cloudflare Pages/other host specifics for hand-over are partly verified (TTL); propagation timing unresolved; backups and monitoring not covered.
- **Search**: local SEO (Business Profile), multilingual `hreflang` for an English plus Russian/Indonesian site, how much each on-page factor matters (all evidence is Google's own or course sellers').
- **Numbers still not primary-verified**: image byte budgets, Osmani's page-weight budgets (only critical CSS ~14 KB found), mobile traffic share, Baymard figures beyond the 2024 averages cited, GA4 report lag.
- **Source quality**: 12 machine-translated captions are weak evidence; the strongest consensus rules rest on 3-6 authors, many of whom sell courses; several digests of long videos (Soy Dalto, Polito, UPROCK, Minin, midulive x2, Akita) were built from outline sampling and are marked so in their headers.
