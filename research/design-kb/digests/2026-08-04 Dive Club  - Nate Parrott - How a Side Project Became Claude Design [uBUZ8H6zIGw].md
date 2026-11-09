# Nate Parrott: How a Side Project Became Claude Design
- Source: Dive Club (host "Vid"/Ridd, name garbled in captions, verify) · 2026-08-04 · 53 min · https://www.youtube.com/watch?v=uBUZ8H6zIGw
- Speaker(s) and why they matter: Nate Parrott, designer who led Claude Design at Anthropic; formerly founding designer at The Browser Company, then one of two designers on Claude Code. Practitioner and toolmaker, with an obvious commercial interest in Claude Design. The host runs a design community and sells sponsor slots.
- Relevance to us: 4 · Freshness matters? tool-dependent (Claude Design features, model/effort settings) but the working habits are durable
- Notes: Captions garble product names ("claw design"/"cloud design"/"client design" = Claude Design; "cloud code" = Claude Code; "Dial Kit by Josh Pucket" = DialKit by Josh Puckett (verify); "DES"/"dsn" = a canvas tool called Dessn (verify); "Cleot" = probably a screen recorder (verify)). Sponsor segments to skip: Jitter (about 4:20-5:06), Dessn private beta (5:06-6:07), Dive Talent Network (30:33-31:00). Lots of product-origin storytelling; the practical advice is concentrated at 1:00-4:00, 16:17-18:19 and 45:48-50:54.

## Core thesis
Models are getting better at design execution but still lack taste, so the designer's job shifts to ideas, context and judgment: give the model rich context, ask for many options, and treat it as a fast junior. Because building software is getting cheap, "what you build" and design thinking become the differentiator.

## Claims and advice
- [AI][P] Prompt-first workflow: give a rough outline, ask for options, ask for "five different versions of every possible aspect" (layout, color, icons, copy size), try them all, then say "I like A a bit and B a bit, give me six more in that vein". Volume compensates for the model's lack of taste. (1:00-3:02) — practice
- [AI][AIS] "Models are getting better and better at design, but they're still really far from being good and really far from having good taste." (1:00) — opinion
- [AI] Treat the model "a little bit like a junior designer": your taste plus its ability to mock things up very fast. (2:01) — practice
- [AI][VIS-C] If unsure about a parameter (color scheme, animation damping), ask Claude to build a throwaway control panel: five options, sliders, drag-to-position. Example: "photo edit style sliders" for hue/chroma/lightness over all color variables, to eyeball a vibe before dialing exact colors. (3:02-4:04) — practice
- [AI][VIS-C] Palette from an image: drop a photo (a tangerine) into the one-off editor and it generates a theme to tweak. (6:07) — practice
- [AI][VIS-M] The model is poor at animation timing and cursor positioning because it sees screenshots, not video; fix by asking it to generate a tool exposing every parameter (about 173 tweaks for one animation) so a human eyeballs it. (6:07-7:07, 46:48) — practice
- [AI] Custom one-off editors are the "secret third thing" next to coding tools and design tools: think of the exact problem and have the model build the perfect tool for it. Paraphrase: the best way to make amazing work in these tools is to think deliberately about the environment you set up first. (14:13-18:19) — opinion
- [AI][P] Interactive documents and decks: HTML lets a deck or doc be interactive (tweak assumptions, drag a globe). Embrace the "fuzzy space" between prototype, deck, document and animation. (7:07-9:08, 47:51) — opinion
- [AI] Voice plus pointing: dictate feedback while pointing at elements; e.g. "the knob on this slider is a little too small", "you're doing the classic thing where you have a colorful left border but no border on the rest of it." Increases bandwidth to the model. (11:10-12:12, 47:51) — practice
- [AI][CL] Comment button: click an element and leave a comment instead of re-describing it; ask for "four different variations" of just that element. (32:35) — practice
- [AI] Tool landscape view: every designer on a software team should use Claude Code to ship real output; Claude Design (or Figma etc.) is for everything else: shaping ideas early, napkin sketches, alignment. No tool is "the" tool yet; polished tools (Figma, After Effects, Origami) remain useful. (15:16-18:19) — opinion
- [AIS][Q] Paraphrase: as building software becomes easier, what you build matters more; design becomes valuable when engineering is compressed. Differentiator = design, ideas, positioning, creativity. (16:17) — opinion
- [AI] Claude Design was deliberately not a website builder: no deploy, throwaway visual artifacts only; they lowered default effort levels because a fast human feedback loop beats bug-free code for sketches. (25:28-27:30) — product decision
- [AI][P] Ideas are the currency: he spends more time on walks and voice notes, then drops the idea (Apple note, voice note, memo) into the tool to get a doc, deck, prototype or animation in whatever format stakeholders need. (28:31-29:32) — practice
- [AI][CL] Communication workflow: after exploring with Claude, ask it to "take everything I've told you and write it up and annotate it" as mockups, decks or docs to send for stakeholder feedback. (33:36) — practice
- [AI] Attach the codebase/design system as source of truth so the mockups use real components; for straightforward changes go straight to Claude Code and ship. (33:36-34:36) — practice
- [AI] Vocabulary problem: non-engineers lack the words (staggered animation, perspective transform, spring damping, Z-stack, three.js particle effects). "We are just essentially doing design with words." A vocabulary center with visual previews is proposed (not built). (37:40-40:42) — opinion
- [AI][AIS] Tip 1: "You get out what you put in": bring assets, brand colors, fonts, screenshots, moodboards of the intended feel, or you get "slop that looks like what everyone else has". Be prescriptive. (45:48-46:48) — practice
- [AI] Tip 2: ask for tons of options; Tip 3: ask for tweak-tools where it is weak; Tip 4: use voice; Tip 5: ask Claude "what are some ways I could make this stand out given that it's just HTML?" and you supply the taste ("Don't just ask Claude to make it cool"). (46:48-50:54) — practice
- [AI][EMO] Examples of expressive one-offs: textured postage stamp with ducks and perspective highlight on mouse move (by Yanlu), a pixel icon editor, a "weatherman" green-screen feedback prototype, a deck that presents itself via speech recognition. (13:12-14:13, 48:51) — evidence/anecdote
- [AI] Packaging matters: his early Claude Code skills "didn't take off" until wrapped in an interface; the tension is how "on rails" a tool should be versus fully general. (43:46-45:48) — opinion/evidence

## Techniques and steps
1. Write a rough outline prompt (voice or text), attach context: codebase, brand assets, fonts, screenshots, moodboards.
2. Ask for 5 variants of each design aspect; pick favorites; ask for "six more in that vein".
3. Where taste is hard to specify (color, timing), ask for a custom slider/drag tool and eyeball it.
4. Give feedback by voice with pointing, or with the comment button on single elements.
5. Ask the model to write up reasoning as an annotated doc/deck for stakeholders.
6. Go straight to Claude Code for simple, non-visual changes.

## Tools and resources
- Claude Design (Anthropic; research preview shipped mid-April 2026 per the speaker, built since Jan 2026): agent plus HTML output, voice mode, comments, tweaks (whole video)
- Claude Code: shipping real code (16:17)
- DialKit by Josh Puckett (verify): parameter-slider tool for tweaking (3:02, 39:41)
- Figma, After Effects, Origami, Paper: other design tools mentioned (15:16-18:19, 34:36)
- v0, Lovable, Bolt: website builders Claude Design explicitly is not (25:28)
- Jitter, Dessn: sponsors (skip). Supercut MCP: video of himself as a prompt (11:10)

## Quotes
- "You get out what you put in." (45:48)
- "Don't just ask Claude to make it cool." (49:53)

## Disagreements and contrarian points
Against the "Claude Design replaces Figma/code" framing: he says designers should code and ship, and sees no all-purpose design tool. Admits Claude Design is rough and onboarding is not "close to nailing" it. Against the idea that sketches need production-grade code.

## For 1000 Islands
Stage 2 variant exploration fits: ask for 5 hero variants per direction, pick, then iterate "in that vein". Feed moodboards, owned photos and fonts as context so the output is not slop. Use throwaway slider tools to tune color grade or motion timing (animation is the weak point). Use the "write it up and annotate it" step to produce the owner presentation. Remember he stresses taste and ideas as the human part.

## Other
Anthropic origin story: started as a Claude Code terminal-mockup experiment (late 2025), built with Opus 4.5-era agents; first right form factor end of January 2026, shipped mid-April. Heavy PM adoption internally. Commercial bias toward Claude Design.
