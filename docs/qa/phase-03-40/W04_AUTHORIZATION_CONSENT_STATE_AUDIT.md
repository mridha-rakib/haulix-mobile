# HAULIX Phase 03.40 — W04 Authorization Consent State Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.40  
**Scope:** Typed State Management, Fresh Hold Consent Acknowledgement, and Inventory Preservation  
**Audit Date:** 2026-11-21

---

## 1. Typed State Model Extensions

In `apps/customer/src/fixtures/c36Scheduling.ts`, the scheduling and payment draft state model was extended to formally support the recovery lifecycle without fabricating backend persistence:

```typescript
export interface C36SchedulingDraft {
  // ... existing fields ...
  freshHoldConsentAccepted?: boolean;
  authorizationStatus?:
    | "pending_initial"
    | "declined"
    | "expired"
    | "restoration_ready"
    | "fresh_hold_reviewed"
    | "consent_recorded_v2"
    | "booking_status_checking";
}
```

### Dedicated State Transition Helpers:

1. `acknowledgeFreshHoldConsent()`:
   - Sets `freshHoldConsentAccepted: true`.
   - Transitions `authorizationStatus` to `"consent_recorded_v2"`.
   - Preserves user selections, verified inventory scope, and estimated subtotal.

2. `restoreAuthorizationDemoState()`:
   - Sets `authorizationStatus` to `"restoration_ready"`.
   - Provides clean recovery baseline when arriving from declined or expired states.

3. `setBookingStatusCheckingDemoState()`:
   - Sets `authorizationStatus` to `"booking_status_checking"`.
   - Activates queue progress simulation indicators.

---

## 2. Commercial Consent Checkpoint Invariants (C30-C)

- **Mandatory User Action:** In C30-C (`review-fresh-card-hold.tsx`), proceeding without checking the consent checkbox is strictly prevented.
- **Inline Validation:** Attempting to tap "Agree & Continue" when `consentChecked === false` highlights the consent container with an amber border and renders an inline warning message:
  - English: _"Please check the box to confirm you agree to the fresh hold terms."_
  - Spanish: _"Marca la casilla para confirmar que aceptas las condiciones de retención."_
- **State Recording:** Once checked and submitted, the consent is recorded in frontend draft state and visually confirmed on C30-CA with badge `CONSENT RECORDED (v2)`.

---

## 3. Inventory Scope Preservation

Throughout all recovery transitions (C30-D → C30-R → C30-C → C30-CA → C31-P), the customer's verified moving scope is strictly preserved:

- **Quantity:** Exactly 4 pieces across 3 categories.
- **Item Breakdown:** 1 sofa, 2 queen mattresses, 1 dining table.
- **Subtotal:** Strictly `$356.00 USD`.
- **Service Area:** Phoenix, AZ 85004.
