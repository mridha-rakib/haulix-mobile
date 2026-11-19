# HAULIX Customer Mobile App — Phase 03.31

## Original Vector & Photograph Asset Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.31  
**Batch Scope:** 4 canonical screens × 2 languages = 8 localized versions  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Audit Date:** November 19, 2026

---

## 1. Photograph Assets Audit

| Asset File                                               | Usage in Phase 03.31                                                       | Source Figma Nodes                               | Dimensions | Status                         |
| :------------------------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------------- | :--------- | :----------------------------- |
| `apps/customer/assets/images/intake/c18j-sofa.png`       | C23-S Confirmed Item: 3-seat sofa                                          | `412:683`, `987:10506`                           | 90 × 74 px | Verified on disk (5,705 bytes) |
| `apps/customer/assets/images/intake/c18j-mattresses.png` | C23-S Confirmed Item: Queen mattresses<br>C23-R Evidence: Queen mattresses | `412:683`, `987:10506`<br>`412:861`, `987:10714` | 90 × 74 px | Verified on disk (6,375 bytes) |
| `apps/customer/assets/images/intake/c18j-table.png`      | C23-S Confirmed Item: Dining table                                         | `412:683`, `987:10506`                           | 90 × 74 px | Verified on disk (7,770 bytes) |

No external URLs or temporary Figma download links are referenced in runtime code. All image assets are resolved locally via static `require()` statements.

---

## 2. Vector Icon Assets Audit

| Vector Component      | Usage                                       | Implementation                                          | Source                                                       |
| :-------------------- | :------------------------------------------ | :------------------------------------------------------ | :----------------------------------------------------------- |
| `FlowHeaderBack`      | Navigation header on all 4 screens          | React Native SVG with exact 24×24 chevron               | `apps/customer/src/components/navigation/FlowHeaderBack.tsx` |
| `InfoCircleIcon`      | Feedback notice card on C23-C, C23-S, C23-R | React Native SVG with `#BAFF42` stroke                  | Inline vector matching Figma component `315:226`             |
| `WarningTriangleIcon` | Feedback notice card on C24-ADM             | React Native SVG with `#F59E0B` stroke                  | Inline vector matching Figma component `315:212`             |
| `QuantityControls`    | Interactive + / − buttons on C23-C          | Text buttons with `#BAFF42` glyphs and `#35403B` border | C23-C quantity editor                                        |

---

## 3. Strict Non-Fabrication Compliance

1. **No Simulated/Mocked Media:** Photographs are authentic HAULIX design system assets from Phase 03.18.
2. **No Fallback Web Placeholders:** Unsplash or placeholder URLs are strictly forbidden and not used anywhere in the codebase.
3. **Asset Integrity:** All assets match the aspect ratios, border radii (`8px`), and styling specified in authoritative Figma nodes.
