# HAULIX Customer App — Phase 03.16 Final Completion Report

## C17-D Moving Drop-off Destination — Spanish Localization ONLY

**Date:** 2026-11-17  
**Status:** Completed & Physically Verified on Android  
**Platform:** React Native (Expo Router v4, React Native 0.76.7, NativeWind v4, Strict TypeScript)  
**Physical Test Device:** Realme Note 60 (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi)  
**Authoritative Spanish Figma Node:** `974:9628` (430 × 1340 px, `C17-D-ES · Destino de mudanza / W02 [LOCALIZACIÓN]`)  
**English Counterpart Node:** `382:744` (430 × 1340 px, `C17-D · Moving destination / W02 [BK-02, SV-14]`)  
**Prototype Reference Node:** `977:9192` (Spanish C18-M Moving Intake — reference only, not implemented)  
**Route:** [apps/customer/app/(app)/moving-destination.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/app/(app)/moving-destination.tsx)  
**Scope Boundary:** Spanish localization for C17-D ONLY. STRICT HARD STOP OBSERVED.

---

## 1. Executive Summary

Phase 03.16 delivers the complete **Spanish localization and physical Android QA verification** for **C17-D Moving Drop-off Destination** (`C17-D-ES · Destino de mudanza`) in the HAULIX Customer App.

Following the established HAULIX frontend development workflow:

1. **Mandatory Figma MCP Direct Inspection:** Inspected authoritative Spanish Figma frame `974:9628` (430 × 1340 px) directly using `figma_figma` MCP tools (`get_metadata`, `get_design_context`, and reference screenshot retrieval).
2. **Single Canonical Route Reused:** Maintained the single canonical route [apps/customer/app/(app)/moving-destination.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/app/(app)/moving-destination.tsx) without duplicate locale files (no `moving-destination-es.tsx`), while strictly preserving English C17-D behavior and regression test suites.
3. **Dynamic Customer Profile Isolation:** Dynamically bound the Spanish customer context pill to `"BRYAN LOPEZ MENDOZA · HX-DEMO-MOVE-1034"`, strictly isolated from the English profile (`SARAH JANE MITCHELL · HX-DEMO-MOVE-1034`). The illustrative name "Daniel Ruiz" from Figma was treated purely as concept placeholder copy.
4. **Moving Service Guard & Non-Moving Disclaimer:** Moving-only drop-off rules enforced cleanly. Selecting non-moving services (e.g. `junk-removal`) renders an honest, non-mutating preview notice in Spanish without modifying the active upstream service state.
5. **State Integrity & C17 Upstream Repair:** Fixed upstream C17 `handleMovingDropoff` navigation to preserve the actual user-selected address ID rather than defaulting to `relatives-residence`. Origin address (`1234 E Example Lane`) is dynamically reflected in the Section A summary card.
6. **Automated Verification:** All checks clean across 7 packages — **300/300 tests passing across 23 test suites**, Biome check clean (0 errors, 4 pre-existing warnings), TypeScript clean (0 errors), and `pnpm doctor` healthy.
7. **Physical Android QA Verification:** 15 genuine high-resolution Android screenshots captured on a physical Realme Note 60 device running the latest Expo development build.

---

## 2. Figma MCP Direct Inspection Evidence

The authenticated `figma_figma` MCP was invoked with the mandatory `figma-design-to-code` skill. Exact measurements, hierarchy, typography, colors, and layout structure were extracted directly from authoritative node `974:9628`.

### 2.1 Authoritative Node Specifications

| Property                 | Spanish Figma Specification (Node `974:9628`)            | English Figma Reference (Node `382:744`)               | HAULIX Implementation                                       |
| :----------------------- | :------------------------------------------------------- | :----------------------------------------------------- | :---------------------------------------------------------- |
| **Frame Name**           | `C17-D-ES · Destino de mudanza / W02 [LOCALIZACIÓN]`     | `C17-D · Moving destination / W02 [BK-02, SV-14]`      | `MovingDestinationScreen`                                   |
| **Dimensions**           | 430 × 1340 px                                            | 430 × 1340 px                                          | Responsive ScrollView with 430 px max container             |
| **Step Indicator**       | `W02 · SERVICIOS Y SOLICITUD` / `C17-D`                  | `W02 · SERVICE DISCOVERY & INTAKE / C17-D`             | Header step eyebrow (`text-xs uppercase tracking-wider`)    |
| **Screen Title**         | `¿Dónde se realiza la entrega?`                          | `Where is the drop-off?`                               | Inter 28px bold, `#FFFFFF`                                  |
| **Screen Subtitle**      | `La mudanza requiere origen y destino validados.`        | (Omitted / implied in English)                         | 14px regular, `#BACAC2` (rendered when localized)           |
| **Customer Chip**        | Illustrative Daniel Ruiz in concept                      | `SARAH JANE MITCHELL · HX-DEMO-MOVE-1034`              | `BRYAN LOPEZ MENDOZA · HX-DEMO-MOVE-1034` (dynamic Spanish) |
| **Origin Section Title** | `Recogida` (Clean title without A/B/C letter)            | `A. CONFIRMED PICKUP ORIGIN`                           | `Recogida` in Spanish; preserves A/B/C in English           |
| **Origin Label**         | `Origen`                                                 | `Pickup location (selected in C17)`                    | Dynamic binding to selected C17 address                     |
| **Destination Section**  | `Destino`                                                | `B. MOVING DROP-OFF DESTINATION`                       | Structured card grid with 4 rows                            |
| **Drop-off Address**     | `Dirección de entrega`: `5678 N Demo Avenue`             | `Drop-off address`: `5678 N Demo Avenue`               | Elevated surface container with `#35403B` border            |
| **City / State / ZIP**   | `Ciudad / estado / código postal`: `Phoenix, AZ 85012`   | `City / State / ZIP`: `Phoenix, AZ 85012`              | Two-line field layout matching Figma                        |
| **Destination Type**     | `Tipo de destino`: `Residencial · Segundo piso`          | `Destination type`: `Residential · 2nd floor`          | Localized string resolution via `@haulix/i18n`              |
| **Elevator Access**      | `Ascensor`: `No · Revisar escaleras`                     | `Elevator`: `No · Stairs need review`                  | Localized string resolution via `@haulix/i18n`              |
| **Safety Section Title** | `Se aplican controles de manejo seguro`                  | `C. MOVING DROP-OFF DETAILS`                           | Verbatim Spanish title matching Figma                       |
| **Safety Badge**         | `Revisión necesaria`                                     | `Review required`                                      | `#FFC85A` badge with original amber checkmark               |
| **Safety Description**   | `Capacidad, escaleras y personal se evalúan al cotizar.` | (Integrated with check item)                           | 13px Inter regular `#BACAC2`                                |
| **Primary CTA**          | `Continuar solicitud de mudanza`                         | `Continue moving intake`                               | `#BAFF42` Lime CTA (16px Inter SemiBold, `#0D1110` text)    |
| **Secondary CTA**        | `Volver a dirección de origen   ›`                       | `Return to pickup address   ›`                         | Elevated surface container with `#35403B` border            |
| **Footer Disclosures**   | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`     | `DEMO ONLY  ·  No confirmed booking, rates or payment` | Centered 12px Inter `#7A8C85`                               |
| **Footer SRS Notice**    | `SRS  BK-02, SV-14  ·  430 px / desplazamiento vertical` | `SRS  BK-02, SV-14  ·  430 px / vertical scroll`       | Centered 12px Inter `#7A8C85`                               |

### 2.2 Visual Assets & Checkmark Vectors

- Figma reference screenshots:
  - Spanish Reference: `docs/qa/c17d/figma-C17D-es-reference.png` (50,890 bytes).
  - English Reference: `docs/qa/c17d/figma-C17D-en-reference.png` (49,484 bytes).
- Vector Icons (Reused from [C17Icons.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/components/discovery/C17Icons.tsx)):
  - `C17DOriginCheckIcon`: Lime `#BAFF42` completion checkmark (17×17, `M2.5 8.5L6.5 12.5L14.5 4.5`).
  - `C17DReviewCheckIcon`: Amber `#FFC85A` safety review checkmark (18×18, `M3 9.75L6.75 13.5L15 5.25`).

---

## 3. Architecture & Implementation

### 3.1 Single Canonical Route

The screen is implemented in a single canonical route file:

- File: [apps/customer/app/(app)/moving-destination.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/app/(app)/moving-destination.tsx)
- No duplicate route files (no `moving-destination-es.tsx`).
- Responsive layout supporting narrow screens, safe areas, and dynamic text scaling.

```tsx
// Localized destination details resolution
const destinationType =
  params.destinationType ??
  (t("c17d.destinationTypeValue") ||
    t("c17d.destTypeValue") ||
    C17D_DEFAULT_DESTINATION.destinationType);

const elevatorAccess =
  params.elevatorAccess ??
  (t("c17d.elevatorValue") ||
    t("c17d.destElevatorValue") ||
    C17D_DEFAULT_DESTINATION.elevatorAccess);
```

### 3.2 Dynamic Customer Profile Resolution

- English: `SARAH JANE MITCHELL · HX-DEMO-MOVE-1034`
- Spanish: `BRYAN LOPEZ MENDOZA · HX-DEMO-MOVE-1034`
- Isolates demo customer profiles strictly by locale using the reactive profile hook and `C17D_DEMO_CONSTANTS.defaultBookingId`.

### 3.3 Upstream C17 Integration & State Repair

Updated [apps/customer/app/(app)/pickup-address.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/app/(app)/pickup-address.tsx):

- `handleMovingDropoff`:

  ```tsx
  const handleMovingDropoff = () => {
    router.push({
      pathname: "/moving-destination",
      params: {
        service: selectedService.id,
        selectedAddressId: selectedAddressId,
      },
    });
  };
  ```
- Fixed the previous default fallback to `relatives-residence`. Now passes the actual selected address ID (`home-default` = `1234 E Example Lane`).
- In Spanish C17, tapping `c17-moving-dropoff-btn` (`Ejemplo de entrega de mudanza   ›`) navigates cleanly to `/moving-destination` with full state preservation.

### 3.4 Demo Screen Navigator Registration

Registered in [DemoScreenNavigator.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/components/demo/DemoScreenNavigator.tsx):

- `id: "c17d-es"`
- `name: "C17-D · Destino de Mudanza (Español)"`
- `figmaNode: "Node 974:9628"`
- `route: "/moving-destination"`
- `locale: "es"`

---

## 4. Exact String Mapping & Localization

Dictionary strings were added to `@haulix/i18n` in [es.ts](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/packages/i18n/src/locales/es.ts) with full symmetry against [en.ts](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/packages/i18n/src/locales/en.ts):

| Dictionary Key                 | Spanish Value (Figma Node `974:9628`)                                                                                                                                                          |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `c17d.stepIndicator`           | `"W02 · SERVICIOS Y SOLICITUD"`                                                                                                                                                                |
| `c17d.stepSub`                 | `"  /  C17-D"`                                                                                                                                                                                 |
| `c17d.title`                   | `"¿Dónde se realiza la entrega?"`                                                                                                                                                              |
| `c17d.subtitle`                | `"La mudanza requiere origen y destino validados."`                                                                                                                                            |
| `c17d.pickupSectionTitle`      | `"Recogida"`                                                                                                                                                                                   |
| `c17d.labelOrigin`             | `"Origen"`                                                                                                                                                                                     |
| `c17d.destinationSectionTitle` | `"Destino"`                                                                                                                                                                                    |
| `c17d.labelDropoffAddress`     | `"Dirección de entrega"`                                                                                                                                                                       |
| `c17d.dropoffAddressValue`     | `"5678 N Demo Avenue"`                                                                                                                                                                         |
| `c17d.labelCityStateZip`       | `"Ciudad / estado / código postal"`                                                                                                                                                            |
| `c17d.cityStateZipValue`       | `"Phoenix, AZ 85012"`                                                                                                                                                                          |
| `c17d.labelDestinationType`    | `"Tipo de destino"`                                                                                                                                                                            |
| `c17d.destinationTypeValue`    | `"Residencial · Segundo piso"`                                                                                                                                                                 |
| `c17d.labelElevator`           | `"Ascensor"`                                                                                                                                                                                   |
| `c17d.elevatorValue`           | `"No · Revisar escaleras"`                                                                                                                                                                     |
| `c17d.safetySectionTitle`      | `"Se aplican controles de manejo seguro"`                                                                                                                                                      |
| `c17d.reviewRequiredBadge`     | `"Revisión necesaria"`                                                                                                                                                                         |
| `c17d.safetyDescription`       | `"Capacidad, escaleras y personal se evalúan al cotizar."`                                                                                                                                     |
| `c17d.continueCta`             | `"Continuar solicitud de mudanza"`                                                                                                                                                             |
| `c17d.returnPickupCta`         | `"Volver a dirección de origen   ›"`                                                                                                                                                           |
| `c17d.footerDemo`              | `"SOLO DEMO · Sin reserva, tarifa ni pago confirmado"`                                                                                                                                         |
| `c17d.footerSrs`               | `"SRS  BK-02, SV-14  ·  430 px / desplazamiento vertical"`                                                                                                                                     |
| `c17d.noticeC18M`              | `"La solicitud de mudanza (C18-M) está programada para una próxima fase."`                                                                                                                     |
| `c17d.noticeNonMoving`         | `"El destino de entrega solo aplica a servicios de Mudanza. Actualmente tienes seleccionado {{service}}. Esta pantalla muestra una vista previa ilustrativa sin modificar tu reserva activa."` |

### 4.1 Section Title Audit Note

In Spanish Figma node `974:9628`, section headings do not have artificial A/B/C letter prefixes (they are `Recogida`, `Destino`, and `Se aplican controles de manejo seguro`). The Spanish implementation adheres strictly to Figma text without inventing lettering, while English mode preserves `A. CONFIRMED PICKUP ORIGIN`, `B. MOVING DROP-OFF DESTINATION`, and `C. MOVING DROP-OFF DETAILS`.

---

## 5. Automated Verification Results

All automated checks passed cleanly across the entire monorepo:

### 5.1 Biome Linter & Formatter (`pnpm check`)

- **238 files checked**.
- **0 errors**.
- **4 pre-existing warnings** (cognitive complexity warnings in `PickupAddressScreen`, `AddPickupAddressScreen`, and `EditProfileScreen`).
- `MovingDestinationScreen` cognitive complexity: **Clean (0 warnings)**.
- Full compliance with Smart App Control / WDAC via `@biomejs/wasm-nodejs` runner.

### 5.2 TypeScript Compilation (`pnpm typecheck`)

- Checked all 7 workspace packages (`@haulix/customer`, `@haulix/design-tokens`, `@haulix/driver`, `@haulix/i18n`, `@haulix/logger`, `@haulix/ui`, `@haulix/utils`).
- **0 errors**.

### 5.3 Automated Jest Test Suite (`pnpm test`)

- **300 passed across 23 test suites (100% pass rate)**.
- Customer App: 17 test suites passed (229 tests passed).
- i18n Package: 1 test suite passed (32 tests passed, including dedicated C17-D Spanish verbatim checks).
- Driver, Utils, Logger, Design Tokens: All 5 test suites passed (39 tests passed).
- New unit tests in [moving-destination.test.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/__tests__/moving-destination.test.tsx) cover:
  1. Default Spanish rendering with Bryan Lopez Mendoza profile.
  2. Spanish section headers (`Recogida`, `Destino`, `Se aplican controles de manejo seguro`).
  3. Four destination field rows (`Dirección de entrega`, `Ciudad / estado / código postal`, `Tipo de destino`, `Ascensor`).
  4. Safety review card with `Revisión necesaria` badge.
  5. Action buttons and footer disclosures.
  6. Return to pickup address navigation.
  7. Upcoming C18-M notice banner upon tapping primary CTA.
  8. Non-moving service guard disclaimer without mutating active service.
  9. English mode regression parity.

### 5.4 Environment Health (`pnpm doctor`)

- All checks passed (pnpm 11.25.0, Node.js 26.0.0, registry, hardlinks).

---

## 6. Physical Android QA Verification

All physical QA tests were performed on a connected **Realme Note 60** running Android 15 against the live Expo development server on port 8085.

### QA Screenshots in `docs/qa/c17d/`

|  #  | Filename                                        | Description                                                                                    |   Size    |
| :-: | :---------------------------------------------- | :--------------------------------------------------------------------------------------------- | :-------: |
|  1  | `android-C17D-es-initial.png`                   | Spanish C17-D initial view: FlowHeaderBack, Step Indicator, Title, Subtitle, and Profile Pill  | 144,747 B |
|  2  | `android-C17D-es-pickup-section.png`            | Origin section (`Recogida`) showing confirmed pickup address (`1234 E Example Lane`)           | 144,511 B |
|  3  | `android-C17D-es-destination-section.png`       | Destination section (`Destino`) with 4 localized rows (Address, City, Type, Elevator)          | 136,696 B |
|  4  | `android-C17D-es-safety-review.png`             | Safety controls card (`Se aplican controles de manejo seguro`) with `Revisión necesaria` badge | 136,696 B |
|  5  | `android-C17D-es-action-buttons.png`            | Primary CTA (`Continuar solicitud de mudanza`), Secondary CTA, and Footer Disclosures          | 139,671 B |
|  6  | `android-C17D-es-back-visible-scrolled.png`     | Pinned back button remains visible and interactive when scrolled to bottom of screen           | 139,937 B |
|  7  | `android-C17-es-to-C17D.png`                    | Spanish C17 navigating to C17-D via `Ejemplo de entrega de mudanza   ›`                        | 155,915 B |
|  8  | `android-C17D-es-return-to-C17.png`             | Secondary CTA (`Volver a dirección de origen   ›`) returns smoothly to Spanish C17             | 165,528 B |
|  9  | `android-C17D-es-android-back.png`              | Android system hardware back press / gesture returns cleanly from C17-D to C17                 | 155,246 B |
| 10  | `android-C17D-es-C18M-notice.png`               | Tapping `Continuar solicitud de mudanza` triggers honest upcoming C18-M notice banner          | 147,277 B |
| 11  | `android-C17D-es-selected-pickup-preserved.png` | Confirmed origin displays user-selected address dynamically preserved from C17                 | 144,318 B |
| 12  | `android-C17D-es-nonmoving-preview.png`         | Non-moving service renders honest informational preview banner without mutating active booking | 161,542 B |
| 13  | `android-C17D-es-narrow-safe-area.png`          | Responsive layout, padding, and safe area compliance on Realme 720×1600 px display             | 144,808 B |
| 14  | `android-C17D-en-regression.png`                | English C17-D regression verification showing Sarah Mitchell profile and English copy          | 159,785 B |
| 15  | `android-C17-es-regression.png`                 | Spanish C17 regression verification with both address cards and upcoming notice interactions   | 164,998 B |

---

## 7. Scope Boundaries & Strict Hard Stop

- **Phase 03.16 Scope:** Spanish C17-D localization, upstream C17 integration, automated tests, and physical Android QA. **COMPLETED.**
- **C18-M Moving Intake:** Scheduled for future phase. NOT implemented.
- **C18-J Junk Removal Intake:** Scheduled for future phase. NOT implemented.
- **W03 Service Scheduling & Payment:** Untouched.
- **Driver App:** Untouched.
- **Neon Backend / Database:** Zero simulated backend states, fake APIs, or unauthorized mutations.

---

## 8. Git Handoff & Remote Push Verification

All authorized source files, test suites, documentation, and physical Android QA screenshots have been committed and pushed to the authorized GitHub repository via authenticated SSH:

- **Branch Name:** `main`
- **Authorized Remote Repository:** `git@github.com:mridha-rakib/haulix-mobile.git` (HTTPS: `https://github.com/mridha-rakib/haulix-mobile.git`)
- **Primary Phase Commit Hash:** `7b917676c46411e152b227be9bf6bad26f17cabb`
- **SSH Authentication Status:** Verified (`Hi mridha-rakib! You've successfully authenticated...`)
- **Remote Push Result:**

  ```text
  To github.com:mridha-rakib/haulix-mobile.git
     2989abe..7b91767  main -> main
  ```
- **Remote Branch Verification:**
  `git ls-remote origin refs/heads/main` confirmed remote `main` branch points to `7b917676c46411e152b227be9bf6bad26f17cabb`.

**PHASE 03.16 IS FULLY COMPLETE, VERIFIED ON ANDROID, PUSHED TO GITHUB, AND READY FOR HANDOFF. STRICT HARD STOP OBSERVED.**
