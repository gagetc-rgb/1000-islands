# Sequence editor (1 Nov 2026): light proxies of every hero shot for design-directions/editor/.
# For each shot in montages/shots/ (except the excluded ones below): a 960x540 proxy with a keyframe every 6 frames
# (fast scrubbing), a poster and a 10-frame filmstrip for the trim bar. Writes editor/data.json: the shot library and
# the montages3 presets. The editor's export is rendered at full quality by _build/render_seq.py.
# Run: python -I _build/editor_prep.py
import sys, json, re, math, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import ROOT
import hero_v3, hero30
from hero10 import SHOTS, SH, F, dur

OUT = ROOT / "editor"
CL = OUT / "clips"
CL.mkdir(parents=True, exist_ok=True)

# Not offered: phinisi (lives lower on the page), the grey whale shark, DJI_0616 7+ (gimbal tilt), and older cuts
# replaced by a cleaner one (lagoon -> lagoon3, dronie -> dronie3, palms -> palms3, garden -> garden3, boat2/3 -> p).
SKIP = {"phinisi", "phinisifull", "shark", "reeftop", "lagoon", "dronie", "palms", "garden", "boat2", "boat3"}
UNDER = {"fan", "fanmacro", "turtle", "turtle2", "turtlelong", "fish", "tables", "jelly", "jelly2", "jellies"}
RU = {
    "dronie3": "Взлёт над карстовой башней", "approach": "Подлёт к ряду карстовых башен",
    "approach9": "Подлёт к башням и низко над садом, один пролёт", "garden3": "Низко и быстро над коралловым садом",
    "garden2": "Неоновая бирюза между башнями", "corridor": "Коридор между скалами",
    "karstwall": "Вдоль карстовых стен над лагуной", "boatlagoon": "Лодка пересекает лагуну, сверху",
    "lagoon3": "Мимо пальмы в лагуну", "lagoonfull": "Джунгли, разлом и лагуна одним дублем (в конце тормоз, режь на ~14 с)",
    "ridge": "Над джунглями к разлому в скалах", "palms3": "Между стволами пальм, Сулавеси",
    "cape": "Тропический мыс, Сулавеси", "coast": "Вулканическое побережье, Сулавеси",
    "canoe": "Каноэ на белом пляже", "beachboat": "Низко над лодкой у берега к рифу",
    "reefsun": "Блики солнца на кораллах, сверху", "boat": "С носа лодки, горизонт выровнен",
    "boat2p": "Нос лодки между коралловыми головами", "boat3p": "Нос лодки над светлым мелководьем",
    "mushroom": "На лодке к скале-грибу", "reflect": "Скала-гриб в зеркальной воде",
    "rock": "Под оранжевой скалой", "profile": "Вокруг скалы: лицо в утёсе",
    "fan": "Красный веер на синем", "fanmacro": "Оранжевый веер крупно",
    "turtle": "Черепаха проплывает мимо камеры", "turtle2": "Черепаха над рифом, близко",
    "turtlelong": "Черепаха, длинный дубль", "fish": "Коралловая голова с рыбами",
    "tables": "Столовые кораллы на стене рифа", "jelly": "Медуза вплывает в кадр",
    "jelly2": "Золотая медуза у поверхности", "jellies": "Созвездие медуз",
}
GRADES = {"": "w", "_l": "l", "_o": "o"}   # file suffix -> grade code (warm, light, as shot)

def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], check=True)

def prep(key):
    src, out = SH / f"{key}.mp4", CL / f"{key}.mp4"
    if not out.exists():
        ff("-i", src, "-vf", "scale=960:540:flags=lanczos", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", 24,
           "-g", 6, "-keyint_min", 6, "-sc_threshold", 0, "-pix_fmt", "yuv420p", "-movflags", "+faststart", out)
    d = dur(out)
    if not (CL / f"{key}.webp").exists():
        ff("-ss", min(1.0, d / 3), "-i", out, "-frames:v", 1, "-vf", "scale=320:180", "-quality", 72, CL / f"{key}.webp")
    if not (CL / f"{key}-strip.jpg").exists():
        step = math.ceil(d * F / 10)
        ff("-i", out, "-vf", f"select='not(mod(n\\,{step}))',scale=192:108,tile=10x1", "-frames:v", 1, "-q:v", 5,
           CL / f"{key}-strip.jpg")
    return key, round(d, 3)

def split(k):
    """approach_l -> ("approach", "l")"""
    m = re.fullmatch(r"(.+?)(_l|_o)?", k)
    return m[1], GRADES[m[2] or ""]

if __name__ == "__main__":
    keys = [p.stem for p in sorted(SH.glob("*.mp4")) if not p.stem.endswith("-m") and p.stem in SHOTS]
    keys = [k for k in keys if split(k)[0] not in SKIP]
    with ThreadPoolExecutor(4) as ex: durs = dict(ex.map(prep, keys))
    lib = {}
    for k in keys:
        base, g = split(k)
        label = SHOTS[base][5]
        num = re.search(r"\((\d+)", label)
        e = lib.setdefault(base, dict(id=base, ru=RU.get(base, label), en=label, num=num[1] if num else "",
                                      under=base in UNDER, grades={}, dur=durs[k]))
        e["grades"][g] = k
        e["dur"] = min(e["dur"], durs[k])
    presets = []
    for name, (title, tr, xf, _, parts) in hero30.MONTAGES.items():
        seq = []
        for k, secs in parts:
            base, g = split(k)
            if base not in lib: break
            seq.append(dict(id=base, grade=g, a=0, b=round(min(secs or 99, lib[base]["dur"]), 2)))
        else:
            presets.append(dict(id=name, title=title, fade=xf if tr == "fade" else 0, seq=seq))
    order = sorted(lib.values(), key=lambda e: (e["under"], e["ru"]))
    (OUT / "data.json").write_text(json.dumps(dict(shots=order, presets=presets), ensure_ascii=False, indent=1),
                                   encoding="utf-8")
    print(len(order), "shots,", len(presets), "presets")
