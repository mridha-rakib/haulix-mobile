# HAULIX Mobile — Phase 02.9: C10 Account Overview (English) — Frontend-Only APK QA

## Objective and strict scope

Implement **only C10 — Account Overview (English)** from Figma node `333:26`, inside the existing HAULIX Expo React Native Customer App. Do not begin C10 Spanish or C11, profile editing, address management, payment, passwords, notifications, booking, or any other new screen. Follow the single-screen cycle: original Figma inspection → supplied original SVGs → implementation → real Android APK QA → report → STOP.

**Important new owner decision (supersedes earlier Phase 02.7/02.8 frontend QA restrictions): During the current frontend-design-only phase, there must be NO frontend authentication guard, `__DEV__` gate, login requirement, preview-only release fallback, or production-mode screen block preventing testers from opening designed screens in a debug or release APK.** We need to traverse/test the full designed frontend as-is, even without an authentication backend. Apply this consistently to C09-to-C10 frontend preview navigation and C10 direct route entry. This is NOT permission to bypass or remove real server authorization, access production accounts, claim genuine verification, store fake OAuth/JWT tokens, make actual payments, or expose personal data. Use clearly documented local _fictional sample data_, not backend account/session state. Reintroduce real authorization when actual backend integration is implemented and specified.

## Project and authoritative references

- Repo: `haulix-mobile` — `apps/customer` is the Expo app; `apps/driver` is out of scope.
- Stack: existing Expo SDK 58, React Native, Expo Router, NativeWind, TypeScript strict, pnpm + Turborepo, Biome, shared `@haulix/ui`, `@haulix/design-tokens`, `@haulix/i18n`.
- Figma file: `Q946h4YBGgyLsjnPtdyQNe`.
- **C10 English authoritative node:** `333:26`, 430 × 1580 px, URL: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=333-26
- Bottom navigation: original C01 sculpted shared component used on C10, instance `959:8556`, library/component `957:8794`, **Active=Account, Locale=EN**, 430 × 128 reference.
- **Do not mistake C09 for C10:** C09 (`331:118`) has NO avatar; **C10 DOES have a circular `SM` avatar and 21 px camera badge**. Implement C10 exactly, not inherited C09 assumptions.

Inspect this Figma node screenshot before editing; compare visible geometry. This is an extended-height 1580 px design artboard; build a **responsive scrollable page plus bottom-fixed reusable navigation**, not an unscrollable 1580 px screen. Preserve safe areas, avoid overlap, and reserve enough ScrollView bottom padding for the nav.

## Source-of-truth visible sections

1. **Header** — back circle, centered HAULIX wordmark (`HAUL` near white and `IX` lime), notification circle with green unread dot. Figma header at x=22,y=79,w=386,h=61. Native status bar should respect the real Android platform; do not paint a fake iOS 9:41 status bar over the actual Android status bar.
2. **Intro** — title `My Account` at x=22,y=159, ~28 px Inter Bold. Subtitle: `Manage your HAULIX customer profile and booking preferences.`
3. **Account status** — lime shield, single lime dot/indicator styling as in Figma, text `SARAH MITCHELL · CUSTOMER ACCOUNT`, x=22,y=256,w=386,h=43. Do not duplicate decorative bullet.
4. **Verified customer card** — x=22,y=318,w=386,h=340, bg `#151A19`, radius ~18. Header `Verified customer`; customer name `Sarah Mitchell`; email `sarah.mitchell@example.test`; phone label `Phone · verified`, number `+1 602-555-0142`; status `Account verified · Arizona service area`. The **circular SM avatar** and overlayed camera badge are authentic **on C10**, with avatar at nested node `941:8494` (72 × 72), actual circular border/initials, badge ~21 × 21, source icon `941:8498` (13 × 13). Do not add a generic stock photo or remove this avatar.
5. **Account & preferences card** — x=22,y=677,w=386,h=353, radius ~18. Rows: `Saved pickup address` → `1234 E Example Lane, Phoenix`; `Language` → `English (United States)`; `Payment methods` → `TEST payment reference saved`; `Active booking` → `HX-DEMO-1027 · Junk Removal`. These are **fictional read-only fixture values**, not backend records.
6. **Sign-out & language** — `↗ Sign out` at y≈1049; `🌐 Español · Cambiar idioma` at y≈1083. Tapping Sign out should navigate the frontend back to existing C06 Sign-in; since there is no actual session, do NOT claim a server logout. Language switch must use existing i18n state. **Do not implement C10 Spanish copy yet** (reserved for next phase); avoid silently fabricating it. Document interim English-only C10 behavior after locale switch, while other completed screens should continue to localize correctly.
7. **Security & profile-photo shortcuts card** — x=22,y=1117,w=386,h=140; title `SECURITY & PROFILE PHOTO`; 2 rows `Change password` and `Profile photo · Add / change / remove`. They must be touch-accessible. Target screens and real upload/security actions are future phases; do not fabricate password changes or photo uploads. An honest `Not implemented in frontend phase` notice is acceptable.
8. **Action buttons** — `Edit Profile` and `Saved Addresses` around y=1276 and y=1353 (each wrapper w=386,h=58; inner native button approx 364 × 54). These should be present and pressable, but do not implement target screens in this phase; show a clear pending notice where target route is not implemented.
9. **Original sculpted bottom navbar** — instance starts at x=0,y=1430; includes Home, My Jobs, **Book** (+ highlighted circle), Deals, **Account** (active lime). Use the supplied source vector `nav_sculpted_curve.svg` and icon SVGs; do not replace with ordinary rectangular tabs. The nav is **reusable** across appropriate customer app screens, but must **not** be added to C06/C07/C08/C09 auth screens. Deals is a **visual-only item** per Figma component documentation, not an approved route: do not invent a Deals page. Existing implemented routes may navigate; unimplemented routes show a non-success notice. Preserve hit-target sizes and bottom system safe-area.

## Original Figma assets & source rules

Use `assets/original-figma-svg/` from this package (19 SVG files) and `ASSET_MANIFEST.csv` (source node IDs, SHA256) for icon and nav geometry. The SVG contents were taken from Figma `exportAsync` output, retaining original vector paths, fills, viewBoxes, and geometry. They are not screenshot assets. Treat `nav_sculpted_curve.svg` (430 × 128) as especially important for fidelity. Reuse existing installed vectors/components if they match **exactly**, avoid copying a second component into UI package unnecessarily; do not create another independent navbar. Keep the original `#BAFF42` palette and exact icon proportions. Use React Native-compatible SVG rendering already available in monorepo, no random web icon substitution. The Figma screenshot itself is **not included**: obtain it from the node directly and store the screenshot genuinely if access permits. Never use the whole Figma screen image as the rendered app.

## Layout, quality and architecture

- Use existing shared design tokens: `#BAFF42` brand, `#080B0B` bg, `#151A19` surface, `#222827` elevated, `#F6F8F6` primary text, `#ADB7B1` secondary text, Inter.
- Render scrollable account content above a reusable persistent nav. On Realme 360 dp / Android 15, preserve all rows, buttons, wordmark and camera badge without clipping. Test both keyboard and non-keyboard states only where applicable.
- Use existing `packages/ui` primitives; create small app-specific components for account rows/cards and a reusable Customer bottom nav (if not already present). Clean TS; no monolith, no duplicate colors, no needless dependencies, no unaudited route changes.
- Keep the visual account fixture central in a `c10DemoProfile`/`fixtures` module typed explicitly as mock/local preview data. Do not write it to persistent auth/user storage, do not make real account claims, do not fetch user data.
- Inspect actual Expo Router file tree; choose appropriate existing `(app)` route for C10 and wire a safe frontend QA entry point. Do **not** create a fake authenticated context or bypass any actual server API authorization. Remove frontend-only `__DEV__`/release guards that block UI previews (including C09 entry to C10 and any QA entry as necessary); do not reintroduce them in an APK. This is an intentional current project rule. Keep C09's fictional success disclaimer and no actual OAuth state.
- `Go to My Account` on C09 may now route to C10 **as a frontend UI preview** without backend login, for QA. Direct C10 deep-link must also render the fixture in debug and release APK. Sign-out returns to Sign-in as a frontend navigation action, not a real logout.
- Do not route to unimplemented future screens and do not add bottom nav to auth.

## Mandatory testing on Android device / APK

Test **actual APK** frontend navigation where build tools permit (a development build is not the same as a signed release build; report exactly which kind was installed). Test in Expo Go as an interim aid, but do not call that APK QA. Validate C09 → C10 → Sign out → C06, direct deep link into C10, original navbar active state, taps on all visible controls, scrolling and bottom safe area, demo-only fixture, and no auth-gate blocks even when `__DEV__` is false / release build. If no APK can be built, say APK test pending; capture genuine Expo Go screenshots with accurate labeling, not fabricated evidence. Also ensure C06–C09 English/Spanish do not regress.

Store actual screenshots under `docs/qa/c10/`, e.g. `figma-C10-en-reference.png` if truly exported, `android-C10-en-top.png`, `android-C10-en-profile.png`, `android-C10-en-preferences.png`, `android-C10-en-shortcuts.png`, `android-C10-en-bottom-nav.png`, `android-C10-en-c09-navigation.png`, `android-C10-en-signout.png`, `android-C10-en-release-apk.png` **only if a real installed release APK was tested**. Include exact screen density/width, screenshots, noted visual deviations, and corrections.

Run existing commands:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```
Add focused Jest tests for screen structure, correct C10 avatar vs C09 no-avatar rule, existing nav, demo values, zero auth guards, route access in APK preview, and no bottom nav leakage to auth screens.

## Required report and STOP

Create `PHASE_02_9_C10_EN_REPORT.md` with implemented scope, file diff, UI screenshot comparisons, asset checks, reusable component changes, explicit **guard-free APK UI preview verification**, tests, device/build evidence, limitations (backend not integrated), and remaining issues. No "100%" claims without direct evidence.

**STOP after C10 Account Overview English. Do NOT implement C10 Spanish, profile editing, saved addresses, password changes, photo uploads, payment methods, bookings, or any other new screen.**
