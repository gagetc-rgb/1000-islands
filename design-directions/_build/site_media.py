# Video for the full v5 site (5 Nov 2026): the pages beyond the home page need region-true clips.
# - hero-ns: North Sulawesi landing hero, only shots with DJI GPS on Siau / Sangihe (DJI_0616 cape, DJI_0080 sandbar,
#   DJI_0069 coast, DJI_0618 palms) plus the reef-fish shot. Raja Ampat reuses hero-saga (the user's "Raja Ampat saga").
# - reef-fan, reef-turtle, reef-fish: short 16:9 loops for the "Why go" galleries (lazy, small).
# Run: python -I _build/site_media.py
import sys, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))
import hero_v3, hero30, hero_final
from hero10 import SHOTS, SH, shot, ff

SHOTS["sandbar"] = ("DJI_0080.MP4", 0.5, 6.0, 1.0, "warm light", "Volcanic sandbar, Siau / Sangihe")
C = hero30.MONTAGES["p09"][1]
hero30.MONTAGES["ns1"] = ("North Sulawesi, GPS-true", C, 0, 0,
                          [("cape_o", 5), ("sandbar", 5), ("fish", 4), ("coast", 5), ("palms3", 4)])
hero_final.FINAL["hero-ns"] = "ns1"

VID = hero_final.VID
CLIPS = {"reef-fan": "fan", "reef-turtle": "turtle", "reef-fish": "fish"}

def clip(name, key):
    src = SH / f"{key}.mp4"
    out = VID / f"{name}.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-t", "6", "-vf", "scale=1280:-2:flags=lanczos",
                    "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "25", "-maxrate", "2.5M", "-bufsize", "5M",
                    "-pix_fmt", "yuv420p", "-movflags", "+faststart", *hero_final.TAGS, str(out)], check=True)
    # phone file = the same small clip (it plays in a 3:2 tile, not full screen)
    (VID / f"{name}-m.mp4").write_bytes(out.read_bytes())
    for suf in ("", "-m"):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out), "-frames:v", "1", "-c:v", "libwebp", "-quality", "76",
                        str(VID / f"{name}{suf}.webp")], check=True)
    print(name, f"{out.stat().st_size / 2**20:.1f} MiB", flush=True)

if __name__ == "__main__":
    hero_keys = [k for k, _ in hero30.MONTAGES["ns1"][4]]
    with ThreadPoolExecutor(3) as ex:
        list(ex.map(lambda k: shot(k), sorted(set(hero_keys + list(CLIPS.values())))))
        list(ex.map(lambda k: shot(k, phone=True), hero_keys))
    for n, k in CLIPS.items(): clip(n, k)
    for p in (False, True): hero_final.encode("hero-ns", p)
