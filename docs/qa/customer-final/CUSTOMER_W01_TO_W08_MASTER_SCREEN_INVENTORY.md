# HAULIX Customer Mobile App — Master Screen & UX State Inventory

## Workflows W01 through W08 End-to-End Mapping & W05 20/20 Canonical Reconciliation

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Status:** W05 Complete (20/20) · W06 Complete (26/26) · W07 Complete (34/34) · W08 Complete (28/28 Canonical States, 56 Bilingual Variants) — Customer App 100% Complete (108/108 Canonical States, 216 Bilingual Variants)  
**Date:** November 24, 2026

---

## 1. Executive Summary & Architecture Overview

The HAULIX Customer Mobile App frontend provides a 100% deterministic, zero-guard UX prototype of all core workflows from onboarding (W01) through active service execution (W06), bookings, reschedule & support (W07), and delivery completion proof, capture, receipts & ratings (W08).

> [!NOTE]
> **Denominator Governance Clarification:**  
> The count of **108 canonical states** (216 bilingual variants) represents post-booking workflows **W05 through W08 only** (W05: 20, W06: 26, W07: 34, W08: 28).  
> The entire Customer Mobile App inventory (W01 through W08) contains **215 unique canonical routes** (214 route files + root index) and **423 bilingual variants** registered in `DemoScreenNavigator.tsx`.

### Guiding Principles:

1. **Zero Route Guards:** All screens are directly accessible via Expo Router deep links and the built-in QA Navigator without requiring real backend authentication, SMS OTPs, Stripe cards, or active server dispatch sessions.
2. **Deterministic Symmetrical Pricing & Fixtures:** Standard move scenario of **4 items across 3 categories** (1 sofa, 2 mattresses/chairs, 1 dining table) with an illustrative total of **$356.00 USD**.
3. **Bilingual Parity:** 100% English (`en`) and Spanish (`es`) translation coverage across every UI component, pill, badge, and navigation header.
4. **Physical Android Verification:** Responsive across 360dp logical width devices (tested on Realme Note 60, Android 15, `720 × 1600` px) with support for 1.30x font scaling without layout breakage or text collision.

---

## 2. Workflow 05: Dispatch & Assignment (20 Canonical States — 100% Complete)

Figma Parent Sections: `836:4571` (English) and `836:4572` (Spanish).

| #   | Canonical State    | Route Path                         | Figma EN   | Figma ES   | Status      | Key Actions & CTAs                            |
| --- | ------------------ | ---------------------------------- | ---------- | ---------- | ----------- | --------------------------------------------- |
| 01  | `S10`              | `/searching-for-driver`            | `844:4571` | `844:6721` | ✅ Complete | Simulated search (0–2 min), view radius       |
| 02  | `S20`              | `/search-expanded-20mi`            | `844:4670` | `844:6820` | ✅ Complete | 2-min radius expansion to 20 miles            |
| 03  | `S30`              | `/search-expanding-30mi`           | `844:4769` | `844:6919` | ✅ Complete | 4-min radius expansion to 30 miles            |
| 04  | `S40`              | `/search-expanded-40mi`            | `844:4868` | `844:7018` | ✅ Complete | 6-min radius expansion to 40 miles            |
| 05  | `S50`              | `/search-expanded-50mi`            | `844:4967` | `844:7117` | ✅ Complete | 8-min maximum expansion (50 miles)            |
| 06  | `ACCEPT_PENDING`   | `/driver-offer-pending`            | `844:5066` | `844:7216` | ✅ Complete | Driver offer countdown timer, match pending   |
| 07  | `ASSIGNED`         | `/driver-matched`                  | `844:5165` | `844:7315` | ✅ Complete | Primary driver match, view profile CTA        |
| 08  | `DRIVER_DETAILS`   | `/driver-profile-details`          | `844:5284` | `844:7434` | ✅ Complete | Verified driver badges, ratings, vehicle info |
| 09  | `HELPER_PENDING`   | `/helper-matching`                 | `844:5403` | `844:7553` | ✅ Complete | Helper crew matching in progress              |
| 10  | `HELPER_CONFIRMED` | `/crew-tracking`                   | `844:5522` | `844:7672` | ✅ Complete | Full 2-person crew confirmed and en route     |
| 11  | `RESTART`          | `/dispatch-retry`                  | `844:5641` | `844:7791` | ✅ Complete | Driver declined/timed out; search restarts    |
| 12  | `REASSIGNED`       | `/driver-reassigned`               | `844:5740` | `844:7890` | ✅ Complete | Instant reassignment to replacement driver    |
| 13  | `DRIVER_LATE`      | `/driver-arrival-update`           | `844:5859` | `844:8009` | ✅ Complete | Delayed ETA notice, fee-free waiver check     |
| 14  | `NO_SHOW`          | `/driver-no-show`                  | `844:5978` | `844:8128` | ✅ Complete | Driver no-show resolution, fee-free cancel    |
| 15  | `NO_DRIVER`        | `/no-driver-available`             | `844:6070` | `844:8220` | ✅ Complete | No driver found, SRS policy guarantees        |
| 16  | `CANCEL_REVIEW`    | `/no-driver-fee-free-cancellation` | `844:6162` | `844:8312` | ✅ Complete | Fee-free cancel review, zero penalty ($0.00)  |
| 17  | `CANCELED`         | `/request-canceled`                | `844:6254` | `844:8404` | ✅ Complete | Cancellation confirmation, return home        |
| 18  | `RESCHEDULE`       | `/dispatch-reschedule`             | `844:6346` | `844:8496` | ✅ Complete | Select alternate service window               |
| 19  | `SUPPORT`          | `/dispatch-support`                | `844:6445` | `844:8595` | ✅ Complete | Dispatch support options, agent callback      |
| 20  | `W06_BRIDGE`       | `/job-active-bridge`               | `844:6537` | `844:8687` | ✅ Complete | Handoff to W06 active arrival & job execution |

---

## 3. Workflows W01–W04 Implemented Baseline Summary

### W01: Onboarding & Authentication

- Splash & Welcome Screens
- Phone Number Entry & Verification
- Profile Setup & Emergency Contact
- Legal Terms & Privacy Policy

### W02: Item Catalog & Estimator

- Item Category Selection (Furniture, Appliances, Boxes)
- Quantity & Heavy Item Specifiers
- Stair & Elevator Surcharge Calculators
- Dynamic Estimate Preview ($356.00 USD baseline)

### W03: Location & Route Planning

- Pickup & Dropoff Address Autocomplete
- Access Conditions (Stairs, Elevators, Parking distance)
- Map Route Visualization & Distance Computation

### W04: Scheduling & Payment Authorization

- Service Time Window Selection (`/choose-service-time`)
- Payment Method Selection (`/choose-payment-method`)
- 3D Secure 2.0 Issuer Authentication (`/confirm-card-authentication` — C29-3D)
- Payment Authorization Processing (`/payment-authorization-pending` — C29-P)
- Authorization Declined & Recovery (`/payment-authorization-declined` — C30-D)
- Card Hold Expired (`/card-hold-expired` — C30-E)
- Policy & Terms Update (`/booking-terms-changed` — C28-U)

---

## 4. Workflow 06: Active Service (26 Canonical States — 100% Complete: 26/26 States, 52 Bilingual Variants)

Figma Parent Sections: `881:5131` (English) and `881:5132` (Spanish).

| #   | Canonical State        | Route Path                             | Figma EN   | Figma ES   | Status      | Key Actions & UI Components                          |
| --- | ---------------------- | -------------------------------------- | ---------- | ---------- | ----------- | ---------------------------------------------------- |
| 01  | `PRE`                  | `/active-service-awaiting-departure`   | `882:5131` | `883:5495` | ✅ Complete | Privacy banner (location hidden), Marcus Vance       |
| 02  | `ENROUTE`              | `/active-service-en-route`             | `882:5245` | `883:5609` | ✅ Complete | Illustrative map, top-left overlay badge, 4 pcs      |
| 03  | `ETA_PENDING`          | `/active-service-eta-pending`          | `882:5356` | `883:5720` | ✅ Complete | Route provider sync card, privacy badge              |
| 04  | `GPS_OFFLINE`          | `/active-service-gps-offline`          | `882:5470` | `883:5834` | ✅ Complete | Offline coordinates badge, direct driver action      |
| 05  | `GPS_DENIED`           | `/active-service-gps-denied`           | `882:5584` | `883:5948` | ✅ Complete | Permission restricted badge, driver support          |
| 06  | `ARRIVED`              | `/active-service-driver-arrived`       | `882:5698` | `883:6062` | ✅ Complete | Destination map, arrival badge, PIN 8492             |
| 07  | `WORKING`              | `/active-service-working`              | `882:5809` | `883:6173` | ✅ Complete | Active work in progress, confirmed scope card        |
| 08  | `CHAT`                 | `/active-service-chat`                 | `882:5916` | `883:6280` | ✅ Complete | Job-only chat with driver bubbles and composer       |
| 09  | `CHAT_EMPTY`           | `/active-service-chat-empty`           | `882:6021` | `883:6385` | ✅ Complete | Empty conversation with communication notes          |
| 10  | `CHAT_FAILED`          | `/active-service-chat-failed`          | `882:6126` | `883:6490` | ✅ Complete | Delivery error alert and preserved message draft     |
| 11  | `CHAT_SENT`            | `/active-service-chat-sent`            | `882:6231` | `883:6595` | ✅ Complete | Sent message confirmation and delivery receipt       |
| 12  | `MEDIA`                | `/active-service-media`                | `882:6336` | `883:6700` | ✅ Complete | Evidence composer for photos and voice notes         |
| 13  | `MEDIA_DENIED`         | `/active-service-media-denied`         | `882:6443` | `883:6807` | ✅ Complete | Permission choice guidance, continuous text chat     |
| 14  | `MEDIA_FAILED`         | `/active-service-media-failed`         | `882:6550` | `883:6914` | ✅ Complete | Cached upload retry, attachment removal option       |
| 15  | `MEDIA_SENT`           | `/active-service-media-sent`           | `882:6657` | `883:7021` | ✅ Complete | Attached media confirmation, return to chat/work     |
| 16  | `EXTRA_REQUEST`        | `/active-service-extra-request`        | `882:6764` | `883:7128` | ✅ Complete | Revision R2 (+1 chair, +$40), Admin review CTA       |
| 17  | `EXTRA_ADMIN_PENDING`  | `/active-service-extra-admin-pending`  | `882:6876` | `883:7240` | ✅ Complete | Admin review gate, customer acceptance blocked       |
| 18  | `EXTRA_ADMIN_REJECTED` | `/active-service-extra-admin-rejected` | `882:6993` | `883:7357` | ✅ Complete | Original scope unblocked, zero extra fee charged     |
| 19  | `EXTRA_APPROVED`       | `/active-service-extra-approved`       | `882:7105` | `883:7469` | ✅ Complete | Admin-approved R2 review, customer accept/decline    |
| 20  | `EXTRA_EXPIRED`        | `/active-service-extra-expired`        | `882:7222` | `883:7586` | ✅ Complete | Expired revision blocked, return to original         |
| 21  | `EXTRA_ACCEPTED`       | `/active-service-extra-accepted`       | `882:7339` | `883:7703` | ✅ Complete | Dual-approval confirmed (Admin+Customer), demo       |
| 22  | `EXTRA_DECLINED`       | `/active-service-extra-declined`       | `882:7451` | `883:7815` | ✅ Complete | Customer declined extra work, original continues     |
| 23  | `NO_SHOW`              | `/active-service-no-show`              | `882:7563` | `883:7927` | ✅ Complete | In-service no-show exception, 20-min server rule     |
| 24  | `GPS_CLOSED`           | `/active-service-gps-closed`           | `882:7670` | `883:8034` | ✅ Complete | Privacy window closed, zero fake GPS displayed       |
| 25  | `SUPPORT`              | `/active-service-support`              | `882:7784` | `883:8148` | ✅ Complete | In-service customer support, assigned driver Mike R. |
| 26  | `W08_HANDOFF`          | `/active-service-completion-bridge`    | `882:7891` | `883:8255` | ✅ Complete | In-service completion bridge to W08 proof & rating   |

---

## 5. Workflow 07: My Jobs, Booking History & Details (34 Canonical States — 100% Complete: 34/34 States, 68 Bilingual Variants)

Figma Parent Sections: `891:5859` (English) and `891:5860` (Spanish).

| #   | Canonical State     | Route Path                  | Figma EN   | Figma ES   | Status      | Key Actions & UI Components                                  |
| --- | ------------------- | --------------------------- | ---------- | ---------- | ----------- | ------------------------------------------------------------ |
| 01  | `HOME`              | `/my-jobs`                  | `892:5859` | `893:6265` | ✅ Complete | My Jobs dashboard, active booking card, bottom nav           |
| 02  | `HOME_EMPTY`        | `/my-jobs-empty`            | `892:5946` | `893:6352` | ✅ Complete | Empty booking state, support CTA, bottom nav                 |
| 03  | `HOME_HISTORY`      | `/my-jobs-history`          | `892:6033` | `893:6439` | ✅ Complete | Archive list of completed & cancelled moves                  |
| 04  | `HOME_LOADING`      | `/my-jobs-loading`          | `892:6120` | `893:6526` | ✅ Complete | Skeleton loading state, retry action, bottom nav             |
| 05  | `HOME_ACCESS`       | `/my-jobs-access`           | `892:6207` | `893:6613` | ✅ Complete | Booking unavailable / authorization required state           |
| 06  | `DETAILS`           | `/job-details`              | `892:6294` | `893:6700` | ✅ Complete | 3-step booking timeline, $356 quote, reschedule CTA          |
| 07  | `DETAILS_HISTORY`   | `/job-details-history`      | `892:6376` | `893:6782` | ✅ Complete | Archived service details, timeline, refund review CTA        |
| 08  | `DETAILS_CANCELLED` | `/job-details-cancelled`    | `892:6458` | `893:6864` | ✅ Complete | Cancelled booking details, server fee status, support        |
| 09  | `RESCHEDULE`        | `/job-reschedule`           | `892:6540` | `893:6946` | ✅ Complete | Date/time selection, policy notice, free vs admin review     |
| 10  | `RESCHED_FREE`      | `/job-reschedule-free`      | `892:6618` | `893:7024` | ✅ Complete | Eligible free reschedule confirmation (>=24h rule)           |
| 11  | `RESCHED_ADMIN`     | `/job-reschedule-admin`     | `892:6696` | `893:7102` | ✅ Complete | Reschedule needs Admin review (<24h / driver assigned)       |
| 12  | `RESCHED_PENDING`   | `/job-reschedule-pending`   | `892:6774` | `893:7180` | ✅ Complete | Reschedule under review, existing booking unchanged          |
| 13  | `RESCHED_CONFIRMED` | `/job-reschedule-confirmed` | `892:6852` | `893:7258` | ✅ Complete | Successful schedule change confirmation, updated date        |
| 14  | `RESCHED_FAILED`    | `/job-reschedule-failed`    | `892:6930` | `893:7336` | ✅ Complete | Unapproved reschedule outcome, original time preserved       |
| 15  | `CANCEL_FEE`        | `/job-cancel-fee`           | `892:7008` | `893:7414` | ✅ Complete | Cancellation policy review, conditional $100 fee rules       |
| 16  | `CANCEL_FREE`       | `/job-cancel-free`          | `892:7095` | `893:7501` | ✅ Complete | Qualifying fee-free cancellation ($0 fee, no-show/empty)     |
| 17  | `CANCEL_CHECK`      | `/job-cancel-check`         | `892:7182` | `893:7588` | ✅ Complete | Cancellation fee review step, server validation notice       |
| 18  | `CANCEL_DONE`       | `/job-cancel-done`          | `892:7269` | `893:7675` | ✅ Complete | Cancellation outcome confirmed, return to My Jobs/detail     |
| 19  | `CANCEL_FAILED`     | `/job-cancel-failed`        | `892:7356` | `893:7762` | ✅ Complete | Cancellation uncompleted error, booking active preserved     |
| 20  | `SUPPORT`           | `/job-support`              | `892:7443` | `893:7849` | ✅ Complete | Booking support hub, topic options, local draft input        |
| 21  | `SUPPORT_SUBMITTED` | `/job-support-submitted`    | `892:7539` | `893:7945` | ✅ Complete | Support request received confirmation, tracking next step    |
| 22  | `SUPPORT_PENDING`   | `/job-support-pending`      | `892:7635` | `893:8041` | ✅ Complete | Support case under review, preview resolved case option      |
| 23  | `SUPPORT_RESOLVED`  | `/job-support-resolved`     | `892:7731` | `893:8137` | ✅ Complete | Resolved support case linked to booking, return to jobs      |
| 24  | `SUPPORT_FAILED`    | `/job-support-failed`       | `892:7827` | `893:8233` | ✅ Complete | Send failed exception, edit and retry draft preserved        |
| 25  | `REFUND`            | `/job-refund`               | `892:7923` | `893:8329` | ✅ Complete | Refund & dispute review request, reason chips, details       |
| 26  | `REFUND_PENDING`    | `/job-refund-pending`       | `892:8011` | `893:8417` | ✅ Complete | Refund under Admin review, preview approved/declined CTAs    |
| 27  | `REFUND_RESOLVED`   | `/job-refund-resolved`      | `892:8099` | `893:8505` | ✅ Complete | Admin-approved demo refund outcome, return to My Jobs        |
| 28  | `REFUND_REJECTED`   | `/job-refund-rejected`      | `892:8187` | `893:8593` | ✅ Complete | Declined refund outcome demo, support discussion link        |
| 29  | `REFUND_FAILED`     | `/job-refund-failed`        | `892:8275` | `893:8681` | ✅ Complete | Review request submission failed, edit and retry draft       |
| 30  | `HOME_SCHEDULED`    | `/my-jobs-scheduled`        | `897:6671` | `897:7145` | ✅ Complete | Scheduled bookings view, active scheduled tab, change CTA    |
| 31  | `SUPPORT_DRIVER`    | `/job-support-driver`       | `897:6761` | `897:7235` | ✅ Complete | Driver issue support, routing, topic switcher                |
| 32  | `SUPPORT_SERVICE`   | `/job-support-service`      | `897:6857` | `897:7331` | ✅ Complete | Service issue support, damaged item/scope, photo evidence    |
| 33  | `SUPPORT_PAYMENT`   | `/job-support-payment`      | `897:6953` | `897:7427` | ✅ Complete | Payment issue support, quote/charge inquiries, review notice |
| 34  | `SUPPORT_OTHER`     | `/job-support-other`        | `897:7049` | `897:7523` | ✅ Complete | Other inquiries support, policy & account assistance, demo   |

---

## 6. Workflow 08: Completion Proof, Payment & Rating (28/28 Canonical States Delivered — 100% Complete)

Figma Parent Sections: `902:6811` (English) and `902:6812` (Spanish).

| #   | Canonical State    | Route Path                     | Figma EN   | Figma ES    | Status      | Key Actions & CTAs                                            |
| --- | ------------------ | ------------------------------ | ---------- | ----------- | ----------- | ------------------------------------------------------------- |
| 01  | `PROOF`            | `/completion-proof`            | `907:6811` | `907:9711`  | ✅ Complete | Photo proof review, lightbox, confirm CTA, missing CTA        |
| 02  | `PROOF_MISSING`    | `/completion-proof-missing`    | `907:6913` | `907:9813`  | ✅ Complete | Missing photo notice, retry photo review, report issue        |
| 03  | `PROOF_DENIED`     | `/completion-proof-denied`     | `907:7015` | `907:9915`  | ✅ Complete | Masked confidential access banner, My Jobs, support link      |
| 04  | `CONFIRM`          | `/completion-confirm`          | `907:7117` | `907:10017` | ✅ Complete | 3-step decision breakdown, demo completion ack routes to pay  |
| 05  | `ISSUE`            | `/completion-issue`            | `907:7215` | `907:10115` | ✅ Complete | Issue intake form (chips, description, attachment, submit)    |
| 06  | `DISPUTE_HOLD`     | `/completion-dispute-hold`     | `907:7316` | `907:10216` | ✅ Complete | Dispute under review banner, capture blocked pending review   |
| 07  | `NO_REPLY`         | `/completion-no-reply`         | `907:7414` | `907:10314` | ✅ Complete | 24-hr response window, preview eligible / blocked paths       |
| 08  | `AUTO_ELIGIBLE`    | `/completion-auto-eligible`    | `907:7512` | `907:10412` | ✅ Complete | 24-hr auto-closure eligible, preview eligible capture CTA     |
| 09  | `AUTO_BLOCKED`     | `/completion-auto-blocked`     | `907:7610` | `907:10510` | ✅ Complete | Auto-closure blocked, check required evidence, review hold    |
| 10  | `CAPTURE_PENDING`  | `/completion-capture-pending`  | `907:7708` | `907:10608` | ✅ Complete | Payment capture pending, view captured/failed demo paths      |
| 11  | `CAPTURE_SUCCESS`  | `/completion-capture-success`  | `907:7809` | `907:10709` | ✅ Complete | Payment captured demo, view receipt routes to /receipt        |
| 12  | `CAPTURE_FAILED`   | `/completion-capture-failed`   | `907:7910` | `907:10810` | ✅ Complete | Payment capture failed, reauth options to /auth-expired       |
| 13  | `AUTH_EXPIRED`     | `/completion-auth-expired`     | `907:8011` | `907:10911` | ✅ Complete | Card authorization expired, request new auth CTA              |
| 14  | `REAUTH`           | `/completion-reauth`           | `907:8112` | `907:11012` | ✅ Complete | Fresh customer authorization intake to capture pending        |
| 15  | `RECEIPT`          | `/completion-receipt`          | `907:8213` | `907:11113` | ✅ Complete | Itemized receipt ($356.00 quote, extras, taxes, tip, refund)  |
| 16  | `RECEIPT_PENDING`  | `/completion-receipt-pending`  | `907:8320` | `907:11220` | ✅ Complete | Processing receipt status before settlement                   |
| 17  | `RECEIPT_REFUNDED` | `/completion-receipt-refunded` | `907:8427` | `907:11327` | ✅ Complete | Refund-adjusted receipt with link to refund review            |
| 18  | `RECEIPT_UPDATED`  | `/completion-receipt-updated`  | `907:8534` | `907:11434` | ✅ Complete | Updated receipt reflecting modified line items & dispute      |
| 19  | `RATING`           | `/completion-rating`           | `907:8641` | `907:11541` | ✅ Complete | 5-star service evaluation entry, star selector & comment      |
| 20  | `RATING_LOCKED`    | `/completion-rating-locked`    | `907:8748` | `907:11648` | ✅ Complete | Rating submission locked state when unverified or expired     |
| 21  | `RATING_1`         | `/completion-rating-1`         | `907:8855` | `907:11755` | ✅ Complete | 1-star dissatisfaction rating with review composition         |
| 22  | `RATING_2`         | `/completion-rating-2`         | `907:8962` | `907:11862` | ✅ Complete | 2-star service improvement rating with review composition     |
| 23  | `RATING_3`         | `/completion-rating-3`         | `907:9069` | `907:11969` | ✅ Complete | 3-star neutral service rating with review composition         |
| 24  | `RATING_4`         | `/completion-rating-4`         | `907:9176` | `907:12076` | ✅ Complete | 4-star positive service rating with review composition        |
| 25  | `RATING_5`         | `/completion-rating-5`         | `907:9283` | `907:12183` | ✅ Complete | 5-star outstanding service rating with review composition     |
| 26  | `RATING_SENT`      | `/completion-rating-sent`      | `907:9390` | `907:12290` | ✅ Complete | Review submitted confirmation, link to moderation and history |
| 27  | `RATING_FAILED`    | `/completion-rating-failed`    | `907:9497` | `907:12397` | ✅ Complete | Review submission failure exception, safe retry and support   |
| 28  | `RATING_REVIEW`    | `/completion-rating-review`    | `907:9604` | `907:12504` | ✅ Complete | Review under moderation notice, Admin oversight and support   |

---

_Document maintained by HAULIX Engineering._
