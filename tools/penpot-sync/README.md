# penpot-sync

Mirrors the grey HTML wireframes (`wireframes/*.html`, the source of truth) into the Penpot file, and checks the result.
Built and verified on 4 October 2026 (Penpot 2.18.1, MCP server 2.17.0). Rebuilt as v4 on 5 October 2026 (no journey pages, one admin screen with four tabs).

## What is where in Penpot

File "1000 Islands · Wireframes v5 · 7 Oct 2026" (renamed from v4 on 7 Oct), project "1000 Islands", account ga4a. Named versions are listed in the dated sections below; the latest rollback point is "before bar removal + notes fixes · 8 Oct 2026".

| Penpot page | Boards | Flow (View mode start) |
|---|---|---|
| Desktop | 00 Cover, 01–10 site pages, 11 Privacy, 12 Booking terms, 13 404, 14 Maintenance, S1–S4 states (1440 px) | Website · Desktop |
| Mobile | 00 Cover, the same 18 at 390 px, M1 open menu | Website · Mobile |
| Emails & previews | 00 Cover, E1–E3 emails at 760 px and 390 px, P1 link previews | Emails |
| Admin | 00 Cover, A1–A4 = the four tabs of `admin-simple.html` (Enquiries, Reviews, Photos & video, Prices) | Admin |

`board-ids.json` maps board names to Penpot ids (needed to update boards in place).

View-mode links (need a login to the ga4a account; for the client make a Share link instead):
- Desktop: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ad&section=interactions&index=0
- Mobile: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce251986e65&section=interactions&index=0
- Emails & previews: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce2552ae348&section=interactions&index=0
- Admin: https://design.penpot.app/#/view?file-id=19c47d73-0a5d-8067-8008-bcac4ff9f2ac&page-id=998cb9f0-5ded-8044-8008-bce2565ba647&section=interactions&index=0

## Re-sync after editing the HTML

1. Serve the wireframes: `python -m http.server 5173 --directory wireframes` (or the `wireframes` launch config).
2. Start the Penpot MCP server. A built copy (2.17.0) sits in the session scratchpad `…/aaeba677-…/scratchpad/pmcp/package`; start it with `pnpm run start` (pnpm from `…/scratchpad/tools/node_modules/.bin`). If that folder is gone, rebuild: `npx @penpot/mcp` fails on Windows; instead:
   `npm pack @penpot/mcp@<closest to the Penpot version>`, unpack, install `pnpm@11.9.0` locally, then
   `pnpm -r install && pnpm run build && pnpm run start` (MCP :4401, plugin :4400, WebSocket :4402).
3. In Penpot: menu ⋮ → Plugins → Plugins manager → Penpot MCP Plugin → Open.
   Connect without clicking inside the plugin (automated clicks do not reach its iframe): in the page console, post
   `{type:'start-server'}` to the iframe whose src is `localhost:4400` (it sits inside a shadow root).
4. `npm i`, then:
   - `node extract.cjs ["about|plan"]` → `pages.json` (optional argument = page keys to re-extract; they are merged into the existing file; renders every page at 1440 / 760 / 390 px; only visible elements; pseudo-elements materialised; native inputs, sliders and checkboxes turned into plain boxes first (Penpot cannot see them); admin tabs clicked one by one; text split into visual lines; browser z-order; pinned header and bottom bar flagged)
   - `node qa.cjs` → rebuilds every board from `pages.json`, screenshots it next to the live HTML in `qa/` and prints the pixel diff per board (v4, 5 Oct: all ≤ 0.6 %, anti-aliasing only)
   - `node push.mjs redo "<board name>|<board name>"` → redraw changed boards in place (keeps ids, so links into them survive)
   - other modes: `setup ["Page,Page"]` (wipes and recreates the boards of all or the named pages; resumable), `resume [Page]` (draws missing / partial boards), `links`, `covers`, `labels`, `fixdiag`, `titles`, `verify`
   - before a full rebuild, save a named version: `penpot.currentFile.saveVersion("…")` via `mcp-call.mjs`
5. Keep the Penpot tab in front while it works, and do not close it until the dot next to the file name turns green (orange = changes not yet saved; View mode shows only saved changes).

## Gotchas found the hard way

- Every plugin call times out after 30 s but keeps running: verify by counting board children, never trust the reply.
- `openPage` is asynchronous: wait until `currentPage.id` changes. Heavy pages (Mobile) take 1–2 min to open and freeze the tab meanwhile.
- A shape named "/" throws ("Value not valid … :name"). Fully transparent shapes are not clickable in View mode: link hotspots use 1 % white.
- View mode lists boards in reverse creation order, not layer order: create the cover last.
- Closed `<details>` content still has layout boxes: use `checkVisibility()`.
- Penpot re-wraps text differently from Chrome: always place one text per visual line (auto-width).
- Browser z-index decides what is on top (labels over photos, open menu over the hero, dialog backdrop over the sticky bar): `extract.cjs` sorts items by stacking order; `qa.cjs` catches any mismatch.
- Texts created by the plugin can be invisible in View mode until Penpot lays them out: open the page, put the board on screen (select it, Shift+2), run `relayout-cover.js` (or the same trick on the affected board), wait for the green dot, then check View mode. Never toggle grow type on fixed-width (auto-height) texts: they lose their width.
- Always check View mode after the dot turns green: it shows only saved changes.
- The `labels` step must skip the open-menu board (M1): the menu covers the labels on purpose.
- If Chrome's window or page zoom makes the canvas tiny, screenshots time out; read the DOM instead, or check boards through `export-check.mjs`.
- Stopping the background `pnpm run start` only kills the wrapper: the MCP node servers keep running (a second start fails on the busy ports, which is harmless).
- Never `taskkill /IM node.exe`: it also kills the MCP servers (4400–4403). Start them from PowerShell (`$env:PATH = "<tools>\node_modules\.bin;" + $env:PATH; cd <pmcp\package>; pnpm run start`); under Git Bash the pnpm shim resolves a wrong path.
- The Penpot tab must be *visible*, not just open. A locked screen, a window covered by another one, or a tab that is not the active tab of its Chrome window gives `document.visibilityState === "hidden"`: `requestAnimationFrame` never fires, `#app` stays empty and everything looks frozen. Check that first. With Claude in Chrome the MCP tab group can live as a background tab inside the user's window: close the group (`tabs_close_mcp`), recreate it (`tabs_context_mcp createIfEmpty`), bring the Chrome window to the front and switch to the tab (Ctrl+9 = last tab).
- Open the workspace with a full navigation to `https://design.penpot.app/` (or the URL with `team-id=`), not by changing only the hash of an already blank page; then open the file from the URL with `team-id`, `file-id`, `page-id`.
- `redo` also resizes each board to the new page height (HTML changes make pages shorter or taller). Save a named version first: `penpot.currentFile.saveVersion("…")`.

## Other scripts

- `overlap-check.cjs`: scans every page at both widths for overlapping or off-screen text in the HTML itself.
- `gen-service-pages.cjs`: generated the service, state, email, link-preview and admin pages on 4 Oct. It overwrites them; edit the HTML directly instead.
- `mcp-call.mjs`: minimal client for one-off calls (`node mcp-call.mjs code file.js`).
- `shots-v4.cjs`: screenshots of the key v4 screens into `review/shots-v4/`.
- `cover-texts.mjs "<page>"`: re-creates the cover texts one line per text (the cover routine's own texts can stay invisible in View mode). Run with that page open; the texts appear in exports once Penpot has laid them out (check with a size poll: auto-width texts stuck at 1×1 are not laid out yet).
- `export-check.mjs [export|compare|all] ["Page,Page"]`: exports every board from Penpot (`shape.export`, polled through `storage`, fetched in base64 chunks) into `review/penpot-v4/`, then pixel-compares each with the live HTML at 0.5 scale. v4, 5 Oct: 48/48 boards same size, diff ≤ 3.4 % (font anti-aliasing). The Penpot export API sometimes times out: rerun, existing files are skipped.
- `*.v3.bak.*`: the v3 scripts and board ids, kept for reference.

## 6 Oct 2026 additions (HTML changed; Penpot re-pushed the same day: 31 boards redone, 48/48 same size, diff <= 3.5 %)

- `extract.cjs` now gives children of rounded `overflow:hidden` ancestors (card photos, tables) per-corner radii (`rads`), because Penpot does not clip: before, a square photo box stuck out over the card's rounded corner. `push.mjs` applies them with `borderRadiusTopLeft/TopRight/BottomRight/BottomLeft` (property names assumed from the plugin API, not yet run: test on one board first). `qa.cjs` draws `rads` too.
- `extract.cjs` forces the sticky phone bar visible (`.mbar.is-armed`), because the real page hides it at scroll 0 while the mirror is static.
- `pages.json` was re-extracted on 6 Oct (backup: `pages.v4-before-card-corners.bak.json`); every board of the six content pages, the Plan/thank-you/legal/404/form-state boards (bar removed) and the phone boards with the new tab cues and carousel pager need `redo`.
- A "fixed when scrolling" layer is pinned at its offset from the top of the viewer, so in a window shorter or taller than the board's first screen the bar floats over content. This is a mirror artefact; the HTML bar sits at the screen bottom.

## Phone viewing (6 Oct 2026)

- Penpot's web app has no `<meta name="viewport">`, so a phone lays the viewer out like a desktop page (980 px in Chrome/Safari, sometimes narrower in in-app browsers) and zooms out. A 1440 px board then scrolls sideways; a 390 px board shows small. `&zoom=fill` in the link is ignored.
- Fix used: the Mobile cover is 390 px (`cover-phone.html` → `node phone-cover.cjs` → `node push.mjs phonecover`, redraws "00 Cover · Mobile" in place) and its first box says: tap "100%" → "Fill". Fill then persists for every screen. Checked in Playwright (iPhone 13): no sideways scroll at 100 %, boards fill the screen after Fill.
- `push.mjs covers` now skips Mobile, so a covers run cannot bring back the 1440 px phone cover.
- Send phone viewers the Mobile page link; the Desktop page (1440 px boards) will always scroll sideways on a phone.

## Overview covers (6 Oct 2026, final Penpot round)

"00 Cover · Desktop" (1440 px) and "00 Cover · Mobile" (390 px) show a thumbnail of every board; each thumbnail and the Start button link to their board. Rebuild:
`python thumbs.py` (thumbnails from the HTML into `thumbs/`) → `python covers-gen.py` (writes `cover-desktop.html`, `cover-phone.html`) → `node cover-build.cjs` (→ `covers.json`) → `node push.mjs newcovers ["Desktop|Mobile"]` (uploads the images with `penpot.uploadMediaData`, redraws the covers in place, deletes stray flows).
- Penpot auto-creates "Flow N" when links are added to boards; `newcovers` removes every flow except "Website · Desktop" / "Website · Mobile". Check flows after any `redo`.
- `phone-cover.cjs` and the 390 px text-only cover are superseded by this.
- Share links are per page set. Owner link (6 Oct, all 4 pages, view only, no login): share-id c252e8c6-58f7-4c24-aa56-698580116ebf; put the wanted page-id in front (Mobile for phones, Desktop for laptops). The older share-id 46a064e3-… covers only Mobile.
- Checked 6 Oct (get-view-only-bundle): link c252e8c6 has `whoComment: "team"`, so the owner cannot comment through it even with a Penpot account. For owner comments create a new link: SHARE → MANAGE PERMISSIONS → Select All pages → "Can comment: All Penpot users" → Get link.
- Comment link (6 Oct, created and checked): share-id b69977d8-2db0-4b3f-abec-8297a130fb3f, all 4 pages, `whoComment: "all"`, `whoInspect: "team"`. Opens without login; commenting needs a free Penpot account. Old view-only link c252e8c6 still works.
- Reading comments: in a tab logged in as ga4a, `GET /api/main/methods/get-comment-threads?file-id=<file>` returns every thread (seqn, frameId, pageName, position, content, isResolved); map frameId to the board name with `board-ids.json`. Tested 6 Oct with a test comment on "01 Home · Desktop", then removed it (`POST delete-comment-thread {id}`).

## 7 Oct 2026: v5 sync (grey hi-fi redesign)

File renamed "1000 Islands · Wireframes v5 · 7 Oct 2026". Named versions: "v4 before v5 · 7 Oct 2026" (rollback point) and "v5 · 7 Oct 2026 · copy fixes, About us". All 48 boards redone, covers rebuilt; `export-check.mjs` now writes to `review/penpot-v5/` (52 exports, all sizes match, diff ≤ 3.8 %; the only heavy spots are the pinned phone bar and Inter's "1" glyph in the steps block).
v5 needed these script changes (v4 copies kept as `*.v4.bak.*`):
- `extract.cjs`: placeholders are now gradients (no diagonals unless `.ph::before` has content); mask icons (`mask: url(data:image/svg+xml…)`) become `icon` items with the SVG recoloured; sized gradients (nav underline, FAQ plus) become thin rects per layer; rotated boxes keep their angle (`rot`, burger cross); Chrome's native range slider drawn to match; `.mbar` forced visible except on the open-menu board; transitions off before opening the menu.
- `push.mjs`: `icon` → `penpot.createShapeFromSvg`; CSS angle gradients (`165deg`) → start/end points; `rot` applied after positioning.
- `qa.cjs` draws icons. `export-check.mjs`: `BOARD="<name>"` env exports/compares one board.
- Board "06 About" renamed "06 About us" (Penpot, `board-ids.json`, `pages.json`, `extract.cjs`).
- A file rename needs the UI (double-click the name): `penpot.currentFile.name` is read-only.
- Final parity check (7 Oct): `node extract.cjs && cp pages.json pages.fresh.json && node final-check.mjs` reads every board back from Penpot and compares texts (string + position ±3 px), gradient photo boxes, icons, size and click targets with the live HTML; result in `final-check.json`. 48/48 boards, 0 problems. It caught the phone bar extracted mid slide-in (now all transitions/animations are off during extraction) and the bar under the S2 modal (bar no longer forced on one-screen states).

## 8 Oct 2026: boards sized to the browser window

- Boards were extracted at 1440x900 / 390x844 (whole screen). In a real browser the visible area is smaller (measured: 1440x810 screen → 1440x641 window in Chrome, minus Penpot's own 48 px bar in View mode), so every `100svh` hero ran past the bottom edge. Now `extract.cjs` uses `DESK_H = 640`, `PHONE_H = 660`; `qa.cjs`, `export-check.mjs`, `overlap-check.cjs` match. `fit-check.cjs` also checks 1440x640, 1280x620 and 390x660.
- `wf.css`: at desktop width and window height ≤ 660 px the trip-card photos are 5:2 (the yacht cards' price row wraps, and heading + cards must fit one screen).
- `extract.cjs`, `qa.cjs`, `export-check.mjs`, `fit-check.cjs` disable the page cache: the shared `.chrome-profile` served a stale `wf.css` after an edit.
- Penpot named version before the redo: "v5 before browser-height boards · 8 Oct 2026". Old scripts and pages kept as `*.v5-900.bak.*`.
- Viewing tip: in View mode Shift+F hides Penpot's top bar, so the board shows exactly what a browser window shows.
- Notes mode is now forced with `?notes=1` in `extract.cjs`, `qa.cjs`, `export-check.mjs`. Before, it came from `localStorage` in the shared `.chrome-profile`; when that flipped to off, a redo silently dropped every block label and photo spec (caught by an outside QA run, 8 Oct; 37 boards redone).
