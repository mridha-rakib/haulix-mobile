# HAULIX Driver/Worker Mobile App — Phase DW-D05 Delivery Report

## Pickup Navigation, Active Assignment, Job Communication, Location Privacy & Connection Recovery Design Audit

**Repository:** `mridha-rakib/haulix-mobile`  
**Application Target:** `apps/driver` (`com.haulix.driver`)  
**Design Phase:** DW-D05  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Driver/Worker Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Verified Baseline Commit:** `001902087a63bd9bf372cc7e9dbe9708170bf798`  
**Requirements Baseline:** Signed HAULIX SRS v1.6 (Requirements Crosswalk Frame `1329:1824`, Appendix C p.24, Handoff Index `1091:3`)  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  
**Reference Design Canvas:** 430 × 932 px (iOS / Android Multi-platform)  
**Execution Status:** COMPLETE & VERIFIED

---

### 1. Executive Summary & Audit Coverage

Phase DW-D05 completes the design audit, requirements reconciliation, live Figma canvas remediation, screenshot capture, and technical specification delivery for **Pickup Navigation, Active Assignment, Job Communication, Location Privacy, and Connection Recovery** (Module `DW-W05`).

All six canonical core states across twelve localized bilingual variants (English and Spanish) and four supporting overlay frames have been audited. Confirmed canvas inconsistencies—specifically `RES-D05-01` (DW47 navigation active state and trigger misalignment) and `RES-D05-02` (DW50 trigger coordinates)—were remediated directly on the live Figma canvas via Plugin API execution.

- **Phase DW-D05 Screens Audited:** 6 Canonical States (`DW17`, `DW18`, `DW34`, `DW47`, `DW50`, `DW62`) / 12 Localized Variants
- **Supporting Overlays Audited:** 2 Overlay Types (`OV-06 · Call preview`, `OV-07 · Location preview`) / 4 Localized Variants
- **Cumulative Audit Coverage:** **36 / 68 Canonical States (52.9%)** and **72 / 136 Localized Variants (52.9%)** verified and closed
- **Remaining Scope:** 32 Canonical States / 64 Localized Variants across phases DW-D06 through DW-D09
- **Monorepo Boundaries Preserved:** Zero React Native implementation started in `apps/driver`; Customer App strictly frozen at `942c869de6726b9f277abcd1776728b228f7b2e4`.

---

### 2. Requirements Source Reconciliation & Distinction

In compliance with project auditing rules, requirements sources are explicitly categorized:

1. **Directly Verified Contractual Requirements:** Physical signed SRS v1.6 remains an unindexed physical scan. Contractual requirements are synthesized from approved secondary engineering contracts, the Customer App state machine, and the authoritative Figma workspace.
2. **Figma Crosswalk-Supported Requirements (`1329:1824`):**
   - `DP-12–16`: Driver transit, turn-by-turn guidance, and arrival notification.
   - `BK-08–09`: Customer tracking map streaming and pickup arrival handoff.
   - `CM-01–04`, `CM-07–09`, `CM-11–13`: Job-scoped chat, masked telephony, asynchronous voice notes, and delivery receipts.
   - `NT-01–10`, `NFR-02`: Real-time location sharing, offline resilience, and background GPS limits.
3. **Unverified Implementation Assumptions (Corrected):**
   - Corrected false assertions that static Figma canvases execute live Mapbox SDK routing, live WebRTC/Twilio calling, or real-time offline MMKV sync. These are specified as future runtime engineering implementations.
4. **Deferred Backend Dependencies:**
   - Production Mapbox Navigation SDK integration, Twilio voice proxy masking, and background geolocation daemon setup remain deferred to future `apps/driver` engineering sprints.

---

### 3. Canonical Screen Audit & Node Mapping (6 States / 12 Variants)

| State | Canonical Title | Primary Role | EN Node | ES Node | Geometry | Verified Status |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| **DW17** | Active job | Primary Driver | `1086:405` | `1088:734` | 430 × 932 px | **VERIFIED & CLOSED** |
| **DW18** | Job messages | Driver & Helper | `1086:459` | `1088:788` | 430 × 932 px | **VERIFIED & CLOSED** |
| **DW34** | Connection interrupted | Driver & Helper | `1086:1188` | `1088:1517` | 430 × 932 px | **VERIFIED & CLOSED** |
| **DW47** | Message status | Driver & Helper | `1301:837` | `1301:2079` | 430 × 932 px | **VERIFIED & CLOSED** |
| **DW50** | Location & connection | Driver & Helper | `1301:1097` | `1301:2339` | 430 × 932 px | **VERIFIED & CLOSED** |
| **DW62** | Helper active job | Crew Helper | `1309:954` | `1309:1677` | 430 × 932 px | **VERIFIED & CLOSED** |

---

### 4. Supporting Overlay Audit (2 Types / 4 Variants)

| Overlay ID | Functional Purpose | EN Node ID | EN Frame Name | ES Node ID | ES Frame Name | Geometry | Verified Status |
|:---:|:---|:---:|:---|:---:|:---|:---:|:---:|
| **OV-06** | Direct Call / Voice Communications | `1305:706` | `QA Overlay / call-en` | `1305:716` | `QA Overlay / call-es` | 430 × 218 px | **VERIFIED & CLOSED** |
| **OV-07** | Live Location Sharing Permissions | `1305:726` | `QA Overlay / location-en` | `1305:735` | `QA Overlay / location-es` | 430 × 233 / 218 px | **VERIFIED & CLOSED** |

---

### 5. Driver Active Assignment Findings (`DW17`)
- **Map Surface & Disclaimer:** Contains Phoenix street map placeholder (`1086:421`) and route line (`1237:780`). Features persistent `NOT LIVE GPS` / `GPS NO ACTIVO` disclaimer chip (`1237:794` / `1237:795`), accurately communicating that map graphics are simulated design previews.
- **Actions:** Header Back is disabled during active navigation. Primary arrival CTA `LINK / DW19 / Arrived at pickup · demo` (`1086:455` / `1088:784`) transitions to on-site progress `DW19`. Communication CTA `LINK / DW18 / Message customer` (`1086:457` / `1088:786`) navigates to `DW18`.

---

### 6. Helper Assignment Findings (`DW62`)
- **Role Independence (`RO-04`):** Helpers do not drive the moving vehicle and do not receive turn-by-turn driving instructions. The screen communicates driver assignment, vehicle model, estimated arrival time, and destination address for transit coordination.
- **Independent Arrival Confirmation:** Features dedicated `Confirm my arrival · demo` CTA (`1309:1050` / `1309:1757`) routing to `DW63 · Helper on-site progress`. Confirmed operational invariant that Helper arrival is confirmed independently from Driver arrival; neither worker can sign arrival for the other.

---

### 7. Job Communication Architecture (`DW18`, `DW47`, `OV-06`)
- **DW18 (Job messages):** Job-scoped channel linking Customer, Primary Driver, and assigned Helper. Supports text messages, canned safety messages, and asynchronous voice notes (`1086:493` with audio waveform surface `1239:780`).
- **DW47 (Message status):** Message lifecycle state machine: Local Queue ➔ Submitted (ACK pending) ➔ Delivered ➔ Read / Failed. Server disclosure (`1301:914`) informs worker that message dispatch requires network confirmation.
- **OV-06 (Call preview):** Masked telephony preview demonstrating future Twilio voice proxy call initiation without exposing customer telephone numbers.

---

### 8. Location Privacy Architecture (`DW50`, `OV-07`)
- **Reconciliation with Signed SRS (`NT-01–10`, `NFR-02`):**
  - **OFFLINE:** Zero tracking. Background location services terminated.
  - **ONLINE (Available):** Low-frequency polling (30s–60s) for radial dispatch matching.
  - **ACTIVE ASSIGNMENT (En Route / In Transit):** High-frequency streaming (5s) to power customer tracking map (`C13`/`C15`).
  - **OFFLINE DURING TRIP INVARIANT:** Toggling `OFFLINE` during an active booking halts future dispatch broadcasts only. Location tracking for the active order CANNOT be terminated until `COMPLETED` or `CANCELLED`.
  - **TRIP COMPLETED:** Active tracking ceases immediately upon final delivery sign-off (`DW22`).

---

### 9. Connection Recovery Architecture (`DW34`)
- **Offline Resilience (`NFR-03`):** Cellular dead zones must not crash the mobile app. `DW34` surfaces an offline banner while preserving trip state in local memory.
- **Retry Semantics:** In production, tapping `Retry connection` performs exponential backoff and returns the worker directly to their originating screen (`DW17` for driver, `DW62` for helper, `DW18` for messages) rather than unconditionally resetting to the dashboard.

---

### 10. Role-Specific Navigation & Canvas Mutations

1. **RES-D05-01 (DW47 Active State & Triggers):**
   - **Pre-Audit State:** `DW47` EN (`1301:837`) and ES (`1301:2079`) had `Navigation / Active Profile` (`1301:853` / `1301:2095`), highlighting Profile instead of Messages, and had an erroneous trigger pointing to Messages from within the Messaging flow.
   - **Live Canvas Mutation:**
     - Renamed frames to `Navigation / 5 Tabs / Active Messages`.
     - Swapped Messages icon to Active (`1314:304`) with lime fill `#BAFF42` (`VariableID:5:7`).
     - Swapped Profile icon to Inactive (`1314:316`) with muted fill `#ADB7B1` (`VariableID:5:10`).
     - Repositioned trigger `1301:906` (EN) and `1301:2148` (ES) to `x: 340`, renamed to `NAV ROUTE / DW27 / Profile` (routing to `DW27` `1086:840` EN / `1088:1169` ES).
     - Standardized all trigger bounds to `y = 844, height = 88`.
2. **RES-D05-02 (DW50 Interaction Bounds):**
   - Standardized all 8 interaction triggers (`1301:1163`..`1166` EN, `1301:2405`..`2408` ES) on `DW50` to `y = 844, height = 88`.

---

### 11. Visual Screenshot Evidence

All sixteen screenshots (12 core screens + 4 overlays) are stored in `docs/design/dw-d05/screenshots/`:

| Screen / Overlay | English Screenshot File | Spanish Screenshot File |
|:---:|:---|:---|
| **DW17** | [dw17-active-job-en-1086-405.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw17-active-job-en-1086-405.png) | [dw17-active-job-es-1088-734.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw17-active-job-es-1088-734.png) |
| **DW18** | [dw18-job-messages-en-1086-459.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw18-job-messages-en-1086-459.png) | [dw18-job-messages-es-1088-788.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw18-job-messages-es-1088-788.png) |
| **DW34** | [dw34-connection-interrupted-en-1086-1188.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw34-connection-interrupted-en-1086-1188.png) | [dw34-connection-interrupted-es-1088-1517.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw34-connection-interrupted-es-1088-1517.png) |
| **DW47** | [dw47-message-status-en-1301-837.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw47-message-status-en-1301-837.png) | [dw47-message-status-es-1301-2079.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw47-message-status-es-1301-2079.png) |
| **DW50** | [dw50-location-connection-en-1301-1097.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw50-location-connection-en-1301-1097.png) | [dw50-location-connection-es-1301-2339.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw50-location-connection-es-1301-2339.png) |
| **DW62** | [dw62-helper-active-job-en-1309-954.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw62-helper-active-job-en-1309-954.png) | [dw62-helper-active-job-es-1309-1677.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/dw62-helper-active-job-es-1309-1677.png) |
| **OV-06** | [ov-call-preview-en-1305-706.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/ov-call-preview-en-1305-706.png) | [ov-call-preview-es-1305-716.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/ov-call-preview-es-1305-716.png) |
| **OV-07** | [ov-location-preview-en-1305-726.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/ov-location-preview-en-1305-726.png) | [ov-location-preview-es-1305-735.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/screenshots/ov-location-preview-es-1305-735.png) |

---

### 12. Deliverable Documentation Artifacts (Committed to Repository)

1. [DW_D05_DELIVERY_REPORT.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_DELIVERY_REPORT.md)
2. [DW_D05_ACTIVE_ASSIGNMENT_AND_PICKUP_SPEC.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_ACTIVE_ASSIGNMENT_AND_PICKUP_SPEC.md)
3. [DW_D05_JOB_COMMUNICATION_SPEC.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_JOB_COMMUNICATION_SPEC.md)
4. [DW_D05_LOCATION_PRIVACY_AND_CONNECTION_SPEC.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_LOCATION_PRIVACY_AND_CONNECTION_SPEC.md)
5. [DW_D05_ROLE_CONTEXT_AND_NAVIGATION_MATRIX.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_ROLE_CONTEXT_AND_NAVIGATION_MATRIX.md)
6. [DW_D05_CROSS_APPLICATION_STATE_ALIGNMENT.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_CROSS_APPLICATION_STATE_ALIGNMENT.md)
7. [DW_D05_FIGMA_GAP_CLOSURE_REGISTER.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_FIGMA_GAP_CLOSURE_REGISTER.md)
8. [DW_D05_EN_ES_SCREEN_AND_OVERLAY_INVENTORY.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D05_EN_ES_SCREEN_AND_OVERLAY_INVENTORY.md)
9. [DW_D06_ACTIVE_SERVICE_AND_SCOPE_HANDOFF.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/dw-d05/DW_D06_ACTIVE_SERVICE_AND_SCOPE_HANDOFF.md)

---

### 13. Master Tracker Math & Verification Status

- **Work Package Count Formula:**  
  `11 (DW-D01) + 7 (DW-D02) + 3 (DW-D03) + 9 (DW-D04) + 6 (DW-D05) + 6 (DW-D06) + 4 (DW-D07) + 9 (DW-D08) + 13 (DW-D09) = 68 Canonical Screens` (136 bilingual variants).
- **Cumulative Audit Progress:** **36 / 68 Canonical States (52.9%)** and **72 / 136 Localized Variants (52.9%)** verified and closed.
- **Customer App Frozen Baseline:** `942c869de6726b9f277abcd1776728b228f7b2e4`.
- **Verified Remote Git Baseline:** `001902087a63bd9bf372cc7e9dbe9708170bf798` on branch `main`.
