# HAULIX Driver & Worker Mobile App — Phase DW-D02
# Bilingual (English & Spanish) Screen Inventory Specification

**Phase:** DW-D02  
**Target Module:** DW-W02 (Driver & Helper Eligibility & Document Management)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Sections:** English `1085:2` & Spanish `1088:2`  
**Target Viewport:** 430 × 932 px reference canvas  

---

## 1. Bilingual Screen Inventory & Text Audit

### Screen 1: DW05 — Driver Verification
- **English Node:** `1085:154` (`DW05 · Driver verification`)
- **Spanish Node:** `1088:154` (`DW05 · Driver verification · iOS ES`)
- **Header:**
  - EN: Title "Driver verification" | Sub: "Complete required eligibility checks before job offers."
  - ES: Title "Verificación del conductor" | Sub: "Completa las verificaciones requeridas para recibir ofertas."
- **Status Badge:** `ACTION REQUIRED` / `ACCIÓN REQUERIDA`
- **Checklist Items:**
  1. EN: "Government photo ID" | ES: "Identificación oficial con foto"
  2. EN: "Driver's license" | ES: "Licencia de conducir"
  3. EN: "Vehicle & insurance details" | ES: "Datos del vehículo y del seguro"
  4. EN: "Background check" | ES: "Verificación de antecedentes"
- **Policy Notice:**
  - EN: "Verification status is determined by the server. Approval is required before dispatch eligibility."
  - ES: "El servidor determina el estado de verificación. Se requiere aprobación para recibir asignaciones."
- **CTAs:**
  - Primary: "Upload driver documents" / "Subir documentos" (Pill `#BAFF42`)
  - Secondary: "Continue as Helper instead" / "Continuar como Ayudante" (Ghost button)

---

### Screen 2: DW06 — Helper Verification
- **English Node:** `1085:207` (`DW06 · Helper verification`)
- **Spanish Node:** `1088:207` (`DW06 · Helper verification · iOS ES`)
- **Header:**
  - EN: Title "Helper verification" | Sub: "Helpers independently confirm their eligibility."
  - ES: Title "Verificación del ayudante" | Sub: "Los Ayudantes verifican su elegibilidad por separado."
- **Checklist Items:**
  1. EN: "Identity & selfie" | ES: "Identidad y selfie"
  2. EN: "Background check" | ES: "Verificación de antecedentes"
  3. EN: "Work eligibility" | ES: "Elegibilidad laboral"
- **Crew Independence Callout:**
  - EN: "Your acceptance is your own: A Driver cannot accept a job on your behalf. You must individually accept eligible crew invitations."
  - ES: "Tú decides si aceptas: Un Conductor no puede aceptar trabajos por ti. Debes aceptar cada invitación elegible personalmente."
- **CTAs:**
  - Primary: "Submit verification" / "Enviar verificación" (Pill `#BAFF42`)
  - Secondary: "Back to role selection" / "Volver a elegir rol" (Ghost button)

---

### Screen 3: DW07 — Driver Documents
- **English Node:** `1085:254` (`DW07 · Driver documents`)
- **Spanish Node:** `1088:254` (`DW07 · Driver documents · iOS ES`)
- **Header:**
  - EN: Title "Driver documents" | Sub: "Upload clear, current documents for review."
  - ES: Title "Documentos del conductor" | Sub: "Sube documentos claros y vigentes para revisión."
- **Upload Category Cards:**
  1. EN: "Driver's license" / "Front and back images required" | ES: "Licencia de conducir" / "Se requieren fotos de ambos lados"
  2. EN: "Vehicle registration" / "Truck / van / trailer" | ES: "Registro del vehículo" / "Camioneta / furgoneta / remolque"
  3. EN: "Insurance certificate" / "Current policy on eligible vehicle" | ES: "Certificado de seguro" / "Póliza vigente del vehículo autorizado"
- **Upload Selector Tile:**
  - EN: "Tap to add document photos" / "JPG / PNG · Example only"
  - ES: "Toca para añadir fotos" / "JPG / PNG · Solo ejemplo"
- **CTAs:**
  - Primary: "Submit for review" / "Enviar a revisión" (Pill `#BAFF42`)
  - Secondary: "Back to checklist" / "Volver a la lista" (Ghost button)

---

### Screen 4: DW08 — Verification Status
- **English Node:** `1085:298` (`DW08 · Verification status`)
- **Spanish Node:** `1088:298` (`DW08 · Verification status · iOS ES`)
- **Header:**
  - EN: Title "Verification status" | Sub: "Your account is being reviewed."
  - ES: Title "Estado de verificación" | Sub: "Estamos revisando tu cuenta."
- **Status Hero Container:**
  - EN: Headline "Verification pending" | Sub: "We will notify you when verification is complete. Job acceptance remains unavailable until eligibility is confirmed."
  - ES: Headline "Verificación pendiente" | Sub: "Te avisaremos al completar la revisión. No podrás aceptar trabajos hasta confirmar tu elegibilidad."
- **State Pill:** `PENDING REVIEW` / `EN REVISIÓN`
- **Notice:** "Documents submitted · No active job access" / "Documentos enviados · Sin acceso a trabajos"
- **Navigation Links:**
  - "View sample Driver home" / "Ver inicio del Conductor (demo)"
  - "Check verification details" / "Ver detalles de verificación"
  - "View sample Helper home ›" / "Ver inicio del Ayudante (demo) ›"

---

### Screen 5: DW33 — Verification Needs Action
- **English Node:** `1086:1155` (`DW33 · Verification needs action`)
- **Spanish Node:** `1088:1484` (`DW33 · Verification needs action · iOS ES`)
- **Header:**
  - EN: Title "Verification needs action" | Sub: "A document was rejected or expired."
  - ES: Title "Verificación requiere acción" | Sub: "Un documento fue rechazado o venció."
- **Action Required Container:**
  - EN: "Document needs resubmission: Review the reason supplied by verification staff."
  - ES: "Debes volver a enviar el documento: Revisa el motivo indicado por el equipo de verificación."
- **Detail Items:**
  - EN: "Identity document: Example: image unclear or expired" | ES: "Documento de identidad: Ejemplo: imagen borrosa o documento vencido"
  - EN: "Eligibility state: Unable to accept new job offers until cleared" | ES: "Estado de elegibilidad: No puedes aceptar ofertas hasta obtener aprobación"
- **Monorepo Rule Callout:**
  - EN: "No bypass: Never display a rejected worker as verified or dispatch eligible."
  - ES: "Sin omitir controles: Nunca muestres un trabajador rechazado como verificado o elegible para recibir servicios."
- **CTAs:**
  - Primary: "Resubmit documents" / "Reenviar documentos"
  - Secondary: "Contact support" / "Contactar soporte"

---

### Screen 6: DW38 — Documents & Vehicle
- **English Node:** `1270:665` (`DW38 · Documents & vehicle · EN · Approved Profile`)
- **Spanish Node:** `1270:1616` (`DW38 · Documentos y vehículo · ES · Approved Profile`)
- **Header:**
  - EN: Title "Documents & vehicle" | Sub: "Manage documents and vehicle information"
  - ES: Title "Documentos y vehículo" | Sub: "Gestiona tus documentos y vehículo"
- **Status Cards:**
  1. Driver License: EN "Required to drive on HAULIX" · [Verified] | ES "Requerida para conducir en HAULIX" · [Verificado]
  2. Government ID: EN "Identity verification" · [Verified] | ES "Verificación de identidad" · [Verificado]
  3. Insurance: EN "Coverage under review" · [Pending] | ES "Cobertura en revisión" · [Pendiente]
  4. Vehicle Registration: EN "Renewal document required" · [Needs update] | ES "Se requiere renovación" · [Actualizar]
  5. Vehicle Details: EN "Make, model, year and plate" · [Completed] | ES "Marca, modelo, año y placa" · [Completo]
- **CTA:** "Upload or update a document" / "Subir o actualizar documento"
- **Footer Notice:** "Stay eligible: Keep your documents current to receive job offers." / "Mantén tu elegibilidad: Actualiza tus documentos para recibir ofertas."

---

### Screen 7: DW56 — Helper Eligibility & Documents
- **English Node:** `1301:1633` (`DW56 · Helper eligibility & documents · EN · UX Gap Completion`)
- **Spanish Node:** `1301:2875` (`DW56 · Verificación del ayudante · ES · UX Gap Completion`)
- **Header:**
  - EN: Title "Helper eligibility & documents" | Sub: "Independent worker verification"
  - ES: Title "Verificación del ayudante" | Sub: "Documentos del trabajador independiente"
- **Policy Card:**
  - EN: "Helper verification: No vehicle or driver license required for helper-only work."
  - ES: "Verificación de ayudante: No se requieren licencia ni vehículo si solo es Ayudante."
- **Status Rows:**
  1. Government photo ID: EN "Identity status · Example verified" | ES "Identidad · ejemplo verificado"
  2. Selfie / identity match: EN "Identity matching workflow" | ES "Comparación de identidad"
  3. Background screening: EN "Verification review status" | ES "Estado de revisión"
- **Role Boundary Notice:**
  - EN: "Role-specific requirement: Driver vehicle documents apply only to Driver eligibility."
  - ES: "Requisito por rol: Los documentos de vehículo aplican al Conductor."
- **CTA:** "Review verification details" / "Ver detalles de verificación"
