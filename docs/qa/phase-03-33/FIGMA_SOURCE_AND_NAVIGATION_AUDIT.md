# HAULIX Customer App — Phase 03.33

## Figma Source and Navigation Audit

### W03 — Quote Error Recovery, Revision, Itemized Terms & Expiry

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.33  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Date:** November 19, 2026  
**Status:** Complete & Verified

---

## 1. Authoritative Figma Node Identification

| Screen Code | Screen Name              | Locale | Figma Node ID | Canvas Dimensions | Baseline URL                            |
| :---------- | :----------------------- | :----- | :------------ | :---------------- | :-------------------------------------- |
| **C24-F**   | Quote Error Recovery     | EN     | `412:965`     | 430 × 757 px      | `quote-error-recovery`                  |
| **C24-F**   | Quote Error Recovery     | ES     | `987:10837`   | 430 × 757 px      | `quote-error-recovery?previewLocale=es` |
| **C24-REV** | Quote Revision Requested | EN     | `412:1214`    | 430 × 952 px      | `quote-revision`                        |
| **C24-REV** | Quote Revision Requested | ES     | `987:11137`   | 430 × 952 px      | `quote-revision?previewLocale=es`       |
| **C25**     | Itemized Quote & Terms   | EN     | `412:1260`    | 430 × 1690 px     | `itemized-quote`                        |
| **C25**     | Itemized Quote & Terms   | ES     | `987:11193`   | 430 × 1690 px     | `itemized-quote?previewLocale=es`       |
| **C25-X**   | Quote Expired Refresh    | EN     | `412:1429`    | 430 × 799 px      | `quote-expired`                         |
| **C25-X**   | Quote Expired Refresh    | ES     | `987:11394`   | 430 × 799 px      | `quote-expired?previewLocale=es`        |

---

## 2. Layout & Typography Token Alignment

All screens strictly consume `@haulix/design-tokens` styling tokens:

- **Background:** `colors.background` (`#111615` / `bg-background`)
- **Card Surfaces:** `colors.surface` (`#171F1D` / `bg-surface`) with border `colors.border` (`#24302C` / `border-elevated`)
- **Interactive Primary Button:** `colors.brand` (`#00E599` / `bg-brand`), label `colors.background` (`#111615` / `text-background font-bold text-base`)
- **Secondary Ghost / Border Button:** `colors.surfaceElevated` (`#1E2926`) or transparent with border `colors.border` (`#24302C`), label `colors.brand` / `colors.text`
- **Badges:**
  - C24-F Error: `colors.error` (`#FF5C5C` / `bg-error/15 border-error/30 text-error`)
  - C24-REV Revision: `colors.warning` (`#FFB800` / `bg-warning/15 border-warning/30 text-warning`)
  - C25 Guaranteed Total: `colors.brand` (`#00E599` / `bg-brand/15 border-brand/30 text-brand`)
  - C25-X Expired: `colors.neutral[500]` / `colors.error` (`#9BA3AF` / `bg-white/10 border-white/20 text-neutral-300`)
- **Typography Tokens:**
  - Title: `text-2xl font-bold tracking-tight text-white`
  - Subtitle / Body: `text-sm text-neutral-400 leading-relaxed`
  - Financial Subtotal Display: `text-3xl font-extrabold text-brand` / `text-white`
  - Demo Footnotes: `text-xs text-neutral-500 uppercase tracking-wider`

---

## 3. Comprehensive Navigation Matrix

### Upstream Triggers

1. **From C24-P (`quote-processing.tsx`):**
   - Secondary CTA (`c24p-secondary-cta` "Pricing engine error example"): routes to `/quote-error-recovery`.
2. **From C24-Q (`illustrative-quote.tsx`):**
   - Primary CTA (`c24q-primary-cta` "Review full price breakdown"): routes to `/itemized-quote` (C25).
   - Secondary CTA (`c24q-secondary-cta` "Edit details & recalculate ›"): routes to `/quote-revision` (C24-REV).
   - Tertiary CTA (`c24q-tertiary-cta` "Expired quote example ›"): routes to `/quote-expired` (C25-X).

### Phase 03.33 Interactive Transitions

| Source Route                   | Trigger / Control                      | Target / Result Route     | Expected Behavior                                          |
| :----------------------------- | :------------------------------------- | :------------------------ | :--------------------------------------------------------- |
| `quote-error-recovery` (C24-F) | Back button (`c24f-back-button`)       | Upstream route            | Navigates back (`router.back()`)                           |
| `quote-error-recovery` (C24-F) | Primary CTA (`c24f-primary-cta`)       | `/quote-processing`       | Retries calculation cycle without data loss                |
| `quote-error-recovery` (C24-F) | Secondary CTA (`c24f-secondary-cta`)   | `/admin-review-pending`   | Escalate issue to human operator review                    |
| `quote-revision` (C24-REV)     | Back button (`c24rev-back-button`)     | Upstream route            | Navigates back (`router.back()`)                           |
| `quote-revision` (C24-REV)     | Primary CTA (`c24rev-primary-cta`)     | `/quote-processing`       | Triggers price re-calculation with updated confirmed items |
| `quote-revision` (C24-REV)     | Secondary CTA (`c24rev-secondary-cta`) | `/correct-ai-items`       | Returns customer to item measurement correction screen     |
| `itemized-quote` (C25)         | Back button (`c25-back-button`)        | `/illustrative-quote`     | Returns to quote overview                                  |
| `itemized-quote` (C25)         | Primary CTA (`c25-primary-cta`)        | Scheduled Notice Banner   | Shows acceptance scheduled notice without faking payment   |
| `itemized-quote` (C25)         | Secondary CTA (`c25-secondary-cta`)    | `/quote-revision`         | Allows recalculation/revision of inventory                 |
| `itemized-quote` (C25)         | Tertiary CTA (`c25-tertiary-cta`)      | Unavailable Notice Banner | Informs customer unavailable quote preview is scheduled    |
| `quote-expired` (C25-X)        | Back button (`c25x-back-button`)       | Upstream route            | Navigates back (`router.back()`)                           |
| `quote-expired` (C25-X)        | Primary CTA (`c25x-primary-cta`)       | `/quote-processing`       | Revalidates rates and generates refreshed quote cycle      |
| `quote-expired` (C25-X)        | Secondary CTA (`c25x-secondary-cta`)   | `/itemized-quote`         | Opens previous illustrative quote breakdown                |

---

## 4. Invariant Protection & Scope Control

- **Mattress Invariant:** 2 queen mattresses strictly preserved across all inventory contexts (total 4 pieces: 1 sofa, 2 queen mattresses, 1 dining table across 3 categories).
- **Exact Pricing Arithmetic:** 6 rows summing exactly to $356 USD ($160 + $75 + $36 + $60 + $25 + $0).
- **Hard Stop Boundary:** No implementation of C25-A (Acceptance), C25-E (Payment Escalation), C26-A (Payment Method), C26-R (Booking Receipt), or W04 (Dispatch/Driver Tracking).
