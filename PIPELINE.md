# 1000 Islands Travel — Working pipeline

**Agreed:** 4 October 2026. Applies to this project and is the template for the next ones.
**Principle:** the process is what makes a solo studio look professional, not the tool. Each stage ends with a written sign-off before the next one starts.
Markers: ◆ confirmed · ◈ likely · ◇ our proposal.

## Stages and sign-offs

| # | Stage | What the client sees | Sign-off |
|---|---|---|---|
| 0 | Brief + offer: scope, 2 revision rounds per stage, payment by milestone | Offer document | Signed offer + deposit |
| 1 | Structure: sitemap, page list, menu | `STRUCTURE_v3.md`, sitemap | Written "structure approved" |
| 2 | Grey clickable prototype (this stage, ◆ built) | Penpot View-mode link + HTML prototype | Written "prototype approved" (approval point #1) |
| 3 | Visual direction: 2–3 directions for the home hero, then the key pages | Links to HTML variants (Penpot only if the owner wants a canvas) | Written choice of direction |
| 4 | Content: copy and photos, collected from Stage 1 onward | A checklist of what we need from the owner | Checklist complete |
| 5 | Build on a staging address + feedback widget | Staging link | Written "ready to launch" |
| 6 | Launch, handover (CMS training, accounts on the owner's company), support | Live site | Handover note + final payment |

Rules across all stages:
- One decision-maker on the client side signs off; feedback arrives in one place, not in chat threads ◆ (agency practice).
- A sign-off is a written message ("approved"), dated. "Looks good" on a call is not a sign-off ◆.
- Feedback window 5–7 working days, otherwise the stage counts as accepted ◈ (common agency term; agree it in the offer).
- Changes after sign-off or beyond the agreed rounds are a change request with a time/price estimate ◆.
- Grey and rough on purpose until Stage 3: low fidelity keeps the discussion on structure, not colours ◆ (NN/g).

## Tools

- **HTML is the source of truth** (`wireframes/`). Every change is made there first.
- **Penpot = presentation mirror** (free plan, View mode link for the client). Re-sync with `tools/penpot-sync/` after HTML changes. Not the place to edit.
- **Feedback on the prototype:** the client comments in Penpot (needs a free Penpot account ◈) or by message referring to the block labels ("05 · Flagship story"). Optional later: Uxnote (MIT, one script, no server) on the HTML prototype.
- **Feedback on staging (Stage 5):** a widget that files comments with screenshots: SitePing (MIT, needs a small database) or BugDrop (MIT, comments become GitHub issues) ◇.
- **Quality gate before anything goes to the client:** `impeccable detect wireframes/` exits 0; `tools/penpot-sync/fit-check.cjs` prints "all rules pass" (screen-fit rules, `LAYOUT_RULES.md`); `tools/penpot-sync/overlap-check.cjs` finds no overlapping text; `tools/penpot-sync/qa.cjs` pixel-compares every Penpot board with the HTML.

## Before sending a prototype link (checklist)

1. Every page reachable from the menu, every "next step" leads somewhere; no dead ends ◆.
2. A cover screen says what the grey boxes mean and what is not clickable on purpose (WhatsApp, email, downloads, in-page jumps) ◆ (prototype reviews read unclickable buttons as "broken").
3. Desktop and phone both present; the phone menu opens.
4. States exist: form errors, sending failed, thank-you, 404, maintenance, cookie banner.
5. Legal pages linked from the footer: Privacy & cookies, Booking terms.
6. Names consistent across pages and boards; the file is named with version and date.
7. The Penpot file shows a green dot (saved) before the link goes out.
8. Screen fit checked on laptop sizes, not only 1440x900: `fit-check.cjs` passes on all 10 reference screens (`LAYOUT_RULES.md`).

## Status on 5 October 2026 (v4)

- Prototype v4: 8 site pages + 2 thank-you (trips with a days slider live on the region pages; no journey pages), one admin screen with four tabs. HTML in `wireframes/`, Penpot file "1000 Islands · Wireframes v4 · 5 Oct 2026" rebuilt from it: 48 boards + 4 covers, every board checked against the HTML (`tools/penpot-sync/export-check.mjs`).
- Open questions for the owner: `review/2026-10-05_internal-walkthrough-notes.md`.

## Status on 4 October 2026 (v3, superseded)

- Stage 2 prototype: 15 site pages + privacy, booking terms, 404, maintenance, cookie banner/settings, form states, 3 auto-emails, link previews, 4 admin screens; desktop and phone; mirrored in Penpot (4 pages, 58 boards + covers, 1141 links).
- Waiting for the owner: leads tool choice (the admin screens fix the fields, not the look), booking-terms content (deposit, cancellations, currency), legal check of Privacy.
- Copy is placeholder at this stage. One visible inconsistency to settle in Stage 3 copy: "Plan Your Journey" (menu, page title) vs "Plan your journey" (some buttons).
