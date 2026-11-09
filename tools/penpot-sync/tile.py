# Tile screen-by-screen captures (from snap.cjs) into one sheet per page and size.
# Usage: python tile.py <shotsDir> <outDir> [WxH:cols ...]   e.g. python tile.py shots sheets 1440x790:3 390x664:5
import glob, os, sys
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
specs = sys.argv[3:] or ["1440x790:3", "390x664:5"]
os.makedirs(out, exist_ok=True)
for spec in specs:
    size, cols = spec.split(":"); cols = int(cols)
    pages = sorted(set(os.path.basename(f)[len(size) + 1:].rsplit("_", 1)[0] for f in glob.glob(f"{src}/{size}_*.png")))
    for p in pages:
        ims = [Image.open(f) for f in sorted(glob.glob(f"{src}/{size}_{p}_*.png"))]
        w, h = ims[0].size; g = 10
        rows = (len(ims) + cols - 1) // cols
        c = Image.new("RGB", (cols * w + (cols - 1) * g, rows * h + (rows - 1) * g), "#d33")
        for i, im in enumerate(ims):
            c.paste(im, ((i % cols) * (w + g), (i // cols) * (h + g)))
        c.save(f"{out}/{size}_{p}.png"); print(size, p, len(ims))
