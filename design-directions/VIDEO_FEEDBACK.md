# Video feedback, 1 Nov 2026 (user, on the five hero directions)

Source of timecodes: `gemini-code-1000isl.txt` (project root), 18 clips + 8 photos.

## Rules from this round
- Sunny, bright, saturated. Several drone clips read dull and grey.
- No sharp camera turns at the start of a shot.
- Hero text must not sit over the middle of the video. Keep it at the edges, smaller; the centre is clean video. Minimalism.
- The phinisi sunset clip (DJI_0549) is loved: keep as is.
- The v4 Reef montage is the favourite cut; a candidate for all designs after fixes (below).

## Per direction
- v1 Expedition: shot 2 (DJI_0080 0.5–6.0, the flight off the hill) OUT. Shots 1 and 3 acceptable but too dull, not enough sun.
- v2 Field kit: centred headline "Remote Indonesia. Off the map." covers the video, irritating. Clips mostly fine, but the flyover that repeats v1's location (DJI_0079 0.5–8.0, starts with a sharp camera turn, ends dull) OUT.
- v3 Quiet: centred text bothers a little. Opening flyover is "about nothing": brighter shots exist. Photos good. Bottom section: calm light matches the photos, a bit dark, lighten.
- v4 Reef (favourite): first shot (DJI_0079 2.0–5.5 reef flat) bad. Open with the red sea fan (2O4A0721). Fish fine, pick juicier fish. Jellyfish great. Too little above-water footage: mix in some drone.
- v5 Chart: clouds → volcano opening is great. Shot 4 (DJI_0069, the dull clip used in several directions) OUT. Slogan and type size to be reworked later; text at the edges.

## Technical finding (Claude, 1 Nov)
The volcanic-coast drone clips are shot flat: DJI_0069 luma sits in 67–139 of 0–255, DJI_0079 69–140, DJI_0080 50–127 (10th–90th percentile), saturation ~15–25. They were encoded without any grade, so they look grey. DJI_0832 is HLG HDR (bt2020, arib-std-b67) and was converted without tone mapping. Fix: per-clip levels + saturation grade, proper HLG → SDR tone map. See `cuts/` for graded vs original.

## Verdicts on cuts/ (user, 1 Nov, partly; his message was cut off after 21)
Own picks:
- 31 clouds → highlands: fine, nothing special (Bali, see geo rule).
- 32 karst corridor: good, but sharp turn at the very start and one starting at the end: trim both ends. TODO re-cut.
- 33 palm → lagoon: excellent, "exactly what we need".
- 34 boat bow: nice, but horizon tilted and cropped (stab zoom), image a bit "thick" (over-graded?). TODO re-cut: level horizon, less crop, lighter grade.
- 35 red sea fan: FAVOURITE. Slight up-down bob at the end, acceptable.
- 36 turtle: beautiful, keep.
- 37 coral pinnacle: OUT (dull, no colour).
- 38 jellyfish drifting into frame: great.
- 39 under the orange rock: great, a good pass.
- 40 canoe on beach: too short (4.5 s, unreadable). TODO re-cut longer.
Gemini set:
- 01–05 Bali clouds/volcano: OUT. Near-identical segments of one flight; and it is Bali (Batur), the tours are not Bali. Geo rule below.
- 06 volcanic coast: passable. 07, 09, 10 awkward shots; 08 horizon tilted: OUT.
- 11 palms: good. 12 cape: good. 13 reef top-down: OK, weaker than 12. Never put 11/12/13 together (one flight).
- 14 jungle ridge: OUT. 15 = same palm pass as 33, duplicate.
- 16 karst dronie: decent, but cut the first 1–1.5 s.
- 17 coral garden: good. 18 = same as 34. 20 mushroom rock: good, liked.
- 23–24 whale sharks: not for the home page now, weak shots; maybe a few seconds of 23 somewhere.
- 25–29 underwater: good; 25/26 similar, differ in colour, choose by what they must match. 30 jellyfish weaker than 28–29.
- 21, 22, 27 not commented yet.

## GPS read from DJI telemetry (djmd stream, coordinates stored in radians), 1 Nov
| File | Lat, lon | Place (from coordinates) | Gemini said |
|---|---|---|---|
| DJI_0069 / 0079 / 0080 | 2.66, 125.47 | Siau / Sangihe, North Sulawesi | Bali / Flores volcanic belt (wrong) |
| DJI_0616 / 0618 | 3.06, 125.49 | Sangihe Island, North Sulawesi | Bali / Flores (wrong) |
| DJI_0068 | -1.78, 129.72 | Misool area, Raja Ampat | Raja Ampat (right) |
| DJI_0759 whale sharks | -3.71, 133.75 | Kaimana / Triton Bay, West Papua | Saleh Bay, Sumbawa (wrong) |
| DJI_0824 / 0829 | -8.21, 115.33–115.41 | Batur, Bali | Bali (right) |
| DJI_0531, 0549, 0832, 0141, Canon, Osmo files | no GPS | ask the owner | |
Place names are inferred from the coordinates; coordinates themselves are read from the files.
Re-run: `python -I design-directions/_build/gps.py`.

## Round 2 feedback (user, 1 Nov, on montages2/)
- No phinisi in the hero: it is used lower on the page.
- Hero = a montage of several different shots, not one take and not one location only.
- Bad moves to cut everywhere: drone that brakes, turns and flies backwards (DJI_0531 81–88, it was "garden2"); the atoll shot where the camera bobs up and down (DJI_0832 hard brake at 13 s, inside the old "lagoon" shot).
- Liked: the start of the Raja Ampat saga (karst tower rise, 16), approach to the rocks (17), boat to the rock (20), 32 should be used.
- Asked for: a more polished, self-reviewed set; iterate until it is good.
- Checks now: `_build/strict.py` marks STOP / BACK / REV / YAW / JOLT / SNAP on drone footage; underwater shots are judged by eye (animals fool the tracker).

## Geo rule (user, 1 Nov)
Every shot on a page must match the region that page sells. No Bali shots promoted as Sulawesi or Raja Ampat. Gemini's region tags are guesses from the picture: ffprobe shows no GPS tags in the files (only creation dates); a deeper check needs exiftool on the DJI metadata, or ask the owner where each clip was shot.

## Open (later)
- Lockdown Mode on iPhone blocks web fonts: needs a tuned system-font fallback stack.
- Defend or drop the centred hero headline with real reference sites.

## ffmpeg-skill second opinion on montages3 (1 Nov)
- Tools: `.claude/skills/ffmpeg-skill/scripts/scenes.py --shots` and `check.py --content` (run with plain `python`, not `-I`: the scripts import `_common` from their own folder).
- All 12: 0 flash frames, 0 black, no frozen spans, cut points match the planned shots exactly (no hidden jump inside a shot). Missed cuts only where two shots share a colour (detector, not a defect).
- Found: in p04 "approach" and "garden3" are one continuous flight, so the cut was invisible but each half had its own grade. Rebuilt p04 with one shot "approach9" (DJI_0531 66.5-74.8), 29 s.
- Its motion proxy (static/pan/motion) is too coarse to catch stops or backward flight: `_build/strict.py` stays the gate for that.
- For the final encode: some montages carry no colour tags; add `-colorspace bt709 -color_primaries bt709 -color_trc bt709`.

## Pick and hero rework (user, 1 Nov)
- Picked: p01 (Raja Ampat saga) and p11 (Fast, 15 s). The full warm grade turned the jungle yellow: both use the light drone grade (p01l, p11l). Final files `assets/video/hero-saga*` and `hero-fast*` from `_build/hero_final.py` (phone 9:16 cut from the sources). Assigned: v1/v3/v5 saga, v2/v4 fast.
- Hero rules: no copy over the middle of the video; small headline bottom-left, actions bottom-right; shade only at the top edge (header) and the bottom band. Shared layout in base.css; directions keep their own fonts. Lead cut to "Private journeys to Raja Ampat and North Sulawesi, run by our own people on the ground." ("far beyond the usual routes" repeated "Off the map").

## Round 4 (user, 1 Nov, evening)
- Judder in "rise over the karst tower": 24 fps sources (DJI_0531, 2O4A1230, MVI_5333) were slowed to 0.8x, which leaves
  19 unique frames/s with uneven repeats. Comparison at 0.8x / 1.0x / 1.25x in `montages3/fps/`; waiting for the user's pick
  before rebuilding p01/p11 and the 24 fps shots.
- Review pages (montages, montages2, montages3) now unload clips that leave the screen; before, lower clips stopped playing.
- Hero video control: only v3 Quiet keeps one (Aman-style glyph + hairline progress); removed in v1, v2, v4, v5.
  The user decides by classic UI/UX, not by legal or accessibility arguments.
- Hero copy: H1 "Indonesia. Off the map." (the logo already says "Remote Indonesia"); lead "...run by our own people" ->
  "...led by our own team on the ground." Note: "Remote Indonesia. Off the map." was the owner's own line (PRODUCT.md).
- Final hero for all five designs: p02 "Reef first, refined" (user, 1 Nov late; his "вариант 2" meant p02, listed first
  on the montages3 page) -> `assets/video/hero-reef*`. Base.js no longer hides video on a "3g" estimate (only Save-Data / 2G).
