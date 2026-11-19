# HAULIX Phase 03.29 — Original Icon and Image Asset Audit

**Batch:** Phase 03.29  
**Flow:** W03 — AI Suggested Items, Recognition Failure, Offline Recovery & Missing Photos  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Date:** November 19, 2026  
**Auditor:** Antigravity AI Agent

---

## 1. Executive Summary

This audit catalogs all photographic image layers and SVG vector assets utilized across the four canonical Phase 03.29 screens:

- **C22-D** (`412:328` / `987:10084`): AI Suggested Items / Quantity Mismatch
- **C22-F** (`412:388` / `987:10154`): Recognition Failed / Preserved Draft
- **C22-O** (`412:433` / `987:10209`): Offline Recovery
- **C22-E** (`412:474` / `987:10259`): Missing Photo Evidence

Strict non-fabrication criteria are maintained:

- Zero stock or AI-generated images introduced.
- Genuine original photographs are used exclusively in C22-D (Sofa, Queen Mattress, Dining Table) at authentic 90 × 74 px geometry.
- Screens C22-F, C22-O, and C22-E strictly contain NO photographic layers, matching the authoritative Figma specification.
- Native React Native SVG icons are used for feedback notices with precise colors (`#F36D6D` for error/offline, `#ADB7B1` for advisory/mismatch).

---

## 2. Photographic Asset Ledger (C22-D Only)

| Item Description   | Figma Node (EN / ES)    | Geometry              | Local File Path                                          | Provenance & Quality                                                           |
| :----------------- | :---------------------- | :-------------------- | :------------------------------------------------------- | :----------------------------------------------------------------------------- |
| **3-seat sofa**    | `412:353` / `987:10098` | 90 × 74 px (radius 8) | `apps/customer/assets/images/intake/c18j-sofa.png`       | Authentic original photo from C18-J / C22 intake evidence. Sharp aspect ratio. |
| **Queen mattress** | `412:359` / `987:10104` | 90 × 74 px (radius 8) | `apps/customer/assets/images/intake/c18j-mattresses.png` | Authentic original photo from C18-J / C22 intake evidence. Sharp aspect ratio. |
| **Dining table**   | `412:365` / `987:10110` | 90 × 74 px (radius 8) | `apps/customer/assets/images/intake/c18j-table.png`      | Authentic original photo from C18-J / C22 intake evidence. Sharp aspect ratio. |

_Note: C22-F, C22-O, and C22-E contain zero photographic image layers in Figma, and zero photographs in the implementation._

---

## 3. SVG Vector Asset Ledger

| Component / Vector                        | Implementation               | Geometry          | Color / Stroke                                        | Figma Source & Usage                                                    |
| :---------------------------------------- | :--------------------------- | :---------------- | :---------------------------------------------------- | :---------------------------------------------------------------------- |
| **Flow Header Back**                      | `FlowHeaderBack`             | 42 × 42 px circle | `#F6F8F6` / `#151A19`                                 | Pinned navigation header with back circular button and HAULIX wordmark. |
| **Notice Info Icon (Advisory / Neutral)** | Native SVG `Circle` + `Path` | 23 × 23 px        | `#ADB7B1` (subtle)                                    | C22-D and C22-E feedback cards. ViewBox 0 0 24 24.                      |
| **Notice Error Icon (Failure / Offline)** | Native SVG `Circle` + `Path` | 23 × 23 px        | `#F36D6D` (error red)                                 | C22-F and C22-O feedback cards. ViewBox 0 0 24 24.                      |
| **Primary Action CTA**                    | Native Button                | 52 px height      | `#BAFF42` (lime) / `#080B0B` (dark text)              | Primary trigger with 12px border radius.                                |
| **Secondary Action CTA**                  | Native Button                | 56 px height      | `#151A19` surface / `#35403B` border / `#BAFF42` text | Secondary recovery or alternative pathway trigger.                      |

---

## 4. Design Token Alignment

| UI Element             | HAULIX Design Token    | Hex Code  | Verified Implementation                                 |
| :--------------------- | :--------------------- | :-------- | :------------------------------------------------------ |
| **Background Base**    | `colors.background`    | `#080B0B` | Screen container background                             |
| **Surface Background** | `colors.surface`       | `#151A19` | Primary cards, flow marker, action buttons              |
| **Elevated Surface**   | `colors.elevated`      | `#222827` | Suggested item rows, notice banners                     |
| **Primary Brand**      | `colors.brand`         | `#BAFF42` | Primary CTA, flow marker active text, ledger badge text |
| **Primary Text**       | `colors.primaryText`   | `#F6F8F6` | Screen titles, card headings, button text               |
| **Secondary Text**     | `colors.secondaryText` | `#ADB7B1` | Screen subtitles, card body text, secondary labels      |
| **Border Subtle**      | Exact Figma Token      | `#35403B` | Card borders, secondary button borders                  |
| **Status Error**       | Exact Figma Token      | `#F36D6D` | Recognition failure & offline card borders and icons    |
| **Ledger Green Fill**  | Exact Figma Fill       | `#1A2510` | Customer ledger badge background fill                   |

---

## 5. Audit Verdict

All photographic and vector requirements are 100% compliant with the authoritative Figma specification. Zero synthetic or stock assets exist in this implementation.
