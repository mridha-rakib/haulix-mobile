# HAULIX Customer Mobile App — Phase 03.47B
## English & Spanish Localization Regression Audit

**Document ID:** `HAULIX-QA-P03.47B-013`  
**Phase:** 03.47B  
**Package:** `@haulix/i18n`  
**Target Screens:** W05 Dispatch Search Stages (S10, S20, S30, S40, S50) & Exceptions

---

### 1. Key Symmetry & Structural Audit

In `@haulix/i18n`, the search stage strings are defined symmetrically across English (`en`) and Spanish (`es`):

| State | Key | English (`en`) | Spanish (`es`) |
|---|---|---|---|
| **S10** | `w05Searching` | "Searching for Driver..." | "Buscando conductor..." |
| **S20** | `w05S20Searching` | "Search expanded to 20 miles" | "Búsqueda ampliada a 20 millas" |
| **S30** | `w05S30Searching` | "Search radius expanding to 30 mi" | "Radio de búsqueda ampliando a 30 mi" |
| **S40** | `w05S40Searching` | "Search expanded to 40 miles" | "Búsqueda ampliada a 40 millas" |
| **S50** | `w05S50Searching` | "Searching up to 50 miles" | "Búsqueda hasta 50 millas" |

---

### 2. Layout & Text Wrapping Verification

- **Spanish Text Expansion:** Spanish translation strings are typically 15–30% longer than their English counterparts.
- **Header Safety:** The header text container in `W05SearchStageScreen.tsx` utilizes `flexShrink: 1` and responsive line height ($30\text{ dp}$), allowing titles such as *"Búsqueda ampliada a 20 millas"* to wrap gracefully onto two lines without overlapping the status badge or brand header.
- **Button Labels:** CTAs such as *"Mantener búsqueda"* / *"Cancelar solicitud"* fit cleanly inside button containers with $14\text{ dp}$ padding and $14\text{ dp}$ typography.

---

### 3. Localization Parity Signoff

All 12 W05 routes render symmetrically with authentic Figma-sourced translations in both English and Spanish without string clipping or text overflow.
