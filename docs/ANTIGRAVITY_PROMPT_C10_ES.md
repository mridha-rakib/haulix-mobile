# HAULIX Customer App — Phase 02.10 · C10 Account Overview (Spanish ONLY)

## Role & strict objective

Implement **only** Spanish localization of the existing C10 Account Overview and its **existing** shared Photo Management and Bottom Navigation UI. This is a controlled, single-screen EN→ES follow-up to Phase 02.9 English and Phase 02.9.1 navbar/photo refinement. Work locally in `haulix-mobile`, customer app only.

- Spanish original Figma: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=347-315
- English original: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=333-26
- Spanish node `347:315`: `430×1564` reference, **not** same height as English `430×1580`.
- Figma page `293:9`: Working Copies / W01 Identity Account & Profile.
- Navbar Spanish instance `965:10500`, `Active=Account`, `Locale=ES`. C01 library component `957:8794`.

No separate Spanish account route. No C10-E Edit Profile implementation. No C10 Spanish-only duplicated component tree. No backend/auth/payment/OTP/OAuth integrations. No Driver App changes. No GitHub work. Do not create an APK in this phase unless explicitly required for validating a specific build-only defect; physical Android QA is mandatory.

## Step 0 — inspect and protect existing implementation

Before changing code, inspect the **actual current** local versions of:

- `apps/customer/app/(app)/account.tsx`
- `apps/customer/src/components/navigation/CustomerBottomNav.tsx`
- `apps/customer/src/components/account/ProfilePhotoActionSheet.tsx`
- `apps/customer/src/components/account/C10Icons.tsx`
- `apps/customer/src/fixtures/c10DemoProfile.ts` (or actual current fixture)
- `packages/i18n/src/locales/en.ts` and `es.ts`, plus i18n hooks/helpers
- Existing account/navigation/photo unit tests and relevant Expo Router layouts
- Existing Phase 02.9.1 report and screenshots `docs/qa/c10/`

Project conventions: Expo SDK 58, React Native 0.88.1, Expo Router, NativeWind 4.2.7, strict TypeScript, pnpm workspaces, Turbo, Jest, Biome. Preserve existing stable components and code style. Use the **already imported original C10 SVG assets and typed icon components**. The 19 packaged SVGs are source-reference backups, not an instruction to replace or duplicate the existing asset implementations.

## Step 1 — exact Spanish Account Overview content

Implement **verbatim visible Figma strings** listed in `C10_ES_TRANSLATIONS.csv` and `C10_ES_FIGMA_AUDIT.md` using `@haulix/i18n`. For this Spanish demo presentation only, the fictional Figma fixture is:

- `Bryan Lopez`, `bryan.lopez@example.test`, avatar initials `BL` when no photo
- Customer status `BRYAN LOPEZ  ·  CUENTA DE CLIENTE`
- Same fictional Arizona phone `+1 602-555-0142`, example address, reference booking `HX-DEMO-1027`

English MUST continue to show `Sarah Mitchell`, `sarah.mitchell@example.test`, `SM` on **no-photo** state, and its English booking copy. Render locale-dependent **presentation fixtures** without creating, storing, or claiming actual authenticated accounts. Keep any user-selected local avatar photo across locale switches; the avatar initials should change only if **no photo** is present. Never rewrite or delete a saved user-selected photo merely because the app locale changes.

**Exact visible Spanish copy** (includes punctuation and accents):

- `Mi cuenta`
- `Administra tu perfil y tus preferencias de servicio.`
- `BRYAN LOPEZ  ·  CUENTA DE CLIENTE`
- `Cliente verificado`, `Cliente`, `Bryan Lopez`
- `Correo`, `bryan.lopez@example.test`
- `Teléfono verificado`, `+1 602-555-0142`
- `Cuenta verificada · Zona de Arizona`
- `Cuenta y preferencias`
- `Dirección de recogida`, `1234 E Example Lane, Phoenix`
- `Idioma`, `Español (Estados Unidos)`
- `Métodos de pago`, `Referencia de prueba guardada`
- `Reserva activa`, `HX-DEMO-1027 · Retirada de objetos`
- `↗ Cerrar sesión`
- `Español seleccionado · Cambiar a inglés` **(no leading globe icon on original visible ES Figma text)**
- `SEGURIDAD Y FOTO DE PERFIL`
- `Cambiar contraseña`
- `Foto · Añadir / cambiar / eliminar`
- Primary CTA `Editar perfil`; secondary CTA `Direcciones guardadas`
- Bottom tabs `Inicio`, `Mis trabajos`, `Reservar`, `Ofertas`, `Cuenta`

Preserve the original shared HAULIX wordmark and icons, without replacing them with emoji or redrawn approximations. Account-active tab remains lime `#BAFF42`.

## Step 2 — exact spacing and behavior

Spanish 430×1564 frame's visible block positions (all are reference design pixels, adapt to real Android dp/safe areas):

- Header x=22 y=79 w=386 h=61
- Intro x=22 y=159 w=386 h=62; heading 36px high; description starts at intro y+46
- Status x=22 y=240 w=386 h=43
- Verified customer card x=22 y=302 w=386 h=340; avatar action 72×72, `BL` with 21×21 camera badge
- Preferences card x=22 y=661 w=386 h=353
- `Cerrar sesión` x=22 y=1033
- Language switch x=22 y=1067
- Security/Photo shortcuts x=22 y=1101 w=386 h=140
- CTA primary x=22 y=1260 w=386 h=58 (inner button 364×54)
- CTA secondary x=22 y=1337 w=386 h=58 (inner button 364×54)
- Sculpted navbar x=0 y=1414 w=430 h=128; active Account + Spanish labels

Do not enforce 430×1564 hard-coded real-device dimensions. Use responsive layouts and ScrollView clearance. Spanish is 16 design pixels shorter than English primarily due to one-line intro copy; preserve correct flow and avoid blank height hacks. See `NAV_PHOTO_REGRESSION.md` for Android inset/safe-area invariant.

## Step 3 — preserve Photo Add/Change/Remove, fully localized

Reuse the existing functional `ProfilePhotoActionSheet.tsx` built in Phase 02.9.1, accessible from **both** avatar/camera badge and security photo shortcut. Add i18n keys and localize its own text and state/error/confirmation UI to idiomatic Spanish. The separate photo action sheet has **no original Figma reference**, so translations in `C10_ES_TRANSLATIONS.csv` marked `proposed-photo-ui` are **implementation recommendations**, not Figma-exact copy; use consistency with English interaction states.

Test in ES:

1. Avatar no photo shows `BL`. Open action sheet from avatar, then from shortcut.
2. Camera + Gallery pickers open, permission-denial/error states have translated app-owned messages.
3. Crop/preview photo, save/update photo, reopen app and confirm photo persists.
4. Change photo, open remove confirmation, cancel, then confirm removal; fallback to `BL`.
5. Switch EN→ES→EN and verify user-selected photo remains; on remove fallback initials follow locale (`SM` for EN, `BL` for ES).

Native Android photo picker labels may follow device/system language rather than app locale; do not misrepresent this as an app-localization failure. Inspect actual photo persistence code; don't assume whether it uses SecureStore, AsyncStorage or FileSystem. Avoid storing ephemeral cache URIs that disappear on restart. Do not upload images to a backend.

## Step 4 — navigation and no-auth-guard frontend QA policy

- Shared navbar component **must not be reimplemented**; implement Spanish tab labels through i18n and keep `Active=Account`, locale ES.
- `Inicio`, `Mis trabajos`, `Reservar`, `Cuenta`, `Ofertas` should use current intended demo nav behaviors. Never route `Ofertas` to an unapproved screen; if destination not implemented, give honest non-fake notice rather than broken navigation.
- Fix no duplicate Android bottom safe-area insets and no black dead space. Preserve Phase 02.9.1 solution and smooth scrolling above navbar.
- Tap `Español seleccionado · Cambiar a inglés` should toggle to English Account Overview. English language control toggles back to Spanish. Preserve scroll/navigation logically, without tearing or blank intermediate screens.
- `Cerrar sesión` is **frontend-only** navigation to C06. Do not claim a real backend session was terminated. Retain locale where appropriate.
- `Editar perfil` and `Direcciones guardadas` must not route to unimplemented screens. Show existing honest UI notice/disabled-presentational action, with localized feedback. **Do not implement C10-E**.
- For this **frontend development/demo phase**: no `__DEV__` or login/auth guard blocking approved preview screens on standalone client demo APKs. Never fabricate OAuth token/session/JWT/verified backend response/payment success.
- Preserve C06–C09 bottom-nav exclusion. Preserve the client's floating frontend QA screen switcher if present, accessible in test/demo build.

## Step 5 — QA and measurable acceptance

Run `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm doctor`; resolve any regression directly attributable to this work. Add focused tests for:

- exact Spanish account/profile/status/preferences/CTA copy
- EN fixture Sarah/SM vs ES Bryan/BL and locale-bound demo state
- EN↔ES in-app language switching and maintaining locale after navigation
- C10 navbar `Cuenta` active, translated labels, same shared component
- Photo sheet strings/states, photo persistence and initials fallback across locale changes
- no auth guard blocking preview
- bottom navigation excluded on C06–C09
- regression for existing English screen, C09, C06–C08

Perform real device Android QA (not just unit tests) with 360dp Android device where available. Compare original Figma `347:315` screenshot to actual scrolled screenshots from on-device. Include photo sheet empty/selected/remove states, language toggle, navbar end-of-scroll safe area. If unavailable, clearly separate unverified hardware acceptance from automated checks; never invent screenshots/tests.

Recommended evidence file paths in `docs/qa/c10/`:

- `figma-C10-es-reference.png` (exported directly from Figma if accessible)
- `android-C10-es-top.png`
- `android-C10-es-profile.png`
- `android-C10-es-preferences.png`
- `android-C10-es-shortcuts.png`
- `android-C10-es-bottom-nav.png`
- `android-C10-es-photo-sheet.png`
- `android-C10-es-photo-saved.png`
- `android-C10-es-photo-removed.png`
- `android-C10-es-switch-to-en.png`
- `android-C10-en-regression.png`

Create `PHASE_02_10_C10_ES_REPORT.md` with changed files, exact Figma alignment findings, real device configuration, screenshot evidence, route and photo interaction results, QA test counts and output, any untested/blocked items. Explicitly note no actual backend authentication.

**STRICT HARD STOP:** finish only Phase 02.10 C10 Spanish. Do not implement C10-E Edit Profile, C10-S, C10-R, other W01 states, new backend endpoints, Driver App, or unrelated screens. Stop and report.
