# I Tested Claude Skills for Web Design
- Source: Flux Academy · 2026-05-18 · 23 min · https://www.youtube.com/watch?v=jT5YdajTg6I
- Speaker(s) and why they matter: Flux Academy instructor (name not given), web-design education company; practitioner tests of public skills. No sponsor read. Light course-funnel interest only.
- Relevance to us: 5 · Freshness matters? tool-dependent (specific skills, command counts, Claude desktop UI will expire; the "skills = saved design judgment" idea and the before/after method are durable)
- Notes: captions: "for cells shadcn" = Vercel's shadcn/ui (verify); "Griffin UI" is a fictional demo agency; "Cloud" = Claude in places. Claims such as "22 other subcommands" for Impeccable and "eight tech stacks" for UI UX Pro Max come from the speaker's reading of those skills' landing pages; versions change. Note: impeccable is already installed in our project; UI UX Pro Max is deliberately not used (see project CLAUDE.md).

## Core thesis
Claude's default design output looks AI-made (purple gradients, white background, soft shadows, emojis). Skills, which are saved markdown instruction sets Claude reads before working, move it toward the judgment of a real designer. Four are worth using: frontend-design, Impeccable, UI UX Pro Max and Vercel's web-design-guidelines; you can also write your own.

## Claims and advice
- [AI] A skill is a saved instruction set (markdown plus optional reference files, fonts, themes) Claude reads before working: "like giving Claude a job description before assigning it a task"; same prompt with a skill loaded gives noticeably better output. (0:00-1:00) - type: practice
- [AI][TOOLS] Anthropic's own skills (theme factory with palettes and typography systems, canvas design with fonts, brand guidelines, web artifacts builder) are available in the desktop app: Customize > Skills > plus > Browse skills. Third-party skills come from GitHub zips (plus > Create skill > Upload) or one-line install prompts. Toggle must be on. (1:00-4:03) - type: practice
- [AIS][AI] Baseline test: prompt "Build a polished modern landing page for my design agency Griffin UI" without skills gave an obviously AI page: purple gradients, white background, soft shadows, misaligned cards, emojis. (3:02) - type: evidence from one test
- [AI][AIS] frontend-design (by Anthropic): works largely because it tells Claude what not to do (no "overused font families, clichéd color schemes"). Same prompt after install gave a custom cursor, fade-ins, hover states, smooth-scroll links on the first pass; tends toward an editorial look (serif + sans). You can edit the skill (e.g. "only sans serif: Geist, Google Sans, DM Sans"). Trigger it with slash to make sure it is used. (2:01-6:05) - type: practice
- [AI][VIS-M][AIS] Impeccable: teaches typography, color and contrast, spatial design, responsiveness, interaction, motion and UX writing; used by one main slash command plus about 22 subcommands (animate, colorize, quieter, audit, document, live...). animate added intro animations in one prompt; quieter ran an audit (gradient text everywhere, heavy font weights on every heading, emojis), ranked severity and fixed them, making the page quieter and "less AI-generated". (6:05-9:08) - type: practice
- [AI][Q] Impeccable audit is a five-dimension technical quality check (accessibility etc.); document generates a design.md capturing the design system for any agent to read; live (in development) iterates on UI in the browser. (6:05-9:08) - type: practice
- [AIS][REF] Impeccable's "slop" tab lists patterns AI is taught to avoid (e.g. a side-tab accent border); worth studying to spot AI-looking patterns when designing by hand. (9:08) - type: practice
- [AI] UI UX Pro Max: library of UI styles, color palettes, font pairings, eight tech stacks; makes Claude reason and search its design database before generating, then runs a quality checklist. First run barely changed the page (emojis became icons); asking for "a more drastic redesign" and to use the palette/font libraries "to full advantage" gave bolder results (light-to-dark KPI band, code-style text, integrations list) but also a bad thick dark line above cards. (9:08-13:12) - type: evidence
- [AI] You can edit a skill's markdown to remove styles (e.g. delete "glassmorphism") or tell Claude never to use a pattern again. Be specific about content so the skill can enhance your direction. (11:10-14:12) - type: practice
- [Q][AI] web-design-guidelines (Vercel Labs): audits UI against a long list of web interface rules (keyboard works everywhere, never disable zoom, don't block paste, loading indicators on buttons, focus states, semantic HTML, forms, layout, animation, content). Best near the end as a review, not for generating beauty. Result flagged missing anchor navigation for keyboard/mobile users, no focus ring on the main CTA, unnamed avatar group, five stars without aria-label. (14:12-16:13) - type: practice
- [AI][Q] Ask Claude to annotate the page itself with issues (orange outlines, counts) instead of only listing them. Claude "doesn't always do a great job at considering accessibility". (15:13) - type: practice
- [AI] Claim: you do not need 20 skills; the four above "cover 90% of what you're going to be doing". (16:13) - type: opinion
- [AI][TOOLS] Where to find more: UI Skills library (design-engineer oriented; frontend-design, UI UX Pro Max, impeccable, accessibility fixes, WCAG audit patterns, shadcn component skill, design-taste-frontend), Type UI (visual previews of style skills: elegant, modern, neo-brutalism), MCP Market (agent skills > categories > design tools). (16:13-18:16) - type: practice
- [AIS] Anti-slop skills commonly list "don'ts", such as not using generic names or avatars, which removes the placeholder look. (17:15) - type: practice
- [AI][P] Build your own skill with Claude's skill creator: it interviews you (what it should govern, audience, spacing rules, tech output). His example rules: always identify the product type first (dashboard vs landing page differ); infer the screen's goal (what matters most, what the user notices first); default to a restrained palette with neutral surfaces; one body font plus at most one display font. Output: skill.md plus references (Tailwind tokens, typography pairings). (18:16-21:19) - type: practice
- [AIS] Closing: "Claude is not a super impressive designer by default"; skills give it guidance on what good design looks and feels like. (22:20) - type: opinion

## Techniques and steps
1. Run a baseline prompt without skills; note the AI tells.
2. Install frontend-design; rerun the same prompt; compare.
3. Install Impeccable; run animate, colorize or quieter as needed; run audit; run document to produce design.md.
4. Optionally use UI UX Pro Max with an explicit "drastic redesign" request and specific content.
5. Before launch, run web-design-guidelines for UX/accessibility and ask for annotations on the page.
6. Edit the skills' markdown to ban patterns you dislike; write a custom skill with your own rules.

## Tools and resources
- Claude desktop app skills panel; frontend-design (Anthropic); Impeccable (has its own landing page with a slop tab; URL not stated); UI UX Pro Max; web-design-guidelines (Vercel Labs); theme factory, canvas design, brand guidelines, web artifacts builder (Anthropic); UI Skills library; Type UI; MCP Market; shadcn/ui skill; design-taste-frontend skill; Tailwind; Geist, Google Sans, DM Sans fonts (various)
- "The complete guide to building skills for Claude" slide deck (22:20)

## Quotes
- "Like giving Claude a job description before assigning it a task." (0:00-1:00, close paraphrase)
- "Claude is not a super impressive designer by default." (22:20)

## Disagreements and contrarian points
Frames skills as the lever over model choice or prompt tricks; also admits that skills alone do little without specific user instruction (UI UX Pro Max first pass "not really doing anything too crazy").

## For 1000 Islands
Impeccable (already our quality gate) is validated here: use `animate` only in the motion stage, `quieter` and `audit` for polish, `document` to write DESIGN.md after Stage 2 direction is chosen, and the slop tab as a checklist of tells to avoid. Run a Vercel-guidelines-style accessibility review before the owner sees links (focus states, aria labels, never disable zoom, mobile nav). Our project already decided against UI UX Pro Max's industry-template palettes; this video agrees that its first pass is weak without a specific brief. A custom house skill (restrained palette, one body plus one display font, infer screen goal, photo-led) is a candidate for our repo.

## Other
Demo project is a SaaS/AI-startup landing page; no photography or travel content.
