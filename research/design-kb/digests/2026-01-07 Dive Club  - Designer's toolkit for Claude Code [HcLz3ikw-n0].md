# Designer's toolkit for Claude Code
- Source: Dive Club · 2026-01-07 · 48 min · https://www.youtube.com/watch?v=HcLz3ikw-n0
- Speaker(s) and why they matter: host of Dive Club (captions say "Vid", verify; he also builds the feedback tool Inflight) interviews Kyle Zantos (captions "Kyle Xantos", verify), who runs "UX Tools Lab", evaluating new design tools and workflows. A practitioner and self-described tinkerer working toward "design engineer"; the host has commercial ties to the products he promotes.
- Relevance to us: 3 · Freshness matters? tool-dependent (Cursor, Claude Code, Factory Droid, Gemini 3 Pro, plan prices will date; the "philosophy over setup" advice is durable)
- Notes: sponsor reads to skip: Granola (about 4:08-5:09), Lovable connectors (5:09), Inflight (24:33-25:34), host's product list/partners at the end (47:01). Garbled names to verify: "Yakob" = Jakub Krehel, "Jay Tommpkins" = probably Jhey Tompkins (CodePen), "James McDonald", "Derek Briggs" (Campsite), "Kieran Clawson" = Kieran Klaassen (compound engineering plugin, Every marketplace), "Lea/Leva" = Leva control panel, "tweet pane" = Tweakpane, "Santos.co" (his personal site), "Will King", "Nick Patterson", "Emil Kowalsski" = Emil Kowalski. Mostly conversation about tooling, not visual design principles.

## Core thesis
Designers moving toward building with AI should stop chasing specific tools and learn the philosophy: make playgrounds for the details you cannot find, feed the best designers' techniques to the agent as a reusable skill, add control panels to tune animation, and keep CLAUDE.md slim. Nobody has definitive answers yet; experiment in protected time.

## Claims and advice
- [AI][TOOLS] Cursor's in-app browser plus visual editor is an easy win for designers to tweak spacing and arrangement without the prompt loop, then apply via the agent; it is not "Figma is dead". He still uses Claude Code in a plain terminal inside Cursor. (1:01-4:08) — opinion/practice
- [AI][TOOLS] Beginner-friendly: the Claude Code / Codex / Factory VS Code extensions give a friendlier layout than the raw terminal, though some plugins only work in the true CLI. (6:10-7:11) — practice
- [AI] Build "a playground" (a small studio page with parameters) whenever you cannot find an existing version of an interaction; once the state feels right, paste the code back into the agent as the spec. Example: sound on/off waveform toggle for his site. (10:15-12:16) — practice
- [AI][VIS-M] To describe effects you lack words for: (1) learn developer nomenclature (for example "glitchy CRT scan lines") because LLMs were trained on those words; (2) point Claude Code at a source (tweet, page) and tell it to work out the technique. (13:16) — practice
- [REF][VIS-M] Example technique: layered shadows (about three, different opacities and spreads) instead of a border for a subtler, more elevated edge; he fed the URL to Claude Code, which extracted the snippet and applied it; asked for five layers for a stronger variant. (14:18-17:20) — practice
- [REF][AI] "Don't copy": feed a full tweet thread and image, ask the agent to scan and find easy wins, "steal the best parts" of a style; his buttons look better in code than in Figma because of this. (17:20) — practice
- [REF][AI] Build a skill plus sub-agent from designers you admire (Jakub Krehel, Jhey Tompkins: 15-20 CodePens and tweets, whole sites), using the compound engineering plugin's skill-creator; the result is a visual/interaction design auditor invoked on an app. Add more people (Emil Kowalski) and ask the agent to re-synthesize the whole philosophy. (18:21-24:33) — practice
- [AIS][AI] Do not create one skill that is every designer you admire: it becomes useless bloat; be surgical. Over-absorbing subtle designers made the auditor too conservative; correct it with your own taste feedback ("big but tasteful" when it fits). (26:34-27:35) — practice
- [AI][VIS-M] Add a Leva control panel (or Tweakpane) so every animation parameter (easing, hover timing, tracer delay) is a knob; just tell Claude Code to set it up, or ask for "knobs for all relevant controls". (28:36-33:40) — practice
- [AI] Put reusable instructions in global CLAUDE.md (for example "when I say give me controls, add Leva and ask clarifying questions"). Keep global and project CLAUDE.md/AGENTS.md slim: they are persistent memory and bloat hurts; use sub-directory CLAUDE.md files for components or backend. (34:43-36:45) — practice
- [AI] Advice older than about four months is probably outdated unless it is philosophy; content creators get views from "10x your Claude Code" lists and are not the authority. Learn the ethos, not the literal setup. (36:45-38:48) — opinion
- [AI] Stable tenet: plan before you execute with agents; otherwise play and evolve. Warns against the "optimize, optimize" loop spending more time on setup than on work. (39:50-40:52) — opinion
- [AI][BIZ] Budget: free trials; combine a Claude Code $20 plan with a Factory Droid $20 plan (multi-model; Gemini 3 Pro used for UI generation) to avoid hitting limits; he uses the $100 tier and rarely hits limits. (41:53-43:56) — practice, tool-dependent
- [AI] Claude Code is useful beyond coding: sitting on an Obsidian vault, cleaning Linear issues. (43:56) — practice
- [P] "Tuneup days": a half day where you may not do project work, only improve setup, try tools, and consume education; keep a running list for the next one. (44:59-45:59) — practice
- [P] Building for yourself and people near you (his toddler's game apps, a pick'em app) is how he learned most coding. (30:37) — practice

## Techniques and steps
1. Spot a technique you like (shadow stack, hover effect); give the URL or tweet to the agent and ask it to work out and apply it, then ask for a stronger or weaker variant.
2. Collect 15-20 examples from a designer you admire; ask the agent (with a skill-creator) to make a skill plus an auditor sub-agent that embodies their techniques and philosophy.
3. Run the auditor on your app; give feedback on taste and iterate on the skill.
4. For animation, ask the agent to add Leva controls so you can tune values live.
5. Put recurring preferences in a short global CLAUDE.md.
6. Schedule tuneup days.

## Tools and resources
- Cursor (visual editor, in-app browser), Claude Code, Factory Droid, Codex, Warp terminal (1:01-7:11, 41:53)
- Compound engineering plugin (Every marketplace) with slash plan/work/review (18:21-38:48)
- Leva, Tweakpane: parameter control panels (28:36)
- Gemini 3 Pro: UI generation (42:55)
- Obsidian, Linear (43:56); UX Tools Lab (41:53)
- Designers to learn from: Jakub Krehel, Jhey Tompkins, Emil Kowalski (verify spellings)

## Quotes
- "Claude code is just claude computer." (44:59, also teased at 0:00)
- "Everybody's going to start having their own workbench." (9:14)

## Disagreements and contrarian points
Against copying set-up recipes from YouTube ("learn the philosophy more than the literal way"); against one mega-skill of all admired designers; against "Figma is dead" framing of Cursor's editor.

## For 1000 Islands
Mostly general tooling. Useful: ask the agent to extract specific techniques from references we admire (instead of vague adjectives); use a control panel (Leva) to tune hover/scroll timings for a photo-led site; keep our CLAUDE.md slim (ours already is); create a small "reference-skill" from 15-20 travel/editorial sites we choose in Stage 2 rather than many. Layered-shadow borders are minor for a photo site.

## Other
Personal-site examples: AI-generated retro-futuristic imagery, hover video with sound, hologram projector, lunar-lander game as easter egg; the idea that a personal site is a place for play.
