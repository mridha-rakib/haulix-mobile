# HAULIX Customer Mobile App — Phase 03.47

# Cancellation Policy Source Conflict Resolution

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/CANCELLATION_POLICY_SOURCE_CONFLICT_RESOLUTION.md`  
**CONCERN:** Reconciliation of Contradictory Cancellation Terms in Documentation vs Demo Fixtures  
**STATUS:** RECONCILED & STANDARDIZED

---

## 1. Problem & Historical Discrepancy

Prior Phase 03.46 reports contained conflicting descriptions of HAULIX cancellation terms:

- **Discrepancy A (Some QA Docs):** Claimed a "2-minute grace period", a "$25 post-dispatch fee", and a "$50 arrival fee".
- **Discrepancy B (Codebase Fixture `c32Dispatch.ts`):** Implemented a "5-minute grace period" and a "conditional illustrative $100.00 fee".

These two policies cannot both be the approved production business requirement.

---

## 2. Source-of-Truth Hierarchy & SRS Analysis

To resolve this conflict truthfully:

1. **SRS Authority:** The signed HAULIX SRS v1.6 (Section BK-04 / DP-08) specifies that during the active dispatch search and within the initial post-match grace window, all customer cancellations must remain **100% fee-free**.
2. **Figma UI Authority:** Approved Figma frames (`844:6162` and `844:8312`) display:
   - "Fee-free cancellation while searching for a driver"
   - "5-minute fee-free grace period once driver is matched"
   - "Illustrative $100.00 fee if cancelled after 5 minutes en route (subject to arrival delay waivers)"
3. **Frontend Boundary:** In the frontend mobile client, all monetary figures are strictly non-binding prototype demonstration values. No live credit card is pre-authorized or charged.

---

## 3. Authoritative Standardized Terms

The canonical cancellation policy across all HAULIX Customer App fixtures and documentation is hereby established:

| Phase                   | Time Window                           | Fee Status                  | Displayed Fee       |
| ----------------------- | ------------------------------------- | --------------------------- | ------------------- |
| **Searching (S10–S50)** | Any time before driver match          | **100% Fee-Free**           | $0.00               |
| **Driver Matched**      | First 5 minutes post-match            | **Fee-Free Grace Period**   | $0.00               |
| **Crew En Route**       | > 5 min post-match, on schedule       | Conditional Dispatch Fee    | $100.00 (Demo Only) |
| **Driver Delayed**      | Driver ETA exceeds window by > 15 min | **Delay Waiver (Fee-Free)** | $0.00               |
| **No Driver Found**     | System search exhausts 50 miles       | **Automatic Fee-Free Exit** | $0.00               |

All references to "$25 / $50" or "2-minute" policies are historical drafting artifacts and are explicitly superseded by the 5-minute / $100 illustrative policy above.

---

## 4. No-Guard Route Compliance

In accordance with Phase 03.47 unrestricted routing rules:

- Cancellation screens (`/cancellation-windows`, `/request-canceled`) can be accessed directly at any time.
- Navigating to `/request-canceled` renders the cancellation outcome UI for QA evaluation without triggering an actual backend cancellation mutation or mutating other booking state.
