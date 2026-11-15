# C15-S Spanish — Audited Figma Source

**File:** `Q946h4YBGgyLsjnPtdyQNe`
**Source node:** `974:8965` — `C15-S-ES · Servicio elegido / W02 [LOCALIZACIÓN]`
**URL:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=974-8965
**Date inspected:** 2026-11-15 (read only)
**Frame:** 430 × 1015 px, dark HAULIX background; English counterpart `382:241` same dimensions.

## Source layer geometry (Figma local coordinates)

| Layer                   | Node     |   x |   y |   w |   h | Verified copy or behavior                                                          |
| ----------------------- | -------- | --: | --: | --: | --: | ---------------------------------------------------------------------------------- |
| iOS status illustration | 974:8966 |  22 |  26 | 386 |  38 | On Android use native status bar, do **not** draw imitation 9:41 UI                |
| Flow Header / Back      | 974:8967 |  22 |  81 | 386 |  60 | HAUL IX wordmark, `We Haul It All.`, back chevron                                  |
| Step indicator          | 974:8968 |  22 | 158 | 386 |  33 | `W02 · SERVICIOS Y SOLICITUD / C15-S`                                              |
| Heading                 | 974:8971 |  22 | 208 | 386 |  98 | `Retiro de objetos` + subtitle                                                     |
| Customer context        | 974:8974 |  22 | 323 | 386 |  39 | Static Figma `SARAH MITCHELL · HX-DEMO-1027` — **runtime Spanish profile differs** |
| Selected service card   | 974:8978 |  22 | 379 | 386 | 221 | `Servicio elegido`                                                                 |
| Selected inner tile     | 974:8981 | +16 | +57 | 340 | 121 | `SELECCIONADO`; lime stroke; 31×31 source truck SVG                                |
| How it works card       | 974:8983 |  22 | 617 | 386 | 160 | `Cómo funciona la solicitud` and 3 steps                                           |
| Actions group           | 974:8989 |  22 | 794 | 386 | 123 | Primary and secondary buttons                                                      |
| Footer                  | 974:8994 |  22 | 934 | 386 |  48 | demo disclaimer + SRS                                                              |
| Back hit area           | 974:8997 |  22 |  90 |  42 |  42 | Returns to C15                                                                     |

Primary nested label at `I974:8991;7:51` (52px native CTA within 56px link): **`Continuar a zona de servicio`**. Secondary `974:8993`: **`Cambiar servicio   ›`**. Selected state label `I974:8981;317:83`: **`SELECCIONADO`**.

## Exact Spanish visible text

- Indicator: `W02 · SERVICIOS Y SOLICITUD / C15-S`
- Heading default: `Retiro de objetos`
- Subtitle: `Elegido para HX-DEMO-1027. Confirma el punto de recogida.`
- Selected section: `Servicio elegido`
- Selected label: `SELECCIONADO`
- Tile default title: `Retiro de objetos`
- Draft note: `Borrador ilustrativo · Sin precio calculado`
- Process heading: `Cómo funciona la solicitud`
- Step 1: `1. Confirma una dirección válida en Arizona`
- Step 2: `2. Describe objetos, acceso y sube fotos`
- Step 3: `3. Revisa las sugerencias de IA en W03 antes del precio`
- Primary button: `Continuar a zona de servicio`
- Secondary button: `Cambiar servicio   ›`
- Footer: `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`
- Footer SRS: `SRS BK-01, BK-02, SV-01 · 430 px / desplazamiento vertical` (preserve source typographic separators).

## Two explicitly audited source inconsistencies

1. **Static customer name in Spanish Figma is Sarah Mitchell**, including chip `SARAH MITCHELL · HX-DEMO-1027`. However, the actual Spanish customer demo fixture is **Bryan Lopez**, with edits supported. Runtime MUST bind to the current Spanish customer profile; no cross-locale leak. Do not present the runtime substitution as exact Figma static text.
2. The Spanish selected-tile supporting description `I974:8981;317:85` is left **in English**: `Non-hazardous junk and bulky-item pickup`. For properly localized runtime default use approved Spanish C15 source `974:8869`: **`Retiro y eliminación de residuos no peligrosos`**. For alternate services use corresponding verified Spanish C15 names and descriptions from `974:8843` and the existing canonical service catalog. Mark this replacement as correction of incomplete source localization.

## Fidelity rules

Keep the original **truck** SVG in the Junk Removal selected tile even though C15's category icon is a trash can. For other selected service IDs, use existing C15 category SVGs—runtime variants are not separately approved Figma states. Reuse original C15-S Back Header and SVG; no duplicate navigation bar. Original #BAFF42, dark surface, Inter fonts, selected tile stroke. Maintain 22px horizontal margins at 430px reference. Content may grow on 360dp devices to prevent Spanish descriptions from clipping; do not force a one-line fixed height at the expense of readability.

**Source capture:** screenshot observed directly from Figma during inspection; PNG is _not_ embedded. Agent must capture fresh source screenshot from node `974:8965` for Android comparison; never use Figma screenshot as implementation UI image.
