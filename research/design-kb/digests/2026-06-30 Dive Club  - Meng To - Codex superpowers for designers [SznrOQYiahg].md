# Meng To: Codex superpowers for designers
- Source: Dive Club (YouTube podcast, host Rid) · 2026-06-30 · 36 min · https://www.youtube.com/watch?v=SznrOQYiahg
- Speaker(s) and why they matter: Meng To, founder of DesignCode and of the AI design/template product Aura (his own product, which he demos; sells templates and prompts), ex-engineer, long-time designer-educator, now builds apps solo with Codex. Host Rid runs Dive Club. Both have commercial interests in what they show.
- Relevance to us: 4 · Freshness: tool-dependent (model names, Codex, Aura, plugins date fast); the "start from yourself, not from the baseline" and screenshot/video-prompting tactics are more durable
- Notes: sponsor and house-ad segments to skip: Dessn "Surfaces" (5:10-6:11; name garbled as "Descript", the host spells "d e s s n", verify), Paper copy-paste from Figma (6:11), Dive Talent Network (18:45-19:27). Garbled or unverifiable names: "Sonic 3.5"/"Suno 3 5" = Claude Sonnet 3.5, "Composite 2.5" = Cursor Composer 2.5 (verify), "Fable 5", "Mythos" (model names as spoken, verify), "Hyperframe" (video plugin, verify), "Dream Cut" (his video-editor app). Mr Beast anecdote is an unverified aside (host corrects 60M to 20M subscribers).

## Core thesis
Meng argues the only way to avoid AI slop is to stay ahead of the current baseline and feed the AI your own accumulated material (fonts, files, designs, code) as the starting point, then spend the last 10% on details no library has. In his stack, Codex on the local machine replaces Figma for him, and product knowledge plus precise, voice-and-screenshot prompting beats model choice.

## Claims and advice
- [AIS] "If you always chase the trends, you will become AI slop very soon." Today's baseline is the default AI look (Inter-type fonts, purple gradients), soon it will be serif fonts and the stock animations; stay a step ahead like in chess. (0:00, 12:21-13:21) — opinion
- [AIS][REF] Antidote: use "your memory", i.e. everything on your computer from your career (fonts, Figma files, code) as the AI's starting point; "your starting point is you". About 50% of his prompts reference another chat, page or folder ("make this button in the style of the one on that page"). (13:21-14:22, 28:37) — opinion/practice
- [AI] Screenshots first: nearly every task starts with a screenshot (in Codex a double-Cmd shortcut sends one), then voice or short text. Voice is 3-5x faster than typing and carries more detail; annotating the exact element beats a long description. (14:22-15:23, 18:26, 20:28) — practice
- [VIS-M][AI] For hard-to-describe animation, give the AI a video of the animation and ask it how to prompt it; his team does this instead of learning animation vocabulary. Host agrees: use Claude as intermediary when you "have no words" (shaders). (23:31-24:32) — practice
- [AI][EMO] Quality comes from the final 10%: he rebuilt a video editor in one day from an existing library, then added Apple-inspired details (drag/reposition, growing dots) that "you will never find in an existing library", because taste comes from watching Apple or a friend designer. (16:23-17:25) — practice
- [AI][Q] Product knowledge is the moat: "if you're not knowledgeable about your product, forget it", someone else will recreate it in one prompt in 3 months; his app took thousands of prompts (host guesses 10,000+ each). He spends much time testing and reporting bugs precisely. (15:23-16:23, 17:25-18:26) — opinion
- [AI] 0% of his code is written by hand now (was 95% 16 months ago); host agrees a slower prompt for padding is fine if you run many things in parallel ("allergic to loading states"). (17:25-19:27) — opinion/practice
- [AI] Figma: he no longer opens it to build designs, only for old work; designers still have value in the manual Figma craft. He calls himself an editor rather than a from-scratch creator. (4:07, 19:27-20:28) — opinion
- [AI][VIS-I] GPT Image 2 is "so good" that most of the 5,000 templates in his library start as GPT-image screenshot to HTML: write PRD/bullets, generate a landing-page or hero image (with his "taste skill" to pick fonts/colors), then convert to HTML. Also uses image models for 3D logo versions, illustrations, slides, wireframes. (21:29-23:31) — practice, self-interested
- [VIS-I][AIS] Presentation trick: turning a flat generated design into a perspective mock-up makes AI output look far better than the first flat version, which he calls slop. (7:15-8:16) — practice
- [AI][DS] DESIGN.md = a designer's style guide and mastery condensed into one markdown file the AI can read: colors, typography, spacing, radii, surfaces; Google started the format to standardize language for accessibility and composition (his account, unverified). (26:35-27:36) — opinion
- [AI] Strong models only show their value with giant context: the same "make a beautiful landing page" gives no difference between top and mid models; supply section pre-prompts, the design system DESIGN.md, an HTML preview or screenshot or URL of a reference. (24:32-25:33) — opinion, tool-dependent
- [AI][DS] Do not stuff AGENTS.md: it is read on every prompt and is "dangerous" if heavy; instead ask the agent to "remember" a design decision and save it into the project's AGENTS.md/runbook.md/workflow.md; DESIGN.md matters most at the beginning, later reference specific files. (29:39-31:42) — practice
- [AI] Designers should build their own tools: his local-markdown Notion-like app with preset image prompts and each section as context; local files plus agents beat cloud "walled gardens". (7:15-10:18) — opinion
- [AI] Plugins versus skills: plugins (Slack, Figma, Canva, Granola, Remotion, Hyperframe, computer use) integrate services; a skill is a large prompt/style guide (taste, fonts, how not to produce slop). (11:19-12:21) — practice
- [AI] Model choice: start with GPT 5.5 medium (cheap, fast), use extra high for hard work; Cursor Composer 2.5 for speed; avoids very expensive top models "at this time". (31:42-32:42) — opinion, tool-dependent
- [P] Works by discovery, not a blueprint: "I don't plan things", which he calls a solo superpower. (10:18) — opinion

## Techniques and steps
1. Start any UI fix with a screenshot or annotation, add a spoken explanation.
2. For a new project, point the agent at an existing folder or page of your own work as the baseline.
3. For animations, record or supply a video and ask the AI how to prompt it.
4. For landing pages: PRD or bullets, then generate image/hero with taste skill and design system, then HTML.
5. After a design decision, tell the agent to save it to the project memory file.
6. Finish by hand-picking the last 10% of unique details.

## Tools and resources
- Codex (OpenAI) as desktop agent app; GPT 5.5 medium/extra high; Cursor with Composer 2.5 (verify)
- Aura: Meng's own design/template product (promo); DesignCode: his education brand
- GPT Image 2: image generation used for templates and mock-ups
- Plugins named: computer use, Granola, Canva, Figma, Remotion, Hyperframe (verify); Paper (host sponsor)
- DESIGN.md, AGENTS.md, runbook.md/workflow.md; Paul Graham essays as writing-rules context (5:10)

## Quotes
- "Your starting point is you, and you are definitely not AI slop." (14:22, paraphrase-close)
- "It's like playing chess. You have to be always a step ahead of what is the baseline." (12:21)

## Disagreements and contrarian points
Argues stronger models do not improve naive prompts; prompt size and personal reference material do. Goes against "Figma first" and against keeping everything in AGENTS.md. Host and guest both favor many parallel agents over waiting on speed. Predicts serif fonts will soon be the new slop (a prediction, not evidence).

## For 1000 Islands
Use the owner's own material (existing photos, brand scraps, preferred sites) as the AI's starting point instead of a blank brief, which fits the AI-slop worry (current default fonts and gradients should be avoided; per the project note the Inter ignore is Stage 1 only). Save design decisions into a short project memory file, keep the always-loaded file small. Screenshot-plus-annotation and "video to prompt" are handy for describing hero scroll effects. A GPT-image to HTML hero shotgun is another way to generate variants quickly, with the caution that image-model heroes tend to look the same. Little guidance on photography or travel specifically.

## Other
Pitch for Dive Talent Network hiring list; Meng describes a Notion-like local app and says "I've never worked so hard in my life". Closing: agents replace editors, designer and coder, so curiosity about tools and design.md is "your greatest weapon" (33:43), a salesy note.
