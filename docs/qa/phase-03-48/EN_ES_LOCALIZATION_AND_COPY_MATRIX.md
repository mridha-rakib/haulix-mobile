# Phase 03.48 — Bilingual Localization & Copy Matrix

**Phase:** Phase 03.48 — Workflow 05 Batch 4  
**Source Figma:** `meiXxwUNJaDo0a3mhcHBXv`  
**Locales:** English (`en`), Spanish (`es`)

---

## 1. ACCEPT_PENDING (`/driver-offer-pending`)

- **Figma Frames:** EN `844:5066`, ES `844:7216`

| Field / Key      | English (`en.ts`)                                                                            | Spanish (`es.ts`)                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `tagline`        | "Dispatch In Progress"                                                                       | "Despacho en Progreso"                                                                        |
| `badgeOffer`     | "DRIVER OFFER EXTENDED"                                                                      | "OFERTA EXTENDIDA AL CONDUCTOR"                                                               |
| `title`          | "Awaiting Driver Acceptance"                                                                 | "Esperando Aceptación del Conductor"                                                          |
| `subtitle`       | "A qualified Pro Mover driver has received your booking offer and has 45 seconds to accept." | "Un conductor profesional calificado ha recibido tu oferta y tiene 45 segundos para aceptar." |
| `etaLabel`       | "Estimated Arrival"                                                                          | "Llegada Estimada"                                                                            |
| `etaValue`       | "14 mins"                                                                                    | "14 mins"                                                                                     |
| `distanceLabel`  | "Driver Distance"                                                                            | "Distancia del Conductor"                                                                     |
| `distanceValue`  | "3.2 miles away"                                                                             | "A 3.2 millas"                                                                                |
| `vehicleLabel`   | "Assigned Vehicle Type"                                                                      | "Tipo de Vehículo Asignado"                                                                   |
| `vehicleValue`   | "Box Truck (16 ft)"                                                                          | "Camión de Caja (16 pies)"                                                                    |
| `bookingIdLabel` | "Booking Reference"                                                                          | "Referencia de Reserva"                                                                       |
| `ctaAcknowledge` | "View Driver Details"                                                                        | "Ver Detalles del Conductor"                                                                  |

---

## 2. DRIVER_DETAILS (`/driver-profile-details`)

- **Figma Frames:** EN `844:5284`, ES `844:7434`

| Field / Key            | English (`en.ts`)               | Spanish (`es.ts`)                    |
| ---------------------- | ------------------------------- | ------------------------------------ |
| `tagline`              | "Verified Driver Profile"       | "Perfil de Conductor Verificado"     |
| `badgeVerified`        | "HAULIX VERIFIED PRO"           | "PROFESIONAL VERIFICADO HAULIX"      |
| `title`                | "Your Assigned Driver"          | "Tu Conductor Asignado"              |
| `driverName`           | "Marcus Vance"                  | "Marcus Vance"                       |
| `driverRating`         | "4.96 (418 moves)"              | "4.96 (418 traslados)"               |
| `driverVehicle`        | "Ford F-150 SuperCrew · Silver" | "Ford F-150 SuperCrew · Plata"       |
| `licensePlateLabel`    | "License Plate"                 | "Placa de Matrícula"                 |
| `licensePlateValue`    | "7XYZ892"                       | "7XYZ892"                            |
| `backgroundCheckLabel` | "Background Check"              | "Antecedentes Verificados"           |
| `backgroundCheckValue` | "Passed & Verified"             | "Aprobado y Verificado"              |
| `equipmentLabel`       | "Included Equipment"            | "Equipo Incluido"                    |
| `equipmentValue`       | "Dollies, Straps, Blankets"     | "Carretillas, Correas, Mantas"       |
| `ctaContinue`          | "Proceed to Team Confirmation"  | "Continuar a Confirmación de Equipo" |

---

## 3. HELPER_PENDING (`/helper-matching`)

- **Figma Frames:** EN `844:5403`, ES `844:7553`

| Field / Key          | English (`en.ts`)                                                                                      | Spanish (`es.ts`)                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `tagline`            | "Crew Assembly"                                                                                        | "Asignación de Tripulación"                                                                             |
| `badgeHelper`        | "HELPER MATCHING IN PROGRESS"                                                                          | "EMPAREJAMIENTO DE AYUDANTE"                                                                            |
| `title`              | "Assigning Move Assistant"                                                                             | "Asignando Asistente de Traslado"                                                                       |
| `subtitle`           | "Your primary driver is confirmed. We are pairing a verified secondary helper for heavy item lifting." | "Tu conductor principal está confirmado. Estamos emparejando un ayudante verificado para carga pesada." |
| `teamStatusLabel`    | "Team Status"                                                                                          | "Estado del Equipo"                                                                                     |
| `driverStatus`       | "Primary Driver Confirmed"                                                                             | "Conductor Principal Confirmado"                                                                        |
| `helperStatus`       | "Matching Secondary Helper..."                                                                         | "Buscando Segundo Ayudante..."                                                                          |
| `estimatedCrewLabel` | "Estimated Crew ETA"                                                                                   | "Tiempo Estimado del Equipo"                                                                            |
| `estimatedCrewValue` | "On schedule · 18-22 mins"                                                                             | "A tiempo · 18-22 mins"                                                                                 |
| `ctaWait`            | "View Confirmed Driver"                                                                                | "Ver Conductor Confirmado"                                                                              |
| `ctaCancelHelper`    | "Request Replacement Search"                                                                           | "Solicitar Búsqueda de Reemplazo"                                                                       |

---

## 4. RESTART (`/dispatch-retry`)

- **Figma Frames:** EN `844:5641`, ES `844:7791`

| Field / Key             | English (`en.ts`)                                                                                         | Spanish (`es.ts`)                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `tagline`               | "Dispatch Reassignment"                                                                                   | "Reasignación de Despacho"                                                                                                            |
| `badgeRetry`            | "SEARCHING ALTERNATIVE DRIVERS"                                                                           | "BUSCANDO CONDUCTORES ALTERNOS"                                                                                                       |
| `title`                 | "Finding a Replacement Driver"                                                                            | "Buscando Conductor de Reemplazo"                                                                                                     |
| `subtitle`              | "The previous candidate was unavailable. HAULIX is instantly querying the next tier of certified movers." | "El candidato anterior no estuvo disponible. HAULIX está consultando de inmediato el siguiente nivel de transportistas certificados." |
| `retryTierLabel`        | "Dispatch Queue Tier"                                                                                     | "Nivel de Cola de Despacho"                                                                                                           |
| `retryTierValue`        | "Tier 2 (High Priority Mover Pool)"                                                                       | "Nivel 2 (Grupo de Alta Prioridad)"                                                                                                   |
| `reassignmentTimeLabel` | "Expected Reassignment"                                                                                   | "Reasignación Estimada"                                                                                                               |
| `reassignmentTimeValue` | "< 60 seconds"                                                                                            | "< 60 segundos"                                                                                                                       |
| `retentionLabel`        | "Booking Price Guarantee"                                                                                 | "Garantía de Precio de Reserva"                                                                                                       |
| `retentionValue`        | "Locked at $356.00 USD"                                                                                   | "Fijo en $356.00 USD"                                                                                                                 |
| `ctaRetry`              | "Review Next Candidate"                                                                                   | "Revisar Siguiente Candidato"                                                                                                         |
| `ctaFallback`           | "View Unassigned Options"                                                                                 | "Ver Opciones sin Asignar"                                                                                                            |
