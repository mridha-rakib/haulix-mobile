# Phase 03.26 — Original Icon & Visual Asset Audit

## 1. Vector & Icon Specifications

| Icon Name                 | Component Identifier | Dimensions        | Primary Stroke / Fill | Source & Visual Role                          |
| :------------------------ | :------------------- | :---------------- | :-------------------- | :-------------------------------------------- |
| **C18 Checkmark**         | `C18CheckIcon`       | 17 × 17 px        | `#BAFF42` (lime)      | Customer booking badge verification indicator |
| **Review Required Check** | `C18CheckIcon`       | 16 × 16 px        | `#ADB7B1` (muted)     | Safety assessment policy review badge icon    |
| **Flow Header Back**      | `FlowHeaderBack`     | 42 × 42 px circle | `#F6F8F6` / `#151A19` | Pinned top navigation with HAULIX wordmark    |
| **Primary Action CTA**    | Native button        | 52 px height      | `#BAFF42` / `#080B0B` | Primary action trigger with 12px radius       |
| **Secondary Action CTA**  | Native button        | 52 px height      | `#151A19` / `#35403B` | Outline recovery action with 12px radius      |

---

## 2. Token Alignment

| UI Element          | HAULIX Design Token    | Hex Code  | Verified Usage                                    |
| :------------------ | :--------------------- | :-------- | :------------------------------------------------ |
| Background Base     | `colors.background`    | `#080B0B` | Screen container                                  |
| Surface Background  | `colors.surface`       | `#151A19` | Content cards, step indicators, secondary buttons |
| Elevated Surface    | `colors.elevated`      | `#222827` | Review required badges                            |
| Primary Brand       | `colors.brand`         | `#BAFF42` | Primary CTA, active badges, highlights            |
| Primary Text        | `colors.primaryText`   | `#F6F8F6` | Screen titles, card headings, primary action text |
| Secondary Text      | `colors.secondaryText` | `#ADB7B1` | Subtitles, payload lines, policy notices          |
| Border Subtle       | `colors.borderSubtle`  | `#35403B` | Card outlines, secondary button borders           |
| Warning Badge Green | Custom Context Fill    | `#1A2510` | Dark green background for verified context badges |

---

## 3. Photographic Layer Audit

- In accordance with the authoritative Figma frames (`394:290`, `980:11066`, `394:392`, `980:11126`, `394:494`, `980:11186`, `382:2161`, `980:10514`), **NO** arbitrary photo layers are injected into these 4 review screens.
- All 4 screens cleanly present textual payload items, safety assessments, context badges, and action triggers exactly as designed in Figma.
