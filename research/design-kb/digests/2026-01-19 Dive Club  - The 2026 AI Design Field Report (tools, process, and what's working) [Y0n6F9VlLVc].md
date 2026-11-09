# The 2026 AI Design Field Report (tools, process, and what's working)
- Source: Dive Club · 2026-01-19 · 48 min · https://www.youtube.com/watch?v=Y0n6F9VlLVc
- Speaker(s) and why they matter: host "Rid" (Dive Club; sells sponsorships, runs a talent network and the Inflight tool) interviews Steven Haney (captions "Steven Haney", verify), founder of the design tool Paper. Haney reports anonymous conversations with designers at large product companies (he names Atlassian, Shopify, Notion as conversation partners, not as sources of specific claims). Strong commercial interest: Paper is his product, and he says so.
- Relevance to us: 2 · Freshness matters? tool-dependent (product-company workflows in Jan 2026; mostly software-product design, not marketing sites)
- Notes: sponsor/ad segments to skip: Framer + Hover domains and Mobbin (5:05-6:07), Dive Talent Network (21:23-22:24), end-roll product list (47:48). Captions garble: "Ki" = Kyle? or "Kari" in the design-is-a-search tweet (verify; probably Kyle Zantos or Karri Saarinen of Linear); "Rio" (verify); "Adam" = Adam Wathan of Tailwind (verify); "Tommy" (verify). Almost all content is about product/SaaS design teams, only loosely relevant to a travel marketing site.

## Core thesis
What top product companies actually do with AI differs from Twitter hype: AI use is mandated for designers, mainly for stateful interactive prototypes on forks of the real codebase; handoff to engineers remains; designers do not push to production. Design is "a search" of the problem space, so tools that remove constraints help, but prompting does not replace thinking or canvas tools.

## Claims and advice
- [AI][P] Design vs engineering are different specialities: design expands and explores the problem space ("design is a search": study prior art, try 10 versions side by side, communicate); building is a continuum from low-fidelity vision to pixel and infrastructure detail. (1:01-4:03) — opinion
- [AI] AI is excellent for stateful prototyping (what happens on click, where focus goes, loading states), which Figma handles poorly; Figma needs three copies to show a hover or focus state. (1:01-2:01, 13:14) — practice
- [AI][P] Field finding 1: AI use is mandated in designers' performance reviews at top companies ("Full stop. 100% of designers need to use Claude Code, Cursor") to remove learning friction. (13:14) — evidence (anecdotal, anonymous, from his interviews)
- [AI][P] Finding 2: companies mostly use local Claude Code / Cursor, not Lovable, v0 or Replit (one company used Replit); the key benefit is the "starting place": your real app, not a screen rebuilt from scratch. Startups differ: designers there already code. (15:19-16:20) — evidence (anecdotal)
- [P] Finding 3: handoff is not dead; prototypes are richer specs, but designers do not push to production or want to ("do you want to start wearing a pager?"). Production means accountability and maintenance, a job difference, not a tooling gap. (16:20-17:21) — opinion/anecdotal
- [AI][DS] Finding 4: big companies maintain designer forks of the codebase; costs are environment setup, linting noise, no real-time collaboration, painful sharing; one built an FTP-like drag-and-drop preview deployer. Parallels the old double-maintenance of design system in Figma and code. (19:21-22:24) — evidence (anecdotal)
- [AI] Sharing prototype links is a pain point: Vercel preview links are the best of the engineering class but worse than a shared canvas. (22:24-23:25) — opinion
- [AI] People prompt their own helper tools into prototypes (version picker in a corner, a markdown file that lists state permutations and controls the prototype); costs time and money, everyone re-prompts the same things. (23:25-24:26) — practice
- [AI][Q] Open question: is a four-week dialled-in prototype faster than the old way? Nobody has evidence that AI-produced software is better or faster; for complex apps all code must be reviewed ("We're not vibe coding Paper"). The host spent two days on a lovable prototype and, over two months, was not solving the right problem. (24:26-26:29) — opinion
- [P] Do not compress the thinking part just because execution is easy. (26:29) — opinion (host)
- [AI] Modern web stack (TypeScript, Tailwind, Supabase, Next) plus unstyled primitives (Radix, maybe Base UI) is locking in because models are best at it; "peak library": few new primitives will emerge; teams on that stack will work very differently from legacy-stack teams. (27:29-29:31) — opinion
- [AI][TOOLS] Vision: a coding agent as central orchestrator; tools become input methods (text prompt, IDE for code review, canvas for drawing and gathering context via MCP). Paper adding a desktop app with local file access, MCP, a canvas-aware agent, stateful prototyping, Tailwind-based tokens. (10:10-11:12, 31:32-36:40, 39:41-41:42) — opinion (commercial)
- [DS] Source of truth has moved from Figma to code; designs can be disposable; LLMs translate between formats. Stateful components back into a canvas remain "muddy". (36:40-38:41) — opinion
- [AIS] Sort hype from signal: look at who is in the replies (experienced craftspeople vs bots) and who sells a product; do not worry about being behind (even Karpathy said he feels behind). (41:42-45:45) — opinion
- [P] Process now varies per project; the host can no longer give a rehearsed "my design process" answer; decide the path for each initiative. (43:44) — opinion
- [AI] Advice to designers: skill up, play with the tools even if the job does not require it, but avoid extremes: "design tools are dead" and "AI is bad at visuals, I refuse". (41:42-45:45) — opinion

## Techniques and steps
Mostly descriptive, no step lists. Implied designer workflow at big companies: fork production repo into a designer copy, prompt a stateful prototype from the real app, share via preview link, hand off as a spec plus prototype to engineers who ship.

## Tools and resources
- Paper (paper.design, build log at paper.design/buildlog): canvas tool with real React/Tailwind rendering, MCP (41:42)
- Cursor, Claude Code, Lovable, Replit, v0: prototyping tools compared (15:19)
- Figma and its MCP server (limits of proprietary format) (30:31)
- Tailwind, Radix, Base UI (28:30)
- Shape Up and hill charts from Basecamp (8:08)

## Quotes
- "Design is a search." (paraphrase of a tweet he cites, 2:01-3:03; attribution garbled, verify)
- "Do you want to start wearing a pager?" (17:21)

## Disagreements and contrarian points
Against "design and engineering are the same thing" and "handoff is dead / Figma is dead"; also against refusing AI. Questions whether AI prototyping saves time overall. Cites his own bias as a tool maker. Contrasts startup practice (designers ship PRs) with big-company practice.

## For 1000 Islands
Little. Useful only as caution: a prototype is not the same as thinking; "real starting place" supports starting from our existing wireframe HTML rather than regenerating; the sign-off before building (our written pipeline) fits his point that handoff and thinking remain. Skip the product-team content.

## Other
Anecdote: designers building iOS apps without writing code over the holidays; Karpathy tweet of feeling behind (verify). The host's Figma-vs-code-as-source-of-truth remark ("I just gave up" keeping Figma updated) is relevant to our "HTML is source of truth" rule.
