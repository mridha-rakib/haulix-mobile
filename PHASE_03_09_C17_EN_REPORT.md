# Phase 03.09 C17 Choose Pickup Address (English ONLY) — Implementation & Verification Report

**Authoritative Source:** Figma Node `382:576` (430 × 1413 px)  
**File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Screen:** `W02 · SERVICE DISCOVERY & INTAKE / C17` — Choose Pickup Address (English)  
**Deliverable Document:** `PHASE_03_09_C17_EN_REPORT.md`  
**Execution Date:** 2026-11-16

---

## 1. Executive Summary

Phase 03.09 implements **C17 — Choose Pickup Address (English ONLY)** for the HAULIX Customer App in strict conformance with authoritative Figma Node `382:576`.

All implementation requirements, automated test suites, quality gates, and physical Android QA on the connected Realme device have been completed.

The screen follows the established premium visual hierarchy from Phase 03.07/03.08:

- Pinned `FlowHeaderBack` outside `ScrollView` with 44×44 pt touch target and honest chevron-back navigation.
- No bottom navigation (`CustomerBottomNav` omitted per specifications).
- Step indicator chip (`W02 · SERVICE DISCOVERY & INTAKE` / `/ C17`).
- Heading: `Where should we collect?` with dynamic personalized subtitle (`"Use Sarah's saved service address or enter a different Arizona pickup location."`).
- Customer booking context chip: `SARAH MITCHELL · BK-02` with lime verification check icon.
- Interactive Saved Addresses list (Home & Relative's residence) with lime-highlighted radio selection and right chevrons.
- Pickup instructions card displaying dynamic customer contact (`Sarah Mitchell · +1 602-555-0142`), selected service name (`Junk Removal` or dynamic param), and pickup access details (`Residential driveway · Details to confirm`).
- Address rule informational card with shield-bullet icon and two Arizona policy bullet points.
- Three action CTAs with truthful, dismissible upcoming feature notices:
  1. `Confirm pickup address` (Primary Lime Button) -> Discloses upcoming C18 Service Intake.
  2. `Add another address   ›` (Secondary Dark Card) -> Discloses upcoming C17-A Add Address.
  3. `Moving drop-off example   ›` (Secondary Dark Card) -> Discloses upcoming C17-D Moving Destination.
- Route connection: C16 English `handleUseLocation` navigates to `/pickup-address` with preserved selected service parameter while preserving Spanish localized upcoming notice.
- Strict Hard Stop: No C17 Spanish, no C17-A, no C17-D, no C18, no fake backend API calls, and no Driver app modifications.

---

## 2. Figma MCP Verification & Asset Inspection

### MCP Session & Metadata Verification

- **Figma Session ID:** `ea764ddd-8f60-4bb2-8a04-466c67c1e883`
- **MCP Tool Calls:**
  - `figma_figma:create_session` -> Initiated on file `Q946h4YBGgyLsjnPtdyQNe`.
  - `figma_figma:get_metadata` -> Inspected Node `382:576`.
  - `figma_figma:get_screenshot` -> Captured reference image URL and saved to `docs/qa/c17/figma-C17-en-reference.png`.
  - `figma_figma:download_assets` -> Extracted exact SVG vectors for icons (`C17CheckIcon`, `C17LocationPinIcon`, `C17ChevronRightIcon`).
  - `figma_figma:get_design_context` -> Inspected typography, background tokens (`#080D0C`, `#151A19`, `#222827`), border colors (`#2D3533`, `#35403B`), and text tokens (`#F6F8F6`, `#ADB7B1`, `#BAFF42`).

### Authoritative Visual Reference

- Extracted reference screenshot: `docs/qa/c17/figma-C17-en-reference.png` (75,166 bytes).

---

## 3. Architecture & Code Changes

### 3.1. Reusable SVG Icons (`apps/customer/src/components/discovery/C17Icons.tsx`)

Created clean, typed React Native SVG icons based on extracted Figma vectors:

- `C17CheckIcon`: 21×21 px lime checkmark for active address selection.
- `C17LocationPinIcon`: 21×21 px location pin for inactive address options.
- `C17ChevronRightIcon`: 17×17 px right navigation chevron.
- `C17ContactIcon`: 20×20 px contact person outline icon.
- `C17ServiceTypeIcon`: 20×20 px service truck intake icon.
- `C17PickupAccessIcon`: 20×20 px access / driveway icon.
- `C17RuleShieldIcon`: 20×20 px shield icon for Arizona address policy card.

### 3.2. Data Fixtures (`apps/customer/src/fixtures/c17PickupAddress.ts`)

Created typed fixtures and constants matching authoritative Figma specifications:

- `C17SavedAddress`:
  - `home-default`: `Home · Default pickup` — `1234 E Example Lane, Phoenix, AZ 85014` (`isDefault: true`).
  - `relatives-residence`: `Relative's residence` — `5678 N Demo Avenue, Phoenix, AZ 85012` (`isDefault: false`).
- `C17_DEMO_CONSTANTS`: Authoritative step strings, header copy, and booking metadata (`BK-02`).

### 3.3. Symmetrical Internationalization (`packages/i18n`)

Updated `en.ts` and `es.ts` with complete, symmetrical `c17` namespaces:

- Symmetrical key parity verified across English and Spanish.
- Preserves all token placeholders: `{{name}}` and `{{bookingId}}`.

### 3.4. Screen Implementation (`apps/customer/app/(app)/pickup-address.tsx`)

Implemented complete C17 screen with NativeWind tokens and React Native StyleSheet:

- **Header:** `FlowHeaderBack` pinned outside `ScrollView`, with `BackHandler` listening for Android hardware back button returning to `/service-area` with preserved `params.service`.
- **Top Notice:** In-app dismissible notice box for upcoming phase disclosures.
- **Section 1 (Saved Addresses):** Radio selection between saved addresses; clicking cards toggles active address selection with lime border (`#BAFF42`) and check icon.
- **Section 2 (Pickup Instructions):** Three structured instruction rows (Contact, Service Type, Pickup Access). Dynamically renders customer name & phone from `getC10DemoProfile('en')` or local saved edits, plus dynamic selected service from URL params.
- **Section 3 (Address Rule):** Elevated card with shield icon explaining Arizona service radius and dispatch policies.
- **Section 4 (Action CTAs):** 3 prominent buttons triggering truthful disclosures for upcoming phases C18, C17-A, and C17-D.
- **Footer:** Informational demo and SRS references (`BK-02, CU-04, CU-09`).

### 3.5. C16 -> C17 Route Connection (`apps/customer/app/(app)/service-area.tsx`)

Updated C16's `handleUseLocation`:

- English: Navigates cleanly to `/pickup-address` with `params.service`.
- Spanish: Retains truthful localized upcoming notice for C17 Spanish handoff.

### 3.6. Demo Screen Navigator Registration (`apps/customer/src/components/demo/DemoScreenNavigator.tsx`)

Registered `c17-en` entry in `DemoScreenNavigator` for direct QA access:

- ID: `c17-en`
- Name: `C17 · Choose Pickup Address (English)`
- Route: `/pickup-address`
- Locale: `en`

---

## 4. Automated Verification Results

All monorepo quality gates passed with zero errors:

| Quality Gate                 | Command          | Status     | Notes                                                                                                     |
| :--------------------------- | :--------------- | :--------- | :-------------------------------------------------------------------------------------------------------- |
| **Biome Linter & Formatter** | `pnpm check`     | **PASSED** | 234 files checked, 0 errors, 2 warnings (complexity score on screen root & hook dependency optimization). |
| **TypeScript Typecheck**     | `pnpm typecheck` | **PASSED** | 7/7 packages clean (`@haulix/customer`, `@haulix/i18n`, etc.).                                            |
| **Jest Unit & Integration**  | `pnpm test`      | **PASSED** | **174/174 customer tests passed**, 25/25 i18n tests passed, 7 monorepo packages successful.               |
| **Monorepo Health Check**    | `pnpm doctor`    | **PASSED** | pnpm 11.25.0, Node.js 26.0.0, registry connected, hardlinks verified.                                     |

### Unit Test Suites Summary:

- `apps/customer/src/__tests__/pickup-address.test.tsx` (11/11 tests passed):
  1. Route exists and omits `CustomerBottomNav`.
  2. `FlowHeaderBack` pinned outside `ScrollView` with required touch targets and no notification bell.
  3. `C17Icons` exports all 7 required SVG components.
  4. `C17_DEFAULT_SAVED_ADDRESSES` and `C17_DEMO_CONSTANTS` match Figma specifications.
  5. Dynamic customer profile integration with fallback to Sarah Mitchell.
  6. Exact C17 English strings match Figma Node `382:576`.
  7. Back button and Android hardware back return to C16 preserving service param.
  8. C16 `Use This Location` CTA navigates to C17 for English.
  9. All 3 action buttons trigger truthful dismissible upcoming notices.
  10. Demo navigator registers `c17-en`.
  11. No fake backend booking creation, fake JWT, or mock API success.
- `apps/customer/src/__tests__/service-area.test.tsx` (12/12 tests passed).
- `packages/i18n/src/i18n.test.ts` (25/25 tests passed).

---

## 5. Physical Android Device QA Verification

### Device Environment

- **Device:** Realme Note 60 (`RMX3930`, Android 15, serial `0B04731X200003BB`).
- **Expo Development Client:** Expo Go v58.0.5 running the latest development bundle from the workspace via Metro on port 8085.
- **Port Reverse:** `adb reverse tcp:8085 tcp:8085`.

### Real Device Screen Captures (`docs/qa/c17/`)

All screenshots are genuine device captures from the connected Realme Note 60 running the latest implementation:

| Test Item                         | Device Screenshot                                      | Verified Behavior                                                                                                                                                                 |
| :-------------------------------- | :----------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Figma Reference**               | `docs/qa/c17/figma-C17-en-reference.png`               | Authoritative Figma Node `382:576` baseline extracted via MCP.                                                                                                                    |
| **C16 -> C17 Transition**         | `docs/qa/c17/android-C16-en-to-C17.png`                | C16 English `Use this location` primary lime button prominently displayed and tapped.                                                                                             |
| **C17 Top View**                  | `docs/qa/c17/android-C17-en-top.png`                   | Pinned FlowHeaderBack, step chip `W02 / C17`, title, dynamic subtitle with `Sarah`, customer chip `SARAH MITCHELL · BK-02`, and default home address selected.                    |
| **Address Selection Toggled**     | `docs/qa/c17/android-C17-en-address-selected.png`      | User tapped `Relative's residence`; card highlights with `#BAFF42` border, lime checkmark icon, and right chevron.                                                                |
| **Instructions & Rule Section**   | `docs/qa/c17/android-C17-en-instructions-and-rule.png` | Contact row (`Sarah Mitchell · +1 602-555-0142`), Service row (`Junk Removal`), Access row (`Residential driveway · Details to confirm`), and Address rule card with shield icon. |
| **Action CTAs & Footer**          | `docs/qa/c17/android-C17-en-action-buttons.png`        | All 3 action buttons (`Confirm pickup address`, `Add another address ›`, `Moving drop-off example ›`) and demo disclaimers.                                                       |
| **Pinned Header While Scrolled**  | `docs/qa/c17/android-C17-en-back-visible-scrolled.png` | When scrolled down to the action buttons, `FlowHeaderBack` remains pinned at top outside `ScrollView` with full visibility.                                                       |
| **Notice: C18 Intake**            | `docs/qa/c17/android-C17-en-C18-notice.png`            | Tapping `Confirm pickup address` opens truthful in-app notice disclosing C18 Service Intake in an upcoming phase.                                                                 |
| **Notice: C17-A Add Address**     | `docs/qa/c17/android-C17-en-C17A-notice.png`           | Tapping `Add another address ›` opens truthful in-app notice disclosing C17-A in an upcoming phase.                                                                               |
| **Notice: C17-D Moving Drop-off** | `docs/qa/c17/android-C17-en-C17D-notice.png`           | Tapping `Moving drop-off example ›` opens truthful in-app notice disclosing C17-D in an upcoming phase.                                                                           |
| **Header Back & System Back**     | `docs/qa/c17/android-C17-en-back-to-C16.png`           | Tapping header chevron or Android hardware back returns to C16 Service Area cleanly with service state intact.                                                                    |
| **Dynamic Service Preservation**  | `docs/qa/c17/android-C17-en-commercial-freight.png`    | Navigating with `service=commercial-freight` dynamically updates the service instruction row to `Commercial Freight`.                                                             |

---

## 6. Strict Scope Boundaries & Confirmation

1. **English ONLY:** Implemented Node `382:576` exclusively in English. No C17 Spanish screen or duplicate locale routes were created.
2. **No Subsequent Screens:** Did NOT implement C17-A (Add Address), C17-D (Moving Drop-off), or C18 (Service Intake). All three trigger truthful in-app disclosures.
3. **No Fake Backend:** No mock APIs, no fake backend booking creation, no fake JWTs, and no simulated server state.
4. **Driver App Preserved:** No files in `apps/driver/` modified.
5. **Customer Bottom Navigation:** Correctly omitted from C17.
6. **Strict Stop:** Phase 03.09 implementation, physical Android QA, and documentation are complete.
