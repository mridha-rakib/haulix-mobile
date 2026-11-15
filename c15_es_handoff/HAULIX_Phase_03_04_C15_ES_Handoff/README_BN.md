# HAULIX — Phase 03.04 | C15 Service Discovery (Spanish)

**এই handoff শুধু Antigravity Agent-এর implementation instructions।** Source code বা Android APK এখানে নেই।

## কী করতে হবে

1. ZIP extract করো। `docs/ANTIGRAVITY_PROMPT_C15_ES.md` Antigravity Agent-কে দাও।
2. Spanish Figma node `974:8843` (430 × 1791) এবং English node `382:126` খুলে screenshots inspect করো।
3. `apps/customer/app/(app)/service-discovery.tsx`-এই localization করো, কোনো `service-discovery-es.tsx` নয়।
4. C01 Spanish → C15 Spanish navigation খুলে দাও, ES demo profile Bryan Lopez বজায় রাখো।
5. `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm doctor` এবং real-device Android QA চালাও।
6. `PHASE_03_04_C15_ES_REPORT.md` ও screenshots দিয়ে hard stop।

## Figma

- Spanish: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=974-8843
- English: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=382-126

**Source conflict (must document):** Spanish Figma C15 still displays “Sarah Mitchell” in static preview, but existing app's Spanish locale uses Bryan Lopez. Use the current locale-scoped demo profile, never overwrite with literal Sarah Mitchell. C15 Spanish still uses English “We Haul It All.” in its header per Figma; do not silently claim it was Spanish in Figma.

**Assets:** Reuse the original 10 C15 SVGs already installed by Phase 03.03 in `apps/customer/assets/c15/original-svg/` / `C15Icons.tsx`; no new PNGs or icons required.

No Figma reference PNG is embedded: screenshot acquisition for this handoff could not be persisted in the local container. Agent must capture authoritative Figma reference itself.
