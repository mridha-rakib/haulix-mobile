# ANTIGRAVITY — HAULIX Customer App Phase 03.06

## C15-S Service Selected / Servicio elegido — SPANISH ONLY

**Mission:** Localize existing, already implemented English C15-S into Spanish with Figma fidelity, real app navigation, full physical Android QA, and no new booking-flow screen.

**Spanish authoritative Figma:** `974:8965`, 430 × 1015 px
https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=974-8965

**English counterpart:** `382:241`
**Approved Spanish service terminology:** `974:8843` (C15-ES)
**App:** `haulix-mobile` → `apps/customer`; Expo SDK 58, React Native, Expo Router, NativeWind 4, TypeScript strict, `@haulix/i18n`, pnpm monorepo.

### 0 — Inspect existing project; preserve working phases

Read all docs in this ZIP before editing: `C15S_ES_FIGMA_SOURCE_AUDIT.md`, `C15S_ES_TRANSLATIONS.csv`, `SELECTION_AND_NAVIGATION_CONTRACT.md`, `ANDROID_QA_C15S_ES.md`, `C15S_ES_TEST_MATRIX.csv`, and `ASSET_MANIFEST.csv`.

Inspect `apps/customer/app/(app)/service-selected.tsx`, `service-discovery.tsx`, `apps/customer/src/components/discovery/C15SIcons.tsx`, `C15Icons.tsx`, canonical `c15Services.ts` and existing locale dictionaries/tests, current demo profile state, DemoScreenNavigator, W02 flow header, local notice and Android safe-area components. **Do not discard the Phase 03.05 functional English route**.

Use exact Figma screenshot as the visual comparison target. Do not use a full Figma screenshot as UI implementation. First check that the C15-S original SVG truck & back arrow already exist in project assets from Phase 03.05; reference copies are in this ZIP only as fallback. No new PNG needed.

### 1 — Localize exactly one canonical screen

**Reuse** `apps/customer/app/(app)/service-selected.tsx`. Do not create new Spanish route, screen fork or separate service catalog.

Render Spanish source copy from `docs/C15S_ES_TRANSLATIONS.csv`: indicator `W02 · SERVICIOS Y SOLICITUD / C15-S`, `Servicio elegido`, `SELECCIONADO`, note `Borrador ilustrativo · Sin precio calculado`, `Cómo funciona la solicitud` and its three steps, buttons `Continuar a zona de servicio`, `Cambiar servicio ›`, demo footer.

Preserve frame layout and source geometry: 430×1015, horizontal margin 22, 39px customer context chip, 221px Selected section, 340×121 selected tile with lime border, 160px process section, two 56px action slots, footer. Use current shared HAULIX wordmark and **Flow Header Back**. **No bottom navigation** on C15-S. Use true Android StatusBar and safe area (do not emulate iOS 9:41).

Render the selected category dynamically. Default preview is **Retiro de objetos**; `Mudanzas`, `Retiro de muebles`, `Retiro de electrodomésticos`, `Retiro de colchones`, `Limpieza de garaje`, and `Recogida en tienda` must also display the correct title, supporting text, and icon. Default selected truck icon from the original C15-S Figma; for other categories reuse existing C15 icons. Preserve title/description layout while allowing natural wrapping on 360dp devices, especially the long appliance service label.

**Do not blindly copy two leftover English/foreign demo values from Spanish Figma:**

- Source Spanish customer chip still says `SARAH MITCHELL`. Runtime must display **Bryan Lopez** (or current edited Spanish profile), while English keeps Sarah Mitchell.
- Spanish Figma's selected tile description is still English: `Non-hazardous junk and bulky-item pickup`. For Spanish use verified C15-ES description `Retiro y eliminación de residuos no peligrosos` (`974:8869`). Other service descriptions come from Spanish C15 service definitions. Document both differences honestly as source corrections, not claimed pixel-identical textual matches.

Use existing i18n keys or a localized namespace in `en.ts` and `es.ts`. Keep parity for any added keys and avoid raw hardcoded Spanish in TSX. Do not alter C15 English translation semantics or default content.

### 2 — Navigation and demo state

Spanish C15 currently shows an outdated C15-S upcoming notice. Replace only this flow: tapping `Elegir <servicio>` should navigate to **existing C15-S route** with validated `service=<id>`; selected service should survive C15 → C15-S → C15 and reselecting.

`Cambiar servicio ›`, header Back and Android system Back return to Spanish C15, retaining the previous selected ID. A QA direct-entry fallback must not break the stack or unintentionally switch English.

`Continuar a zona de servicio`: **C16 not implemented**. Show a truthful, dismissible Spanish upcoming C16 notice (proposed copy in CSV). Do not simulate successful location coverage, booking creation, AI quote, payment or API calls.

Stay frontend-only: no `__DEV__` auth blocking test APK access, no fabricated backend users/sessions. Demo customer names are labeled local fixture state, not authenticated users. Keep English C15-S functional and ensure all C01–C10 previously implemented screens remain unaffected.

### 3 — Required automated and Android QA

Add tests verifying Spanish source strings, profile isolation, 7 category IDs, unknown ID default, dynamic selected state, selected tile icon, C15 Spanish → C15-S Spanish, return via Change and Android Back, truthful C16 notice, header/no bottom nav, i18n key parity and regression of English C15-S. Use `C15S_ES_TEST_MATRIX.csv`.

Run from monorepo root and record raw final command output/results:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Investigate any existing Biome 2.6.7/pnpm lock configuration rather than opportunistically upgrading dependencies again. Avoid reformatting unrelated project code.

Physical Android QA preferred Realme Note 60 (Android 15), test Spanish C15 → C15-S at native 360dp. Verify Junk and Moving at minimum, plus long Spanish names; both CTA actions, Change service state preservation, Android back, scroll and safe area, no bottom navbar, English regression, home preselection. Capture **actual** screenshots in `docs/qa/c15s/`, including `figma-C15S-es-reference.png` if Figma screenshot export is available. Do not fabricate QA screenshots. Distinguish Expo Go validation from standalone APK testing.

### 4 — Deliverable and strict stop

Create `PHASE_03_06_C15S_ES_REPORT.md` with code changes, exact Figma copy and intentional divergence, service ID routing contract, test counts (actual command results), screenshot paths, hardware details, QA pass/fail, English regression, open issues and mention whether testing used Expo Go.

**HARD STOP:** Do not implement C16, C18, C15-E, any other Customer screen or Spanish unrelated screen; do not modify Driver App, backend, payments, accounts/auth, suspended C10-F Phase 02.15. No GitHub operations, EAS build, APK rebuild or client release unless requested separately.

**End immediately after Phase 03.06 Spanish implementation + real Android QA + report.**
