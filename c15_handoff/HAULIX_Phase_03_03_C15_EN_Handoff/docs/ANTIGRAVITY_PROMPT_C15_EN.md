# HAULIX Customer App — Phase 03.03: C15 Service Discovery / Select Service (English ONLY)

**Task type:** ONE screen, Figma-to-Expo frontend implementation, visual verification, native Android QA, handoff report. **Do not start any follow-on screen or Spanish localization.**

## 0. Exact Figma and scope

- Source-of-truth Figma: `https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=382-126`
- Frame: `382:126`, **430 × 1791**, titled `C15 · Service discovery / W02 [BK-01, SV-01, AI-12]`.
- This is W02 booking-flow entry, **not** C01 Home and **not** C15-S or C18 intake.
- This handoff includes exact C15 Figma-exported SVG source icons and a node-by-node audit. **No custom hero photo** is part of this screen; reuse the existing HAULIX wordmark and Flow Header. Do not use the Figma screenshot as a full-screen background.
- Neighboring reference only: C01 English Home Figma `439:3498` / existing `apps/customer/app/(app)/index.tsx`.
- Next-phase references are **NOT in scope**: `C15-S 382:241`, `C15-E 382:287`, `C16 382:323`, `C16-F 382:419`, and all `C18-*` service intake screens.

**IMPORTANT:** Account/Profile `C10-F` remains PAUSED. `C15 Spanish` comes next, only after this English screen's QA/approval.

## 1. Inspect actual monorepo before coding

Current expected structure (verify it, do not assume it blindly):

```text
haulix-mobile/
  apps/customer/app/(app)/index.tsx          # existing bilingual C01 Home
  apps/customer/app/(app)/account.tsx        # existing C10
  apps/customer/src/components/navigation/CustomerBottomNav.tsx
  apps/customer/src/components/demo/DemoScreenNavigator.tsx
  apps/customer/src/fixtures/c01HomeServices.ts
  apps/customer/src/fixtures/c10DemoProfile.ts
  packages/design-tokens/
  packages/i18n/src/locales/{en,es}.ts
```

Stack: Expo SDK 58, React Native, Expo Router, NativeWind/Tailwind, `react-native-svg`, pnpm/Turbo, TypeScript strict, Biome/Jest.

- Preserve existing app Router structure. Choose an appropriate C15 route (e.g. `apps/customer/app/(app)/service-discovery.tsx`) only after inspecting existing routes. **One screen and one route**; prepare it for later EN/ES reuse. Do not fork an English-only route and future Spanish route.
- Reuse existing shared typography, colors, buttons, icons, safe-area primitives and brand header if they match. Do **not** add a second global navbar.
- The C15 screenshot has **NO bottom navigation**. Use `HAULIX Flow Header · Start` (`436:1957`, source component `429:290`/`429:305`): centered HAULIX wordmark + tagline, with **no notification bell** and **no bottom navbar**. The OS Android status bar is native; Figma's iOS 9:41 simulation must NOT be rendered on Android.
- Add `C15 English` entry to the existing frontend QA navigator; keep it reachable in debug/release demo builds without a backend-auth guard. Any QA-only entry point must remain clearly marked non-production.

## 2. Original Figma assets

`assets/original-svg/` contains **10 original SVGs exported directly from C15 Figma** (not approximations): seven service icon drawings, chevron, check, service-info check. Use exact `viewBox`, paths, strokes, scale and colors via the established `react-native-svg` pattern. Reuse existing C01 icon components only if the SVG/path is visually identical; note that C15's appliance icon is a **box** and is NOT the C01 washing-machine icon. No Figma raster images are needed for C15.

Do not replace the original line icons with emoji, remote URLs, guessed Lucide vectors, or screenshot slices. SVG source is provided for adaptation into typed RN SVG components. Avoid new icon dependencies.

## 3. C15 English layout and content, in Figma order

Target frame 430×1791; horizontal content margins = 22px; major content width = 386px. Use responsive native layouts and scrolling, _not_ a hardcoded 1791-height viewport. Treat Figma coordinates as reference positions at 430dp and adapt at 360dp.

1. **Flow Header** — Figma y=81, x=22, 386×60. Centered HAULIX mark, `We Haul It All.` (no bell). Native status bar above.
2. **W02 indicator** — x=22, y=158, 386×33; left `W02 · SERVICE DISCOVERY & INTAKE`, right `/ C15`.
3. **Heading** — x=22, y=208, 386×98; `What can we help with?` + `Choose the approved service that matches your task.`
4. **Customer context** — x=22, y=323, 386×39; lime check icon and uppercase demo name/ID `SARAH MITCHELL · HX-DEMO-1027`. Bind display name to **English demo profile state**, fallback to this Figma fixture only if necessary. Do not show actual verified backend identity.
5. **Service area section** — x=22, y=379, 386×160, cornered surface; title `Service area`; `Phoenix, Arizona · Initial service region`; `Eligible Arizona service area checked again before booking`. Treat it as fixed illustrative Arizona-launch copy, _not real geolocation or a live eligibility check_.
6. **Available services section** — x=22, y=556, 386×684, contains seven 354×76 service rows in 89px vertical rhythm, starting within the section at y=57. Rows have lime icon x=12 inside each row, title, subtitle, chevron right. Use exactly these seven options and this order:
   - Junk Removal — `Non-hazardous hauling and disposal` — Figma `382:152`, C18-J (future).
   - Moving — `Pickup-to-destination transport` — `382:160`, C18-M (future).
   - Furniture Pickup — `Sofas, tables and other furniture` — `382:171`, C18-F (future).
   - Appliance Removal — `Approved appliance removal` — `382:179`, C18-A (future).
   - Mattress Removal — `Mattress handling and disposal review` — `382:187`, C18-T (future).
   - Garage Cleanout — `Photos, access and contamination screening` — `382:195`, C18-G (future).
   - Store Pickup — `Store order collection and delivery` — `382:203`, C18-R (future).
     **NO Assembly Add-on in C15**; it appears dimmed on C01 Home only.
7. **Customer service info** — x=22, y=1257, 386×162, title `For Sarah Mitchell` derived from EN profile, status row `Service information`, illustrative line `Draft booking HX-DEMO-1027 · Junk Removal`, and disclaimer `No quote or appointment has been confirmed yet.` Must not create or persist a booking from this screen.
8. **Four vertical actions** — x=22, y=1436, width 386, four 56px actions with 11px vertical gaps:
   - Lime primary `Select Junk Removal` (label reflects currently preview-selected service if changed). Figma action destination C15-S `382:241` (later).
   - Dark outlined `Check Service Area ›` (C16 `382:323`, later).
   - Dark outlined `View location restrictions ›` (C16-F `382:419`, later).
   - Lime primary `Service not listed? Check options ›` (C15-E `382:287`, later).
9. **Footer** — x=22, y=1710, 386×48: `DEMO ONLY · No confirmed booking, rates or payment` and `SRS BK-01, SV-01, AI-12 · 430 px / vertical scroll`.

Design tokens: screen background `#080B0B`, key lime `#BAFF42`, white text `#F6F8F6`, secondary text `#ADB7B1`. Derive card surfaces, radius and strokes from exact design/components; do not invent a brighter green or add unrelated images.

## 4. Selection, C01 integration, and honest frontend-only behavior

**Entry from English C01 Home (mandatory):**

- C01 English `Book a Service ›` and shared navbar center `Book` should navigate to C15. Use Expo Router with the actual implemented path; avoid duplicate routes, loops, or pushing multiple copies.
- For C01's 7 supported English service categories, optionally pass a **typed/stable category ID** (NOT translated label) and preselect that service in C15. Unsupported/Assembly Add-on must remain disabled and must NOT navigate into a fake booking.
- **Keep C01 Spanish's current localized C15-upcoming notice as-is until Phase 03.04 Spanish localization.** Do not show an English-only C15 as a completed Spanish screen, and do not interfere with English/Spanish C01/C10 locale switching.
- Android Back should return to C01 without corrupting active locale or wiping unrelated demo profile/photo data. No bottom nav on C15; do not add one to auth routes.

**Inside C15 (frontend selection preview only):**

- Default/Figma selection is `Junk Removal`. Tapping any of the seven cards may update in-memory _preview selection_, card emphasis and bottom primary label (e.g. `Select Moving`) and demo draft summary. Clear state consistency requirements: same category ID across card, CTA and draft.
- Figma row hyperlinks lead directly to specific C18 intake pages; those pages are NOT implemented. Do not attempt navigation into absent routes. Present an accessible and truthful localized English notice if the user tries to continue to an unimplemented service-intake/selected-state screen. Any preview-selection state is **not a real booking**, quote or confirmed request.
- `Select <service>` should display honest C15-S/upcoming step notice, without creating a stored booking. Check Service Area and View restrictions should disclose C16/C16-F pending; no GPS, permission popups, backend eligibility or affirmative "eligible" result. Service not listed -> honest C15-E pending. Use existing in-app notice component; no dead tap targets.
- Keep only fictional fixtures; no network requests, no server-backed sessions, JWTs, payment or inventory.
- Preserve support for future Spanish translations using i18n-friendly keys/typed service metadata; do not implement full Spanish C15 now.

## 5. Automated QA and physical Android QA

From monorepo root, run all with actual logs:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm doctor
```

Add focused Jest tests (including C01→C15 navigation, 7-row list, no Assembly row, selection, CTA notice, no created booking, service area disclosure, C01 Spanish unchanged, back navigation, existing C01/C10 regression). Ensure tests measure behavior—not only text presence.

Physical Realme Android 15 is available in previous phases; use connected hardware if available, otherwise emulator with explicit disclosure. Save genuine screenshots to `docs/qa/c15/`: first load, scrolled service list, service selection, bottom action area, unbuilt-next-step notice, C01→C15 entry, back to Home, C01 Spanish regression, C10 English/Spanish regression. Check 360dp readability, long subtitles, scroll bottom, Android status/safe area, no fixed navbar, no overlap/cutoff and no fake loading.

Report `PHASE_03_03_C15_EN_REPORT.md` must list actual files changed, original asset mapping, exact Figma comparison, screenshots, run commands, test counts, known limitations and working/not-working actions. Use `docs/ANDROID_QA_C15_EN.md` as acceptance list.

## STRICT HARD STOP

Implement **ONLY C15 English Default / Service Discovery**. Do not create C15-S, C15-E, C16, C16-F, C18 (any variant), C01 Spanish changes, C15 Spanish, additional booking steps, Driver App or backend. Do not resume C10-F. No GitHub operations. **Do not start EAS/APK builds unless separately requested.** Stop after Android QA and final report.
