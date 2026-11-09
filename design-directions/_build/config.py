# Shared manifest for media.py (encodes assets) and build.py (writes pages).
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent           # design-directions/
SRC = ROOT.parent / "client-input-2026-10-29"           # owner's originals
ASSETS = ROOT / "assets"

# Section clips (single shot, lazy-loaded). name: (source file, start s, crop centre for the phone cut, is_hero)
# Removed after review: diver with camera (DJI_..._0141, owner disliked), turtle section (2O4A9405 at 40 s, worst shake measured;
# only its calm last seconds, stabilised, are used in hero-v4).
CLIPS = {
    "phinisi-sunset": ("DJI_0549.MP4", 0, .50, False),
    "atoll":          ("DJI_0616.MP4", 6, .40, False),
    "lagoon":         ("MVI_5333.MOV", 12, .50, False),
    "jellyfish":      ("dji_mimo_20261009_105812_20261009105811_1791515923150_video.MP4", 10, .50, False),
}
CLIP_SECONDS = 8
NOISY = {"jellyfish", "lagoon"}   # underwater / low light: mild denoise
STABILIZE = {"lagoon"}            # filmed from a boat's bow: two-pass vidstab

# Hero montages (montage.py), one per direction, ~20–25 s loop of 4–5 shots.
# Owner's rules (31 Oct): sunny light only (sunsets excepted), no robotic camera moves.
# Every shot sits inside a clean window of _build/motion.py: no SHAKE and no START (a pan, tilt or stop that begins or
# ends abruptly, the "surveillance camera" look). Steady drift of a forward flight is fine.
# Out on light: DJI_0531, 2O4A1230 (white overcast sky), DJI_0829 (dull grey ridge), DJI_0759 (grey water), DJI_0068 beach.
# Out on movement: DJI_0832 after 12.9 s (hard stop), DJI_0618 after 5 s (hard stop), DJI_0079 8.5–10.5.
# Retiming is frame-exact: every k-th source frame is kept and played at the montage rate `fps`,
# so speed = k * fps / source fps (60 fps source at fps 30: k=1 is 0.5x slow motion, k=2 real time, k=4 2x).
# shot: (source file, start s, end s, k, crop centre for the phone 9:16 cut, effects: "dn" denoise, "stab" vidstab)
UNDERWATER = "dji_mimo_20261009_105812_20261009105811_1791515923150_video.MP4"
MONTAGES = {
    # v1 Expedition: one volcanic sandbar, wide → over the ridge → past the boat → over the rock to open water
    "hero-v1": dict(fps=30, xfade=0, shots=[
        ("DJI_0069.MP4", 2.0, 6.5, 2, .55, ""),
        ("DJI_0080.MP4", 0.5, 6.0, 2, .45, ""),
        ("DJI_0079.MP4", 10.5, 16.0, 2, .42, ""),
        ("DJI_0079.MP4", 22.5, 29.5, 2, .45, ""),
    ]),
    # v2 Field kit: push through the jungle to the lagoon → low over the reef flat → high over the atoll → palm beach
    "hero-v2": dict(fps=30, xfade=0, shots=[
        ("DJI_0832.MP4", 6.5, 12.9, 2, .50, ""),
        ("DJI_0079.MP4", 0.5, 8.0, 2, .45, ""),
        ("DJI_0616.MP4", 0.0, 5.0, 2, .38, ""),
        ("DJI_0618.MP4", 6.0, 9.4, 2, .50, ""),
    ]),
    # v3 Quiet: long slow shots with dissolves, palms in slow motion → atoll reef → slow glide over the sandbar boat
    "hero-v3": dict(fps=25, xfade=.8, shots=[
        ("DJI_0618.MP4", 1.5, 5.0, 1, .50, ""),
        ("DJI_0616.MP4", 6.0, 14.0, 2, .38, ""),
        ("DJI_0080.MP4", 13.0, 20.5, 2, .55, ""),
    ]),
    # v4 Reef: turquoise reef flat from a low drone → the red sea fan → reef fish → jellyfish close-up → jellyfish lake → turtle
    "hero-v4": dict(fps=30, xfade=0, shots=[
        ("DJI_0079.MP4", 2.0, 5.5, 2, .45, ""),   # DJI_0068 top-down reef read greyish-flat
        ("2O4A0721.MOV", 17.5, 23.0, 1, .55, "dn stab"),
        ("2O4A8813.MOV", 0.5, 3.6, 1, .50, "dn stab"),
        (UNDERWATER, 51.0, 56.0, 1, .64, "dn stab"),
        (UNDERWATER, 9.0, 13.0, 1, .50, "dn"),
        ("2O4A9405.MOV", 68.5, 73.5, 1, .50, "dn stab"),   # the turtle swims off into the blue; stabilised jerk 0.54 → 0.29
    ]),
    # v5 Chart: above the clouds at 2x → highlands under cumulus at 2x → atoll from high up → the volcanic coast, wide
    "hero-v5": dict(fps=30, xfade=0, shots=[
        ("DJI_0824.MP4", 7.0, 19.0, 4, .55, ""),
        ("DJI_0824.MP4", 61.0, 72.5, 4, .45, ""),
        ("DJI_0616.MP4", 0.0, 5.0, 2, .38, ""),
        ("DJI_0069.MP4", 2.0, 8.0, 2, .55, ""),
    ]),
}

# photo id -> source file in SRC
PHOTO_SRC = {
    "2O4A3189": "2O4A3189.jpg", "2O4A3267": "2O4A3267-Enhanced-NR.jpg", "DJI_0074": "DJI_0074.jpg",
    "_RBE2063": "_RBE2063.jpg", "0O0A9157": "0O0A9157.jpg", "0O0A9741": "0O0A9741.jpg",
    "2O4A6722": "2O4A6722.jpg", "2O4A1226": "2O4A1226.jpg", "_RBE2062": "_RBE2062.jpg",
    "2O4A2068": "2O4A2068.jpg", "IMG_9812": "IMG_9812.jpg", "IMG_9819": "IMG_9819.jpg",
    "2O4A4824": "2O4A4824.jpg", "_RBE2059": "_RBE2059.jpg", "IMG_5353": "IMG_5353.jpg",
    "2O4A4797": "2O4A4797.jpg", "2O4A1547": "2O4A1547.jpg", "DJI_0442": "Копия DJI_0442.jpg",
    "IMG_5357": "IMG_5357.jpg", "2O4A4792": "2O4A4792.jpg", "0O0A0227": "0O0A0227.jpg",
    "2O4A3377": "2O4A3377.jpg", "_RBE2052": "_RBE2052.jpg",
}
PHOTO_WIDTHS = [480, 800, 1200, 1800]
