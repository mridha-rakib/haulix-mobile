# HAULIX Driver/Worker Mobile App — DW-D01
# Design System Foundation Specification

**Platform:** HAULIX Mobile Platform  
**Target Applications:** `apps/driver`  
**Phase:** DW-D01  
**Tokens Source:** `@haulix/design-tokens` (Figma `meiXxwUNJaDo0a3mhcHBXv`)

---

## 1. Visual Hierarchy & Theme Tokens

The Driver/Worker application inherits the exact core brand aesthetic of the HAULIX ecosystem while adapting spacing and controls for high-intensity field operations:
- **Canvas Deep Dark:** `#080D0C` / `#0F1413` (Protects battery life on OLED displays and minimizes glare during night driving)
- **Card Surface Elevated:** `#151A19` (Clear container boundaries for operational cards)
- **Container Borders & Dividers:** `#222B29` / `#2D3734` (Crisp separation on high-brightness outdoor screens)
- **HAULIX Electric Lime (Brand Accent):** `#BAFF42` (High-contrast operational CTA accent for immediate tap targets)
- **Brand Green (Success & Completed):** `#10B981` / `#34D399`
- **Brand Warning (Action Required / Window Expiring):** `#FBBF24`
- **Brand Error (Declined / Dispute / Late):** `#F87171`
- **Brand Info (GPS / Navigation):** `#60A5FA`

---

## 2. Field-Service Touch Target & Layout Standards

1. **Target Dimensions:**
   - Reference Figma Canvas: **430 × 932 px** (iPhone 16 Pro reference)
   - Minimum Logical Display Target: **360dp width** (Realme Note 60 Android target)
2. **Operational Ergonomics (WCAG 2.5.5 / Android Material):**
   - **Primary Action Buttons:** Minimum **54dp height** (`py-4`) with high-contrast bold typography for rapid one-handed taps while wearing work gloves.
   - **Secondary & Outlined Buttons:** Minimum **48dp height**.
   - **Form Fields & Inputs:** Minimum **52dp height** with clear focused border states (`border-[#BAFF42]`).
   - **Interactive List Rows:** Minimum **56dp height**.
   - **Safe Areas:** Top safe area minimum 28dp; bottom safe area minimum 24dp to clear Android system gesture bars.

---

## 3. Bilingual Typography & Localization Tokens

All strings are modeled with 1:1 symmetry in `@haulix/i18n`:
- Primary Font: **Inter** / **Plus Jakarta Sans**
- Text Sizes:
  - Hero Display: `text-3xl font-bold` (28–32px, -0.5px letter spacing)
  - Screen Titles: `text-xl font-bold` (20–22px)
  - Card Titles: `text-base font-semibold` (16px)
  - Body & Instructions: `text-sm font-normal` (14px)
  - Captions & Disclaimers: `text-xs font-normal` (12px)
  - Badges & Micro-Labels: `text-[10px] font-bold uppercase tracking-wider`
- **Spanish Text Expansion Rule:** All container labels and buttons must use flex-wrap or multi-line auto-layout to accommodate 20% to 35% text length expansion without clipping.
