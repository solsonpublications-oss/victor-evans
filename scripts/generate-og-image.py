#!/usr/bin/env python3
"""
Generate a 1200x630 Open Graph image from the book cover.
Crops and composites the cover with the title text on a dark storm background.
"""
from PIL import Image, ImageDraw, ImageFont

cover = Image.open("/home/z/my-project/public/cover.jpg").convert("RGB")
cw, ch = cover.size
print(f"Cover size: {cw}x{ch}")

# Create 1200x630 canvas with a dark storm background sampled from the cover
# Use the bottom-left dark region of the cover as the background
bg_crop = cover.crop((0, ch // 2, cw // 2, ch)).resize((120, 63), Image.LANCZOS)
bg_avg = Image.new("RGB", (1, 1))
bg_avg.putpixel((0, 0), (
    sum(p[0] for p in bg_crop.getdata()) // len(list(bg_crop.getdata())),
    sum(p[1] for p in bg_crop.getdata()) // len(list(bg_crop.getdata())),
    sum(p[2] for p in bg_crop.getdata()) // len(list(bg_crop.getdata())),
))
avg_color = bg_avg.getpixel((0, 0))
print(f"Background avg color: #{avg_color[0]:02X}{avg_color[1]:02X}{avg_color[2]:02X}")

og = Image.new("RGB", (1200, 630), avg_color)

# Paste a scaled portion of the cover on the right side (the house + window)
# The cover is 2:3 (1024x1536). We want a tall slice on the right.
# Crop a 2:3 aspect slice from the left part of the cover (where the house is)
slice_w = int(630 * 2 / 3)  # 420px wide for 630 tall
slice_h = 630
left_offset = 100  # offset from left to capture the house
cover_slice = cover.crop((left_offset, 200, left_offset + int(slice_w * ch / slice_h), 200 + ch)).resize((slice_w, slice_h), Image.LANCZOS)
# Paste it on the right
og.paste(cover_slice, (1200 - slice_w - 40, 0))

# Add a gradient overlay to blend the left edge of the cover slice
overlay = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)
for x in range(1200 - slice_w - 40, 1200 - slice_w + 40):
    alpha = int(255 * (x - (1200 - slice_w - 40)) / 80)
    alpha = max(0, min(255, 255 - alpha))
    draw.line([(x, 0), (x, 630)], fill=(avg_color[0], avg_color[1], avg_color[2], alpha))

# Draw text on the left
draw_og = ImageDraw.Draw(og)

# Try to load a serif font
try:
    font_title = ImageFont.truetype("/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.otf", 72)
    font_sub = ImageFont.truetype("/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.otf", 28)
    font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 18)
except (IOError, OSError):
    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 72)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 28)
        font_label = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 18)
    except (IOError, OSError):
        font_title = ImageFont.load_default()
        font_sub = font_title
        font_label = font_title

# Top label
draw_og.text((60, 80), "A TRUE ACCOUNT · FIRST EDITION 2025", fill=(212, 176, 94), font=font_label)

# Title — two lines
draw_og.text((60, 140), "The Generational", fill=(237, 228, 209), font=font_title)
draw_og.text((60, 230), "Curse Breaker", fill=(212, 176, 94), font=font_title)

# Subtitle
draw_og.text((60, 360), "A Family's Battle Against Undue Influence,", fill=(168, 152, 120), font=font_sub)
draw_og.text((60, 400), "Systemic Neglect, and the Theft of", fill=(168, 152, 120), font=font_sub)
draw_og.text((60, 440), "Carrie Evans's Legacy", fill=(168, 152, 120), font=font_sub)

# Author
draw_og.text((60, 540), "VICTOR L. EVANS", fill=(212, 176, 94), font=font_label)

og.save("/home/z/my-project/public/og-image.jpg", "JPEG", quality=85, optimize=True)
print("Saved /home/z/my-project/public/og-image.jpg")
print(f"Size: {og.size}")
