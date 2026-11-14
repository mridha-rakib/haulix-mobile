# C09 English ↔ Spanish UI Mapping (Figma-Verified)

| UI slot                 | C09 English (`331:118`)                                                     | C09 Spanish (`347:283`)                                           |
| ----------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Brand tagline           | WE HAUL IT ALL.                                                             | LO RECOGEMOS TODO.                                                |
| Heading                 | Account connected.                                                          | Cuenta vinculada.                                                 |
| Subtitle                | The provider completed sign-in for this fictional HAULIX demo profile.      | El proveedor confirmó el acceso a este perfil de demostración.    |
| Arizona chip            | PHOENIX, ARIZONA • HAULIX CUSTOMER                                          | PHOENIX, ARIZONA • CLIENTE HAULIX                                 |
| Provider status         | Google sign-in returned successfully                                        | Acceso con Google correcto                                        |
| Fictional preview name  | Sarah Mitchell                                                              | Bryan Lopez                                                       |
| Fictional preview email | sarah.mitchell@example.test                                                 | bryan.lopez@example.test                                          |
| Card guidance           | Your existing customer records are available after secure account matching. | Tus reservas estarán disponibles después de validar tu identidad. |
| Primary CTA             | Go to My Account                                                            | Ir a mi cuenta                                                    |
| Secondary CTA           | Sign in another way                                                         | Elegir otro acceso                                                |
| Demo disclaimer         | DEMO ONLY • No real authentication or messaging                             | SOLO DEMOSTRACIÓN · Sin acceso ni mensajes reales                 |

**No invented translation keys:** Inspect current `packages/i18n` and reuse existing `socialReturn` namespace; use any necessary additional keys following project conventions. Source bilingual content must not be placed as hardcoded UI strings inside `social-return.tsx`.

**Demo fixture safety:** fixture name/email are development-only, locale-specific design reference data. They must never replace actual provider claims, override a verified identity, or persist to device storage. Avoid pretending that switching locale changes a real account's identity. The real OAuth flow is out of scope.
