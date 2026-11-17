# Phase 03.20: Figma Source and Content Audit

## W02 Service Discovery & Intake: C18-A, C18-T, C18-R-E, C19

**Figma File:** `Q946h4YBGgyLsjnPtdyQNe` (HAULIX UI/UX Concept)  
**Inspection Date:** 2026-11-17  
**Scope:** 4 Screens × 2 Languages = 8 Authoritative Figma Frames

---

## 1. Frame Inventory & Geometry

| Code           | Screen Title                                    | Language | Figma Node ID | Geometry (W × H) | Destination Reference                                          |
| -------------- | ----------------------------------------------- | -------- | ------------- | ---------------- | -------------------------------------------------------------- |
| **C18-A**      | Appliance removal details                       | English  | `387:177`     | 430 × 1714 px    | Primary: `394:290` (C21-A) / Secondary: C15                    |
| **C18-A-ES**   | Detalles del retiro de electrodomésticos        | Spanish  | `977:9572`    | 430 × 1714 px    | Primary: C21-A / Secondary: C15                                |
| **C18-T**      | Mattress removal details                        | English  | `387:274`     | 430 × 1714 px    | Primary: `394:392` (C21-T) / Secondary: C15                    |
| **C18-T-ES**   | Detalles de retiro de colchones                 | Spanish  | `977:9685`    | 430 × 1714 px    | Primary: C21-T / Secondary: C15                                |
| **C18-R-E**    | Order information needed (Retail Missing Order) | English  | `382:1197`    | 430 × 1118 px    | Primary: C18-R / Secondary: C15                                |
| **C18-R-E-ES** | Se necesitan datos del pedido                   | Spanish  | `980:9247`    | 430 × 1118 px    | Primary: C18-R / Secondary: C15                                |
| **C19**        | Check your item list (Item Inventory)           | English  | `382:1248`    | 430 × 1289 px    | Primary: `382:1483` (C19-P) / Secondaries: C19-E, C19-A, C19-V |
| **C19-ES**     | Revisa tu lista de objetos                      | Spanish  | `980:9314`    | 430 × 1289 px    | Primary: C19-P / Secondaries: C19-E, C19-A, C19-V              |

---

## 2. Detailed Content & Typography Matrix

### A. Screen 1: C18-A Appliance Removal Intake

- **Step Chip:**
  - EN: `W02 · SERVICE DISCOVERY & INTAKE / C18-F` (Figma frame label notes C18-F family grouping; screen code is `C18-A`)
  - ES: `W02 · SERVICIOS Y RECEPCIÓN / C18-F`
- **Heading:**
  - EN: Title: `Bulky-item handling` (Subtitle: `Choose the relevant removal or disposal service.`) or `Appliance removal details`
  - ES: Title: `Muebles y objetos pesados` (Subtitle: `Elige el servicio de retiro o eliminación correspondiente.`) or `Detalles del retiro de electrodomésticos`
- **Customer Chip:**
  - EN: `SARAH MITCHELL · HX-DEMO-1027`
  - ES: `BRYAN LOPEZ MENDOZA · HX-DEMO-1027`
- **Service Variants (4 rows):**
  1. `Appliance Removal` (`Retiro de electrodomésticos`) — Selected
  2. `Furniture Pickup` (`Retiro de muebles`)
  3. `Mattress Removal` (`Retiro de colchones`)
  4. `Assembly / Disassembly add-on` (`Extra de montaje / desmontaje`) — Add-on
- **Item Details Card:**
  - Figma Source Untranslated Defect: Section title is untranslated in Spanish (`Appliance removal · item details`). Normalized to: `Retiro de electrodomésticos · detalles del objeto`.
  - Item: `Front-load washing machine` (`Lavadora de carga frontal`)
  - Quantity: `1` (`1`)
  - Approximate size: `27 × 29 × 39 in` (`27 × 29 × 39 in`)
  - Estimated weight: `~170 lb · customer estimate` (`~170 lb · Estimación del cliente`)
  - Access: `Ground floor · utility connections need review` (`Planta baja · Revisar conexiones`)
- **Additional Handling Check Card:**
  - Title: `Additional handling check` (`Control de manejo adicional`)
  - Badge: `Review required` (`Revisión necesaria`)
  - Disclosures:
    - EN: `Appliance disconnection, capacity and approved disposal restrictions require checking.`
    - EN: `No electrical or water disconnection is automatically included.`
    - ES: `Se deben revisar desconexión, capacidad y eliminación aprobada.`
    - ES: `La desconexión eléctrica o de agua no está incluida.`
- **Actions:**
  - Primary CTA: `Review appliance removal intake` (`Revisar retiro de electrodomésticos`)
  - Secondary CTA: `See service categories   ›` (`Ver categorías de servicio   ›`)

---

### B. Screen 2: C18-T Mattress Removal Intake

- **Service Variants (4 rows):**
  1. `Mattress Removal` (`Retiro de colchones`) — Selected
  2. `Appliance Removal` (`Retiro de electrodomésticos`)
  3. `Furniture Pickup` (`Retiro de muebles`)
  4. `Assembly / Disassembly add-on` (`Extra de montaje / desmontaje`) — Add-on
- **Item Details Card:**
  - Figma Source Untranslated Defect: Section title in Spanish is `Mattress removal · item details`. Normalized to: `Retiro de colchones · detalles del objeto`.
  - Item: `Queen mattress` (`Colchón queen`)
  - Quantity: `2` (`2`)
  - Approximate size: `80 × 60 × 11 in each` (`80 × 60 × 11 pulg. cada uno`)
  - Estimated weight: `~70 lb each · customer estimate` (`~70 lb cada uno · Estimación del cliente`)
  - Access: `Ground floor · driveway pickup` (`Planta baja · Recogida desde entrada`)
- **Additional Handling Check Card:**
  - Badge: `Review required` (`Revisión necesaria`)
  - Disclosures:
    - EN: `Local disposal acceptance and worker/vehicle capacity remain conditional.`
    - EN: `Customer describes condition; treatment or special disposal is not assumed.`
    - ES: `Eliminación local y capacidad de personal/vehículo sujetas a validación.`
    - ES: `El cliente describe el estado; no se presupone tratamiento especial.`
- **Actions:**
  - Primary CTA: `Review mattress removal intake` (`Revisar retiro de colchones`)
  - Secondary CTA: `See service categories   ›` (`Ver categorías de servicio   ›`)

---

### C. Screen 3: C18-R-E Retail Missing Order (Error State)

- **Step Chip:**
  - EN: `W02 · SERVICE DISCOVERY & INTAKE / C18-R`
  - ES: `W02 · SERVICIOS Y RECEPCIÓN / C18-R`
- **Heading:**
  - EN: Title: `Order information needed` | Subtitle: `Manual retailer collection requires enough details for authorized pickup.`
  - ES: Title: `Se necesitan datos del pedido` | Subtitle: `La recogida manual requiere datos suficientes para retirar el pedido autorizado.`
- **Validation Card:**
  - Retailer: `Home Depot` (`Home Depot`)
  - Order number: `Missing — required` (`Falta información obligatoria`)
  - Store location: `Phoenix, AZ · store branch not selected` (`Phoenix, AZ · Sucursal no seleccionada`)
- **Cannot Proceed Yet Card:**
  - Title: `Cannot proceed yet` (`Aún no se puede continuar`)
  - Badge: `Action required` (`Acción necesaria`) with Red Alert icon (`#EF4444`)
  - Guidance:
    - EN: `Enter the customer's store order identifier and confirm collection instructions.`
    - EN: `No store account integration or automatic order lookup is promised.`
    - ES: `Introduce el pedido de tienda y confirma instrucciones de recogida.`
    - ES: `No se promete integración con cuenta de tienda ni consulta automática.`
- **Actions:**
  - Primary CTA: `Edit retail details` (`Editar datos de tienda`) → Navigates back to `/retail-intake`
  - Secondary CTA: `Back to service selection   ›` (`Volver a elegir servicio   ›`) → Navigates to `/service-discovery`

---

### D. Screen 4: C19 Item Inventory

- **Step Chip:**
  - EN: `W02 · SERVICE DISCOVERY & INTAKE / C19`
  - ES: `W02 · SERVICIOS Y RECEPCIÓN / C19`
- **Heading:**
  - EN: Title: `Check your item list` | Subtitle: `Confirm manual descriptions before AI-assisted review and quote.`
  - ES: Title: `Revisa tu lista de objetos` | Subtitle: `Confirma descripciones antes de la revisión y cotización con IA.`
- **Confirmed Draft Quantities Card (with genuine photos):**
  1. `3-seat sofa` (`Sofá de tres plazas`): `Qty 1 · 82 × 35 × 34 in` (`Cant. 1 · 82 × 35 × 34 pulg.`) | `~125 lb` | Photo: `c18j-sofa.png`
  2. `Queen mattresses` (`Colchones tamaño queen`): `Qty 2 · 80 × 60 × 11 in each` (`Cant. 2 · 80 × 60 × 11 pulg. c/u`) | `~70 lb each` (`~70 lb cada uno`) | Photo: `c18j-mattresses.png`
  3. `Dining table` (`Mesa de comedor`): `Qty 1 · 60 × 36 × 30 in` (`Cant. 1 · 60 × 36 × 30 pulg.`) | `~85 lb` | Photo: `c18j-table.png`
- **Summary Card:**
  - Title: `Summary` (`Resumen`)
  - Pieces: `3 item types · 4 individual pieces` (`3 tipos de objetos · 4 piezas`)
  - Disclosures:
    - EN: `All dimensions and weights are customer estimates only.`
    - EN: `AI may suggest categories in W03; it cannot override confirmed corrections.`
    - ES: `Todas las dimensiones y pesos son estimaciones del cliente.`
    - ES: `La IA puede sugerir categorías en W03, sin reemplazar correcciones confirmadas.`
- **Actions:**
  - Primary CTA: `Continue to item photos` (`Continuar a fotos de objetos`) → notice for C19-P
  - Secondary 1: `Correct item measurements   ›` (`Corregir medidas del objeto   ›`) → notice for C19-E
  - Secondary 2: `Add another item   ›` (`Añadir otro objeto   ›`) → notice for C19-A
  - Secondary 3: `Incomplete measurement example   ›` (`Ejemplo de medidas incompletas   ›`) → notice for C19-V
