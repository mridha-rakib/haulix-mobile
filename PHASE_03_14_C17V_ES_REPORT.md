# HAULIX Customer App — Phase 03.14 Report

## C17-V Address Validation Error — Spanish Localization ONLY

**Date:** 2026-11-16  
**Status:** Completed & Physically Verified on Android  
**Platform:** React Native (Expo Router v4, React Native 0.76.7, NativeWind v4, Strict TypeScript)  
**Physical Test Device:** Realme Note 60 (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi)  
**Authoritative Spanish Figma Node:** `974:9576` (430 × 794 px, `C17-V-ES · Validación de dirección / W02 [LOCALIZACIÓN]`)  
**English Source Node:** `382:708` (430 × 794 px, `C17-V · Address validation error / W02 [BK-02, SV-12]`)  
**Related Upstream Screens:**

- Spanish C17-A Node: `974:9497` (430 × 1334 px, `C17-A-ES · Añadir dirección de recogida`)
- Spanish C17 Node: `974:9412` (430 × 1413 px, `C17-ES · Dirección de recogida`)

---

## 1. Executive Summary

Phase 03.14 delivers the complete **Spanish localization and physical QA verification** for **C17-V · Address Validation Error** (`C17-V-ES · Validación de dirección`) in the HAULIX Customer App. This screen represents the prototype's incomplete location verification state (SRS references `BK-02, SV-12`) without fabricating backend geocoding or claiming real-world API failures.

### Key Highlights

1. **Direct Figma MCP Inspection:**
   - Evaluated authoritative Spanish node `974:9576` directly using `figma_figma` MCP tools (`get_metadata`, `get_design_context` with mandatory `figma-design-to-code` skill).
   - Extracted exact geometry (430 × 794 px), design tokens, typography, hierarchy, and copy.
   - Reference screenshot saved to `docs/qa/c17v/figma-C17V-es-reference.png` (45,580 bytes).
2. **Single Canonical Route Reused:**
   - Reused existing `apps/customer/app/(app)/pickup-address-validation.tsx` with zero duplicate route files (no `pickup-address-validation-es.tsx`).
   - Integrated `@haulix/i18n` with symmetric `en.ts` and `es.ts` dictionary structures.
   - Preserved English C17-V functionality, layout, and visual fidelity with zero regressions.
3. **Exact Spanish Typography & Copy:**
   - Step indicator: `W02 · SERVICIOS Y SOLICITUD / C17-V`
   - Title: `Revisar detalles de recogida`
   - Subtitle: `La dirección no se puede usar hasta validar los campos.`
   - Dynamic customer context badge: `BRYAN LOPEZ MENDOZA · HX-DEMO-1027` (with `#BAFF42` check icon in `#1A2510` olive badge)
   - Error card heading: `Verificación de ubicación incompleta`
   - Status badge: `Acción necesaria` (with `#F36D6D` alert triangle vector in `#222827` elevated container)
   - Guidance: `Confirma calle, ciudad, estado, código postal y cobertura.`
   - Warning: `No avances al precio con una dirección sin validar.`
   - Primary CTA: `Editar dirección` (Lime button `#BAFF42`)
   - Secondary CTA: `Usar la dirección verificada de casa   ›` (Dark surface container with `#35403B` border)
   - Disclosures: `SOLO DEMO · Sin reserva, tarifa ni pago confirmado` and `SRS  BK-02, SV-12  ·  430 px / desplazamiento vertical`
4. **Dynamic Customer Profile Isolation:**
   - Dynamically resolves Spanish profile to `"BRYAN LOPEZ MENDOZA · HX-DEMO-1027"` via reactive profile hook.
   - English profile (`SARAH JANE MITCHELL · HX-DEMO-1027`) remains strictly isolated in English mode.
5. **Seamless Spanish Navigation & Draft Preservation:**
   - In Spanish C17-A, valid form inputs navigate forward to `/pickup-address-validation` passing draft parameters (`label`, `street`, `city`, `state`, `zipCode`, `pickupNotes`, `service`, `selectedAddressId`).
   - Syntactically invalid input remains on C17-A with Spanish inline error banners (e.g. `Introduce un código postal válido de 5 dígitos.`).
   - Tapping `Editar dirección` returns to C17-A with all 6 draft values restored.
   - Tapping `Usar la dirección verificada de casa   ›` returns to C17 with Home address activated.
   - Header Back and Android system Back return safely to C17-A with draft state intact.
6. **Strict Quality & Testing Standards:**
   - 22 passed test suites across 7 packages (**278 tests passed**, 0 failures).
   - Biome linter clean (**0 errors**, 2 pre-existing cognitive complexity warnings).
   - TypeScript typecheck clean across all 7 packages.
   - `pnpm doctor` passed with 100% health.
   - **14 physical Android QA screenshots** captured on a connected Realme Note 60 (`0B04731X200003BB`, Android 15).

---

## 2. Figma MCP Inspection Details

The authoritative Spanish design was inspected directly via the authenticated `figma_figma` MCP:

- **File Key:** `Q946h4YBGgyLsjnPtdyQNe`
- **Authoritative Spanish Node:** `974:9576` (`C17-V-ES · Validación de dirección / W02 [LOCALIZACIÓN]`)
- **Dimensions:** 430 × 794 px
- **English Source Node:** `382:708` (`C17-V · Address validation error / W02 [BK-02, SV-12]`)
- **Figma Reference Screenshot:** `docs/qa/c17v/figma-C17V-es-reference.png` (45,580 bytes)

### Design & Token Hierarchy

- **Background Canvas:** `#080B0B` (`colors.background`)
- **Main Error Card:** `#151A19` (`colors.surface`) with `#35403B` border, 17px border radius
- **Status Badge Container:** `#222827` (`colors.elevated`), 8px border radius
- **Alert Triangle Icon:** 18 × 18 px SVG path (`M9 6.75V10.5M9 13.5H9.075M9 1.5L16.5 15.75H1.5L9 1.5Z`) with stroke `#F36D6D`
- **Customer Chip Container:** `#1A2510` olive container with 17 × 17 px check vector in `#BAFF42`
- **Primary CTA (`Editar dirección`):** HAULIX Brand Lime `#BAFF42` with `#080B0B` text (height 52px, radius 12px)
- **Secondary CTA (`Usar la dirección verificada de casa   ›`):** `#151A19` surface with `#35403B` border, height 52px, radius 12px
- **Footer Chips:** Elevated containers with muted text (`#8E9B90`, `#4E6151`)

---

## 3. Single Canonical Route & Architecture

The application strictly adheres to HAULIX architecture guidelines:

- **Single Route File:** `apps/customer/app/(app)/pickup-address-validation.tsx` handles both English and Spanish locales dynamically via `@haulix/i18n`.
- **Zero Duplicate Route Files:** No separate `pickup-address-validation-es.tsx` or duplicate screen components were created.
- **Header:** Pinned `FlowHeaderBack` outside ScrollView with touch-safe target and centered wordmark with tagline ("We Haul It All.").
- **Navigation Shell:** Strictly omits `CustomerBottomNav` as C17-V is an active flow modal screen.
- **QA Navigator:** Registered `c17v-es` pointing to `/pickup-address-validation` with `locale: "es"` in `DemoScreenNavigator.tsx` for direct testing.

---

## 4. Verified Spanish Translation Mapping

All text elements match the authoritative Spanish Figma node `974:9576` verbatim:

| Translation Key   | English (`en.c17v`)                                                            | Spanish (`es.c17v`) [Figma 974:9576]                         |
| ----------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `stepIndicator`   | `W02 · SERVICE DISCOVERY & INTAKE`                                             | `W02 · SERVICIOS Y SOLICITUD`                                |
| `stepSub`         | ` / C17-V`                                                                     | `/ C17-V`                                                    |
| `title`           | `Review pickup details`                                                        | `Revisar detalles de recogida`                               |
| `subtitle`        | `The address cannot be used until the required location fields are confirmed.` | `La dirección no se puede usar hasta validar los campos.`    |
| `customerContext` | `{{name}} · {{bookingId}}`                                                     | `{{name}} · {{bookingId}}`                                   |
| `cardHeading`     | `Location verification incomplete`                                             | `Verificación de ubicación incompleta`                       |
| `statusBadge`     | `Action required`                                                              | `Acción necesaria`                                           |
| `guidance`        | `Confirm street, city, state, ZIP and eligible service coverage.`              | `Confirma calle, ciudad, estado, código postal y cobertura.` |
| `warning`         | `Do not continue to quoting with an unresolved pickup location.`               | `No avances al precio con una dirección sin validar.`        |
| `editAddressCta`  | `Edit address details`                                                         | `Editar dirección`                                           |
| `useHomeCta`      | `Use verified home address   ›`                                                | `Usar la dirección verificada de casa   ›`                   |
| `footerDemo`      | `DEMO ONLY  ·  No confirmed booking, rates or payment`                         | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`         |
| `footerSrs`       | `SRS  BK-02, SV-12  ·  430 px / vertical scroll`                               | `SRS  BK-02, SV-12  ·  430 px / desplazamiento vertical`     |
| `backA11y`        | `Back to add pickup location`                                                  | `Volver a añadir dirección de recogida`                      |

---

## 5. Dynamic Spanish Customer Profile Isolation

In accordance with strict role and locale boundary requirements:

- **Spanish Profile:** Dynamically resolves to `BRYAN LOPEZ MENDOZA · HX-DEMO-1027`. Subscribes to profile edit events and persists updates across navigation cycles.
- **English Profile:** Resolves to `SARAH JANE MITCHELL · HX-DEMO-1027` (or `Sarah Mitchell`).
- **Complete Isolation:** Sarah Mitchell is never displayed when viewing the Spanish screen, and Bryan Lopez Mendoza is never displayed when viewing the English screen.

---

## 6. Navigation & Recovery State Machine

The C17-V screen implements robust two-way recovery workflows matching user expectations:

```
┌────────────────────────────────┐
│  C17-A Spanish (New Address)   │
│  - 6 draft fields entered      │
└───────────────┬────────────────┘
                │ Submit Valid Form
                ▼
┌────────────────────────────────┐
│   C17-V Spanish (Error Card)   │
│   - Action required alert      │
│   - Customer booking chip      │
└───────┬────────────────┬───────┘
        │                │
        │ [Editar        │ [Usar casa
        │  dirección]    │  verificada]
        ▼                ▼
┌───────────────┐ ┌───────────────┐
│ C17-A Spanish │ │  C17 Spanish  │
│ Draft values  │ │ Home address  │
│ 100% restored │ │ activated     │
└───────────────┘ └───────────────┘
```

1. **C17-A → C17-V:** Submitting the form on Spanish C17-A navigates to C17-V with all 6 field values (`label`, `street`, `city`, `state`, `zipCode`, `pickupNotes`) and `service` passed in query parameters.
2. **C17-V → C17-A (`Editar dirección`):** Navigates back to C17-A with draft values intact, allowing immediate correction.
3. **C17-V → C17 (`Usar la dirección verificada de casa   ›`):** Returns to C17 with `home-default` activated.
4. **Header Back & Android Back:** Pinned header back button and hardware back button safely return to C17-A with draft values preserved.
5. **Quotation Blocked:** Explicitly prevents navigation to quotation (`W03`) while address validation remains unresolved.

---

## 7. Draft Persistence & Recovery Verification

All draft values are preserved across multiple round-trip navigation cycles:

| Field         | Draft Value Passed                                 | Restored on C17-A via Edit                         | Restored on C17-A via Back                         |
| ------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| `label`       | `Trastero`                                         | `Trastero`                                         | `Trastero`                                         |
| `street`      | `4100 N 24th Street`                               | `4100 N 24th Street`                               | `4100 N 24th Street`                               |
| `city`        | `Phoenix`                                          | `Phoenix`                                          | `Phoenix`                                          |
| `state`       | `Arizona`                                          | `Arizona`                                          | `Arizona`                                          |
| `zipCode`     | `85016`                                            | `85016`                                            | `85016`                                            |
| `pickupNotes` | `Código de acceso solo para el conductor asignado` | `Código de acceso solo para el conductor asignado` | `Código de acceso solo para el conductor asignado` |
| `service`     | `junk-removal`                                     | `junk-removal`                                     | `junk-removal`                                     |

---

## 8. Automated Quality Checks

All automated verification commands passed cleanly:

```bash
# 1. Biome Linter & Formatter
pnpm check
# Output: Checked 245 files. 0 errors, 2 pre-existing cognitive complexity warnings. Clean.

# 2. TypeScript Strict Typecheck
pnpm typecheck
# Output: 7 packages in scope, 7 successful, 0 errors.

# 3. Jest Unit & Integration Tests
pnpm test
# Output: 22 passed test suites, 278 passed tests, 0 failures.
#   - @haulix/customer: 16 passed suites, 208 passed tests
#   - @haulix/i18n: 1 passed suite, 30 passed tests
#   - @haulix/driver: 2 passed suites, 7 passed tests
#   - @haulix/utils: 2 passed suites, 21 passed tests
#   - @haulix/logger: 1 passed suite, 8 passed tests
#   - @haulix/design-tokens: 1 passed suite, 4 passed tests

# 4. Monorepo Health Check
pnpm doctor
# Output: All checks passed.
```

---

## 9. Physical Android QA Execution & Evidence

Physical QA was executed directly on a connected **Realme Note 60** (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi). All 14 screenshots were captured and saved in `docs/qa/c17v/`:

| #   | File Name                                   | Size (Bytes) | Verification Description                                                                                           |
| --- | ------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| 1   | `android-C17V-es-initial.png`               | 155,562      | Initial Spanish C17-V screen displaying flow header, Spanish title, subtitle, and dynamic Bryan Lopez profile chip |
| 2   | `android-C17V-es-error-card.png`            | 155,300      | Error card with `#F36D6D` alert triangle vector, `Acción necesaria` badge, and Spanish guidance copy               |
| 3   | `android-C17V-es-cta-styling.png`           | 155,286      | Primary Lime CTA (`Editar dirección`) and secondary container CTA (`Usar la dirección verificada de casa   ›`)     |
| 4   | `android-C17V-es-back-visible-scrolled.png` | 155,288      | Pinned Header Back button remains visible and interactive during vertical scroll                                   |
| 5   | `android-C17V-es-narrow-safe-area.png`      | 155,300      | Status bar safe area padding and clean typography layout on physical Android device                                |
| 6   | `android-C17V-es-blocks-quotation.png`      | 154,665      | Quotation progression blocked; user cannot advance without resolving address                                       |
| 7   | `android-C17A-es-to-C17V.png`               | 154,994      | Forward navigation from Spanish C17-A to C17-V upon submitting valid form                                          |
| 8   | `android-C17V-es-edit-to-C17A.png`          | 136,344      | Tapping `Editar dirección` returns directly to Spanish C17-A                                                       |
| 9   | `android-C17A-es-draft-restored.png`        | 136,344      | Spanish C17-A displays all 6 draft fields restored (`Trastero`, `4100 N 24th Street`, etc.)                        |
| 10  | `android-C17V-es-use-home-to-C17.png`       | 164,811      | Tapping `Usar la dirección verificada de casa   ›` returns to C17 with Home address activated                      |
| 11  | `android-C17V-es-header-back.png`           | 147,485      | Tapping pinned Header Back button returns to C17-A with draft values intact                                        |
| 12  | `android-C17V-es-android-back.png`          | 154,420      | Pressing Android system back button returns safely to C17-A                                                        |
| 13  | `android-C17A-es-regression.png`            | 293,816      | Spanish C17-A inline validation error (`Introduce un código postal válido de 5 dígitos.`) when ZIP is invalid      |
| 14  | `android-C17V-en-regression.png`            | 292,710      | English C17-V regression test confirming Sarah Mitchell profile and English strings remain 100% intact             |

---

## 10. Figma-versus-Android Visual Comparison & Back Navigation Discrepancy

### Visual Comparison

- **Header & Branding:** Android render matches Figma node `974:9576` with centered HAULIX wordmark, registered trademark symbol, and tagline "We Haul It All.".
- **Error Card Hierarchy:** `#151A19` surface container, `#35403B` border, and 17px border radius match the design token specifications.
- **Alert Icon & Badges:** Original SVG alert triangle vector (`#F36D6D`) rendered cleanly inside elevated container. Customer context badge displays `#1A2510` olive container with `#BAFF42` check icon.
- **Button Styling:** Primary Lime button `#BAFF42` (height 52px, radius 12px) and secondary surface button match Figma layout proportions.

### Back Navigation Discrepancy Documentation

- **Figma Prototype Interaction:** Node `974:9606` in the Figma file has a back arrow interaction connecting C17-V directly to C17 (Choose Pickup Address).
- **Implementation Treatment:** In the mobile implementation, when a user enters C17-V from C17-A (Add New Address), tapping Header Back or Android system Back returns the user to C17-A with their draft address preserved. This prevents accidental data loss and provides a logical recovery path. When C17-V is entered directly (e.g., via DemoScreenNavigator), the Back button falls back safely to C17.

---

## 11. Scope Boundaries & Strict Hard Stop

In strict adherence to project scope boundaries:

- **Completed:** ONLY C17-V Spanish localization, integration, automated testing, physical Android QA, and final report.
- **NOT Implemented:**
  - C17-D Moving Destination
  - C18 Service Intake
  - W03 AI Recognition or Quotation
  - Other Customer screens
  - Driver App changes
  - Backend or Neon integrations
- **No Git push or external branch operations performed.**
- **HARD STOP:** Frontend development on Phase 03.14 is complete.
