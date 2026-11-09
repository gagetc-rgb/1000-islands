# Most viral website of 2025 - Behind-the-scenes with the designer
- Source: Dive Club (YouTube) · 2025-09-24 · 37 min · https://www.youtube.com/watch?v=9GLzf6VCfuA
- Speaker(s) and why they matter: interview of Cory (surname not in captions, verify), lead designer and self-described "webmaster" of PostHog's marketing site (employee about number 13, company now about 140 people), by the Dive Club host, who runs a design community and sells related tools. Practitioner on a real, highly publicized site: a PostHog "OS" website styled as a desktop operating system with windows.
- Relevance to us: 2 · Freshness matters? mostly timeless (personality vs sameness, process lessons); tool mentions dated
- Notes: sponsor reads at about 3:04-5:06 (Framer design pages, Mobbin Sites, the host's own product "Inflight"): skip. Captions garble "Post HTO"/"Post Hog" = PostHog, "Balsamic" = Balsamiq (verify; used as the wireframing canvas), "Mobin" = Mobbin. Names: Eli (front-end developer), James (company co-founder/leader, verify), a graphic designer named "Lahi" (verify). Site is a B2B SaaS analytics company, very different audience from ours.

## Core thesis
PostHog built a deliberately weird, nostalgic, desktop-OS-style site to show personality in a sea of look-alike Stripe/Linear-style B2B sites. Cory worked in hi-fi Balsamiq "wireframes" and straight in code, evolved the site over months with vibe-coding help, and says the key is human tone and shipping a distinct concept, with leadership buy-in. He also admits mistakes (scope too big, mobile not locked, unpolished product slides).

## Claims and advice
- [Q][AIS] Top B2B sites are all excellent in craft but look the same: the bar for craft rose, uniqueness fell. Reference history: Mint.com, then Stripe, then Linear were each copied by everyone. Both host and speaker point at this sameness. (22:29-23:31) — opinion
- [EMO] Show personality; "the more human you are, the more people will connect". PostHog has a Slack channel "Do More Weird" and some ideas reach production; old "enterprise mode" parodied corporate buzzwords. (20:26-22:29) — opinion
- [EMO] Write like you speak to a person, not "highbrow" corporate language: formal marketing speak now "just see[s] as BS" and tells nothing; be direct. Example: data processing agreement rewritten as a fairy tale (plus a Taylor Swift version). (21:27, 26:33) — opinion
- [P] Idea-validation: he showed the concept to his wife and to the leader after a bland left-nav version got only "it's okay"; the unusual concept got an immediate "yes, this is it". Spent about half his time over months, ramped up in June after a Feb-Mar conversation. (1:02-2:02) — practice/anecdote
- [P][TOOLS] Works in Balsamiq as a loose canvas for "hi-fi wireframes" with icons and keyboard shortcuts, not Figma: Figma makes him lock into auto-layout and components too early, which hinders iteration. Huge file with many pages. (5:06-11:13, 24:32) — practice
- [P] Process was evolutionary: things unresolved until the night before launch (icons, product menu using a hard-coded array); layouts for six or seven apps in wireframes, mobile "we'll figure it out when we get there". (8:09-10:12) — practice/confession
- [P][Q] His biggest mistake: doing too many things at once (redesign, repositioning, moving content, new structure); could have launched much sooner. (13:14-14:16) — opinion
- [Q][MOB] Mobile is "definitely not locked in", back-button behavior untested; learned from visitor feedback in the first week. (10:12) — evidence (self-reported)
- [P][DS] Content is standardized per product (a content object plus default templates with include/exclude), so product pages are generated and maintainable; this replaced copy-pasted TypeScript/HTML for each product. (12:14-13:14) — practice
- [AI] Used ChatGPT for presenter notes (fed it all product info, set tone as a witty, direct high-level salesperson), then hand-edited ChatGPT-sounding parts; also helped SEO content. (14:16-15:19) — practice
- [AI][P] Vibe coding (Cursor, Claude Code): used for content migration into a new format, presenter notes, snapping behavior, a working "paint" app; says "can definitely be overused", rejected a lot, front-end dev would have liked less; helped ship faster and prioritise extras. "Use them to enhance rather than replace". (33:41-34:42) — opinion/practice
- [P] Split work: front-end dev Eli built the windowing architecture (a layout component swapped for an app-window component), Cory handled content, styling, UX and fun additions. (16:22-17:24) — practice
- [VIS-M][EMO] Nostalgia of 90s/2000s computing (MySpace, animated GIF backgrounds, Windows XP, Finder) as the visual theme; stacked tabs, snap windows, desktop backgrounds, keyboard shortcuts for dark mode and wallpaper. Admits it may not make sense for a 2025 website: "we did it anyway". (6:08-7:08, 19:25) — opinion
- [Q] Honest uncertainty: very condensed and overwhelming product pages; not sure it is the right way; "still trying to figure out if I even like it". Also criticizes long-scroll trend: people scroll faster than they should and miss content. (23:31-24:32) — opinion
- [DS] Theming with three color schemes (primary, accent, tertiary) applied by a data-scheme attribute; all components use the same tokens (bg-primary, text-primary, border-primary), nest-able, mapped to Tailwind with alpha; easy to add skins (classic, planned Barbie/Tron). Not using Tailwind "the way you're supposed to". (29:35-33:41) — practice
- [EMO] Motivation: wants software that makes people "hate their jobs less" (formed from a painful 2012 time-tracking tool experience). Leadership must support this ("it comes from the top"). (27:34-28:34) — opinion
- [CL] Fingerprint question: where does your personality show in the product? Answer: everywhere; company default is public and transparent. (20:26) — opinion

## Techniques and steps
1. Explore a bold concept alongside the safe iteration; test it on someone you trust before committing.
2. Wireframe in a loose canvas at hi-fi detail (icons, real UI) rather than strict boxes.
3. Build content in structured data plus a few templates; compose pages from components.
4. Use the AI for migration and gap-filling, then edit tone by hand.
5. Launch, then fix based on visitor feedback (mobile, back button).

## Tools and resources
- Balsamiq: loose hi-fi wireframing (5:06, spelled "Balsamic" in captions; verify)
- Figma: avoided for exploration (5:06)
- Tailwind: tokens via data-scheme (29:35)
- Cursor, Claude Code, ChatGPT: coding and copy help (34:42, 15:19)
- Mobbin Sites, Framer design pages, Inflight: sponsor items (3:04-5:06)

## Quotes
- "Make the web weird again." (27:34, host's phrase)
- "Use them to enhance rather than to replace what we would have done on our own." (34:42, host's summary of vibe coding; close paraphrase)

## Disagreements and contrarian points
Against the Stripe/Linear-style long-scroll consensus; against corporate tone; against Figma-first for exploration; mildly against his own dev's wish for less vibe coding. Admits that the concept might fail commercially or in usability; leadership of a company that markets itself as weird makes it viable.

## For 1000 Islands
Mostly a caution for us: a gimmick concept suits a developer-tools brand and its audience, not an upper-middle travel audience. Transferable: (a) write copy like a person speaking, no corporate tourism language; (b) beware sameness (every travel site uses the same hero + cards); one distinctive idea, e.g. a map or water motif, matters more than polish; (c) do not do too many things at once: redesign plus new content plus new structure delayed launch; (d) structure content as data with a few templates so pages stay consistent; (e) test the bold concept on one trusted person early; (f) expect to fix mobile and edge cases after launch, but our offer needs mobile right on day one.

## Other
Interview style and the owner's "fingerprints" question could be reused in discovery with our client. Mentions that the site can iframe the product signup (technical aside, not relevant).
