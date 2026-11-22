# W03 to W04 State Integrity Report — Phase 03.36

## HAULIX Customer Mobile App · End-to-End Data Model Continuity

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.36  
**Execution Date:** November 20, 2026

---

## 1. Inventory & Customer Invariants

Throughout the W03 AI Recognition & Quote workflow (Phases 03.28 to 03.34) and into W04 Scheduling & Payment (Phase 03.36), the core customer and inventory domain data has been maintained with strict zero-loss invariants:

1. **Customer Identity:**
   - Name: `Sarah Jane Mitchell`
   - Customer ID: `CUST-AZ-85004-928`
   - Demo Request Ref: `HX-DEMO-1027`
   - Location: `Downtown Phoenix, Arizona · 85004` (strictly non-binding demo address)

2. **Customer Confirmed Inventory (Invariant Preserved):**
   - **Total Pieces:** `4 Pieces`
   - **Categories:** `3 Categories`
   - **Item Breakdown:**
     - 1 Sofa (Living Room category)
     - 2 Chairs (Living Room / Dining category)
     - 1 Mattress / 2 Queen Mattresses (Preserved from W03 inventory reconciliation rules)
   - **Status:** Firmly preserved; no automated AI re-calculation, item drop, or scope inflation occurs during scheduling.

3. **Illustrative Financial Subtotal (Invariant Preserved):**
   - **Amount:** `$356.00 USD`
   - **Nature:** Strictly non-binding demo subtotal; displayed with explicit prototype disclaimers on every screen.
   - **Fee Disclaimers:** Cancellation fee policy clearly states: _"Conditional $100 post-assignment fee; agreed exceptions apply."_

---

## 2. W04 Scheduling State Model (`c36Scheduling.ts`)

The scheduling state is managed through typed frontend fixtures in `apps/customer/src/fixtures/c36Scheduling.ts`:

```typescript
export type TimingMode = "asap" | "scheduled";

export interface SchedulingDateOption {
	id: string;
	dayOfWeek: string;
	monthDay: string;
	isoDate: string;
}

export interface ServiceWindowOption {
	id: string;
	timeRange: string;
	isAvailable: boolean;
	isSameDayDisallowed?: boolean;
}

export interface W04CustomerDraft {
	serviceId: string;
	customerName: string;
	serviceCategory: string;
	confirmedItemsSummary: string;
	pickupArea: string;
	quoteSubtotal: string;
	timingMode: TimingMode;
	selectedDateId: string;
	selectedWindowId: string;
	termsConsentAccepted: boolean;
}
```

### 2.1 Reactive State Synchronization

- State updates are performed via `updateW04Draft(partial)` and listened to via `subscribeW04Draft(listener)`.
- When switching between ASAP and Scheduled modes, or selecting alternate dates/windows, all listening screens update instantaneously without component remounting or navigation loss.
- `termsConsentAccepted` is initialized to `false` and can only be set to `true` by explicit user action on screen C28.

---

## 3. Scope Accepted (`C26-A`) Handoff Integrity

In Phase 03.34, the final W03 screen `C26-A` (`/scope-accepted`) concluded the quote acceptance review. Previously, the primary CTA presented a static notice.

In Phase 03.36:

1. `apps/customer/app/(app)/scope-accepted.tsx` was modified to call `router.push("/choose-service-time")`.
2. The user's confirmed scope and initial quote reference ($356.00) flow seamlessly across the route boundary.
3. If the user navigates back via Header Back or hardware back, they return cleanly to `C26-A` without resetting their draft.

---

## 4. Verification Check

All unit tests verifying draft updates, listener notifications, and route continuity pass 100%:

- `apps/customer/src/__tests__/choose-service-time.test.tsx` (PASS)
- `apps/customer/src/__tests__/request-service-asap.test.tsx` (PASS)
- `apps/customer/src/__tests__/select-available-window.test.tsx` (PASS)
- `apps/customer/src/__tests__/review-booking.test.tsx` (PASS)
- `apps/customer/src/__tests__/scope-accepted.test.tsx` (PASS)
