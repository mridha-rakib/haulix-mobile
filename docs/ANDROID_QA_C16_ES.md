# Android QA — Phase 03.08 C16 Spanish Premium UI

**Device:** Prefer connected physical Realme Note 60 Android 15; if unavailable, identify actual replacement device and state limitation. Native Expo Go testing does not substitute for signed-release APK validation; do not claim a release APK was built.

## Preflight

- Inspect current Phase 03.07 English implementation & premium icons; capture English baseline without making code changes. Confirm all ten required native SVG icons render and `FlowHeaderBack` is pinned outside `ScrollView`.
- Source C16 Spanish Figma node `974:9079` screenshot for text reference; owner premium screenshot included in `references/` for visual reference; compare approved English premium Android implementation as third anchor.
- Preserve prior edits to account/profile fixture and existing locale state.

## Mandatory real-device captures

Save in `docs/qa/c16/` (do not overwrite existing English evidence):

1. `figma-C16-es-reference.png` (real Figma capture, if export available; if unavailable, declare)
2. `android-C16-es-premium-top.png`
3. `android-C16-es-address-icons.png`
4. `android-C16-es-eligibility-shield.png`
5. `android-C16-es-all-four-cta-icons.png`
6. `android-C16-es-back-visible-scrolled.png`
7. `android-C16-es-C17-notice.png`
8. `android-C16-es-C16V-notice.png`
9. `android-C16-es-C16F-notice.png`
10. `android-C16-es-C16P-notice.png`
11. `android-C16-es-back-to-C15S.png`
12. `android-C15S-es-to-C16.png`
13. `android-C16-es-moving-selection.png`
14. `android-C16-es-long-spanish-cta-360dp.png`
15. `android-C16-en-premium-regression.png`
16. `android-C15S-es-header-regression.png`

All captures must be real device screenshots, not simulated/generated. A screenshot listed but missing is NOT a pass. Verify status of every row in `docs/C16_ES_QA_TEST_MATRIX.csv`.

## Visual comparison criteria

- Review owner premium reference and both English & Spanish screen. Demand every icon in target be used in actual native UI.
- At 360dp and a second feasible width, verify Spanish labels do not clip, text does not squeeze away icons, padding and safe area do not overlap.
- Header remains visible on long scroll and when notice is opened; test actual touch and Android system Back separately.
- Verify `C16`, NOT target screenshot's incorrect `C10`, and current Spanish profile, NOT stale Figma `SARAH MITCHELL`.
- Four actions only show truthful localized upcoming notices, not fake navigation or GPS.

## Automated gates

```
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```
Add/update tests for C16 Spanish keys and case-sensitive string provenance; C15-S Spanish → C16 route; dynamic profile isolation; each button notice; Back; selected service persistence; English regression. Report actual total Jest counts by package and monorepo (avoid arithmetic mismatch).

## Final deliverable & hard stop

Create `PHASE_03_08_C16_ES_REPORT.md` with each matrix row PASS/FAIL/BLOCKED and evidence links, actual source edits, tests, visual deltas, limitations, and explicit note about owner image vs Figma's plain visual style. STOP after Spanish C16 QA. No C17, other screens, backend, Driver, GitHub, or APK builds.
