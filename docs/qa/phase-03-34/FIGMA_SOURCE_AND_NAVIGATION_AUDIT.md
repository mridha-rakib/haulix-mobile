# HAULIX Customer App — Phase 03.34

## Figma Source and Navigation Audit

### W03 — Quote Acceptance, Unapproved Rates & Scope Confirmation Recovery

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.34  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Date:** November 19, 2026  
**Status:** Complete & Verified

---

## 1. Authoritative Figma Node Identification

| Screen Code | Screen Name               | Locale | Figma Node ID | Frame Dimensions | Baseline Route                               |
| :---------- | :------------------------ | :----- | :------------ | :--------------- | :------------------------------------------- |
| **C25-A**   | Quote Acceptance Review   | EN     | `412:1335`    | 430 × 1252 px    | `quote-acceptance-review`                    |
| **C25-A**   | Quote Acceptance Review   | ES     | `987:11278`   | 430 × 1252 px    | `quote-acceptance-review?previewLocale=es`   |
| **C25-E**   | Unapproved Rate Rules     | EN     | `412:1388`    | 430 × 799 px     | `unapproved-rate-rules`                      |
| **C25-E**   | Unapproved Rate Rules     | ES     | `987:11343`   | 430 × 799 px     | `unapproved-rate-rules?previewLocale=es`     |
| **C26-A**   | Scope Accepted            | EN     | `412:1470`    | 430 × 971 px     | `scope-accepted`                             |
| **C26-A**   | Scope Accepted            | ES     | `987:11445`   | 430 × 971 px     | `scope-accepted?previewLocale=es`            |
| **C26-R**   | Scope Acceptance Recovery | EN     | `412:1517`    | 430 × 814 px     | `scope-acceptance-recovery`                  |
| **C26-R**   | Scope Acceptance Recovery | ES     | `987:11501`   | 430 × 814 px     | `scope-acceptance-recovery?previewLocale=es` |

---

## 2. Layout, Structure & Design System Alignment

All four canonical screens consume tokens from `@haulix/design-tokens`:

- **Canvas / Background:** `#080B0B` (`colors.background`)
- **Card Surfaces:** `#151A19` (`colors.surface`)
- **Elevated / Rows:** `#222827` (`colors.elevated`)
- **Primary Text:** `#F6F8F6` (`colors.primaryText`)
- **Secondary Text:** `#ADB7B1` (`colors.secondaryText`)
- **Brand Accent:** `#BAFF42` (`colors.brand`)
- **Status Notice Accents:**
  - Info: `#38BDF8` (`rgba(56, 189, 248, 0.3)` border, `rgba(56, 189, 248, 0.08)` surface)
  - Error: `#F36D6D` (`rgba(243, 109, 109, 0.3)` border, `rgba(243, 109, 109, 0.08)` surface)
  - Success: `#00E599` / `#BAFF42` (`rgba(0, 229, 153, 0.3)` border, `rgba(0, 229, 153, 0.08)` surface)
- **Typography:**
  - Title: `fontFamily.bold`, 25 px, line height 30 px
  - Subtitle: `fontFamily.regular`, 12 px, line height 18 px
  - Big Number ($356): `fontFamily.bold`, 34 px
  - Buttons: `fontFamily.semiBold`, 14 px

---

## 3. Spanish Localization & Metadata Note

In the Spanish Figma source frames, several underlying metadata node names retain English labels (e.g. `Link / C26-A`, `Native Button / Accept scope & continue`). In accordance with Phase 03.34 requirements, Spanish visual geometry and translated copy are treated as authoritative, and natural Spanish translations were authored in `@haulix/i18n` for any unlocalized metadata strings.

---

## 4. Complete Upstream & Downstream Navigation Matrix

### Upstream Inbound

1. **From C25 (`/itemized-quote`):**
   - Primary CTA `c25-primary-cta` ("Review quote acceptance" / "Revisar aceptación de cotización") routes directly to `/quote-acceptance-review` (C25-A).
   - Tertiary CTA `c25-tertiary-cta` ("See unavailable-price state ›" / "Ver estado de precio no disponible ›") routes directly to `/unapproved-rate-rules` (C25-E).

### Phase 03.34 Transition Matrix

| Source Screen | Trigger Element                      | Destination Route                    | Description / Behavior                                                 |
| :------------ | :----------------------------------- | :----------------------------------- | :--------------------------------------------------------------------- |
| **C25-A**     | Header Back / Android Back           | `/itemized-quote` (C25)              | Returns to previous price breakdown without data loss                  |
| **C25-A**     | Primary CTA (`c25a-primary-cta`)     | `/scope-accepted` (C26-A)            | Confirms scope review; records prototype-only acknowledgement          |
| **C25-A**     | Secondary CTA (`c25a-secondary-cta`) | `/itemized-quote` (C25)              | Returns to itemized estimate breakdown                                 |
| **C25-A**     | Recovery CTA (`c25a-recovery-cta`)   | `/scope-acceptance-recovery` (C26-R) | Simulates save failure recovery without fake backend mutation          |
| **C25-E**     | Header Back / Android Back           | `/itemized-quote` (C25)              | Returns to previous itemized quote review                              |
| **C25-E**     | Primary CTA (`c25e-primary-cta`)     | `/admin-review-pending` (C24-ADM)    | Requests administrative service-rate review                            |
| **C25-E**     | Secondary CTA (`c25e-secondary-cta`) | `/itemized-quote` (C25)              | Returns to itemized quote review                                       |
| **C26-A**     | Header Back / Android Back           | `/quote-acceptance-review` (C25-A)   | Returns to acceptance review screen                                    |
| **C26-A**     | Primary CTA (`c26a-primary-cta`)     | In-Screen Notice Banner              | Displays future W04 Scheduling & Payment notice; does not fake payment |
| **C26-A**     | Secondary CTA (`c26a-secondary-cta`) | `/itemized-quote` (C25)              | Revisit itemized estimate breakdown                                    |
| **C26-R**     | Header Back / Android Back           | `/quote-acceptance-review` (C25-A)   | Returns to acceptance review                                           |
| **C26-R**     | Primary CTA (`c26r-primary-cta`)     | `/quote-acceptance-review` (C25-A)   | Retries accepting scope with preserved inventory and draft             |
| **C26-R**     | Secondary CTA (`c26r-secondary-cta`) | `/itemized-quote` (C25)              | Returns to itemized quote review                                       |

---

## 5. Invariant & Contract Protection

1. **Customer Mattress Invariant:** Total pieces remain 4 across 3 categories (1 sofa, 2 queen mattresses, 1 dining table).
2. **Pricing Integrity:** Total subtotal displayed is strictly illustrative `$356 USD` (never an approved Arizona tariff, binding quote, or collected charge).
3. **Hard Stop Boundary:** No W04 scheduling, payment collection, Stripe authorization, or booking persistence.
