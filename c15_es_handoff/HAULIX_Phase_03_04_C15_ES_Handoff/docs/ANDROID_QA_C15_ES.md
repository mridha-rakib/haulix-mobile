# Phase 03.04 — Android QA checklist (physical device)

Use the existing Realme Note 60 Android 15 if available. Do not claim physical QA if only emulator/Expo Go was used. Verify model/OS/device via ADB. Use real screenshots, not generated or copied placeholders.

## Screenshots to capture in `docs/qa/c15/`

| File                                       | Must prove                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `figma-C15-es-reference.png`               | Source reference node `974:8843`, captured directly from Figma (not UI asset)   |
| `android-C15-es-top.png`                   | Flow header, W02 chip, heading, Bryan Lopez demo context, service-area card     |
| `android-C15-es-services.png`              | All seven Spanish service rows, genuine C15 icons, no eighth Assembly           |
| `android-C15-es-bottom.png`                | Dynamic `Para Bryan Lopez` summary, Spanish actions, demo footer, no bottom nav |
| `android-C15-es-moving-selected.png`       | Tap `Mudanzas`: selected state + CTA `Elegir mudanzas` + updated draft line     |
| `android-C15-es-upcoming-notice.png`       | Honest pending notice for next unbuilt screen, correctly localized              |
| `android-C01-es-to-C15.png`                | Spanish Home `Reservar un servicio` opens Spanish C15                           |
| `android-C15-es-preselected-from-home.png` | Spanish Home service tile preselects canonical service in Spanish C15           |
| `android-C15-es-back-home.png`             | Android back to Spanish C01; locale preserved                                   |
| `android-C15-en-regression.png`            | English C15 retains Sarah Mitchell, seven English services and correct CTA      |

## Manual checks

- [ ] Figma `974:8843` visual comparison at 430px reference and 360dp device.
- [ ] Status bar native; HAULIX centered Flow Header, no bell, **no bottom nav**.
- [ ] Source-approved copy, exact diacritics (`¿`, `á`, `é`, `ó`) and correct wrapping.
- [ ] Seven icons: bin, truck, sofa, box, mattress, house/garage, cart, correct chevron; no replacements.
- [ ] All 7 service selections update title, CTA and draft service.
- [ ] Spanish C01 entry via primary CTA, center nav and each seven active service tiles.
- [ ] Optional Assembly Add-on remains non-bookable.
- [ ] C15 rows not navigating to unbuilt C18 routes; C15-S/C16/C16-F/C15-E are honest notices.
- [ ] Spanish edited profile name is used, English Sarah Mitchell remains isolated.
- [ ] 360dp long copy never overlaps icon, chevron, other card, action or screen bottom.
- [ ] Vertical scroll reaches all 4 actions, demo footer, safe-area correctly.
- [ ] English C01, C15 and C10 regression.
- [ ] No backend booking, real quote, real payment, GPS eligibility or auth guard.

## Command gates

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Report exact final suite/test counts. Attach Android screenshots and any known deviations. Do not claim release APK QA unless one was separately built and installed.
