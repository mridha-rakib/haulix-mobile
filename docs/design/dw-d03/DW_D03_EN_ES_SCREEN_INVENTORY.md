# HAULIX Driver & Worker Mobile App — Phase DW-D03
# Bilingual Screen Inventory & Translation Symmetry Specification

**Phase:** DW-D03  
**Target Module:** DW-W03 (Operational Home & Availability Management)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Sections:** English `1085:2` & Spanish `1088:2`  
**Target Viewport:** 430 × 932 px reference canvas  

---

## 1. Bilingual Screen Inventory & Text Audit

### Screen 1: DW09 — Driver Dashboard
- **English Node:** `1086:3` (`DW09 · Driver dashboard`)
- **Spanish Node:** `1088:332` (`DW09 · Driver dashboard · iOS ES`)
- **Header:**
  - EN: Title "Driver dashboard" | Sub: "Available work · eligibility verified (demo)"
  - ES: Title "Inicio del conductor" | Sub: "Trabajos disponibles · elegibilidad verificada (demo)"
- **Worker Greeting & Rating:**
  - EN: "Good morning, Alex" | "4.8 ★ · verified Driver"
  - ES: "Buenos días, Alex" | "4.8 ★ · Conductor verificado"
- **Status Toggle:**
  - EN: Status `ONLINE` | Sub: "Receive eligible offers only"
  - ES: Status `EN LÍNEA` | Sub: "Solo ofertas elegibles"
- **Job Offers Feed:**
  - Card 1:
    - EN: "Furniture Removal" [NEW] | "HX-AZ-DEMO-0042" | "Phoenix, AZ · 4.8 mi" | "Earnings at offer · estimate only"
    - ES: "Retiro de muebles" [NUEVO] | "HX-AZ-DEMO-0042" | "Phoenix, AZ · 4.8 mi" | "Ganancias indicadas en oferta · estimación"
  - Card 2:
    - EN: "Junk Removal" [NEW] | "DEMO-ONLY OFFER" | "Mesa, AZ · 7.2 mi" | "Requires verification · estimate only"
    - ES: "Retiro de basura" [NUEVO] | "OFERTA DE DEMO" | "Mesa, AZ · 7.2 mi" | "Requiere verificación · estimación"
- **Policy Disclosure:**
  - EN: "Offers, rates and availability are server-gated. Figures are illustrative."
  - ES: "El servidor controla ofertas, tarifas y disponibilidad. Las cifras son ilustrativas."

---

### Screen 2: DW31 — Helper Dashboard
- **English Node:** `1086:1058` (`DW31 · Helper dashboard`)
- **Spanish Node:** `1088:1387` (`DW31 · Helper dashboard · iOS ES`)
- **Header:**
  - EN: Title "Helper dashboard" | Sub: "Independent crew invitation & individual balance"
  - ES: Title "Inicio del ayudante" | Sub: "Invitaciones del equipo y saldo individual"
- **Worker Greeting & Availability:**
  - EN: "Welcome back, Helper" | "Your own availability: ONLINE (demo)" | "Verified invitation eligibility required"
  - ES: "Bienvenido, Ayudante" | "Tu disponibilidad: EN LÍNEA (demo)" | "Se requiere elegibilidad de invitación verificada"
- **Invitations & Assignment Feed:**
  - Row 1:
    - EN: "Invitations waiting: Review and accept only your own crew assignments [1 NEW]"
    - ES: "Invitaciones pendientes: Revisa y acepta solo tus propias asignaciones [1 NUEVA]"
  - Row 2:
    - EN: "Current assignment: HX-AZ-DEMO-0042 · awaiting your acceptance [PENDING]"
    - ES: "Asignación actual: HX-AZ-DEMO-0042 · esperando tu aceptación [PENDIENTE]"
  - Row 3:
    - EN: "Your earnings: Individual worker ledger and eligible payouts"
    - ES: "Tus ganancias: Registro individual y pagos elegibles"
- **Crew Independence Callout:**
  - EN: "Independent responsibility: A Driver invitation does not assign you until you choose to accept and the server confirms eligibility."
  - ES: "Responsabilidad individual: La invitación no te asigna automáticamente. Debes aceptar y el servidor verifica tu elegibilidad."

---

### Screen 3: DW39 — Availability Settings
- **English Node:** `1270:793` (`DW39 · Availability settings · EN · Approved Profile`)
- **Spanish Node:** `1270:1744` (`DW39 · Disponibilidad · ES · Approved Profile`)
- **Header:**
  - EN: Title "Availability settings" | Sub: "Set when you are available to work"
  - ES: Title "Disponibilidad" | Sub: "Configura cuándo estás disponible"
- **Setting Items:**
  1. Work status:
     - EN: "Work status: Go online to receive job offers"
     - ES: "Estado de trabajo: Conéctate para recibir ofertas"
  2. Working days:
     - EN: "Working days: Select the days you want to work" [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
     - ES: "Días de trabajo: Selecciona los días disponibles" [Lu, Ma, Mi, Ju, Vi, Sa, Do]
  3. Working hours:
     - EN: "Working hours: Start time 8:00 AM ⌄, End time 6:00 PM ⌄"
     - ES: "Horario de trabajo: Hora de inicio 8:00 AM ⌄, Hora de fin 6:00 PM ⌄"
  4. Service radius:
     - EN: "Service radius: Maximum distance for job offers: 50 mi"
     - ES: "Radio de servicio: Distancia máxima de las ofertas: 50 mi"
  5. Preferred shift:
     - EN: "Preferred shift: Your typical work preference: Day shift"
     - ES: "Turno preferido: Preferencia de horario: Día"
  6. Vacation mode:
     - EN: "Vacation mode: Pause job offers for a set period"
     - ES: "Modo vacaciones: Pausar ofertas temporalmente"
- **CTA:** "Save availability" / "Guardar disponibilidad"

---

### Overlays: Availability Preferences
- **English Node:** `1286:554` (`QA Overlay / availability-en`)
- **Spanish Node:** `1286:568` (`QA Overlay / availability-es`)
- **Content:**
  - EN: "Availability preferences" | "Review time, service radius and shift configuration." | "Hours · 8:00 AM – 6:00 PM" | "Service radius · 50 miles" | "Preferred shift · Day" | "Close preview"
  - ES: "Preferencias de disponibilidad" | "Revisa el horario, radio de servicio y turno preferido." | "Horario · 8:00 AM – 6:00 PM" | "Radio de servicio · 50 millas" | "Turno preferido · Día" | "Cerrar vista previa"
