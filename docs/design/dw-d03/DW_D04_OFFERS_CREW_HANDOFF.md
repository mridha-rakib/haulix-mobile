# HAULIX Driver & Worker Mobile App — Phase DW-D03
# DW-D04 Job Offers, Dispatch Matching & Crew Formation Handoff Specification

**Source Phase:** DW-D03 (Operational Home & Availability Management)  
**Target Next Phase:** DW-D04 (Job Offers, Dispatch Matching & Crew Formation)  
**Target Module:** DW-W04 (Offers, Broadcasts & Crew Matching)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  

---

## 1. Handoff Readiness & Entrance Criteria

Phase DW-D03 establishes the operational home foundation required to receive and evaluate dispatches:
1. **Driver Operational Readiness:** Primary Drivers toggled `ONLINE` on `DW09` (`1086:3` / `1088:332`) enter the dispatch evaluation queue.
2. **Helper Operational Readiness:** Helpers toggled `ONLINE` on `DW31` (`1086:1058` / `1088:1387`) enter the crew candidate pool.
3. **Dispatch Filter Constraints:** Available offers are filtered by the driver's configured service radius (10–50 miles), operating days, and working hours (`DW39`).

---

## 2. DW-D04 Target Screen Scope

| Screen ID | Canonical Title | Primary Role | EN Node ID | ES Node ID | Core Functionality |
|:---:|:---|:---:|:---:|:---:|:---|
| **DW10** | Job offers | Primary Driver | `1086:81` | `1088:410` | Tiered radial dispatch offer stream, radial ring distance tags, Accept/Decline CTAs |
| **DW11** | Job details | Primary Driver | `1086:162` | `1088:491` | Full cargo breakdown (sofa, mattresses, tables), customer notes, guaranteed payout preview |
| **DW12** | Offer unavailable | Primary Driver | `1086:205` | `1088:534` | Expired offer, accepted by another driver, return to dashboard CTA |
| **DW13** | Invite a Helper | Primary Driver | `1086:231` | `1088:560` | Crew builder: Driver invites verified helper for 2-person jobs |
| **DW14** | Helper invitations | Crew Helper | `1086:268` | `1088:597` | Helper inbox: Incoming crew invitation list with driver profile, pickup origin, labor share |
| **DW15** | Review invitation | Crew Helper | `1086:328` | `1088:657` | Helper inspection view: Job scope, estimated duration, payout share, Accept/Decline actions |
| **DW16** | Crew readiness | Driver & Helper | `1086:365` | `1088:694` | Mutual readiness confirmation before vehicle departure to pickup |
| **DW48** | Choose a Helper | Primary Driver | `1301:920` | `1301:2162` | Helper selection list with proximity, rating, and favorite status |
| **DW49** | Invitation pending | Primary Driver | `1301:1010` | `1301:2252` | Waiting state for Helper acceptance with countdown timer and cancel invite option |

---

## 3. Key Design & State Machine Requirements for DW-D04

1. **Tiered Radial Dispatch Expansion (`DP-01–18`):**
   - Dispatch broadcasts expand across tiered concentric rings: 10 miles (0 min) ➔ 20 miles (2 min) ➔ 30 miles (4 min) ➔ 40 miles (6 min) ➔ 50 miles (8 min).
   - Scheduled job offers hold a 15-minute maximum broadcast window. Flat 60-second timeouts are strictly unapproved.
2. **Atomic Dispatch Acceptance (`DP-04`):**
   - The first eligible driver to accept locks the dispatch atomically on the backend. Submitting drivers receive `DW12 · Offer unavailable` if a peer accepts first.
3. **Crew Formation Independence (`WK-03–06`, `WK-12`):**
   - For multi-person bookings, the driver selects a helper (`DW13`/`DW48`), but the helper must **personally accept** (`DW15`). Drivers cannot sign for helpers.
