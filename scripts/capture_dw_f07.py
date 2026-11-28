import os
import subprocess
import time

SCREENS = [
    # DW21: Completion evidence (Primary Driver)
    {"file": "dw21-device-completion-evidence-en.png", "route": "completion-evidence", "lang": "en", "role": "PRIMARY_DRIVER", "extra": ""},
    {"file": "dw21-device-completion-evidence-es.png", "route": "completion-evidence", "lang": "es", "role": "PRIMARY_DRIVER", "extra": ""},

    # DW22: Job completed (Primary Driver)
    {"file": "dw22-device-job-completed-en.png", "route": "job-completed", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&reviewStatus=pending"},
    {"file": "dw22-device-job-completed-es.png", "route": "job-completed", "lang": "es", "role": "PRIMARY_DRIVER", "extra": "&reviewStatus=pending"},

    # DW64: Helper work evidence (Helper)
    {"file": "dw64-device-helper-work-evidence-en.png", "route": "helper-work-evidence", "lang": "en", "role": "HELPER", "extra": ""},
    {"file": "dw64-device-helper-work-evidence-es.png", "route": "helper-work-evidence", "lang": "es", "role": "HELPER", "extra": ""},

    # DW65: Helper work submitted (Helper)
    {"file": "dw65-device-helper-work-submitted-en.png", "route": "helper-work-submitted", "lang": "en", "role": "HELPER", "extra": ""},
    {"file": "dw65-device-helper-work-submitted-es.png", "route": "helper-work-submitted", "lang": "es", "role": "HELPER", "extra": ""},

    # Regression Checks for Earnings Icon ($ sign) & Review Status:
    {"file": "regression-earnings-icon-dw64-en.png", "route": "helper-work-evidence", "lang": "en", "role": "HELPER", "extra": ""},
    {"file": "regression-earnings-icon-dw65-en.png", "route": "helper-work-submitted", "lang": "en", "role": "HELPER", "extra": ""},
    {"file": "regression-dw22-dispute-en.png", "route": "job-completed", "lang": "en", "role": "PRIMARY_DRIVER", "extra": "&reviewStatus=dispute"},
]

OUT_DIR = os.path.join("docs", "qa", "driver", "dw-f07")
os.makedirs(OUT_DIR, exist_ok=True)

print("Starting automated physical device screenshot capture for DW-F07 on Realme Note 60...")
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
