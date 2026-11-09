# Round 2 (1 Nov 2026): 30 more hero montage ideas into design-directions/montages2/, for the user to pick a top 5.
# Reuses hero10.py shots (montages/shots/) and adds footage not used before, chosen from the cuts/scout/ contact sheets.
# Each montage: (title, transition, dissolve s, tail fade s, [(shot, seconds or None), ...]).
# transition: "cut", "fade" (dissolve) or "fadeblack" (dip to black); tail fade darkens the last seconds so the loop
# restarts from black instead of jumping.
# Run: python -I _build/hero30.py [n01 ...]
import subprocess, sys, json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import ROOT
import hero10
from hero10 import SHOTS, SH, F, shot, dur
from cuts import JELLY

OUT = ROOT / "montages2"
OUT.mkdir(exist_ok=True)

SHOTS.update({
    "garden2":    ("DJI_0531.MOV", 81.0, 86.6, .8, "warm", "Neon turquoise between karst towers"),
    "karstwall":  ("DJI_0531.MOV", 55.5, 60.3, .8, "warm", "Row of karst walls over the lagoon"),
    "boatlagoon": ("DJI_0531.MOV", 32.0, 36.8, .8, "warm", "Boat crossing the lagoon from above"),
    "reflect":    ("2O4A1230.MOV", 2.0, 8.4, .8, "dn", "Mushroom rock mirrored in still water"),
    "profile":    ("2O4A1230.MOV", 33.0, 39.4, .8, "dn", "Round the rock: the face in the cliff"),
    "boat2":      ("MVI_5333.MOV", 20.0, 24.0, .8, "level dn", "Boat bow between coral heads (18)"),
    "boat3":      ("MVI_5333.MOV", 36.0, 40.0, .8, "level dn soft", "Boat bow over bright shallows"),
    "reefsun":    ("DJI_20241005090030_0068_D.MP4", 0.0, 3.6, .6, "warm", "Top-down: sun glitter on corals (21)"),
    "beachboat":  ("DJI_20241005090030_0068_D.MP4", 22.0, 26.2, .6, "warm", "Low over the moored boat to the reef (22)"),
    "fanmacro":   ("2O4A0721.MOV", 3.0, 9.0, 1.0, "stab dn", "Orange sea fan, close (25)"),
    "tables":     ("2O4A9405.MOV", 12.0, 17.5, 1.0, "stab dn", "Table corals on the reef wall"),
    "turtle2":    ("2O4A9405.MOV", 36.0, 42.0, 1.0, "stab dn", "Turtle over the reef, close"),
    "turtlelong": ("2O4A9405.MOV", 50.0, 66.0, 1.0, "stab dn", "Turtle, one long take"),
    "jelly2":     (JELLY, 2.0, 8.0, 1.0, "dn", "Golden jellyfish passing near the surface"),
    "shark":      ("DJI_0759.MP4", 17.0, 21.0, 1.0, "warm", "Whale shark by the bagan (23)"),
    "reeftop":    ("DJI_0616.MP4", 7.0, 11.2, .6, "warm", "Top-down reef edge, North Sulawesi (13)"),
    "lagoonfull": ("DJI_0832.MP4", 4.0, 16.4, .6, "warm", "Jungle ridge to the open lagoon, one take"),
    "phinisifull": ("DJI_0549.MP4", 0.0, 12.3, 1.0, "", "Phinisi at sunset, whole flight"),
})

C, D, B = "cut", "fade", "fadeblack"
MONTAGES = {
    "n01": ("Raja Ampat karst saga", C, 0, 0, [("dronie", None), ("garden", 6), ("garden2", 6), ("corridor", None), ("reflect", 6)]),
    "n02": ("One rock, four angles", D, .6, 0, [("mushroom", 6), ("reflect", 6), ("rock", None), ("profile", 7)]),
    "n03": ("Clear water", C, 0, 0, [("boat3", None), ("boat2", None), ("reefsun", 5), ("beachboat", 6)]),
    "n04": ("Islands first, then the reef", C, 0, 0, [("lagoon", None), ("fan", 5), ("dronie", 6), ("turtle", 6), ("phinisi", 6)]),
    "n05": ("Red and turquoise", C, 0, 0, [("fanmacro", 5), ("garden2", 5), ("fan", 5), ("boat3", None), ("jelly", 6)]),
    "n06": ("Teaser, 12 s", C, 0, 0, [("fan", 3), ("lagoon", 3), ("turtle", 3), ("dronie", 3)]),
    "n07": ("Slow cinema, 40 s", D, 1.0, 0, [("reflect", None), ("lagoon", None), ("garden", None), ("turtle", None), ("jelly", 7), ("phinisi", None)]),
    "n08": ("Chapters: dip to black", B, .6, 0, [("dronie", None), ("fan", None), ("turtle", 7), ("phinisi", None)]),
    "n09": ("Underwater, second set", C, 0, 0, [("fanmacro", 5), ("tables", 5), ("turtle2", 6), ("fish", 5), ("jelly2", 6)]),
    "n10": ("Boat journey to sunset", C, 0, 0, [("boat", 4.5), ("mushroom", 6), ("rock", None), ("profile", 6), ("phinisi", 6)]),
    "n11": ("Drone only, second set", C, 0, 0, [("cape", 5), ("reeftop", 5), ("lagoon", None), ("garden2", 5), ("dronie", None)]),
    "n12": ("One take: jungle to lagoon", C, 0, 0, [("lagoonfull", None)]),
    "n13": ("One take: the turtle", C, 0, 0, [("turtlelong", None)]),
    "n14": ("One take: phinisi at sunset", C, 0, 0, [("phinisifull", None)]),
    "n15": ("North Sulawesi only (GPS)", C, 0, 0, [("coast", 5), ("palms", None), ("cape", None), ("reeftop", None)]),
    "n16": ("Raja Ampat only", C, 0, 0, [("reefsun", 5), ("beachboat", 6), ("canoe", 6), ("dronie", 6), ("garden", 6)]),
    "n17": ("Opens with a jellyfish", C, 0, 0, [("jelly", 6), ("lagoon", None), ("fan", 5), ("rock", 6)]),
    "n18": ("Opens with the turtle", C, 0, 0, [("turtle", 6), ("boat3", None), ("fan", 5), ("dronie", 6)]),
    "n19": ("Eye level, no drone", C, 0, 0, [("boat3", None), ("reflect", 6), ("rock", 6), ("boat2", None), ("mushroom", 6)]),
    "n20": ("Above, below, in pairs", C, 0, 0, [("garden2", 3.5), ("tables", 3.5), ("lagoon", 3.5), ("fish", 3.5), ("reflect", 3.5), ("jelly2", 3.5)]),
    "n21": ("Blue to gold", D, .5, 0, [("jellies", 5), ("turtle2", 5), ("garden", 5), ("fan", 5), ("phinisi", None)]),
    "n22": ("People and boats", C, 0, 0, [("canoe", None), ("beachboat", 6), ("boatlagoon", None), ("mushroom", 6), ("phinisi", 6)]),
    "n23": ("Wildlife", C, 0, 0, [("turtle", 6), ("shark", 4), ("fish", 5), ("jelly", 6), ("fanmacro", 5)]),
    "n24": ("Loop that closes on itself", C, 0, 0, [("fan", 5), ("garden2", 5), ("dronie", 6), ("turtle", 6), ("fanmacro", 4)]),
    "n25": ("Reef first (01) with dissolves", D, .5, 0, [("fan", None), ("lagoon", None), ("turtle", 6), ("cape", 5), ("jelly", 6)]),
    "n26": ("A day (10), soft loop", C, 0, 1.2, [("cape", 5), ("lagoon", None), ("rock", 6), ("fan", 5), ("phinisi", None)]),
    "n27": ("Three shots only", D, .8, 0, [("lagoon", None), ("fan", None), ("phinisi", None)]),
    "n28": ("Centred subjects, phone-first", C, 0, 0, [("jelly", 6), ("turtle", 6), ("fan", 5), ("mushroom", 6)]),
    "n29": ("Karst and clear water", D, .6, 0, [("corridor", None), ("karstwall", None), ("boat3", None), ("reflect", 6)]),
    "n30": ("Best of, 36 s", C, 0, 0, [("fan", 4), ("lagoon", 5), ("turtle", 5), ("dronie", 5), ("rock", 5), ("garden2", 4), ("jelly", 4), ("phinisi", 4)]),
}

def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], check=True, cwd=OUT)

def montage(name):
    title, tr, xf, tail, parts = MONTAGES[name]
    args, chains, durs = [], [], []
    for i, (k, secs) in enumerate(parts):
        d = min(secs or 99, dur(SH / f"{k}.mp4"))
        frames = int(d * F); durs.append(frames / F)
        args += ["-i", SH / f"{k}.mp4"]
        chains.append(f"[{i}:v]trim=end_frame={frames},setpts=PTS-STARTPTS,settb=AVTB[s{i}]")
    total = sum(durs) - (xf * (len(parts) - 1) if tr != C else 0)
    if len(parts) == 1: last = "s0"
    elif tr != C:
        last, off = "s0", 0.0
        for i in range(1, len(parts)):
            off += durs[i - 1] - xf
            chains.append(f"[{last}][s{i}]xfade=transition={tr}:duration={xf}:offset={off:.3f}[x{i}]"); last = f"x{i}"
    else:
        chains.append("".join(f"[s{i}]" for i in range(len(parts))) + f"concat=n={len(parts)}:v=1:a=0[x]"); last = "x"
    if tail:
        chains.append(f"[{last}]fade=t=out:st={total - tail:.3f}:d={tail}[t]"); last = "t"
    out = OUT / f"{name}.mp4"
    ff(*args, "-filter_complex", ";".join(chains), "-map", f"[{last}]", "-r", F, "-an", "-c:v", "libx264", "-preset", "medium",
       "-crf", 21, "-maxrate", "6M", "-bufsize", "12M", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out)
    ff("-ss", min(1.0, total / 3), "-i", out, "-frames:v", 1, "-vf", "scale=960:-2", "-c:v", "libwebp", "-quality", 75, out.with_suffix(".webp"))
    print(f"{name}  {total:.1f} s  {out.stat().st_size / 2**20:.1f} MiB  {title}", flush=True)
    return dict(id=name, title=title, secs=round(total, 1), transition=tr, shots=[[k, SHOTS[k][5]] for k, _ in parts])

if __name__ == "__main__":
    names = sys.argv[1:] or list(MONTAGES)
    need = sorted({k for n in names for k, _ in MONTAGES[n][4]})
    with ThreadPoolExecutor(3) as ex:
        for k in ex.map(shot, need): print("shot", k, flush=True)
    with ThreadPoolExecutor(3) as ex: done = list(ex.map(montage, names))
    j = OUT / "montages.json"
    meta = {m["id"]: m for m in json.loads(j.read_text())} if j.exists() else {}
    meta.update({m["id"]: m for m in done})
    j.write_text(json.dumps([meta[k] for k in sorted(meta)], indent=1))
