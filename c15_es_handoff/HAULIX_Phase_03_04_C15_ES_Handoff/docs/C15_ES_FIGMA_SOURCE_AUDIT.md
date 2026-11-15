# C15 Spanish — verified Figma source audit

## Evidence and provenance

Authoritative Figma: `974:8843` (`C15-ES · Seleccionar servicio / W02 [LOCALIZACIÓN]`, 430 × 1791 px). Figma English counterpart: `382:126` (430 × 1791 px). Sources inspected via Figma design context, read-only node hierarchy and screenshot on 2026-11-15.

Source URL: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=974-8843

**This is a real dedicated C15 Spanish Figma screen**, unlike C01 Home Spanish which lacked a standalone Spanish counterpart. Exact strings below are directly verified.

### Major geometry (x/y relative to 430×1791 frame)

| Group                                                       |   X |    Y | Width | Height |
| ----------------------------------------------------------- | --: | ---: | ----: | -----: |
| Status bar (Figma illustration; use native Android in code) |  22 |   26 |   386 |     38 |
| Flow Header Start                                           |  22 |   81 |   386 |     60 |
| W02 indicator                                               |  22 |  158 |   386 |     33 |
| Heading                                                     |  22 |  208 |   386 |     98 |
| Booking context chip                                        |  22 |  323 |   386 |     39 |
| Service area                                                |  22 |  379 |   386 |    160 |
| Available services section                                  |  22 |  556 |   386 |    684 |
| Customer summary                                            |  22 | 1257 |   386 |    162 |
| Action group (four rows)                                    |  22 | 1436 |   386 |    257 |
| Footer                                                      |  22 | 1710 |   386 |     48 |

Each of the 7 service rows is 354×76 at 430px Figma width, with original lime SVG icon at 25×25 and a right chevron. Row group y offsets inside services section: 57, 146, 235, 324, 413, 502, 591. Action group contains 4 full-width 386×56 slots at offsets y=0,67,134,201, with inner primary button 52px height.

### Exact visible copy

- W02 · SERVICIOS Y SOLICITUD / C15
- ¿En qué podemos ayudarte?
- Elige el servicio autorizado que necesitas.
- SARAH MITCHELL · HX-DEMO-1027 _(static Figma demo fixture; see intentional dynamic data exception)_
- Zona de servicio
- Phoenix, Arizona · Zona inicial
- La cobertura en Arizona se valida antes de reservar
- Servicios disponibles
- Retiro de objetos — Retiro y eliminación de residuos no peligrosos
- Mudanzas — Transporte del origen al destino
- Retiro de muebles — Sofás, mesas y otros muebles
- Retiro de electrodomésticos — Retiro autorizado de electrodomésticos
- Retiro de colchones — Revisión de manejo y eliminación de colchones
- Limpieza de garaje — Fotos, acceso y revisión de contaminación
- Recogida en tienda — Recogida y entrega de pedidos
- Para Sarah Mitchell _(static Figma demo fixture)_
- Información del servicio
- Solicitud HX-DEMO-1027 · Retiro de objetos
- Aún no hay cotización ni cita confirmada.
- Elegir retiro de objetos
- Verificar zona de servicio ›
- Ver restricciones de ubicación ›
- ¿No ves tu servicio? Ver opciones ›
- SOLO DEMO · Sin reserva, tarifa ni pago confirmado
- SRS BK-01, SV-01, AI-12 · 430 px / desplazamiento vertical

Figma C15 Spanish Flow Header still reads **`We Haul It All.`** (English brand tagline). Do not claim it reads `Lo recogemos todo.` in this source.

### Intentional differences and constraints

- **Customer data conflict:** C15-ES static Figma screenshot uses Sarah Mitchell while the active app's Spanish C10 and locale-scoped demo fixture use Bryan Lopez. Runtime must use **Bryan Lopez or the current saved Spanish profile name** while preserving the exact Figma visual layout. Record this as an intentional data-identity deviation, not a translation error.
- **No bottom navbar** in C15-ES or C15-EN. Do not add one.
- **Seven services**, not eight. Home Assembly Add-on is excluded.
- **Native Android status bar**, not a drawn Figma 9:41 iOS status bar.
- Service-area region label is explanatory frontend demo copy and not real GPS/eligibility verification.
- Long Spanish content may require responsive multiline styles at 360dp. Avoid clipping, illegible font shrinking, overlays or infinite single-line text.
- Service rows in Figma link to future C18 screens, while action buttons link to future C15-S/C16/C16-F/C15-E. They must not be fabricated in Phase 03.04.
