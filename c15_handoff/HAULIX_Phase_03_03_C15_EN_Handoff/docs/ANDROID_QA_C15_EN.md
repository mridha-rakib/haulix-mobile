# Phase 03.03 — C15 English Android QA Acceptance Checklist

**Target:** Figma `382:126` (430×1791), physical Realme Note 60 Android 15 if available; otherwise specify emulator model and Android version. The report should distinguish Expo Go from standalone APK testing.

## Visual acceptance

- [ ] C15 flow header matches source; no unexpected back/bell controls and NO bottom navbar.
- [ ] Android native status bar appears once, not duplicated iOS Figma fake bar.
- [ ] Step chip (`W02 · SERVICE DISCOVERY & INTAKE / C15`) and heading at proper vertical rhythm.
- [ ] Arizona service-area section: proper text, no false eligible status.
- [ ] Seven 76px rows rendered in correct order with **original 25×25 SVG** category icons; no Assembly Add-on.
- [ ] `For Sarah Mitchell` and draft info card visible after scrolling.
- [ ] Four CTA buttons visible, tappable and not covered by Android gesture/three-button nav.
- [ ] Footer disclaimers readable at bottom. No giant blank strips, clipping, horizontal scroll, overflow or inconsistent spacings on 360dp device.

## Interaction acceptance

- [ ] English C01 `Book a Service` leads to C15.
- [ ] Center Book button on English C01 leads to C15 without breaking shared navbar.
- [ ] Enabled C01 English category tapped: either preselected C15 entry or clearly documented selection behavior.
- [ ] C01 English Assembly Add-on remains blocked/optional.
- [ ] C15 default Junk Removal preview; service change updates title/CTA/draft preview coherently.
- [ ] Selecting service never creates a booking, quote, payment or customer session.
- [ ] `Select <service>` gives truthful C15-S pending-state disclosure.
- [ ] `Check Service Area` gives C16 pending notice; no GPS permission or fake eligible response.
- [ ] `View location restrictions` gives C16-F pending notice.
- [ ] `Service not listed? Check options` gives C15-E pending notice.
- [ ] Android back returns to English C01 with correct locale; no navigation loops.
- [ ] C01 Spanish retains existing localized upcoming notice; no English-only C15 masquerading as Spanish.
- [ ] Existing C01 bilingual, C06–C10 bilingual, Edit Profile, photo and navbar regression tests pass.

## QA evidence: expected genuine screenshots

Save to `docs/qa/c15/`, with at least:

1. `figma-C15-en-reference.png` — actual Figma node export, QA only.
2. `android-C15-en-top.png` — header, title, context, service area.
3. `android-C15-en-services.png` — service list/row icons.
4. `android-C15-en-bottom.png` — selection summary, 4 CTAs, demo footer.
5. `android-C15-en-moving-selected.png` — preview update.
6. `android-C15-en-upcoming-notice.png` — honest unbuilt-next-screen feedback.
7. `android-C01-en-to-C15.png` — real Home to C15 navigation.
8. `android-C15-en-back-home.png` — real back navigation.
9. `android-C01-es-regression.png` — Spanish C01 not routed to English C15.

If hardware / Figma export unavailable, report as blocked; do NOT fabricate screenshots or claim visual QA passed. PNG file existence alone does not prove interaction correctness; test via on-device taps and logs.

## Run all gates and include real final counts

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Final file: `PHASE_03_03_C15_EN_REPORT.md`. Report source nodes, files changed, icon provenance, English-only scope, user flows, screenshots, actual test logs, any gaps and next-phase recommendation. No APK/EAS build unless explicitly requested.
