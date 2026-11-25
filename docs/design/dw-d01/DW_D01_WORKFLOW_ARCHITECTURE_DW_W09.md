# HAULIX Driver/Worker Mobile App — DW-D01
# Complete Workflow Architecture (DW-W01 — DW-W09)

**Platform:** HAULIX Mobile Platform  
**Target Applications:** `apps/driver`  
**Phase:** DW-D01  

---

## 1. Overview of Operational Workflows

The Driver and Worker Mobile Application experience is partitioned into nine distinct operational workflows. These workflows cover the full field-service lifecycle from credential intake and availability dispatching through in-transit execution, completion proof capture, and earnings distribution.

```
DW-W01: Onboarding & Auth ──► DW-W02: Verification & Eligibility ──► DW-W03: Operational Home & Availability
                                                                           │
                                                                           ▼
DW-W06: Active Service ◄─── DW-W05: Pickup & Navigation ◄─── DW-W04: Job Offers & Crew Matching
         │
         ▼
DW-W07: Completion & Proof ──► DW-W08: Earnings & Wallet Payouts ──► DW-W09: History & Support
```

---

## 2. Workflow Specifications

### DW-W01 — Onboarding & Authentication (Focus of Phase DW-D01)
- **Objective:** Secure, seamless identity onboarding and session management for drivers and helpers.
- **Canonical Screens:**
  1. Welcome / Intro Hero Screen
  2. Language Selection (Instant English ↔ Spanish toggle)
  3. Phone Number Entry & Authentication
  4. OTP SMS Code Verification
  5. Password Login (Alternative for returning drivers)
  6. Forgot / Reset Password Flow
  7. Terms of Service, Independent Contractor Agreement & Privacy Consent
  8. Authentication Error & Network Retry Views

### DW-W02 — Driver/Worker Eligibility & Document Verification
- **Objective:** Collect and verify credentials required for operating commercial transport in Arizona.
- **Key Modules:**
  - Role confirmation (Driver with Vehicle vs Helper/Laborer)
  - Government ID / SSN / Tax verification
  - Driver's License capture (Front & Back) with automated OCR check
  - Vehicle Registration, VIN, make/model/year, and license plate
  - Commercial / Personal Auto Insurance policy document upload
  - Background Check (MVR & Criminal Record) status tracker
  - Pending Review, Verification Approved, and Document Expired exception screens

### DW-W03 — Operational Home & Availability Dashboard
- **Objective:** Command center for field crews to signal readiness and monitor active operations.
- **Key Modules:**
  - Online / Offline toggle with GPS background tracking disclosure
  - Shift readiness checklist (Vehicle fuel/battery, equipment straps, hand truck)
  - Daily earnings summary snippet
  - Recent announcements / weather & traffic advisories
  - Quick action: "Go Online" to receive dispatches

### DW-W04 — Job Offers & Crew Assignment
- **Objective:** Transparent, time-sensitive dispatch matching with clear distance, scope, and payout previews.
- **Key Modules:**
  - Incoming job broadcast card with tiered radius expiry per SRS DP-01–18 (10/20/30/40/50 mi expansion at 0/2/4/6/8 min; 15-min scheduled-offer cap; no arbitrary 60s timer)
  - Job details preview: Category (Furniture, Mattress, Retail), item count, pickup address, dropoff address, estimated duration, and guaranteed payout
  - Crew matching: Displays designated Helper name and contact
  - Accept Offer / Decline Offer / Offer Expired states
  - Reassignment and cancellation recovery alerts

### DW-W05 — Pickup, Navigation & Arrival
- **Objective:** Reliable navigation to origin and secure on-site check-in.
- **Key Modules:**
  - One-tap navigation trigger (Google Maps / Waze deep links)
  - Arrival at Pickup button with geofence proximity verification
  - Customer arrival notification and 4-digit Service PIN entry sheet
  - Delayed arrival / heavy traffic reporting
  - Customer unavailable / gate access issue escalation

### DW-W06 — Active Service & Scope Management
- **Objective:** Accurate item verification, loading tracking, transport, and real-time scope revisions.
- **Key Modules:**
  - Interactive inventory checklist (e.g. 1 sofa, 2 mattresses, 1 dining table)
  - Pre-existing damage photo documentation
  - Extra items detected flow: Submit scope revision request with added price to customer
  - In-transit tracking view with cargo secure verification
  - Arrival at destination and unloading progress tracker

### DW-W07 — Completion & Dispute Lifecycle
- **Objective:** Comprehensive proof of delivery capture and handoff to the 24-hour auto-closure review period.
- **Key Modules:**
  - Two-tile delivery proof photo capture (matching Customer App W08)
  - Completion checklist (items placed, packaging cleared, no property damage)
  - Final job submission trigger
  - Customer acknowledgement pending notice (explaining 24-hour auto-closure window)
  - Completion dispute hold / admin mediation review screen

### DW-W08 — Earnings, Tips & Wallet Payouts
- **Objective:** Transparent payout tracking, itemized trip earnings, tips, and direct deposit withdrawals.
- **Key Modules:**
  - Trip earnings ledger (Base fare + Mileage + Heavy item bonus + Helper allowance + 100% Tips)
  - Available balance vs Pending balance (held during dispute review)
  - Instant Payout trigger via Stripe Express / Direct Deposit
  - Weekly payout history and downloadable 1099 tax summaries

### DW-W09 — Job History, Profile & Support
- **Objective:** Retrospective trip auditing, equipment management, and rapid safety support.
- **Key Modules:**
  - Completed trips archive with route receipts and proof photos
  - Vehicle maintenance & equipment checklist
  - Driver / Helper profile editor and emergency contact info
  - In-app support chat and 24/7 roadside assistance hotline
