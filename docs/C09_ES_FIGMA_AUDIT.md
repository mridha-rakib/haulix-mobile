# C09 Spanish — Verified Figma Audit

**Authoritative Spanish node:** `347:283`, 430×743 px.
**English reference:** `331:118`, 430×743 px.
**Source:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=347-283
**Page:** `05 — Working Copies · Safe Refinements` / AUTH — ESPAÑOL.

## Verified layout (Figma reference-pixel geometry)

| Element                 |   X |   Y | Width | Height | Notes                                                       |
| ----------------------- | --: | --: | ----: | -----: | ----------------------------------------------------------- |
| Frame                   |   0 |   0 |   430 |    743 | `#080B0B`                                                   |
| Status bar reference    |  22 |  22 |   386 |     38 | Reuse native status handling; illustrative iOS Figma chrome |
| HAULIX Brand            |  22 |  81 |   386 |     89 | `HAUL` near-white, `IX` lime; Spanish tagline               |
| Intro section           |  22 | 191 |   386 |     78 | Title and descriptive copy                                  |
| Arizona indicator       |  22 | 290 |   386 |     38 | One lime dot; no duplicates                                 |
| Verified provider card  |  22 | 349 |   386 |    191 | `#151A19`, 18px radius                                      |
| Status inside card      |  17 |  17 |   349 |     45 | Elevated `#222827`, green indicator                         |
| Profile row inside card |  17 |  73 |   349 |     58 | Name/email on LEFT; lime chevron on RIGHT; **NO avatar**    |
| Card explanatory note   |  17 | 142 |   345 |     32 | Two-line Spanish message                                    |
| CTA group               |  22 | 561 |   386 |    127 | Primary and secondary actions                               |
| Primary container       |   0 |   0 |   386 |     58 | Existing primary component instance 366×54                  |
| Secondary container     |   0 |  69 |   386 |     58 | Existing secondary component instance 366×54                |
| Demo disclaimer         |  22 | 709 |   375 |     12 | Spanish, only development preview                           |

## Exact visible Spanish content

- Tagline: `LO RECOGEMOS TODO.`
- Heading: `Cuenta vinculada.`
- Subtitle: `El proveedor confirmó el acceso a este perfil de demostración.`
- Arizona chip: `PHOENIX, ARIZONA • CLIENTE HAULIX` plus one separately rendered lime dot
- Green provider status: `Acceso con Google correcto`
- **Fictional profile name:** `Bryan Lopez`
- **Fictional profile email:** `bryan.lopez@example.test`
- Guidance: `Tus reservas estarán disponibles después de validar tu identidad.`
- Primary CTA: `Ir a mi cuenta`
- Secondary CTA: `Elegir otro acceso`
- Demo disclaimer: `SOLO DEMOSTRACIÓN · Sin acceso ni mensajes reales`

## Crucial differences between EN and ES fixtures

English C09 Figma uses fictional `Sarah Mitchell / sarah.mitchell@example.test`; Spanish Figma uses fictional `Bryan Lopez / bryan.lopez@example.test`. **These are locale-specific preview fixtures only**, never real user data, not stored as accounts, and not a language transformation of an actual user's identity.

## Asset audit

**No new C09 Spanish custom SVG/PNG**. Use same existing brand typography, status indicator, chevron icon and shared button primitives. Avoid duplicating, redrawing, or adding a circular avatar (`SM`, `BL`, etc.).

The Figma PNG could be inspected visually but could not be saved into this handoff environment because network download of the temporary Figma asset URL failed. Agent must capture the actual original reference when access is available.
