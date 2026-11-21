# HAULIX Customer Mobile App — Phase 03.42

## Cross-Workflow State Integrity Audit

**Audit Objective:** Rigorous verification of customer state isolation, inventory preservation, and non-binding estimate consistency  
**Audit Date:** 2026-11-21

---

### 1. Customer Inventory State & Fixture Isolation

A primary risk identified in earlier phases was state leakage between active customer journey inventory and isolated Figma demonstration preview fixtures.

#### Authoritative Inventory Definition:

- **Active Customer Journey Inventory (W03 Source):**
  - Definition: `W03_CUSTOMER_CONFIRMED_INVENTORY` in `apps/customer/src/fixtures/c36Scheduling.ts`
  - Total Pieces: Exactly **4 pieces**
  - Total Categories: Exactly **3 categories**
  - Inventory List: `"1 sofa, 2 queen mattresses, 1 dining table (4 pieces)"`
  - Service Type: `"Junk Removal · 3 categories / 4 pieces"`
- **Isolated Figma Demo Preview Fixture (W04 Demo Source):**
  - Definition: `W04_FIGMA_DEMO_INVENTORY`
  - Total Pieces: Exactly **3 pieces**
  - Total Categories: Exactly **2 categories**
  - Inventory List: `"1 sofa + 2 chairs"`
  - Service Type: `"FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS"`

#### Isolation Verification:

- Both fixtures are defined independently in `c36Scheduling.ts`.
- The helper function `getEffectiveConfirmedItems(draft, locale)` dynamically inspects `draft.inventorySource`:

  ```ts
  if (draft.inventorySource === "active_w03_journey") {
    return locale === "es"
      ? W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEs
      : W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn;
  }
  return locale === "es"
    ? W04_FIGMA_DEMO_INVENTORY.confirmedItemsEs
    : W04_FIGMA_DEMO_INVENTORY.confirmedItemsEn;
  ```
- **Result:** Navigation between screens does not overwrite or corrupt customer-confirmed quantities. Active user drafts retain their 4 pieces across 3 categories.

---

### 2. Symmetrical Financial Estimate Contract

Across all screens referencing job pricing in W03 and W04:

- Illustrative Subtotal: Exactly **`$356.00 USD`** (or `"$356.00"`).
- Itemized Breakdown:
  - Base Rate: `$290.00`
  - Heavy Item Fee: `$40.00`
  - Mileage / Fuel Surcharge: `$26.00`
  - Total Pre-Authorization Hold: `$356.00`
- Cancellation Fee Policy: Explicitly disclosed as `$100.00` if cancelled within 2 hours of arrival, and `$0.00` (free) when cancelled earlier or when no driver accepts.
- Non-binding Disclosure: Every quote card carries an explicit disclaimer that this is an illustrative non-binding estimate for prototype evaluation, not an approved final tariff.

---

### 3. Reactive Store Subscription & Lifecycle

- `W04CustomerDraft` store implements the observer pattern via `subscribeToW04Draft`.
- Listeners attach upon component mount and cleanly detach inside `useEffect` cleanup functions.
- Prevents memory leaks and ensures immediate UI re-rendering when draft updates occur.
