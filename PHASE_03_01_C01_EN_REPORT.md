# HAULIX Customer App — Phase 03.01 Implementation & QA Report

## C01 Home & Services — English ONLY

**Project:** HAULIX Customer Mobile App (`haulix-mobile`)  
**Phase:** 03.01 — C01 Home & Services (English ONLY)  
**Authoritative Figma Node:** Node `439:3498` (`C01-W · Customer Home / Navigation Working Copy [CU-09, BK-01, SV-04]`, 430 × 1205 px)  
**Supporting Reference:** Node `34:13` (Original 390px layout)  
**Device Used for Physical Android QA:** Physical Realme Note 60 (`RMX3930` / ADB `0B04731X200003BB`), Android 15  
**Verification Date:** November 14, 2026

---

## 1. Executive Summary

Phase 03.01 delivers the full, authentic frontend implementation of the **C01 Home & Services (English)** screen for the HAULIX Customer Mobile App. The implementation adheres strictly to Figma node `439:3498`, incorporating the genuine Figma hero truck image, genuine recent jobs thumbnail, all 12 original SVG vector assets, an interactive search bar with authentic 26px hero overlap, an 8-card service categories grid, a primary **Book a Service ›** CTA, truthful recent jobs and saved addresses cards, and the shared sculpted curved bottom navigation bar with the **Home** tab active (`#BAFF42`).

All work was completed strictly within frontend scope without touching backend APIs, unbuilt screens (C15, W07, C11, C13), Driver App code, or creating unauthorized release APK builds or git commits.

---

## 2. Authoritative Figma Source & Assets

### 2.1 Figma Reference Dimensions & Node

- **Authoritative Node:** `439:3498` (`C01-W · Customer Home / Navigation Working Copy`)
- **Canvas Dimensions:** 430 × 1205 px
- **Figma Reference Screenshot:** `docs/qa/c01/figma-C01W-en-reference.png` (213,946 bytes)

### 2.2 Genuine Figma PNG Assets

Original Figma image fills were fetched via download scripts matching the official manifest:

1. **Hero Truck Image:**
   - **Figma Node:** `439:3532` (Image Fill hash: `d7030a44d74746699857307ad773b998bd435629`)
   - **File:** `apps/customer/assets/c01/original-images/c01_hero_truck_original.png`
   - **File Size:** 77,308 bytes
   - **SHA-256:** `5F279935AA7D01FED9A74F5DDE0604FAC4B75498FDDE9C89DE8DF8683F40A68A`
2. **Recent Jobs Thumbnail:**
   - **Figma Node:** `439:3621` (Image Fill hash: `e40b63a4296dacff042f9bb6d02147c906634c6c`)
   - **File:** `apps/customer/assets/c01/original-images/c01_recent_job_original.png`
   - **File Size:** 2,517 bytes
   - **SHA-256:** `85B6F5646D5929B12E70F5D223C2C3FEF1C01DA77CAFE79336B1CEAF91585887`

### 2.3 Original Figma SVG Vectors

The 12 original Figma SVG vectors were placed in `apps/customer/assets/c01/original-svg/` and cleanly wrapped as typed React Native SVG components in `apps/customer/src/components/home/C01Icons.tsx`:

1. `c01_search_icon.svg` — 20 × 20 px search magnifying glass
2. `c01_location_pin.svg` — 24 × 24 px location marker
3. `c01_service_junk_removal.svg` — 24 × 24 px trash bin icon
4. `c01_service_moving.svg` — 24 × 24 px box truck icon
5. `c01_service_furniture_pickup.svg` — 24 × 24 px sofa / couch icon
6. `c01_service_appliance_removal.svg` — 24 × 24 px washing machine icon
7. `c01_service_mattress_removal.svg` — 24 × 24 px bed mattress icon
8. `c01_service_garage_cleanout.svg` — 24 × 24 px garage with open door icon
9. `c01_service_store_pickup.svg` — 24 × 24 px retail shopping cart icon
10. `c01_service_assembly_addon.svg` — 24 × 24 px crossed tools / wrench icon
11. `c01_saved_home_icon.svg` — 24 × 24 px outline house icon
12. `c01_icon_service_chevron.svg` — Micro 5 × 9 px chevron right for service cards

---

## 3. UI Component Fidelity & Architecture

The C01 screen was implemented at `apps/customer/app/(app)/index.tsx` matching exact Figma styling:

### 3.1 Global Header & Location Bar

- **Brand Wordmark:** `HAUL IX®` with lime `IX` (`#BAFF42`), white `HAUL` (`#FFFFFF`), and tagline `We Haul It All.` (`#ADB7B1`).
- **Notification Bell:** Circular icon button with notification pip (`#BAFF42`), wired to transparent upcoming notice for C13.
- **Location Selector Pill:** `Phoenix, Arizona` pill (`#111614` background, `#28342E` border) with pin icon and chevron down. Tapping displays truthful Phoenix service area disclosure.

### 3.2 Hero Banner Card (Figma 439:3531)

- Truck image background (`#161E1A` fallback) with dark linear gradient overlay.
- Heading: **"Get It Gone."** (`#F6F8F6`, 24px semi-bold) + **"The Easy Way."** (`#BAFF42`, 24px semi-bold).
- Subtitle: _"On-demand hauling, junk removal, moving and more — right at your fingertips."_ (`#ADB7B1`, 13px regular).

### 3.3 Search Bar Overlay (Figma 439:3539)

- Positioned with `-26px` negative top margin to create the exact 26px Figma overlap over the hero truck banner.
- White card (`#FFFFFF`) with 20px search icon, input field, and clear button (`✕`) when text is present or chevron (`›`) when idle.
- Interactive filtering updates the 8-service category grid in real time with an empty state fallback.

### 3.4 8 Service Categories Grid (Figma 439:3548 / 439:3585)

- 4-column responsive grid matching exact Figma order:
  1. **Junk Removal**
  2. **Moving**
  3. **Furniture Pickup**
  4. **Appliance Removal**
  5. **Mattress Removal**
  6. **Garage Cleanout**
  7. **Store Pickup**
  8. **Assembly Add-on** (disabled add-on at 58% opacity, distinct darker styling)
- Tapping active categories displays truthful disclosure: _"Service Discovery & Booking (C15) is scheduled for an upcoming phase."_
- Tapping Assembly Add-on displays disclosure: _"Assembly Add-on is an optional paid extra and cannot be booked as a standalone service."_

### 3.5 Primary CTA & Section Cards

- **Book a Service › CTA:** Brand lime (`#BAFF42`) 52px button with black typography (`#080B0B`). Tapping displays truthful C15 upcoming notice.
- **Recent Jobs Card:** Genuine Figma photo thumbnail, `Junk Removal`, `1234 E Thomas Rd, Phoenix, AZ 85014`, green status pill `✓ Completed` (`#112918` background, `#38D45A` text), and `Apr 12, 2024` timestamp. Tapping card or **See All ›** displays truthful W07 disclosure.
- **Saved Addresses Card:** House icon (`#F6F8F6`), `Home`, `1234 E Thomas Rd, Phoenix, AZ 85014`, chevron right (`#ADB7B1`). Tapping card or **See All ›** displays truthful C11 disclosure.

### 3.6 Sculpted Curved Bottom Navigation

- Reuses shared `CustomerBottomNav.tsx` with `activeTab="home"`.
- Highlights Home in brand lime (`#BAFF42`).
- Center elevated circular Book button with lime circle (`#BAFF42`) and plus icon.
- Tapping `Account` seamlessly navigates to `/(app)/account` (C10 Account Overview); tapping `Home` from C10 navigates cleanly back to `/(app)` (C01 Home).
- Total height is `80 + insets.bottom`, with content scroll padding `140px` ensuring zero visual obscuration on physical devices.

---

## 4. Verification Gates & Automated Quality Results

All gates passed with zero errors:

| Quality Gate                 | Tooling / Command | Result     | Metrics                                                                                                                            |
| ---------------------------- | ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Linter & Formatter**       | `pnpm check`      | **PASSED** | 178 files checked, 0 errors, 0 warnings (Biome).                                                                                   |
| **Type Checking**            | `pnpm typecheck`  | **PASSED** | 7/7 workspaces clean (zero TypeScript errors).                                                                                     |
| **Unit & Integration Tests** | `pnpm test`       | **PASSED** | 10/10 test suites passed in `@haulix/customer` (112/112 tests), 18/18 tests passed in `@haulix/i18n`. All workspace tests passing. |
| **Environment Health**       | `pnpm doctor`     | **PASSED** | Node.js 26.0.0, pnpm 11.25.0, package integrity verified.                                                                          |

---

## 5. Physical Android QA Execution

Hardware tests were executed on a physical **Realme Note 60 (`RMX3930`)** running Android 15 via ADB (`0B04731X200003BB`).

All 7 verification screenshots plus the authoritative Figma C01-W reference are stored in `docs/qa/c01/`:

| #   | Screenshot Filename                     | File Size | Verification Description                                                                                                                  |
| --- | --------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `figma-C01W-en-reference.png`           | 213.9 KB  | Authoritative Figma node `439:3498` export reference (430 × 1205 px).                                                                     |
| 2   | `android-C01-en-top.png`                | 349.8 KB  | Full top header: brand logo, notification bell, Phoenix location selector, hero truck banner, and overlapping search bar.                 |
| 3   | `android-C01-en-services.png`           | 349.8 KB  | 8 service categories in 4-column layout with authentic SVG icons and Assembly Add-on 58% disabled opacity.                                |
| 4   | `android-C01-en-bottom.png`             | 192.0 KB  | Scrolled bottom showing Book a Service CTA, Recent Jobs card with photo thumbnail & `✓ Completed` badge, and Saved Addresses Home card.   |
| 5   | `android-C01-en-navbar.png`             | 192.0 KB  | Sculpted curved bottom navigation bar with active **Home** tab (`#BAFF42`), elevated Book button, and Android navigation inset clearance. |
| 6   | `android-C01-en-search.png`             | 327.1 KB  | Interactive search filter typing `"junk"` displaying dynamic filtering and clear button (`✕`).                                            |
| 7   | `android-C01-en-book-guard.png`         | 347.8 KB  | Transparent frontend notice banner triggered upon tapping **Book a Service ›** disclosing truthful upcoming C15 phase.                    |
| 8   | `android-C01-en-account-navigation.png` | 158.4 KB  | Seamless inter-screen navigation between C01 Home and C10 Account Overview via bottom navigation tabs.                                    |

---

## 6. Scope Boundary Enforcement

- **Phase 03.01 (C01 Home English) is 100% complete.**
- Spanish C01 localization was strictly deferred until English is reviewed.
- No unbuilt screens (C15, W07, C11, C13, C10-F) were created; all interactions use truthful notice disclosures.
- Driver App, backend databases, and server configurations remain untouched.
- No release APK builds or unauthorized git pushes were performed.
