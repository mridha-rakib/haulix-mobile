# HAULIX Customer App — Phase 03.23 Android Visual QA Matrix
## Physical Android Verification on MEIZU Lucky 08 (`431QHFHM223EK`, Android 14)

**Screen Resolution:** 1264 × 2780 px  
**Date:** 2026-11-18  
**Verification Method:** Direct hardware device `screencap` with UI hierarchy inspection via ADB.

---

### 1. Visual Verification Matrix

| Screen ID | Variant | Authoritative Figma Ref | Android Screenshot Path | Verification Result | Visual Fidelity Notes |
|-----------|---------|-------------------------|-------------------------|---------------------|-----------------------|
| **C20-E** | English Overview | Node `382:1767` | `c20e-en-overview.png` | **PASS** | Perfect match for Sarah Mitchell header, amber handling notice, cards. |
| **C20-E** | English Scrolled | Node `382:1767` | `c20e-en-scrolled.png` | **PASS** | Options, disclaimers, and primary CTA aligned to Figma specs. |
| **C20-E** | English Saved | Node `382:1767` | `c20e-en-saved.png` | **PASS** | Dynamic banner confirming access request saved to draft state. |
| **C20-E** | Spanish Overview | Node `980:9977` | `c20e-es-overview.png` | **PASS** | Bryan Lopez profile badge, exact Spanish translation strings. |
| **C20-E** | Spanish Scrolled | Node `980:9977` | `c20e-es-scrolled.png` | **PASS** | Verified Spanish handling options, "Guardar solicitud de acceso". |
| **C20-E** | Spanish Saved | Node `980:9977` | `c20e-es-saved.png` | **PASS** | Saved banner rendered in natural Spanish. |
| **C20-V** | English Overview | Node `382:1822` | `c20v-en-overview.png` | **PASS** | Warning card, missing access fields (stairs, parking, clearance). |
| **C20-V** | English Scrolled | Node `382:1822` | `c20v-en-scrolled.png` | **PASS** | "Edit access information" primary CTA and secondary dismiss button. |
| **C20-V** | English Edited | Node `382:1822` | `c20v-en-edited.png` | **PASS** | State feedback acknowledging access edit navigation. |
| **C20-V** | Spanish Overview | Node `980:10048` | `c20v-es-overview.png` | **PASS** | Exact Spanish translations from node 980:10048. |
| **C20-V** | Spanish Scrolled | Node `980:10048` | `c20v-es-scrolled.png` | **PASS** | "Editar información del acceso" button and support disclaimer. |
| **C20-V** | Spanish Edited | Node `980:10048` | `c20v-es-edited.png` | **PASS** | Localized editing acknowledgement feedback. |
| **C20-R** | English Overview | Node `382:1873` | `c20r-en-overview.png` | **PASS** | 4 safety question rows with `Sarah reports none` badges. |
| **C20-R** | English Scrolled | Node `382:1873` | `c20r-en-scrolled.png` | **PASS** | Acknowledgement card, 2 dual checkboxes, secondary help links. |
| **C20-R** | English Alert | Node `382:1873` | `c20r-en-validation-alert.png` | **PASS** | Gating validation warning shown when tapping CTA without checks. |
| **C20-R** | English Checked | Node `382:1873` | `c20r-en-checked.png` | **PASS** | Both checkboxes visually checked with brand `#BAFF42` tickmarks. |
| **C20-R** | English Ack | Node `382:1873` | `c20r-en-acknowledged.png` | **PASS** | Confirmed customer acknowledgement state banner. |
| **C20-R** | Spanish Overview | Node `980:10115` | `c20r-es-overview.png` | **PASS** | `Bryan indica que no hay` dynamic name interpolation. |
| **C20-R** | Spanish Scrolled | Node `980:10115` | `c20r-es-scrolled.png` | **PASS** | Exact Spanish checkboxes from node 980:10115. |
| **C20-R** | Spanish Alert | Node `980:10115` | `c20r-es-validation-alert.png` | **PASS** | Localized validation warning banner displayed. |
| **C20-R** | Spanish Checked | Node `980:10115` | `c20r-es-checked.png` | **PASS** | Controlled checkboxes active. |
| **C20-R** | Spanish Ack | Node `980:10115` | `c20r-es-acknowledged.png` | **PASS** | "Confirmar y revisar" progression notice rendered. |
| **C20-X** | English Overview | Node `382:1911` | `c20x-en-overview.png` | **PASS** | Danger banner, flagged Garage Cleanout containers card. |
| **C20-X** | English Scrolled | Node `382:1911` | `c20x-en-scrolled.png` | **PASS** | "Remove flagged item from draft" and "Contact support" actions. |
| **C20-X** | English Removed | Node `382:1911` | `c20x-en-removed.png` | **PASS** | Flagged item safely removed from local draft state with confirmation. |
| **C20-X** | Spanish Overview | Node `980:10197` | `c20x-es-overview.png` | **PASS** | Exact Spanish hazardous materials review strings from node 980:10197. |
| **C20-X** | Spanish Scrolled | Node `980:10197` | `c20x-es-scrolled.png` | **PASS** | "Quitar objeto señalado del borrador" CTA aligned to Figma. |
| **C20-X** | Spanish Removed | Node `980:10197` | `c20x-es-removed.png` | **PASS** | Removal state verified on physical hardware in Spanish. |

---

### 2. Physical Device Details
- **Brand / Model:** MEIZU Lucky 08 (`MeizuVenus`)
- **Serial:** `431QHFHM223EK`
- **Android Version:** 14 (API level 34)
- **Viewport:** 1264 × 2780 px, 480 DPI density
- **Environment:** Expo Go SDK 58, React Native 0.84, NativeWind, Turborepo
