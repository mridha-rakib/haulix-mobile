# HAULIX Driver/Worker Mobile App — Phase DW-D09 Handoff

## Worker Profile, Job History, Document Verification, Support & Remaining Architecture Handoff

**Phase Destination:** DW-D09 (Final Driver/Worker Design Phase)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Audit Progress Post-DW-D08:** 55 / 68 Canonical States (80.9%), 110 / 136 Core Variants, 8 / 14 Overlay Frames  
**Remaining Scope for DW-D09:** 13 Canonical States (26 Bilingual Variants) + 6 Overlay Frames (3 Bilingual Pairs)

---

### 1. Remaining Canonical Screen Scope (13 States / 26 Core Variants)

Phase DW-D09 will conclude the final 13 states to achieve 100% (68/68) design audit coverage across the Driver/Worker mobile application:

| State ID | Screen Name | English Node ID | Spanish Node ID | Functional Domain / Description |
|:---|:---|:---|:---|:---|
| **DW27** | Driver profile | `1086:840` | `1088:1169` | Primary Driver profile root with ratings, stats, vehicle info, settings links |
| **DW28** | Job history | `1086:923` | `1088:1252` | Past completed and cancelled job history list with filtering |
| **DW29** | Job history detail | `1086:974` | `1088:1303` | Historical job summary with route map, completion time, final payout |
| **DW30** | Help & support | `1086:1015` | `1088:1344` | Support ticket creation, FAQ, live agent chat, phone hotline |
| **DW36** | Rating & feedback | `1086:1289` | `1088:1618` | Detailed customer review scores, category breakdown, performance tips |
| **DW37** | Notification settings | `1270:645` | `1270:1596` | Push, SMS, and in-app alert preferences for offers, chat, earnings |
| **DW38** | Language settings | `1270:719` | `1270:1670` | In-app language toggle (English ↔ Spanish) and locale preferences |
| **DW50** | Account documents | `1297:1447` | `1297:2210` | Driver license, vehicle insurance, registration, background check status |
| **DW51** | Document detail / upload | `1297:1546` | `1297:2309` | Document scan, expiration date tracking, re-upload workflow |
| **DW52** | Vehicle information | `1297:1644` | `1297:2407` | Registered truck/van details, cargo dimensions, liftgate capability |
| **DW53** | Document expired alert | `1301:1387` | `1301:2629` | Urgent blocking alert when license/insurance expires; gating dispatch |
| **DW55** | Helper profile | `1305:1408` | `1305:2098` | Dedicated Helper profile view (no vehicle fields, Helper-specific stats) |
| **DW66** | Helper history detail | `1321:1449` | `1321:2140` | Dedicated Helper historical job summary with individual share breakdown |

---

### 2. Remaining Supporting Overlay Scope (6 Frames / 3 Bilingual Pairs)

| Overlay ID | Overlay Name | English Node ID | Spanish Node ID | Triggering Screen / Usage Context |
|:---|:---|:---|:---|:---|
| **OV-03** | Security verification | `1282:549` | `1282:559` | Biometric / 2FA verification prompt during sensitive profile updates |
| **OV-04** | Emergency assistance | `1282:569` | `1282:579` | 911 / HAULIX emergency dispatch panic sheet during active jobs |
| **OV-05** | Availability settings overlay | `1286:554` | `1286:568` | Quick availability schedule bottom sheet from DW39 |

*(Note: OV-01 Profile Photo, OV-02 Payout Method, OV-06 Emergency Call, and OV-07 Location Permission are already verified and closed).*

---

### 3. DW-D09 Execution Objectives & Standards

1. Complete comprehensive inspection of all 13 states and 3 remaining overlay pairs in live Figma canvas.
2. Verify role-specific profile bifurcation: Primary Driver (`DW27`) vs Helper (`DW55`).
3. Verify document expiration gating (`DW53`): Dispatch access blocked when essential documents lapse.
4. Verify language switching mechanism (`DW38`) ensuring complete bilingual parity between EN (`1085:2`) and ES (`1088:2`).
5. Standardize any residual touch-target bounds to canonical 88px at `y=844`.
6. Capture 32 final screenshots into `docs/design/dw-d09/screenshots/`.
7. Author 9 DW-D09 design specifications and update master trackers to **68 / 68 (100%)**.
