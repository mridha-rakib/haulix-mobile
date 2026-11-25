# HAULIX Customer Mobile App — Canonical Inventory Reconciliation

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `apps/customer`  
**Auditor / Engineering Baseline:** Post-Remediation Verification (Phase 03.68 Restored)

---

## 1. Inventory Denominator Governance

The authoritative canonical inventory breakdown for the HAULIX Customer Mobile Application:

- **W05–W08 Canonical Subtotal:**
  - **W05:** 20 canonical states / 40 bilingual variants
  - **W06:** 26 canonical states / 52 bilingual variants
  - **W07:** 34 canonical states / 68 bilingual variants
  - **W08:** 28 canonical states / 56 bilingual variants
  - **Subtotal W05–W08:** **108 canonical states / 216 bilingual variants**
- **Complete Customer Application Scope (W01–W08):**
  - **215 unique public routes** (423 QA Navigator entries)

---

## 2. Workflow 08 Authoritative Figma Mappings (Batch 1 through Batch 5)

| State Key | Canonical Route | English Figma Node | Spanish Figma Node | Description |
| :--- | :--- | :--- | :--- | :--- |
| **PROOF** | `/completion-proof` | `907:6811` | `907:9711` | Review completion proof (2 side-by-side photo tiles) |
| **PROOF_MISSING** | `/completion-proof-missing` | `907:6913` | `907:9813` | Missing delivery evidence report |
| **PROOF_DENIED** | `/completion-proof-denied` | `907:7015` | `907:9915` | Restricted photo preview policy |
| **CONFIRM** | `/completion-confirm` | `907:7117` | `907:10017` | Explicit customer completion confirmation |
| **ISSUE** | `/completion-issue` | `907:7215` | `907:10115` | Issue categorization form |
| **DISPUTE_HOLD** | `/completion-dispute-hold` | `907:7316` | `907:10216` | Capture suspension & support review hold |
| **NO_REPLY** | `/completion-no-reply` | `907:7414` | `907:10314` | Automatic 24h response window notice |
| **AUTO_ELIGIBLE** | `/completion-auto-eligible` | `907:7512` | `907:10412` | Automatic closure eligibility confirmation |
| **AUTO_BLOCKED** | `/completion-auto-blocked` | `907:7610` | `907:10510` | Active dispute blocks auto-closure |
| **CAPTURE_PENDING** | `/completion-capture-pending` | `907:7708` | `907:10608` | Real-time payment capture processing |
| **CAPTURE_SUCCESS** | `/completion-capture-success` | `907:7809` | `907:10709` | Payment capture settlement confirmation |
| **CAPTURE_FAILED** | `/completion-capture-failed` | `907:7910` | `907:10810` | Payment decline recovery & card update |
| **AUTH_EXPIRED** | `/completion-auth-expired` | `907:8011` | `907:10911` | Payment authorization expired |
| **REAUTH** | `/completion-reauth` | `907:8112` | `907:11012` | Fresh payment re-authorization consent |
| **RECEIPT** | `/completion-receipt` | `907:8213` | `907:11113` | Final itemized transaction receipt ($356.00) |
| **RECEIPT_PENDING** | `/completion-receipt-pending` | `907:8320` | `907:11220` | Payment processing in-flight |
| **RECEIPT_REFUNDED** | `/completion-receipt-refunded` | `907:8427` | `907:11327` | Adjusted ledger showing settled refund |
| **RECEIPT_UPDATED** | `/completion-receipt-updated` | `907:8534` | `907:11434` | Updated receipt after adjustment |
| **RATING** | `/completion-rating` | `907:8641` | `907:11541` | Unselected rating initial state |
| **RATING_LOCKED** | `/completion-rating-locked` | `907:8748` | `907:11648` | Ineligible/disputed rating blocked state |
| **RATING_1** | `/completion-rating-1` | `907:8855` | `907:11755` | 1-star selection & composition |
| **RATING_2** | `/completion-rating-2` | `907:8962` | `907:11862` | 2-star selection & composition |
| **RATING_3** | `/completion-rating-3` | `907:9069` | `907:11969` | 3-star selection & composition |
| **RATING_4** | `/completion-rating-4` | `907:9176` | `907:12076` | 4-star selection & composition |
| **RATING_5** | `/completion-rating-5` | `907:9283` | `907:12183` | 5-star selection & composition |
| **RATING_SENT** | `/completion-rating-sent` | `907:9390` | `907:12290` | Confirmed review submission confirmation |
| **RATING_FAILED** | `/completion-rating-failed` | `907:9497` | `907:12397` | Submission network error & retry recovery |
| **RATING_REVIEW** | `/completion-rating-review` | `907:9604` | `907:12504` | Trust & safety review moderation |

---

## 3. Canonical Demonstration Inventory Context

In alignment with Signed SRS v1.6 and authoritative Figma specifications:
- **Canonical Inventory:** 1 sofa, 2 queen mattresses, 1 dining table (4 pieces across 3 categories)
- **Illustrative Service Quote:** $356.00 USD
- **Auto-Closure Window:** 24-hour response-window concept
