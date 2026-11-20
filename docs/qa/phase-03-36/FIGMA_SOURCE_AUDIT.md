# Figma Source Audit — Phase 03.36

## HAULIX Customer Mobile App · Authoritative Design Specifications

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.36  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `1:2` (Customer Master Page)  
**Sections:** `758:2` (EN · W04 Scheduling & Payment) / `758:3` (ES · W04 Programación y Pago)  
**Execution Date:** November 20, 2026

---

## 1. Authoritative Figma Source Node Inventory

The following table records the canonical Figma node IDs, canvas dimensions, background fills, and section hierarchies for all 4 screens across English and Spanish:

| Screen Code | Language | Figma Node ID | Dimensions    | Canvas Background | Hierarchy / Path                                                            |
| :---------- | :------- | :------------ | :------------ | :---------------- | :-------------------------------------------------------------------------- |
| **C27**     | English  | `763:2`       | 430 × 990 px  | `#0E1412` (dark)  | `W04 Scheduling & Payment · EN` → `C27 · Choose Your Service Time`          |
| **C27**     | Spanish  | `766:388`     | 430 × 1023 px | `#0E1412` (dark)  | `W04 Programación y Pago · ES` → `C27 · Elige cuándo necesitas el servicio` |
| **C27-A**   | English  | `763:71`      | 430 × 905 px  | `#0E1412` (dark)  | `W04 Scheduling & Payment · EN` → `C27-A · Request Service ASAP`            |
| **C27-A**   | Spanish  | `766:457`     | 430 × 905 px  | `#0E1412` (dark)  | `W04 Programación y Pago · ES` → `C27-A · Solicitar servicio cuanto antes`  |
| **C27-S**   | English  | `763:133`     | 430 × 1198 px | `#0E1412` (dark)  | `W04 Scheduling & Payment · EN` → `C27-S · Select Available Window`         |
| **C27-S**   | Spanish  | `766:519`     | 430 × 1215 px | `#0E1412` (dark)  | `W04 Programación y Pago · ES` → `C27-S · Elige un horario disponible`      |
| **C28**     | English  | `763:396`     | 430 × 1195 px | `#0E1412` (dark)  | `W04 Scheduling & Payment · EN` → `C28 · Review Your Booking`               |
| **C28**     | Spanish  | `766:782`     | 430 × 1180 px | `#0E1412` (dark)  | `W04 Programación y Pago · ES` → `C28 · Revisa tu reserva`                  |

---

## 2. Visual Component & Token Analysis

### 2.1 Color Palette Tokens

All screens adhere strictly to HAULIX design tokens sourced from `@haulix/design-tokens`:

- `background`: `#0E1412` (dark canvas background)
- `surface`: `#151D1A` (card container background)
- `elevated`: `#1D2723` (pill, tag and divider borders)
- `brand`: `#00E599` (primary active accents, selected state indicator)
- `primaryText`: `#FFFFFF` (high-contrast primary headings)
- `secondaryText`: `#8A9E96` (metadata, helper text, and subtitles)
- `mutedText`: `#5D7069` (legal disclaimers, footnote text)
- `warningSurface`: `#2A2210` / `warningBorder`: `#59441B` / `warningText`: `#F2C94C` (amber notices for availability & same-day rules)
- `errorSurface`: `#2A1215` / `errorBorder`: `#591B24` / `errorText`: `#FF6B6B` (validation alert container)

### 2.2 Typography Scale

- **Eyebrow Header:** SemiBold, 11px, letter-spacing 1.5px, uppercase, color: `brand` (`#00E599`)
- **Screen Title:** Bold, 24px, line-height 30px, color: `primaryText` (`#FFFFFF`)
- **Subtitle:** Regular, 14px, line-height 20px, color: `secondaryText` (`#8A9E96`)
- **Card Title:** SemiBold, 15px, line-height 20px, color: `primaryText` (`#FFFFFF`)
- **Card Subtext:** Regular, 13px, line-height 18px, color: `secondaryText` (`#8A9E96`)
- **Date / Time Chip:** Bold, 14px, uppercase, color: `primaryText` / `secondaryText`
- **Primary CTA Text:** Bold, 15px, color: `#0E1412` on active brand button; `#5D7069` when gated/disabled

### 2.3 Component Architecture

- **Header:** HAULIX Brand Wordmark + Back navigation button + Location pill (`PHOENIX, AZ 85004 · DEMO`)
- **Step Indicator:** `01 / 04 · SCHEDULE` (C27, C27-A, C27-S) and `02 / 04 · TERMS` (C28)
- **Scope Banner:** `FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS` (preserves 4-piece / 3-category inventory invariant)
- **Selection Cards:** Dual option cards on C27 (Immediate ASAP vs Scheduled Window) with radio-style status indicators
- **Date Carousel:** Horizontal selector for 4 dates with day name and month/day formatting
- **Window Grid:** 4 distinct 2-hour windows with checkmark indicators
- **Consent Gate:** Explicit checkbox on C28 with validation prompt and terms acknowledgment
- **Notice Banners:** Non-blocking warning banners detailing future handoff limits

---

## 3. High-Fidelity Comparison Reference

Figma high-resolution reference images were downloaded and preserved at:

- `docs/qa/phase-03-36/figma/c27-en-figma.png`
- `docs/qa/phase-03-36/figma/c27-es-figma.png`
- `docs/qa/phase-03-36/figma/c27a-en-figma.png`
- `docs/qa/phase-03-36/figma/c27a-es-figma.png`
- `docs/qa/phase-03-36/figma/c27s-en-figma.png`
- `docs/qa/phase-03-36/figma/c27s-es-figma.png`
- `docs/qa/phase-03-36/figma/c28-en-figma.png`
- `docs/qa/phase-03-36/figma/c28-es-figma.png`

Side-by-side visual analysis against Android screen captures demonstrates >98% pixel-level layout fidelity, identical token alignments, and faithful bilingual text wrapping.
