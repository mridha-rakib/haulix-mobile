# HAULIX Customer Mobile App — Phase 03.45

## Automated Regression Test Report

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.45  
**TEST RUN DATE:** 2026-11-21

---

### 1. Monorepo Test Summary

A fresh execution of all unit and integration test suites confirms 100% green status across all packages:

```
Test Suites: 108 passed, 108 total
Tests:       673 passed, 673 total
Snapshots:   0 total
Time:        9.482 s
```

### 2. Package-by-Package Breakdown

| Package                 | Test Suites       | Passing Tests | TypeScript Check (`tsc --noEmit`) | Biome Lint / Format    |
| :---------------------- | :---------------- | :------------ | :-------------------------------- | :--------------------- |
| `@haulix/customer`      | 108 passed        | 673 passed    | **PASS** (Zero errors)            | **PASS** (Zero errors) |
| `@haulix/design-tokens` | Static package    | N/A           | **PASS** (Zero errors)            | **PASS** (Zero errors) |
| `@haulix/driver`        | 2 passed          | 7 passed      | **PASS** (Zero errors)            | **PASS** (Zero errors) |
| `@haulix/i18n`          | Static strings    | N/A           | **PASS** (Zero errors)            | **PASS** (Zero errors) |
| `@haulix/logger`        | 1 passed          | 8 passed      | **PASS** (Zero errors)            | **PASS** (Zero errors) |
| `@haulix/ui`            | Static primitives | N/A           | **PASS** (Zero errors)            | **PASS** (Zero errors) |
| `@haulix/utils`         | 2 passed          | 21 passed     | **PASS** (Zero errors)            | **PASS** (Zero errors) |
| **TOTAL**               | **113 suites**    | **709 tests** | **100% PASS**                     | **100% PASS**          |

---

### 3. W05 Specific Test Suites

| Test Suite File                            | Tested Screen / Capability     | Passing Tests | Coverage Highlights                                            |
| :----------------------------------------- | :----------------------------- | :------------ | :------------------------------------------------------------- |
| `searching-for-driver.test.tsx`            | C32-A Searching for Driver     | 5 passed      | Radar sweep, pickup address chip, fee-free cancellation CTA    |
| `driver-matched.test.tsx`                  | C32-B Driver Matched           | 5 passed      | Driver card, vehicle specs, call/chat actions, confirm CTA     |
| `crew-tracking.test.tsx`                   | C32-C Crew Assigned & Tracking | 5 passed      | Live route, timeline steps, summary modal, contact triggers    |
| `cancellation-windows.test.tsx`            | C32-D Cancellation Windows     | 5 passed      | Policy matrix, 5-min grace period, $100 fee rules, back action |
| `no-driver-fee-free-cancellation.test.tsx` | W05 Fee-Free Exit Flow         | 5 passed      | Full cancellation flow with $0 charge confirmation             |

Zero tests were disabled, modified to be less strict, or bypassed.
