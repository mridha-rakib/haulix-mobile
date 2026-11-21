# HAULIX Customer Mobile App — Phase 03.44

## Map English & Spanish Localization Audit (P1-I18N-01)

### 1. Audit Scope

- **Target:** `apps/customer/src/components/map/HaulixDispatchMap.tsx`
- **Issue:** Hardcoded English strings previously present in map overlays, badges, tooltips, and accessibility labels.

---

### 2. Localized Key Inventory (`c32Map` Namespace)

| Key Name             | English Translation (`en.ts`)                      | Spanish Translation (`es.ts`)                         | Usage Location                           |
| :------------------- | :------------------------------------------------- | :---------------------------------------------------- | :--------------------------------------- |
| `searchingBadge`     | `"RADAR ACTIVE · DISPATCH SEARCHING"`              | `"RADAR ACTIVO · BÚSQUEDA DE DESPACHO"`               | Top floating capsule in `searching` mode |
| `matchedBadge`       | `"DRIVER MATCHED · EN ROUTE SOON"`                 | `"CONDUCTOR ASIGNADO · EN CAMINO PRONTO"`             | Top floating capsule in `matched` mode   |
| `crewEnRouteBadge`   | `"CREW EN ROUTE · {{minutes}} MIN ({{location}})"` | `"EQUIPO EN CAMINO · {{minutes}} MIN ({{location}})"` | Top floating capsule in `en_route` mode  |
| `recenterNotice`     | `"Camera centered on route"`                       | `"Cámara centrada en la ruta"`                        | Recenter toast notification              |
| `zoomInA11y`         | `"Zoom In"`                                        | `"Acercar mapa"`                                      | Floating zoom pill plus button           |
| `zoomOutA11y`        | `"Zoom Out"`                                       | `"Alejar mapa"`                                       | Floating zoom pill minus button          |
| `recenterA11y`       | `"Recenter Map Viewport"`                          | `"Recentrar mapa"`                                    | Floating recenter crosshair button       |
| `pickupLabelDefault` | `"Pickup · Phoenix, AZ"`                           | `"Recogida · Phoenix, AZ"`                            | Default location label                   |
| `mapA11yDescription` | `"Interactive dispatch tracking map"`              | `"Mapa interactivo de seguimiento de despacho"`       | Root container accessible description    |

---

### 3. Verification Test Evidence

Verified by `@haulix/i18n` Jest suite (34/34 passed) and `@haulix/customer` unit test:

```
√ verifies C32 Map Dedicated English and Spanish localization keys (1 ms)
```
Result: **Zero hardcoded English strings remain in `HaulixDispatchMap.tsx`.**
