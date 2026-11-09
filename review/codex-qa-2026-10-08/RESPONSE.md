# Response to the Codex QA report (8 Oct 2026)

| # | Finding | Decision | What was done |
|---|---|---|---|
| 1 | Travel agents, 844x340: photo captions over destination names | Fixed | `wf.css`: short panels keep their copy in flow under a 56 px caption zone; at height ≤ 560 px the card takes its text height. |
| 2 | Admin → Reviews: form visible while `hidden` | Fixed | `admin-simple.html`: `[hidden] { display: none !important }` (`.card` grid beat the attribute). |
| 3 | Admin: Delete, + Add photos, + Guest photo, Agents filter did nothing | Fixed | Delete removes the review; both photo buttons open the file dialog (picked files appear as tiles / on the button); New / All / Travellers / Agents filter the enquiries. Tested: agents 1/3, travellers 2/3, no console errors. |
| 4 | Penpot: block numbers and photo specs missing on 36 boards | Fixed (regression from the same day) | `extract.cjs` relied on notes mode remembered in the shared Chrome profile, which had been switched off. Now `extract.cjs`, `qa.cjs`, `export-check.mjs` open pages with `?notes=1`. 37 boards redone, `final-check.mjs` 48/48 clean. |
| 5 | Penpot Admin boards: "Open the site ↗" has no hotspot | Kept | Penpot links only work inside one page; the site boards are on another page. Minor. |
| 6 | Emails and Admin covers: no link per board | Kept | Penpot's own arrows and board list reach every board. |
| 7 | "Read on Google" goes to `#` | Kept, intentional | External link like Instagram and WhatsApp: off in the prototype. |
| 8 | Home, 768x950: Guest story media 960 px tall | Fixed | `wf.css`: phone/tablet 4:5 story media capped at the window height. |
| 9 | No legal links on unavailable / cookie state pages | Kept, intentional | Maintenance page and one-screen state overlays; the real pages carry the footer. |
| 10 | Footer order differs from the menu | Kept, intentional | Footer is grouped in columns (travel / company / trade), not a copy of the menu. |
| 11 | Emails and Admin covers said "version 4 · 5 October 2026" | Fixed | Both now read "v5 · 7 October 2026", checked in View mode. |

After the fixes: `fit-check.cjs` all rules pass, `overlap-check.cjs` TOTAL 0, `impeccable detect wireframes/` exit 0, Penpot `final-check.mjs` 0 problems, prototype redeployed to https://islands-1000-prototype.pages.dev and checked live.
Penpot rollback versions: "v5 before browser-height boards · 8 Oct 2026", "v5 640 before notes fix · 8 Oct 2026".
