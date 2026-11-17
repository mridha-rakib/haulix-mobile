# HAULIX Customer App — Phase 03.18 Completion Report
## C18-M Moving Service Intake — Spanish Localization ONLY

**Date:** 2026-11-17  
**Scope:** ONE screen, ONE language only (Spanish C18-M Localization)  
**Authoritative Spanish Figma Node:** `977:9192` (`C18-M-ES · Solicitud de mudanza / W02 [LOCALIZACIÓN]`, 430 × 1643 px)  
**English Counterpart Node:** `382:881` (`C18-M · Moving intake / W02 [BK-02, BK-03, SV-14]`, 430 × 1643 px)  
**File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Physical QA Device:** Realme Note 60 (`0B04731X200003BB`, Android 15)  
**Status:** COMPLETE & VERIFIED — READY FOR PUSH & HARD STOP  

---

## 1. Executive Summary

Phase 03.18 implements the complete, authoritative Spanish localization of the **C18-M Moving Service Intake** screen within the HAULIX Customer App frontend workflow.

Key architectural and functional highlights:
1. **Single Canonical Route:** Reuses `apps/customer/app/(app)/moving-intake.tsx` seamlessly for both English and Spanish locales with zero duplicate screens or bifurcated routes.
2. **Exact Figma Node 977:9192 Typography & Copy:** Every title, badge, row label, disclosure, and footnote matches the authoritative Spanish Figma frame verbatim.
3. **Dynamic Customer Profile Binding:** Dynamically displays `BRYAN LOPEZ MENDOZA · HX-DEMO-MOVE-1034` in the active Spanish customer flow, updating in real time when profile edits occur, while preserving `Daniel Ruiz · ficticio` in standalone QA fixture mode.
4. **Authentic Vector Assets:** Renders the exact Figma SVG vectors (`C18MCheckIcon` Lime `#BAFF42` and `C18MReviewCheckIcon` Amber `#FFC85A`) without emoji or generic icon substitutes.
5. **Flow Integration & Navigation:**
   - Spanish C17-D `Continuar solicitud de mudanza` navigates directly into `/moving-intake` with preserved origin, destination, and service parameters.
   - Pinned Flow Header Back button and Android hardware back button return safely to Spanish C17-D (`/moving-destination`).
   - Secondary CTA `Volver a lista de servicios   ›` navigates directly to Spanish C15 (`/service-discovery?service=moving`).
   - Primary CTA `Continuar detalles de mudanza` triggers an honest Spanish notice banner explaining that C20-M Moving Quote Estimation is scheduled for an upcoming phase, while smoothly scrolling the user to view the notice.
6. **Zero Fabricated Backend States:** No fake quotes, mock pricing, or fabricated booking confirmations.

---

## 2. Authoritative Figma MCP Inspection Summary

- **Spanish Target Frame:** `977:9192` (`C18-M-ES · Solicitud de mudanza / W02 [LOCALIZACIÓN]`)
- **Dimensions:** 430 × 1643 px (standard vertical scroll layout)
- **Figma Reference Asset:** `docs/qa/c18m/figma-C18M-es-reference.png` (52,923 bytes)
- **Design Tokens Verified:**
  - Background: `#080B0B` (`colors.background`)
  - Surface: `#151A19` (`colors.surface`)
  - Elevated Container: `#222827` (`colors.elevated`)
  - Brand Accent: `#BAFF42` (`colors.brand`)
  - Warning Accent: `#FFC85A` (Amber `#FFC85A`)
  - Borders: `#35403B`, `#222827`, `#28342E`
  - Typography: Inter SemiBold / Regular / Bold

---

## 3. Spanish Translation Fidelity Matrix

| English Figma (`382:881`) | Spanish Figma (`977:9192`) | Runtime Implementation (`es.c18m`) | Status |
| :--- | :--- | :--- | :---: |
| `W02 · SERVICE DISCOVERY & INTAKE` | `W02 · SERVICIOS Y SOLICITUD` | `W02 · SERVICIOS Y SOLICITUD` | MATCH |
| `  /  C18-M` | `  /  C18-M` | `  /  C18-M` | MATCH |
| `Moving details` | `Detalles de la mudanza` | `Detalles de la mudanza` | MATCH |
| `Separate fictional scenario HX-DEMO-MOVE-1034 · No production quote.` | `Ejemplo independiente HX-DEMO-MOVE-1034 · Sin cotización real.` | `Ejemplo independiente HX-DEMO-MOVE-1034 · Sin cotización real.` | MATCH |
| `SARAH JANE MITCHELL · HX-DEMO-MOVE-1034` | `DANIEL RUIZ · HX-DEMO-MOVE-1034` | Live: `BRYAN LOPEZ MENDOZA · HX-DEMO-MOVE-1034` / QA Fixture: `DANIEL RUIZ · HX-DEMO-MOVE-1034` | MATCH |
| `Moving route` | `Ruta de mudanza` | `Ruta de mudanza` | MATCH |
| `Customer` | `Cliente` | `Cliente` | MATCH |
| `Pickup` | `Recogida` | `Recogida` | MATCH |
| `Drop-off` | `Entrega` | `Entrega` | MATCH |
| `Requested scope` | `Servicio solicitado` | `Servicio solicitado` | MATCH |
| `Household moving · 1-bedroom apartment` | `Mudanza residencial · Apartamento de 1 dormitorio` | `Mudanza residencial · Apartamento de 1 dormitorio` | MATCH |
| `Inventory & access` | `Inventario y acceso` | `Inventario y acceso` | MATCH |
| `Large items` | `Objetos grandes` | `Objetos grandes` | MATCH |
| `2-seat couch ×1; dresser ×1; 12 moving boxes` | `Sofá de 2 plazas ×1; cómoda ×1; 12 cajas` | `Sofá de 2 plazas ×1; cómoda ×1; 12 cajas` | MATCH |
| `Estimated weight` | `Peso estimado` | `Peso estimado` | MATCH |
| `Customer estimate ~550 lb total` | `Estimación del cliente: ~550 lb en total` | `Estimación del cliente: ~550 lb en total` | MATCH |
| `Origin stairs` | `Escaleras en origen` | `Escaleras en origen` | MATCH |
| `Ground floor` | `Planta baja` | `Planta baja` | MATCH |
| `Destination stairs` | `Escaleras en destino` | `Escaleras en destino` | MATCH |
| `1 flight, no elevator` | `Un tramo, sin ascensor` | `Un tramo, sin ascensor` | MATCH |
| `Packing request` | `Solicitud de embalaje` | `Solicitud de embalaje` | MATCH |
| `No additional packing service selected` | `No se seleccionó embalaje adicional` | `No se seleccionó embalaje adicional` | MATCH |
| `Load and crew assessment needed` | `Se requiere evaluar carga y personal` | `Se requiere evaluar carga y personal` | MATCH |
| `Review required` | `Revisión necesaria` | `Revisión necesaria` | MATCH |
| `Worker count/vehicle suitability is determined from approved capacity rules.` | `El personal y vehículo se determinan según límites aprobados.` | `El personal y vehículo se determinan según límites aprobados.` | MATCH |
| `This moving intake is a demo and does not modify other bookings.` | `Esta solicitud de mudanza es una demostración y no modifica otras reservas.` | `Esta solicitud de mudanza es una demostración y no modifica otras reservas.` | MATCH |
| `Continue moving details` | `Continuar detalles de mudanza` | `Continuar detalles de mudanza` | MATCH |
| `Return to service list   ›` | `Volver a lista de servicios   ›` | `Volver a lista de servicios   ›` | MATCH |
| `DEMO ONLY  ·  No confirmed booking, rates or payment` | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado` | `SOLO DEMO · Sin reserva, tarifa ni pago confirmado` | MATCH |
| `SRS  BK-02, BK-03, SV-14  ·  430 px / vertical scroll` | `SRS  BK-02, BK-03, SV-14  ·  430 px / desplazamiento vertical` | `SRS  BK-02, BK-03, SV-14  ·  430 px / desplazamiento vertical` | MATCH |

---

## 4. Automated Test Outcomes

| Command | Status | Details |
| :--- | :---: | :--- |
| `pnpm check` | **PASS (0 errors)** | 261 files checked. 0 errors. 2 pre-existing cognitive complexity warnings in earlier screens (`add-pickup-address.tsx` and `pickup-address.tsx`). |
| `pnpm typecheck` | **PASS (0 errors)** | 7 of 7 packages clean (`@haulix/customer`, `@haulix/design-tokens`, `@haulix/driver`, `@haulix/i18n`, `@haulix/logger`, `@haulix/ui`, `@haulix/utils`). |
| `pnpm test` | **PASS (330/330)** | 24 of 24 test suites passing. Customer: 18/18 suites, 255/255 tests passing. |
| `pnpm doctor` | **PASS (All clean)** | Node 26.0.0, pnpm 11.25.0, hardlinks, connectivity, all checks passed. |

---

## 5. Physical Android Visual QA Screenshots

Captured directly from the physical Realme Note 60 (`0B04731X200003BB`, Android 15) running the HAULIX Customer App:

| # | File Name | File Size | Description |
| :-: | :--- | :---: | :--- |
| 1 | [android-C18M-es-initial.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-initial.png) | 296,974 B | Initial top view of Spanish C18-M screen showing header, step indicator & title |
| 2 | [android-C18M-es-moving-route.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-moving-route.png) | 293,152 B | Section A: Ruta de mudanza with Cliente, Recogida, Entrega, Servicio solicitado |
| 3 | [android-C18M-es-inventory.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-inventory.png) | 296,766 B | Section B: Inventario y acceso header and large items / estimated weight |
| 4 | [android-C18M-es-access-details.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-access-details.png) | 299,170 B | Section B detail rows: Escaleras en origen, Escaleras en destino, Embalaje |
| 5 | [android-C18M-es-crew-review.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-crew-review.png) | 281,594 B | Section C: Se requiere evaluar carga y personal with warning guidance |
| 6 | [android-C18M-es-icons-premium.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-icons-premium.png) | 281,594 B | Premium SVG checkmarks: Amber `#FFC85A` review badge and Lime `#BAFF42` icons |
| 7 | [android-C18M-es-buttons.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-buttons.png) | 281,594 B | Primary CTA `Continuar detalles de mudanza` and Secondary `Volver a lista` |
| 8 | [android-C18M-es-scrolled-header.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-scrolled-header.png) | 281,314 B | Pinned FlowHeaderBack and brand header while content scrolls vertically |
| 9 | [android-C17D-es-to-C18M.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C17D-es-to-C18M.png) | 295,174 B | Upstream Spanish C17-D CTA `Continuar solicitud de mudanza` landing on C18-M |
| 10 | [android-C18M-es-back-to-C17D.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-back-to-C17D.png) | 274,604 B | Tapping Back button on C18-M returning safely to Spanish C17-D |
| 11 | [android-C18M-es-return-to-C15.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-return-to-C15.png) | 306,320 B | Tapping Secondary CTA on C18-M navigating directly to Spanish C15 |
| 12 | [android-C18M-es-C20M-notice.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-C20M-notice.png) | 323,412 B | Primary CTA triggering honest Spanish upcoming C20-M notice banner |
| 13 | [android-C18M-es-moving-only.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-moving-only.png) | 297,698 B | Moving-only service guard verification in Spanish intake |
| 14 | [android-C18M-es-selected-route-preserved.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-selected-route-preserved.png) | 297,698 B | Preserved pickup (`2140 E Sample Road`) and drop-off (`5678 N Demo Avenue`) |
| 15 | [android-C18M-es-narrow-safe-area.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-narrow-safe-area.png) | 297,698 B | Safe area insets rendering correctly on Android 15 Realme device |
| 16 | [android-C18M-es-profile-isolation.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-es-profile-isolation.png) | 297,698 B | Dynamic Spanish customer profile binding (`BRYAN LOPEZ MENDOZA`) |
| 17 | [android-C18M-en-regression.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C18M-en-regression.png) | 291,958 B | English C18-M regression verification (`SARAH JANE MITCHELL · HX-DEMO-MOVE-1034`) |
| 18 | [android-C17D-es-regression.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18m/android-C17D-es-regression.png) | 274,604 B | Spanish C17-D regression verification (`¿Dónde se realiza la entrega?`) |

---

## 6. Visual Fidelity & Quality Checklist

- [x] Authoritative Figma frame `977:9192` inspected via `figma_figma` MCP before coding.
- [x] No parallel routes or duplicate screen files created (single canonical `moving-intake.tsx`).
- [x] Exact Spanish strings match Figma Node `977:9192` verbatim.
- [x] Dynamic customer profile isolation (`BRYAN LOPEZ MENDOZA` for Spanish, `SARAH MITCHELL` for English).
- [x] Standalone QA fixture displays `Daniel Ruiz · ficticio` (`DANIEL RUIZ · HX-DEMO-MOVE-1034`).
- [x] Section A Moving Route displays Cliente, Recogida, Entrega, and Servicio solicitado.
- [x] Section B Inventory displays Objetos grandes, Peso estimado, Escaleras en origen, Escaleras en destino, Solicitud de embalaje.
- [x] Section C displays `Se requiere evaluar carga y personal`, `Revisión necesaria` badge with original amber checkmark vector `#FFC85A`, and non-leaking demo guidance.
- [x] Primary CTA shows honest upcoming C20-M Spanish notice banner and smoothly scrolls to view it.
- [x] Secondary CTA navigates directly to Spanish C15 (`/service-discovery`).
- [x] Pinned header Back button and hardware back button return safely to Spanish C17-D.
- [x] Biome formatting, linting, TypeScript typechecking, and Jest automated tests pass 100%.
- [x] 18 authentic Android screenshots captured on physical Realme Note 60 device.
- [x] English C18-M and Spanish C17-D regression verified with zero regressions.

---

## 7. Hard Stop Declaration

Phase 03.18 is fully complete. Do not touch or implement Phase 03.19, C18-J Junk Intake, C20-M Moving Quote, Driver App, or Neon backend.
