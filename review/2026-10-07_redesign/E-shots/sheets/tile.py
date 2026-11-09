import sys
from PIL import Image
out=sys.argv[1]; names=sys.argv[2:]
ims=[Image.open('states/'+n+'.png') for n in names]
W=sum(i.width for i in ims)+10*(len(ims)-1); H=max(i.height for i in ims)
s=Image.new('RGB',(W,H),(220,40,40)); x=0
for i in ims: s.paste(i,(x,0)); x+=i.width+10
s.save('sheets/'+out)
