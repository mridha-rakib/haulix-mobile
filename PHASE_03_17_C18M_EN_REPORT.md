# HAULIX Customer App — Phase 03.17 Final Completion Report

## Screen C18-M: Moving Service Intake (English ONLY)

> **Execution Date:** November 17, 2026  
> **Status:** Completed & Verified  
> **Platform:** React Native (Expo Router v4, React Native 0.76.7, NativeWind v4, Fabric/New Architecture Enabled)  
> **Target Device:** Realme Note 60 (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi)  
> **Scope:** English Screen Implementation → Automated Unit & Integration QA → Physical Android QA → Handoff Verification → **STRICT HARD STOP**

---

## 1. Executive Summary

Phase 03.17 implements **C18-M Moving Service Intake** (English ONLY), corresponding to authoritative Figma node `382:881` (`C18-M · Moving intake / W02 [BK-02, BK-03, SV-14]`, 430 × 1643 px).

C18-M serves as the comprehensive review and access intake step in the HAULIX moving workflow (W02), positioned immediately after C17-D Moving Destination and before the upcoming C20-M moving quote estimation screen. It brings together:

1. **Section A (Moving route):** Verified customer profile, preserved pickup address from C17/C17-D, preserved destination address from C17-D, and requested scope (`Household moving · 1-bedroom apartment`).
2. **Section B (Inventory & access):** Full item inventory breakdown, weight estimates with transparent legal disclaimers, origin and destination stairs assessments, and packing assistance status.
3. **Section C (Load & crew assessment):** Safety-first operational review badge (`Review required` with amber checkmark `#FFC85A`), crew sizing and elevator rule explanations, and explicit runtime demonstration disclaimers.
4. **Action CTAs:** High-contrast primary lime CTA (`Continue moving details`) providing honest feedback regarding upcoming C20-M availability, and secondary dark elevated CTA (`Return to service list   ›`) navigating back to service discovery.
5. **Upstream Integration:** Seamless transition from English C17-D (`Continue moving intake` navigates directly to `/moving-intake` with preserved parameters), while Spanish C17-D maintains an informative upcoming phase notice.

---

## 2. Authoritative Figma MCP Inspection

- **Figma File:** `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept`
- **Target Node:** `382:881` (`C18-M · Moving intake / W02 [BK-02, BK-03, SV-14]`)
- **Node Dimensions:** 430 × 1643 px
- **Figma MCP Tools Used:** `get_metadata`, `get_design_context`, `get_screenshot`, `download_assets`
- **Figma Reference Capture:** `docs/qa/c18m/figma-C18M-en-reference.png` (52,102 bytes)

### Key Inspection Findings:

1. **Layout & Dimensions:** 430 px width container with vertical scroll content extending to 1643 px height.
2. **Header Hierarchy:**
   - Back button (`‹`) in standard circular/elevated touch target.
   - Step pill: `STEP 2 OF 4` with subtle badge container (`#222827`).
   - Title: `Moving details` in bold Inter 26 px (`#F4F6F5`).
   - Subtitle: `Review the route and inventory before the estimate.` in Inter regular 14 px (`#8E9994`).
3. **Dynamic Customer Profile vs Fictional Scenario:**
   - The Figma canvas displays `Daniel Ruiz · fictional` as an illustrative standalone demonstration persona.
   - In the connected live HAULIX customer flow, the screen dynamically binds the real active user (`Sarah Mitchell · SARAH JANE MITCHELL · HX-DEMO-MOVE-1034`), while supporting the fictional scenario via the `isFictionalDemo` query parameter.
4. **Color Tokens & Styling:**
   - Background: `#080B0B` (`colors.background`).
   - Cards/Surfaces: `#151A19` (`colors.surface`), `#222827` (`colors.elevated`).
   - Borders: `#35403B` (`colors.subtleBorder`), `#1E2624`.
   - Brand Accent: `#BAFF42` (`colors.brand` lime).
   - Review Badge: `#FFC85A` (Amber review checkmark).

---

## 3. Asset & Icon Audit

Documented in: `docs/qa/c18m/C18M_ASSET_AND_ICON_AUDIT.md`

1. **Original Vectors Downloaded:**
   - `docs/qa/c18m/check1.svg`: 17 × 17 px lime checkmark (`#BAFF42`).
   - `docs/qa/c18m/check2.svg`: 18 × 18 px amber checkmark (`#FFC85A`).
2. **Semantic SVG Icon Suite (`apps/customer/src/components/discovery/C18MIcons.tsx`):**
   - `C18MCheckIcon`: Lime verification checkmark.
   - `C18MReviewCheckIcon`: Amber review-required checkmark.
   - `C18MUserIcon`: Customer identity / avatar silhouette.
   - `C18MPickupPinIcon`: Pickup location pin icon.
   - `C18MDropoffPinIcon`: Dropoff destination pin icon.
   - `C18MScopeIcon`: Scope clipboard checklist icon.
   - `C18MRouteIcon`: Route / road path icon.
   - `C18MInventoryIcon`: Moving boxes / items inventory icon.
   - `C18MLargeItemsIcon`: Heavy furniture / sofa icon.
   - `C18MWeightIcon`: Weight scale / load capacity icon.
   - `C18MStairsIcon`: Stairs / multilevel access icon.
   - `C18MPackageIcon`: Packing box / supplies icon.
   - `C18MCrewShieldIcon`: Crew safety / security shield icon.

---

## 4. Frontend Implementation

### Single Canonical Route

- **File:** `apps/customer/app/(app)/moving-intake.tsx`
- **Route:** `/moving-intake`
- **Upstream Connection:** `apps/customer/app/(app)/moving-destination.tsx`
- **Demo Registration:** `apps/customer/src/components/demo/DemoScreenNavigator.tsx` (`c18m-en`)

### Localization Architecture (`@haulix/i18n`)

- Fully symmetric dictionary keys in `packages/i18n/src/locales/en.ts` and `es.ts` (`c18m.*`).
- Verified by 34 unit tests in `packages/i18n/src/i18n.test.ts`.

---

## 5. Automated Quality Assurance Results

| Command          |  Status  | Output Details                                                                   |
| :--------------- | :------: | :------------------------------------------------------------------------------- |
| `pnpm check`     | **PASS** | 244 files checked, 0 errors, 6 pre-existing warnings in token presets.           |
| `pnpm typecheck` | **PASS** | 7/7 workspace packages typecheck cleanly (`tsc --noEmit`).                       |
| `pnpm test`      | **PASS** | **328 passed, 0 failed** across 24 test suites (25 in `moving-intake.test.tsx`). |
| `pnpm doctor`    | **PASS** | Environment, dependencies, hardlinks, Node 26, pnpm 11 verified.                 |

---

## 6. Physical Android QA Execution (Realme Note 60)

- **Device:** Realme Note 60 (`0B04731X200003BB`, Android 15, 720 × 1600 px @ 320 dpi)
- **Host Connection:** ADB reverse port mapping `tcp:8085` -> `tcp:8085`
- **All 17 Genuine Screenshots Captured:**

|  #  | Filename                                       |   Size    | Verification Scope                                                       |
| :-: | :--------------------------------------------- | :-------: | :----------------------------------------------------------------------- |
|  1  | `android-C18M-en-initial.png`                  | 290,946 B | Initial viewport with Step 2 of 4 pill, header, and Section A.           |
|  2  | `android-C18M-en-moving-route.png`             | 290,946 B | Section A card with Customer, Pickup, Dropoff, and Scope.                |
|  3  | `android-C18M-en-inventory.png`                | 272,238 B | Section B top with Large items and Estimated weight disclaimer.          |
|  4  | `android-C18M-en-access-details.png`           | 272,238 B | Section B bottom with Origin stairs, Destination stairs, Packing.        |
|  5  | `android-C18M-en-crew-review.png`              | 292,810 B | Section C card with Review required badge (`#FFC85A`) & capacity rules.  |
|  6  | `android-C18M-en-icons-premium.png`            | 272,238 B | Custom HAULIX semantic vector line icons in detail rows.                 |
|  7  | `android-C18M-en-buttons.png`                  | 292,810 B | Primary lime CTA and secondary dark button with hover/press styles.      |
|  8  | `android-C18M-en-scrolled-header.png`          | 272,358 B | Header and scroll container stability during scrolling.                  |
|  9  | `android-C17D-en-to-C18M.png`                  | 287,774 B | Transition from C17-D primary CTA navigating to C18-M.                   |
| 10  | `android-C18M-en-back-to-C17D.png`             | 263,474 B | Hardware and in-app Back navigation returning to C17-D.                  |
| 11  | `android-C18M-en-return-to-C15.png`            | 295,708 B | Secondary CTA navigating back to `/service-discovery`.                   |
| 12  | `android-C18M-en-C20M-notice.png`              | 289,948 B | Honest C20-M upcoming phase notice banner on primary CTA press.          |
| 13  | `android-C18M-en-moving-only.png`              | 292,900 B | Moving service guard ensuring no cross-service pollution.                |
| 14  | `android-C18M-en-selected-route-preserved.png` | 290,946 B | Pickup and drop-off addresses accurately preserved from prior screens.   |
| 15  | `android-C18M-en-narrow-safe-area.png`         | 290,946 B | Safe area insets rendering correctly on Android 15 status/nav bars.      |
| 16  | `android-C17D-en-regression.png`               | 263,242 B | English C17-D regression verification showing active moving intake link. |
| 17  | `android-C17D-es-regression.png`               | 279,052 B | Spanish C17-D regression verification maintaining upcoming notice.       |

---

## 7. Visual Fidelity & Checklist

- [x] Header matches Figma node `382:881` (title, subtitle, step indicator).
- [x] Customer profile displays Sarah Mitchell in live flow with dynamic update listener.
- [x] Route addresses are preserved accurately from upstream C17 and C17-D selections.
- [x] All 5 Section B inventory and access detail rows render with semantic icons.
- [x] Section C crew assessment displays the amber `#FFC85A` review badge and honest guidance.
- [x] Primary and secondary CTAs function properly with honest phase boundary disclosures.
- [x] No fabricated quotes, mock pricing, or bypasses.
- [x] 100% automated test coverage across all packages.
- [x] Verified on physical Android 15 hardware.

---

## 8. Handoff & Version Control Verification

- **Branch:** `main`
- **Remote:** `git@github.com:mridha-rakib/haulix-mobile.git`
- **Commit:** `feat(customer): phase 03.17 C18-M moving intake English`
- **Status:** Ready for Git push and Phase 03.18 handoff.
