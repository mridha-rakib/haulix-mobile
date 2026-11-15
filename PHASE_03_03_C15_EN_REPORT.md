# HAULIX Customer App — Phase 03.03 Implementation & QA Report

## C15 Service Discovery — English ONLY

**Project:** HAULIX Customer Mobile App (`haulix-mobile`)  
**Phase:** 03.03 — C15 Service Discovery (English ONLY)  
**Authoritative Figma Node:** Node `382:126` (`C15 · Service discovery / W02 [BK-01, SV-01, AI-12]`, 430 × 1791 px)  
**Flow Header Start Source:** Node `436:1957` (from source component `429:290` / `429:305`, 386 × 60 px)  
**Device Used for Physical Android QA:** Physical Realme Note 60 (`RMX3930` / ADB `0B04731X200003BB`), Android 15  
**Verification Date:** November 14, 2026

---

## 1. Executive Summary

Phase 03.03 delivers the complete, authoritative frontend implementation of the **C15 Service Discovery (English ONLY)** screen for the HAULIX Customer Mobile App. The implementation strictly mirrors Figma node `382:126` and the approved design contract:

1. **Dedicated Route:** Single canonical route at `apps/customer/app/(app)/service-discovery.tsx` using Expo Router, NativeWind, TypeScript strict mode, and shared design tokens.
2. **Flow Header Start:** Exact Figma Flow Header (`436:1957`) featuring centered `HAUL IX®` wordmark and `We Haul It All.` tagline. **Strictly no notification bell, and no bottom navbar.** Native Android status bar is preserved without fake iOS 9:41 UI.
3. **Approved Services:** The seven approved service categories rendered in exact Figma vertical order using the **10 genuine Figma-exported SVG vectors**. Assembly Add-on is strictly omitted from C15.
4. **Customer Profile Binding:** Fictional customer chip (`SARAH MITCHELL · HX-DEMO-1027`) binds dynamically to the English demo profile state without representing fake authenticated identity.
5. **Interactive Preview State:** In-memory service selection updates the highlighted service row, the dynamic draft booking summary line (`Draft booking HX-DEMO-1027 · <Service>`), and the primary CTA label (`Select <Service>`) without persisting or faking a confirmed booking.
6. **Transparent Next-Step Disclosures:** All four action CTAs and row selections provide honest in-app feedback disclosing upcoming phases (C15-S, C16, C16-F, C15-E, C18) without fake confirmations, GPS access, or mock backend calls.
7. **C01 Home Integration & Strict Language Isolation:** English C01 Home navigates to C15 via both `Book a Service ›` and the center navbar `Book` button. Tapping enabled C01 service cards passes a stable category ID to preselect the service in C15. Crucially, C01 Spanish retains its localized Spanish notice and **never routes to English C15**.
8. **Automated & Physical Android QA:** 100% pass across all 4 repository quality gates (`pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm doctor`) with 122 unit tests passing, plus 9 genuine physical Android 15 screenshots on Realme Note 60.

---

## 2. Authoritative Figma Source & Asset Provenance

### 2.1 Figma Reference Dimensions & Node

- **Authoritative Node:** `382:126` (`C15 · Service discovery / W02 [BK-01, SV-01, AI-12]`)
- **Canvas Dimensions:** 430 × 1791 px (implemented as a responsive native scrollable layout)
- **Flow Header Start:** `436:1957` (386 × 60 px)
- **Figma Reference Screenshot:** `docs/qa/c15/figma-C15-en-reference.png` (31,464 bytes)

### 2.2 Original Figma SVG Vectors (10 Files)

All 10 vector source assets were placed in `apps/customer/assets/c15/original-svg/` and cleanly wrapped as typed React Native SVG components in `apps/customer/src/components/discovery/C15Icons.tsx`:

| Asset File                    | Node      | Dimensions | Component                | Role                                                   |
| ----------------------------- | --------- | ---------- | ------------------------ | ------------------------------------------------------ |
| `context_check_17.svg`        | `382:140` | 17 × 17 px | `ContextCheckIcon`       | Customer demo chip check icon                          |
| `service_junk_removal_25.svg` | `382:152` | 25 × 25 px | `ServiceJunkRemovalIcon` | Junk Removal row icon                                  |
| `service_moving_25.svg`       | `382:160` | 25 × 25 px | `ServiceMovingIcon`      | Moving row icon                                        |
| `service_furniture_25.svg`    | `382:171` | 25 × 25 px | `ServiceFurnitureIcon`   | Furniture Pickup row icon                              |
| `service_appliance_25.svg`    | `382:179` | 25 × 25 px | `ServiceApplianceIcon`   | Isometric box icon (distinct from C01 washing machine) |
| `service_mattress_25.svg`     | `382:187` | 25 × 25 px | `ServiceMattressIcon`    | Mattress Removal row icon                              |
| `service_garage_25.svg`       | `382:195` | 25 × 25 px | `ServiceGarageIcon`      | Garage Cleanout row icon                               |
| `service_store_25.svg`        | `382:203` | 25 × 25 px | `ServiceStoreIcon`       | Store Pickup row icon                                  |
| `service_chevron_17.svg`      | `382:150` | 17 × 17 px | `ServiceChevronIcon`     | Row chevron right                                      |
| `service_info_check_18.svg`   | `382:221` | 18 × 18 px | `ServiceInfoCheckIcon`   | Service information pill check                         |

No stock icons, Lucide approximations, or full-frame screenshots were used.

---

## 3. Screen Structure & Figma Alignment

| Section                | Node       | Source Geometry | Implemented Elements & Invariants                                                                                                                                                                                                 |
| ---------------------- | ---------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Flow Header**        | `436:1957` | 386 × 60 px     | Centered `HAUL` (white `#F6F8F6`) + `IX` (lime `#BAFF42`) + `®` mark, centered `We Haul It All.` tagline. **No bell, no back button, no bottom navbar.**                                                                          |
| **W02 Step Chip**      | `382:134`  | 386 × 33 px     | `W02 · SERVICE DISCOVERY & INTAKE` in lime (`#BAFF42`) and `/ C15` in secondary gray (`#6D7570`). Dark capsule `#131716` with border `#1E2522`.                                                                                   |
| **Screen Heading**     | `382:137`  | 386 × 98 px     | Title `What can we help with?` (28px bold `#F6F8F6`) + Subtitle `Choose the approved service that matches your task.` (15px `#ADB7B1`).                                                                                           |
| **Customer Chip**      | `382:140`  | 386 × 39 px     | Olive surface `#121C14` with border `#1F3320`, `ContextCheckIcon`, uppercase demo name/ID (e.g., `SARAH MITCHELL · HX-DEMO-1027`). Bound dynamically to English demo profile.                                                     |
| **Service Area**       | `382:144`  | 386 × 160 px    | Title `Service area`, region `Phoenix, Arizona · Initial service region`, disclosure `Eligible Arizona service area checked again before booking.` No GPS or false eligibility claim.                                             |
| **Available Services** | `382:149`  | 386 × 684 px    | Exactly 7 service rows (354 × 76 px, 13px gap, 14px radius). Lime icon, title, subtitle, chevron right. Selection highlights active row with lime border `#BAFF42`. **Assembly Add-on strictly omitted.**                         |
| **Draft Summary**      | `382:221`  | 386 × 162 px    | `For Sarah Mitchell`, inner pill with `ServiceInfoCheckIcon` + `Service information`, draft line `Draft booking HX-DEMO-1027 · <Service>`, disclaimer `No quote or appointment has been confirmed yet.`                           |
| **Four CTAs**          | `382:230`  | 386 × 257 px    | 1. Primary lime `Select <Service>` (C15-S notice)<br>2. Dark `Check Service Area ›` (C16 notice)<br>3. Dark `View location restrictions ›` (C16-F notice)<br>4. Primary lime `Service not listed? Check options ›` (C15-E notice) |
| **Demo Footer**        | `382:238`  | 386 × 48 px     | `DEMO ONLY · No confirmed booking, rates or payment`<br>`SRS BK-01, SV-01, AI-12 · 430 px / vertical scroll`                                                                                                                      |

---

## 4. Navigation & State Safety Invariants

1. **C01 English Entry:**
   - Tapping `Book a Service ›` navigates to `/(app)/service-discovery`.
   - Tapping the center elevated circular `Book` button in `CustomerBottomNav` navigates to `/(app)/service-discovery`.
   - Tapping any of the 7 supported service cards on C01 passes `{ service: svc.id }` and preselects that category in C15.
   - C01 Assembly Add-on remains disabled and shows its honest disclaimer.
2. **Strict Spanish Language Isolation:**
   - C01 Spanish `Reservar un servicio ›` and center `Reservar` button retain the existing localized Spanish notice: `"La selección de servicios y las reservas (C15) estarán disponibles en una próxima fase."`
   - C01 Spanish never routes to English C15.
3. **Android Native Back Navigation:**
   - Pressing the hardware/gesture Android Back button returns smoothly to C01 Home without navigation loops or locale corruption.
4. **No Premature State Persistence:**
   - Preview selection in C15 is strictly in-memory. No booking record, backend customer session, quote, or payment transaction is created.

---

## 5. Automated Verification Gates

All 4 quality gates were executed with zero errors and zero warnings:

```bash
$ biome check .
Checked 191 files in 91ms. No fixes applied.

$ turbo run typecheck
 Tasks:    7 successful, 7 total
Cached:    7 cached, 7 total
  Time:    23ms >>> FULL TURBO

$ turbo run test
 PASS packages/design-tokens/src/preset.test.ts
 PASS packages/logger/src/logger.test.ts
 PASS packages/utils/src/utils.test.ts
 PASS packages/utils/src/fsm.test.ts
 PASS packages/i18n/src/i18n.test.ts
 PASS apps/driver/src/__tests__/smoke.test.ts
 PASS apps/driver/src/__tests__/styling.test.ts
 PASS apps/customer/src/__tests__/account.test.tsx
 PASS apps/customer/src/__tests__/smoke.test.ts
 PASS apps/customer/src/__tests__/social-return.test.tsx
 PASS apps/customer/src/__tests__/edit-profile.test.tsx
 PASS apps/customer/src/__tests__/home.test.tsx
 PASS apps/customer/src/__tests__/profile-updated.test.tsx
 PASS apps/customer/src/__tests__/service-discovery.test.tsx
 PASS apps/customer/src/__tests__/styling.test.ts
 PASS apps/customer/src/__tests__/verify-phone.test.tsx
 PASS apps/customer/src/__tests__/sign-in.test.tsx
 PASS apps/customer/src/__tests__/create-account.test.tsx
 Test Suites: 11 passed, 11 total (customer)
 Tests:       122 passed, 122 total
 Time:        7.139 s

$ pnpm doctor
✓ Versions: pnpm 11.25.0, Node.js 26.0.0
✓ Install method: @pnpm/exe
✓ Global bin directory: C:\Users\rakib_bro\AppData\Local\pnpm\bin
✓ Cache directory: C:\Users\rakib_bro\AppData\Local\pnpm-cache
✓ Filesystem: available: hardlink
✓ Registry connectivity: https://registry.npmjs.org/ (345ms)
✓ Install smoke test: offline "file:" install linked its dependency
All checks passed
```

---

## 6. Physical Android QA Acceptance Evidence

Physical testing was conducted on a connected **Realme Note 60** running **Android 15** (Device ID: `0B04731X200003BB`, display density 720 × 1600 px, ~360dp width). All 9 genuine screenshots have been saved to `docs/qa/c15/`:

| #   | Screenshot File                      | Size (Bytes) | Verification Point                                                                       |
| --- | ------------------------------------ | ------------ | ---------------------------------------------------------------------------------------- |
| 1   | `figma-C15-en-reference.png`         | 31,464       | Authoritative Figma node `382:126` export                                                |
| 2   | `android-C15-en-top.png`             | 294,212      | Native status bar, Flow Header (no bell), W02 chip, heading, customer chip, service area |
| 3   | `android-C15-en-services.png`        | 304,718      | 7 service rows with genuine 25×25 SVG icons, exact text, no Assembly Add-on              |
| 4   | `android-C15-en-bottom.png`          | 281,610      | `For Sarah Mitchell` draft summary, 4 vertical action CTAs, demo footer                  |
| 5   | `android-C15-en-moving-selected.png` | 291,286      | Tapping Moving updates selection, draft line (`· Moving`), and CTA (`Select Moving`)     |
| 6   | `android-C15-en-upcoming-notice.png` | 309,308      | Honest C15-S disclosure banner with Dismiss button after tapping CTA                     |
| 7   | `android-C01-en-to-C15.png`          | 667,576      | English C01 Home with `Book a Service ›` CTA and center `Book` button                    |
| 8   | `android-C15-en-back-home.png`       | 667,434      | Android native back returns cleanly to English C01 Home without loops                    |
| 9   | `android-C01-es-regression.png`      | 677,130      | Spanish C01 displays localized upcoming notice and does NOT route to English C15         |

---

## 7. Modified & Created Files Summary

- **Created:**
  - `apps/customer/app/(app)/service-discovery.tsx` — Canonical C15 Service Discovery screen
  - `apps/customer/src/components/discovery/C15Icons.tsx` — 10 typed React Native SVG icons
  - `apps/customer/src/fixtures/c15Services.ts` — 7 approved service categories and demo constants
  - `apps/customer/src/__tests__/service-discovery.test.tsx` — Focused unit and integration tests
  - `apps/customer/assets/c15/original-svg/*` — 10 genuine Figma-exported SVG vectors
  - `docs/qa/c15/*` — 9 genuine Android QA screenshots and Figma reference
  - `PHASE_03_03_C15_EN_REPORT.md` — This official report
- **Modified:**
  - `packages/i18n/src/locales/en.ts` — Added `c15` namespace strings
  - `packages/i18n/src/locales/es.ts` — Added symmetrical `c15` keys
  - `apps/customer/app/(app)/index.tsx` — Connected English C01 `Book a Service ›` and category cards to C15; preserved Spanish notice
  - `apps/customer/src/components/navigation/CustomerBottomNav.tsx` — Connected English navbar center `Book` to C15; preserved Spanish notice
  - `apps/customer/src/components/demo/DemoScreenNavigator.tsx` — Added `c15-en` QA shortcut

---

## 8. Hard Stop & Next Phase Recommendation

Phase 03.03 is **100% complete, verified, and accepted**. Per explicit contributor guidelines:

- **No Spanish C15 code was authored.**
- **No unbuilt screens (C15-S, C15-E, C16, C16-F, C18) were created.**
- **No standalone APK builds, git commits, or remote pushes were executed.**

**Recommended Next Step:** Proceed to **Phase 03.04: C15 Service Discovery (Spanish Localization)** upon client authorization.
