# HAULIX Customer App — Phase 03.08

## C16 Service Area Eligibility — Spanish ONLY | PREMIUM UI PRESERVATION

**Strict scope:** Implement only C16 Spanish localization and test it on physical Android. Do not reimplement, replace, or visually downgrade the accepted Phase 03.07 C16 English premium UI. Do not implement C17, C16-V/F/E/P, backend, live eligibility, GPS, payments, Driver, or other screens. Do not create a Spanish route fork, change the accepted navigation hierarchy, call GitHub, or build an APK unless separately requested.

### Mandatory inputs — read before changing code

1. `references/OWNER_C16_PREMIUM_TARGET.png` — owner's **approved premium styling** reference: icon-rich address cards, shield/pin icons, dark elevated surfaces, icon-led buttons, rounded borders, strong hierarchy and back button. This screenshot is a visual reference only; it contains a wrong step identifier `C10`, and its screenshot pixel resolution is **not** Expo dp geometry.
2. Current Phase 03.07 code: `apps/customer/app/(app)/service-area.tsx`, `apps/customer/src/components/navigation/FlowHeaderBack.tsx`, `apps/customer/src/components/discovery/C16Icons.tsx`, and current English C16 QA/report (`PHASE_03_07_C16_PREMIUM_VISUAL_CORRECTION_REPORT.md`). This successfully tested implementation is **the component/layout authority**. Preserve original 10 premium native SVG icon components; use `assets/icons-reference` only when a repo asset is missing, after verifying suitability.
3. **Authoritative Spanish Figma**: node `974:9079`, 430×1314 px, and **English C16** node `382:323`, 430×1314 px. Spanish Figma is authoritative for Spanish copy/section order; its plainer visual style must NOT displace the approved premium design. See `docs/C16_ES_FIGMA_SOURCE_AUDIT.md` and `docs/C16_ES_TRANSLATIONS.csv`.
4. Current Spanish profile and localization in `apps/customer/src/fixtures/c10DemoProfile.ts` and `packages/i18n/src/locales/{en,es}.ts`; inspect the actual code, keys, and profile data model before adding keys.
5. `docs/C16_ES_STATE_NAVIGATION_CONTRACT.md`, `docs/C16_ES_PREMIUM_UI_ACCEPTANCE.md`, `docs/ANDROID_QA_C16_ES.md`.

### 1 — Single canonical route, English-safe localization

- Localize the **existing** `apps/customer/app/(app)/service-area.tsx` with `@haulix/i18n`. No `service-area-es.tsx`, duplicated screen JSX, separate SVG icon sets, or parallel English/Spanish layouts.
- Reuse the same native component tree and same premium C16 icon-led surfaces for both locales. Leave English styling and logic intact.
- Use exact Figma Spanish strings listed in CSV, including `Consulta tu zona de servicio`, `W02 · SERVICIOS Y SOLICITUD / C16`, `Zona de recogida solicitada`, four address labels and four action labels. Preserve HAULIX brand wordmark/tagline unchanged.
- Profile chip must dynamically show current persisted **Spanish** demo customer (Bryan Lopez or edited name), not Figma's stale `SARAH MITCHELL`. English remains Sarah Mitchell or saved English edit. Keep locale-specific fixture isolation; do not reset edits on screen navigation/restart.
- Address rows must come from the existing typed local demo pickup address. Figma shows example `1234 E Example Lane`, `Phoenix`, `Arizona`, `85014`. Do not replace a user-edited local address with hardcoded Figma text. Clearly label illustrative/demo states; no live geocoding, API, simulated permission grants, or server eligibility success.
- Preserve canonical selected `service` ID from C15-S, including language switch and native Back; no unauthorized defaulting to Junk Removal after a valid Moving selection.

### 2 — Premium visual invariants (critical: owner complaint)

**DO NOT downgrade to the simple iconless Spanish Figma.** The accepted English premium C16 screen is the target for Spanish. The following must be visible on actual Android, not merely imported:

- Fixed/sticky shared `FlowHeaderBack` outside the `ScrollView`: correct 42×42 Figma hit region, 39×39 circular backing, white 23×23 arrow, 48dp effective hit target; HAULIX centered wordmark and tagline. Respect native safe area/status bar. Header visible before/after scrolling, no clipping/overlay/z-index issue.
- Requested-pickup section with leading lime `C16LocationPinIcon`, rounded elevated panel, four distinct rounded detail rows. Each row has correct left icon + separator + stacked Spanish label/value: Home → `Dirección`; Buildings → `Ciudad`; Map → `Estado`; Envelope → `Código postal`.
- Eligibility card with lime `C16ShieldCheckIcon`, status strip with `C16DemoCheckIcon`, Spanish candidate-area text, and exact caution. Do not imply actual eligibility has been verified.
- Four **icon-led** actions in existing order: lime primary `Usar esta ubicación` with dark location pin; dark outlined `Elegir otra ubicación ›` with lime swap-arrows; `Ver respuesta fuera de cobertura ›` with lime crosshair; `Ayuda con permiso de ubicación ›` with lime information icon. CTA Spanish text may need responsive wrapping; never remove or squash icon to fit.
- Preserve elevated surfaces, lime `#BAFF42`, dark `#080B0B` background, padding, borders, corner radii, visual rhythm, status ribbon, correct `C16` step id, and native accessible labels. Do not render Figma's fake iOS status bar or the owner's screenshot as a UI background. No extra bottom navbar on C16.
- Verify Spanish **360dp** rendering particularly long CTA text, heading, eligibility title, footer; no overflow into icons or clipped right margins. Respect dynamic type/focus/accessibility.

### 3 — Navigation and actual behavior

- Update **Spanish** C15-S `Continuar a zona de servicio` to navigate to canonical `/service-area?service=<canonicalId>` (replace old C16 upcoming notice **for Spanish only**). Preserve existing English C15-S → C16 behavior.
- `Cambiar servicio` in C15-S and Home→C15→C15-S flows remain unchanged and functional.
- C16 screen Back button and Android hardware Back must return to **C15-S in the same locale** with service ID preserved. Deep-link/direct QA entry must have safe fallback to appropriate C15-S or C15 without loops; do not introduce authentication guards or `__DEV__` gating.
- C16's four actions remain **honest, localized notices** because C17, C16-V, C16-F and C16-P are not implemented: no fake route, booking confirmation, coverage API or permission prompt. Notices must be dismissible and not overlap the pinned header.

### 4 — Verification, screenshots and report

Run from repository root and record actual exit codes/results (no invented pass):

```
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```
Physical Android Realme Note 60 (or identified fallback) QA required; test Spanish C01 → C15 → C15-S → C16, icon visibility/card fidelity/scroll at 360dp, CTA notices, back flow, selection persistence, Spanish locale/persisted profile and English C16 regression. Capture actual screenshots listed in `docs/ANDROID_QA_C16_ES.md`, including **pinned back visible while scrolled** and icon-by-icon proof. Compare side-by-side with owner premium target and English C16 Android screenshots; report observable visual differences rather than claiming pixel perfection without measurements. No fake screenshots.

Create `PHASE_03_08_C16_ES_REPORT.md` including file diff, exact translations, unresolved source discrepancies, icon audit, actual device/build used (Expo Go vs release), screenshot paths, test count, regressions, known limitations and acceptance pass/fail.

**STRICT HARD STOP:** Stop immediately after C16 Spanish implementation + real Android QA + report. Do not implement new screen states, do not run GitHub, do not build APK, do not modify Driver or backend, and do not resume paused Account & Profile.
