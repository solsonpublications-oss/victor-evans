#!/usr/bin/env python3
"""
Extract distinctive accent colors from the cover — the gold title,
the window glow, the brick house, the storm clouds — not just the
dominant dark mass.
"""
from PIL import Image
import colorsys

img = Image.open("/home/z/my-project/public/cover.jpg").convert("RGB")
w, h = img.size

# Sample specific regions of interest
regions = {
    "Gold title text (top center)": (w // 2 - 150, 40, w // 2 + 150, 120),
    "Window glow (left house, upper)": (80, 400, 220, 540),
    "Brick house wall": (60, 600, 300, 900),
    "Storm clouds (right sky)": (600, 100, 950, 400),
    "Capitol silhouette (distant)": (550, 500, 800, 650),
    "Stone steps / chain": (200, 1100, 850, 1450),
    "Sunset glow (horizon)": (400, 600, 700, 800),
    "Old man's figure in clouds": (650, 200, 950, 500),
}

print("Region-specific color analysis:\n")
for name, box in regions.items():
    region = img.crop(box)
    rp = list(region.resize((80, 80), Image.LANCZOS).getdata())
    # Find the most saturated, brightest colors (the "accent" colors)
    # Convert to HSL and sort by saturation * lightness
    scored = []
    for r, g, b in rp:
        hr, hg, hb = r / 255, g / 255, b / 255
        h, l, s = colorsys.rgb_to_hls(hr, hg, hb)
        # Score = high saturation + moderate-to-high lightness (vivid accents)
        if s > 0.15 and l > 0.2:
            scored.append((s * l, r, g, b, h, s, l))
    scored.sort(reverse=True)
    if scored:
        # Average of top 10
        top = scored[:10]
        avg_r = sum(x[1] for x in top) / len(top)
        avg_g = sum(x[2] for x in top) / len(top)
        avg_b = sum(x[3] for x in top) / len(top)
        print(f"  {name}:")
        print(f"    Accent avg: #{int(avg_r):02X}{int(avg_g):02X}{int(avg_b):02X}  RGB({int(avg_r)},{int(avg_g)},{int(avg_b)})")
        # Also overall average
        all_r = sum(p[0] for p in rp) / len(rp)
        all_g = sum(p[1] for p in rp) / len(rp)
        all_b = sum(p[2] for p in rp) / len(rp)
        print(f"    Overall avg: #{int(all_r):02X}{int(all_g):02X}{int(all_b):02X}  RGB({int(all_r)},{int(all_g)},{int(all_b)})")
    else:
        all_r = sum(p[0] for p in rp) / len(rp)
        all_g = sum(p[1] for p in rp) / len(rp)
        all_b = sum(p[2] for p in rp) / len(rp)
        print(f"  {name}: (no vivid accents)")
        print(f"    Overall avg: #{int(all_r):02X}{int(all_g):02X}{int(all_b):02X}  RGB({int(all_r)},{int(all_g)},{int(all_b)})")
    print()
