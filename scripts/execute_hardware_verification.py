import os
import subprocess
import time
import json
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCREENSHOT_DIR = os.path.join(BASE_DIR, "docs", "qa", "driver", "dw-final", "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

DEVICE_ID = "0B04731X200003BB"

def run_adb(args):
    cmd = ["adb", "-s", DEVICE_ID] + args
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return res.stdout.strip()

def tap(x, y):
    run_adb(["shell", "input", "tap", str(x), str(y)])
    time.sleep(1.0)

def keyevent(code):
    run_adb(["shell", "input", "keyevent", str(code)])
    time.sleep(0.8)

def capture_screen(filename):
    out_device = "/sdcard/dw_final_cap.png"
    out_local = os.path.join(SCREENSHOT_DIR, filename)
    run_adb(["shell", "screencap", "-p", out_device])
    run_adb(["pull", out_device, out_local])
    if os.path.exists(out_local):
        size = os.path.getsize(out_local)
        print(f"Captured: {filename} ({size} bytes)")
        return out_local
    else:
        print(f"FAILED to capture: {filename}")
        return None

def navigate(route, lang="en", role="PRIMARY_DRIVER", extra=""):
    # Ensure reverse
    run_adb(["reverse", "tcp:8082", "tcp:8082"])
    url = f"exp://127.0.0.1:8082/--/{route}?lang={lang}&role={role}&clean=1{extra}"
    run_adb(["shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", f"'{url}'"])
    time.sleep(2.5)

print("Hardware device verification starting on Realme Note 60...")
run_adb(["reverse", "tcp:8082", "tcp:8082"])

# List of canonical screen captures to ensure 100% coverage
TARGET_SCREENS = [
    # Auth & Onboarding
    {"id": "DW01", "name": "welcome", "route": "(auth)/welcome", "role": "ALL"},
    {"id": "DW02", "name": "register", "route": "(auth)/register", "role": "APPLICANT"},
    {"id": "DW03", "name": "sign-in", "route": "(auth)/sign-in", "role": "ALL"},
    {"id": "DW04", "name": "verify-phone", "route": "(auth)/verify-phone", "role": "APPLICANT"},
    {"id": "DW05", "name": "driver-verification", "route": "(auth)/driver-verification", "role": "PRIMARY_DRIVER"},
    {"id": "DW06", "name": "helper-verification", "route": "(auth)/helper-verification", "role": "HELPER"},
    {"id": "DW07", "name": "driver-documents", "route": "(auth)/driver-documents", "role": "PRIMARY_DRIVER"},
    {"id": "DW08", "name": "verification-status", "route": "(auth)/verification-status", "role": "PRIMARY_DRIVER"},
    {"id": "DW43", "name": "forgot-password", "route": "(auth)/forgot-password", "role": "ALL"},
    {"id": "DW44", "name": "reset-confirmation", "route": "(auth)/reset-confirmation", "role": "ALL"},
    {"id": "DW58", "name": "driver-register", "route": "(auth)/driver-register", "role": "PRIMARY_DRIVER"},
    {"id": "DW59", "name": "helper-register", "route": "(auth)/helper-register", "role": "HELPER"},
    {"id": "DW60", "name": "helper-verify-phone", "route": "(auth)/helper-verify-phone", "role": "HELPER"},
    {"id": "DW61", "name": "phone-sign-in", "route": "(auth)/phone-sign-in", "role": "ALL"},
    {"id": "DW62", "name": "verification-action", "route": "(auth)/verification-action", "role": "PRIMARY_DRIVER"},
    {"id": "DW66", "name": "code-help", "route": "(auth)/code-help", "role": "ALL"},

    # Operational Home & Availability
    {"id": "DW09", "name": "driver-home", "route": "(app)/(tabs)", "role": "PRIMARY_DRIVER"},
    {"id": "DW31", "name": "helper-home", "route": "(app)/(tabs)", "role": "HELPER"},
    {"id": "DW38", "name": "helper-docs", "route": "(app)/helper-docs", "role": "HELPER"},
    {"id": "DW39", "name": "availability-settings", "route": "(app)/availability-settings", "role": "PRIMARY_DRIVER"},

    # Dispatch & Crew Management
    {"id": "DW10", "name": "job-offers", "route": "(app)/job-offers", "role": "PRIMARY_DRIVER"},
    {"id": "DW11", "name": "job-details", "route": "(app)/job-details", "role": "PRIMARY_DRIVER"},
    {"id": "DW12", "name": "choose-helper", "route": "(app)/choose-helper", "role": "PRIMARY_DRIVER"},
    {"id": "DW14", "name": "offer-unavailable", "route": "(app)/offer-unavailable", "role": "PRIMARY_DRIVER"},
    {"id": "DW51", "name": "invite-helper", "route": "(app)/invite-helper", "role": "PRIMARY_DRIVER"},
    {"id": "DW52", "name": "helper-invitations", "route": "(app)/helper-invitations", "role": "HELPER"},
    {"id": "DW53", "name": "review-invitation", "route": "(app)/review-invitation", "role": "HELPER"},
    {"id": "DW56", "name": "invitation-pending", "route": "(app)/invitation-pending", "role": "PRIMARY_DRIVER"},

    # Active Transit & Communications
    {"id": "DW13", "name": "active-job", "route": "(app)/active-job", "role": "PRIMARY_DRIVER"},
    {"id": "DW15", "name": "crew-readiness", "route": "(app)/crew-readiness", "role": "PRIMARY_DRIVER"},
    {"id": "DW16", "name": "job-messages", "route": "(app)/job-messages", "role": "PRIMARY_DRIVER"},
    {"id": "DW17", "name": "message-status", "route": "(app)/message-status", "role": "PRIMARY_DRIVER"},
    {"id": "DW18", "name": "connection-interrupted", "route": "(app)/connection-interrupted", "role": "PRIMARY_DRIVER"},
    {"id": "DW34", "name": "helper-active-job", "route": "(app)/helper-active-job", "role": "HELPER"},

    # On-Site Service & Scope Revision
    {"id": "DW19", "name": "on-site-progress", "route": "(app)/on-site-progress", "role": "PRIMARY_DRIVER"},
    {"id": "DW47", "name": "additional-work-approval", "route": "(app)/additional-work-approval", "role": "PRIMARY_DRIVER"},
    {"id": "DW48", "name": "extra-work-approved", "route": "(app)/extra-work-approved", "role": "PRIMARY_DRIVER"},
    {"id": "DW49", "name": "extra-work-pending", "route": "(app)/extra-work-pending", "role": "PRIMARY_DRIVER"},
    {"id": "DW50", "name": "extra-work-declined", "route": "(app)/extra-work-declined", "role": "PRIMARY_DRIVER"},
    {"id": "DW63", "name": "helper-on-site-progress", "route": "(app)/helper-on-site-progress", "role": "HELPER"},

    # Completion Evidence & Review
    {"id": "DW20", "name": "completion-evidence", "route": "(app)/completion-evidence", "role": "PRIMARY_DRIVER"},
    {"id": "DW21", "name": "review-window", "route": "(app)/job-completed?reviewStatus=pending", "role": "PRIMARY_DRIVER"},
    {"id": "DW22", "name": "job-completed", "route": "(app)/job-completed", "role": "PRIMARY_DRIVER"},
    {"id": "DW64", "name": "helper-work-evidence", "route": "(app)/helper-work-evidence", "role": "HELPER"},
    {"id": "DW65", "name": "helper-work-submitted", "route": "(app)/helper-work-submitted", "role": "HELPER"},

    # Wallet & Financial
    {"id": "DW23", "name": "earnings", "route": "(app)/(tabs)/earnings", "role": "PRIMARY_DRIVER"},
    {"id": "DW24", "name": "earnings-detail", "route": "(app)/earnings-detail", "role": "PRIMARY_DRIVER"},
    {"id": "DW25", "name": "cash-out-methods", "route": "(app)/cash-out-methods", "role": "PRIMARY_DRIVER"},
    {"id": "DW26", "name": "cash-out-status", "route": "(app)/cash-out-status", "role": "PRIMARY_DRIVER"},
    {"id": "DW35", "name": "payout-history", "route": "(app)/payout-history", "role": "PRIMARY_DRIVER"},
    {"id": "DW40", "name": "payout-account", "route": "(app)/payout-account", "role": "PRIMARY_DRIVER"},
    {"id": "DW54", "name": "payout-failed", "route": "(app)/payout-failed", "role": "PRIMARY_DRIVER"},
    {"id": "DW67", "name": "standard-bank-cashout", "route": "(app)/standard-bank-cashout", "role": "PRIMARY_DRIVER"},
    {"id": "DW68", "name": "instant-payout-review", "route": "(app)/instant-payout-review", "role": "PRIMARY_DRIVER"},

    # Profile & Settings
    {"id": "DW27", "name": "profile", "route": "(app)/(tabs)/profile", "role": "PRIMARY_DRIVER"},
    {"id": "DW28", "name": "my-jobs", "route": "(app)/my-jobs", "role": "PRIMARY_DRIVER"},
    {"id": "DW29", "name": "help-support", "route": "(app)/help-support", "role": "PRIMARY_DRIVER"},
    {"id": "DW30", "name": "notifications", "route": "(app)/notifications", "role": "PRIMARY_DRIVER"},
    {"id": "DW32", "name": "language-security", "route": "(app)/language-security", "role": "PRIMARY_DRIVER"},
    {"id": "DW33", "name": "vehicle-docs", "route": "(app)/vehicle-docs", "role": "PRIMARY_DRIVER"},
    {"id": "DW36", "name": "personal-info", "route": "(app)/personal-info", "role": "PRIMARY_DRIVER"},
    {"id": "DW37", "name": "photo-contact", "route": "(app)/photo-contact", "role": "PRIMARY_DRIVER"},
    {"id": "DW41", "name": "change-password", "route": "(app)/change-password", "role": "PRIMARY_DRIVER"},
    {"id": "DW42", "name": "notification-settings", "route": "(app)/notification-settings", "role": "PRIMARY_DRIVER"},
    {"id": "DW45", "name": "contact-support", "route": "(app)/contact-support", "role": "PRIMARY_DRIVER"},
    {"id": "DW46", "name": "request-received", "route": "(app)/request-received", "role": "PRIMARY_DRIVER"},
    {"id": "DW55", "name": "helper-profile", "route": "(app)/helper-profile", "role": "HELPER"},
    {"id": "DW57", "name": "helper-personal-info", "route": "(app)/helper-personal-info", "role": "HELPER"},
]

OVERLAYS = [
    {"id": "OV01", "name": "profile-photo", "route": "(app)/photo-contact", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov01"},
    {"id": "OV02", "name": "payout-method", "route": "(app)/payout-account", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov02"},
    {"id": "OV03", "name": "security-shield", "route": "(app)/language-security", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov03"},
    {"id": "OV04", "name": "emergency-contact", "route": "(app)/help-support", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov04"},
    {"id": "OV05", "name": "availability-sheet", "route": "(app)/(tabs)", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov05"},
    {"id": "OV06", "name": "call-preview", "route": "(app)/active-job", "role": "PRIMARY_DRIVER", "extra": "&modal=call"},
    {"id": "OV07", "name": "location-permission", "route": "(app)/location-connection", "role": "PRIMARY_DRIVER", "extra": "&modal=location"},
]

results = []

# 1. Capture All Target Screens in English & Spanish
print(f"--- Capturing {len(TARGET_SCREENS)} screens in English and Spanish ---")
for idx, s in enumerate(TARGET_SCREENS, 1):
    for lang in ["en", "es"]:
        fn = f"{s['id'].lower()}-device-{s['name']}-{lang}.png"
        navigate(s["route"], lang=lang, role=s["role"])
        local_path = capture_screen(fn)
        results.append({
            "id": f"{s['id']}-{lang.upper()}",
            "file": fn,
            "status": "PASS" if local_path else "FAIL"
        })

# 2. Capture Overlays in English & Spanish
print(f"--- Capturing {len(OVERLAYS)} overlays in English and Spanish ---")
for idx, ov in enumerate(OVERLAYS, 1):
    for lang in ["en", "es"]:
        fn = f"{ov['id'].lower()}-device-{ov['name']}-{lang}.png"
        navigate(ov["route"], lang=lang, role=ov["role"], extra=ov["extra"])
        local_path = capture_screen(fn)
        results.append({
            "id": f"{ov['id']}-{lang.upper()}",
            "file": fn,
            "status": "PASS" if local_path else "FAIL"
        })

print(f"\nCompleted capture of {len(results)} visual items.")
with open(os.path.join(SCREENSHOT_DIR, "capture_manifest.json"), "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("Saved capture manifest to docs/qa/driver/dw-final/screenshots/capture_manifest.json")
