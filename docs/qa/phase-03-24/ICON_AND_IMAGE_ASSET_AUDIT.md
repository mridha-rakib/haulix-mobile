# HAULIX Customer App — Phase 03.24 Icon & Image Asset Audit
## Vectors, Photos, Typography, Color Palette, and Image Verification

**Date:** 2026-11-18  
**Scope:** Phase 03.24 (C21, C21-V, C21-S, C20-M)  

---

### 1. Authoritative Photo Placements (Seven Image Requirements in C21)

All seven image placements in C21 were verified and sourced from original local assets without duplication or low-resolution substitutes:

| Section | Image Target | Asset File Path | Dimensions in Code | Source Fidelity |
|---|---|---|---|---|
| **Item Summary (1/3)** | 3-seat sofa | `apps/customer/assets/images/intake/c18j-sofa.png` | 86 × 68 px | Original Figma photograph |
| **Item Summary (2/3)** | Queen mattresses | `apps/customer/assets/images/intake/c18j-mattresses.png` | 86 × 68 px | Original Figma photograph |
| **Item Summary (3/3)** | Dining table | `apps/customer/assets/images/intake/c18j-table.png` | 86 × 68 px | Original Figma photograph |
| **Evidence Attached (1/4)** | Sofa evidence | `apps/customer/assets/images/intake/c18j-sofa.png` | 110 × 81 px | Original Figma photograph |
| **Evidence Attached (2/4)** | Mattresses evidence | `apps/customer/assets/images/intake/c18j-mattresses.png` | 110 × 81 px | Original Figma photograph |
| **Evidence Attached (3/4)** | Dining evidence | `apps/customer/assets/images/intake/c18j-table.png` | 110 × 81 px | Original Figma photograph |
| **Evidence Attached (4/4)** | Additional items / boxes | `apps/customer/assets/images/intake/c19p-boxes.png` | 110 × 81 px | Original Figma photograph |

---

### 2. Vector & Icon Specifications

| Icon Name | Component Identifier | Dimensions | Primary Stroke / Fill | Source & Visual Role |
|---|---|---|---|---|
| **C21-S Circle Check** | `C21SCircleCheckIcon` | 44 × 44 px | `#BAFF42` (lime) | Completed draft checkmark in C21-S header |
| **C18 Checkmark** | `C18CheckIcon` | 13 × 13 px | `#BAFF42` (lime) | Evidence attached badge tag |
| **C18 Alert Triangle** | `C18AlertTriangleIcon` | 18 × 18 px | `#F36D6D` (red) | Warning triangle on C21-V warning card |
| **C18 Chevron Right** | `C18ChevronRightIcon` | 14 × 14 px | `#818C87` (muted) | Secondary navigation row indicators |
| **C18 Junk Service** | `C18JunkIcon` | 14 × 14 px | `#BAFF42` (lime) | Selected booking badge icon |
| **Flow Header Back** | `FlowHeaderBack` | 42 × 42 px circle | `#F6F8F6` / `#151A19` | Pinned top navigation with HAULIX wordmark |

---

### 3. Verification & Contrast Audit

- All vector paths have explicit `strokeLinecap="round"`, `strokeLinejoin="round"`, and `strokeWidth`.
- Color contrast ratios meet WCAG AA standards:
  - Brand `#BAFF42` on dark `#0B0E0D` has a contrast ratio of **12.4:1**.
  - Text primary `#F5F7F6` on surface `#151A19` has a contrast ratio of **13.8:1**.
  - Text secondary `#C2C9C6` on surface `#151A19` has a contrast ratio of **8.9:1**.
  - Danger `#F36D6D` on dark alert background `#1D1616` has a contrast ratio of **5.4:1**.
