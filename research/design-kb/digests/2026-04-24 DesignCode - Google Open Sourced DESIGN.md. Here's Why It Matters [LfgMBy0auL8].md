# Google Open Sourced DESIGN.md. Here's Why It Matters
- Source: DesignCode · 2026-04-24 · 43 min · https://www.youtube.com/watch?v=LfgMBy0auL8
- Speaker(s) and why they matter: Meng To (DesignCode; per the 2026-06-04 sibling video he is the founder of Aura, an AI design tool). Practitioner, but a large part of the video is a demo of his own tool; strong commercial interest (pricing/limits comparisons favour Aura).
- Relevance to us: 4 · Freshness matters? tool-dependent (Stitch, Claude Design, Aura, Gemini 3.1 Pro, plan limits will expire; the DESIGN.md + reference + iterate method is durable)
- Notes: 7:09-41:50 is largely a demo of the speaker's own product (called "New form" in captions, probably his Aura library, verify). Captions garble "Claude Design" as "Cloud Design"; "Variant" is probably the Variant design tool (verify); "the laser" = a glow-cursor skill. Pricing/limit statements are his own and time-bound.

## Core thesis
Google open-sourcing the DESIGN.md format gives one shared, markdown-based design-system spec that agents and tools (Stitch, Claude Design, Aura, Cursor) can all read, so designs stay consistent across platforms. But DESIGN.md alone is not enough: he says it needs references, screenshots and ideally exported HTML to reach a design a designer would accept.

## Claims and advice
- [AI][DS] DESIGN.md is a design system in a markdown file (colors, typography, overview, icons, elevation/depth, shapes, do's and don'ts); Google wants it to be a standard because every company otherwise interprets "design system" differently. (2:01-4:03) - type: opinion/fact about the spec
- [AI] Markdown suits agent workflows (AGENTS.md, soul.md-style files): more structured than plain text (titles, code blocks), less database-like than JSON; ChatGPT answers are markdown too. (3:02-4:03) - type: opinion
- [AI][TOOLS] Stitch (Google) generates a design.md; quick start: take an existing design.md (he copies Raycast's) and paste it with a prompt like "create a finance app called Aura". getdesign.md hosts design.md files derived from popular sites. (5:07-6:07) - type: practice
- [AI][REF] design.md alone "might not take you to the design paradise utopia"; from experience you also need references, experimentation, screenshots and HTML. His number one recommendation: start with a screenshot and reinforce it with a design.md. (10:12) - type: opinion/practice
- [REF][AI] You can build a lot from a single hero section or component you like; browse many designs for inspiration, pick one, then build outward. (9:11) - type: practice
- [AI] Remix modes: "iterate" keeps as much of a design as possible; "remix" explores different directions; "quick remix" steers to a style (e.g. clean minimal beige) in one click. Expect several attempts: not one shot. (11:15-13:20, 22:30) - type: practice
- [AI][VIS-M] Reusable "skills" are named prompts for techniques (border gradients, beautiful shadows, mask reveal, corner-block, frame-grid layout, "laser" glow cursor); several can be merged in one run, and the full prompts are viewable and copyable into other tools. (14:20-21:28) - type: practice
- [AI] Favorite one-line prompts: "add dividers", "add social proof", "light mode", "purple and blue", "add beam animations", "frame layout corners". Prompting a design is the AI-era equivalent of editing a Figma community template. (18:24-20:27) - type: practice
- [AI][MB] Keep winners in a folder, hide losers, favorite keepers; then spin outputs from the chosen design: pricing section, feature section, testimonial section, motion design/animation, Instagram slides, brand style guide ("you can totally use this to present to a client"), promo video, mobile/tablet/desktop previews. (22:30-27:36) - type: practice
- [AI] Motion/video outputs are hit-and-miss ("not always great"), work better with some designs; he expects future models to improve. A WebGL strings animation is shown as one of the better results. (27:36-29:38) - type: opinion
- [AI] Want exactly the look: export the HTML. Want just the system (colors, typography, layout structure): export design.md. With both: "use the HTML as a reference and the design.md as the foundation". (31:41-32:42) - type: practice
- [AI][TOOLS] Compared the same two inputs in Claude Design, Stitch and Aura: Stitch did not respect the design well; Claude Design did, added extra sections and burned nearly 50% of his limit in one prompt (Opus is expensive; on a $20 Pro plan he hit the limit in 3-4 prompts). Aura claims no token counting and about 120 prompts on Pro. (33:46-39:49) - type: opinion, vendor-biased, time-bound
- [AI] HTML output renders live while generating, whereas React waits until done; he says most Aura customers choose HTML because it is faster. (34:46-35:46) - type: practice
- [AI][BIZ] After generating you can add sections by prompt, publish to a subdomain or custom domain, set SEO, or export React to GitHub/Netlify/Vercel; designers can sell templates on Aura. (39:49-40:50) - type: product claim (promotion)
- [REF][AI] If you only want the design system, he recommends getdesign.md plus the other resources Stitch lists. (41:50) - type: practice

## Techniques and steps
1. Pick a reference design (screenshot, hero, community design) that excites you.
2. Get both artifacts: HTML and design.md (or generate design.md from the reference).
3. Prompt with your own concept and drop both files into the builder; "iterate" for fidelity, "remix" for exploration.
4. Add style skills (shadows, borders, grid frames) and one-liners; several rounds are normal.
5. Save the best; spin off section variants, motion, mobile, brand sheet.
6. Move to a full-page builder (Claude Design, Aura, Stitch) with HTML as reference and design.md as foundation; add sections by prompt; publish or export.

## Tools and resources
- DESIGN.md spec on Google's GitHub repo and a ~10-minute Google video about it (2:01)
- Stitch (Google), getdesign.md (design.md files from popular sites; example Raycast), Claude Design, Aura and its community/skills library ("New form", verify), Variant (verify), Gemini 3.1 Pro, Cursor
- Netlify / Vercel / GitHub for hosting (40:50)

## Quotes
- "You should not expect things to go in one shot." (22:30, close paraphrase)
- Recommendation to start with a screenshot and reinforce it with a design.md (10:12, paraphrase)

## Disagreements and contrarian points
Against treating DESIGN.md as sufficient: argues references, screenshots and HTML matter more for visual quality. Criticises rival tools' token limits (self-interested).

## For 1000 Islands
Supports the Stage 2 plan: gather references into a moodboard, generate several direction variants (the "shotgun"), pick one, then freeze it as DESIGN.md plus an HTML reference page. The useful asset is the pairing "HTML reference + DESIGN.md foundation", so later pages (tours, stays, contact) stay consistent; derive section variants from the chosen hero. The brand-sheet idea doubles as a presentation to the owner. Skip the product-specific parts (Aura plans, template selling). Note the video favours dark/app/SaaS looks; travel needs photography-led treatment.

## Other
Design.md files are generated by the platform at a token cost so users can reuse them elsewhere; claims about "pro" community designs (about 90% free). Nothing verified beyond the speaker's own claims.
