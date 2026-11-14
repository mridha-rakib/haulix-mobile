# HAULIX Customer App — Phase 02.5 Antigravity Implementation Prompt

## Mission

Implement **ONE screen only:** **C08 — Phone Verification / OTP (English Default)** from exact Figma node `331:75`.

Figma: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=331-75

Reference: 430×788 px. Work inside the **existing** `haulix-mobile` pnpm + Turborepo monorepo. Customer Expo React Native app only. Do not recreate the repo or downgrade dependencies.

### Read these first

- `docs/C08_EN_FIGMA_AUDIT.md`
- `docs/ASSET_AUDIT.md`
- `docs/ANDROID_QA_C08_EN.md`
- `docs/C08_EN_ACCEPTANCE_CRITERIA.md`

Also inspect actual C06/C07 code, `packages/ui`, `packages/design-tokens`, `packages/i18n`, existing route conventions, NativeWind configuration and current tests _before editing_. Compare the implementation against an actual screenshot captured from Figma `331:75`. The screenshot is **not** packaged; do not substitute this Markdown description as proof of visual equivalence.

## 1 — STRICT SCOPE

Only implement the C08 English Default OTP UI and its honest local input interactions.

- Add only the necessary single auth route under the Customer app, using the repo's established naming/layout conventions (e.g., existing `verify-phone` or equivalent, if present).
- No C08 Spanish, C08 expired state, OTP error-page, phone-entry page, loading/success pages, social flows, admin screens, or Driver changes.
- Do not enable real registration/verification until backend endpoints are approved and integrated.
- Do not touch existing production icon/splash packages or app package identifiers.
- No bottom navigation on auth routes.

## 2 — Reuse architecture, never duplicate

Expo SDK 58 + existing Expo Router + TypeScript strict + NativeWind. Reuse the existing `HaulixSafeArea`, button, typography, card and field primitives where suitable. If an OTP field is likely reusable, implement one small focused component in the correct app/shared package—do not build a new component library or introduce duplicative styles.

No absolute pixel coordinates for interactive native layout: use SafeAreaView, ScrollView/keyboard-aware behavior, responsive RN flex layouts and exact reference sizes as target at 430px. Avoid arbitrarily clipping or shrinking typography. Use `#BAFF42`, `#080B0B`, `#151A19`, `#222827`, `#F6F8F6` through existing tokens. Preserve Inter, TypeScript and Biome conventions.

Use native Android status bar—Figma's status-bar artwork is illustrative only; never add a fake 9:41 or dynamic-island widget to Android.

## 3 — Exact visible C08 English composition

1. HAULIX wordmark and `WE HAUL IT ALL.` tagline.
2. Heading `Verify your number.`; description `Enter the one-time code sent to the registered demo number.`
3. Single-dot Phoenix availability chip `● PHOENIX, ARIZONA • HAULIX CUSTOMER`.
4. Dark card with reference number `+1 602-555-0142` (a Figma **demo fixture**, NOT proof an SMS was sent).
5. Six OTP slots, each **50×58px** in the 430px design, **8px gaps**, first slot outlined lime at rest.
6. Helper `Code expires after the verification window. Never share this code.`
7. `Did not receive a code?` row, hint `Resend available after cooldown`, right chevron.
8. Primary CTA `Verify & Continue` and secondary `Change phone number`.
9. Visible safety annotation `DEMO ONLY • No real authentication or messaging` matching the Figma; do not hide it while in demo-only state.

Match screen hierarchy and dimensions from the audit. Buttons: 386×58 wrapper, inner 366×54. Card 386×236 at Figma x=22,y=349. Screen frame 430×788. Render responsively, avoid clipping at 320-360dp and at large font scale.

## 4 — Native OTP input behavior

Implement a real accessible six-digit OTP input, not six fake static bullet labels:

- Single logical numeric text input is preferred, visually projected into six individual slot boxes; ensure tap on any slot focuses the keyboard.
- Accept digits `0-9`, length max six; paste handling; backspace/delete; no non-digit characters.
- Auto-advance/field focus appropriate to chosen implementation; manage keyboard and focus on actual Android hardware.
- Mask entered digits consistent with Figma dot motif, without exposing codes in logs, analytics, toasts, screenshots or persisted storage. Empty-state styling should still resemble Figma default; do not fabricate a prepopulated received OTP.
- Provide accessible label/hint for screen reader; ensure touch targets remain usable on smaller screens and with font scaling.
- Avoid OTP values in route params or URL. Do not persist OTP in AsyncStorage. Never include an OTP in console logs/test reports.
- Keep button visual style faithful to Figma default; incomplete input must not trigger verification. Show localized English inline feedback or an honest notice as appropriate, with no fake account activation.

Do not invent backend OTP expiry length, resend interval, retry rate limit, SMS delivery or verification outcome. Do not implement a countdown that suggests a server-issued code when none exists. Once backend exists, those must come from server settings/contract.

## 5 — Honest backend state and navigation

- `Verify & Continue` with insufficient digits: local validation only.
- With six digits: **never** claim `verified`, create account, issue token, or navigate to a success destination without a server-confirmed response. Show a clear, dismissible English backend-not-connected notice instead.
- `Did not receive a code?`: no fake SMS/resend success. Until backend is ready, tapping may display a truthful non-success notice; `Resend available after cooldown` is Figma reference copy, not a real timer.
- `Change phone number`: navigate to a **pre-existing** appropriate editable phone input screen (e.g. C07 registration if arriving from C07), preserving user-safe state where feasible; no extra screen. If the intended route is absent, report a blocker instead of inventing a new phone-entry page.
- C07 valid input with consent must not silently create a verified account. If you add an entry point to preview C08 for Android QA, make it explicitly demo/dev-only, with zero fake backend progression and no production success flow. Report exactly how you reached the screen on the test device.
- Avoid collecting, transmitting or logging real user codes while backend is unavailable.

## 6 — Localization boundary

Scope English only. Extend shared `packages/i18n` key structure _only as needed_ for type safety, without rewriting unrelated Spanish UI or implementing C08 Spanish. Keep current C06/C07 EN↔ES language switching unchanged. If future Spanish keys are required by current i18n typing, add them without exposing a Spanish OTP screen in this phase; explain the decision.

## 7 — Android physical QA (mandatory)

Confirm ADB device and test through the available Expo development environment on real Android hardware; screenshot Figma source first. Android screenshots must include initial full/scroll view, focus/keyboard, partial OTP, 6-digit display, deletion/paste handling, incomplete validation, backend-not-connected notice, resend no-success notice, return-to-C07 tap navigation, and small viewport/font-scale check where device configuration allows. Never claim tests passed if not actually run.

Save QA evidence to `docs/qa/c08/` rather than production assets folder. Do not place test fixtures/buttons in production user journey. Compare visible screenshot vs actual Figma layout side by side; log measured discrepancies and corrections. Test on 720×1600 Realme Android 15 if connected, but verify device availability rather than assuming.

Verify no C06/C07 layout, locale, consent, or navigation regressions. Keep separate screenshot of any intentional reference-to-native difference (such as system status bar).

## 8 — Commands / checks

Run and report:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Check Metro bundling and install requirements. Ensure dependencies are Expo-compatible; avoid new dependencies if already achievable with React Native primitives. Write focused real tests of numeric filtering, length, backspace/paste, validation, absent-backend behavior and no invented session success.

## 9 — Deliverables and hard stop

Create `PHASE_02_5_C08_EN_REPORT.md` containing:

1. Exact route and files changed; screenshots of original C08 Figma vs physical Android.
2. Scope confirmation (English DEFAULT only) and no other screens implemented.
3. Original asset assessment (new SVG/PNG count zero), any deviations.
4. Detailed OTP input/accessibility/responsiveness behavior.
5. Honest no-backend actions and navigation entry strategy.
6. Actual QA evidence filenames and remaining gaps.
7. Biome, TypeScript, Jest, Expo Doctor and Metro results.
8. C06/C07 regression results.
9. Unresolved issues; readiness for user approval and later C08 Spanish.

**STOP HERE. Do not implement C08 Spanish, C08 expired/error states, C09 or any other screen without approval.**
