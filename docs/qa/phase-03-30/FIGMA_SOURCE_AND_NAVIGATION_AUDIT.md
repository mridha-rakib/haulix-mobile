# HAULIX Phase 03.30 — Figma Source and Navigation Audit

**Batch:** Phase 03.30  
**Flow:** W03 — AI Uncertainty, Inventory Verification & Manual Recovery  
**Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`  
**Audit Date:** November 19, 2026  
**Auditor:** Antigravity AI Agent

---

## 1. Authoritative Figma Frames (8 Localized Screen Variants)

| Canonical Route               | Screen Code | Description                | English Figma Node | Spanish Figma Node | Dimensions    |
| :---------------------------- | :---------- | :------------------------- | :----------------- | :----------------- | :------------ |
| `/ai-uncertain-result`        | **C22-Q**   | Uncertain AI Result        | `412:515`          | `987:10309`        | 430 × 959 px  |
| `/verify-suggested-inventory` | **C23**     | Verify Suggested Inventory | `412:563`          | `987:10367`        | 430 × 1229 px |
| `/manual-item-verification`   | **C23-M**   | Manual Item Verification   | `412:748`          | `987:10581`        | 430 × 1171 px |
| `/measurement-clarification`  | **C23-U**   | Measurement Clarification  | `412:803`          | `987:10646`        | 430 × 1246 px |

---

## 2. Screen Specifications & Copy Mapping

### Screen 1: C22-Q — Uncertain AI Result

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C22-Q` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C22-Q`)
- **Heading:** `We need a closer look` / `Necesitamos revisar más de cerca`
- **Subtitle:** `Photo overlap or low visibility prevents reliable classification.` / `Superposición o poca visibilidad impiden clasificar con fiabilidad.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — Image needs clarification:**
  - Card Heading: `Image needs clarification` / `La imagen necesita aclaración`
  - Uploaded Photo: `Mattresses · overlapping` (`c18j-mattresses.png`, 102 × 74 px)
  - Detail: `Preserved concept evidence · Fictional` / `Pruebas de concepto conservadas · Ficticias`
- **Section 2 — Category or count uncertain:**
  - Feedback Notice Title: `Category or count uncertain` / `Categoría o cantidad incierta`
  - Supporting: `Review the detailed guidance below.` / `Revisa las indicaciones detalladas a continuación.`
  - Guidance 1: `Do not convert uncertainty into a definitive quote.` / `No conviertas incertidumbre en una cotización definitiva.`
  - Guidance 2: `AI cannot verify whether one or two mattresses are shown.` / `La IA no puede comprobar si hay uno o dos colchones.`
- **Actions:**
  - Primary: `Correct the item list` / `Corregir lista de objetos` (links to upcoming C23-C notice)
  - Secondary: `Request manual quote review  ›` / `Solicitar revisión manual del precio  ›` (links to upcoming C24-ADM notice)
- **Rate Disclaimer:** `DEMO STATE · No validated quote or booking yet` / `ESTADO DEMO · Sin cotización ni reserva validadas`
- **Developer Handoff:** `SRS AI-04, AI-05  ·  430 px / vertical scrolling` (ES: `SRS AI-04, AI-05  ·  430 px / desplazamiento vertical`)
- **Navigation Connections:** Upstream access from C22-P (`/ai-processing`) secondary action. Back returns to `/ai-recognition`.

---

### Screen 2: C23 — Verify Suggested Inventory

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C23` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C23`)
- **Heading:** `Check all recognized items` / `Revisar todos los objetos reconocidos`
- **Subtitle:** `Sarah must confirm or correct item type, quantities and dimensions.` / `Sarah debe confirmar o corregir tipo, cantidades y medidas.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — Compare suggestions with your draft:**
  - Card Heading: `Compare suggestions with your draft` / `Comparar sugerencias con tu borrador`
  - Row 1: `3-seat sofa` (`c18j-sofa.png`, 90 × 74 px) · `Confirmed input ×1 · ~125 lb` / `Datos confirmados ×1 · ~125 lb` · `AI suggested ×1` / `La IA sugirió ×1`
  - Row 2: `Queen mattresses` (`c18j-mattresses.png`, 90 × 74 px) · `Customer input ×2 · ~70 lb each` / `Datos del cliente ×2 · ~70 lb c/u` · `AI suggested ×1 · mismatch` / `La IA sugirió ×1 · No coincide`
  - Row 3: `Dining table` (`c18j-table.png`, 90 × 74 px) · `Customer input ×1 · ~85 lb` / `Datos del cliente ×1 · ~85 lb` · `AI suggested ×1` / `La IA sugirió ×1`
- **Section 2 — Your correction is required:**
  - Feedback Notice Title: `Your correction is required` / `Debes corregir un dato`
  - Supporting: `Review the detailed guidance below.` / `Revisa las indicaciones detalladas a continuación.`
  - Guidance: `Two queen mattresses are in Sarah's intake. Confirm the quantity before quote calculation.` / `La solicitud tiene dos colchones queen. Confirma cantidad antes de cotizar.`
- **Actions:**
  - Primary: `Correct mattress quantity` / `Corregir cantidad de colchones` (links to upcoming C23-C notice)
  - Secondary: `Not sure about measurements  ›` / `¿No estás seguro de las medidas?  ›` (routes to `/measurement-clarification` [C23-U])
  - Tertiary: `AI suggestion wrong?  ›` / `¿Sugerencia de IA incorrecta?  ›` (links to upcoming C23-R notice)
- **Rate Disclaimer:** `DEMO STATE · No validated quote or booking yet` / `ESTADO DEMO · Sin cotización ni reserva validadas`
- **Developer Handoff:** `SRS AI-02, AI-03, AI-04  ·  430 px / vertical scrolling` (ES: `SRS AI-02, AI-03, AI-04  ·  430 px / desplazamiento vertical`)
- **Navigation Connections:** Upstream access from C22-D (`/ai-suggested-items`) primary action. Back returns to `/ai-suggested-items`.

---

### Screen 3: C23-M — Manual Item Verification

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C23-M` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C23-M`)
- **Heading:** `Confirm items without AI` / `Confirmar objetos sin IA`
- **Subtitle:** `Your existing manual inventory is available if AI is unavailable.` / `Tu inventario manual sigue disponible si falla la IA.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — Saved manual record:**
  - Card Heading: `Saved manual record` / `Registro manual guardado`
  - Row 1: `Sofa` / `Sofá` — `1 × 3-seat · ~125 lb` / `1 sofá de 3 plazas · ~125 lb`
  - Row 2: `Queen mattresses` / `Colchones tamaño queen` — `2 × queen · ~70 lb each` / `2 colchones queen · ~70 lb cada uno`
  - Row 3: `Dining table` / `Mesa de comedor` — `1 × table · ~85 lb` / `1 mesa · ~85 lb`
  - Row 4: `Evidence` / `Pruebas` — `Customer-entered and 4 intake images where available` / `Datos del cliente y 4 fotos de la solicitud cuando estén disponibles`
- **Section 2 — Confidence/eligibility still required:**
  - Feedback Notice Title: `Confidence/eligibility still required` / `Aún se requiere confianza y elegibilidad`
  - Supporting: `Review the detailed guidance below.` / `Revisa las indicaciones detalladas a continuación.`
  - Guidance 1: `Manual entry is not a substitute for approved Arizona tariffs.` / `La entrada manual no sustituye tarifas aprobadas de Arizona.`
  - Guidance 2: `Manual input may proceed to rule validation, but unresolved safety and dimensions require Admin review.` / `Los datos manuales pueden validarse; seguridad o medidas inciertas requieren Admin.`
- **Actions:**
  - Primary: `Confirm manual details` / `Confirmar detalles manuales` (links to upcoming C23-S notice)
  - Secondary: `Uncertain details / Admin review  ›` / `Datos inciertos / Revisión de Admin  ›` (links to upcoming C24-ADM notice)
- **Rate Disclaimer:** `DEMO STATE · No validated quote or booking yet` / `ESTADO DEMO · Sin cotización ni reserva validadas`
- **Developer Handoff:** `SRS BK-03, AI-03, AI-04, AI-05  ·  430 px / vertical scrolling` (ES: `SRS BK-03, AI-03, AI-04, AI-05  ·  430 px / desplazamiento vertical`)
- **Navigation Connections:** Upstream access from C22-F (`/ai-recognition-failed`), C22-O (`/ai-offline-recovery`), and C22-E (`/ai-missing-photos`). Back returns to `/verify-suggested-inventory`.

---

### Screen 4: C23-U — Measurement Clarification

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C23-U` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C23-U`)
- **Heading:** `We need better measurements` / `Necesitamos medidas más precisas`
- **Subtitle:** `A photograph cannot guarantee exact dimensions or weight.` / `Una foto no garantiza dimensiones ni peso exactos.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — Details needing attention:**
  - Card Heading: `Details needing attention` / `Detalles que requieren atención`
  - Row 1: `Potential item` / `Objeto posible` — `Overlapping queen mattresses` / `Colchones queen superpuestos`
  - Row 2: `Quantity from customer` / `Cantidad indicada por el cliente` — `2` / `2`
  - Row 3: `Weight per item` / `Peso por objeto` — `~70 lb · estimated` / `~70 lb · Estimado`
  - Row 4: `Photo-derived exact measurement` / `Medida exacta derivada de una foto` — `Unavailable` / `No disponible`
  - Row 5: `Lifting/access conditions` / `Condiciones de carga y acceso` — `Confirm safe handling` / `Confirmar manejo seguro`
- **Section 2 — No definitive quote yet:**
  - Feedback Notice Title: `No definitive quote yet` / `Aún no hay cotización definitiva`
  - Supporting: `Review the detailed guidance below.` / `Revisa las indicaciones detalladas a continuación.`
  - Guidance 1: `An uncertain load cannot receive guaranteed pricing or crew assignment.` / `Una carga incierta no garantiza precio ni asignación de equipo.`
  - Guidance 2: `Provide approximate sizes or ask for manual Admin review.` / `Indica tamaños aproximados o solicita revisión manual de Admin.`
- **Actions:**
  - Primary: `Correct measurements` / `Corregir medidas` (links to upcoming C23-C notice)
  - Secondary: `Submit for Admin quote review  ›` / `Enviar cotización a revisión de Admin  ›` (links to upcoming C24-ADM notice)
- **Rate Disclaimer:** `DEMO STATE · No validated quote or booking yet` / `ESTADO DEMO · Sin cotización ni reserva validadas`
- **Developer Handoff:** `SRS AI-04, AI-05, SV-14  ·  430 px / vertical scrolling` (ES: `SRS AI-04, AI-05, SV-14  ·  430 px / desplazamiento vertical`)
- **Navigation Connections:** Upstream access from C23 (`/verify-suggested-inventory`) secondary action and C22-D (`/ai-suggested-items`) secondary action. Back returns to `/verify-suggested-inventory`.

---

## 3. Strict Non-Fabrication Invariants Verified

1. **Customer Mattress Quantity Preserved:** Across all four screens (C22-Q, C23, C23-M, C23-U), the customer-entered quantity of 2 queen mattresses is strictly preserved and never silently replaced by illustrative AI suggestion of 1.
2. **Truthful Frontend Preview Only:** No artificial quoting engine, dynamic pricing API, admin backend dispatch, or payment completion is simulated.
3. **Locale State Parity:** English and Spanish dictionaries maintain complete structural symmetry verified by automated parity tests.
