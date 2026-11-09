# Final hero videos (1 Nov 2026), the user's picks from montages3/: p01 "Raja Ampat saga" and p11 "Fast, 15 s",
# both with the light drone grade (p01l, p11l: the full warm grade turned the jungle yellow).
# Desktop 1920x1080 and phone 1080x1920 (9:16 cut from the source, not from the desktop file), rates as montage.py,
# bt709 colour tags written (ffmpeg-skill check.py found some montages untagged). Output: assets/video/<name>[-m].mp4/.webp
# Run: python -I _build/hero_final.py
import sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import ASSETS
import hero_v3, hero30
from hero10 import SH, F, ff, dur, shot

VID = ASSETS / "video"
# name: montage in hero_v3; phone crop centre per shot (default .5)
FINAL = {"hero-saga": "p01l", "hero-fast": "p11l", "hero-reef": "p02",
         **{f"hero-r{i}": f"r{i}" for i in range(1, 6)}}   # r1..r5: one reshuffle per design (1 Nov late)
ONLY = sys.argv[1:]   # optional: names to encode
CX = {}
TAGS = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"]
X264 = ["-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]

def encode(name, phone):
    parts = hero30.MONTAGES[FINAL[name]][4]
    args, chains = [], []
    for i, (k, secs) in enumerate(parts):
        src = SH / f"{k}{'-m' if phone else ''}.mp4"
        frames = int(min(secs, dur(src)) * F)
        args += ["-i", src]
        chains.append(f"[{i}:v]trim=end_frame={frames},setpts=PTS-STARTPTS[s{i}]")
    chains.append("".join(f"[s{i}]" for i in range(len(parts))) + f"concat=n={len(parts)}:v=1:a=0[x]")
    out = VID / f"{name}{'-m' if phone else ''}.mp4"
    rate = ["-crf", 23, "-maxrate", "3.5M", "-bufsize", "7M"] if phone else ["-crf", 21, "-maxrate", "6M", "-bufsize", "12M"]
    ff(*args, "-filter_complex", ";".join(chains), "-map", "[x]", "-r", F, *X264, *rate, *TAGS, out)
    # AV1 twin for browsers that decode it (base.js picks it): about 40% lighter at VMAF ~90 against the H.264 file
    # (2 Nov test on hero-r1: 20.5 -> 12.5 MiB); the H.264 file stays as the fallback
    av1 = out.with_name(out.stem + ".av1.mp4")
    ff(*args, "-filter_complex", ";".join(chains), "-map", "[x]", "-r", F, "-an", "-c:v", "libsvtav1", "-preset", 6,
       "-crf", 46 if phone else 44, "-g", 240, "-pix_fmt", "yuv420p", *TAGS, "-movflags", "+faststart", av1)
    ff("-i", out, "-frames:v", 1, "-c:v", "libwebp", "-quality", 74 if phone else 78, out.with_suffix(".webp"))
    print(f"{out.name}  {out.stat().st_size / 2**20:.1f} MiB  av1 {av1.stat().st_size / 2**20:.1f} MiB", flush=True)

if __name__ == "__main__":
    names = ONLY or list(FINAL)
    keys = sorted({k for n in names for k, _ in hero30.MONTAGES[FINAL[n]][4]})
    with ThreadPoolExecutor(3) as ex:
        list(ex.map(lambda k: shot(k, phone=True, cx=CX.get(k, .5)), keys))
    with ThreadPoolExecutor(2) as ex:
        list(ex.map(lambda a: encode(*a), [(n, p) for n in names for p in (False, True)]))
