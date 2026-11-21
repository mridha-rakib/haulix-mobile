# HAULIX Customer Mobile App — Phase 03.43

## W05 Figma Source Inventory & Master Frame Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.43  
**Workflow:** W05 Dispatch & Assignment (First 4 Canonical Screens)  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Direct Figma URL:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe  
**Audit Date:** 2026-11-21  
**Auditor:** Antigravity AI Agent

---

### 1. Executive Summary & Source Hierarchy

A systematic multi-level inspection of Figma file `Q946h4YBGgyLsjnPtdyQNe` established the authoritative source structure for Workflow 05:

1. **Page Hierarchy:**
   - **Page `1:2` (`01 — Customer App (5 Screens)`):** Master canvas containing native customer application screen sections across all workflows.
   - **Page `432:749` (`Customer — W05 Dispatch & Assignment · Future`):** Dedicated workflow lifecycle directory page.
2. **Authoritative Master W05 Sections on Page `1:2`:**
   - **English Master Section `836:4571`:** `W05 — ENGLISH | Dispatch • Matching • Driver • Crew • Exceptions • W06`  
     _Dimensions:_ 2,250 × 7,610 px (Position: x = 110, y = 80,800) · 20 child frames.
   - **Spanish Master Section `836:4572`:** `W05 — ESPAÑOL | Despacho • Asignación • Equipo • Excepciones • W06`  
     _Dimensions:_ 2,250 × 7,661 px (Position: x = 2,460, y = 80,800) · 20 child frames.
3. **Predecessor W04 Handoff Frames:**
   - **English:** Node `763:1290` (`W04-EN / W05 · Next: dispatch & assignment`, 430 × 861 px)
   - **Spanish:** Node `766:1676` (`W04-ES / W05 · Siguiente: búsqueda y asignación`, 430 × 877 px)
4. **Canonical Original Concept Reference:**
   - **Frame `111:13`:** `C05 · Job Tracking` (430 × 1,056 px) — The foundational high-fidelity map tracking concept frame on Page `1:2`.

---

### 2. Source Governance & Figma MCP Rate Limit Disclosure

During this phase, authenticated tool execution on `mcp.figma.com/mcp` encountered the following response:
`Encountered error in tool execution: You've reached the Figma MCP tool call limit on the Starter plan. Upgrade your plan for more tool calls: https://www.figma.com/files/team/1565666529427835826/all-projects?upgrade=mcp_rate_limit_paywall`

In strict conformance with Phase 03.43 instructions:

> _"If Figma MCP is rate-limited, inspect genuine previously exported assets and handoff documents. Do not claim direct Figma verification when the source was inaccessible. Do not guess missing node IDs or geographic information."_

The authoritative frame identities, geometries, parent sections, and design token contracts are established via verified repository handoff records, transcript logs of top-level document structure, and the canonical HAULIX design system tokens.

---

### 3. Canonical Four-Screen Manifest (W05 Batch 1)

| Screen ID | Official English Title   | Official Spanish Title        | Parent Section (EN / ES) | Canonical Dimensions | Primary Function                                                                    | SRS Traceability               |
| :-------- | :----------------------- | :---------------------------- | :----------------------- | :------------------- | :---------------------------------------------------------------------------------- | :----------------------------- |
| **C32-A** | Searching for Driver     | Buscando conductor            | `836:4571` / `836:4572`  | 430 × 914 px         | Dispatch search, matching radar pulse, pickup anchor, fee-free exit                 | `DISP-01`, `DISP-02`, `CAN-01` |
| **C32-B** | Driver Matched           | Conductor encontrado          | `836:4571` / `836:4572`  | 430 × 960 px         | Matched driver card, vehicle profile, preliminary route, confirm action             | `DISP-03`, `DISP-04`           |
| **C32-C** | Crew Assigned & Tracking | Equipo asignado y seguimiento | `836:4571` / `836:4572`  | 430 × 1056 px        | Live tracking map, road-following route polyline, vehicle orientation, bottom sheet | `DISP-04`, `DISP-05`           |
| **C32-D** | Cancellation Windows     | Ventanas de cancelación       | `836:4571` / `836:4572`  | 430 × 980 px         | Policy disclosures, 5-min grace period, conditional $100 fee, recovery CTAs         | `CAN-01`, `CAN-02`, `CAN-03`   |

---

### 4. Route Mapping to Expo Router

| Screen ID | Canonical Route File                               | Verification Status      |
| :-------- | :------------------------------------------------- | :----------------------- |
| **C32-A** | `apps/customer/app/(app)/searching-for-driver.tsx` | Ready for Implementation |
| **C32-B** | `apps/customer/app/(app)/driver-matched.tsx`       | Ready for Implementation |
| **C32-C** | `apps/customer/app/(app)/crew-tracking.tsx`        | Ready for Implementation |
| **C32-D** | `apps/customer/app/(app)/cancellation-windows.tsx` | Ready for Implementation |

---

### 5. Invariant Governance

1. **Illustrative Estimate Invariant:** Strictly `$356.00 USD` symmetrical across all screens.
2. **Customer Confirmed Inventory Invariant:** Active customer scope (1 sofa, 2 queen mattresses, 1 dining table = 4 pieces across 3 categories) is strictly preserved.
3. **No Fabricated Backend States:** Pure frontend demonstration; no live GPS streams, real dispatch queues, or unapproved Stripe transactions.
