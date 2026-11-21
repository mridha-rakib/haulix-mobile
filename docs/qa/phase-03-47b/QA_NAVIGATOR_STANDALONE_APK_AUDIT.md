# HAULIX Customer Mobile App — Phase 03.47B
## QA Navigator Standalone APK Audit

**Document ID:** `HAULIX-QA-P03.47B-007`  
**Phase:** 03.47B  
**Component:** `apps/customer/src/components/demo/DemoScreenNavigator.tsx`  
**Target:** Standalone Android APK (`com.haulix.customer`)

---

### 1. Executive Summary

The `DemoScreenNavigator` is an essential development and quality assurance tool that provides immediate, one-tap navigation to any screen across the entire customer application.

In Phase 03.47B, the navigator was enhanced to:
1. Function reliably in standalone APK client demonstration builds without depending on Metro.
2. Provide a **Clean Screenshot Capture Mode** allowing QA engineers to hide the floating pill for pristine visual evidence.
3. Provide an intuitive, invisible restore touch target to bring back the navigator on demand.

---

### 2. Operational Features & Controls

| Feature | Control / testID | Behavior |
|---|---|---|
| **Floating QA Pill** | `demo-screen-navigator-trigger` | Floating pill located at top-right displaying `• QA Screens`. Tap opens the bottom sheet modal. |
| **Category Chips** | `demo-tab-*` | Filter screens by category: All, W01 Auth, W02 Intake, W03 Pricing, W04 Booking, W05 Dispatch. |
| **Screen Selection** | `demo-screen-*` | Tapping any screen navigates instantly via Expo Router and switches the app locale. |
| **Clean Mode Toggle** | `demo-clean-mode-toggle` | Located at the bottom of the sheet: `"Hide QA Pill for Clean Screenshots"`. Hides pill and closes sheet. |
| **Invisible Restore** | `restore-qa-navigator` | $32 \times 32\text{ dp}$ touch target at top-right corner. Tapping unhides the floating pill. |

---

### 3. Verification Signoff

- **Standalone APK Activation:** Verified active via `EXPO_PUBLIC_ENABLE_QA_NAVIGATOR="true"`.
- **Clean Mode Switching:** Verified via ADB touch events. Pill hides cleanly; screens capture without artifacts.
- **Screen Inventory:** All 30+ canonical screens listed with correct Figma node IDs and descriptions.
