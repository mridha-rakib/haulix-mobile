# HAULIX Customer Mobile App — Authoritative W01–W08 Master Screen Inventory

## Comprehensive Canonical State Inventory & Bilingual Verification Matrix

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Audit Phase:** Phase 03.66 Comprehensive Final Audit  
**Date:** November 24, 2026

---

## 1. Inventory Governance & Denominator Clarification

### Mandatory Architecture Distinction: 108 vs 215 Canonical States

> [!IMPORTANT]
> **Denominator Governance Rule:**  
> The number **108** represents canonical post-booking states across **Workflows 05 through 08 only** (W05: 20 states, W06: 26 states, W07: 34 states, W08: 28 states).  
> **The entire HAULIX Customer Mobile App inventory (W01–W08) comprises 215 unique canonical routes** (214 route files + root index) and **423 bilingual demo entries** registered in `DemoScreenNavigator.tsx`.  
> Never conflate the 108 post-booking denominator with the entire customer application inventory.

### Summary Inventory Table by Workflow

| Workflow | Name / Scope | Route Files | Unique Routes | QA Navigator Entries | Figma Source Sections |
|---|---|---|---|---|---|
| **W01** | Onboarding, Authentication & Account Profile | 9 files | 9 routes | 18 entries | `333:26`, `333:116`, C01–C10 frames |
| **W02** | Service Intake, Item Catalog & AI Recognition | 38 files | 38 routes | 76 entries | C11–C23 frames, `891:5859` |
| **W03** | Location, Access Conditions & Route Planning | 28 files | 28 routes | 56 entries | C16–C17 frames, `836:4571` |
| **W04** | Scheduling, Payment Auth & Booking Outcome | 32 files | 32 routes | 62 entries | C24–C31 frames, C29-3D |
| **W05** | Dispatch Search & Crew Assignment | 20 files | 20 routes | 32 entries (+4 internal) | `836:4571` (EN), `836:4572` (ES) |
| **W06** | Active Service Execution, GPS & Arrival | 26 files | 26 routes | 52 entries | `881:5131` (EN), `881:5132` (ES) |
| **W07** | My Jobs, History, Reschedule & Support | 34 files | 34 routes | 68 entries | `891:5859` (EN), `891:5860` (ES) |
| **W08** | Completion Proof, Capture, Receipts & Ratings | 28 files | 28 routes | 56 entries | `902:6811` (EN), `902:6812` (ES) |
| **Total** | **All Customer App Workflows (W01–W08)** | **215 files** | **215 routes** | **423 entries** | **meiXxwUNJaDo0a3mhcHBXv** |

---

## 2. Workflow 01: Onboarding, Authentication & Account (9 Canonical Routes)

| # | Route | File Path | Figma Reference | Navigator EN ID | Navigator ES ID | Scope / Purpose |
|---|---|---|---|---|---|---|
| 01 | `/welcome` | `app/(auth)/welcome.tsx` | C01 (`959:8556`) | `c01-welcome-en` | `c01-welcome-es` | Splash & Welcome Screen with brand hero |
| 02 | `/sign-in` | `app/(auth)/sign-in.tsx` | C06 (`333:10`) | `c06-en` | `c06-es` | Customer email/password sign-in form |
| 03 | `/create-account` | `app/(auth)/create-account.tsx` | C07 (`333:15`) | `c07-en` | `c07-es` | Customer registration with terms consent |
| 04 | `/verify-phone` | `app/(auth)/verify-phone.tsx` | C08 (`333:20`) | `c08-en` | `c08-es` | 6-digit SMS OTP verification simulation |
| 05 | `/social-return` | `app/(auth)/social-return.tsx` | C09 (`333:22`) | `c09-en` | `c09-es` | OAuth callback return preview (Apple/Google) |
| 06 | `/(app)` | `app/(app)/index.tsx` | C10-H (`333:24`) | `c10-home-en` | `c10-home-es` | Customer dashboard home with active job link |
| 07 | `/account` | `app/(app)/account.tsx` | C10 (`333:26`) | `c10-account-en` | `c10-account-es` | Account overview, Sarah Mitchell profile, bottom nav |
| 08 | `/edit-profile` | `app/(app)/edit-profile.tsx` | C10-E (`333:116`) | `c10-edit-en` | `c10-edit-es` | Profile editing (name, email, phone pending notice) |
| 09 | `/profile-updated`| `app/(app)/profile-updated.tsx` | C10-S (`333:120`) | `c10-saved-en` | `c10-saved-es` | Local profile update confirmation feedback |

---

## 3. Workflow 02: Item Catalog, Inventory & AI Intake (38 Canonical Routes)

Includes service discovery (`/service-discovery`, `/service-selected`), category intakes (appliances, bulky, furniture, garage, junk, mattresses, moving, retail), AI photo analysis, clarification flows, and manual item verification.

- **Primary Entry Routes:** `/service-discovery` (Node `333:140`), `/item-inventory` (Node `333:210`), `/item-photos` (Node `333:240`).
- **AI Recognition Suite:** `/ai-recognition`, `/ai-processing`, `/ai-suggested-items`, `/ai-uncertain-result`, `/measurement-clarification`, `/ai-missing-photos`, `/ai-offline-recovery`, `/ai-recognition-failed`.
- **Intake Review Suites:** `/appliance-intake-review`, `/furniture-intake-review`, `/garage-intake-review`, `/mattress-intake-review`, `/moving-intake-review`, `/retail-intake-review`.
- **Manual Verification:** `/manual-item-verification`, `/customer-confirmed-items`, `/add-inventory-item`, `/edit-inventory-item`.

---

## 4. Workflow 03: Location, Access Conditions & Route Planning (28 Canonical Routes)

- **Address Capture:** `/add-pickup-address`, `/pickup-address-validation`, `/moving-destination`, `/service-area`.
- **Access Complexity:** `/moving-access`, `/access-details`, `/access-validation`, `/extra-access-help`.
- **Service Restrictions:** `/service-restrictions`, `/restricted-material`.
- **Handoff Previews:** `/ai-review-handoff`, `/appliance-ai-handoff`, `/furniture-ai-handoff`, `/garage-ai-handoff`, `/mattress-ai-handoff`, `/moving-ai-handoff`, `/retail-ai-handoff`.

---

## 5. Workflow 04: Scheduling & Payment Authorization (32 Canonical Routes)

- **Quote Engine:** `/illustrative-quote`, `/itemized-quote`, `/quote-processing`, `/quote-revision`, `/quote-expired`, `/quote-error-recovery`, `/unapproved-rate-rules`.
- **Scheduling:** `/choose-service-time`, `/select-available-window`, `/service-window-unavailable`, `/invalid-service-time`, `/request-service-asap`, `/no-eligible-driver`.
- **Payment Method & 3DS:** `/choose-payment-method`, `/secure-card-setup`, `/confirm-card-authentication` (C29-3D).
- **Payment Authorization & Recovery:** `/payment-authorization-pending`, `/payment-authorization-declined`, `/card-hold-expired`, `/review-fresh-card-hold`, `/new-authorization-consent`, `/restore-secure-authorization`.
- **Booking Queue & Outcome:** `/checking-booking-status`, `/booking-recorded`, `/asap-request-recorded`, `/booking-not-confirmed`, `/booking-terms-accepted`, `/booking-terms-changed`.

---

## 6. Workflow 05: Dispatch & Assignment (20 Canonical Routes)

Figma Parent Sections: `836:4571` (English), `836:4572` (Spanish).

| # | State | Route Path | Figma EN | Figma ES | Navigator IDs | Functionality |
|---|---|---|---|---|---|---|
| 01 | `S10` | `/searching-for-driver` | `844:4571` | `844:6721` | `c32-searching-for-driver-en/es` | Initial radius search (0–2 min, 10 mi) |
| 02 | `S20` | `/search-expanded-20mi` | `844:4670` | `844:6820` | Internal route | Radius expansion to 20 miles (2 min) |
| 03 | `S30` | `/search-expanding-30mi` | `844:4769` | `844:6919` | Internal route | Radius expansion to 30 miles (4 min) |
| 04 | `S40` | `/search-expanded-40mi` | `844:4868` | `844:7018` | Internal route | Radius expansion to 40 miles (6 min) |
| 05 | `S50` | `/search-expanded-50mi` | `844:4967` | `844:7117` | Internal route | Maximum radius expansion to 50 miles (8 min) |
| 06 | `ACCEPT_PENDING` | `/driver-offer-pending` | `844:5066` | `844:7216` | `w05-offer-pending-en/es` | Driver offer countdown timer |
| 07 | `ASSIGNED` | `/driver-matched` | `844:5165` | `844:7315` | `w05-matched-en/es` | Primary driver match confirmation |
| 08 | `DRIVER_DETAILS` | `/driver-profile-details` | `844:5284` | `844:7434` | `w05-details-en/es` | Driver credentials, vehicle and rating |
| 09 | `HELPER_PENDING` | `/helper-matching` | `844:5403` | `844:7553` | `w05-helper-pending-en/es` | Helper crew search in progress |
| 10 | `HELPER_CONFIRMED` | `/crew-tracking` | `844:5522` | `844:7672` | `w05-crew-en/es` | Full 2-person crew confirmed en route |
| 11 | `RESTART` | `/dispatch-retry` | `844:5641` | `844:7791` | `w05-retry-en/es` | Search retry after timeout |
| 12 | `REASSIGNED` | `/driver-reassigned` | `844:5740` | `844:7890` | `w05-reassigned-en/es` | Instant reassignment to replacement driver |
| 13 | `DRIVER_LATE` | `/driver-arrival-update` | `844:5859` | `844:8009` | `w05-late-en/es` | Delayed ETA notice, fee-free waiver |
| 14 | `NO_SHOW` | `/driver-no-show` | `844:5978` | `844:8128` | `w05-no-show-en/es` | Driver no-show fee-free resolution |
| 15 | `NO_DRIVER` | `/no-driver-available` | `844:6070` | `844:8220` | `w05-no-driver-en/es` | No driver found exception |
| 16 | `CANCEL_REVIEW` | `/no-driver-fee-free-cancellation` | `844:6162` | `844:8312` | `w05-fee-free-en/es` | $0 fee-free cancellation confirmation |
| 17 | `CANCELED` | `/request-canceled` | `844:6254` | `844:8404` | `w05-canceled-en/es` | Request cancelled confirmation |
| 18 | `RESCHEDULE` | `/dispatch-reschedule` | `844:6346` | `844:8496` | `w05-reschedule-en/es` | Dispatch reschedule options |
| 19 | `SUPPORT` | `/dispatch-support` | `844:6445` | `844:8595` | `w05-support-en/es` | Assisted dispatch customer support |
| 20 | `W06_BRIDGE` | `/job-active-bridge` | `844:6537` | `844:8687` | `w05-bridge-en/es` | Handoff to active service arrival |

---

## 7. Workflow 06: Active Service Execution (26 Canonical Routes)

Figma Parent Sections: `881:5131` (English), `881:5132` (Spanish).
- `PRE`, `ENROUTE`, `ETA_PENDING`, `GPS_OFFLINE`, `GPS_DENIED`, `ARRIVED`, `WORKING`.
- In-Service Communication: `CHAT`, `CHAT_EMPTY`, `CHAT_FAILED`, `CHAT_SENT`, `MEDIA`, `MEDIA_DENIED`, `MEDIA_FAILED`, `MEDIA_SENT`.
- Extra Work Scope Revisions (Revision R2, +$40): `EXTRA_REQUEST`, `EXTRA_ADMIN_PENDING`, `EXTRA_ADMIN_REJECTED`, `EXTRA_APPROVED`, `EXTRA_EXPIRED`, `EXTRA_ACCEPTED`, `EXTRA_DECLINED`.
- In-Service Exceptions: `NO_SHOW` (20-min rule), `GPS_CLOSED` (privacy protection), `SUPPORT`, `W08_HANDOFF`.
- Complete 26 canonical states / 52 bilingual variants delivered in Phase 03.54.

---

## 8. Workflow 07: My Jobs, Booking History & Support (34 Canonical Routes)

Figma Parent Sections: `891:5859` (English), `891:5860` (Spanish).
- Dashboard & Archive: `/my-jobs`, `/my-jobs-empty`, `/my-jobs-history`, `/my-jobs-loading`, `/my-jobs-access`, `/my-jobs-scheduled`.
- Booking Details: `/job-details`, `/job-details-history`, `/job-details-cancelled`.
- Reschedule Lifecycle: `/job-reschedule`, `/job-reschedule-free`, `/job-reschedule-admin`, `/job-reschedule-pending`, `/job-reschedule-confirmed`, `/job-reschedule-failed`.
- Cancellation Management: `/job-cancel-fee`, `/job-cancel-free`, `/job-cancel-check`, `/job-cancel-done`, `/job-cancel-failed`.
- Support Lifecycle: `/job-support`, `/job-support-submitted`, `/job-support-pending`, `/job-support-resolved`, `/job-support-failed`, `/job-support-driver`, `/job-support-service`, `/job-support-payment`, `/job-support-other`.
- Refund & Dispute Lifecycle: `/job-refund`, `/job-refund-pending`, `/job-refund-resolved`, `/job-refund-rejected`, `/job-refund-failed`.
- Complete 34 canonical states / 68 bilingual variants delivered in Phase 03.60.

---

## 9. Workflow 08: Completion Proof, Receipts & Ratings (28 Canonical Routes)

Figma Parent Sections: `902:6811` (English), `902:6812` (Spanish).
- Completion Proof & Dispute: `/completion-proof`, `/completion-proof-missing`, `/completion-proof-denied`, `/completion-confirm`, `/completion-issue`, `/completion-dispute-hold`.
- Automatic Closure Policy: `/completion-no-reply`, `/completion-auto-eligible`, `/completion-auto-blocked`.
- Payment Capture Lifecycle: `/completion-capture-pending`, `/completion-capture-success`, `/completion-capture-failed`.
- Authorization Recovery & Receipts: `/completion-auth-expired`, `/completion-reauth`, `/completion-receipt`, `/completion-receipt-pending`, `/completion-receipt-refunded`, `/completion-receipt-updated`.
- Rating Eligibility & Stars 1–5: `/completion-rating`, `/completion-rating-locked`, `/completion-rating-1`, `/completion-rating-2`, `/completion-rating-3`, `/completion-rating-4`, `/completion-rating-5`.
- Rating Submission & Moderation: `/completion-rating-sent`, `/completion-rating-failed`, `/completion-rating-review`.
- Complete 28 canonical states / 56 bilingual variants delivered in Phase 03.65.

---

_Document independently verified for HAULIX Phase 03.66 Quality Gate._
