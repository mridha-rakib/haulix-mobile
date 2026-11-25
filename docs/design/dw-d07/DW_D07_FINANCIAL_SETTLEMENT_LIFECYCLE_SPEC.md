# DW-D07: Financial Settlement Lifecycle Specification

## 1. Objective

This specification strictly defines the financial boundaries and transitions from service completion to worker earnings posting and payout eligibility.

---

## 2. Six-Stage Financial Lifecycle

| Stage | Financial Status | Trigger Event | Balance Impact | App Visibility |
|---|---|---|---|---|
| **1. Delivery Completed** | `PENDING_REVIEW` | Driver taps `Submit and complete` (`DW21`) | Zero balance change | `DW22`: "Earnings posting calculated after authorized completion" |
| **2. Review Window Elapse** | `REVIEW_APPROVED` | Customer `CONFIRM` or 24h timer expiration | Authorizes capture | Notification sent to Driver & Helper |
| **3. Payment Capture** | `FUNDS_CAPTURED` | Stripe charge capture on customer card | Platform receives gross booking total | Customer receipt issued (`/completion-receipt`) |
| **4. Ledger Allocation** | `EARNINGS_POSTED` | Automatic split execution (65/35 base subtotal, 100% tip) | Available Worker Balance increases | `DW23` / `DW24` ledger updated |
| **5. Cash Out Requested** | `PAYOUT_INITIATED` | Worker requests Standard ACH or Instant Transfer | Available balance deducted; transfer in flight | `DW25` / `DW67` / `DW68` |
| **6. Bank Settlement** | `SETTLED` | Bank / debit card receipt confirmed | Final transaction settled | `DW26`: Cash Out complete |

---

## 3. Financial Invariant Rules

1. **Non-Settlement on `DW22`:** `DW22` explicitly contains the disclaimer: `"This preview does not trigger payment or cash out."`
2. **Tip Transparency:** 100% of customer tips pass directly to participating workers without platform fee deduction.
3. **Dispute Protection:** If a dispute hold occurs, only the disputed booking balance is held; existing unaffected wallet balances remain withdrawable.
