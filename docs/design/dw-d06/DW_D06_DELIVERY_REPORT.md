# HAULIX Driver/Worker Mobile App — Phase DW-D06 Delivery Report

## Active Service, On-Site Progress, Inventory Scope, Additional Work Approval & Role-Specific Design Gap Closure

**Execution Status:** COMPLETE & VERIFIED  
**Repository:** `mridha-rakib/haulix-mobile`  
**Application Target:** `apps/driver` (`com.haulix.driver`)  
**Design Phase:** DW-D06  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Driver/Worker Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Verified Pre-Flight Baseline:** `40bdf0f362fab8a1ddca96ada5217e52519657c8`  
**Customer App Frozen Baseline:** `942c869de6726b9f277abcd1776728b228f7b2e4` (strictly untouched)  
**Requirements Baseline:** Signed HAULIX SRS v1.6 (Requirements Crosswalk Frame `1329:1824`, Row `1329:1843`, Text `1329:1847`, Handoff Index `1091:3`, UX Audit Board `1317:1805`)  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  
**Reference Design Canvas:** 430 × 932 px  

---

### 1. Executive Summary & Audit Coverage

Phase DW-D06 completes the design audit, requirements reconciliation, live Figma canvas remediation, screenshot capture, and technical specification delivery for **Active Service, On-Site Progress, Inventory Scope, Additional Work Approval, and Role-Specific Operational Controls** (Module `DW-W06`).

All 6 canonical core states across 12 localized bilingual variants (English and Spanish) were audited. Confirmed canvas inconsistencies—specifically `RES-D06-01` (DW51, DW52, DW53 Active Profile tab mismatch mutated to Active Jobs), `RES-D06-02` (DW51, DW52, DW53 navigation hotspot bounds and Profile trigger addition), and `RES-D06-03` (DW20 trigger layer renaming to DW51 destination)—were remediated directly on the live Figma canvas via Plugin API execution (62 nodes mutated).

- **Phase DW-D06 Screens Audited:** 6 Canonical States (`DW19`, `DW20`, `DW51`, `DW52`, `DW53`, `DW63`) / 12 Localized Variants
- **Cumulative Audit Coverage:** **42 / 68 Canonical States (61.8%)** and **84 / 136 Localized Variants (61.8%)** verified and closed
- **Supporting Overlays Accounting:** 6 of 14 frames verified (3 of 7 bilingual pairs: OV-01, OV-06, OV-07)
- **Remaining Scope:** 26 Canonical States / 52 Localized Variants across phases DW-D07 through DW-D09
- **Monorepo Boundaries Preserved:** Zero React Native implementation started in `apps/driver`; Customer App strictly frozen at `942c869de6726b9f277abcd1776728b228f7b2e4`.

---

### 2. Verified Repository Baseline

Preflight Git state verification:
```bash
git status
# On branch main, up to date with 'origin/main', working tree clean
git rev-parse HEAD
# 40bdf0f362fab8a1ddca96ada5217e52519657c8
git rev-parse origin/main
# 40bdf0f362fab8a1ddca96ada5217e52519657c8
```

---

### 3. Requirements Source Reconciliation & Approval Gate Resolution

Independent inspection of authoritative Requirements Crosswalk Frame `1329:1824`, Row `1329:1843` and Text Layer `1329:1847` resolved the approval policy discrepancy:
- **Discrepancy:** The previous handoff mentioned Customer approval only.
- **Authoritative Text (`1329:1847`):** `"GATE: Extra work requires BOTH Admin approval and Customer acceptance; CM-10/13 privacy policy P."`
- **Reconciliation:** Any scope revision (additional items, stairs, heavy carry, disposal) mandates a **Two-Stage Dual Gate**:
  1. Primary Driver initiates proposal on `DW20`.
  2. Platform Admin reviews and authorizes pricing/scope feasibility.
  3. Customer receives notification and accepts updated quote in Customer App.
  4. Only upon **BOTH** approvals being recorded by the backend is the work authorized on `DW52`.

---

### 4. Six Canonical Screen Audit Results

| Canonical State | Canonical Title | Primary Role | Audit Status | Key Functional Elements Inspected |
|:---:|---|:---:|:---:|---|
| **DW19** | On-site job progress | Primary Driver | **VERIFIED & AUDITED** | Arrival status (`ASSIGNED`/`LLEGÓ`), pickup details, milestone sequence (`Arrived at pickup` ➔ `Work started` ➔ `Service in progress` ➔ `Ready for completion`), server-confirmed transitions disclosure, CTA `Capture completion proof` (`1086:558` ➔ `DW21`), CTA `Request additional work` (`1086:560` ➔ `DW20`). |
| **DW20** | Additional work approval | Primary Driver | **REFINED & VERIFIED** | Original approved scope (`1 sofa + 2 chairs`), proposed extra item/service input, cost advisory, `Admin approval + customer acceptance required` notice, CTA `Submit request · demo` (`1086:592` renamed to `LINK / DW51`, routes to `DW51`), CTA `Cancel extra request` (`1086:594` ➔ `DW19`). |
| **DW51** | Extra work pending | Driver & Helper | **REFINED & VERIFIED** | Two-stage approval required banner (`Two approvals required`), scope change row, dual decision disclosure (`Admin approval AND customer acceptance`), QA preview triggers to `DW52` and `DW53`. Bottom nav remediated to `Active Jobs` with Profile trigger. |
| **DW52** | Extra work approved | Driver & Helper | **REFINED & VERIFIED** | Two-stage approval confirmation (`Both approvals recorded · Demo`), server confirmation requirement disclosure, continue safely advisory, CTA `Back to job progress` (`1301:1360` ➔ `DW19`). Bottom nav remediated to `Active Jobs` with Profile trigger. |
| **DW53** | Extra work declined | Driver & Helper | **REFINED & VERIFIED** | Rejection advisory (`Customer rejection preview`), instruction not to charge or perform extra work, original scope preservation notice, CTA `Back to original job` (`1301:1443` ➔ `DW19`). Bottom nav remediated to `Active Jobs` with Profile trigger. |
| **DW63** | Helper on-site progress | Crew Helper | **VERIFIED & AUDITED** | Dedicated Helper labor checklist view, arrival confirmation recorded by server, assigned tasks list, safety rules confirmation, individual evidence submission CTA (`1309:1145` ➔ `DW64`). Dedicated Helper navbar (`DW31` Home, `DW55` Profile). |

---

### 5. Twelve Bilingual Variant Results

| State | Title | Lang | Node ID | Canvas Coordinates | Verification Findings |
|---|---|:---:|:---:|:---:|---|
| **DW19** | On-site job progress | EN | `1086:512` | `x: 1445, y: 3088` | Milestone timeline, server transition disclosure, completion CTA, extra work CTA. |
| **DW19** | On-site job progress · iOS ES | ES | `1088:841` | `x: 1445, y: 3088` | Localized "Progreso del servicio en sitio", hitos de servicio, evidencia final, trabajo extra. |
| **DW20** | Additional work approval | EN | `1086:562` | `x: 1920, y: 3088` | Original scope, proposed work, dual-gate notice. Trigger renamed to `LINK / DW51`. |
| **DW20** | Additional work approval · iOS ES | ES | `1088:891` | `x: 1920, y: 3088` | Localized "Aprobación de trabajo extra", aviso de Admin y cliente. Trigger renamed to `LINK / DW51`. |
| **DW51** | Extra work pending | EN | `1301:1190` | `x: 20, y: 10158` | Dual approval pending, preview triggers. Nav remediated to Active Jobs (`1301:1206`). |
| **DW51** | Trabajo extra pendiente · ES | ES | `1301:2432` | `x: 20, y: 10158` | Localized "Trabajo extra pendiente", aprobaciones pendientes. Nav remediated (`1301:2448`). |
| **DW52** | Extra work approved | EN | `1301:1279` | `x: 495, y: 10158` | Both approvals confirmed, continue safely. Nav remediated to Active Jobs (`1301:1295`). |
| **DW52** | Trabajo extra aprobado · ES | ES | `1301:2521` | `x: 495, y: 10158` | Localized "Trabajo extra aprobado", confirmación dual. Nav remediated (`1301:2537`). |
| **DW53** | Extra work declined | EN | `1301:1362` | `x: 970, y: 10158` | Rejection preview, revert to original scope. Nav remediated to Active Jobs (`1301:1378`). |
| **DW53** | Trabajo extra rechazado · ES | ES | `1301:2604` | `x: 970, y: 10158` | Localized "Trabajo extra rechazado", continuar original. Nav remediated (`1301:2620`). |
| **DW63** | Helper on-site progress | EN | `1309:1052` | `x: 970, y: 12178` | Helper labor tasks, safety confirmation, CTA to `DW64`. Verified Active Jobs navbar. |
| **DW63** | Progreso del ayudante · ES | ES | `1309:1759` | `x: 970, y: 12178` | Localized "Progreso del ayudante", tareas asignadas, CTA a `DW64`. Verified Active Jobs navbar. |

---

### 6. Screenshots Captured

All 12 visual screenshots have been captured from the live Figma canvas and committed under `docs/design/dw-d06/screenshots/`:

| Screen | English Screenshot | Spanish Screenshot |
|---|---|---|
| **DW19** | [dw19-on-site-progress-en-1086-512.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw19-on-site-progress-en-1086-512.png) | [dw19-on-site-progress-es-1088-841.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw19-on-site-progress-es-1088-841.png) |
| **DW20** | [dw20-additional-work-approval-en-1086-562.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw20-additional-work-approval-en-1086-562.png) | [dw20-additional-work-approval-es-1088-891.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw20-additional-work-approval-es-1088-891.png) |
| **DW51** | [dw51-extra-work-pending-en-1301-1190.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw51-extra-work-pending-en-1301-1190.png) | [dw51-extra-work-pending-es-1301-2432.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw51-extra-work-pending-es-1301-2432.png) |
| **DW52** | [dw52-extra-work-approved-en-1301-1279.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw52-extra-work-approved-en-1301-1279.png) | [dw52-extra-work-approved-es-1301-2521.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw52-extra-work-approved-es-1301-2521.png) |
| **DW53** | [dw53-extra-work-declined-en-1301-1362.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw53-extra-work-declined-en-1301-1362.png) | [dw53-extra-work-declined-es-1301-2604.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw53-extra-work-declined-es-1301-2604.png) |
| **DW63** | [dw63-helper-on-site-progress-en-1309-1052.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw63-helper-on-site-progress-en-1309-1052.png) | [dw63-helper-on-site-progress-es-1309-1759.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d06/screenshots/dw63-helper-on-site-progress-es-1309-1759.png) |

---

### 7. Residual DW-D05 Corrections Reconciled

1. **RES-D05-A (Active Job Arrival Control):** DW17 contains a demo button `Arrived at pickup · demo` (`1086:455` EN / `1088:777` ES). The previous description claiming a swipe gesture was corrected to reflect actual button tap semantics.
2. **RES-D05-B (Connection Recovery Route):** DW34 retry layer `1086:1211` routes to `DW09` Driver dashboard in Figma. Preserving the originating active booking context is documented as a runtime navigation requirement.
3. **RES-D05-C (Message Status Ledger):** DW47 contains queued/submitted state and server confirmation disclosure rather than an exhaustive multi-item delivery ledger.
4. **RES-D05-D (Overlay Geometry):** Supporting overlay dimensions confirmed from Figma canvas:
   - `OV-06 · Call preview` EN `1305:706`: 430 × 218 px; ES `1305:716`: 430 × 218 px.
   - `OV-07 · Location preview` EN `1305:726`: 430 × 233 px; ES `1305:735`: 430 × 218 px.
5. **RES-D05-E (Reclassification of Implementation Claims):** Specific SDKs and timings (Mapbox, Twilio, SQLite, 5s GPS updates, 30m chat expiry, 15s heartbeat, Redis) are classified as proposed technical architecture, not Figma design features.

---

### 8. Master Tracker & Cumulative Coverage Status

- **Cumulative Canonical State Coverage:** **42 / 68 (61.8%)**
- **Cumulative Bilingual Screen Coverage:** **84 / 136 (61.8%)**
- **Cumulative Supporting Overlay Coverage:** **6 / 14 frames (3 / 7 bilingual pairs: OV-01, OV-06, OV-07)**
- **Work Package Formula Verification:**  
  `11 (DW-D01) + 7 (DW-D02) + 3 (DW-D03) + 9 (DW-D04) + 6 (DW-D05) + 6 (DW-D06) + 4 (DW-D07) + 9 (DW-D08) + 13 (DW-D09) = 68 Canonical States`
