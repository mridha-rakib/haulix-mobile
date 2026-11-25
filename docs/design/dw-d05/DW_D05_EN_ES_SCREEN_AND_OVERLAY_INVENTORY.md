# HAULIX Driver & Worker Mobile App — Phase DW-D05
# Bilingual Screen & Supporting Overlay Inventory (English & Spanish)

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Audited Scope:** 6 Canonical Core States (12 Variants) + 2 Supporting Overlays (4 Variants)

---

## 1. Core Screen Inventory Table (6 Canonical States / 12 Variants)

| State ID | English Screen Name | English Node ID | Spanish Screen Name | Spanish Node ID | Dimensions | Screenshot Evidence File (PNG) |
|:---:|:---|:---:|:---|:---:|:---:|:---|
| **DW17** | DW17 · Active job | `1086:405` | DW17 · Active job · iOS ES | `1088:734` | 430 × 932 px | `dw17-active-job-en-1086-405.png`<br>`dw17-active-job-es-1088-734.png` |
| **DW18** | DW18 · Job messages | `1086:459` | DW18 · Job messages · iOS ES | `1088:788` | 430 × 932 px | `dw18-job-messages-en-1086-459.png`<br>`dw18-job-messages-es-1088-788.png` |
| **DW34** | DW34 · Connection interrupted | `1086:1188` | DW34 · Connection interrupted · iOS ES | `1088:1517` | 430 × 932 px | `dw34-connection-interrupted-en-1086-1188.png`<br>`dw34-connection-interrupted-es-1088-1517.png` |
| **DW47** | DW47 · Message status · EN · UX Gap Completion | `1301:837` | DW47 · Estado del mensaje · ES · UX Gap Completion | `1301:2079` | 430 × 932 px | `dw47-message-status-en-1301-837.png`<br>`dw47-message-status-es-1301-2079.png` |
| **DW50** | DW50 · Location and network · EN · UX Gap Completion | `1301:1097` | DW50 · Ubicación y red · ES · UX Gap Completion | `1301:2339` | 430 × 932 px | `dw50-location-connection-en-1301-1097.png`<br>`dw50-location-connection-es-1301-2339.png` |
| **DW62** | DW62 · Helper active job · EN · Onboarding Helper Completion | `1309:954` | DW62 · Trabajo activo del ayudante · ES · Onboarding Helper Completion | `1309:1677` | 430 × 932 px | `dw62-helper-active-job-en-1309-954.png`<br>`dw62-helper-active-job-es-1309-1677.png` |

---

## 2. Supporting Overlay Inventory Table (2 Overlay Types / 4 Variants)

| Overlay ID | Functional Purpose | EN Node ID | EN Frame Name | ES Node ID | ES Frame Name | Dimensions | Screenshot Evidence File (PNG) |
|:---:|:---|:---:|:---|:---:|:---|:---:|:---|
| **OV-06** | Direct Call / Voice Communications | `1305:706` | `QA Overlay / call-en` | `1305:716` | `QA Overlay / call-es` | 430 × 218 px | `ov-call-preview-en-1305-706.png`<br>`ov-call-preview-es-1305-716.png` |
| **OV-07** | Live Location Sharing Permissions | `1305:726` | `QA Overlay / location-en` | `1305:735` | `QA Overlay / location-es` | 430 × 233 (EN) / 430 × 218 (ES) | `ov-location-preview-en-1305-726.png`<br>`ov-location-preview-es-1305-735.png` |

---

## 3. Bilingual Copy & Localization Fidelity

1. **Map & Transit Copy:**
   - EN: `EN ROUTE` / `NOT LIVE GPS` / `Arrived at pickup`
   - ES: `EN CAMINO` / `GPS NO ACTIVO` / `Llegué al punto de recolección`
2. **Helper Assignment Copy:**
   - EN: `Helper assigned` / `Confirm my arrival`
   - ES: `Ayudante asignado` / `Confirmar mi llegada`
3. **Messaging & Status Copy:**
   - EN: `Message queued for delivery` / `SUBMITTED / PENDING NETWORK CONFIRMATION`
   - ES: `Mensaje en cola para entrega` / `ENVIADO / PENDIENTE DE CONFIRMACIÓN DE RED`
4. **Offline Resilience Copy:**
   - EN: `Connection interrupted` / `Retry connection`
   - ES: `Conexión interrumpida` / `Reintentar conexión`
