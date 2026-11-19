# HAULIX Customer App — Phase 03.35
## W04 Screen Inventory & Four-Screen Manifest

**Phase:** 03.35  
**Workflow:** W04 Scheduling & Payment  
**Scope:** 4 Canonical Screens × English + Spanish = 8 Localized Screen Specifications  
**Status:** Design-First Foundation Complete  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`

---

## 1. Executive Discovery & Context

An inspection of Figma file `Q946h4YBGgyLsjnPtdyQNe` confirmed two critical facts:
1. **Dedicated Workflow Page `432:737` (`Customer — W04 Scheduling & Payment · EN + ES`):** Contains the workflow directory frame `432:738` documenting the life-cycle of W04.
2. **Authoritative Master W04 Sections on Page `1:2` (`01 — Customer App (5 Screens)`):** The master native editable Figma frames for the complete W04 flow reside in:
   - **English Section `758:2`:** `W04 — ENGLISH | Scheduling • Terms • Stripe Authorization • Recovery • Booking` (24 frames)
   - **Spanish Section `758:3`:** `W04 — ESPAÑOL | Programación • Términos • Autorización • Recuperación • Reserva` (24 frames)

The first four canonical screens of the sequential W04 journey have been audited and selected for this implementation-ready design batch.

---

## 2. Four-Screen Manifest Matrix

| Screen ID | Official Screen Title (EN / ES) | Canonical Figma Node ID (EN / ES) | Dimensions (EN / ES) | SRS Traceability | Primary Objective |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C27** | Choose your service time /<br>Elige cuándo necesitas el servicio | `763:2` / `766:388` | 430 × 990 px /<br>430 × 1023 px | `SCH-01`, `SCH-02` | Scheduling entry; customer selects between immediate service (ASAP) and scheduling for later. |
| **C27-A** | Request service ASAP /<br>Solicitar servicio cuanto antes | `763:71` / `766:457` | 430 × 905 px /<br>430 × 905 px | `SCH-01`, `SCH-03` | Immediate service selection; displays criteria for online verified drivers and non-guaranteed arrival disclosures. |
| **C27-S** | Select an available window /<br>Elige un horario disponible | `763:133` / `766:519` | 430 × 1198 px /<br>430 × 1215 px | `SCH-01`, `SCH-04` | Scheduled window selection; presents date selector rail and sample 2-hour windows with 60-minute advance rule. |
| **C28** | Review your booking /<br>Revisa tu reserva | `763:396` / `766:782` | 430 × 1195 px /<br>430 × 1180 px | `BK-01`, `BK-02`, `BK-03` | Booking summary review; displays confirmed items, illustrative quote ($356), cancellation policy, and terms consent checkbox. |

---

## 3. Detailed Screen Specifications

### Screen 1: C27 — Choose Your Service Time / Elige Cuándo Necesitas el Servicio
- **Canonical Node ID:** EN `763:2` | ES `766:388`
- **Progress Header:** `01 / 04 · SCHEDULE` / `01 / 04 · HORARIO` (Phase 1 active, 3 upcoming)
- **Primary Objective:** Transition user from C26-A Scope Accepted into scheduling. Provide distinct selection cards for immediate service ("As soon as possible") and future scheduled windows ("Schedule for later").
- **Required Input Data:** Single timing choice (`mode: 'asap' | 'scheduled'`).
- **Required Validation:** One of the two timing modes must be selected to proceed.
- **Navigation:**
  - *Entry:* From W03 endpoint C26-A (`/scope-accepted` CTA "Continue to Schedule & Payment").
  - *Exit (ASAP):* Tapping "As soon as possible" navigates to C27-A (`763:71` / `766:457`).
  - *Exit (Scheduled):* Tapping "Schedule for later" or primary CTA navigates to C27-S (`763:133` / `766:519`).
  - *Alternative:* "Preview unavailable slot" navigates to C27-R (`763:269` / `766:655`).
- **Disclosures:** Prominent notice: *"Select a service option below. Availability must be checked by the server."* / *"Selecciona una opción. La disponibilidad debe validarse en el servidor."*
- **Backend Boundary:** No live driver availability or calendar supply queried locally.

---

### Screen 2: C27-A — Request Service ASAP / Solicitar Servicio Cuanto Antes
- **Canonical Node ID:** EN `763:71` | ES `766:457`
- **Progress Header:** `01 / 04 · SCHEDULE` / `01 / 04 · HORARIO`
- **Primary Objective:** Present requirements and expectations for immediate dispatch without misleading the customer.
- **Required Input Data:** Acknowledgment of ASAP eligibility criteria (nearby verified driver, geographic boundaries, active vehicle capacity).
- **Required Validation:** Server eligibility check must pass before advancing to booking review.
- **Navigation:**
  - *Forward:* Tapping "Continue if available" advances to C28 Booking Review (`763:396` / `766:782`).
  - *Error State:* Tapping "No driver available" routes to C27-N (`763:336` / `766:722`).
  - *Back/Switch:* Tapping "Schedule for later" switches to C27-S; tapping "Change timing" returns to C27.
- **Disclosures:** *"No guaranteed driver or arrival time. Continue only if eligible capacity is confirmed."* / *"Sin conductor ni hora de llegada garantizados. Continuar solo si se valida la capacidad."*

---

### Screen 3: C27-S — Select an Available Window / Elige un Horario Disponible
- **Canonical Node ID:** EN `763:133` | ES `766:519`
- **Progress Header:** `01 / 04 · SCHEDULE` / `01 / 04 · HORARIO`
- **Primary Objective:** Provide intuitive selection of scheduled service dates and sample 2-hour appointment windows.
- **Required Input Data:**
  - Selected Date: e.g. `Tue, Nov 03` (rail options: Nov 03, Nov 04, Nov 05, Nov 06).
  - Selected Window: e.g. `10:00 AM – 12:00 PM MST` (options: 10AM–12PM, 12PM–2PM, 2PM–4PM, 4PM–6PM).
- **Required Validation:** Same-day schedules require at least 60 minutes advance notice. Slots within 60 minutes must be rejected or disabled.
- **Navigation:**
  - *Forward:* Tapping "Continue to review" advances to C28 Booking Review (`763:396` / `766:782`).
  - *Validation Error:* Tapping "Try invalid same-day time" routes to C27-V (`763:202` / `766:588` "This time is too soon").
  - *Stale Slot Error:* Tapping "Preview stale slot" routes to C27-R (`763:269` / `766:655` "Slot no longer available").
  - *Switch:* Tapping "As soon as possible" switches to C27-A.
- **Disclosures:** *"Illustrative only • server availability check required"* / *"Ejemplo ilustrativo • sujeto a validación del servidor"*.

---

### Screen 4: C28 — Review Your Booking / Revisa Tu Reserva
- **Canonical Node ID:** EN `763:396` | ES `766:782`
- **Progress Header:** `02 / 04 · TERMS` / `02 / 04 · CONDICIONES` (Phase 1 & 2 active, 2 upcoming)
- **Primary Objective:** Display comprehensive booking summary, quote breakdown, and binding legal terms before entering the payment flow.
- **Required Input Data:**
  - Explicit customer consent checkbox: `[ ] I have read and agree to the displayed booking and cancellation terms.`
- **Required Validation:**
  - The primary CTA ("Review & accept terms" / "Continue to payment") remains DISABLED until the customer explicitly checks the terms consent box.
- **Booking At A Glance Display:**
  - Pickup Area: `Phoenix, AZ 85004 · demo`
  - Confirmed Items: Preserves W03 customer inventory (e.g. 1 sofa, 2 chairs / 2 mattresses, 1 table).
  - Illustrative W03 Quote: `$356.00`
  - Cancellation Policy: *"Cancellation: conditional $100 post-assignment fee; agreed exceptions apply."* / *"Cancelación: posible cargo de $100 tras asignación, sujeto a excepciones aprobadas."*
- **Navigation:**
  - *Forward (Consent Checked):* Tapping the checkbox routes to C28-C (`763:467` / `766:853` "Terms accepted for this quote") which then unlocks entry to C29 Payment Method (`763:605` / `766:991`).
  - *Terms Updated State:* Tapping "Policy was updated" routes to C28-U (`763:536` / `766:922`).
  - *Edit Step:* Tapping "Edit service time" returns to C27-S (`763:133` / `766:519`).
- **Disclosures:** Prominent alert: *"This screen is BEFORE terms acceptance. The $100 fee applies only under eligible post-assignment conditions and stated exceptions."*
