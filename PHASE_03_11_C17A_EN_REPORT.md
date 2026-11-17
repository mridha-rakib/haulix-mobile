# HAULIX Customer App — Phase 03.11 Report

## C17-A Add New Pickup Address (English ONLY)

**Date:** 2026-11-16  
**Status:** Completed & Physically Verified on Android  
**Platform:** React Native (Expo Router v4, React Native 0.76.7, NativeWind v4, Strict TypeScript)  
**Physical Test Device:** Realme Note 60 (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi)  
**Authoritative Figma Node:** `382:645` (430 × 1334 px) in File `Q946h4YBGgyLsjnPtdyQNe`  
**Previous Upstream Node:** `382:576` (C17 English, 430 × 1413 px)

---

## 1. Executive Summary

Phase 03.11 delivers the **C17-A · Add New Pickup Address** screen for the HAULIX Customer App in **English ONLY**. The implementation directly implements Figma Node `382:645` from file `Q946h4YBGgyLsjnPtdyQNe` inspected via the live `figma_figma` MCP connection.

### Core Achievements

1. **Direct Figma Inspection:** Live MCP inspection retrieved exact geometry (430 × 1334 px), tokens (`#0A0D0C`, `#101514`, `#17211E`, `#C8F944`, `#10B981`, `#EF4444`), typography (`Inter`), layer hierarchies, button variants, and field layouts.
2. **Canonical Screen Implementation:** Implemented in `apps/customer/app/(app)/add-pickup-address.tsx` using Expo Router, NativeWind, and HAULIX design tokens.
3. **Pinned FlowHeaderBack:** Pinned navigation header outside `ScrollView` ensures the Back button remains unclipped, stable, and accessible across arbitrary scroll depths and keyboard states.
4. **Interactive 6-Field Form:**
   - Address label (e.g., `Storage unit Scottsdale`)
   - Street address (e.g., `7350 E Indian School Rd`)
   - City (e.g., `Scottsdale`)
   - State (e.g., `AZ` / `Arizona` restricted)
   - ZIP code (e.g., `85251`, 5-digit US regex validation)
   - Pickup notes (e.g., `Gate code #4412 · Unit 304, 3rd floor · freight elevator around back`, max 200 chars)
5. **Pure Local Validation & Honest Disclosure:**
   - Client-side validation catches missing required fields, non-Arizona states, invalid ZIP format, and length violations.
   - Submitting valid inputs displays an honest disclosure banner explaining that address geocoding and verification (C17-V) will occur in an upcoming phase, while preserving the user's form inputs locally without fake backend states.
6. **Bidirectional Navigation & State Preservation:**
   - Header Back and Android system Back cleanly return to C17 with previous state intact.
   - "Keep home as pickup ›" navigates back to C17 with Home selected (`home-default`).
7. **Strict Spanish Isolation:**
   - Tapping `Añadir otra dirección   ›` on C17 Spanish continues to trigger the localized upcoming-feature notice (`Añadir otra dirección (C17-A) estará disponible en una próxima fase.`). Spanish C17-A is reserved for Phase 03.12.
8. **Automated & Physical Android QA:**
   - 254/254 unit tests passing across all 7 workspace packages (187/187 customer tests).
   - Biome linter, TypeScript typechecker, and `pnpm doctor` clean.
   - 14 genuine Android screenshots captured on physical hardware in `docs/qa/c17a/`.

---

## 2. Authoritative Figma Source Inspection

The authoritative design was inspected directly via the `figma_figma` MCP server:

- **File Key:** `Q946h4YBGgyLsjnPtdyQNe`
- **Figma Session:** `49ad1319-9dee-43fb-ba4a-0e5800c02356`
- **Authoritative Node:** `382:645` (`C17-A · New pickup address / W02 [BK-02, CU-04]`)
- **Frame Dimensions:** 430 × 1334 px
- **Figma Reference Screenshot:** `docs/qa/c17a/figma-C17A-en-reference.png` (48,456 bytes)

### Design Tokens & Layout Structure

- **Backgrounds:** Canvas `#0A0D0C`, Card `#101514`, Input surface `#151D1A`, Focus stroke `#C8F944`, Error surface/stroke `#7F1D1D` / `#EF4444`.
- **Primary Brand Accent:** Electric Lime `#C8F944` for primary CTAs and step chips.
- **Header Elements:**
  - Pinned Back Button: Circle 40 × 40 px, border `#22332D`, chevron left icon.
  - Step Indicator: `W02 · SERVICE DISCOVERY & INTAKE / C17-A`.
  - Screen Title: `Add a pickup location`.
  - Subtitle: `Enter the complete address where HAULIX should arrive. Residential and commercial pickups are supported throughout our Arizona service region.`
  - Customer Profile Pill: `SARAH MITCHELL · HX-DEMO-1027` (green verified check).
- **Form Card:**
  - Card Header: `NEW PICKUP LOCATION` (Lime icon + text).
  - 6 Form Fields with floating labels, helper texts, and clear error states.
- **Validation Card:**
  - Title: `ADDRESS VALIDATION`.
  - Body: `We will verify this address against our service region. High-rise buildings, gated communities, and storage units may require helper-assisted access.`
- **Action CTAs:**
  - Primary Button (Lime): `Validate new address`.
  - Secondary Button (Dark): `Keep home as pickup   ›`.
  - Security Disclaimer: `Arizona service coverage only · GPS and geocoding verified at intake`.

---

## 3. Architecture & File Modifications

### New Files Created

1. `apps/customer/app/(app)/add-pickup-address.tsx`:
   - Canonical screen component implementing C17-A.
   - Modular subcomponents: `C17ANewLocationSection`, `validateC17AInputs`.
   - Accessible keyboard handling via `KeyboardAvoidingView` with behavior `height`/`padding`.
2. `apps/customer/src/fixtures/c17aAddAddress.ts`:
   - Type definitions: `C17AFormData`, `C17AFormErrors`.
   - Initial Figma fixture values: `C17A_INITIAL_VALUES`, `C17A_EMPTY_VALUES`.
   - State and ZIP validation constants.
3. `apps/customer/src/__tests__/add-pickup-address.test.tsx`:
   - Comprehensive unit test suite covering route existence, header pinning, form fields, validation errors, honest disclosures, navigation actions, and i18n symmetry.

### Modified Files

1. `packages/i18n/src/locales/en.ts`:
   - Added complete `c17a` translation namespace containing exact Figma strings.
2. `packages/i18n/src/locales/es.ts`:
   - Added symmetrical `c17a` translation namespace in Spanish to prevent translation fallback discrepancies.
3. `packages/i18n/src/i18n.test.ts`:
   - Added automated test cases verifying en/es key symmetry and exact Figma string equality.
4. `apps/customer/app/(app)/pickup-address.tsx`:
   - Updated `handleAddAddress`: routes English users to `/add-pickup-address` with current service query params, while retaining `noticeC17A` upcoming feature notice for Spanish users.
   - Added `selectedAddressId` param handling so "Keep home as pickup" selects the Home card.
5. `apps/customer/src/components/demo/DemoScreenNavigator.tsx`:
   - Added direct demo link `c17a-en` (`Node 382:645`) pointing to `/add-pickup-address`.

---

## 4. Validation & Form Logic Matrix

| Field              | Requirement         | Validation Rule                                          | Error Message                                               |
| :----------------- | :------------------ | :------------------------------------------------------- | :---------------------------------------------------------- |
| **Address Label**  | Required            | Non-empty string                                         | `Address label is required (e.g. Storage unit Scottsdale).` |
| **Street Address** | Required            | Non-empty string                                         | `Street address is required.`                               |
| **City**           | Required            | Non-empty string                                         | `City is required.`                                         |
| **State**          | Required (AZ Only)  | Must equal `AZ`, `A.Z.`, or `Arizona` (case-insensitive) | `Service is currently available in Arizona (AZ) only.`      |
| **ZIP Code**       | Required (5 Digits) | Must match `/^\d{5}$/`                                   | `Please enter a valid 5-digit US ZIP code.`                 |
| **Pickup Notes**   | Optional            | Max 200 characters                                       | `Pickup notes must be 200 characters or fewer.`             |

---

## 5. Physical Android QA Evidence

All 14 test scenarios were physically executed on a connected **Realme Note 60** running **Android 15** via Expo Go connected to Metro dev server on port 8085.

|  #  | Screenshot Filename                          | Size (Bytes) | Verification Description                                                                                                              |
| :-: | :------------------------------------------- | :----------: | :------------------------------------------------------------------------------------------------------------------------------------ |
|  1  | `android-C17A-en-initial.png`                |   246,782    | Initial C17-A screen state: pinned header, step indicator `W02 / C17-A`, title, customer chip `SARAH MITCHELL`, and top of form card. |
|  2  | `android-C17A-en-complete-form.png`          |   217,286    | Complete form showing all 6 populated fields with Figma initial values.                                                               |
|  3  | `android-C17A-en-focused-input-keyboard.png` |   225,628    | Active input focus on Address label with Lime focus ring and Android virtual keyboard displayed.                                      |
|  4  | `android-C17A-en-edited-values.png`          |   224,786    | Form fields modified with custom text (`Storage unit Scottsdale`, `7350 E Indian School Rd`).                                         |
|  5  | `android-C17A-en-required-field-errors.png`  |   245,814    | Validation trigger with empty label field showing inline red error banner: `Address label is required...`.                            |
|  6  | `android-C17A-en-invalid-zip-error.png`      |   281,352    | Validation trigger with malformed ZIP code showing red error: `Please enter a valid 5-digit US ZIP code.`.                            |
|  7  | `android-C17A-en-valid-input-notice.png`     |   296,470    | Submitting valid inputs displays honest disclosure banner stating C17-V verification is upcoming while preserving input values.       |
|  8  | `android-C17A-en-back-visible-scrolled.png`  |   338,422    | Deep scroll to screen bottom verifying the pinned FlowHeaderBack remains firmly anchored and unclipped.                               |
|  9  | `android-C17A-en-keep-home-nav.png`          |   329,632    | Tapping "Keep home as pickup   ›" navigates back to C17 with Home selected as active pickup card.                                     |
| 10  | `android-C17-en-to-C17A.png`                 |   247,316    | Forward navigation: tapping `Add another address   ›` in English C17 pushes to C17-A screen.                                          |
| 11  | `android-C17A-to-C17-back.png`               |   292,242    | Backward navigation: tapping pinned chevron Back returns to C17 screen with preserved state.                                          |
| 12  | `android-C17A-en-long-input-keyboard.png`    |   265,998    | Multi-line notes field with 180+ character instructions and active virtual keyboard without layout clipping.                          |
| 13  | `android-C17-en-regression.png`              |   292,906    | Regression check on C17 English confirming both address cards, dynamic profile, and action buttons remain intact.                     |
| 14  | `android-C17-es-regression.png`              |   314,878    | Regression check on C17 Spanish confirming `Añadir otra dirección   ›` displays the localized upcoming notice banner.                 |

---

## 6. Automated Test Suite Results

```text
Test Suites: 21 passed, 21 total
Tests:       254 passed, 254 total
Snapshots:   0 total
Time:        ~13.2 s

Summary by package:
- @haulix/customer:     15 passed (187 tests)
- @haulix/i18n:         1 passed (27 tests)
- @haulix/utils:        2 passed (21 tests)
- @haulix/logger:       1 passed (8 tests)
- @haulix/driver:       2 passed (7 tests)
- @haulix/design-tokens:1 passed (4 tests)
- @haulix/ui:           0 tests (passed with no tests)
```

### Static Analysis & Linter Verification

- **Biome Check (`pnpm check`):** 0 errors. (2 expected cognitive complexity warnings on screen root functions).
- **TypeScript (`pnpm typecheck`):** 0 errors across all 7 packages.
- **Package Health (`pnpm doctor`):** All checks passed.

---

## 7. Scope Boundaries & Next Phase

### Phase 03.11 Strict Scope Adherence

- **In Scope & Delivered:** English C17-A screen implementation, local form validation, honest disclosure notices, pinned header navigation, automated unit tests, and genuine physical Android QA.
- **Explicitly Excluded & Preserved:**
  - C17-A Spanish localization (Deferred to Phase 03.12).
  - C17-V Address Verification & Geocoding (Upcoming Phase).
  - C17-D Moving Destination Selection (Upcoming Phase).
  - Driver App & Backend integrations (Untouched).

**PHASE 03.11 IS COMPLETE. HARD STOP.**
