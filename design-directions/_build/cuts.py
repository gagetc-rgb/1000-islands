# Cuts the review set of single shots (CUTS) from the owner's originals into design-directions/cuts/,
# each twice: "o" as shot (only HLG tone-mapped to SDR) and "g" graded (per-clip levels stretch + saturation),
# 1920x1080, plus a WebP poster per version. cuts/cuts.json feeds cuts/index.html.
# Grade: RGB 0.3/99.7 percentiles of 8 sampled frames are stretched to 4/250, gain capped at 2.0 so noise
# stays down; then saturation and vibrance. "warm" adds a touch of sun to daylight drone shots.
# Run: python -I _build/cuts.py [id ...]
import subprocess, sys, json
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import numpy as np
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import SRC, ROOT

OUT = ROOT / "cuts"
OUT.mkdir(exist_ok=True)
JELLY = "dji_mimo_20261009_105812_20261009105811_1791515923150_video.MP4"
HLG = {"DJI_0832.MP4"}
HLG_TO_SDR = ("zscale=tin=arib-std-b67:min=bt2020nc:pin=bt2020:t=linear:npl=100,format=gbrpf32le,"
              "zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p,")

# id: (source, start s, end s, slow motion?, group, note, fx)  fx: "stab" vidstab, "dn" denoise, "warm"
CUTS = {
    "01": ("DJI_0824.MP4", 6.0, 14.0, False, "Bali, volcano", "Drift over the cloud towers", "warm"),
    "02": ("DJI_0824.MP4", 14.0, 22.0, False, "Bali, volcano", "Clouds open onto the Batur caldera", "warm"),
    "03": ("DJI_0824.MP4", 30.0, 38.0, False, "Bali, volcano", "Approach to the crater", "warm"),
    "04": ("DJI_0824.MP4", 61.5, 69.5, False, "Bali, volcano", "Batur panorama with the round rainbow (glory)", "warm"),
    "05": ("DJI_0829.MP4", 4.0, 11.0, True, "Bali, volcano", "Gold morning light on the ridge, cloud sea below", "warm"),
    "06": ("DJI_0069.MP4", 1.5, 9.5, False, "Volcanic coast", "Wide: reef surf, sandbar, two volcano cones", "warm"),
    "07": ("DJI_0079.MP4", 10.5, 18.5, False, "Volcanic coast", "Low over the red-roof boat on the reef edge", "warm"),
    "08": ("DJI_0079.MP4", 25.0, 33.0, False, "Volcanic coast", "Over the hill: deep blue bay, smoking volcano", "warm"),
    "09": ("DJI_0080.MP4", 8.0, 16.0, False, "Volcanic coast", "Skimming the white beach and the boat", "warm"),
    "10": ("DJI_0080.MP4", 14.0, 21.5, False, "Volcanic coast", "Along the sandbar towards the surf", "warm"),
    "11": ("DJI_0618.MP4", 1.0, 5.0, True, "Palms and atoll", "Between palm trunks to the beach and volcano", "warm"),
    "12": ("DJI_0616.MP4", 0.0, 5.0, False, "Palms and atoll", "Tropical cape, volcano on the horizon", "warm"),
    "13": ("DJI_0616.MP4", 7.0, 15.0, False, "Palms and atoll", "Top-down: fringing reef geometry", "warm"),
    "14": ("DJI_0832.MP4", 0.0, 6.0, False, "Palms and atoll", "Over the jungle ridge", "warm"),
    "15": ("DJI_0832.MP4", 6.5, 12.8, False, "Palms and atoll", "Past the lone palm, lagoon opens", "warm"),
    "16": ("DJI_0531.MOV", 87.5, 96.0, False, "Raja Ampat", "Dronie: karst tower over neon reef", "warm"),
    "17": ("DJI_0531.MOV", 73.0, 81.0, False, "Raja Ampat", "Low into the coral garden between towers", "warm"),
    "18": ("MVI_5333.MOV", 20.0, 29.5, False, "Raja Ampat", "Boat bow between coral heads", "stab dn"),
    "19": ("MVI_5333.MOV", 32.0, 40.0, False, "Raja Ampat", "Out into the strait, mountain ahead", "stab dn"),
    "20": ("2O4A1230.MOV", 10.0, 20.0, False, "Raja Ampat", "Boat up to the mushroom rock", "dn"),
    "21": ("DJI_20241005090030_0068_D.MP4", 0.0, 7.0, False, "Raja Ampat", "Top-down: sun glitter on corals", "warm"),
    "22": ("DJI_20241005090030_0068_D.MP4", 20.0, 28.0, False, "Raja Ampat", "Low over the moored boat to the reef", "warm"),
    "23": ("DJI_0759.MP4", 14.5, 23.0, False, "Whale sharks", "Close: whale shark feeding by the bagan, swimmers", "warm"),
    "24": ("DJI_0759.MP4", 36.0, 46.0, False, "Whale sharks", "Rising: four or five sharks in the blue", "warm"),
    "25": ("2O4A0721.MOV", 2.0, 8.0, False, "Underwater", "Red sea fan, macro", "stab dn"),
    "26": ("2O4A0721.MOV", 14.0, 21.0, False, "Underwater", "Glide along the red sea fan", "stab dn"),
    "27": ("2O4A8813.MOV", 0.0, 9.0, False, "Underwater", "Sunlit bommie, clouds of reef fish", "stab dn"),
    "28": (JELLY, 50.0, 58.5, False, "Underwater", "Two jellyfish side by side, close", "dn"),
    "29": (JELLY, 12.0, 22.0, False, "Underwater", "Jellyfish constellation", "dn"),
    "30": (JELLY, 64.0, 71.0, False, "Underwater", "Single spotted jellyfish under the surface", "dn"),
    # 31–40: own picks from scout.py contact sheets and scores, chosen without the Gemini timecodes
    "31": ("DJI_0824.MP4", 46.0, 53.0, False, "Own pick", "Out of the clouds onto green highlands", "warm"),
    "32": ("DJI_0531.MOV", 23.0, 29.5, False, "Own pick", "Sunlit corridor between karst walls", "warm"),
    "33": ("DJI_0832.MP4", 9.0, 16.5, False, "Own pick", "Past the palm into the full lagoon", "warm"),
    "34": ("MVI_5333.MOV", 0.0, 7.0, False, "Own pick", "Boat bow: glass-clear water, karst islands, clouds", "stab dn"),
    "35": ("2O4A0721.MOV", 19.0, 26.0, False, "Own pick", "Red sea fan against open blue", "stab dn"),
    "36": ("2O4A9405.MOV", 52.0, 62.0, False, "Own pick", "Hawksbill turtle swims up past the camera", "stab dn"),
    "37": ("2O4A9405.MOV", 19.0, 26.0, False, "Own pick", "Coral pinnacle with table corals into the blue", "stab dn"),
    "38": (JELLY, 52.0, 60.5, False, "Own pick", "Jellyfish drifts in until it fills the frame", "dn"),
    "39": ("2O4A1230.MOV", 22.0, 31.0, False, "Own pick", "Under the overhanging orange rock", "dn"),
    "40": ("DJI_20241005090030_0068_D.MP4", 9.5, 14.0, False, "Own pick", "Outrigger canoe on the white beach, people", "warm"),
}

def ff(*args, cwd=OUT):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], check=True, cwd=cwd)

def src_fps(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate",
                        "-of", "csv=p=0", str(SRC / f)], capture_output=True, text=True, check=True).stdout.split()[0]
    a, b = map(float, r.split("/")); return a / b

def grade(f, start, end, pre, fx):
    """Levels + saturation filter string measured on 8 frames of the segment."""
    px = []
    for t in np.linspace(start + .3, end - .3, 8):
        b = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.2f}", "-i", str(SRC / f), "-frames:v", "1",
                            "-vf", f"{pre}scale=320:180,format=rgb24", "-f", "rawvideo", "-"],
                           capture_output=True, check=True).stdout
        px.append(np.frombuffer(b, np.uint8))
    a = np.concatenate(px).astype(float)
    lo, hi = np.percentile(a, .3), np.percentile(a, 99.7)
    gain = min(246 / max(hi - lo, 1), 2.0)
    lo = max(lo - 4 / gain, 0)
    hi = min(lo + 255 / gain, 255)
    sat = 1.25 if "warm" in fx else 1.15
    warm = "colorbalance=rm=.04:bm=-.04:rh=.02:bh=-.03," if "warm" in fx else ""
    return (f"colorlevels=rimin={lo/255:.3f}:gimin={lo/255:.3f}:bimin={lo/255:.3f}:"
            f"rimax={hi/255:.3f}:gimax={hi/255:.3f}:bimax={hi/255:.3f},"
            f"{warm}eq=saturation={sat},vibrance=intensity=.15,"), dict(lo=round(lo), hi=round(hi), gain=round(gain, 2))

def cut(cid):
    f, start, end, slow, group, note, fx = CUTS[cid]
    fps = src_fps(f)
    pre = HLG_TO_SDR if f in HLG else ""
    # real time: keep every frame of 24/25/30 fps, every 2nd of 50/60; slow motion plays 50/60 fps at half speed
    k = 2 if fps > 40 and not slow else 1
    out_fps = round(fps / k, 3)
    inp = ["-ss", start, "-t", end - start, "-i", SRC / f]
    stab = ""
    if "stab" in fx:
        trf = f"{cid}.trf"
        ff(*inp, "-vf", f"{pre}vidstabdetect=shakiness=10:accuracy=15:result={trf}", "-f", "null", "-")
        stab = f"vidstabtransform=input={trf}:smoothing=45:zoom=2,"
    dn = "hqdn3d=1.5:1.5:3:3," if "dn" in fx else ""
    g, stats = grade(f, start, end, pre, fx)
    geo = "scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,setsar=1"
    res = {}
    for v, col in (("o", ""), ("g", g)):
        out = OUT / f"{cid}{v}.mp4"
        vf = f"{pre}{stab}select='not(mod(n\\,{k}))',setpts=N/({out_fps}*TB),{dn}{col}{geo},format=yuv420p"
        ff(*inp, "-vf", vf, "-r", out_fps, "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", 22,
           "-maxrate", "8M", "-bufsize", "16M", "-movflags", "+faststart", out)
        ff("-i", out, "-frames:v", 1, "-vf", "scale=960:-2", "-c:v", "libwebp", "-quality", 72, out.with_suffix(".webp"))
        res[v] = round(out.stat().st_size / 2**20, 1)
    if stab: (OUT / f"{cid}.trf").unlink()
    secs = round((end - start) * (2 if slow else 1), 1)
    print(f"{cid} {f} {start}-{end}  {secs}s  o {res['o']} MiB  g {res['g']} MiB  {stats}", flush=True)
    return dict(id=cid, src=f, start=start, end=end, slow=slow, group=group, note=note, secs=secs)

if __name__ == "__main__":
    ids = sys.argv[1:] or list(CUTS)
    with ThreadPoolExecutor(3) as ex: done = list(ex.map(cut, ids))
    meta = {c["id"]: c for c in json.loads((OUT / "cuts.json").read_text())} if (OUT / "cuts.json").exists() else {}
    meta.update({c["id"]: c for c in done})
    (OUT / "cuts.json").write_text(json.dumps([meta[k] for k in sorted(meta)], indent=1))
