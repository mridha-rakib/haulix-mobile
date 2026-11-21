# Phase 03.47A Phase 03.48 Corrected Scope Recommendation

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/PHASE_03_48_CORRECTED_SCOPE_RECOMMENDATION.md`  
**NEXT PHASE:** Phase 03.48 (Final Batch of Workflow 05)  
**STATUS:** SCOPE LOCKED & ROADMAP ESTABLISHED

---

## 1. Remaining Canonical W05 Inventory (8 Compositions / 16 Frames)

With 12 of the 20 W05 compositions delivered and accepted on physical hardware through Phase 03.47A, exactly 8 canonical compositions remain to achieve 100% W05 completion:

| State Key        | True Figma Node (EN) | True Figma Node (ES) | Composition Description              | Proposed Route            | Priority Batch                |
| ---------------- | -------------------- | -------------------- | ------------------------------------ | ------------------------- | ----------------------------- |
| `ACCEPT_PENDING` | `844:5066`           | `844:7216`           | Driver Offer Extended (Accept Timer) | `/driver-offer-pending`   | Batch 4 (Phase 03.48)         |
| `DRIVER_DETAILS` | `844:5284`           | `844:7434`           | Driver Profile & Vehicle Specs       | `/driver-profile-details` | Batch 4 (Phase 03.48)         |
| `HELPER_PENDING` | `844:5403`           | `844:7553`           | Helper Matching / Crew Building      | `/helper-matching`        | Batch 4 (Phase 03.48)         |
| `RESTART`        | `844:5641`           | `844:7791`           | Dispatch Restart / Retry Search      | `/dispatch-retry`         | Batch 4 (Phase 03.48)         |
| `NO_SHOW`        | `844:5978`           | `844:8128`           | Driver / Customer No-Show Resolution | `/no-show-resolution`     | Batch 5 (Phase 03.48 / 03.49) |
| `RESCHEDULE`     | `844:6346`           | `844:8496`           | Reschedule Booking Options           | `/reschedule-booking`     | Batch 5 (Phase 03.48 / 03.49) |
| `SUPPORT`        | `844:6445`           | `844:8595`           | Customer Support Dispatch Ticket     | `/dispatch-support`       | Batch 5 (Phase 03.48 / 03.49) |
| `W06_BRIDGE`     | `844:6537`           | `844:8687`           | Active Delivery Tracking Launch      | `/delivery-active-bridge` | Batch 5 (Phase 03.48 / 03.49) |

---

## 2. Immediate Next Steps for Phase 03.48 (Batch 4)

1. **Ingest Authentic Map Rasters:**
   - Ingest Figma PNGs for `ACCEPT_PENDING` (`844:5066` / `844:7216`), `DRIVER_DETAILS` (`844:5284` / `844:7434`), `HELPER_PENDING` (`844:5403` / `844:7553`), and `RESTART` (`844:5641` / `844:7791`).
2. **Implement Expo Router Screens:**
   - Create route files under `apps/customer/app/(app)/`.
   - Maintain 100% UNRESTRICTED ROUTING (zero auth or prerequisite guards).
3. **Register in QA Navigator:**
   - Add entries in `QaScreenNavigator.tsx` under `W05 Dispatch & Assignment`.
4. **Physical Device QA:**
   - Capture on Realme Note 60 via Metro Expo Go deep links (`exp://127.0.0.1:8085/--/<route>`).
   - Generate side-by-side comparison panels against Figma source frames.
