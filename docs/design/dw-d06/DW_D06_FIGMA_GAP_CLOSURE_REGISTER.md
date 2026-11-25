# DW-D06: Figma Gap Closure Register

## 1. Register Overview

This register tracks all design defects, navigation mismatches, prototype trigger misalignments, and requirement discrepancies identified and closed during Phase DW-D06.

---

## 2. Gap Closure Items

| Gap ID | Affected Screen(s) | Source Requirement | Actual Finding | Applied Canvas Correction / Resolution | Resulting Node(s) | Status |
|---|---|---|---|---|---|:---:|
| **RES-D06-01** | `DW51`, `DW52`, `DW53` (EN & ES) | Signed SRS v1.6 §3.2.1, Module DW-W06 | Navigation frame was named `Navigation / Active Profile` with Profile active and Jobs inactive, even though extra work belongs to active job execution. | Mutated frame name to `Navigation / 5 Tabs / Active Jobs`. Swapped Jobs icon to Active (`1314:290`) with Lime fill `#BAFF42`. Swapped Profile icon to Inactive (`1314:316`) with Muted fill `#ADB7B1`. | `1301:1206`, `1301:2448`, `1301:1295`, `1301:2537`, `1301:1378`, `1301:2620` | **REFINED_AND_VERIFIED** |
| **RES-D06-02** | `DW51`, `DW52`, `DW53` (EN & ES) | Canonical 88px navbar standard | Navigation hotspot bounds were 75px height without a Profile trigger. Jobs trigger routed to `DW10` while on Jobs tab. | Standardized all hotspot heights to 88px (`y=844, h=88`). Repurposed Jobs trigger to Profile trigger at `x=340, y=844, w=86, h=88` routing to `DW27` (`1086:840` EN / `1088:1169` ES). | Triggers in `1301:1190`, `1301:2432`, `1301:1279`, `1301:2521`, `1301:1362`, `1301:2604` | **REFINED_AND_VERIFIED** |
| **RES-D06-03** | `DW20` (EN & ES) | Module DW-W06 Prototype Flow | Submission layers `1086:592` (EN) and `1088:921` (ES) were named `LINK / DW17 / Submit request · demo` despite routing to `DW51`. | Renamed trigger layers to `LINK / DW51 / Submit request · demo`. Verified destination remains `DW51` (`1301:1190` EN / `1301:2432` ES). | `1086:592`, `1088:921` | **REFINED_AND_VERIFIED** |
| **RES-D06-04** | Requirements Crosswalk | Crosswalk Frame `1329:1843`, Text `1329:1847` | Previous handoff omitted Admin approval gate for extra work. | Reconciled requirement: Extra work requires BOTH Admin approval and Customer acceptance before charges or labor commence. | Documented in `DW_D06_CUSTOMER_ADMIN_APPROVAL_GATE_MATRIX.md` | **REFINED_AND_VERIFIED** |
| **RES-D06-05** | `DW19` (EN & ES) | Signed SRS v1.6 §3.2.1 | Previous handoff claimed DW19 had a 4-digit Customer Start PIN and loading checklist. | Confirmed canvas contains server milestone progression without PIN or interactive checklist. Arrival and labor start remain distinct. | Documented in `DW_D06_ACTIVE_SERVICE_AND_MILESTONE_SPEC.md` | **VERIFIED_EXISTING** |
