# Reads the GPS position from a DJI clip's telemetry stream (djmd). The protobuf there holds latitude and longitude as
# little-endian doubles in radians, a few bytes apart; we scan the first 40 packets for a pair inside Indonesia's box
# and report the most frequent one. Files without a djmd stream (older DJI, Osmo, Canon) print "no gps".
# Run: python -I _build/gps.py [FILE ...]   (names relative to client-input-2026-10-29/)
import sys, struct, subprocess, math
from collections import Counter
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import SRC

def gps(path):
    b = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-map", "0:d:0", "-frames:d", "40", "-c", "copy",
                        "-f", "data", "-"], capture_output=True).stdout
    pairs = Counter()
    for i in range(len(b) - 8):
        lat = struct.unpack_from("<d", b, i)[0]
        if not (-0.21 < lat < 0.12) or abs(lat) < 1e-4: continue
        for j in range(i + 8, min(i + 24, len(b) - 8)):
            lon = struct.unpack_from("<d", b, j)[0]
            if 1.64 < lon < 2.48: pairs[(round(math.degrees(lat), 4), round(math.degrees(lon), 4))] += 1
    return pairs.most_common(1)[0][0] if pairs else None

if __name__ == "__main__":
    files = sys.argv[1:] or sorted(p.name for p in SRC.iterdir() if p.suffix.upper() in (".MP4", ".MOV"))
    for f in files:
        print(f"{f[:44]:44s}", gps(SRC / f) or "no gps")
