# I'm (finally) showing how I design with AI
- Source: Dive Club (YouTube live stream) · 2026-06-15 · 79 min · https://www.youtube.com/watch?v=zmxn4a2g0Ww
- Speaker(s) and why they matter: "Rid" (likely Ridd, designer-founder of the feedback tool Inflight; name garbled in captions, verify) working live, with host Kyle (Dive Club) and guest cameos from the Conductor and Paper makers. Practitioners who design and ship with agents daily. Commercial interests: Rid is promoting his own product Inflight; Dive Club runs a paid community; they promote Josh Puckett's paid course. They state they are not sponsored by Conductor, Paper etc.
- Relevance to us: 4 · Freshness: tool-dependent (specific tools and model names will date within months; the explore-wide-then-build workflow is more durable)
- Notes: chaotic live stream with Zoom/dictation glitches; many chat Q&As. No formal sponsor segments. Chat links and some tool names are garbled by captions: "Dial Kit" (Josh Puckett's tool), "Agentation", "Superpowers", "compound engineering", "Quiver AI", "skill distillery", "Interface Craft", "Numa" (course name) — spelling should be verified. "Cloud Code/cloud.md" = Claude Code/CLAUDE.md. Model names quoted as said (Opus 4.7/4.8, GPT 5.5), unverified.

## Core thesis
The workflow described is: explore widely and visually with an agent in a design canvas (Paper), pick a few directions, build them in code as versions on a throwaway /playground route, test them in context and share a real link for feedback, in parallel worktrees so nothing blocks. The tools will change; the habit of going wide before committing to a single coded preview is the durable part.

## Claims and advice
- [AI] Use a harness with git worktrees by default (Conductor; Cursor is similar): each worktree is a clone of the codebase, so several "mental lanes" (a Paper exploration, a playground build, a research tab) run in parallel without agents colliding, as multiple branches in one checkout would. (0:00, 28:36, 1:03:26-1:04:26) — practice
- [AI][P] Do not wait on loading states: start the next task while the agent works on the previous one; use the notification sound when an agent finishes. (7:08-8:10, 54:14) — practice
- [AI] Paper (alpha, "canvas is the DOM", HTML/CSS) is used as the visual extension of the coding agent: ask for 10 concepts, each with a default and a hover state, at medium fidelity, not pixel-perfect. Paper snapshots also work in reverse (a Chrome extension pastes a production element into Paper, no MCP needed) so exploration starts from what is already live. (2:02-3:02, 1:13:45-1:15:48) — practice, tool-dependent
- [AI][P] Rid says he now "doesn't think until he has things to look at": lets the agent produce options, then reacts; sees directions he "wouldn't have thought of". (19:23-20:23, 1:05:28) — opinion/practice
- [P] Concrete funnel: Paper makes many directions; pick 2-3; ask for about five more variants of those; riff manually 10-20% (layout, type); then "build this" in code. Used Paper about twice to get something directionally correct. (56:17-57:17, 1:05:28) — practice
- [P][Q] Constraints emerge by looking: reviewing the concepts he noticed half of them shifted page layout when text expanded, and made "no layout shift" a rule (hover popover over the item instead). (26:33) — practice
- [AI][P] Build a /playground/<feature> route in code with a version list on the left (Default = real component, V1, V2... each a fully separate duplicated component so the source of truth stays intact). Hide behind the product's own URL so nobody finds it; keep old playgrounds, he reuses ideas from them ("self-plagiarized"). (21:25-22:26, 32:42, 1:05:28-1:06:30) — practice
- [P][CL] "Trap": jumping into code too fast gives one preview on the real product surface, so only one version gets shown; keep going wide and share a playground with several versions instead. (1:07:31) — opinion
- [CL] Sharing feedback: he frames the problem first ("information hidden behind hover, page not skimmable"), shows three concepts, asks which feels best plus a sentiment/"ship it" poll; Inflight collects pinned comments and turns them into next steps for the agent. (1:09:37-1:12:43) — practice (self-promoting)
- [AI] Constrain exploration: if the agent lists too wide an exploration, narrow it; set follow-up behaviour to "steer" (inject into the running prompt) instead of queue. (7:08-8:10) — practice
- [AI] Talk to the agent by voice dictation (Whisper Flow, Monologue, Aqua, Super Whisper): you talk differently than you type and give more context, "your agents love context". Tell it your role ("I'm not an engineer") and who reviews your PRs; he has this in global rules. (2:02, 48:04-49:05) — practice
- [AI] For features beyond a UI tweak, have the agent ask clarifying questions first and use that as the precursor to a plan. Superpowers and the compound engineering plugin (brainstorm, plan, work, review, compound) mentioned as structured workflows. (13:16, 17:21, 47:03) — practice
- [AI] Plan cross-check: Opus writes the plan, Codex/GPT reviews it and gives a 1-100 confidence score (starts around 60), loop until high 80s/90; the score "might be nonsense" but helps; GPT 5.5 seen as better at technical details. (50:07-51:10) — practice, tool-dependent
- [AI] Model split: Opus as creative thought partner and in Paper; GPT 5.5 for bulk coding execution (his stated testing at the time). (6:07-7:08) — opinion, tool-dependent
- [DS][AI] Keep the design system in a separate DESIGN.md/design-system.md referenced from CLAUDE.md/AGENTS.md rather than inline, because always-loaded files eat context in non-UI sessions; instruct the agent to read real tokens for UI work and to propose (with confirmation) updates when a change applies in several places. Also cascading CLAUDE.md files per codebase level (e.g. UI kit). (23:28-25:31) — practice
- [AI][VIS-M] Dial Kit (Josh Puckett): agent adds live sliders for any parameter (spacing, easing, offsets, shader controls), you tune by eye and press copy, paste back. Used to fix one spacing (gap 80) and to time an SVG animation in 5 minutes. (10:13-11:14, 16:21, 1:01:22) — practice
- [AI][VIS-M] Agentation: click an element on the running page, write a note, copy the structured output into the agent; used for nearly all fine refinement ("slow this hover to 300 ms"). Cited by Make Local Figma as inspiration (per Rid). (29:38-30:38, 53:13-54:14) — practice
- [VIS-M] To debug an interaction, record a screen video, scrub to the exact frame, screenshot it (he found the H1 getting squished that way). Interface Craft (Josh Puckett) teaches a storyboard method for animation plus individual frames. (41:57-42:59, 45:01) — practice
- [VIS-I][AI] SVG route: generate base SVG with Quiver AI (inside Paper), pull the chosen one into code, animate with Claude, tune with Dial Kit; a hero animation went live this way. Tell Claude the goal and it may suggest SVG animation instead of a heavy library (React Flow was "heavy"). (59:19-1:03:26) — practice
- [REF] Paper is good with references: he fed Pinterest constellation patterns to the agent and explored SVG treatments of them; he is "not good at graphic design". (59:19-1:00:20) — practice
- [AI][Q] Review habits: run a code-review step, then a "simplify" pass on every meaningful PR; ask Claude which review items are "review theater" versus worth doing. (34:45-36:51) — practice
- [AI] Ask the agent to write human-facing docs, audits and plans as HTML files (MD stays for agent reading); a design skill ships a template that shows current animations and proposed changes. (55:15-56:17) — practice
- [AI][AIS] Tools churn ("no tool loyalty"); a previous episode from January is "not the same" now; stay adaptable and build your own process; "the tool stack does not make the product or the design". (36:51-39:55) — opinion
- [AI] Native iOS design-to-code tooling is behind; Agentation likely does not work in Xcode. (46:02-47:03) — opinion
- [P] Design files lag production for him: he explores and nails detail in code, and uses Paper snapshots of production instead of keeping Figma in sync. (1:15:48) — opinion

## Techniques and steps
1. Screenshot the thing that bugs you, dictate the problem and constraints, ask for N concepts in Paper with default and hover states.
2. Review, derive constraints (e.g. no layout shift), pick 2-3, ask for 5 more variants of those.
3. Riff by hand 10-20%, then tell the agent to build selected versions as V1, V2 in /playground/<feature>, each a duplicated component, matching production code diff.
4. Refine details with Agentation notes and Dial Kit sliders; check motion by scrubbing a screen recording.
5. Run review and simplify passes, share the playground link (Vercel) with a short problem statement and 2-3 versions, collect feedback, paste back to the agent.
6. For bigger changes: agent asks questions, Opus plans, GPT reviews with confidence score, loop, then build.

## Tools and resources
- Conductor: worktree-based agent harness running on own Claude/Codex subscriptions (0:00, 4:02)
- Paper: HTML/DOM-based design canvas with agent and Chrome extension (0:00, 1:13:45)
- Dial Kit (Josh Puckett), Agentation, Quiver AI (SVG generation), Superpowers, compound engineering plugin (Kieran Klaassen of Every, verify), skill distillery (GitHub), design motion principles skill (2.0/2.1), Interface Craft course (Josh Puckett; paid)
- Inflight: Rid's feedback product (promo); Vercel previews; Whisper Flow / Super Whisper; Cursor; Codex app; Claude Code
- Pinterest as reference source for the constellation patterns (59:19)

## Quotes
- "The tool stack does not make the product or the design." (39:55)
- "Your agents love context." (48:04)

## Disagreements and contrarian points
Skips Figma-first design: explores and finishes in code, treats design files as lagging. Warns against rushing into a single coded preview. Admits he edits via agent instead of CSS even when able to, because parallelism matters more than token cost.

## For 1000 Islands
The explore-wide-then-pick pattern maps onto Stage 2 hero shotgun: have the agent produce many hero variants for the Thousand Islands, derive constraints from what is seen, then keep 4-6 as separate HTML variants on a throwaway route, not one polished page. Share a link with 2-3 versions and a one-line problem statement for the owner. Keep any DESIGN.md out of always-loaded context. Dial-style sliders for spacing and motion timing are useful for photo layouts; the SVG-animation idea could suit map/island line art. Little here concerns photography, layout theory or taste.

## Other
Chat tips: Dive Club free skills on GitHub; people asking how to share local previews with non-technical people (answer: Vercel/Netlify deployment link). Long tool chatter; low density on design principles.
