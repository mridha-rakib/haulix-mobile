# Original Icon and Image Asset Audit — Phase 03.36

## HAULIX Customer Mobile App · Vector Icons & Graphic Assets

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.36  
**Execution Date:** November 20, 2026

---

## 1. Vector Icon Architecture & Reuse

In accordance with HAULIX design system guidelines, all iconography is rendered using original SVG vector paths matching the authoritative Figma file `Q946h4YBGgyLsjnPtdyQNe`. No generic third-party icon kits (e.g. Feather, FontAwesome) are substituted where bespoke HAULIX geometries are specified.

| Icon Component       | Usage Location                                                                                    | Figma Reference                  | Geometry & Styling                                                                               |
| :------------------- | :------------------------------------------------------------------------------------------------ | :------------------------------- | :----------------------------------------------------------------------------------------------- |
| **ArrowLeftIcon**    | Header Back Button (`c27-header-back`, `c27a-header-back`, `c27s-header-back`, `c28-header-back`) | Shared Header Component          | 20×20 px, stroke `#FFFFFF`, 2px stroke width, rounded caps                                       |
| **ClockFastIcon**    | ASAP Option Card (C27, C27-A)                                                                     | Node `763:2` (ASAP Card)         | 24×24 px, clock face with dynamic speed lines, stroke `#00E599`                                  |
| **CalendarGridIcon** | Scheduled Window Option Card (C27, C27-S)                                                         | Node `763:2` (Schedule Card)     | 24×24 px, monthly calendar grid layout with header bar, stroke `#00E599`                         |
| **CheckCircleIcon**  | Selected Window Indicator (C27-S)                                                                 | Node `763:133` (Time Window Row) | 18×18 px, circle with centered checkmark, fill `#00E599`, icon `#0E1412`                         |
| **CheckboxIcon**     | Terms Consent Checkbox (C28)                                                                      | Node `763:396` (Consent Row)     | 20×20 px, rounded square (4px radius), border `#00E599` / `#5D7069`, inner checkmark when active |
| **InfoCircleIcon**   | Informational Notices & Tooltips (C27, C27-A, C27-S, C28)                                         | Notice Banners                   | 16×16 px, circle with centered "i" glyph, stroke `#F2C94C` / `#8A9E96`                           |
| **ChevronRightIcon** | Action Navigation Arrows (C27-A, C27-S, C28)                                                      | Secondary & Alternative CTAs     | 16×16 px, stroke `#8A9E96`, rightward chevron                                                    |
| **LocationPinIcon**  | Location Header Pill (`PHOENIX, AZ 85004 · DEMO`)                                                 | Header Pill                      | 14×14 px, geo-pin marker with center hole, stroke `#00E599`                                      |

---

## 2. Image Asset Audit

### 2.1 Inventory Image Representation

- As established in Phase 03.28–03.35, the customer inventory comprises **4 confirmed items across 3 categories**:
  - `1 Sofa`
  - `2 Chairs` (illustrated as part of the composite furniture removal scope)
  - `1 Mattress` / `2 Queen Mattresses` (invariant retained across the pricing scope model)
- Visual rendering uses the dedicated HAULIX dark-surface inventory preview cards with subtle emerald container borders and crisp typography.

### 2.2 Brand Identity & Wordmark

- The canonical HAULIX header wordmark (`HAULIX® · WE HAUL IT ALL.` / `HAULIX® · LO RECOGEMOS TODO.`) is rendered directly via SVG text and brand glyphs, ensuring crisp rendering across high-DPI Android viewports.

---

## 3. Visual Quality Verification on Realme Note 60

1. **Resolution & Density:** Device screen density is `xhdpi` (720 × 1600 px, ~260 PPI). All SVG icons scale cleanly without pixelation or aliasing artifacts.
2. **Touch Targets:** Back button and action icons are wrapped in minimum 44×44 px touchable bounds (`hitSlop` configured), meeting accessibility criteria.
3. **Color Contrast:** Emerald brand icons (`#00E599`) against dark surfaces (`#151D1A`) yield a contrast ratio of >8.5:1, comfortably exceeding WCAG AAA standards.
