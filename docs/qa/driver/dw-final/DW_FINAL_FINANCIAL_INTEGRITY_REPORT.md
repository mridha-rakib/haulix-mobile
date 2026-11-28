# HAULIX Driver/Worker — DW-FINAL Financial Integrity Report

**Milestone:** DW-FINAL Consolidated Frontend QA  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Package:** `@haulix/design-tokens`, `src/stores/walletStore.ts`  
**Date:** November 28, 2026  

---

## 1. Currency & Ledger Mathematics

All monetary values are strictly represented as 64-bit integer cents. Float arithmetic is forbidden.

### 1.1 Formatting Rules
```ts
formatCents(128000) === "$1,280.00"
formatCents(34000) === "$340.00"
formatCents(1920) === "$19.20"
formatCents(0) === "$0.00"
```

### 1.2 Platform Commission Model
- **Gross Subtotal Split:**
  - Platform Fee: 35% (`grossSubtotalCents * 0.35`)
  - Worker Pool: 65% (`grossSubtotalCents * 0.65`)
- **Customer Tip:** 100% pass-through to workers (`platformFee = $0.00`).
- **Crew Allocation:**
  - Default: Worker pool and tips split equally across active crew members.
  - Contractual Allocation: Explicit `customDriverAllocationCents` and `customHelperAllocationCents` honored when specified in job agreement.

---

## 2. Approved Deterministic Instant Fee Quotes

Arbitrary mathematical formulas (such as `amount * 0.015`) have been completely removed.
The application references only authoritative, approved fee fixtures derived from Figma specifications (`1325:1866`):

```ts
export const APPROVED_MOCK_FEE_QUOTES: Record<number, number> = {
  128000: 1920, // $1,280.00 -> $19.20 fee (Net $1,260.80)
  50000: 750,   // $500.00 -> $7.50 fee (Net $492.50)
  34000: 510,   // $340.00 -> $5.10 fee (Net $334.90)
  10000: 200,   // $100.00 -> $2.00 fee (Net $98.00)
  5000: 150,    // $50.00 -> $1.50 fee (Net $48.50)
};
```
Any requested amount not present in `APPROVED_MOCK_FEE_QUOTES` returns `null` (quote unavailable).

---

## 3. Strict Quote Context Integrity

Before executing an instant payout (`requestInstantCashOut`), five cryptographic and state validations must succeed:
1. **Quote ID Match:** The submitted `quoteId` matches the currently active quote.
2. **Worker ID Match:** The quote's `workerId` strictly equals the active ledger worker (`DRV-8821` for Driver, `HLP-4402` for Helper).
3. **Role Match:** The quote's `workerRole` matches the active execution role.
4. **Destination Match:** The card brand and last 4 digits match the registered debit card account.
5. **Quote Freshness:** The quote's ISO expiration timestamp has not elapsed (15-minute TTL).

---

## 4. Stable Payout Intent Deduplication

Cashout requests take an optional or generated `intentId`. The ledger checks existing transactions across all states:
- **Processing or Completed:** Returns existing transaction without modifying balances or creating duplicate requests.
- **Failed:** Rejects duplicate submissions with error `DUPLICATE_REQUEST`, requiring explicit use of `retryFailedPayout`.
