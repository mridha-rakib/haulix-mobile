# HAULIX Customer Mobile App — Phase 03.49

## Canonical 20 States Specification & Fidelity Matrix (Workflow 05 Dispatch & Assignment)

**Authoritative Figma Source:** `meiXxwUNJaDo0a3mhcHBXv`  
**Parent Sections:** `836:4571` (English) / `836:4572` (Spanish)  
**Target Logical Width:** 360dp (Physical Device: Realme Note 60, Android 15)  
**Total States:** 20 canonical states (40 bilingual variants)  
**Coverage:** 100% (20/20)

---

## 1. Complete W05 20-State Canonical Mapping

| Index | Canonical Key      | Screen Name                    | Route Path                         | Figma EN   | Figma ES   | Status      | Visual Component Architecture                  |
| ----- | ------------------ | ------------------------------ | ---------------------------------- | ---------- | ---------- | ----------- | ---------------------------------------------- |
| 01    | `S10`              | Search Active (Initial Radius) | `/searching-for-driver`            | `844:4571` | `844:6721` | ✅ Complete | Dynamic radar pulse, search map, booking ref   |
| 02    | `S20`              | Search Expanded (20 Miles)     | `/search-expanded-20mi`            | `844:4670` | `844:6820` | ✅ Complete | Expanded radius overlay, timer progress        |
| 03    | `S30`              | Search Expanding (30 Miles)    | `/search-expanding-30mi`           | `844:4769` | `844:6919` | ✅ Complete | Secondary radius expansion notice              |
| 04    | `S40`              | Search Expanded (40 Miles)     | `/search-expanded-40mi`            | `844:4868` | `844:7018` | ✅ Complete | Regional driver dispatch radius                |
| 05    | `S50`              | Search Expanded (50 Miles)     | `/search-expanded-50mi`            | `844:4967` | `844:7117` | ✅ Complete | Max dispatch zone (50 mi), priority queue      |
| 06    | `ACCEPT_PENDING`   | Driver Offer Pending           | `/driver-offer-pending`            | `844:5066` | `844:7216` | ✅ Complete | Match countdown timer, driver offer in transit |
| 07    | `ASSIGNED`         | Driver Matched                 | `/driver-matched`                  | `844:5165` | `844:7315` | ✅ Complete | Verified driver assigned card, ETA countdown   |
| 08    | `DRIVER_DETAILS`   | Verified Driver Details        | `/driver-profile-details`          | `844:5284` | `844:7434` | ✅ Complete | Full driver bio, badge list, ratings, vehicle  |
| 09    | `HELPER_PENDING`   | Helper Crew Matching           | `/helper-matching`                 | `844:5403` | `844:7553` | ✅ Complete | 2-person crew requirement, helper search       |
| 10    | `HELPER_CONFIRMED` | Crew En Route / Active         | `/crew-tracking`                   | `844:5522` | `844:7672` | ✅ Complete | Driver + helper confirmed, live location map   |
| 11    | `RESTART`          | Dispatch Retry / Re-search     | `/dispatch-retry`                  | `844:5641` | `844:7791` | ✅ Complete | Offer declined/expired, automated retry cycle  |
| 12    | `REASSIGNED`       | Driver Reassigned              | `/driver-reassigned`               | `844:5740` | `844:7890` | ✅ Complete | Replacement driver badge, seamless handoff     |
| 13    | `DRIVER_LATE`      | Driver Arrival Delayed         | `/driver-arrival-update`           | `844:5859` | `844:8009` | ✅ Complete | Delay alert, updated ETA, fee-free waiver info |
| 14    | `NO_SHOW`          | Driver Has Not Arrived         | `/driver-no-show`                  | `844:5978` | `844:8128` | ✅ Complete | No-show review, fee-free cancel or reschedule  |
| 15    | `NO_DRIVER`        | No Driver Available            | `/no-driver-available`             | `844:6070` | `844:8220` | ✅ Complete | Exceeded max search, zero fee SRS guarantee    |
| 16    | `CANCEL_REVIEW`    | Fee-Free Cancel Review         | `/no-driver-fee-free-cancellation` | `844:6162` | `844:8312` | ✅ Complete | Financial breakdown showing $0.00 penalty      |
| 17    | `CANCELED`         | Request Canceled               | `/request-canceled`                | `844:6254` | `844:8404` | ✅ Complete | Full fee release confirmation, return home CTA |
| 18    | `RESCHEDULE`       | Choose Service Window          | `/dispatch-reschedule`             | `844:6346` | `844:8496` | ✅ Complete | Alternative booking time options, return links |
| 19    | `SUPPORT`          | Dispatch Support               | `/dispatch-support`                | `844:6445` | `844:8595` | ✅ Complete | Support routing options, delay/no-driver paths |
| 20    | `W06_BRIDGE`       | Next: Arrival & Service        | `/job-active-bridge`               | `844:6537` | `844:8687` | ✅ Complete | Handoff to W06 active service execution        |

---

## 2. Phase 03.49 Detailed State Specifications

### State 14: `NO_SHOW`

- **EN:** Node `844:5978` ("Driver has not arrived")
- **ES:** Node `844:8128` ("El conductor aún no llega")
- **Route:** `/driver-no-show`
- **Pill:** `NO-SHOW REVIEW` / `REVISIÓN DE AUSENCIA` (Amber)
- **Policy Pill:** "Confirmed no-driver: no cancellation fee under SRS." / "Sin conductor confirmado: cancelación sin cargo según SRS."
- **Primary CTA:** "Choose another date" / "Elegir otra fecha" -> `/dispatch-reschedule`
- **Secondary CTA:** "Review fee-free cancellation" / "Revisar cancelación sin cargo" -> `/no-driver-fee-free-cancellation`
- **Tertiary Link:** "Contact support" / "Contactar soporte" -> `/dispatch-support`

### State 18: `RESCHEDULE`

- **EN:** Node `844:6346` ("Choose another service window")
- **ES:** Node `844:8496` ("Elige otra ventana de servicio")
- **Route:** `/dispatch-reschedule`
- **Pill:** `RESCHEDULE OPTIONS` / `OPCIONES DE REPROGRAMACIÓN` (Brand Lime)
- **Primary CTA:** "Open W04 scheduling" / "Abrir programación W04" -> `/choose-service-time`
- **Secondary CTA:** "Back to no-driver state" / "Volver a sin conductor" -> `/no-driver-available`
- **Tertiary Link:** "Ask for help" / "Pedir ayuda" -> `/dispatch-support`

### State 19: `SUPPORT`

- **EN:** Node `844:6445` ("Get dispatch support")
- **ES:** Node `844:8595` ("Obtener ayuda con el despacho")
- **Route:** `/dispatch-support`
- **Pill:** `SUPPORT · DEMO` / `SOPORTE · DEMO` (Amber)
- **Primary CTA:** "No-driver options" / "Opciones sin conductor" -> `/no-driver-available`
- **Secondary CTA:** "Driver delay options" / "Opciones de retraso" -> `/driver-arrival-update`
- **Tertiary Link:** "Back to assignment" / "Volver a asignación" -> `/driver-matched`

### State 20: `W06_BRIDGE`

- **EN:** Node `844:6537` ("Next: arrival and service")
- **ES:** Node `844:8687` ("Siguiente: llegada y servicio")
- **Route:** `/job-active-bridge`
- **Pill:** `W06 HANDOFF · DEMO` / `TRANSFERENCIA A W06 · DEMO` (Brand Lime)
- **Driver Card:** Verified Mike R., white cargo van AZ 7HT-9234, crew 1 driver + helper pending
- **Primary CTA:** "Open Active Service preview" / "Abrir vista de servicio activo" -> `/crew-tracking`
- **Secondary CTA:** "Review crew readiness" / "Estado del equipo" -> `/helper-matching`
- **Tertiary Link:** "View driver details" / "Detalles del conductor" -> `/driver-profile-details`
