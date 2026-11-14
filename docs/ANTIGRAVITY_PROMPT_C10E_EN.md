# HAULIX Customer App — Phase 02.11 / C10-E Edit Profile (English ONLY)

## Role / Goal

You are the Antigravity Expo/React Native coding agent working inside the existing local `haulix-mobile` monorepo. Implement exactly ONE new Figma UI state: **C10-E Edit Profile / Editing (English)**. This is the next phase after C10 Account Overview in English and Spanish.

**Source of truth**: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=333-116

- File key `Q946h4YBGgyLsjnPtdyQNe`
- Frame `333:116`, size **430 × 1003**
- Read `docs/C10E_EN_FIGMA_AUDIT.md`, `docs/FORM_STATE_AND_VALIDATION.md` and `docs/ANDROID_QA_C10E_EN.md` from this handoff before editing.
- Open Figma frame and inspect/compare a real Figma screenshot if permitted; do not invent measurements where the audit provides them.

## STRICT SCREEN SCOPE

**Implement C10-E English only.** Do not implement C10-E Spanish, C10-S success state `333:171`, C10-F failure state `335:627`, C10-O sign-out confirmation, C11, or any other Figma screen. Do not alter the Driver App or connect any backend.

## Environment / Existing Work

Current stack: Expo SDK 58, React Native 0.88.1, Expo Router, TypeScript strict, NativeWind, pnpm/Turbo, Biome, Jest, `@haulix/i18n`, shared design tokens/components. Repo paths to inspect first:

- `apps/customer/app/(app)/account.tsx` — current EN/ES Account Overview and Edit Profile CTA.
- `apps/customer/app/(app)/_layout.tsx` or relevant Expo Router parent — discover current layout before choosing route.
- `apps/customer/src/components/navigation/CustomerBottomNav.tsx` — corrected, reused C01 sculpted navbar. DO NOT fork.
- `apps/customer/src/components/account/C10Icons.tsx` — existing typed original SVG vector implementations.
- `apps/customer/src/fixtures/c10DemoProfile.ts` — EN Sarah Mitchell / ES Bryan Lopez fixtures.
- `apps/customer/src/components/account/ProfilePhotoActionSheet.tsx` — preserve all EN/ES photo functionality.
- `packages/i18n/src/locales/en.ts` & `es.ts` — existing i18n; add EN strings if necessary without changing ES C10.
- Existing tests and dev QA navigator (if already present).

## TASK A — New C10-E Screen and Navigation

- From C10 Account Overview, the **Edit Profile** primary CTA must open the new actual C10-E frontend page using Expo Router (prefer `apps/customer/app/(app)/edit-profile.tsx` if routing conventions allow). If an edit profile route already exists, reuse it; don't duplicate.
- Preload existing fictional EN data: **Sarah Mitchell**, `sarah.mitchell@example.test`, `+1 602-555-0142`.
- Page must have back arrow, centered HAULIX brand, notification bell/unread green dot, heading `Edit profile`, subtitle, account badge, profile information card, and correct Save/Cancel buttons.
- Reuse shared layout/components; no redundant `CustomerBottomNav` recreation and no navbar on C06–C09 auth screens.
- Use appropriate responsive `ScrollView`, `KeyboardAvoidingView`, safe-area handling, touch targets and screen-reader labels.
- Preserve Figma dark/lime palette and typography. At 360dp width the UI should be proportionally accurate and fully usable.

## TASK B — Exact Visible Figma Text & Geometry

Implement exact copy below for default English state:

- `Edit profile`
- `Only customer-owned contact details can be edited here.`
- `SARAH MITCHELL  ·  CUSTOMER ACCOUNT`
- `Profile information`
- `FULL NAME`, `Sarah Mitchell`
- `EMAIL`, `sarah.mitchell@example.test`
- `PHONE`, `+1 602-555-0142`
- `Phone changes require successful verification before use.`
- Primary `Save Changes`, secondary `Cancel Editing`
- Shared navbar: `Home`, `My Jobs`, `Book`, `Deals`, `Account` (Account active).

Exact 430px Figma reference positions:

- header x22 y79 386×61; page intro x22 y159 386×62; badge x22 y240 386×43;
- card x22 y302 386×378, `#151A19` radius18; card 20px padding;
- three elevated fields 345×54, radius11, `#222827`, relative y78/169/260;
- primary button group x22 y699 386×58, inner button 364×54;
- secondary button group x22 y776 386×58, inner button 364×54;
- shared nav instance `965:9598` at x0 y853 430×128, Account/EN.
  Read complete measurements from `C10E_EN_FIGMA_AUDIT.md`. Figma iOS status illustration is NOT a real Android status-bar element; never overlay fake platform indicators on Android.

## TASK C — Functional Frontend Editing (No Fake Backend)

- All three fields must really be editable with correct keyboards, focus behaviors, local input validation and inline errors.
- Local **name/email** Save: show truthful "saved locally for frontend preview" feedback and reflect changes on English C10 Account Overview via minimal typed demo state. Maintain a simple reset path and do not overwrite the Spanish Bryan/BL fixture.
- Phone changes: allow editing as preview, but **do not claim verification** and **do not update the verified phone on C10**. On Save with modified phone, show "Phone changes require verification; SMS verification is not connected in this frontend demo". The phone remains pending in the draft until reset. No OTP sending.
- Cancel Editing must discard unsaved values and return to C10. Back behavior must not apply unsaved changes.
- No fake account activation, JWT, OAuth, remote save success, payment method mutation, or backend request.
- **No `__DEV__`/auth/login guards** preventing frontend access in QA/release demo APK; don't introduce a fake production session.
- `C10-S` and `C10-F` are separate Figma states, not part of this implementation. Do not build extra screens to simulate success or network failure.

## TASK D — Reuse Original Figma Assets

- Use existing brand icons and C10 vectors from typed shared components; avoid creating new icon packages. Two C10-E-specific original vectors are supplied: `assets/original_figma_svg/edit_name.svg` (`333:137`) and `edit_phone_shield.svg` (`333:146`).
- Additional 9 original C10/C01 SVGs are supplied as visual references for header/status/nav components; they already have equivalent original typed implementation in the repo.
- Never use ephemeral Figma asset HTTP URLs at runtime. Integrate vectors per established React Native SVG component patterns, avoid rasterizing icons or using image screenshot as UI.

## TASK E — Android QA & Regression

Run physically on Android if connected, else on a genuine emulator and clearly label which. Verify:

- C10 English -> C10-E via touch;
- All fields editable and keyboard-correct;
- Validation, Save and Cancel;
- Pending phone verification semantics;
- No viewport/keyboard/navbar overlaps;
- Corrected bottom black dead-zone issue stays fixed;
- C10 English/Spanish account/photo/nav preserved, C06–C09 unaffected;
- Existing QA screen switcher still works where present.

Take actual screenshots as named in `ANDROID_QA_C10E_EN.md`. If physical device is offline, say emulator QA was used; don't claim physical device QA. Don't claim standalone release APK unless one was built and installed.

## TASK F — Quality Gates / Report

From monorepo root run:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```
Make regression/route/validation/Save/Cancel tests and report the exact totals. Write `PHASE_02_11_C10E_EN_REPORT.md`, include Figma comparison, implementation files, screenshots, typed state choices, tests, issues/pending. Do not invent evidence.

### EXIT GATE — HARD STOP

Stop after C10-E English + Android QA. Do not implement C10-E Spanish, C10-S/C10-F, another screen, backend, or a new APK build (unless separately requested). Do not operate on GitHub. Keep all demo routes accessible in frontend QA APKs without auth guard.
