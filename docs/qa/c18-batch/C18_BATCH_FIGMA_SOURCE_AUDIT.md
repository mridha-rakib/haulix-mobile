# Phase 03.19: C18 Batch (W02 Service Discovery & Intake) — Figma Source Audit

This document details the direct inspection of all 8 authoritative Figma frames for Phase 03.19 across the 4 canonical intake screens in English and Spanish.

---

## 1. Frame Inventory & Geometry

| Code         | Screen Name            | Language | Figma Node ID | Dimensions    | Status                       |
| ------------ | ---------------------- | -------- | ------------- | ------------- | ---------------------------- |
| **C18-J**    | Junk Removal Intake    | English  | `382:805`     | 430 × 1573 px | Inspected & Reference Cached |
| **C18-J-ES** | Retiro de chatarra     | Spanish  | `977:9100`    | 430 × 1573 px | Inspected & Reference Cached |
| **C18-F**    | Furniture / Bulky-item | English  | `382:959`     | 430 × 1714 px | Inspected & Reference Cached |
| **C18-F-ES** | Retiro de muebles      | Spanish  | `977:9286`    | 430 × 1714 px | Inspected & Reference Cached |
| **C18-G**    | Garage Cleanout        | English  | `382:1056`    | 430 × 1257 px | Inspected & Reference Cached |
| **C18-G-ES** | Limpieza de garaje     | Spanish  | `977:9399`    | 430 × 1257 px | Inspected & Reference Cached |
| **C18-R**    | Retail Pickup          | English  | `382:1115`    | 430 × 1720 px | Inspected & Reference Cached |
| **C18-R-ES** | Recogida en tienda     | Spanish  | `977:9474`    | 430 × 1720 px | Inspected & Reference Cached |

---

## 2. Screen-by-Screen Content & Structure Analysis

### A. C18-J Junk Removal Intake (`382:805` / `977:9100`)

- **Breadcrumb / Chip:**
  - EN: `W02 · SERVICE DISCOVERY & INTAKE / C18-J`
  - ES: `W02 · SERVICIOS Y RECEPCIÓN / C18-J`
- **Heading:**
  - EN: Title: `Junk Removal Intake` | Subtitle: `Review items to be cleared from your pickup location.`
  - ES: Title: `Solicitud de retiro de chatarra` | Subtitle: `Revise los objetos que se retirarán de su ubicación de recogida.`
- **Customer Chip:**
  - EN: `SARAH MITCHELL · HX-DEMO-1027` (Dynamic profile active)
  - ES: `BRYAN LOPEZ MENDOZA · HX-DEMO-1027` (Dynamic profile active)
- **Top Card — Service & Access Details:**
  - Service type: `Junk Removal` (`Retiro de chatarra`) · `Non-hazardous hauling and disposal` (`Transporte y eliminación de residuos no peligrosos`)
  - Pickup staging: `Living room / garage staging area` (`Sala de estar / área de preparación del garaje`)
  - Access / Notes: `Please protect door frames when removing sofa` (`Por favor proteja los marcos de las puertas al retirar el sofá`)
- **Item Inventory List (with photographic thumbs):**
  1. `3-seat sofa` (`Sofá de tres plazas`)
     - Details: `1 item · ~82 × 35 × 34 in · ~125 lb`
     - Asset: `c18j-sofa.png`
  2. `Queen mattresses` (`Colchones tamaño queen`)
     - Details: `2 items · ~80 × 60 × 11 in each · ~70 lb each`
     - Asset: `c18j-mattresses.png`
  3. `Dining table` (`Mesa de comedor`)
     - Details: `1 item · ~60 × 36 × 30 in · ~85 lb`
     - Asset: `c18j-table.png`
- **Summary Metrics Strip:**
  - 3 item categories / 4 total pieces / ~350 lb estimated
  - EN: `Review required before dispatch`
  - ES: `Revisión requerida antes del despacho`
- **CTAs:**
  - Primary CTA: `Review and edit items` (`Revisar y editar objetos`) → Triggers C19 modal notice.
  - Secondary CTA: `Choose different service   ›` (`Elegir otro servicio   ›`) → Navigates to `/service-discovery`.

---

### B. C18-F Furniture / Bulky-item Handling (`382:959` / `977:9286`)

- **Breadcrumb / Chip:**
  - EN: `W02 · SERVICE DISCOVERY & INTAKE / C18-F`
  - ES: `W02 · SERVICIOS Y RECEPCIÓN / C18-F`
- **Heading:**
  - EN: Title: `Furniture & Bulky Items` | Subtitle: `Select handling tier and review inventory specifications.`
  - ES: Title: `Muebles y objetos pesados` | Subtitle: `Seleccione el nivel de manipulación y revise las especificaciones.`
- **Customer Chip:**
  - Dynamic customer badge with checkmark.
- **Service Tier Selector / Rows:**
  1. `Furniture Pickup` (`Retiro de muebles`) — Selected / Active
     - Subtitle: `Sofas, tables and common household pieces` (`Sofás, mesas y piezas habituales del hogar`)
  2. `Appliance Removal` (`Retiro de electrodomésticos`) — Informational / selectable
     - Subtitle: `Washers, dryers, refrigerators (C18-A)` (`Lavadoras, secadoras, frigoríficos (C18-A)`)
  3. `Mattress Removal` (`Retiro de colchones`) — Informational / selectable
     - Subtitle: `Standard and oversized mattresses (C18-T)` (`Colchones estándar y de gran tamaño (C18-T)`)
  4. `Assembly Help` (`Extra de montaje / desmontaje`) — Add-on
     - Subtitle: `Disassembly and assembly assistance` (`Asistencia de desmontaje y montaje`)
- **Inventory Detail Card:**
  - Item: `3-seat fabric sofa` (`Sofá de tela de tres plazas`)
  - Specifications: `1 item · ~82 × 35 × 34 in · ~125 lb`
  - Access: `Ground-floor pickup · driveway` (`Recogida en planta baja · entrada para autos`)
- **CTAs:**
  - Primary CTA: `Review furniture inventory` (`Revisar retiro de muebles`) → Triggers C21-F notice.
  - Secondary CTA: `See service categories   ›` (`Ver categorías de servicio   ›`) → Navigates to `/service-discovery`.

---

### C. C18-G Garage Cleanout Intake (`382:1056` / `977:9399`)

- **Breadcrumb / Chip:**
  - EN: `W02 · SERVICE DISCOVERY & INTAKE / C18-G`
  - ES: `W02 · SERVICIOS Y RECEPCIÓN / C18-G`
- **Heading:**
  - EN: Title: `Garage Cleanout Intake` | Subtitle: `Screen access, scope and hazardous material exclusions.`
  - ES: Title: `Solicitud de limpieza de garaje` | Subtitle: `Evalúe el acceso, alcance y exclusión de residuos peligrosos.`
- **Customer Chip:**
  - Dynamic customer badge.
- **Garage Scope & Accessibility Cards:**
  - Space scope: `Single residential garage · one bay` (`Garaje residencial individual · un espacio`)
  - Collection access: `Driveway available` (`Entrada para autos disponible`)
  - Identified items: `Cardboard boxes, wooden shelving, small furniture` (`Cajas de cartón, estanterías de madera, muebles pequeños`)
  - Unidentified materials: `Requires customer photos and clarification` (`Requiere fotos del cliente y aclaración`)
- **Hazardous Material & Contamination Warning Card:**
  - Badge: `Review required` (`Revisión necesaria`)
  - Disclosure: `No chemicals, paints, solvents, gas tanks, or asbestos permitted.` (`No se permiten productos químicos, pinturas, disolventes, botellas de gas ni amianto.`)
- **CTAs:**
  - Primary CTA: `List garage items` (`Revisar limpieza de garaje`) → Triggers C21-G notice.
  - Secondary CTA: `Back to services   ›` (`Volver a servicios   ›`) → Navigates to `/service-discovery`.

---

### D. C18-R Retail Pickup Intake (`382:1115` / `977:9474`)

- **Breadcrumb / Chip:**
  - EN: `W02 · SERVICE DISCOVERY & INTAKE / C18-R`
  - ES: `W02 · SERVICIOS Y RECEPCIÓN / C18-R`
- **Heading:**
  - EN: Title: `Retail Store Pickup` | Subtitle: `Authorize order collection from retail partner or store.`
  - ES: Title: `Recogida de compra en tienda` | Subtitle: `Autorice la recogida de su pedido en tienda o comercio colaborador.`
- **Customer Chip:**
  - Dynamic customer badge.
- **Retail Order Details Card:**
  - Store: `Home Depot · Phoenix`
  - Store address: `1800 E Demo Way, Phoenix, AZ 85016`
  - Order identifier: `HD-DEMO-58321 · fictional`
  - Authorized collector: `Order holder or authorized collector` (`Titular del pedido o recolector autorizado`)
  - Verification state: `Customer says ready · store has not verified` (`El cliente dice que está listo · la tienda no lo ha verificado`)
- **Destination & Delivery Card:**
  - Delivery address: `5678 N Demo Avenue, Phoenix, AZ 85012`
  - Expected items: `Flat-pack shelving ×2 · boxed furniture ×1` (`Estanterías en paquete plano ×2 · mueble en caja ×1`)
  - Estimated load: `Customer estimate; confirm packaging and weight` (`Estimación del cliente; confirmar embalaje y peso`)
  - Collection notes: `Bring order identifier and authorized pickup details` (`Llevar identificador de pedido y datos de recogida autorizada`)
- **Disclaimer Banner:**
  - Badge: `Review required` (`Revisión necesaria`)
  - Text: `Direct retailer API integration is not active in demo mode.` (`La integración directa con la API de la tienda no está activa en modo demo.`)
- **CTAs:**
  - Primary CTA: `Review retail pickup intake` (`Revisar recogida en tienda`) → Triggers C20-RETAIL notice.
  - Secondary CTA: `Try missing-order validation   ›` (`Probar validación de pedido faltante   ›`) → Triggers C18-R-E notice.

---

## 3. Truthful Architecture & Non-Fabrication Principles

- **No Mock API / Database Writes:** All states are strictly client-side presentation adhering to HAULIX demo conventions.
- **Dynamic Customer Profile:** Honors C10 profile state (`Sarah Mitchell` in English, `Bryan Lopez Mendoza` in Spanish, or user-edited overrides from C10-E).
- **Canonical Single Route Architecture:**
  - `apps/customer/app/(app)/junk-intake.tsx`
  - `apps/customer/app/(app)/bulky-item-intake.tsx`
  - `apps/customer/app/(app)/garage-intake.tsx`
  - `apps/customer/app/(app)/retail-intake.tsx`
    Each handles both English and Spanish reactively through `@haulix/i18n`.
