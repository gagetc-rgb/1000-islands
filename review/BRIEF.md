# Review brief — 1000 Islands Travel wireframes v1 (2 Oct 2026)

## What is being reviewed
Low-fi HTML wireframes of the 4 page templates from `STRUCTURE_v3.md`, built on 2 Oct 2026:

| Template | File | Used for |
|---|---|---|
| 01 Home | `wireframes/home.html` | Home |
| 02 Landing | `wireframes/landing.html` (shown as Raja Ampat) | Raja Ampat, North Sulawesi, Private Yachts, For Travel Advisors |
| 03 Journey | `wireframes/journey.html` | 4 journey pages |
| 04 Content / form | `wireframes/plan.html` | Plan Your Journey (+ About, Stories, thank-you pages) |

Shared CSS: `wireframes/wf.css`. Live on `http://localhost:5173/<file>` while the dev server runs.

**Screenshots** (full page, split into readable parts): `review/shots/<page>-desktop_partN.png` (1440 wide) and `review/shots/<page>-mobile_partN.png` (390 wide). Read ALL parts of every page in both widths before judging. The un-split files `<page>-desktop.png` are too tall to read; use the `_partN` files.

The wireframes are **grey on purpose** (structure + draft copy, no visual design yet). They are what the owner will see at **approval point #1: "structure without final design"**. Visual design comes in the next stage (2 moodboard directions → key screens). Judge "style" as layout, hierarchy, rhythm, composition and how well the skeleton sets up a premium design later — not as colour or imagery. Do say if the grey wireframe itself would make a bad impression on the owner.

## The business (short)
- Private, tailor-made journeys in remote eastern Indonesia. Two regions at launch: **Raja Ampat** (Central RA, Misool; Triton Bay as "beyond") and **North Sulawesi** (Bunaken, Lembeh, Sangihe & Siau; Halmahera & Widi as "beyond"). Plus **Private Yachts** (phinisi, luxury, one flagship luxury trip with a helicopter) and a **B2B section for travel advisors**.
- Owner has run trips for 8 years; average spend historically $2–2.5k pp but has run luxury trips. Price display: "from $X" by number of days, no configurator. Reply within 24 h, 7 days a week.
- Target B2C market: **Australia** (user decision). B2B: outbound outreach to travel advisors; the site is proof for that engine.
- Brand: "1000 Islands Travel · Remote Indonesia"; name collides in search with the US/Canada Thousand Islands and Jakarta's Kepulauan Seribu (see PLAN.md H6).
- Positioning order: desire = "off the map", promise = "made easy", proof = "we've done it many times" (PLAN.md H2).

## Sources of truth — read before reviewing
1. `STRUCTURE_v3.md` — the approved-for-owner structure. **Primary spec** the wireframes must match.
2. `PLAN.md` — work plan, hypotheses H1–H8, decisions, scope (§0a), risks. Note the scope: fixed price IDR 35m, 4–6 weeks, small CMS, simple leads system.
3. `SITEMAP.md` — older sitemap (v0.1) with a v0.3 update at the top; section outlines for templates T1, T2, T5, T7, T8, T10 (§5). Where it conflicts with STRUCTURE_v3, v3 wins.
4. `1000-islands-website-ux-content-structure.md` — PART 1 is the **owner's own copy** (master material for the text). PART 2+ is an earlier UX review (hypotheses, not truth).
5. `1000-islands-travel-strategy.md` — owner interview / strategy.
6. `Offer_Sent_to_Owner.md` — what was actually promised (Russian).
7. `research/competitor_structure.md` — competitor structure scan.

## Rules for every reviewer
- **No invented facts.** If you state a market fact, a best practice, a conversion statistic or a competitor detail, either cite a source (URL) or mark it as your opinion. If you don't know, say so.
- Mark every factual claim: ◆ confirmed (source or project file) · ◈ likely · ◇ disputed / opinion.
- Prefer primary and research sources (Baymard, Nielsen Norman Group, GOV.UK style, published studies) over blog opinion. Web search is allowed but keep it light (time-box ~10 min); do **not** use Firecrawl.
- Be concrete: page → block number → what is wrong → why it matters (selling / trust / clarity / SEO / mobile) → the fix. Quote the exact current text when criticising copy.
- Severity on every finding: **P1** must fix before the owner sees it · **P2** should fix in this stage · **P3** later / nice to have.
- Do not edit the wireframe files. Write only your own report file.
- Write the report in English. Be direct; no praise padding. Short "what works" list is fine (max 5 bullets).
