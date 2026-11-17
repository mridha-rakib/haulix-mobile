# HAULIX Customer App — Phase 03.12 Report

## C17-A Add New Pickup Address (Spanish Localization ONLY)

**Date:** 2026-11-16  
**Status:** Completed & Physically Verified on Android  
**Platform:** React Native (Expo Router v4, React Native 0.76.7, NativeWind v4, Strict TypeScript)  
**Physical Test Device:** Realme Note 60 (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi)  
**Authoritative Spanish Figma Node:** `974:9497` (430 × 1334 px, `C17-A-ES · Nueva dirección / W02 [LOCALIZACIÓN]`)  
**English Counterpart Node:** `382:645` (430 × 1334 px, `C17-A · New pickup address / W02 [BK-02, CU-04]`)  
**Upstream C17 Spanish Node:** `974:9412` (430 × 1413 px) in Figma File `Q946h4YBGgyLsjnPtdyQNe`

---

## 1. Executive Summary

Phase 03.12 delivers the **C17-A · Add New Pickup Address** screen in **Spanish Localization ONLY** for the HAULIX Customer App. This implementation directly executes the authoritative Spanish design from Figma Node `974:9497`, inspected via the live `figma_figma` MCP connection, in a single canonical route with zero duplicate screen files.

### Key Highlights

1. **Live Figma MCP Inspection:** Inspected frame `974:9497` with `get_metadata`, `get_design_context`, and `get_screenshot`. The authoritative reference screenshot was downloaded to `docs/qa/c17a/figma-C17A-es-reference.png` (48,403 bytes).
2. **Single Canonical Route Reuse:** Enhanced `apps/customer/app/(app)/add-pickup-address.tsx` using `@haulix/i18n` with zero duplicate routes (`add-pickup-address-es.tsx` was strictly avoided).
3. **Exact Verified Spanish Copy:**
   - Step indicator: `W02 · SERVICIOS Y SOLICITUD / C17-A`
   - Title: `Añadir punto de recogida`
   - Subtitle: `Se valida toda nueva dirección antes de continuar.`
   - Section heading: `Nueva ubicación`
   - 6 Form fields: `Nombre de dirección` (`Trastero`), `Calle` (`4100 N 24th Street`), `Ciudad` (`Phoenix`), `Estado` (`Arizona`), `Código postal` (`85016`), `Notas de recogida` (`Código de acceso solo para el conductor asignado`).
   - Validation card: `Validación necesaria`, `Información del servicio`, `Dirección de ejemplo; entrega no verificada.`, `HX-DEMO-1027 conserva la dirección habitual de Bryan Lopez Mendoza.`.
   - CTAs: `Validar nueva dirección` (Lime CTA), `Mantener casa como origen   ›` (Dark Secondary CTA).
   - Footers: `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`, `SRS  BK-02, CU-04  ·  430 px / desplazamiento vertical`.
4. **Spanish Profile Isolation:**
   - Dynamically binds Spanish customer `BRYAN LOPEZ MENDOZA · HX-DEMO-1027` without hardcoding Sarah Mitchell.
   - Preserves independent locale profile state and contact details across navigation sessions.
5. **Interactive Form & Natural Spanish Validation:**
   - Form fields remain fully editable with auto-formatting and keyboard handling.
   - Client-side validation checks: required label, street, city; Arizona demo constraint; 5-digit US ZIP format; 200-char notes limit.
   - Natural Spanish validation error messages:
     - `Este campo es obligatorio.`
     - `Esta demostración solo admite direcciones de Arizona.`
     - `Introduce un código postal válido de 5 dígitos.`
     - `Las notas de recogida deben tener 200 caracteres o menos.`
6. **Seamless C17 Spanish Navigation:**
   - Connected `Añadir otra dirección   ›` in Spanish C17 directly to `/add-pickup-address`, retiring the temporary upcoming-feature notice banner.
   - Pinned `FlowHeaderBack` and Android hardware Back return cleanly to C17 Spanish.
   - `Mantener casa como origen   ›` returns to C17 Spanish with Home selected as active.
7. **Honest Validation Disclosure:**
   - Validating correct form data preserves the local unsaved draft and shows a clear, truthful disclosure notice stating that address verification and geocoding (C17-V) will take place in an upcoming phase.
   - Zero fake backend or Neon database writes were introduced.
8. **Automated & Physical Android QA:**
   - 190 customer unit tests passing, 28 i18n tests passing, 258 workspace total tests passing.
   - Biome linter, TypeScript typecheck, and `pnpm doctor` clean.
   - 14 genuine Android screenshots captured on physical hardware in `docs/qa/c17a/`.

---

## 2. Figma MCP Inspection Details

The authoritative Spanish design was retrieved directly using the `figma_figma` MCP tools:

- **File Key:** `Q946h4YBGgyLsjnPtdyQNe`
- **Figma Frame:** `974:9497` (`C17-A-ES · Nueva dirección / W02 [LOCALIZACIÓN]`)
- **Dimensions:** 430 × 1334 px
- **Figma Reference Screenshot:** `docs/qa/c17a/figma-C17A-es-reference.png` (48,403 bytes)

### Design & Token Specifications

- **Canvas Background:** Base dark `#080B0B` / Canvas surface `#151A19`
- **Field Elevated Containers:** Elevated card `#222827`, border `#35403B`, focus ring `#BAFF42`
- **Primary Brand Accent:** Electric Lime `#BAFF42`
- **Typography:** `Inter` (Regular, Medium, Semi Bold, Bold)
- **Status & Badges:** Verified Green `#10B981` check icon for customer context and service info badges.

---

## 3. Spanish Translation Mapping

All translation keys are registered symmetrically in `packages/i18n/src/locales/es.ts` and `packages/i18n/src/locales/en.ts`:

| Key                                 | Spanish Translation (Node `974:9497`)                                                                                                                      | English Source (Node `382:645`)                                                                                                                    |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `c17a.stepIndicator`                | `W02 · SERVICIOS Y SOLICITUD`                                                                                                                              | `W02 · SERVICE DISCOVERY & INTAKE`                                                                                                                 |
| `c17a.stepSub`                      | `/ C17-A`                                                                                                                                                  | `/ C17-A`                                                                                                                                          |
| `c17a.title`                        | `Añadir punto de recogida`                                                                                                                                 | `Add a pickup location`                                                                                                                            |
| `c17a.subtitle`                     | `Se valida toda nueva dirección antes de continuar.`                                                                                                       | `New service addresses are validated before the booking continues.`                                                                                |
| `c17a.customerContext`              | `{{name}} · {{bookingId}}`                                                                                                                                 | `{{name}} · {{bookingId}}`                                                                                                                         |
| `c17a.newLocationSection`           | `Nueva ubicación`                                                                                                                                          | `New location`                                                                                                                                     |
| `c17a.labelAddressLabel`            | `Nombre de dirección`                                                                                                                                      | `Address label`                                                                                                                                    |
| `c17a.placeholderAddressLabel`      | `Trastero`                                                                                                                                                 | `Storage unit`                                                                                                                                     |
| `c17a.labelStreet`                  | `Calle`                                                                                                                                                    | `Street`                                                                                                                                           |
| `c17a.placeholderStreet`            | `4100 N 24th Street`                                                                                                                                       | `4100 N 24th Street`                                                                                                                               |
| `c17a.labelCity`                    | `Ciudad`                                                                                                                                                   | `City`                                                                                                                                             |
| `c17a.placeholderCity`              | `Phoenix`                                                                                                                                                  | `Phoenix`                                                                                                                                          |
| `c17a.labelState`                   | `Estado`                                                                                                                                                   | `State`                                                                                                                                            |
| `c17a.placeholderState`             | `Arizona`                                                                                                                                                  | `Arizona`                                                                                                                                          |
| `c17a.labelZipCode`                 | `Código postal`                                                                                                                                            | `ZIP code`                                                                                                                                         |
| `c17a.placeholderZipCode`           | `85016`                                                                                                                                                    | `85016`                                                                                                                                            |
| `c17a.labelPickupNotes`             | `Notas de recogida`                                                                                                                                        | `Pickup notes`                                                                                                                                     |
| `c17a.placeholderPickupNotes`       | `Código de acceso solo para el conductor asignado`                                                                                                         | `Gate code provided to assigned driver only`                                                                                                       |
| `c17a.validationSectionTitle`       | `Validación necesaria`                                                                                                                                     | `Validation required`                                                                                                                              |
| `c17a.validationBadge`              | `Información del servicio`                                                                                                                                 | `Service information`                                                                                                                              |
| `c17a.validationGuidance1`          | `Dirección de ejemplo; entrega no verificada.`                                                                                                             | `Demonstration address — not a verified delivery location.`                                                                                        |
| `c17a.validationGuidance2`          | `{{bookingId}} conserva la dirección habitual de {{name}}.`                                                                                                | `Existing booking {{bookingId}} remains at {{name}}'s default address.`                                                                            |
| `c17a.validateNewAddressCta`        | `Validar nueva dirección`                                                                                                                                  | `Validate new address`                                                                                                                             |
| `c17a.keepHomeCta`                  | `Mantener casa como origen   ›`                                                                                                                            | `Keep home as pickup   ›`                                                                                                                          |
| `c17a.footerDemo`                   | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`                                                                                                       | `DEMO ONLY  ·  No confirmed booking, rates or payment`                                                                                             |
| `c17a.footerSrs`                    | `SRS  BK-02, CU-04  ·  430 px / desplazamiento vertical`                                                                                                   | `SRS  BK-02, CU-04  ·  430 px / vertical scroll`                                                                                                   |
| `c17a.backA11y`                     | `Volver a la selección de dirección de recogida`                                                                                                           | `Back to pickup address selection`                                                                                                                 |
| `c17a.noticeValidationNotConnected` | `Modo de demostración: La validación de dirección (C17-V) estará disponible en una próxima fase. Los detalles ingresados se han conservado como borrador.` | `Demonstration mode: Address validation (C17-V) is scheduled for an upcoming phase. Your entered details have been preserved as an unsaved draft.` |
| `c17a.errorLabelRequired`           | `Este campo es obligatorio.`                                                                                                                               | `Address label is required.`                                                                                                                       |
| `c17a.errorStreetRequired`          | `Este campo es obligatorio.`                                                                                                                               | `Street address is required.`                                                                                                                      |
| `c17a.errorCityRequired`            | `Este campo es obligatorio.`                                                                                                                               | `City is required.`                                                                                                                                |
| `c17a.errorStateArizonaOnly`        | `Esta demostración solo admite direcciones de Arizona.`                                                                                                    | `Service is currently restricted to Arizona.`                                                                                                      |
| `c17a.errorZipRequired`             | `Este campo es obligatorio.`                                                                                                                               | `ZIP code is required.`                                                                                                                            |
| `c17a.errorZipInvalid`              | `Introduce un código postal válido de 5 dígitos.`                                                                                                          | `Please enter a valid 5-digit US ZIP code.`                                                                                                        |
| `c17a.errorNotesTooLong`            | `Las notas de recogida deben tener 200 caracteres o menos.`                                                                                                | `Pickup notes cannot exceed 200 characters.`                                                                                                       |

---

## 4. Source Code Architecture & Modifications

### 1. `apps/customer/app/(app)/add-pickup-address.tsx`

- **Extracted `useC17AForm` hook:** Decoupled state management, form initialization, validation, and notice disclosures.
- **Locale-Aware Initial Fixtures:** Initialized with `getC17AInitialValues(currentLocale)` (`Trastero`, `4100 N 24th Street`, `Phoenix`, `Arizona`, `85016`, `Código de acceso solo para el conductor asignado`).
- **Dynamic Guidance Resolution:** Resolves `{{name}}` dynamically to `profile.name` (Bryan Lopez Mendoza) in Spanish, maintaining isolation from Sarah Mitchell in English.
- **Clean Navigation Handlers:** Connects Back and Keep Home actions to `/pickup-address`.

### 2. `apps/customer/app/(app)/pickup-address.tsx`

- **Universal C17-A Forward Route:** `handleAddAddress` unconditionally navigates to `/add-pickup-address` for both English and Spanish users, passing service and address selection query params.
- **Retired Spanish C17-A Upcoming Notice:** Tapping `Añadir otra dirección   ›` no longer displays the placeholder notice and seamlessly advances to C17-A.

### 3. `apps/customer/src/fixtures/c17aAddAddress.ts`

- Added `C17A_INITIAL_VALUES_ES` and `getC17AInitialValues(locale)` helper to provide locale-appropriate demo fixtures.

### 4. `apps/customer/src/components/demo/DemoScreenNavigator.tsx`

- Registered `c17a-es` (`Node 974:9497`) pointing directly to `/add-pickup-address` with locale `"es"`.

---

## 5. Physical Android QA Evidence

Executed on a physical **Realme Note 60** running **Android 15** connected via ADB and reversed Metro dev server on port 8085.

|  #  | Screenshot Filename                          | Size (Bytes) | Verification Scenario                                                                                                                                                                                                                  |
| :-: | :------------------------------------------- | :----------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | `android-C17A-es-initial.png`                |   261,106    | Initial Spanish C17-A screen state: pinned header, step indicator `W02 · SERVICIOS Y SOLICITUD / C17-A`, title `Añadir punto de recogida`, subtitle, dynamic customer chip `BRYAN LOPEZ MENDOZA · HX-DEMO-1027`, and top of form card. |
|  2  | `android-C17A-es-complete-form.png`          |   235,682    | Complete form showing all 6 populated Spanish fields with Figma defaults (`Trastero`, `4100 N 24th Street`, `Phoenix`, `Arizona`, `85016`, etc.) and validation card.                                                                  |
|  3  | `android-C17A-es-focused-input-keyboard.png` |   269,022    | Focus on `Nombre de dirección` field with active lime border and Android virtual keyboard open.                                                                                                                                        |
|  4  | `android-C17A-es-edited-values.png`          |   264,976    | Form fields modified with custom Spanish text (`Trastero central`).                                                                                                                                                                    |
|  5  | `android-C17A-es-required-field-errors.png`  |   267,174    | Validation triggered with empty label field showing inline red error banner: `Este campo es obligatorio.`.                                                                                                                             |
|  6  | `android-C17A-es-invalid-zip-error.png`      |   293,488    | Validation triggered with malformed 3-digit ZIP (`850`) showing red error: `Introduce un código postal válido de 5 dígitos.`.                                                                                                          |
|  7  | `android-C17A-es-valid-input-notice.png`     |   323,282    | Submitting valid inputs displays honest disclosure banner stating C17-V verification is upcoming while preserving input values.                                                                                                        |
|  8  | `android-C17A-es-back-visible-scrolled.png`  |   290,678    | Deep scroll to screen bottom verifying the pinned `FlowHeaderBack` remains firmly anchored and unclipped.                                                                                                                              |
|  9  | `android-C17A-es-keep-home-nav.png`          |   315,168    | Tapping `Mantener casa como origen   ›` navigates back to C17 Spanish with Home selected as active pickup card.                                                                                                                        |
| 10  | `android-C17-es-to-C17A.png`                 |   297,256    | Forward navigation: tapping `Añadir otra dirección   ›` in Spanish C17 pushes to C17-A Spanish.                                                                                                                                        |
| 11  | `android-C17A-es-back-to-C17.png`            |   297,240    | Backward navigation: tapping pinned chevron Back returns to C17 Spanish with preserved state.                                                                                                                                          |
| 12  | `android-C17A-es-long-input-keyboard.png`    |   256,420    | Multi-line notes field with long Spanish instructions and active virtual keyboard without layout clipping.                                                                                                                             |
| 13  | `android-C17A-es-profile-isolation.png`      |   278,258    | Customer chip and guidance verification confirming dynamic Spanish profile (`Bryan Lopez Mendoza`) isolation from English.                                                                                                             |
| 14  | `android-C17A-en-regression.png`             |   248,678    | English C17-A regression check confirming English strings, Sarah Mitchell profile, and form inputs remain fully intact.                                                                                                                |

---

## 6. Automated Test Suite Results

```text
Test Suites: 21 passed, 21 total
Tests:       258 passed, 258 total
Snapshots:   0 total
Time:        ~14.9 s

Summary by package:
- @haulix/customer:     15 passed (190 tests)
- @haulix/i18n:         1 passed (28 tests)
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

### Strict Scope Adherence

- **In Scope & Delivered:** Spanish C17-A localization, dynamic customer profile binding, natural Spanish validation, navigation integration from C17 Spanish, honest prototype disclosure notice, automated unit tests, and genuine physical Android QA.
- **Explicitly Excluded & Preserved:**
  - C17-V Address Verification & Geocoding (Upcoming Phase).
  - C17-D Moving Destination Selection (Upcoming Phase).
  - C18 Service Intake (Upcoming Phase).
  - Driver App & Neon backend integrations (Untouched).

**PHASE 03.12 IS COMPLETE. HARD STOP.**
