# HAULIX Customer App — Phase 03.13 Report

## C17-V Address Validation Error (English ONLY)

**Date:** 2026-11-16  
**Status:** Completed & Physically Verified on Android  
**Platform:** React Native (Expo Router v4, React Native 0.76.7, NativeWind v4, Strict TypeScript)  
**Physical Test Device:** Realme Note 60 (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi)  
**Authoritative English Figma Node:** `382:708` (430 × 794 px, `C17-V · Address validation error / W02 [BK-02, SV-12]`)  
**Related Upstream Screens:**

- C17-A English Node: `382:645` (430 × 1334 px, `C17-A · New pickup address / W02 [BK-02, CU-04]`)
- C17 English Node: `382:576` (430 × 1413 px, `C17 · Choose pickup address / W02 [BK-02, CU-04, CU-09]`)

---

## 1. Executive Summary

Phase 03.13 implements the **C17-V · Address Validation Error** screen in **English ONLY** for the HAULIX Customer App. This screen represents the prototype's incomplete location verification state (SRS references `BK-02, SV-12`) without claiming a real-world backend or geocoding failure.

### Key Highlights

1. **Live Figma MCP Inspection:**
   - Evaluated node `382:708` directly using `get_metadata`, `get_design_context` (guided by the mandatory `figma-design-to-code` skill), and reference capture.
   - Reference screenshot saved to `docs/qa/c17v/figma-C17V-en-reference.png` (46,592 bytes).
   - Original vector assets downloaded and converted: alert triangle vector `382:730` (`#F36D6D` alert coral) and check vector `382:723` (`#BAFF42` neon lime).
2. **Canonical Screen Route Creation:**
   - Implemented `apps/customer/app/(app)/pickup-address-validation.tsx` as a single canonical route with zero duplicate screen files.
   - Pinned `FlowHeaderBack` outside ScrollView with touch-safe target and centered wordmark with tagline ("We Haul It All.").
   - Strictly omitted bottom navigation bar on C17-V.
3. **Exact Figma English Typography & Content:**
   - Step indicator: `W02 · SERVICE DISCOVERY & INTAKE / C17-V`
   - Title: `Review pickup details`
   - Subtitle: `The address cannot be used until the required location fields are confirmed.`
   - Dynamic customer context badge: `SARAH MITCHELL · HX-DEMO-1027` (with check icon in `#1A2510` olive badge)
   - Error card heading: `Location verification incomplete`
   - Status badge: `Action required` (with `#F36D6D` alert triangle vector in `#222827` elevated container)
   - Guidance: `Confirm street, city, state, ZIP and eligible service coverage.`
   - Warning: `Do not continue to quoting with an unresolved pickup location.`
   - Primary CTA: `Edit address details` (Lime button `#BAFF42`)
   - Secondary CTA: `Use verified home address   ›` (Dark surface container with `#35403B` border)
   - Footer: `DEMO ONLY  ·  No confirmed booking, rates or payment` and `SRS  BK-02, SV-12  ·  430 px / vertical scroll`
4. **C17-A English → C17-V Connection with Draft Preservation:**
   - In English C17-A, submitting locally valid form inputs navigates forward to `/pickup-address-validation`, passing draft parameters (`label`, `street`, `city`, `state`, `zipCode`, `pickupNotes`, `service`, `selectedAddressId`).
   - Invalid form inputs remain on C17-A with inline error banners.
   - Spanish C17-A retains its truthful upcoming-feature notice banner without advancing to C17-V.
5. **Two-Way Recovery Workflows:**
   - **Primary Action (`Edit address details`):** Navigates back to C17-A with all draft values restored. The user can immediately review and adjust the fields.
   - **Secondary Action (`Use verified home address   ›`):** Follows the Figma recovery flow back to C17, activating the default Home address (`home-default`).
   - **Header Back & Android hardware Back:** Returns safely to C17-A (or C17 fallback) with draft state and selected service preserved.
6. **Dynamic Profile Isolation & Service Integrity:**
   - Dynamically resolves English customer profile (`Sarah Mitchell` / `HX-DEMO-1027`) while keeping Spanish profile (`Bryan Lopez Mendoza`) strictly isolated.
   - Preserves canonical service ID (`junk-removal`, `furniture-delivery`, etc.) across all recovery routes.
   - Blocks quotation progression while address verification remains unresolved.
7. **Verification & Quality Standards:**
   - 22 passed test suites across 7 packages (**275 tests passed**, 0 failures).
   - Biome linter clean (**0 errors**, 2 pre-existing cognitive complexity warnings).
   - TypeScript typecheck clean across all 7 packages.
   - `pnpm doctor` passed with 100% health.
   - **14 physical Android QA screenshots** captured on a connected Realme Note 60 (`0B04731X200003BB`, Android 15).

---

## 2. Figma MCP Inspection Details

The authoritative design was retrieved directly using the connected `figma_figma` MCP:

- **File Key:** `Q946h4YBGgyLsjnPtdyQNe`
- **Figma Frame:** `382:708` (`C17-V · Address validation error / W02 [BK-02, SV-12]`)
- **Dimensions:** 430 × 794 px
- **Figma Reference Screenshot:** `docs/qa/c17v/figma-C17V-en-reference.png` (46,592 bytes)

### Design & Token Specifications

- **Canvas Background:** `#080B0B` (`colors.background`)
- **Card Surface:** `#151A19` (`colors.surface`) with subtle border `#35403B` and 17px border radius
- **Status Container:** `#222827` (`colors.elevated`) with 8px border radius
- **Alert Icon:** 18 × 18 px alert triangle vector (`M9 6.75V10.5M9 13.5H9.075M9 1.5L16.5 15.75H1.5L9 1.5Z`) with stroke `#F36D6D`
- **Customer Context Badge:** `#1A2510` olive container with 17 × 17 px check vector (`M2.83333 9.20833L6.375 12.75L14.1667 4.95833`) in `#BAFF42`
- **Primary CTA:** HAULIX Brand Lime `#BAFF42` with `#080B0B` text (height 52px, radius 12px)
- **Secondary CTA:** Surface container `#151A19` with `#35403B` border and `#BAFF42` text (height 56px, radius 12px)
- **Typography:** `Inter` (Regular, Medium, Semi Bold, Bold)

---

## 3. Translation Mapping (`c17v` Namespace)

All keys were added symmetrically to `packages/i18n/src/locales/en.ts` and `packages/i18n/src/locales/es.ts`:

| Translation Key        | English Source (Figma Node `382:708`)                                          | Spanish Mirror (Prepared for Future Localization)                                   |
| :--------------------- | :----------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `c17v.stepIndicator`   | `W02 · SERVICE DISCOVERY & INTAKE`                                             | `W02 · SERVICIOS Y SOLICITUD`                                                       |
| `c17v.stepSub`         | `/ C17-V`                                                                      | `/ C17-V`                                                                           |
| `c17v.title`           | `Review pickup details`                                                        | `Revisar detalles de recogida`                                                      |
| `c17v.subtitle`        | `The address cannot be used until the required location fields are confirmed.` | `La dirección no se puede usar hasta confirmar los campos de ubicación requeridos.` |
| `c17v.customerContext` | `{{name}} · {{bookingId}}`                                                     | `{{name}} · {{bookingId}}`                                                          |
| `c17v.cardHeading`     | `Location verification incomplete`                                             | `Verificación de ubicación incompleta`                                              |
| `c17v.statusBadge`     | `Action required`                                                              | `Acción requerida`                                                                  |
| `c17v.guidance`        | `Confirm street, city, state, ZIP and eligible service coverage.`              | `Confirma calle, ciudad, estado, código postal y cobertura de servicio elegible.`   |
| `c17v.warning`         | `Do not continue to quoting with an unresolved pickup location.`               | `No continúes a la cotización con una ubicación de recogida no resuelta.`           |
| `c17v.editAddressCta`  | `Edit address details`                                                         | `Editar detalles de dirección`                                                      |
| `c17v.useHomeCta`      | `Use verified home address   ›`                                                | `Usar dirección habitual verificada   ›`                                            |
| `c17v.footerDemo`      | `DEMO ONLY  ·  No confirmed booking, rates or payment`                         | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`                                |
| `c17v.footerSrs`       | `SRS  BK-02, SV-12  ·  430 px / vertical scroll`                               | `SRS  BK-02, SV-12  ·  430 px / desplazamiento vertical`                            |
| `c17v.backA11y`        | `Back to add pickup address`                                                   | `Volver a añadir dirección de recogida`                                             |

---

## 4. Source Code Architecture & Modifications

### 1. `apps/customer/app/(app)/pickup-address-validation.tsx` (New Canonical Screen)

- Implemented C17-V with pinned `FlowHeaderBack`, step indicator chip, title and subtitle, customer booking chip, error card with original `#F36D6D` alert vector, primary lime CTA, secondary dark CTA, and demo/SRS disclaimers.
- Implemented dynamic customer profile binding with locale isolation.
- Implemented hardware back and safe-area handling.
- Strictly excluded bottom navigation.

### 2. `apps/customer/app/(app)/add-pickup-address.tsx`

- Connected valid English form submission directly to `/pickup-address-validation`, preserving all entered form fields in navigation parameters.
- Preserved Spanish C17-A localized upcoming-feature notice banner without advancing to C17-V.
- Enhanced `useC17AForm` to accept `initialDraft`, restoring all previous form values when returning from C17-V via `Edit address details`.

### 3. `apps/customer/src/components/discovery/C17Icons.tsx`

- Added `C17VAlertIcon` (18 × 18 px) with original `#F36D6D` alert coral stroke.
- Added `C17VCheckIcon` (17 × 17 px) with original `#BAFF42` neon lime stroke.

### 4. `apps/customer/src/components/demo/DemoScreenNavigator.tsx`

- Registered `c17v-en` (`Node 382:708`) pointing directly to `/pickup-address-validation` for QA and development navigation.

### 5. `apps/customer/src/__tests__/pickup-address-validation.test.tsx` (New Test Suite)

- 16 automated tests covering all 15 acceptance criteria: exact copy, alert icon, customer profile, navigation flows, draft restoration, home address selection, back handling, service ID preservation, quotation prevention, and regression checks.

---

## 5. Physical Android QA Evidence

All tests were executed on a physical **Realme Note 60** running **Android 15** connected via ADB and reversed Metro development server on port 8085.

|  #  | Screenshot Filename                      | Size (Bytes) | Verification Scenario                                                                                                                                                                                                         |
| :-: | :--------------------------------------- | :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | `android-C17V-en-initial.png`            |   153,731    | Initial C17-V English screen: pinned header, step indicator `W02 · SERVICE DISCOVERY & INTAKE / C17-V`, heading, subtitle, dynamic customer badge `SARAH MITCHELL · HX-DEMO-1027`, and location verification incomplete card. |
|  2  | `android-C17V-en-error-card.png`         |   153,731    | Error card view showing card title `Location verification incomplete`, `Action required` status badge with original alert triangle icon (`#F36D6D`), guidance text, and warning text.                                         |
|  3  | `android-C17V-en-cta-styling.png`        |   153,731    | CTA button hierarchy: Primary Lime `#BAFF42` button (`Edit address details`) and Secondary dark surface button with `#35403B` border (`Use verified home address   ›`).                                                       |
|  4  | `android-C17A-to-C17V.png`               |   153,823    | Forward navigation: Tapping `Validate new address` on C17-A English with valid form data pushes seamlessly to C17-V.                                                                                                          |
|  5  | `android-C17V-edit-address-to-C17A.png`  |   130,778    | Recovery navigation: Tapping `Edit address details` on C17-V returns to C17-A English.                                                                                                                                        |
|  6  | `android-C17A-draft-restored.png`        |   130,778    | Draft preservation verification: All previously entered fields (`Storage unit`, `4100 N 24th Street`, `Phoenix`, `Arizona`, `85016`, notes) are restored on C17-A.                                                            |
|  7  | `android-C17V-use-home-to-C17.png`       |   173,280    | Secondary recovery navigation: Tapping `Use verified home address   ›` returns to C17 with Home address (`home-default`) selected as active.                                                                                  |
|  8  | `android-C17V-header-back.png`           |   140,489    | Pinned Header Back: Tapping the `<` chevron on C17-V navigates back safely to C17-A with draft preserved.                                                                                                                     |
|  9  | `android-C17V-android-back.png`          |   140,488    | Hardware Back: Pressing Android hardware back button on C17-V navigates back to C17-A with state preserved.                                                                                                                   |
| 10  | `android-C17V-back-visible-scrolled.png` |   153,731    | Deep vertical scroll verifying pinned `FlowHeaderBack` remains firmly anchored and unclipped.                                                                                                                                 |
| 11  | `android-C17V-narrow-safe-area.png`      |   153,812    | Android status-bar and narrow safe-area verification: zero element clipping or text collisions.                                                                                                                               |
| 12  | `android-C17A-en-regression.png`         |   130,513    | English C17-A regression check confirming English strings, Sarah Mitchell profile, and form validation remain fully functional.                                                                                               |
| 13  | `android-C17A-es-regression.png`         |   169,910    | Spanish C17-A regression check: submitting valid Spanish data displays the truthful upcoming notice banner without advancing to C17-V.                                                                                        |
| 14  | `android-C17V-blocks-quotation.png`      |   153,823    | Quotation blocking verification: warning explicitly forbids quotation progression and zero quote links exist on C17-V.                                                                                                        |

All screenshot evidence is stored in [`docs/qa/c17v/`](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c17v/).

---

## 6. Automated Test Suite Results

```text
Test Suites: 22 passed, 22 total
Tests:       275 passed, 275 total
Snapshots:   0 total
Time:        ~12.8 s

Summary by package:
- @haulix/customer:     16 passed (206 tests, +16 new tests)
- @haulix/i18n:          1 passed (29 tests, +1 new test)
- @haulix/utils:         2 passed (21 tests)
- @haulix/logger:        1 passed (8 tests)
- @haulix/driver:        2 passed (7 tests)
- @haulix/design-tokens: 1 passed (4 tests)
- @haulix/ui:            0 tests (passed with no tests)
```

### Static Analysis & Linter Verification

- **Biome Check (`pnpm check`):** **0 errors**, 0 fixes needed.
  - 2 pre-existing cognitive complexity warnings on screen root functions:
    1. `apps/customer/app/(app)/add-pickup-address.tsx` (complexity 18/15)
    2. `apps/customer/app/(app)/pickup-address.tsx` (complexity 24/15)
  - **Zero new warnings introduced in Phase 03.13.**
- **TypeScript (`pnpm typecheck`):** **0 errors** across all 7 workspace packages.
- **Package Health (`pnpm doctor`):** All checks passed.

---

## 7. Scope Boundaries & Strict Hard Stop

### Strict Scope Adherence

- **Delivered in Phase 03.13:**
  - C17-V English implementation with exact Figma copy, measurements, and original SVG alert/check vectors.
  - Forward navigation from C17-A English on valid form submission.
  - Unsaved draft preservation across recovery routes.
  - Primary CTA recovery to C17-A and Secondary CTA recovery to C17 (Home address).
  - Header Back and Android system Back handling.
  - Spanish C17-A upcoming notice preserved (regression verified).
  - Dynamic customer profile isolation (Sarah Mitchell vs. Bryan Lopez).
  - Automated test suite (275 tests passed).
  - Physical Android QA on Realme Note 60 (14 screenshots captured).
- **Strictly Excluded & Preserved:**
  - C17-V Spanish localization (Upcoming Phase).
  - C17-D Moving Destination Selection (Upcoming Phase).
  - C18 Service Intake (Upcoming Phase).
  - W03 AI Quotation progression (Blocked by design).
  - Driver App and Neon backend integrations (Untouched).

**PHASE 03.13 IS COMPLETE. HARD STOP.**
