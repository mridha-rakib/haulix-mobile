# HAULIX Phase 03.30 — Original Image and SVG Asset Audit

**Batch:** Phase 03.30  
**Flow:** W03 — AI Uncertainty, Inventory Verification & Manual Recovery  
**Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`  
**Audit Date:** November 19, 2026  
**Auditor:** Antigravity AI Agent

---

## 1. Asset Inventory & Verification Matrix

All graphical and photographic assets in Phase 03.30 derive from authoritative Figma concepts and exist locally on disk as optimized assets. No generic placeholder imagery or synthetic icons are used.

| Screen Code | Asset Name              | Type      | Local Project Path                                       | Sizing (W × H)         | Visual Context                                                    |
| :---------- | :---------------------- | :-------- | :------------------------------------------------------- | :--------------------- | :---------------------------------------------------------------- |
| **C22-Q**   | `c18j-mattresses.png`   | PNG Photo | `apps/customer/assets/images/intake/c18j-mattresses.png` | 102 × 74 px (radius 9) | Overlapping queen mattresses photograph in clarification card     |
| **C23**     | `c18j-sofa.png`         | PNG Photo | `apps/customer/assets/images/intake/c18j-sofa.png`       | 90 × 74 px (radius 8)  | 3-seat fabric sofa in comparison list                             |
| **C23**     | `c18j-mattresses.png`   | PNG Photo | `apps/customer/assets/images/intake/c18j-mattresses.png` | 90 × 74 px (radius 8)  | Queen mattresses mismatch row in comparison list                  |
| **C23**     | `c18j-table.png`        | PNG Photo | `apps/customer/assets/images/intake/c18j-table.png`      | 90 × 74 px (radius 8)  | Dining table in comparison list                                   |
| **C23-M**   | _None (Text-only rows)_ | —         | N/A                                                      | Full width × 63 px     | Saved manual record fields: Sofa, Mattresses, Table, Evidence     |
| **C23-U**   | _None (Text-only rows)_ | —         | N/A                                                      | Full width × 63 px     | Details needing attention: Item, Quantity, Weight, Exact, Lifting |

---

## 2. Vector Components & SVG Elements

| Component Name   | Figma Node ID                | Implementation    | Attributes / Tokens                                           | Usage                                            |
| :--------------- | :--------------------------- | :---------------- | :------------------------------------------------------------ | :----------------------------------------------- |
| `FlowHeaderBack` | Node `429:296`               | Shared Component  | Back circle, chevron icon, HAULIX wordmark, "We Haul It All." | Top flow navigation on all 4 canonical screens   |
| `FeedbackNotice` | Node `315:212`               | Native SVG + Flex | Svg Circle + Path, 23 × 23 px, stroke `#ADB7B1`               | Info/alert notice box on all 4 canonical screens |
| `FlowMarker`     | Node `412:529` / `987:10312` | View + Text       | Badge height 34 px, radius 9, bg `#151A19`, text `#BAFF42`    | Substep breadcrumb identifier                    |
| `LedgerBadge`    | Node `412:535` / `987:10318` | View + Text       | Badge height 37 px, radius 8, bg `#1A2510`, text `#BAFF42`    | Active customer & booking identification         |

---

## 3. Image Sizing & Aspect Ratio Conformance

1. **C22-Q Mattresses Evidence Thumbnail:** Exactly 102 px wide by 74 px high with border radius of 9 px, perfectly matching Figma node `412:540` and `987:10323`.
2. **C23 Item Thumbnails:** Exactly 90 px wide by 74 px high with border radius of 8 px, matching Figma nodes `412:588`, `412:594`, and `412:600`.
3. **No Image Assets on C23-M & C23-U:** Conforms with authoritative Figma designs where manual records and measurement details are structured as card field rows without photo layers.
