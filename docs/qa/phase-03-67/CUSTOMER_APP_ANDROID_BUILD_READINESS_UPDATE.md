# HAULIX Customer Mobile App — Phase 03.67
# Customer App Android Build Readiness Update

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `apps/customer`  
**Package:** `com.haulix.customer`  
**Version:** 1.0.0 (Build 1)  
**Target Hardware:** Realme Note 60 (RMX3933), Android 15, 360dp  
**ADB Serial:** `0B04731X200003BB`  
**Date:** November 24, 2026  
**Status:** BUILD & PACKAGING VERIFIED

---

## 1. EAS Build & APK Status

- **Expo Configuration (`apps/customer/app.json`):**
  - Package: `com.haulix.customer`
  - Version: `1.0.0`
  - Adaptive icon, splash screen, and orientation (`portrait`) properly configured.
  - New Architecture (`expo-router`, React Native 0.76+) active.
- **EAS Configuration (`eas.json`):**
  - `preview` build profile configured with `developmentClient: false` and `distribution: "internal"`.
  - Generates standalone unsigned/internal APK suitable for direct ADB sideloading onto physical Android devices.
- **Physical Device Installed State:**
  - Package `com.haulix.customer` is currently installed and active on device `0B04731X200003BB`.
  - Development builds connect over Metro bundler on port 8081 with Fast Refresh.

---

## 2. Physical Device Testing Limitations & Safety Notice

In compliance with engineering safety directives:
1. **No Real Financial Transactions:** All payment processing, authorizations ($356.00), captures, and refund flows are pure deterministic frontend demonstrations. No live Stripe API keys or real cards are billed.
2. **No Cellular Data or SMS Charges:** Twilio/SMS authentication states are mocked with static OTP codes (`123456`). No real SMS messages are dispatched.
3. **Hardware Preservation:** No persistent root modifications, private data storage, or intrusive background daemons are installed on the Realme Note 60 device.

---

## 3. Physical Hardware Validation Sign-off

The application renders at native 360dp logical width with responsive layout adjustments, zero visual overlap in the sculpted navigation bar, pixel-aligned star rating glyphs, and responsive keyboard dismissal.
