# C15-S — Frontend Selection & Navigation Contract

## Inputs / canonical service IDs

Reuse the exact service IDs/definitions from `apps/customer/src/.../c15Services.ts` in the **existing repo**; discover their concrete type/paths, do not create a duplicate catalog. Exactly 7 choices: Junk Removal, Moving, Furniture Pickup, Appliance Removal, Mattress Removal, Garage Cleanout, Store Pickup. **No Assembly Add-on**.

## Routing and truthful state

- Create a single Expo Router screen e.g. `apps/customer/app/(app)/service-selected.tsx` with direct URL preview support and i18n-ready structure; do not create `service-selected-en.tsx` or a Spanish variant.
- Update existing C15 English primary `Select <service>` handler to navigate to C15-S carrying a **validated existing service ID**, e.g. route params. Allow direct QA entry using a clearly labeled default Junk fixture when the service parameter is missing, without creating a server booking. Reject/fallback safely for unknown IDs.
- `Junk Removal` source copy/description and Figma-selected truck SVG are the **exact C15-S visual default**. For other categories derive title/description from the canonical service catalog; never incorrectly show Junk after Moving selection.
- Use existing English demo customer profile display value dynamically (e.g. Sarah Mitchell fixture or edited English profile) and stable `HX-DEMO-1027` label **as an illustrative identifier** only. Do not persist a booking record, quote, assignment, verification or authentication.
- The selected ID must survive C15 → C15-S → **Change service** → C15; preserve or restore selection, including Android back. Avoid hidden, mutable global auth state. Route params or an existing suitable local frontend draft mechanism are acceptable; document the choice.
- On C15-S, tapping the explicit back arrow/system back returns to C15, and **Change service** returns to C15 for reselection. No navigation loops or duplicate stack entries.
- Tapping **Continue to service area** shows a truthful, accessible, dismissible English upcoming-feature notice for **C16**; it must **not** show fake GPS results, successful eligibility, a saved quote or a booked appointment. C16 is not implemented in this phase.
- C15 Spanish `Elegir <servicio>` must **retain its existing upcoming notice** and must NOT navigate to this English-only C15-S. Spanish C01 → C15 Spanish and all previous screens must remain intact.
- Do not add the sculpted bottom navbar to C15-S. Use shared HAULIX W02 Flow Header Back component and native Android status bar handling.

## Figma layout & device constraints

- Figma 430×1015, 22 px horizontal content margin, dark surface colors and lime accents from design tokens (`#BAFF42`, `#F6F8F6`, `#ADB7B1`); use existing Inter font resources.
- Selected tile height 121 px, inner card 340 px wide at Figma size, no layout overlap on narrower physical Android screen. Text must wrap gracefully if the English demo profile name grows.
- Content must scroll with safe-area and footer visibility. No clipping behind native Android three-button navigation or gesture bar; test at Realme 360dp and one alternate viewport if available.

## No-backend invariant

This screen is **local frontend preview**, not a completed booking. Do not persist tokens, server records, SMS verification, prices or payment; do not claim eligibility. No authentication or `__DEV__` guard should prevent accessing demo UI in client APK builds. Do not make changes to production API/server code.
