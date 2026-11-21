# HAULIX Phase 03.40 — Figma Source Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.40  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Audit Date:** 2026-11-21

---

## 1. Canonical Figma Node Identification

| Screen ID  | Node ID (EN) | Node ID (ES) | Screen Title (EN / ES)                                                               | Canonical Dimensions | Aspect Ratio | Background Color    |
| :--------- | :----------- | :----------- | :----------------------------------------------------------------------------------- | :------------------- | :----------- | :------------------ |
| **C30-R**  | `763:952`    | `766:1338`   | Restore Secure Authorization / Restablecer autorización segura                       | 430 × 1041 px        | ~0.413       | `#0D1110` (Surface) |
| **C30-C**  | `773:836`    | `773:1053`   | Review a Fresh Card Hold / Revisar una nueva retención de tarjeta                    | 430 × 1109 / 1124 px | ~0.388       | `#0D1110` (Surface) |
| **C30-CA** | `773:905`    | `773:1122`   | New Authorization Consent Recorded / Nuevo consentimiento de autorización registrado | 430 × 1142 / 1157 px | ~0.377       | `#0D1110` (Surface) |
| **C31-P**  | `763:1021`   | `766:1407`   | Checking Booking Status / Verificando estado de reserva                              | 430 × 1027 / 1060 px | ~0.419       | `#0D1110` (Surface) |

---

## 2. Geometry & Spacing Verification

- **Frame Width:** Exactly `430 px` (iPhone 14/15 Pro canonical frame standard).
- **Horizontal Margins:** `24 px` left and right container padding (`px-6`).
- **Vertical Rhythm:**
  - Progress tracker capsule at `top: 16 px`.
  - Header title & subtitle gap: `8 px`.
  - Content card gap: `16 px` (`gap-4`).
  - Card internal padding: `20 px` (`p-5`).
  - Primary / Secondary button height: `56 px` with `12 px` corner radius (`rounded-xl`).
- **Typography Scale:**
  - Header title: `24 px` bold Inter / HAULIX display typography.
  - Subtitle: `14 px` regular text in `text-secondaryText` (`#8E9996`).
  - Card titles: `12 px` uppercase bold (`font-bold tracking-wider`).
  - Hold amount: `28 px` bold Inter (`#BAFF42` brand accent).
  - Status badges: `11 px` bold uppercase with pill container padding `px-3 py-1.5`.

---

## 3. Bilingual Copy Parity Audit

| Screen     | Key                   | English Source (`763:*`, `773:*`)                           | Spanish Source (`766:*`, `773:*`)                                 | Status                     |
| :--------- | :-------------------- | :---------------------------------------------------------- | :---------------------------------------------------------------- | :------------------------- |
| **C30-R**  | `screenTitle`         | Restore Secure Authorization                                | Restablecer autorización segura                                   | Verified (100% Match)      |
| **C30-R**  | `statusBadge`         | RECOVERY READY                                              | LISTO PARA RECUPERACIÓN                                           | Verified (100% Match)      |
| **C30-R**  | `primaryCta`          | Continue to Hold Review                                     | Continuar a revisión de retención                                 | Verified (100% Match)      |
| **C30-R**  | `secondaryCta`        | Choose Another Payment Method                               | Elegir otro método de pago                                        | Verified (100% Match)      |
| **C30-C**  | `screenTitle`         | Review a Fresh Card Hold                                    | Revisar una nueva retención de tarjeta                            | Verified (100% Match)      |
| **C30-C**  | `statusBadge`         | NEW HOLD TERMS                                              | NUEVAS CONDICIONES DE RETENCIÓN                                   | Verified (100% Match)      |
| **C30-C**  | `holdAmountValue`     | $356.00 USD                                                 | $356.00 USD                                                       | Verified (Strict Symmetry) |
| **C30-C**  | `consentCheckboxText` | I agree to a new temporary authorization hold of $356.00... | Acepto una nueva retención de autorización temporal de $356.00... | Verified (100% Match)      |
| **C30-C**  | `primaryCta`          | Agree & Continue                                            | Aceptar y continuar                                               | Verified (100% Match)      |
| **C30-CA** | `screenTitle`         | New Authorization Consent Recorded                          | Nuevo consentimiento de autorización registrado                   | Verified (100% Match)      |
| **C30-CA** | `statusBadge`         | CONSENT RECORDED (v2)                                       | CONSENTIMIENTO REGISTRADO (v2)                                    | Verified (100% Match)      |
| **C30-CA** | `primaryCta`          | Check Booking Status                                        | Verificar estado de reserva                                       | Verified (100% Match)      |
| **C30-CA** | `secondaryCta`        | Review Hold Details                                         | Revisar detalles de retención                                     | Verified (100% Match)      |
| **C31-P**  | `screenTitle`         | Checking Booking Status                                     | Verificando estado de reserva                                     | Verified (100% Match)      |
| **C31-P**  | `statusBadge`         | SEARCHING DISPATCH QUEUE                                    | BUSCANDO EN COLA DE DESPACHO                                      | Verified (100% Match)      |
| **C31-P**  | `primaryCta`          | Return to Home                                              | Volver al inicio                                                  | Verified (100% Match)      |

---

## 4. Visual Assets & Color Palette Audit

- **Background:** `#0D1110` (dark surface canvas).
- **Cards / Containers:** `#151A19` (elevated surface container).
- **Border / Outlines:** `#222A28` (elevated border divider).
- **Accent Brand Color:** `#BAFF42` (lime green brand accent, `colors.brand`).
- **Amber / Recovery Colors:** `#F59E0B` (amber-500) and `rgba(245, 158, 11, 0.12)` (amber-500/10 background).
- **Secondary Text:** `#8E9996` (muted secondary typography).
