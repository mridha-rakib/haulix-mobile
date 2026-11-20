# Figma Prototype to Expo Router Audit — Phase 03.36

## HAULIX Customer Mobile App · W04 Scheduling & Payment Foundation

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.36  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Execution Date:** November 20, 2026  
**Environment:** Physical Android Device (Realme Note 60 · RMX3930 · Android 15)

---

## 1. Executive Summary

Phase 03.36 establishes the foundational scheduling and booking review phase (W04) for the HAULIX Customer Mobile App. The implementation maps Figma prototype nodes directly to canonical Expo Router routes while strictly upholding safety boundaries:

1. Implemented routes are pure frontend client demonstrations.
2. In-batch navigation executes genuine Expo Router transitions (`router.push` and `router.back`).
3. Out-of-batch prototype triggers (such as `C27-R`, `C27-N`, `C27-V`, `C28-C`/`C29`, `C28-U`) present clear, localized notice banners rather than fabricating unapproved backends or empty stub screens.

---

## 2. In-Batch Routing & Prototype Matrix

| Figma Screen ID | Figma Screen Name                                             | Node ID (EN / ES)     | Canonical Expo Router Path | Implementation File                                   | Verification Status             |
| :-------------- | :------------------------------------------------------------ | :-------------------- | :------------------------- | :---------------------------------------------------- | :------------------------------ |
| **C27**         | Choose Your Service Time / Elige cuándo necesitas el servicio | `763:2` / `766:388`   | `/choose-service-time`     | `apps/customer/app/(app)/choose-service-time.tsx`     | **VERIFIED (Physical Android)** |
| **C27-A**       | Request Service ASAP / Solicitar servicio cuanto antes        | `763:71` / `766:457`  | `/request-service-asap`    | `apps/customer/app/(app)/request-service-asap.tsx`    | **VERIFIED (Physical Android)** |
| **C27-S**       | Select Available Window / Elige un horario disponible         | `763:133` / `766:519` | `/select-available-window` | `apps/customer/app/(app)/select-available-window.tsx` | **VERIFIED (Physical Android)** |
| **C28**         | Review Your Booking / Revisa tu reserva                       | `763:396` / `766:782` | `/review-booking`          | `apps/customer/app/(app)/review-booking.tsx`          | **VERIFIED (Physical Android)** |

---

## 3. Prototype Link Resolution & Handoff Audit

### 3.1 Upstream Transition: W03 Scope Accepted (`C26-A`) → W04

- **Origin Node:** `412:1240` (EN) / `987:11467` (ES) — Screen `C26-A` (`/scope-accepted`)
- **Interaction Element:** `c26a-primary-cta` ("Continue to Schedule & Payment" / "Continuar a programación y pago")
- **Previous State:** Placeholder alert banner indicating future W04 implementation.
- **Phase 03.36 Resolution:** Updated to perform real navigation to `/choose-service-time` via `router.push("/choose-service-time")`.
- **Physical Verification:** Verified on device (`docs/qa/phase-03-36/android/c26a-to-c27-transition.png`).

### 3.2 In-Batch Flow: C27 → C27-A (ASAP Branch)

- **Origin Route:** `/choose-service-time`
- **Trigger Element:** "As soon as possible" card selection followed by `c27-primary-cta` ("Request ASAP" / "Solicitar cuanto antes") or card press.
- **Target Route:** `/request-service-asap`
- **State Action:** Sets `timingMode: "asap"` in reactive W04 draft store.
- **Physical Verification:** Verified on device (`docs/qa/phase-03-36/android/c27a-en.png`, `c27a-es.png`).

### 3.3 In-Batch Flow: C27 → C27-S (Scheduled Window Branch)

- **Origin Route:** `/choose-service-time`
- **Trigger Element:** "Schedule for later" card selection followed by `c27-primary-cta` ("Choose a scheduled time" / "Elegir un horario programado").
- **Target Route:** `/select-available-window`
- **State Action:** Sets `timingMode: "scheduled"` in reactive W04 draft store.
- **Physical Verification:** Verified on device (`docs/qa/phase-03-36/android/c27-to-c27s-transition.png`).

### 3.4 In-Batch Flow: C27-A → C28 (ASAP Review)

- **Origin Route:** `/request-service-asap`
- **Trigger Element:** `c27a-primary-cta` ("Continue if available" / "Continuar si hay disponibilidad")
- **Target Route:** `/review-booking`
- **State Action:** Confirms ASAP timing mode; preserves Phoenix pickup area and 4-item customer inventory.
- **Physical Verification:** Verified on device (`docs/qa/phase-03-36/android/c28-en.png`, `c28-es.png`).

### 3.5 In-Batch Flow: C27-S → C28 (Scheduled Window Review)

- **Origin Route:** `/select-available-window`
- **Trigger Element:** Date and 2-hour window selection followed by `c27s-primary-cta` ("Continue to review" / "Continuar a revisión")
- **Target Route:** `/review-booking`
- **State Action:** Transmits selected date (e.g. `Tue, Nov 03`) and 2-hour window (`10:00 AM – 12:00 PM`) into draft store; displays in C28 summary header.
- **Physical Verification:** Verified on device (`docs/qa/phase-03-36/android/c27s-to-c28-transition.png`).

### 3.6 Loopback / Modification Flow: C28 → Edit Service Time

- **Origin Route:** `/review-booking`
- **Trigger Element:** `c28-alternative-cta` ("Edit service time" / "Editar horario")
- **Target Route:** Returns to `/select-available-window` (if `timingMode === "scheduled"`) or `/choose-service-time` (if `asap`).
- **Physical Verification:** Verified on device (`docs/qa/phase-03-36/android/c28-journey-edit-time-target.png`).

---

## 4. Strict Prototype Boundaries (Out-of-Batch Notice Verification)

The following Figma prototype targets belong to subsequent batches and have been protected with truthful, non-fabricating localized notice banners:

1. **C27-R (Same-Day Minimum Advance Notice Rule):**
   - _Figma Reference:_ Node `763:268`
   - _Prototype Trigger:_ In C27-S, secondary CTA ("Try invalid same-day time" / "Probar horario inválido para hoy")
   - _Implementation:_ Triggers `futureNoticeSameDayNotice` stating that same-day schedules require at least 60 minutes notice.
   - _Evidence:_ `docs/qa/phase-03-36/android/c27s-future-notice-sameday.png`

2. **C27-N / C27-V (No Available Slots / Verified Driver Capacity Check):**
   - _Figma Reference:_ Nodes `763:332`, `763:460`
   - _Prototype Trigger:_ In C27, alternative CTA ("Preview unavailable slot" / "Ver franja no disponible")
   - _Implementation:_ Triggers `futureNoticeNoSlotsAvailable` explaining that out-of-capacity slots route to retry/waitlist in later phases.
   - _Evidence:_ `docs/qa/phase-03-36/android/c27-future-notice-unavailable.png`

3. **C28-C / C29 (Payment Handoff & Stripe Card Authorization):**
   - _Figma Reference:_ Nodes `763:524`, `763:588`
   - _Prototype Trigger:_ In C28, primary CTA ("Continue to payment" / "Continuar al pago")
   - _Prerequisite Gate:_ Must check terms consent checkbox; if unchecked, displays `consentValidationError`.
   - _Implementation:_ When checked, triggers `futureNoticePaymentHandoff` explicitly informing the user that Stripe card payment is reserved for future phases.
   - _Evidence:_ `docs/qa/phase-03-36/android/c28-validation-error.png`, `c28-consent-checked.png`, `c28-future-notice-payment.png`

4. **C28-U (Policy Update Notice):**
   - _Figma Reference:_ Node `763:652`
   - _Prototype Trigger:_ In C28, secondary CTA ("Policy updated" / "Cambió la política")
   - _Implementation:_ Triggers `futureNoticePolicyUpdated` detailing conditional $100 cancellation fee terms.
   - _Evidence:_ `docs/qa/phase-03-36/android/c28-future-notice-policy.png`

---

## 5. Conclusion

All 4 canonical screens, their 8 localized variants, the 2 core customer journeys, back navigation, and future prototype handoffs conform to the authoritative Figma architecture and pass all verification audits.
