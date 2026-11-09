# My Design-to-Code Process with AI
- Source: Flux Academy · 2026-04-20 · 8 min · https://www.youtube.com/watch?v=uStjewbLoA0
- Speaker(s) and why they matter: Flux Academy instructor (name not given in transcript), a web-design education company that sells courses; practitioner demo, light commercial interest (course funnel).
- Relevance to us: 3 · Freshness matters? tool-dependent (Claude Code, Figma MCP, Opus/Sonnet 4.6 will expire; the Figma prep rules are durable)
- Notes: no sponsor segments. The demo is a dashboard/app (not a marketing or travel site) and starts from Figma, which we do not use (HTML is our source of truth), so only the principles transfer.

## Core thesis
AI turns a Figma file into code well only if the file is prepared like a clean developer handoff, because the AI is "the most literal-minded developer". The tool matters less than having design fundamentals to set it up, judge the result and push further.

## Claims and advice
- [AI] Use auto layout everywhere in Figma; without it the AI sees absolute positions and rebuilds them with fixed pixel values (an unstructured mess); with it, it infers flex containers, gaps and wrapping, giving cleaner responsive CSS. (1:01) - type: practice
- [AI] Name layers semantically; Figma's "rename layers" AI feature is the one Figma AI function worth using for this. Random frame names give the AI no semantic information. (1:30-2:02) - type: practice
- [AI][DS] Use Figma text styles and color styles; the Figma MCP passes them through so the code references real design-system values instead of hard-coded hex and px. (2:02) - type: practice
- [AI][DS] Keep component variants and properties organized; the AI mirrors component architecture in code. A sloppy file gives sloppy code. (2:30) - type: practice
- [AI] Screenshots alone give worse results than the MCP link, which carries typography, color and spacing details. (4:05) - type: opinion (shown by one demo, not tested against alternatives)
- [AI] Claude Code chose vanilla HTML/CSS/JS by default; ask explicitly for React or another stack in the first prompt. (3:30) - type: practice
- [AI] First prompt can be minimal ("Let's build this design project" plus the Figma link); iterate afterwards. Used Opus 4.6 for deeper thinking; Sonnet 4.6 is described as capable and cheaper/faster. (3:04) - type: practice, tool-dependent
- [AI] First build reproduces only the visible design: buttons (export CSV, filters, mark all as read, save) are inert. A second prompt asking for working functionality with placeholder data, plus the specific fixes (correct logo, filled active icon), made search, CSV export, a filter modal, chips and toasts work. (4:05-7:07) - type: evidence from one demo
- [AI] The AI invented UI that was not in Figma (a filter modal, toasts) and it was acceptable; but iterating on function broke earlier spacing (lost vertical gap between cards and buttons), so it stays an iterative process. (6:07-7:07) - type: evidence
- [AI] AI mishandled a supplied personal logo on the first pass; give assets explicitly and verify them. (5:06) - type: evidence
- [AI] Persisting data needs a back-end connector (Supabase named); Claude can wire it once the connector is set up. (7:07) - type: practice
- [AI][AIS] Closing claim: "designing with AI" is not about which tool; it is about fundamentals to set it up, evaluate the output and know when to push further. (7:30-8:08) - type: opinion

## Techniques and steps
1. Prep Figma: auto layout, named layers, text and color styles, tidy components.
2. Connect Figma MCP to Claude (Customize > Browse connectors > Figma, pick the "interactive" option; enable it in the session's connectors).
3. Prompt "Let's build this design project" with the Figma link; pick the model.
4. Open the build in a browser, click through every page, note what is dead or off.
5. Second prompt: concrete fixes plus "do anything else required to make this a working app with placeholder content".
6. Re-check spacing after each iteration; add Supabase or similar only when persistence is needed.

## Tools and resources
- Figma (auto layout, text/color styles, rename layers AI) and the Figma MCP server (2:02-3:04)
- Claude Code with Opus 4.6 / Sonnet 4.6 (3:04)
- Supabase (back-end, mentioned only) (7:07)

## Quotes
- "The AI is your most literal-minded developer" (2:30, light paraphrase of the speaker's wording)
- "It's about whether you have the design fundamentals down to set it up correctly, evaluate what comes back, and know when to push further." (7:50, approximate)

## Disagreements and contrarian points
Mild: says Figma AI in general "has a long way to go" but one feature is worth using. Otherwise conventional handoff advice.

## For 1000 Islands
We build HTML first, so the Figma half does not apply, but the same logic holds in reverse: give the AI structured, named, tokenised inputs (clear section names, a tokens/DESIGN.md file) instead of loose screenshots, and click through every page after each iteration to catch regressions in spacing. Two-pass prompting (match the look, then add behaviour) fits our Stage 1 prototype to later stages. If Figma or Penpot boards are ever used as input, auto layout and layer names are the prep checklist.

## Other
Demo app was a dashboard, analytics table, notification filters and settings tabs; no marketing-site or imagery content.
