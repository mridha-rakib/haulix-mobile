# Phase 03.69 Android Standalone Release APK Acceptance Handoff

**Phase:** Phase 03.68 -> Phase 03.69 Transition  
**Application:** `apps/customer` (`com.haulix.customer`)  
**Target Hardware:** Realme Note 60 (RMX3933 / RMX3930), Android 15, 360dp  
**Device Serial:** `0B04731X200003BB`

---

## 1. Prerequisite Verification

Before initiating Phase 03.69:
- [x] Phase 03.68 functional and visual QA complete and accepted.
- [x] Residual defects RES-01 through RES-06 resolved and verified.
- [x] All 132 test suites (928 tests) passing with 0 failures.
- [x] Monorepo TypeScript compilation (7 packages) clean.
- [x] Biome formatting and linting clean.
- [x] Device `0B04731X200003BB` authorized and accessible via ADB.

---

## 2. Phase 03.69 Objectives & Roadmap

Phase 03.69 is dedicated to generating, installing, and executing final physical standalone APK acceptance on the Realme Note 60 device:

1. **Standalone Release APK Packaging:**
   - Execute EAS build or local Android Gradle build (`cd apps/customer/android && ./gradlew assembleRelease`).
   - Output standalone `.apk` binary (e.g., `haulix-customer-release-v1.0.0.apk`).
2. **Device Installation & Sideload:**
   - Sideload APK to Realme Note 60 via `adb -s 0B04731X200003BB install -r <apk_path>`.
   - Verify `dumpsys package com.haulix.customer` records updated build timestamp and standalone signature.
3. **Cold Boot & Standalone Launch Verification:**
   - Launch `com.haulix.customer` without Metro development server connection.
   - Confirm asset bundling, font loading, offline navigation persistence, and splash screen transition.
4. **Physical Device Signoff:**
   - Capture device screenshots across key canonical workflows (W01, W05, W06, W07, W08).
   - Produce final client acceptance signoff documentation.
