# Phase 03.28 — Original Icon & Visual Asset Audit

## 1. Vector & Icon Specifications

| Icon Name                 | Component Identifier   | Dimensions        | Primary Stroke / Fill | Source & Visual Role                                                     |
| :------------------------ | :--------------------- | :---------------- | :-------------------- | :----------------------------------------------------------------------- |
| **C18 Checkmark**         | `C18CheckIcon`         | 17 × 17 px        | `#BAFF42` (lime)      | Customer booking badge verification indicator                            |
| **Review Required Check** | `C18CheckIcon`         | 16 × 16 px        | `#ADB7B1` (muted)     | Safety assessment policy review badge icon                               |
| **Flow Header Back**      | `FlowHeaderBack`       | 42 × 42 px circle | `#F6F8F6` / `#151A19` | Pinned top navigation with HAULIX wordmark                               |
| **Flow Header Start**     | `FlowHeaderStart`      | 60 px height      | `#F6F8F6` / `#BAFF42` | Centered HAULIX brand wordmark header without back arrow (for C22 entry) |
| **AI Advisory Info Icon** | Native SVG Circle/Path | 23 × 23 px        | `#BAFF42` (lime)      | Advisory feedback card info indicator                                    |
| **Primary Action CTA**    | Native button          | 52 px height      | `#BAFF42` / `#080B0B` | Primary action trigger with 12px radius                                  |
| **Secondary Action CTA**  | Native button          | 52 px height      | `#151A19` / `#35403B` | Outline recovery action with 12px radius                                 |

---

## 2. Token Alignment

| UI Element           | HAULIX Design Token    | Hex Code  | Verified Usage                                              |
| :------------------- | :--------------------- | :-------- | :---------------------------------------------------------- |
| Background Base      | `colors.background`    | `#080B0B` | Full screen container background                            |
| Surface Background   | `colors.surface`       | `#151A19` | Primary cards, payload panels, secondary action buttons     |
| Elevated Surface     | `colors.elevated`      | `#222827` | Review badges, progress event rows, and evidence photo rows |
| Primary Brand        | `colors.brand`         | `#BAFF42` | Primary CTA, verification checkmarks, badge highlights      |
| Primary Text         | `colors.primaryText`   | `#F6F8F6` | Screen titles, card headings, primary action text           |
| Secondary Text       | `colors.secondaryText` | `#ADB7B1` | Subtitles, payload metadata lines, policy notices           |
| Border Subtle        | Figma Token            | `#35403B` | Card outlines, dividers, secondary button borders           |
| Verified Badge Green | Custom Context Fill    | `#1A2510` | Dark green background for verified context badges           |

---

## 3. Photographic Layer Audit

- **W03-F & W03-R:** In accordance with authoritative Figma frames (`394:239`, `980:11246`, `392:507`, `980:10946`), **NO** photographic layers exist on these review handoff screens. No arbitrary photo layers were injected.
- **C22 (4 Original Evidence Photos):**
  1. Sofa (`assets/images/intake/c18j-sofa.png`) — 102 × 74 px thumbnail
  2. Queen Mattresses (`assets/images/intake/c18j-mattresses.png`) — 102 × 74 px thumbnail
  3. Dining Table (`assets/images/intake/c18j-table.png`) — 102 × 74 px thumbnail
  4. Other Junk (`assets/images/intake/c19p-boxes.png`) — 102 × 74 px thumbnail
- **C22-P (2 Original Evidence Photos):**
  1. Sofa (`assets/images/intake/c18j-sofa.png`) — 102 × 74 px thumbnail
  2. Queen Mattresses (`assets/images/intake/c18j-mattresses.png`) — 102 × 74 px thumbnail
- All images are original project concept assets matching Figma node geometry and aspect ratios.
