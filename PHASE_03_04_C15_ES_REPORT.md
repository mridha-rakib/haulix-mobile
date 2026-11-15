# HAULIX Customer App — Phase 03.04: C15 Service Discovery (Spanish Localization ONLY) Report

## 1. Executive Summary

Phase 03.04 delivers the official Spanish localization of the **C15 Service Discovery** intake screen (`apps/customer/app/(app)/service-discovery.tsx`) in strict accordance with authoritative Figma Node `974:8843` (`C15-ES · Seleccionar servicio / W02 [LOCALIZACIÓN]`, 430 × 1791 px), the companion English reference Node `382:126`, Flow Header Start Node `436:1957`, and `C15_ES_TRANSLATIONS.csv`.

The single canonical route `service-discovery.tsx` now natively adapts between English and Spanish, rendering the complete Spanish service suite, dynamic Spanish customer profile data (**Bryan Lopez** with local edit persistence), Arizona/Phoenix service-area card, four action CTAs, and truthful disclaimers without regressions to English C15 or C01 Home.

Physical Android QA has been thoroughly executed and verified on a physical **Realme Note 60 (RMX3930, Android 15)** via ADB, capturing 10 visual proof screenshots in `docs/qa/c15/`. All automated quality gates (`check`, `typecheck`, `test`, `doctor`) pass with 0 errors.

---

## 2. Authoritative Figma References & Translation Mapping

| Item                       | English Reference                                            | Spanish Authoritative Reference                              | Implementation Notes                                                                                                                   |
| :------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Canvas & Layout**        | Node `382:126` (430 × 1791 px)                               | Node `974:8843` (430 × 1791 px)                              | 1:1 vertical scroll intake layout, 22px horizontal padding, `#0D1311` dark surface tokens                                              |
| **Flow Header**            | Node `436:1957`                                              | Node `436:1957`                                              | Shared `FlowHeaderStart` displaying brand tagline `We Haul It All.` (retained untranslated per brand design guidelines). No bell icon. |
| **W02 Indicator**          | `W02 · SERVICE DISCOVERY & INTAKE / C15`                     | `W02 · SERVICIOS Y SOLICITUD / C15`                          | Node `974:8847`, uppercase tracking and pill badge styling                                                                             |
| **Screen Heading**         | `What can we help with?`                                     | `¿En qué podemos ayudarte?`                                  | Node `974:8850`, Inter Bold, leading inverted interrogation mark                                                                       |
| **Screen Subtitle**        | `Choose the approved service that matches your task.`        | `Elige el servicio autorizado que necesitas.`                | Node `974:8852`, Inter Regular, secondary text `#8E9B95`                                                                               |
| **Context Chip**           | `SARAH MITCHELL · HX-DEMO-1027`                              | `BRYAN LOPEZ · HX-DEMO-1027`                                 | Dynamic customer profile: Sarah Mitchell for EN, Bryan Lopez (or saved edits) for ES                                                   |
| **Service Area Card**      | `Service area` / `Phoenix, Arizona · Initial service region` | `Zona de servicio` / `Phoenix, Arizona · Zona inicial`       | Node `974:8858`, `#151A19` surface, `#222B27` border, location pin SVG                                                                 |
| **Services Section Title** | `Available services`                                         | `Servicios disponibles`                                      | Node `974:8863`                                                                                                                        |
| **Customer Summary**       | `For Sarah Mitchell`                                         | `Para Bryan Lopez` (or dynamic saved name)                   | Node `974:8927`, `Para <nombre>`                                                                                                       |
| **Draft Booking Line**     | `Draft booking HX-DEMO-1027 · <service>`                     | `Solicitud HX-DEMO-1027 · <servicio>`                        | Node `974:8932`, dynamic service title                                                                                                 |
| **Primary CTA**            | `Select <Service>`                                           | `Elegir <servicio>`                                          | Node `974:8936` (explicitly uses lowercase service name in Spanish, e.g. `Elegir mudanzas`)                                            |
| **Secondary CTA 1**        | `Check Service Area ›`                                       | `Verificar zona de servicio ›`                               | Node `974:8938`                                                                                                                        |
| **Secondary CTA 2**        | `View location restrictions ›`                               | `Ver restricciones de ubicación ›`                           | Node `974:8940`                                                                                                                        |
| **Alternative CTA**        | `Service not listed? Check options ›`                        | `¿No ves tu servicio? Ver opciones ›`                        | Node `974:8942`, inverted question mark, `#BAFF42` accent button                                                                       |
| **Demo Disclaimer 1**      | `DEMO ONLY · No confirmed booking, rates or payment`         | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado`         | Node `974:8944`                                                                                                                        |
| **Demo Disclaimer 2**      | `SRS BK-01, SV-01, AI-12 · 430 px / vertical scroll`         | `SRS BK-01, SV-01, AI-12 · 430 px / desplazamiento vertical` | Node `974:8946`                                                                                                                        |

---

## 3. Approved Service Catalog (7 Localized Categories)

Assembly Add-on is strictly omitted from C15 (approved as non-standalone add-on per Phase 03.03/03.04 specifications). The 7 approved categories and their localized copy:

|  #  | Service ID          | Spanish Title (`es.c15`)    | Spanish Subtitle (`es.c15`)                    | SVG Asset Used                                   |
| :-: | :------------------ | :-------------------------- | :--------------------------------------------- | :----------------------------------------------- |
|  1  | `junk-removal`      | Retiro de objetos           | Retiro y eliminación de residuos no peligrosos | Original Figma Bin SVG (`c15-bin.svg`)           |
|  2  | `moving`            | Mudanzas                    | Transporte del origen al destino               | Original Figma Truck SVG (`c15-truck.svg`)       |
|  3  | `furniture-pickup`  | Retiro de muebles           | Sofás, mesas y otros muebles                   | Original Figma Sofa SVG (`c15-sofa.svg`)         |
|  4  | `appliance-removal` | Retiro de electrodomésticos | Retiro autorizado de electrodomésticos         | Original Figma Box/Appliance SVG (`c15-box.svg`) |
|  5  | `mattress-removal`  | Retiro de colchones         | Revisión de manejo y eliminación de colchones  | Original Figma Mattress SVG (`c15-mattress.svg`) |
|  6  | `garage-cleanout`   | Limpieza de garaje          | Fotos, acceso y revisión de contaminación      | Original Figma Garage SVG (`c15-garage.svg`)     |
|  7  | `store-pickup`      | Recogida en tienda          | Recogida y entrega de pedidos                  | Original Figma Cart SVG (`c15-cart.svg`)         |

---

## 4. Modified & Created Files

### Code & Components

- **`packages/i18n/src/locales/es.ts`**: Implemented `c15` localization namespace with exact strings matching Node `974:8843` and `C15_ES_TRANSLATIONS.csv`.
- **`packages/i18n/src/i18n.test.ts`**: Added automated tests verifying `en.c15` and `es.c15` key symmetry and asserting exact Spanish strings.
- **`apps/customer/app/(app)/service-discovery.tsx`**:
  - Dynamically binds customer profile to `getC10DemoProfile(currentLocale)` with `loadProfileEdits(currentLocale)` and reactive subscription (`Bryan Lopez` for ES, `Sarah Mitchell` for EN).
  - Implements Spanish lowercase service convention for primary CTA: `Elegir <servicio>`.
  - Extracted `ServiceAreaSection` and `CustomerDraftSummarySection` subcomponents to keep Biome cognitive complexity strictly below threshold.
- **`apps/customer/app/(app)/index.tsx`**: Updated Spanish C01 Home to route both the `Reservar un servicio ›` CTA and all 7 enabled category tiles directly to `/service-discovery?service=<id>`, preserving locale.
- **`apps/customer/src/components/navigation/CustomerBottomNav.tsx`**: Connected center `Reservar` tab to `/service-discovery`.
- **`apps/customer/src/components/demo/DemoScreenNavigator.tsx`**: Added `c15-es` (`C15 · Seleccionar Servicio (Español)`) targeting `/service-discovery` with `locale: "es"`.

### Tests

- **`apps/customer/src/__tests__/service-discovery.test.tsx`**: Added bilingual integration tests for C15 Spanish headers, Bryan Lopez vs Sarah Mitchell profile isolation, service row selection, honest upcoming feature banners, and demo navigation.

---

## 5. Physical Android Device QA Verification

- **Device:** Realme Note 60 (`RMX3930`)
- **ADB Device ID:** `0B04731X200003BB`
- **Android Version:** 15 (API 35)
- **Display Resolution:** 720 × 1600 px (360dp baseline density)
- **Metro Bundler:** Task `task-3683`, port `8081` via reverse port forwarding

### Proof Screenshots Captured in `docs/qa/c15/`

|  #  | Filename                                   |  Size  | Verification Description                                                                                                                       |
| :-: | :----------------------------------------- | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | `figma-C15-es-reference.png`               | 169 KB | Authoritative Figma reference for Node `974:8843` (430 × 1791 px)                                                                              |
|  2  | `android-C01-es-to-C15.png`                | 355 KB | Spanish C01 Home showing `Reservar un servicio ›` CTA and center `Reservar` navbar tab                                                         |
|  3  | `android-C15-es-top.png`                   | 159 KB | Flow Header (`We Haul It All.`), W02 chip, Spanish heading, Bryan Lopez demo chip, service area card                                           |
|  4  | `android-C15-es-services.png`              | 167 KB | All 7 Spanish service rows with original SVG icons; Assembly Add-on strictly omitted                                                           |
|  5  | `android-C15-es-bottom.png`                | 155 KB | Dynamic `Para Bryan Lopez` summary, draft booking line, 4 Spanish CTAs, demo footer, no bottom nav                                             |
|  6  | `android-C15-es-moving-selected.png`       | 176 KB | Tapping `Mudanzas`: green selection border, draft line updated to `· Mudanzas`, CTA `Elegir mudanzas`                                          |
|  7  | `android-C15-es-upcoming-notice.png`       | 162 KB | Tapping `Elegir mudanzas`: truthful Spanish disclosure banner (`La siguiente etapa de selección del servicio estará disponible próximamente.`) |
|  8  | `android-C15-es-back-home.png`             | 354 KB | Android system back key (`KEYCODE_BACK`): cleanly returns to Spanish C01 Home with Spanish locale intact                                       |
|  9  | `android-C15-es-preselected-from-home.png` | 174 KB | Tapping `Mudanzas` tile on Spanish C01 Home opens Spanish C15 with `Mudanzas` preselected                                                      |
| 10  | `android-C15-en-regression.png`            | 152 KB | English C15 retains `Sarah Mitchell`, 7 English services, and `Select Moving` / `Select Junk Removal` CTA                                      |

---

## 6. Automated Quality Gate Results

All commands executed and passed cleanly:

| Gate                   | Command          |    Result    | Details                                                                             |
| :--------------------- | :--------------- | :----------: | :---------------------------------------------------------------------------------- |
| **Lint & Format**      | `pnpm check`     | **PASS (0)** | Checked 198 files in 101ms; 0 errors, 0 warnings                                    |
| **TypeScript**         | `pnpm typecheck` | **PASS (0)** | 7 of 7 workspace packages typecheck cleanly                                         |
| **Unit & Integration** | `pnpm test`      | **PASS (0)** | 184 tests passed across 7 packages (Customer: 11 suites, 124 tests; i18n: 20 tests) |
| **Monorepo Doctor**    | `pnpm doctor`    | **PASS (0)** | Node 26.0.0, pnpm 11.25.0, hardlinks, network registry OK                           |

---

## 7. Non-Goals & Boundaries Maintained

- **No Unauthorized Git Actions:** No commits, pushes, branch creations, or remote mutations performed.
- **Strict Scope Isolation:** No implementation of unbuilt screens (C15-S, C15-E, C16, C16-F, C18). Unbuilt actions honestly notify the reviewer via localized disclaimers.
- **No Faked Backend:** No fake booking confirmations, payment processors, GPS lookups, or simulated auth states.
- **No Bottom Nav on C15:** C15 strictly preserves intake flow isolation without bottom navigation bar.
- **Profile Isolation:** Sarah Mitchell remains exclusively English; Bryan Lopez remains exclusively Spanish.
