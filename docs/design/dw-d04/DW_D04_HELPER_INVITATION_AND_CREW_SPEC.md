# HAULIX Driver & Worker Mobile App — Phase DW-D04
# Technical Specification: Helper Invitations, Crew Formation & Readiness

**Module Code:** DW-W04 (Offers, Broadcasts & Crew Matching)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`WK-01–06`, `WK-12`, `BK-08–14`, Appendix C p.24, Crosswalk Frame `1329:1824`)

---

## 1. Architectural Scope & Overview

Multi-person moving operations require synchronized crew formation. The HAULIX crew model enforces strict role independence:
1. **Driver Delegation (`DW13`, `DW48`):** Primary Drivers select and invite vetted Helpers from their favorite roster or nearby active candidates.
2. **Driver Waiting State (`DW49`):** Non-blocking countdown state allowing drivers to await helper response or cancel invitation.
3. **Helper Review & Acceptance (`DW14`, `DW15`):** Helpers review trip details, cargo scope, and their exact payout share before independently accepting or declining.
4. **Mutual Crew Readiness (`DW16`):** Dual confirmation checklist ensuring both crew members have appropriate safety gear, are physically co-located or en route, and are ready for pickup departure.

---

## 2. Driver Helper Invitation Workflow (`DW13`, `DW48`, `DW49`)

```
[DW11: Job Accepted] ➔ (Requires 2-Person Crew)
      │
      ▼
[DW13: Invite a Helper] ──(Search / Select)──► [DW48: Choose a Helper]
      │                                                │
      │◄────────────────(Helper Selected)──────────────┘
      │
      ▼
[Send Crew Invitation] ➔ [DW49: Invitation Pending]
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
     [Helper Accepts]                      [Helper Declines / 3-min Timeout]
            │                                     │
            ▼                                     ▼
[DW16: Crew Readiness]                     [Return to DW48 to Select Another]
```

### 2.1 Choosing a Helper (`DW48`)
- **Node IDs:** EN `1301:920`, ES `1301:2162`.
- **Roster Sorting:**
  1. *Favorite Helpers:* Previously paired helpers with rating ≥ 4.8.
  2. *Proximity:* Verified helpers closest to pickup origin (e.g. `2.4 mi away`).
  3. *Availability:* Only helpers currently toggled `ONLINE` on `DW31`.
- **Navigation Bar Status:** Active tab is **Jobs** (`VariableID:5:7` accent fill `#BAFF42` on Jobs icon and label; Profile is inactive; trigger `1301:987` links to `DW27` Profile).

### 2.2 Invitation Pending State (`DW49`)
- **Node IDs:** EN `1301:1010`, ES `1301:2252`.
- **Countdown Clock:** 3-minute response timer.
- **Cancel Option:** Driver may tap `CANCEL INVITATION` to immediately release the pending lock and return to `DW48`.
- **Fallback / Auto-Dispatch:** If the invited helper does not accept within 3 minutes, the system notifies the driver and prompts whether to invite another helper or request automated regional helper matching.

---

## 3. Helper Invitation Inbox & Review (`DW14`, `DW15`)

### 3.1 Helper Invitations Inbox (`DW14`)
- **Node IDs:** EN `1086:268`, ES `1088:597`.
- **Active Navigation Tab:** Jobs (`Navigation / 5 Tabs / Active Jobs`).
- **Invitation Card Elements:**
  - Driver photo, name, and pairing rating (e.g. `Marcus T. · 4.9 ★`).
  - Vehicle type (e.g. `16ft Box Truck`).
  - Pickup location and scheduled time.
  - Helper guaranteed payout share (e.g. `$58.00 GUARANTEED`).
  - Actions: `REVIEW` ➔ `DW15`, `QUICK DECLINE`.

### 3.2 Review Invitation (`DW15`)
- **Node IDs:** EN `1086:328`, ES `1088:657`.
- **Detailed Inspection:**
  - Full item cargo list (sofas, appliances, weight categories).
  - Estimated physical labor duration (e.g. `~2.5 hrs loading/unloading`).
  - Payout breakdown: 35% base trip share + 100% helper tip allocation.
- **Independent Acceptance Rule (`WK-12`):**
  - Drivers CANNOT sign or accept on behalf of Helpers.
  - Helpers must tap `ACCEPT INVITATION` personally on their device.
  - On acceptance ➔ updates booking state to `CREW_FORMED`, notifies driver, and transitions helper to `DW16 · Crew readiness`.

---

## 4. Mutual Crew Readiness Protocol (`DW16`)

- **Node IDs:** EN `1086:365`, ES `1088:694`.
- **Applicable Role:** Primary Driver & Crew Helper.
- **Pre-Departure Safety Checklist:**
  1. `[x] Heavy-duty work gloves equipped`
  2. `[x] Steel-toe / non-slip footwear confirmed`
  3. `[x] Moving straps & dolly inspected (Driver)`
  4. `[x] Valid government ID present`
- **Departure Confirmation:**
  - Once both driver and helper check all items and tap `CONFIRM READINESS`, the assignment advances to `EN_ROUTE_TO_PICKUP`.
  - Driver transitions to `DW17 · Active job / Navigation`.
  - Helper transitions to `DW62 · Helper active job / Passenger routing`.
