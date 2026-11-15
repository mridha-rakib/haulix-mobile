# Phase 03.06 — C15-S Spanish Selection & Navigation Contract

## Route and locale

- Reuse **one route only**: `apps/customer/app/(app)/service-selected.tsx` — already implemented for English in Phase 03.05. Do not create `service-selected-es.tsx` or a duplicate component.
- Use the existing `@haulix/i18n` locale context; preserve current English behavior with **Sarah Mitchell** and Spanish behavior with **Bryan Lopez** or edited profile values. Use current persisted Spanish customer profile (fixture only if profile not edited), never store a shared fake auth user.
- Reuse existing `apps/customer/src/.../c15Services.ts` canonical 7 service IDs/metadata; inspect actual file path and existing selection-handling API. Avoid a second service catalog or duplicate ID mapping.

## C15 → C15-S Spanish

- Update `apps/customer/app/(app)/service-discovery.tsx`: when Spanish C15 user taps `Elegir <servicio>`, route to **same `service-selected.tsx`** carrying validated existing selected ID (e.g. `service=<id>`). Previously Spanish showed an upcoming C15-S notice; replace that _one outdated notice_ with real C15-S navigation.
- Maintain current Spanish C01 → C15 preselect via Home service tile. C01 Spanish Book CTA / center Book stays connected to C15 Spanish, and C15 English → C15-S English must continue working.
- A direct C15-S QA navigator entry in Spanish should render a clearly marked Junk Removal **local preview default**; an unknown ID must fail gracefully/fallback with no runtime error. Never claim the fallback is a booked service.

## Selected data

- Default visual target: selected **Retiro de objetos**, **SELECCIONADO**, 31×31 selected-truck icon. Title/selected details must update for all 7 categories, including `Mudanzas`, `Retiro de electrodomésticos`, `Recogida en tienda`. For non-Junk category icon, reuse the appropriate existing C15 SVG.
- Use the approved Spanish category descriptions from C15-ES `974:8843`, not the leftover English default description in Spanish C15-S Figma. Allow wrapping/height growth on narrow screens. Keep original selected tile lime border and structure.
- Keep `HX-DEMO-1027` **illustrative only**. Do NOT persist a real booking, quote, selected service to backend, customer address eligibility, price, assignment or payments.
- Default Spanish demo name Bryan Lopez; edited Spanish profile name must render instead, including uppercasing customer chip safely. English profile name remains its own state.

## Actions

- `Cambiar servicio ›` and visual/native Back navigate to **C15 Spanish** and preserve previously selected service in the discovery list + primary CTA, without duplicate navigation loops. Validate whether `router.back()` or `router.replace()` is appropriate for the app's actual history including direct QA entry; provide safe fallback.
- `Continuar a zona de servicio` should display an honest **localized, accessible, dismissible notice** that C16 is not yet implemented. No fabricated GPS coverage/eligibility, booking confirmation, price or calls to nonexistent endpoints.
- Keep no bottom navbar on C15-S, no fake iOS status bar; use real Android StatusBar, existing shared W02 Flow Header Back and safe-area.
- C15-S should have valid routes accessible in frontend QA APK without `__DEV__` guards or fake authentication. No privileged backend access.

## Regression and state isolation

- English C15-S UI and notice stay English, with independent Sarah Mitchell demo profile.
- Spanish C15-S UI displays Bryan Lopez/current Spanish profile. Changing locale while on screen must update copy without rewriting profile data or selected service identity.
- Do not reimplement C16, C15-E, C18 or Account C10-F. Do not add independent Spanish service route, hardcode Junk for every service, or modify Driver app.
