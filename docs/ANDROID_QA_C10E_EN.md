# C10-E English — Android QA & Exit Criteria

## Figma baseline

- `333:116`, 430×1003 reference screenshot captured and visually compared (don't use screenshot as runtime background).
- Compare 430-wide design to actual 360dp Android (real scaling/adaptive layout): width, brand header, title, status, labels, 345px source fields, 54px buttons, fixed curved navbar.
- No avatar or photo management panel on C10-E (not in original design).

## Interaction checks (real touch input)

- C10 Overview English → tap Edit Profile → C10-E English.
- Inputs populated with Sarah Mitchell / example.test / +1 602-555-0142.
- Tap each field, keyboard shown with appropriate type, text-edit works, focus/blur clear.
- Invalid empty full name blocked with inline error; invalid email blocked; phone format rejected when invalid.
- Valid name/email-only edits locally saved, return C10 English, overview reflects demo preview edit (not an authenticated backend write).
- Changed phone is explicitly pending verification, **not** reflected as verified in overview.
- Cancel Editing discards unsaved changes; back button behavior verified.
- Scroll with keyboard open: active field, phone helper and Save/Cancel accessible; keyboard does not overlap fixed navbar or buttons.
- Navbar C01 shared sculpted center dome, Account active, no black dead strip, no overlap with Android 3-button system navigation and gestural nav if available.
- C10 English photo sheet unchanged; C10 Spanish Bryan/BL and Spanish photo sheet/nav labels unchanged.
- Regression C06/C07/C08/C09 route access and languages, but do not redesign.
- Open route in existing **standalone APK** only if a fresh APK is actually built. Expo Go/emulator screenshots are not signed release APK proof.

## Required evidence

- `docs/qa/c10e/figma-C10E-en-reference.png` (if export accessible)
- `android-C10E-en-default.png`
- `android-C10E-en-keyboard.png`
- `android-C10E-en-invalid-name.png`
- `android-C10E-en-invalid-email.png`
- `android-C10E-en-phone-pending.png`
- `android-C10E-en-save-to-c10.png`
- `android-C10E-en-cancel-to-c10.png`
- `android-C10E-en-bottom-nav.png`
- English/Spanish C10 regression screenshots as warranted.

## Quality gates

Run `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm doctor` and record **actual** results. Add targeted tests for routing, initial values, validation, phone pending verification, save/cancel, locale boundaries and navbar reuse.

Write `PHASE_02_11_C10E_EN_REPORT.md` with evidence and explicit unverified items. No fake claims of Figma pixel-perfect, device testing or new APK build.
