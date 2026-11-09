# How I Built an AI Agent That Designs Like Me
- Source: Tommy Geoco · 2026-05-01 · 22 min · https://www.youtube.com/watch?v=LP7ywsMuxmc
- Speaker(s) and why they matter: Tommy Geoco, designer and creator (Tommy Geoco channel, runs a design/builder community with a Discord and a "state of prototyping" survey, mentions a "Toolbenders" app and documentary projects). Practitioner, but largely a personal-agent/productivity story, not web-design craft. Has sponsorship revenue.
- Relevance to us: 1 · Freshness matters? tool-dependent (OpenClaw, Obsidian, QMD, model names will expire)
- Notes: Title promises "designs like me" but the design content is thin (a few sentences: design system guidelines in Obsidian, agent ideated data visualizations unprompted, a cron that generates Figma variations). Mostly about building a personal agent harness. Caption garbles: "Open Claw" = OpenClaw, "Open Cluck" = OpenClaw, "Lanier" = Linear, "Kimmy" = Kimi, "paper" probably the Paper design canvas (verify). Mentions the speaker spent $13,100 on tokens in 90 days; claims $50,000 sponsorship revenue from a survey (self-reported, not verifiable).

## Core thesis
The quality of an AI agent is limited less by the model than by the system built around it (instructions, memory, context, connections). He frames a personal agent as "a car" with swappable engine and describes how to build one around a workflow you already own; design is only one use.

## Claims and advice
- [AI] An agent harness is a folder of about seven plain-text markdown files: soul.md (voice, judgment, decision rules; highest priority), identity.md (short startup card), user.md (who you are), agents.md (permissions: who may edit what), memory.md plus memory folder, tools.md (how and when to use tools), heartbeat.md (background monitors, stay quiet unless something is wrong). (3:04-5:05) - type: practice (OpenClaw-specific)
- [AI] "You can't control the quality of the model, but you can control the quality of the system." (6:07) - type: opinion
- [AI] Four layers: skills (repeatable workflows), memory (long-term), context (what the agent sees now), connections (tools it can reach). (7:07-8:08) - type: practice
- [AI] Keep a knowledge vault (Obsidian folders: journal, signals, project planning, ops) with a routing file telling the agent where to file things, otherwise it creates random folders. Obsidian chosen for human usability; Notion or Convex could substitute. (6:07-7:07) - type: practice
- [AI][REF] Capture loop: drop anything seen online into Slack with a "+"; agent summarizes, files it in the vault, tags and links it to related captures; he curates what is worth remembering, so no hallucination problems in retrieval. (8:08-9:10) - type: practice
- [AI] Do not let agents read the whole knowledge base each session (too expensive); add a local search layer. Recommends QMD, an open-source local search engine over markdown; "create four folders and start taking notes in markdown" beats most people. (16:16) - type: practice
- [AI] MCP is described as "USBs for your AI": a standard to plug the agent into work tools (Linear, Notion, Jira). (17:17) - type: practice
- [AI][P] For designers: connect a canvas (Figma or Paper), let the agent read structure, pull components or generate rough variations to attack the "blank canvas problem", which he calls a hidden tax of design. (17:17-18:19) - type: practice
- [AI] Crons: a recurring instruction. His example: every morning at 6:00 check Linear for design-tagged tasks due in 5 days, read the brief, pull the design system from Obsidian, open Figma, generate a few variations and post them as images in a Slack channel. First loops usually fail or produce weak output; tune until reliable. (18:19-19:20) - type: practice
- [AI] Do not use the agent for coding tasks (API pricing is more expensive than native Claude Code/Cursor); plan with the agent, then hand the plan to the coding agent. Some design tasks are coding tasks in disguise. (19:20) - type: practice
- [AI] Model gating: cheap models for reading, summarizing, note cleanup; frontier models for deep research, long-context analysis, planning; put the gates in soul.md. (20:24) - type: practice
- [AI] Kimi's newest release is "on par with Opus 4.6" according to others; he has not tested enough. (20:24) - type: opinion (hearsay)
- [AI][AIS] He chooses not to run all-night continuous loops: he does not want to remove himself from the loop entirely. (13:13) - type: opinion
- [AI] Time saved: publishing a newsletter or episode to ten platforms took 45 minutes by hand, now about 10 minutes via the agent, four times a week. (12:13) - type: evidence (self-reported)
- [AI] Security: every connected tool means a secret key to your private data; read the harness security section. (8:08) - type: practice
- [AI] Process for building your own: map a task you do, find what "sucks" about it (pen and paper), choose an interface (Slack, Discord, Telegram, iMessage, email), build context layer, connect the work system, connect a canvas, give it one automated job. (14:13-19:20) - type: practice

## Techniques and steps
1. Pick one workflow you already own; list its steps and pain points.
2. Choose an interface (Slack etc.) and install the harness with AI help.
3. Build the memory/context layer (markdown folders) plus a search layer (QMD).
4. Connect the system of record via MCP; connect a design canvas.
5. Add one cron job; tune over several runs.
6. Close with four questions: what must it do, know about your work, see right now, and reach the finish line (skills, memory, context, connections).

## Tools and resources
- OpenClaw (agent container), Obsidian, Slack, QMD, Linear, Figma, Paper (verify), Notion/Convex/Jira (alternatives), Claude Code, Cursor, Kimi (model), Vercel and Sentry (monitoring), Google Sheets, NotebookLM (audio meeting-prep summaries), WhisperFlow (voice notes). (various)

## Quotes
- "An agent is not a chatbot. It is a car." (21:26)
- "You can't control the quality of the model, but you can control the quality of the system." (6:07)

## Disagreements and contrarian points
Against both camps of "formed an opinion on early tools" and "hit a ceiling with coding tools": argues personal agents are a third thing. Declines overnight autonomy loops. Advises not to copy his setup.

## For 1000 Islands
Little direct use. Two small transferable ideas: (1) keep a reference/capture vault (links, screenshots tagged by theme) to feed the Stage 2 moodboard; (2) put house rules (bans, tone, scope) in one plain markdown file the agent reads first, which we already do via CLAUDE.md and memory. The agent-building parts are out of scope for a small offer-minimum site.

## Other
Personal reflection on AI ethics and workload (13:13-14:13); mentions a 17-year-old son building his own agent as a lesson in "teaching himself". Mentions documentary filmmaking and a survey project; unrelated to web design.
