# HAULIX Mobile — Phase 03.39

## Figma Source Node Inspection & Visual Baseline Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.39  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Audit Date:** 2026-11-21

---

## 1. Authoritative Figma Frame Inventory

The four canonical card authentication, authorization processing, and payment recovery screens are defined across 8 editable frames in Page `432:737`:

### Screen 1: C29-3D — Confirm Your Card Authentication

- **English Variant:** Node `763:676`
  - Dimensions: 430 × 932 px
  - Frame Name: `W04-EN / C29-3D · Confirm your card authentication`
  - Visual Elements: Header with back navigation, progress indicator `03 / 04 · PAYMENT`, title "Confirm your card authentication", subtitle "Your card issuer requires 3D Secure verification before completing the temporary hold.", location chip "PHOENIX, AZ 85004 · DEMO", security badge capsule "3D SECURE 2.0 · ISSUER AUTHENTICATION", issuer authentication card (Demo Issuer Bank, Card ending in •••• 4242, $356.00 USD authorization hold, verified items scope, issuer verification guidance note), direct EMV 3-D Secure security guarantee card, primary CTA "Simulate successful authentication", secondary CTA "Cancel and return to payment methods", demo disclaimer note.
- **Spanish Variant:** Node `766:1062`
  - Dimensions: 430 × 914 px
  - Frame Name: `W04-ES / C29-3D · Confirma la autenticación de tu tarjeta`
  - Title: "Confirma la autenticación de tu tarjeta"
  - Subtitle: "El emisor de tu tarjeta requiere verificación 3D Secure antes de completar la retención temporal."
  - Primary CTA: "Simular autenticación exitosa"
  - Secondary CTA: "Cancelar y volver a métodos de pago"

### Screen 2: C29-P — Authorizing Your Payment

- **English Variant:** Node `763:745`
  - Dimensions: 430 × 899 px
  - Frame Name: `W04-EN / C29-P · Authorizing your payment`
  - Visual Elements: Header with back navigation, progress indicator `03 / 04 · PAYMENT`, title "Authorizing your payment", subtitle "Please wait while we place a temporary hold for your booking.", location chip "PHOENIX, AZ 85004 · DEMO", animated status capsule "AUTHORIZATION IN PROGRESS", temporary hold details card ($356.00 USD hold amount, Temporary Hold Only type, Visa ending in •••• 4242, confirmed items, non-capture explanation), 3-step progress checklist (1. Card authentication verified [Done], 2. Placing temporary authorization hold... [In progress], 3. Creating scheduling request [Pending]), demonstration simulation control options (Simulate declined [C30-D], Simulate expired [C30-E], Simulate success), demo disclaimer note.
- **Spanish Variant:** Node `766:1131`
  - Dimensions: 430 × 914 px
  - Frame Name: `W04-ES / C29-P · Autorizando tu pago`
  - Title: "Autorizando tu pago"
  - Subtitle: "Por favor espera mientras colocamos una retención temporal para tu reserva."
  - Status Badge: "AUTORIZACIÓN EN PROGRESO"
  - Primary Action / Notice: Simulación de opciones de prueba.

### Screen 3: C30-D — Authorization Was Declined

- **English Variant:** Node `763:814`
  - Dimensions: 430 × 899 px
  - Frame Name: `W04-EN / C30-D · Authorization was declined`
  - **CRITICAL CANONICAL IDENTITY:** C30-D is strictly "Authorization was declined", NOT Driver Dispatching!
  - Visual Elements: Header with back navigation, progress indicator `03 / 04 · PAYMENT`, title "Authorization was declined", subtitle "Your card issuer was unable to authorize the temporary hold.", location chip "PHOENIX, AZ 85004 · DEMO", amber warning badge "AUTHORIZATION DECLINED", decline details card (Card ending in •••• 4242, attempted hold $356.00 USD, issuer decline explanation, zero charge guarantee badge "Your card was not charged and no hold was placed on your account"), preserved booking snapshot card ($356.00 illustrative quote, pickup area, confirmed items), primary CTA "Try another payment method", secondary CTA "Retry with same card", support assistance trigger, demo disclaimer note.
- **Spanish Variant:** Node `766:1200`
  - Dimensions: 430 × 914 px
  - Frame Name: `W04-ES / C30-D · La autorización fue rechazada`
  - Title: "La autorización fue rechazada"
  - Subtitle: "El emisor de tu tarjeta no pudo autorizar la retención temporal."
  - Primary CTA: "Probar otro método de pago"
  - Secondary CTA: "Reintentar con la misma tarjeta"

### Screen 4: C30-E — Your Card Hold Expired

- **English Variant:** Node `763:883`
  - Dimensions: 430 × 899 px
  - Frame Name: `W04-EN / C30-E · Your card hold expired`
  - **CRITICAL CANONICAL IDENTITY:** C30-E is strictly "Your card hold expired", NOT Driver Assigned!
  - Visual Elements: Header with back navigation, progress indicator `03 / 04 · PAYMENT`, title "Your card hold expired", subtitle "The temporary payment hold has timed out and was automatically released.", location chip "PHOENIX, AZ 85004 · DEMO", amber badge "HOLD EXPIRED · $0.00 CHARGED", release details card (Status: Automatically released by issuer, Prior Hold Amount: $356.00 USD struck-through, Actual Charge: $0.00, banking timeout notice, zero charge verification badge), preserved booking snapshot card ($356.00 quote, pickup area, confirmed items), primary CTA "Re-authorize payment", secondary CTA "Back to scheduling", assistance notice trigger, demo disclaimer note.
- **Spanish Variant:** Node `766:1269`
  - Dimensions: 430 × 914 px
  - Frame Name: `W04-ES / C30-E · La retención de tu tarjeta venció`
  - Title: "La retención de tu tarjeta venció"
  - Subtitle: "La retención de pago temporal caducó y fue liberada automáticamente."
  - Primary CTA: "Reautorizar pago"
  - Secondary CTA: "Volver a programación"

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
| Card Provider Surface  | `#161D1A`                               | `#161D1A`                          | Identical |
| Typography             | Inter (Regular, Medium, SemiBold, Bold) | `@haulix/design-tokens` fontFamily | Identical |

---

## 3. Discrepancy & Invariant Resolutions

1. **Active Customer Scope vs Direct Demo Navigator:**
   - Active customer journey preserving verified W03 items (1 sofa, 2 queen mattresses, 1 dining table = 4 pieces across 3 categories) is safely preserved.
   - Isolated demo navigation displays preserved items cleanly via `getEffectiveConfirmedItems(draft, locale)`.
2. **Symmetrical Non-Binding Estimate:**
   - Both English and Spanish screens display strictly `$356.00 USD` (or `$356.00`).
3. **Canonical Identity Correction:**
   - C30-D is unequivocally "Authorization was declined".
   - C30-E is unequivocally "Your card hold expired".
   - No driver dispatch or assignment logic is fabricated.
4. **Zero Sensitive Financial Data Storage:**
   - No PAN, CVV, OTP, or banking credentials are collected, stored, or transmitted.
