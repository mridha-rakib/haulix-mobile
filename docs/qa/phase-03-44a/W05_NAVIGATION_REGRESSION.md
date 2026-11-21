# HAULIX Customer Mobile App — Phase 03.44A

## W05 Navigation & State Machine Regression Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.44A  
**SCOPE:** End-to-End Route Continuity & Demonstration State Safety

---

### Navigation Route Flow Verification

```
[W04 Booking Recorded / ASAP Request]
                 │
                 ▼
[C32-A: /searching-for-driver] ──(Simulate Match)──► [C32-B: /driver-matched]
                 │                                            │
                 │ (Cancellation Link)                        │ (Confirm & Track)
                 ▼                                            ▼
   [C32-D: /cancellation-windows] ◄──(Terms Link)── [C32-C: /crew-tracking]
                 │                                            │
                 └──────(Keep Booking / Contextual Back)──────┘
```

### Route Integrity Checks

| Navigation Action   | Origin Screen            | Destination Screen      | Parameter Preserved           | Hardware Back Behavior   | Status       |
| :------------------ | :----------------------- | :---------------------- | :---------------------------- | :----------------------- | :----------- |
| **W04 Handoff**     | `/asap-request-recorded` | `/searching-for-driver` | `bookingRef`, `previewLocale` | Exits to dashboard       | **VERIFIED** |
| **Dispatch Match**  | `/searching-for-driver`  | `/driver-matched`       | `previewLocale`               | Returns to search        | **VERIFIED** |
| **Start Tracking**  | `/driver-matched`        | `/crew-tracking`        | `previewLocale`               | Returns to match         | **VERIFIED** |
| **View Policy**     | `/crew-tracking`         | `/cancellation-windows` | `fromPhase: "en_route"`       | Returns to crew-tracking | **VERIFIED** |
| **Keep Booking**    | `/cancellation-windows`  | Origin screen           | `previewLocale`               | Returns to origin phase  | **VERIFIED** |
| **Fee-Free Cancel** | `/cancellation-windows`  | Dialog / Reset          | Demonstrates $0 fee           | Returns to safe state    | **VERIFIED** |
