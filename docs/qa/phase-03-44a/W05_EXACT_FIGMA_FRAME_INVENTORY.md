# HAULIX Customer Mobile App — Phase 03.44A

## W05 Exact Figma Frame Inventory & Source Traceability

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.44A  
**FIGMA FILE:** `Q946h4YBGgyLsjnPtdyQNe` (`HAULIX UI/UX Concept`)  
**DATE:** 2026-11-21

---

### 1. Master Section Architecture

| Section                      | Node ID    | Section Name                                                              | Coordinate Bounds                        | Status       |
| :--------------------------- | :--------- | :------------------------------------------------------------------------ | :--------------------------------------- | :----------- |
| **W05 English Master**       | `836:4571` | `W05 — ENGLISH \| Dispatch • Matching • Driver • Crew • Exceptions • W06` | x = 110, y = 80,800 (2,250 × 7,610 px)   | **VERIFIED** |
| **W05 Spanish Master**       | `836:4572` | `W05 — ESPAÑOL \| Despacho • Asignación • Equipo • Excepciones • W06`     | x = 2,460, y = 80,800 (2,250 × 7,661 px) | **VERIFIED** |
| **Canonical Canvas Concept** | `111:13`   | `C05 · Job Tracking` (Page `1:2`)                                         | x = 1,480, y = 1,200 (430 × 1,056 px)    | **VERIFIED** |

---

### 2. Canonical W05 Screen Inventory (4 Canonical Screens × 2 Locales)

| Screen ID | Canonical Route         | Figma Parent Section                      | Nominal Viewport | Source Screen Title (English / Spanish)                            | Frame Export Status   | Verification State                      |
| :-------- | :---------------------- | :---------------------------------------- | :--------------- | :----------------------------------------------------------------- | :-------------------- | :-------------------------------------- |
| **C32-A** | `/searching-for-driver` | Section `836:4571` (EN) / `836:4572` (ES) | 430 × 914 px     | Searching for Driver / Buscando conductor                          | MCP Tool Rate Limited | **IMPLEMENTED — SOURCE EXPORT PENDING** |
| **C32-B** | `/driver-matched`       | Section `836:4571` (EN) / `836:4572` (ES) | 430 × 960 px     | Driver Matched / Conductor encontrado                              | MCP Tool Rate Limited | **IMPLEMENTED — SOURCE EXPORT PENDING** |
| **C32-C** | `/crew-tracking`        | Section `836:4571` (EN) / `836:4572` (ES) | 430 × 1,056 px   | Crew Assigned & Tracking / Equipo asignado y seguimiento           | MCP Tool Rate Limited | **IMPLEMENTED — SOURCE EXPORT PENDING** |
| **C32-D** | `/cancellation-windows` | Section `836:4571` (EN) / `836:4572` (ES) | 430 × 980 px     | Cancellation Windows & Policy / Ventanas y política de cancelación | MCP Tool Rate Limited | **IMPLEMENTED — SOURCE EXPORT PENDING** |

---

### 3. Source Verification Notes & Fallback Protocol

1. The parent container sections `836:4571` and `836:4572` were verified on the Figma canvas via coordinate inspection.
2. Direct programmatic extraction of individual child frame PNG screenshots via Figma MCP was blocked by the team Starter plan rate limit (`You've reached the Figma MCP tool call limit on the Starter plan`).
3. In strict conformance with Section 5 of the prompt:
   - Frame IDs without live API confirmation are explicitly designated as `SOURCE EXPORT PENDING / SOURCE UNVERIFIED` rather than fabricated.
   - Exact manual export instructions are documented in [`FIGMA_SOURCE_ACQUISITION_LOG.md`](FIGMA_SOURCE_ACQUISITION_LOG.md).
