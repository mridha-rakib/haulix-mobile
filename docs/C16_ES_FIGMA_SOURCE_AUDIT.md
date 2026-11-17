# C16 Spanish — Figma provenance & source-priority audit

## Verified Figma sources (read-only inspection, 15 November 2026)

- **Spanish exact screen:** `974:9079` — `C16-ES · Validar cobertura de Arizona / W02 [LOCALIZACIÓN]` — **430×1314 px**. URL: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=974-9079
- **English counterpart:** `382:323` — C16 — **430×1314 px**. URL: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=382-323
- **Owner-approved visual direction:** `references/OWNER_C16_PREMIUM_TARGET.png`, copied from previously delivered approved screenshot. This image is _not_ a screenshot of Spanish Figma; it is the premium styling reference.
- **Accepted Phase 03.07 implementation:** Icon-rich English C16 in `service-area.tsx` and shared `FlowHeaderBack.tsx`; authoritatively reported implemented by Antigravity, **not independently verified here**.

## Priority order on disagreement

1. Owner premium reference + accepted English C16 implementation for **icons, rich cards, contrast, header positioning and visual quality**.
2. Spanish Figma `974:9079` for **Spanish wording, screen semantics, step ID, four actions**.
3. Existing app state/fixtures for **current profile name, selected service ID, actual local demo address**.
4. SRS and app invariants for **Arizona-only initial launch, no true booking, no fake verification**.

## Exact Spanish frame landmarks at 430px width

| Group            | Figma x | Figma y |   W |   H | Node       |
| ---------------- | ------: | ------: | --: | --: | ---------- |
| Flow Header      |      22 |      81 | 386 |  60 | `974:9081` |
| Back hit region  |      22 |      90 |  42 |  42 | `974:9132` |
| Step indicator   |      22 |     158 | 386 |  33 | `974:9082` |
| Main heading     |      22 |     208 | 386 |  98 | `974:9085` |
| Customer chip    |      22 |     323 | 386 |  39 | `974:9088` |
| Pickup section   |      22 |     379 | 386 | 369 | `974:9092` |
| Demo eligibility |      22 |     765 | 386 | 177 | `974:9111` |
| Four actions     |      22 |     959 | 386 | 257 | `974:9120` |
| Demo footer      |      22 |    1233 | 386 |  48 | `974:9129` |

These positions are **Figma layout landmarks**, not absolute Android dp targets; approved English premium component adds icons and may alter vertical rhythm. Preserve component reuse and responsive layouts rather than copying absolute coordinates.

## Discrepancies to resolve explicitly

- Spanish Figma `974:9091` still shows static **SARAH MITCHELL** — app MUST use current Spanish demo profile **Bryan Lopez / saved Spanish edits**, never leak English Sarah into ES.
- Spanish Figma contains **plain iconless rows and buttons**. These are NOT accepted for implementation after the owner-approved Phase 03.07 icon-rich correction. Keep the existing ten `C16Icons` visuals, all corresponding per-row/CTA icons and deep card treatments.
- Owner premium screenshot shows an **erroneous `C10`** indicator, not `C16`; always render `W02 · SERVICIOS Y SOLICITUD / C16`.
- Figma's illustrated iOS status bar is part of the design mock; use Android native status/safe areas, not a duplicated fake bar.
- Spanish source says `Solicitud en Arizona · Apta en demo`; this is **illustrative**, not real location eligibility.
- Figma CTA to C17 (`974:9412`) and C16-V/F/P (`974:9154`, `974:9207`, `974:9341`) are future destinations; **do not implement them**.
- Core app header should remain pinned and not disappear during scrolling; use the accepted shared `FlowHeaderBack` behavior.
