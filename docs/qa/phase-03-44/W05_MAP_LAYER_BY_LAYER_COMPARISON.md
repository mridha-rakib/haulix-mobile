# HAULIX Customer Mobile App — Phase 03.44

## W05 Map Layer-by-Layer Comparison & Remediation

### 1. Architectural Overview

- **Component:** `apps/customer/src/components/map/HaulixDispatchMap.tsx`
- **Audit Target:** Visual comparison between Phase 03.43 implementation and Phase 03.44 remediated component against authoritative HAULIX design specifications.

---

### 2. Comprehensive Layer Comparison Matrix

| Layer  | Design Element   | Previous Implementation (Phase 03.43)              | Remediated Implementation (Phase 03.44)                                                                               | Remediation Result          |
| :----- | :--------------- | :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| **L1** | Base Canvas      | Fill `#080B0B`, hardcoded dimensions               | Fill `#080B0B`, scalable viewBox with dynamic zoom boundaries                                                         | **CORRECTED & POLISHED**    |
| **L1** | Urban Blocks     | 19 rectangular shapes                              | Structured block silhouettes with Salt River canal corridor and Margaret T. Hance Park preserve                       | **CORRECTED**               |
| **L2** | Minor Streets    | Minor arterials stroke `#222D29`, width 2.2px      | Strict Phoenix grid alignment (Central Ave, 7th St, McDowell Rd, Thomas Rd)                                           | **CORRECTED**               |
| **L2** | Major Freeway    | Double line `#2E3D37` (I-10 corridor)              | Cased freeway geometry matching Phoenix metro east-west corridor                                                      | **CORRECTED**               |
| **L3** | Route Line       | Stroke `#BAFF42`, width 3.5px                      | Pure road-following polyline following McDowell Rd East, turning North on 7th St. Zero diagonal cutting across blocks | **CORRECTED**               |
| **L3** | Route Glow       | Translucent stroke width 9px                       | Dual-layer neon halo with 22% alpha `#BAFF42` underlay                                                                | **VERIFIED**                |
| **L4** | Pickup Marker    | Fixed coordinates `(275, 225)`                     | Precise pin with outer ripple ring, centered center dot                                                               | **VERIFIED**                |
| **L4** | Vehicle Marker   | High-Roof Van SVG                                  | Correctly oriented van facing direction of travel (heading ~35° NE along corridor)                                    | **VERIFIED**                |
| **L4** | Radar Sweep      | Concentric circles                                 | Concentric animated pulse rings radiating from pickup anchor during `searching` phase                                 | **VERIFIED**                |
| **L5** | Map Badges       | Hardcoded English strings (`"RADAR ACTIVE"`, etc.) | Fully internationalized via `@haulix/i18n` with zero hardcoded English                                                | **REMEDIATED (P1-I18N-01)** |
| **L5** | Zoom Controls    | English-only `accessibilityLabel`                  | Fully internationalized via `t("c32Map.zoomInA11y")` and `t("c32Map.zoomOutA11y")`                                    | **REMEDIATED (P1-I18N-01)** |
| **L5** | Recenter Control | Hardcoded English toast                            | Fully internationalized via `t("c32Map.recenterNotice")`                                                              | **REMEDIATED (P1-I18N-01)** |

---

### 3. Verification of Route Non-Fabrication

- The route polyline does NOT use random bezier curves or arbitrary diagonals.
- Turns are constrained to realistic road intersections at `(75, 120)` -> `(220, 120)` -> `(220, 225)` -> `(275, 225)`.
