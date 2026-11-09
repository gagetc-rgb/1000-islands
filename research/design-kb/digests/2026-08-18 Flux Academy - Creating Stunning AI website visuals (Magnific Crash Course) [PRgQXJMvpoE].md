# Creating Stunning AI website visuals (Magnific Crash Course)
- Source: Flux Academy (YouTube) · 2026-08-18 · 21 min · https://www.youtube.com/watch?v=PRgQXJMvpoE
- Speaker(s) and why they matter: Unnamed Flux Academy designer (claims 20 years as a designer, says Magnific "replaced my Adobe suite"). Practitioner demo, but the whole video is a product walkthrough for Magnific with a "link below" and a promoted Flux Academy course, so treat it as promotional (affiliate or sponsor not stated explicitly, verify).
- Relevance to us: 3 · Freshness matters? tool-dependent (Magnific UI, model names); the reference-to-prompt-to-composite sequence is durable
- Notes: Model names are spoken loosely and garbled ("GPT2"/"GPT22" probably GPT Image 2, "Seed dream 5" = Seedream 5, "Seance" = Seedance, "Nano Banana", "Recraft"; all verify). No separate sponsor segment; the opener (0:00) and the end (20:26) are the pitch. Demo project is a fictional hero for a white-skateboard brand "Pure".

## Core thesis
Do not go to an AI image tool without a concrete idea and references; build the prompt from a reference photo, try several models at once, then refine by editing, check the image in context in the layout, and only then animate. The tool is replaceable; the sequence is the lesson.

## Claims and advice
- [AI][P] Sequence: ideate and collect references, define prompt, test several models, refine the image, check it in the layout, turn it into video, get icons. "If we just head to AI without a concrete idea, we don't know what we're going to get." (0:00-1:00) — practice
- [MB][REF] Get the visual style first: collect references (Pinterest "or whatever") for photography, lighting and art direction; choose the one that carries the mood (here an orange-glow "sun" fashion shot). Concept: a punk photographed in a fashion style, floating white skateboard, so a premium brand stays inside its sport's world. (1:00-3:03) — practice
- [AI][REF] Use the tool's "describe image" feature to turn the reference photo into a prompt, then edit the description (swap subject, delete makeup, earrings, glitter; keep the background and lighting lines). (3:03-4:04) — practice
- [AI] Upload the client's real product shot as a named reference ("image one") inside the prompt so the model knows what the skateboard looks like. (5:04) — practice
- [AI][VIS-I] Pick the aspect ratio for the use case first (widescreen for a website hero). (3:03) — practice
- [AI] Generate the same prompt on four top models at once and compare; "each one of them is good for something else" and the speaker never knows in advance which fits. Here, the GPT-family model was closest and highest quality. (5:04-7:07) — practice, tool-dependent
- [AI] Always generate multiple variations of every edit because of randomness: of three retouch results one lost the object, one was garbage, one was perfect. (8:07-9:08) — practice
- [AI][VIS-I] Edit rather than regenerate: retouch by painting over the skateboard and describing it ("pure white skateboard, premium"); swap background using the reference; if "auto" model misreads the instruction, name the model and be explicit (it replaced the man with the woman until the prompt said "behind the man... in the reference with the woman"). Request 2K output. (8:07-12:13) — practice
- [VIS-L][AI] Check the image in context immediately: export, drop into the Figma layout, duplicate the layer and use Figma's remove-background so the person overlaps the headline text (depth effect), then shrink the subject and use the tool's resize/outpaint to add headroom and side room for cropping. (12:13-14:17) — practice
- [AI][VIS-M] Hero video: export the whole hero frame (with text behind), use it as start image, set the end frame to the same image so it loops; 8 seconds was too long, a first prompt produced zoom in/out and wheels on both sides because "I write short prompts", the fix was "static camera shot, rotating slowly, one side has wheels, the other side is pure white". Choose 4K for the source and optimize later. Sound off. (15:18-18:22) — practice
- [TOOLS] Icons: search the library, pick a style, "copy as SVG", paste into Figma and recolor, no download. (18:22-19:23) — practice
- [AI] Other uses mentioned only in passing: social media, fixing bad client assets, 3D assets, workflow automation. (20:26) — advert

## Techniques and steps
1. Write the concept in one line (premium brand + sport world); collect references; choose one hero reference.
2. Upload the reference to the describe-image feature; edit the generated prompt (subject, wardrobe, background, light); add the client's product as a named reference.
3. Set aspect ratio (widescreen), turn on multi-model, choose the 4 newest models, generate.
4. Pick the closest result; fix details with retouch and background-swap edits, 3 to 4 variations each, naming the model if "auto" fails.
5. Export to the layout (Figma), remove-background layer to overlap the headline, outpaint extra room.
6. Export the full hero frame, generate a looping video (same start and end frame, static camera, short, 4K, no sound).
7. Pull SVG icons from the library; paste into the design.

## Tools and resources
- Magnific (AI image/video/3D/audio suite plus stock icons, vectors, fonts, sounds; the video's subject, promoted) (whole video)
- Models seen inside it: Nano Banana, Recraft, GPT image model (verify name), Seedream 5, Seedance for video (verify)
- Figma: layout, remove background, SVG paste (12:13)
- Pinterest: reference collection (2:01)
- Flux Academy membership course: promoted (20:26)

## Quotes
None needed beyond the one in Claims.

## Disagreements and contrarian points
None. Mild claim that one tool replaced the whole Adobe suite is self-interested.

## For 1000 Islands
Relevant only if we ever need composited or generated imagery; a travel site should lead with real photography, so use this only for compositing ideas (extra headroom for crops via outpainting, a subject overlapping hero text via cut-out) and a looping hero clip. The reference-first discipline (describe the reference, then edit the prompt) matches our moodboard stage. For travel, generated people or places would hurt trust, so avoid.

## Other
Practical detail: the speaker tests "loop" video generation with identical first and last frames and keeps clips short. Failures shown honestly (model replaced the subject), which is useful as a reminder to expect retries.
