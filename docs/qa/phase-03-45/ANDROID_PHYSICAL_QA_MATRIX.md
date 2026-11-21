# HAULIX Customer Mobile App — Phase 03.45

## Android Physical Hardware QA Matrix — Batch 2

**TARGET HARDWARE:** Realme Note 60 (`RMX3930`, Serial: `0B04731X200003BB`, Android 15)  
**SCREEN RESOLUTION:** 720 × 1600 px (20:9 aspect ratio, 320 dpi / 2.0 density)  
**METRO BUNDLER:** Port 8085 via USB reverse `tcp:8085 tcp:8085` (Background Task `task-14054`)  
**EVIDENCE LOCATION:** `docs/qa/phase-03-45/android/`

---

### 1. Physical Device Test Execution Matrix (8 Batch 2 Screen Variants)

All eight Batch 2 canonical screen variants were navigated on the physical Realme Note 60 device and framebuffer screenshots captured directly via ADB:

| Screen Identifier    | Screen Title                  | Route & Params                            | Locale | Screenshot File                                                            | Viewport      | Visual QA Status                                                                            |
| :------------------- | :---------------------------- | :---------------------------------------- | :----- | :------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------ |
| **NO_DRIVER (EN)**   | No driver available           | `/no-driver-available?previewLocale=en`   | `en`   | [`w05-en-no-driver-android.png`](android/w05-en-no-driver-android.png)     | 720 × 1600 px | **PASS** (Figma 844:6070 match, 50 mi radar map, fee-free recovery options)                 |
| **NO_DRIVER (ES)**   | No hay conductor disponible   | `/no-driver-available?previewLocale=es`   | `es`   | [`w05-es-no-driver-android.png`](android/w05-es-no-driver-android.png)     | 720 × 1600 px | **PASS** (Figma 844:8220 match, 100% Spanish text, badge `SIN COINCIDENCIA · 50 MI`)        |
| **DRIVER_LATE (EN)** | Driver arrival update         | `/driver-arrival-update?previewLocale=en` | `en`   | [`w05-en-driver-late-android.png`](android/w05-en-driver-late-android.png) | 720 × 1600 px | **PASS** (Figma 844:5859 match, Mike R. profile, delay telemetry, route polyline)           |
| **DRIVER_LATE (ES)** | Actualización de llegada      | `/driver-arrival-update?previewLocale=es` | `es`   | [`w05-es-driver-late-android.png`](android/w05-es-driver-late-android.png) | 720 × 1600 px | **PASS** (Figma 844:8009 match, badge `DEMORA DE LLEGADA`, translated vehicle specs)        |
| **REASSIGNED (EN)**  | Driver reassigned             | `/driver-reassigned?previewLocale=en`     | `en`   | [`w05-en-reassigned-android.png`](android/w05-en-reassigned-android.png)   | 720 × 1600 px | **PASS** (Figma 844:5740 match, Sarah L. avatar, replacement driver vehicle AZ 4ML-2308)    |
| **REASSIGNED (ES)**  | Conductor reasignado          | `/driver-reassigned?previewLocale=es`     | `es`   | [`w05-es-reassigned-android.png`](android/w05-es-reassigned-android.png)   | 720 × 1600 px | **PASS** (Figma 844:7890 match, badge `REASIGNADO`, Spanish crew summary)                   |
| **CANCELED (EN)**    | Request canceled without fee  | `/request-canceled?previewLocale=en`      | `en`   | [`w05-en-canceled-android.png`](android/w05-en-canceled-android.png)       | 720 × 1600 px | **PASS** (Figma 844:6254 match, badge `CANCELED · $0 FEE`, honest card hold release notice) |
| **CANCELED (ES)**    | Solicitud cancelada sin cargo | `/request-canceled?previewLocale=es`      | `es`   | [`w05-es-canceled-android.png`](android/w05-es-canceled-android.png)       | 720 × 1600 px | **PASS** (Figma 844:8404 match, badge `CANCELADA · CARGO $0`, re-schedule & demo CTAs)      |

---

### 2. Device Performance & Stability Findings

1. **Rendering Performance:** 60 fps fluid scroll on the Realme Note 60 hardware.
2. **Layout Invariants:**
   - Safe area top & bottom properly respected on native 20:9 aspect ratio (`720x1600`).
   - Zero horizontal overflow or text clipping across both English and Spanish.
   - Exact `$356.00` illustrative quote and 4-piece inventory representation verified.
