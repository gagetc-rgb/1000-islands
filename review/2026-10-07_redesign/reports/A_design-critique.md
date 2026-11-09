# A · Design critique (Assessment A only) · v4 grey prototype · 7 Oct 2026

Method: Assessment A of `impeccable` critique.md (design review). The detector and the penpot-sync checkers were deliberately not run and no other agent's report was read. Evidence: `shots-v4/` (1440x790, 390x664), my own captures in `A-shots/` (1440x790 @1x, 1366x657, 1920x950, 360x640, full-page desktop in `A-shots/full/`), DOM measurements made with headless Chrome, and source (`wireframes/*.html`, `wf.css`, `wf.js`). Benchmarks were opened today with headless Chrome. The screenshots are in `A-shots/benchmarks/`.
Markers: ◆ measured or seen (source given) · ◈ likely · ◇ opinion.

---

## Heuristic scores

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Good: active nav, scroll-spy tabs, live slider price, the chosen trip carried into the form ("Your trip: …"), and the "1 / 3" pager. Gap: thank-you does not repeat what was sent or when the reply will come. |
| 2 | Match with the real world | 3 | Plain language and honest "from $X pp". "Where we go" lists Yacht charters, which is a format and not a place. "Not included: flights to Sorong" appears 3× with no link to how you get to Sorong. |
| 3 | User control and freedom | 3 | Accordions, tabs, pager and back links work. The "change" link on the picked trip is `history.back()`, which fails when the form is opened directly (◆ `wf.js` §2). |
| 4 | Consistency and standards | 3 | Templates are consistent. Sibling sections use two heading sizes (40px h2 vs 22px `h2.h3` on home). "Read the story →" on Yachts/Advisors opens a card that holds no story. Tab "Proof" sits on a heading called "Track record". Area cards are 4:5 on Raja Ampat and 4:3 on North Sulawesi. |
| 5 | Error prevention | 3 | Constrained slider (3–21), chips and selects, prefill from trip cards, "(optional)" marked. |
| 6 | Recognition rather than recall | 3 | On phones the three trip levels are a sideways carousel, so prices are compared from memory. |
| 7 | Flexibility and efficiency | n/a | Persuade surface with no power-user role. WhatsApp serves as the alternative path. |
| 8 | Aesthetic and minimalist design | 2 | Box, pill and border density; 12 font sizes on a region page; two filler strips on home; a wall of 23 boxes on Travel agents. |
| 9 | Error recovery | 3 | Designed error and failed-send states that keep the input and offer WhatsApp or email as fallbacks (◆ `state-form-*.html`). |
| 10 | Help and documentation | 3 | FAQ on every landing, "Details in FAQ" next to the trust list, a named human with a reply time. |
| **Total** | | **26/36 (72%)** | **Good.** Navigation and click paths are solid. What holds it back is composition and the premium layer. |

## Design-specificity verdict

**Mostly interchangeable with any tailor-made travel template** (◇). Home runs: video hero → map + three bordered cards with pills → 4-step strip → story band → three review cards → B2B strip → dark CTA → five-column footer. Replace "Raja Ampat" with "Tuscany" and nothing structural changes. The parts that are genuinely this product's own are good and should stay:

- the days slider with a live "from" price that carries into the form. The competitor scan found no one showing honest prices (◆ `research/competitor_structure.md`);
- "the person who answers you", with a face and the 24 h / 7 days promise;
- "Diving: Optional" as a key fact.

The missed character is **"off the map."** Remoteness and distance are the story, yet the maps are grey tiles sitting in rows of cards. "Made easy" is four words in a 110px strip. A confident version would make one thing signature-level, used once and large: an editorial map of the eastern archipelago, or the journey from Bali to the boat. It would also cut the small repeated map tiles.

## Overall impression

The IA is right and lean. Seven menu items, region pages in the order the sector expects, one form, contextual CTAs. The layout, though, reads as a component library rather than an art-directed site. Images stay small after the hero, everything is boxed, and the type has many small steps but no drama. The owner's instinct about the first screen is correct, and it is a symptom of the larger issue: **the page is sized for "fit" rules, not for creative impact.** The biggest opportunity is fewer, larger images, unboxed photo tiles and a tighter type scale. All of that can be done at the grey stage, before any colour or typeface.

## What's working (keep)

- **Region page order:** hero → key facts → tabs → why go → trips and prices → reviews + FAQ → CTA. This is canonical for the sector. Steppes uses in-page tabs the same way (◆ competitor scan), and it is short (◆ 5 sections).
- **The trips mechanism:** slider, three levels, prefilled form, trust list (deposit, team 24/7, medevac) placed exactly at the price moment. This is the right reassurance at the highest-stakes point.
- **The home story band** (full-bleed muted video, "Nine days in Raja Ampat"). It is the one moment that is genuinely image-led and emotional.
- **Human contact everywhere** (face + reply time) and a contextual sticky bar on phones ("Get trade rates" on the agents page).
- **The Travel agents first screen on desktop:** one primary button, a text link, the named contact and "Operating X years" in the facts band. This is the best-composed hero on the site (◆ `A-shots/1440x790_advisors_00.png`).
- **Designed states:** errors, failed send, and a thank-you with a WhatsApp next step.

## Priority issues

**1. [P1] Home: the hero hands over to an orphan heading, not to destinations.**
- What: at 1440x790 the hero is 586px, 74% of the viewport (◆ measured). The remaining ~130px is white band, an annotation tag and "Where we go" alone. The cards start below the fold at 1366x657, 1440x790 and 1920x950, and also at 390x664 (◆ `A-shots/*_home_00.png`). The rule behind this is LAYOUT_RULES R1 for home.
- Why it matters: NN/g recommends letting content peek below full-screen heroes so users scroll (◆ Flaherty, "The Illusion of Completeness", nngroup.com, 2016). The rule took that literally and made the peek a heading on white. A heading is the weakest cue, it costs about 18% of the strongest asset, and it reads as a page break. Benchmarks seen today: Jacada desktop uses a full-screen hero with no peek. Jacada on phone peeks the heading plus the tops of the destination photos. Black Tomato uses a full-viewport video with a "Scroll" cue. Audley ends its hero at about 90% on a coloured band (◆ `A-shots/benchmarks/`).
- Fix: rewrite R1 for home as **"the first screen ends with the top 64–120px of the next block's imagery visible."** Make the hero `calc(100svh - header - ~96px)` on desktop and about 88svh on phones. Start "Where we go" with the photos, not a heading block: put the heading to the left of the tile row or overlay it on the first tile, so the photo tops are what peeks. Keep "See destinations" as a quiet text link. One button in the hero.
- Command: `/impeccable layout`

**2. [P1] "Where we go" is a row of boxes, not a destination showcase.**
- What: the map placeholder (1.3fr) is the largest object in the row. Destination photos are 237px tall at 1440x790 (◆ `clamp(160px,30vh,380px)`), and the card bodies (title, 2–3 pills, hairline, price) are as tall as the photos. There are 8 pills on home (◆ count). Yacht charters is listed as a "where".
- Why it matters: this is the first decision a B2C visitor makes, and it is the moment the site promises "strong creative." Right now it looks like a product grid.
- Fix: **two tall region tiles** (Raja Ampat and North Sulawesi, about 70svh, title + "from $X pp" on a bottom scrim, no border, no pills; the sub-areas already live on the region pages). Below them, **Yacht charters as one wide 21:9 band** ("or take the whole boat"). That band becomes the single "quiet luxury" moment. The map shrinks to a small locator inset on each tile, or one slim strip. It should not be a tile competing with the photos. Audley overlays titles on photos for its destination tiles, and Jacada pairs one large photo with a typographic list (◆ benchmarks).
- Command: `/impeccable layout`, `/impeccable distill`

**3. [P1] Phone landing heroes show almost no picture.**
- What: Raja Ampat at 390x664 has a 378px media area, of which copy covers 240px (title, two lines, two full-width buttons). The clear image above the title is 138px, including the 48px label row. At 360x640 the Travel agents hero has 53px of clear image (◆ measured). The 5-fact band (3+2 grid) and the tabs fill the rest.
- Why it matters: on a phone the brand's first impression is a dark box of text. That hurts most for an image-led brand selling by desire.
- Fix (phones only): one hero button ("See trips and prices"); the second CTA already lives in the burger and the sticky bar. Show 3 facts in one row (Best months · Trip length · From) and move Where and Diving lower. Drop the "tabs row closes the first screen" requirement on phones, where the tabs do not stick anyway (◆ `wf.css` `.subnav{position:relative}` ≤768). Target: at least 55% of the first phone screen is uncovered image (◇).
- Command: `/impeccable adapt`

**4. [P1] Travel agents page: a tile wall, with proof buried in the middle.**
- What: 23 boxed elements (◆ count), 6128px tall at 1440 (about 7.8 screens) and 16 phone screens (◆). There are 7 tabs. "What we handle" is six icon + heading + text tiles, which is exactly the house-banned pattern (◆ BRIEF house rules). Licences and insurance appear in block 05, roughly the fourth screen.
- Why it matters: the strategy calls this page the site's main commercial job. The advisor checks after a cold email whether you "genuinely operate… look professional" (◆ strategy §11). A tile-grid DMC look is also what the generic competitors use (◆ competitor scan: Kija, Explera).
- Fix, in this order: hero (keep it) → **Track record** (licence, insurance, membership, one case study, two agent quotes) → **How we work with you** (the 6 terms as a two-column definition list, no boxes, with "Indonesia is easy. Until it isn't." as its heading and the "What we handle" items folded in as one sentence list) → What you can sell (reuse the home photo tiles) → booking steps as one line → FAQ → form. At most 4 tabs. Goal: no more than 5 desktop screens.
- Command: `/impeccable distill`

**5. [P2] Home middle: the two weakest blocks carry two strategic pillars.**
- What: "Remote, made easy" (the promise) and "For travel agents" (B2B, priority #1) are both strips about 110px tall with 22px headings, beside 40px section headings (◆ `h2.h3`). Home switches background 8 times across 7 blocks: dark, white, white strip, dark, grey, grey strip, dark, grey footer. The "Travel agents" nav item is greyed out (◆ `.nav a.secondary`).
- Why it matters: the strategy asks for a "strong homepage CTA for professional partners" (◆ strategy §8). The promise "made easy" is asserted, never shown. And home has no "8 years, N trips" proof at all.
- Fix: merge the steps with proof into **one** section at h2 size: the four steps as a single typographic line plus three proof figures (years, trips run, Google rating). Replace the B2B strip with a real split row: team-on-the-ground photo, "Travel agents: let us handle Indonesia", 2–3 terms, button. Give the nav link the same weight as the others.
- Command: `/impeccable layout`

**6. [P2] Region pages: image scale never rises after the hero, and three primaries compete.**
- What: at 1440x790 the largest image after the hero is the bento lead, about 584×348px. Bento and trip photos are 166px tall (◆ `clamp(120px,21vh,260px)`). Images are about 33% of the page area on Raja Ampat and 29% on Yachts, against 46% on home (◆ measured). The area cards carry grey lines under every photo. The three trip cards each have a dark primary button (◆ 3 `.btn.primary`).
- Why it matters: "minimalism with strong creative" needs scale contrast, with one big moment per screen. Uniform small tiles read as a catalogue. Three equal primaries remove the natural anchor on the tier the core buyer is most likely to choose.
- Fix: in "Why go", use one near-full-bleed video (about 70svh) and two supporting photos instead of five equal tiles. Areas become the map (5/12) beside a typographic list of three areas with one small photo each, as Jacada does on its home (◆). Trips: the card itself is the link, Comfort keeps the one filled button, and the others get text links. That is the compromise effect: middle options gain share (◈ Simonson, Journal of Consumer Research, 1989).
- Command: `/impeccable bolder`, `/impeccable layout`

**7. [P2] The system: too many type steps, too many boxes and pills.**
- What: 12 distinct font sizes on Raja Ampat (64/40/24/22/18/17/16/15/14/13.3/13/12) (◆ measured). The jump from 40 to 22 has nothing in between. Small uppercase tracked labels appear in 5 places (key facts, route stops, the plan timeline, footer headings, logo tagline). Every photo sits inside a bordered card, and the dashed section rules (an annotation artefact) add false floors.
- Fix: a six-step scale (hero display 72–96 · h1 56 · h2 40 · h3 24 · body 18 · small 14). Every section heading at h2. Unbox photo cards (photo, then text, no frame). Keep borders only on inputs, FAQ rules and the facts band. Pills only in forms.
- Command: `/impeccable typeset`, `/impeccable quieter`

**8. [P2] Phones: the trip carousel hides the comparison the slider exists for.**
- What: Basic, Comfort and Premium sit at 84% width side by side, so only one price is visible (◆ `.grid.scroll`).
- Fix (phones): stack three compact rows under the slider (88px thumbnail, level, lodge line, price, chevron), so all three prices change in view.
- Command: `/impeccable adapt`

## Persona red flags

**Australian couple, early 50s, Brisbane, first Raja Ampat trip, about $2–2.5k pp, one of them does not dive** (from BRIEF; persona detail ◇). They arrive from Instagram on an iPhone at the Raja Ampat page. The first screen shows a grey box with a title, two buttons, 5 facts and tabs, and they cannot see the place (#3). "Diving: Optional" reassures them. They swipe to compare levels, but only one price shows at a time (#8). "Not included: flights to Sorong" appears three times with no answer nearby; the answer sits in the FAQ two blocks down. They want to know what a day looks like, but the real 9-day route only exists on Guest stories and nothing on the region page links to it. Fix: put "See a real 9-day trip →" under the trips and turn "flights to Sorong" into a link to the FAQ answer. On About they find four empty circles instead of the people and the 8 years.

**Independent travel agent, Sydney, opens the cold-email link on a laptop between clients, gives it 60 seconds.** The hero is good: a contact, "X years", one button. Then two screens of boxes before anything verifiable (licence, insurance) at about the fourth screen (#4). Seven tabs; "Proof" in the tabs is "Track record" in the heading. "Commission or net rate" is a tile title with no number (owner question still open ◆ walkthrough notes). If she checks home, B2B is a grey strip near the bottom with a skeleton line, and the nav link is greyed (#5). She judges "do they look professional?" from a page that looks like a generic DMC template.

**Casey, distracted phone user.** The sticky bar is well behaved (hidden over hero, forms and footer). It still stacks under the CTA band's identical "Plan your trip / WhatsApp us" pair on every page (◆ `sheets-v4/390x664_*`). Hide it while `.cta` is in view.

## Cognitive load

Failures: **chunking** (Travel agents 6 + 6 tiles), **minimal choices** (main nav has 7 items; the agents tab row has 7), **working memory** (the phone trip carousel). **Visual hierarchy** partly fails (sibling headings at 40 and 22px). Single focus, grouping, one-thing-at-a-time and progressive disclosure (FAQ accordions, prefilled form) pass. **3 failures + 1 partial: moderate; high on Travel agents.** Decision points with more than 4 options: main nav (7), agents tabs (7), region key facts (5).

## Emotional journey (B2C)

Peak: the home hero video, then cut short by the white band. Valley: "Where we go" (catalogue boxes) and the "made easy" strip (a promise without proof). Peak: the story video band. Steady: reviews and the CTA with a face. On a region page, desktop anticipation is fine but the phone hero is a valley. At the high-stakes price moment the trust list is in the right place; the Sorong flight question is not. **End: the thank-you is the weakest page on the site.** It has a title, a skeleton line and two buttons (◆ `thank-you.html`). By the peak-end rule this is the moment remembered. Give it the face of the person who will reply, a concrete reply window, a recap of the picked trip, and one large photo.

## Page by page

**Home.**
- First viewport: see #1. The hero has three CTAs (header, "See destinations", "Plan your trip"); keep one.
- Order: hero → destinations → (merged proof + made easy) → story band → reviews → B2B split → CTA. The order is fine once the strips are merged. Reviews could sit on white under the story so the background does not change.
- Where we go: see #2. The story band (70svh) is the right size; make the destination tiles feel like the same family.

**Raja Ampat / North Sulawesi.**
- Desktop first viewport works (photo, title, CTA, facts, tabs on a clean edge). Phone: #3.
- The two pages are structurally identical. Give each one signature image moment (◇ e.g. karst aerial; Siau volcano) so they do not read as one template.
- Key facts repeat "From $X pp", which is fine as an anchor.
- Bento: #6. Trust list: keep. Reviews + FAQ split: keep.

**Yachts.**
- "Why a yacht" sits as a 48px statement beside a 4:5 photo with a lot of air. That is the most editorial block on the site; keep the idea, make the photo larger.
- Boat cards carry 4 pills each (12 on the page ◆); write one spec line instead.
- The hero facts say "from $X per day" while the cards show a total "whole boat" for N days. Label the cards "for 7 days".
- "Where we sail" (map + two 21:9 cards) repeats the home destinations. Merge it into the facts band, or put one sentence and the map beside the boats.
- The FAQ sits half-width on white with an empty right half; pair it with something or centre it.

**Guest stories.**
- First screen is title + featured video; it works at all sizes measured (◆).
- Story 2 and 3 cards offer only "Plan a similar trip". Yachts and Agents link "Read the story" to a card with no story. Fix: expand the card in place (no new page).
- The meta line above the h2 on the photo ("Comfort · X days …") is a kicker, banned by the house rules; move it under the heading. The same applies to the home story band.
- Annotation "02" is used twice.

**About.**
- The first screen is h1, five skeleton lines and four 231px empty circles in a 2x2 grid. That is a corporate team-grid look.
- For a founder-led, 8-year business, open with one large field photo (the team on a boat, on the ground) and the years and trips numbers. Put people as a row of smaller portraits with names under that.
- "How we travel" (text + 4:5 photo) is fine.

**Travel agents.** See #4. The hero is the best on the site; keep it.

**Plan.**
- A clean two-column layout on desktop. On phones the form comes first and "What happens next" plus the face come after the send button, so the reassurance arrives late. Move the face and "reply within 24 h" into one line above the form.
- The header CTA "Plan your trip" shows on its own page; give it a current state or hide it.

**Thank-you.** See the emotional journey above.

## Minor observations

- Annotation labels, photo tags and dashed section rules make the grey prototype look worse than its layout. Add a presentation toggle (e.g. `?clean`) for the owner's visual review (◇).
- On Travel agents the header's dark "Plan your trip" competes with "Get trade rates"; consider swapping the header CTA on that page.
- On Raja Ampat, "Details in FAQ" sits off the baseline of the trust list (◆ `1440x790_raja-ampat_03`).
- Footer column headings are semantic h2 at 13px uppercase. Acceptable, but they add to the micro-label count.
- The phone bento hides photos 4–5 (◆ CSS). Choose 3 photos on purpose rather than hiding 2.

## What I would challenge in LAYOUT_RULES

- **R1 home:** replace "next heading fully visible" with "next block's imagery peeks 64–120px".
- **R1 landings on phones:** do not force the tabs row into the first screen.
- **R2 "map beside cards"** produced the map-tile problem. Allow the map as an inset.
- R3, R4 and the height-aware clamps are sound; keep them.

## Questions to consider

- What if home showed only two destinations, each as large as the hero, and nothing boxed until the reviews?
- Does a first-time Australian visitor need a map tile, or a sense of distance ("two flights from Bali, then the boat")?
- What if "made easy" were shown by the story's route rather than claimed in four words?
- If the Travel agents page had to fit three screens, what would survive? That is the page.
- Is yacht charter a "where", or the one quiet luxury moment the brand is allowed?
