# HAULIX Customer App — Phase 03.35
## W04 Implementation Handoff Specification

**Target Implementation Phase:** Phase 03.36 (Frontend Application Routes)  
**Batch Scope:** Screens C27, C27-A, C27-S, C28

---

## 1. Proposed Expo Router Paths

The following routes are proposed for the upcoming application implementation phase:

| Screen ID | Screen Name | Proposed Route File | Route Path |
| :--- | :--- | :--- | :--- |
| **C27** | Choose Your Service Time | `apps/customer/app/(app)/choose-service-time.tsx` | `/choose-service-time` |
| **C27-A** | Request Service ASAP | `apps/customer/app/(app)/request-service-asap.tsx` | `/request-service-asap` |
| **C27-S** | Select Available Window | `apps/customer/app/(app)/select-available-window.tsx` | `/select-available-window` |
| **C28** | Review Your Booking | `apps/customer/app/(app)/review-booking.tsx` | `/review-booking` |

---

## 2. Localization Keys (`packages/i18n`)

Required translation dictionary namespaces for `en.ts` and `es.ts`:

### `c27ChooseServiceTime`
- `screenTitle`: "Choose your service time" / "Elige cuándo necesitas el servicio"
- `screenSubtitle`: "Choose an eligible ASAP request or a scheduled window." / "Elige una solicitud inmediata o un horario programado."
- `progressLabel`: "01 / 04 · SCHEDULE" / "01 / 04 · HORARIO"
- `timingAsapTitle`: "As soon as possible" / "Lo antes posible"
- `timingAsapDesc`: "Requires an eligible driver" / "Requiere conductor elegible"
- `timingScheduleTitle`: "Schedule for later" / "Programar para después"
- `timingScheduleDesc`: "Choose a service window" / "Elegir una franja horaria"
- `ctaSchedule`: "Choose a scheduled time" / "Elegir fecha y hora"
- `ctaAsap`: "Request ASAP" / "Solicitar lo antes posible"
- `ctaUnavailable`: "Preview unavailable slot" / "Ver horario no disponible"
- `noticeTitle`: "AVAILABILITY CHECK" / "VALIDAR DISPONIBILIDAD"
- `noticeBody`: "Select a service option below. Availability must be checked by the server." / "Selecciona una opción. La disponibilidad debe validarse en el servidor."

### `c27aRequestServiceAsap`
- `screenTitle`: "Request service ASAP" / "Solicitar servicio cuanto antes"
- `screenSubtitle`: "A nearby verified driver must be eligible and online." / "Debe haber un conductor verificado, apto y disponible."
- `eligibilityNote`: "ASAP · verified driver, location, capacity and schedule required" / "ASAP · sujeto a la ubicación, a los horarios y a un conductor elegible"
- `ctaContinue`: "Continue if available" / "Continuar si hay disponibilidad"
- `ctaNoDriver`: "No driver available" / "No hay conductor"
- `ctaChangeTiming`: "Change timing" / "Cambiar horario"
- `noticeTitle`: "AVAILABILITY CHECK" / "VALIDAR DISPONIBILIDAD"
- `noticeBody`: "No guaranteed driver or arrival time. Continue only if eligible capacity is confirmed." / "Sin conductor ni hora de llegada garantizados. Continuar solo si se valida la capacidad."

### `c27sSelectAvailableWindow`
- `screenTitle`: "Select an available window" / "Elige un horario disponible"
- `screenSubtitle`: "Same-day schedules need at least 60 minutes' notice." / "Las reservas para hoy requieren al menos 60 minutos de anticipación."
- `selectDateHeader`: "SELECT A DATE" / "ELIGE UNA FECHA"
- `sampleWindowsHeader`: "SAMPLE SERVICE WINDOWS" / "FRANJAS HORARIAS · EJEMPLOS"
- `disclaimer`: "Illustrative only • server availability check required" / "Ejemplo ilustrativo • sujeto a validación del servidor"
- `ctaContinue`: "Continue to review" / "Continuar a revisión"
- `ctaInvalidTime`: "Try invalid same-day time" / "Probar hora inválida"
- `ctaStaleSlot`: "Preview stale slot" / "Ver horario vencido"
- `noticeBody`: "Tue, Nov 3, 2026 • 10:00 AM–12:00 PM MST is an illustrative window, NOT live supply." / "Mar., 3 nov. 2026 • 10:00–12:00 MST es un horario ilustrativo; NO es disponibilidad real."

### `c28ReviewBooking`
- `screenTitle`: "Review your booking" / "Revisa tu reserva"
- `screenSubtitle`: "Confirm scope, sample estimate, time and cancellation policy." / "Confirma servicio, presupuesto de ejemplo, horario y condiciones."
- `progressLabel`: "02 / 04 · TERMS" / "02 / 04 · CONDICIONES"
- `sectionHeading`: "DETAILS & TERMS" / "DETALLES Y CONDICIONES"
- `glanceHeading`: "BOOKING AT A GLANCE" / "RESUMEN DE TU RESERVA"
- `pickupAreaKey`: "PICKUP AREA" / "ZONA DE RECOGIDA"
- `confirmedItemsKey`: "CONFIRMED ITEMS" / "ARTÍCULOS CONFIRMADOS"
- `pricingLabel`: "Illustrative W03 quote" / "Cotización de referencia"
- `pricingSample`: "$356.00"
- `cancellationPolicy`: "Cancellation: conditional $100 post-assignment fee; agreed exceptions apply." / "Cancelación: posible cargo de $100 tras asignación, sujeto a excepciones aprobadas."
- `consentCheckboxText`: "I have read and agree to the displayed booking and cancellation terms." / "He leído y acepto las condiciones de reserva y cancelación que se muestran."
- `ctaReviewAccept`: "Review & accept terms" / "Revisar y aceptar términos"
- `ctaPolicyUpdated`: "Policy was updated" / "Cambió la política"
- `ctaEditTiming`: "Edit service time" / "Editar horario"
- `noticeTitle`: "REVIEW BEFORE ACCEPTING" / "REVISAR CONDICIONES"
- `noticeBody`: "This screen is BEFORE terms acceptance. The $100 fee applies only under eligible post-assignment conditions and stated exceptions." / "Antes de aceptar condiciones. El cargo de $100 solo aplica en casos elegibles tras asignación y con excepciones."

---

## 3. Automated-Test Acceptance Criteria

For the future application implementation phase, the following test suites must be written:
1. **`choose-service-time.test.tsx`:**
   - Verifies rendering in English and Spanish.
   - Verifies toggle between ASAP and Scheduled.
   - Verifies routing to `/request-service-asap` and `/select-available-window`.
2. **`request-service-asap.test.tsx`:**
   - Verifies ASAP eligibility disclosure banner.
   - Verifies routing to `/review-booking` and error route fallback.
3. **`select-available-window.test.tsx`:**
   - Verifies date selector and 2-hour window selection.
   - Verifies 60-minute notice policy enforcement.
   - Verifies routing to `/review-booking`.
4. **`review-booking.test.tsx`:**
   - Verifies display of $356.00 illustrative subtotal.
   - Verifies conditional $100 fee notice.
   - Verifies primary CTA is disabled until consent checkbox is toggled.
