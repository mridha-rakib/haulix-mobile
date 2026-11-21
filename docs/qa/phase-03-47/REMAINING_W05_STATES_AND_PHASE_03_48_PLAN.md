# HAULIX Customer Mobile App — Phase 03.47
# Remaining W05 States & Phase 03.48 Execution Plan

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/REMAINING_W05_STATES_AND_PHASE_03_48_PLAN.md`  
**STATUS:** PLANNED & SCOPED FOR PHASE 03.48  

---

## 1. Remaining W05 Canonical Compositions (8 States / 16 Frames)

With 12 states now fully delivered (Phases 03.43–03.47), the remaining 8 canonical compositions in the Figma design (`meiXxwUNJaDo0a3mhcHBXv`) are:

| State # | Canonical State Name | Proposed Route | Figma Frame (EN) | Figma Frame (ES) | Target Phase |
|---|---|---|---|---|---|
| **06** | Driver Offer Extended (Accept Pending)| `/driver-offer-pending` | `844:5066` | `844:7216` | Phase 03.48 (Batch 4) |
| **08** | Driver Assigned & Inbound | `/driver-inbound` | `844:5264` | `844:7414` | Phase 03.48 (Batch 4) |
| **09** | Helper Selection & Match | `/helper-matching` | `844:5363` | `844:7513` | Phase 03.48 (Batch 4) |
| **10** | 2-Person Crew Assembled | `/crew-assembled` | `844:5462` | `844:7612` | Phase 03.48 (Batch 4) |
| **12** | Telemetry & Approaching | `/crew-approaching` | `844:5641` | `844:7791` | Phase 03.48 (Batch 5) |
| **15** | Arrival Tolerance Exceeded | `/driver-arrival-expired`| `844:5971` | `844:8121` | Phase 03.48 (Batch 5) |
| **19** | Cancellation Fee Settlement | `/cancellation-fee-summary`| `844:6346`| `844:8496`| Phase 03.48 (Batch 5) |
| **20** | Post-Cancel Recovery / New Booking | `/dispatch-recovery-options`| `844:6438`| `844:8588`| Phase 03.48 (Batch 5) |

---

## 2. Phase 03.48 Recommended Execution Plan

Phase 03.48 will complete Workflow 05 (100% of all 20 canonical compositions):

### Recommended Batch 4 Scope:
1. **States 06, 08, 09, 10:**
   - Driver Offer Extended (`/driver-offer-pending`)
   - Driver Inbound (`/driver-inbound`)
   - Helper Matching (`/helper-matching`)
   - Crew Assembled (`/crew-assembled`)
2. **Authentic Asset Ingestion:** Export remaining 4 English and 4 Spanish map rasters from Figma.
3. **No-Guard Routing:** Ensure all new screens remain directly accessible via QA Navigator and deep-link.
4. **Physical Device QA:** Verify rendering and interaction on Realme Note 60.

---

## 3. Strict Boundary Rules for Phase 03.48

- **DO NOT** implement W06 (In-Transit Job Tracking) until all 20 W05 screens are delivered.
- **DO NOT** introduce live driver geolocation streams or real Stripe payment captures.
- **DO NOT** introduce authentication or state guards that interrupt APK flow testing.
