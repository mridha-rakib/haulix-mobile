# ANTIGRAVITY — HAULIX Customer App Phase 03.05

## C15-S Service Selected / Junk Removal Selected — ENGLISH ONLY

**Task:** Implement the single C15-S selected-service screen based on authoritative Figma `382:241` and validate on Android. English C15 (`382:126`) and Spanish C15 (`974:8843`) already exist in source, so reuse rather than fork or redesign. **Do not implement Spanish C15-S**.

**Figma:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=382-241

**Project:** `haulix-mobile/apps/customer`, Expo SDK 58, Expo Router, React Native, TypeScript strict, NativeWind 4, pnpm monorepo, HAULIX shared components/tokens/i18n.

### 0. Prerequisite review

Extract handoff ZIP into temporary working folder. Read fully:

- `docs/C15S_EN_FIGMA_AUDIT.md`
- `docs/SELECTION_AND_NAVIGATION_CONTRACT.md`
- `docs/C15S_EN_SCREEN_TEXT.csv`
- `docs/ANDROID_QA_C15S_EN.md`
- `ASSET_MANIFEST.csv`

Inspect the actual repo before any edits: C15 existing `apps/customer/app/(app)/service-discovery.tsx`, `c15Services.ts` (find true path), existing `C15Icons.tsx`, shared flow header or equivalent, notice banner, English demo profile fixture/state, DemoScreenNavigator and i18n.

Obtain an authoritative visual screenshot of the Figma node 382:241; the screenshot is not embedded in the ZIP. Use original SVGs provided in `assets/original-svg/`. Do not use a full Figma screenshot as a UI image.

### 1. Implement C15-S English (one screen only)

- Create/reuse one canonical route such as `apps/customer/app/(app)/service-selected.tsx`; no duplicated locale route. Keep naming consistent with current router conventions.
- Implement original **HAULIX W02 Flow Header Back**, Figma chip `W02 · SERVICE DISCOVERY & INTAKE / C15-S`, page heading `Junk Removal` and exact subtitle for the default Junk fixture.
- Render existing English profile name dynamically in context chip; never overwrite edited demo customer names.
- Render **Selected service** card: 31×31 original selected truck SVG and label `SELECTED`, title `Junk Removal`, subtitle `Non-hazardous junk and bulky-item pickup`, 121 px tile with lime selected outline; note `Illustrative draft · No price calculated yet`.
- Render **How this booking works** card with the three exact steps shown in the audit. Do not replace the sequence with a live booking wizard.
- Render `Continue to service area` primary CTA and `Change service ›` secondary CTA, original text and proper touch targets. Show the two footer lines verbatim in English.
- Reuse native Android StatusBar, safe-area, Inter, HAULIX tokens and existing shared button/notice components; **no bottom navbar** on C15-S. Avoid duplicate icons/dependencies.
- Layout based on 430×1015 Figma proportions; support scroll and 360dp device responsiveness. No clipping, overlay or extra black safe-area gaps.

### 2. Connect from the existing C15 route

- Update English C15 primary action `Select <service>` to navigate to C15-S with validated selected service ID. Seven services only (no Assembly Add-on). Default direct QA entry to Junk Removal is a **labeled fixture**.
- The Figma source shows only the Junk selected state; do not hardcode Junk for Moving, etc. The selected tile's content must reflect the actual chosen service. For the default Junk screenshot keep **exact truck SVG** in source, despite category icon differences from C15; for other services you may reuse existing C15 semantic icons, recording this runtime variant as not separately Figma-approved.
- Keep selection on navigation to/from C15; `Change service ›` and header Android back return to C15 with previous selected category preserved. Avoid stack loops and not-found routes.
- Primary CTA `Continue to service area` shows an honest localized upcoming C16 notice (C16 not developed). Do not implement C16, calculate pricing, simulate eligibility or create a booking.
- **Spanish C15 must remain unchanged:** selecting services in Spanish still shows its current Spanish upcoming notice, no English C15-S redirection.
- Add English C15-S to demo QA screen switcher if needed, while keeping demo-only access distinct from production functionality; frontend preview must not be blocked by auth or `__DEV__` guards in client APK testing.

### 3. Automated checks and Android QA

Add/modify focused automated tests asserting: valid 7-service selection route behavior, default fixture and invalid param fallback, dynamic title and service tile, `Change service` and Android back, truthful C16 notice, no C15-S bottom navbar, English/Spanish isolation, no mock booking persistence. Test both a Junk and a non-Junk choice (Moving at minimum) with real Android taps.

Run from monorepo root:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Realme Note 60 Android 15 device via ADB preferred. Compare actual C15-S screenshot to **Figma node 382:241** and record layout discrepancies; do not claim pixel-perfect without measured comparison. Capture actual Android screenshots under `docs/qa/c15s/`, including direct default, selected service card, full bottom, C15→C15-S navigation, non-Junk selection, Change service back and C16 notice, plus Spanish C15 regression.

### 4. Deliverable and hard stop

Write `PHASE_03_05_C15S_EN_REPORT.md` containing: modified file list, original Figma mapping, reuse decisions, selection/route state contract, pass/fail test counts, physical device details, named screenshot paths, known bugs, English and Spanish regressions, and factually correct scope statement.

**STRICT HARD STOP:** No Spanish C15-S, C16, C18 or other Customer screens. Do not touch Driver App, backend, payment/GPS APIs. Do not run EAS/APK builds or GitHub actions unless explicitly requested. Do not resume paused Account & Profile C10-F work. End phase after English C15-S + QA report.
