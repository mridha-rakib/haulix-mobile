# HAULIX Driver & Worker Mobile App — Phase DW-D04
# DW-D05 Pickup Navigation, Chat & Connection Interruption Handoff Specification

**Source Phase:** DW-D04 (Job Offers, Dispatch Matching & Crew Formation)  
**Target Next Phase:** DW-D05 (Pickup Routing, Navigation, In-Job Chat & Connection Recovery)  
**Target Module:** DW-W05 (Pickup, Turn-by-turn Navigation & Communication)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  

---

## 1. Handoff Readiness & Entrance Criteria

Phase DW-D04 establishes the locked assignment and crew readiness required to commence physical travel:
1. **Assignment Lock Confirmed:** Primary Driver has locked the dispatch atomically (`DW11` ➔ `DISPATCH_ACCEPTED`).
2. **Crew Readiness Signed Off:** If booking requires 2 workers, both Driver and Helper have confirmed safety equipment and physical departure on `DW16 · Crew readiness`.
3. **Customer State Transition:** Customer client transitions from `C12 · Driver assigned` to `C13 · Driver on the way`.

---

## 2. DW-D05 Target Screen Scope (6 Canonical States / 12 Bilingual Variants)

| Screen ID | Canonical Title | Primary Role | EN Node ID | ES Node ID | Core Functionality |
|:---:|:---|:---:|:---:|:---:|:---|
| **DW17** | Active job | Primary Driver | `1086:405` | `1088:734` | Full-screen Mapbox turn-by-turn GPS routing to customer pickup, arrival CTA, speed & ETA |
| **DW18** | Job messages | Driver & Helper | `1086:459` | `1088:788` | In-app 3-way messaging (Customer, Driver, Helper), canned safety messages, voice notes |
| **DW34** | Connection interrupted | Driver & Helper | `1086:1188` | `1088:1517` | Offline mode banner, local action cache, retry sync button during intermittent cell loss |
| **DW47** | Message status | Driver & Helper | `1301:837` | `1301:2079` | Message delivery receipts (Sent, Delivered, Read), failed delivery indicator, retry CTA |
| **DW50** | Location and network | Driver & Helper | `1301:1097` | `1301:2339` | OS background GPS & network permissions education, location service troubleshooting |
| **DW62** | Helper active job | Crew Helper | `1309:954` | `1309:1677` | Helper passenger view: driver vehicle tracking, arrival at pickup origin confirmation |

---

## 3. Key Technical & Operational Invariants for DW-D05

1. **Role-Specific Navigation Routing (`RO-04`):**
   - Primary Driver drives vehicle (`DW17` turn-by-turn routing with speed alerts and maneuver cards).
   - Crew Helper rides as passenger or commutes independently to site (`DW62` passenger transit view with driver ETA and pickup address).
2. **Offline Resilience & Cached Operations (`NFR-03`, `DW34`):**
   - Intermittent cellular connectivity loss in underground parking or rural Arizona areas must not crash the client or lose state.
   - Arrival timestamps and message queues must store locally in MMKV/SQLite and sync automatically upon reconnection.
3. **Customer Tracking Continuity (`RES-D03-05`):**
   - High-frequency background location streaming (5s interval) remains mandatory across `DW17` and `DW62` to drive the live customer map on `C13`.
