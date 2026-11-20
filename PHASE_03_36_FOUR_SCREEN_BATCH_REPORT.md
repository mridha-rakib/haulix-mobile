# HAULIX Customer Mobile App — Phase 03.36

## Accelerated 4-Screen Bilingual Batch Implementation Report

### W04 — Scheduling & Payment Foundation With Strict Figma Prototype Routing

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.36  
**Type:** React Native Frontend Implementation — NOT Figma Design Creation  
**Scope:** Exactly 4 canonical screens × English & Spanish = 8 localized variants  
**Repository:** `git@github.com:mridha-rakib/haulix-mobile.git`  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Execution Date:** November 20, 2026  
**Baseline Commit:** `f21f39889617b5de8784f0c8cbefa02934838955`  
**Hardware QA Device:** Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB` / Android 15)

---

## 1. Executive Summary

Phase 03.36 delivers the first 4 canonical bilingual screens of **W04 Scheduling & Payment** for the HAULIX Customer Mobile App. The implementation builds directly on the authoritative Figma frames in section `758:2` (EN) and `758:3` (ES), establishing authentic Expo Router navigation, reactive typed frontend state, symmetrical English and Spanish localization, and verified physical Android QA on real hardware.

Crucially:

- The transition from **W03 Scope Accepted (`C26-A`)** into **W04 Choose Service Time (`C27`)** was converted from a placeholder alert into an active, functional navigation handoff.
- The 4-piece customer inventory invariant (including 2 queen mattresses, 1 sofa, 2 chairs) and the illustrative $356.00 quote are strictly preserved across all states.
- Out-of-batch prototype triggers (`C27-R`, `C27-N`, `C27-V`, `C28-C`/`C29`, `C28-U`) are protected with truthful localized notice banners.
- All 8 canonical variants and 5 interaction journeys have been physically verified on the Realme Note 60 hardware.

---

## 2. Implemented Canonical Screens & Localized Variants

| Screen Code | Screen Name (EN / ES)                                         | Figma Node ID                    | Route Path                 | Component File                                        | Android QA                                                                                                           |
| :---------- | :------------------------------------------------------------ | :------------------------------- | :------------------------- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| **C27**     | Choose Your Service Time / Elige cuándo necesitas el servicio | `763:2` (EN)<br>`766:388` (ES)   | `/choose-service-time`     | `apps/customer/app/(app)/choose-service-time.tsx`     | [`c27-en.png`](docs/qa/phase-03-36/android/c27-en.png)<br>[`c27-es.png`](docs/qa/phase-03-36/android/c27-es.png)     |
| **C27-A**   | Request Service ASAP / Solicitar servicio cuanto antes        | `763:71` (EN)<br>`766:457` (ES)  | `/request-service-asap`    | `apps/customer/app/(app)/request-service-asap.tsx`    | [`c27a-en.png`](docs/qa/phase-03-36/android/c27a-en.png)<br>[`c27a-es.png`](docs/qa/phase-03-36/android/c27a-es.png) |
| **C27-S**   | Select Available Window / Elige un horario disponible         | `763:133` (EN)<br>`766:519` (ES) | `/select-available-window` | `apps/customer/app/(app)/select-available-window.tsx` | [`c27s-en.png`](docs/qa/phase-03-36/android/c27s-en.png)<br>[`c27s-es.png`](docs/qa/phase-03-36/android/c27s-es.png) |
| **C28**     | Review Your Booking / Revisa tu reserva                       | `763:396` (EN)<br>`766:782` (ES) | `/review-booking`          | `apps/customer/app/(app)/review-booking.tsx`          | [`c28-en.png`](docs/qa/phase-03-36/android/c28-en.png)<br>[`c28-es.png`](docs/qa/phase-03-36/android/c28-es.png)     |

---

## 3. End-to-End Workflow & Prototype Routing

### 3.1 Upstream Transition: W03 (`C26-A`) → W04 (`C27`)

- Screen `C26-A` (`/scope-accepted`) primary button "Continue to Schedule & Payment" now invokes `router.push("/choose-service-time")`.
- Verified on device: [`docs/qa/phase-03-36/android/c26a-to-c27-transition.png`](docs/qa/phase-03-36/android/c26a-to-c27-transition.png).

### 3.2 In-Batch Primary Journeys

- **Journey 1 (ASAP Flow):** `C26-A` → `C27` → `C27-A` → `C28`
  - Customer selects "As soon as possible" on C27.
  - C27-A presents verified driver availability criteria and location verification.
  - Tapping "Continue if available" proceeds to C28 with timing summary: _"Demo · ASAP · Subject to driver"_.
- **Journey 2 (Scheduled Window Flow):** `C26-A` → `C27` → `C27-S` → `C28`
  - Customer selects "Schedule for later" on C27.
  - C27-S displays 4 selectable date chips and 4 2-hour window cards.
  - Customer selects `Tue, Nov 3 · 10:00 AM – 12:00 PM` and taps "Continue to review".
  - C28 reflects the chosen window in the header pill and summary section.
- **Journey 3 (Edit Service Time):** On C28, clicking "Edit service time" navigates back to `/select-available-window` or `/request-service-asap` based on active mode.
- **Journey 4 (Terms & Consent Enforcement):** On C28, primary CTA "Continue to payment" is disabled until explicit acknowledgment checkbox is ticked. Attempting to continue un-checked triggers a prominent validation banner. Checking the box enables the CTA.
- **Journey 5 (Back Navigation):** All header back buttons cleanly navigate to upstream screens via `router.back()`.

---

## 4. Strict Prototype Boundaries (Out-of-Batch Guardrails)

No mock backends, fake Stripe checkouts, or unapproved dispatch flows were created. All out-of-batch prototype triggers display truthful, localized notice banners:

1. **C27-R (Same-day notice):** Notice explaining 60-minute minimum advance notice rule.
2. **C27-N / C27-V (No driver / no slots):** Notice explaining driver capacity criteria.
3. **C28-C / C29 (Payment handoff):** Notice explaining payment method selection is reserved for subsequent phases.
4. **C28-U (Policy update):** Notice detailing $100 cancellation fee exceptions.

---

## 5. Automated Testing & Code Verification

| Command                               | Target / Scope                 | Result   | Details                                   |
| :------------------------------------ | :----------------------------- | :------- | :---------------------------------------- |
| `pnpm --filter @haulix/customer test` | Customer App Test Suites       | **PASS** | 86 suites, 566 tests passed (0 failures)  |
| `pnpm test`                           | Entire Monorepo Test Suites    | **PASS** | 7 packages, 620 tests passed (0 failures) |
| `pnpm typecheck`                      | TypeScript Type Checking       | **PASS** | 7 packages checked, 0 errors              |
| `pnpm check`                          | Biome Linting & Formatting     | **PASS** | 0 errors, Biome rules strictly satisfied  |
| `pnpm doctor`                         | Monorepo Health & Dependencies | **PASS** | Monorepo clean and healthy                |

---

## 6. Physical Android Hardware QA Summary

- **Device:** Realme Note 60 (`RMX3930`) running Android 15.
- **Total Physical Captures:** 28 high-resolution screenshots covering:
  - 8 canonical screen states (EN + ES)
  - 8 scrolled viewport states verifying below-the-fold content
  - 5 interactive journeys (W03→W04 transition, ASAP path, Scheduled path, Edit time, Terms consent gate)
  - 4 out-of-batch notice triggers
- **Artifacts Location:** `docs/qa/phase-03-36/android/`
- **Audit Reports Generated:**
  - `docs/qa/phase-03-36/FIGMA_PROTOTYPE_TO_EXPO_ROUTER_AUDIT.md`
  - `docs/qa/phase-03-36/FIGMA_SOURCE_AUDIT.md`
  - `docs/qa/phase-03-36/ORIGINAL_ICON_AND_IMAGE_AUDIT.md`
  - `docs/qa/phase-03-36/ANDROID_VISUAL_QA_MATRIX.md`
  - `docs/qa/phase-03-36/W03_TO_W04_STATE_INTEGRITY_REPORT.md`

---

## 7. Strict Hard Stop

As required by phase specifications:

- **NO** implementation of C27-R, C27-N, C27-V as separate screens.
- **NO** implementation of C28-C, C28-U, or C29 Payment Method Selection.
- **NO** backend payment processing, Stripe integrations, or dispatch logic.
- Development halts completely at the delivery of this 4-screen batch.
