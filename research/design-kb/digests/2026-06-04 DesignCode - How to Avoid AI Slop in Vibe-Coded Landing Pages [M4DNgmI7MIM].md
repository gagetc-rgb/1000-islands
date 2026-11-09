# How to Avoid AI Slop in Vibe-Coded Landing Pages
- Source: DesignCode (Meng To) · 2026-06-04 · 22 min · https://www.youtube.com/watch?v=M4DNgmI7MIM
- Speaker and why they matter: Meng To, designer-founder of DesignCode and Aura (an AI design tool); practitioner with a commercial interest in Aura and the design.md library it hosts.
- Relevance to us: 5 · Freshness: tool-dependent (model names and products will expire; the method is durable)
- Caution: auto-captions garble names ("Cloud Code" = Claude Code, "Lucid" = Lucide icons, "Basil", "IconMoon" probably Phosphor/Iconoir-type icon sets, "Aura" brand). Verify tool names before relying on them.

## Core thesis
AI slop comes from generic prompts to default model styles. Avoid it by starting from a real reference (screenshot or URL), using a skill or a design.md design system, naming the mistakes precisely, and prompt-fixing them one by one, with generated (non-stock) imagery.

## Claims and advice
- [AIS] Slop tells: lazy selected-state in the menu (an uneven border), all-caps eyebrow labels with too much spacing, unnecessary "status" chips, uneven top/left spacing, random glowing lights, grey that clashes with purple, the purple gradient ("very 2025"). (0:00-1:03) — practice
- [AI] Models differ: GPT-5.5 gives a specific style with high information density and light effects everywhere; Opus 4.8 was "basic", too many colors, purple, lights; Gemini 3.1 Pro put more effort into detail, sizing, hover states and used lights more tastefully. A bare prompt ("beautiful dark landing page") gives similar generic output across models. (1:03-5:06) — practice, tool-dependent
- [AI] Never prompt without a skill or a design system. Get a design system by downloading one from a site, or ask the AI to create one. (1:03) — practice
- [AI] Keep AGENTS.md minimal (it runs on every prompt); put stable rules there (style, browser). (2:03) — practice
- [AI][AIS] Learn the vocabulary of UI defects and parts (menu, selected state, eyebrow, spacing, dark/light mode) so you can prompt the exact fix. (2:03, 16:27) — practice
- [REF][AI] Use an image reference (screenshot of a design you like, designers do this on moodboards) or a URL import (script screenshots the site). Treat it as a starting point and change names, numbers, brand. (5:06-8:14) — practice
- [AI] Prompt away specific mistakes: no illustrations (use photos), alternate a dark section, switch to beige/earth tones, change fonts to serif, bigger headings. (6:09-9:14) — practice
- [AIS][VIS-I] Generate images with AI instead of Unsplash stock ("we want to avoid the Unsplash images"). (8:14) — practice
- [AIS][VIS-T] Avoid the fonts AI always picks (Inter named explicitly); try several Google Fonts; examples named as good: Urbanist, DM Sans, Google Sans (captions unclear, verify). (9:14-10:16) — practice
- [AIS] Tricks to differ from other designs: flip a section to light or dark, change the font, use earth tones / pastels / off-white. (10:16) — practice
- [AI][TOOLS] Skills: "impeccable" and the "taste" skill named as the common ones. (11:19) — practice
- [REF][TOOLS] When a section is inconsistent (e.g. rounded pricing section vs square site), find a pattern on Mobbin, screenshot it, and prompt "adapt this design into my design" (replace section, dark mode); the result should look different from the inspiration. A screenshot alone is not enough. (12:21-13:22) — practice
- [AI] design.md vs HTML export: design.md is a system (colors, type, tokens); it does not guarantee a good page (a hero-only source gives only colors). The exported HTML is richer and more prescriptive (animations, exact look). Turn your own design into a design.md by exporting HTML and asking ChatGPT; libraries exist (getdesign.md, Aura's 600+). (13:22-15:26) — practice
- [P] Know landing-page sections by name to prompt them: hero, features, pricing, trusted-by (logos), contact form, story, testimonials, footer. (17:29) — practice
- [VIS-M] Add motion with one prompt (rich interactions, smooth scroll); use a looping background video generated with one click; border gradients via a skill. (17:29-21:34) — practice
- [AIS][VIS-I] Polish list against slop: fully responsive, a single SVG logo (not all logos), more images than plain color, no gradients/lights, good shadows, a non-default icon set instead of Lucide. (17:29-18:31) — practice
- [AI] Fixing takes screenshots and some "getting dirty": here fixing the white border took more effort than expected. (20:33) — practice

## Techniques and steps
1. Pick model; never start from a one-line prompt.
2. Supply a reference (screenshot or URL) plus design.md/skill.
3. State what to change: brand, palette, fonts, imagery type, section backgrounds.
4. Generate images (and video) instead of stock.
5. Review screenshots; list defects by name; prompt each fix; use Mobbin patterns for inconsistent sections.
6. Put durable rules in AGENTS.md.

## Tools and resources
- design.md (Google open-sourced format), getdesign.md, Aura design.md library (600+)
- Skills: impeccable, taste
- Mobbin (patterns), Google Fonts, Codex/Claude Code/Gemini, ChatGPT (for deriving design.md)
- Icon alternatives to Lucide (names garbled in captions)

## Quotes
- "Your goal is to understand what the mistakes are and to prompt away those mistakes." (6:09)

## Disagreements and contrarian points
Mild: says GPT-5.5 is worth using only with references; praises Gemini 3.1 Pro's design effort. Promotes his own Aura library (commercial bias).

## For 1000 Islands
This is nearly our Stage 2 recipe: moodboard references → screenshots/URLs + DESIGN.md (we already have impeccable) → constrain fonts (we already ban Inter after Stage 1) → photo-led, not illustrations, no purple/glow → prompt-fix defects by name. Photos are central for travel: real owned photography beats generated or stock. Our existing house bans (no eyebrow labels, even spacing) match his tells.

## Other
Mentions one-click animated video backgrounds and "images and videos" as a differentiator.
