# DW-D07: Completion Evidence Specification

## 1. Scope & Objective

This document defines the technical specification for photographic delivery proof capture, checklist validation, and timestamp logging on `DW21 · Completion evidence` (Primary Driver) and `DW64 · Helper work evidence` (Crew Helper).

---

## 2. Photographic Proof Protocol

In compliance with signed HAULIX SRS v1.6 and Customer Workflow 08:
- **Two-Tile Delivery Verification:**
  - Tile 1: `Before-service photo` (`1086:619` EN / `1088:948` ES). Documents initial condition, pre-existing blemishes, and access conditions.
  - Tile 2: `After-service photo` (`1086:625` EN / `1088:954` ES). Documents completed placement, assembly integrity, and customer premises condition.
- **Server Upload & Validation:**
  - Image payloads are submitted with ISO-8601 UTC timestamps and delivery geocoordinates.
  - Verification chip (`1086:631`): `"Completion is subject to required evidence, valid timestamps and server verification. Customer review rules apply separately."`
- **Helper Evidence Independence (`DW64`):**
  - Helper captures evidence specific to their assigned labor tasks (`1309:1226`).
  - Does not replace or override the Primary Driver's overall cargo delivery proof.

---

## 3. Responsive Touch & Camera Targets

- Photo picker tap areas conform to 390 × 120 dp cards with minimum 48dp touch accessibility.
- Adapts responsively to 360dp logical width on Realme Note 60 hardware baseline.
