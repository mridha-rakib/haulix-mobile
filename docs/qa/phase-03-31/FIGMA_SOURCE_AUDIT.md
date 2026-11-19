# HAULIX Customer Mobile App — Phase 03.31

## Figma Source Audit: AI Item Correction, Customer Confirmation & Admin Review

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.31  
**Batch Scope:** 4 canonical screens × 2 languages (English & Spanish) = 8 localized versions  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Audit Date:** November 19, 2026  
**Status:** 100% Verified against Authoritative Figma Frames

---

## 1. Authoritative Figma Frame Inventory

| Screen ID   | Screen Name                                 | Language | Figma Node ID | Dimensions    | Canvas Background | Reference Capture File                          |
| :---------- | :------------------------------------------ | :------- | :------------ | :------------ | :---------------- | :---------------------------------------------- |
| **C23-C**   | Correct AI Items                            | English  | `412:625`     | 430 × 1219 px | `#080B0B`         | `docs/qa/phase-03-31/figma/c23c-en-figma.png`   |
| **C23-C**   | Corregir detalles del objeto                | Spanish  | `987:10439`   | 430 × 1219 px | `#080B0B`         | `docs/qa/phase-03-31/figma/c23c-es-figma.png`   |
| **C23-S**   | Customer Confirmed Items                    | English  | `412:683`     | 430 × 1319 px | `#080B0B`         | `docs/qa/phase-03-31/figma/c23s-en-figma.png`   |
| **C23-S**   | Tus objetos confirmados                     | Spanish  | `987:10506`   | 430 × 1319 px | `#080B0B`         | `docs/qa/phase-03-31/figma/c23s-es-figma.png`   |
| **C23-R**   | Rejected AI Identification                  | English  | `412:861`     | 430 × 950 px  | `#080B0B`         | `docs/qa/phase-03-31/figma/c23r-en-figma.png`   |
| **C23-R**   | Una sugerencia de IA parece incorrecta      | Spanish  | `987:10714`   | 430 × 950 px  | `#080B0B`         | `docs/qa/phase-03-31/figma/c23r-es-figma.png`   |
| **C24-ADM** | Service Pricing Needs Review                | English  | `412:1006`    | 430 × 1008 px | `#080B0B`         | `docs/qa/phase-03-31/figma/c24adm-en-figma.png` |
| **C24-ADM** | Las tarifas del servicio requieren revisión | Spanish  | `987:10887`   | 430 × 1008 px | `#080B0B`         | `docs/qa/phase-03-31/figma/c24adm-es-figma.png` |

---

## 2. Detailed Screen Specifications & Typography Analysis

### 2.1 C23-C: Correct AI Items

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN` (`text-[10px]`, SemiBold, `#BAFF42`), sub-marker `  /  C23-C` (`#788580`).
- **Heading:** `Correct the item details` (`text-[25px]`, Bold, `#F6F8F6`) / `Corregir detalles del objeto`.
- **Subtitle:** `The customer-confirmed inventory overrides unverified AI suggestions.` (`text-[12px]`, Regular, `#ADB7B1`) / `El inventario confirmado prevalece sobre sugerencias IA no verificadas.`
- **Saved Booking Ledger:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (Container `#1A2510`, text `#BAFF42`, `text-[11px]`, SemiBold, `h-[37px]`).
- **Correction Section:** `Queen mattress correction` / `Corrección del colchón queen` (`text-[17px]`, SemiBold).
  - Field 1: `Correct item name` → `Queen mattress` / `Colchón queen`
  - Field 2: `Number of mattresses` → `2` (`#BAFF42`, interactive step counter)
  - Field 3: `Dimensions per item` → `80 × 60 × 11 in · customer estimated` / `80 × 60 × 11 pulg. · Estimación del cliente`
  - Field 4: `Weight per item` → `~70 lb · customer estimated` / `~70 lb · Estimación del cliente`
  - Field 5: `Supporting photo` → `Existing image retained` / `Se conserva la imagen anterior`
- **Notice Card:** `Updated draft inputs` / `Datos del borrador actualizados` (border `#35403B`, info badge, supporting `Quantity corrected from AI's 1 to Sarah's 2.` / `Cantidad corregida: IA indicó 1 y Sarah confirmó 2.`).
- **Notice Paragraph:** `Price inputs must be recalculated from corrected, rule-versioned information.` / `Los precios se recalculan con datos corregidos y reglas vigentes.`
- **CTAs:**
  - Primary: `Save and confirm all items` / `Guardar y confirmar todos los objetos` (`#BAFF42`, `h-[52px]`, routes to `/customer-confirmed-items`).
  - Secondary: `Return to comparison  ›` / `Volver a comparación  ›` (`#151A19`, border `#35403B`, text `#BAFF42`, routes to `/verify-suggested-inventory`).
- **Disclaimer:** `DEMO STATE · No validated quote or booking yet` · `SRS AI-03, AI-06, AI-17  ·  430 px / vertical scrolling`.

### 2.2 C23-S: Customer Confirmed Items

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN`, sub-marker `  /  C23-S`.
- **Heading:** `Your confirmed items` (`text-[25px]`, Bold, `#F6F8F6`) / `Tus objetos confirmados`.
- **Subtitle:** `Three categories; four individual pieces verified by Sarah.` (`text-[12px]`, Regular, `#ADB7B1`) / `Sarah verificó tres categorías y cuatro piezas individuales.`
- **Confirmed for Pricing Section:** Container `#151A19`, 3 items with authentic photographs (`90 × 74 px`):
  1. `3-seat sofa` (`c18j-sofa.png`): `Quantity 1 · ~125 lb` · Dimensions `82 × 35 × 34 in · estimated` (`#BAFF42`).
  2. `Queen mattresses` (`c18j-mattresses.png`): `Quantity 2 · ~70 lb each` · Dimensions `80 × 60 × 11 in each · estimated` (`#BAFF42`).
  3. `Dining table` (`c18j-table.png`): `Quantity 1 · ~85 lb` · Dimensions `60 × 36 × 30 in · estimated` (`#BAFF42`).
- **Inputs Carried into Quotation Section:**
  - `Pickup: 1234 E Example Lane, Phoenix, AZ 85014`
  - `Access: ground level · driveway · ~25 ft carry`
  - `4 source images · customer-confirmed quantities`
- **Notice Section:** `Confirmation recorded (prototype)` / `Confirmación registrada (prototipo)` · `No unsupported exact measurements are inferred. Quote processing is the next step.`
- **CTAs:**
  - Primary: `Calculate illustrative quote` / `Calcular cotización ilustrativa` (shows upcoming C24-P prototype demonstration banner).
  - Secondary: `Edit confirmed items  ›` / `Editar objetos confirmados  ›` (routes to `/correct-ai-items`).
- **Disclaimer:** `DEMO STATE · No validated quote or booking yet` · `SRS AI-02, AI-03, AI-06, AI-17  ·  430 px / vertical scrolling`.

### 2.3 C23-R: Rejected AI Identification

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN`, sub-marker `  /  C23-R`.
- **Heading:** `An AI suggestion looks incorrect` (`text-[25px]`, Bold) / `Una sugerencia de IA parece incorrecta`.
- **Subtitle:** `Remove the wrong suggestion without deleting customer-confirmed booking data.` / `Elimina la sugerencia errónea sin borrar los datos confirmados.`
- **Customer Evidence Section:** `Queen mattresses` with authentic mattress photograph (`c18j-mattresses.png`, `90 × 74 px`):
  - `Customer confirms 2 units` / `El cliente confirma 2 unidades`
  - Highlight in `#BAFF42`: `AI suggestion of 1 is incorrect` / `La sugerencia de 1 unidad es incorrecta`
- **Notice Section:** `Keep the customer's validated items` / `Conservar objetos validados por el cliente` · Supporting: `Only the mistaken AI observation is rejected.` / `Solo se rechaza la observación errónea de IA.` · `Original customer input and media remain on the job audit trail.`
- **CTAs:**
  - Primary: `Correct the item count` / `Corregir cantidad de objetos` (routes to `/correct-ai-items`).
  - Secondary: `Return to verification  ›` / `Volver a verificación  ›` (routes to `/verify-suggested-inventory`).
- **Disclaimer:** `DEMO STATE · No validated quote or booking yet` · `SRS AI-03, AI-17  ·  430 px / vertical scrolling`.

### 2.4 C24-ADM: Admin Review Pending

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE` / `W03 · RECONOCIMIENTO IA Y COTIZACIÓN`, sub-marker `  /  C24-ADM`.
- **Heading:** `Service pricing needs review` (`text-[25px]`, Bold) / `Las tarifas del servicio requieren revisión`.
- **Subtitle:** `Service-specific rates or eligibility need an authorized Admin decision before a final price can be shown.` / `Las tarifas o la elegibilidad requieren una decisión autorizada antes de mostrar un precio final.`
- **Customer Ledger:** `✓  SARAH MITCHELL  ·  SERVICE DEMO` (EN) / `✓  SARAH MITCHELL  ·  DEMO DE SERVICIO` (ES).
- **Review Case Section:**
  - Line 1: `Service request · Sarah Mitchell · Demo` / `Solicitud de servicio · Sarah Mitchell · Demo`
  - Line 2: `Concern: service-rate or eligibility rule needs approval` / `Alerta: tarifas o elegibilidad requieren aprobación`
  - Line 3: `Status: Pending authorized Admin review` / `Estado: Pendiente de revisión autorizada de Admin`
- **Notice Section:** `No definitive amount yet` / `Aún no hay importe definitivo` (warning tone with triangle badge):
  - `Customer will see approved/rejected/clarification outcome.`
  - `Admin review is required, not automatically successful.`
- **CTAs:**
  - Primary: `View approved-review example` / `Ver ejemplo de revisión aprobada` (shows upcoming C24-ADM-S demo banner).
  - Secondary: `Provide more item detail  ›` / `Añadir detalles del objeto  ›` (routes to `/measurement-clarification`).
  - Tertiary: `Admin requests changes example  ›` / `Ejemplo de cambios solicitados por Admin  ›` (shows upcoming C24-ADM-D demo banner).
- **Disclaimer:** `DEMO STATE · No validated quote or booking yet` · `SRS AI-05, SV-12, SV-14 · Shared service-rate review / vertical scrolling`.

---

## 3. Design Token Verification

All screens conform strictly to the design token rules:

- `colors.background`: `#080B0B`
- `colors.surface`: `#151A19`
- `colors.elevated`: `#222827`
- `colors.brand`: `#BAFF42`
- `colors.primaryText`: `#F6F8F6`
- `colors.secondaryText`: `#ADB7B1`
- Subtle borders: `#35403B`
- Customer ledger fill: `#1A2510`
