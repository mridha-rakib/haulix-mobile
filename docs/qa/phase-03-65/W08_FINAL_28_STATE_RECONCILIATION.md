# HAULIX Customer Mobile App — Workflow 08 Final 28-State Reconciliation

## Complete Authoritative Matrix for Delivery Completion, Receipts & Ratings

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Parent Sections:** English `902:6811`, Spanish `902:6812`  
**Status:** 28/28 Canonical States (56 Bilingual Variants) — 100% Complete  
**Date:** November 24, 2026

---

## Authoritative 28-State Matrix

| #   | State              | Route Path                     | Figma EN   | Figma ES    | Navigator EN ID           | Navigator ES ID           |
| --- | ------------------ | ------------------------------ | ---------- | ----------- | ------------------------- | ------------------------- |
| 01  | `PROOF`            | `/completion-proof`            | `907:6811` | `907:9711`  | `w08-proof-en`            | `w08-proof-es`            |
| 02  | `PROOF_MISSING`    | `/completion-proof-missing`    | `907:6913` | `907:9813`  | `w08-proof-missing-en`    | `w08-proof-missing-es`    |
| 03  | `PROOF_DENIED`     | `/completion-proof-denied`     | `907:7015` | `907:9915`  | `w08-proof-denied-en`     | `w08-proof-denied-es`     |
| 04  | `CONFIRM`          | `/completion-confirm`          | `907:7117` | `907:10017` | `w08-confirm-en`          | `w08-confirm-es`          |
| 05  | `ISSUE`            | `/completion-issue`            | `907:7215` | `907:10115` | `w08-issue-en`            | `w08-issue-es`            |
| 06  | `DISPUTE_HOLD`     | `/completion-dispute-hold`     | `907:7316` | `907:10216` | `w08-dispute-hold-en`     | `w08-dispute-hold-es`     |
| 07  | `NO_REPLY`         | `/completion-no-reply`         | `907:7414` | `907:10314` | `w08-no-reply-en`         | `w08-no-reply-es`         |
| 08  | `AUTO_ELIGIBLE`    | `/completion-auto-eligible`    | `907:7512` | `907:10412` | `w08-auto-eligible-en`    | `w08-auto-eligible-es`    |
| 09  | `AUTO_BLOCKED`     | `/completion-auto-blocked`     | `907:7610` | `907:10510` | `w08-auto-blocked-en`     | `w08-auto-blocked-es`     |
| 10  | `CAPTURE_PENDING`  | `/completion-capture-pending`  | `907:7708` | `907:10608` | `w08-capture-pending-en`  | `w08-capture-pending-es`  |
| 11  | `CAPTURE_SUCCESS`  | `/completion-capture-success`  | `907:7809` | `907:10709` | `w08-capture-success-en`  | `w08-capture-success-es`  |
| 12  | `CAPTURE_FAILED`   | `/completion-capture-failed`   | `907:7910` | `907:10810` | `w08-capture-failed-en`   | `w08-capture-failed-es`   |
| 13  | `AUTH_EXPIRED`     | `/completion-auth-expired`     | `907:8011` | `907:10911` | `w08-auth-expired-en`     | `w08-auth-expired-es`     |
| 14  | `REAUTH`           | `/completion-reauth`           | `907:8112` | `907:11012` | `w08-reauth-en`           | `w08-reauth-es`           |
| 15  | `RECEIPT`          | `/completion-receipt`          | `907:8213` | `907:11113` | `w08-receipt-en`          | `w08-receipt-es`          |
| 16  | `RECEIPT_PENDING`  | `/completion-receipt-pending`  | `907:8320` | `907:11220` | `w08-receipt-pending-en`  | `w08-receipt-pending-es`  |
| 17  | `RECEIPT_REFUNDED` | `/completion-receipt-refunded` | `907:8427` | `907:11327` | `w08-receipt-refunded-en` | `w08-receipt-refunded-es` |
| 18  | `RECEIPT_UPDATED`  | `/completion-receipt-updated`  | `907:8534` | `907:11434` | `w08-receipt-updated-en`  | `w08-receipt-updated-es`  |
| 19  | `RATING`           | `/completion-rating`           | `907:8641` | `907:11541` | `w08-rating-en`           | `w08-rating-es`           |
| 20  | `RATING_LOCKED`    | `/completion-rating-locked`    | `907:8748` | `907:11648` | `w08-rating-locked-en`    | `w08-rating-locked-es`    |
| 21  | `RATING_1`         | `/completion-rating-1`         | `907:8855` | `907:11755` | `w08-rating-1-en`         | `w08-rating-1-es`         |
| 22  | `RATING_2`         | `/completion-rating-2`         | `907:8962` | `907:11862` | `w08-rating-2-en`         | `w08-rating-2-es`         |
| 23  | `RATING_3`         | `/completion-rating-3`         | `907:9069` | `907:11969` | `w08-rating-3-en`         | `w08-rating-3-es`         |
| 24  | `RATING_4`         | `/completion-rating-4`         | `907:9176` | `907:12076` | `w08-rating-4-en`         | `w08-rating-4-es`         |
| 25  | `RATING_5`         | `/completion-rating-5`         | `907:9283` | `907:12183` | `w08-rating-5-en`         | `w08-rating-5-es`         |
| 26  | `RATING_SENT`      | `/completion-rating-sent`      | `907:9390` | `907:12290` | `w08-rating-sent-en`      | `w08-rating-sent-es`      |
| 27  | `RATING_FAILED`    | `/completion-rating-failed`    | `907:9497` | `907:12397` | `w08-rating-failed-en`    | `w08-rating-failed-es`    |
| 28  | `RATING_REVIEW`    | `/completion-rating-review`    | `907:9604` | `907:12504` | `w08-rating-review-en`    | `w08-rating-review-es`    |

---

## Cumulative Workflows W05–W08 Summary

- **W05 (Dispatch & Assignment):** 20 Canonical States (40 Bilingual Variants)
- **W06 (Active Service & Arrival):** 26 Canonical States (52 Bilingual Variants)
- **W07 (My Jobs & Booking Management):** 34 Canonical States (68 Bilingual Variants)
- **W08 (Proof, Payment & Rating):** 28 Canonical States (56 Bilingual Variants)
- **Total:** **108 Canonical States / 216 Bilingual Variants (100% Completed)**
