# HAULIX Customer Mobile App — Phase 03.38

## W04 Terms Recovery, Fee-Free Exit & Secure Payment Preparation — Final Implementation Report

### Accelerated 4-Screen Bilingual Batch With Strict Figma Prototype Routing

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.38  
**Work Type:** Frontend Implementation & Verification (React Native / Expo Router)  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Baseline Git Commit:** `9d5e3f88999f12b40d72ba626f4f3c6d3286eb69`  
**Target Hardware Device:** Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB` / Android 15)  
**Verification Date:** 2026-11-20  
**Overall Status:** 100% COMPLETE · ALL CHECKS PASS · PHYSICAL ANDROID HARDWARE QA VERIFIED

---

## 1. Executive Summary

Phase 03.38 implements the next four canonical screens in Workflow W04 (Scheduling & Payment) of the HAULIX Customer Mobile App:

1. **C28-U:** Booking Terms Changed (`apps/customer/app/(app)/booking-terms-changed.tsx`)
2. **C27-X:** No-Driver Fee-Free Cancellation (`apps/customer/app/(app)/no-driver-fee-free-cancellation.tsx`)
3. **C29:** Choose Payment Method (`apps/customer/app/(app)/choose-payment-method.tsx`)
4. **C29-M:** Secure Card Setup / Provider Handoff Demo (`apps/customer/app/(app)/secure-card-setup.tsx`)

Each canonical screen is implemented in symmetrical English and Spanish variants (8 total screens), registered in the in-app `DemoScreenNavigator`, backed by typed frontend state contracts (`c36Scheduling.ts`), and verified via full automated tests (94 test suites, 598 unit tests) and 30 physical Android hardware screenshots on the connected Realme Note 60 smartphone running Android 15.

---

## 2. Canonical Screens & Implementation Architecture

### 2.1 C28-U: Booking Terms Changed

- **Figma Reference:**
  - English: Node `763:536` (430 × 1052 px) — `W04-EN / C28-U · Booking terms have changed`
  - Spanish: Node `766:922` (430 × 1052 px) — `W04-ES / C28-U · Las condiciones de reserva han cambiado`
- **Route Path:** `apps/customer/app/(app)/booking-terms-changed.tsx`
- **Key Visuals:** Progress indicator `02 / 04 · TERMS`, amber warning card with badge `TERMS UPDATED (v2)` and title `POLICY UPDATED DURING BOOKING`, summary card of updated points (dispatch conditions, weather/emergency exceptions, driver arrival hold), preserved quote snapshot card ($356.00 illustrative quote, pickup area, confirmed items), consent invalidation callout.
- **Core Behavioral Invariant:**
  - Navigating to C28-U invalidates previous consent (`termsConsentAccepted: false`, `termsVersion: "2026.11-v2"`).
  - Tapping "Review updated terms" (`c28u-primary-cta`) returns to `/review-booking` (C28) where consent is unchecked and payment progression remains gated until re-consent.
- **Interactive Routing:**
  - Primary CTA: "Review updated terms" (`c28u-primary-cta`) -> `/review-booking`
  - Secondary CTA: "Back to scheduling" (`c28u-secondary-cta`) -> `/select-available-window`
  - Header Back: -> `/review-booking`

### 2.2 C27-X: No-Driver Fee-Free Cancellation

- **Figma Reference:**
  - English: Node `773:776` (430 × 753 px) — `W04-EN / C27-X · No driver found · Cancel without fee`
  - Spanish: Node `773:993` (430 × 786 px) — `W04-ES / C27-X · Sin conductor · Cancelación sin cargo`
- **Route Path:** `apps/customer/app/(app)/no-driver-fee-free-cancellation.tsx`
- **Key Visuals:** Progress indicator `01 / 04 · SCHEDULE`, lime badge `CANCELLED · $0.00 FEE`, summary card explaining zero penalty because no driver accepted, request resolution card (Request Type: Immediate ASAP, Cancellation Fee: $0.00 Waived, Payment Status: No charge / Hold released).
- **Core Behavioral Invariant:**
  - Fees apply only post-assignment. Since no driver accepted the immediate request, $0.00 is charged.
  - Zero backend cancellations dispatched; operates safely in frontend demo mode.
- **Interactive Routing:**
  - Primary CTA: "Start another request" (`c27x-primary-cta`) -> `/choose-service-time`
  - Secondary CTA: "Schedule for another date" (`c27x-secondary-cta`) -> `/select-available-window`
  - Header Back: -> `/no-eligible-driver`

### 2.3 C29: Choose Payment Method

- **Figma Reference:**
  - English: Node `763:605` (430 × 1093 px) — `W04-EN / C29 · Choose payment method`
  - Spanish: Node `766:991` (430 × 1108 px) — `W04-ES / C29 · Elige el método de pago`
- **Route Path:** `apps/customer/app/(app)/choose-payment-method.tsx`
- **Key Visuals:** Progress indicator `03 / 04 · PAYMENT`, authorization hold card (Amount: `$356.00`, Badge: `HOLD ONLY`, note: non-binding estimate), selectable payment method cards (Credit/Debit Card via Stripe, Digital Wallet Apple Pay / Google Pay), security guarantee card.
- **Core Behavioral Invariant:**
  - Requires valid terms consent from C28-C (`termsConsentAccepted === true`).
  - Strict symmetrical non-binding estimate `$356.00 USD`.
- **Interactive Routing:**
  - Primary CTA: "Continue with card" (`c29-primary-cta`) -> `/secure-card-setup` (C29-M)
  - Secondary CTA: "Review terms again" (`c29-secondary-cta`) -> `/booking-terms-accepted` (C28-C)
  - Method Selection: Radio toggle between card and digital wallet.
  - Header Back: -> `/booking-terms-accepted`

### 2.4 C29-M: Secure Card Setup / Provider Handoff Demo

- **Figma Reference:**
  - English: Node `814:4531` (430 × 1041 px) — `W04-EN / C29-M · Secure card setup`
  - Spanish: Node `814:4604` (430 × 1121 px) — `W04-ES / C29-M · Configuración segura de tarjeta`
- **Route Path:** `apps/customer/app/(app)/secure-card-setup.tsx`
- **Key Visuals:** Progress indicator `03 / 04 · PAYMENT`, security badge capsule `256-BIT ENCRYPTION · SECURE HANDOFF`, simulated Stripe provider card representation (chip icon, demo customer name, masked card number `•••• •••• •••• 4242`, expiry `12 / 28`), authorization hold details card ($356.00 USD hold), provider handoff security disclosure.
- **Strict Security Boundaries:**
  - Non-interactive card presentation: zero interactive TextInput elements.
  - Zero sensitive data collection: PAN, CVV, expiry, and bank credentials are never collected, logged, or persisted.
- **Interactive Routing:**
  - Primary CTA: "Simulate secure authorization" (`c29m-primary-cta`) -> Displays honest demo notification announcing next phase (C29-3D / C29-P).
  - Secondary CTA: "Change payment method" (`c29m-secondary-cta`) -> `/choose-payment-method` (C29)
  - Header Back: -> `/choose-payment-method`

---

## 3. Upstream Route Integrations

All remaining placeholder notices from Phase 03.37 have been replaced with canonical Expo Router navigation:

- **`review-booking.tsx` (C28):** Tapping "Policy was updated" (`c28-secondary-cta`) calls `invalidateTermsConsent()` and routes directly to `/booking-terms-changed` (C28-U).
- **`no-eligible-driver.tsx` (C27-N):** Tapping "Cancel without fee" (`c27n-cancel-cta`) calls `recordFeeFreeCancellation()` and routes directly to `/no-driver-fee-free-cancellation` (C27-X).
- **`booking-terms-accepted.tsx` (C28-C):** Tapping "Continue to secure payment" (`c28c-primary-cta`) routes directly to `/choose-payment-method` (C29).

---

## 4. Verification & Automated Quality Pipeline

### 4.1 Automated Test Execution

```
PASS src/__tests__/booking-terms-changed.test.tsx
PASS src/__tests__/no-driver-fee-free-cancellation.test.tsx
PASS src/__tests__/choose-payment-method.test.tsx
PASS src/__tests__/secure-card-setup.test.tsx
PASS src/__tests__/review-booking.test.tsx
PASS src/__tests__/no-eligible-driver.test.tsx
PASS src/__tests__/booking-terms-accepted.test.tsx
...
Test Suites: 94 passed, 94 total
Tests:       598 passed, 598 total
Snapshots:   0 total
Time:        11.695 s
```

### 4.2 TypeScript & Biome Lint Verification

- `pnpm check --write` -> 0 errors (Checked 538 files)
- `pnpm typecheck` -> 7 of 7 packages passed (0 diagnostic errors)
- `pnpm doctor` -> All environment and package checks green

---

## 5. Genuine Physical Android QA Verification

- **Target Device:** Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB` / Android 15 / 720 × 1600 px)
- **Method:** Direct ADB frame capture (`adb exec-out screencap -p`) on active hardware
- **Total Screenshots:** 30 high-resolution physical PNG captures saved in `docs/qa/phase-03-38/android/`
  - 16 Canonical Screen Captures (Initial + Scrolled for each of the 8 variants)
  - 14 Mandatory Interaction Journey Captures:
    - **Journey A (3 steps):** C28 -> C28-U policy change -> C28 unconsented return
    - **Journey B (3 steps):** C27-N -> C27-X fee-free exit -> C27 reschedule
    - **Journey C (2 steps):** C28 consent -> C28-C -> C29 payment entry
    - **Journey D (3 steps):** C29 -> C29-M -> simulation notice -> C29 return
    - **Journey E (3 steps):** Spanish flow parity (C28-C ES -> C29 ES -> C29-M ES)

---

## 6. Phase Deliverables Inventory

| Deliverable Path                                                       | Description                                                   |
| :--------------------------------------------------------------------- | :------------------------------------------------------------ |
| `apps/customer/app/(app)/booking-terms-changed.tsx`                    | Screen C28-U component (Node 763:536 / 766:922)               |
| `apps/customer/app/(app)/no-driver-fee-free-cancellation.tsx`          | Screen C27-X component (Node 773:776 / 773:993)               |
| `apps/customer/app/(app)/choose-payment-method.tsx`                    | Screen C29 component (Node 763:605 / 766:991)                 |
| `apps/customer/app/(app)/secure-card-setup.tsx`                        | Screen C29-M component (Node 814:4531 / 814:4604)             |
| `apps/customer/src/fixtures/c36Scheduling.ts`                          | State machine updates (terms invalidation, payment selection) |
| `packages/i18n/src/locales/en.ts`                                      | English translations for C28-U, C27-X, C29, C29-M             |
| `packages/i18n/src/locales/es.ts`                                      | Symmetrical Spanish translations for C28-U, C27-X, C29, C29-M |
| `apps/customer/src/__tests__/booking-terms-changed.test.tsx`           | Automated test suite for C28-U                                |
| `apps/customer/src/__tests__/no-driver-fee-free-cancellation.test.tsx` | Automated test suite for C27-X                                |
| `apps/customer/src/__tests__/choose-payment-method.test.tsx`           | Automated test suite for C29                                  |
| `apps/customer/src/__tests__/secure-card-setup.test.tsx`               | Automated test suite for C29-M                                |
| `docs/qa/phase-03-38/FIGMA_SOURCE_AUDIT.md`                            | Figma source inspection & token conformance audit             |
| `docs/qa/phase-03-38/ORIGINAL_ICON_AND_IMAGE_AUDIT.md`                 | SVG vector icon & asset conformance audit                     |
| `docs/qa/phase-03-38/FIGMA_PROTOTYPE_TO_EXPO_ROUTER_AUDIT.md`          | Prototype interaction & route transition matrix               |
| `docs/qa/phase-03-38/ANDROID_VISUAL_QA_MATRIX.md`                      | Android hardware screenshot QA matrix (30 captures)           |
| `docs/qa/phase-03-38/PHASE_03_37_TARGETED_REGRESSION.md`               | Regression verification report for Phase 03.37 routes         |
| `docs/qa/phase-03-38/PAYMENT_DEMO_SECURITY_BOUNDARY_AUDIT.md`          | Static code security & zero PAN storage verification          |
| `PHASE_03_38_FOUR_SCREEN_BATCH_REPORT.md`                              | Root phase delivery report                                    |

---

## 7. Strict Hard Stop Notice

Per owner instructions, execution **strictly halts** before implementing C29-3D (3D Secure Authentication), C29-P (Processing Payment Hold), C30-D (Driver Dispatching), C30-E (Driver Assigned), or live Stripe payment transactions. Phase 03.38 is fully complete and ready for review.
