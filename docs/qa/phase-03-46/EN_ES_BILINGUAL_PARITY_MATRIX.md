# HAULIX Customer Mobile App — Phase 03.46

## English & Spanish Bilingual Parity Matrix

**PHASE:** 03.46  
**WORKFLOW:** W05 — Dispatch & Assignment  
**LOCALES:** English (`en`), Spanish (`es`)  
**TOTAL VARIANTS AUDITED:** 16 Localized Screens (8 English, 8 Spanish)  
**DEVICE AUDITED:** Realme Note 60 (`RMX3930`), Android 15, 720 × 1600 px

---

### 1. Bilingual Parity Methodology

Every user-facing string in Workflow 05 is externalized into `packages/i18n/src/locales/en.ts` and `packages/i18n/src/locales/es.ts`.

To guarantee strict parity:

1. **100% Key Symmetry:** Every key in `en.ts` under namespaces `w05Searching`, `w05DriverMatched`, `w05CrewTracking`, `w05Cancellation`, `w05NoDriver`, `w05DriverLate`, `w05Reassigned`, and `w05Canceled` has an exact 1:1 counterpart in `es.ts`.
2. **Zero Fallbacks or Untranslated English in Spanish Mode:** Captured physical screenshots on Android verify that no raw English leaks into Spanish screens.
3. **Layout Resilience:** Spanish text length is typically 15–25% longer than English. All cards, pills, buttons, and progress steps are verified for zero truncation, text clipping, or overflow.

---

### 2. Comprehensive 16-Variant Bilingual Audit Matrix

| Screen ID  | English Title                  | Spanish Title                      | Key Namespace      | Symmetrical Keys | Android Visual Parity    |
| ---------- | ------------------------------ | ---------------------------------- | ------------------ | ---------------- | ------------------------ |
| **C32-A**  | Searching for your HAULIX crew | Buscando a tu equipo HAULIX        | `w05Searching`     | 14 / 14          | **PASS** (Zero clipping) |
| **C32-B**  | Driver & Crew Confirmed        | Conductor y equipo confirmados     | `w05DriverMatched` | 18 / 18          | **PASS** (Zero clipping) |
| **C32-C**  | Crew En Route to Pickup        | Equipo en camino a la recogida     | `w05CrewTracking`  | 22 / 22          | **PASS** (Zero clipping) |
| **C32-D**  | Cancellation Windows & Policy  | Ventanas y política de cancelación | `w05Cancellation`  | 19 / 19          | **PASS** (Zero clipping) |
| **W05-ND** | No Driver Available in Area    | No hay conductor disponible        | `w05NoDriver`      | 15 / 15          | **PASS** (Zero clipping) |
| **W05-DL** | Arrival Time Updated           | Hora de llegada actualizada        | `w05DriverLate`    | 16 / 16          | **PASS** (Zero clipping) |
| **W05-RA** | New Driver Assigned            | Nuevo conductor asignado           | `w05Reassigned`    | 17 / 17          | **PASS** (Zero clipping) |
| **W05-CN** | Dispatch Request Canceled      | Solicitud de despacho cancelada    | `w05Canceled`      | 14 / 14          | **PASS** (Zero clipping) |

---

### 3. Specific Terminology & Technical Glossaries

| Concept                | English (EN)                                                                           | Spanish (ES)                                                                                             | Note                             |
| ---------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Brand Tagline**      | We Haul It All.                                                                        | Transportamos todo.                                                                                      | Approved HAULIX regional tagline |
| **Progress Track**     | Booked → Dispatch → Driver → Arrival → Service                                         | Reservado → Despacho → Conductor → Llegada → Servicio                                                    | 5-step lifecycle                 |
| **Dispatch Grace**     | 2-Minute Free Window                                                                   | Ventana gratuita de 2 minutos                                                                            | Exact legal refund period        |
| **Driver Title**       | Primary Lead Driver                                                                    | Conductor principal                                                                                      | Commercial crew lead             |
| **Support Disclaimer** | Support contact is available in the live service. This is an interactive demo preview. | El contacto de soporte está disponible en el servicio en vivo. Esta es una vista previa de demostración. | Veracity compliance              |

---

### 4. Verification Evidence

All 16 physical screenshots captured on the Realme Note 60 device confirm that both English and Spanish layouts render cleanly with appropriate vertical margins, readable font sizes, and zero wrapping artifacts.
