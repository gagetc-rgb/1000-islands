# Round 3 (1 Nov 2026): polished hero montages into design-directions/montages3/.
# Rules from the user: no phinisi in the hero (it lives lower on the page), no Bali, no drone stopping, turning or
# flying backwards, several different shots per montage. Drone windows come from _build/strict.py (smooth windows
# of the originals); underwater shots are taken as the user approved them (strict.py misreads animals as camera moves).
# Excluded after review: DJI_0531 81-88 (brake, yaw, backwards), DJI_0832 after 12.7 (hard brake at 13 s),
# DJI_0618 after 4.4 (shake), DJI_0616 7+ (continuous gimbal tilt), the whale shark (grey).
# Run: python -I _build/hero_v3.py [p01 ...]
import sys, json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import ROOT
import hero30
from hero10 import SHOTS, shot

hero30.OUT = ROOT / "montages3"
hero30.OUT.mkdir(exist_ok=True)

SHOTS.update({
    "dronie3":   ("DJI_0531.MOV", 89.0, 95.5, .8, "warm", "Rise over the karst tower (16, start trimmed)"),
    "approach":  ("DJI_0531.MOV", 66.5, 71.4, .8, "warm", "Towards the row of karst towers"),
    "garden3":   ("DJI_0531.MOV", 71.4, 74.8, .8, "warm", "Low and fast over the coral garden (17, before the turn)"),
    # approach + garden3 are one continuous flight: graded as one shot so the seam has no colour hop (found by ffmpeg-skill scenes.py)
    "approach9": ("DJI_0531.MOV", 66.5, 74.8, .8, "warm", "Towards the karst towers and low over the coral garden (17)"),
    "karstwall3": ("DJI_0531.MOV", 56.0, 59.5, .8, "warm", "Along the karst walls"),
    "lagoon3":   ("DJI_0832.MP4", 8.0, 12.7, .6, "warm", "Past the palm into the lagoon (33, ends before the brake)"),
    "ridge":     ("DJI_0832.MP4", 1.0, 8.0, .6, "warm", "Over the jungle towards the karst gap"),
    "palms3":    ("DJI_0618.MP4", 1.0, 4.4, .6, "warm", "Between palm trunks (11, before the shake)"),
    "boat2p":    ("MVI_5333.MOV", 20.0, 24.0, .8, "level dn punch", "Boat bow between coral heads (18, more contrast)"),
    "boat3p":    ("MVI_5333.MOV", 36.0, 40.0, .8, "level dn punch", "Boat bow over bright shallows (more contrast)"),
})

C, D = "cut", "fade"
# p01 variants after the user's pick (1 Nov): the drone shots with no grade (o) and a light grade (l)
for k in ("dronie3", "approach", "corridor", "lagoon3"):
    f, a, b, sp, fx, lab = SHOTS[k]
    SHOTS[k + "_o"] = (f, a, b, sp, "raw", lab + ", as shot")
    SHOTS[k + "_l"] = (f, a, b, sp, "warm light", lab + ", light grade")

# 24 fps sources (23.976: DJI_0531, 2O4A1230, MVI_5333) play at 1.25x: one output frame per source frame at 30 fps.
# The 0.8x used until 1 Nov left 19 unique frames/s with uneven repeats (user saw the judder); user picked 1.25x.
FPS24 = {"DJI_0531.MOV", "2O4A1230.MOV", "MVI_5333.MOV"}
for k, (f, a, b, sp, fx, lab) in list(SHOTS.items()):
    if f in FPS24 and sp == .8: SHOTS[k] = (f, a, b, 1.25, fx, lab)
# Sunny looks of the rise over the karst tower, to compare; the user picked sun3 "warm sun" for p01l (1 Nov)
for g in ("sun1", "sun2", "sun3", "sun4"):
    f, a, b, sp, fx, lab = SHOTS["dronie3_l"]
    SHOTS[f"dronie3_{g}"] = (f, a, b, sp, f"{fx} {g}", f"{lab}, {g}")

# Hill flyover and cape as shot (user, 1 Nov late: the warm grade on the hill "eats the eyes")
for k in ("cape",):
    f, a, b, sp, fx, lab = SHOTS[k]
    SHOTS[k + "_o"] = (f, a, b, sp, "raw", lab + ", as shot")

hero30.MONTAGES = {
    "p01": ("Raja Ampat saga, with the reef", C, 0, 0, [("dronie3", 5), ("approach", 5), ("corridor", 5), ("fan", 5), ("turtle", 5), ("jelly", 5)]),
    "p01o": ("Raja Ampat saga, drone as shot", C, 0, 0, [("dronie3_o", 5), ("approach_o", 5), ("corridor_o", 5), ("fan", 5), ("turtle", 5), ("jelly", 5)]),
    "p01l": ("Raja Ampat saga, drone light grade", C, 0, 0, [("dronie3_sun3", 5), ("approach_l", 5), ("corridor_l", 5), ("fan", 5), ("turtle", 5), ("jelly", 5)]),
    "p11l": ("Fast, 15 s, drone light grade", C, 0, 0, [("fan", 3), ("lagoon3_l", 3), ("turtle", 3), ("approach_l", 3), ("rock", 3)]),
    # Five reshuffles of p02 for the five designs (user, 1 Nov late): same family of shots, different first shot,
    # fish or a second turtle added here and there, hill and cape as shot.
    "r1": ("Hill first", C, 0, 0, [("lagoon3_o", 5), ("fan", 5), ("turtle", 5), ("cape_o", 5), ("jelly", 5), ("rock", 5)]),
    "r2": ("Turtle first, with fish", C, 0, 0, [("turtle", 5), ("cape_o", 5), ("fish", 4), ("lagoon3_o", 5), ("fan", 5), ("rock", 5)]),
    "r3": ("Cape first", C, 0, 0, [("cape_o", 5), ("jelly", 5), ("lagoon3_o", 5), ("fan", 5), ("turtle", 5), ("rock", 5)]),
    "r4": ("Coral first, with fish", C, 0, 0, [("fan", 5), ("fish", 4), ("lagoon3_o", 5), ("turtle", 5), ("cape_o", 5), ("jelly", 5)]),
    "r5": ("Under the rock first", C, 0, 0, [("rock", 5), ("lagoon3_o", 5), ("fan", 5), ("turtle2", 4), ("cape_o", 5), ("jelly", 5)]),
    "p02": ("Reef first, refined", C, 0, 0, [("fan", 5), ("lagoon3", 6), ("turtle", 5), ("cape", 5), ("jelly", 5), ("rock", 5)]),
    "p03": ("Islands and reef, alternating", C, 0, 0, [("lagoon3", 6), ("fan", 4.5), ("dronie3", 5), ("turtle", 5), ("mushroom", 5), ("jelly", 5)]),
    "p04": ("Raja Ampat, above water", C, 0, 0, [("dronie3", 5), ("approach9", 9), ("corridor", 5), ("reflect", 5), ("rock", 5)]),
    "p05": ("Red and turquoise, second take", C, 0, 0, [("fanmacro", 4), ("garden3", 4), ("fan", 5), ("corridor", 5), ("boat2p", 4), ("jelly", 5)]),
    "p06": ("Above and below in pairs", C, 0, 0, [("approach", 4), ("tables", 4), ("lagoon3", 5), ("fish", 4), ("rock", 4), ("jelly2", 4)]),
    "p07": ("Reef life", C, 0, 0, [("turtle", 5), ("fan", 4), ("fish", 4), ("jelly", 5), ("turtle2", 4), ("fanmacro", 4)]),
    "p08": ("By boat to the rock", C, 0, 0, [("boat", 4.5), ("mushroom", 5), ("reflect", 4), ("rock", 6), ("profile", 5), ("dronie3", 5)]),
    "p09": ("North Sulawesi coast and the reef", C, 0, 0, [("coast", 5), ("palms3", 5), ("cape", 5), ("fan", 5), ("turtle", 5)]),
    "p10": ("Slow, with dissolves", D, .6, 0, [("dronie3", 6), ("lagoon3", 7), ("rock", 6), ("fan", 6), ("jelly", 6)]),
    "p11": ("Fast, 15 s", C, 0, 0, [("fan", 3), ("lagoon3", 3), ("turtle", 3), ("approach", 3), ("rock", 3)]),
    "p12": ("Beach and reef", C, 0, 0, [("reefsun", 4), ("canoe", 5), ("beachboat", 5), ("mushroom", 5), ("fan", 4), ("turtle", 5)]),
}

if __name__ == "__main__":
    names = sys.argv[1:] or list(hero30.MONTAGES)
    need = sorted({k for n in names for k, _ in hero30.MONTAGES[n][4]})
    with ThreadPoolExecutor(3) as ex:
        for k in ex.map(shot, need): print("shot", k, flush=True)
    with ThreadPoolExecutor(3) as ex: done = list(ex.map(hero30.montage, names))
    j = hero30.OUT / "montages.json"
    meta = {m["id"]: m for m in json.loads(j.read_text())} if j.exists() else {}
    meta.update({m["id"]: m for m in done})
    j.write_text(json.dumps([meta[k] for k in sorted(meta)], indent=1))
