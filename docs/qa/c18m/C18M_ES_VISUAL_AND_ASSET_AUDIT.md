# C18-M-ES Solicitud de Mudanza — Spanish Visual & Asset Audit

**Authoritative Spanish Figma Node:** `977:9192` (`C18-M-ES · Solicitud de mudanza / W02 [LOCALIZACIÓN]`, 430 × 1643 px)  
**English Counterpart Node:** `382:881` (`C18-M · Moving intake / W02 [BK-02, BK-03, SV-14]`, 430 × 1643 px)  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Date:** 2026-11-17  
**Phase:** 03.18 (Spanish Localization ONLY)  
**Auditor:** Antigravity Mobile Engine  

---

## 1. Visual & Icon Inventory (Spanish Localization)

|  #  | Visual Element | Figma Node ID | Original Asset Available | Type | Dimensions | Stroke / Fill | Color Token | Placement / Role | React Native Implementation |
| :-: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | **Status Bar** | `977:9193` | Yes | Native / System | 386 × 38 px | None | Transparent / System | Top safe area | Native React Native `StatusBar` / `HaulixSafeArea` |
| 2 | **Flow Header Back Button** | `977:9194` | Yes | SVG / Component | 42 × 42 px | 1.5px stroke | `#BAFF42` / `#151A19` bg | Pinned header y=81 px | [FlowHeaderBack.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/components/navigation/FlowHeaderBack.tsx) |
| 3 | **Step Indicator** | `977:9198` | N/A | Text / Pill | 386 × 33 px | None / Surface | `#BAFF42` & `#ADB7B1` | y=158 px | `<View>` container: `W02 · SERVICIOS Y SOLICITUD` & `  /  C18-M` |
| 4 | **Customer Booking Context Check** | `977:9205` | Yes | SVG Vector | 17 × 17 px | 1.275px stroke | `#BAFF42` (Lime) | Inside `#1A2510` olive badge | `C18MCheckIcon` (`check1.svg` original vector) |
| 5 | **Customer Booking Badge** | `977:9204` | N/A | Container / Pill | 386 × 39 px | Border `#1F3826` / `#1A2510` bg | `#BAFF42` text | Below header at y=323 px | Dynamic Bryan Lopez Mendoza context: `BRYAN LOPEZ MENDOZA · HX-DEMO-MOVE-1034` |
| 6 | **Moving Route Section Heading** | `977:9208` | N/A | Text / Header | 354 × 27 px | None | `#F6F8F6` (Inter SemiBold 16px) | Section A header | Native `<Text>`: `Ruta de mudanza` |
| 7 | **Route: Customer Row** | `977:9210` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 1 | Label: `Cliente`, Value: dynamic `Bryan Lopez Mendoza` with `C18MUserIcon` |
| 8 | **Route: Pickup Row** | `977:9214` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 2 | Label: `Recogida`, Value: preserved `2140 E Sample Road, Phoenix, AZ 85016` |
| 9 | **Route: Drop-off Row** | `977:9218` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 3 | Label: `Entrega`, Value: preserved `5678 N Demo Avenue, Phoenix, AZ 85012` |
| 10 | **Route: Requested Scope Row** | `977:9222` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 4 | Label: `Servicio solicitado`, Value: `Mudanza residencial · Apartamento de 1 dormitorio` |
| 11 | **Inventory & Access Heading** | `977:9227` | N/A | Text / Header | 354 × 27 px | None | `#F6F8F6` (Inter SemiBold 16px) | Section B header | Native `<Text>`: `Inventario y acceso` |
| 12 | **Inventory: Large Items Row** | `977:9229` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 1 | Label: `Objetos grandes`, Value: `Sofá de 2 plazas ×1; cómoda ×1; 12 cajas` |
| 13 | **Inventory: Estimated Weight Row** | `977:9233` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 2 | Label: `Peso estimado`, Value: `Estimación del cliente: ~550 lb en total` |
| 14 | **Inventory: Origin Stairs Row** | `977:9237` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 3 | Label: `Escaleras en origen`, Value: `Planta baja` |
| 15 | **Inventory: Destination Stairs Row** | `977:9241` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 4 | Label: `Escaleras en destino`, Value: `Un tramo, sin ascensor` |
| 16 | **Inventory: Packing Request Row** | `977:9245` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 5 | Label: `Solicitud de embalaje`, Value: `No se seleccionó embalaje adicional` |
| 17 | **Crew Assessment Heading** | `977:9250` | N/A | Text / Header | 354 × 27 px | None | `#F6F8F6` (Inter SemiBold 16px) | Section C header | Native `<Text>`: `Se requiere evaluar carga y personal` |
| 18 | **Review Required Checkmark** | `977:9253` | Yes | SVG Vector | 18 × 18 px | 1.35px stroke | `#FFC85A` (Amber) | Inside `Revisión necesaria` badge | `C18MReviewCheckIcon` (`check2.svg` original vector) |
| 19 | **Primary CTA: Continue Moving Details** | `977:9260` | Yes | ActionButton | 386 × 52 px | Solid Fill `#BAFF42` | `#080B0B` (Dark text) | Action group | Native `<Pressable>`: `Continuar detalles de mudanza` |
| 20 | **Secondary CTA: Return to Service List** | `977:9262` | N/A | Button | 386 × 56 px | 1px border `#35403B` | `#BAFF42` text | Action group | Native `<Pressable>`: `Volver a lista de servicios   ›` |
| 21 | **Footer SRS / Demo Disclosures** | `977:9264` | N/A | Text Group | 386 × 48 px | None | `#788580` / 10px Inter | Screen bottom | Native `<Text>` centered footnotes |

---

## 2. Spanish Translation Fidelity Matrix

| English Figma (`382:881`) | Spanish Figma (`977:9192`) | Runtime Implementation (`es.c18m`) | Verified Status |
| :--- | :--- | :--- | :---: |
| `W02 · SERVICE DISCOVERY & INTAKE` | `W02 · SERVICIOS Y SOLICITUD` | `W02 · SERVICIOS Y SOLICITUD` | MATCH |
| `  /  C18-M` | `  /  C18-M` | `  /  C18-M` | MATCH |
| `Moving details` | `Detalles de la mudanza` | `Detalles de la mudanza` | MATCH |
| `Separate fictional scenario HX-DEMO-MOVE-1034 · No production quote.` | `Ejemplo independiente HX-DEMO-MOVE-1034 · Sin cotización real.` | `Ejemplo independiente HX-DEMO-MOVE-1034 · Sin cotización real.` | MATCH |
| `SARAH JANE MITCHELL · HX-DEMO-MOVE-1034` | `DANIEL RUIZ · HX-DEMO-MOVE-1034` | Dynamic live flow: `BRYAN LOPEZ MENDOZA · HX-DEMO-MOVE-1034`; Standalone fixture: `DANIEL RUIZ · HX-DEMO-MOVE-1034` | MATCH |
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

## 3. Original Vector Verification

1. **`check1.svg` (Context Pill Vector):**
   - Node: `977:9205` / `382:896`
   - Path: `M2.83333 9.20833L6.375 12.75L14.1667 4.95833`
   - Stroke width: `1.275`
   - Color: `#BAFF42` (HAULIX Brand Lime)
   - Component: `C18MCheckIcon`
2. **`check2.svg` (Review Required Vector):**
   - Node: `977:9253` / `382:945`
   - Path: `M3 9.75L6.75 13.5L15 5.25`
   - Stroke width: `1.35`
   - Color: `#FFC85A` (Amber Warning)
   - Component: `C18MReviewCheckIcon`
