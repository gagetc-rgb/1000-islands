import sys, glob, os
from PIL import Image, ImageDraw
prefix, cols = sys.argv[1], int(sys.argv[2])
pages = sorted(set(os.path.basename(f).rsplit('_',1)[0] for f in glob.glob(f'tmp/{prefix}_*.png')))
for p in pages:
    files = sorted(glob.glob(f'tmp/{p}_*.png'))
    ims = [Image.open(f) for f in files]
    w, h = ims[0].size; g = 8
    rows = (len(ims)+cols-1)//cols
    c = Image.new('RGB', (cols*w+(cols-1)*g, rows*h+(rows-1)*g), '#c33')
    for i, im in enumerate(ims):
        c.paste(im, ((i%cols)*(w+g), (i//cols)*(h+g)))
    c.save(f'{p}.png'); print(p, c.size)
