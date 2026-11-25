# DW-D06: Active Service and Milestone Specification

## 1. Scope & Objective

This document defines the operational architecture, milestone lifecycle, server-authoritative status transitions, and on-site labor tracking for the HAULIX Driver/Worker Mobile App during the active service phase (`DW19 · On-site job progress` and `DW63 · Helper on-site progress`).

---

## 2. On-Site Milestone Sequence (`DW19`)

Primary Driver active service is governed by a strictly linear, server-validated milestone progression:

```
[ ARRIVED AT PICKUP ] 
         │ (Geofence + Timestamp verification)
         ▼
[ WORK STARTED ] 
         │ (Labor commencement / Loading initiated)
         ▼
[ SERVICE IN PROGRESS ] 
         │ (Vehicle loaded / Transit to Drop-off / Unloading)
         ▼
[ READY FOR COMPLETION ] 
         │ (All items accounted for / Handoff to Evidence Capture)
         ▼
[ DW21 · COMPLETION EVIDENCE ]
```

### Critical Separation: Arrival vs. Service Commencement
- **Arrival (`ARRIVED_AT_PICKUP`):** Occurs when the driver reaches the designated pickup coordinates (`DW17` ➔ `DW19`).
- **Service Commencement (`WORK_STARTED`):** Represents the actual physical initiation of labor.
- **Canvas Disclaimer (`1086:552`):** `Server-confirmed transitions: Status changes require valid job assignment and server approval. Times are recorded by the system; not controlled by this preview.`
- **Clarification on Start PIN / Checklist Claims:** No 4-digit PIN form or interactive loading checklist exists on the canonical `DW19` design canvas. Service start is triggered via direct driver action verified by server geofence and timestamp authority.

---

## 3. Dedicated Helper Labor Progress (`DW63`)

Helper on-site progress is tracked independently from the Primary Driver:
- **Arrival Independence:** Helper arrival is recorded independently by the server upon scanning or tapping `Confirm my arrival` on `DW62`.
- **Assigned Tasks Section (`1309:1137`):** Displays allocated responsibilities (e.g., `Furniture removal / loading assistance`).
- **Safety Confirmation (`1309:1140`):** Reminds worker to follow job safety rules, use proper lifting technique, and adhere to dispatch guidelines.
- **No Unilateral Completion Rule (`1309:1143`):** Helper cannot mark the overall booking complete or release payment.
- **Evidence Handoff:** CTA `Capture my work evidence` (`1309:1145` EN / `1309:1836` ES) routes directly to `DW64 · Helper work evidence`.

---

## 4. Responsiveness & Touch Target Compliance

- Minimum touch target for all milestone action buttons: 48 × 48 dp (56dp height on Primary CTAs).
- Layout adapts to 360dp logical width (Realme Note 60 hardware baseline) using fluid vertical stacking.
