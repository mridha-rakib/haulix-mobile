# HAULIX Mobile — Phase 02.8: C09 Spanish Localization (ONE SCREEN)

## Mission

Implement **ONLY** the Spanish localization of the existing Customer App `C09 — Social Sign-in Return / Success` _fictional development/QA preview_. Use authoritative Figma Spanish node `347:283`, 430×743, and preserve Phase 02.7 Final QA correction: no circular avatar.

This is NOT a real OAuth/social login integration project. Do not claim success, authenticate, persist sessions, or route into customer account.

**Spanish Figma:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=347-283
**English Figma:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=331-118

Read these handoff documents before editing:

- `docs/C09_ES_FIGMA_AUDIT.md`
- `docs/C09_ES_TRANSLATIONS.md`
- `docs/SECURITY_AND_ACCEPTANCE.md`
- `docs/ANDROID_QA_C09_ES.md`

## Step 0 — Preflight and strict scope

1. Inspect the current repo state, especially:

```text
apps/customer/app/(auth)/social-return.tsx
apps/customer/app/(auth)/sign-in.tsx
apps/customer/app/(auth)/_layout.tsx
apps/customer/app/styling-preview.tsx
apps/customer/src/__tests__/social-return.test.tsx
packages/i18n/src/locales/en.ts
packages/i18n/src/locales/es.ts
packages/i18n/src/index.ts
packages/ui/
packages/design-tokens/
```

2. Confirm the Phase 02.7 Final QA fix is present: the `SM` avatar has been removed and the profile row is left-aligned. If the expected correction is absent, report it rather than reimplementing multiple screens.
3. Avoid unrelated refactors and new dependencies. Do NOT create `social-return-es.tsx`, any Spanish route prefix, OAuth screen, or C10 code.

## Step 1 — Visual reference

Inspect Figma Spanish `347:283` and screenshot from the source. The complete source frame is 430×743 with:

- page `#080B0B`, Inter typography, brand `#BAFF42`, light text `#F6F8F6`
- brand area at x22/y81; heading at x22/y191; Arizona chip at x22/y290
- card x22/y349, 386×191, 18px radius, `#151A19`
- elevated status row inside card x17/y17, 349×45, `#222827`
- **NO avatar** in profile row; name/email left-aligned, lime chevron right-aligned
- CTA group x22/y561, 386×127; primary `Ir a mi cuenta`, secondary `Elegir otro acceso`
- disclaimer x22/y709

Use responsive layout rather than fixed absolute positions for mobile devices. Never use a Figma screenshot as app background. Do not fabricate an original screenshot if export access is unavailable; mark visual comparison pending.

## Step 2 — Spanish text and fixtures

Use exact visible Figma copy from `docs/C09_ES_TRANSLATIONS.md`. Distinguish: **English demo fixture is Sarah Mitchell**, whereas **Spanish demo fixture is Bryan Lopez**. For this dev-only fictional preview, source each fixture from appropriately isolated localization/mock data; do not save as account data or change real verified user identity on language switch.

Spanish text required:

- `LO RECOGEMOS TODO.`
- `Cuenta vinculada.`
- `El proveedor confirmó el acceso a este perfil de demostración.`
- `PHOENIX, ARIZONA • CLIENTE HAULIX` with **one** separately rendered lime dot
- `Acceso con Google correcto`
- `Bryan Lopez`, `bryan.lopez@example.test` as DEVELOPMENT preview content only
- `Tus reservas estarán disponibles después de validar tu identidad.`
- `Ir a mi cuenta`
- `Elegir otro acceso`
- `SOLO DEMOSTRACIÓN · Sin acceso ni mensajes reales`

Translate unavailable-backend notices in Spanish too. Use existing `@haulix/i18n` hooks and conventions. Do not duplicate screen implementation.

## Step 3 — Security boundaries

- Keep the existing single `apps/customer/app/(auth)/social-return.tsx` route.
- Preserve `__DEV__`-gated fictionality; in release/non-dev mode fictional content must NOT render even via deep link. Keep a neutral unavailable fallback with return to sign-in.
- C06 provider buttons must NOT route to C09 until real OAuth and account matching are implemented.
- `Ir a mi cuenta` must show truthful service-unavailable notice, NOT navigate to authorized customer routes.
- `Elegir otro acceso` must touch-navigate to C06 and preserve Spanish locale.
- Absolutely no fake Google/Apple OAuth success, account data, session, JWT, SecureStore or AsyncStorage persistence.
- Do NOT implement real OAuth backend, change auth contracts or add mock provider SDK.
- `expo export`/Metro success is not actual signed-release runtime security QA; report the gap if signed APK cannot be tested.

## Step 4 — Clean engineering

Maintain existing Expo SDK 58, React Native, Expo Router, TypeScript strict, NativeWind, pnpm/Turbo, Biome and shared UI package usage. Use existing `HaulixButton`, `HaulixSafeArea` and brand tokens. Reuse status dot/chevron primitives. No new image or SVG needed. Do not re-add any circle/avatar from the removed English bug.

Avoid hardcoded duplicated text and giant conditional render blocks; use translation keys and small, typed data structures where needed. Do not add runtime or routing dependencies.

## Step 5 — Tests and Android QA

- Unit/integration test both EN and ES labels, route reuse, dynamic locale render, Spanish fixture isolation, no avatar, dev-only fallback, no fake auth and button behavior.
- On a physical Android device, capture Spanish preview, primary guard notice, secondary navigation back to C06, and English regression screenshots. Verify provider button from C06 still does not navigate to C09.
- Compare against original Figma Spanish node; report differences and fix only in-scope mismatches.
- Test clipping/overlap on 360dp screen and where practical larger text settings.
- If no device or Figma screenshot access, explicitly report which checks are unverified.

Run:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

## Step 6 — Report and STOP

Create `PHASE_02_8_C09_ES_REPORT.md` describing changed files, translations, tests, screenshot paths, English regression, dev/release guard audit, and remaining blockers. Do not misrepresent a web/native bundle export as signed release APK testing.

**STRICT STOP:** This phase ends after C09 Spanish localization, English regression QA, and reporting. Do not implement C10, any extra screens, or real backend OAuth. Await explicit approval.
