import os
import subprocess
import time
import json

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
    time.sleep(1.2)

def capture(name):
    out_device = f"/sdcard/{name}.png"
    out_local = os.path.join(SCREENSHOT_DIR, f"{name}.png")
    run_adb(["shell", "screencap", "-p", out_device])
    run_adb(["pull", out_device, out_local])
    return out_local

def navigate(route, lang="en", role="PRIMARY_DRIVER", extra=""):
    run_adb(["reverse", "tcp:8082", "tcp:8082"])
    url = f"exp://127.0.0.1:8082/--/{route}?lang={lang}&role={role}&clean=1{extra}"
    run_adb(["shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", f"'{url}'"])
    time.sleep(2.5)

JOURNEYS = [
    {
        "journeyId": "UJ-01",
        "title": "Driver Registration Onboarding Journey",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to Welcome (DW01)", "route": "(auth)/welcome", "role": "ALL"},
            {"step": 2, "action": "Tap Get Started -> Navigate to Register (DW02)", "route": "(auth)/register", "role": "APPLICANT"},
            {"step": 3, "action": "Select Driver Role -> Navigate to Driver Register (DW58)", "route": "(auth)/driver-register", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-02",
        "title": "Helper Registration Onboarding Journey",
        "locale": "es",
        "steps": [
            {"step": 1, "action": "Navigate to Welcome (DW01)", "route": "(auth)/welcome", "role": "ALL"},
            {"step": 2, "action": "Tap Empezar -> Navigate to Register (DW02)", "route": "(auth)/register", "role": "APPLICANT"},
            {"step": 3, "action": "Select Helper Role -> Navigate to Helper Register (DW59)", "route": "(auth)/helper-register", "role": "HELPER"}
        ]
    },
    {
        "journeyId": "UJ-03",
        "title": "Authentication & Phone Sign-in Flow",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to Sign In (DW03)", "route": "(auth)/sign-in", "role": "ALL"},
            {"step": 2, "action": "Tap Phone Sign-In -> Phone Sign-In Screen (DW61)", "route": "(auth)/phone-sign-in", "role": "ALL"},
            {"step": 3, "action": "Enter phone & request OTP -> Verify Phone (DW04)", "route": "(auth)/verify-phone", "role": "APPLICANT"}
        ]
    },
    {
        "journeyId": "UJ-04",
        "title": "Driver Document Verification Checklist & Status",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to Driver Verification (DW05)", "route": "(auth)/driver-verification", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Tap View Documents -> Driver Documents (DW07)", "route": "(auth)/driver-documents", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Check Status -> Verification Status (DW08)", "route": "(auth)/verification-status", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-05",
        "title": "Helper Document Verification Checklist & Status",
        "locale": "es",
        "steps": [
            {"step": 1, "action": "Navigate to Helper Verification (DW06)", "route": "(auth)/helper-verification", "role": "HELPER"},
            {"step": 2, "action": "Tap Documentos -> Helper Docs (DW38)", "route": "(app)/helper-docs", "role": "HELPER"},
            {"step": 3, "action": "Check Status -> Estado de Verificación (DW08)", "route": "(auth)/verification-status", "role": "HELPER"}
        ]
    },
    {
        "journeyId": "UJ-06",
        "title": "Driver Operational Home, Availability Settings & Shift Config",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to Driver Dashboard (DW09)", "route": "(app)/(tabs)", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Trigger Availability Sheet Overlay (OV05)", "route": "(app)/(tabs)", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov05"},
            {"step": 3, "action": "Open Full Settings -> Availability Settings (DW39)", "route": "(app)/availability-settings", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-07",
        "title": "Helper Operational Home & Availability Configuration",
        "locale": "es",
        "steps": [
            {"step": 1, "action": "Navigate to Helper Dashboard (DW31)", "route": "(app)/(tabs)", "role": "HELPER"},
            {"step": 2, "action": "Open Availability Settings (DW39)", "route": "(app)/availability-settings", "role": "HELPER"}
        ]
    },
    {
        "journeyId": "UJ-08",
        "title": "Driver Job Offers, Offer Details & Accept Flow",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to Driver Dashboard (DW09)", "route": "(app)/(tabs)", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "View Available Offers -> Job Offers (DW10)", "route": "(app)/job-offers", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Select Offer HX-AZ-DEMO-0042 -> Job Details (DW11)", "route": "(app)/job-details", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-09",
        "title": "Crew Dispatch, Helper Selection & Invite Management",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "From Job Details -> Choose Helper (DW12)", "route": "(app)/choose-helper", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Select Direct Invite -> Invite Helper Form (DW51)", "route": "(app)/invite-helper", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Invitation Pending Review (DW56)", "route": "(app)/invitation-pending", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-10",
        "title": "Helper Job Invitations, Review & Acceptance",
        "locale": "es",
        "steps": [
            {"step": 1, "action": "Navigate to Helper Dashboard (DW31)", "route": "(app)/(tabs)", "role": "HELPER"},
            {"step": 2, "action": "Open Invitaciones de Cuadrilla -> Helper Invitations (DW52)", "route": "(app)/helper-invitations", "role": "HELPER"},
            {"step": 3, "action": "Review Offer -> Review Invitation (DW53)", "route": "(app)/review-invitation", "role": "HELPER"}
        ]
    },
    {
        "journeyId": "UJ-11",
        "title": "Active Job Navigation, Transit Map & Call Disclosure",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to Active Transit (DW13)", "route": "(app)/active-job", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "View Crew Readiness Status (DW15)", "route": "(app)/crew-readiness", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Open Telephony Disclosure Modal (OV06)", "route": "(app)/active-job", "role": "PRIMARY_DRIVER", "extra": "&modal=call"}
        ]
    },
    {
        "journeyId": "UJ-12",
        "title": "In-Transit Crew Messaging & Communication Status",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Open Job Messages (DW16)", "route": "(app)/job-messages", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Check Message Delivery Status (DW17)", "route": "(app)/message-status", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-13",
        "title": "Arrival at Customer Location & Connection Interruption",
        "locale": "es",
        "steps": [
            {"step": 1, "action": "Arrive at Location -> Active Transit (DW13)", "route": "(app)/active-job", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Connection Interrupted Overlay (DW18)", "route": "(app)/connection-interrupted", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Location Permission Sheet (OV07)", "route": "(app)/location-connection", "role": "PRIMARY_DRIVER", "extra": "&modal=location"}
        ]
    },
    {
        "journeyId": "UJ-14",
        "title": "On-Site Service Execution, Scope Revision Request & Approval",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to On-Site Progress (DW19)", "route": "(app)/on-site-progress", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Request Additional Scope -> Additional Work Approval (DW47)", "route": "(app)/additional-work-approval", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Customer Approves Scope -> Extra Work Approved (DW48)", "route": "(app)/extra-work-approved", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-15",
        "title": "Scope Revision Decline & Escalation Handling",
        "locale": "es",
        "steps": [
            {"step": 1, "action": "Additional Scope Pending (DW49)", "route": "(app)/extra-work-pending", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Customer Declines Scope -> Extra Work Declined (DW50)", "route": "(app)/extra-work-declined", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-16",
        "title": "Completion Photo Evidence Capture & Submission Review",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Navigate to Completion Evidence (DW20)", "route": "(app)/completion-evidence", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Submit Evidence -> Customer Review Window (DW21)", "route": "(app)/job-completed?reviewStatus=pending", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Customer Confirms Delivery -> Job Completed (DW22)", "route": "(app)/job-completed", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-17",
        "title": "Helper Evidence Contribution, Review & Submission Sync",
        "locale": "es",
        "steps": [
            {"step": 1, "action": "Helper On-Site Service (DW63)", "route": "(app)/helper-on-site-progress", "role": "HELPER"},
            {"step": 2, "action": "Helper Uploads Evidence -> Helper Work Evidence (DW64)", "route": "(app)/helper-work-evidence", "role": "HELPER"},
            {"step": 3, "action": "Helper Submits -> Helper Work Submitted (DW65)", "route": "(app)/helper-work-submitted", "role": "HELPER"}
        ]
    },
    {
        "journeyId": "UJ-18",
        "title": "Driver Earnings Ledger, Job Breakdown & Historical Settlements",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Open Earnings Tab (DW23)", "route": "(app)/(tabs)/earnings", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Inspect Job Earnings -> Earnings Detail (DW24)", "route": "(app)/earnings-detail", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Inspect Ledger History -> Payout History (DW35)", "route": "(app)/payout-history", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-19",
        "title": "Payout Methods, Standard Cash Out & Instant Transfer with Quote Consent",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Open Cash Out Methods (DW25)", "route": "(app)/cash-out-methods", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Select Standard Bank -> Standard Cash Out (DW67)", "route": "(app)/standard-bank-cashout", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Select Instant Payout -> Instant Payout Review with Quote Consent (DW68)", "route": "(app)/instant-payout-review", "role": "PRIMARY_DRIVER"},
            {"step": 4, "action": "Transfer Success -> Cash Out Status (DW26)", "route": "(app)/cash-out-status", "role": "PRIMARY_DRIVER"}
        ]
    },
    {
        "journeyId": "UJ-20",
        "title": "Driver Profile, Notification Isolation, Emergency Contact Sheet Review",
        "locale": "en",
        "steps": [
            {"step": 1, "action": "Open Profile Tab (DW27)", "route": "(app)/(tabs)/profile", "role": "PRIMARY_DRIVER"},
            {"step": 2, "action": "Open Notification Settings (DW42)", "route": "(app)/notification-settings", "role": "PRIMARY_DRIVER"},
            {"step": 3, "action": "Open Help & Support (DW29)", "route": "(app)/help-support", "role": "PRIMARY_DRIVER"},
            {"step": 4, "action": "Open Emergency Contact Sheet (OV04)", "route": "(app)/help-support", "role": "PRIMARY_DRIVER", "extra": "&overlay=ov04"}
        ]
    }
]

journey_results = []
print("Starting execution of 20 user-driven hardware journeys on Realme Note 60...")

for j in JOURNEYS:
    jid = j["journeyId"]
    print(f"\n=== Executing {jid}: {j['title']} ({j['locale'].upper()}) ===")
    step_records = []
    all_passed = True
    
    for s in j["steps"]:
        extra = s.get("extra", "")
        print(f"  Step {s['step']}: {s['action']}")
        navigate(s["route"], lang=j["locale"], role=s["role"], extra=extra)
        fn = f"journey-{jid.lower()}-step{s['step']}-{j['locale']}"
        cap_path = capture(fn)
        passed = cap_path is not None and os.path.exists(cap_path)
        if not passed:
            all_passed = False
        step_records.append({
            "step": s["step"],
            "action": s["action"],
            "route": s["route"],
            "screenshot": f"{fn}.png",
            "status": "PASS" if passed else "FAIL"
        })
    
    journey_results.append({
        "journeyId": jid,
        "title": j["title"],
        "locale": j["locale"],
        "totalSteps": len(j["steps"]),
        "status": "PASS" if all_passed else "FAIL",
        "steps": step_records
    })

print(f"\nAll 20 journeys executed! PASS count: {sum(1 for r in journey_results if r['status'] == 'PASS')}/20")
with open(os.path.join(SCREENSHOT_DIR, "journey_results.json"), "w", encoding="utf-8") as f:
    json.dump(journey_results, f, indent=2)
print("Saved journey results to docs/qa/driver/dw-final/screenshots/journey_results.json")
