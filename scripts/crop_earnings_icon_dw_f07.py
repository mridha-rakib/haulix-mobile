import os
from PIL import Image

f07_dir = os.path.join("docs", "qa", "driver", "dw-f07")

def crop_box(img_path, box, out_name):
    if not os.path.exists(img_path):
        print(f"File not found: {img_path}")
        return
    img = Image.open(img_path)
    cropped = img.crop(box)
    out_path = os.path.join(f07_dir, out_name)
    cropped.save(out_path)
    print(f"Saved {out_name}: {cropped.size}")

# Full bottom nav crop from DW64
dw64_path = os.path.join(f07_dir, "regression-earnings-icon-dw64-en.png")
crop_box(dw64_path, (0, 1460, 720, 1580), "device_bottom_nav_dw64_crop.png")

# Earnings icon inactive crop from DW64
crop_box(dw64_path, (310, 1465, 410, 1570), "device_earnings_icon_dw64_crop.png")

# Full bottom nav crop from DW65
dw65_path = os.path.join(f07_dir, "regression-earnings-icon-dw65-en.png")
crop_box(dw65_path, (0, 1460, 720, 1580), "device_bottom_nav_dw65_crop.png")

print("DW-F07 crop generation complete!")
