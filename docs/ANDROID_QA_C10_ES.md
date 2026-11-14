# Phase 02.10 — Android QA Acceptance Checklist (Spanish C10 Only)

**Do not mark any item complete from earlier reports without retesting after this phase's code change.** Report exact hardware/build type (Expo Go vs standalone APK), screenshots, logs, tests.

## Screen and locale QA

- [ ] Navigate via existing frontend demo menu to C10, select ES. No backend login/auth guard required.
- [ ] Header `Mi cuenta`, description, `BRYAN LOPEZ · CUENTA DE CLIENTE` correct; customer `Bryan Lopez` / `bryan.lopez@example.test` is clearly demo fixture.
- [ ] Avatar no-photo state `BL` with same camera badge as EN.
- [ ] Verified customer card and 4-row preferences copy match CSV; no clipping.
- [ ] Security section shows `SEGURIDAD Y FOTO DE PERFIL`, `Cambiar contraseña`, `Foto · Añadir / cambiar / eliminar`.
- [ ] Spanish CTAs `Editar perfil` and `Direcciones guardadas` are readable and touchable.
- [ ] Locale switch says exactly `Español seleccionado · Cambiar a inglés`, toggles to EN; EN toggle returns to ES.
- [ ] EN regression: Sarah Mitchell / SM; switching to ES shows Bryan Lopez / BL when no photo.
- [ ] `Cerrar sesión` goes to C06 sign-in with honest demo navigation.
- [ ] No new C10-E screen/route implemented; unimplemented CTAs do not cause broken navigation.

## Bottom navbar and Android inset QA

- [ ] Reuses same sculpted C01 asset and `CustomerBottomNav.tsx` (not a Spanish fork).
- [ ] ES labels `Inicio`, `Mis trabajos`, `Reservar`, `Ofertas`, `Cuenta` fit 360dp.
- [ ] Account tab lime active, center Book circle + geometry faithful.
- [ ] No large black dead strip under navbar; bottom safe area applied **once**.
- [ ] Scroll to very bottom: secondary CTA fully visible and not overlapped by nav.
- [ ] C06–C09 continue without nav.
- [ ] 3-button Android and gesture mode tested where feasible; otherwise mark not tested.

## Photo management QA

- [ ] Tap avatar and shortcut independently: same localized sheet opens.
- [ ] Choose Gallery → preview → Save → display selected image.
- [ ] Take Photo → confirm crop → Save → avatar updates.
- [ ] Change image → persists after app restart.
- [ ] Switch locale with saved image: image remains. Remove image: fallback `BL` in ES or `SM` in EN.
- [ ] Remove confirmation dialog offers localized Remove and Keep Photo; cancel does not remove.
- [ ] Denied permission/error states have localized app messages; native system labels may use device locale.

## Technical gates

- [ ] `pnpm check`
- [ ] `pnpm typecheck`
- [ ] `pnpm test` (counts and suites recorded)
- [ ] `pnpm doctor`
- [ ] Regression C06–C09 EN/ES and C10 EN green
- [ ] Evidence screenshots taken from actual Android hardware/emulator, not generated or claimed without a capture
- [ ] Report `PHASE_02_10_C10_ES_REPORT.md` identifies any block/uncertainty

**Evidence requests**: `figma-C10-es-reference.png`, `android-C10-es-top.png`, `android-C10-es-profile.png`, `android-C10-es-preferences.png`, `android-C10-es-shortcuts.png`, `android-C10-es-bottom-nav.png`, `android-C10-es-photo-sheet.png`, `android-C10-es-photo-saved.png`, `android-C10-es-photo-removed.png`, `android-C10-es-switch-to-en.png`, `android-C10-en-regression.png`.

**Stop before:** C10-E Edit Profile / C10 Spanish-only additional screens / backend work / new APK release unless specifically requested.
