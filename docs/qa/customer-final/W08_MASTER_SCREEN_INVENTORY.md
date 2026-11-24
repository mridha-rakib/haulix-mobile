# HAULIX Customer Mobile App — Workflow 08 Master Screen & UX State Inventory

## Delivery Completion Proof, Customer Confirmation, Payment Finalization, Ratings & Service Recovery

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Parent Sections:** English `902:6811`, Spanish `902:6812`  
**Current Progress:** Batch 1 Delivered — 6/28 Canonical States (12/56 Bilingual Variants)  
**Date:** November 24, 2026

---

## 1. Workflow Architecture & Objectives

Workflow 08 represents the concluding customer-facing stage of the HAULIX moving lifecycle:

1. **Delivery Completion Proof:** Visual evidence uploaded by the assigned driver documenting cargo delivery and dropoff condition.
2. **Customer Confirmation & Dispute Safeguards:** Customer review of evidence, dual options to confirm completion or report an issue, placing payment captures on dispute hold if contested.
3. **Payment Finalization & Receipts:** Capture of authorized payment hold ($356.00 illustrative quote), transparent line-item fee breakdowns, and downloadable receipt generation.
4. **Ratings & Driver Tipping:** Service quality evaluation with 5-star rating matrix, preset tips ($10, $15, $20, custom), and driver appreciation feedback.
5. **Service Recovery & Closure:** Safe handling for exceptional states, failed payment retries, customer disputes, and return to main dashboard.

---

## 2. Canonical State Matrix (28 States)

### Batch 1: Completion Proof, Confirmation & Dispute (States 01–06) — DELIVERED ✅

| #   | Canonical State | Route Path                  | Figma EN   | Figma ES    | Status      | Description & Primary CTAs                                   |
| --- | --------------- | --------------------------- | ---------- | ----------- | ----------- | ------------------------------------------------------------ |
| 01  | `PROOF`         | `/completion-proof`         | `907:6811` | `907:9711`  | ✅ Complete | Photo proof review, lightbox, confirm CTA, missing CTA       |
| 02  | `PROOF_MISSING` | `/completion-proof-missing` | `907:6913` | `907:9813`  | ✅ Complete | Evidence missing notice, retry photo review, report issue    |
| 03  | `PROOF_DENIED`  | `/completion-proof-denied`  | `907:7015` | `907:9915`  | ✅ Complete | Masked confidential access banner, My Jobs, support link     |
| 04  | `CONFIRM`       | `/completion-confirm`       | `907:7117` | `907:10017` | ✅ Complete | 3-step decision breakdown, demo completion ack, report issue |
| 05  | `ISSUE`         | `/completion-issue`         | `907:7215` | `907:10115` | ✅ Complete | Issue intake form (chips, description, attachment, submit)   |
| 06  | `DISPUTE_HOLD`  | `/completion-dispute-hold`  | `907:7316` | `907:10216` | ✅ Complete | Dispute under review banner, authorization hold deadline box |

### Batch 2: Auto-Eligibility, Resolution & Payment Handoff (States 07–12) — UPCOMING ⏳

| #   | Canonical State    | Route Path                     | Figma EN   | Figma ES    | Status     | Description                                          |
| --- | ------------------ | ------------------------------ | ---------- | ----------- | ---------- | ---------------------------------------------------- |
| 07  | `NO_REPLY`         | `/completion-no-reply`         | `907:7417` | `907:10317` | ⏳ Pending | Customer unresponsiveness notice, review deadline    |
| 08  | `AUTO_ELIGIBLE`    | `/completion-auto-eligible`    | `907:7518` | `907:10418` | ⏳ Pending | Auto-confirmation eligibility warning after SLA      |
| 09  | `AUTO_CONFIRMED`   | `/completion-auto-confirmed`   | `907:7619` | `907:10519` | ⏳ Pending | System auto-confirmation applied on expired window   |
| 10  | `DISPUTE_RESOLVED` | `/completion-dispute-resolved` | `907:7720` | `907:10620` | ⏳ Pending | Admin investigation resolved in customer/driver tier |
| 11  | `DISPUTE_DENIED`   | `/completion-dispute-denied`   | `907:7821` | `907:10721` | ⏳ Pending | Admin determined evidence valid, dispute denied      |
| 12  | `PAYMENT_READY`    | `/completion-payment-ready`    | `907:7922` | `907:10822` | ⏳ Pending | Payment capture ready, final charge calculation      |

### Batch 3: Payment Capture, Receipts & Breakdown (States 13–18) — UPCOMING ⏳

| #   | Canonical State      | Route Path                       | Figma EN   | Figma ES    | Status     | Description                                      |
| --- | -------------------- | -------------------------------- | ---------- | ----------- | ---------- | ------------------------------------------------ |
| 13  | `PAYMENT_PROCESSING` | `/completion-payment-processing` | `907:8023` | `907:10923` | ⏳ Pending | Stripe hold settlement in progress               |
| 14  | `PAYMENT_SUCCESS`    | `/completion-payment-success`    | `907:8124` | `907:11024` | ⏳ Pending | $356.00 payment capture success confirmation     |
| 15  | `PAYMENT_FAILED`     | `/completion-payment-failed`     | `907:8225` | `907:11125` | ⏳ Pending | Card capture failed, update payment method retry |
| 16  | `RECEIPT`            | `/completion-receipt`            | `907:8326` | `907:11226` | ⏳ Pending | Itemized invoice with base rate, taxes, and fees |
| 17  | `RECEIPT_DOWNLOAD`   | `/completion-receipt-download`   | `907:8427` | `907:11327` | ⏳ Pending | PDF invoice export and email confirmation        |
| 18  | `FEE_ADJUSTMENT`     | `/completion-fee-adjustment`     | `907:8528` | `907:11428` | ⏳ Pending | Extra work / adjustment breakdown reconciliation |

### Batch 4: Ratings, Feedback & Driver Tipping (States 19–24) — UPCOMING ⏳

| #   | Canonical State   | Route Path                    | Figma EN   | Figma ES    | Status     | Description                                         |
| --- | ----------------- | ----------------------------- | ---------- | ----------- | ---------- | --------------------------------------------------- |
| 19  | `RATE_SERVICE`    | `/completion-rate-service`    | `907:8629` | `907:11529` | ⏳ Pending | 5-star rating matrix for primary driver & helpers   |
| 20  | `RATE_TAGS`       | `/completion-rate-tags`       | `907:8730` | `907:11630` | ⏳ Pending | Service compliments (Punctual, Careful, Fast, etc.) |
| 21  | `TIP_SELECTION`   | `/completion-tip-selection`   | `907:8831` | `907:11731` | ⏳ Pending | Driver tip selection ($10, $15, $20, custom, zero)  |
| 22  | `TIP_CONFIRMED`   | `/completion-tip-confirmed`   | `907:8932` | `907:11832` | ⏳ Pending | Separate tip charge authorization confirmed         |
| 23  | `FEEDBACK_SUBMIT` | `/completion-feedback-submit` | `907:9033` | `907:11933` | ⏳ Pending | Written feedback review and submission confirmation |
| 24  | `RATING_THANKYOU` | `/completion-rating-thankyou` | `907:9134` | `907:12034` | ⏳ Pending | Gratitude card with referral bonus promotion        |

### Batch 5: Exceptions, Service Recovery & Journey Close (States 25–28) — UPCOMING ⏳

| #   | Canonical State    | Route Path                     | Figma EN   | Figma ES    | Status     | Description                                        |
| --- | ------------------ | ------------------------------ | ---------- | ----------- | ---------- | -------------------------------------------------- |
| 25  | `RECOVERY_OFFER`   | `/completion-recovery-offer`   | `907:9235` | `907:12135` | ⏳ Pending | Discount or credit offered for service discrepancy |
| 26  | `RECOVERY_CLAIMED` | `/completion-recovery-claimed` | `907:9336` | `907:12236` | ⏳ Pending | Recovery credit applied to customer account        |
| 27  | `DISPUTE_ESCALATE` | `/completion-dispute-escalate` | `907:9437` | `907:12337` | ⏳ Pending | Formal arbitration escalation pathway              |
| 28  | `JOURNEY_COMPLETE` | `/completion-journey-complete` | `907:9538` | `907:12438` | ⏳ Pending | Full lifecycle closed; clean return to My Jobs     |

---

_Document maintained by HAULIX Engineering._
