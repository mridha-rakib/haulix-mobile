# HAULIX Customer App — Phase 03.24 Figma Source Audit
## Batch W02: Full Intake Review, Review Blocked, Draft Saved, & Moving Access

**Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`  
**File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**MCP Provider:** `figma_figma`  
**Audit Date:** 2026-11-18  

---

### 1. Authoritative Figma Frames & Dimensions

| Screen Code | Route / Purpose | English Frame | English Dimensions | Spanish Frame | Spanish Dimensions | Reference Screenshot |
|---|---|---|---|---|---|---|
| **C21** | `/intake-review`<br>Full Intake Review | `382:1966` | 430 × 2716 px | `980:10268` | 430 × 2716 px | `c21-[en|es]-figma.png` |
| **C21-V** | `/intake-review-blocked`<br>Review Blocked / Incomplete | `382:2088` | 430 × 809 px | `980:10409` | 430 × 809 px | `c21v-[en|es]-figma.png` |
| **C21-S** | `/intake-draft-saved`<br>Intake Draft Saved | `382:2124` | 430 × 807 px | `980:10461` | 430 × 807 px | `c21s-[en|es]-figma.png` |
| **C20-M** | `/moving-access`<br>Confirm Moving Access | `392:180` | 430 × 1643 px | `980:10574` | 430 × 1643 px | `c20m-[en|es]-figma.png` |

---

### 2. Design Tokens, Geometry & Layout

- **Canvas Background:** Dark brand surface `#0B0E0D` (`bg-background`).
- **Elevated Cards:** `#151A19` (`bg-surface`) with 1px border `#242C2A` (`border-elevated`) and `rounded-2xl` (16px) corners.
- **Accents & Badges:**
  - Standard Action / Brand CTA: `#BAFF42` (`bg-brand`, text `#0B0E0D`, font-bold).
  - Amber / Warning Alert: `#FFC85A` with `#2A2210` container border (`c20-m` review badge).
  - Danger / Action Required: `#F36D6D` with `#4A2424` border on `#1D1616` background (`c21-v` warning card).
  - Muted Secondary Surface: `#1A2220` (`bg-surface-elevated`).
  - Text Hierarchy:
    - Title 1 / Section Headers: `#F5F7F6` / `#FFFFFF`, 20px / 24px, SemiBold / Bold.
    - Subtitle / Body: `#C2C9C6`, 14px / 16px, Regular / Medium.
    - Muted Meta & Footnotes: `#818C87`, 12px / 13px, Regular.

---

### 3. Source Defect & Symmetrical Correction

- **C21-S Spanish Source Translation Defect:**
  - The Spanish Figma frame (`980:10461`) retained the untranslated English subtitle:
    `HX-DEMO-1027 is ready for the next AI review step.`
  - **Correction:** Implemented natural, authentic Spanish translation in `packages/i18n/src/locales/es.ts`:
    `HX-DEMO-1027 está listo para el siguiente paso de revisión con IA.`
- **Customer Profile Isolation:**
  - Spanish Figma frames (`980:10268`, `980:10461`, `980:10574`) hardcode English sample names ("Sarah Mitchell", "Daniel Ruiz").
  - **Correction:** Bound dynamically to active Spanish customer profile (`Bryan Lopez` / `Bryan Lopez Mendoza`) to prevent cross-locale profile leakage.
