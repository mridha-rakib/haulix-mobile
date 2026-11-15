# HAULIX — Phase 03.05: C15-S Service Selected (English)

এই ZIP **Antigravity coding agent handoff**—এটি app-এর source code বা প্রস্তুত APK নয়। ZIP extract করে `docs/ANTIGRAVITY_PROMPT_C15S_EN.md` অনুসরণ করো।

- Main Figma screen: `382:241` — C15-S · Junk Removal selected / W02 (430 × 1015)
- Existing English C15 source: `382:126`
- Spanish C15 reference: `974:8843` (regression only; **Spanish C15-S এই phase-এ নয়**)
- Working repository: `haulix-mobile`, app: `apps/customer`
- App architecture: Expo Router, Expo SDK 58, React Native, NativeWind, strict TypeScript, `@haulix/i18n`, `packages/ui`
- Newly exported original SVG assets: `assets/original-svg/` (two files); recheck existing `C15Icons.tsx` before adding duplicate wrappers
- No direct Figma reference PNG in this ZIP; agent must obtain reference from Figma node `382:241` and capture actual Android screenshots

## Implementation boundaries

**One screen only:** C15-S English. Create/reuse one selected-service route; connect existing C15 English primary CTA. English/Spanish C15, C01 and C06–C10 behavior must not regress. Do not create C16, C18 or Spanish C15-S; no backend, GPS, payment, real booking, or release APK build. Account & Profile Phase 02.15 remains paused.

## Package documents

1. `docs/ANTIGRAVITY_PROMPT_C15S_EN.md` — full agent instructions
2. `docs/C15S_EN_FIGMA_AUDIT.md` — actual dimensions, contents, actions, provenance
3. `docs/SELECTION_AND_NAVIGATION_CONTRACT.md` — service state and safety rules
4. `docs/ANDROID_QA_C15S_EN.md` — exact on-device acceptance tests
5. `docs/C15S_EN_SCREEN_TEXT.csv` — Figma copy
6. `docs/C15S_EN_TEST_MATRIX.csv` — scenario matrix
7. `ASSET_MANIFEST.csv` — SVG mapping and hashes
