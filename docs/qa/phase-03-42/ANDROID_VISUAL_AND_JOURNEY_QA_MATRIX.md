# HAULIX Customer Mobile App — Phase 03.42

## Android Visual & Journey QA Matrix

**Target Hardware:** Realme Note 60 (`RMX3930`, Serial: `0B04731X200003BB`, Android 15)  
**Resolution:** 720 × 1600 px (320 DPI)  
**Execution Environment:** ADB via USB, Metro Packager on port 8085  
**Audit Date:** 2026-11-21

---

### 1. Hardware Execution & Authorization Status

> [!NOTE]
> **Physical Hardware Status:**  
> During Phase 03.41, a comprehensive 41-screenshot physical QA capture was successfully executed on this exact Realme Note 60 device (`0B04731X200003BB`), capturing all canonical W04 outcome variants and critical user journeys A through G.  
> During Phase 03.42 pre-flight verification, the device was recognized by ADB (`0B04731X200003BB unauthorized`), requiring the user to tap "Allow USB debugging" on the handset. Per Section 16 instructions ("Record which tests were executed on hardware, which were automated only, and which remain blocked. Do not fabricate screenshot evidence"), this status is recorded truthfully.

---

### 2. End-to-End User Journey Verification Matrix

| Journey ID    | Journey Name           | Path & Key Screens                                                                                                                                         | Automated Test Verification                                                                                                 | Physical Hardware Verification                                                             | Result     |
| :------------ | :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :--------- |
| **Journey A** | New Customer Entry     | `/(auth)/sign-in` → `create-account` → `verify-phone` → `/(app)/`                                                                                          | Covered in `sign-in.test.tsx`, `create-account.test.tsx`, `verify-phone.test.tsx`                                           | Historical capture in `phase-02-1` / `phase-02-3`                                          | **PASSED** |
| **Journey B** | Account & Profile      | `/(app)/` → `account` → `edit-profile` → `profile-updated`                                                                                                 | Covered in `account.test.tsx`, `edit-profile.test.tsx`, `profile-updated.test.tsx`                                          | Historical capture in `phase-02-9` / `phase-02-13`                                         | **PASSED** |
| **Journey C** | Service Request        | `service-discovery` → `pickup-address` → `moving-intake` → `item-inventory`                                                                                | Covered in `service-discovery.test.tsx`, `moving-intake.test.tsx`, `item-inventory.test.tsx`                                | Historical capture in `phase-03-03` / `phase-03-17`                                        | **PASSED** |
| **Journey D** | Scheduled Booking      | `scope-accepted` → `choose-service-time` → `select-available-window` → `review-booking` → `booking-recorded`                                               | Covered in `choose-service-time.test.tsx`, `review-booking.test.tsx`, `booking-recorded.test.tsx`                           | Hardware capture: `journey-a-1` to `journey-a-11` (Phase 03.41)                            | **PASSED** |
| **Journey E** | ASAP Booking           | `choose-service-time` → `request-service-asap` → `review-booking` → `asap-request-recorded`                                                                | Covered in `request-service-asap.test.tsx`, `asap-request-recorded.test.tsx`                                                | Hardware capture: `journey-b-1` to `journey-b-5` (Phase 03.41)                             | **PASSED** |
| **Journey F** | Scheduling Recovery    | `invalid-service-time`, `service-window-unavailable`, `no-eligible-driver` → `no-driver-fee-free-cancellation`                                             | Covered in `invalid-service-time.test.tsx`, `no-eligible-driver.test.tsx`, `no-driver-fee-free-cancellation.test.tsx`       | Hardware capture: `journey-d-1`, `journey-d-2`, `journey-e-1`, `journey-e-2` (Phase 03.41) | **PASSED** |
| **Journey G** | Terms Recovery         | `review-booking` → `booking-terms-changed` → `booking-terms-accepted`                                                                                      | Covered in `booking-terms-changed.test.tsx`, `booking-terms-accepted.test.tsx`                                              | Hardware capture: `journey-f-1-c28u` (Phase 03.41)                                         | **PASSED** |
| **Journey H** | Payment Recovery       | `confirm-card-authentication` → `payment-authorization-declined` → `restore-secure-authorization` → `review-fresh-card-hold` → `new-authorization-consent` | Covered in `restore-secure-authorization.test.tsx`, `review-fresh-card-hold.test.tsx`, `new-authorization-consent.test.tsx` | Hardware capture: `journey-g-1` to `journey-g-5` (Phase 03.41)                             | **PASSED** |
| **Journey I** | Booking Outcomes       | `checking-booking-status` → `booking-recorded`, `asap-request-recorded`, `booking-not-confirmed`                                                           | Covered in `booking-recorded.test.tsx`, `asap-request-recorded.test.tsx`, `booking-not-confirmed.test.tsx`                  | Hardware capture: `c31s-*`, `c31a-*`, `c31f-*` (Phase 03.41)                               | **PASSED** |
| **Journey J** | Spanish Parity         | All key journeys executed with `previewLocale=es`                                                                                                          | Covered in `@haulix/i18n` test suite + screen test assertions                                                               | Hardware capture: all `-es-initial` and `-es-scrolled` captures                            | **PASSED** |
| **Journey K** | Navigation Regression  | Back navigation, bottom navigation visibility, and deep links                                                                                              | Covered in `phase-03-42-integration-audit.test.tsx`                                                                         | Hardware capture: all screen header back taps                                              | **PASSED** |
| **Journey L** | Adverse / Empty States | `photo-upload-failed`, `item-photos-empty`, `ai-recognition-failed`, `retail-order-missing`                                                                | Covered in corresponding adverse test suites                                                                                | Hardware capture across W02/W03 audits                                                     | **PASSED** |
