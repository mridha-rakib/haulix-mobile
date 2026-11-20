# HAULIX Customer Mobile App — Phase 03.37

## W04 Scheduling Recovery & Terms Acceptance — Final Implementation Report

### Accelerated 4-Screen Bilingual Batch With Strict Figma Prototype Routing

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.37  
**Work Type:** Frontend Implementation & Verification (React Native / Expo Router)  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Baseline Git Commit:** `2677b3c313e0f15060cf61222ad95b128cceb489`  
**Target Hardware Device:** Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB` / Android 15)  
**Verification Date:** 2026-11-20  
**Overall Status:** 100% COMPLETE · ALL CHECKS PASS · PHYSICAL ANDROID QA VERIFIED

---

## 1. Executive Summary

Phase 03.37 successfully implements the four canonical recovery and terms acceptance screens for Workflow W04 (Scheduling & Payment) in the HAULIX Customer Mobile App:

1. **C27-V:** Invalid Same-Day Service Time (`apps/customer/app/(app)/invalid-service-time.tsx`)
2. **C27-R:** Unavailable / Stale Service Window (`apps/customer/app/(app)/service-window-unavailable.tsx`)
3. **C27-N:** No Eligible Driver Found (`apps/customer/app/(app)/no-eligible-driver.tsx`)
4. **C28-C:** Terms Accepted for This Quote (`apps/customer/app/(app)/booking-terms-accepted.tsx`)

Each canonical screen is delivered in symmetrical English and Spanish variants (8 total screens), registered in the in-app `DemoScreenNavigator`, backed by typed frontend state (`c36Scheduling.ts`), and verified with full automated unit tests and genuine physical Android hardware captures on a connected Realme Note 60 smartphone running Android 15.

---

## 2. Canonical Screens & Implementation Architecture

### 2.1 C27-V: Invalid Same-Day Service Time

- **Figma Reference:**
  - English: Node `763:202` (430 × 1044 px) — `W04-EN / C27-V · Invalid same-day service time`
  - Spanish: Node `766:588` (430 × 1044 px) — `W04-ES / C27-V · Hora no válida para hoy`
- **Route Path:** `apps/customer/app/(app)/invalid-service-time.tsx`
- **Key Visuals:** Progress label `01 / 04 · SCHEDULE`, amber warning badge `NOT AVAILABLE`, example slot "Today · under 60 minutes", availability check policy card detailing the 60-minute minimum advance notice rule.
- **Interactive Routing:**
  - Primary CTA: "Select another time" (`c27v-primary-cta`) -> `/select-available-window`
  - Secondary CTA: "Back to timing" (`c27v-secondary-cta`) -> `/choose-service-time`
  - Header Back: -> `/select-available-window`

### 2.2 C27-R: Unavailable / Stale Service Window

- **Figma Reference:**
  - English: Node `763:269` (430 × 1044 px) — `W04-EN / C27-R · That slot is no longer available`
  - Spanish: Node `766:655` (430 × 1079 px) — `W04-ES / C27-R · Franja de servicio no disponible`
- **Route Path:** `apps/customer/app/(app)/service-window-unavailable.tsx`
- **Key Visuals:** Amber badge `No longer available · DEMO`, stale slot callout "Tue, Nov 3 · 10 AM–12 PM MST", availability check card advising that driver availability changes dynamically before booking.
- **Interactive Routing:**
  - Primary CTA: "Refresh available times" (`c27r-primary-cta`) -> `/select-available-window`
  - Secondary CTA: "Check ASAP option" (`c27r-secondary-cta`) -> `/request-service-asap`
  - Header Back: -> `/select-available-window`

### 2.3 C27-N: No Eligible Driver Found

- **Figma Reference:**
  - English: Node `763:336` (430 × 805 px) — `W04-EN / C27-N · No eligible driver found`
  - Spanish: Node `766:722` (430 × 805 px) — `W04-ES / C27-N · No hay conductor disponible`
- **Route Path:** `apps/customer/app/(app)/no-eligible-driver.tsx`
- **Key Visuals:** Warning panel indicating immediate ASAP capacity is currently unavailable, status capsule `ASAP · verified driver, location, capacity and schedule required`, transparent disclaimer explaining no cancellation fees apply.
- **Interactive Routing:**
  - Primary CTA: "Schedule for later" (`c27n-primary-cta`) -> `/select-available-window`
  - Secondary CTA: "Change request" (`c27n-secondary-cta`) -> `/choose-service-time`
  - Tertiary CTA: "Cancel without fee" (`c27n-cancel-cta`) -> Displays honest C27-X fee-free exit confirmation banner
  - Header Back: -> `/request-service-asap`

### 2.4 C28-C: Terms Accepted for This Quote

- **Figma Reference:**
  - English: Node `763:467` (430 × 1128 px) — `W04-EN / C28-C · Terms accepted for this quote`
  - Spanish: Node `766:853` (430 × 1178 px) — `W04-ES / C28-C · Términos aceptados para esta cotización`
- **Route Path:** `apps/customer/app/(app)/booking-terms-accepted.tsx`
- **Key Visuals:** Green status badge `PENDING`, booking glance table with non-binding estimate `$356.00`, checked consent checkbox with neon lime checkmark icon (`#BAFF42`), amber caution panel `REVIEW BEFORE ACCEPTING` highlighting policy version binding.
- **Interactive Routing:**
  - Primary CTA: "Continue to secure payment" (`c28c-primary-cta`) -> Displays honest C29 payment handoff notice
  - Secondary CTA: "Review terms again" (`c28c-secondary-cta`) -> `/review-booking`
  - Checkbox Toggle: Tapping checked box returns to `/review-booking`
  - Header Back: -> `/review-booking`

---

## 3. Upstream Route Integrations

All temporary notice banners originally introduced in Phase 03.36 have been replaced with authentic Expo Router transitions:

- **`choose-service-time.tsx` (C27):** "Preview unavailable slot" now routes directly to `/service-window-unavailable` (C27-R).
- **`request-service-asap.tsx` (C27-A):** "No driver available" now routes directly to `/no-eligible-driver` (C27-N).
- **`select-available-window.tsx` (C27-S):**
  - "Try invalid same-day time" routes to `/invalid-service-time` (C27-V).
  - "Preview stale slot" routes to `/service-window-unavailable` (C27-R).
- **`review-booking.tsx` (C28):** Tapping the terms checkbox records explicit acknowledgment and navigates to `/booking-terms-accepted` (C28-C). Attempting to continue unconsented displays inline validation.
- **`scope-accepted.tsx` (C26-A):** Sets `inventorySource: "active_w03_journey"` before routing to `/choose-service-time`.

---

## 4. Verification & Automated Quality Pipeline

All quality gates have been executed and passed cleanly:

```bash
pnpm check           # Biome format & linting: 524 files checked, 0 errors, 3 warnings (pre-existing)
pnpm typecheck       # TypeScript typecheck across 7 packages: 0 errors
pnpm test            # Turbo test pipeline across 7 packages: 90/90 suites, 582/582 customer tests pass
pnpm doctor          # System dependencies, node/pnpm versions, network connectivity: All pass
```

### Automated Unit Test Suites for Phase 03.37:

- `apps/customer/src/__tests__/invalid-service-time.test.tsx` (PASS · 4 tests)
- `apps/customer/src/__tests__/service-window-unavailable.test.tsx` (PASS · 4 tests)
- `apps/customer/src/__tests__/no-eligible-driver.test.tsx` (PASS · 4 tests)
- `apps/customer/src/__tests__/booking-terms-accepted.test.tsx` (PASS · 4 tests)
- Upstream test suites updated and passing: `choose-service-time.test.tsx`, `request-service-asap.test.tsx`, `select-available-window.test.tsx`, `review-booking.test.tsx`, `scope-accepted.test.tsx`.

---

## 5. Physical Android Hardware QA Evidence

Verification was conducted directly on physical hardware (Realme Note 60, Android 15, Serial: `0B04731X200003BB`):

### 5.1 Screen Variants Visual QA Matrix (8 Variants × Initial & Scrolled)

- **C27-V English:** [Initial View](docs/qa/phase-03-37/android/c27v-en-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c27v-en-scrolled.png)
- **C27-V Spanish:** [Initial View](docs/qa/phase-03-37/android/c27v-es-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c27v-es-scrolled.png)
- **C27-R English:** [Initial View](docs/qa/phase-03-37/android/c27r-en-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c27r-en-scrolled.png)
- **C27-R Spanish:** [Initial View](docs/qa/phase-03-37/android/c27r-es-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c27r-es-scrolled.png)
- **C27-N English:** [Initial View](docs/qa/phase-03-37/android/c27n-en-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c27n-en-scrolled.png)
- **C27-N Spanish:** [Initial View](docs/qa/phase-03-37/android/c27n-es-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c27n-es-scrolled.png)
- **C28-C English:** [Initial View](docs/qa/phase-03-37/android/c28c-en-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c28c-en-scrolled.png)
- **C28-C Spanish:** [Initial View](docs/qa/phase-03-37/android/c28c-es-initial.png) · [Scrolled View](docs/qa/phase-03-37/android/c28c-es-scrolled.png)

### 5.2 Mandatory Interaction Journeys

- **Journey A (Invalid Time Flow):**
  - [C27-S Entry](docs/qa/phase-03-37/android/journey-a-1-c27s.png) -> [C27-V Notice](docs/qa/phase-03-37/android/journey-a-2-c27v.png) -> [C27-S Returned](docs/qa/phase-03-37/android/journey-a-3-c27s-returned.png)
- **Journey B (Unavailable / Stale Slot Flow):**
  - [C27-R Alert](docs/qa/phase-03-37/android/journey-b-1-c27r.png) -> [C27-S Refreshed](docs/qa/phase-03-37/android/journey-b-2-c27s-refreshed.png)
- **Journey C (No Driver Flow):**
  - [C27-A ASAP Request](docs/qa/phase-03-37/android/journey-c-1-c27a.png) -> [C27-N Alert](docs/qa/phase-03-37/android/journey-c-2-c27n.png) -> [C27-S Scheduled Option](docs/qa/phase-03-37/android/journey-c-3-c27s-later.png)
- **Journey D (Terms Consent Flow):**
  - [C28 Unconsented](docs/qa/phase-03-37/android/journey-d-1-c28-unconsented.png) -> [C28-C Accepted](docs/qa/phase-03-37/android/journey-d-2-c28c-accepted.png)
- **Journey E (Review Again Flow):**
  - [C28 Re-review](docs/qa/phase-03-37/android/journey-e-1-c28-reviewed.png)
- **Journey F (Payment Boundary Notice):**
  - [C29 Future Notice](docs/qa/phase-03-37/android/journey-f-1-c29-notice.png)
- **Journey G (Fee-Free Exit Boundary Notice):**
  - [C27-X Future Notice](docs/qa/phase-03-37/android/journey-g-1-c27x-notice.png)

---

## 6. Strict Hard Stop & Boundary Adherence

In strict adherence to the project instructions:

- **No C27-X Implementation:** No separate full cancellation confirmation screen was created. The user is provided with an honest notice banner confirming zero fees and no active booking.
- **No C28-U Implementation:** No updated policy re-consent screen was created.
- **No C29 Payment Implementation:** No payment method selection, Stripe Elements, or card authorization was implemented.
- **No Fake Backend Dispatch:** Driver availability rules remain honest and transparent. No fabricated drivers, live GPS tracking, or real backend reservations were generated.

---

## 7. Deliverables & Documentation Index

- `docs/qa/phase-03-37/FIGMA_PROTOTYPE_TO_EXPO_ROUTER_AUDIT.md`
- `docs/qa/phase-03-37/FIGMA_SOURCE_AUDIT.md`
- `docs/qa/phase-03-37/ORIGINAL_ICON_AND_IMAGE_AUDIT.md`
- `docs/qa/phase-03-37/ANDROID_VISUAL_QA_MATRIX.md`
- `docs/qa/phase-03-37/PHASE_03_36_INVENTORY_AND_CONSENT_REGRESSION.md`
- `PHASE_03_37_FOUR_SCREEN_BATCH_REPORT.md` (this report)
