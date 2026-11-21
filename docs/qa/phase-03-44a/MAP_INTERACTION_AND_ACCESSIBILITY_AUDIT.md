# HAULIX Customer Mobile App — Phase 03.44A

## Map Interaction & Accessibility (a11y) Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.44A  
**TARGET:** `HaulixDispatchMap.tsx` Interactive Controls & Screen-Reader Compatibility

---

### 1. Interactive Controls Audit

| Control Element     | Test ID              | Touch Target Size      | Accessibility Role | Accessibility Label (EN / ES)                                                                          | Functional Result                                            |
| :------------------ | :------------------- | :--------------------- | :----------------- | :----------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **Zoom In Button**  | `map-zoom-in-btn`    | 38 × 36 px (hitSlop 6) | `button`           | `t("c32Map.zoomInA11y")` ("Zoom in map" / "Acercar mapa")                                              | Increments zoom level by +0.15 (clamped to 1.4x)             |
| **Zoom Out Button** | `map-zoom-out-btn`   | 38 × 36 px (hitSlop 6) | `button`           | `t("c32Map.zoomOutA11y")` ("Zoom out map" / "Alejar mapa")                                             | Decrements zoom level by -0.15 (clamped to 0.75x)            |
| **Recenter Button** | `map-recenter-btn`   | 38 × 38 px (hitSlop 8) | `button`           | `t("c32Map.recenterA11y")` ("Recenter map on active location" / "Centrar mapa en la ubicación activa") | Resets zoom to 1.0x and displays floating confirmation toast |
| **Recenter Toast**  | `map-recenter-toast` | Floating banner        | `none`             | `t("c32Map.recenterNotice")` ("Map view recentered" / "Vista del mapa centrada")                       | Auto-dismisses after 1.2s                                    |

---

### 2. Screen-Reader & Contrast Verification

- **Accessibility Role:** Explicit `accessibilityRole="button"` declared on all interactive pressables.
- **Labels:** 100% localized through `@haulix/i18n` with zero hardcoded strings.
- **Color Contrast:**
  - Status capsule text: `#BAFF42` (neon lime) on `rgba(11, 15, 14, 0.94)` dark surface exceeds WCAG AA 4.5:1 ratio (>11:1).
  - Button iconography: `#BAFF42` and `#ADB7B1` on `#161D1A` exceed WCAG AA ratio (>7:1).
