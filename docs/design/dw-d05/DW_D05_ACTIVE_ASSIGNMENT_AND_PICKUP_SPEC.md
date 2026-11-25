# HAULIX Driver & Worker Mobile App — Phase DW-D05
# Technical Specification: Active Assignment, Route Guidance & Pickup Arrival

**Module Code:** DW-W05 (Pickup, Turn-by-turn Navigation & Communication)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  
**Audited Canonical Screens:** `DW17 · Active job` (`1086:405` EN, `1088:734` ES) & `DW62 · Helper active job` (`1309:954` EN, `1309:1677` ES)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`RO-04`, `DP-12–16`, `BK-08–09`, Appendix C p.24, Crosswalk Frame `1329:1824`)

---

## 1. Architectural Scope & Role Segregation

Once an assignment is confirmed and crew readiness is signed on `DW16`, the system enters the transit phase to pickup. Primary Driver and Crew Helper operate under distinct operational surfaces:

```
[DW16: Crew Readiness Confirmed]
               │
       ┌───────┴───────┐
       ▼               ▼
 (Primary Driver)   (Crew Helper)
       │               │
       ▼               ▼
[DW17: Active Job]  [DW62: Helper Active Job]
 - Turn-by-Turn GPS  - Transit & Driver Vehicle Status
 - Route Map View    - Pickup Address & Arrival Sync
 - "Arrived at       - "Confirm My Arrival"
    Pickup" CTA         Independent CTA
```

---

## 2. Primary Driver Active Job (`DW17`)

- **Screen Dimensions:** 430 × 932 px.
- **Node IDs:** EN `1086:405`, ES `1088:734`.
- **Map Surface & Disclaimer (`1237:778`–`1237:795`):**
  - Displays Phoenix metropolitan routing overlay with pickup waypoint and origin route line (`1237:780`).
  - **Explicit Non-Live Disclaimer:** Contains persistent chip `1237:794` with label `NOT LIVE GPS` (`1237:795`) / `GPS NO ACTIVO`. The design explicitly acknowledges this is a simulated interface preview, NOT active turn-by-turn navigation SDK execution.
  - *Future Implementation Boundary:* Production routing will integrate Mapbox Navigation SDK (`@rnmapbox/maps`) in `apps/driver`.
- **Status Indicators:**
  - `EN ROUTE` / `EN CAMINO` badge (`1086:440` / `1088:769`).
  - Speed & ETA preview (e.g., `18 min · 6.2 mi`).
- **Communication & Arrival Actions:**
  - `Message customer` link (`1086:457` / `1088:786`): Navigates directly to `DW18 · Job messages` (`1086:459` / `1088:788`).
  - `Call customer` button: Triggers supporting modal overlay `OV-06 · Call preview` (`1305:706` / `1305:716`).
  - `Arrived at pickup · demo` CTA (`1086:455` / `1088:784`): Navigates to `DW19 · On-site job progress` (`1086:512` / `1088:841`). In production, arrival is geofence-validated against pickup GPS coordinates before unlocking customer PIN entry.

---

## 3. Helper Active Job (`DW62`)

- **Screen Dimensions:** 430 × 932 px.
- **Node IDs:** EN `1309:954`, ES `1309:1677`.
- **Role Boundary Enforcement (`RO-04`, `WK-01–06`):**
  - Helpers do not drive the commercial vehicle. The screen does NOT present turn-by-turn driving instructions.
  - Displays driver status, vehicle model, estimated arrival, and pickup address for transit coordination.
  - Accommodates both scenarios: Helper riding as passenger in the driver's vehicle OR Helper traveling independently to the job site.
- **Independent Helper Arrival Confirmation (`1309:1050` / `1309:1757`):**
  - Button: `Confirm my arrival · demo` (`LINK / DW63 / Confirm my arrival · demo`).
  - Navigates to `DW63 · Helper on-site progress` (`1309:1052` / `1309:1759`).
  - *Operational Invariant:* The Helper confirms their own physical arrival on site. A Helper cannot confirm arrival on behalf of the Primary Driver, nor can the Driver confirm on behalf of the Helper. Both workers must be on-site to commence customer PIN verification (`DW19`/`DW63`).
- **Navigation Context:**
  - Bottom navigation bar: `Navigation / 5 Tabs / Active Jobs` (`1309:970` / `1309:1693`).
  - Role-specific destinations: Home routes to `DW31` (`1309:1028` / `1309:1736`) and Profile routes to `DW55` (`1309:1027` / `1309:1735`). All interaction bounds standard at `y: 844..932` (88px).
