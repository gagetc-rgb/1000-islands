# Ten candidate hero montages (1 Nov 2026) from the shots the user approved in cuts/ (verdicts: VIDEO_FEEDBACK.md).
# Step 1: every shot in SHOTS is cut once from the original into montages/shots/<key>.mp4: graded like cuts.py "g",
# 1920x1080, 30 fps, near-lossless (crf 14). Playback speed is chosen so the source frame rate lands on 30 fps exactly:
# 60 fps -> 1.0 (every 2nd frame), 50 fps -> 0.6 (slow motion), 30 fps -> 1.0. 24 fps (23.976: DJI_0531, 2O4A1230, MVI_5333)
# needs 1.25 for one output frame per source frame, or 1.0 (every 5th frame repeated). The 0.8 used until 1 Nov left
# 19 unique frames/s with uneven repeats: the judder the user saw. See montages3/fps/ for the comparison.
# Step 2: each montage in MONTAGES concatenates (or dissolves) shots, optionally shortened, into montages/<name>.mp4.
# Geo (DJI GPS, 1 Nov): no Bali (DJI_0824/0829) anywhere. DJI_0069/0616/0618 = North Sulawesi (Sangihe/Siau),
# DJI_0068 = Raja Ampat (Misool), DJI_0759 = Kaimana, West Papua.
# Run: python -I _build/hero10.py [montage ...]
import subprocess, sys, json, re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import SRC, ROOT
from cuts import grade, src_fps, HLG, HLG_TO_SDR, JELLY

OUT = ROOT / "montages"
SH = OUT / "shots"
SH.mkdir(parents=True, exist_ok=True)
F = 30

# key: (source, start s, end s, speed, fx, label)  fx: "stab" vidstab, "level" vidstab without rotation and 2% zoom
# (keeps the horizon), "dn" denoise, "warm" sunny drone grade, "soft" lighter grade
SHOTS = {
    "fan":      ("2O4A0721.MOV", 19.0, 25.0, 1.0, "stab dn", "Red sea fan against the blue (35)"),
    "lagoon":   ("DJI_0832.MP4", 10.0, 14.5, .6, "warm", "Past the palm into the lagoon (33)"),
    "turtle":   ("2O4A9405.MOV", 52.0, 60.0, 1.0, "stab dn", "Turtle swims past the camera (36)"),
    "jelly":    (JELLY, 52.0, 59.5, 1.0, "dn", "Jellyfish drifts into the frame (38)"),
    "rock":     ("2O4A1230.MOV", 22.0, 28.4, .8, "dn", "Under the orange rock (39)"),
    "corridor": ("DJI_0531.MOV", 24.0, 28.8, .8, "warm", "Karst corridor, turns trimmed (32)"),
    "boat":     ("MVI_5333.MOV", 0.0, 5.6, .8, "level dn soft", "Boat bow, horizon kept level (34)"),   # camera pitches down after ~4.5 s of output: use 4.5 s
    "dronie":   ("DJI_0531.MOV", 89.0, 95.0, .8, "warm", "Karst tower dronie, first 1.5 s cut (16)"),
    "garden":   ("DJI_0531.MOV", 75.0, 80.6, .8, "warm", "Low into the coral garden (17)"),
    "palms":    ("DJI_0618.MP4", 1.0, 5.0, .6, "warm", "Between palm trunks (11)"),
    "cape":     ("DJI_0616.MP4", 0.0, 4.0, .6, "warm", "Tropical cape (12)"),
    "canoe":    ("DJI_20241005090030_0068_D.MP4", 9.5, 13.7, .6, "warm", "Canoe on the white beach, longer (40)"),
    "phinisi":  ("DJI_0549.MP4", 3.0, 10.0, 1.0, "", "Phinisi at sunset"),
    "fish":     ("2O4A8813.MOV", 0.0, 6.0, 1.0, "stab dn", "Bommie with reef fish (27)"),
    "jellies":  (JELLY, 12.0, 19.0, 1.0, "dn", "Jellyfish constellation (29)"),
    "mushroom": ("2O4A1230.MOV", 10.0, 15.6, .8, "dn", "Boat to the mushroom rock (20)"),
    "coast":    ("DJI_0069.MP4", 2.0, 8.0, 1.0, "warm", "Volcanic coast, North Sulawesi (06)"),
}

# name: (title, xfade s, [(shot, seconds or None = whole shot), ...])
MONTAGES = {
    "m01": ("Reef first: the v4 cut, fixed", 0, [("fan", None), ("lagoon", None), ("turtle", 6), ("cape", 5), ("jelly", 6)]),
    "m02": ("Above and below, alternating", 0, [("lagoon", None), ("fan", 5), ("corridor", None), ("turtle", 6), ("phinisi", None)]),
    "m03": ("Raja Ampat by boat", 0, [("boat", 4.5), ("rock", None), ("corridor", None), ("dronie", None)]),
    "m04": ("Islands from the air", 0, [("cape", 5), ("lagoon", None), ("garden", 6), ("dronie", 6), ("phinisi", 6)]),
    "m05": ("Underwater only", 0, [("fan", None), ("fish", 5), ("turtle", 7), ("jelly", 6), ("jellies", 5)]),
    "m06": ("Quiet: long shots, dissolves", .8, [("rock", None), ("lagoon", None), ("jelly", None), ("phinisi", None)]),
    "m07": ("Short and fast, 16 s", 0, [("fan", 4), ("lagoon", 4), ("turtle", 4), ("rock", 4)]),
    "m08": ("Beach and boats", 0, [("canoe", None), ("mushroom", 6), ("fan", 5), ("turtle", 6), ("phinisi", 6)]),
    "m09": ("North Sulawesi coast and reef", 0, [("coast", 5), ("palms", 5), ("fan", 5), ("turtle", 6), ("jelly", 6)]),
    "m10": ("A day: morning to sunset", 0, [("cape", 5), ("lagoon", None), ("rock", 6), ("fan", 5), ("phinisi", None)]),
}

# Sunnier looks for the drone shots (1 Nov, user: "brighter, sunnier", but the full warm grade had turned the jungle yellow).
# Each is added on top of the "light" grade; warmth goes into the highlights only, so foliage stays green.
SUN = {
    "sun1": "curves=master='0/0 0.2/0.25 0.5/0.62 0.8/0.88 1/1',eq=saturation=1.15,",                          # bright: midtones lifted hard
    "sun2": "curves=master='0/0.02 0.25/0.33 0.6/0.72 1/1',vibrance=intensity=.3,colorbalance=bs=.04:rh=.04:bh=-.04,",  # luminous: open shadows, cool water
    "sun3": "curves=master='0/0 0.3/0.36 0.65/0.75 1/1',colorbalance=rm=.04:bm=-.05:rh=.07:gh=.02:bh=-.07,eq=saturation=1.12,",  # warm sun
    "sun4": "curves=master='0/0 0.3/0.37 0.65/0.76 1/1',vibrance=intensity=.45,colorbalance=bs=.03:gm=.01:rh=.03:bh=-.03,",  # tropical: vivid green and turquoise
}

def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], check=True, cwd=SH)

def shot(key, phone=False, cx=.5):
    """phone: 1080x1920 9:16 cut from the source, centred at cx (0 = left edge, 1 = right edge), into <key>-m.mp4."""
    f, start, end, speed, fx, _ = SHOTS[key]
    out = SH / f"{key}{'-m' if phone else ''}.mp4"
    if out.exists(): return key
    pre = HLG_TO_SDR if f in HLG else ""
    inp = ["-ss", start, "-t", end - start, "-i", SRC / f]
    stab = ""
    if "stab" in fx or "level" in fx:
        trf = f"{key}{'-m' if phone else ''}.trf"
        ff(*inp, "-vf", f"{pre}vidstabdetect=shakiness=8:accuracy=15:result={trf}", "-f", "null", "-")
        stab = (f"vidstabtransform=input={trf}:smoothing=30:maxangle=0:optzoom=0:zoom=2," if "level" in fx else
                f"vidstabtransform=input={trf}:smoothing=45:zoom=2,")
    col, _ = grade(f, start, end, pre, fx)
    if "punch" in fx: col = col.replace("eq=saturation=1.15", "eq=contrast=1.15:brightness=-0.05:saturation=1.3")
    if "soft" in fx: col = col.replace("eq=saturation=1.15", "eq=saturation=1.0").replace("vibrance=intensity=.15", "vibrance=intensity=.05")
    if "light" in fx:   # levels only, a touch of saturation, no warm shift (user: the jungle looked fine ungraded)
        col = re.sub(r"colorbalance=[^,]*,", "", col).replace("eq=saturation=1.25", "eq=saturation=1.05").replace("vibrance=intensity=.15,", "")
    if "raw" in fx: col = ""
    for g, extra in SUN.items():
        if g in fx.split(): col += extra
    dn = "hqdn3d=1.5:1.5:3:3," if "dn" in fx else ""
    geo = (f"crop=ih*9/16:ih:(iw-ih*9/16)*{cx}:0,scale=1080:1920:flags=lanczos" if phone else
           "scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080")
    vf = f"{pre}{stab}setpts=(PTS-STARTPTS)/{speed},fps={F},{dn}{col}{geo},setsar=1,format=yuv420p"
    ff(*inp, "-vf", vf, "-an", "-c:v", "libx264", "-preset", "medium", "-crf", 14, out)
    (SH / f"{key}{'-m' if phone else ''}.trf").unlink(missing_ok=True)
    return key

def dur(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                                capture_output=True, text=True).stdout)

def montage(name):
    title, xf, parts = MONTAGES[name]
    args, chains, durs = [], [], []
    for i, (k, secs) in enumerate(parts):
        d = min(secs or 99, dur(SH / f"{k}.mp4"))
        frames = int(d * F)
        durs.append(frames / F)
        args += ["-i", SH / f"{k}.mp4"]
        chains.append(f"[{i}:v]trim=end_frame={frames},setpts=PTS-STARTPTS,settb=AVTB[s{i}]")
    if xf:
        last, off = "s0", 0.0
        for i in range(1, len(parts)):
            off += durs[i - 1] - xf
            chains.append(f"[{last}][s{i}]xfade=transition=fade:duration={xf}:offset={off:.3f}[x{i}]"); last = f"x{i}"
    else:
        chains.append("".join(f"[s{i}]" for i in range(len(parts))) + f"concat=n={len(parts)}:v=1:a=0[x]"); last = "x"
    out = OUT / f"{name}.mp4"
    ff(*args, "-filter_complex", ";".join(chains), "-map", f"[{last}]", "-r", F, "-an", "-c:v", "libx264", "-preset", "slow",
       "-crf", 20, "-maxrate", "6M", "-bufsize", "12M", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out)
    ff("-i", out, "-frames:v", 1, "-vf", "scale=960:-2", "-c:v", "libwebp", "-quality", 75, out.with_suffix(".webp"))
    total = sum(durs) - xf * (len(parts) - 1)
    print(f"{name}  {total:.1f} s  {out.stat().st_size / 2**20:.1f} MiB  {title}", flush=True)
    return dict(id=name, title=title, secs=round(total, 1), shots=[[k, SHOTS[k][5]] for k, _ in parts])

if __name__ == "__main__":
    names = sys.argv[1:] or list(MONTAGES)
    need = sorted({k for n in names for k, _ in MONTAGES[n][2]})
    with ThreadPoolExecutor(3) as ex:
        for k in ex.map(shot, need): print("shot", k, flush=True)
    with ThreadPoolExecutor(3) as ex: done = list(ex.map(montage, names))
    j = OUT / "montages.json"
    meta = {m["id"]: m for m in json.loads(j.read_text())} if j.exists() else {}
    meta.update({m["id"]: m for m in done})
    j.write_text(json.dumps([meta[k] for k in sorted(meta)], indent=1))
