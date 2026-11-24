# HAULIX Customer Mobile App — Android Acceptance Readiness Report

## Build Configuration, EAS Profiles, Physical Device Verification & Release Prerequisites

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Target Hardware:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  
**ADB Serial:** `0B04731X200003BB`  
**Audit Phase:** Phase 03.66 Comprehensive Final Audit  
**Date:** November 24, 2026

---

## 1. Build System & EAS Configuration

### Profile Configuration (`apps/customer/eas.json`)

The customer app build pipeline is configured via EAS Build:

```json
{
  "cli": { "version": ">= 16.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": { "EXPO_PUBLIC_APP_ENV": "development" }
    },
    "preview": {
      "node": "22.23.3",
      "pnpm": "11.25.0",
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "env": { "EXPO_PUBLIC_APP_ENV": "preview" }
    },
    "client-demo": {
      "node": "22.23.3",
      "pnpm": "11.25.0",
      "distribution": "internal",
      "android": { "buildType": "apk" },
      "env": { "EXPO_PUBLIC_APP_ENV": "preview" }
    },
    "production": {
      "autoIncrement": true,
      "env": { "EXPO_PUBLIC_APP_ENV": "production" }
    }
  }
}
```

- **Target Build Type:** Standalone APK (`"buildType": "apk"` in `preview` and `client-demo` profiles).
- **Environment Flags:** `EXPO_PUBLIC_APP_ENV=preview` enables QA navigator floating action button and zero-guard demo routing.
- **Node/pnpm Engines:** Synchronized with monorepo toolchain (Node 22.23.3, pnpm 11.25.0).

---

## 2. Physical Device Audit (Realme Note 60)

### Current Device State

- **Hardware Serial:** `0B04731X200003BB`
- **ADB Status:** Authorized and responsive (`device`).
- **OS Version:** Android 15 (Target SDK 36, Min SDK 24).
- **Installed Package:** `com.haulix.customer` (version `1.0.0`, version code `1`).
- **Last Installation Timestamp:** `2026-11-22 13:40:25`.

### Hardware Acceptance Blocker

> [!CAUTION]
> **Stale APK on Hardware Device:**  
> The physical Realme Note 60 device currently holds an installed APK timestamped `2026-11-22 13:40:25`.  
> While the source code in `apps/customer` contains all 215 canonical routes (including W07 and W08), the physical phone has not been updated with builds produced after Phase 03.54.  
> **Final physical on-device acceptance of W07 and W08 cannot be certified until a fresh APK is built and deployed.**

---

## 3. Standalone APK Delivery Action Plan

1. **Build Generation:**

   ```bash
   eas build --platform android --profile preview --local
   ```
2. **Device Deployment:**

   ```bash
   adb -s 0B04731X200003BB install -r haulix-customer-preview-1.0.0.apk
   ```
3. **Hardware Walkthrough:**
   - Launch `com.haulix.customer`.
   - Open QA Demo Navigator.
   - Verify W07 states (Reschedule, Cancellation, Support hub).
   - Verify W08 states (Proof, Receipts, Rating 1–5, Sent, Failed, Moderation).
   - Inspect layout under 1.30x font scaling on native 360dp screen.
