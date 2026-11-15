# C15-S Spanish — Physical Android QA Checklist

**Target:** Spanish Figma `974:8965` (430×1015) and English source `382:241`.
**Device:** physical Realme Note 60, Android 15 via ADB if available. If not, record actual emulator model, Android version and limitation; do not claim physical testing otherwise.

## 1. UI fidelity

- [ ] Native Android status bar + W02 Flow Header Back; no fake iOS time, no bottom navbar
- [ ] `W02 · SERVICIOS Y SOLICITUD / C15-S` step chip; copy exact
- [ ] Source proportions: 22px margins, selected service card, selected tile lime stroke, 31px truck SVG, buttons and footer
- [ ] `SELECCIONADO` visible; selected tile title Spanish; supporting text Spanish (not leftover English from source)
- [ ] `Cómo funciona la solicitud` and all three numbered steps exact
- [ ] Title/service description wrap cleanly at actual device 360dp; verify appliance and mattress descriptions
- [ ] No overlap with status/navigation bars; scrolling reaches both CTAs and footer

## 2. Functional path: Spanish

- [ ] C01 Spanish `Reservar un servicio` → C15 Spanish; center `Reservar` route works
- [ ] C01 Spanish `Mudanzas` tile preselects C15 Spanish `Mudanzas`
- [ ] C15 Spanish `Elegir retiro de objetos` → C15-S Spanish, default correct tile and customer chip Bryan Lopez/current saved ES name
- [ ] C15 Spanish `Elegir mudanzas` → C15-S Spanish, title and semantic icon match Moving
- [ ] Service IDs for all 7 map to correct Spanish titles; specifically `Retiro de electrodomésticos` wraps properly
- [ ] Spanish `Cambiar servicio` → C15 Spanish, selection retained; no lost locale/route loop
- [ ] Header back and Android system back return to C15 Spanish; direct QA route entry also safe
- [ ] `Continuar a zona de servicio` → honest localized C16 upcoming notice only, dismissible
- [ ] No mock quotes, bookings, payments, eligibility, or false successful verification

## 3. Regression

- [ ] English C15 → C15-S still works and remains English, using Sarah Mitchell/current EN profile
- [ ] Spanish C15-S remains Bryan Lopez/current ES profile; no cross-locale mutation
- [ ] Switching locale updates UI strings without discarding selected service (test when supported)
- [ ] English default Junk card and truck SVG unchanged
- [ ] Existing C01 Home, C10 Account, and C15 language switching preserved
- [ ] Demo QA route available for both locales without authentication guard

## 4. Genuine evidence to save in `docs/qa/c15s/`

- [ ] `figma-C15S-es-reference.png` (if Figma export succeeds; cite source)
- [ ] `android-C15S-es-default.png` (top/heading/customer)
- [ ] `android-C15S-es-selected-card.png` (status/icon/description)
- [ ] `android-C15S-es-bottom.png` (steps/actions/footer)
- [ ] `android-C15-es-to-C15S.png` (Spanish discovery → selected)
- [ ] `android-C15S-es-moving-selected.png` (Moving dynamic)
- [ ] `android-C15S-es-long-name.png` (appliance wrapping)
- [ ] `android-C15S-es-change-service.png` (return C15 with preserved state)
- [ ] `android-C15S-es-c16-notice.png` (truthful pending C16)
- [ ] `android-C15S-es-back-to-c15.png` (Android back)
- [ ] `android-C15S-en-regression.png` (English Sarah/selection)

Do not falsely claim screenshots that are missing. Actual screenshot filenames can vary if listed clearly in report.

## 5. Commands and acceptance

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

- [ ] Copy final test counts, Biome file count, package typecheck counts from raw output
- [ ] Mention Expo Go vs standalone APK explicitly
- [ ] Create `PHASE_03_06_C15S_ES_REPORT.md` with remaining defects if any
- [ ] STOP—no new screen or APK build
