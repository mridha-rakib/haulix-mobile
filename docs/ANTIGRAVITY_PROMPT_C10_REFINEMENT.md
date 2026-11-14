# HAULIX Customer App — Phase 02.9.1: C10 Navbar Fidelity + Profile Photo Add / Change / Remove

## CONTEXT AND EXACT SCOPE

This is a **focused correction to the already implemented C10 Account Overview (English)**. The project owner supplied an actual Android screenshot showing that the bottom navigation does not visually match Figma and leaves a large empty black strip between the nav icons/labels and Android's native navigation bar. The `Profile photo · Add / change / remove` shortcut is also currently not a complete frontend interaction.

**Do not start C10 Spanish, C10-E Edit Profile, C11, C12, C13, C14, password change, booking, payments, real authentication or any other new route/screen.** A reusable bottom sheet and its transient states belong to C10, not a new page.

Owner policy (binding): **This is frontend-only QA. Never add auth guards, `__DEV__`-only page gates, or release-APK preview blocks.** The already implemented C06–C10 UI screens must remain directly browsable in both development and APK QA. Use locally stored demo/preview data; no fake OAuth tokens, backend verified status, API requests, cloud uploads or genuine production customer claims.

Authoritative Figma references:

- C10 English account: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=333-26
- **C10 navbar instance:** `959:8556`; shared source component `957:8794`, **Active=Account, Locale=EN**.
- **Exact Figma navbar:** 430 × 128 reference; source SVG included here `assets/original-figma-svg/nav_sculpted_curve.svg` and original icons.
- C10 avatar + camera: `941:8494` (72×72 avatar action), camera icon `941:8498` (13×13); already used in C10.
- C10 Edit Profile `333:116` is a _separate_ existing Figma form state, **not** the photo-management action sheet; do not implement it in this phase.

Existing repo areas to inspect first:

```
apps/customer/app/(app)/account.tsx
apps/customer/src/components/navigation/CustomerBottomNav.tsx
apps/customer/src/components/account/C10Icons.tsx
apps/customer/src/fixtures/c10DemoProfile.ts
apps/customer/app/(app)/_layout.tsx
apps/customer/app/_layout.tsx
packages/ui/src/components/HaulixSafeArea.tsx
packages/design-tokens
packages/i18n/src/locales/en.ts
packages/i18n/src/locales/es.ts
```
Inspect actual files/versions before editing. Do not replace the working Expo SDK 58 / Expo Router / NativeWind / strict TypeScript foundation or unrelated components.

## TASK A — FIX THE SHARED BOTTOM NAVIGATION (TOP PRIORITY)

The supplied `evidence/user_reported_C10_android_nav_issue.png` is the issue report. In it, the navbar floats too high, with an oversized black blank space under its labels, above the real Android three-button system navbar. The Figma shared navbar has a shaped continuous curve, center raised lime Book circle and precise icon/label placement.

1. **First diagnose actual root cause**; do not randomly tweak paddings. Inspect all contributing styles from the C10 route through safe-area and app layouts: root SafeAreaView bottom padding, ScrollView bottom spacer, nav wrapper height, `position: absolute`, `bottom`, `paddingBottom`, `marginBottom`, Android system bars, `useSafeAreaInsets`, any extra fake iOS home-indicator area and any nested footer. Log measured viewport, inset bottom, nav bounds, content bounds and Android mode. Check for double-application of `insets.bottom` and 128px iOS-optimized height applied unconditionally on Android.
2. Preserve the original shape and icons, not a stock tab bar. Use the source Figma vectors already integrated (assets repeated here for auditing) and existing `CustomerBottomNav`; **never create a second navbar**.
3. Reference geometry at **430px width**: sculpted background 430×128; dome peak roughly x=215,y=2; upper side edge y≈23; center Book lime 47×47 at x≈191.5,y=11; Book plus 24×24 at x≈203,y=22; icons 26×26 at Home x=35, My Jobs x≈119, Deals x≈286, Account x=369, y=38; label row y≈72. Account icon and label active lime; others muted. Source includes decorative 4px iOS home indicator around y=104: **do not display fake iOS home indicator on Android** when Android already supplies its native navigation controls.
4. On Android the navbar must be anchored **immediately above the actual native system navigation safe area**, with zero unexplained dead strip. Apply bottom safe-area inset **exactly once**, not both in parent and child. Keep original floating Book/dome silhouette. Use measurement and platform-aware layout instead of hardcoding a random `bottom: -NN`, huge fixed `marginBottom`, or an unconditional 128dp+inset height. Edge-to-edge vs non-edge-to-edge behavior must be explicitly checked. Native Android navigation/gesture bar remains visible and not covered.
5. Make navbar span screen width edge-to-edge (not accidentally inset inside account card x=22 or scroll padding). Scale the 430px reference proportionally to current available width, preserve center/alignment, labels and hit areas; Android 360dp device must fit. Avoid unnecessary glows, shadows, enlarged plus or extra horizontal line compared with Figma. The reference Book circle is lime, and Account is active.
6. Keep navbar **outside** ScrollView, fixed to viewport; account content scrolls behind/above it safely with just enough content bottom padding to reveal final Saved Addresses CTA. **Bottom scroll padding is for scrollable content, not an extra black footer under navbar**.
7. Keep nav reusable. **Never render it on auth routes C06, C07, C08, C09**. `Deals` remains visual-only (not an invented route). Existing implemented targets can navigate in this frontend-only phase; unimplemented targets get a non-success informational notice.
8. Verify in 3-button Android navigation mode shown in the screenshot AND gesture navigation if possible. Reproduce both near top and at page bottom. Document exact root cause and before/after rendered bounds.

## TASK B — IMPLEMENT THE COMPLETE PROFILE PHOTO FRONTEND FLOW IN C10

The source C10 Figma shows a circular `SM` avatar/camera badge and a `Profile photo · Add / change / remove` shortcut. **No separate Photo Add/Change/Remove Figma interaction frames were found.** Design these missing transient UI states consistently with the existing HAULIX dark theme. Treat them as _new component-level frontend UX_, not claimed as pixel-perfect source designs.

Create/refine a small reusable `ProfilePhotoActionSheet` / `ProfilePhotoManager` under `apps/customer/src/components/account/` (or existing matching module). Do not add a new Expo Router screen.

**Open triggers:** both (i) tapping the circular avatar/camera badge and (ii) tapping `Profile photo · Add / change / remove` in the Security & Profile Photo card open the same action sheet.

**Proposed UI spec (new design, not an existing Figma screen):**

- Dimmed black translucent backdrop; bottom sheet using existing `#151A19` surface, elevated action rows `#222827`, thin `#35403B` border, top corners 20–24dp; safe-area padding once; tappable grab handle ~36×4.
- Heading `Profile photo`, optional subtext `Stored locally for frontend preview`, large circular 88–96dp preview with lime outline and correct aspect/circular crop; no generic stock imagery.
- No-photo state: initials `SM`, actions `Choose from gallery`, `Take photo`, `Cancel`; `Remove photo` disabled/hidden until an image exists.
- Has-photo state: actual selected image preview, actions `Change from gallery`, `Take new photo`, `Remove photo`, `Cancel`.
- After selecting a picture, present a confirmation/preview state with `Save photo` and `Cancel` so cancel does not destroy existing avatar. `Remove photo` must open a confirmation dialog: `Remove profile photo?` → `Remove` / `Keep photo`. Only update actual local avatar when confirmed.
- Use existing typography/brand tokens and accessible 44dp+ touch targets. When keyboard is absent, sheet must not cover Android nav; handle back press, overlay tap, permission denied, cancellation, failures and reentry without crashes. Ensure scroll/limited height on smaller screens. Add subtle loading only while a real local operation is running, not fake upload progress.

**Actual frontend functionality:** Use Expo SDK 58-compatible `expo-image-picker` (after inspecting actual project deps). Configure with `npx/pnpm expo install` or the repo's approved equivalent, without downgrading Expo. Implement photo gallery selection (`launchImageLibraryAsync`), camera (`requestCameraPermissionsAsync` + `launchCameraAsync`), optional 1:1 crop via supported editor, selected image preview, replace, remove, and local-only storage. Check SDK 58 image-picker docs for the current API and config plugin. Request permissions only when needed; show an accessible explanation if denied; never fabricate success.

Persist chosen photo **only on the device** across C10 navigation and app restart for frontend QA. Use an existing storage abstraction if present; otherwise a minimal safe app-document file copy plus URI reference in existing app-local storage (e.g., AsyncStorage) is acceptable. Inspect available Expo file system APIs first. Do not store giant base64 photos, not copy to public gallery, not upload to server, not persist actual credentials. Clean up replaced/removed local copies and handle stale/deleted files gracefully. Restore initials when removed. The actual gallery/camera permission lifecycle must work on a real Android device / standalone APK.

Keep C10 textual demo profile and backend-facing state separate from local photo preview. No fake verified photo, backend upload, database user update or real auth state. Never insert C09's previously incorrect avatar into C09; this camera/photo action applies **only C10**.

## TASK C — CORRECTION QUALITY / TESTS

A) **Screenshot visual QA**: Compare C10 Original Figma (`333:26`), navbar (`959:8556`) and both the user's reported Android screenshot and corrected Android capture. Record differences in precise navbar shape/width/position, labels, Book circle, Account state, tab hit zones, bottom blank strip, Android system bar and scroll. Do not show a whole-frame Figma screenshot as app UI. Original screenshot not included; original vectors and Figma link are.

B) **Photo state QA**: Capture fresh initials, action sheet without picture, image picker, cropped selected photo preview, saved avatar, reopen and change, remove confirmation, restored initials, cancel, permission denied, app restart persistence, camera if hardware permits. Do not use a real user's personal photo in a published screenshot; use test image data or obscure personal content. Distinguish actual OS picker screenshots from app UI.

C) **Regression QA**: C10 English overall account layout and scroll; C09 → C10; no auth gates, mock sessions or backend tokens; C06–C09 have no bottom navbar; existing English/Spanish routes render; no driver app modifications. No C10 Spanish implementation yet. If C10 English currently shows Spanish switch, preserve i18n state but do not invent a new C10 Spanish design in this phase.

D) **Quality pipeline**:

```
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```
Add focused tests for computed safe area/geometry policy, nav visibility/active state, toggle/photo sheet state, remove confirmation and cancellation, locale state preservation where already supported, and no mock network effect. Existing tests must still pass.

E) **Real APK**: Run on Realme Android 15 / 360dp (or confirm connected device). If build available, install and inspect an actual APK, state whether it is debug/dev or release; Expo Go is not equal to APK QA. Verify image-picker permissions/config plugin on installed binary and nav spacing with Android system buttons. If APK cannot be built, report this accurately as pending instead of claiming done.

## REQUIRED DELIVERABLES

Create `PHASE_02_9_1_C10_NAV_PHOTO_REFINEMENT_REPORT.md` with:

1. Root cause of navbar excess bottom space (include measured insets, before/after dimensions and applied fix).
2. Exact reused Figma asset list (no arbitrary replacements) and files touched.
3. Photo component states + gallery/camera/local persistence implementation & permission behavior.
4. Android before/after screenshots including bottom navigation and photo flow states.
5. APK variant/installed test evidence versus Expo Go, noted visual differences.
6. Four mandatory command results and test counts.
7. Remaining limitations (no backend integration) and pending issues.

**STOP after C10 English navbar + photo workflow refinement. Do not implement C10 Spanish, C10-E full Edit Profile or any other page.**
