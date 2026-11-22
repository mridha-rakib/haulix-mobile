# Phase 03.48 — W05 Batch 4 Canonical Spec & State Matrix

**Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Workflow:** Workflow 05 — Dispatch & Assignment  
**Cumulative W05 Coverage:** 16 / 20 canonical states implemented (80.0%)  
**Phase Status:** Batch 4 Completed (4 Canonical States, 8 Bilingual Variants)

---

## 1. Batch 4 Canonical State Inventory

| #     | Canonical State  | Route                     | Figma EN Frame | Figma ES Frame | Map Label Badge                                | Progress Node                  | Primary CTA Action                      | Secondary CTA Action                         |
| ----- | ---------------- | ------------------------- | -------------- | -------------- | ---------------------------------------------- | ------------------------------ | --------------------------------------- | -------------------------------------------- |
| **1** | `ACCEPT_PENDING` | `/driver-offer-pending`   | `844:5066`     | `844:7216`     | "Awaiting acceptance" / "Esperando aceptación" | Node 2 (Dispatch active)       | Continue (`/driver-profile-details`)    | Back / Dismiss                               |
| **2** | `DRIVER_DETAILS` | `/driver-profile-details` | `844:5284`     | `844:7434`     | "Driver details" / "Detalles del conductor"    | Node 3 (Driver active)         | Continue (`/helper-matching`)           | Back / Close                                 |
| **3** | `HELPER_PENDING` | `/helper-matching`        | `844:5403`     | `844:7553`     | "Helper pending" / "Ayudante pendiente"        | Node 3 (Driver & Helper team)  | View Matched Driver (`/driver-matched`) | Request Alternative (`/dispatch-retry`)      |
| **4** | `RESTART`        | `/dispatch-retry`         | `844:5641`     | `844:7791`     | "Finding replacement" / "Buscando reemplazo"   | Node 2 (Dispatch retry active) | Retry Now (`/driver-profile-details`)   | No Drivers Fallback (`/no-driver-available`) |

---

## 2. Full W05 Cumulative Inventory (16 of 20 States Completed)

| State # | Canonical State Key                                             | Route                      | Implemented Phase         |
| ------- | --------------------------------------------------------------- | -------------------------- | ------------------------- |
| 01      | `DISPATCH_LOOKING`                                              | `/dispatch-searching`      | Phase 03.46 (Batch 1)     |
| 02      | `MATCHED_DRIVER`                                                | `/driver-matched`          | Phase 03.46 (Batch 1)     |
| 03      | `EN_ROUTE`                                                      | `/driver-en-route`         | Phase 03.46 (Batch 1)     |
| 04      | `ARRIVED`                                                       | `/driver-arrived`          | Phase 03.46 (Batch 1)     |
| 05      | `TIMEOUT`                                                       | `/dispatch-timeout`        | Phase 03.47 (Batch 2)     |
| 06      | `NO_DRIVER`                                                     | `/no-driver-available`     | Phase 03.47 (Batch 2)     |
| 07      | `SCHEDULED_HOLD`                                                | `/scheduled-hold`          | Phase 03.47 (Batch 2)     |
| 08      | `PREPARING`                                                     | `/order-preparing`         | Phase 03.47 (Batch 2)     |
| 09      | `EXPANDED_QUEUE`                                                | `/dispatch-expanded-queue` | Phase 03.47B (Batch 3)    |
| 10      | `MULTI_DRIVER`                                                  | `/multi-driver-candidates` | Phase 03.47B (Batch 3)    |
| 11      | `DRIVER_DECLINED`                                               | `/driver-declined`         | Phase 03.47B (Batch 3)    |
| 12      | `SURGE_NOTICE`                                                  | `/dispatch-surge-notice`   | Phase 03.47B (Batch 3)    |
| 13      | `ACCEPT_PENDING`                                                | `/driver-offer-pending`    | **Phase 03.48 (Batch 4)** |
| 14      | `DRIVER_DETAILS`                                                | `/driver-profile-details`  | **Phase 03.48 (Batch 4)** |
| 15      | `HELPER_PENDING`                                                | `/helper-matching`         | **Phase 03.48 (Batch 4)** |
| 16      | `RESTART`                                                       | `/dispatch-retry`          | **Phase 03.48 (Batch 4)** |
| --      | *Remaining 4 States (NO_SHOW, RESCHEDULE, SUPPORT, W06_BRIDGE)* | _Reserved for Phase 03.49_ | _Pending_                 |

---

## 3. Visual & Component Architectural Features

1. **`W05ProgressTracker` Component:**
   - 5-step canonical tracker: `Booked` -> `Dispatch` -> `Driver` -> `Arrival` -> `Service`.
   - Supports active state highlights, connecting progress lines, pulsating active node, and localized labels in EN (`Booked`, `Dispatch`, `Driver`, `Arrival`, `Service`) and ES (`Reservado`, `Despacho`, `Conductor`, `Llegada`, `Servicio`).

2. **`HaulixDispatchMap` Dynamic Map Labels:**
   - Added `mapBadgeLabel` prop to render accurate floating Figma status chips across dark-mode satellite/vector dispatch map canvases.

3. **360dp Logical Width Resilience:**
   - Strict `flexShrink: 1, minWidth: 0` constraints applied across all card label rows and badge groups to prevent clipping, overlapping, or collision on compact Android viewports.
