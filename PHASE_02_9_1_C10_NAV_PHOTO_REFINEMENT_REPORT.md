# HAULIX Customer App — Phase 02.9.1 Implementation Report: C10 Navbar Fidelity + Profile Photo Add / Change / Remove

## 1. Executive Summary & Exact Scope

This phase resolved two critical frontend items for **C10 Account Overview (English Default)**:

1. **Shared Bottom Navbar Android Inset Correction (High Priority)**: Eliminated the excess ~100dp empty black dead space below the tab labels on Android devices with 3-button system navigation controls. Anchored the sculpted curved bottom navbar (`CustomerBottomNav`) cleanly directly above the native Android system bar while retaining edge-to-edge width, the original continuous curved dome silhouette, center Book lime circle (`+`), and ensuring scroll content (including the final "Saved Addresses" CTA) scrolls completely clear of the navbar.
2. **Profile Photo Management Frontend Workflow**: Implemented a complete frontend action sheet (`ProfilePhotoActionSheet`) for profile photo management, triggered both from the 72×72 circular `SM` avatar with 21×21 camera badge and the "Profile photo · Add / change / remove" shortcut under Security & Profile Photo. Includes gallery selection (`launchImageLibraryAsync`), hardware camera capture (`launchCameraAsync`), native 1:1 aspect ratio cropping, confirmation preview state, removal confirmation state with fallback to `SM` initials, and device-local persistence (`SecureStore`).

**Strict Invariants Preserved:**

- Strictly FRONTEND ONLY: No fake backend auth, OAuth tokens, server photo uploads, or mock backend success claims.
- Binding Owner Policy: Zero auth guards, `__DEV__` restrictions, or release-APK preview gates; C06–C10 screens remain directly browsable in development and APK QA.
- No new route created: The action sheet is a reusable modal component on C10.
- Did NOT implement C10 Spanish, C10-E Edit Profile form, or Phase 03 routes.

---

## 2. Root Cause Analysis: Bottom Navbar Excessive Space

### A. Measured Geometry & Diagnosis

On the physical connected test device (**Realme Android 15, 360dp logical width / 720×1600 physical resolution**, 3-button navigation mode):

- Measured system insets: `{ "top": 32, "right": 0, "bottom": 48, "left": 0 }`.
- **Primary Root Cause 1 (Outer Safe Area Double-Padding)**:
  `apps/customer/app/(app)/account.tsx` wrapped the entire screen in `<HaulixSafeArea>`. `HaulixSafeArea` defaults to applying padding on all four edges (`['top', 'right', 'bottom', 'left']`). On Android with 3-button navigation, `SafeAreaView` applied `paddingBottom: 48` to the entire screen container. Because `CustomerBottomNav` was anchored at `bottom: 0` inside that container, it was forced **48dp above the physical navigation bar**.
- **Primary Root Cause 2 (Inner Redundant Inset Padding)**:
  Inside `CustomerBottomNav.tsx`, the container read `insets.bottom` (48) from `useSafeAreaInsets()` and applied `paddingBottom: Math.max(insets.bottom - 10, 0)` (= 38dp).
- **Primary Root Cause 3 (Excessive Row Heights)**:
  `styles.tabsRow` and `styles.container` both had fixed `height: 108` and `paddingBottom: 16`, lifting icons and labels by an extra 20+dp inside the already floating container.
- **Combined Impact**:
  `48dp (outer SafeAreaView) + 38dp (inner container padding) + 16dp (tabsRow padding) = ~102dp` of empty black void between the tab labels and Android's native 3 buttons.

### B. Applied Architectural Fix

1. **Outer Route Edge Restriction**:
   In `account.tsx`, `<HaulixSafeArea edges={["top", "left", "right"]}>` was specified. The screen container now extends all the way to the bottom of the window, eliminating the first 48dp offset.
2. **Single Bottom Safe-Area Inset Handling in `CustomerBottomNav`**:
   `CustomerBottomNav` defines `BASE_NAV_HEIGHT = 80` (containing the dome curve, Book button, tab icons, and labels with 6dp bottom clearance). It adds `safeBottom = Math.max(insets.bottom, 0)` exactly once to total container height (`height: totalNavHeight`, `paddingBottom: safeBottom`).
3. **Edge-to-Edge Vector Background**:
   `NavSculptedCurve` is mounted inside an overflow-hidden wrapper spanning `width={screenWidth}`, with solid `#080D0C` fill extending down behind the Android navigation controls.
4. **Scroll Clearance**:
   `ScrollView` in `account.tsx` uses `paddingBottom: 138`, ensuring that the bottom-most button ("Saved Addresses") scrolls 100% clear of the raised Book dome.

---

## 3. Profile Photo Action Sheet & Frontend Flow

### A. Architectural & Visual Design (`docs/PHOTO_FLOW_DESIGN_SPEC.md`)

Created `apps/customer/src/components/account/ProfilePhotoActionSheet.tsx`:

- **Triggers**:
  1. Tapping the circular `SM` avatar / camera badge (`testID="c10-sm-avatar"`) in the Verified Customer card.
  2. Tapping "Profile photo · Add / change / remove" (`testID="c10-profile-photo-shortcut"`) in the Security & Profile Photo card.
- **Visual Design**:
  - Dark dimmed backdrop (`rgba(0,0,0,0.72)`) with tap-outside dismissal.
  - Surface `#151A19`, border `#35403B`, top corner radius 24, grab handle 36×4.
  - Centered circular 92×92 preview with 2px lime (`#BAFF42`) border.
  - Elevated action rows `#222827` with 1px border `#35403B` and 44dp+ touch targets.
- **States & Transitions**:
  1. **Idle / No Photo**: Preview shows `SM` bold initials. Options: "Choose from gallery" and "Take photo".
  2. **Idle / Has Photo**: Preview shows current saved photo. Options: "Change from gallery", "Take new photo", and "Remove photo" (danger red `#FF5252`).
  3. **Preview Selection**: Shows selected photo after native 1:1 crop. Prompts "Review your cropped photo before saving" with "Save photo" (primary lime) and "Cancel" buttons.
  4. **Removal Confirmation**: Header "Remove profile photo?", subtext "Your avatar will revert to your initials (SM)." Prompts "Remove" (danger red `#E53E3E`) and "Keep photo".
  5. **Permissions & Error Handling**: Gracefully requests camera permissions via `ImagePicker.requestCameraPermissionsAsync()`; displays inline error banner if denied or aborted.
  6. **Local Persistence**: Stores photo URI in `SecureStore` under alphanumeric key `haulix_c10_profile_photo`. Loaded on C10 mount. Cleared when removed.

---

## 4. Reused Figma Assets & Files Modified

### Reused Figma SVGs (No Arbitrary Stock Replacements)

- `nav_sculpted_curve.svg` (`I959:8556;957:8585`): Exact 430×128 curved dome background vector.
- `nav_home.svg` (`I959:8556;957:8595`): 26×26 Home tab icon.
- `nav_my_jobs.svg` (`I959:8556;957:8598`): 26×26 My Jobs tab icon.
- `nav_book_plus.svg` (`I959:8556;957:8607`): 24×24 Book plus icon in center 48×48 circle.
- `nav_deals.svg` (`I959:8556;957:8601`): 26×26 Deals tab icon.
- `nav_account_active.svg` (`I959:8556;957:8604`): 26×26 Account tab active icon (lime `#BAFF42`).
- `camera_badge.svg` (`941:8498`): 13×13 camera icon in 21×21 badge.
- `profile_photo.svg` (`936:8503`): 20×20 profile photo icon.

### Files Modified & Created

| File                                                               | Action   | Purpose                                                                                        |
| ------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------- |
| `apps/customer/app.config.ts`                                      | Modified | Configured `expo-image-picker` plugin with photo & camera permission strings                   |
| `apps/customer/app/(app)/account.tsx`                              | Modified | Corrected `HaulixSafeArea` edges, integrated photo sheet, photo loading & avatar image render  |
| `apps/customer/src/components/navigation/CustomerBottomNav.tsx`    | Modified | Corrected nav geometry, eliminated dead space, unified bottom safe-area insets                 |
| `apps/customer/src/components/account/ProfilePhotoActionSheet.tsx` | Created  | Reusable bottom sheet for profile photo selection, capture, confirmation, and local storage    |
| `apps/customer/src/__tests__/account.test.tsx`                     | Modified | Added tests for navbar safe-area policy, photo sheet triggers, and local persistence isolation |

---

## 5. Physical Android Test Evidence

Testing conducted on physical connected device: **Realme Android 15 (RMX3930), 360dp width, 720×1600 px**.

| QA Artifact Filename                                  | Screen State & Verification Description                                                                                |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `docs/qa/c10/android-C10-en-nav-corrected.png`        | C10 screen top: Navbar sits directly above Android 3-button navigation bar; zero dead strip.                           |
| `docs/qa/c10/android-C10-en-nav-scrolled-end.png`     | C10 screen scrolled to bottom: "Saved Addresses" CTA is fully visible above navbar dome.                               |
| `docs/qa/c10/android-C10-en-photo-sheet-empty.png`    | Photo sheet opened (no photo): Grab handle, `SM` initials preview, "Choose from gallery", "Take photo".                |
| `docs/qa/c10/android-C10-en-photo-picker-opened.png`  | Native Android system photo picker opened with device gallery albums.                                                  |
| `docs/qa/c10/android-C10-en-photo-selected.png`       | Photo sheet confirmation: 1:1 cropped image preview with "Save photo" and "Cancel" buttons.                            |
| `docs/qa/c10/android-C10-en-avatar-updated.png`       | C10 Verified Customer Card: Avatar circle (72×72) displays clipped local photo with camera badge.                      |
| `docs/qa/c10/android-C10-en-sheet-has-photo.png`      | Photo sheet opened (has photo): Displays saved photo preview, "Change from gallery", "Take new photo", "Remove photo". |
| `docs/qa/c10/android-C10-en-photo-remove-confirm.png` | Removal confirmation dialog: "Remove profile photo?" with danger red "Remove" and "Keep photo".                        |
| `docs/qa/c10/android-C10-en-avatar-reverted.png`      | C10 Verified Customer Card: Avatar cleanly reverted to `SM` initials upon removal.                                     |

---

## 6. Verification & Quality Pipeline Results

All 4 mandatory quality verification commands executed with 100% success:

1. **Biome Lint & Formatting (`pnpm check`)**:

   ```bash
   $ biome check .
   Checked 153 files in 64ms. No fixes applied.
   ```

   _Result: PASSED (0 errors, 0 warnings)._

2. **TypeScript Typecheck (`pnpm typecheck`)**:

   ```bash
   $ turbo run typecheck
   Tasks:    7 successful, 7 total (all 7 packages: customer, driver, design-tokens, i18n, logger, ui, utils)
   ```

   _Result: PASSED (Zero type errors)._

3. **Jest Unit & Regression Test Suite (`pnpm test`)**:

   ```bash
   $ turbo run test
   Test Suites: 13 passed, 13 total
   Tests:       109 passed, 109 total
   Snapshots:   0 total
   Time:        6.953s
   ```

   _Result: PASSED (109/109 tests passing across all packages)._

4. **Environment Health Doctor (`pnpm doctor`)**:

   ```bash
   ✓ Versions: pnpm 11.25.0, Node.js 26.0.0
   ✓ Install method: @pnpm/exe
   ✓ All checks passed
   ```

   _Result: PASSED._

---

## 7. Remaining Limitations & Boundaries

- **Frontend Mock Boundary**: Sarah Mitchell profile details and active booking (`HX-DEMO-1027`) remain local demonstration fixtures.
- **Local Photo Storage Boundary**: Selected profile photos are persisted exclusively on-device via `SecureStore` for UI QA preview. No photos are uploaded to any backend service.
- **Unimplemented Screens**: C10 Spanish localization, C10-E Edit Profile form, and Phase 03 Customer Home / Bookings / Payments remain untouched per strict project scope.

---

### Hard Stop Declaration

Phase 02.9.1 (C10 Navbar Fidelity + Profile Photo Add/Change/Remove) is 100% complete and verified on physical Android hardware. STRICT HARD STOP.
