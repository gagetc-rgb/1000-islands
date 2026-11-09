# Cross-check 08: forms and the path to an enquiry (digest-based, quotes from transcripts, primary pages fetched 11 Oct 2026)

Lesson feed: lesson 5 (forms and conversion). The earlier first pass had no cross-checked forms material at all; this is the first.

Sources (6 forms videos plus the accessibility videos of `answers/07`). Short names: **WK** = forms-en A11y Bytes, Russ Weakley [9aSEd7R4GjY] (2019); **JG** = forms-en Optimal, Julie Grundy [hPS7LUW7SlA] (2017); **BS** = forms-fr BreizhCamp, Bruno Sabot [jnxkdHo8OEk] (2019); **BM** = forms-en Baymard Institute, Christian Holst [DlQ1wcHFxBo] (2019, sells research); **VF** = forms-en Elementor webinar, Vitaly Friedman [qktwIWZNFY4] (2020); **ST** = forms-en Silktide, Oliver Emberton [ffxwEyBcdf0] (2021, sells an accessibility tool). Also SR (Script Raccoon login form, `answers/07`). Files in `transcripts/`, digests in `digests/`.

Tags: ◆ primary page verified (PRIMARY_SOURCES.md "Forms and conversion"), ◈ several authors, ◇ one author or disputed.
Independence: JG, VF and BS all draw on the same published form-design literature (Wroblewski, NN/g, Smashing/Adam Silver patterns) so their overlap is weaker evidence than it looks. BM is original testing but sells it. WK and ST are accessibility specialists. No author sells a form product except ST (testing platform).

## A. Rules agreed by at least three authors

1. ◆◈ **Every field has a visible label; a placeholder is not a label and not a place for hints.** (JG, BS, VF, ST, WK, SR)
   - JG [7:19]: "inline labels are when you have a form field and no label for that form ... once someone clicks in the form their instructions go away"
   - BS [10:16]: "mettez un label pas un plex holder" (caption of: put a label, not a placeholder)
   - ST [6:04-7:05]: "when you start typing in that field you don't know what you're asked for anymore"
   - WK [14:22-15:22]: using a placeholder for a hint is "a terrible practice" because "the hint message disappears when the user interacts with a form control"
   - Primary ◆ GOV.UK: "Do not use placeholder text in place of a label, or for hints or examples"; MDN: "The placeholder attribute is not as semantically useful as other ways to explain your form"; WCAG 3.3.2 "Labels or instructions are provided when content requires user input."

2. ◆◈ **Labels above the field, one column.** (JG, BS, VF, ST)
   - JG [6:16]: "we know that top-line labels are best for faster form completion times"
   - BS [11:17]: "les labels vous les mettez au dessus du champ et non pas à côté"
   - VF [48:41]: "one single column with labels aligned to the top was is easy peasy you will not go wrong with it"
   - ST [8:06-9:07]: "I would recommend to stick with the label on the top left ... that is not a w requirement just better practice"
   - Primary ◆ GOV.UK: "You should align labels above the text input they refer to." Baymard's and others' eye-tracking is not independently verified here.

3. ◈ **Do not show an error before the user has tried; validate when the user leaves the field (on blur), not on focus.** (JG, BS, VF)
   - JG [13:27-14:29]: "don't show inline validation on focus ... you're basically yelling at someone before they've even tried to fill it out"
   - BS [4:06]: "c'est pas le bon moment" (an error shown before any input on Apple's form); validate "suivant le cas de figure" on blur or after a delay
   - VF [49:41-50:41]: "the established one is late validation because it's the least harmful one"
   - No primary standard exists for this timing; it is practice. VF's "threshold" refinement is ◇.

4. ◈ **Errors: specific message next to the field telling how to fix it; for longer forms add a summary with links.** (JG, BS, WK, VF, ST)
   - WK [1:02]: "you shouldn't just say that's invalid you try and explain how it's invalid and how to improve it"
   - BS [14:22]: "met une bonne explication n'est ne m'étais pas il ya une erreur sur le champ" (garbled caption; meaning: give a good explanation, not just "there is an error on the field")
   - VF [51:41-52:44]: "display them as a summary and also above every single input field"
   - ST [43:44-46:48]: GOV.UK pattern: title "Error: ...", summary at top with links, `aria-describedby` on the field
   - Primary ◆ GOV.UK error message: "put the message in red after the question text and hint text"; "Put the error summary at the top of the main container."; WCAG 3.3.1 "the item that is in error is identified and the error is described to the user in text."

5. ◆◈ **Hints and error text must be programmatically tied to the field** (inside the label or `aria-describedby`). (WK, ST, SR)
   - WK [4:08-5:10]: wrapping the hint or error inside the `<label>` passed all nine tested screen-reader/browser combinations
   - ST [34:33]: "aria described by ... you attach information that describes something to a control"
   - SR (answers/07 [28:34]): same fix in a login form
   - WK and ST describe tested behaviour; there is no W3C quote for the exact technique here; WCAG 3.3.1 and 3.3.2 give the requirement.

6. ◆◈ **Use native input types and `autocomplete`; ask only for data you need.** (JG, BS, ST, VF)
   - JG [11:23]: "if you know it's gonna be a telephone number you can put in the attribute tell"
   - BS [12:18]: "type number par exemple ... ses tables numériques qui va sortir sur les navigateurs"
   - ST [23:21]: "autocomplete is an essential requirement of wcag 2.1"
   - VF [31:25]: "probably the first thing we should be doing when we're optimizing our forms is to look into autofill"
   - Primary ◆ web.dev: "Use HTML element attributes to access built-in browser features, in particular type and autocomplete with appropriate values."; WCAG 1.3.5 (purpose of user-data fields can be determined).

7. ◈ **Fewer fields: every field must earn its place.** (JG, BS, BM, VF)
   - JG [19:40-21:42]: removed the comment box nobody read from a donation form
   - BS [7:10-8:10]: "assurez vous que tous les chances sont bien nécessaires" (caption); half the room had abandoned a form for asking too much
   - BM [10:15-11:17]: "the real question we should ask ourselves is not how many steps you have in your checkout flow, but rather how many form fields"
   - VF [37:31-45:38]: profile every field with the team
   - Primary ◆ Baymard (2024 page): "most sites need only 8 form fields in total for a checkout flow — yet the average in 2024 was 11.3"; GOV.UK: "only ask users for information you really need".

8. ◈ **Test with real users and with keyboard and screen readers.** (WK, ST, JG, VF)
   - WK [21:27]: "make sure you test with real users make sure you test with blind users and a variety of different users"
   - ST [48:51-50:53]: keyboard only, a screen reader, disabled users "and also please pay them for it"
   - JG [27:50]: "when in doubt be sure to talk to your users"
   - VF [58:52]: "just test, just create a prototype that does things a little bit differently ... and measure"

## B. Items with two authors or one

- ◈2 **Name buttons by the action; no Reset button.** JG [8:19, 9:22] "don't use reset that just never be a thing ever"; BS [8:10-9:13] "ne m'étais jamais de bouton reset". ◇ practice.
- ◈2 **Single "full name" field; do not split names and addresses.** BM [17:24-25:35] (tested; about 6% fewer fields; splitting later about 90%+ accurate); VF [28:22-30:23]. ◇ BM-led.
- ◈2 **Mark optional fields rather than required ones.** JG [22:42-24:45], BS [13:19-14:22]; ◆ GOV.UK: "add ‘(optional)’ to the labels of optional fields". VF declines to settle it.
- ◈2 **Do not ask users to repeat their email or password.** BS [0:00-2:03] ("éviter de demander deux fois le mot de passe"), VF [16:09-17:09, 33:27-35:29]. ◆ WCAG 3.3.7 Redundant Entry allows the exception "the information is required to ensure the security of the content", so repeat-password is not a standard failure; this is UX opinion with unsourced figures ("almost 70 percent copy-paste").
- ◇ BM: collapse optional minority fields (address line 2, company, coupon) behind a link; hide billing address and default to shipping; auto-detect city and region from the postcode and fire when the expected length is reached, with a manual override; delay account creation until after the order. Tested by a research vendor; checkout-specific.
- ◇ VF: ask for country first because it changes about 18 things; threshold validation ("reward early, punish late"); time-trap and honeypot anti-bot measures (instead of CAPTCHA); keep checkout guest-first.
- ◇ ST: boundary and focus contrast, no colour-only valid/invalid states, `fieldset`/`legend` for radio groups, `aria-live="polite"` for "characters left" counters. ◆ WCAG 1.4.11: "a contrast ratio of at least 3:1 against adjacent color(s)" for UI component boundaries.
- ◇ BS: field height about 48 px; ◆ WCAG gives 44 CSS px at AAA (2.5.5) and 24 CSS px at AA (2.5.8); 48 px is a platform guideline.
- ◇ JG: Expedia removed a "company" field and gained "12 million dollars" in a year (unsourced anecdote, **not verified**).

## C. Real disagreements

- **Browser validation vs custom validation.** ST recommends `required`, `pattern`, min/max ([17:18-21:18]). ◆ GOV.UK says "Do not use it" for HTML5 validation messages and to add `novalidate`, because styling and placement cannot be made consistent. Reading: for a small site, native validation is acceptable as a baseline, but a designed error message plus summary is the better result; the AI should not leave default browser bubbles unreviewed.
- **Disabled submit button.** VF: never disable it ("guarantee a hundred percent abandonment" if scripts fail). BS: disable it after the click with a loading indicator to prevent duplicates. Reading: both can hold: do not disable before submit; guard against double submission after submit.
- **Steps vs fields.** BM: steps do not matter, fields do. VF and BS: split into steps with no more than 6-7 fields per view. Reading: split only to reduce what is seen at once.
- **Required vs optional marking.** JG and BS: mark optional. VF: declines to give a single answer. ◆ GOV.UK: mark optional.
- **Floating labels.** VF and JG: acceptable if tested; ST: sceptical.
- **Assertive vs polite announcements.** WK warns against `aria-live="assertive"`/`role="alert"` per field; ST's GOV.UK pattern uses `role="alert"` once, on the summary. Reading: one alert for the summary, not for every field.
- **Numbers disagree with current data.** BM's 2019 "26% abandon for a too complicated checkout" vs ◆ the 2024 Baymard page "17 % Too long / complicated checkout process"; "12.8 fields" in 2019 vs the page's "12.7 in 2019". Use the current page.

## D. Notes for the lesson (booking and enquiry forms)

- The one-minute test: open the form on a phone; can you read every label after you start typing? Does Tab move in visual order? Does an empty submit tell you what is wrong in words next to each field? Are Accept-all style defaults absent (no pre-ticked boxes, no required marketing opt-in)?
- Ask the AI: "visible labels above fields; single column; native input types and autocomplete; error text next to the field and a summary with links; no placeholder as label; no Reset; button says what it does; only name, email, dates, party size, message; mark optional fields; do not clear input on error."
- Not covered by any source here: booking-specific patterns (date range pickers, party size, availability), WhatsApp or phone alternatives, spam protection for static sites; thin.
