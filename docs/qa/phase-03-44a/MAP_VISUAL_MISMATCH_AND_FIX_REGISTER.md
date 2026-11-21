# HAULIX Customer Mobile App — Phase 03.44A

## Map Visual Mismatch & Fix Register

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.44A  
**TARGET:** Corrective Refinement of W05 Map Components  

---

### Mismatch & Remediation Register

| ID | Component / Area | Defect / Mismatch Description | Severity | Planned Correction | Remediation Status | Android Verification Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **MAP-44A-01** | `HaulixDispatchMap` Base Fill | Canvas base was `#080B0B` instead of the canonical `#0B0F0E` dark surface token. | Minor (P2) | Updated base `<Rect>` fill to `#0B0F0E`. | **RESOLVED** | Verified in `c32a/b/c` physical screenshots |
| **MAP-44A-02** | `HaulixDispatchMap` Highway Styling | Freeway curve was rendered as a single flat stroke without dual casing. | Minor (P2) | Added `#1F2D27` outer casing underlay (8px) beneath `#364A42` core (5px). | **RESOLVED** | Verified in `c32c-en-crew-tracking.png` |
| **MAP-44A-03** | `HaulixDispatchMap` Pickup Anchor | Droplet pin lacked the ground-level circular pulse ring. | Moderate (P1) | Added outer 28px diameter pulse halo (`rgba(186,255,66,0.2)`) with dashed border. | **RESOLVED** | Verified in all 8 Android captures |
| **MAP-44A-04** | `HaulixDispatchMap` City Blocks | City block fills were unbordered and using off-palette shades. | Minor (P2) | Harmonized block fills to `#141C19` with `#1C2421` borders and `#0F1D1A` park area. | **RESOLVED** | Verified in physical screenshots |
| **MAP-44A-05** | `HaulixDispatchMap` Water Depth | Canal corridor was drawn with arbitrary green stroke. | Minor (P2) | Enhanced Salt River canal with `#091412` base and `#112520` depth flow. | **RESOLVED** | Verified in physical screenshots |
