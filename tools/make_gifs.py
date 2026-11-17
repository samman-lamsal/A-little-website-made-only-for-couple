# Generates the site's animated GIFs (all original artwork, drawn in code).
# Run from the project root:  python3 tools/make_gifs.py
# Outputs: img/hero-heart.gif, img/hug-bears.gif, img/cute-cat.gif, img/love-bear.gif
# Drawn at 2x and downscaled for smooth edges; all frames share one palette
# so colours stay stable through the loop.
import math, random
from PIL import Image, ImageDraw

SS = 2                 # supersample factor
SIZE = 280             # final GIF size (square)
W = SIZE * SS
random.seed(7)

BG = (255, 240, 246)
SOFT = (255, 224, 236)
DOT = (255, 209, 227)
INK = (107, 42, 69)          # deep plum-brown for eyes/outlines
BROWN = (138, 90, 68)        # soft outline brown
PINK = (255, 92, 150)
PINK_DK = (224, 69, 123)
BLUSH = (255, 130, 160, 95)

def heart_pts(cx, cy, s):
    return [(cx + s * 16 * math.sin(t) ** 3,
             cy - s * (13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)))
            for t in [i * math.pi / 60 for i in range(120)]]

def draw_heart(d, cx, cy, s, fill, outline=None, ow=3):
    if outline:
        d.polygon(heart_pts(cx, cy, s * 1.07), fill=outline)
    d.polygon(heart_pts(cx, cy, s), fill=fill)

def sparkle_pts(cx, cy, r, squash=0.42):
    return [(cx, cy - r), (cx + r * squash, cy - r * squash), (cx + r, cy),
            (cx + r * squash, cy + r * squash), (cx, cy + r),
            (cx - r * squash, cy + r * squash), (cx - r, cy),
            (cx - r * squash, cy - r * squash)]

def base_frame(dots=True):
    im = Image.new("RGB", (W, W), BG)
    d = ImageDraw.Draw(im)
    d.ellipse([W * 0.08, W * 0.08, W * 0.92, W * 0.92], fill=SOFT)
    if dots:
        for i in range(26):
            x = random.Random(100 + i).random() * W
            y = random.Random(200 + i).random() * W
            r = 3 * SS + random.Random(300 + i).random() * 4 * SS
            d.ellipse([x - r, y - r, x + r, y + r], fill=DOT)
    return im, d

def overlay(im):
    ov = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    return ov, ImageDraw.Draw(ov)

def finish(frames, name, ms):
    small = [f.resize((SIZE, SIZE), Image.LANCZOS).convert("RGB") for f in frames]
    pal = small[0].quantize(colors=256, method=Image.Quantize.MEDIANCUT)
    quant = [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in small]
    quant[0].save(f"img/{name}.gif", save_all=True, append_images=quant[1:],
                  duration=ms, loop=0, optimize=True)
    print(name, len(frames), "frames ->", f"img/{name}.gif")

# ---------------------------------------------------------------- hero heart
def hero_heart():
    frames = []
    floaters = [(0.18, 0.0, 0.5), (0.82, 0.33, 0.42), (0.68, 0.66, 0.55), (0.30, 0.5, 0.38)]
    sparks = [(0.20, 0.30, 0.0), (0.80, 0.24, 0.4), (0.86, 0.68, 0.7), (0.14, 0.72, 0.25)]
    for i in range(24):
        t = i / 24
        im, d = base_frame()
        # heartbeat: two thumps per loop
        ph = (t * 2) % 1.0
        thump = max(0.0, math.sin(ph * math.pi)) ** 3
        s = 5.6 * SS * (1 + 0.11 * thump)
        cx, cy = W * 0.5, W * 0.52
        # soft shadow
        d.ellipse([cx - s * 13, cy + s * 11, cx + s * 13, cy + s * 13.5], fill=(255, 205, 222))
        draw_heart(d, cx, cy, s, PINK, outline=PINK_DK)
        # glossy highlight
        ov, od = overlay(im)
        od.ellipse([cx - s * 8.5, cy - s * 9.5, cx - s * 2.5, cy - s * 4.5], fill=(255, 255, 255, 150))
        od.ellipse([cx - s * 6.5, cy - s * 2.5, cx - s * 4.0, cy - s * 0.5], fill=(255, 255, 255, 110))
        im = Image.alpha_composite(im.convert("RGBA"), ov).convert("RGB")
        d = ImageDraw.Draw(im)
        # floating mini hearts (wrap seamlessly)
        for fx, off, fs in floaters:
            yy = ((t + off) % 1.0)
            y = W * 0.92 - yy * W * 0.8
            a = 1.0 if 0.08 < yy < 0.92 else max(0.0, min(yy / 0.08, (1 - yy) / 0.08))
            if a <= 0:
                continue
            ov2, od2 = overlay(im)
            pts = heart_pts(fx * W, y, 1.05 * SS * fs)
            od2.polygon(pts, fill=(255, 143, 184, int(235 * a)))
            im = Image.alpha_composite(im.convert("RGBA"), ov2).convert("RGB")
            d = ImageDraw.Draw(im)
        # twinkling sparkles
        ov3, od3 = overlay(im)
        for sx, sy, sph in sparks:
            a = 0.5 + 0.5 * math.sin((t + sph) * math.pi * 4)
            r = (5 + 7 * a) * SS
            od3.polygon(sparkle_pts(sx * W, sy * W, r), fill=(255, 201, 61, int(120 + 120 * a)))
        im = Image.alpha_composite(im.convert("RGBA"), ov3).convert("RGB")
        frames.append(im)
    finish(frames, "hero-heart", 70)

# ---------------------------------------------------------------- bears
def draw_bear(im, cx, cy, s, body, light, muzzle_c, arm="down", blink=False,
              head_dx=0.0, squash=1.0, flip=False):
    """Chibi bear, centred at (cx, cy). s = head-radius-ish scale unit."""
    d = ImageDraw.Draw(im)
    hx, hy = cx + head_dx, cy - 0.30 * s
    # ears
    for ex in (-1, 1):
        exx = hx + ex * 0.44 * s * (1 if not flip else -1)
        d.ellipse([exx - 0.17 * s, hy - 0.52 * s, exx + 0.17 * s, hy - 0.18 * s],
                  fill=body, outline=BROWN, width=3 * SS)
        d.ellipse([exx - 0.085 * s, hy - 0.44 * s, exx + 0.085 * s, hy - 0.27 * s], fill=light)
    # body
    by = cy + 0.34 * s
    d.ellipse([cx - 0.44 * s, by - 0.42 * s * squash, cx + 0.44 * s, by + 0.42 * s * squash],
              fill=body, outline=BROWN, width=3 * SS)
    d.ellipse([cx - 0.26 * s, by - 0.22 * s, cx + 0.26 * s, by + 0.30 * s], fill=light)
    # feet
    for fx in (-1, 1):
        fxx = cx + fx * 0.24 * s
        d.ellipse([fxx - 0.15 * s, by + 0.30 * s, fxx + 0.15 * s, by + 0.50 * s],
                  fill=body, outline=BROWN, width=3 * SS)
        d.ellipse([fxx - 0.06 * s, by + 0.35 * s, fxx + 0.06 * s, by + 0.45 * s], fill=light)
    # head
    d.ellipse([hx - 0.52 * s, hy - 0.48 * s, hx + 0.52 * s, hy + 0.48 * s],
              fill=body, outline=BROWN, width=3 * SS)
    # muzzle
    d.ellipse([hx - 0.27 * s, hy + 0.02 * s, hx + 0.27 * s, hy + 0.36 * s], fill=muzzle_c)
    # nose + mouth
    d.ellipse([hx - 0.085 * s, hy + 0.06 * s, hx + 0.085 * s, hy + 0.17 * s], fill=INK)
    d.arc([hx - 0.16 * s, hy + 0.10 * s, hx + 0.16 * s, hy + 0.32 * s], 20, 160, fill=INK, width=3 * SS)
    # eyes
    for ex in (-1, 1):
        exx = hx + ex * 0.22 * s
        if blink:
            d.arc([exx - 0.07 * s, hy - 0.24 * s, exx + 0.07 * s, hy - 0.08 * s], 200, 340, fill=INK, width=3 * SS)
        else:
            d.ellipse([exx - 0.06 * s, hy - 0.24 * s, exx + 0.06 * s, hy - 0.12 * s], fill=INK)
            d.ellipse([exx - 0.015 * s, hy - 0.225 * s, exx + 0.03 * s, hy - 0.18 * s], fill=(255, 255, 255))
    # blush
    ov, od = overlay(im)
    for bx in (-1, 1):
        bxx = hx + bx * 0.35 * s
        od.ellipse([bxx - 0.09 * s, hy + 0.02 * s, bxx + 0.09 * s, hy + 0.13 * s], fill=BLUSH)
    im2 = Image.alpha_composite(im.convert("RGBA"), ov)
    d = ImageDraw.Draw(im2)
    # arms (drawn last so they sit on top)
    if arm == "down":
        for ax in (-1, 1):
            axx = cx + ax * 0.44 * s
            d.ellipse([axx - 0.13 * s, by - 0.28 * s, axx + 0.13 * s, by + 0.10 * s],
                      fill=body, outline=BROWN, width=3 * SS)
    elif arm == "hug":
        # paws reach toward the middle (toward +x when flip=False)
        direction = -1 if flip else 1
        px = cx + direction * 0.52 * s
        d.ellipse([px - 0.14 * s, by - 0.16 * s, px + 0.14 * s, by + 0.12 * s],
                  fill=body, outline=BROWN, width=3 * SS)
        ox = cx - direction * 0.44 * s
        d.ellipse([ox - 0.13 * s, by - 0.28 * s, ox + 0.13 * s, by + 0.10 * s],
                  fill=body, outline=BROWN, width=3 * SS)
    elif arm == "hold":
        for ax in (-1, 1):
            axx = cx + ax * 0.30 * s
            d.ellipse([axx - 0.13 * s, by - 0.10 * s, axx + 0.13 * s, by + 0.18 * s],
                      fill=body, outline=BROWN, width=3 * SS)
    return im2.convert("RGB")

def hug_bears():
    frames = []
    s = 0.30 * W
    cy = W * 0.56
    # approach frames (0..9): gap closes 0.30W -> 0.135W
    approach = []
    for i in range(10):
        k = i / 9
        ease = 1 - (1 - k) ** 2
        gap = W * (0.30 - 0.165 * ease)
        approach.append(gap)
    # hug hold frames (10..17): gentle squash + rising hearts
    seq = [(g, "down", False) for g in approach]
    seq += [(approach[-1], "hug", True)] * 8
    seq += [(g, "down", False) for g in reversed(approach[1:-1])]
    total = len(seq)
    for idx, (gap, arm, hugging) in enumerate(seq):
        im, d = base_frame()
        t = idx / total
        bob = math.sin(t * math.pi * 4) * 0.008 * W
        squash = 1.0 + (0.03 * math.sin(t * math.pi * 4) if hugging else 0)
        # ground shadow
        d.ellipse([W * 0.5 - gap - 0.42 * s, cy + 0.62 * s, W * 0.5 + gap + 0.42 * s, cy + 0.72 * s],
                  fill=(255, 205, 222))
        left_cx = W * 0.5 - gap
        right_cx = W * 0.5 + gap
        im = draw_bear(im, left_cx, cy + bob, s, (198, 139, 89), (232, 195, 158), (247, 230, 208),
                       arm=arm, head_dx=(0.05 * s if hugging else 0), squash=squash)
        im = draw_bear(im, right_cx, cy - bob, s, (235, 201, 160), (251, 240, 224), (253, 246, 236),
                       arm=arm, flip=True, head_dx=(-0.05 * s if hugging else 0), squash=squash)
        # hearts rise while hugging
        if hugging:
            d = ImageDraw.Draw(im)
            for j, (hx, hy0, hs) in enumerate([(0.44, 0.34, 0.9), (0.56, 0.26, 0.7), (0.50, 0.18, 0.55)]):
                yy = hy0 - ((idx % 8) / 8) * 0.10
                draw_heart(d, hx * W, yy * W, 0.85 * SS * hs, PINK)
        frames.append(im)
    finish(frames, "hug-bears", 80)

# ---------------------------------------------------------------- cat
def cute_cat():
    frames = []
    s = 0.34 * W
    cx, cy = W * 0.5, W * 0.54
    for i in range(24):
        t = i / 24
        im, d = base_frame()
        blink = i in (8, 9, 20, 21)
        ear_twitch = 1.0 if i in (12, 13) else 0.0
        # head
        d.ellipse([cx - 0.62 * s, cy - 0.52 * s, cx + 0.62 * s, cy + 0.58 * s],
                  fill=(255, 253, 248), outline=BROWN, width=3 * SS)
        # ears (behind head edge: draw first in real layering, but head already
        # drawn — draw ears now, they sit above the head outline naturally)
        for ex in (-1, 1):
            tip_x = cx + ex * 0.52 * s + (ex * ear_twitch * 0.05 * s)
            tip_y = cy - 0.92 * s - ear_twitch * 0.04 * s
            base_l = (cx + ex * 0.28 * s, cy - 0.44 * s)
            base_r = (cx + ex * 0.68 * s, cy - 0.38 * s)
            d.polygon([base_l, base_r, (tip_x, tip_y)], fill=(255, 253, 248), outline=BROWN)
            inner_l = (cx + ex * 0.36 * s, cy - 0.50 * s)
            inner_r = (cx + ex * 0.58 * s, cy - 0.46 * s)
            d.polygon([inner_l, inner_r, (tip_x * 0.92 + cx * 0.08, tip_y + 0.14 * s)], fill=(255, 170, 200))
        # re-draw head top curve to tuck ear bases
        d.ellipse([cx - 0.62 * s, cy - 0.52 * s, cx + 0.62 * s, cy + 0.58 * s], outline=BROWN, width=3 * SS)
        # bow on right ear
        bx, by = cx + 0.52 * s, cy - 0.52 * s
        d.polygon([(bx, by), (bx + 0.20 * s, by - 0.12 * s), (bx + 0.20 * s, by + 0.12 * s)], fill=PINK, outline=PINK_DK)
        d.polygon([(bx, by), (bx - 0.20 * s, by - 0.12 * s), (bx - 0.20 * s, by + 0.12 * s)], fill=PINK, outline=PINK_DK)
        d.ellipse([bx - 0.06 * s, by - 0.06 * s, bx + 0.06 * s, by + 0.06 * s], fill=PINK_DK)
        # eyes
        for ex in (-1, 1):
            exx = cx + ex * 0.26 * s
            if blink:
                d.arc([exx - 0.09 * s, cy - 0.18 * s, exx + 0.09 * s, cy + 0.02 * s], 200, 340, fill=INK, width=4 * SS)
            else:
                d.ellipse([exx - 0.075 * s, cy - 0.20 * s, exx + 0.075 * s, cy - 0.02 * s], fill=INK)
                d.ellipse([exx - 0.02 * s, cy - 0.185 * s, exx + 0.035 * s, cy - 0.13 * s], fill=(255, 255, 255))
        # nose + mouth
        d.polygon([(cx - 0.06 * s, cy + 0.08 * s), (cx + 0.06 * s, cy + 0.08 * s), (cx, cy + 0.16 * s)], fill=(255, 130, 160))
        d.arc([cx - 0.15 * s, cy + 0.10 * s, cx, cy + 0.28 * s], 15, 165, fill=INK, width=3 * SS)
        d.arc([cx, cy + 0.10 * s, cx + 0.15 * s, cy + 0.28 * s], 15, 165, fill=INK, width=3 * SS)
        # whiskers
        for wx in (-1, 1):
            for k, dy in enumerate((-0.06, 0.04, 0.14)):
                x0 = cx + wx * 0.42 * s
                d.line([(x0, cy + dy * s), (x0 + wx * 0.30 * s, cy + (dy + (k - 1) * 0.07) * s)],
                       fill=(190, 160, 170), width=2 * SS)
        # blush
        ov, od = overlay(im)
        for bx2 in (-1, 1):
            od.ellipse([cx + bx2 * 0.44 * s - 0.10 * s, cy + 0.06 * s,
                        cx + bx2 * 0.44 * s + 0.10 * s, cy + 0.18 * s], fill=BLUSH)
        im = Image.alpha_composite(im.convert("RGBA"), ov).convert("RGB")
        d = ImageDraw.Draw(im)
        # pulsing heart above
        pulse = 1 + 0.13 * max(0.0, math.sin(t * math.pi * 4)) ** 2
        draw_heart(d, cx, cy - 1.02 * s, 1.05 * SS * pulse, PINK, outline=PINK_DK)
        frames.append(im)
    finish(frames, "cute-cat", 75)

# ---------------------------------------------------------------- bear + heart
def love_bear():
    frames = []
    s = 0.30 * W
    cx, cy = W * 0.5, W * 0.56
    sparks = [(0.20, 0.26, 0.0), (0.82, 0.30, 0.45), (0.86, 0.66, 0.7), (0.15, 0.68, 0.25)]
    for i in range(24):
        t = i / 24
        im, d = base_frame()
        bob = math.sin(t * math.pi * 2) * 0.012 * W
        blink = i in (6, 7, 18, 19)
        d.ellipse([cx - 0.46 * s, cy + 0.62 * s, cx + 0.46 * s, cy + 0.72 * s], fill=(255, 205, 222))
        im = draw_bear(im, cx, cy + bob, s, (212, 160, 110), (240, 210, 175), (250, 236, 214),
                       arm="hold", blink=blink, head_dx=0.02 * s * math.sin(t * math.pi * 2))
        d = ImageDraw.Draw(im)
        # beating heart held in front
        ph = (t * 2) % 1.0
        thump = max(0.0, math.sin(ph * math.pi)) ** 3
        hs = 1.55 * SS * (1 + 0.10 * thump)
        draw_heart(d, cx, cy + 0.30 * s + bob, hs, PINK, outline=PINK_DK)
        ov, od = overlay(im)
        od.ellipse([cx - hs * 8.5, cy + 0.30 * s + bob - hs * 9.5, cx - hs * 2.5, cy + 0.30 * s + bob - hs * 4.5],
                   fill=(255, 255, 255, 140))
        # twinkles
        for sx, sy, sph in sparks:
            a = 0.5 + 0.5 * math.sin((t + sph) * math.pi * 4)
            r = (4 + 6 * a) * SS
            od.polygon(sparkle_pts(sx * W, sy * W, r), fill=(255, 201, 61, int(110 + 120 * a)))
        im = Image.alpha_composite(im.convert("RGBA"), ov).convert("RGB")
        frames.append(im)
    finish(frames, "love-bear", 70)

if __name__ == "__main__":
    hero_heart()
    hug_bears()
    cute_cat()
    love_bear()
    print("done")
