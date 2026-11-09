# The Art of Continuous Transformation: How Garden Eight Blends Integrity with Play
- Source: Codrops "Studio/Agency Spotlight" article · 2026-07-24 · ~1,800 words · https://tympanus.net/codrops/2026/07/24/the-art-of-continuous-transformation-how-garden-eight-blends-integrity-with-play/
- Speaker(s) and why they matter: Garden Eight, Tokyo studio of seven plus external partners; mainly corporate and brand websites; designers who also develop. Self-description (self-promotion), but unusually concrete on process, CMS and performance.
- Relevance to us: 4 · Freshness matters? mostly timeless (approach); stack names (Nuxt, Contentful, Netlify, Three.js, WordPress) are tool-dependent
- Notes: no timestamps (article). No metrics or awards given; claims about results are the studio's own.

## Core thesis
Good websites combine integrity (effective, reliable for clients and users) with play. The studio treats design, development, motion, CMS architecture and operations as one creative act refined together, with motion serving the flow of content rather than decorating it.

## Claims and advice
- [P] Study context, industry, tone and user touchpoints first, then combine information architecture, visuals, motion and interaction into one coherent experience. — type: practice
- [P] Same people design and develop, so visuals, motion, interaction and technical feasibility are considered in parallel; no handoff of a static design. Decisions (letterforms, motion speed, camera angles, light intensity) stay open longer. — type: practice (aircord case)
- [VIS-M] Motion is not decoration: first priority is not to interfere with user actions or the flow of content; character and atmosphere are added on top. Pacing, attention flow and response to actions are tuned together. — type: practice
- [Q][DS] Choose the CMS and front end to fit purpose and operations: ease of updates, expressive flexibility, workload, maintainability; from conventional CMS to headless to statically generated. — type: practice
- [Q] Performance and accessibility are checked throughout: loading speed, delivery load, contrast, basics of accessibility; improved after launch too. Recent interest: optimisation for search and AI-based information understanding. — type: practice
- [VIS-M][VIS-L] aircord: the site is a space, not a portfolio list. Top page is a distant 3D object, projects circulate on a ring, selecting one moves the camera in and the curved surface unfolds into a flat detail page: one continuous 2D/3D state change, not DOM layered over WebGL. — type: practice
- [EMO][VIS-M] HONKA RE:FRAME!: "embodiment" through a human figure stripped of age and identity cues; story told by gestures (stopping, reaching, walking); particle orb that never settles; balanced 3D impact against text readability. — type: practice
- [VIS-M][Q][MOB] PHOTOYOSHI (photographer portfolio): infinite scroll, two viewing modes (overview and focused), images react to mouse and scroll. Horizontal scrolling risks first-time confusion, so loading and transition animations signal scroll direction. — type: practice
- [Q] PHOTOYOSHI stack: WordPress as CMS so the owner chooses which images appear on the home screen; statically generated for speed; homepage order randomised on each visit. — type: practice
- [EMO][VIS-M] ANAI WOOD: concept of two opposing qualities (individual trees vs regular milled lumber), expressed through text that grows upward, layouts converging into a grid on scroll, changing wood cross-sections, WebGL forest in the menu background. Page transitions carry the selected image and text over. — type: practice
- [Q] ANAI WOOD stack: Jamstack with Nuxt, Contentful, Netlify, chosen for speed, security, ease of updates. — type: practice (tool-dependent)
- [VIS-M] plantica (floral studio): every animation refined and "even loading time" treated as part of the direction; goal to make a very large volume of images comfortable to browse. — type: practice

## Techniques and steps
1. Research context, industry, tone, touchpoints.
2. Fix information architecture, then visuals, motion, interaction in parallel with feasibility.
3. Pick CMS/architecture by who will update the site and how often.
4. Test speed, contrast, accessibility during production and after launch.
5. For unusual navigation (horizontal scroll), add cues in loading and transitions.

## Tools and resources
- Blender + Three.js (HONKA figure, particles, camera, light, typography)
- WordPress (PHOTOYOSHI CMS), static generation
- Nuxt, Contentful, Netlify (ANAI WOOD)
- Three.js WebGL forest (menu background)

## Quotes
- "playful, yet humble" and "good and fun things": the studio's two guiding phrases.

## Disagreements and contrarian points
Against separating design and development into sequential stages; against layering WebGL over DOM for continuity; accepts that immersive horizontal scrolling carries a usability cost and must be mitigated.

## For 1000 Islands
Highly relevant: (1) PHOTOYOSHI shows how a photo-led site works: two viewing modes, one overview and one focused, plus cues for unfamiliar navigation; (2) static generation plus a simple CMS the owner can edit is the sensible architecture for a small site; (3) treating loading time as part of the experience suits heavy photography; (4) motion must never interrupt navigation, a good rule for an upper-middle audience; (5) a homepage that shows different photos per visit is a cheap freshness trick.

## Other
Mentions search and AI-readability as a new optimisation target (no detail). Studio's own site uses staff-chosen animal icons as 3D characters: a culture-as-brand idea, not transferable.
