# HAULIX Customer Mobile App — Master Screen & UX State Inventory

## Workflows W01 through W08 End-to-End Mapping & W05 20/20 Canonical Reconciliation

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Status:** W05 Complete (20/20 States) · W06 Batch 1 Complete (6/6 Canonical States, 12 Bilingual Variants)  
**Date:** November 22, 2026

---

## 1. Executive Summary & Architecture Overview

The HAULIX Customer Mobile App frontend provides a 100% deterministic, zero-guard UX prototype of all core workflows from onboarding (W01) through active service execution (W06), completion/tipping (W07), and support/cancellation (W08).

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

## 4. Workflow 06: Active Service (Batch 1: 6 Canonical States — Complete)

Figma Parent Sections: `881:5131` (English) and `881:5132` (Spanish).

| #   | Canonical State | Route Path                            | Figma EN   | Figma ES   | Status      | Key Actions & UI Components                     |
| --- | --------------- | ------------------------------------- | ---------- | ---------- | ----------- | ----------------------------------------------- |
| 01  | `PRE`           | `/active-service-awaiting-departure`  | `882:5131` | `883:5495` | ✅ Complete | Privacy banner (location hidden), Marcus Vance  |
| 02  | `ENROUTE`       | `/active-service-en-route`            | `882:5245` | `883:5609` | ✅ Complete | Illustrative map, top-left overlay badge, 4 pcs |
| 03  | `ETA_PENDING`   | `/active-service-eta-pending`         | `882:5356` | `883:5720` | ✅ Complete | Route provider sync card, privacy badge         |
| 04  | `GPS_OFFLINE`   | `/active-service-gps-offline`         | `882:5470` | `883:5834` | ✅ Complete | Offline coordinates badge, direct driver action |
| 05  | `GPS_DENIED`    | `/active-service-gps-denied`          | `882:5584` | `883:5948` | ✅ Complete | Permission restricted badge, driver support     |
| 06  | `ARRIVED`       | `/active-service-driver-arrived`      | `882:5698` | `883:6062` | ✅ Complete | Destination map, arrival badge, PIN 8492        |

---

## 5. Upcoming Workflow 06 Batch 2 & W07/W08 Roadmap

Workflow 06 Batch 2 covers the active loading, transport, and unloading lifecycle:

1. Pre-Trip Inspection & Condition Photos
2. Loading in Progress
3. Transit & Live Route Progress
4. Arrival at Destination
5. Unloading & Placement
6. Job Completion, Sign-off & Tip (W07)
7. Customer Support & Incident Reporting (W08)

---

_Document maintained by HAULIX Engineering._
