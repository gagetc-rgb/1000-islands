# Using Claude Design 2.0 to NOT Produce SLOP
- Source: DesignCourse (YouTube, Gary Simon, verify) · 2026-07-24 · 20 min · https://www.youtube.com/watch?v=YSYqFBq68Wk
- Speaker(s) and why they matter: DesignCourse host (name not stated in the transcript; widely known as Gary Simon, verify), long-running web design educator who sells courses at designcourse.com. Says this video is not sponsored.
- Relevance to us: 3 · Freshness: tool-dependent (Claude Design 2.0 UI and its design-system flow; "Fable" model; Mobbin site filters)
- Notes: no sponsor segment (he states it is not sponsored). Garbled/unclear names: "Fable" (model he picked, as spoken, verify), "Design Labs" (Claude desktop entry for Claude Design), "Lena's smooth scroll" = Lenis (verify), "locomotive effect" = Locomotive Scroll style (verify). Demo uses a throwaway fictional brand ("FunAddict", running app), not a travel site. Pitch-style: shows one hour of iteration and judges it "not slop" by his own eye.

## Core thesis
AI slop is what you get when you let the model one-shot everything. Direction comes from you: pick a style via real inspiration, give the tool reference screenshots to build a design system, edit that system by hand (colors, tone, components), then iterate a hero over several prompts with your own assets. The designer's role is specific, repeated creative direction.

## Claims and advice
- [AIS] Slop is "the lowest common denominator where you let AI take the reign of everything and kind of just one shot things"; the new workflow is iterating until it is unique. More direct input is "what will set you apart". (8:11, 19:19) — opinion
- [REF][MB] Start with a high-level style question (dark, colorful, brutalist, fun) even if you do not know details; gathering inspiration is what human designers always did, and "it's not stealing"; inspiration versus stealing is a "huge difference". (0:00-1:01) — opinion
- [REF][TOOLS] Mobbin's Sites tab (live desktop sites, with a Styles filter) preferred over Dribbble/Behance because these are real live websites with animation and scroll interactions, not mockups. (1:01-2:02) — opinion
- [REF][P] Screenshot specific areas you like (hero, cards) across multiple sites, drop them into Figma as a loose board, export as JPG/PNG, and feed about five as reference assets. (2:02-3:04) — practice
- [AI][DS] In Claude Design: create a Design System first (company name + blurb, optional GitHub repo, Figma file, or uploaded assets) before making any layout. Write a note telling it what to do with the references ("capture the sum of these designs to create a coherent design system"). (3:04-5:07) — practice, tool-dependent
- [AI][DS] Generated system comes as sections (sticker motif, voice, wordmark, colors, forms, navigation) with a Feedback (text prompt) and Edit (direct) option each, plus a sample UI in HTML/CSS. He calls the raw result "very generic" and says to make it yours before saving. (5:07-7:09) — evidence from one run
- [AI] Feedback prompts can be very specific and worked first try: a white circle with a black runner icon at the top-center of each sticker. (7:09-8:11) — evidence
- [EMO][AI] Set tone of voice deliberately; he asks for an abrasive, dark-comedy voice and gets coherent copy ("shame is complimentary"). The default voice was "exuberant, cheeky", which he did not like. (6:07, 8:11-9:12) — practice
- [VIS-C] Edit colors by hand: pick a primary and a complementary accent by eye, change hover state slightly darker, replace the default cream background with a tint matching the new primary; changes propagate through all components and the sample web design. He criticized default orange and red being too close. (9:12-12:12) — practice
- [AI][P] Spend real time on the design system before generating ("I advise doing so"), then mark it Published / use this system so new designs inherit it. (12:12-13:13) — practice
- [AI] Hero prompt structure: use the system; one central animated SVG figure of simple shapes; centered headline with figure overlapping it if readable; sub-headline; strong CTA; floating feature stickers with icons and a couple of words; end with "check your work and ensure high quality and good UX". First result took about 6-7 minutes. (13:13-14:15) — practice
- [AI][VIS-I] If the first result is weak (he disliked dashed lines, the figure, wrong layering), take a screenshot, build a quick reference asset in Figma (a white circle on a purple background), and use an image model (Gemini) to design a character in the style of a reference image, then feed the picture back into Claude Design to restyle the SVG character. (14:15-17:18) — practice
- [REF][AIS] He feels the image model copied a reference logo ("this feels like theft") and says he only wants the general idea; keep reference use to idea-level. (16:17) — opinion
- [VIS-M] Final result after about an hour and 5-6 follow-ups: centered head with googly eyes, rotating features around it, pupils spinning on scroll, a smooth-scroll library (Lenis) for a Locomotive-style feel. Follow-ups were small and specific (text color, head too large, spin on scroll). (17:18-19:19) — evidence (self-judged)
- [AIS][Q] If you have no "design eye" you might be happy with the first pass; having the eye lets you see what to fix. (14:15, 20:19) — opinion

## Techniques and steps
1. Decide a rough style with a keyword filter (e.g. "fun") on a reference site; screenshot 5 sections from 2-3 sites.
2. Upload them as assets when creating a design system, with a one-line instruction.
3. Review each generated section; use Feedback for text-level changes and Edit for colors; save.
4. Publish the system, start a new design that uses it.
5. Prompt the hero with specific elements and ask for quality self-check.
6. Iterate: screenshot, annotate, supply assets from Figma/image model, request small changes one by one (layering, color, scroll behavior).

## Tools and resources
- Claude Design 2.0 (Anthropic, via Claude desktop "Design Labs", verify naming); "Fable" model chosen (verify)
- Mobbin (sites + styles filter): reference browsing (1:01)
- Figma: quick reference boards and assets (2:02, 15:16)
- Gemini image generation: character design from references (15:16-16:17)
- Lenis smooth scroll, Locomotive-style scroll effect (18:19)

## Quotes
- "There's a huge difference between inspiration and stealing." (1:01)
- "Slop is just the lowest common denominator where you let AI take the reign of everything." (19:19)

## Disagreements and contrarian points
Slightly at odds with the Mobbin-as-app-library view: he uses its live-sites section for style, not flows. Admits the AI-copy edge ("feels like theft") yet defends idea-level borrowing.

## For 1000 Islands
Applicable pattern for Stage 2: collect ~5 reference screenshots from live travel/hospitality sites, turn them into a one-page design system (palette, voice, type, components) in whichever tool, edit colors and tone by hand, then generate the hero with an explicit element-by-element prompt and iterate in small steps. Mind that a style tied to a playful "fun" brand is far from our upper-middle travel audience; take the process, not the look. Watch for reference copying: stay at the level of idea (color, layout, rhythm).

## Other
Pitch for designcourse.com. Mentions his teens' slang joke (6 or 7). Nothing else notable.
