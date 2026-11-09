# How to Build AI Landing Pages With Images and Videos
- Source: DesignCode (Meng To) · 2026-05-25 · 28 min · https://www.youtube.com/watch?v=T1WTGQesbrE
- Speaker(s) and why they matter: Meng To, DesignCode; he says in the video "Aura, which by the way is a tool that I made" (3:01). The video is essentially a walkthrough of his own product; strong commercial interest.
- Relevance to us: 3 · Freshness matters? tool-dependent (Aura features, GPT Image 2, Gemini 3.1 Pro / 3.5 Flash, prices will expire; the "generate contextual images, then animate" idea is durable)
- Notes: product promotion throughout (Aura: design systems 621 and growing, "we're the only AI builder that has this feature", 120 prompts, 4-second loops; self-reported). Caption garbles: "newform" probably his own design-system library (verify), "getdesign.mt" = getdesign.md, "Cidens" probably the Seedance video model (verify), "Whisper Flow" = Wispr Flow dictation app (verify), "Gemini Omni" an announced model he hears is good (unverified), "Apple Awwwards" likely "Apple, Awwwards" in the reference menu. His demo is a fintech SaaS ("Sekura").

## Core thesis
Landing pages from AI builders no longer need generic Unsplash faces: the builder can generate contextual images from the page's own text (one prompt, 5-7 images at once) and animate them into hosted loop, play-once or on-hover videos. Start from a design system, choose sections, motion and polish, describe the product, and run the same prompt across several templates to compare.

## Claims and advice
- [VIS-I][AIS] Unsplash/stock gives "the same faces, the same buildings" on every site and "devalues everything"; AI-generated, context-aware images beat them, even if imperfect, because they give you and the client a direction to agree on before real photography. (0:00-1:00, 17:17) - type: opinion
- [VIS-I][EMO] His Montreal point: instead of generic imagery unrelated to the place, generate images that read like real photography or video of the location (then swap in real material later). (1:00) - type: opinion
- [AI][DS] Start from the design system (design.md): import from a URL, an existing template, or a library; the system holds styles, colors, type, spacing, radius, motion. Good for people who want good design but do not know how to get there; you learn typography/color/spacing as you browse. (2:01-4:02) - type: practice
- [P] Know landing-page section names to prompt: hero, footer, features, testimonials, story, pricing, contact form. Every page has hero and footer. (5:04-6:05) - type: practice
- [VIS-M][AI] Pick "rich interactions" and "smooth scroll" for more standout motion; for polish name a quality reference (Awwwards, Dribbble, Apple, Framer, agency/studio); SVG logo branding; fully responsive; and "rich images and avatars", otherwise AI draws letter avatars and gradients that are not contextual. (6:05-8:07) - type: practice
- [AI] Dictate prompts with a voice tool (Wispr Flow-type app, verify) to be more productive; describe the product in speech. (8:07) - type: practice
- [AI] The prompt bundles context: design system, HTML elements from the template, sections, interactions, animations and product description. Copy the whole prompt and apply it to several design systems and templates to compare. (8:07-10:08) - type: practice
- [AI] Model choice: Gemini 3.5 Flash (fastest) vs Gemini 3.1 Pro (his preference); for iteration, Flash or GPT 5.5. (9:08, 21:21) - type: practice, tool-dependent
- [AI][Q] Compare outputs: design systems with more images, structure and sections produce a better starting point; the same system adapts to context (fintech gets a chart). "There's no silver bullet"; template-like products improvise less. (11:09-13:12) - type: evidence
- [AI][REF] Screenshots of sections you like can be added as a reference, not an asset: reference = "fix this/adapt this", asset = use the picture itself on the site. The word "adapt" is "super important" (adapt to the website's content). (14:14-15:14) - type: practice
- [VIS-I][Q] Text-heavy page became image-led after asking for more images, a team photo, a gallery; "usually images and visual is going to convert just so much better" (claim, no data). (13:12-15:14) - type: opinion
- [VIS-I][AI] One-click generation: all images on the page (7, 5, 6 across three templates) generated at once from the page text for one prompt; edit a title to steer one image (e.g. "more greenish"), pick the one to keep. (16:16-18:18) - type: practice
- [VIS-I][AIS] Human taste still decides: some generated images read as AI (faces too good-looking, special effects), others are hard to detect; ask for palette-matching (beige, sepia) and regenerate. "It's up to you. It's your taste." (18:18, 22:24-23:25) - type: opinion
- [VIS-M][AI] Video generation: three modes, loop (hero), play once on first load, and on hover; hosted by the builder, no external upload. A hover video as a background can clash with interactivity; ask the AI to fix overlap of title/description and make hover trigger playback (not guaranteed). 4-second loops. (19:19-22:24) - type: practice
- [AI][AIS] Fix mistakes as you find them by prompting; use the image title as the prompt for regenerating. (22:24-24:25) - type: practice
- [AI] Video generation models named: Gemini Omni (coming), "Cidens" (verify, Seedance?) described as expensive. (22:24) - type: hearsay

## Techniques and steps
1. Pick a design system or template; check fonts and colors.
2. Select sections, animation level (rich interactions, smooth scroll), polish references, icon set, responsive, images/avatars.
3. Describe the product (voice dictation); copy the generated prompt; run it on several design systems.
4. Compare results; keep the best foundation; add content and sections.
5. Add reference screenshots (not as assets) and say "adapt".
6. Bulk-generate contextual images for the page; edit titles to steer; regenerate misses.
7. Generate videos (loop/once/hover); fix overlap and interaction issues by prompt.
8. Review by taste; adjust palette of images; publish.

## Tools and resources
- Aura (aura.build), its design-system and template libraries, GPT Image 2, Gemini 3.5 Flash / 3.1 Pro, GPT 5.5, getdesign.md, Awwwards, Dribbble, Framer (as polish references), icon set "Solar Linear" (verify), Wispr Flow dictation (verify) (various)

## Quotes
- "Not having Unsplash images where we always see the same faces." (0:00-1:00, paraphrase)
- On taste: it is "up to you. It's your taste. It's your eyes." (23:25)

## Disagreements and contrarian points
Against stock photos and for AI-generated contextual imagery; admits AI faces and effects can look obviously AI. Self-serving claim that his builder uniquely does bulk image plus video generation.

## For 1000 Islands
Important caveat: for a travel site, AI-generated "location photography" is risky: the Thousand Islands must look like the real place, and an upper-middle audience will notice fake scenery or faces; generated images are acceptable only as placeholders to agree on composition with the owner, then replaced by real photography (his own Montreal point implies this). The useful ideas: (1) section vocabulary for prompting; (2) screenshots as references with "adapt"; (3) compare the same prompt over several design systems, matching our shotgun; (4) hover or looping hero video as a motion option once we have real footage; (5) always prompt against letter-avatars/gradients. Hero video, if any, should be real drone or boat footage, short and muted.

## Other
Claims 621 design systems in the library and "120 prompts" on pro; video generation is "typically very expensive" and Aura keeps it affordable (self-reported).
