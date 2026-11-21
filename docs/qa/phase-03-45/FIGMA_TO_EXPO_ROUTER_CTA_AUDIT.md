# HAULIX Customer Mobile App — Phase 03.45

## Figma to Expo Router CTA & Interactive Navigation Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.45  
**WORKFLOW:** W05 Dispatch & Assignment

---

### 1. Prototype Navigation Topology (Existing Verified Flow)

The verified interactive routing structure for W05 Dispatch & Assignment is shown below:

```mermaid
flowchart TD
  subgraph Predecessor_W04["W04 Booking Outcomes"]
    C31A["C31-A: ASAP Request Recorded<br/>(/asap-request-recorded)"]
    C31S["C31-S: Booking Recorded<br/>(/booking-recorded)"]
  end

  subgraph W05_Dispatch_Batch1["W05 Dispatch & Assignment (Implemented)"]
    C32A["C32-A: Searching for Driver<br/>(/searching-for-driver)"]
    C32B["C32-B: Driver Matched<br/>(/driver-matched)"]
    C32C["C32-C: Crew Assigned & Tracking<br/>(/crew-tracking)"]
    C32D["C32-D: Cancellation Windows<br/>(/cancellation-windows)"]
  end

  subgraph Candidate_Batch2["W05 Candidate Batch 2 (Source Blocked)"]
    C33A["C33-A: Search Timeout<br/>(Awaiting Figma PNG)"]
    C33B["C33-B: Driver Delay<br/>(Awaiting Figma PNG)"]
    C33C["C33-C: Driver Reassignment<br/>(Awaiting Figma PNG)"]
    C33D["C33-D: Cancellation Confirmed<br/>(Awaiting Figma PNG)"]
  end

  C31A -->|"Check live dispatch queue"| C32A
  C31S -->|"View live dispatch overview"| C32A
  C32A -->|"Driver Match Found"| C32B
  C32B -->|"Confirm & Track Live Arrival"| C32C
  C32B -->|"View Cancellation Terms"| C32D
  C32C -->|"Cancellation & Exception Options"| C32D
  C32D -->|"Keep Booking Active"| C32C
  C32A -->|"Cancel Search (Fee-Free)"| C32D
```

---

### 2. Comprehensive CTA Action Register

| Screen    | Interactive Element                     | Trigger / Gesture | Target Expo Route                                | State Effect            | Locale Preserved      | Status       |
| :-------- | :-------------------------------------- | :---------------- | :----------------------------------------------- | :---------------------- | :-------------------- | :----------- |
| **C32-A** | Header Back Arrow                       | Press             | Stack pop / fallback to `/asap-request-recorded` | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-A** | Match Simulation CTA                    | Press             | `/driver-matched`                                | Matches Marcus Vance    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-A** | Cancel Search CTA                       | Press             | `/cancellation-windows`                          | Navigates to terms      | Yes (`previewLocale`) | **VERIFIED** |
| **C32-B** | Header Back Arrow                       | Press             | Stack pop / fallback to `/searching-for-driver`  | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-B** | Primary CTA (`Confirm & Track`)         | Press             | `/crew-tracking`                                 | Status -> Crew en route | Yes (`previewLocale`) | **VERIFIED** |
| **C32-B** | Secondary CTA (`View Cancellation`)     | Press             | `/cancellation-windows`                          | Navigates to terms      | Yes (`previewLocale`) | **VERIFIED** |
| **C32-B** | Driver Call Icon                        | Press             | Toast alert (`Simulated call connected`)         | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-B** | Driver Chat Icon                        | Press             | Toast alert (`Simulated chat opened`)            | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-C** | Header Back Arrow                       | Press             | Stack pop / fallback to `/driver-matched`        | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-C** | Primary CTA (`View Detailed Summary`)   | Press             | Modal summary toast                              | Displays active summary | Yes (`previewLocale`) | **VERIFIED** |
| **C32-C** | Secondary CTA (`Cancellation Options`)  | Press             | `/cancellation-windows`                          | Navigates to terms      | Yes (`previewLocale`) | **VERIFIED** |
| **C32-C** | Quick Action Call                       | Press             | Simulated call toast                             | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-C** | Quick Action Chat                       | Press             | Simulated chat toast                             | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-C** | Quick Action Share                      | Press             | Simulated share toast                            | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-D** | Header Back Arrow                       | Press             | Stack pop / fallback to `/crew-tracking`         | None                    | Yes (`previewLocale`) | **VERIFIED** |
| **C32-D** | Primary CTA (`Keep Booking Active`)     | Press             | `/crew-tracking`                                 | Returns to live map     | Yes (`previewLocale`) | **VERIFIED** |
| **C32-D** | Secondary CTA (`Confirm Fee-Free Exit`) | Press             | `/asap-request-recorded`                         | Demonstrates zero fee   | Yes (`previewLocale`) | **VERIFIED** |

---

### 3. Deep-Link & Android Hardware Back Safety

All routes implement `BackHandler` listeners with deterministic fallbacks when `router.canGoBack()` returns false. No empty stack unhandled transitions exist.
