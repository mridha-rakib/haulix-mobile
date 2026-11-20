# HAULIX Mobile — Phase 03.38

## Figma Source Node Inspection & Visual Baseline Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.38  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Audit Date:** 2026-11-20

---

## 1. Authoritative Figma Frame Inventory

The four canonical recovery, fee-free exit, and payment preparation screens are defined across 8 editable frames in Page `432:737` (with master sections on Page `1:2` nodes `758:2` / `758:3`):

### Screen 1: C28-U — Booking Terms Changed

- **English Variant:** Node `763:536`
  - Dimensions: 430 × 1052 px
  - Frame Name: `W04-EN / C28-U · Booking terms have changed`
  - Visual Elements: Header with back navigation, progress indicator `02 / 04 · TERMS`, title "Booking terms have changed", subtitle "Please review the updated policy before continuing.", location chip "PHOENIX, AZ 85004 · DEMO", amber warning badge "TERMS UPDATED (v2)", warning title "POLICY UPDATED DURING BOOKING", summary card of updated points (dispatch conditions, emergency exceptions, driver arrival hold), preserved quote snapshot card ($356.00 illustrative quote, pickup area, confirmed items), consent invalidation callout, primary CTA "Review updated terms", secondary CTA "Back to scheduling", demo disclaimer note.
- **Spanish Variant:** Node `766:922`
  - Dimensions: 430 × 1052 px
  - Frame Name: `W04-ES / C28-U · Las condiciones de reserva han cambiado`
  - Title: "Las condiciones de reserva han cambiado"
  - Subtitle: "Revisa las condiciones actualizadas antes de continuar."
  - Primary CTA: "Revisar condiciones actualizadas"
  - Secondary CTA: "Volver a programación"

### Screen 2: C27-X — No-Driver Fee-Free Cancellation

- **English Variant:** Node `773:776`
  - Dimensions: 430 × 753 px
  - Frame Name: `W04-EN / C27-X · No driver found · Cancel without fee`
  - Visual Elements: Progress indicator `01 / 04 · SCHEDULE`, title "Cancel without fee", subtitle "No eligible driver was assigned to your immediate request.", status capsule with lime/brand badge "CANCELLED · $0.00 FEE", summary card explaining zero charge because no driver was matched, resolution details card (Request Type: Immediate ASAP, Cancellation Fee: $0.00 Waived, Payment Status: No charge / Hold released), primary CTA "Start another request", secondary CTA "Schedule for another date", demo disclaimer note.
- **Spanish Variant:** Node `773:993`
  - Dimensions: 430 × 786 px
  - Frame Name: `W04-ES / C27-X · Sin conductor · Cancelación sin cargo`
  - Title: "Cancelar sin cargo"
  - Subtitle: "Ningún conductor elegible fue asignado a tu solicitud inmediata."
  - Primary CTA: "Iniciar otra solicitud"
  - Secondary CTA: "Programar para otra fecha"

### Screen 3: C29 — Choose Payment Method

- **English Variant:** Node `763:605`
  - Dimensions: 430 × 1093 px
  - Frame Name: `W04-EN / C29 · Choose payment method`
  - Visual Elements: Progress indicator `03 / 04 · PAYMENT`, title "Choose payment method", subtitle "Select how you would like to authorize this booking.", location chip "PHOENIX, AZ 85004 · DEMO", authorization total card (Amount: `$356.00`, Badge: `HOLD ONLY`, note: non-binding estimate), payment methods list (Credit or Debit Card via Stripe, Digital Wallet Apple Pay / Google Pay), security guarantee card, primary CTA "Continue with card", secondary CTA "Review terms again", demo disclaimer note.
- **Spanish Variant:** Node `766:991`
  - Dimensions: 430 × 1108 px
  - Frame Name: `W04-ES / C29 · Elige el método de pago`
  - Title: "Elige el método de pago"
  - Subtitle: "Selecciona cómo deseas autorizar esta reserva."
  - Primary CTA: "Continuar con tarjeta"
  - Secondary CTA: "Revisar condiciones"

### Screen 4: C29-M — Secure Card Setup / Provider Handoff Demo

- **English Variant:** Node `814:4531`
  - Dimensions: 430 × 1041 px
  - Frame Name: `W04-EN / C29-M · Secure card setup`
  - Visual Elements: Progress indicator `03 / 04 · PAYMENT`, title "Secure card setup", subtitle "Encrypted provider handoff demonstration.", location chip, security badge capsule "256-BIT ENCRYPTION · SECURE HANDOFF", simulated Stripe provider card representation (chip icon, demo customer name, masked card number `•••• •••• •••• 4242`, expiry `12 / 28`), authorization details card ($356.00 USD hold), provider handoff demo disclosure (HAULIX never collects or stores card credentials), primary CTA "Simulate secure authorization", secondary CTA "Change payment method", demo disclaimer note.
- **Spanish Variant:** Node `814:4604`
  - Dimensions: 430 × 1121 px
  - Frame Name: `W04-ES / C29-M · Configuración segura de tarjeta`
  - Title: "Configuración segura de tarjeta"
  - Subtitle: "Demostración de pasarela segura encriptada."
  - Primary CTA: "Simular autorización segura"
  - Secondary CTA: "Cambiar método de pago"

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
| Warning Amber          | `#F2C94C` / `rgba(242, 201, 76, 0.18)`  | `#F2C94C`                          | Identical |
| Warning Dark Bg        | `#1C170E`                               | `#1C170E`                          | Identical |
| Card Provider Surface  | `#161D1A`                               | `#161D1A`                          | Identical |
| Typography             | Inter (Regular, Medium, SemiBold, Bold) | `@haulix/design-tokens` fontFamily | Identical |

---

## 3. Discrepancy & Invariant Resolutions

1. **Active Customer Scope vs Figma Visual Preset:**
   - Active journey arriving from W03 preserves verified customer inventory (4 items: 1 sofa, 2 queen mattresses, 1 dining table).
   - Direct demo navigator fixture displays 1:1 Figma visual mockup (1 sofa + 2 chairs).
   - Handled cleanly via `getEffectiveConfirmedItems(draft, locale)`.
2. **Symmetrical Non-Binding Price:**
   - Both English and Spanish variants present strictly `$356.00 USD` (or `$356.00`).
3. **No Sensitive Financial Data Collection:**
   - C29-M strictly presents read-only visual representations; no interactive TextInput fields collect PAN or CVV.
