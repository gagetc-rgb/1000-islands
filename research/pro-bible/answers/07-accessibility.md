# Cross-check 07: accessibility (digest-based, quotes from transcripts, primary sources fetched 11 Oct 2026)

Lesson feed: lesson 4. Replaces the NotebookLM-only `02-accessibility.md` (attributions there were unverified; here every named author has a quoted line).

Sources (5 videos, 5 languages of captions: en x3, de, es). Short file names: **SD** = a11y-es Soy Dalto [m67d6q_oYHo]; **SR** = a11y-de Script Raccoon [T3Qw67DrKDo]; **WDS** = a11y-en Web Dev Simplified [2oiBKSjOOFE]; **SS** = a11y-en Sara Soueidan, CSS Day [ob_M_qXeDVE]; **FCC** = a11y-en freeCodeCamp/Scrimba [e2nkq3h1P68]. All files are in `transcripts/`; digests in `digests/`.

Tags: ◆ verified against a primary page (see PRIMARY_SOURCES.md), ◈ several authors, ◇ one author or disputed.
Independence note: all five lean on WCAG (SR, WDS, FCC name it; SD's list comes from a blind viewer's note, origin unknown; SS is an accessibility specialist). They are independent teachers, but they share one standard, so agreement here is agreement on WCAG basics, not independent discovery. **FCC's English caption is machine-translated and garbled; its lines below are quoted as they appear and are weak evidence of exact wording.**

## A. Rules agreed by at least three independent authors

1. ◆◈ **Everything must work by keyboard alone.**
   - SD [3:04]: "para que un sitio web sea accesible tiene que funcionar solamente con el teclado"
   - WDS [23:15]: "you should try to use your website entirely with your keyboard and no mouse at all to see if it's even possible to do everything in your website"
   - SR [4:01]: "drückt man Tab immer auf das nächste interaktive Element zu gehen"
   - SS [45:49]: "tab through the page using a keyboard check if everything is working as as expected"
   - Primary: WCAG 2.4.7 (focus visible) and 2.4.1 (bypass blocks) quoted in PRIMARY_SOURCES.md.

2. ◆◈ **Focus must stay visible; never remove the outline without a replacement.**
   - WDS [21:14-22:14]: "if you remove the outline from your element for actual visual reasons, you need to make sure you add in some other type of replacement"
   - SR [16:14]: "ich will keine outline haben aber das ist halt schlecht ganz grundsätzlich"
   - SS [12:19]: "interactive elements should always be visible when the user interacts with them"
   - Primary ◆ WCAG 2.4.7 "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible." and MDN `:focus-visible`: "removing focus styles makes keyboard navigation inaccessible for sighted users."

3. ◆◈ **Use native HTML elements first; ARIA only when native cannot do it.** (5 authors)
   - SD [5:05]: "no usar área es mejor que utilizar mal área" (caption spelling of ARIA)
   - WDS [15:08]: "if you want a button, use a button. Don't add an on click event listener to a div"
   - SR [4:01]: "das sieht aus wie ein Button funktioniert aber nicht wie ein Button"
   - SS [49:53]: "HTML carries semantics and meaning" (she frames this as the rule of least power)
   - FCC [1:07:40]: "This is known as the first Arya rule is not use Arya." (machine-translated)

4. ◆◈ **Every form input needs a real label tied to it; a placeholder is not a label.** (4 authors)
   - WDS [1:01-2:01]: "the for attribute takes an ID that points to the input element it's for"
   - SR [4:01]: "so input feld muss immer ein Label Tag haben"
   - SD [7:09]: "tienes que etiquetar los campos de formulario para que los campos de formularios estén etiquetados tienes que usar Label"
   - FCC [37:34]: "text-there is no placeholder an affordable replacement label element" (garbled; meaning is "placeholder is not an acceptable replacement for a label")
   - Primary ◆ WCAG 3.3.2 "Labels or instructions are provided when content requires user input." and MDN label/for. Real-world rate ◆ WebAIM Million 2026: "Missing form input labels 51%" of home pages.

5. ◆◈ **Meaningful images need alt text; decorative images get empty alt.** (5 authors)
   - SD [7:09]: "se pone la etiqueta alt ... se nos da una descripción en imagen"
   - WDS [14:07]: "you want to make sure you also have an alt tag on that image describing what that image does"
   - SR [13:12]: "einfach ein leeren Alltags hier zu übergeben das ist auch okay das kann auch für dekorative Bilder benutzt werden"
   - SS [32:37]: "when you provide an empty alt to an HTML image the image is treated as decorative"
   - FCC [23:21]: "For such images are the best use empty alt attribute" (machine-translated)
   - Primary ◆ WCAG 1.1.1 (text alternative for non-text content, decorative is an exception). WebAIM 2026: "Missing alternative text for images 53.1%".

6. ◆◈ **Text needs enough contrast.** (4 authors) Thresholds are ◆ WCAG 1.4.3: 4.5:1 normal text, 3:1 large text; large = at least 18 pt or 14 pt bold (not "24 px" as often repeated); AAA 7:1 (1.4.6).
   - WDS [8:05]: "make sure you try to tune those contrast ratios to hopefully get into the AAA, but at the very least get into that double A level"
   - SR [2:01]: "deswegen sieht fahr vielleicht elegant aus ja kann man argumentieren aber ist halt praktisch nicht nutzbar für alle Menschen" (garbled; "looks elegant but is not usable for everyone")
   - SD [9:10]: "tenés que asegurarte que haya suficiente contraste entre el color del texto y el color de fondo" (the topic is introduced at [8:10])
   - FCC [8:03]: "Plain text must have value at least 4.5 and at least three for large text." (machine-translated; numbers match WCAG)
   - Real-world rate ◆ WebAIM 2026: "Low contrast text 83.9%" of home pages.

7. ◈ **Heading levels in order, one h1; headings are for structure, not for size.** (4 authors; the "one h1" part is practice, WCAG itself only requires headings to convey structure)
   - WDS [14:07]: "you should generally have exactly one H1 and no more. And then you should go in hierarchy order between H1 to H2 to H3"
   - SD [10:12]: "no podemos poner un h2 y de repente pasar a un h4"
   - SR [5:02]: "es einfach ein Diff mit der Klasse teilte und mit CSS habe ich dafür gesorgt dass das auswendig Überschrift" (garbled; a div styled as a heading is not a heading)
   - FCC [1:02:36]: "We must use only one H1 per page" (machine-translated)

8. ◈ **Test by hand (keyboard and a screen reader); automated tools find only part.** (5 authors)
   - SR [2:01]: "deswegen sollte man sich niemals hier nur auf ein Tool verlassen"
   - WDS [17:09]: "just go ahead and test your site with a screen reader"
   - SD [9:10]: "tienes que hacer pruebas con usuarios"
   - SS [7:12]: "make it a habit to fire up a screen meter" (caption spelling; screen reader)
   - FCC [4:02]: tools listed: Lighthouse, Firefox inspector, axe; "we can view our own website, using, for example, a program screen reading" (machine-translated)

9. ◈ **Link text must say where it goes ("click here" fails).** (4 authors)
   - WDS [16:08]: "you should make it actually say what the thing is going to do when you click on that link"
   - SR [9:06]: "klick hier sollte man niemals verwenden weder für Buttons noch für links"
   - SS [3:08]: "a link should not say click me it should indicate where it goes"
   - FCC [25:22]: "do not use just "click here" " or "more" for their labels" (machine-translated)

10. ◈ **Text must scale: use relative units (rem), do not block zoom.** (4 authors)
    - SD [11:12]: "una buena práctica es evitar las unidades absolutas como especificar el tamaño del texto con píxeles"
    - SR [37:49]: "sollte man eigentlich niemals pixeleinheiten im CSS verwenden"
    - WDS [16:08]: "make sure that your site works properly when you zoom it in and when you zoom it out"
    - FCC [59:32]: "pixel unit measurement ... does not scale along with the changes font size by default in browser" (machine-translated)
    - Primary ◆ WCAG 1.4.4 "text can be resized without assistive technology up to 200 percent without loss of content or functionality" and 1.4.10 reflow at "320 CSS pixels".

11. ◈ **Content that updates without a page reload needs a live region; `polite` by default.** (4 authors)
    - WDS [6:04-7:04]: "polite ... will actually wait for whatever is being currently said to them by the screen reader"; assertive "only if you actually need to immediately notify the user"
    - SR [24:30]: "polite bedeutet dass es halt vorgelesen wird aber nur dann wenn das was gerade schon vorgelesen wird zu Ende ist"
    - SD [5:05]: "se puede etiquetar el contenido Dinámico como una región en vivo"
    - FCC [1:11:45]: "Arya live polite is the most common." (machine-translated)

12. ◈ **A skip link is the first focusable item on pages with long navigation.** (3 authors)
    - WDS [23:15-24:17]: "skip links are something you should add to pretty much any site that has a ton of different links or navigation components at the top of the page"
    - SS [12:19]: "you may use the utility class to temporarily hide in page skip links and show them when they receive keyboard Focus like the developers at Ikea do"
    - FCC [1:16:48]: "We let's create a hidden link for transition directly to main content our main pages." (machine-translated)
    - Primary ◆ WCAG 2.4.1 Bypass Blocks.

## B. Single-author items (◇ unless a primary page confirms)

- WDS: `tabindex` never positive; 0 only for custom widgets and scrollable regions; -1 for programmatic focus (WDS [18:11]: "a tab index with a positive value should never ever be used"). ◆ MDN: "Avoid using tabindex values greater than 0".
- WDS: respect `prefers-reduced-motion`, colour scheme, forced colours ([29:20-31:20]). ◆ MDN defines `prefers-reduced-motion` (see PRIMARY_SOURCES.md); the lesson can still teach it as "ask the AI for it".
- WDS: avoid pure black on pure white in dark themes ([12:07]) ◇ opinion, not in WCAG.
- WDS: offer a dyslexia-friendly font option ([31:20]) ◇ opinion; no evidence in the video.
- WDS: `autofocus` on search ([31:20]) ◇ disputed.
- WDS: avoid time-limited interactions ([29:20]) ◆ partially: WCAG 2.2.1 requires that time limits can be turned off, adjusted or extended, which is narrower than "no timing at all".
- WDS: provide a non-visual and a non-audio contact route (phone and chat) ([16:08], [26:18]) ◇ practice.
- SS: CSS can change the accessibility tree: `list-style:none` removing list semantics in Safari, `display: contents` bugs, hidden labels via `display:none`, CSS-generated content read aloud, CSS-only modals (SS [5:10-47:50]) ◇ browser-specific, may change; expert source.
- SS: do not hide interactive controls with the visually-hidden class; Android TalkBack cannot find a 1px or off-screen control (SS [16:25]) ◇ demonstrated by her, not cross-checked.
- SR: required marker technique (aria-hidden asterisk + visually-hidden "required") ([29:37-31:40]) ◇.
- FCC: end alt text with a period for a pause ([22:20]) ◇ personal habit; paste code into an AI chatbot to audit it ([5:02]) ◇.
- FCC: card links, extend the hit area of the link inside rather than wrapping the card in one `a` ([29:26-31:29]) ◇.
- SD: "1% of people" figure ([1:01]) ◇ unsourced, do not reuse.

## C. Real disagreements

- **ARIA caution.** SD cites a survey ("un millón de páginas ... 41% más de errores", [6:08]). ◆ Verified: WebAIM Million 2026 says pages with ARIA averaged 59.1 errors vs 42 without (+41%), but adds it "does not necessarily mean that ARIA introduced these errors (these pages were also more complex)". SS and FCC use ARIA deliberately for custom widgets and live regions. Reading: native first; ARIA is not forbidden, it is a sign the native route failed.
- **Visually hidden text.** SR hides required text with off-screen positioning; SS recommends the clip/1px "visually hidden" technique for text but warns that neither technique is safe for interactive controls on touch screen readers. Reading: text OK; controls need `opacity:0` over the visual replacement.
- **Which WCAG level to aim at.** WDS: AA is "probably good enough"; FCC: "what we really want is AAA". ◆ Verified WCAG conformance note: "It is not recommended that Level AAA conformance be required as a general policy for entire sites". Reading: AA as the floor, AAA where cheap (a lesson should say this explicitly).
- **Autofocus and dyslexia fonts** (WDS) have no support from the other four.

## D. Notes for the lesson

- Strongest ready exercise: SR's "broken login form" (placeholder as label, span as button, no form, one global error, text-typed password, px units).
- The fixes the AI most often gets wrong: div buttons, placeholder labels, outline removal, px text, vague link text, missing alt, ARIA sprinkled on top.
- Numbers to quote ◆: 4.5:1 / 3:1 / 7:1; 18 pt or 14 pt bold; 24 by 24 CSS px target (2.5.8); 320 CSS px reflow; 200% resize; five seconds for auto-moving content (2.2.2). Do not quote the "96.5%" figure from FCC; ◆ the current WebAIM figure is 95.9% of home pages with detected WCAG 2 failures (2026 edition).
