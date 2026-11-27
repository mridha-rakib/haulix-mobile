import os
import subprocess
import time

SCREENS = [
    # DW10: Job offers
    {"file": "dw10-device-job-offers-en.png", "route": "job-offers", "lang": "en", "role": "PRIMARY_DRIVER"},
    {"file": "dw10-device-job-offers-es.png", "route": "job-offers", "lang": "es", "role": "PRIMARY_DRIVER"},

    # DW11: Job details
    {"file": "dw11-device-job-details-en.png", "route": "job-details", "lang": "en", "role": "PRIMARY_DRIVER"},
    {"file": "dw11-device-job-details-es.png", "route": "job-details", "lang": "es", "role": "PRIMARY_DRIVER"},

    # DW12: Offer unavailable
    {"file": "dw12-device-offer-unavailable-en.png", "route": "offer-unavailable", "lang": "en", "role": "PRIMARY_DRIVER"},
    {"file": "dw12-device-offer-unavailable-es.png", "route": "offer-unavailable", "lang": "es", "role": "PRIMARY_DRIVER"},

    # DW13: Invite helper
    {"file": "dw13-device-invite-helper-en.png", "route": "invite-helper", "lang": "en", "role": "PRIMARY_DRIVER"},
    {"file": "dw13-device-invite-helper-es.png", "route": "invite-helper", "lang": "es", "role": "PRIMARY_DRIVER"},

    # DW14: Helper invitations
    {"file": "dw14-device-helper-invitations-en.png", "route": "helper-invitations", "lang": "en", "role": "HELPER"},
    {"file": "dw14-device-helper-invitations-es.png", "route": "helper-invitations", "lang": "es", "role": "HELPER"},

    # DW15: Review invitation
    {"file": "dw15-device-review-invitation-en.png", "route": "review-invitation", "lang": "en", "role": "HELPER"},
    {"file": "dw15-device-review-invitation-es.png", "route": "review-invitation", "lang": "es", "role": "HELPER"},

    # DW16: Crew readiness
    {"file": "dw16-device-crew-readiness-en.png", "route": "crew-readiness", "lang": "en", "role": "PRIMARY_DRIVER"},
    {"file": "dw16-device-crew-readiness-es.png", "route": "crew-readiness", "lang": "es", "role": "PRIMARY_DRIVER"},

    # DW48: Choose a Helper
    {"file": "dw48-device-choose-helper-en.png", "route": "choose-helper", "lang": "en", "role": "PRIMARY_DRIVER"},
    {"file": "dw48-device-choose-helper-es.png", "route": "choose-helper", "lang": "es", "role": "PRIMARY_DRIVER"},

    # DW49: Invitation pending
    {"file": "dw49-device-invitation-pending-en.png", "route": "invitation-pending", "lang": "en", "role": "PRIMARY_DRIVER"},
    {"file": "dw49-device-invitation-pending-es.png", "route": "invitation-pending", "lang": "es", "role": "PRIMARY_DRIVER"},
]

OUT_DIR = os.path.join("docs", "qa", "driver", "dw-f04")
os.makedirs(OUT_DIR, exist_ok=True)

print(f"Starting automated device screenshot capture on Realme Note 60...")

for i, s in enumerate(SCREENS, 1):
    url = f"exp://127.0.0.1:8082/--/{s['route']}?lang={s['lang']}&role={s['role']}&clean=1"
    print(f"[{i:02d}/18] Navigating to {s['file']} via {url}...")
    
    # Send intent to Expo Go with properly quoted URL to avoid '&' backgrounding in adb shell
    cmd_start = ["adb", "shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", f"'{url}'"]
    subprocess.run(cmd_start, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Wait for React Native to render
    time.sleep(1.4)
    
    # Capture screen
    out_path = os.path.join(OUT_DIR, s["file"])
    subprocess.run(["adb", "shell", "screencap", "-p", "/sdcard/temp_screen.png"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(["adb", "pull", "/sdcard/temp_screen.png", out_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    size = os.path.getsize(out_path) if os.path.exists(out_path) else 0
    print(f"       -> Saved {s['file']} ({size} bytes)")

print("\nAll 18 screenshots captured successfully!")
