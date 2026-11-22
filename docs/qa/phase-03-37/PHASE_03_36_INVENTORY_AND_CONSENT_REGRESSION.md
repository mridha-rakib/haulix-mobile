# HAULIX Mobile — Phase 03.37

## Phase 03.36 Inventory Separation and Consent Regression Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.37  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Audit Date:** 2026-11-20

---

## 1. Problem Context: The Phase 03.36 Documentation Discrepancy

During Phase 03.36, a potential discrepancy was identified between two requirements:

1. **The Active W03 Customer Journey Requirement:** The customer draft arriving from Phase 03.34 (`C26-A Scope Accepted`) must strictly preserve the 4 confirmed pieces across 3 categories:
   - 1 sofa
   - 2 queen mattresses
   - 1 dining table
2. **The Authoritative W04 Figma Mockup Visuals:** The static Figma master frames in Page `432:737` (Nodes `763:2`, `763:133`, `763:396`, etc.) were authored with hardcoded example text:
   - `FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS`

If the screen simply hardcoded "1 sofa + 2 chairs", active customer sessions would suffer inventory regression (losing the 2 queen mattresses and dining table). Conversely, if the screen displayed "4 pieces", pixel-level comparisons against the Figma master mockups would flag text differences.

---

## 2. Technical Solution: Dual Inventory Model

To permanently resolve this without compromise, Phase 03.37 introduced a typed inventory separation model in `apps/customer/src/fixtures/c36Scheduling.ts`:

```typescript
export const W03_CUSTOMER_CONFIRMED_INVENTORY = [
	{ id: "item-sofa", name: "Sofa", quantity: 1, category: "Living Room" },
	{
		id: "item-mattress",
		name: "Queen mattress",
		quantity: 2,
		category: "Bedroom",
	},
	{ id: "item-table", name: "Dining table", quantity: 1, category: "Dining" },
];

export const W04_FIGMA_DEMO_INVENTORY = [
	{ id: "demo-sofa", name: "Sofa", quantity: 1, category: "Living Room" },
	{ id: "demo-chair", name: "Chair", quantity: 2, category: "Living Room" },
];
```

The state machine tracks `inventorySource: "active_w03_journey" | "w04_figma_demo"`:

- When a user transitions from `C26-A` (`/scope-accepted`), `inventorySource` is set to `"active_w03_journey"`.
- Functions `getEffectiveConfirmedItems(draft, locale)` and `getEffectiveServiceType(draft, locale)` inspect this flag:
  - For active journeys, it outputs `1 sofa, 2 queen mattresses, 1 dining table (4 pieces)` in English or Spanish.
  - For direct Demo Navigator views of W04 frames, it outputs `1 sofa + 2 chairs` to ensure 100% visual fidelity with the Figma screenshot.

---

## 3. Terms Consent Protocol Verification

Phase 03.37 also addressed the terms consent interaction protocol between C28 and C28-C:

1. **Unconsented State on C28:**
   - On `/review-booking`, the consent checkbox starts unchecked.
   - If the user attempts to tap "Continue to payment" (`c28-primary-cta`), the screen triggers an honest inline validation banner:
     - EN: _"Please acknowledge the terms before continuing."_
     - ES: _"Marca la casilla para aceptar las condiciones de reserva y cancelación antes de continuar."_
   - Navigation is blocked until consent is provided.
2. **Explicit Consent Transition:**
   - Tapping the consent checkbox (`c28-consent-checkbox`) executes `acknowledgeTermsConsent()`, setting `termsConsentAcknowledged: true`.
   - The user immediately transitions to `/booking-terms-accepted` (C28-C), where the checkbox is visually rendered with a neon lime checkmark (`#BAFF42`) and the green `PENDING` badge.
3. **Re-Review Capability:**
   - On C28-C, clicking "Review terms again" (`c28c-secondary-cta`) safely returns the user to `/review-booking` (C28) without clearing their draft data.
4. **Boundary Enforced:**
   - Clicking "Continue to secure payment" on C28-C shows the honest Phase 03.38 / C29 future payment notice banner, strictly halting before executing any simulated charges or fake Stripe intents.

---

## 4. Regression Test Results

- Automated Jest test suites:
  - `customer-confirmed-items.test.tsx`: PASS
  - `scope-accepted.test.tsx`: PASS
  - `choose-service-time.test.tsx`: PASS
  - `request-service-asap.test.tsx`: PASS
  - `select-available-window.test.tsx`: PASS
  - `review-booking.test.tsx`: PASS
  - `booking-terms-accepted.test.tsx`: PASS
- Total test suites passing: **90 of 90 (582 tests)**.
- Zero inventory corruption across all test scenarios.
