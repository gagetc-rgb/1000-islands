# Cross-check 14: practical web typography (digest-based, quotes from transcripts, MDN/web.dev/WCAG/Google Fonts fetched 11 Oct 2026)

Lesson feed: lesson 9 (typography and photography, typography half); also lesson 2 (hierarchy, already built) and lesson 3 (speed).

**Honest scope statement:** this is the thinnest of the gap topics. Of 8 transcripts, **three are the same author** (Jason Pamental: Webflow 2016, JSConf 2019, Codementor 2014) and count as one voice; one (LIG CH, Japanese) is an unusable machine translation; two are dated how-tos (Easyweb 2016 for Divi, Joan Morci 2018 for font formats). Real independent voices: Pamental, Leatherman, Easyweb (fr), Joan Morci (es), Photofox (ru), plus the font-related statements in the earlier accessibility videos. No source covers pairing theory deeply, and none covers photography or Cyrillic typesetting beyond "does the font have the glyphs?".

Sources. **JP** = Jason Pamental: **JP16** type-en Webflow workshop [HEaNIWSW1g8], **JP19** type-en JSConf/CSSconf [0AsAjHPupKQ], **JP14** type-en Codementor [iZhGclr_GGg]. **ZL** = type-en Zach Leatherman [FbguhX3n3Uc] (2018). **EW** = type-fr Easyweb Academy [HRdGuFZhhTI] (2016, Divi-specific, sells courses). **JM** = type-es Joan Morci [DCLYz2W-N9k] (2018). **PF** = type-ru Photofox [1dSjHlQTzw8] (2023). **LC** = type-en LIG CH (ja, garbled) [gPM6Aa2uG-E], **not used**. Also from `answers/07`: SD, SR, FCC on rem units. Files in `transcripts/`, digests in `digests/`.

Tags: ◆ primary page verified (PRIMARY_SOURCES.md "Typography and web fonts"), ◈ several independent authors, ◇ one author or disputed.

## A. Rules with at least three independent voices

1. ◆◈ **Do not hide text while fonts load: show a fallback immediately (`font-display: swap`), use WOFF2.** (ZL, JP16, JM; EW partly)
   - ZL [7:17]: "So, we don't want invisible text, and we don't want unstyled text."
   - ZL [20:29]: "My favorite is swap, font display swap. That shows the fallback font immediately and it renders the web font whenever it comes back."
   - JP16 [39:04]: hiding text is "a terrible thing to do because what it's doing is it's holding your content hostage until that web font loads"
   - JM [7:07]: "mi recomendación web y wap 2 y con eso siempre vas a acertar" (caption: WOFF and WOFF2 are enough)
   - Primary ◆ MDN: "swap Gives the font face an extremely small block period and an infinite swap period."; web.dev: "WOFF2 is the newest, has the widest browser support, and offers the best compression."; "font-display: swap but make sure to deliver the font early enough that it does not cause a layout shift."

2. ◆◈ **Keep the number of font files low; preload at most one or two.** (ZL, JP16 [33:01-34:01], EW [5:04])
   - ZL [26:36]: "when you overuse preload, it will cost you on first render time" (preloading all five fonts cost 500 ms in his test)
   - JP16 [33:01-34:01]: chose the vendor with the smallest font files, self-hosted, used fewer weights to stay under about two seconds
   - EW [5:04]: each added font "ralentit un petit peu le chargement de la page" (caption paraphrase)
   - Primary ◆ web.dev: "preload ... comes at the cost of taking away browser resources from the loading of other resources."

3. ◈ **Use at most two typefaces, one for headings and one for body, with clear contrast between them.** (EW, JP14, PF)
   - EW [26:40]: "une règle des designs assez simple qui dit que de deux polices de caractères sur une page ça suffit"
   - JP14 [11:15]: asked whether to use the same font for headings and body: "I generally don't I I like the contrast"
   - PF [16:20-22:25]: serif heading with a sans descriptor works; the reverse is risky on screens
   - No standard exists; this is practice (◇ in the strict sense, but agreed by three voices).

4. ◈ **Set sizes in relative units from a 100% base; scale the heading steps per screen.** (JP16; SD, SR, FCC in `answers/07`)
   - JP16 [17:41]: "if you just say 100% And that becomes your your root definition of text size it's always going to be a nice readable line"
   - SD [11:12]: "evitar las unidades absolutas como especificar el tamaño del texto con píxeles"; SR [37:49]: "sollte man eigentlich niemals pixeleinheiten im CSS verwenden"
   - Primary ◆ WCAG 1.4.4: text must resize to 200% without loss of content or functionality; 1.4.12 text spacing (line height 1.5, paragraph 2x, letter 0.12, word 0.16 of the font size) must not break the layout.

5. ◈ **Check that the typeface includes the scripts you need (Cyrillic, Latin extended).** (EW, PF; JP19 on CJK/Arabic size)
   - EW [22:34-23:36]: Oswald did not render Russian text: "je n'ai pas l'alphabet cyrillique" (use the language filter in Google Fonts)
   - PF [9:11]: "гельветика не поддерживает кириллицу"
   - JP19 [29:50]: Arabic fonts can be about 2.5 MB and CJK 16-20 MB, so script support has a size cost
   - Primary ◆ live check of Google Fonts: Oswald, Roboto, Montserrat now include `cyrillic` and `cyrillic-ext` subsets; Playfair Display includes `cyrillic`. **EW's example (Oswald) is out of date**; the principle (check glyph coverage) stands. MDN `unicode-range` is the mechanism that lets browsers download only the subset needed.

## B. Items with two voices or one

- ◇2 **Avoid icon fonts**: ZL [21:31] "you should not use icon fonts all together ... use SVG"; JP14 [7:19-10:14] no fallback if the web font does not load. Both are the same period (2014-2018); plausible but not verified against a standard.
- ◇ JP16: ragged-right, left-aligned text; do not center blocks of text; use `max-width` ([47:16-52:23]). ◆ WCAG 1.4.8 (AAA) sets "Width is no more than 80 characters or glyphs (40 if CJK). Text is not justified"; that is the only normative support, and it is a best-effort AAA criterion.
- ◇ JP19: fluid sizes with `calc()` and minimum and maximum; "when you use purely viewport units to size text you can't zoom it" ([9:19]). Consistent with WCAG 1.4.4, not directly quoted there.
- ◇ JP19: user-adaptive type: dark-mode tweaks to grade and spacing; controls for word spacing and line height; "crowding" benefit of 50% in Microsoft research (second-hand, **not verified**).
- ◇ ZL: CSS Font Loading API to group reflows into one; Safari font synthesis; variable fonts can be larger than one static file (115 KB example; v-fonts.com median 54 KB). JP19: variable fonts replace many files (84 KB for 18; IBM Plex 233 KB for 960 KB). ◆ web.dev: "a single variable font can be used as a replacement for multiple font files."
- ◇ PF: hierarchy by weight first (raise weight of the accent word), keep contrast by weight or size, not both; high-contrast serifs only for accents; "Times New Roman works if kerning is set to optical"; small serifs are poor on screens; print minimum 6 pt. Opinion; print-oriented.
- ◇ JP14: pair by one designer or a superfamily. ◇ EW: use Google Fonts' suggested pairings.
- ◇ JM: obsolete format advice (EOT, SVG fonts, IE9) and an incorrect statement that TTF/OTF only render when installed.
- Not used: LC (machine-translation garble).

## C. Disagreements

- **Serif on screens.** JP14 (2014): sans is safer on old screens, but on modern screens a serif such as Georgia "would look really beautiful and could be a really nice readable type face on a small screen" ([2:06-3:06]). PF (2023): small serif text is unsuitable on screens. No primary source; treat as taste and test on target devices.
- **Self-hosting vs Google Fonts.** web.dev: self-hosting "should deliver better performance"; ZL's own test showed no gain until `font-display` and preload were added. Measure.
- **Variable font size.** ZL: not smaller than one static file; JP19: smaller than many files. Both true for different counts.
- **em vs rem.** JP16 uses em for text and breakpoints; SD, SR, FCC use rem. For a non-coder: ask for rem for text and spacing.
- **System fonts.** ZL: instant and cheap; JP19: "system fonts are fine but they may not be the most legible or the most appropriate". Brand decision.

## D. Notes for the lesson (typography half of lesson 9)

- Five checks a non-coder can do: (1) open DevTools, Network, filter Font: how many files, which formats (want WOFF2) and total KB; (2) reload on throttled 3G: is text visible at first render? (3) does the chosen font show Cyrillic/Latin-extended glyphs for every language you publish? (4) at 200% browser zoom nothing breaks; (5) headings are real heading tags.
- Ask the AI: "WOFF2 only, self-hosted or Google Fonts with `font-display: swap`; max 2 families and 3 weights; preload only the main body font; rem units from a 100% root; fluid sizes with `clamp()`; line length around 60-80 characters; left-aligned text; check Cyrillic coverage."
- Thin and unresolved: pairing theory beyond "contrast and a limit of two", brand typeface selection, photography-led layout typography, multi-script (Cyrillic/Latin) typesetting details, CJK typography.
