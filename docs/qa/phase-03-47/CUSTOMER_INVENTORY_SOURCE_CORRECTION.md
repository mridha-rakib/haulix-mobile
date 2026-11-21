# HAULIX Customer Mobile App — Phase 03.47
# Customer Inventory Source of Truth Correction

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/CUSTOMER_INVENTORY_SOURCE_CORRECTION.md`  
**CONCERN:** Customer Confirmed Baseline vs Isolated Figma Demo Inventory  
**STATUS:** VERIFIED & ISOLATED  

---

## 1. Problem Statement

In previous documentation, confusion existed between two distinct inventory sets:
1. **The Active Customer Journey Baseline (W03 Confirmed):**
   - 1 Sofa
   - 2 Queen Mattresses
   - 1 Dining Table
   - **Total:** 4 physical pieces across 3 categories.
2. **The Figma Static Mockup Demo Baseline:**
   - 1 Sofa + 2 Chairs (or generic "Furniture removal").

In Phase 03.46, some reports erroneously mixed these up, claiming the customer inventory was "a sectional sofa, mattress & box spring, dining table with chairs, and 8 moving boxes".

---

## 2. Definitive Inventory Clarification

To guarantee absolute data integrity and prevent regression across the app:

### Baseline A: `W03_CUSTOMER_CONFIRMED_INVENTORY` (Authoritative Customer Scope)
- **Defined In:** `apps/customer/src/fixtures/c36Scheduling.ts`
- **Imported In:** `apps/customer/src/fixtures/c32Dispatch.ts`
- **Specification:**
  - `piecesCount: 4`
  - `categoriesCount: 3`
  - `items`: 1 sofa, 2 queen mattresses, 1 dining table.
- **Application:** Used for quotation generation, truck capacity validation, and customer booking confirmation screens.

### Baseline B: Isolated Figma S20–S50 Mockup Text
- **Defined In:** `packages/i18n/src/locales/en.ts` and `es.ts` (`w05S20`–`w05S50`)
- **Specification:** "Furniture removal · 1 sofa + 2 chairs" / "Retiro de muebles · 1 sofá + 2 sillas"
- **Application:** Used exclusively within the dispatch search preview screens (S20–S50) to achieve pixel-perfect visual fidelity with Figma frames `844:4670`, `844:4769`, `844:4868`, `844:4967`.

---

## 3. Strict Boundary Enforcement

1. **Non-Overwriting:** Rendering an S20–S50 screen does not overwrite or mutate `W03_CUSTOMER_CONFIRMED_INVENTORY`.
2. **Deterministic Fallback:** S10 (`searching-for-driver.tsx`) displays confirmed items directly from `dispatchState.confirmedItemsEn` / `confirmedItemsEs`, preserving the 4-piece / 3-category count.
3. **Automated Test Validation:** Verified in `w05-phase-03-47.test.tsx` that `W03_CUSTOMER_CONFIRMED_INVENTORY.piecesCount === 4` and `categoriesCount === 3` remain intact under all conditions.
