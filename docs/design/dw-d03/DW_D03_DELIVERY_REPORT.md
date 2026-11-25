# HAULIX Driver & Worker Mobile App — Phase DW-D03
## Operational Home & Availability Dashboard, Reusable Navigation Architecture & Role-Specific Prototype Resolution Delivery Report

**Execution Status:** COMPLETE & VERIFIED  
**Repository:** `mridha-rakib/haulix-mobile`  
**Existing Application:** `apps/driver`  
**Android Package:** `com.haulix.driver`  
**Branch:** `main`  
**Verified Initial Baseline Commit:** `207976a014e27e59aaeafa521055103b9b257a5a`  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Driver/Worker Canvas:** Page `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Direct Figma URL:** https://www.figma.com/design/meiXxwUNJaDo0a3mhcHBXv/HAULIX-%E2%80%94-UI-UX-Concept--Copy-?node-id=1-3  
**Requirements Crosswalk Frame:** `1329:1824` (Signed HAULIX SRS v1.6 Appendix C p.24)  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  

---

## 1. Verified Baseline & Monorepo Guardrails

- **Initial Verified Baseline:** [`207976a014e27e59aaeafa521055103b9b257a5a`](https://github.com/mridha-rakib/haulix-mobile/commit/207976a014e27e59aaeafa521055103b9b257a5a) verified on `origin/main`.
- **Monorepo Guardrails Preserved:**
  - Zero modifications to Customer App (`apps/customer`).
  - Zero React Native implementation in `apps/driver`.
  - Zero duplicate Expo applications or repositories created.
  - Zero modifications to Admin Dashboard designs.

---

## 2. Authoritative DW-D03 Screen Scope & Cumulative Progress

Three canonical states and six bilingual variants audited in DW-D03:

| Screen ID | Canonical Title | Primary Role | EN Node ID | ES Node ID | Primary Actions |
|:---:|:---|:---:|:---:|:---:|:---|
| **DW09** | Driver dashboard | Primary Driver | `1086:3` | `1088:332` | Online/Offline toggle, active dispatch card ➔ `DW11`, demo offer ➔ `DW10` |
| **DW31** | Helper dashboard | Crew Helper | `1086:1058` | `1088:1387` | Helper availability toggle, invitations row ➔ `DW14`, assignment ➔ `DW15` |
| **DW39** | Availability settings | Primary Driver | `1270:793` | `1270:1744` | Working days, hours, service radius (10–50 mi), vacation mode ➔ Save |

Supporting availability overlays:
- `1286:554`: `QA Overlay / availability-en` (430 × 298 px)
- `1286:568`: `QA Overlay / availability-es` (430 × 298 px)

**Cumulative Audit Progress:**
- **DW-D01:** 11 canonical states (22 bilingual variants) audited and closed.
- **DW-D02:** 7 canonical states (14 bilingual variants) audited and closed.
- **DW-D03:** 3 canonical states (6 bilingual variants) audited and closed.
- **Cumulative Total:** **21 / 68 audited canonical states** and **42 / 136 bilingual variants**.

---

## 3. Audited Driver & Helper Dashboard Functionality

- **Driver Dashboard (`DW09`):**
  - Worker greeting (`Good morning, Alex`), rating (`4.8 ★ · verified Driver`).
  - `ONLINE` status toggle pill (`#BAFF42`) with dispatch evaluation disclaimer.
  - Live job offer card preview (`Furniture Removal`, `Phoenix, AZ · 4.8 mi`, `HX-AZ-DEMO-0042`) linking to `DW11 · Job details`.
  - Secondary demo offer card (`Junk Removal`, `Mesa, AZ · 7.2 mi`) linking to `DW10 · Job offers`.
  - Bottom navigation bar standardized to 88px height.
- **Helper Dashboard (`DW31`):**
  - Worker greeting (`Welcome back, Helper`).
  - Independent Helper availability toggle (`Your own availability: ONLINE (demo)`).
  - Invitation stream row (`Invitations waiting [1 NEW]`) linking to `DW14 · Helper invitations`.
  - Current assignment row (`HX-AZ-DEMO-0042 [PENDING]`) linking to `DW15 · Review invitation`.
  - Worker earnings row linking to `DW23 · Earnings overview`.
  - Prominent crew independence notice: *"A Driver invitation does not assign you until you choose to accept and the server confirms eligibility."*

---

## 4. Helper Profile Navigation Destination Correction (`DW27` ➔ `DW55`)

- **Defect Remediated:** In previous iterations, prototype trigger layers on Helper screens bore legacy layer names `NAV ROUTE / DW27 / Profile`.
- **Figma Update Executed:** All 12 Helper prototype reaction trigger layers were updated to accurately reflect the true destination `DW55 · Helper profile` (`1301:1534` EN / `1301:2776` ES):
  - `1086:1107` (`DW31 EN`) ➔ `NAV ROUTE / DW55 / Helper profile`
  - `1088:1436` (`DW31 ES`) ➔ `NAV ROUTE / DW55 / Perfil del ayudante`
  - `1086:326` (`DW14 EN`) ➔ `NAV ROUTE / DW55 / Helper profile`
  - `1088:655` (`DW14 ES`) ➔ `NAV ROUTE / DW55 / Perfil del ayudante`
  - `1309:1027` (`DW62 EN`) ➔ `NAV ROUTE / DW55 / Helper profile`
  - `1309:1735` (`DW62 ES`) ➔ `NAV ROUTE / DW55 / Perfil del ayudante`
  - `1309:1125` (`DW63 EN`) ➔ `NAV ROUTE / DW55 / Helper profile`
  - `1309:1817` (`DW63 ES`) ➔ `NAV ROUTE / DW55 / Perfil del ayudante`
  - `1309:1220` (`DW64 EN`) ➔ `NAV ROUTE / DW55 / Helper profile`
  - `1309:1896` (`DW64 ES`) ➔ `NAV ROUTE / DW55 / Perfil del ayudante`
  - `1309:1316` (`DW65 EN`) ➔ `NAV ROUTE / DW55 / Helper profile`
  - `1309:1976` (`DW65 ES`) ➔ `NAV ROUTE / DW55 / Perfil del ayudante`
- **Result:** Monorepo Critical Rule #3 is preserved. Helpers exclusively navigate to Helper profile (`DW55`), never to Driver profile (`DW27`).

---

## 5. Canonical Reusable Bottom Navigation Component

- **Master Component Node ID:** `1084:26` (`Driver / Bottom Navigation · Five Tabs`) on Page `314:2` (`06 — Component Library · HAULIX`).
- **Icon Component Set Node ID:** `1314:320` (`HAULIX / Bottom Navigation Icons · Five Tabs`) on Page `314:2`.
- **Dimensions:** 430 × 88 px, positioned at `x: 0, y: 844`.
- **Structure:** 1px top divider (`#222A28`), 5 centered vector icon instances at `y: 12` (26×26 px), 5 typography labels at `y: 49` (75×12 px).

---

## 6. Resolution of Inconsistent 119px vs 88px Compositions

- **Problem:** Nine English screens (`DW09`, `DW10`, `DW14`, `DW18`, `DW23`, `DW62`, `DW63`, `DW64`, `DW65`) had legacy navigation containers of height 119px (`y: 813`) containing redundant SVG layers and underline elements.
- **Figma Correction Executed:** All nine frames were standardized to the approved 88px visual design:
  - Resized to `width: 430, height: 88, y: 844`.
  - Labels aligned to `y: 49`.
  - Redundant SVG and underline child layers were removed.
- **Result:** 100% of screens across English and Spanish now feature identical 88px bottom navigation geometry.

---

## 7. Role-Specific Tab Routing Matrix

| Tab | Driver Destination | Helper Destination | Architectural Boundary |
|:---|:---|:---|:---|
| **Home** | `DW09 · Driver dashboard` | `DW31 · Helper dashboard` | Role-specific command center |
| **Jobs** | `DW28 · My jobs` / `DW10` | `DW28 · My jobs` / `DW62` | Vehicle jobs vs Helper crew assignments |
| **Earnings** | `DW23 · Earnings overview` | `DW24 · Worker earnings detail` | Vehicle ledger vs individual labor share |
| **Messages** | `DW18 · Job messages` | `DW18 · Job messages` | Common communications hub |
| **Profile** | `DW27 · Profile & Documents` | `DW55 · Helper profile` | Driver credentials vs Helper profile |

---

## 8. Availability Controls & Arizona Service Radius (`DW39`)

- **Work status:** Master online/offline toggle.
- **Working days:** Mon through Sun multi-select chips.
- **Working hours:** Start time (`8:00 AM ⌄`) and End time (`6:00 PM ⌄`).
- **Service radius:** Configurable up to `50 mi` in alignment with Signed SRS requirements `WK-15` and `DP-01–18` (10, 20, 30, 40, 50-mile concentric dispatch rings).
- **Preferred shift:** Day shift / Night shift / Flexible.
- **Vacation mode:** Temporary dispatch suspension toggle.
- **Save action:** Native `BACK` action persisting choices to backend worker profile.

---

## 9. Unsupported Shift-Readiness Assumptions Corrected

- Prior documentation incorrectly assumed client-side equipment checklists (hand trucks, 50% device battery, tie-down straps) blocked workers from going online.
- Reconciled with Signed SRS v1.6: Availability is governed strictly by backend eligibility approval (`DW08`), valid Arizona service radius, and GPS permission disclosure. No unapproved hardware checklists block availability.

---

## 10. Location Privacy & Runtime Gates (`NT-01–10`, `NFR-02`)

- Background GPS location is tracked **EXCLUSIVELY** while a worker is toggled `ONLINE` or actively executing a job trip (`DW17`).
- Toggling `OFFLINE` halts all location polling immediately.

---

## 11. Residual `DW33` Helper Verification Recovery Navigation Resolution

- **Finding:** On `DW33 · Verification needs action` (`1086:1155` / `1088:1484`), document resubmission and eligibility state links navigate to `DW07` (Driver documents) and `DW05` (Driver verification).
- **Resolution:** Documented the role-conditional state machine dispatch:
  - If Driver: routes to `DW07` / `DW05`.
  - If Helper: routes to `DW06 · Helper verification` (`1085:207` / `1088:207`) and `DW56 · Helper eligibility & documents` (`1301:1633` / `1301:2875`), preventing vehicle and driver license requirements from being presented to Helper accounts.

---

## 12. Screenshot References & Evidence

Stored in repository at `docs/design/dw-d03/screenshots/`:

| File Name | Screen / Frame | Node ID | Byte Size | Status |
|:---|:---:|:---:|:---:|:---:|
| `dw09-driver-dashboard-en-1086-3.png` | DW09 EN | `1086:3` | 58,292 B | Verified |
| `dw09-driver-dashboard-es-1088-332.png` | DW09 ES | `1088:332` | 59,309 B | Verified |
| `dw31-helper-dashboard-en-1086-1058.png` | DW31 EN | `1086:1058` | 56,127 B | Verified |
| `dw31-helper-dashboard-es-1088-1387.png` | DW31 ES | `1088:1387` | 56,253 B | Verified |
| `dw39-availability-settings-en-1270-793.png` | DW39 EN | `1270:793` | 52,614 B | Verified |
| `dw39-availability-settings-es-1270-1744.png` | DW39 ES | `1270:1744` | 51,810 B | Verified |
| `ov-availability-en-1286-554.png` | Overlay EN | `1286:554` | 22,081 B | Verified |
| `ov-availability-es-1286-568.png` | Overlay ES | `1286:568` | 22,044 B | Verified |

---

## 13. Master Inventory & Tracker Updates

- [DRIVER_WORKER_MASTER_68_STATE_INVENTORY.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/driver-final/DRIVER_WORKER_MASTER_68_STATE_INVENTORY.md): Updated states `DW09`, `DW31`, `DW39` to `DW-D03 (Audited & Verified)`.
- [DRIVER_WORKER_DESIGN_AUDIT_TRACKER.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/driver-final/DRIVER_WORKER_DESIGN_AUDIT_TRACKER.md): Updated Phase DW-D03 status to `VERIFIED & CLOSED`. Cumulative audited canonical states: 21 / 68 (42 / 136 bilingual variants).

---

## 14. Verified GitHub Commit

- **Commit Message:** `docs(driver): complete operational home and navigation design audit (DW-D03)`
- **Target Branch:** `main`
- **Full 40-Character Commit SHA:** `1984e22c18d9fda40bf07c1a40410fe595cbf84b`
- **Direct GitHub Commit URL:** https://github.com/mridha-rakib/haulix-mobile/commit/1984e22c18d9fda40bf07c1a40410fe595cbf84b

---

## 15. DW-D04 Readiness

Phase DW-D03 is complete, verified, and ready for commit. The project is fully prepared to advance to **Phase DW-D04: Job Offers, Dispatch Matching & Crew Formation**:
- **Target Workflow:** DW-W04 (Offers, Broadcasts & Crew Matching).
- **Core Screens:** `DW10 · Job offers` (`1086:81` / `1088:410`), `DW11 · Job details` (`1086:162` / `1088:491`), `DW12 · Offer unavailable` (`1086:205` / `1088:534`), `DW13 · Invite a Helper` (`1086:231` / `1088:560`), `DW14 · Helper invitations` (`1086:268` / `1088:597`), `DW15 · Review invitation` (`1086:328` / `1088:657`), `DW16 · Crew readiness` (`1086:365` / `1088:694`), `DW48 · Choose a Helper` (`1301:920` / `1301:2162`), `DW49 · Invitation pending` (`1301:1026` / `1301:2252`).
- **Scope:** Tiered radial dispatch ring expansion (10/20/30/40/50 mi), atomic offer acceptance, crew matching workflows, and independent helper invitation acceptance.
- **Handoff Specification:** [DW_D04_OFFERS_CREW_HANDOFF.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d03/DW_D04_OFFERS_CREW_HANDOFF.md).
