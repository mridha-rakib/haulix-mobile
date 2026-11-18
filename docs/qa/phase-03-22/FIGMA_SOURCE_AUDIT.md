# Figma Source Audit — Phase 03.22

## Accelerated 4-Screen Bilingual Batch: W02 Photo Management States & Access Details

- **Date:** 2026-11-18
- **Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`
- **MCP Connection:** `figma_figma` authenticated session

---

### Frame Inventory & Specifications

| Screen Code    | Route Name                | Lang | Figma Node | Frame Dimensions | Title                                        | W02 Step Indicator                           | Primary CTA                            |
| -------------- | ------------------------- | ---- | ---------- | ---------------- | -------------------------------------------- | -------------------------------------------- | -------------------------------------- |
| **C19-P-R**    | `replace-item-photo.tsx`  | EN   | `382:1546` | 430 × 1003 px    | Replace an item photo                        | `W02 · SERVICE DISCOVERY & INTAKE / C19-P-R` | Confirm replacement example            |
| **C19-P-R-ES** | `replace-item-photo.tsx`  | ES   | `980:9692` | 430 × 1003 px    | Reemplazar foto de un objeto                 | `W02 · SERVICIOS Y SOLICITUD / C19-P-R`      | Confirmar reemplazo de ejemplo         |
| **C19-P-F**    | `photo-upload-failed.tsx` | EN   | `382:1590` | 430 × 1220 px    | Photo could not be uploaded                  | `W02 · SERVICE DISCOVERY & INTAKE / C19-P-F` | Retry failed upload                    |
| **C19-P-F-ES** | `photo-upload-failed.tsx` | ES   | `980:9752` | 430 × 1220 px    | No se pudo subir la foto                     | `W02 · SERVICIOS Y SOLICITUD / C19-P-F`      | Reintentar carga fallida               |
| **C19-P-E**    | `item-photos-empty.tsx`   | EN   | `382:1644` | 430 × 809 px     | Add supporting photos                        | `W02 · SERVICE DISCOVERY & INTAKE / C19-P-E` | Select photos to attach                |
| **C19-P-E-ES** | `item-photos-empty.tsx`   | ES   | `980:9822` | 430 × 809 px     | Añadir fotos de apoyo                        | `W02 · SERVICIOS Y SOLICITUD / C19-P-E`      | Elegir fotos para adjuntar             |
| **C20**        | `access-details.tsx`      | EN   | `382:1680` | 430 × 1672 px    | How can the crew access items?               | `W02 · SERVICE DISCOVERY & INTAKE / C20`     | Continue to service restrictions       |
| **C20-ES**     | `access-details.tsx`      | ES   | `980:9874` | 430 × 1672 px    | ¿Cómo puede acceder el equipo a los objetos? | `W02 · SERVICIOS Y SOLICITUD / C20`          | Continuar a restricciones del servicio |

---

### Reference Screenshots Downloaded

All 8 authoritative reference screenshots were downloaded directly from the Figma MCP asset endpoint to `docs/qa/phase-03-22/figma/`:

1. `c19pr-en-figma.png` (Node `382:1546`, 430 × 1003 px)
2. `c19pr-es-figma.png` (Node `980:9692`, 430 × 1003 px)
3. `c19pf-en-figma.png` (Node `382:1590`, 430 × 1220 px)
4. `c19pf-es-figma.png` (Node `980:9752`, 430 × 1220 px)
5. `c19pe-en-figma.png` (Node `382:1644`, 430 × 809 px)
6. `c19pe-es-figma.png` (Node `980:9822`, 430 × 809 px)
7. `c20-en-figma.png` (Node `382:1680`, 430 × 1672 px)
8. `c20-es-figma.png` (Node `980:9874`, 430 × 1672 px)

---

### Detailed Design & Functional Analysis

#### 1. C19-P-R (Replace Item Photo)

- **Header:** HAULIX Premium Flow Header with Back button routing to `/item-photos`.
- **Booking Pill:** Green `#1A2510` background, green checkmark icon, uppercase bold text `SARAH MITCHELL · HX-DEMO-1027` (reactive customer profile).
- **Selected Media Section:** Contains 1 photo card (Sofa, `c18j-sofa.png`) with title `Sofa · existing attachment` and subtitle `Attached · replaceable demo media`.
- **Replacement Awaiting Selection Section:** Surface card containing:
  - Context badge: Elevated dark pill `#222827` with check icon and `Review required` (`Revisión necesaria`).
  - Explanatory copy: "Choose a new photo. The original remains until upload succeeds." / "Elige otra foto. La anterior permanece hasta completar la carga."
  - Rule notice: "The item's quantity and type do not change unless Sarah confirms a correction." / "Cantidad y tipo no cambian sin confirmación de Sarah."
- **Actions:**
  - Primary button: "Confirm replacement example" (`Confirmar reemplazo de ejemplo`) -> routes to `/item-photos` (or preview confirmation).
  - Secondary button: "Keep existing photo ›" (`Conservar foto actual ›`) -> routes to `/item-photos`.
- **Footer:** `DEMO ONLY · No confirmed booking, rates or payment` / `SRS BK-04 · 430 px / vertical scroll`.

#### 2. C19-P-F (Photo Upload Failure)

- **Header:** Back button routing to `/item-photos`.
- **Network Interrupted Card:**
  - Action Required pill with red alert icon (`#EF4444`) and label `Action required` (`Acción necesaria`).
  - Text 1: "Example: additional-item image upload failed at 87%." / "Ejemplo: falló la carga de imagen adicional al 87 %."
  - Text 2: "No failed or incomplete upload may be represented as successfully attached." / "Una carga fallida o incompleta no puede figurar como adjunta."
- **Saved Photos Card:**
  - Shows EXACTLY the 3 successfully attached photos (Sofa, Mattress, Dining table).
  - DOES NOT display the 4th failed photo as attached.
- **Actions:**
  - Primary button: "Retry failed upload" (`Reintentar carga fallida`) -> shows retry state / alert.
  - Secondary button: "Continue with saved media ›" (`Continuar con fotos guardadas ›`) -> routes to `/access-details` (C20).
- **Footer:** `SRS BK-04, NFR-01 · 430 px / vertical scroll`.

#### 3. C19-P-E (No Photos / Empty Media State)

- **Screen Concept:** Zero photos attached.
- **AI Card:**
  - Context badge: `Review required` (`Revisión necesaria`).
  - Text 1: "Manual inventory is still saved; an image-dependent AI suggestion may be unavailable." / "Se guarda el inventario manual; algunas sugerencias con IA necesitan imágenes."
  - Text 2: "Customers must not be given fabricated image-based measurements." / "No se deben presentar medidas inventadas a partir de imágenes."
- **Actions:**
  - Primary button: "Select photos to attach" (`Elegir fotos para adjuntar`) -> routes to `/item-photos`.
  - Secondary button: "Review item details ›" (`Revisar detalles del objeto ›`) -> routes to `/item-inventory` (C19).
- **Footer:** `SRS BK-04, AI-01 · 430 px / vertical scroll`.

#### 4. C20 (Access & Labor Details)

- **Screen Concept:** Pickup accessibility conditions, labor constraints, and eligibility evaluation.
- **Section A: Pickup access · [Customer Name]**
  - Location: 1234 E Example Lane, Phoenix, AZ 85014
  - Property: Single-family residence
  - Stairs at pickup: No stairs · ground level
  - Elevator: Not required
  - Parking: Driveway available
  - Carrying distance: ~25 feet · customer estimate
  - Doorway restrictions: Standard residential doorway
- **Section B: Additional help**
  - Disassembly required?: "No · Original sofa fits through available access"
  - Packing / assembly request: "Not selected · Extra price if approved"
- **Section C: Crew eligibility remains conditional**
  - Badge: `Review required` (`Revisión necesaria`).
  - Guidance: "Vehicle size, safe lifting and helper count are evaluated against approved rules."
  - Notice: "No extra labor charge is approved in this intake step."
- **Actions:**
  - Primary button: "Continue to service restrictions" (`Continuar a restricciones del servicio`) -> informs of upcoming C20-R (honest notice).
  - Secondary button: "Edit item quantities ›" (`Editar cantidades ›`) -> routes back to `/item-inventory`.
- **Footer:** `SRS BK-02, BK-03, SV-02, SV-04, SV-14 · 430 px / vertical scroll`.
