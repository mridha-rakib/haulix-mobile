# HAULIX Customer App — Phase 03.05: C15-S Service Selected (English ONLY) Report

## 1. Executive Summary

Phase 03.05 implements the official English screen for **C15-S Service Selected** (`apps/customer/app/(app)/service-selected.tsx`) in strict accordance with authoritative Figma Node `382:241` (`C15-S · Junk Removal selected / W02 [BK-01, BK-02, SV-01]`, 430 × 1015 px), Flow Header Back Node `436:1976`, and the handoff specification.

The screen serves as Step 2 of the Service Intake flow (W02), providing visual confirmation of the chosen service category before proceeding to Service Area Eligibility (C16). It incorporates the original Figma truck icon (31 × 31 px), custom back arrow icon, 3-step booking overview, dynamic English customer profile context (`Sarah Mitchell`), and truthful forward/backward navigation.

Physical Android QA was thoroughly executed on a physical **Realme Note 60 (RMX3930, Android 15)** via ADB, capturing 9 visual proof screenshots in `docs/qa/c15s/`. All automated quality gates (`check`, `typecheck`, `test`, `doctor`) pass with 0 errors and 0 warnings.

---

## 2. Authoritative Figma References & Layout Mapping

| Item                      | Figma Node / Spec              | Visual & Technical Implementation                                                                                                                                                                                                                                      |
| :------------------------ | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Canvas & Frame**        | Node `382:241` (430 × 1015 px) | Responsive React Native scrollable container with 20px horizontal padding, `#0D1311` dark surface background, and vertical scroll.                                                                                                                                     |
| **Flow Header · Back**    | Node `436:1976` (430 × 77 px)  | Circular back hit area (42 × 42 px) with `c15s_back_arrow.svg`, centered `HAULIX` brand logo with `We Haul It All.` tagline, and empty right spacer for visual balance. No notification bell.                                                                          |
| **W02 Step Indicator**    | Node `382:241`                 | `W02 · SERVICE DISCOVERY & INTAKE / C15-S` pill badge with `#222B27` border, `#8E9B95` muted text, and `#BAFF42` green accent.                                                                                                                                         |
| **Screen Heading**        | Node `382:241`                 | Dynamic service heading (default: `Junk Removal`, Inter Bold, `#FFFFFF`) with dynamic subtitle (`Selected for booking HX-DEMO-1027. Confirm where the crew will collect your items.`).                                                                                 |
| **Customer Context Chip** | Node `382:241`                 | Green badge (`#151A19` bg, `#1F2E23` border) displaying `SARAH MITCHELL · HX-DEMO-1027` (or dynamically updated demo customer name from C10 profile edit) with check icon.                                                                                             |
| **Selected Service Card** | Node `382:241` (121 px height) | Highlighted card with 2px lime stroke (`#BAFF42`), `#151A19` dark fill, original 31 × 31 px Figma truck icon (`c15s_selected_truck.svg`), `SELECTED` badge, dynamic category name, and descriptive subtitle. Subtitle: `Illustrative draft · No price calculated yet`. |
| **How Booking Works**     | Node `382:241`                 | Section heading `How this booking works` with 3 numbered steps: 1. Confirm eligible Arizona pickup address, 2. Describe items, access and upload supporting photos, 3. Review corrected AI suggestions in W03 before a quote.                                          |
| **Primary Action CTA**    | Node `382:241` (54 px height)  | Full-width `#BAFF42` lime pill button: `Continue to service area`. Displays truthful upcoming notice for C16 upon press.                                                                                                                                               |
| **Secondary Action CTA**  | Node `382:241` (54 px height)  | Dark outline pill button (`#151A19` bg, `#222B27` border): `Change service ›`. Returns to C15 with selected service preserved.                                                                                                                                         |
| **Footer Disclaimers**    | Node `382:241`                 | Truthful demo metadata: `DEMO ONLY · No confirmed booking, rates or payment` and `SRS BK-01, BK-02, SV-01 · 430 px / vertical scroll`.                                                                                                                                 |
| **Bottom Navigation**     | Explicit Requirement           | Strictly **omitted**. C15-S is an intake flow sub-screen and does not render the primary tab bar.                                                                                                                                                                      |

---

## 3. Original Asset Integration

Two original SVG assets from the handoff package were placed in `apps/customer/assets/c15s/original-svg/` and exported as native React components via `apps/customer/src/components/discovery/C15SIcons.tsx`:

1. **`c15s_selected_truck.svg` (31 × 31 px):** Original Figma truck icon featuring the green-accented front cab, white cargo container, wheel details, and outline stroke (`C15SSelectedTruckIcon`). Used as the canonical hero icon on the selected service card.
2. **`c15s_back_arrow.svg` (23 × 23 px):** Original Figma back arrow glyph with crisp vector path (`C15SBackArrowIcon`). Embedded in the 42 × 42 px circular back button.

For non-default services selected from C15 (e.g. Moving, Furniture, Appliance, Mattress, Garage, Store), the screen dynamically falls back to the corresponding semantic SVG icon from `C15Icons.tsx`.

---

## 4. Navigation & Locale Boundary Verification

1. **English C15 → C15-S Flow:**
   - On C15 English (`/service-discovery`), selecting any service category updates the primary CTA to `Select <service>`.
   - Tapping `Select <service>` pushes `/service-selected` with the `{ service: selectedServiceId }` query param.
   - C15-S renders the exact selected service dynamically (e.g. `Moving` renders `Moving`, truck/moving SVG, and `Pickup-to-destination transport` subtitle).
2. **C15-S → C15 Return Flow:**
   - Tapping `Change service ›` or the Flow Header Back button (or Android hardware back) navigates back to `/service-discovery?service=<selectedServiceId>`, preserving the user's service selection.
3. **Truthful C16 Forward Disclosure:**
   - Tapping `Continue to service area` triggers an informative notice banner: `Service Area Eligibility (C16) is scheduled for an upcoming phase.` No fabricated C16 screens or fake routing.
4. **Strict Spanish Isolation (Zero Regression):**
   - On Spanish C15 (`c15-es`), selecting `Mudanzas` displays `Elegir mudanzas`.
   - Tapping `Elegir mudanzas` displays the truthful Spanish upcoming notice (`c15.noticeC15S`: "La siguiente etapa de selección del servicio estará disponible próximamente.") and **does not navigate** to English C15-S.

---

## 5. Physical Android Device QA Verification

### Device Environment

- **Device Model:** Realme Note 60 (`RMX3930`)
- **OS Version:** Android 15 (API 35)
- **ADB Identifier:** `0B04731X200003BB`
- **Reverse Port:** `tcp:8081` active to Metro bundler
- **Screenshots Directory:** `docs/qa/c15s/`

### QA Proof Matrix

|  #  | Filename                              |  Size  | Verification Description                                                                                                          |
| :-: | :------------------------------------ | :----: | :-------------------------------------------------------------------------------------------------------------------------------- |
|  1  | `figma-C15S-en-reference.png`         | 30 KB  | Authoritative Figma reference for Node `382:241` (430 × 1015 px)                                                                  |
|  2  | `android-C15S-en-default.png`         | 172 KB | Default C15-S English top: Flow Header Back, W02 chip, Junk Removal heading, dynamic customer chip                                |
|  3  | `android-C15S-en-selected-card.png`   | 166 KB | Selected service card: 2px lime stroke, 31px truck SVG, SELECTED badge, Junk Removal, illustrative subtitle                       |
|  4  | `android-C15S-en-bottom.png`          | 153 KB | "How this booking works" 3 steps, `Continue to service area`, `Change service ›`, demo footer, no bottom nav                      |
|  5  | `android-C15-en-to-C15S.png`          | 148 KB | English C15 (`/service-discovery`): `Select Junk Removal` CTA ready to navigate to C15-S                                          |
|  6  | `android-C15S-en-moving-selected.png` | 168 KB | C15-S dynamic service test: `Moving` heading, Moving SVG icon, and `Pickup-to-destination transport`                              |
|  7  | `android-C15S-en-change-service.png`  | 154 KB | Return to C15 via `Change service ›`: preserves `Junk Removal` selection and C15 layout                                           |
|  8  | `android-C15S-en-c16-notice.png`      | 185 KB | Tapping `Continue to service area`: displays truthful notice `Service Area Eligibility (C16) is scheduled for an upcoming phase.` |
|  9  | `android-C15-es-regression.png`       | 176 KB | Spanish C15 regression check: tapping `Elegir mudanzas` shows Spanish notice and stays on Spanish C15                             |

---

## 6. Automated Quality Gates

All four repository quality gates were run and passed with zero errors:

| Quality Gate           | Command          |    Result    | Verification Scope                                                               |
| :--------------------- | :--------------- | :----------: | :------------------------------------------------------------------------------- |
| **Lint & Format**      | `pnpm check`     | **PASS (0)** | Checked 207 files in 128ms; 0 errors, 0 warnings (Biome 2.6.7)                   |
| **TypeScript**         | `pnpm typecheck` | **PASS (0)** | 7 of 7 monorepo packages checked with 0 type errors                              |
| **Unit & Integration** | `pnpm test`      | **PASS (0)** | 200 tests passing monorepo-wide (Customer: 12 suites, 139 tests; i18n: 21 tests) |
| **Monorepo Doctor**    | `pnpm doctor`    | **PASS (0)** | Node 26.0.0, pnpm 11.25.0, hardlinks, registry connectivity OK                   |

### New Automated Unit Tests (`apps/customer/src/__tests__/service-selected.test.tsx`):

- `renders default C15-S Junk Removal view with all Figma 382:241 elements`
- `renders dynamic service when passed via search params (Moving)`
- `renders fallback when unknown service id is provided`
- `displays dynamic English customer profile name and demo id`
- `displays truthful upcoming notice when Continue to service area is pressed`
- `dismisses upcoming notice when dismiss button is pressed`
- `navigates back to service discovery when Change service button is pressed`
- `navigates back when header back button is pressed`
- `handles Android hardware back press`
- `renders how booking works section with all 3 steps`
- `renders footer disclaimers matching Figma text`
- `does not render bottom navigation bar`
- `renders flow header back with centered HAULIX branding`

---

## 7. Compliance Checklist

- [x] **Single Canonical Route:** Implemented only `apps/customer/app/(app)/service-selected.tsx`. No locale-suffixed routes.
- [x] **English Only Scope:** Implemented exclusively English C15-S. No premature Spanish C15-S.
- [x] **Original SVG Assets:** Integrated `c15s_selected_truck.svg` and `c15s_back_arrow.svg`.
- [x] **Dynamic Service Rendering:** Displays actual selected category (`Junk Removal`, `Moving`, etc.) rather than hardcoding.
- [x] **Dynamic Demo Customer Profile:** Displays English demo profile (`Sarah Mitchell` or updated name) with `HX-DEMO-1027`.
- [x] **Truthful Progression:** Shows honest upcoming notice for C16; does not fake backend or unbuilt screens.
- [x] **Strict Spanish Regression Guard:** Spanish C15 `Elegir <servicio>` does not route to English C15-S.
- [x] **Physical Android QA:** 9 high-resolution proof screenshots captured on Realme Note 60.
- [x] **Quality Gates Clean:** `check`, `typecheck`, `test`, `doctor` all exit 0.
- [x] **Strict Hard Stop:** No git commits, no git pushes, no APK builds.
