# C10-ES · Original Figma Read-Only Audit

**File**: `Q946h4YBGgyLsjnPtdyQNe` — `HAULIX-UI-UX-Concept`  
**Page**: `293:9`, 05 — Working Copies · Safe Refinements  
**Primary**: `347:315` — `C10-ES · Mi Cuenta / Spanish [CU-01, CU-02, CU-03, CU-04, CU-07, NT-06]`  
**English counterpart**: `333:26` — 430×1580  
**Spanish reference**: 430×1564, dark #080B0B, HAULIX lime #BAFF42.

Source: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=347-315

## Exact top-level visible geometry

| Figma node  | Element                                 |   x |    y |   w |   h |
| ----------- | --------------------------------------- | --: | ---: | --: | --: |
| `435:1756`  | Status bar / visual reference           |  22 |   22 | 386 |  38 |
| `347:319`   | Brand header with back and notification |  22 |   79 | 386 |  61 |
| `347:325`   | Intro (one-line Spanish description)    |  22 |  159 | 386 |  62 |
| `347:328`   | Customer-status chip                    |  22 |  240 | 386 |  43 |
| `347:332`   | Verified Customer card                  |  22 |  302 | 386 | 340 |
| `347:355`   | Account & Preferences card              |  22 |  661 | 386 | 353 |
| `347:385`   | `↗ Cerrar sesión`                       |  22 | 1033 | 379 |  15 |
| `348:133`   | Spanish→English switch                  |  22 | 1067 | 378 |  15 |
| `937:8494`  | Security and Photo shortcuts            |  22 | 1101 | 386 | 140 |
| `347:386`   | Primary CTA                             |  22 | 1260 | 386 |  58 |
| `347:388`   | Secondary CTA                           |  22 | 1337 | 386 |  58 |
| `965:10500` | C01 sculpted shared navbar              |   0 | 1414 | 430 | 128 |

The wordmark is `HAUL` white + `IX` lime, as reused in English. Primary and secondary buttons contain shared component instances (`347:387`, `347:389`) each **364×54** inside 386×58 CTA frame. Spanish primary = `Editar perfil`; secondary = `Direcciones guardadas`.

## Verified visual specifics

- Intro `Mi cuenta`; description is single-line `Administra tu perfil y tus preferencias de servicio.` versus English two-line intro; subsequent Spanish positions differ by 16px.
- Customer status `BRYAN LOPEZ  ·  CUENTA DE CLIENTE` and customer profile `Bryan Lopez` / `bryan.lopez@example.test` are **fictional Figma demo data**; don't confuse with English `Sarah Mitchell` fixture.
- Avatar from node `941:8503` is **72×72** inside profile card, circular lime-ring 62×62 photo/initials `BL`, overlay camera badge 21×21. The avatar **does exist in C10** (unlike C09).
- Verified card is **386×340**, title, Customer, Email, Phone Verified, verification status banner; unchanged visual geometry from C10 EN except y-offset.
- Preferences card is **386×353** with saved pickup address, locale, test payment reference, demo active booking.
- Security & photo area **386×140**, two shortcuts 357×40, heading `SEGURIDAD Y FOTO DE PERFIL`.
- Spanish navbar **`965:10500`**, `Active=Account`, `Locale=ES`; curved background **430×128**, home icon x=35 y=38 size=26, center Book lime circle x≈192 y=11 size=47, labels y=72; `Mis trabajos` label width 83px starting x=90 (longer than English). Active Cuenta icon remains lime.
- Body is vertically scrollable; visual reference iOS status bar/home indicator **must not** be blindly hard-coded as Android system UI. Preserve existing Android inset fix.
- Hidden demo branches such as restricted account and footer sample-ID footnote are **not** visible and must not be implemented as visible text.

## Photo management: source vs added functionality

The `Foto · Añadir / cambiar / eliminar` shortcut exists on `347:315`, but Figma contains **no dedicated profile-photo action sheet screen** for C10. Photo sheet, image picker, preview, cancel/confirm/remove and persistence were added during Phase 02.9.1 as frontend-only implementation. Spanish sheet translations in the separate CSV are proposed UI copy, not exact Figma content.

## Asset decision

Spanish C10 is a **locale variant of existing English C10**, not an independent illustration/icon set. Reuse original English C10 source vectors (19 reference SVGs supplied for traceability), the existing `C10Icons.tsx` paths, and the same original C01 sculpted bottom-navbar. No extra raster icons or icon libraries required. Only text, profile-demo presentation, layout wrap, and localized photo sheet UI should change.

**Limitation**: no on-disk full-screen Figma screenshot included in this handoff. Capture `347:315` from Figma in the agent environment and attach it to the QA report, then compare actual Android screenshots.
