# Zala Šeško, Unseen Studio - Crafting Excellence: Between Chaos and Control (KIKK24)
- Source: KIKK festival (YouTube) · 2024-12-09 · 26 min · https://www.youtube.com/watch?v=VCoxB3mSMlw
- Speaker(s) and why they matter: Zala Šeško, creative developer at Unseen Studio (Bristol, digital agency, 12+ years, specialists in 3D web experiences, also branding, AR/VR). Practitioner from a top-tier WebGL studio. No product to sell; talk at a festival whose identity the studio built.
- Relevance to us: 2 · Freshness matters? mostly timeless (mindset), technical parts tool-dependent
- Notes: heavy WebGL/shader detail beyond our needs. Captions garble: "kaks"/"Kake" = KIKK (the festival), "Jael" = glTF ("blend to web Jael exporter" = Blender-to-web glTF exporter, verify), "Theater JJs" = Theatre.js, "ethwall" = 8th Wall, "Wells" = whales, "blue Mar Marine Foundation" = Blue Marine Foundation, "Kuara filter" = Kuwahara filter, "spicy their projects" = "spicy side projects" (verify), "fpo" = FBO (frame buffer object). Live demos partly not visible in the transcript.

## Core thesis
Excellent work comes from alternating between chaos (experiment, R&D, side projects, happy accidents) and control (honing details, tying things together). Time-boxed R&D at project start, small "spicy" side projects, and shared tools that shrink the design-to-dev gap are what make ambitious interactive web work possible.

## Claims and advice
- [P] Work alternates between "chaos" (try something new, experiment) and "control" (hone details, make it make sense); moving back and forth "keeps the wheels turning". (2:06) — opinion
- [P] Allocate R&D time at the start of a project: it lets you try things you have not built, spot obstacles early and find alternatives. Often the question is "can we make this?" and nobody knows the answer yet. (2:06, 10:16) — practice
- [P][VIS-M] Example of iterating one shader in small steps: plain block with reveal pattern, then model plus vertex displacement (too intense, scaled down), hexagon texture, connect to camera path and scroll plus color and bloom, then several materials on one geometry (for performance), then final. (3:07-5:09) — practice
- [VIS-M][Q] Art-direct a style within technical limits: for a Norse-mythology game site they wanted a painterly look; post-processing filters (Kuwahara) need capable hardware and apply uniformly to the whole image, so they displaced object normals with a stroke texture and lit with directional lights instead. (5:09-6:11) — practice
- [P] Procedural over hand-painted: hand-painting normals limited iteration (new model means redo), so they generated tileable textures in Substance Designer; fixed texture stretching with triplanar mapping. (6:11-7:12) — practice
- [P][EMO] For the KIKK identity ("true or false", perception distortion) they flipped the process: developers worked from concept and art direction only, producing a generative system for many variations (flyers, announcements, posts). Random results were hard to control, so the experiments served as inspiration for the final work. (8:12-10:16) — practice
- [P] Keep making: small encapsulated side projects ("spicy" projects) with one focus, minimum viable, emphasis on process not future use, room for mistakes. (10:16-11:17) — practice
- [P] Small experiments in extended reality on the web (8th Wall, Spark AR, A-Frame) led to a client request: a Blue Marine Foundation Instagram filter (whales around you, published on World Ocean Day), then a VR video shown at COP28 in Dubai and to school pupils; they researched so it ran beyond headsets. (11:17-13:22) — evidence from their own case
- [VIS-M] Techniques mentioned from side projects: flow fields (grid of angles, curves drawn by following them, fading line ends), impostor particles (fake 3D with swapped normal maps for thousands of detailed particles), GPGPU/frame buffer simulations (particles, fluid), motion blur per particle. (13:22-19:31) — evidence, technical
- [P] Learn a technique iteratively, each example built on the previous one (his GPGPU demos went from vertex particles to physics to fluid to a respawning cat). (16:27-19:31) — practice
- [P] Carving out time for fun projects (a toon-shaded hip-hop dancing penguin for Christmas) is good for learning, creativity and motivation. (19:31-20:37) — opinion
- [P][AI] Tools between design and dev: a custom Blender-to-web glTF exporter (transforms, geometry, materials, textures, camera animation, live preview) saves manual setup; Theatre.js (keyframe any exposed value through a web interface, extra camera panels to mimic 3D software, version control saved into one file) lets designers tweak values in real time and saves devs from changing numbers. (20:37-23:42) — practice
- [P][CL] Shrink the design-dev gap both ways: designers push what is possible while knowing limits; developers use available tech to drive design from the beginning. Goal: the final product resembles the concept but is "better and enhanced" by what the technology can do. (23:42-25:58) — opinion

## Techniques and steps
1. At project start, reserve R&D time for the riskiest interaction or look.
2. Iterate a hard effect in small steps, one new variable per step, test it in context (scroll, camera path) early.
3. Prefer procedural assets over hand-made ones when you expect changes.
4. Run small side projects between jobs to build a library of techniques; reuse them in client work.
5. Give designers live control (exposed values, preview) to cut round trips.

## Tools and resources
- Theatre.js: keyframing values in code with a UI (22:41)
- Blender plus custom glTF exporter with live preview (20:37)
- Substance Designer: tileable procedural textures (6:11)
- WebGL, shaders, triplanar mapping, flow fields, GPGPU (5:09-19:31)
- 8th Wall, Spark AR, A-Frame: web AR/VR (11:17)

## Quotes
- "Finding the balance between the two is what enables us to make great work." (2:06, on chaos and control)

## Disagreements and contrarian points
Mild: against designing every detail in static mockups first; lets developers drive design from the start and treats experiments as primary inspiration. Admits random generative results are hard to control.

## For 1000 Islands
Little directly usable; our site is not a 3D experience. Transferable: (a) budget a short R&D spike before committing to any special effect (water ripple, map interaction) and test it on mobile; (b) iterate effects in small steps and check them in the real page (scroll) early; (c) keep effects performant (their reason for painterly normals over heavy post-processing); (d) give the owner a live way to tweak values only if scope allows (not in offer minimum). Likely better to skip WebGL entirely.

## Other
Case of a conservation charity using VR/Instagram filters (Blue Marine Foundation) shows upper-tier studios pitching immersive pieces for cause-driven clients; not our scope.
