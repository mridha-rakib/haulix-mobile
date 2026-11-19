# HAULIX Customer Mobile App — Phase 03.32

## Original Vector & Photograph Asset Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.32  
**Batch Scope:** 4 canonical screens × 2 languages = 8 localized versions  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Audit Date:** November 19, 2026

---

## 1. Photograph Assets Audit

| Asset File                                               | Usage in Phase 03.32                    | Source Figma Nodes      | Dimensions                        | Status                         |
| :------------------------------------------------------- | :-------------------------------------- | :---------------------- | :-------------------------------- | :----------------------------- |
| `apps/customer/assets/images/intake/c18j-sofa.png`       | C24-Q Verified Item 1: 3-seat sofa      | `412:1140`, `987:11051` | 90 × 74 px (displayed 56 × 46 px) | Verified on disk (5,705 bytes) |
| `apps/customer/assets/images/intake/c18j-mattresses.png` | C24-Q Verified Item 2: Queen mattresses | `412:1140`, `987:11051` | 90 × 74 px (displayed 56 × 46 px) | Verified on disk (6,375 bytes) |
| `apps/customer/assets/images/intake/c18j-table.png`      | C24-Q Verified Item 3: Dining table     | `412:1140`, `987:11051` | 90 × 74 px (displayed 56 × 46 px) | Verified on disk (7,770 bytes) |

No external URLs or temporary Figma download links are referenced in runtime code. All image assets are resolved locally via static `require()` statements.

---

## 2. Vector Icon Assets Audit

| Vector Component      | Usage                                                             | Implementation                                | Source                                                       |
| :-------------------- | :---------------------------------------------------------------- | :-------------------------------------------- | :----------------------------------------------------------- |
| `FlowHeaderBack`      | Navigation header on all 4 screens                                | React Native SVG with exact 24×24 chevron     | `apps/customer/src/components/navigation/FlowHeaderBack.tsx` |
| `InfoCircleIcon`      | Pricing model info card on C24-P                                  | React Native SVG with `#BAFF42` stroke        | Inline vector matching Figma component `315:226`             |
| `CheckCircleIcon`     | Completed calculation steps on C24-P; Resolved badge on C24-ADM-S | React Native SVG with `#BAFF42` stroke & fill | Inline vector matching Figma component `315:230`             |
| `WarningTriangleIcon` | Clarification notice on C24-ADM-D; engine error banner on C24-P   | React Native SVG with `#F59E0B` stroke        | Inline vector matching Figma component `315:212`             |
| `ClockIcon`           | Case status badge on C24-ADM-D                                    | React Native SVG with `#F59E0B` stroke        | Inline vector matching Figma component `315:218`             |

---

## 3. Strict Non-Fabrication Compliance

1. **No Simulated/Mocked Media:** Photographs are authentic HAULIX design system assets from Phase 03.18, consistently used across the W03 intake and review journey.
2. **No Fallback Web Placeholders:** External Unsplash, Lorem Pixel, or placeholder CDN URLs are strictly forbidden and not used anywhere in the codebase.
3. **Asset Integrity:** All assets match the aspect ratios, border radii (`8px`), and styling specified in authoritative Figma nodes.
