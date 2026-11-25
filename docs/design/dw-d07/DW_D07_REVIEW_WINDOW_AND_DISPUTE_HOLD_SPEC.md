# DW-D07: Review Window and Dispute Hold Specification

## 1. Architectural Scope

This specification details the lifecycle of the post-completion 24-hour customer review window, dispute hold mechanisms, and automated closure paths.

---

## 2. 24-Hour Review Window Lifecycle

```
[ DW21: Driver Submits Evidence ]
               │
               ▼
[ Booking State: PENDING_CUSTOMER_REVIEW ]
               │
               ├─────────────────────────────────────────┐
               │ (Customer Confirms or 24h Elapses)      │ (Customer Raises Issue)
               ▼                                         ▼
   [ Customer App: CONFIRM ]                [ Customer App: ISSUE ]
               │                                         │
               ▼                                         ▼
   [ Auto-Closure: AUTO_ELIGIBLE ]          [ Booking State: DISPUTE_HOLD ]
               │                                         │
               ▼                                         ▼
   [ Payment Captured: CAPTURE_SUCCESS ]    [ Payment Capture Frozen ]
               │                                         │
               ▼                                         ▼
   [ Worker Ledger: EARNINGS_POSTED ]       [ Support Arbitration ]
```

---

## 3. Review Rules & Invariants

1. **Explicit Customer Confirmation:** If the customer approves evidence immediately via `/completion-confirm`, the review window terminates and capture processes instantly.
2. **24-Hour Auto-Closure (`NO_REPLY`):** If no customer response occurs within 24 hours, the backend advances state to `AUTO_ELIGIBLE` and triggers settlement.
3. **Dispute Hold (`DISPUTE_HOLD`):** If the customer files a dispute (`/completion-issue`), automated capture is halted. Worker funds remain locked until platform support resolves the claim.
4. **Worker Visibility:** `DW22` communicates that completion does not trigger immediate cash out; funds post after authorized review.
