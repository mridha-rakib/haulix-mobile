# Phase 03.20: Icon and Image Manifest

This manifest documents all visual and graphic assets required across the four Phase 03.20 screens (C18-A, C18-T, C18-R-E, C19).

---

## 1. Photographic Assets (C19 Item Inventory)

Original photographs extracted directly from authoritative Figma frames:

| Asset Name            | Format | Dimensions   | Storage Path                                             | Usage in Phase 03.20                                   | Status           |
| --------------------- | ------ | ------------ | -------------------------------------------------------- | ------------------------------------------------------ | ---------------- |
| `c18j-sofa.png`       | PNG    | 160 × 160 px | `apps/customer/assets/images/intake/c18j-sofa.png`       | C19 Item 1: 3-seat sofa (`382:1270` / `980:9330`)      | Verified & Sharp |
| `c18j-mattresses.png` | PNG    | 160 × 160 px | `apps/customer/assets/images/intake/c18j-mattresses.png` | C19 Item 2: Queen mattresses (`382:1276` / `980:9337`) | Verified & Sharp |
| `c18j-table.png`      | PNG    | 160 × 160 px | `apps/customer/assets/images/intake/c18j-table.png`      | C19 Item 3: Dining table (`382:1282` / `980:9343`)     | Verified & Sharp |

---

## 2. Precision Vector Icons & UI Graphics

All vector icons are implemented cleanly as React Native SVG components in `@haulix/ui` or `apps/customer/src/components/discovery/`:

| Component Name         | Figma Node Source       | Visual Representation               | Target Screens             | Color / Stroke          | Classification                  |
| ---------------------- | ----------------------- | ----------------------------------- | -------------------------- | ----------------------- | ------------------------------- |
| `C18CheckIcon`         | `387:192`               | Circular / checkmark customer badge | C18-A, C18-T, C18-R-E, C19 | `#BAFF42`               | Reused from `C18BatchIcons.tsx` |
| `C18ApplianceIcon`     | `387:216`               | Refrigerator / appliance            | C18-A (selected), C18-T    | `#BAFF42` / `#ADB7B1`   | Reused from `C18BatchIcons.tsx` |
| `C18MattressIcon`      | `387:225`               | Bed / mattress                      | C18-T (selected), C18-A    | `#BAFF42` / `#ADB7B1`   | Reused from `C18BatchIcons.tsx` |
| `C18FurnitureIcon`     | `387:207`               | Sofa / armchair                     | C18-A, C18-T               | `#ADB7B1`               | Reused from `C18BatchIcons.tsx` |
| `C18ToolsIcon`         | `387:231`               | Tools / wrench assembly             | C18-A, C18-T               | `#ADB7B1`               | Reused from `C18BatchIcons.tsx` |
| `C18ChevronRightIcon`  | `387:204`               | Chevron arrow ›                     | C18-A, C18-T, C18-R-E, C19 | `#ADB7B1` / `#BAFF42`   | Reused from `C18BatchIcons.tsx` |
| `C18HazardShieldIcon`  | `387:260`               | Check / review shield badge         | C18-A, C18-T               | `#FFC85A`               | Reused from `C18BatchIcons.tsx` |
| `C18AlertTriangleIcon` | `382:1234` / `980:9279` | Warning / alert triangle            | C18-R-E                    | `#EF4444`               | New in `C18BatchIcons.tsx`      |
| `FlowHeaderBack`       | `436:2792`              | Back arrow navigation circle        | All screens                | Native HAULIX Component | Reused from navigation suite    |

---

## 3. Brand & Styling Palette Compliance

- **Brand Accent:** `#BAFF42` (Neon lime)
- **Background Base:** `#080B0B`
- **Surface Dark:** `#151A19`
- **Elevated Border:** `#222827`
- **Subtle Outline:** `#35403b`
- **Primary Text:** `#F6F8F6`
- **Secondary Text:** `#ADB7B1`
- **Warning Indicator:** `#FFC85A`
- **Error / Missing Action Indicator:** `#EF4444`
