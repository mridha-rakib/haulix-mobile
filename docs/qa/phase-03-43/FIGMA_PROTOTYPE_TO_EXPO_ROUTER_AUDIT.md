# HAULIX Customer Mobile App — Phase 03.43

## Figma Prototype to Expo Router Audit (W05 Dispatch)

### 1. Handoff Flow Diagram

```mermaid
flowchart TD
  subgraph W04_Outcome["W04 Booking Outcome Demonstration"]
    C31A["C31-A: ASAP Request Recorded<br/>(/asap-request-recorded)"]
    C31S["C31-S: Booking Recorded<br/>(/booking-recorded)"]
  end

  subgraph W05_Dispatch["W05 Dispatch & Tracking (Phase 03.43)"]
    C32A["C32-A: Searching for Driver<br/>(/searching-for-driver)"]
    C32B["C32-B: Driver Matched<br/>(/driver-matched)"]
    C32C["C32-C: Crew Assigned & Tracking<br/>(/crew-tracking)"]
    C32D["C32-D: Cancellation Windows<br/>(/cancellation-windows)"]
  end

  C31A -->|"Check live dispatch queue"| C32A
  C31S -->|"View live dispatch overview"| C32A
  C32A -->|"Simulate Driver Match Found"| C32B
  C32B -->|"Confirm & Track Live Arrival"| C32C
  C32B -->|"View Cancellation Terms"| C32D
  C32C -->|"Cancellation & Exception Options"| C32D
  C32D -->|"Keep Booking Active"| C32C
  C32A -->|"Cancel Search (Fee-Free)"| C32D
  C32D -->|"Fee-Free Exit Confirmation"| C31A
```

---

### 2. Route Manifest & Parameter Propagation

| Screen ID | Expo Route              | Screen Title (EN / ES)                                             | Inbound Navigation                                           | Primary Outbound Navigation | Secondary Outbound Navigation   |
| :-------- | :---------------------- | :----------------------------------------------------------------- | :----------------------------------------------------------- | :-------------------------- | :------------------------------ |
| **C32-A** | `/searching-for-driver` | Searching for Driver / Buscando conductor                          | `/asap-request-recorded`, `/booking-recorded`                | `/driver-matched`           | `/cancellation-windows`         |
| **C32-B** | `/driver-matched`       | Driver matched! / ¡Conductor encontrado!                           | `/searching-for-driver`                                      | `/crew-tracking`            | `/cancellation-windows`         |
| **C32-C** | `/crew-tracking`        | Crew assigned & en route / Equipo asignado y en camino             | `/driver-matched`                                            | Detailed Summary Modal      | `/cancellation-windows`         |
| **C32-D** | `/cancellation-windows` | Cancellation windows & policy / Ventanas y política de cancelación | `/crew-tracking`, `/driver-matched`, `/searching-for-driver` | Return to `/crew-tracking`  | Fee-Free Exit / Support Contact |

---

### 3. Hardware Back Button & Fallback Handling

- **`BackHandler` integration:** Implemented on every screen with custom `useCallback` back handler.
- **Deep-linking resilience:** If stack history is empty (`!router.canGoBack()`), back actions fall back deterministically to the natural upstream step rather than crashing or exiting the app.
- **`previewLocale` preservation:** All navigation transitions forward and backward pass `{ previewLocale: currentLocale }` to maintain user locale selection.
