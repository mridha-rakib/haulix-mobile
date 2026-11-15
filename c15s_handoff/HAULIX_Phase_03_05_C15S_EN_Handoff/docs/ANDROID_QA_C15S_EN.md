# Phase 03.05 — Android QA Checklist (C15-S English)

**Physical device target:** Existing Realme Note 60, Android 15, ~360dp. Prefer ADB native touch/UI verification. Expo Go QA is acceptable for this phase only if correctly described as Expo Go QA; it is **not** standalone APK QA.

## Visual source comparison

- [ ] Capture source Figma `382:241` and local Android top/middle/bottom screenshots.
- [ ] Verify back-header (centered HAULIX) and no notification bell or bottom navigation.
- [ ] Verify native Android system status icons (no manually drawn iOS 9:41/status island).
- [ ] Step chip `W02 ... / C15-S`, heading `Junk Removal`, Figma subtitle and illustrative customer chip.
- [ ] Selected tile neon border, 31px original truck SVG, green SELECTED label, exact title/description and draft note.
- [ ] Three steps in correct order under How this booking works.
- [ ] Two CTAs and both demo footer lines visible after scrolling.
- [ ] No clipped labels, overlay, double safe-area, or giant bottom gap on 360dp; tablet/emulator optional.

## Actual touch flows

- [ ] C01 English Book → C15 English → Select Junk Removal → C15-S English.
- [ ] English C15 Moving select → C15-S displays **Moving**, not Junk; tested by tapping.
- [ ] All 7 supported category IDs map to correct content (automated assertion and/or on-device QA).
- [ ] `Continue to service area` shows dismissible truthful **C16 upcoming** notice; no eligibility/quote/booking confirmation.
- [ ] `Change service` returns to C15 while retaining last service selection; reselect another service successfully.
- [ ] Android hardware Back also returns to C15 without stack loops.
- [ ] Access via QA Screens direct entry defaults to safe clearly fictional Junk fixture, even without auth/session.
- [ ] Spanish C01 → Spanish C15 → `Elegir mudanzas` continues to show existing Spanish C15-S upcoming notice; MUST NOT open C15-S English.
- [ ] Existing C01/C10 English and Spanish navigation unchanged.
- [ ] Phone language/locale switches do not corrupt saved English vs Spanish customer profile fixtures.

## Required evidence filenames (real captured files, not placeholders)

```
docs/qa/c15s/figma-C15S-en-reference.png
docs/qa/c15s/android-C15S-en-default.png
docs/qa/c15s/android-C15S-en-selected-card.png
docs/qa/c15s/android-C15S-en-bottom.png
docs/qa/c15s/android-C15-en-to-C15S.png
docs/qa/c15s/android-C15S-en-moving-selected.png
docs/qa/c15s/android-C15S-en-change-service.png
docs/qa/c15s/android-C15S-en-c16-notice.png
docs/qa/c15s/android-C15-es-regression.png
```

If a screenshot cannot be captured, explicitly mark pending; do not invent evidence or report it complete. Re-run all quality checks after any fixes. Deliver final report before moving to Spanish phase.
