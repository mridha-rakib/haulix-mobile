# HAULIX Customer Mobile App — Workflow 08 Master Screen & UX State Inventory

## Delivery Completion Proof, Customer Confirmation, Payment Finalization, Receipts & Ratings

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Parent Sections:** English `902:6811`, Spanish `902:6812`  
**Current Progress:** Batches 1, 2 & 3 Delivered — 18/28 Canonical States (36/56 Bilingual Variants)  
**Date:** November 24, 2026

---

## 1. Workflow Architecture & Objectives

Workflow 08 represents the concluding customer-facing stage of the HAULIX moving lifecycle:

1. **Delivery Completion Proof:** Visual evidence uploaded by the assigned driver documenting cargo delivery and dropoff condition with privacy safeguards.
2. **Customer Confirmation & Dispute Safeguards:** Customer review of evidence, dual options to confirm completion or report an issue, placing payment captures on dispute hold if contested.
3. **Automatic Closure Policy & Eligibility Exceptions:** 24-hour review window (`NO_REPLY`), policy-based auto-closure eligibility (`AUTO_ELIGIBLE`), and blocked closure safeguards when evidence is missing or disputes are pending (`AUTO_BLOCKED`).
4. **Payment Capture Lifecycle:** Stripe payment hold capture processing (`CAPTURE_PENDING`), successful transaction finalization (`CAPTURE_SUCCESS`), and payment capture failure with customer re-authorization options (`CAPTURE_FAILED`).
5. **Authorization Expiration & Receipts (Phase 03.63):** Expired authorization renewals (`AUTH_EXPIRED`), fresh authorization demonstration (`REAUTH`), transaction receipts (`RECEIPT`), pending receipt status (`RECEIPT_PENDING`), refund-adjusted receipts (`RECEIPT_REFUNDED`), and updated payment records (`RECEIPT_UPDATED`).
6. **Ratings, Star Evaluation & Service Recovery (Phases 03.64–03.65):** Comprehensive driver rating matrix, lock states, ratings 1–5, feedback submission, and admin review.

---

## 2. Complete W08 Canonical Inventory (28 States)

| # | Canonical State | English Figma | Spanish Figma | Route Path | Status / Phase | Key Functionality & Primary CTAs |
|---|---|---|---|---|---|---|
| 01 | `PROOF` | `907:6811` | `907:9711` | `/completion-proof` | ✅ Complete (03.61) | Photo proof gallery, lightbox preview, confirm CTA, missing CTA |
| 02 | `PROOF_MISSING` | `907:6913` | `907:9813` | `/completion-proof-missing` | ✅ Complete (03.61) | Missing evidence notice, retry check, issue escalation |
| 03 | `PROOF_DENIED` | `907:7015` | `907:9915` | `/completion-proof-denied` | ✅ Complete (03.61) | Masked confidential access banner, My Jobs, support link |
| 04 | `CONFIRM` | `907:7117` | `907:10017` | `/completion-confirm` | ✅ Complete (03.61) | 3-step decision breakdown, acknowledge modal routes to capture |
| 05 | `ISSUE` | `907:7215` | `907:10115` | `/completion-issue` | ✅ Complete (03.61) | Issue intake form (chips, description, attachment, submit) |
| 06 | `DISPUTE_HOLD` | `907:7316` | `907:10216` | `/completion-dispute-hold` | ✅ Complete (03.61) | Dispute under review banner, localized capture hold notice |
| 07 | `NO_REPLY` | `907:7414` | `907:10314` | `/completion-no-reply` | ✅ Complete (03.62) | 24-hr customer review window, preview eligible / blocked paths |
| 08 | `AUTO_ELIGIBLE` | `907:7512` | `907:10412` | `/completion-auto-eligible` | ✅ Complete (03.62) | 24-hr closure policy met, preview eligible capture CTA |
| 09 | `AUTO_BLOCKED` | `907:7610` | `907:10510` | `/completion-auto-blocked` | ✅ Complete (03.62) | Closure blocked (missing evidence / active hold), back to no-reply |
| 10 | `CAPTURE_PENDING` | `907:7708` | `907:10608` | `/completion-capture-pending` | ✅ Complete (03.62) | Stripe capture processing, payout protection, hold breakdown |
| 11 | `CAPTURE_SUCCESS` | `907:7809` | `907:10709` | `/completion-capture-success` | ✅ Complete (03.62) | Captured demo, view receipt routes to /completion-receipt |
| 12 | `CAPTURE_FAILED` | `907:7910` | `907:10810` | `/completion-capture-failed` | ✅ Complete (03.62) | Capture failed, reauth options routes to /completion-auth-expired |
| 13 | `AUTH_EXPIRED` | `907:8011` | `907:10911` | `/completion-auth-expired` | ✅ Complete (03.63) | Card authorization expired, request new auth CTA |
| 14 | `REAUTH` | `907:8112` | `907:11012` | `/completion-reauth` | ✅ Complete (03.63) | Fresh customer authorization intake connecting to capture pending |
| 15 | `RECEIPT` | `907:8213` | `907:11113` | `/completion-receipt` | ✅ Complete (03.63) | Itemized receipt ($356.00 quote, extras, taxes, tip, total, refund) |
| 16 | `RECEIPT_PENDING` | `907:8320` | `907:11220` | `/completion-receipt-pending` | ✅ Complete (03.63) | Processing receipt status before processor settlement |
| 17 | `RECEIPT_REFUNDED` | `907:8427` | `907:11327` | `/completion-receipt-refunded` | ✅ Complete (03.63) | Refund-adjusted receipt with link to refund review |
| 18 | `RECEIPT_UPDATED` | `907:8534` | `907:11434` | `/completion-receipt-updated` | ✅ Complete (03.63) | Updated receipt reflecting modified line items & dispute action |
| 19 | `RATING` | `907:8641` | `907:11541` | TBD | ⏳ Phase 03.64 | 5-star service evaluation for driver & helpers |
| 20 | `RATING_LOCKED` | `907:8748` | `907:11648` | TBD | ⏳ Phase 03.64 | Rating submission locked state |
| 21 | `RATING_1` | `907:8855` | `907:11755` | TBD | ⏳ Phase 03.64 | 1-star dissatisfaction feedback breakdown |
| 22 | `RATING_2` | `907:8962` | `907:11862` | TBD | ⏳ Phase 03.64 | 2-star service improvement feedback |
| 23 | `RATING_3` | `907:9069` | `907:11969` | TBD | ⏳ Phase 03.64 | 3-star neutral service feedback |
| 24 | `RATING_4` | `907:9176` | `907:12076` | TBD | ⏳ Phase 03.64 | 4-star positive service feedback |
| 25 | `RATING_5` | `907:9283` | `907:12183` | TBD | ⏳ Phase 03.64 | 5-star outstanding service feedback |
| 26 | `RATING_SENT` | `907:9390` | `907:12290` | TBD | ⏳ Phase 03.65 | Rating sent confirmation |
| 27 | `RATING_FAILED` | `907:9497` | `907:12397` | TBD | ⏳ Phase 03.65 | Rating submission failed exception |
| 28 | `RATING_REVIEW` | `907:9604` | `907:12504` | TBD | ⏳ Phase 03.65 | Written review summary and completion close |

---

_Document maintained by HAULIX Engineering._
