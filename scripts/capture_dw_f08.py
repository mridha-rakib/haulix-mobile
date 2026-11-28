import os
import subprocess
import time
from PIL import Image

SCREENS = [
    # DW23: Earnings overview (Primary Driver)
    {"file": "dw23-device-earnings-overview-en.png", "route": "(tabs)/earnings", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&walletRole=driver"},
    {"file": "dw23-device-earnings-overview-es.png", "route": "(tabs)/earnings", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&walletRole=driver"},

    # DW24: Worker earnings detail (Primary Driver)
    {"file": "dw24-device-earnings-detail-en.png", "route": "earnings-detail", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw24-device-earnings-detail-es.png", "route": "earnings-detail", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW25: Cash Out methods (Primary Driver)
    {"file": "dw25-device-cash-out-methods-en.png", "route": "cash-out-methods", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw25-device-cash-out-methods-es.png", "route": "cash-out-methods", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW26: Cash Out status (Primary Driver)
    {"file": "dw26-device-cash-out-status-en.png", "route": "cash-out-status", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw26-device-cash-out-status-es.png", "route": "cash-out-status", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW35: Payout history (Primary Driver)
    {"file": "dw35-device-payout-history-en.png", "route": "payout-history", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw35-device-payout-history-es.png", "route": "payout-history", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW40: Payout account (Primary Driver)
    {"file": "dw40-device-payout-account-en.png", "route": "payout-account", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw40-device-payout-account-es.png", "route": "payout-account", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW54: Payout failed (Primary Driver)
    {"file": "dw54-device-payout-failed-en.png", "route": "payout-failed", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw54-device-payout-failed-es.png", "route": "payout-failed", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW67: Standard bank Cash Out (Primary Driver)
    {"file": "dw67-device-standard-bank-cashout-en.png", "route": "standard-bank-cashout", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw67-device-standard-bank-cashout-es.png", "route": "standard-bank-cashout", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW68: Instant fee & payout review (Primary Driver)
    {"file": "dw68-device-instant-payout-review-en.png", "route": "instant-payout-review", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw68-device-instant-payout-review-es.png", "route": "instant-payout-review", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # OV-02: Update payout method overlay (Modal)
    {"file": "ov02-device-payout-method-overlay-en.png", "route": "payout-account", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov02"},
    {"file": "ov02-device-payout-method-overlay-es.png", "route": "payout-account", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov02"},

    # Residual DW-F07 Checks:
    {"file": "regression-dw22-dispute-en.png", "route": "job-completed", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&reviewStatus=dispute"},
    {"file": "regression-dw23-helper-wallet-en.png", "route": "(tabs)/earnings", "lang": "en", "role": "HELPER", "extra": "&walletRole=helper"},
]

OUT_DIR = os.path.join("docs", "qa", "driver", "dw-f08")
os.makedirs(OUT_DIR, exist_ok=True)

print("Starting automated physical device screenshot capture for DW-F08 on Realme Note 60...")
subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

for i, s in enumerate(SCREENS, 1):
    subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    url = f"exp://127.0.0.1:8082/--/{s['route']}?lang={s['lang']}&role={s['role']}&clean=1{s['extra']}"
    print(f"[{i:02d}/{len(SCREENS)}] Navigating to {s['file']} via {url}...")

    # Send intent to Expo Go
    cmd_start = ["adb", "shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", f"'{url}'"]
    subprocess.run(cmd_start, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Allow React Native and Expo Router to render
    time.sleep(2.8)

    # Capture screen
    out_path = os.path.join(OUT_DIR, s["file"])
    subprocess.run(["adb", "shell", "screencap", "-p", "/sdcard/temp_screen.png"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["adb", "pull", "/sdcard/temp_screen.png", out_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    size = os.path.getsize(out_path) if os.path.exists(out_path) else 0
    print(f"       -> Saved {s['file']} ({size} bytes)")

# Navigation crop of bottom 5-tab bar on DW23
dw23_img_path = os.path.join(OUT_DIR, "dw23-device-earnings-overview-en.png")
if os.path.exists(dw23_img_path):
    img = Image.open(dw23_img_path)
    w, h = img.size
    # Crop bottom 160 pixels (the tab bar)
    tab_bar_crop = img.crop((0, h - 160, w, h))
    crop_path = os.path.join(OUT_DIR, "regression-earnings-tab-active-en.png")
    tab_bar_crop.save(crop_path)
    print(f"       -> Saved navigation crop regression-earnings-tab-active-en.png ({os.path.getsize(crop_path)} bytes)")

print(f"\nAll {len(SCREENS)} physical device screenshots + crops captured successfully in {OUT_DIR}!")
