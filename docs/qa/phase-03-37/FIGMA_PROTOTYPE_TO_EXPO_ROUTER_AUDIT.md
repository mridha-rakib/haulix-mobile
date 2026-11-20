# HAULIX Mobile — Phase 03.37

## Figma Prototype Connections to Expo Router Mapping & Verification Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.37  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Execution Date:** 2026-11-20  
**Status:** 100% Verified · Pure Frontend Demonstration Architecture

---

## 1. Executive Summary

This audit establishes the 1:1 bidirectional mapping between the authoritative Figma prototype interactions in Page `432:737` and Expo Router file-based routes for the four canonical Phase 03.37 recovery and consent screens:

1. **C27-V:** Invalid Same-Day Service Time (`apps/customer/app/(app)/invalid-service-time.tsx`)
2. **C27-R:** Unavailable / Stale Service Window (`apps/customer/app/(app)/service-window-unavailable.tsx`)
3. **C27-N:** No Eligible Driver Found (`apps/customer/app/(app)/no-eligible-driver.tsx`)
4. **C28-C:** Terms Accepted for This Quote (`apps/customer/app/(app)/booking-terms-accepted.tsx`)

All temporary notice placeholders originally placed in upstream Phase 03.36 screens (`C27`, `C27-A`, `C27-S`, `C28`, `C26-A`) have been superseded by authentic Expo Router transitions.

---

## 2. Interactive Route Mapping Table

| Screen ID | Canonical Name                | Figma Node (EN)           | Figma Node (ES)           | Expo Router Path              | Primary CTA Route           | Secondary / Exit Route  | Back Route                 |
| :-------- | :---------------------------- | :------------------------ | :------------------------ | :---------------------------- | :-------------------------- | :---------------------- | :------------------------- |
| **C27-V** | Invalid Same-Day Service Time | `763:202` (430 × 1044 px) | `766:588` (430 × 1044 px) | `/invalid-service-time`       | `/select-available-window`  | `/choose-service-time`  | `/select-available-window` |
| **C27-R** | Unavailable / Stale Window    | `763:269` (430 × 1044 px) | `766:655` (430 × 1079 px) | `/service-window-unavailable` | `/select-available-window`  | `/request-service-asap` | `/select-available-window` |
| **C27-N** | No Eligible Driver Found      | `763:336` (430 × 805 px)  | `766:722` (430 × 805 px)  | `/no-eligible-driver`         | `/select-available-window`  | `/choose-service-time`  | `/request-service-asap`    |
| **C28-C** | Terms Accepted for This Quote | `763:467` (430 × 1128 px) | `766:853` (430 × 1178 px) | `/booking-terms-accepted`     | Future Notice (C29 Handoff) | `/review-booking`       | `/review-booking`          |

---

## 3. Upstream Replacement Audit

### 3.1 C27 Choose Service Time (`/choose-service-time`)

- **Previous Phase 03.36 Behavior:** Clicking "Preview unavailable slot" displayed a local banner message `futureNoticeUnavailable`.
- **Phase 03.37 Implementation:** Clicking `c27-alternative-cta` executes `router.push("/service-window-unavailable")` (C27-R), accurately initiating the stale window recovery flow.

### 3.2 C27-A Request Service ASAP (`/request-service-asap`)

- **Previous Phase 03.36 Behavior:** Clicking "No driver available" displayed a local banner message `futureNoticeNoDriver`.
- **Phase 03.37 Implementation:** Clicking `c27a-secondary-cta` executes `router.push("/no-eligible-driver")` (C27-N), demonstrating honest capacity handling without fabricating dispatch.

### 3.3 C27-S Select Available Window (`/select-available-window`)

- **Previous Phase 03.36 Behavior:**
  - Clicking "Try invalid same-day time" displayed local banner `futureNoticeInvalidTime`.
  - Clicking "Preview stale slot" displayed local banner `futureNoticeStaleSlot`.
- **Phase 03.37 Implementation:**
  - Clicking `c27s-secondary-cta` executes `router.push("/invalid-service-time")` (C27-V).
  - Clicking `c27s-alternative-cta` executes `router.push("/service-window-unavailable")` (C27-R).

### 3.4 C28 Review Your Booking (`/review-booking`)

- **Previous Phase 03.36 Behavior:** Clicking consent checkbox was an in-place toggle; clicking continue displayed notice `futureNoticePaymentHandoff`.
- **Phase 03.37 Implementation:**
  - Tapping the consent checkbox (`c28-consent-checkbox`) records consent via `acknowledgeTermsConsent()` and immediately navigates to `/booking-terms-accepted` (C28-C) where the checkbox is displayed in its checked state.
  - Clicking "Continue to payment" while unconsented renders an honest inline validation banner requiring explicit acknowledgment.

### 3.5 C26-A Scope Accepted (`/scope-accepted`)

- Sets `inventorySource: "active_w03_journey"` upon proceeding to `/choose-service-time`, ensuring customer-confirmed items (1 sofa, 2 queen mattresses, 1 dining table = 4 pieces) are carried into scheduling.

---

## 4. Hardware Verified Interaction Journeys

All 7 mandatory interaction journeys have been proven and photographed on the connected Realme Note 60 physical hardware (`0B04731X200003BB`):

1. **Journey A (Invalid Time Flow):** `C27` -> `C27-S` -> `C27-V` -> `C27-S`
   - Verified that selecting an invalid same-day time triggers C27-V with explicit 60-minute notice callout, and "Select another time" safely returns to C27-S with active draft preserved.
2. **Journey B (Unavailable / Stale Slot Flow):** `C27` -> `C27-R` -> `C27-S`
   - Verified that unavailable slot navigation blocks stale selection and returns customer to refreshed slot options.
3. **Journey C (No Driver Flow):** `C27` -> `C27-A` -> `C27-N` -> `C27-S`
   - Verified that unavailable ASAP capacity routes to C27-N, where "Schedule for later" directs to C27-S without penalty.
4. **Journey D (Terms Consent Acknowledgment Flow):** `C27-S` -> `C28` -> explicit consent -> `C28-C`
   - Verified that customer clicking the terms consent checkbox explicitly transitions to C28-C with visual checkmark indicator and green pending badge.
5. **Journey E (Review Again Flow):** `C28-C` -> `C28`
   - Verified that clicking "Review terms again" on C28-C navigates back to C28 with consent preserved.
6. **Journey F (Payment Boundary Notice Flow):** `C28-C` -> "Continue to secure payment" -> C29 Notice Banner
   - Verified that advancing from C28-C shows the honest future payment notice banner without executing real charges or fabricated Stripe handoffs.
7. **Journey G (Fee-Free Exit Boundary Notice Flow):** `C27-N` -> "Cancel without fee" -> C27-X Notice Banner
   - Verified that clicking "Cancel without fee" on C27-N shows the fee-free cancellation notice without deducting fees or simulating cancellation penalties.

---

## 5. Architectural Invariants Preserved

- Zero simulated backend dispatch, zero fake driver IDs, zero live Stripe transactions.
- Active customer inventory draft strictly preserved across all recovery transitions.
- Disclaimers and non-fabrication banners strictly enforced across English and Spanish locales.
