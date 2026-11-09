# GPT-6 Astra can build the website in Codex. It still needs you to choose the design.
- Source: DesignCode (Meng To) · 2026-09-20 · 41 min · https://www.youtube.com/watch?v=KOZjqVNHIo8
- Speaker(s) and why they matter: Meng To, designer-founder of DesignCode (and the Aura design tool, per the earlier digest); practitioner and educator. This video is explicitly sponsored by Diff UI (diffui.ai) and works largely as a product demo plus a skills/prompt giveaway (own open-source skills repo, a "3D UI" product, a discount link). Treat tool-praise as promotional.
- Relevance to us: 3 · Freshness matters? tool-dependent (GPT-6 "Astra", GPT image 2.5, Diff UI, Codex, Hicksfield; all will expire); the workflow idea (brainstorm images, then convert to HTML with a prompt, self-verify) is durable
- Notes: Sponsor disclosure at 1:00-2:02 ("this video is sponsored by diffui"); the whole video is built around the sponsor's tool, so there is no clean segment to skip. Garbles: "GPT6 Astra", "GBT 2.5"/"GPT image 2.5" with "Flare" and "Sunburst" quality models (verify), "Hickfield" = Higgsfield (verify), "Meshi" = Meshy, "Triple 3D" = Tripo 3D (verify), "Hyper 3DS" = Hyper3D (verify), "Aura mcp", "canvasui.dev" (verify), "Fable 5.1", "mangto skills" a GitHub path (verify). Claimed cost "$10 to $20" then "less than $5" for the designs (self-reported, USD). Heavily game-themed demo (Witcher-style card game landing page), not a business site.

## Core thesis
Frontier coding models can build a site from a prompt, but they still need design direction. His loop: brainstorm designs as fast, cheap, branching image variants (logo, hero, sections, buttons) in a collaborative canvas, pick the direction by taste, then copy an agent prompt (image plus markdown spec) into Codex and steer it with technology specifics and "self-verify until perfect".

## Claims and advice
- [AI][AIS] Even a very smart model "still needs a lot of directions": it is slow and makes mistakes and needs steering, so decide the design before spending expensive build tokens. (1:00-2:02) — opinion/practice
- [AI][MB] Brainstorm visually first: image-generation canvas with screenshot drag-and-drop as inspiration; ask for "something inspired by this" in a different style; double-click a region to branch a variant of that section without writing a prompt; each change produces multiple versions. (7:07-14:17, 15:21) — practice, tool-dependent
- [AI] Steer away from the reference at the start: say you do not want the same model/colors/logo as the reference, since the image model copies it. (7:07) — practice
- [AI][VIS-I] Explore brand elements before coding: logos and buttons and card styles as transparent PNGs, floating cards, "no platforms"; section by section. "It is up to me to find the direction... before we even get into the coding." (15:21-16:23) — practice
- [AIS][VIS-L] The AI tends to cram things; steer for less cramped layouts, add missing content ("add a map... in a drawing style"), add "a little bit of flair of taste", e.g. a red flag background; select an area and edit that part, then ask "don't change too much, just correct the design". (16:23-19:27) — practice
- [AI][VIS-T] Keyword "ornamental UI" works better than "skeuomorphic" for heavy decoration and immersion. (18:25) — opinion
- [AI] Multitask: run several branches at once; do not expect final output ("not meant to be a final result"); fix pieces with corrective prompts. (14:17-19:27) — practice
- [AI] Handoff: a "copy for agent" button exports a prompt with an HTML-implementation instruction and a markdown spec; he adds stack steering and ends with "self-verify until perfect" because it makes the agent "work so much harder and longer" and yields better results. (3:02-9:12, 35:53) — practice
- [AI][VIS-M] Prompt specifics for the card effect: single HTML file, three.js cards with depth, normal and roughness maps, landscape and columns as separate transparent PNG layers, parallax on mouse over and orbit; to get 3D from images generate 3D models (Meshy, Tripo, Hyper3D, Higgsfield) and use as reference. (9:12-11:13, 26:35-30:45, 35:53) — practice
- [AI][Q] Say "retina resolution" explicitly or the model may output non-retina (pixelated) assets; also request high-resolution text. (11:13, 32:46) — practice
- [AI][VIS-M] Save good effects as reusable skills ("turn the snow into a skill"), so next time you skip the verification and fixing. His skills (open source): sky rays depth map, four seasons (snow), falling leaves, high-polygon, Blender gears, 3D vocabulary for lighting/shadow/textures. Shader effects source: a site he calls canvasui.dev (verify). (28:40-34:52) — practice
- [AI] Image generation inside Codex uses the Codex subscription (image skill/plugin), so no external API key; mention the model/quality tier or it may fall back to an API provider. (36:54) — practice, tool-dependent
- [P] Build sections one at a time and merge into one page; keep card browsing as a separate page ("a lot of scrolling, a lot of navigation"). (37:54-40:00) — practice
- [AI] He works in an "HTML folder" because it is easy to iterate, avoids lots of files and moves between projects. Settings used: Astra at extra-high, full access for autonomy. (24:33-25:33) — practice
- [AI] Collaboration gap: Codex and Claude Code lack multiplayer, comments and notes like Figma; the sponsor's canvas is multiplayer. (6:07-7:08) — opinion (sponsor-biased)
- [BIZ] Cost claim: roughly $10-$20 total for many designs (3:02), later "less than $5" (22:30), cheaper and faster than Higgsfield or Codex via API (self-reported). (3:02, 22:30) — claim

## Techniques and steps
1. Prompt a hero (e.g. "Diablo-inspired landing page"); drag a reference screenshot and ask for a re-styling, telling it not to copy colors/logo.
2. Branch: double-click regions (about, world, footer) to generate section variants; request logo, button, card explorations as transparent PNGs.
3. Steer: reduce cramming, add content, edit regions, request "don't change too much, just correct".
4. Choose the direction by taste; copy for agent.
5. In Codex: new thread in an HTML folder, paste prompt plus MD, add stack/layers/maps/orbit steering, specify retina, finish with "self-verify until perfect".
6. Add sections one by one with their own copied prompts; save recurring effects as skills.

## Tools and resources
- Diff UI (diffui.ai): sponsor, multiplayer image-to-HTML brainstorming canvas (whole video)
- GPT-6 "Astra", Codex, GPT image 2.5 (verify names) (0:00, 24:33)
- three.js, depth/normal/roughness maps (26:35)
- Meshy, Tripo 3D, Hyper3D, Higgsfield, Aura MCP (10:12)
- canvasui.dev shader effects (verify) (27:39-28:40)
- His open-source "3D" skills folder on GitHub (33:49)
- "Fable 5.1" mentioned as comparable model (30:45)

## Quotes
None needed beyond claims.

## Disagreements and contrarian points
Against the idea that a strong model replaces design direction (title). Slightly against Codex/Claude Code's lack of multiplayer. Overall a sponsored, effects-first view that conflicts with copy-first voices like Malewicz (same batch) who say visuals must come second.

## For 1000 Islands
Limited fit. Reusable ideas: (a) pick direction from image variants before building, (b) a "copy for agent" style handoff, i.e. our screenshots plus DESIGN.md plus a specific prompt, (c) end prompts with "self-verify until perfect", (d) state retina resolution, (e) build one section at a time. Heavy 3D/shader/parallax effects are off-brand and out of scope for a quiet, photo-led travel site; at most one subtle depth effect could be tested in the hero. Avoid generating the site's photos.

## Other
Mentions making games with the model; Witcher-style demo (Gwent-like) used for effects showcase. Promises downloadable landing pages and a shared session in the description (not available to us).
