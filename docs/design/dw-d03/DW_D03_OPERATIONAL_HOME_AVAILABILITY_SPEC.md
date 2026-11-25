# HAULIX Driver & Worker Mobile App — Phase DW-D03
# Operational Home & Availability Dashboard Specification

**Phase:** DW-D03  
**Target Module:** DW-W03 (Operational Home & Availability Management)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Primary Requirements Source:** Signed HAULIX SRS v1.6 (Crosswalk Frame `1329:1824`, Appendix C p.24)  
**Launch Scope:** Arizona, USA (Initial Regional Operations)  

---

## 1. Module Overview & Role Boundaries

The Operational Home module represents the command center for field service workers upon passing backend credential verification:
- **Primary Driver (`DW09 · Driver dashboard`):** Displays operational toggle (`ONLINE` / `OFFLINE`), active incoming job offers with category and mileage badges, verified status indicator (`4.8 ★ · verified Driver`), and demo preview feeds.
- **Crew Helper (`DW31 · Helper dashboard`):** Displays independent Helper availability toggle (`ONLINE` / `OFFLINE`), incoming crew invitations waiting for independent confirmation, current assignment status, and worker ledger earnings summary.
- **Availability Settings (`DW39 · Availability settings`):** Centralized controls for operating days, daily working hours, Arizona service radius (10–50 miles), preferred shift, and vacation mode.

---

## 2. Driver Dashboard (`DW09`) Functional Audit

- **English Node:** `1086:3` (`DW09 · Driver dashboard`)
- **Spanish Node:** `1088:332` (`DW09 · Driver dashboard · iOS ES`)
- **Header & Greeting:** Personalized greeting (`Good morning, Alex` / `Buenos días, Alex`), worker rating and badge (`4.8 ★ · verified Driver` / `4.8 ★ · Conductor verificado`).
- **Availability State Control:**
  - Status Pill: High-visibility Electric Lime `#BAFF42` pill displaying `ONLINE` / `EN LÍNEA`.
  - Subtitle: *"Receive eligible offers only"* / *"Solo ofertas elegibles"*.
  - Toggling switches driver availability via secure backend dispatch WebSocket.
- **Available Job Offers Feed:**
  - Card 1 (`HX-AZ-DEMO-0042`): Category "Furniture Removal" [NEW], "Phoenix, AZ · 4.8 mi", "Earnings at offer · estimate only". Links directly to `DW11 · Job details` (`1086:162` / `1088:491`).
  - Card 2 (`DEMO-ONLY OFFER`): Category "Junk Removal" [NEW], "Mesa, AZ · 7.2 mi", "Requires verification · estimate only". Links directly to `DW10 · Job offers` (`1086:81` / `1088:410`).
- **Server Gate Policy Notice:**
  - *"Offers, rates and availability are server-gated. Figures are illustrative."* / *"El servidor controla ofertas, tarifas y disponibilidad. Las cifras son ilustrativas."*
- **Bottom Navigation:** Canonical 5-tab bar (`Navigation / 5 Tabs / Active Home`) standardized to 88px height (`y: 844`).

---

## 3. Helper Dashboard (`DW31`) Functional Audit

- **English Node:** `1086:1058` (`DW31 · Helper dashboard`)
- **Spanish Node:** `1088:1387` (`DW31 · Helper dashboard · iOS ES`)
- **Header & Greeting:** `Welcome back, Helper` / `Bienvenido, Ayudante`.
- **Independent Helper Availability:**
  - Helper availability is **DECOUPLED** from any driver's status: *"Your own availability: ONLINE (demo)"* / *"Tu disponibilidad: EN LÍNEA (demo)"*.
  - Requirement: *"Verified invitation eligibility required"*.
- **Incoming Invitations Feed:**
  - Row 1: *"Invitations waiting: Review and accept only your own crew assignments [1 NEW]"*. Links to `DW14 · Helper invitations` (`1086:268` / `1088:597`).
  - Row 2: *"Current assignment: HX-AZ-DEMO-0042 · awaiting your acceptance [PENDING]"*. Links to `DW15 · Review invitation` (`1086:328` / `1088:657`).
  - Row 3: *"Your earnings: Individual worker ledger and eligible payouts"*. Links to `DW23 · Earnings overview` (`1086:670` / `1088:999`).
- **Strict Crew Independence Callout:**
  - *"Independent responsibility: A Driver invitation does not assign you until you choose to accept and the server confirms eligibility."*
  - Monorepo Critical Rule #3 is visible on screen: Drivers cannot force assignments or collect wages on a Helper's behalf.
- **Bottom Navigation:** Canonical 5-tab bar (`Navigation / Home`) at 88px height (`y: 844`), with Profile tab explicitly navigating to `DW55 · Helper profile` (`1301:1534` / `1301:2776`).

---

## 4. Availability Settings & Service Radius (`DW39`)

- **English Node:** `1270:793` (`DW39 · Availability settings · EN · Approved Profile`)
- **Spanish Node:** `1270:1744` (`DW39 · Disponibilidad · ES · Approved Profile`)
- **Audited Configuration Controls:**
  1. **Work Status:** Master toggle to go online/offline (`Go online to receive job offers`).
  2. **Working Days:** Multi-select day selector chips: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun` (Lu, Ma, Mi, Ju, Vi, Sa, Do).
  3. **Working Hours:** Form inputs for daily start time (`8:00 AM ⌄`) and end time (`6:00 PM ⌄`).
  4. **Service Radius (SRS `WK-15`, `DP-01–18`):** Slider/dropdown set to maximum dispatch distance: `50 mi` (matching Arizona regional dispatch radius limits of 10 to 50 miles).
  5. **Preferred Shift:** Options for `Day shift` / `Night shift` / `Flexible`.
  6. **Vacation Mode:** Temporary hold toggle: *"Pause job offers for a set period"*.
  7. **Save CTA:** *"Save availability"* / *"Guardar disponibilidad"* (invokes native `BACK` action to return to Profile/Settings).

---

## 5. Supporting Availability Overlays

- **English Overlay Node:** `1286:554` (`QA Overlay / availability-en`, 430 × 298 px)
- **Spanish Overlay Node:** `1286:568` (`QA Overlay / availability-es`, 430 × 298 px)
- **Purpose:** Modal bottom-sheet preview displaying active availability parameters:
  - Hours: `8:00 AM – 6:00 PM`
  - Service radius: `50 miles`
  - Preferred shift: `Day`
  - Policy Notice: *"Changing these choices requires the implemented app controls and server-side availability validation."*
  - CTA: "Close preview" / "Cerrar vista previa".

---

## 6. Location Privacy & Runtime Gates (`NT-01–10`, `NFR-02`)

- **Background Location Policy:** In strict compliance with Signed SRS requirements `NT-01–10` and `NFR-02`, background GPS tracking is engaged **EXCLUSIVELY** while a worker is toggled `ONLINE` or actively navigating/executing a dispatched trip (`DW17`).
- **Zero Idle Tracking:** Toggling `OFFLINE` halts all background location telemetry immediately.
- **Client Battery & Device Safety:** GPS polling adapts to trip state (high-accuracy turn-by-turn during transit; periodic heartbeat during loading/unloading).

---

## 7. Unsupported Assumptions Corrected

- **Arbitrary Shift Readiness Checklists Removed:** Prior documentation assumed mandatory client checklists (e.g. 50% battery, physical hand truck, tie-down straps) before going online. Signed SRS v1.6 contains no requirement blocking driver availability based on hardware checklists. Availability is server-gated strictly by approved credential status (`DW08`), valid Arizona service radius, and active GPS permission.
