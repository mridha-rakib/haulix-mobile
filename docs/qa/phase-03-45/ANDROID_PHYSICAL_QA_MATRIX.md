# HAULIX Customer Mobile App — Phase 03.45

## Android Physical Hardware QA Matrix

**TARGET HARDWARE:** Realme Note 60 (`RMX3930`, Serial: `0B04731X200003BB`, Android 15)  
**SCREEN RESOLUTION:** 720 × 1600 px (20:9 aspect ratio, 320 dpi / 2.0 density)  
**METRO BUNDLER:** Port 8085 via USB reverse `tcp:8085 tcp:8085` (Background Task `task-14054`)  
**EVIDENCE LOCATION:** `docs/qa/phase-03-45/android/`

---

### 1. Physical Device Test Execution Matrix (8 Canonical Screen Variants)

| Screen ID            | Screen Title                   | Locale  | Hardware Screenshot                                                            | Resolution    | Visual QA Checks                                                    | Status              |
| :------------------- | :----------------------------- | :------ | :----------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------ | :------------------ |
| **C32-A (EN)**       | Searching for Driver           | English | [`c32a-en-searching-for-driver.png`](android/c32a-en-searching-for-driver.png) | 720 × 1600 px | Dark grid base, 3-tier radar pulses, pickup halo, zoom rail         | **PASS**            |
| **C32-A (ES)**       | Buscando conductor             | Spanish | [`c32a-es-buscando-conductor.png`](android/c32a-es-buscando-conductor.png)     | 720 × 1600 px | Spanish badge `RADAR ACTIVO`, translated cards, zero English        | **PASS**            |
| **C32-B (EN)**       | Driver Matched                 | English | [`c32b-en-driver-matched.png`](android/c32b-en-driver-matched.png)             | 720 × 1600 px | Marcus Vance card, vehicle plate, dashed route, van icon            | **PASS**            |
| **C32-B (ES)**       | Conductor asignado             | Spanish | [`c32b-es-conductor-asignado.png`](android/c32b-es-conductor-asignado.png)     | 720 × 1600 px | Spanish badge `CONDUCTOR ASIGNADO`, vehicle details translated      | **PASS**            |
| **C32-B (Scrolled)** | Conductor asignado (Scrolled)  | Spanish | [`c32b-es-scrolled.png`](android/c32b-es-scrolled.png)                         | 720 × 1600 px | Multi-line text wrapping on vehicle details, zero edge clipping     | **PASS (Verified)** |
| **C32-C (EN)**       | Crew Assigned & Tracking       | English | [`c32c-en-crew-tracking.png`](android/c32c-en-crew-tracking.png)               | 720 × 1600 px | Glowing `#BAFF42` polyline, van indicator, live ETA `11 MIN`        | **PASS**            |
| **C32-C (ES)**       | Seguimiento de equipo asignado | Spanish | [`c32c-es-seguimiento-equipo.png`](android/c32c-es-seguimiento-equipo.png)     | 720 × 1600 px | Spanish badge `EQUIPO EN CAMINO`, timeline steps translated         | **PASS**            |
| **C32-C (Bottom)**   | Seguimiento de equipo (Bottom) | Spanish | [`c32c-es-bottom.png`](android/c32c-es-bottom.png)                             | 720 × 1600 px | Service summary card, items wrapped, hold amount formatted          | **PASS (Verified)** |
| **C32-D (EN)**       | Cancellation Windows           | English | [`c32d-en-cancellation-windows.png`](android/c32d-en-cancellation-windows.png) | 720 × 1600 px | 3-tier matrix, fee-free window, honest banking disclosures          | **PASS**            |
| **C32-D (ES)**       | Ventanas de cancelación        | Spanish | [`c32d-es-ventanas-cancelacion.png`](android/c32d-es-ventanas-cancelacion.png) | 720 × 1600 px | Spanish 3-tier matrix, `100% Gratis · $0 Cargo`, banking disclaimer | **PASS**            |

---

### 2. Device Performance & Stability Findings

1. **Frame Stability:** Smooth 60 fps rendering during map zoom/recenter interactions and bottom-sheet scrolling.
2. **Touch Targets:** All interactive touch targets exceed 38 × 36 px with explicit accessibility labels.
3. **No Memory Leaks / ANR:** App remains responsive across all screens with zero crashes or runtime exceptions.
