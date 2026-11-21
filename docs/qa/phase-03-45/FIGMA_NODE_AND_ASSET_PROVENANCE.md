# HAULIX Customer Mobile App — Phase 03.45

## Figma Node and Asset Provenance Report

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.45  
**WORKFLOW:** W05 Dispatch & Assignment  
**FIGMA FILE:** `Q946h4YBGgyLsjnPtdyQNe`

---

### 1. Document Provenance Hierarchy

The authoritative source hierarchy established for Workflow 05 on Figma canvas `Q946h4YBGgyLsjnPtdyQNe` is:

- **Canvas Page:** `1:2` (`01 — Customer App (5 Screens)`)
- **Parent Container (English):** Section `836:4571` (`W05 — ENGLISH | Dispatch • Matching • Driver • Crew • Exceptions • W06`)
  - Dimensions: 2,250 × 7,610 px (Position: x = 110, y = 80,800)
  - Total Child Frames: 20
- **Parent Container (Spanish):** Section `836:4572` (`W05 — ESPAÑOL | Despacho • Asignación • Equipo • Excepciones • W06`)
  - Dimensions: 2,250 × 7,661 px (Position: x = 2,460, y = 80,800)
  - Total Child Frames: 20
- **Foundational Map Concept:** Frame `111:13` (`C05 · Job Tracking`)
  - Dimensions: 430 × 1,056 px (Position: x = 1,480, y = 1,200)

---

### 2. Design Token Provenance & Conformance

All implemented W05 screens strictly consume tokens from `@haulix/design-tokens`:

| Design Token Category    | Figma Token Value                  | React Native Code Binding                             | Provenance Status   |
| :----------------------- | :--------------------------------- | :---------------------------------------------------- | :------------------ |
| **Dark Base Background** | `#0B0F0E` / `#080B0B`              | `colors.background`                                   | Authoritative Token |
| **Brand Accent (Lime)**  | `#BAFF42`                          | `colors.brand`                                        | Authoritative Token |
| **Primary Text**         | `#FFFFFF`                          | `colors.primaryText`                                  | Authoritative Token |
| **Secondary Text**       | `#8A9E96` / `#ADB7B1`              | `colors.secondaryText`                                | Authoritative Token |
| **Card Surface**         | `#131817`                          | `colors.surface`                                      | Authoritative Token |
| **Border / Elevation**   | `#1E2724` / `#26332E`              | `colors.elevated`                                     | Authoritative Token |
| **Warning / Hold**       | `#F59E0B`                          | `colors.warning`                                      | Authoritative Token |
| **Info / Radar Accent**  | `#38BDF8`                          | Brand Sky Blue                                        | Authoritative Token |
| **Typography Family**    | Inter (`400`, `500`, `600`, `700`) | `fontFamily.regular`, `.medium`, `.semiBold`, `.bold` | Authoritative Token |

---

### 3. Vector Asset Provenance

| Asset Name          | Component / File                                         | Source Basis           | Provenance Category                     |
| :------------------ | :------------------------------------------------------- | :--------------------- | :-------------------------------------- |
| `HaulixDispatchMap` | `apps/customer/src/components/map/HaulixDispatchMap.tsx` | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `RadarSweepWave`    | Embedded in `searching-for-driver.tsx`                   | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `C32CallIcon`       | Embedded in `driver-matched.tsx` & `crew-tracking.tsx`   | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `C32ChatIcon`       | Embedded in `driver-matched.tsx` & `crew-tracking.tsx`   | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `C32ShareIcon`      | Embedded in `crew-tracking.tsx`                          | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `C32StarRatingIcon` | Embedded in `driver-matched.tsx` & `crew-tracking.tsx`   | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `C32ZoomInIcon`     | Embedded in `HaulixDispatchMap.tsx`                      | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `C32ZoomOutIcon`    | Embedded in `HaulixDispatchMap.tsx`                      | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |
| `C32RecenterIcon`   | Embedded in `HaulixDispatchMap.tsx`                      | Concept Frame `111:13` | Source-Verified Equivalent (Vector SVG) |

---

### 4. Blocked Source Assets (Batch 2)

Individual child frame exports for the remaining 16 frames in `836:4571` and `836:4572` cannot be inspected programmatically due to Figma MCP team rate limits. Manual PNG exports placed in `docs/qa/phase-03-45/figma/` will supply the necessary source asset provenance for Batch 2.
