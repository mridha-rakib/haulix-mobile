# HAULIX Customer App — Phase 03.06: C15-S Service Selected (Spanish Localization ONLY) Report

## 1. Executive Summary

Phase 03.06 delivers the official Spanish localization for the **C15-S Service Selected** intake screen (`apps/customer/app/(app)/service-selected.tsx`) in strict accordance with authoritative Spanish Figma Node `974:8965` (`C15-S-ES · Servicio elegido / W02 [LOCALIZACIÓN]`, 430 × 1015 px), English counterpart Node `382:241`, Flow Header Back Node `436:1976`, approved Spanish service terminology from Node `974:8843` (C15-ES), and `C15S_ES_TRANSLATIONS.csv`.

Rather than creating a separate route or screen fork, the single canonical route `service-selected.tsx` now dynamically adapts to the active locale (`es` / `en`). Spanish C15 (`service-discovery.tsx`) has been connected so that pressing **Elegir &lt;servicio&gt;** routes directly to C15-S with the canonical service ID preserved end-to-end. Service switching, back navigation (both on-screen and Android hardware back), dynamic profile binding (**Bryan Lopez** with edit persistence), truthful C16 upcoming disclosure, and English regression protection have all been verified.

Physical Android QA was thoroughly executed on a physical **Realme Note 60 (RMX3930, Android 15)** via ADB through Expo Go, capturing 10 genuine proof screenshots in `docs/qa/c15s/`. All automated quality gates (`check`, `typecheck`, `test`, `doctor`) pass cleanly with 0 errors and 0 warnings.

---

## 2. Authoritative Figma References & Layout Mapping

| Item                   | Figma Node                           | Spanish Implementation                                                                                                    | English Counterpart                                                                                               | Notes & Audit Details                                                               |
| :--------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| **Canvas & Frame**     | `974:8965` (430 × 1015 px)           | Responsive vertical scroll, 22px horizontal padding, `#080B0B` dark background                                            | Node `382:241` (430 × 1015 px)                                                                                    | 1:1 layout match; no bottom navigation bar                                          |
| **Status Bar**         | `974:8966`                           | Native Android Status Bar & `HaulixSafeArea` (`top`, `left`, `right`)                                                     | Native Android Status Bar                                                                                         | Does not emulate fake iOS 9:41 UI                                                   |
| **Flow Header · Back** | `974:8967` (Node 436:1976)           | 42 × 42 px circular back button, `HAULIX` wordmark, `We Haul It All.`                                                     | `FlowHeaderBack`                                                                                                  | Centered branding; no bell icon; accessibility label localized                      |
| **Step Indicator**     | `974:8968` / `974:8969`              | `W02 · SERVICIOS Y SOLICITUD`                                                                                             | `W02 · SERVICE DISCOVERY & INTAKE`                                                                                | Pill badge with `#222B27` border, `#BAFF42` accent                                  |
| **Screen Code**        | `974:8970`                           | `/ C15-S`                                                                                                                 | `/ C15-S`                                                                                                         | Exact Figma node copy                                                               |
| **Heading**            | `974:8971` / `974:8972`              | Dynamic: `Retiro de objetos` (default), `Mudanzas`, etc.                                                                  | Dynamic: `Junk Removal`, `Moving`, etc.                                                                           | Inter Bold 28px, wraps cleanly on 360dp                                             |
| **Subtitle**           | `974:8973`                           | `Elegido para HX-DEMO-1027. Confirma el punto de recogida.`                                                               | `Selected for booking HX-DEMO-1027. Confirm where the crew will collect your items.`                              | Dynamic booking ID binding (`HX-DEMO-1027`)                                         |
| **Customer Context**   | `974:8974` / `974:8977`              | `BRYAN LOPEZ MENDOZA · HX-DEMO-1027`                                                                                      | `SARAH JANE MITCHELL · HX-DEMO-1027`                                                                              | **Source Correction:** Figma Sarah Mitchell replaced with dynamic Spanish profile   |
| **Selected Section**   | `974:8978` / `974:8980`              | `Servicio elegido`                                                                                                        | `Selected service`                                                                                                | Exact Figma 974:8980                                                                |
| **Selected Tile**      | `974:8981` (340 × 121 px)            | 2px lime stroke (`#BAFF42`), 31 × 31 px truck icon, `SELECCIONADO` status                                                 | 2px lime stroke, 31px truck icon, `SELECTED`                                                                      | Semantic category SVG fallback for other services                                   |
| **Tile Title**         | `I974:8981;317:84`                   | `Retiro de objetos` (or selected service title)                                                                           | `Junk Removal` (or selected service title)                                                                        | Dynamic Spanish category name                                                       |
| **Tile Description**   | `I974:8981;317:85` / `974:8869`      | `Retiro y eliminación de residuos no peligrosos`                                                                          | `Non-hazardous junk and bulky-item pickup`                                                                        | **Source Correction:** Leftover English in Figma replaced with approved C15-ES copy |
| **Draft Note**         | `974:8982`                           | `Borrador ilustrativo · Sin precio calculado`                                                                             | `Illustrative draft · No price calculated yet`                                                                    | Exact Figma 974:8982                                                                |
| **Process Section**    | `974:8983` / `974:8985`              | `Cómo funciona la solicitud`                                                                                              | `How this booking works`                                                                                          | Exact Figma 974:8985                                                                |
| **Step 1**             | `974:8986`                           | `1. Confirma una dirección válida en Arizona`                                                                             | `1. Confirm eligible Arizona pickup address`                                                                      | Exact Figma 974:8986                                                                |
| **Step 2**             | `974:8987`                           | `2. Describe objetos, acceso y sube fotos`                                                                                | `2. Describe items, access and upload supporting photos`                                                          | Exact Figma 974:8987                                                                |
| **Step 3**             | `974:8988`                           | `3. Revisa las sugerencias de IA en W03 antes del precio`                                                                 | `3. Review corrected AI suggestions in W03 before a quote`                                                        | Exact Figma 974:8988                                                                |
| **Primary CTA**        | `I974:8991;7:51`                     | `Continuar a zona de servicio`                                                                                            | `Continue to service area`                                                                                        | Full-width `#BAFF42` lime pill button                                               |
| **Secondary CTA**      | `974:8993`                           | `Cambiar servicio   ›`                                                                                                    | `Change service   ›`                                                                                              | Dark pill button returning to C15 with state preserved                              |
| **Footer Disclaimers** | `974:8994` / `974:8995` / `974:8996` | `SOLO DEMO  ·  Sin reserva, tarifa ni pago confirmado`<br>`SRS  BK-01, BK-02, SV-01  ·  430 px / desplazamiento vertical` | `DEMO ONLY  ·  No confirmed booking, rates or payment`<br>`SRS  BK-01, BK-02, SV-01  ·  430 px / vertical scroll` | Exact Figma 974:8995 & 974:8996                                                     |

---

## 3. Explicit Source Inconsistencies Corrected (Audit Findings)

1. **Spanish Customer Profile Leak in Figma Source (`974:8974`):**
   - _Figma Source:_ Spanish mockup node `974:8974` displays `SARAH MITCHELL · HX-DEMO-1027`.
   - _Correction:_ The runtime strictly binds to the localized Spanish customer demo profile (**Bryan Lopez**, or saved edits like `Bryan Lopez Mendoza`) for Spanish, while English independently preserves **Sarah Mitchell**.
2. **Leftover English Description in Spanish Figma Tile (`I974:8981;317:85`):**
   - _Figma Source:_ Mockup layer `I974:8981;317:85` retains the English description _"Non-hazardous junk and bulky-item pickup"_.
   - _Correction:_ Replaced with the approved Spanish C15 description from Node `974:8869`: _"Retiro y eliminación de residuos no peligrosos"_. Other services use their approved Spanish descriptions from `C15_SERVICES`.

---

## 4. Routing & Selection Contract Implementation

1. **C15 Spanish → C15-S Navigation:**
   - In `apps/customer/app/(app)/service-discovery.tsx`, replaced the temporary Spanish upcoming notice on `Elegir <servicio>` with canonical navigation:

     ```tsx
     router.push({
       pathname: "/service-selected",
       params: { service: selectedServiceId },
     });
     ```
   - Operates identically for both Spanish and English without locale confusion.
2. **Dynamic Service Rendering & Wrapping:**
   - Evaluated `t(selectedService.i18nTitleKey)` and `t(selectedService.i18nSubtitleKey)`.
   - Tested long category names such as **Retiro de electrodomésticos** (_Appliance Removal_). The container uses `minHeight: 121` allowing natural two-line wrapping with zero text clipping or overlapping on 360dp physical devices.
3. **Change Service & Back Navigation:**
   - Tapping `Cambiar servicio   ›` routes back to `/service-discovery` with `params: { service: selectedService.id }`, preserving the selected service in the Spanish discovery list and updating the CTA to `Elegir <servicio>`.
   - Flow Header Back and Android system back (`KEYCODE_BACK`) invoke `handleBackToC15` which checks `router.canGoBack()` and falls back gracefully to `router.replace({ pathname: "/service-discovery", params: { service: selectedService.id } })`.
4. **Truthful C16 Notice Disclosure:**
   - Tapping `Continuar a zona de servicio` reveals the dismissible truthful Spanish notice:
     _"La verificación de la zona de servicio (C16) estará disponible en una próxima fase."_
   - No mock location lookups, fake quotes, or fabricated backend API requests.
5. **Flow Isolation:**
   - C15-S strictly omits the `CustomerBottomNav` tab bar, maintaining intake flow isolation.

---

## 5. Physical Android Device QA Verification

### Device Environment

- **Device Model:** Realme Note 60 (`RMX3930`)
- **OS Version:** Android 15 (API 35)
- **Screen Resolution:** 720 × 1600 px (360 × 800 dp native viewport)
- **ADB Identifier:** `0B04731X200003BB`
- **Reverse Port:** `tcp:8081` active to Metro bundler
- **Runtime Environment:** Expo Go on physical device (distinguished from standalone APK)
- **Screenshots Directory:** `docs/qa/c15s/`

### QA Proof Matrix

|  #  | Filename                                                                                                                                             |  Size  | Verification Description                                                                                                                               |
| :-: | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
|  1  | [android-C15S-es-default.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-default.png)                 | 174 KB | C15-S Spanish top: Flow Header Back, W02 chip, `Retiro de objetos`, `BRYAN LOPEZ MENDOZA · HX-DEMO-1027`                                               |
|  2  | [android-C15S-es-selected-card.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-selected-card.png)     | 170 KB | Selected card: `SELECCIONADO`, 31px truck SVG, `Retiro de objetos`, `Retiro y eliminación de residuos no peligrosos`                                   |
|  3  | [android-C15S-es-bottom.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-bottom.png)                   | 158 KB | `Cómo funciona la solicitud` 3 steps, `Continuar a zona de servicio`, `Cambiar servicio ›`, demo footer, no bottom nav                                 |
|  4  | [android-C15-es-to-C15S.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15-es-to-C15S.png)                   | 156 KB | Spanish C15 discovery: `Elegir retiro de objetos` CTA ready to navigate to C15-S                                                                       |
|  5  | [android-C15S-es-moving-selected.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-moving-selected.png) | 165 KB | C15-S dynamic service test: `Mudanzas` heading, Moving SVG icon, and `Transporte del origen al destino`                                                |
|  6  | [android-C15S-es-long-name.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-long-name.png)             | 180 KB | Long title wrapping test: `Retiro de electrodomésticos` & `Retiro autorizado de electrodomésticos` wrap cleanly                                        |
|  7  | [android-C15S-es-change-service.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-change-service.png)   | 160 KB | Return via `Cambiar servicio ›`: C15 Spanish displays with prior service selection intact                                                              |
|  8  | [android-C15S-es-c16-notice.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-c16-notice.png)           | 187 KB | Tapping `Continuar a zona de servicio`: displays truthful notice `La verificación de la zona de servicio (C16) estará disponible en una próxima fase.` |
|  9  | [android-C15S-es-back-to-c15.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-es-back-to-c15.png)         | 162 KB | Android hardware back press: cleanly returns to C15 Spanish with selected service preserved                                                            |
| 10  | [android-C15S-en-regression.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c15s/android-C15S-en-regression.png)           | 172 KB | English regression: `Sarah Jane Mitchell`, `Junk Removal`, `SELECTED`, `Continue to service area`                                                      |

---

## 6. Automated Quality Gates

All four repository quality gates were run and passed cleanly with zero errors:

| Quality Gate           | Command          |    Result    | Verification Details                                                                                                                                            |
| :--------------------- | :--------------- | :----------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lint & Format**      | `pnpm check`     | **PASS (0)** | Checked 214 files in 126ms; 0 errors, 0 warnings (Biome 2.6.7)                                                                                                  |
| **TypeScript**         | `pnpm typecheck` | **PASS (0)** | 7 of 7 workspace packages typecheck cleanly (`turbo` FULL TURBO cache)                                                                                          |
| **Unit & Integration** | `pnpm test`      | **PASS (0)** | 213 unit tests passed monorepo-wide (Customer: 12 suites, 151 tests; i18n: 22 tests; driver: 7 tests; utils: 21 tests; logger: 8 tests; design-tokens: 4 tests) |
| **Monorepo Doctor**    | `pnpm doctor`    | **PASS (0)** | Node 26.0.0, pnpm 11.25.0, hardlinks, network registry OK                                                                                                       |

---

## 7. Compliance Checklist

- [x] **Single Canonical Route:** Reused `apps/customer/app/(app)/service-selected.tsx`. No Spanish route fork.
- [x] **Authoritative Spanish Figma (`974:8965`):** All headings, labels, step instructions, and disclaimers matched.
- [x] **Audit Corrections Implemented:** Bryan Lopez used for Spanish profile (Sarah Mitchell preserved for English); approved C15 description used for default selected tile.
- [x] **Dynamic Service Selection:** All 7 services supported with localized names, subtitles, and semantic icons.
- [x] **C15 Spanish Integration:** Tapping `Elegir <servicio>` routes to C15-S passing `service=<id>`.
- [x] **State Preservation:** Back button, hardware back, and `Cambiar servicio ›` return to C15 with selected service preserved.
- [x] **Truthful C16 Notice:** Localized notice displayed upon pressing `Continuar a zona de servicio`.
- [x] **No Bottom Nav:** Bottom navigation strictly omitted on C15-S.
- [x] **Safe-Area & 360dp Layout:** Verified on physical Realme Note 60; long text (`Retiro de electrodomésticos`) wraps cleanly without clipping.
- [x] **English Regression:** Verified English C15-S functions identically with English tokens and Sarah Mitchell profile.
- [x] **Quality Gates Clean:** `check`, `typecheck`, `test`, `doctor` all exit 0.
- [x] **STRICT HARD STOP:** No C16, C18, Driver App, backend API, git commits, or APK builds.
