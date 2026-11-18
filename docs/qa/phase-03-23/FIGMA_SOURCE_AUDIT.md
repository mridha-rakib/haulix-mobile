# HAULIX Customer App — Phase 03.23 Figma Source Audit
## Batch W02: Access Help, Access Validation, Service Restrictions, & Restricted Material Review

**Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`  
**File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**MCP Provider:** `figma_figma`  
**Audit Date:** 2026-11-18  

---

### 1. Authoritative Figma Frames & Dimensions

| Screen Code | Route / Purpose | English Frame | English Dimensions | Spanish Frame | Spanish Dimensions | Reference Screenshot |
|-------------|-----------------|---------------|--------------------|---------------|--------------------|----------------------|
| **C20-E** | `/extra-access-help`<br>Request Additional Handling | `382:1767` | 430 × 1195 px | `980:9977` | 430 × 1195 px | `c20e-[en|es]-figma.png` |
| **C20-V** | `/access-validation`<br>Please Confirm Site Access | `382:1822` | 430 × 1103 px | `980:10048` | 430 × 1103 px | `c20v-[en|es]-figma.png` |
| **C20-R** | `/service-restrictions`<br>Confirm Item Safety | `382:1873` | 430 × 1269 px | `980:10115` | 430 × 1269 px | `c20r-[en|es]-figma.png` |
| **C20-X** | `/restricted-material`<br>Restricted Material Review | `382:1911` | 430 × 1180 px | `980:10197` | 430 × 1180 px | `c20x-[en|es]-figma.png` |

---

### 2. Design Tokens, Geometry & Typography

- **Canvas Background:** Dark brand surface `#0B0E0D` (`bg-background`).
- **Elevated Cards:** `#151A19` (`bg-surface`) with 1px border `#242C2A` (`border-elevated`) and `rounded-2xl` (16px) corners.
- **Accents & Badges:**
  - Standard Action / Brand CTA: `#BAFF42` (`bg-brand`, text `#0B0E0D`, font-bold).
  - Amber / Warning Alert: `#FFC85A` with `#2A2210` container border (`c20-e` amber pill).
  - Danger / Urgent Alert: `#F36D6D` with `#2E1818` card border (`c20-x` restricted item card).
  - Muted Secondary Surface: `#1A2220` (`bg-surface-elevated`).
  - Text Hierarchy:
    - Title 1 / Section Headers: `#F5F7F6` / `#FFFFFF`, 20px / 24px, SemiBold / Bold.
    - Subtitle / Body: `#C2C9C6`, 14px / 16px, Regular / Medium.
    - Muted Meta & Footnotes: `#818C87`, 12px / 13px, Regular.

---

### 3. Component & State Structure

1. **C20-E (Request Additional Handling):**
   - Header with back navigation to `/access-details`.
   - Customer booking badge: `SARAH MITCHELL · HX-DEMO-1027` (EN) / `BRYAN LOPEZ · HX-DEMO-1027` (ES).
   - Amber alert pill: Notice that additional handling requests will be quoted and confirmed by HAULIX dispatch.
   - Handling options: Packing / Assembly help, Hoisting / Tight clearance, Extended carry distance (> 75 ft).
   - Interactive options toggle with state persistence in `c20eHandlingRequest.ts`.
   - Primary Action: "Save access request" / "Guardar solicitud de acceso".
   - Secondary Link: "I do not need additional help" / "No necesito ayuda adicional".

2. **C20-V (Please Confirm Site Access):**
   - Alert banner detailing missing or incomplete access fields from initial entry.
   - Missing rows: Stairs flight count, vehicle parking permit verification, elevator reservation status.
   - Action buttons: "Edit access information" / "Editar información del acceso" (navigates back to `/access-details`).
   - Reassurance footnote: Real-time estimate update guarantee.

3. **C20-R (Confirm Item Safety):**
   - 4-item safety checklist: Hazardous chemicals, unsealed paint/liquids, sharp glass/metal edges, commercial gas containers.
   - Dynamic customer indicator: `Sarah reports none` / `Bryan indica que no hay`.
   - Dual legal/safety acknowledgement checkboxes (controlled interactive components):
     1. "The listed items and photos represent my request" / "Los objetos y fotos de la lista representan mi solicitud."
     2. "I have disclosed items I know may be hazardous, unusually heavy or unsafe" / "He declarado los objetos que podrían ser peligrosos, muy pesados o inseguros."
   - Primary Action: "Acknowledge and review" / "Confirmar y revisar" (gated by validation when unchecked).
   - Secondary Action Links: "I need help with an item" -> `/extra-access-help`, "Access information incomplete" -> `/access-validation`.

4. **C20-X (Restricted Material Review):**
   - Red banner / warning card with hazard triangle icon.
   - Flagged container item breakdown: "Garage Cleanout — 4 Heavy Unsealed Containers".
   - Explanation of restriction: Unsealed chemical/paint containers cannot be transported by standard HAULIX crews without special containment.
   - Two clear resolution paths:
     - Primary: "Remove flagged item from draft" / "Quitar objeto señalado del borrador" (safely modifies local booking draft).
     - Secondary: "Contact HAULIX Hazmat Support" / "Contactar soporte de materiales peligrosos".
