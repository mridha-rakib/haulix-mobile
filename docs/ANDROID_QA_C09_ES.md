# C09 ES — Physical Android QA Checklist

Run on a connected Android device (the previous reported device: Realme RMX3930, Android 15). Read ADB device state; do not claim testing if unavailable.

## Screen QA

- [ ] Real Spanish visual reference obtained from node `347:283`, not a fabricated/recreated Figma PNG
- [ ] C09 English corrected baseline (no circular avatar) still looks right
- [ ] Spanish heading, subtitle, brand, Arizona chip and 430×743 layout faithfully adapted to device
- [ ] Status card shows `Acceso con Google correcto` but **only** inside dev-only preview
- [ ] Name/email are `Bryan Lopez` / `bryan.lopez@example.test` _in dev preview only_
- [ ] There is **no `SM` or `BL` avatar badge**
- [ ] Card status dot, chevron, title/email alignment and 191px card rhythm correspond to Figma
- [ ] Spanish guidance wraps correctly (no clipping, no overlap with chevron)
- [ ] Both CTAs are visible and tappable at 360dp width
- [ ] `Ir a mi cuenta` shows a truthful localized backend-unavailable notice, no account screen
- [ ] `Elegir otro acceso` touch-navigates to C06 and retains Spanish locale
- [ ] In C06, Apple/Google buttons still show honest unavailable notices (no C09 route)
- [ ] English C09 unaffected when locale is returned to English
- [ ] Smaller device / font scaling does not clip primary or secondary labels
- [ ] No auth bottom navigation on C09

## Recommended evidence paths

```text
docs/qa/c09/figma-C09-es-reference.png                 # Only if really exported/captured
docs/qa/c09/android-C09-es-preview.png
docs/qa/c09/android-C09-es-primary-guard.png
docs/qa/c09/android-C09-es-secondary-to-c06.png
docs/qa/c09/android-C09-en-regression.png
docs/qa/c09/android-C09-release-fallback.png          # Only if actual release runtime test performed
```

## Quality gates

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Document exact test counts; quote real output. If screenshot comparison or signed release test could not be performed, mark pending in the final report.
