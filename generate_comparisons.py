import os
from PIL import Image, ImageDraw, ImageFont

PAIRS = [
    {
        "id": "compare-w05-s20-en",
        "figma": "docs/qa/phase-03-47b/figma/w05-en-s20-844-4670-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s20-en-android.png",
        "title": "W05 S20 (20-Mile Radius) — English [Figma 844:4670 vs Android Realme Note 60]"
    },
    {
        "id": "compare-w05-s20-es",
        "figma": "docs/qa/phase-03-47b/figma/w05-es-s20-844-6820-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s20-es-android.png",
        "title": "W05 S20 (20-Mile Radius) — Spanish [Figma 844:6820 vs Android Realme Note 60]"
    },
    {
        "id": "compare-w05-s30-en",
        "figma": "docs/qa/phase-03-47b/figma/w05-en-s30-844-4769-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s30-en-android.png",
        "title": "W05 S30 (30-Mile Radius) — English [Figma 844:4769 vs Android Realme Note 60]"
    },
    {
        "id": "compare-w05-s30-es",
        "figma": "docs/qa/phase-03-47b/figma/w05-es-s30-844-6919-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s30-es-android.png",
        "title": "W05 S30 (30-Mile Radius) — Spanish [Figma 844:6919 vs Android Realme Note 60]"
    },
    {
        "id": "compare-w05-s40-en",
        "figma": "docs/qa/phase-03-47b/figma/w05-en-s40-844-4868-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s40-en-android.png",
        "title": "W05 S40 (40-Mile Radius) — English [Figma 844:4868 vs Android Realme Note 60]"
    },
    {
        "id": "compare-w05-s40-es",
        "figma": "docs/qa/phase-03-47b/figma/w05-es-s40-844-7018-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s40-es-android.png",
        "title": "W05 S40 (40-Mile Radius) — Spanish [Figma 844:7018 vs Android Realme Note 60]"
    },
    {
        "id": "compare-w05-s50-en",
        "figma": "docs/qa/phase-03-47b/figma/w05-en-s50-844-4967-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s50-en-android.png",
        "title": "W05 S50 (50-Mile Radius) — English [Figma 844:4967 vs Android Realme Note 60]"
    },
    {
        "id": "compare-w05-s50-es",
        "figma": "docs/qa/phase-03-47b/figma/w05-es-s50-844-7117-figma.png",
        "android": "docs/qa/phase-03-47b/android/w05-s50-es-android.png",
        "title": "W05 S50 (50-Mile Radius) — Spanish [Figma 844:7117 vs Android Realme Note 60]"
    }
]

out_dir = "docs/qa/phase-03-47b/comparisons"
os.makedirs(out_dir, exist_ok=True)

target_height = 1400

for item in PAIRS:
    figma_path = item["figma"]
    android_path = item["android"]
    out_path = os.path.join(out_dir, f"{item['id']}.png")
    
    if not os.path.exists(figma_path) or not os.path.exists(android_path):
        print(f"Skipping {item['id']} - missing inputs")
        continue

    img_figma = Image.open(figma_path).convert("RGBA")
    img_android = Image.open(android_path).convert("RGBA")

    # Scale both to target_height preserving aspect ratio
    w_f = int(img_figma.width * (target_height / img_figma.height))
    img_f_scaled = img_figma.resize((w_f, target_height), Image.Resampling.LANCZOS)

    w_a = int(img_android.width * (target_height / img_android.height))
    img_a_scaled = img_android.resize((w_a, target_height), Image.Resampling.LANCZOS)

    header_height = 80
    gutter = 40
    total_width = w_f + w_a + gutter + 40
    total_height = target_height + header_height + 40

    composite = Image.new("RGBA", (total_width, total_height), (17, 24, 22, 255)) # HAULIX dark bg
    draw = ImageDraw.Draw(composite)

    # Titles
    draw.text((20, 16), item["title"], fill=(186, 255, 66, 255)) # Lime
    draw.text((20, 48), "LEFT: Approved Figma Source Frame", fill=(255, 255, 255, 255))
    draw.text((20 + w_f + gutter, 48), "RIGHT: Physical Android Sideloaded APK (Realme Note 60)", fill=(186, 255, 66, 255))

    # Paste images
    composite.paste(img_f_scaled, (20, header_height))
    composite.paste(img_a_scaled, (20 + w_f + gutter, header_height))

    composite.convert("RGB").save(out_path, "PNG")
    print(f"Generated comparison: {out_path} ({total_width}x{total_height})")

print("All comparisons completed.")
