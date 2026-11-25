# HAULIX Driver & Worker Mobile App — Phase DW-D03
# Canonical Reusable Bottom Navigation Specification

**Phase:** DW-D03  
**Target Module:** Navigation Architecture (DW-W01 — DW-W09)  
**Authoritative Component Reference:** Node `1084:26` (`Driver / Bottom Navigation · Five Tabs`) on Page `314:2`  
**Icon Component Set Reference:** Node `1314:320` (`HAULIX / Bottom Navigation Icons · Five Tabs`) on Page `314:2`  
**Viewport:** 430 × 88 px (standardized across all 68 canonical states)  

---

## 1. Master Navigation Component Architecture

The HAULIX Driver & Worker Mobile App utilizes a unified, five-tab bottom navigation bar across all operational screens:

### Component Metadata:
- **Master Component Node ID:** `1084:26`
- **Master Component Name:** `Driver / Bottom Navigation · Five Tabs`
- **Page Location:** `314:2` (`06 — Component Library · HAULIX`)
- **Canonical Dimensions:** `width: 430px`, `height: 88px`
- **Canvas Alignment:** `x: 0`, `y: 844` (on 430 × 932 px reference canvas)
- **Background Fill:** `VariableID:5:4` (`colors.surface` `#151A19`)
- **Top Border:** `1084:27` (`Top divider`, 430 × 1 px, `VariableID:5:5` `#222A28`)

### Five Standard Tab Columns:
1. **Home (`Tab 1`):** x: 8..83 (Center x: 45.5). Vector icon at x: 32.5, y: 12. Label at x: 8, y: 49.
2. **Jobs (`Tab 2`):** x: 92..167 (Center x: 129.5). Vector icon at x: 116.5, y: 12. Label at x: 92, y: 49.
3. **Earnings (`Tab 3`):** x: 176..251 (Center x: 213.5). Vector icon at x: 200.5, y: 12. Label at x: 176, y: 49.
4. **Messages (`Tab 4`):** x: 260..335 (Center x: 297.5). Vector icon at x: 284.5, y: 12. Label at x: 260, y: 49.
5. **Profile (`Tab 5`):** x: 344..419 (Center x: 381.5). Vector icon at x: 368.5, y: 12. Label at x: 344, y: 49.

---

## 2. Inconsistent 119px vs 88px Resolution

### Problem Identified:
Prior to DW-D03, nine English screens (`DW09`, `DW10`, `DW14`, `DW18`, `DW23`, `DW62`, `DW63`, `DW64`, `DW65`) contained legacy navigation containers with `height: 119px` positioned at `y: 813`. These legacy frames contained redundant duplicate vector graphics and an old active underline element that encroached 31px into the content viewport. In contrast, all Spanish peer screens and all newer English screens used the approved `height: 88px, y: 844` standard.

### Figma Correction Executed:
All nine legacy 119px frames were resized and standardized directly in the authoritative Figma canvas:
- `1086:19` (`DW09 · Driver dashboard`): Resized to 430 × 88, positioned at y: 844.
- `1086:97` (`DW10 · Job offers`): Resized to 430 × 88, positioned at y: 844.
- `1086:284` (`DW14 · Helper invitations`): Resized to 430 × 88, positioned at y: 844.
- `1086:475` (`DW18 · Job messages`): Resized to 430 × 88, positioned at y: 844.
- `1086:686` (`DW23 · Earnings overview`): Resized to 430 × 88, positioned at y: 844.
- `1309:970` (`DW62 · Helper active job`): Resized to 430 × 88, positioned at y: 844.
- `1309:1068` (`DW63 · Helper on-site progress`): Resized to 430 × 88, positioned at y: 844.
- `1309:1163` (`DW64 · Helper work evidence`): Resized to 430 × 88, positioned at y: 844.
- `1309:1259` (`DW65 · Helper work submitted`): Resized to 430 × 88, positioned at y: 844.
- Labels were aligned to `y: 49`, and all redundant SVG artifacts were removed.

**Result:** 100% of the 68 core screens in English and Spanish now strictly adhere to the approved 88px bottom navigation standard.

---

## 3. Role-Specific Tab Routing Matrix

In compliance with Monorepo Critical Rule #3 (**Preserve Role Boundaries**), the five tabs resolve dynamically based on the authenticated worker's role:

| Tab Name | Driver Destination (EN) | Driver Destination (ES) | Helper Destination (EN) | Helper Destination (ES) | Role Boundary Protection |
|:---|:---|:---|:---|:---|:---|
| **Home** | `DW09` (`1086:3`) | `DW09` (`1088:332`) | `DW31` (`1086:1058`) | `DW31` (`1088:1387`) | Helpers never see Driver dispatches; Drivers never see Helper invitation queue. |
| **Jobs** | `DW28` (`1086:911`) / `DW10` | `DW28` (`1088:1240`) / `DW10` | `DW28` (`1086:911`) / `DW62` | `DW28` (`1088:1240`) / `DW62` | Drivers see vehicle-assigned trips; Helpers see crew assistant assignments. |
| **Earnings** | `DW23` (`1086:670`) | `DW23` (`1088:999`) | `DW24` (`1086:728`) / `DW23` | `DW24` (`1088:1057`) / `DW23` | Drivers see vehicle/mileage ledger; Helpers see individual hourly/split labor ledger. |
| **Messages** | `DW18` (`1086:459`) | `DW18` (`1088:788`) | `DW18` (`1086:459`) | `DW18` (`1088:788`) | Common communications hub with role badges on participant tiles. |
| **Profile** | `DW27` (`1086:840`) | `DW27` (`1088:1169`) | **`DW55` (`1301:1534`)** | **`DW55` (`1301:2776`)** | **CRITICAL:** Helpers route to `DW55` (Helper Profile), NOT `DW27` (Driver Documents & Vehicle). |

---

## 4. Helper Profile Navigation Correction (`DW27` ➔ `DW55`)

### Defect Identified:
In the original Figma prototype, multiple Helper screens had Profile tab prototype trigger layers named `NAV ROUTE / DW27 / Profile`. While some destination IDs were redirected during previous iterations, the layer naming and several prototype reactions created ambiguity and threatened role isolation.

### Figma Correction Executed:
All Helper screens were inspected and their Profile navigation trigger layers were explicitly updated:
- `1086:1107` (`DW31 EN`): Renamed to `NAV ROUTE / DW55 / Helper profile` ➔ Points to `1301:1534` (`DW55 EN`).
- `1088:1436` (`DW31 ES`): Renamed to `NAV ROUTE / DW55 / Perfil del ayudante` ➔ Points to `1301:2776` (`DW55 ES`).
- `1086:326` (`DW14 EN`): Renamed to `NAV ROUTE / DW55 / Helper profile` ➔ Points to `1301:1534`.
- `1088:655` (`DW14 ES`): Renamed to `NAV ROUTE / DW55 / Perfil del ayudante` ➔ Points to `1301:2776`.
- `1309:1027` (`DW62 EN`): Renamed to `NAV ROUTE / DW55 / Helper profile` ➔ Points to `1301:1534`.
- `1309:1735` (`DW62 ES`): Renamed to `NAV ROUTE / DW55 / Perfil del ayudante` ➔ Points to `1301:2776`.
- `1309:1125` (`DW63 EN`): Renamed to `NAV ROUTE / DW55 / Helper profile` ➔ Points to `1301:1534`.
- `1309:1817` (`DW63 ES`): Renamed to `NAV ROUTE / DW55 / Perfil del ayudante` ➔ Points to `1301:2776`.
- `1309:1220` (`DW64 EN`): Renamed to `NAV ROUTE / DW55 / Helper profile` ➔ Points to `1301:1534`.
- `1309:1896` (`DW64 ES`): Renamed to `NAV ROUTE / DW55 / Perfil del ayudante` ➔ Points to `1301:2776`.
- `1309:1316` (`DW65 EN`): Renamed to `NAV ROUTE / DW55 / Helper profile` ➔ Points to `1301:1534`.
- `1309:1976` (`DW65 ES`): Renamed to `NAV ROUTE / DW55 / Perfil del ayudante` ➔ Points to `1301:2776`.

**Result:** Zero Helper screens navigate to `DW27 · Profile & Documents`. Helpers exclusively access `DW55 · Helper profile` and its child hubs (`DW56` and `DW57`).
