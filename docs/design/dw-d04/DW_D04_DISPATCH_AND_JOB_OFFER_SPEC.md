# HAULIX Driver & Worker Mobile App — Phase DW-D04
# Technical Specification: Dispatch Matching, Broadcast Expansion & Job Offers

**Module Code:** DW-W04 (Offers, Broadcasts & Crew Matching)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  
**Reference Design Resolution:** 430 × 932 px (iOS / Android Multi-platform Canvas)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`DP-01–18`, `BK-01–14`, `NFR-02`, Appendix C p.24, Crosswalk Frame `1329:1824`)

---

## 1. Architectural Scope & Overview

Phase DW-D04 governs the critical dispatch lifecycle bridging customer order creation and physical service initiation:
1. **Broadcast & Radial Ring Expansion (`DW10`):** Automated dispatch queue matching based on vehicle tier, operating hours, active online status, and distance rings.
2. **Cargo Breakdown & Payout Preview (`DW11`):** Transparent scope review displaying guaranteed driver earnings, itemized cargo load, customer notes, and route geometry.
3. **Atomic Concurrency & Recovery (`DW12`):** Race-condition resolution ensuring exactly one primary driver locks an assignment, with graceful recovery for peer drivers.

---

## 2. Dispatch Broadcast Expansion Engine (`DP-01–18`)

```
Time Elapsed:   0 min          2 min          4 min          6 min          8 min
Radial Scope:  [Ring 1: 10mi] ➔ [Ring 2: 20mi] ➔ [Ring 3: 30mi] ➔ [Ring 4: 40mi] ➔ [Ring 5: 50mi]
Driver Filter: ONLINE + Vehicle Match + Working Hours + Max Radius Filter Setting
```

### 2.1 Ring Expansion Timing Rules
- **Ring 1 (Initial Wave, 0–2 min):** Eligible drivers within 10 miles of pickup origin.
- **Ring 2 (Wave 2, 2–4 min):** Expansion to 20 miles.
- **Ring 3 (Wave 3, 4–6 min):** Expansion to 30 miles.
- **Ring 4 (Wave 4, 6–8 min):** Expansion to 40 miles.
- **Ring 5 (Outer Wave, 8–15 min):** Expansion to maximum regional boundary (50 miles).
- **Scheduled vs Immediate Windows:**
  - *Immediate Bookings:* 5-minute maximum broadcast window before automatic escalation to operational dispatch support.
  - *Scheduled Bookings:* Up to 15-minute broadcast window.
  - *Hard Rule:* Flat 60-second timeouts are unapproved. Offers remain active until accepted by a peer or expired.

### 2.2 Radial Ring Distance Badging on `DW10`
In `DW10 · Job offers` (`1086:81` EN, `1088:410` ES), each job offer card features:
- **Radial Ring Tag:** `10 MI RADIUS` (`VariableID:5:7` accent container) or `20 MI RADIUS`.
- **Cargo Size Badge:** `CARGO: MEDIUM` / `CARGO: LARGE`.
- **Vehicle Match Requirement:** `BOX TRUCK REQUIRED` / `CARGO VAN`.
- **Labor Requirement:** `1 DRIVER + 1 HELPER` / `SOLO DRIVER`.
- **Financial Guarantee:** Bold net driver earnings preview (e.g. `$142.50 EST. PAYOUT`).

---

## 3. Detailed Cargo Breakdown (`DW11`)

When a driver taps an offer card on `DW10`, navigation transitions to `DW11 · Job details` (`1086:162` EN, `1088:491` ES):
1. **Itemized Cargo Load:** Complete listing of customer-reported items (e.g. 1× 3-Seat Sofa, 1× Queen Mattress, 1× Dining Table, 6× Dining Chairs, 8× Moving Boxes).
2. **Access Conditions:** Floor number, elevator access status, flight of stairs flag (`STAIRS: YES / 2ND FLOOR`).
3. **Route & Distance:** Total mileage between origin and destination, estimated driving duration, pickup arrival ETA.
4. **Guaranteed Payout Disclosure:** Clear separation of:
   - Base trip fare
   - Mileage compensation
   - Labor tier compensation (Solo vs Multi-person)
   - Heavy item / stairs surcharges
   - 100% tip pass-through notice (`TIPS: 100% TO CREW`)
5. **Acceptance Actions:**
   - Primary CTA: `ACCEPT JOB` ➔ Locks dispatch atomically.
   - Secondary Link: `DECLINE / GO BACK` ➔ Returns to `DW10` offer stream without penalty.

---

## 4. Atomic Concurrency & Conflict Resolution (`DW12`)

### 4.1 Distributed Lock Specification
To prevent double-booking across concurrent mobile clients:
1. Acceptance requests execute an atomic conditional update on the backend:
   ```sql
   UPDATE orders 
   SET status = 'DISPATCH_ACCEPTED', 
       primary_driver_id = :driverId, 
       lock_version = lock_version + 1 
   WHERE id = :orderId 
     AND status = 'BROADCASTING' 
     AND lock_version = :expectedLockVersion;
   ```
2. **Winning Driver:** Receives HTTP 200 with assignment confirmation:
   - If booking requires solo labor ➔ routes immediately to `DW17 · Active job / Navigation`.
   - If booking requires helper labor ➔ routes immediately to `DW13 · Invite a Helper`.
3. **Submitting Peer Drivers:** Receive HTTP 409 Conflict:
   - App transitions immediately to `DW12 · Offer unavailable` (`1086:205` EN, `1088:534` ES).
   - Card displays: `"Another driver accepted this offer first"` or `"This offer has expired"`.
   - Action: `VIEW OTHER JOBS` ➔ returns driver smoothly to `DW09` or `DW10`.

---

## 5. Location Privacy During Dispatch (`RES-D03-05`)

In accordance with Signed SRS `NT-01–10` and `NFR-02`:
- **Online State:** While driver is toggled `ONLINE` on `DW09`, location coordinates are transmitted periodically (30s interval) to evaluate radial ring inclusion.
- **Active Assignment Lock:** Once a driver accepts an offer on `DW11`, background GPS tracking activates at high frequency (5s interval) to supply the customer tracking map (`C12`–`C16`).
- **Offline Invariant:** If a worker attempts to toggle `OFFLINE` during an active trip, the offline toggle applies only to *future* dispatch offers. Location tracking for the active order CANNOT be terminated until the order reaches `COMPLETED` or `CANCELLED`.
