# HAULIX Mobile — Phase 03.37

## Figma Source Node Inspection & Visual Baseline Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.37  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Audit Date:** 2026-11-20

---

## 1. Authoritative Figma Frame Inventory

The four canonical recovery and terms screens are defined across 8 editable frames in Page `432:737`:

### Screen 1: C27-V — Invalid Same-Day Service Time

- **English Variant:** Node `763:202`
  - Dimensions: 430 × 1044 px
  - Frame Name: `W04-EN / C27-V · Invalid same-day service time`
  - Visual Elements: Header with back navigation, progress indicator `01 / 04 · SCHEDULE`, title "This time is too soon", subtitle "Same-day scheduled service needs 60 minutes' initial notice.", location chip "PHOENIX, AZ 85004 · DEMO", main card with amber warning badge "NOT AVAILABLE", example slot "Today · under 60 minutes", availability check card, primary CTA "Select another time", secondary CTA "Back to timing", demo disclaimer note.
- **Spanish Variant:** Node `766:588`
  - Dimensions: 430 × 1044 px
  - Frame Name: `W04-ES / C27-V · Hora no válida para hoy`
  - Title: "La hora elegida es muy próxima"
  - Subtitle: "Los servicios de hoy requieren 60 minutos de anticipación."
  - Primary CTA: "Elegir otra hora"
  - Secondary CTA: "Volver a horarios"

### Screen 2: C27-R — Unavailable / Stale Service Window

- **English Variant:** Node `763:269`
  - Dimensions: 430 × 1044 px
  - Frame Name: `W04-EN / C27-R · That slot is no longer available`
  - Visual Elements: Progress indicator `01 / 04 · SCHEDULE`, title "That slot is no longer available", subtitle "Driver availability may change before booking.", main card with amber badge "No longer available · DEMO", example slot "Tue, Nov 3 · 10 AM–12 PM MST", availability check callout card, primary CTA "Refresh available times", secondary CTA "Check ASAP option", demo disclaimer note.
- **Spanish Variant:** Node `766:655`
  - Dimensions: 430 × 1079 px
  - Frame Name: `W04-ES / C27-R · Franja de servicio no disponible`
  - Title: "Ese horario ya no está disponible"
  - Subtitle: "La disponibilidad de conductores puede cambiar antes de reservar."
  - Primary CTA: "Actualizar horarios"
  - Secondary CTA: "Consultar servicio inmediato"

### Screen 3: C27-N — No Eligible Driver Found

- **English Variant:** Node `763:336`
  - Dimensions: 430 × 805 px
  - Frame Name: `W04-EN / C27-N · No eligible driver found`
  - Visual Elements: Progress indicator `01 / 04 · SCHEDULE`, title "No eligible driver found", subtitle "ASAP service cannot be guaranteed right now.", main card with amber border warning card, status capsule "ASAP · verified driver, location, capacity and schedule required", primary CTA "Schedule for later", secondary CTA "Change request", tertiary red text button "Cancel without fee", demo disclaimer note.
- **Spanish Variant:** Node `766:722`
  - Dimensions: 430 × 805 px
  - Frame Name: `W04-ES / C27-N · No hay conductor disponible`
  - Title: "No hay conductor disponible"
  - Subtitle: "No podemos garantizar servicio inmediato ahora."
  - Primary CTA: "Programar para después"
  - Secondary CTA: "Modificar solicitud"
  - Tertiary CTA: "Cancelar sin cargo"

### Screen 4: C28-C — Terms Accepted for This Quote

- **English Variant:** Node `763:467`
  - Dimensions: 430 × 1128 px
  - Frame Name: `W04-EN / C28-C · Terms accepted for this quote`
  - Visual Elements: Progress indicator `02 / 04 · TERMS`, title "Terms accepted for this quote", subtitle "Consent is specific to the displayed quote and policy version.", main card with green badge "PENDING", booking capsule "Furniture removal · Phoenix · Demo · [Time]", glance table (Pickup Area, Confirmed Items, Illustrative Quote `$356.00`, Cancellation Policy), checked checkbox with checkmark icon and green fill, amber warning panel "REVIEW BEFORE ACCEPTING", primary CTA "Continue to secure payment", secondary CTA "Review terms again", demo disclaimer note.
- **Spanish Variant:** Node `766:853`
  - Dimensions: 430 × 1178 px
  - Frame Name: `W04-ES / C28-C · Términos aceptados para esta cotización`
  - Title: "Condiciones aceptadas para esta cotización"
  - Subtitle: "El consentimiento corresponde a la cotización y versión de términos mostradas."
  - Primary CTA: "Continuar al pago seguro"
  - Secondary CTA: "Revisar condiciones"

---

## 2. Design Token Conformance

| Token                  | Figma Value                             | Code Implementation                | Status    |
| :--------------------- | :-------------------------------------- | :--------------------------------- | :-------- |
| `colors.brand`         | `#BAFF42` (neon lime)                   | `colors.brand`                     | Identical |
| `colors.background`    | `#080B0B` (deep dark)                   | `colors.background`                | Identical |
| `colors.surface`       | `#151A19` (card surface)                | `colors.surface`                   | Identical |
| `colors.elevated`      | `#222827` (elevated surface / border)   | `colors.elevated`                  | Identical |
| `colors.primaryText`   | `#F6F8F6` (high contrast)               | `colors.primaryText`               | Identical |
| `colors.secondaryText` | `#ADB7B1` (muted labels)                | `colors.secondaryText`             | Identical |
| Warning Amber          | `#F2C94C` / `rgba(242, 201, 76, 0.15)`  | Direct hex `#F2C94C`               | Identical |
| Warning Dark Bg        | `#1C170E`                               | `#1C170E`                          | Identical |
| Pending Green Bg       | `rgba(0, 229, 153, 0.15)`               | `rgba(0, 229, 153, 0.15)`          | Identical |
| Typography             | Inter (Regular, Medium, SemiBold, Bold) | `@haulix/design-tokens` fontFamily | Identical |

---

## 3. Discrepancy & Invariant Resolutions

1. **Active Journey vs Direct Demo Inventory:**
   - In Figma Page `432:737`, the visual design mockup frames display illustrative text: `FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS`.
   - In the active customer journey arriving from W03 / C26-A, the confirmed inventory is 4 pieces across 3 categories (1 sofa, 2 queen mattresses, 1 dining table).
   - **Resolution:** By implementing `getEffectiveConfirmedItems(draft, locale)` and `getEffectiveServiceType(draft, locale)` in `c36Scheduling.ts`, real customer journeys retain the confirmed 4 pieces without corruption, while direct demo navigator views reproduce the 1:1 Figma mockup visual.

2. **Symmetrical Non-Binding Price:**
   - The subtotal on C28 and C28-C is strictly `$356.00 USD` (symmetrical across English and Spanish).
   - Explicit disclaimer labels state that this estimate is illustrative and does not confirm live charges or backend bookings.
