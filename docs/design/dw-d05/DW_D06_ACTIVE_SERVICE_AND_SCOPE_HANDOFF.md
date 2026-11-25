# HAULIX Driver & Worker Mobile App — Phase DW-D05
# DW-D06 Active Service, Inventory Checklist & Scope Revision Handoff Specification

**Source Phase:** DW-D05 (Pickup Navigation, Active Assignment, Job Communication & Connection Recovery)  
**Target Next Phase:** DW-D06 (Active Service, Item Inventory, Scope Revisions & Extra Work Approvals)  
**Target Module:** DW-W06 (Active Service & Scope Management)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  

---

## 1. Handoff Readiness & Entrance Criteria

Phase DW-D05 establishes the verified physical arrival on site required to commence moving operations:
1. **Physical Arrival Confirmed:** Primary Driver arrives on site (`DW17` ➔ `DW19`), and Helper arrives on site (`DW62` ➔ `DW63`).
2. **Customer PIN Gate Unlocked:** Both workers on site allow Primary Driver to prompt customer for Start PIN verification on `DW19`.
3. **Customer State Transition:** Customer client transitions from `C13 · Driver on the way` to `C15 · In progress / Loading`.

---

## 2. DW-D06 Target Screen Scope (6 Canonical States / 12 Bilingual Variants)

| State ID | Canonical Title | Primary Role | EN Node ID | ES Node ID | Core Functionality |
|:---:|:---|:---:|:---:|:---:|:---|
| **DW19** | On-site job progress | Primary Driver | `1086:512` | `1088:841` | Customer Start PIN entry, item inventory checklist, loading status, scope flag CTA |
| **DW20** | Additional work approval | Primary Driver | `1086:562` | `1088:891` | Extra item price proposal, photo attachment, surcharge calculation, customer approval trigger |
| **DW51** | Extra work pending | Driver & Helper | `1301:1190` | `1301:2432` | Awaiting customer in-app approval countdown timer, live pending state |
| **DW52** | Extra work approved | Driver & Helper | `1301:1279` | `1301:2521` | Customer approved price, item added to active manifest, fare ledger updated |
| **DW53** | Extra work declined | Driver & Helper | `1301:1362` | `1301:2604` | Customer rejected price, extra item excluded from manifest, continue original scope |
| **DW63** | Helper on-site progress | Crew Helper | `1309:1052` | `1309:1759` | Helper labor task checklist, carry assistance confirmation, loading sign-off |

---

## 3. Key Technical & Operational Invariants for DW-D06

1. **Customer Start PIN Validation (`BK-09`):**
   - Service timer and billing do NOT start until the customer verbally provides their 4-digit security PIN and the driver validates it on `DW19`.
2. **Scope Revision Authority (`RO-05`, `BK-10`):**
   - Only the Primary Driver (`DW20`) can propose price adjustments for undeclared items.
   - Crew Helpers have read-only visibility (`DW51`–`DW53`) and cannot alter order billing.
   - The customer MUST approve extra charges on their device (`apps/customer`); workers cannot auto-bill extra items.
3. **Item Loading Checklist:**
   - Both Driver (`DW19`) and Helper (`DW63`) verify that all reported cargo items are securely loaded and strapped before initiating transit to destination (`DW21`).
