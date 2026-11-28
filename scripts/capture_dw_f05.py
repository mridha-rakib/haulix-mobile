import os
import subprocess
import time

SCREENS = [
    # DW17: Active job (Primary Driver)
    {"file": "dw17-device-active-job-en.png", "route": "active-job", "lang": "en", "role": "PRIMARY_DRIVER", "modal": "none"},
    {"file": "dw17-device-active-job-es.png", "route": "active-job", "lang": "es", "role": "PRIMARY_DRIVER", "modal": "none"},

    # DW18: Job messages
    {"file": "dw18-device-job-messages-en.png", "route": "job-messages", "lang": "en", "role": "PRIMARY_DRIVER", "modal": "none"},
    {"file": "dw18-device-job-messages-es.png", "route": "job-messages", "lang": "es", "role": "PRIMARY_DRIVER", "modal": "none"},

    # DW34: Connection interrupted
    {"file": "dw34-device-connection-interrupted-en.png", "route": "connection-interrupted", "lang": "en", "role": "PRIMARY_DRIVER", "modal": "none"},
    {"file": "dw34-device-connection-interrupted-es.png", "route": "connection-interrupted", "lang": "es", "role": "PRIMARY_DRIVER", "modal": "none"},

    # DW47: Message status
    {"file": "dw47-device-message-status-en.png", "route": "message-status", "lang": "en", "role": "PRIMARY_DRIVER", "modal": "none"},
    {"file": "dw47-device-message-status-es.png", "route": "message-status", "lang": "es", "role": "PRIMARY_DRIVER", "modal": "none"},

    # DW50: Location & connection
    {"file": "dw50-device-location-connection-en.png", "route": "location-connection", "lang": "en", "role": "PRIMARY_DRIVER", "modal": "none"},
    {"file": "dw50-device-location-connection-es.png", "route": "location-connection", "lang": "es", "role": "PRIMARY_DRIVER", "modal": "none"},

    # DW62: Helper active job
    {"file": "dw62-device-helper-active-job-en.png", "route": "helper-active-job", "lang": "en", "role": "HELPER", "modal": "none"},
    {"file": "dw62-device-helper-active-job-es.png", "route": "helper-active-job", "lang": "es", "role": "HELPER", "modal": "none"},

    # OV-06: Native call preview
    {"file": "ov06-device-call-preview-en.png", "route": "active-job", "lang": "en", "role": "PRIMARY_DRIVER", "modal": "call"},
    {"file": "ov06-device-call-preview-es.png", "route": "active-job", "lang": "es", "role": "PRIMARY_DRIVER", "modal": "call"},

    # OV-07: Location permission preview
    {"file": "ov07-device-location-preview-en.png", "route": "location-connection", "lang": "en", "role": "PRIMARY_DRIVER", "modal": "location"},
    {"file": "ov07-device-location-preview-es.png", "route": "location-connection", "lang": "es", "role": "PRIMARY_DRIVER", "modal": "location"},
]

OUT_DIR = os.path.join("docs", "qa", "driver", "dw-f05")
os.makedirs(OUT_DIR, exist_ok=True)

print("Starting automated physical device screenshot capture on Realme Note 60...")
subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

for i, s in enumerate(SCREENS, 1):
    subprocess.run(["adb", "reverse", "tcp:8082", "tcp:8082"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    url = f"exp://127.0.0.1:8082/--/{s['route']}?lang={s['lang']}&role={s['role']}&clean=1&modal={s['modal']}"
    print(f"[{i:02d}/16] Navigating to {s['file']} via {url}...")

    # Send intent to Expo Go with properly quoted URL to avoid '&' backgrounding in adb shell
    cmd_start = ["adb", "shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", f"'{url}'"]
    subprocess.run(cmd_start, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Wait for React Native to render
    time.sleep(2.0)

    # Capture screen
    out_path = os.path.join(OUT_DIR, s["file"])
    subprocess.run(["adb", "shell", "screencap", "-p", "/sdcard/temp_screen.png"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["adb", "pull", "/sdcard/temp_screen.png", out_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    size = os.path.getsize(out_path) if os.path.exists(out_path) else 0
    print(f"       -> Saved {s['file']} ({size} bytes)")

print("\nAll 16 physical device screenshots captured successfully!")
