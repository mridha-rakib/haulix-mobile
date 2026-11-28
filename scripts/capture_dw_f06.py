import os
import subprocess
import time

SCREENS = [
    # DW19: On-site job progress (Primary Driver)
    {"file": "dw19-device-on-site-progress-en.png", "route": "on-site-progress", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw19-device-on-site-progress-es.png", "route": "on-site-progress", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW20: Additional work approval (Primary Driver)
    {"file": "dw20-device-additional-work-approval-en.png", "route": "additional-work-approval", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw20-device-additional-work-approval-es.png", "route": "additional-work-approval", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW51: Extra work pending (Primary Driver)
    {"file": "dw51-device-extra-work-pending-en.png", "route": "extra-work-pending", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&extraApproval=pending"},
    {"file": "dw51-device-extra-work-pending-es.png", "route": "extra-work-pending", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&extraApproval=pending"},

    # DW52: Extra work approved (Primary Driver)
    {"file": "dw52-device-extra-work-approved-en.png", "route": "extra-work-approved", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&extraApproval=approved"},
    {"file": "dw52-device-extra-work-approved-es.png", "route": "extra-work-approved", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&extraApproval=approved"},

    # DW53: Extra work declined (Primary Driver)
    {"file": "dw53-device-extra-work-declined-en.png", "route": "extra-work-declined", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&extraApproval=declined"},
    {"file": "dw53-device-extra-work-declined-es.png", "route": "extra-work-declined", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&extraApproval=declined"},

    # DW63: Helper on-site progress (Helper)
    {"file": "dw63-device-helper-on-site-progress-en.png", "route": "helper-on-site-progress", "lang": "en", "role": "HELPER", "extra": ""},
    {"file": "dw63-device-helper-on-site-progress-es.png", "route": "helper-on-site-progress", "lang": "es", "role": "HELPER", "extra": ""},

    # Regression Checks for Earnings Icon ($ sign):
    # DW50 regression (location-connection)
    {"file": "regression-dw50-device-en.png", "route": "location-connection", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&modal=none"},
    {"file": "regression-dw50-device-es.png", "route": "location-connection", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&modal=none"},

    # Earnings Tab Active
    {"file": "regression-earnings-active-en.png", "route": "(tabs)/earnings", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},

    # Driver Home Inactive Earnings Tab
    {"file": "regression-driver-home-en.png", "route": "(tabs)", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},

    # Helper Home Inactive Earnings Tab
    {"file": "regression-helper-home-en.png", "route": "(tabs)", "lang": "en", "role": "HELPER", "extra": ""},
]

OUT_DIR = os.path.join("docs", "qa", "driver", "dw-f06")
os.makedirs(OUT_DIR, exist_ok=True)

print("Starting automated physical device screenshot capture for DW-F06 on Realme Note 60...")
subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

for i, s in enumerate(SCREENS, 1):
    subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    url = f"exp://127.0.0.1:8082/--/{s['route']}?lang={s['lang']}&role={s['role']}&clean=1{s['extra']}"
    print(f"[{i:02d}/{len(SCREENS)}] Navigating to {s['file']} via {url}...")

    # Send intent to Expo Go
    cmd_start = ["adb", "shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", f"'{url}'"]
    subprocess.run(cmd_start, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Allow React Native and Expo Router to render and animate
    time.sleep(2.5)

    # Capture screen
    out_path = os.path.join(OUT_DIR, s["file"])
    subprocess.run(["adb", "shell", "screencap", "-p", "/sdcard/temp_screen.png"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["adb", "pull", "/sdcard/temp_screen.png", out_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    size = os.path.getsize(out_path) if os.path.exists(out_path) else 0
    print(f"       -> Saved {s['file']} ({size} bytes)")

print(f"\nAll {len(SCREENS)} physical device screenshots captured successfully in {OUT_DIR}!")
