# Regenerates every sound + GIF in this site (all original, no licences). Run from the project root: python tools/make_assets.py
import math,struct,wave
from PIL import Image,ImageDraw
SR=22050
def save(n,s):
    w=wave.open(f"sounds/{n}.wav","wb");w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR)
    w.writeframes(b"".join(struct.pack("<h",int(max(-1,min(1,x))*20000)) for x in s));w.close()
def note(f,d,v=.5,f2=None):
    n=int(SR*d);o=[];ph=0
    for i in range(n):
        t=i/n;ph+=2*math.pi*(f+((f2 or f)-f)*t)/SR
        o.append(v*min(1,i/200)*math.exp(-4*t)*(math.sin(ph)+.3*math.sin(2*ph)))
    return o
def mix(items,L):
    b=[0.0]*int(SR*L)
    for t,s in items:
        o=int(t*SR)
        for i,x in enumerate(s):
            if o+i<len(b):b[o+i]+=x
    return b
save("pop",note(500,.12,.7,900))
save("chime",mix([(0,note(1319,.5)),(.12,note(1760,.7))],1))
save("sparkle",mix([(i*.07,note(f,.4,.4)) for i,f in enumerate([1047,1319,1568,2093])],.8))
save("yay",mix([(i*.1,note(f,.6,.4)) for i,f in enumerate([523,659,784,1047,1319])],1.4))
save("nope",note(300,.2,.6,180))
P=[523,587,659,784,880];pat=[0,2,4,2,3,1,2,0,4,3,2,3,1,0,2,1]
save("music",mix([(i*.5,note(P[k],1.2,.25)) for i,k in enumerate(pat)]+[(i*2,note(262,2,.2)) for i in range(4)],8))
def heart(d,cx,cy,s,c):
    d.polygon([(cx+s*16*math.sin(t)**3,cy-s*(13*math.cos(t)-5*math.cos(2*t)-2*math.cos(3*t)-math.cos(4*t))) for t in [i*math.pi/60 for i in range(120)]],fill=c)
BG=(255,240,246);PK=(255,92,150)
def gif(n,fr,ms):fr[0].save(f"img/{n}.gif",save_all=True,append_images=fr[1:],duration=ms,loop=0)
F=[]
for i in range(24):
    im=Image.new("RGB",(240,240),BG);d=ImageDraw.Draw(im);s=5+1.4*math.sin(i/24*2*math.pi)**2
    heart(d,120,125,s,PK);heart(d,100,95,s*.25,(255,170,200));F.append(im)
gif("heartbeat",F,60);F=[]
for i in range(20):
    im=Image.new("RGB",(240,240),BG);d=ImageDraw.Draw(im);b=abs(math.sin(i/20*math.pi));y=185-70*b;q=1+.12*(1-b);w=70*q;h=60/q
    d.ellipse((120-40*(1-b/2),198,120+40*(1-b/2),212),fill=(255,214,230))
    d.ellipse((120-w,y-h,120+w,y+h),fill=(255,182,210),outline=(255,120,170),width=4)
    for x in(95,145):d.ellipse((x-6,y-16,x+6,y-4),fill=(107,42,69))
    for x in(78,162):d.ellipse((x-12,y+2,x+12,y+16),fill=(255,130,160))
    d.arc((105,y-2,135,y+20),20,160,fill=(107,42,69),width=3);heart(d,120,y-h-18,1.3,PK);F.append(im)
gif("buddy",F,50)
