# I made a tool that generated 400+ DESIGN.md that are insanely good at creating landing pages
- Source: DesignCode (Meng To) · 2026-04-17 · 28 min · https://www.youtube.com/watch?v=DsjEI6-5kgI
- Speaker(s) and why they matter: Meng To, founder of DesignCode and Aura; here he demos Newform, a tool he built himself (he says "disclaimer, I'm the one who created it"). Practitioner with a direct commercial interest; largely a product demo.
- Relevance to us: 3 · Freshness matters? tool-dependent (Newform/Aura UI will change; the workflow "screenshot + design system file + named animations" and the DESIGN.md concept are durable)
- Notes: whole video promotes Newform and Aura; "400+ DESIGN.md" in the title is his own library count. Garbled names: "Visio" (probably v0 or Figma Make, verify), "Variant" (probably Variant.com, verify), "lucid" = Lucide icons, "mink cute" and "bold dude tones" = icon sets (probably "Mynaui"/"Solar Duotone" style, verify), "soul.md" and "agent.md" = AGENTS.md / SOUL.md. Claims that design.md "started by Stitch" (Google Stitch) are his statement (verify).

## Core thesis
A DESIGN.md (a markdown design-system spec: colors, type, buttons, spacing) can be generated from any design you like, saved as a reusable skill, and used to remix new designs, components and marketing assets in one click. With the baseline so high, differentiation comes from taste: choosing references, naming animation techniques, and iterating quickly with many generations.

## Claims and advice
- [AI] design.md is a markdown system file, "like agents.md or soul.md" but for design systems; it can be copied into any tool (Aura, Cursor, v0, etc.) and also saved as a skill. Markdown sits between JSON (hard for humans) and plain text (unstructured). (0:01, 9:12-11:16) — practice
- [AI][TOOLS] Inspiration source for ready-made design systems: getdesign.md, which hosts big-brand design systems; but legacy brand systems are "clean but not the most creative". (9:12-11:16) — opinion
- [REF][TOOLS] Screenshots give structure: Mobbin for live, iterated products (becomes more muted in creativity), Dribbble for conceptual, colorful, presentation-oriented work; Twitter also for palettes. Drag screenshots in, even a drawing or a Figma design. (12:18-14:20) — practice
- [REF][AIS] Prompt pattern he uses constantly: use the reference's UI as structure, but "change the text, the names, the numbers" so the result does not copy the concept, then animate the details. (14:20) — practice
- [VIS-M][AI] Layout is easy and static; animation and scroll behavior need descriptive naming: mesh gradient, beam animation, mask reveal, blur-in, fade-in, even the technique (WebGL). "Your knowledge is your tools, and when I say tools I mean prompts." (15:22) — practice
- [VIS-M][Q] Claim: what was once WebGL/three.js for the 1% is now commonplace; animations are needed to stand out. (1:02-2:03) — opinion
- [AI][AIS] Taste is judged by experience: you tell if a remix works or not (dark mode, vertical animation, skeuomorphic, mesh gradient, beige system). (7:09) — opinion
- [AI][P] Queue many generations at once and multitask (he builds three apps with Codex); "let yourself explore a lot of iterations as quickly as possible", not new for designers. (8:10-9:12) — practice
- [AI][DS] Save the whole system or just a slice (typography, colors, buttons) as a skill, then remix a different base design with it, so results vary more than when remixing the same design; combine several skills (border gradients, shadows, frame grid layout). (17:25-21:30) — practice
- [AI] Skills can be generated from a prompt for narrow things (only the meteor animation, only the card style, menu hover). (21:30) — practice
- [AI] "Iterate" keeps the design mostly intact; "remix" explores other layouts, typography, colors; he mostly iterates. Remix types: branding, mobile, login, sections, footer, background, SVG illustration, animation, also slides/Instagram. (22:30) — practice, tool-dependent
- [VIS-T] "Text is like 80% of the work" in a design: pick font pairing, play with font width, letter spacing for body and headings; swap whole icon sets in one click. (23:31-24:37) — opinion
- [AI] Versioning: saving creates version two, restorable. Code mode: click an element to jump to its line, fix with a little Tailwind. (24:37) — practice
- [P] Organization: favorite and hide generations, group into projects (for example "branding"). (16:22) — practice
- [P] His current workflow: create about five designs, save as one-click skills, include them as a prompt in Aura, create the landing page, set a custom domain, publish. (26:41-27:43) — practice

## Techniques and steps
1. Collect inspiration (community, getdesign.md, Mobbin screenshots, Dribbble, Twitter palettes).
2. Drop a screenshot plus prompt: use this UI as structure, change names/text/numbers, animate details, name the animation types.
3. Queue several remixes with different skills (skeuomorphic, mesh gradient, beige, dark).
4. Favorite the best, hide the rest; sort into projects.
5. Open the detail page: copy the design system MD (typography, colors with tones) or save it as a skill (whole, or just type/colors/buttons).
6. Apply the skill to a different base design for variety; tweak with design mode (fonts, colors, icons) and code mode.
7. Export HTML/React, Figma, or continue in Aura/Cursor/Lovable/v0 and publish.

## Tools and resources
- Newform (his tool, community of designs and DESIGN.md), Aura (his design-to-HTML tool, now with React), getdesign.md, Mobbin, Dribbble, Twitter, Codex, Cursor, Lovable, v0, Figma export, Variant (verify) (throughout)
- Icon sets: Lucide and others (names garbled) (24:37)
- Photos app on phone for collecting screenshots (14:20)

## Quotes
- "Your knowledge is your tools, and when I say tools, I mean prompts." (15:22, near-verbatim)

## Disagreements and contrarian points
Against using only famous-brand design systems; claims community remixes are more creative. Commercial promotion of Newform/Aura throughout; the idea that saving a design system as a skill makes outputs unique is his assertion, not demonstrated against a control.

## For 1000 Islands
Same pattern as our Stage 2: collect references (Mobbin and Dribbble for sections; travel/hospitality sites), express each as a short DESIGN.md (type, color, spacing, named motion), keep "change names/text/numbers" so we do not clone. Name animations precisely (mask reveal, blur-in) rather than "make it premium". The "iterate vs remix" distinction maps to hero shotgun (remix) vs polish (iterate). We do not need Newform/Aura; impeccable and a hand-written DESIGN.md cover it.

## Other
Notes that text styling (weight, width, letter spacing) is high-leverage; marketing "presentation" outputs (branding slide, Instagram slides) as a social-media angle for designers.
