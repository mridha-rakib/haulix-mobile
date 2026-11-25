# DW-D07: Customer Workflow 08 Alignment Specification

## 1. System Synchronization Overview

This document cross-references Driver App Phase DW-D07 completion events against the authoritative Customer App Workflow 08 specifications (`docs/qa/phase-03-67/CUSTOMER_APP_CANONICAL_INVENTORY_RECONCILIATION.md`).

---

## 2. Cross-Application State Synchronization

| Driver / Helper Event | Driver App State | Customer App Route & State | Backend State Authority |
|---|---|---|---|
| **Driver Submits Proof** | `DW21` ➔ `DW22` (`Job completed`) | `/completion-proof` (`PROOF`) | `STATUS_COMPLETED_PENDING_REVIEW` |
| **Customer Views Photos** | No change | `/completion-proof` (`907:6811`) | Image Delivery Verified |
| **Customer Approves Work** | Push: "Job Approved by Customer" | `/completion-confirm` (`CONFIRM`) | `CUSTOMER_CONFIRMED` ➔ `CAPTURE_SUCCESS` |
| **24-Hour Timer Elapses** | Push: "Auto-Closure Complete" | `/completion-no-reply` (`NO_REPLY`) | `AUTO_ELIGIBLE` ➔ `CAPTURE_SUCCESS` |
| **Customer Reports Damage** | Push: "Dispute Hold Applied" | `/completion-issue` (`ISSUE`) | `DISPUTE_HOLD` (Auto-capture frozen) |
| **Stripe Charge Settled** | Earnings available on `DW23` | `/completion-receipt` (`RECEIPT`) | Transaction Settled |

---

## 3. Demonstration Fixture Consistency

- **Customer Demonstration:** 1 sofa, 2 queen mattresses, 1 dining table ($356.00 quote).
- **Driver Demonstration (`DW21`):** `HX-AZ-DEMO-0042 · Furniture Removal`.
- Both fixtures represent illustrative scenarios without hardcoding production rates.
