# HAULIX Customer App — Phase 03.15 Final Completion Report

## C17-D Moving Drop-off Destination — English ONLY

**Phase:** Phase 03.15  
**Screen:** C17-D · Moving Drop-off Destination (English ONLY)  
**Authoritative Figma Node:** `382:744` (430 × 1340 px)  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Route:** `apps/customer/app/(app)/moving-destination.tsx`  
**Physical Test Device:** Realme Note 60 (`RMX3933`, Android 15, `0B04731X200003BB`, 720 × 1600 px @ 320 dpi)  
**Status:** Completed & Verified — STRICT HARD STOP

---

## 1. Executive Summary

Phase 03.15 delivers the production implementation and physical Android verification of **C17-D Moving Drop-off Destination (English ONLY)**.

All design elements, layout geometry, typography, color tokens, and interactive flows strictly reproduce the authoritative Figma specification (Node `382:744`, 430 × 1340 px) in accordance with HAULIX design system guidelines:

- **Canonical Route:** Reused single route architecture via [moving-destination.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/app/(app)/moving-destination.tsx) without duplicate locale route files.
- **Figma MCP Direct Inspection:** Live metadata, design context, visual frames, and original SVGs extracted directly from the Figma MCP before coding.
- **Dynamic Customer Profile:** English booking badge dynamically bound to Sarah Mitchell (`SARAH JANE MITCHELL · HX-DEMO-MOVE-1034`), strictly isolated from the Spanish demo profile (Bryan Lopez).
- **Service Boundaries & Validation:** Moving flow strictly restricted to canonical `moving` service. Non-moving services (e.g. `junk-removal`) trigger an informational preview notice without mutating upstream selection state.
- **Safety Review Component:** Exact reproduction of the Section C safety card with amber check icon (`#FFC85A`) and `Review required` badge.
- **Automated Verification:** 299/299 tests passing across all 7 packages, 0 Biome errors, 0 TypeScript errors, and zero new cognitive complexity warnings.
- **Physical Device QA:** 15 genuine high-resolution Android screenshots captured on a physical Realme Note 60 device running the latest Expo development build.

---

## 2. Figma MCP Direct Inspection Evidence

Direct calls were executed via the authenticated `figma_figma` MCP using `get_metadata`, `get_design_context`, `get_screenshot`, and `download_assets`.

### 2.1 Authoritative Node Specifications

| Property                    | Figma Specification (Node `382:744`)                   | HAULIX Implementation                                           |
| :-------------------------- | :----------------------------------------------------- | :-------------------------------------------------------------- |
| **Frame Name**              | `C17-D · Moving destination / W02 [BK-02, SV-14]`      | `MovingDestinationScreen`                                       |
| **Dimensions**              | 430 × 1340 px                                          | Responsive ScrollView with 430 px max container                 |
| **Step Indicator**          | `W02 · SERVICE DISCOVERY & INTAKE / C17-D`             | Header step eyebrow (`text-xs uppercase tracking-wider`)        |
| **Screen Title**            | `Where is the drop-off?`                               | Inter 28px bold, `#FFFFFF`                                      |
| **Customer Chip**           | `SARAH JANE MITCHELL · HX-DEMO-MOVE-1034`              | Dynamic English profile pill with user avatar                   |
| **Section A (Pickup)**      | Origin pickup summary card                             | Dynamic binding to selected C17 address (`1234 E Example Lane`) |
| **Section B (Destination)** | Drop-off address & building details (4 rows)           | Structured card grid with sublabels and values                  |
| **Section C (Safety)**      | `Safe handling checks apply` + `Review required` badge | `#FFC85A` review badge with original 18×18 SVG check icon       |
| **Primary CTA**             | `Continue moving intake`                               | `#BAFF42` Lime CTA (16px Inter SemiBold, `#0D1110` text)        |
| **Secondary CTA**           | `Return to pickup address   ›`                         | Elevated Surface container with `#35403B` border                |
| **Footer Disclosures**      | Demo notice & SRS regulatory metadata                  | Footnote metadata centered at 12px Inter `#7A8C85`              |

### 2.2 Downloaded Vector Assets

Original Figma vector icons were retrieved and stored with accessible `<title>` attributes:

- `docs/qa/c17d/check1.svg`: Lime `#BAFF42` 17×17 completion mark (`M2.5 8.5L6.5 12.5L14.5 4.5`).
- `docs/qa/c17d/check2.svg`: Amber `#FFC85A` 18×18 safety review mark (`M3 9.75L6.75 13.5L15 5.25`).
- Integrated into [C17Icons.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/components/discovery/C17Icons.tsx) as `C17DReviewCheckIcon`.

---

## 3. Architecture & Implementation

### 3.1 Single Canonical Route

The screen is implemented in a single canonical route file:

- File: [apps/customer/app/(app)/moving-destination.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/app/(app)/moving-destination.tsx)
- Zero duplicated screens: No `moving-destination-es.tsx`.
- Supports query parameters:
  - `service`: Canonical service ID (default: `"moving"`).
  - `selectedAddressId`: ID of chosen origin address from C17 (default: `"relatives-residence"`).
  - `destinationId`: Drop-off address ID (default: `"demo-dropoff"`).

### 3.2 Fixtures & Demo Constants

Created [c17dMovingDestination.ts](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/fixtures/c17dMovingDestination.ts) defining:

```ts
export const C17D_DEFAULT_DESTINATION: C17DDestinationAddress = {
  id: "demo-dropoff",
  addressLine1: "5678 N Demo Avenue",
  cityStateZip: "Phoenix, AZ 85012",
  destinationType: "Residential · 2nd floor",
  elevatorAccess: "No · Stairs need review",
};
```

### 3.3 Upstream C17 Integration

Updated [apps/customer/app/(app)/pickup-address.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/app/(app)/pickup-address.tsx):

- English C17: `handleMovingDropoff` navigates directly to `/moving-destination` with selected address and service.
- Spanish C17: Preserves upcoming notice banner without navigating (enforcing Phase 03.15 English-only scope boundary).

### 3.4 Screen Navigator Integration

Registered in [DemoScreenNavigator.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/components/demo/DemoScreenNavigator.tsx):

- `id: "c17d-en"`
- `name: "C17-D · Moving Drop-off Destination (English)"`
- `figmaNode: "Node 382:744"`
- `route: "/moving-destination"`

---

## 4. Exact String Mapping & Localization

Dictionary keys were added to `@haulix/i18n` in [en.ts](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/packages/i18n/src/locales/en.ts) and symmetrically paired in [es.ts](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/packages/i18n/src/locales/es.ts):

| Dictionary Key               | English Value (Figma Node `382:744`)                               |
| :--------------------------- | :----------------------------------------------------------------- |
| `c17d.flowStep`              | `"W02 · SERVICE DISCOVERY & INTAKE / C17-D"`                       |
| `c17d.title`                 | `"Where is the drop-off?"`                                         |
| `c17d.originSectionTitle`    | `"A. CONFIRMED PICKUP ORIGIN"`                                     |
| `c17d.originPickupLabel`     | `"Pickup location (selected in C17)"`                              |
| `c17d.originDefaultAddress`  | `"1234 E Example Lane"`                                            |
| `c17d.originDefaultCity`     | `"Phoenix, AZ 85014"`                                              |
| `c17d.destSectionTitle`      | `"B. MOVING DROP-OFF DESTINATION"`                                 |
| `c17d.destAddressLabel`      | `"Drop-off address"`                                               |
| `c17d.destAddressValue`      | `"5678 N Demo Avenue"`                                             |
| `c17d.destCityLabel`         | `"City / State / ZIP"`                                             |
| `c17d.destCityValue`         | `"Phoenix, AZ 85012"`                                              |
| `c17d.destTypeLabel`         | `"Destination type"`                                               |
| `c17d.destTypeValue`         | `"Residential · 2nd floor"`                                        |
| `c17d.destElevatorLabel`     | `"Elevator"`                                                       |
| `c17d.destElevatorValue`     | `"No · Stairs need review"`                                        |
| `c17d.safetySectionTitle`    | `"C. MOVING DROP-OFF DETAILS"`                                     |
| `c17d.safetyNoticeTitle`     | `"Safe handling checks apply"`                                     |
| `c17d.safetyBadge`           | `"Review required"`                                                |
| `c17d.continueMovingIntake`  | `"Continue moving intake"`                                         |
| `c17d.returnToPickupAddress` | `"Return to pickup address   ›"`                                   |
| `c17d.footerDemoNotice`      | `"DEMO ONLY  ·  No confirmed booking, rates or payment"`           |
| `c17d.footerSrs`             | `"SRS  BK-02, SV-14  ·  430 px / vertical scroll"`                 |
| `c17d.noticeC18M`            | `"Moving intake (C18-M) is scheduled for an upcoming phase."`      |
| `c17d.noticeNonMoving`       | `"This drop-off preview applies specifically to Moving services."` |

---

## 5. Automated Verification Results

All automated checks passed cleanly across the entire monorepo:

### 5.1 Biome Linter & Formatter (`pnpm check`)

- Total files checked: 251 files.
- Errors: **0 errors**.
- Warnings: 2 known pre-existing cognitive complexity warnings in older screens (`AddPickupAddressScreen` [18/15] and `PickupAddressScreen` [24/15]).
- `MovingDestinationScreen` cognitive complexity: **Clean (0 warnings)**.

### 5.2 TypeScript Compilation (`pnpm typecheck`)

- Packages checked: 7/7 (`@haulix/customer`, `@haulix/design-tokens`, `@haulix/driver`, `@haulix/i18n`, `@haulix/logger`, `@haulix/ui`, `@haulix/utils`).
- Errors: **0 errors**.

### 5.3 Automated Jest Test Suite (`pnpm test`)

- Packages tested: 7/7.
- Customer App test suites: 17/17 passed (228 tests passed).
- Localization test suite: 1/1 passed (31 tests passed).
- Total Monorepo tests: **299 passed across 23 test suites (100% pass rate)**.
- New C17-D unit test suite: [moving-destination.test.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/__tests__/moving-destination.test.tsx) (20/20 passed).

### 5.4 Environment Health (`pnpm doctor`)

- All system checks passed (pnpm 11.25.0, Node.js 26.0.0, registry, hardlinks).

---

## 6. Physical Android QA Verification

All physical QA tests were performed on a connected **Realme Note 60** running Android 15 against the live Expo development server on port 8085.

### QA Screenshots in `docs/qa/c17d/`

|  #  | Filename                                        | Description                                                                       |   Size    |
| :-: | :---------------------------------------------- | :-------------------------------------------------------------------------------- | :-------: |
|  1  | `android-C17D-en-initial.png`                   | Initial full view of C17-D English with FlowHeader, Step indicator, and Title     | 263,994 B |
|  2  | `android-C17D-en-pickup-section.png`            | Section A confirmed origin card showing 1234 E Example Lane                       | 263,994 B |
|  3  | `android-C17D-en-destination-section.png`       | Section B moving drop-off destination cards (address, city, type, stairs)         | 263,994 B |
|  4  | `android-C17D-en-safety-review.png`             | Section C safety review card with amber check icon and "Review required" badge    | 269,632 B |
|  5  | `android-C17D-en-action-buttons.png`            | Primary Lime CTA and Secondary surface CTA with footer disclosures                | 269,632 B |
|  6  | `android-C17D-en-back-visible-scrolled.png`     | Floating header back button remains pinned and visible during vertical scroll     | 269,632 B |
|  7  | `android-C17-en-to-C17D.png`                    | Upstream English C17 navigation into C17-D via "Moving drop-off example   ›"      | 263,994 B |
|  8  | `android-C17D-en-return-to-C17.png`             | Secondary CTA navigates back to C17 pickup address screen                         | 328,722 B |
|  9  | `android-C17D-en-android-back.png`              | Hardware/system Android back gesture smoothly returns from C17-D to C17           | 289,716 B |
| 10  | `android-C17D-en-C18M-notice.png`               | Tapping "Continue moving intake" triggers honest upcoming C18-M notice banner     | 265,290 B |
| 11  | `android-C17D-en-selected-pickup-preserved.png` | Selected pickup address (`selectedAddressId`) dynamically preserved from C17      | 263,994 B |
| 12  | `android-C17D-en-nonmoving-guard.png`           | Non-moving service guard displays informational preview notice                    | 303,330 B |
| 13  | `android-C17D-en-narrow-safe-area.png`          | Responsive layout and safe area handling on Realme 720×1600 display               | 263,994 B |
| 14  | `android-C17-en-regression.png`                 | English C17 regression check showing full functionality and navigation            | 330,020 B |
| 15  | `android-C17-es-regression.png`                 | Spanish C17 regression check: "Ejemplo de entrega de mudanza" shows notice banner | 160,672 B |

---

## 7. Scope Enforcement & Strict Hard Stop

- **C17-D English ONLY:** Completed.
- **Spanish Localization for C17-D:** Deferred to Phase 03.16.
- **C18-M / C18-J / W03:** NOT touched or implemented.
- **Driver App:** Completely untouched.
- **Neon / Database / Backend:** Zero simulated APIs or backend state mutations.

**PHASE 03.15 IS COMPLETE. STRICT HARD STOP OBSERVED.**
