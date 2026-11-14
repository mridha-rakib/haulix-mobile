# HAULIX Mobile — Phase 02.7: C09 Social Sign-in Return / Success (English ONLY)

## Mission

Continue in the **existing** `haulix-mobile` Expo React Native monorepo. Implement one and only one C09 English Figma state as a **safe, isolated visual QA preview**—**NOT real OAuth success**.

**Figma file:** `Q946h4YBGgyLsjnPtdyQNe`
**Figma node:** `331:118`
**Node name:** `C09 · Social Sign-in Return / Success [CU-03, NFR-01]`
**Reference:** 430×743 px, https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=331-118

**Crucial discovery:** C09 is the fictional **success/return** page with the title `Account connected.`, _not_ the page offering Apple and Google choices (those buttons already exist in C06/C07). Do not implement a social-provider chooser here.

## 1. Read references and inspect current repo

Read this package's:

- `docs/C09_EN_FIGMA_AUDIT.md`
- `docs/ASSET_AUDIT.md`
- `docs/SECURITY_GATES.md`
- `docs/ANDROID_QA_C09_EN.md`
- `inventory/C09_EN_ELEMENTS.csv`

Inspect existing relevant app code _before_ edits, including:

- `apps/customer/app/(auth)/sign-in.tsx`
- `apps/customer/app/(auth)/create-account.tsx`
- `apps/customer/app/(auth)/verify-phone.tsx`
- `apps/customer/app/(auth)/_layout.tsx`
- existing auth components, shared `@haulix/ui`, design tokens and `@haulix/i18n`.

Find the existing development styling preview infrastructure and choose the smallest, cleanest safe integration. Do not recreate the monorepo or modify Expo versions, native identifiers, app icons, splash, Driver app, unrelated screens, or backend.

## 2. Security first — do not fake authentication

Backend Google/Apple OAuth and account matching have not been implemented. The Figma displays an explicitly **fictional** profile and says `DEMO ONLY • No real authentication or messaging`.

**Build C09 as an isolated dev/QA-only visual preview**, with all of these safeguards:

1. Do **not** connect C06/C07 `Continue with Google` or `Continue with Apple` buttons to this screen. Existing honest pending notices must remain.
2. The original exact success copy may appear only when the screen is clearly a development fixture (for visual Figma QA) and cannot be reached by users in production.
3. Enforce a **runtime production guard**, not just absence of a navigation link. In production builds/direct deep links, do not render success copy or fictional account details; display a neutral, safe unavailable state and link back to C06, or follow an existing equivalent secure pattern.
4. Do not persist `Sarah Mitchell` or `sarah.mitchell@example.test`; these are fictional fixtures for QA only.
5. Do not create mock sessions, mock accounts, JWTs, provider credentials, OAuth state, or authentication success.
6. Do not enter authenticated routes from `Go to My Account`. During preview this CTA must be gated (disabled or honest informational notice), while retaining visual design.
7. Do not install an OAuth SDK or write new provider callbacks in this phase.
8. `Sign in another way` may navigate to the real existing C06 Sign-in screen on tap; preserve locale.

Inspect the codebase for existing dev-only route guards. Reuse them. If no safe pattern exists, create the smallest necessary guard with focused tests. Do not use an inaccessible extra production tab merely as an entry point.

## 3. Exact visual target

Reproduce the **development preview** from original node `331:118` (do not use screenshot as image content):

- HAULIX logo: `HAUL` near-white + `IX` brand lime; tagline `WE HAUL IT ALL.`
- Intro title: `Account connected.` (28px Inter Bold)
- Subtitle: `The provider completed sign-in for this fictional HAULIX demo profile.`
- Chip: `PHOENIX, ARIZONA • HAULIX CUSTOMER` with exactly one lime status dot (avoid duplicate literal + visual dot).
- Provider status: lime/green dot and `Google sign-in returned successfully`—**dev fixture only**.
- Fixture account row: `Sarah Mitchell`, `sarah.mitchell@example.test`, right chevron.
- Helper: `Your existing customer records are available after secure account matching.`—**dev fixture only, not asserted as real user data**.
- Primary: `Go to My Account` (visually lime, interactions guarded).
- Secondary: `Sign in another way` (returns to C06).
- Footer: `DEMO ONLY • No real authentication or messaging`.

## 4. Geometry / styling

- Figma reference **430×743 px**, background `#080B0B` with 26px frame radius (frame radius illustrative).
- Content horizontal inset: 22px; max width matching existing HAULIX auth screens.
- Wordmark frame: x22/y81, 386×89.
- Intro: x22/y191, 386×78.
- Arizona chip: x22/y290, 386×38, fill `#1A2510`, radius 12.
- Provider card: x22/y349, 386×191, fill `#151A19`, radius 18.
- Status bar/pill inside card: 349×45, fill `#222827`, radius 10.
- Fixture identity row: 349×58, status dot and chevron accessible.
- Action block: x22/y561, 386×127; buttons 366×54, radius 12.
- Primary `#BAFF42`; secondary `#151A19` with border `#35403B`.
- Footer at x22/y709, muted `#788580`.

Adapt these positions responsively using NativeWind and native Flexbox/ScrollView/SafeArea rather than hardcoding the fixed Figma canvas size. Do not draw a fake iOS status bar / dynamic island over Android OS UI. No bottom navigation on this auth preview.

## 5. Assets and reusable components

There are no new C09 provider logo/illustration files required. Reuse existing HAULIX wordmark, typography, status dot/chevron treatment, buttons, shared design tokens and auth layout primitives.

The supplied ZIP intentionally contains **no new SVG/PNG**. It is not a missing-assets error. Figma source did provide illustrative status-bar vector layers, but those should not be duplicated atop the Android native status bar.

Keep user-facing strings in existing `en.ts` translation namespace or use existing per-screen conventions for dev fixture strings. Do **not** insert fake connected-account data in production localization/app state. Avoid duplicated shared components and excessive abstraction.

## 6. Functional behavior

- Preview is a static, explicitly fictional display state, not proof of real provider success.
- `Go to My Account`: show a clear non-success availability notice or disable access. Must NEVER navigate to the customer dashboard through an invented session.
- `Sign in another way`: tap should navigate to the real existing C06 Sign-in route and not reset selected language unnecessarily.
- Keep C06/C07/C08 fully operational in English and Spanish; no regression.
- No C09 Spanish implementation in this phase. No C09 error/other states, no C10, no Driver App.
- Do not imply active record matching, verification, or permissions.

## 7. Accessibility and responsiveness

- Inter font, stable text contrast and appropriate font scaling.
- Provider row visible and screen-reader understandable in dev preview.
- Buttons have accessible names and correct disabled/guarded semantics.
- Test physical Android widths and keyboard/safe-area where relevant.
- No overlap, clipping, duplicate system status bar, bottom navigation, or horizontally overflowing text.

## 8. Tests and Android QA

Run the existing mandatory commands:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Add focused tests for the dev preview, production guard, secondary navigation and prevention of fake auth. Explicitly check that English/Spanish C06/C07/C08 haven't regressed. Report exact test case totals from Jest's final output; older Phase 02.6 report contained a discrepancy in aggregated counts—do not repeat unverified numbers.

Perform physical Android QA when ADB device is connected. Inspect actual Figma screenshot from the node above, capture only real screenshots, and save them under `docs/qa/c09/`. If the screenshot or physical Android access is unavailable, mark that test blocked (not passed).

Reference QA checklist: `docs/ANDROID_QA_C09_EN.md`.

## 9. Final report and STOP

Write `PHASE_02_7_C09_EN_REPORT.md`, with:

1. Code files changed
2. Evidence that Figma `331:118` was followed
3. Exact preview-vs-production security gates
4. Proof C06 Google/Apple CTAs still do not fake success
5. Actual Android screenshots, paths, and Figma visual comparison (or limitations)
6. Button navigation and auth-boundary verification
7. Reuse of components/tokens and asset audit
8. Test command results (accurate counts)
9. Unresolved blocks (OAuth, SRS backend contracts, account linking, production deployment)
10. Explicit **STOP** confirmation.

**HARD STOP:** After C09 English preview/QA, do not start C09 Spanish, C10, new OAuth flows or other screens. Await user approval.
