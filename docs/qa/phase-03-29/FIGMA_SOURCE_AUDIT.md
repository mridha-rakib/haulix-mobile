# HAULIX Phase 03.29 — Figma Source Audit

**Batch:** Phase 03.29  
**Flow:** W03 — AI Suggested Items, Recognition Failure, Offline Recovery & Missing Photos  
**Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`  
**Audit Date:** November 19, 2026  
**Auditor:** Antigravity AI Agent

---

## 1. Authoritative Figma Frames (8 Localized Screen Variants)

| Canonical Route          | Screen Code | Description                            | English Figma Node | Spanish Figma Node | Dimensions    |
| :----------------------- | :---------- | :------------------------------------- | :----------------- | :----------------- | :------------ |
| `/ai-suggested-items`    | **C22-D**   | AI Suggested Items / Quantity Mismatch | `412:328`          | `987:10084`        | 430 × 1162 px |
| `/ai-recognition-failed` | **C22-F**   | Recognition Failed / Preserved Draft   | `412:388`          | `987:10154`        | 430 × 956 px  |
| `/ai-offline-recovery`   | **C22-O**   | Offline Recovery                       | `412:433`          | `987:10209`        | 430 × 757 px  |
| `/ai-missing-photos`     | **C22-E**   | Missing Photo Evidence                 | `412:474`          | `987:10259`        | 430 × 772 px  |

---

## 2. Screen Specifications & Copy Mapping

### Screen 1: C22-D — AI Suggested Items / Quantity Mismatch

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C22-D` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C22-D`)
- **Heading:** `We found potential items` / `Encontramos posibles objetos`
- **Subtitle:** `Please compare each result with what you entered.` / `Compara cada resultado con lo que introdujiste.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — AI suggestions · unconfirmed:**
  - Row 1: `3-seat sofa` (ES: `Sofá de tres plazas`) · `AI suggests ×1` (ES: `La IA sugiere ×1`) · `Needs Sarah's confirmation` (ES: `Se requiere confirmación de Sarah`)
  - Row 2: `Queen mattress` (ES: `Colchón queen`) · `AI suggests ×1 · intake says ×2` (ES: `La IA sugiere ×1 · Solicitud indica ×2`) · `Quantity mismatch to correct` (ES: `Diferencia de cantidad por corregir`)
  - Row 3: `Dining table` (ES: `Mesa de comedor`) · `AI suggests ×1` (ES: `La IA sugiere ×1`) · `Needs confirmation` (ES: `Requiere confirmación`)
- **Section 2 — One quantity mismatch found:**
  - Box Title: `One quantity mismatch found` / `Se encontró una diferencia de cantidad`
  - Body: `Sarah entered two queen mattresses. AI identified only one. Customer-entered quantity is not silently replaced.` / `Sarah indicó dos colchones queen; IA detectó uno. No se cambia sin confirmación.`
- **Actions:**
  - Primary: `Verify each item` / `Verificar cada objeto` (height 52, bg `#BAFF42`, text `#080B0B`)
  - Secondary: `AI uncertain about an item  ›` / `¿La IA duda sobre un objeto?  ›` (height 56, bg `#151A19`, border `#35403B`, text `#BAFF42`)
- **Rate Disclaimer:** `DEMO STATE · No validated quote or booking yet` / `ESTADO DEMO · Sin cotización ni reserva validadas`
- **Upstream Connection:** Accessed via `View recognition result` button in C22-P (`/ai-processing`).

---

### Screen 2: C22-F — Recognition Failed / Preserved Draft

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C22-F` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C22-F`)
- **Heading:** `AI analysis couldn't finish` / `El análisis de IA no pudo terminar`
- **Subtitle:** `Upload evidence is still attached to the draft.` / `Las pruebas adjuntas siguen en el borrador.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — Recognition service unavailable:**
  - Box Title: `Recognition service unavailable` / `Servicio de reconocimiento no disponible`
  - Guidance: `Sarah may retry or confirm items manually.` / `Sarah puede reintentar o confirmar los objetos manualmente.`
  - Notice: `Network or processing error; no inaccurate item list or quote has been published.` / `Error de red/proceso; no se publicó lista ni cotización incorrecta.`
- **Section 2 — Preserved draft:**
  - Heading: `Preserved draft` / `Borrador conservado`
  - Summary: `HX-DEMO-1027 · 4 attachments` (ES runtime correction: `HX-DEMO-1027 · 4 adjuntos`)
  - Additional notice: `No booking or payment created` / `No se creó reserva ni pago`
- **Actions:**
  - Primary: `Retry recognition` / `Reintentar reconocimiento` (height 52, bg `#BAFF42`, text `#080B0B`)
  - Secondary: `Use manual item details  ›` / `Usar datos manuales de objetos  ›` (height 56, bg `#151A19`, border `#35403B`, text `#BAFF42`)
- **Upstream Connection:** Accessed via `Network failure example  ›` in C22-P (`/ai-processing`).

---

### Screen 3: C22-O — Offline Recovery

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C22-O` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C22-O`)
- **Heading:** `You're temporarily offline` / `Estás temporalmente sin conexión`
- **Subtitle:** `Previously entered inventory and images remain in this demonstration draft.` / `El inventario y fotos anteriores siguen en el borrador demo.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — No network connection:**
  - Box Title: `No network connection` / `Sin conexión de red`
  - Supporting: `AI results cannot be loaded right now.` / `No se pueden cargar los resultados de IA ahora.`
  - Guidance: `Retry when connected or edit previously entered item details.` / `Reintenta con conexión o edita los detalles anteriores.`
- **Actions:**
  - Primary: `Try again` / `Volver a intentar` (height 52, bg `#BAFF42`, text `#080B0B`)
  - Secondary: `Review manual inventory  ›` / `Revisar inventario manual  ›` (height 56, bg `#151A19`, border `#35403B`, text `#BAFF42`)
- **Upstream Connection:** Accessed via `Offline connection recovery  ›` in C22 (`/ai-recognition`).

---

### Screen 4: C22-E — Missing Photo Evidence

- **Flow Marker:** `W03 · AI RECOGNITION & QUOTE   /   C22-E` (ES: `W03 · RECONOCIMIENTO IA Y COTIZACIÓN   /   C22-E`)
- **Heading:** `Add photos or confirm manually` / `Añadir fotos o confirmar manualmente`
- **Subtitle:** `Without image evidence, AI image recognition cannot reliably identify unseen items.` / `Sin fotos, la IA no puede identificar objetos que no ve.`
- **Customer Chip:** `✓  SARAH MITCHELL  ·  HX-DEMO-1027` (ES runtime: `✓  BRYAN LOPEZ MENDOZA  ·  HX-DEMO-1027`)
- **Section 1 — No uploaded image evidence:**
  - Box Title: `No uploaded image evidence` / `No hay fotos cargadas como prueba`
  - Supporting: `No visual measurements will be fabricated.` / `No se inventarán medidas a partir de imágenes.`
  - Guidance: `Customer-entered details remain available; uncertain requests require clarification or Admin review.` / `Se conservan los datos; casos inciertos requieren aclaración o revisión Admin.`
- **Actions:**
  - Primary: `Review existing intake photos` / `Revisar fotos existentes de la solicitud` (height 52, bg `#BAFF42`, text `#080B0B`)
  - Secondary: `Enter verified details manually  ›` / `Introducir detalles verificados manualmente  ›` (height 56, bg `#151A19`, border `#35403B`, text `#BAFF42`)
- **Upstream Connection:** Accessed via `No photos available  ›` in C22 (`/ai-recognition`).

---

## 3. Strict Scope & Boundaries

- **Illustrative Prototype Only:** Illustrative AI recognition data without real AI inference, provider calls, automatic pricing or quotations.
- **Quantity Non-Fabrication:** The customer-entered quantity of 2 mattresses is never silently replaced by the illustrative AI suggestion of 1.
- **Single Canonical Route:** Exactly four route files serving both English and Spanish dynamically via `useTranslation`.
- **Navigation Safety:** Headers use `FlowHeaderBack` pinned outside scroll containers, returning cleanly upstream or via safe route fallbacks.
