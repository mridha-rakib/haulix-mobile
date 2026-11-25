# HAULIX Driver & Worker Mobile App — Phase DW-D02
# DW-D03 Operational Home & Availability Dashboard Handoff Specification

**Source Phase:** DW-D02 (Credential Verification & Eligibility)  
**Target Next Phase:** DW-D03 (Operational Home & Availability Dashboard)  
**Target Module:** DW-W03 (Operational Home & Command Center)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  

---

## 1. Handoff Readiness & Entrance Criteria

Phase DW-D02 has verified that operational access to the Driver and Helper dashboards is gated by server-authoritative credential approvals:
1. **Unverified / Pending Workers:** Remain locked in `DW08 · Verification status` (`1085:298` / `1088:298`). No operational dispatches or active shift capabilities are accessible.
2. **Approved Drivers:** Transition upon backend approval to `DW09 · Driver dashboard` (`1086:3` / `1088:332`).
3. **Approved Helpers:** Transition upon backend approval to `DW31 · Helper dashboard` (`1086:1058` / `1088:1387`).
4. **Availability Configuration:** Operating hours, scheduled shifts, and service radius controls transition to `DW39 · Availability settings` (`1270:793` / `1270:1744`).

---

## 2. DW-D03 Target Screen Scope

| Screen ID | Canonical Title | Primary Role | EN Node ID | ES Node ID | Core Functionality |
|:---:|:---|:---:|:---:|:---:|:---|
| **DW09** | Driver dashboard | Primary Driver | `1086:3` | `1088:332` | Online / Offline toggle, GPS tracking disclosure, active dispatch card, shift readiness checklist |
| **DW31** | Helper dashboard | Crew Helper | `1086:1058` | `1088:1387` | Helper availability toggle, incoming crew invitation stream, mutual crew readiness check |
| **DW39** | Availability settings | Primary Driver | `1270:793` | `1270:1744` | Shift schedules, active working hours, Arizona service radius configuration (10 to 50 miles) |

---

## 3. Key Design & State Machine Requirements for DW-D03

1. **Shift Readiness Checklist:**
   - Primary Drivers must confirm readiness items (fuel/battery > 50%, cargo tie-downs/straps, 2-wheel dolly / hand truck) before switching availability to `ONLINE`.
2. **Background GPS Tracking Disclosure:**
   - In compliance with Signed SRS `NT-01–10` and `NFR-02`, location tracking occurs **ONLY** when the worker is in an active shift or executing an active job. The UI must clearly display tracking active indicators.
3. **Helper Dispatch Independence:**
   - Helpers manage their own independent `ONLINE` / `OFFLINE` status on `DW31`. A Driver going online does not automatically force their favorite helpers online.
4. **Service Radius Filter (SRS `WK-15`, `DP-01–18`):**
   - Service radius is adjustable between 10 miles (city core) and 50 miles (regional Phoenix/Tucson corridor), matching the radial dispatch ring rules.
