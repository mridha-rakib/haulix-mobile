import os
import subprocess
import time
from PIL import Image

SCREENS = [
    # DW27: Profile & Documents (Primary Driver)
    {"file": "dw27-device-profile-documents-en.png", "route": "(tabs)/profile", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw27-device-profile-documents-es.png", "route": "(tabs)/profile", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW55: Helper Profile (Helper)
    {"file": "dw55-device-helper-profile-en.png", "route": "helper-profile", "lang": "en", "role": "HELPER", "extra": ""},
    {"file": "dw55-device-helper-profile-es.png", "route": "helper-profile", "lang": "es", "role": "HELPER", "extra": ""},

    # DW28: My Jobs (Primary Driver)
    {"file": "dw28-device-my-jobs-en.png", "route": "my-jobs", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw28-device-my-jobs-es.png", "route": "my-jobs", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW29: Help & Support (Primary Driver)
    {"file": "dw29-device-help-support-en.png", "route": "help-support", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw29-device-help-support-es.png", "route": "help-support", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW30: Notifications (Primary Driver)
    {"file": "dw30-device-notifications-en.png", "route": "notifications", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw30-device-notifications-es.png", "route": "notifications", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW32: Language & Security (Primary Driver)
    {"file": "dw32-device-language-security-en.png", "route": "language-security", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw32-device-language-security-es.png", "route": "language-security", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW36: Personal Information (Primary Driver)
    {"file": "dw36-device-personal-info-en.png", "route": "personal-info", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw36-device-personal-info-es.png", "route": "personal-info", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW57: Helper Personal Information (Helper)
    {"file": "dw57-device-helper-personal-info-en.png", "route": "helper-personal-info", "lang": "en", "role": "HELPER", "extra": ""},
    {"file": "dw57-device-helper-personal-info-es.png", "route": "helper-personal-info", "lang": "es", "role": "HELPER", "extra": ""},

    # DW37: Photo & Contact (Primary Driver)
    {"file": "dw37-device-photo-contact-en.png", "route": "photo-contact", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw37-device-photo-contact-es.png", "route": "photo-contact", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW41: Change Password (Primary Driver)
    {"file": "dw41-device-change-password-en.png", "route": "change-password", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw41-device-change-password-es.png", "route": "change-password", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW42: Notification Settings (Primary Driver)
    {"file": "dw42-device-notification-settings-en.png", "route": "notification-settings", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw42-device-notification-settings-es.png", "route": "notification-settings", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW45: Contact Support (Primary Driver)
    {"file": "dw45-device-contact-support-en.png", "route": "contact-support", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw45-device-contact-support-es.png", "route": "contact-support", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW46: Request Received (Primary Driver)
    {"file": "dw46-device-request-received-en.png", "route": "request-received", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw46-device-request-received-es.png", "route": "request-received", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # OV-01: Profile photo update preview (Modal)
    {"file": "ov01-device-photo-overlay-en.png", "route": "photo-contact", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov01"},
    {"file": "ov01-device-photo-overlay-es.png", "route": "photo-contact", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov01"},

    # OV-03: Account protection preview (Modal)
    {"file": "ov03-device-security-overlay-en.png", "route": "language-security", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov03"},
    {"file": "ov03-device-security-overlay-es.png", "route": "language-security", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov03"},

    # OV-04: Emergency contact assistance preview (Modal)
    {"file": "ov04-device-emergency-overlay-en.png", "route": "help-support", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov04"},
    {"file": "ov04-device-emergency-overlay-es.png", "route": "help-support", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov04"},
]

OUT_DIR = os.path.join("docs", "qa", "driver", "dw-f09")
os.makedirs(OUT_DIR, exist_ok=True)

print("Starting automated physical device screenshot capture for DW-F09 on Realme Note 60...")
subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

for i, s in enumerate(SCREENS, 1):
    subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    url = f"exp://127.0.0.1:8082/--/{s['route']}?lang={s['lang']}&role={s['role']}&clean=1{s['extra']}"
    print(f"[{i:02d}/{len(SCREENS)}] Navigating to {s['file']} via {url}...")

    # Send intent to Expo Go
    cmd_start = ["adb", "shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", f"'{url}'"]
    subprocess.run(cmd_start, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Allow React Native and Expo Router to render
    time.sleep(3.0)

    # Capture screen
    out_path = os.path.join(OUT_DIR, s["file"])
    subprocess.run(["adb", "shell", "screencap", "-p", "/sdcard/temp_screen.png"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["adb", "pull", "/sdcard/temp_screen.png", out_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    size = os.path.getsize(out_path) if os.path.exists(out_path) else 0
    print(f"       -> Saved {s['file']} ({size} bytes)")

# Navigation crop of bottom 5-tab bar on DW27 (Profile Active)
dw27_img_path = os.path.join(OUT_DIR, "dw27-device-profile-documents-en.png")
if os.path.exists(dw27_img_path):
    img = Image.open(dw27_img_path)
    w, h = img.size
    # Crop bottom 160 pixels (the tab bar)
    tab_bar_crop = img.crop((0, h - 160, w, h))
    crop_path = os.path.join(OUT_DIR, "dw-f09-profile-tab-active-en.png")
    tab_bar_crop.save(crop_path)
    print(f"       -> Saved navigation crop dw-f09-profile-tab-active-en.png ({os.path.getsize(crop_path)} bytes)")

print(f"\nAll {len(SCREENS)} physical device screenshots + crops captured successfully in {OUT_DIR}!")
