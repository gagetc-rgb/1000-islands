# One-shotting beautiful landing pages with code references
- Source: DesignCode (Meng To) · 2025-10-27 · 55 min · https://www.youtube.com/watch?v=7MEsUtvEbyU
- Speaker(s) and why they matter: Meng To, founder of DesignCode and of Aura (AI design-to-HTML tool). Practitioner, but this video is largely a live demo of Aura's new features: strong commercial interest (Aura is about $20/month by his own figure).
- Relevance to us: 3 · Freshness matters? tool-dependent (almost all steps are Aura UI; the method of "reference real code and assets instead of a bare prompt" is durable)
- Notes: no formal sponsor segment, but the whole video is a product demo. Captions garble names: "ideoggram" = Ideogram, "mjourney" = Midjourney, "Cloud 4.5" = Claude (Sonnet) 4.5 (verify), "GT5" = GPT-5, "Arc suite"/"Foundry"/"coffee roaster" are demo names. Model claims (Claude 4.5, GPT-5, Gemini 2.5) will expire.

## Core thesis
The way to get non-generic AI landing pages in one shot is to stop writing short prompts and instead feed the model "ingredients": full template code, specific components (button, hero, footer), chosen images, and code snippets for hard techniques (border gradient, scroll animation). The AI is good at consistency with existing code; humans then do the last ~10% (fonts, colors, images).

## Claims and advice
- [AI] New style of prompting: a giant prompt that references whole templates (up to ~50,000 characters, about 1,000 lines of code), individual components, images and previous chats, instead of the short prompts he used before. (0:00-1:02, 7:13) — practice, tool-dependent
- [AI] "AI needs context, and the context is code": referencing real code of a button, hero, testimonial cards and so on gives better results than referencing an image. (7:13) — opinion
- [AIS] AI is "really good at generic stuff" (slop); but "if you know how to do it properly, it can turn into something much more human and much more polished". Needs smart effort, not necessarily a lot of time. (10:18) — opinion
- [AIS][AI] AI will not by itself produce good custom buttons, border gradients, marquee effects or creative layouts; supply them as code snippets with instructions. (9:16, 15:26) — practice
- [AI] Code snippets carry their own instructions (steps one, two, three) and comments, which the model reads on every prompt; this fixes inconsistent animation approaches (scroll animation, keyframes, border gradient). (15:26-16:27) — practice
- [P] His favourite start: build only the hero section first (with a screenshot), because it lets you be more creative; once font, animation and logo are right, finalize the rest. (10:18, 42:17) — practice
- [AI] Cost control: large templates are expensive in tokens; remix a full template first, otherwise start from a hero, components or small templates (Aura caps input at 100,000 characters; his hero template used 31,000, final prompt 79,000). (11:21-14:26) — practice, tool-dependent
- [AI][VIS-I] AI-generated logos are text-only or cheesy icons; instead pick a logo from the library whose style you like (serif/sans, vibe), then regenerate the name with Ideogram, which he calls the best at typography. Fix size with Tailwind arbitrary values (120px by 36px) and remove the background so it works on a sticky header. (1:02-3:06, 26:47-29:52) — practice, tool-dependent
- [VIS-I] Generate images in batches of four (Ideogram 3 remix, GPT image) and swap them one by one; Midjourney is better for images, Ideogram for typography; ChatGPT can rewrite the image prompt. (24:42-28:51) — practice
- [VIS-M] Alpha-masked backgrounds (gradient fade of edge) look more professional than hard cut-offs, especially on mobile/tablet where backgrounds crop badly. Controls named: opacity, brightness, saturation (to kill an unwanted color cast), blend mode (screen, soft light), invert, mask angle. (3:06-6:12, 34:00-36:04) — practice
- [VIS-M] Texture/noise backgrounds: use 16:9 images, soft-light blend, lower opacity; a "wavy" texture inverted gives a distinctive look. (35:01-36:04) — practice
- [VIS-M][AI] Background video recipe: take a generated still, feed it to Midjourney video as start and end frame, describe slow motion, wait about 2 minutes, copy video URL, set as background with soft light and reduced brightness. He says it avoids WebGL and is performant because it is just a video. (37:06-39:10) — practice
- [VIS-L] Layer details for backgrounds: z-index to bring on top, pointer-events none so it stays non-interactive, fixed vs absolute positioning (fixed sticks while scrolling), overflow-hidden for stray cut-offs. (32:57-34:00, 41:14) — practice
- [AI] Model split: Claude 4.5 for "smartness", GPT-5 better at UI and image-to-HTML, Gemini 2.5 a bit better at animation. (17:28, 43:19) — opinion, tool-dependent
- [AI] AI does not work 100%: a marquee animation failed until he referenced a component that already contained it. Text edits are easy, complex animation is hard. (43:19-44:20) — practice
- [AI][P] Use "edits" (partial changes) for small changes such as swapping an image or title; use full regeneration for whole-page changes, which is more accurate. (22:39, 47:29) — practice, tool-dependent
- [AIS] Palette: he notes his result "is very purple" and that he usually says not to use purple; recolor (indigo to violet or orange/red, slate to neutral) because "the little extra manual human effort" makes a design unique. (40:12) — practice
- [AI][Q] Learn basic code (HTML, Tailwind, basic JS): everything in one HTML file is less scary, Tailwind keeps styling visible next to the element; AI does 90%, the human the last 10%. (45:22, 52:38-53:39) — opinion
- [AI] Export portability: exported HTML can be uploaded to Netlify or Vercel, or moved to v0, Lovable, Figma; he contrasts this with lock-in of Framer, Wix, Webflow. (31:55) — opinion (commercial)
- [VIS-M] Multi-page with page transitions (for example wipe up) are available once pages are linked. (46:24-49:33) — practice, tool-dependent

## Techniques and steps
1. Pick a starting hero or small template; reference it with @.
2. Add references: main button, 3-4 sections, footer, avatar and landscape images (search the asset library, shift-click for multiple).
3. Add code snippets for border gradient, scroll animation, keyframes.
4. Choose a model, run the one big prompt; review.
5. Use edits for partial changes: swap images, add images to a named section.
6. Fix fonts (remove unused, set weight and tracking), recolor, generate/replace images, regenerate the logo.
7. Add background (preset, texture with soft-light, or generated video with soft-light); set z-index, pointer-events none, absolute.
8. Finalize in design mode; if animation fails, reference a component that has it.
9. Add pages, link them, set transitions, export or publish.

## Tools and resources
- Aura (Meng To's tool): template/component/snippet/asset library, prompt builder, edits, alpha masking, publish to a subdomain (verify exact domain from captions) (whole video)
- Ideogram, Midjourney (images and video), GPT image: asset generation (2:05, 24:42, 37:06)
- Claude 4.5, GPT-5, Gemini 2.5: models (17:28, 43:19)
- Tailwind CSS (52:38); Netlify, Vercel, v0, Lovable, Figma, Framer, Webflow, Wix: export/lock-in comparison (31:55)
- ChatGPT Atlas browser (verify; captions say "new browser by ChatGPT") with agent mode, compared to Comet, Dia (28:51)

## Quotes
- "AI needs context. And the context is code." (7:13)
- "The little extra manual human effort is what really takes you to where you need to be." (40:12)

## Disagreements and contrarian points
Against the "vibe coding is sloppy" reputation: his answer is learn a little code and use real code references. Contrasts Aura with Framer/Webflow lock-in. Favors long prompts, reversing his earlier "short prompts" habit. Obvious commercial framing throughout.

## For 1000 Islands
Transferable idea: give the AI concrete references (existing code of a component we like, the real photos, snippets for specific effects) rather than adjectives. Starting from the hero only and fixing font, motion and color before the rest matches our hero-shotgun Stage 2. Background-video-as-loop (generated from a still, soft-light, subtle) is a cheap performant motion idea for a photo-led site, but we should use our own real photography or video, not generated. Alpha-masked fade edges help mobile crops of big photos. Not needed: Aura itself, logo generation, purple palettes.

## Other
Mentions pricing logic of AI tools (token cost of large context, four images per generation) as the reason for Aura's price. Shows multi-page and publish flow; nothing on process or client work.
