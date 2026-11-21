# HAULIX Customer Mobile App — Phase 03.47 (Corrected in Phase 03.47A)

# Remaining W05 States & Phase 03.48 Execution Plan

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47 / 03.47A  
**DOCUMENT:** `docs/qa/phase-03-47/REMAINING_W05_STATES_AND_PHASE_03_48_PLAN.md`  
**STATUS:** PLANNED & SCOPED FOR PHASE 03.48 (VERIFIED AUTHENTIC FIGMA INVENTORY)

---

## 1. Remaining W05 Canonical Compositions (8 States / 16 Frames)

With 12 states now fully delivered and verified on physical hardware (Phases 03.43–03.47A), the remaining 8 canonical compositions in the Figma design (`meiXxwUNJaDo0a3mhcHBXv`) are:

| Canonical Key    | State Description                    | Proposed Route            | Figma Node (EN) | Figma Node (ES) | Target Phase          |
| ---------------- | ------------------------------------ | ------------------------- | --------------- | --------------- | --------------------- |
| `ACCEPT_PENDING` | Driver Offer Extended (Accept Timer) | `/driver-offer-pending`   | `844:5066`      | `844:7216`      | Phase 03.48 (Batch 4) |
| `DRIVER_DETAILS` | Driver Profile & Vehicle Specs       | `/driver-profile-details` | `844:5284`      | `844:7434`      | Phase 03.48 (Batch 4) |
| `HELPER_PENDING` | Helper Selection & Matching          | `/helper-matching`        | `844:5403`      | `844:7553`      | Phase 03.48 (Batch 4) |
| `RESTART`        | Dispatch Restart / Retry Search      | `/dispatch-retry`         | `844:5641`      | `844:7791`      | Phase 03.48 (Batch 4) |
| `NO_SHOW`        | Driver / Customer No-Show Resolution | `/no-show-resolution`     | `844:5978`      | `844:8128`      | Phase 03.48 (Batch 5) |
| `RESCHEDULE`     | Reschedule Booking Options           | `/reschedule-booking`     | `844:6346`      | `844:8496`      | Phase 03.48 (Batch 5) |
| `SUPPORT`        | Customer Support Dispatch Help       | `/dispatch-support`       | `844:6445`      | `844:8595`      | Phase 03.48 (Batch 5) |
| `W06_BRIDGE`     | Active Delivery Handoff Bridge       | `/delivery-active-bridge` | `844:6537`      | `844:8687`      | Phase 03.48 (Batch 5) |

---

## 2. Phase 03.48 Recommended Execution Plan

Phase 03.48 will complete Workflow 05 (bringing canonical W05 coverage to 100% of all 20 compositions):

### Recommended Batch 4 Scope (4 States):

1. **States `ACCEPT_PENDING`, `DRIVER_DETAILS`, `HELPER_PENDING`, `RESTART`:**
   - Driver Offer Extended (`/driver-offer-pending`)
   - Driver Profile & Vehicle Specs (`/driver-profile-details`)
   - Helper Matching (`/helper-matching`)
   - Dispatch Retry (`/dispatch-retry`)
2. **Authentic Asset Ingestion:** Export remaining authentic English and Spanish map rasters from Figma.
3. **No-Guard Routing:** Ensure all new screens remain directly accessible via QA Navigator and deep-link.
4. **Physical Device QA:** Verify rendering and interaction on Realme Note 60 (`RMX3930`).

---

## 3. Strict Boundary Rules for Phase 03.48

- **DO NOT** implement W06 (In-Transit Job Tracking) until all 20 W05 screens are delivered.
- **DO NOT** introduce live driver geolocation streams or real Stripe payment captures.
- **DO NOT** introduce authentication or state guards that interrupt APK flow testing.
