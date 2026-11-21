# Phase 03.47A Unrestricted Customer Routing Matrix

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/UNRESTRICTED_CUSTOMER_ROUTING_MATRIX.md`  
**POLICY:** 100% UNRESTRICTED FRONTEND ROUTING (ZERO GUARDS)  
**STATUS:** VERIFIED ON HARDWARE

---

## 1. Zero-Guard Architecture Policy

In accordance with strict project owner requirements:

1. **Zero Authentication Guards:** No route in the Customer Mobile App may redirect unauthenticated users to `/login` or block access to any flow screen.
2. **Zero Prerequisite Guards:** No route may verify whether a booking has been created, whether a vehicle has been selected, or whether a payment intent exists.
3. **Zero Role Guards:** No route may inspect backend roles or simulate role transitions locally.
4. **Universal Deep-Linkability:** Every screen in Workflow 01 through Workflow 05 must mount directly from an external URI or QA Navigator click.

---

## 2. Complete Routing Access Audit for W05 Routes

| Route Path               | Screen Identity                      | Auth Guard? | Prereq Guard? | Deep-Link Test Status     |
| ------------------------ | ------------------------------------ | ----------- | ------------- | ------------------------- |
| `/searching-for-driver`  | S10 — Initial Search (10 mi)         | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/search-expanded-20mi`  | S20 — Expanded (20 mi)               | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/search-expanding-30mi` | S30 — Expanding (30 mi)              | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/search-expanded-40mi`  | S40 — Expanded (40 mi)               | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/search-expanded-50mi`  | S50 — Searching Max (50 mi)          | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/driver-matched`        | ASSIGNED — Driver Matched            | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/crew-tracking`         | HELPER_CONFIRMED — Crew En Route     | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/driver-arrival-update` | DRIVER_LATE — Driver Delayed         | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/driver-reassigned`     | REASSIGNED — Driver Reassigned       | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/no-driver-available`   | NO_DRIVER — No Driver at 50 mi       | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/cancellation-windows`  | CANCEL_REVIEW — Cancellation Windows | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |
| `/request-canceled`      | CANCELED — Request Canceled          | **NONE**    | **NONE**      | **PASSED (Direct Mount)** |

---

## 3. Fallback and Fixture Safety

When screens are mounted directly without upstream context:

- Default booking fixture: `HX-AZ-DEMO-0042`
- Default service: `Furniture removal · 1 sofa + 2 chairs`
- Default price: `$356.00 · DEMO`
- Default location: `Phoenix, AZ`
- Default ETA: `11 min` (or 24 min in delayed states)
  This guarantees that any screen can be visually evaluated, audited, and tested on physical hardware without needing an active backend session.
