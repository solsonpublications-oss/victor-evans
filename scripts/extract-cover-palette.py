#!/usr/bin/env python3
"""
Extract dominant colors from the book cover image.
Outputs hex values + frequency so we can build an authentic palette
around the real artwork, not a guess.
"""
from PIL import Image
from collections import Counter

img_path = "/home/z/my-project/public/cover.jpg"
img = Image.open(img_path).convert("RGB")
print(f"Image size: {img.size}")

# Downsample for speed
small = img.resize((150, 225), Image.LANCZOS)
pixels = list(small.getdata())

# Quantize to reduce noise (bucket each channel into ~16 levels)
def quantize(v, levels=16):
    step = 256 // levels
    return min(v // step * step + step // 2, 255)

quantized = [(quantize(r), quantize(g), quantize(b)) for r, g, b in pixels]
counter = Counter(quantized)

print("\nTop 20 dominant colors (hex, count, %):")
total = sum(counter.values())
for color, count in counter.most_common(20):
    r, g, b = color
    hex_val = f"#{r:02X}{g:02X}{b:02X}"
    pct = count / total * 100
    # Classify the color roughly
    mx, mn = max(color), min(color)
    if mx < 50:
        kind = "near-black"
    elif mx > 200 and mn > 180:
        kind = "near-white"
    elif abs(r - g) < 20 and abs(g - b) < 20:
        if mx < 100:
            kind = "dark gray"
        else:
            kind = "gray"
    elif r > g and r > b:
        if g > b:
            kind = "warm/red-brown"
        else:
            kind = "red/brick"
    elif b > r and b > g:
        kind = "blue/cool"
    elif g > r and g > b:
        kind = "green"
    elif r > 180 and g > 120 and b < 100:
        kind = "gold/amber"
    else:
        kind = "other"
    print(f"  {hex_val}  count={count:5d} ({pct:5.1f}%)  {kind}")

# Also get the average brightness of each region
print("\nRegional analysis:")
w, h = img.size
# Top region (sky/title area)
top = img.crop((0, 0, w, h // 4))
# Middle (house)
mid = img.crop((0, h // 4, w, 3 * h // 4))
# Bottom (steps/chain)
bot = img.crop((0, 3 * h // 4, w, h))

for name, region in [("Top (sky/title)", top), ("Middle (house)", mid), ("Bottom (steps/chain)", bot)]:
    rp = list(region.resize((50, 50), Image.LANCZOS).getdata())
    avg_r = sum(p[0] for p in rp) / len(rp)
    avg_g = sum(p[1] for p in rp) / len(rp)
    avg_b = sum(p[2] for p in rp) / len(rp)
    print(f"  {name}: avg RGB = ({avg_r:.0f}, {avg_g:.0f}, {avg_b:.0f}) = #{int(avg_r):02X}{int(avg_g):02X}{int(avg_b):02X}")
