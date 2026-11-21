# HAULIX Customer Mobile App — Phase 03.44

## Android Screenshot QA Matrix & Hardware Blocker Report

### 1. Target Hardware Specifications

- **Device Name:** Realme Note 60
- **Model:** `RMX3930`
- **Serial Number (ADB):** `0B04731X200003BB`
- **Operating System:** Android 15 (Realme UI 5.0)
- **Display Resolution:** 720 × 1600 px (nominal ~360 × 800 dp, ~320 dpi)
- **Host Connection:** USB Debugging via ADB daemon (port 5037)

---

### 2. Hardware Acceptance Status: BLOCKED

During Phase 03.44 execution, ADB status checks yielded:

```bash
$ adb devices
List of devices attached
0B04731X200003BB	unauthorized
```

#### Blocker Diagnosis:

1. The physical Realme Note 60 device is physically connected via USB.
2. The Android OS requires the user to unlock the device screen and tap **"Allow USB debugging"** on the RSA fingerprint prompt.
3. In accordance with Section 7 and Section 20 guidelines:
   > _"If it reports `unauthorized` or `authorizing`, the device owner must approve the normal USB-debugging prompt. Do not attempt to bypass Android authorization. If the device is unavailable, do not claim successful physical QA. Document the blocker and finish other safe, verifiable work. ADB `unauthorized` is a hardware QA blocker, not a successful physical test. Do not convert either blocker into a PASS."_

---

### 3. Screen Test Readiness Matrix (Pending User Authorization)

| Screen ID      | Canonical Route                          | Target Viewport | Localization State | Readiness                                    |
| :------------- | :--------------------------------------- | :-------------- | :----------------- | :------------------------------------------- |
| **C32-A (EN)** | `/searching-for-driver`                  | 360 × 800 dp    | English (`en`)     | Ready for instant capture upon authorization |
| **C32-A (ES)** | `/searching-for-driver?previewLocale=es` | 360 × 800 dp    | Spanish (`es`)     | Ready for instant capture upon authorization |
| **C32-B (EN)** | `/driver-matched`                        | 360 × 800 dp    | English (`en`)     | Ready for instant capture upon authorization |
| **C32-B (ES)** | `/driver-matched?previewLocale=es`       | 360 × 800 dp    | Spanish (`es`)     | Ready for instant capture upon authorization |
| **C32-C (EN)** | `/crew-tracking`                         | 360 × 800 dp    | English (`en`)     | Ready for instant capture upon authorization |
| **C32-C (ES)** | `/crew-tracking?previewLocale=es`        | 360 × 800 dp    | Spanish (`es`)     | Ready for instant capture upon authorization |
| **C32-D (EN)** | `/cancellation-windows`                  | 360 × 800 dp    | English (`en`)     | Ready for instant capture upon authorization |
| **C32-D (ES)** | `/cancellation-windows?previewLocale=es` | 360 × 800 dp    | Spanish (`es`)     | Ready for instant capture upon authorization |

---

### 4. Actions Required to Unblock Physical QA

1. The device owner taps "Always allow from this computer" and selects "Allow" on the Realme Note 60.
2. Run `adb devices` to confirm state changes to `device`.
3. Capture screen framebuffer via `adb exec-out screencap -p` into `docs/qa/phase-03-44/android/`.
