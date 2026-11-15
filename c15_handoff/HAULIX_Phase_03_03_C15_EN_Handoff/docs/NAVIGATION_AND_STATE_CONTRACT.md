# C15 English — Routing, Preview Selection, and Safety Contract

## Connection to existing completed C01 Home

- C01 EN `Book a Service` and center `Book` action → **C15 service discovery** route. English-only for this phase. Avoid changing the existing shared bottom nav style or adding a nav to C15.
- For the seven enabled C01 EN service cards, pass a _stable enum/category ID_ if routing to C15; C15 can initialize preview-selected item accordingly. Do not pass display copy as a route key.
- C01 `Assembly Add-on`: cannot start booking; remain dimmed, optional, and notice-only.
- C01 Spanish: **do not route to an English C15 pretending it is Spanish**. Preserve the Spanish upcoming notice until Phase 03.04. No C15 Spanish translation/layout in this phase.
- Back: C15 -> previous C01 Home, respecting locale and navigation history.
- No backend login, auth guard, token, booking record, quote or payment success.

## Preview selection model

Minimal illustration (adapt to actual repo conventions):

```ts
export type C15ServiceId =
  | "junk-removal"
  | "moving"
  | "furniture-pickup"
  | "appliance-removal"
  | "mattress-removal"
  | "garage-cleanout"
  | "store-pickup";

// Default Figma fixture is 'junk-removal'.
// Do NOT include assembly-add-on.
// Service preview selection is local/in-memory, NOT a confirmed booking.
```

Selection behavior: row selection must consistently update the preview choice, primary CTA label and illustrative draft line; do not accidentally change a C10 booking fixture or C01 recent-job history. On attempts to advance to C18/C15-S, show a truthful explanation that later screens are not yet implemented. Figma row link destinations are documented in `C15_EN_FIGMA_AUDIT.md`.

## Availability and customer privacy

- `Phoenix, Arizona · Initial service region` is an illustrative Arizona launch reference, **not live GPS**; no geolocation API, reverse geocoding, or permission request.
- Do not claim a service area has been checked. C16 service-area eligibility screen is a future phase.
- The label `SARAH MITCHELL · HX-DEMO-1027` is a fictional Figma fixture. Prefer reading the existing English demo profile name to handle Edit Profile changes; do not present it as verified identity.
- `Draft booking HX-DEMO-1027` is text-only demo context, not persisted booking creation. `No quote or appointment has been confirmed yet.` must remain readable.
- If C15 is reached with English locale, it uses C15 English strings. Never silently switch the app's locale in navigation or hijack the Spanish demo profile.

## Accessibility

Use pressables with semantic labels, adequate hit targets, readable contrast; test long text/360dp layouts. Four bottom CTAs should all give meaningful feedback. Add explicit text labels to disclosure banners. App-level QA navigator should expose C15 English without requiring backend auth.
