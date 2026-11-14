# C09 English — Android QA Checklist

## Setup

- [ ] Confirm running Expo SDK / React Native / NativeWind versions from repo; do not change versions just for C09.
- [ ] Confirm physical ADB device ID/model from actual terminal output; do not reuse old device ID without checking.
- [ ] Open original Figma node `331:118` and obtain reference screenshot for comparison; if unavailable, mark pixel-perfect verification blocked.
- [ ] Keep old C06/C07/C08 routes operational; C09 is an isolated development/QA preview.

## Visual checks

- [ ] Brand wordmark and tagline match existing C06/C07/C08.
- [ ] Title `Account connected.` and fictional demo subtitle render as reference.
- [ ] Arizona availability chip, status dot and status row match original visual hierarchy.
- [ ] Provider card (386×191 reference), status pill (349×45) and customer row match spacing.
- [ ] Fixture name/email render only inside explicitly demarcated QA preview; no profile persistence.
- [ ] Primary/secondary buttons (366×54 reference) align correctly; no bottom tabs.
- [ ] Footer `DEMO ONLY • No real authentication or messaging` is visible.
- [ ] On 360dp / 393dp / 430dp widths, no clipping, horizontal overflow, overlap or inaccessible touch targets.
- [ ] UI respects Android status bar and safe area; no duplicate iOS status bar.

## Functional / safety checks

- [ ] Opening Google/Apple on C06 still **does not** trigger a fake success screen.
- [ ] Direct or deep-link to C09 in production is blocked from showing fictional success.
- [ ] C09 visual preview available only through development/QA access and explicitly fictional.
- [ ] `Go to My Account` cannot navigate to authenticated app without backend verification.
- [ ] `Sign in another way` returns to C06 through an actual tap and retains selected locale.
- [ ] No mock token, fictional account persistence, or backend fabrication.
- [ ] Check C06, C07, C08 English/Spanish non-regression.
- [ ] No new screen other than C09 English visual preview; no Spanish C09.

## Required QA evidence — create only if actually captured

```
docs/qa/c09/
  figma-C09-en-reference.png         # export original if available
  android-C09-en-preview.png         # real physical device
  android-C09-en-scroll.png          # only if scroll is needed
  android-C09-en-secondary-to-c06.png
  android-C09-en-primary-guard.png
  android-C09-en-production-route-guard.png # native production-like build only if tested
  android-C06-social-no-fake-success.png
```

- [ ] Run `pnpm check`.
- [ ] Run `pnpm typecheck`.
- [ ] Run `pnpm test`.
- [ ] Run `pnpm doctor`.
- [ ] Report actual number of test cases and suites from final Jest output, resolving any earlier reported discrepancies.
- [ ] Do NOT assert screenshots, standalone APK validation, production route protection, or physical-device results unless verified.
