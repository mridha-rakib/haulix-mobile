import os
from PIL import Image

f06_dir = os.path.join("docs", "qa", "driver", "dw-f06")

# Coordinates on 720x1600 Realme Note 60 screenshot:
# Bottom navigation bar is at the bottom, approximately y: 1470 to 1570
# The 5 tabs are horizontally spaced:
# Tab 1: Home (0 - 144)
# Tab 2: Jobs (144 - 288)
# Tab 3: Earnings (288 - 432) -> center ~360
# Tab 4: Messages (432 - 576)
# Tab 5: Profile (576 - 720)

def crop_box(img_path, box, out_name):
    if not os.path.exists(img_path):
        print(f"File not found: {img_path}")
        return
    img = Image.open(img_path)
    cropped = img.crop(box)
    out_path = os.path.join(f06_dir, out_name)
    cropped.save(out_path)
    print(f"Saved {out_name}: {cropped.size}")

# Full bottom nav crop (720x120 around y: 1460 to 1580)
dw50_path = os.path.join(f06_dir, "regression-dw50-device-en.png")
crop_box(dw50_path, (0, 1460, 720, 1580), "device_bottom_nav_dw50_crop.png")

# Earnings icon inactive crop (from driver home)
driver_home_path = os.path.join(f06_dir, "regression-driver-home-en.png")
crop_box(driver_home_path, (310, 1465, 410, 1570), "device_earnings_icon_inactive_crop.png")

# Earnings icon active crop (from earnings active)
earnings_active_path = os.path.join(f06_dir, "regression-earnings-active-en.png")
crop_box(earnings_active_path, (310, 1465, 410, 1570), "device_earnings_icon_active_crop.png")

print("Crop generation complete!")
