# New way to prompt Fable 5 to design amazing websites
- Source: Flux Academy (YouTube), host Ron plus guest Riley Mattingley · 2026-08-26 · 19 min · https://www.youtube.com/watch?v=eiz7FwVSBNk
- Speaker(s) and why they matter: Riley Mattingley, self-taught web/brand designer (2.5 years), creative strategist at an agency in Perth, Western Australia (name garbled "Chicken Dinner", verify), with no coding background. Interesting as a non-coder designer's real workflow; the video also promotes a Flux Academy "AI sprint" (16:14). Single anecdotal project (an experimental e-commerce store), not a controlled test.
- Relevance to us: 5 · Freshness matters? tool-dependent (Fable 5, Opus 4.8, Magnific MCP, Osmo, 21st.dev); the six-step prep-then-prompt structure is durable
- Notes: Garbles: "Racket House" is the project name; "Medusa.js" (open-source commerce backend), "Claviyo" = Klaviyo (verify); "Osmo Supply" (Osmo); "Monzerat" = Montserrat; "Cedance 2.0" = Seedance 2.0 (verify); "Nano Banana 2". "Fable 5" is the Claude model name used (as spoken); effort levels "high", "extra", "ultra" (the speaker's wording, verify). Plug at 16:14 for the Flux AI sprint; skip. No outputs were checked, bugs deliberately left.

## Core thesis
Do not start with a prompt. Do strategy and visual direction yourself, have the AI write the master prompt from a structured project folder (logo, palette, chosen fonts, image direction screenshots, layout inspiration, interaction components), then run it in plan mode. Taste goes into the folder; execution goes to the model.

## Claims and advice
- [AI][P] Six-step flow: (1) planning/brand brief in a Claude chat project, (2) deep research to pick the tech stack, (3) ask Claude (deep research) how to best prompt the model, (4) prepare a structured folder of visual assets, (5) add interaction/component resources, (6) run the master prompt in plan mode. (0:00-17:16) — practice (from one project)
- [P][AI] Treat the site "as I would if I wasn't using AI": there still needs to be strategy behind everything, and AI should not remove that thinking. First output: a project overview document (audience, goals, structure, e.g. multiple storefronts long-term) which doubles as a design brief. (2:02-4:03) — practice
- [AI] Used deep research to compare platforms (Shopify, Webflow commerce, custom, Medusa.js) against needs like Klaviyo integration, multi-brand architecture and his skill level; it recommended open-source Medusa.js as backend with a custom Next.js front end. (4:03-6:04) — evidence, tool-dependent
- [AI] Ask the model how to prompt itself: "probably Claude understands Claude the best", easiest route for a non-developer. The result: a prompt alone is not enough, create a structured folder the coding agent can read. (7:07-8:08) — practice
- [AIS][AI] "A lot of AI generated websites... look like AI slop"; the way around it is using your taste as a designer to instruct the AI ("not letting AI take your job"). (8:08) — opinion
- [MB][VIS-C][VIS-T] Own assets in the folder: a quick logo (an R), a pulled-out five-item palette from a larger inspiration document, a logo folder exported from Figma, chosen typefaces (Pangram Pangram fonts; captions say he landed on "function" and "monument", exact font names verify) picked deliberately "so as not to land on Inter, Montserrat, Roboto or any of the normal ones that Claude normally picks". (9:09-13:11) — practice
- [VIS-I][AI] Image direction by screenshots: folder of reference imagery; the prompt tells Claude Code to analyze style, shot composition (wide, mid) and color grading and base its image generation on that; images generated via Magnific MCP with Nano Banana 2 at 2K and videos with Seedance 2.0 (verify names). Claude wrote a prompt per image itself. Caveat: on a real project he would check every image from the start. (9:09-11:10) — practice
- [VIS-L] Layout inspiration folder: screenshots of many e-commerce layouts to avoid "a generic two column layout": large imagery, editorial layout, big headings mixed with small type. (13:11-14:12) — practice
- [Q][VIS-M] His research on "premium e-commerce" found three differentiators: premium fonts, editorial layout, interactions/micro-interactions. (14:12) — opinion/evidence from his own research
- [AI][VIS-M] Interaction components: Osmo supply (has "copy context for AI") and 21st.dev (has an MCP connector); he picked components and told Claude to include them if they fit; output used Osmo's slider, marquee and a parallax image (partly broken). (14:12-15:13) — practice
- [AI] Run: paste master prompt in the project folder, set the model effort to "extra" (a balance between ultra and high for website work), use plan mode first (about 30 minutes), accept, local build, push to a Vercel staging link. Result: working e-commerce site up to adding to cart, not yet connected to checkout; some bugs, fixable by screenshot plus chat. (16:14-18:17) — practice
- [AI] Used the cheaper model (Opus 4.8) for heavy research to save credits when Fable 5 was limited, less relevant now. (7:07) — tool-dependent

## Techniques and steps
1. Create a Claude chat project; give it all context: brand, names, audience, goals, scalability.
2. Output: a project/brief document. Run deep research on the best tech stack with pros/cons.
3. Ask deep research how to best prompt the coding model for this build; follow its advice (structured folder plus master prompt).
4. While the prompt is written, make visuals yourself: logo, palette, type choices, image direction screenshots, layout screenshots.
5. Add interaction references and copy-for-AI component code (Osmo, 21st.dev) and tell the model to use them where they fit.
6. Reference the folders in the prompt (analyze style/composition/color grading; use these fonts); set image model and resolution.
7. Open the folder in Claude Code, paste the master prompt, run in plan mode, review the plan, accept, preview locally then on a staging link.

## Tools and resources
- Claude chat projects with deep research; Claude Code; Fable 5 / Opus 4.8 (verify names) (2:02-7:07)
- Medusa.js: open-source commerce backend (6:04)
- Magnific MCP with Nano Banana 2 and Seedance 2.0 (verify) (10:09-11:10)
- Pangram Pangram foundry; Figma for logo/boards (12:11)
- Osmo Supply and 21st.dev: component sources (14:12-15:13)
- Next.js, Vercel staging (12:11, 17:16)
- Flux Academy AI sprint (plug) (16:14)

## Quotes
- "Probably Claude understands Claude the best at the moment." (7:07)

## Disagreements and contrarian points
Against the idea of "just prompting better": the real lever is an input folder with human-chosen assets. Also against letting the model pick fonts (it defaults to Inter, Montserrat, Roboto). Admits he let images through unchecked, which he would not do on a real client project.

## For 1000 Islands
Very close to our AI-assisted HTML build: assemble a references folder (logo, palette, chosen fonts, photo style screenshots, layout screenshots), tell the model to analyze composition and color grading from them, run plan mode first. Our DESIGN.md plus moodboard replaces his Figma board. His image-generation step does not apply (our photos should be real). Layout takeaway for a premium look: editorial type, big imagery, micro-interactions from curated components; these are checks for our Stage 2 variants. Note the commerce stack discussion is out of scope for our offer minimum.

## Other
Not covered: whether the output is accessible or performant; no metrics. His claim "one-shotted" excludes the preparation hours.
