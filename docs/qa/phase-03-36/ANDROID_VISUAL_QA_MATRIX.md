# Android Visual QA Matrix — Phase 03.36

## HAULIX Customer Mobile App · Physical Hardware Verification

**Test Device:** Realme Note 60 (`RMX3930`)  
**Hardware Serial:** `0B04731X200003BB`  
**Operating System:** Android 15 (API 35)  
**Display:** 720 × 1600 px, ~260 PPI, 90 Hz IPS LCD
**Expo Client:** Metro Development Server on Port 8085  
**Test Date:** November 20, 2026

---

## 1. 8-Screen Canonical Visual Evidence Matrix

Every screen was rendered and captured directly on the physical Android hardware in both English and Spanish, including initial viewports and scrolled viewports to verify complete below-the-fold content:

| Screen Code | Language | Initial Screenshot                   | Scrolled Screenshot                                    | Header & Eyebrow                                            | Primary Body Elements                                                  | CTAs & Disclaimers                                            | Status   |
| :---------- | :------- | :----------------------------------- | :----------------------------------------------------- | :---------------------------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------ | :------- |
| **C27**     | English  | [`c27-en.png`](android/c27-en.png)   | [`c27-en-scrolled.png`](android/c27-en-scrolled.png)   | `01 / 04 · SCHEDULE`<br>`Choose your service time`          | Dual ASAP & Scheduled cards, Arizona scope banner                      | "Request ASAP", "Choose a scheduled time"                     | **PASS** |
| **C27**     | Spanish  | [`c27-es.png`](android/c27-es.png)   | [`c27-es-scrolled.png`](android/c27-es-scrolled.png)   | `01 / 04 · HORARIO`<br>`Elige cuándo necesitas el servicio` | Tarjetas duales ASAP y Franja programada                               | "Solicitar cuanto antes", "Elegir un horario programado"      | **PASS** |
| **C27-A**   | English  | [`c27a-en.png`](android/c27a-en.png) | [`c27a-en-scrolled.png`](android/c27a-en-scrolled.png) | `01 / 04 · SCHEDULE`<br>`Request service ASAP`              | Verified driver condition notice, location & capacity criteria         | "Continue if available", "No driver available"                | **PASS** |
| **C27-A**   | Spanish  | [`c27a-es.png`](android/c27a-es.png) | [`c27a-es-scrolled.png`](android/c27a-es-scrolled.png) | `01 / 04 · HORARIO`<br>`Solicitar servicio cuanto antes`    | Aviso de conductor verificado, criterios de disponibilidad             | "Continuar si hay disponibilidad", "Sin conductor disponible" | **PASS** |
| **C27-S**   | English  | [`c27s-en.png`](android/c27s-en.png) | [`c27s-en-scrolled.png`](android/c27s-en-scrolled.png) | `01 / 04 · SCHEDULE`<br>`Select an available window`        | Horizontal 4-day carousel, 4 2-hour window slots                       | "Continue to review", "Try invalid same-day time"             | **PASS** |
| **C27-S**   | Spanish  | [`c27s-es.png`](android/c27s-es.png) | [`c27s-es-scrolled.png`](android/c27s-es-scrolled.png) | `01 / 04 · HORARIO`<br>`Elige un horario disponible`        | Selector de 4 fechas, 4 franjas de 2 horas                             | "Continuar a revisión", "Probar horario inválido para hoy"    | **PASS** |
| **C28**     | English  | [`c28-en.png`](android/c28-en.png)   | [`c28-en-scrolled.png`](android/c28-en-scrolled.png)   | `02 / 04 · TERMS`<br>`Review your booking`                  | Booking at a glance, $356 quote, cancellation policy, consent checkbox | "Continue to payment", "Policy updated", "Edit service time"  | **PASS** |
| **C28**     | Spanish  | [`c28-es.png`](android/c28-es.png)   | [`c28-es-scrolled.png`](android/c28-es-scrolled.png)   | `02 / 04 · CONDICIONES`<br>`Revisa tu reserva`              | Resumen de reserva, cotización $356, política de cancelación, casilla  | "Continuar al pago", "Cambió la política", "Editar horario"   | **PASS** |

---

## 2. Interactive Journey & Prototype Transition Evidence

| Test Flow / Journey               | Description                                                                             | Captured Artifacts                                                                                                                                                                                         | Result & Observations                                                                                                        |
| :-------------------------------- | :-------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **W03 → W04 Transition**          | From C26-A (`/scope-accepted`), user taps primary CTA "Continue to Schedule & Payment". | [`c26a-scope-accepted.png`](android/c26a-scope-accepted.png)<br>[`c26a-to-c27-transition.png`](android/c26a-to-c27-transition.png)                                                                         | **PASS:** Seamlessly navigates into C27 (`/choose-service-time`). Replaces previous placeholder notice.                      |
| **Journey 1: ASAP Path**          | C26-A → C27 → C27-A → C28.                                                              | [`c27a-en.png`](android/c27a-en.png)<br>[`c28-en.png`](android/c28-en.png)                                                                                                                                 | **PASS:** C28 displays "Demo · ASAP · Subject to driver" in header pill and summary.                                         |
| **Journey 2: Scheduled Path**     | C26-A → C27 → C27-S → C28.                                                              | [`c27-to-c27s-transition.png`](android/c27-to-c27s-transition.png)<br>[`c27s-to-c28-transition.png`](android/c27s-to-c28-transition.png)                                                                   | **PASS:** User selects `Tue, Nov 3 · 10 AM–12 PM MST`; C28 displays selected window accurately.                              |
| **Journey 3: Edit Service Time**  | On C28, user taps "Edit service time".                                                  | [`c28-journey-edit-time-target.png`](android/c28-journey-edit-time-target.png)                                                                                                                             | **PASS:** Returns back to scheduling route (`/request-service-asap` or `/select-available-window`).                          |
| **Journey 4: Terms Consent Gate** | On C28, user attempts Continue without checkbox; then checks box and taps Continue.     | [`c28-validation-error.png`](android/c28-validation-error.png)<br>[`c28-consent-checked.png`](android/c28-consent-checked.png)<br>[`c28-future-notice-payment.png`](android/c28-future-notice-payment.png) | **PASS:** Displays validation error banner when unchecked. When checked, button enables and triggers payment handoff notice. |
| **Journey 5: Back Navigation**    | User taps Header Back arrow on C27-A / C27-S.                                           | [`c27a-back-to-c27.png`](android/c27a-back-to-c27.png)                                                                                                                                                     | **PASS:** Cleanly pops back to C27 with draft state preserved.                                                               |
| **Notice: Same-Day Advance**      | On C27-S, user tests same-day 60-min rule.                                              | [`c27s-future-notice-sameday.png`](android/c27s-future-notice-sameday.png)                                                                                                                                 | **PASS:** Displays notice detailing 60-minute advance notice rule for same-day bookings.                                     |
| **Notice: Capacity Unavailable**  | On C27, user tests out-of-capacity slot.                                                | [`c27-future-notice-unavailable.png`](android/c27-future-notice-unavailable.png)                                                                                                                           | **PASS:** Explains verified driver capacity constraints truthfully.                                                          |
| **Notice: Policy Updated**        | On C28, user taps "Policy updated".                                                     | [`c28-future-notice-policy.png`](android/c28-future-notice-policy.png)                                                                                                                                     | **PASS:** Details $100 post-assignment fee policy and authorized exceptions.                                                 |

---

## 3. Physical Hardware Quality Checklist

- [x] **No Text Truncation:** Tested in both EN and ES; multi-line disclaimers wrap naturally without ellipsis clipping.
- [x] **Safe Area Insets:** Handled via `SafeAreaView` from `react-native-safe-area-context`; no content clashes with Android status bar or navigation gesture bar.
- [x] **Scrolling Smoothness:** Tested at 90 Hz; `ScrollView` with `contentContainerStyle` provides comfortable scroll and bounce dynamics.
- [x] **Floating Demo Trigger:** Accessible at all times without obstructing primary CTA buttons.
- [x] **Zero Fabricated Backend Actions:** All state changes are purely in-memory React/MobX-style draft updates; no fake HTTP endpoints or mock network delays.
