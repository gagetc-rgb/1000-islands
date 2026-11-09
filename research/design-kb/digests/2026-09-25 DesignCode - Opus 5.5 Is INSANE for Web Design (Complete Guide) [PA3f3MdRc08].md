# Opus 5.5 Is INSANE for Web Design (Complete Guide)
- Source: DesignCode (Meng To) · 2026-09-25 · 48 min · https://www.youtube.com/watch?v=PA3f3MdRc08
- Speaker(s) and why they matter: Meng To, designer-founder of DesignCode (courses, webinars, Slack) and an open-source design library; practitioner with commercial ties. This video is sponsored by Mobbin and promotes his own library and courses.
- Relevance to us: 3 · Freshness matters? tool-dependent (model names, Mobbin plugin, Claude Code desktop UI will expire; the "pick the right technology, steer with references, self-verify" method is more durable)
- Notes: Mobbin sponsor segment about 2:02-4:05 and again at 46:00-47:04 (product read, not independent advice). Captions garble names: "3GS" = Three.js, "Cloud Code" = Claude Code, "Higgs field"/"Hex-Fiend"/"XField" = probably Higgsfield (image/video generation tool, verify), "ORMCP" unclear (verify), "Astra" and "Fable" are model names as spoken (verify). Speaker claims $10,000-$20,000 "value" of landing pages and 400k views: self-promotion, unverified. Mostly a live demo of a 3D Japanese-style solar landing page; heavy on flashy 3D, light on design principles.

## Core thesis
With a top coding model you can push a landing page far beyond templates by feeding it real references (screenshots from a library such as Mobbin), naming the exact technology (Three.js 3D, shaders, transparent PNG layers, a named icon set) so it does not fake things in HTML, and making the agent score and verify its own work in a long loop. The designer acts as manager/orchestrator: references in, steering, long runs, review.

## Claims and advice
- [AI][REF] Use Mobbin (500k+ app/web screens) through its MCP/connector/plugin so the agent pulls references for hero, testimonials, pricing, footer directly; ask for "top five websites for X" and request screenshots, otherwise you only get links. (2:02-9:12) — practice, tool-dependent, sponsored
- [REF][AI] Mix sections from different reference sites (testimonials from one, map from another, charts from a third); ask for 5-10 sections and plan first before building. (10:14-11:16) — practice
- [REF] Paraphrase: the goal is to push the inspiration, not copy it; adapt to your brand, locale, language. Take the "spark of genius" from each concept (a map, network lines) and tie everything together with one theme. (11:16-13:19) — opinion/practice
- [AI] Make the agent score every element out of 10 (3D scenes, backgrounds) and iterate until 8/10 or 10/10, depending on token budget; add "self-verify until it's perfect". (4:05-5:07, 15:23-16:24) — practice
- [AI] Set the model effort level high: longer runs give more detail; use auto-permissions so it does not stop to ask. (8:11-9:12) — practice, tool-dependent
- [AI] Quality takes time: expect 1-2 hours per serious page (his run goes 25 min, then over an hour). Treat the agent like a person you give time; run several projects/threads in parallel. Claims 1-2 days of steering for what he values at $20k. (28:40-31:43) — opinion
- [AI] Speak prompts by microphone: best way to express all the detail and imagination. (15:23) — opinion
- [AI][AIS] Name the technology explicitly or the AI draws everything in HTML/CSS, which "looks terrible"; use 3D (Three.js) for buildings, phones, landscapes, grid scenes; image generation (transparent PNGs as layers) for ornaments/people; a named icon set (Iconify Solar Duotone) instead of icons drawn from scratch. (17:25-19:29) — practice
- [AI] Pick your fights: the model is good at 3D houses, structures, trees, water, grass (regular geometry) but bad at humans/animals (stick-figure look); generate characters separately (Higgsfield, Meshy, "Turbo 3D" - verify) and import. (12:17-13:19, 21:30-23:31) — practice
- [Q] Weight comparison: animated video background about 100 MB, a high-res image 1-2 MB, a procedural Three.js scene about 500 KB plus the library; several scenes a few hundred KB each. (23:31) — evidence (his rough figures)
- [VIS-M] Effects he prompts: orbit on hover (slight rotation), rotate on drag, ripples on water on mouse-over, shader buttons (liquid-glass look; first attempt gave gradients, so say "shaders"), parallax with separate foreground/background layers on scroll, floating menu, letters floating from one heading to the next. (5:07, 25:34-28:40) — practice
- [AI] A single HTML file is easier to steer at the start; by default the agent creates a React project with many files that are hard to port. He keeps one "HTML" project holding many single-file experiments; the agent may reuse past work (untested). (31:43-32:45) — practice
- [AI][P] Spread work into separate threads: logo export (SVG plus transparent PNG), brand guide (colors, hierarchy, typography, logos), mock ads (billboard, business card, t-shirt, subway). (30:43-34:46) — practice
- [AI] Set spending guardrails for image-generation tools: no permission needed under $1, ask above (otherwise the agent may generate 100 images). (34:46-35:48) — practice
- [AI][TOOLS] His view: Opus and "Fable" consistently best at front-end design and lately 3D; Codex best "harness" (browser use, backend, API keys, permissions). Prefers Opus 5.5 over the pricier "Astra" (verify). (35:48-36:48) — opinion, tool-dependent
- [AI] One copy-paste prompt exists: describe scene, theme, ornaments, requirements (typography, hierarchy, colors if a website), performance (Retina, smooth), tell it to use the best skills/tools in the folder without being told, test in browser in a loop, compare against references, reply briefly. (37:50-40:56) — practice
- [AIS] Weak image-generation models give "sloppish" people; fix by using another generator (Midjourney) or a drawing style instead of photoreal, or generate good references of people. (42:59-45:01) — practice
- [AIS][AI] Claims the result "does not look AI slop at all" because of steering with icons, 3D models and self-verification (his judgment, subjective). (45:01-46:02) — opinion
- [VIS-L] Light beige background transitioning to dark alternate sections; theme words: grid, sakura, god rays, sunset colours. (15:23) — practice

## Techniques and steps
1. Install the reference connector; ask for the top 5 sites for your category, with screenshots.
2. Pick sections from several sites; ask the agent to plan 5-10 sections first.
3. Brief (by voice if you like): theme, brand, per-section tech (3D for buildings/charts, PNG layers for ornaments, named icon set).
4. Add: textures, high resolution for Retina, lighting, "score at least 8/10", self-verify in the browser.
5. Let it run 1-2 hours; review screenshots; steer on resolution, contrast, size.
6. Fix weak images by switching generator or style; export logo, brand guide, ads in separate threads.

## Tools and resources
- Mobbin: reference library with MCP and Claude Code/Codex plugins (sponsor) (2:02)
- Claude Code desktop app, Codex: agent harnesses (6:09, 35:48)
- Three.js: 3D in code (23:31); shaders for buttons (27:38)
- Higgsfield (verify), Midjourney, a GPT image model ("GPT 2.5 image" as captioned, verify): image generation (17:25, 25:34, 44:00)
- Meshy, "Turbo 3D" (verify): 3D model generation (22:30)
- Iconify Solar Duotone: icon set (18:27)
- Rive, Lottie, SVG: mentioned as the traditional route for 2D animation (24:32)
- DesignCode open-source library, about 150 designs, some free (40:56)

## Quotes
- "HTML is just the wrong technology to draw a house." (19:29)
- "Quality takes time." (30:43)

## Disagreements and contrarian points
Goes against the "AI slop is unavoidable" view: argues steering plus right-technology choice avoids it. Against minimal pages: encourages heavy 3D (performance and accessibility not discussed beyond the file-size comparison). The Opus vs Codex claims are his opinion.

## For 1000 Islands
Mostly not our direction: the site is photo-led, so real photography stays the hero, not 3D scenes or generated people (his own admission: generated people look sloppy). Useful bits: (a) pull references per section (hero, gallery, testimonial, footer) and adapt, not copy; (b) brief by naming the exact technology so the model does not improvise ugly HTML illustrations; (c) use an existing icon set, not hand-drawn icons; (d) single-file HTML is easy to steer; (e) set a budget guardrail for any image tool; (f) subtle effects only (slow parallax, ripple on water, hover orbit) could suit an island/water theme, but check weight and mobile performance.

## Other
Weekly webinars and Slack at designcode.io; promises prompts and designs via tweets. Idea of asking the AI to produce a brand guide and mock ads from the finished site (outside our offer minimum, so extra scope).
