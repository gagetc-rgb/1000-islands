# Home concept: Editorial split

**Idea.** A magazine spread on a strict 12-column grid. Premium comes from image proportion, scale contrast and whitespace. There are no boxes or pills; thin rules do the structural work. Each image shape matches its job: **portrait** for the two places, **panorama** for the boat (a format, not a place), **bleed-left landscape** for the guest story.

**First viewport.** The hero is exactly `100svh − header`. Measured, it ends on the fold at all six sizes, and nothing of the next section peeks in. The copy sits on one typographic line: H1 above a white hairline, with the lead on the left and *Plan your trip* plus a quiet "Where we go ↓" cue on the right. On phones the video becomes a 9:16 crop, with the button and cue on one row.

**Handover.** The cue jumps to `#where`, which is exactly one screen tall under the header. A narrow text column ("Where / we go", a lead, and a small line-art locator map) sits beside two tall panels sized from the screen **height**. The heading and both panels therefore always fit one screen. Measured panels: 476×631 (3:4) at 1440×790, 410×513 (4:5) at 1366×657, 526×736 at 1920×950, 321×449 at 1024×690. Title, places and "from" price sit on the lower third, split by a rule. On phones the panels stack as full-width 4:5 cards.

**Order (kept, on purpose).** Hero → Where we go → Yacht charters → Made easy → Guest story → Reviews → For travel agents → Start with an idea. It already follows desire → promise → proof → act.
- **Yachts:** a full-bleed panorama right after the portrait panels, with its caption row on the grid. On phones it is a 4:3 crop.
- **Made easy:** these are real steps, so the large light numerals carry meaning. They sit on one ink rule.
- **Story:** the image bleeds off the left edge across 7 columns. The text column holds the heading, a ruled pull-quote, then the actions.
- **Reviews:** heading and the rating line on the left; on the right, one lead review and two short ones, split by hairlines.
- **B2B:** *Travel agents* in the header now has full ink weight plus a hairline divider. It also has its own ruled band with a *Trade rates* button, and the footer link.
- **Close:** the person who answers becomes a 4:5 portrait, not a 72px circle.

**Dropped or merged.** "See destinations" became the cue, so the hero has one button. Tags became dot-separated text and review cards a hairline list. Labels are hidden (`?labels=1` or **L**). No content removed, no new products.

**Creative sizes.**
| Slot | Desktop | Phone | Master |
|---|---|---|---|
| Hero video | full screen | 9:16 | 3840×2160, 12 s loop |
| Region panels | 4:5 to 5:7 | 4:5 | 2400×3000 |
| Yacht panorama | ~3:1 | 4:3 | 4800×1600 |
| Story loop | ~4:3 | 4:5 | 3200×2400 |
| Person | 4:5 | 4:5 | 1600×2000 |

**Risks.**
- The concept needs **real vertical photography** for both regions, with the subject in the central band. Cropped landscape stock will look weak.
- White text on the panels needs a dark lower third in the real photos.
- Under 560px tall, the one-screen sizing falls back to fixed 4:5 cards.
- B2B is the 7th block. If the owner wants it earlier, the band can move up to just after Yachts.
- Square corners and hairlines feel austere in grey. They depend on the stage-2 brand typeface and colour.
- The detector ignores `padding-block` and `padding-inline`, so the CSS uses physical paddings. No new ignores were added.
