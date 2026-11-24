# HAULIX Customer Mobile App — Test Coverage & Runtime Evidence Report

## Automated Test Execution, Typecheck Results, Physical Hardware Inspection & Runtime Evidence

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Hardware Target:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  
**ADB Serial:** `0B04731X200003BB`  
**Audit Phase:** Phase 03.66 Comprehensive Final Audit  
**Date:** November 24, 2026

---

## 1. Automated Test Quality & Suite Breakdown

The `@haulix/customer` test directory (`apps/customer/src/__tests__`) contains **130 test files** covering unit, integration, layout, i18n symmetry, and navigation transitions:

```text
├── W01–W04 Test Suites: 107 test files (Auth, Catalog, AI Intake, Route, Payments)
├── W05 Test Suites:       7 test files (Dispatch, Search, Crew Tracking)
├── W06 Test Suites:       5 test files (Active Service, Chat, Media, Scope Revision R2)
├── W07 Test Suites:       6 test files (My Jobs, Details, Reschedule, Cancellation, Support)
└── W08 Test Suites:       5 test files (Proof, Auto-Closure, Receipts, Star Ratings 1–5, Moderation)
```

### Direct Test Execution Evidence (W08 Test Suites)

Executed via `pnpm --filter @haulix/customer test w08-`:

```text
$ jest --passWithNoTests "w08-"
PASS src/__tests__/w08-phase-03-65.test.tsx (5.351 s)
  W08 Phase 03.65 — Review Submission, Failure Recovery & Moderation
    ✓ verifies all 3 Batch 5 screen files exist in apps/customer/app/(app) (3 ms)
    ✓ verifies ratingDraftStore exists and manages rating, comments, and statuses in-memory (2 ms)
    ✓ verifies RatingBoundaryModal and showModal were removed from W08RatingLayout and star rating screens (2 ms)
    ✓ verifies completion-rating-[1-5].tsx route to /completion-rating-sent or /completion-rating-failed (1 ms)
    ✓ verifies completion-rating-locked.tsx navigates to /completion-receipt on back and check completion (6 ms)
    ✓ verifies hardware BackHandler is properly wired in all Batch 5 screens
    ✓ verifies unrestricted frontend accessibility with zero route guards
    ✓ verifies exact i18n namespace parity between en.ts and es.ts for all 3 Batch 5 namespaces (2 ms)
    ✓ verifies 6 bilingual entries registered in DemoScreenNavigator with exact Figma nodes (1 ms)
    ✓ authoritative reconciliation: DemoScreenNavigator contains exactly 56 W08 bilingual entries (28 canonical states)
    ✓ authoritative reconciliation: W08 delivery completes 28 canonical states and 56 bilingual variants (2 ms)

PASS src/__tests__/w08-phase-03-64.test.tsx (5.736 s)
  W08 Phase 03.64 — Service Rating Eligibility & Review Composition (10/10 passed)

PASS src/__tests__/w08-phase-03-63.test.tsx (6.497 s)
  W08 Phase 03.63 — Authorization Expiration & Itemized Receipts (9/9 passed)

PASS src/__tests__/w08-phase-03-62.test.tsx (6.337 s)
  W08 Phase 03.62 — Auto-Closure Policy & Payment Capture (9/9 passed)

PASS src/__tests__/w08-phase-03-61.test.tsx (6.471 s)
  W08 Phase 03.61 — Completion Proof & Issue Reporting (8/8 passed)

Test Suites: 5 passed, 5 total
Tests:       47 passed, 47 total
Snapshots:   0 total
Time:        6.556 s
```

---

## 2. Monorepo Quality Gates Evidence

### TypeScript Strict Typecheck (`pnpm typecheck`)

Executed via `turbo run typecheck`:

```text
   • turbo 2.11.10
   • Packages in scope: @haulix/customer, @haulix/design-tokens, @haulix/driver, @haulix/i18n, @haulix/logger, @haulix/ui, @haulix/utils
   • Running typecheck in 7 packages

@haulix/logger:typecheck: $ tsc --noEmit (Passed)
@haulix/design-tokens:typecheck: $ tsc --noEmit (Passed)
@haulix/utils:typecheck: $ tsc --noEmit (Passed)
@haulix/i18n:typecheck: $ tsc --noEmit (Passed)
@haulix/ui:typecheck: $ tsc --noEmit (Passed)
@haulix/driver:typecheck: $ tsc --noEmit (Passed)
@haulix/customer:typecheck: $ tsc --noEmit (Passed)

Tasks:    7 successful, 7 total
Time:     8.996s
```

### Biome Code Health & Formatting

Executed via `npx @biomejs/biome check`:

```text
Checked 13 files in 17ms. No fixes applied.
0 errors, 0 warnings.
```

---

## 3. Physical Hardware & Runtime Inspection (Realme Note 60)

### Hardware Profile & ADB Verification

- **Device Model:** Realme Note 60 (RMX3933)
- **Android Version:** Android 15 (API level 35 / 36)
- **Display Resolution:** 720 × 1600 px (360dp logical width @ 2.0x density)
- **ADB Connection:** Direct USB Debugging verified:
  ```text
  $ adb devices
  List of devices attached
  0B04731X200003BB	device
  ```

### Package & Installation Timestamp Inspection

Executed via `adb -s 0B04731X200003BB shell dumpsys package com.haulix.customer`:

```text
package:com.haulix.customer
versionCode=1 minSdk=24 targetSdk=36
versionName=1.0.0
lastUpdateTime=2026-11-22 13:40:25
firstInstallTime=2026-11-13 10:50:02
```

### Critical Hardware Audit Finding:

> [!WARNING]
> **APK Staleness on Physical Hardware:**  
> The physical Realme Note 60 device currently holds an installed build from **November 22, 2026 (13:40:25)**.  
> This installed build reflects Phase 03.54 (W06 completion) and **does not contain Workflow 07 (Phases 03.55–03.60) or Workflow 08 (Phases 03.61–03.65)**.  
> Physical on-device visual testing for W07/W08 is therefore pending a new APK build (`eas build -p android --profile preview` or local `gradle assembleRelease`).
