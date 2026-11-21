# HAULIX Customer Mobile App — Phase 03.44

## Android Screenshot QA Matrix & Physical Hardware Verification Report

### 1. Target Hardware Specifications

- **Device Name:** Realme Note 60
- **Model:** `RMX3930`
- **Serial Number (ADB):** `0B04731X200003BB`
- **Operating System:** Android 15 (Realme UI 5.0)
- **Display Resolution:** 720 × 1600 px (nominal ~360 × 800 dp, ~320 dpi)
- **Host Connection:** USB Debugging via persistent ADB daemon (port 5037)
- **Bundler:** Metro Bundler on port 8085 (USB reverse `tcp:8085 tcp:8085`)

---

### 2. ADB Authorization Root Cause & Corrective Action

#### Diagnosis:

Previous repeated `authorizing` / `unauthorized` statuses were caused by the host-side PowerShell process lifecycle. Standard non-daemon commands spawned `adb.exe` as a child process of a transient shell session. When each shell session exited, Windows process cleanup terminated `adb.exe`, dropping the TCP 5037 socket and terminating the USB transport connection. Every subsequent command restarted ADB, tearing down the in-flight authorization handshake and forcing the Android OS to generate a new RSA authorization request.

#### Resolution:

1. Initiated `adb server nodaemon` as a persistent background daemon (`IsDaemon: true`).
2. The persistent daemon maintained TCP socket 5037 continuously.
3. The device immediately validated the host RSA key fingerprint and permanently transitioned to authorized `device` state.
4. Set up reverse port forwarding `adb reverse tcp:8085 tcp:8085`.
5. Device verified with `adb shell getprop ro.product.model` (`RMX3930`), `wm size` (`720x1600`), and `getprop ro.build.version.release` (`15`).

---

### 3. Physical Android Screenshot Verification Matrix (8 Variants)

All eight canonical screens were navigated live on the Realme Note 60 running Android 15, and framebuffers were captured directly to disk via ADB:

| Screen ID      | Screen Name                    | Canonical Route                          | Locale | Viewport      | Verified Image Path                                                                                        | Visual QA Status                                                                             |
| :------------- | :----------------------------- | :--------------------------------------- | :----- | :------------ | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| **C32-A (EN)** | Searching for Driver           | `/searching-for-driver?previewLocale=en` | `en`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32a-en-searching-for-driver.png`](android/c32a-en-searching-for-driver.png) | **PASS** (Vector grid, animated radar, dark theme, zoom/recenter controls verified)          |
| **C32-A (ES)** | Buscando conductor             | `/searching-for-driver?previewLocale=es` | `es`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32a-es-buscando-conductor.png`](android/c32a-es-buscando-conductor.png)     | **PASS** (100% Spanish localization, badge `RADAR ACTIVO · BÚSQUEDA DE DESPACHO` verified)   |
| **C32-B (EN)** | Driver Matched                 | `/driver-matched?previewLocale=en`       | `en`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32b-en-driver-matched.png`](android/c32b-en-driver-matched.png)             | **PASS** (Driver card Marcus Vance, vehicle specs, rectilinear route polyline, truck marker) |
| **C32-B (ES)** | Conductor asignado             | `/driver-matched?previewLocale=es`       | `es`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32b-es-conductor-asignado.png`](android/c32b-es-conductor-asignado.png)     | **PASS** (Spanish badge `CONDUCTOR ASIGNADO · EN CAMINO PRONTO`, vehicle specs localized)    |
| **C32-C (EN)** | Crew Assigned & Tracking       | `/crew-tracking?previewLocale=en`        | `en`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32c-en-crew-tracking.png`](android/c32c-en-crew-tracking.png)               | **PASS** (Live ETA `CREW EN ROUTE · 11 MIN`, active polyline, crew telemetry timeline)       |
| **C32-C (ES)** | Seguimiento de equipo asignado | `/crew-tracking?previewLocale=es`        | `es`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32c-es-seguimiento-equipo.png`](android/c32c-es-seguimiento-equipo.png)     | **PASS** (Spanish badge `EQUIPO EN CAMINO · 11 MIN (Phoenix, AZ)`, timeline localized)       |
| **C32-D (EN)** | Cancellation Windows           | `/cancellation-windows?previewLocale=en` | `en`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32d-en-cancellation-windows.png`](android/c32d-en-cancellation-windows.png) | **PASS** (3-tier policy matrix, fee-free window, honest banking timeline disclosures)        |
| **C32-D (ES)** | Ventanas de cancelación        | `/cancellation-windows?previewLocale=es` | `es`   | 720 × 1600 px | [`docs/qa/phase-03-44/android/c32d-es-ventanas-cancelacion.png`](android/c32d-es-ventanas-cancelacion.png) | **PASS** (Spanish 3-phase matrix, `100% Gratis · $0 Cargo`, honest banking disclaimer)       |

---

### 4. Hardware Verification Conclusion

- **Physical Device Functional Status:** **100% VERIFIED ON REALME NOTE 60 (ANDROID 15)**
- **Regression / Layout Check:** No font truncation, no horizontal overflow, zero visual clipping, safe-area top/bottom correctly respected on native 20:9 aspect ratio (`720x1600`).
