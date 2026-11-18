# HAULIX Customer App — Phase 03.24 Android Visual QA Matrix
## Physical Android Verification on MEIZU Lucky 08 (`431QHFHM223EK`, Android 14)

**Screen Resolution:** 1264 × 2780 px  
**Date:** 2026-11-18  
**Verification Method:** Direct hardware device `screencap` with UI hierarchy inspection via ADB.

---

### 1. Visual Verification Matrix

| Screen ID | Variant | Authoritative Figma Ref | Android Screenshot Path | Verification Result | Visual Fidelity Notes |
|---|---|---|---|---|---|
| **C21** | English Overview | Node `382:1966` | `c21-en-overview.png` | **PASS** | Selected booking card (`HX-DEMO-1027 · Junk Removal`), customer info, pickup & contact. |
| **C21** | English Middle | Node `382:1966` | `c21-en-middle.png` | **PASS** | 3 original item photos and 4 original evidence photos rendered with sharp aspect ratio. |
| **C21** | English Scrolled | Node `382:1966` | `c21-en-scrolled.png` | **PASS** | Safety & scope disclaimers, AI readiness card, primary CTA and secondary links. |
| **C21** | Spanish Overview | Node `980:10268` | `c21-es-overview.png` | **PASS** | Bryan Lopez profile badge, natural Spanish copy (`Revisar detalles del servicio`). |
| **C21** | Spanish Middle | Node `980:10268` | `c21-es-middle.png` | **PASS** | Symmetrical 7-photo layout with full Spanish item and evidence tags. |
| **C21** | Spanish Scrolled | Node `980:10268` | `c21-es-scrolled.png` | **PASS** | Natural Spanish text wrapping with zero clipping or overflow. |
| **C21-V** | English Overview | Node `382:2088` | `c21v-en-overview.png` | **PASS** | Red alert triangle, "Cannot proceed to AI review", action required badge, primary resolve CTA. |
| **C21-V** | Spanish Overview | Node `980:10409` | `c21v-es-overview.png` | **PASS** | Exact Spanish translations (`La solicitud aún no está lista`, `No se puede continuar...`). |
| **C21-S** | English Overview | Node `382:2124` | `c21s-en-overview.png` | **PASS** | Green circle checkmark, "Saved for Sarah Mitchell", completed badge, photo count. |
| **C21-S** | English Notice | Node `382:2124` | `c21s-en-notice.png` | **PASS** | Honest upcoming C22 notice banner displayed upon tapping primary CTA. |
| **C21-S** | Spanish Overview | Node `980:10461` | `c21s-es-overview.png` | **PASS** | "Guardado para Bryan Lopez", corrected Spanish subtitle translation. |
| **C21-S** | Spanish Notice | Node `980:10461` | `c21s-es-notice.png` | **PASS** | Localized upcoming C22 notice banner rendered smoothly. |
| **C20-M** | English Overview | Node `392:180` | `c20m-en-overview.png` | **PASS** | Validated draft route card with origin and destination addresses. |
| **C20-M** | English Scrolled | Node `392:180` | `c20m-en-scrolled.png` | **PASS** | Inventory & access rows (550 lb estimate, stairs), amber conditional review badge. |
| **C20-M** | English Notice | Node `392:180` | `c20m-en-notice.png` | **PASS** | Honest upcoming C21-M notice banner displayed upon tapping primary CTA. |
| **C20-M** | Spanish Overview | Node `980:10574` | `c20m-es-overview.png` | **PASS** | Exact Spanish moving access copy (`Confirmar acceso de mudanza`, `Ruta del borrador...`). |
| **C20-M** | Spanish Scrolled | Node `980:10574` | `c20m-es-scrolled.png` | **PASS** | Spanish inventory and stairs details, review badge (`Revisión necesaria`). |
| **C20-M** | Spanish Notice | Node `980:10574` | `c20m-es-notice.png` | **PASS** | Localized upcoming C21-M notice banner rendered smoothly. |

---

### 2. Physical Device Details
- **Brand / Model:** MEIZU Lucky 08 (`MeizuVenus`)
- **Serial:** `431QHFHM223EK`
- **Android Version:** 14 (API level 34)
- **Viewport:** 1264 × 2780 px, 480 DPI density
- **Environment:** Expo Go SDK 58, React Native 0.84, NativeWind, Turborepo
