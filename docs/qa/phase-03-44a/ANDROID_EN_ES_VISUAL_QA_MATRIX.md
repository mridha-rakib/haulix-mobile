# HAULIX Customer Mobile App — Phase 03.44A

## Android EN/ES Visual QA Matrix

**TARGET HARDWARE:** Realme Note 60 (`RMX3930`, Serial: `0B04731X200003BB`, Android 15)  
**DISPLAY RESOLUTION:** 720 × 1600 px  
**BUNDLER:** Metro Bundler (port 8085 via USB reverse `tcp:8085 tcp:8085`)  
**EVIDENCE DIRECTORY:** `docs/qa/phase-03-44a/android/`

---

### Physical Android Verification Matrix (8 Screen Variants)

| Variant ID     | Screen Title                   | Locale         | Hardware File                                                                  | Resolution    | Visual QA Checks                                                                    | Status   |
| :------------- | :----------------------------- | :------------- | :----------------------------------------------------------------------------- | :------------ | :---------------------------------------------------------------------------------- | :------- |
| **C32-A (EN)** | Searching for Driver           | English (`en`) | [`c32a-en-searching-for-driver.png`](android/c32a-en-searching-for-driver.png) | 720 × 1600 px | Dark grid base, 3-tier radar pulses, pickup halo, floating zoom rail, ASAP tag      | **PASS** |
| **C32-A (ES)** | Buscando conductor             | Spanish (`es`) | [`c32a-es-buscando-conductor.png`](android/c32a-es-buscando-conductor.png)     | 720 × 1600 px | Spanish badge `RADAR ACTIVO · BÚSQUEDA DE DESPACHO`, translated cards, zero English | **PASS** |
| **C32-B (EN)** | Driver Matched                 | English (`en`) | [`c32b-en-driver-matched.png`](android/c32b-en-driver-matched.png)             | 720 × 1600 px | Marcus Vance card, vehicle plate, dashed preliminary route, van icon                | **PASS** |
| **C32-B (ES)** | Conductor asignado             | Spanish (`es`) | [`c32b-es-conductor-asignado.png`](android/c32b-es-conductor-asignado.png)     | 720 × 1600 px | Spanish badge `CONDUCTOR ASIGNADO · EN CAMINO PRONTO`, vehicle details translated   | **PASS** |
| **C32-C (EN)** | Crew Assigned & Tracking       | English (`en`) | [`c32c-en-crew-tracking.png`](android/c32c-en-crew-tracking.png)               | 720 × 1600 px | Glowing `#BAFF42` route polyline, van indicator, live ETA `11 MIN`, telemetry       | **PASS** |
| **C32-C (ES)** | Seguimiento de equipo asignado | Spanish (`es`) | [`c32c-es-seguimiento-equipo.png`](android/c32c-es-seguimiento-equipo.png)     | 720 × 1600 px | Spanish badge `EQUIPO EN CAMINO · 11 MIN (Phoenix, AZ)`, translated timeline steps  | **PASS** |
| **C32-D (EN)** | Cancellation Windows           | English (`en`) | [`c32d-en-cancellation-windows.png`](android/c32d-en-cancellation-windows.png) | 720 × 1600 px | 3-tier matrix, fee-free window, honest banking timeline disclosures ($0 fee)        | **PASS** |
| **C32-D (ES)** | Ventanas de cancelación        | Spanish (`es`) | [`c32d-es-ventanas-cancelacion.png`](android/c32d-es-ventanas-cancelacion.png) | 720 × 1600 px | Spanish 3-tier matrix, `100% Gratis · $0 Cargo`, honest banking disclaimer          | **PASS** |

---

### Hardware Display & Layout Audit Findings

1. **Aspect Ratio & Safe Areas:** The 20:9 native aspect ratio (`720x1600`) renders all content with proper top/bottom safe-area insets.
2. **Text Wrapping & Truncation:** Zero horizontal text clipping or truncation observed across both English and Spanish variants.
3. **Interactive Touch Targets:** Zoom buttons (38 × 36 px) and Recenter button (38 × 38 px) meet accessible tap requirements.
4. **Scrolling & Bottom Sheet:** ScrollView on `crew-tracking` and `cancellation-windows` glides smoothly without jitter.
