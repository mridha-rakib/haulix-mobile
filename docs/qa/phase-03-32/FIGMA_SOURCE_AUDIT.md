# HAULIX Customer Mobile App — Phase 03.32

## Figma Source Audit: Quote Processing, Admin Resolution & Illustrative Quote Overview

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.32  
**Batch Scope:** 4 canonical screens × 2 languages (English & Spanish) = 8 localized versions  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Audit Date:** November 19, 2026  
**Status:** 100% Verified against Authoritative Figma Frames

---

## 1. Authoritative Figma Frame Inventory

| Screen ID     | Screen Name                          | Language | Figma Node ID | Dimensions    | Canvas Background | Reference Capture File                           |
| :------------ | :----------------------------------- | :------- | :------------ | :------------ | :---------------- | :----------------------------------------------- |
| **C24-P**     | Quote Calculation Processing         | English  | `412:910`     | 430 × 1107 px | `#080B0B`         | `docs/qa/phase-03-32/figma/c24p-en-figma.png`    |
| **C24-P**     | Procesamiento de cotización          | Spanish  | `987:10772`   | 430 × 1107 px | `#080B0B`         | `docs/qa/phase-03-32/figma/c24p-es-figma.png`    |
| **C24-ADM-S** | Admin Review Resolved                | English  | `412:1054`    | 430 × 971 px  | `#080B0B`         | `docs/qa/phase-03-32/figma/c24adms-en-figma.png` |
| **C24-ADM-S** | Revisión administrativa resuelta     | Spanish  | `987:10945`   | 430 × 971 px  | `#080B0B`         | `docs/qa/phase-03-32/figma/c24adms-es-figma.png` |
| **C24-ADM-D** | Admin Clarification Requested        | English  | `412:1099`    | 430 × 814 px  | `#080B0B`         | `docs/qa/phase-03-32/figma/c24admd-en-figma.png` |
| **C24-ADM-D** | Aclaración administrativa solicitada | Spanish  | `987:11000`   | 430 × 814 px  | `#080B0B`         | `docs/qa/phase-03-32/figma/c24admd-es-figma.png` |
| **C24-Q**     | Illustrative Quote Overview          | English  | `412:1140`    | 430 × 1598 px | `#080B0B`         | `docs/qa/phase-03-32/figma/c24q-en-figma.png`    |
| **C24-Q**     | Resumen de cotización ilustrativa    | Spanish  | `987:11051`   | 430 × 1598 px | `#080B0B`         | `docs/qa/phase-03-32/figma/c24q-es-figma.png`    |

---

## 2. Detailed Screen Specifications & Typography Analysis

### 2.1 C24-P: Quote Calculation Processing

- **Canonical Route:** `apps/customer/app/(app)/quote-processing.tsx`
- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN` (`text-[10px]`, SemiBold, `#BAFF42`), sub-marker `  /  C24-P` (`#788580`).
- **Heading:** `Calculating your illustrative quote` (`text-[25px]`, Bold, `#F6F8F6`, line height 30) / `Calculando tu cotización ilustrativa`.
- **Subtitle:** `Applying rule-based formulas, inventory inputs, and travel distance.` (`text-[12px]`, Regular, `#ADB7B1`, line height 18) / `Aplicando fórmulas de tarifas vigentes, datos de inventario y distancia de traslado.`
- **Saved Booking Ledger:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (Container `#1A2510`, text `#BAFF42`, `text-[11px]`, SemiBold, `h-[37px]`).
- **Calculation Steps Section:** `Calculation steps in progress` (`text-[17px]`, SemiBold, `#F6F8F6`).
  - Step 1: `Rule-versioned tariff validation` (`✓ Complete`, `#BAFF42`)
  - Step 2: `Customer inventory inputs applied` (`✓ Complete · 4 verified pieces`, `#BAFF42`)
  - Step 3: `Route & mileage computation` (`✓ Complete · 14.8 mi`, `#BAFF42`)
  - Step 4: `Access & stair fee calculation` (`✓ Complete · 2nd flr stairs`, `#BAFF42`)
  - Step 5: `Admin review status check` (`✓ Resolved · Standard rate`, `#BAFF42`)
  - Step 6: `Subtotal compilation` (`● In progress`, `#BAFF42`)
- **Information Notice Card:** `Deterministic pricing model` / `Modelo de cotización determinista` (Container `#151A19`, border `#35403B`, info badge, supporting copy explaining rule-driven pricing vs generative estimates).
- **Secondary Action:** `Pricing engine error example  ›` / `Ejemplo de error en motor de precios  ›` (Interactive toggle displaying warning banner without breaking app flow).
- **Primary CTA:** `View illustrative estimate` / `Ver cotización ilustrativa` (Brand button `#BAFF42`, `h-[52px]`, routes to `/illustrative-quote`).
- **Footer Disclaimer:** `DEMO STATE · No validated quote or booking yet` · `SRS AI-06, AI-07, AI-08, AI-09  ·  430 px / vertical scrolling`.

### 2.2 C24-ADM-S: Admin Review Resolved

- **Canonical Route:** `apps/customer/app/(app)/admin-review-resolved.tsx`
- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN`, sub-marker `  /  C24-ADM-S`.
- **Heading:** `Administrative review completed` (`text-[25px]`, Bold, `#F6F8F6`) / `Revisión administrativa completada`.
- **Subtitle:** `A pricing specialist reviewed the draft and approved standard catalog rates.` (`text-[12px]`, Regular, `#ADB7B1`) / `Un especialista en tarifas revisó el borrador y aprobó las tarifas de catálogo estándar.`
- **Review Scope Section:** `Resolved review scope` (`text-[17px]`, SemiBold, `#F6F8F6`).
  - Case Reference: `Case #REV-2026-8814 · Resolved` (`#BAFF42`)
  - Reviewer: `HAULIX Pricing Ops (Marcus Vance)` (`#ADB7B1`)
  - Notes: `Standard residential furniture and mattress allowance applies. No oversize surcharge required.` (`#F6F8F6`)
  - Scope Items: `3 categories, 4 confirmed items` (`#ADB7B1`)
  - Scope Details: `1 sofa, 2 queen mattresses, 1 dining table` (`#ADB7B1`)
- **Resolved Badge:** Container `#1A2510`, border `#BAFF42`, text `#BAFF42` (`✓ Standard pricing rate approved`).
- **Action CTAs:**
  - Primary: `View illustrative quote` / `Ver cotización ilustrativa` (`#BAFF42`, `h-[52px]`, routes to `/illustrative-quote`).
  - Secondary: `Review confirmed items  ›` / `Revisar objetos confirmados  ›` (`#151A19`, border `#35403B`, text `#ADB7B1`, routes to `/customer-confirmed-items`).
- **Footer Disclaimer:** `DEMO STATE · No validated quote or booking yet` · `SRS AI-05, AI-17  ·  430 px / vertical scrolling`.

### 2.3 C24-ADM-D: Admin Clarification Requested

- **Canonical Route:** `apps/customer/app/(app)/admin-clarification-requested.tsx`
- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN`, sub-marker `  /  C24-ADM-D`.
- **Heading:** `Additional item details needed` (`text-[25px]`, Bold, `#F6F8F6`) / `Se requieren detalles adicionales de los objetos`.
- **Subtitle:** `Admin review indicated missing dimension or access details before quote finalization.` (`text-[12px]`, Regular, `#ADB7B1`) / `La revisión administrativa indicó detalles faltantes de dimensiones o acceso antes de finalizar la cotización.`
- **Clarification Notice Card:** `Review requires correction` / `La revisión requiere corrección` (Container `#151A19`, border `#F59E0B`, amber warning icon, supporting copy: `Reviewer requested verification of 2nd queen mattress dimensions and stairway turn clearance.` / `El revisor solicitó verificar las dimensiones del segundo colchón queen y el giro en la escalera.`).
- **Guidance Paragraphs:**
  - `Customer corrections directly update the booking record and rule-version inputs.`
  - `Confirming corrected details returns this request to automated quote generation.`
- **Action CTAs:**
  - Primary: `Update item details` / `Actualizar detalles del objeto` (`#BAFF42`, `h-[52px]`, routes to `/correct-ai-items`).
  - Secondary: `Review pending case  ›` / `Revisar caso pendiente  ›` (`#151A19`, border `#35403B`, text `#ADB7B1`, routes to `/admin-review-pending`).
- **Footer Disclaimer:** `DEMO STATE · No validated quote or booking yet` · `SRS AI-04, AI-05, SV-14  ·  430 px / vertical scrolling`.

### 2.4 C24-Q: Illustrative Quote Overview

- **Canonical Route:** `apps/customer/app/(app)/illustrative-quote.tsx`
- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN`, sub-marker `  /  C24-Q`.
- **Heading:** `Illustrative quote overview` (`text-[25px]`, Bold, `#F6F8F6`) / `Resumen de cotización ilustrativa`.
- **Subtitle:** `Based on 4 customer-verified items and estimated 14.8-mile transit.` (`text-[12px]`, Regular, `#ADB7B1`) / `Basado en 4 objetos verificados por el cliente y un traslado estimado de 14.8 millas.`
- **Total Price Hero Card:** Container `#151A19`, border `#35403B`, hero amount `$356` (`text-[42px]`, Bold, `#BAFF42`), sub-label `Estimated subtotal · USD` / `Subtotal estimado · USD`.
- **Fixed Breakdown Contract ($356 USD Total):**
  1. `Base vehicle & driver fee`: `$160`
  2. `Inventory handling (4 pieces)`: `$75`
  3. `Mileage (14.8 mi @ standard rate)`: `$36`
  4. `Access fee (2nd flr stairs pickup)`: `$60`
  5. `Estimated environmental & disposal fee`: `$25`
  - **Subtotal sum:** $160 + $75 + $36 + $60 + $25 = **$356**
- **Verified Items Section:** Container `#151A19`, 3 rows with authentic photography (`56 × 46 px`):
  1. `3-seat sofa` (`c18j-sofa.png`): `Qty 1 · ~125 lb` (`#BAFF42`)
  2. `Queen mattresses` (`c18j-mattresses.png`): `Qty 2 · ~70 lb each` (`#BAFF42`)
  3. `Dining table` (`c18j-table.png`): `Qty 1 · ~85 lb` (`#BAFF42`)
- **Action CTAs:**
  - Primary: `Review full price breakdown` / `Revisar desglose completo de tarifas` (`#BAFF42`, interactive disclosure notice regarding Phase 03.33 / C25).
  - Secondary: `Edit details & recalculate  ›` / `Modificar datos y recalcular  ›` (`#151A19`, border `#35403B`, routes to `/correct-ai-items`).
  - Tertiary: `Expired quote example  ›` / `Ejemplo de cotización expirada  ›` (`#151A19`, border `#35403B`, disclosure notice for upcoming expired quote state).
- **Footer Disclaimer:** `DEMO QUOTE · Illustrative $356 initial subtotal only` · `SRS AI-06, AI-07, AI-09, AI-14  ·  430 px / vertical scrolling`.
