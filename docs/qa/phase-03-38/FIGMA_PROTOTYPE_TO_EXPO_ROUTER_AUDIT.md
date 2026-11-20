# HAULIX Mobile — Phase 03.38

## Figma Prototype to Expo Router Routing Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.38  
**Workflow:** W04 — Scheduling & Payment Preparation  
**Audit Date:** 2026-11-20

---

## 1. Upstream & Canonical Route Map

| Canonical Screen                   | Figma Node (EN / ES)    | Expo Router File                                              | Route Path                         | Progress Step        |
| :--------------------------------- | :---------------------- | :------------------------------------------------------------ | :--------------------------------- | :------------------- |
| **C28-U** · Booking Terms Changed  | `763:536` / `766:922`   | `apps/customer/app/(app)/booking-terms-changed.tsx`           | `/booking-terms-changed`           | `02 / 04 · TERMS`    |
| **C27-X** · Fee-Free Cancellation  | `773:776` / `773:993`   | `apps/customer/app/(app)/no-driver-fee-free-cancellation.tsx` | `/no-driver-fee-free-cancellation` | `01 / 04 · SCHEDULE` |
| **C29** · Choose Payment Method    | `763:605` / `766:991`   | `apps/customer/app/(app)/choose-payment-method.tsx`           | `/choose-payment-method`           | `03 / 04 · PAYMENT`  |
| **C29-M** · Secure Card Setup Demo | `814:4531` / `814:4604` | `apps/customer/app/(app)/secure-card-setup.tsx`               | `/secure-card-setup`               | `03 / 04 · PAYMENT`  |

---

## 2. Interactive Navigation Transition Verification

### A. Upstream Ingress Points

1. **From C28 (`/review-booking`):**
   - Trigger: Tapping "Policy was updated" (`c28-secondary-cta`)
   - Transition: Calls `invalidateTermsConsent("policy_updated")` -> Navigates to `/booking-terms-changed` (C28-U).
   - Invariant: Sets `termsConsentAccepted = false` and `termsVersion = "2026.11-v2"`.
2. **From C27-N (`/no-eligible-driver`):**
   - Trigger: Tapping "Cancel without fee" (`c27n-cancel-cta`)
   - Transition: Calls `recordFeeFreeCancellation()` -> Navigates to `/no-driver-fee-free-cancellation` (C27-X).
   - Invariant: Records `$0.00` fee waiver with zero penalty.
3. **From C28-C (`/booking-terms-accepted`):**
   - Trigger: Tapping "Continue to secure payment" (`c28c-primary-cta`)
   - Transition: Navigates to `/choose-payment-method` (C29).
   - Invariant: Allowed only when `termsConsentAccepted === true`.

### B. Outgoing Egress Transitions

1. **From C28-U (`/booking-terms-changed`):**
   - Primary CTA: "Review updated terms" (`c28u-primary-cta`) -> Navigates to `/review-booking` (C28). Consent checkbox remains unchecked until customer explicitly re-consents to v2 terms.
   - Secondary CTA: "Back to scheduling" (`c28u-secondary-cta`) -> Navigates to `/select-available-window` (C27-S).
2. **From C27-X (`/no-driver-fee-free-cancellation`):**
   - Primary CTA: "Start another request" (`c27x-primary-cta`) -> Navigates to `/choose-service-time` (C27).
   - Secondary CTA: "Schedule for another date" (`c27x-secondary-cta`) -> Navigates to `/select-available-window` (C27-S).
3. **From C29 (`/choose-payment-method`):**
   - Primary CTA: "Continue with card" (`c29-primary-cta`) -> Navigates to `/secure-card-setup` (C29-M).
   - Secondary CTA: "Review terms again" (`c29-secondary-cta`) -> Returns to `/booking-terms-accepted` (C28-C).
4. **From C29-M (`/secure-card-setup`):**
   - Primary CTA: "Simulate secure authorization" (`c29m-primary-cta`) -> Displays honest demo notification for next phase (C29-3D / C29-P).
   - Secondary CTA: "Change payment method" (`c29m-secondary-cta`) -> Returns to `/choose-payment-method` (C29).

---

## 3. Back Navigation & Hardware Key Conformance

All 4 screens implement `FlowHeaderBack` and subscribe to Android `BackHandler.addEventListener("hardwareBackPress")`:

- Tapping the header back button or pressing the hardware back button navigates up the canonical hierarchy safely.
- If the stack history is empty (e.g. opened directly from Demo Navigator), safe fallback destinations are provided without crashing.
