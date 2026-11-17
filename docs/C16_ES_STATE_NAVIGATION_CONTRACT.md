# Phase 03.08 — C16 Spanish navigation and state contract

## Entry

- Existing `apps/customer/app/(app)/service-selected.tsx` (C15-S) Spanish primary button `Continuar a zona de servicio` should now `router.push` the **same** `/service-area` route used by English, carrying the current **canonical service ID** (from `c15Services.ts`). Remove only the Spanish C16 coming-soon notice previously shown by this button.
- English C15-S → C16 must remain identical and must not become dependent on language-specific route code.
- C16 direct QA/demo navigator `c16-en` remains; add `c16-es` only if the current navigator convention expects entries. Do not expose developer QA overlay in client preview if already hidden by product settings.

## Read model

- `locale` from `@haulix/i18n` selects `en`/`es` copy; no hardcoded Spanish strings in shared JSX except proper noun values / fixture data.
- Customer context comes from **currently persisted locale-specific local demo profile** (`c10DemoProfile` helpers already used by C15-S). Spanish Bryan Lopez/edited name; English Sarah Mitchell/edited name; must not alias/mutate the same in-memory object.
- Pickup region read-only from existing typed local fixture/address when available. Arizona example is not server confirmed; do not let translated text turn a candidate region into a guarantee.
- Selected service canonical ID and origin route preserved through C15 → C15-S → C16; language switches preserve ID and do not change the selected service.

## Back behavior

- Shared pinned `FlowHeaderBack` stays **outside** `ScrollView` on C16 English/Spanish, with correct 42×42 nominal container / 39×39 circle / 23×23 arrow and >=48dp effective press target; no duplicate back icon or second header.
- Header Back + Android system Back must both navigate C16 → C15-S preserving ID and active locale. Use `router.back()` only if previous stack entry is valid C15-S; otherwise safe replace/fallback with query parameter. Avoid loops or stacks that return directly to Home unexpectedly.
- Back remains visible at top, middle and bottom of long page, with/without a notice banner; no absolute positioning hidden behind native status bar.

## Four action contracts

| Action                               | Future target      | Current behavior                                                                 |
| ------------------------------------ | ------------------ | -------------------------------------------------------------------------------- |
| `Usar esta ubicación`                | C17 (`974:9412`)   | Truthful Spanish dismissible upcoming notice. No saved/confirmed booking.        |
| `Elegir otra ubicación ›`            | C16-V (`974:9154`) | Truthful Spanish upcoming notice. No fake address editor.                        |
| `Ver respuesta fuera de cobertura ›` | C16-F (`974:9207`) | Truthful Spanish upcoming notice. No eligibility error simulation in this phase. |
| `Ayuda con permiso de ubicación ›`   | C16-P (`974:9341`) | Truthful Spanish upcoming notice. Do not trigger native GPS permission.          |

## Invariants

- Single screen route only: `apps/customer/app/(app)/service-area.tsx`.
- No bottom tab bar on C16.
- No backend, no GPS live checks, no true quote, dispatch or payment.
- No auth guards or `__DEV__` screen restrictions for frontend APK testing.
- No new production routes, deps, design variants or fake success.
