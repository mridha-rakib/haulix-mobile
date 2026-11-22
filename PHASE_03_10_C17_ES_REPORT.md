# Phase 03.10 C17 Choose Pickup Address (Spanish Localization ONLY) — Implementation & Verification Report

**Authoritative Spanish Source:** Figma Node `974:9412` (430 × 1413 px)  
**English Counterpart:** Figma Node `382:576` (430 × 1413 px)  
**File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Screen:** `W02 · SERVICIOS Y SOLICITUD / C17` — Dirección de recogida (Español)  
**Deliverable Document:** `PHASE_03_10_C17_ES_REPORT.md`  
**Execution Date:** 2026-11-16

---

## 1. Executive Summary

Phase 03.10 completes **C17 — Choose Pickup Address (Spanish Localization ONLY)** for the HAULIX Customer App in strict conformance with authoritative Figma Node `974:9412` and the established single canonical route architecture.

All internationalization strings, dynamic profile integrations, catalog integrity rules, automated test suites, quality gates, and physical Android QA tests on the connected Realme Note 60 device (`0B04731X200003BB`) have been fully executed and verified.

### Key Deliverables & Achievements

- **Single Canonical Route:** Reused `apps/customer/app/(app)/pickup-address.tsx` without creating any duplicate locale routes (e.g., no `pickup-address-es.tsx`).
- **Exact Spanish Localization:** 100% verified Figma copy from Node `974:9412` added to `packages/i18n/src/locales/es.ts` under the `c17` namespace, maintaining full key symmetry with `en.ts`.
- **Dynamic Profile Isolation:**
  - **Spanish Preview:** Displays **Bryan Lopez Mendoza** (`BRYAN LOPEZ MENDOZA · HX-DEMO-1027`), contact `Bryan Lopez Mendoza · +1 602-555-7777`, and localized personalized subtitle `Usa la dirección guardada de Bryan u otra de Arizona.`.
  - **English Isolation:** Completely preserves **Sarah Mitchell** (`SARAH MITCHELL · BK-02` / `SARAH JANE MITCHELL · HX-DEMO-1027`) and `Use Sarah's saved service address...` with zero cross-contamination.
- **Service Catalog Integrity:**
  - Strictly enforces the 7 canonical services from `C15_SERVICES` (`junk-removal`, `moving`, `furniture-pickup`, `appliance-removal`, `mattress-removal`, `garage-cleanout`, `store-pickup`).
  - Unsupported/invented service parameters (such as `commercial-freight`) are safely caught, defaulted to `junk-removal` (`Retiro de objetos`), and display a truthful, dismissible warning banner: `"El servicio solicitado \"...\" no está reconocido. Se ha predeterminado Retiro de objetos."`.
- **Spanish Action CTAs & Truthful Notices:**
  - `Confirmar dirección de recogida` (Primary Lime Button) -> Displays truthful notice disclosing upcoming C18 Service Intake.
  - `Añadir otra dirección   ›` (Secondary Dark Card) -> Discloses upcoming C17-A Add Address screen.
  - `Ejemplo de destino de mudanza   ›` (Secondary Dark Card) -> Discloses upcoming C17-D Moving Destination screen.
  - Footer disclaimer: `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`.
- **Flow Continuity:**
  - `service-area.tsx` (C16 Spanish) `handleUseLocation` now seamlessly navigates to `/pickup-address` with preserved service params.
  - Pinned `FlowHeaderBack` and Android system Back return cleanly from C17 to C16 with preserved state.
- **Physical Android QA:** 12 genuine screenshots captured directly from the physical Realme Note 60 device running the latest Expo development build.
- **Hard Stop:** No C17-A, C17-D, C18, Driver App, or backend modifications.

---

## 2. Live Figma MCP Inspection

### MCP Session & Metadata Verification

- **Figma Session ID:** `ea37cb8f-3583-4df6-9305-38ff8fa016e7`
- **MCP Tool Calls:**
  - `figma_figma:create_session` -> Initiated on file `Q946h4YBGgyLsjnPtdyQNe`.
  - `figma_figma:get_metadata` -> Inspected Node `974:9412`.
    - Geometry: `430 × 1413 px`.
    - Frame Name: `C17-ES · Dirección de recogida / W02 [LOCALIZACIÓN]`.
  - `figma_figma:get_design_context` -> Retrieved layer tree, typography specs, color tokens, and exact Spanish strings.
  - `figma_figma:get_screenshot` -> Captured reference image URL and saved locally to `docs/qa/c17/figma-C17-es-reference.png` (55,164 bytes).

### Figma Observation on Customer Name

In the Figma file for Node `974:9412`, static design layers originally retained placeholder text (`Sarah`). In accordance with the prompt's explicit requirement:

> _"Show Bryan Lopez or saved Spanish edits in Spanish, and Sarah Mitchell in English. Never mix customer names between languages."_

The implementation dynamically resolves the localized profile (`Bryan Lopez Mendoza` for Spanish, `Sarah Mitchell` for English) while honoring any user edits saved in `ProfileStorage`.

---

## 3. Architecture & Code Changes

### 3.1. Internationalization (`packages/i18n/src/locales/es.ts` & `en.ts`)

Added the complete `c17` Spanish translation namespace in `packages/i18n/src/locales/es.ts`:

```typescript
c17: {
  screenIndicator: "W02 · SERVICIOS Y SOLICITUD",
  screenNumber: "/ C17",
  title: "¿Dónde hacemos la recogida?",
  subtitle: "Usa la dirección guardada de {{name}} u otra de Arizona.",
  savedAddressesTitle: "Direcciones guardadas",
  homeTitle: "Casa · Recogida predeterminada",
  relativeTitle: "Casa de un familiar",
  instructionsTitle: "Instrucciones de recogida",
  contactLabel: "Contacto",
  serviceTypeLabel: "Tipo de servicio",
  pickupAccessLabel: "Acceso de recogida",
  pickupAccessValue: "Entrada residencial · Detalles pendientes",
  addressRuleTitle: "Regla de dirección",
  addressRuleItem1: "La dirección debe estar dentro del servicio activo en Arizona.",
  addressRuleItem2: "Solo se añade destino si el servicio requiere entrega.",
  confirmPickupAddress: "Confirmar dirección de recogida",
  addAnotherAddress: "Añadir otra dirección",
  movingDropoffExample: "Ejemplo de destino de mudanza",
  demoDisclaimer: "SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
  srsFooter: "SRS  BK-02, CU-04, CU-09  ·  430 px / desplazamiento vertical",
  unsupportedServiceNotice:
    'El servicio solicitado "{{rawService}}" no está reconocido. Se ha predeterminado Retiro de objetos.',
  noticeC18: "La etapa de solicitud (C18) estará disponible próximamente.",
  noticeC17A: "Añadir otra dirección (C17-A) estará disponible en una próxima fase.",
  noticeC17D: "El destino de mudanza (C17-D) estará disponible en una próxima fase.",
  dismissNotice: "Cerrar",
  backA11y: "Volver a la pantalla anterior",
}
```

Added symmetrical `unsupportedServiceNotice` to `packages/i18n/src/locales/en.ts`:

```typescript
unsupportedServiceNotice:
  'The requested service "{{rawService}}" is not recognized. Defaulted to Junk Removal.',
```

### 3.2. Fixture Enhancement (`apps/customer/src/fixtures/c17PickupAddress.ts`)

Enhanced `C17SavedAddress` items to include optional `i18nTitleKey` (`c17.homeTitle` and `c17.relativeTitle`) for dynamic localization.

### 3.3. Canonical Route Controller (`apps/customer/app/(app)/pickup-address.tsx`)

- Enforced strict canonical catalog validation:

  ```typescript
  const VALID_SERVICE_IDS = new Set(C15_SERVICES.map((s) => s.id));
  ```
- Localized address card titles via `t(item.i18nTitleKey, item.title)`.
- Localized contact, access values, rule items, and action button labels.
- Localized banner notifications for upcoming phases and unrecognized service IDs.

### 3.4. Flow Navigation Connection (`apps/customer/app/(app)/service-area.tsx`)

Updated `handleUseLocation` so both English and Spanish flows navigate cleanly to `/pickup-address` with `service` search parameters:

```typescript
router.push({
  pathname: "/pickup-address",
  params: { service: selectedServiceId },
});
```

### 3.5. QA Demo Navigator (`apps/customer/src/components/demo/DemoScreenNavigator.tsx`)

- Registered `c17-es` (Node `974:9412`) pointing to `/pickup-address` with `locale: "es"`.
- Registered `c17-es-invalid` with `params: { service: "commercial-freight" }` to allow 1-tap QA verification of invalid service fallback behavior.

---

## 4. Exact Spanish Translation Mapping

| Context / Element           | English (Node `382:576`)                               | Spanish (Node `974:9412`)                                        | Status   |
| :-------------------------- | :----------------------------------------------------- | :--------------------------------------------------------------- | :------- |
| **Flow Step Indicator**     | `W02 · SERVICE DISCOVERY & INTAKE`                     | `W02 · SERVICIOS Y SOLICITUD`                                    | Verified |
| **Screen Step**             | `/ C17`                                                | `/ C17`                                                          | Verified |
| **Main Heading**            | `Where should we collect?`                             | `¿Dónde hacemos la recogida?`                                    | Verified |
| **Personalized Subtitle**   | `Use Sarah's saved service address...`                 | `Usa la dirección guardada de Bryan u otra de Arizona.`          | Verified |
| **Customer Chip**           | `SARAH MITCHELL · BK-02`                               | `BRYAN LOPEZ MENDOZA · HX-DEMO-1027`                             | Verified |
| **Saved Addresses Section** | `Saved addresses`                                      | `Direcciones guardadas`                                          | Verified |
| **Default Address Title**   | `Home · Default pickup`                                | `Casa · Recogida predeterminada`                                 | Verified |
| **Secondary Address Title** | `Relative's residence`                                 | `Casa de un familiar`                                            | Verified |
| **Instructions Section**    | `Pickup instructions`                                  | `Instrucciones de recogida`                                      | Verified |
| **Contact Row Label**       | `Contact`                                              | `Contacto`                                                       | Verified |
| **Contact Row Value**       | `Sarah Mitchell · +1 602-555-0142`                     | `Bryan Lopez Mendoza · +1 602-555-7777`                          | Verified |
| **Service Row Label**       | `Service type`                                         | `Tipo de servicio`                                               | Verified |
| **Service Row Value**       | `Junk Removal`                                         | `Retiro de objetos`                                              | Verified |
| **Access Row Label**        | `Pickup access`                                        | `Acceso de recogida`                                             | Verified |
| **Access Row Value**        | `Residential driveway · Details to confirm`            | `Entrada residencial · Detalles pendientes`                      | Verified |
| **Address Rule Title**      | `Address rule`                                         | `Regla de dirección`                                             | Verified |
| **Rule Point 1**            | `Address must be within active service in Arizona.`    | `La dirección debe estar dentro del servicio activo en Arizona.` | Verified |
| **Rule Point 2**            | `Destination added only if service requires delivery.` | `Solo se añade destino si el servicio requiere entrega.`         | Verified |
| **Primary CTA**             | `Confirm pickup address`                               | `Confirmar dirección de recogida`                                | Verified |
| **Secondary CTA 1**         | `Add another address   ›`                              | `Añadir otra dirección   ›`                                      | Verified |
| **Secondary CTA 2**         | `Moving drop-off example   ›`                          | `Ejemplo de destino de mudanza   ›`                              | Verified |
| **Demo Disclaimer**         | `CLIENT DEMO · FRONTEND ONLY`                          | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`             | Verified |
| **Notice Dismiss**          | `Dismiss`                                              | `Cerrar`                                                         | Verified |

---

## 5. Service Catalog Integrity

HAULIX strictly limits active booking services to the 7 canonical services defined in `C15_SERVICES`:

1. `junk-removal` (`Retiro de objetos`)
2. `moving` (`Mudanza`)
3. `furniture-pickup` (`Recogida de muebles`)
4. `appliance-removal` (`Retiro de electrodomésticos`)
5. `mattress-removal` (`Retiro de colchones`)
6. `garage-cleanout` (`Limpieza de garaje`)
7. `store-pickup` (`Recogida en tienda`)

When an unsupported service ID (e.g., `commercial-freight`) is passed in query parameters:

- `isUnsupported` is flagged as `true`.
- The service defaults cleanly to `junk-removal` (`Retiro de objetos`).
- A prominent, honest banner is displayed informing the user that the service is unrecognized and has defaulted safely.

---

## 6. Physical Android QA Verification

All physical QA was conducted on a live Android device (**Realme Note 60**, model `RMX3930`, Android 15, serial `0B04731X200003BB`) running the latest frontend code via Expo Go.

### Screenshot Matrix (`docs/qa/c17/`)

|   #    | File Name                                  | Screen State & Verification Description                                                                                            |  Dimensions   |   Size   |
| :----: | :----------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :-----------: | :------: |
| **01** | `android-C17-es-top.png`                   | Spanish C17 initial view with pinned header, step chip, heading, Bryan Lopez context chip, and default Home address selected.      | 720 × 1600 px | 313.5 KB |
| **02** | `android-C17-es-address-selected.png`      | Toggling to secondary address (`Casa de un familiar`), showing lime active radio check indicator and updated selection.            | 720 × 1600 px | 314.0 KB |
| **03** | `android-C17-es-instructions-and-rule.png` | Mid-screen view showing localized instructions, Bryan Lopez contact info, localized service type, access detail, and rule card.    | 720 × 1600 px | 287.7 KB |
| **04** | `android-C17-es-action-buttons.png`        | Bottom view displaying all 3 Spanish action CTAs and the localized demo footer disclaimer.                                         | 720 × 1600 px | 295.6 KB |
| **05** | `android-C17-es-back-visible-scrolled.png` | Verifying the pinned Back Button in the header remains fully visible and operable during deep vertical scrolling.                  | 720 × 1600 px | 287.7 KB |
| **06** | `android-C17-es-C18-notice.png`            | Tapping `Confirmar dirección de recogida` triggers honest upcoming notice for C18 Service Intake.                                  | 720 × 1600 px | 320.2 KB |
| **07** | `android-C17-es-C17A-notice.png`           | Tapping `Añadir otra dirección   ›` triggers honest upcoming notice for C17-A Add Address.                                         | 720 × 1600 px | 323.0 KB |
| **08** | `android-C17-es-C17D-notice.png`           | Tapping `Ejemplo de destino de mudanza   ›` triggers honest upcoming notice for C17-D Moving Destination.                          | 720 × 1600 px | 320.4 KB |
| **09** | `android-C16-es-to-C17.png`                | Full forward flow navigation: Tapping `Usar esta ubicación` on Spanish C16 navigates seamlessly into Spanish C17.                  | 720 × 1600 px | 313.7 KB |
| **10** | `android-C17-es-back-to-C16.png`           | Full backward navigation: Tapping header Back or pressing Android system Back returns cleanly to Spanish C16 with state preserved. | 720 × 1600 px | 295.4 KB |
| **11** | `android-C17-es-invalid-service.png`       | Service catalog integrity: Passing `service=commercial-freight` displays truthful banner and falls back to `Retiro de objetos`.    | 720 × 1600 px | 342.1 KB |
| **12** | `android-C17-en-regression.png`            | English C17 regression check: Switching to English restores Sarah Mitchell profile, English headings, and English labels.          | 720 × 1600 px | 329.1 KB |

---

## 7. Status of C16 Spanish Android QA

Per the project instructions, the status of **C16 Spanish (Phase 03.08)** is reported separately:

- **Implementation Status:** 100% complete (`apps/customer/app/(app)/service-area.tsx`, `packages/i18n/src/locales/es.ts`).
- **Automated Tests:** 12/12 unit tests passing in `service-area.test.tsx`.
- **Flow Verification:** In this phase (Phase 03.10), Spanish C16 was actively loaded on the physical Realme Note 60 device to verify C16 -> C17 navigation (`android-C16-es-to-C17.png`) and C17 -> C16 Back navigation (`android-C17-es-back-to-C16.png`).
- **Physical C16 Standalone QA Artifacts:** Located in `docs/qa/c16/` and documented in `docs/ANDROID_QA_C16_ES.md`. Full visual and tactile parity with English C16 was reconfirmed during bidirectional navigation testing.

---

## 8. Automated Quality Suite Verification

### 8.1. Biome Check (`pnpm check`)

```
$ biome check .
apps/customer/app/(app)/pickup-address.tsx:391:25 lint/complexity/noExcessiveCognitiveComplexity (warning score 23, max 15)
Checked 234 files in 111ms. No fixes applied.
Found 0 errors, 1 warning.
```

### 8.2. TypeScript Strict Typecheck (`pnpm typecheck`)

```
$ turbo run typecheck
• Packages in scope: @haulix/customer, @haulix/design-tokens, @haulix/driver, @haulix/i18n, @haulix/logger, @haulix/ui, @haulix/utils
• Running typecheck in 7 packages
Tasks: 7 successful, 7 total (0 errors)
```

### 8.3. Workspace Unit & Integration Tests (`pnpm test`)

```
$ turbo run test
• @haulix/customer: 14 test suites, 176 passed
• @haulix/i18n: 1 test suite, 26 passed
• @haulix/driver: 2 test suites, 7 passed
• @haulix/logger: 1 test suite, 8 passed
• @haulix/utils: 2 test suites, 21 passed
• @haulix/design-tokens: 1 test suite, 4 passed
Tasks: 7 successful, 7 total (242 tests passed, 0 failed)
```

### 8.4. Package Manager & Dependency Health (`pnpm doctor`)

```
✓ Versions: pnpm 11.25.0, Node.js 26.0.0
✓ Install method: @pnpm/exe
✓ Filesystem: available: hardlink
✓ Registry connectivity: https://registry.npmjs.org/ (474ms)
✓ Install smoke test: offline "file:" install linked its dependency
All checks passed
```

---

## 9. Strict Scope Adherence & Hard Stop Confirmation

- **C17 Spanish Localization ONLY:** Fully completed and verified.
- **No C17-A (Add Address):** Not implemented. Truthful notice displayed.
- **No C17-D (Moving Destination):** Not implemented. Truthful notice displayed.
- **No C18 (Service Intake):** Not implemented. Truthful notice displayed.
- **No Backend/Driver Changes:** Purely frontend customer application changes.
- **Stop Condition:** Work is complete; stopping cleanly.
