# HAULIX Phase 03.21 — Figma Source Audit

**Batch Scope:** Accelerated Batch: 4 Screens × English + Spanish (W02 — Inventory Editing, Validation & Item Photos)  
**Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`  
**Audit Date:** November 18, 2026  
**Auditor:** Antigravity AI Engineer

---

## 1. Frame Inventory & Geometry

| Screen ID | Variant | Node ID    | Frame Name in Figma                                                 | Canvas Dimensions | Canvas Position (X, Y) | Target Canonical Route  |
| :-------- | :------ | :--------- | :------------------------------------------------------------------ | :---------------- | :--------------------- | :---------------------- |
| **C19-E** | English | `382:1306` | `C19-E · Manual item correction / W02 [BK-03, AI-03, AI-04]`        | 430 × 1257 px     | X: 2105, Y: 9415       | `/edit-inventory-item`  |
| **C19-E** | Spanish | `980:9388` | `C19-E-ES · Solicitud y revisión / W02 [LOCALIZACIÓN]`              | 430 × 1257 px     | X: 2105, Y: 9415       | `/edit-inventory-item`  |
| **C19-A** | English | `382:1365` | `C19-A · Add item manually / W02 [BK-03, AI-03]`                    | 430 × 1257 px     | X: 65, Y: 12515        | `/add-inventory-item`   |
| **C19-A** | Spanish | `980:9463` | `C19-A-ES · Solicitud y revisión / W02 [LOCALIZACIÓN]`              | 430 × 1257 px     | X: 65, Y: 12515        | `/add-inventory-item`   |
| **C19-V** | English | `382:1424` | `C19-V · Missing dimensions validation / W02 [BK-03, AI-04, SV-14]` | 430 × 1272 px     | X: 575, Y: 12515       | `/inventory-validation` |
| **C19-V** | Spanish | `980:9538` | `C19-V-ES · Solicitud y revisión / W02 [LOCALIZACIÓN]`              | 430 × 1272 px     | X: 575, Y: 12515       | `/inventory-validation` |
| **C19-P** | English | `382:1483` | `C19-P · Item photo uploads / W02 [BK-04, AI-01, AI-03]`            | 430 × 1470 px     | X: 1085, Y: 12515      | `/item-photos`          |
| **C19-P** | Spanish | `980:9613` | `C19-P-ES · Solicitud y revisión / W02 [LOCALIZACIÓN]`              | 430 × 1470 px     | X: 1085, Y: 12515      | `/item-photos`          |

---

## 2. Design Tokens & Styling Properties

### Color Palette (Direct Figma Token Mappings)

- **Base Background:** `#080B0B` (`bg-base` / `var(--haulix-bg-base)`)
- **Surface Card Fill:** `#151A19` (`bg-surface` / `var(--haulix-bg-surface)`)
- **Elevated Detail Fill:** `#222827` (`bg-elevated` / `var(--haulix-bg-elevated)`)
- **Brand Accent:** `#BAFF42` (`haulix-brand-neon-lime`)
- **Subtle Border:** `#35403B` (`haulix-border-subtle`)
- **Customer Context Pill Fill:** `#1A2510` (Dark olive green tinted pill)
- **Primary Text:** `#F6F8F6` (`text-primary`)
- **Secondary Text:** `#ADB7B1` (`text-secondary`)
- **Muted Footer Text:** `#788580` (`text-muted`)
- **Alert / Warning Accent:** `#EF4444` (Used for missing measurements alert on C19-V)

### Typography & Spacing

- **Flow Header:** Standard HAULIX back chevron circle button + Centered HAULIX wordmark & tagline (`We Haul It All.`).
- **Step Pill:** `h-[33px] px-[12px] rounded-[9px] bg-surface` with `text-[10px] font-semibold text-brand` + `text-[10px] font-medium text-secondary`.
- **Screen Heading:**
  - Title: 25px bold Inter, `#F6F8F6`
  - Subtitle: 12px regular Inter, `#ADB7B1`
- **Context Pill:** `h-[39px] pl-[12px] rounded-[9px] bg-[#1A2510]` with 17px neon check icon + 11px semibold text.
- **Section Cards:** `rounded-[17px] p-[16px] bg-surface` with 16px semibold headings.
- **Detail Rows:** `h-[64px] rounded-[10px] bg-elevated px-[12px] py-[10px]` with 11px medium label + 12px semibold value.
- **Action CTAs:**
  - Primary: 52px height, 12px radius, `#BAFF42` background, `#080B0B` text (14px semibold).
  - Secondary: 56px height, 12px radius, `#151A19` background with `#35403B` border, `#BAFF42` text (13px semibold).
- **Footer:** 10px regular Inter, `#788580`, vertical gap 10px.

---

## 3. Bilingual Copy Inspection & Translation Fidelity

### Screen 1: C19-E Manual Item Correction

- **EN Title / Subtitle:** "Edit a listed item" / "Make corrections to quantity, measurements and handling details."
- **ES Title / Subtitle:** "Editar objeto de la lista" / "Corrige cantidad, medidas y detalles de manejo."
- **EN Item Card:** 3-seat sofa (Sofa · 3-seat \| 1 \| 82 / 35 / 34 inches \| 125 lb · customer estimate \| 2 adults recommended for review).
- **ES Item Card:** Sofá de tres plazas (Sofá · 3 plazas \| 1 \| 82 / 35 / 34 pulgadas \| 125 lb · estimación del cliente \| Se recomiendan dos adultos para la evaluación).
- **Save Status:** "Edit can be saved" / "La edición se puede guardar" ("Completed in this demo" / "Completado en esta demo").
- **CTAs:**
  - Primary: "Save corrected item" / "Guardar objeto corregido" -> Returns to `/item-inventory` with updated item state.
  - Secondary: "Cancel changes ›" / "Cancelar cambios ›" -> Returns to `/item-inventory`.

### Screen 2: C19-A Add Item Manually

- **EN Title / Subtitle:** "Add another item" / "Do not omit an item simply because it was not visible in a photo."
- **ES Title / Subtitle:** "Añadir otro objeto" / "No omitas objetos solo porque no aparezcan en una foto."
- **EN Item Card:** Wooden bookshelf (1 \| 48 × 15 × 72 inches \| ~60 lb · customer estimate \| Wood; no restricted substances declared).
- **ES Item Card:** Estantería de madera (1 \| 48 × 15 × 72 pulgadas \| ~60 lb · Estimación del cliente \| Madera; no se declararon sustancias restringidas).
- **Test Variation Card:** "Separate test variation" / "Variante de prueba independiente" ("Service information" / "Información del servicio").
- **CTAs:**
  - Primary: "Review item validation" / "Revisar validación del objeto" -> Navigates to `/inventory-validation` (C19-V).
  - Secondary: "Return without adding ›" / "Volver sin añadir ›" -> Returns to `/item-inventory`.

### Screen 3: C19-V Missing Measurements Validation

- **EN Title / Subtitle:** "More details needed" / "Quote-critical fields require clarification; do not invent estimates."
- **ES Title / Subtitle:** "Se necesitan más detalles" / "Los datos clave para cotizar necesitan aclaración; no inventar estimaciones."
- **EN Clarification Card:** Heavy cabinet (1 \| Not supplied \| Unknown \| Not yet confirmed).
- **ES Clarification Card:** Armario pesado (1 \| No proporcionado \| Desconocido \| Aún sin confirmar).
- **Warning Card:** "Measurements unavailable" / "Medidas no disponibles" ("Action required" / "Acción necesaria" with red alert icon).
- **CTAs:**
  - Primary: "Complete item information" / "Completa información del objeto" -> Navigates to `/edit-inventory-item` (C19-E with cabinet context).
  - Secondary: "Return to inventory ›" / "Volver al inventario ›" -> Returns to `/item-inventory`.

### Screen 4: C19-P Item Photo Uploads

- **EN Title / Subtitle:** "Photos help clarify the load" / "Four example images from the approved concept are attached to Sarah's draft booking."
- **ES Title / Subtitle:** "Las fotos ayudan a precisar la carga" / "Hay cuatro imágenes de ejemplo vinculadas al borrador de Bryan." (profile reactive).
- **Photo Items (4 rows, 110 × 81 px):**
  1. Sofa · living room / Sofá · Sala de estar
  2. Queen mattresses · stacked / Colchones queen · apilados
  3. Dining table · chairs / Mesa de comedor · sillas
  4. Additional junk / boxes / Cajas y objetos varios
- **Status Card:** "4 demo photos attached" / "4 fotos de ejemplo adjuntas" ("Completed in this demo" / "Completado en esta demo").
- **CTAs:**
  - Primary: "Continue to access details" / "Continuar a detalles de acceso" -> Shows modal banner for upcoming C20 Access Details.
  - Secondary 1: "Replace sofa photo ›" / "Reemplazar foto del sofá ›" -> Demo notice for C19-P-R.
  - Secondary 2: "Upload failure example ›" / "Ejemplo de fallo de carga ›" -> Demo notice for C19-P-F.
  - Secondary 3: "No photos yet ›" / "Aún sin fotos ›" -> Demo notice for C19-P-E.
