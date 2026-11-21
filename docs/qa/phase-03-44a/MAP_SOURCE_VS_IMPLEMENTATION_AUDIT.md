# HAULIX Customer Mobile App — Phase 03.44A

## Map Source vs. Implementation Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.44A  
**COMPONENT UNDER AUDIT:** `apps/customer/src/components/map/HaulixDispatchMap.tsx`  
**SOURCE BENCHMARK:** Canonical Figma Concept `111:13` & W05 Sections `836:4571` / `836:4572`  

---

### Layer-by-Layer Verification Matrix

| Layer | Design Element | Figma Source Requirement | Phase 03.44 Baseline | Phase 03.44A Refined Implementation | Fidelity Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Layer 1** | Canvas Background | `#0B0F0E` dark surface | `#080B0B` (slightly off-token) | `#0B0F0E` exact token | **MATCH VERIFIED** |
| **Layer 1** | City Blocks | Elevated `#141C19`, 4px rx | `#131917` arbitrary | `#141C19` with `#1C2421` 1px border | **MATCH VERIFIED** |
| **Layer 1** | Park Area | `#0F1D1A` sage green tone | `#0F221B` arbitrary | `#0F1D1A` with `#183027` stroke | **MATCH VERIFIED** |
| **Layer 1** | Water Canal | Deep canal `#091412` + `#112520` | `#0A1815` single fill | `#091412` (18px) + `#112520` (10px) depth | **MATCH VERIFIED** |
| **Layer 2** | Local Streets | `#1C2622` 2px grid | `#1C2622` 2.5px | `#1C2622` 2.0px precise stroke | **MATCH VERIFIED** |
| **Layer 2** | Primary Arterials | `#2A3A34` 4-5px stroke | `#2B3C35` 5px | `#2A3A34` 4.5px stroke with round joins | **MATCH VERIFIED** |
| **Layer 2** | Freeway Expressway | Double-cased Papago I-10 curve | Single stroke 8px | `#1F2D27` (8px) casing + `#364A42` (5px) core | **MATCH VERIFIED** |
| **Layer 3** | En Route Polyline | `#BAFF42` (4.5px) + glow halo | Rectilinear grid path | `#BAFF42` (4.5px) + `rgba(186,255,66,0.25)` halo | **MATCH VERIFIED** |
| **Layer 3** | Matched Route | `#38BDF8` dashed (3.5px) | Dashed blue line | `#38BDF8` dashed (3.5px) + ambient halo | **MATCH VERIFIED** |
| **Layer 4** | Pickup Marker | 28px pulse ring + droplet pin | Only droplet pin | 28px pulse halo + centered location pin | **MATCH VERIFIED** |
| **Layer 4** | Vehicle Marker | Cargo van with heading & glow | Van inside circular disc | Van with glowing pulse and contrast disc | **MATCH VERIFIED** |
| **Layer 4** | Radar Pulses | 3 concentric expanding pulses | 3 pulses (r=80, 55, 32) | 3 gradient pulses with dashed border | **MATCH VERIFIED** |
| **Layer 5** | Status Capsule | Floating top-center capsule | Top floating pill | Top pill with i18n dynamic labels (EN/ES) | **MATCH VERIFIED** |
| **Layer 5** | Zoom Controls | Floating vertical pill (+ / -) | Vertical pill on right rail | Vertical pill with 1px divider, active colors | **MATCH VERIFIED** |
| **Layer 5** | Recenter Crosshair | Circular 38px button | Circular 38px button | Circular crosshair with interactive feedback | **MATCH VERIFIED** |
