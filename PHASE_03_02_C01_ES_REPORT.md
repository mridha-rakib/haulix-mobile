# HAULIX Customer App — Phase 03.02 Implementation & QA Report

## C01 Home & Services — Spanish Localization ONLY

**Project:** HAULIX Customer Mobile App (`haulix-mobile`)  
**Phase:** 03.02 — C01 Home & Services (Spanish Localization ONLY)  
**Authoritative Figma Layout:** Node `439:3498` (`C01-W · Customer Home / Navigation Working Copy [CU-09, BK-01, SV-04]`, 430 × 1205 px)  
**Spanish Service Terminology Source:** Figma Node `974:8843` (C15-ES Seleccionar servicio)  
**Spanish Navbar Terminology Source:** Figma Node `347:315` (C10-ES Mi Cuenta)  
**Translation Mapping:** `docs/C01_ES_TRANSLATIONS.csv`  
**Device Used for Physical Android QA:** Physical Realme Note 60 (`RMX3930` / ADB `0B04731X200003BB`), Android 15  
**Verification Date:** November 14, 2026

---

## 1. Executive Summary

Phase 03.02 delivers the complete and truthful Spanish localization for the **C01 Home & Services** screen of the HAULIX Customer Mobile App. The implementation reuses the existing `apps/customer/app/(app)/index.tsx` route without forking or duplicating routes. Dynamic locale switching is handled via `@haulix/i18n`, preserving full layout geometry, genuine Figma truck and recent job photo assets, the 12 original SVG vectors, and honest frontend demo disclosures.

All eight service categories have been localized using Figma-backed terms (`974:8843`), with _Montaje adicional_ maintained as an optional disabled add-on (~58% opacity). Diacritic-insensitive Spanish search matching is enabled, allowing queries like `"electrodomesticos"` to seamlessly match `"Retiro de electrodomésticos"`. Two-way navigation between Spanish C01 (`Inicio`) and Spanish C10 (`Cuenta` / Bryan Lopez) was verified on physical hardware.

---

## 2. Truthful Provenance & Figma Source Attribution

As noted in the Figma audit, **no standalone approved C01 Spanish full-screen Figma frame exists** in the customer library. Provenance is strictly disclosed as follows:

| Component / Copy                | Sourced Text                                                                                | Provenance Classification | Source Authority                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------- |
| **Brand Tagline**               | `"Lo recogemos todo."`                                                                      | **Proposed**              | Fits headline rhythm; no C01 Spanish frame in Figma   |
| **Location Selector**           | `"Phoenix, Arizona"`                                                                        | **Verified / Proper**     | Proper noun unchanged; verified in `974:8843`         |
| **Hero Title 1**                | `"Lo retiramos."`                                                                           | **Proposed**              | Localized hero arranging 2-line punchy headline       |
| **Hero Title 2**                | `"Así de fácil."`                                                                           | **Proposed**              | Localized hero Arranging 2-line punchy headline       |
| **Hero Subtitle**               | `"Retiro de objetos, mudanzas y más servicios, al alcance de tu mano."`                     | **Proposed**              | Concise Spanish explanatory copy                      |
| **Search Placeholder**          | `"¿En qué podemos ayudarte?"`                                                               | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Search Empty State**          | `"No encontramos servicios para tu búsqueda."`                                              | **Proposed**              | Localized frontend empty state                        |
| **Search Clear Control**        | `"Borrar búsqueda"`                                                                         | **Proposed**              | Accessible action label                               |
| **Category: Junk Removal**      | `"Retiro de objetos"`                                                                       | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Category: Moving**            | `"Mudanzas"`                                                                                | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Category: Furniture Pickup**  | `"Retiro de muebles"`                                                                       | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Category: Appliance Removal** | `"Retiro de electrodomésticos"`                                                             | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Category: Mattress Removal**  | `"Retiro de colchones"`                                                                     | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Category: Garage Cleanout**   | `"Limpieza de garaje"`                                                                      | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Category: Store Pickup**      | `"Recogida en tienda"`                                                                      | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Category: Assembly Add-on**   | `"Montaje adicional"`                                                                       | **Proposed**              | Optional paid add-on (~58% opacity); not standalone   |
| **Book CTA**                    | `"Reservar un servicio ›"`                                                                  | **Proposed**              | Matches verified navbar label `Reservar` (`347:315`)  |
| **Recent Jobs Heading**         | `"Trabajos recientes"`                                                                      | **Proposed**              | Consistent with W07-ES / C10-ES terminology           |
| **See All CTA**                 | `"Ver todo ›"`                                                                              | **Proposed**              | Contextual action label                               |
| **Recent Job Title**            | `"Retiro de objetos"`                                                                       | **Verified**              | Sourced directly from Figma `974:8843`                |
| **Job Status Badge**            | `"✓ Completado"`                                                                            | **Proposed**              | Localized status for demo job                         |
| **Recent Job Date**             | `"12 abr. 2024"`                                                                            | **Proposed**              | Localized format of exact Figma fixture date (`3620`) |
| **Saved Addresses Heading**     | `"Direcciones guardadas"`                                                                   | **Verified**              | Sourced directly from Figma `347:315`                 |
| **Saved Address Type**          | `"Casa"`                                                                                    | **Proposed**              | Address type distinct from navbar `Inicio`            |
| **Navbar: Home**                | `"Inicio"`                                                                                  | **Verified**              | Sourced directly from Figma `347:315`                 |
| **Navbar: My Jobs**             | `"Mis trabajos"`                                                                            | **Verified**              | Sourced directly from Figma `347:315`                 |
| **Navbar: Book**                | `"Reservar"`                                                                                | **Verified**              | Sourced directly from Figma `347:315`                 |
| **Navbar: Deals**               | `"Ofertas"`                                                                                 | **Verified**              | Sourced directly from Figma `347:315`                 |
| **Navbar: Account**             | `"Cuenta"`                                                                                  | **Verified**              | Sourced directly from Figma `347:315`                 |
| **Notice: Booking (C15)**       | `"La selección de servicios y las reservas (C15) estarán disponibles en una próxima fase."` | **Proposed**              | Truthful unbuilt screen disclosure                    |
| **Notice: My Jobs (W07)**       | `"Mis trabajos (W07) estarán disponibles en una próxima fase."`                             | **Proposed**              | Truthful unbuilt screen disclosure                    |
| **Notice: Addresses (C11)**     | `"Direcciones guardadas (C11) estarán disponibles en una próxima fase."`                    | **Proposed**              | Truthful unbuilt screen disclosure                    |
| **Notice: Notifications (C13)** | `"Las notificaciones (C13) estarán disponibles en una próxima fase."`                       | **Proposed**              | Truthful unbuilt screen disclosure                    |
| **Notice: Assembly Add-on**     | `"El montaje es un complemento opcional de pago y no se puede reservar por separado."`      | **Proposed**              | Honest disclosure of disabled paid add-on             |
| **Notice: Location Area**       | `"Esta demostración muestra únicamente la zona de servicio de Phoenix, Arizona."`           | **Proposed**              | Truthful frontend service area disclosure             |

---

## 3. UI Component Architecture & Search Implementation

### 3.1 Single-Route Localization Invariant

- **Shared Route:** `apps/customer/app/(app)/index.tsx`. No route forks (`home-es.tsx`, `index-es.tsx`) were created.
- Switching between English and Spanish updates all screen copy dynamically via `@haulix/i18n` with zero layout jumps, flickering, or bundle reloads.

### 3.2 Accent-Insensitive Search Matching

Spanish keywords often contain accented vowels (`é`, `á`, etc.). The matching logic was implemented using Unicode NFD normalization:

```typescript
const normalizeSearch = (str: string) =>
	str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
```

- Typing `"electrodomesticos"` (unaccented) correctly matches `"Retiro de electrodomésticos"`.
- Typing `"muebles"` correctly matches `"Retiro de muebles"`.
- Typing `"xyz"` renders the localized empty state: `"No encontramos servicios para tu búsqueda."` with a `"Borrar búsqueda"` button that restores all 8 service cards.

### 3.3 Genuine Assets Preserved

1. `c01_hero_truck_original.png` (77,308 bytes, SHA-256: `5F279935AA7D01FED9A74F5DDE0604FAC4B75498FDDE9C89DE8DF8683F40A68A`)
2. `c01_recent_job_original.png` (2,517 bytes, SHA-256: `85B6F5646D5929B12E70F5D223C2C3FEF1C01DA77CAFE79336B1CEAF91585887`)
3. 12 original SVG vectors wrapped in `C01Icons.tsx`.

---

## 4. Automated Quality Gates

All automated verification gates passed with zero errors:

| Quality Gate                 | Tooling / Command | Result     | Details                                                                                                                            |
| ---------------------------- | ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Biome Linter & Formatter** | `pnpm check`      | **PASSED** | 185 files checked, 0 errors, 0 warnings.                                                                                           |
| **TypeScript Typecheck**     | `pnpm typecheck`  | **PASSED** | 7/7 workspaces clean (zero TypeScript errors).                                                                                     |
| **Unit & Integration Tests** | `pnpm test`       | **PASSED** | 10/10 test suites passed in `@haulix/customer` (114/114 tests), 19/19 tests passed in `@haulix/i18n`. All workspace tests passing. |
| **Monorepo Health**          | `pnpm doctor`     | **PASSED** | Node.js 26.0.0, pnpm 11.25.0, registry connected, hardlinks verified.                                                              |

---

## 5. Physical Android QA Execution (Realme Note 60)

Hardware verification was performed on an active **Realme Note 60 (`RMX3930`)** running Android 15 via ADB (`0B04731X200003BB`).  
_(Visual match was agent-checked against English Figma layout geometry `439:3498` and verified Spanish source terminology `974:8843` / `347:315`; testing was conducted via Expo on connected physical hardware)._

All screenshots are stored in `docs/qa/c01/`:

| #   | Screenshot Filename                     | File Size | Verification Description                                                                                                                                                                                        |
| --- | --------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `android-C01-es-top.png`                | 354.2 KB  | Brand tagline `"Lo recogemos todo."`, location selector `"Phoenix, Arizona"`, Spanish hero `"Lo retiramos. Así de fácil."`, and search bar `"¿En qué podemos ayudarte?"`.                                       |
| 2   | `android-C01-es-services.png`           | 354.2 KB  | All 8 Spanish category cards in 4-column layout including dimmed _Montaje adicional_ at ~58% opacity.                                                                                                           |
| 3   | `android-C01-es-bottom.png`             | 232.1 KB  | Scrolled bottom showing `"Reservar un servicio ›"`, Recent Jobs (`"Trabajos recientes"`, `"Retiro de objetos"`, `"✓ Completado"`, `"12 abr. 2024"`), and Saved Addresses (`"Direcciones guardadas"`, `"Casa"`). |
| 4   | `android-C01-es-navbar.png`             | 202.9 KB  | Sculpted curved bottom navbar with active **Inicio** tab (`#BAFF42`), **Mis trabajos**, **Reservar**, **Ofertas**, **Cuenta**, and Android navigation safe-area inset.                                          |
| 5   | `android-C01-es-search.png`             | 332.9 KB  | Diacritic-insensitive search typing unaccented `"electrodomesticos"` correctly filtering and displaying `"Retiro de electrodomésticos"` with clear button (`✕`).                                                |
| 6   | `android-C01-es-search-empty.png`       | 345.4 KB  | Search empty state displaying `"No encontramos servicios para tu búsqueda."` with `"Borrar búsqueda"` recovery button.                                                                                          |
| 7   | `android-C01-es-book-notice.png`        | 354.8 KB  | Honest frontend disclosure banner upon tapping Book CTA: _“La selección de servicios y las reservas (C15) estarán disponibles en una próxima fase.”_                                                            |
| 8   | `android-C01-es-account-navigation.png` | 159.9 KB  | Tapping **Cuenta** tab lands on Spanish C10 **Mi cuenta**, retaining Spanish locale and isolated demo profile **Bryan Lopez**.                                                                                  |
| 9   | `android-C01-en-regression.png`         | 349.6 KB  | English C01 regression verification: switching back to English preserves Sarah Mitchell's profile and original English copy with zero broken assets.                                                            |

---

## 6. Scope Boundary Enforcement

- **Phase 03.02 is 100% complete.**
- No unauthorized features (C15, W07, C11, C13, C10-F) were introduced; all non-implemented actions use truthful upcoming-phase notice banners.
- No Driver App files were modified.
- No backend code, database connections, or auth guards were added.
- No standalone release APK was built or git push executed per strict project policy.
