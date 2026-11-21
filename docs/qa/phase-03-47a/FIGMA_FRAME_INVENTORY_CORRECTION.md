# Phase 03.47A Figma Frame Inventory Correction

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/FIGMA_FRAME_INVENTORY_CORRECTION.md`  
**FIGMA SOURCE:** Student Team Authorized Copy `meiXxwUNJaDo0a3mhcHBXv`  
**STATUS:** RECONCILED & AUTHORITATIVE

---

## 1. Discrepancy Overview

In earlier phases, before direct Figma MCP access was unblocked via the Student Team copy, node IDs and state names for Workflow 05 were partially estimated or derived from informal handoff notes.

During Phase 03.47 and verified in 03.47A, the entire Figma document hierarchy was systematically traversed. This audit uncovered the exact 20 canonical state pairs (40 total bilingual artboards) that constitute Workflow 05.

---

## 2. Reconciled Node Identification Table

| #   | State Key          | Correct State Name                   | Canonical Route           | Figma EN Node | Figma ES Node | Previous Guessed Node  | Status                  |
| --- | ------------------ | ------------------------------------ | ------------------------- | ------------- | ------------- | ---------------------- | ----------------------- |
| 01  | `S10`              | Initial Search (10 mi)               | `/searching-for-driver`   | `844:4571`    | `844:6721`    | `844:4571`             | **Delivered**           |
| 02  | `S20`              | Expanded Search (20 mi)              | `/search-expanded-20mi`   | `844:4670`    | `844:6820`    | `844:4670`             | **Delivered**           |
| 03  | `S30`              | Expanding Radius (30 mi)             | `/search-expanding-30mi`  | `844:4769`    | `844:6919`    | `844:4769`             | **Delivered**           |
| 04  | `S40`              | Expanded Search (40 mi)              | `/search-expanded-40mi`   | `844:4868`    | `844:7018`    | `844:4868`             | **Delivered**           |
| 05  | `S50`              | Searching Max Radius (50 mi)         | `/search-expanded-50mi`   | `844:4967`    | `844:7117`    | `844:4967`             | **Delivered**           |
| 06  | `ACCEPT_PENDING`   | Driver Offer Extended (Accept Timer) | `/driver-offer-pending`   | `844:5066`    | `844:7216`    | `844:5066`             | Remaining (Phase 03.48) |
| 07  | `ASSIGNED`         | Driver Matched / Confirmed           | `/driver-matched`         | `844:5165`    | `844:7315`    | `844:5165`             | **Delivered**           |
| 08  | `DRIVER_DETAILS`   | Driver Profile & Vehicle Specs       | `/driver-profile-details` | `844:5284`    | `844:7434`    | `844:5264` (inbound)   | Remaining (Phase 03.48) |
| 09  | `HELPER_PENDING`   | Helper Selection & Match             | `/helper-matching`        | `844:5403`    | `844:7553`    | `844:5363`             | Remaining (Phase 03.48) |
| 10  | `HELPER_CONFIRMED` | Crew Confirmed & En Route            | `/crew-tracking`          | `844:5522`    | `844:7672`    | `844:5462`             | **Delivered**           |
| 11  | `RESTART`          | Dispatch Restart / Retry             | `/dispatch-retry`         | `844:5641`    | `844:7791`    | `844:5641` (telemetry) | Remaining (Phase 03.48) |
| 12  | `REASSIGNED`       | Driver Reassigned                    | `/driver-reassigned`      | `844:5740`    | `844:7890`    | `844:5740`             | **Delivered**           |
| 13  | `DRIVER_LATE`      | Driver Delayed / Late                | `/driver-arrival-update`  | `844:5859`    | `844:8009`    | `844:5859`             | **Delivered**           |
| 14  | `NO_SHOW`          | Driver / Customer No-Show            | `/no-show-resolution`     | `844:5978`    | `844:8128`    | `844:5971` (expired)   | Remaining (Phase 03.48) |
| 15  | `NO_DRIVER`        | No Driver Available (50 mi)          | `/no-driver-available`    | `844:6070`    | `844:8220`    | `844:6070`             | **Delivered**           |
| 16  | `CANCEL_REVIEW`    | Cancellation Windows Review          | `/cancellation-windows`   | `844:6162`    | `844:8312`    | `844:6162`             | **Delivered**           |
| 17  | `CANCELED`         | Request Canceled (Fee-Free)          | `/request-canceled`       | `844:6254`    | `844:8404`    | `844:6254`             | **Delivered**           |
| 18  | `RESCHEDULE`       | Reschedule Booking Options           | `/reschedule-booking`     | `844:6346`    | `844:8496`    | `844:6346` (fee summ)  | Remaining (Phase 03.48) |
| 19  | `SUPPORT`          | Customer Support Contact             | `/dispatch-support`       | `844:6445`    | `844:8595`    | `844:6438` (recovery)  | Remaining (Phase 03.48) |
| 20  | `W06_BRIDGE`       | Active Delivery Handoff (W06)        | `/delivery-active-bridge` | `844:6537`    | `844:8687`    | None                   | Remaining (Phase 03.48) |

---

## 3. Key Corrections Noted

1. **State 08:** The composition is specifically `Driver Profile Details` (`844:5284` EN / `844:7434` ES) showing driver ratings, vehicle registration, and cargo capacity.
2. **State 11:** Identified as `Dispatch Restart / Retry` (`844:5641` EN / `844:7791` ES) offering immediate re-dispatch search.
3. **State 14:** Identified as `No-Show Resolution` (`844:5978` EN / `844:8128` ES) handling the grace period timer before cancellation.
4. **State 18:** Identified as `Reschedule Booking Options` (`844:6346` EN / `844:8496` ES) offering date/time slot recovery.
5. **State 19:** Identified as `Customer Support Contact` (`844:6445` EN / `844:8595` ES) with live dispatch ticket escalation.
6. **State 20:** Identified as `W06 Bridge / Active Tracking Launch` (`844:6537` EN / `844:8687` ES) establishing the bridge between W05 Dispatch and W06 Live Delivery.
