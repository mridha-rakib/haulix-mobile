# HAULIX Mobile — Phase 03.39

## Android Visual QA Matrix (Physical Realme Note 60 Hardware)

**Project:** HAULIX Customer Mobile App  
**Device:** Realme Note 60 (`RMX3930`)  
**Serial:** `0B04731X200003BB`  
**OS:** Android 15  
**Verification Date:** 2026-11-21  
**Metro Server:** Port 8085

---

## 1. 8 Canonical Variant Matrix

| Screen     | Locale  | Initial View Screenshot | Scrolled View Screenshot | Status | Verified Elements                                                                                    |
| :--------- | :------ | :---------------------- | :----------------------- | :----- | :--------------------------------------------------------------------------------------------------- |
| **C29-3D** | English | `c29_3d-en-initial.png` | `c29_3d-en-scrolled.png` | Pass   | Progress `03 / 04 · PAYMENT`, 3DS 2.0 badge, Demo Bank card, $356.00 hold, primary CTA               |
| **C29-3D** | Spanish | `c29_3d-es-initial.png` | `c29_3d-es-scrolled.png` | Pass   | Progress `03 / 04 · PAGO`, badge 3DS 2.0, Banco Emisor de Prueba, $356.00 hold, CTA simular          |
| **C29-P**  | English | `c29p-en-initial.png`   | `c29p-en-scrolled.png`   | Pass   | Progress `03 / 04 · PAYMENT`, status spinner, $356.00 hold details, 3-step checklist, demo actions   |
| **C29-P**  | Spanish | `c29p-es-initial.png`   | `c29p-es-scrolled.png`   | Pass   | Progress `03 / 04 · PAGO`, indicador en progreso, detalles $356.00, pasos del proceso, acciones demo |
| **C30-D**  | English | `c30d-en-initial.png`   | `c30d-en-scrolled.png`   | Pass   | "Authorization was declined", amber badge, $356.00 attempted, zero charge statement, recovery CTAs   |
| **C30-D**  | Spanish | `c30d-es-initial.png`   | `c30d-es-scrolled.png`   | Pass   | "La autorización fue rechazada", insignia ámbar, $356.00 intentado, garantía sin cobro, CTAs         |
| **C30-E**  | English | `c30e-en-initial.png`   | `c30e-en-scrolled.png`   | Pass   | "Your card hold expired", amber badge, $0.00 charged, struck $356.00 prior hold, re-authorize CTA    |
| **C30-E**  | Spanish | `c30e-es-initial.png`   | `c30e-es-scrolled.png`   | Pass   | "La retención de tu tarjeta venció", insignia ámbar, $0.00 cobrado, $356.00 previo, CTA reautorizar  |

---

## 2. Critical Journeys Verification

### Journey A: Authentication Flow

1. `journey-a-1-c28-booking-review.png`: Entry at booking review with verified quote and scope.
2. `journey-a-2-c28c-terms-accepted.png`: Terms consent confirmed.
3. `journey-a-3-c29-choose-payment.png`: Payment method selection ($356.00 USD hold only).
4. `journey-a-4-c29m-secure-card.png`: Non-interactive provider handoff interface.
5. `journey-a-5-c29_3d-card-auth.png`: 3D Secure 2.0 authentication verification simulation.

### Journey B: Processing & Queue Flow

1. `journey-b-1-c29_3d-auth-initiated.png`: Successful authentication triggered.
2. `journey-b-2-c29p-processing-active.png`: Queue processing with animated indicator and steps.
3. `journey-b-3-c29p-success-notice.png`: Demo hold authorized notice with C31 roadmap.

### Journey C: Declined Authorization Recovery Flow

1. `journey-c-1-c29p-declined-simulated.png`: Simulated declined trigger tapped.
2. `journey-c-2-c30d-declined-view.png`: C30-D decline view with zero charge statement.
3. `journey-c-3-c30d-support-notice.png`: Support dispute assistance banner displayed.
4. `journey-c-4-c29-returned-to-payment.png`: Safe return to C29 payment method selection.

### Journey D: Expired Hold Recovery Flow

1. `journey-d-1-c29p-expired-simulated.png`: Simulated hold expiration tapped.
2. `journey-d-2-c30e-expired-view.png`: C30-E expired view showing $0.00 charged.
3. `journey-d-3-c30e-assistance-notice.png`: Extended hold renewal assistance banner displayed.
4. `journey-d-4-c27-returned-to-scheduling.png`: Return to service window scheduling.

### Journey E: Full Spanish Parity Flow

1. `journey-e-1-c29_3d-es.png`: C29-3D Spanish localization verified.
2. `journey-e-2-c29p-es.png`: C29-P Spanish localization verified.
3. `journey-e-3-c30d-es.png`: C30-D Spanish localization verified.
4. `journey-e-4-c30e-es.png`: C30-E Spanish localization verified.
