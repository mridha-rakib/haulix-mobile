# HAULIX Customer Mobile App — Phase 03.45

## W05 Remaining Figma Screen Inventory & Master Section Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.45  
**WORKFLOW:** W05 — Dispatch & Assignment  
**FIGMA FILE:** `Q946h4YBGgyLsjnPtdyQNe` (`HAULIX UI/UX Concept`)  
**DATE:** 2026-11-21

---

### 1. Authoritative Figma Canvas Architecture

A structural inspection of the Figma canvas hierarchy on Page `1:2` (`01 — Customer App (5 Screens)`) confirms the master layout boundaries for Workflow 05:

| Master Entity           | Identifier | Name                                                                                  | Canvas Coordinates    | Dimensions        | Child Count     | Classification                     |
| :---------------------- | :--------- | :------------------------------------------------------------------------------------ | :-------------------- | :---------------- | :-------------- | :--------------------------------- |
| **Canvas Page**         | `1:2`      | `01 — Customer App (5 Screens)`                                                       | Root Master           | —                 | 30 sections     | Authoritative Canvas               |
| **W05 English Section** | `836:4571` | `W05 — ENGLISH \| Dispatch • Matching • Driver • Crew • Exceptions • W06`             | x = 110, y = 80,800   | 2,250 × 7,610 px  | 20 child frames | Master English W05 Container       |
| **W05 Spanish Section** | `836:4572` | `W05 — ESPAÑOL \| Despacho • Asignación • Equipo • Excepciones • W06`                 | x = 2,460, y = 80,800 | 2,250 × 7,661 px  | 20 child frames | Master Spanish W05 Container       |
| **W06 English Section** | `881:5131` | `W06 — ENGLISH \| Live Tracking • Chat • Media • Extra Scope • No-show • Handoff`     | x = 110, y = 89,250   | 2,250 × 10,705 px | 26 child frames | Downstream Workflow (Out of Scope) |
| **W06 Spanish Section** | `881:5132` | `W06 — ESPAÑOL \| Seguimiento • Chat • Evidencia • Trabajo extra • Ausencia • Cierre` | x = 2,460, y = 89,250 | 2,250 × 10,705 px | 26 child frames | Downstream Workflow (Out of Scope) |
| **Concept Reference**   | `111:13`   | `C05 · Job Tracking`                                                                  | x = 1,480, y = 1,200  | 430 × 1,056 px    | 47 child nodes  | Foundational Map Tracking Concept  |

---

### 2. Detailed Classification of W05 Child Frames (20 per Language Section)

Parent section `836:4571` (English) and `836:4572` (Spanish) comprise 20 child frames each. In strict compliance with Section 4 ("Do not interpret all 20 child frames as 20 unique app screens without classification"), the structural inventory breaks down as follows:

```
Section 836:4571 (20 Children Total):
├── [Batch 1 Canonical Screens] (4 frames)
│   ├── C32-A: Searching for Driver (Implemented)
│   ├── C32-B: Driver Matched (Implemented)
│   ├── C32-C: Crew Assigned & Tracking (Implemented)
│   └── C32-D: Cancellation Windows (Implemented)
├── [Candidate Batch 2 Dispatch Exceptions & Reassignment] (~4-6 frames)
│   ├── Driver Unavailability / Searching Timeout State
│   ├── Dispatch Reassignment / Driver Delay State
│   ├── Cancellation Confirmation Dialog / Modal State
│   └── Customer Support / Dispatch Clarification State
├── [Workflow 06 Handoff Frames & Transition Connectors] (~4 frames)
│   └── Live en route handoff to W06 Active Service (Section 881:5131)
└── [Annotations, Spacers & Component Flow Metadata] (~6-8 frames)
    └── Section headers, journey step badges, flow directional arrows
```

---

### 3. Comprehensive Remaining W05 Screen Inventory Table

| Screen ID  | EN Frame ID      | ES Frame ID      | Original Title                                           | Dimensions     | Workflow | Existing Route          | Missing Route  | Prototype Target        | Implementation Priority | Selected for 03.45   | Source Status      |
| :--------- | :--------------- | :--------------- | :------------------------------------------------------- | :------------- | :------- | :---------------------- | :------------- | :---------------------- | :---------------------- | :------------------- | :----------------- |
| **C32-A**  | `836:4571` child | `836:4572` child | Searching for Driver / Buscando conductor                | 430 × 914 px   | W05      | `/searching-for-driver` | None           | `/driver-matched`       | P0                      | Already Done (03.43) | Implemented        |
| **C32-B**  | `836:4571` child | `836:4572` child | Driver Matched / Conductor encontrado                    | 430 × 960 px   | W05      | `/driver-matched`       | None           | `/crew-tracking`        | P0                      | Already Done (03.43) | Implemented        |
| **C32-C**  | `836:4571` child | `836:4572` child | Crew Assigned & Tracking / Equipo asignado y seguimiento | 430 × 1,056 px | W05      | `/crew-tracking`        | None           | `/cancellation-windows` | P0                      | Already Done (03.43) | Implemented        |
| **C32-D**  | `836:4571` child | `836:4572` child | Cancellation Windows / Ventanas de cancelación           | 430 × 980 px   | W05      | `/cancellation-windows` | None           | `/crew-tracking`        | P0                      | Already Done (03.43) | Implemented        |
| **C33-A**  | Unresolved       | Unresolved       | Dispatch Search Timeout / No Driver Available            | Unverified     | W05      | None                    | Pending Source | Unverified              | P1                      | Candidate            | **SOURCE BLOCKED** |
| **C33-B**  | Unresolved       | Unresolved       | Driver Delayed / ETA Revised                             | Unverified     | W05      | None                    | Pending Source | Unverified              | P1                      | Candidate            | **SOURCE BLOCKED** |
| **C33-C**  | Unresolved       | Unresolved       | Driver Reassignment Notice                               | Unverified     | W05      | None                    | Pending Source | Unverified              | P1                      | Candidate            | **SOURCE BLOCKED** |
| **C33-D**  | Unresolved       | Unresolved       | Cancellation Confirmed / Fee-Free Refund                 | Unverified     | W05      | None                    | Pending Source | Unverified              | P1                      | Candidate            | **SOURCE BLOCKED** |
| **W06-H1** | Unresolved       | Unresolved       | Handoff to Live Job Tracking                             | Unverified     | W06      | None                    | None           | W06 (881:5131)          | P2                      | No (W06 Scope)       | Out of Scope       |

---

### 4. Source Blocker Certification

1. **MCP Rate Limit:** Calls to `mcp.figma.com/mcp` fail with `You've reached the Figma MCP tool call limit on the Starter plan. Upgrade your plan for more tool calls: https://www.figma.com/files/team/1565666529427835826/all-projects?upgrade=mcp_rate_limit_paywall`.
2. **Local Repository State:** `docs/qa/phase-03-45/figma/` and `docs/qa/phase-03-44a/figma/` currently contain 0 source PNG exports.
3. **Execution Rule Compliance:** In strict adherence to Section 5, 21, and 22:
   - "If the actual screen frames cannot be inspected, do not manufacture layouts from screen titles alone."
   - "If source frames are unavailable, mark the phase `SOURCE BLOCKED` for those screens, not `COMPLETE`."
   - "If no new screen could be source-verified, do not make speculative screen commits. Deliver the inventory/blocker report only."
