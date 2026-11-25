# Customer App Frontend Delivery Manifest

**Phase:** Phase 03.69  
**Application:** `apps/customer` (`com.haulix.customer`)  
**Repository:** `mridha-rakib/haulix-mobile`  
**Branch:** `main`

---

## 1. Source & Documentation Provenance

- **Verified Build-Source Git SHA:** `942c869de6726b9f277abcd1776728b228f7b2e4`
- **Verified Base Git SHA:** `3513da02f099cead7f0600c981357c150419ced7`
- **Application Package Identifier:** `com.haulix.customer`
- **Application Version:** `1.0.0` (Version Code `1`)
- **Supported Languages:** English (`en`), Spanish (`es`)
- **Verified Hardware:** Realme Note 60 (RMX3933 / RMX3930), Android 15, 360dp logical width

---

## 2. Functional & Scope Summary

- **Total Unique Public Routes:** 215 routes
- **Total DemoScreenNavigator Registered Entries:** 423 routes
- **Post-Booking Canonical Scope (W05–W08):** 108 canonical states / 216 bilingual variants
  - W05 (Dispatch): 20 states / 40 variants
  - W06 (Active Service): 26 states / 52 variants
  - W07 (Booking Management & Exceptions): 34 states / 68 variants
  - W08 (Completion & Review): 28 states / 56 variants
- **Canonical Customer Fixture:** 1 sofa, 2 queen mattresses, 1 dining table (4 pieces across 3 categories) totaling $356.00 USD.
- **Auto-Closure Review Policy:** Authoritative 24-hour review window concept.

---

## 3. Automated Quality Gate Evidence

- **Customer App Test Suite:** **133 passed**, 133 total (944 tests passed, 0 failures)
- **Monorepo TypeScript Gate:** 7/7 packages clean (`@haulix/customer`, `@haulix/design-tokens`, `@haulix/driver`, `@haulix/i18n`, `@haulix/logger`, `@haulix/ui`, `@haulix/utils`)
- **Biome Linter & Formatter:** 0 errors, 0 warnings

---

## 4. Acceptance Blockers & Handoff Conditions

- **Standalone APK Artifact:** BLOCKED due to EAS Free plan monthly build quota limit for account `rakib_androids` (resets Dec 01, 2026).
- **Runtime Operability:** App is 100% functional and testable on device via Expo Dev Client / Metro connected runtime.
- **Backend Integration:** Out of scope for pure frontend acceptance phase; all demonstration endpoints and stores operate with zero-guard architecture.
