# Antigravity Implementation Prompt

## HAULIX Customer App — Phase 03.04: C15 Service Discovery (Spanish Localization ONLY)

### Task and authoritative references

Extract the Phase 03.04 handoff ZIP; read all documents before editing. Continue the existing local `haulix-mobile` monorepo. Do **not** restart Phase 03.03 English or create a second screen. Implement **C15 Spanish** in the existing `apps/customer/app/(app)/service-discovery.tsx` with Expo Router, React Native, strict TypeScript, NativeWind, the existing `@haulix/i18n` package, shared design tokens and components.

Figma Spanish **`974:8843`**: `C15-ES · Seleccionar servicio / W02 [LOCALIZACIÓN]`, **430 × 1791**. Compare Figma English **`382:126`**, also 430 × 1791. Do not rely on a handoff screenshot as an app asset. Obtain your own Figma screenshot for pixel-level comparison.

### Step 1 — Inspect existing implementation before changing anything

Inspect the current files (paths may differ; verify, don't blindly overwrite):

- `apps/customer/app/(app)/service-discovery.tsx` (existing C15 EN route)
- `apps/customer/app/(app)/index.tsx` (C01 Home ES & EN)
- `apps/customer/src/components/navigation/CustomerBottomNav.tsx` (C01 only; **not in C15**)
- `apps/customer/src/components/discovery/C15Icons.tsx` and assets in `apps/customer/assets/c15/original-svg/`
- `apps/customer/src/fixtures/c10DemoProfile.ts` (locale-scoped demo profile, use correct existing selector/store)
- `apps/customer/src/data/c15Services.ts` or wherever canonical service IDs live
- `packages/i18n/src/locales/en.ts` and `es.ts`
- `apps/customer/src/components/demo/DemoScreenNavigator.tsx` if needed for QA
- Existing `service-discovery.test.tsx`, `home.test.tsx`, `i18n.test.ts`

Preserve existing C15 English behavior, C01 bilingual functionality and all previous account/profile implementations.

### Step 2 — Exact Spanish Figma layout and content

- **Same route and layout** as C15 English; no `service-discovery-es.tsx` or separately cloned state tree.
- Background `#080B0B`, brand lime `#BAFF42`, native Android status bar + safe area. **No drawn fake iOS status bar.**
- **Flow Header Start**: centered HAULIX wordmark/tagline, no bell, no account navbar. Figma C15-ES keeps literal tagline `We Haul It All.`; use existing shared brand treatment and record any deliberate divergence.
- W02 pill `W02 · SERVICIOS Y SOLICITUD / C15`.
- Heading `¿En qué podemos ayudarte?`; subtitle `Elige el servicio autorizado que necesitas.`.
- Locale-aware customer demo context chip: **Bryan Lopez**, e.g. `BRYAN LOPEZ · HX-DEMO-1027` (Spanish Figma static placeholder is `SARAH MITCHELL · HX-DEMO-1027`; this difference is intentional for the existing app's profile separation). Do not create a mock auth session.
- `Zona de servicio` card: `Phoenix, Arizona · Zona inicial` and `La cobertura en Arizona se valida antes de reservar`. This is **not proof of real live eligibility**.
- `Servicios disponibles`: exactly **7** rows (see translation CSV), Figma 354 × 76 inside 386-wide card at 430 canvas. Keep original C15 row vector icons and chevrons.
- `Para Bryan Lopez` + `Información del servicio` + `Solicitud HX-DEMO-1027 · <selected localized service>` + `Aún no hay cotización ni cita confirmada.`.
- Actions: main `Elegir <localized service>`; `Verificar zona de servicio ›`; `Ver restricciones de ubicación ›`; `¿No ves tu servicio? Ver opciones ›`.
- Footer `SOLO DEMO · Sin reserva, tarifa ni pago confirmado` and reference `SRS BK-01, SV-01, AI-12 · 430 px / desplazamiento vertical` (adapt footer to Android if fixed physical pixel text isn't appropriate, without inventing claims).
- Preserve 22px Figma frame side margins and vertical rhythm (see geometry audit). Spanish long descriptions must wrap legibly without clipping on 360dp devices; responsive height growth is allowed when required.
- **Do not show Assembly Add-on**; it is optional on C01 but is **not** one of C15's seven services. **Do not show bottom navigation** on C15.

### Step 3 — Locale-aware service selection and state

- Keep a **canonical, locale-independent service ID** for each row (`junk-removal`, `moving`, `furniture-pickup`, `appliance-removal`, `mattress-removal`, `garage-cleanout`, `store-pickup`; adapt to existing IDs rather than refactoring without cause).
- Localize labels and descriptions through `@haulix/i18n`; never key domain logic off translated text.
- Selecting any service updates selected row, primary CTA, and the `Solicitud HX-DEMO-1027 · ...` preview instantly, without backend requests or fake confirmed bookings.
- When entering C15 from a Spanish C01 service tile, preserve the preselected canonical service. From the main `Reservar un servicio` CTA or center `Reservar` button use the already-established default if no preselection is supplied.
- Locale changes or navigation back/forward must not leak English customer Sarah Mitchell into Spanish Bryan Lopez state, nor vice versa. Respect existing demo profile edits and locale-separated data persistence.
- If a profile name becomes longer, safely wrap/truncate only as dictated by design and accessibility; never corrupt the actual profile stored value.

### Step 4 — Navigation and truthful next-step boundaries

- **C01 Spanish**: enable `Reservar un servicio` → existing C15 route in Spanish; center bottom-nav `Reservar` → C15 Spanish; active seven home service tiles → C15 Spanish with correct preselected service.
- **C01 English**: preserve existing Home → C15 English and all current preselection behavior.
- C15 Android back returns to the correct locale's C01 Home; no loop, no unintended scroll/stack pollution.
- For `Elegir <service>` show **localized informational upcoming-phase UI** because C15-S and C18 are not yet implemented. For `Verificar zona de servicio` show C16 pending; for restrictions show C16-F pending; for missing service show C15-E pending. Use honest, dismissible notices and keep selection intact. **Do not claim a booking or eligibility was confirmed.**
- Navigation of C06–C10, Profile Photo, language switching, Account and English C01 must remain intact.

### Step 5 — Original assets and implementation hygiene

- Reuse all **10 original Figma C15 SVGs** already integrated in Phase 03.03 (`C15Icons.tsx`). No fresh image/icon package, no replacement stock/AI assets. If a file is absent, report and recover original Figma asset, not a substitute.
- Reuse the same C15 route, heading/components/card styles, token-based colors, and current notification/banner pattern. No duplicate navigation service, no new mock backend, no fake GPS validation, payment, quotation, auth or customer session.
- No authentication guards or `__DEV__` restrictions that block frontend-only APK QA.
- No Driver App edits. No GitHub operations or APK rebuild.

### Step 6 — Test and document

From `haulix-mobile` root run:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Add/adjust **C15 Spanish tests**, C01 bilingual navigation tests and i18n translation parity tests; keep the existing C15 English tests green. Explicitly test **all 7 selections**, Spanish and English profile separation, `Reservar` from Spanish Home, item preselection, long descriptions and truthful pending messages.

On the connected physical Realme Note 60 (Android 15), test with Expo's existing development process and ADB (not standalone APK). Capture real screenshots under `docs/qa/c15/`, including Figma reference, C15 ES header/service list/bottom/actions, a nondefault selection, Home ES → C15, pending notice, back navigation and English regression. Check 360dp viewport, text overflow, vertical scrolling, and no C15 bottom navbar. Never invent screenshots.

Create `PHASE_03_04_C15_ES_REPORT.md` with modified files, exact Figma deviations (especially Bryan-vs-Sarah preview), real tests, device model, screenshot filenames and unresolved gaps.

### STRICT HARD STOP

Implement **C15 Spanish ONLY**. Do **not** implement C15-S, C15-E, C16, C16-F, C18, future booking screens, Driver App or backend. **Do not build an APK. Do not push to GitHub.** Finish Spanish Android QA and report; then STOP.
