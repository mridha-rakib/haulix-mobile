# HAULIX Customer Mobile App — Phase 03.69 Android Standalone APK Acceptance Report

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `apps/customer` (`com.haulix.customer`)  
**Branch:** `main`  
**Verified Build-Source Baseline:** `942c869de6726b9f277abcd1776728b228f7b2e4`  
**Authoritative Figma:** `meiXxwUNJaDo0a3mhcHBXv`  
**Target Hardware:** Realme Note 60 (RMX3933 / RMX3930), Android 15  
**Logical Width:** 360dp  
**Physical Resolution:** 720 × 1600  
**ADB Serial:** `0B04731X200003BB`

---

## 1. Executive Summary

Phase 03.69 is the final scheduled acceptance and delivery phase for the HAULIX Customer Mobile Application (`@haulix/customer`).

All final source integrity items (**FINAL-01** through **FINAL-06**) were resolved and validated through automated regression suites:
- **FINAL-01:** Rating flow initialization and QA isolation guarantee that opening locked demonstration routes does not contaminate unrelated eligible booking contexts or subsequent QA exploration.
- **FINAL-02:** Strict integer rating validation (1..5) rejects null, 0, >5, fractional (e.g. 3.5), and NaN inputs, and enforces eligibility at the shared action boundary.
- **FINAL-03:** Idempotent submission prevents rapid duplicate taps from overwriting existing review snapshots or corrupting submission timestamps.
- **FINAL-04:** Multi-booking snapshot context binding ensures review snapshots remain strictly bound to their respective booking contexts (`HX-AZ-A` vs `HX-AZ-B`) without cross-contamination.
- **FINAL-05:** Honest receipt functionality reconciliation corrects previous inaccurate claims: `completion-receipt.tsx` provides an in-app digital card breakdown with 6 line items, but does not claim or generate binary PDF downloads.
- **FINAL-06:** W05–W08 canonical inventory of 108 canonical states / 216 variants and 215 unique customer routes is 100% preserved.

All **133 test suites** across the customer application (totaling **944 tests**) pass with 0 failures, monorepo TypeScript compilation passes across all 7 packages, and Biome linting/formatting is clean.

---

## 2. Standalone APK Build Strategy Assessment & Status

In accordance with Section 8 and Section 19 of the project acceptance guidelines, build strategies were evaluated and executed:

### Strategy A — EAS Cloud Preview Build
- **Command Executed:** `cd apps/customer ; eas build -p android -e preview --non-interactive --no-wait`
- **Result:** **BLOCKED BY ACCOUNT QUOTA**
- **EAS Service Error:**
  ```text
  This account has used its Android builds from the Free plan this month, which will reset in 5 days (on Tue Dec 01 2026).
  Upgrade your plan for more builds with shorter wait times and longer timeouts, and to run more builds concurrently with a subscription plan.
  https://expo.dev/accounts/rakib_androids/settings/billing
  Run eas billing:subscribe starter --account rakib_androids to upgrade to the Starter plan.
  Error: build command failed.
  ```

### Strategy B — Local Android Build
- **Command Executed:** `cd apps/customer ; eas build --platform android --profile preview --local --non-interactive`
- **Result:** **BLOCKED BY HOST OPERATING SYSTEM**
- **EAS Service Error:**
  ```text
  Unsupported platform, macOS or Linux is required to build apps for Android
  Error: build command failed.
  ```

### Build Restriction Compliance
Per strict instructions:
- No unauthorized EAS plan upgrades or credit purchases were made.
- No duplicate Expo projects or package identifiers were fabricated.
- Standalone APK generation is truthfully reported as **BLOCKED** due to external EAS Free plan monthly build quota exhaustion.

---

## 3. Physical Device Verification State

- **Target Device:** Realme Note 60 (`0B04731X200003BB`), Android 15.
- **Installed Package (`dumpsys package com.haulix.customer`):**
  - `versionCode=1 minSdk=24 targetSdk=36`
  - `versionName=1.0.0`
  - `lastUpdateTime=2026-11-22 13:40:25`
- **Runtime Functional State:** Fully operable via Expo Dev Client / Metro connected runtime.
- **Standalone Acceptance Gate:** Blocked pending owner EAS quota reset (Dec 01, 2026) or manual cloud trigger with paid EAS credits.
