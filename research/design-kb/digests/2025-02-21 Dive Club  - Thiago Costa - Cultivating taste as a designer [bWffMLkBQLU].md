# Thiago Costa: Cultivating taste as a designer
- Source: Dive Club (YouTube, host Ridd) · 2025-02-21 · 58 min · https://www.youtube.com/watch?v=bWffMLkBQLU
- Speaker(s) and why they matter: Thiago Costa, co-founder and sole designer of a finance product called "Fay" in the captions (probably Fey, verify), whose UI is widely admired for craft; previously co-founded the studio Narrative (2018). Host runs Dive Club and takes sponsors (Visual Electric, Framer and others).
- Relevance to us: 4 (module 3/4: taste, light and depth, craft details) · Freshness: timeless (art and light principles) with a little tool talk
- Notes: Sponsor reads at 6:10-7:12 (Visual Electric, "inflight" product teaser) and 35:48-36:51 (host's tool stack ad); skip. Captions garble: "Fay" (Fey), "Caravaggio" appears as "car vaju", "Mentor Ray" = mental ray renderer, "Paco from linear" (verify), "Masashi" quoted on practice and repetition (verify), "Roi" (unclear). The long childhood and career story is background.

## Core thesis
Taste is a heightened awareness of how things look and why (light, shadow, color, proportion), trained by exposing yourself to art, film, architecture and nature rather than to other UIs. Craft shows up as a thousand small decisions that users feel without noticing them, and Costa argues that craft becomes more valuable as AI makes baseline "clean and pretty" cheap.

## Claims and advice
- [VIS-L][P] Founder story: they started with a studio (Narrative) to fund their own product; a waitlist page with beautiful screenshots drew 4,000-5,000 signups in about six months, then they interviewed users one-on-one. (1:01-5:07) — evidence (background)
- [Q][EMO] "Beauty as a guiding principle" forces simplification; in a boring industry (finance) a beautiful, simple product makes people care. (5:07) — opinion
- [P] They do not plan or wireframe: they open Figma, take a screen and move things around; sometimes the team "screams" that it makes no sense. Redesign comes from gut feeling at the "intersection between art and science"; not thinking about data or customers at that stage. (17:23-18:24) — practice
- [P] Keep a "graveyard" Figma file for retired designs so the main file stays clean for engineers; old designs are sometimes better and come back. (12:17) — practice
- [Q] Being a good designer is saying no to most of your own ideas ("shower ideas" lose quality between shower and Figma) and to good-sounding customer feedback that does not fit the product context. (12:17-13:18) — opinion
- [REF][VIS-C] Learn from art, "the original UI"; study colors, lights and shadows from books; he is annoyed that designers ignore film, art, music. "Everything outside UI and apps has something to teach you." (18:24-19:26) — opinion
- [REF] Go to the source: avoid taking inspiration from other UI, since UI is itself distilled from the world; they do "shamelessly" borrow from Apple products and film color palettes. (20:26) — practice
- [VIS-C][VIS-L] Optical mixing (pointillism): many small outlines, shadows and gradients that look like little up close but make the UI "pop" as a whole; used to escape flat dark mode where everything looks the same. Adds texture, volume, elevation without changing the palette. (19:26-20:26) — practice
- [VIS-L] These art-derived techniques (shadows, lines, strokes) are easily codable in CSS; a "glass button" people called impossible in CSS was built in CSS. Design first, solve implementation later; sometimes performance limits it. (21:27-22:27) — practice
- [VIS-L] Light must make sense: if there is a shadow there is a light source, so add a highlight edge on the side facing the light: a stroke with a gradient from transparent to white about 10%, brighter on the top. A flat shadow on a flat button does not look grounded. (22:27-26:32) — practice
- [VIS-L] To learn light: shine a phone flashlight on paper and watch how everything reacts; study paintings (Caravaggio as "master of light") and copy even the light source direction next to your UI. (24:31-25:31) — practice
- [VIS-L] Lines: a line "punched" into the surface needs a highlight at its top edge and a dark hole; a floating line needs a shadow. (26:32) — practice
- [VIS-C] Rules like "stack lighter in dark mode as elements approach the light" are guides to avoid nonsense, not laws: Fay does lighter page background with darker containers because "it just looks good"; a dark object on a lighter table is realistic. Don't use light-colored drop shadows; refraction is not a shadow. (27:34-28:35) — opinion
- [VIS-L] Do not go overboard: heavy skeuomorphism with low contrast leaves users unsure what is a button. (29:38) — opinion
- [Q][EMO] Cohesive small details (a 40-minute wallet illustration with stitches in settings) are felt as polish even by non-designers; "the sum of a thousand tiny decisions". Do things because they are right, even if nobody would notice their absence. (29:38-30:39) — opinion
- [VIS-I] Company logos were hand-made one by one with optical alignment (you cannot center a triangle in a circle); about 10 logos per day into a database; check how brands use their logo on Instagram instead of reading the whole guideline. (30:39-31:41) — practice
- [VIS-T] Optical alignment of an icon at the end of lowercase text; engineers follow Figma 1:1, so spacing offsets are put in the design. (32:43) — practice
- [VIS-M] Command-bar animation took the longest: many variations compared in side-by-side screen recordings; unusual choice of a snappy open and an elegant closing with bounce, icons sliding from the sides and a motion blur on expanding icons to ground it in real camera behavior. (32:43-34:44) — practice
- [VIS-L] Shadows are stacked blur layers (cascading), not the default Figma drop shadow, for a realistic look. Details also on the error page (processor etched with the logo, in vector) and empty states (paper etched with an icon). (34:44-35:48) — practice
- [AIS][Q] "Craft" value rises as tools improve: you can spin up a landing page in minutes, but it will not feel like one made by someone pouring their heart in; analogy: Japanese artisans making few knives per year. He admits this might be a hot take. Teams that build for themselves and care are "only going to become more sought-after". (49:14-51:18) — opinion
- [AIS] AI trained on existing UI cannot break the mold; breaking out needs a person to "break the rules". (51:18-52:18) — opinion
- [BIZ][P] Curriculum advice: start with history and art, not tools (he learned Flash at university and it is useless now); teach communication (articulating ideas); teach that design includes customer service and engineering; teach how to "sell beauty" to executives (beauty simplifies and makes the product memorable, like a car or a video game). (52:18-54:20) — opinion
- [CL] Listening to feedback: even if you do not apply it now it makes you better; receiving criticism early builds resilience. (55:24-57:28) — opinion
- [EMO] Definition of taste: "heightened awareness of how things are configured", not that one person has better taste than another; it changes over time; you practice it by understanding why things look the way they do. (45:07-47:10) — opinion

## Techniques and steps
1. Add depth with a consistent light source: pick a direction; put a stroke with a transparent-to-white gradient on edges facing it; make the top brighter; use stacked soft shadows on the opposite side.
2. To learn light, photograph or sketch real objects under a phone flashlight; copy light direction from a painting beside your UI.
3. Replace drop shadows with several layers of increasing blur (cascade).
4. Optically align logos and icons by eye, not by math; build assets one by one.
5. Test animations by recording many variants and playing them side by side.
6. Keep retired designs in a "graveyard" file.

## Tools and resources
- Figma: all design work, graveyard file (11:16)
- CodePen: used by a peer to show the glass button in CSS (21:27)
- The Local Project (YouTube architecture and interiors channel): recommended for visual taste (47:10)
- Caravaggio paintings: reference for light (25:31)
- Maya / mental ray: early 3D experience (39:57)
- Sponsors (ignore): Visual Electric, Framer, Jitter, Raycast, Genway (verify)

## Quotes
- "Everything outside UI and apps have something to teach you." (0:00, 19:26)
- "Being a good designer is to say no to most of the ideas that you have." (13:18, paraphrase)
- "The sum of a thousand tiny little decisions." (host, 30:39)

## Disagreements and contrarian points
Against designers who only look at other UI for inspiration. Against rigid dark-mode lighting rules and, mildly, against heavy wireframing (they go straight to high fidelity in Figma). Against the view that AI erases craft value: he argues craft value grows, while conceding this may be wrong.

## For 1000 Islands
For a photo-led travel site: take references from film stills, painting and architecture photography rather than from other travel sites; the owner's Stage 2 moodboard can include non-web references (light, water, stone, boats). Use one consistent light direction in any shadows or overlays, and few, soft, layered shadows; avoid flat-dark-mode sameness. Small coded details (optical alignment, careful hover and closing motion) are cheap in HTML/CSS and signal care to an upper-middle audience. The "taste = awareness" framing helps when explaining our choices to the owner without arguing about fonts.

## Other
Long personal background (childhood, father a cardiologist, mother an artist, prescription chart as first UI design, 36:51-43:03) about distilling complex data. "Founder-market fit" anecdote: he sees lacking finance background as helping them attract similar users (43:03). The Fay 2.0 rationale: AI-native redesign (data in the background, AI interprets), perfection as moving goalposts (6:10-10:13) is product-specific and not relevant to us.
