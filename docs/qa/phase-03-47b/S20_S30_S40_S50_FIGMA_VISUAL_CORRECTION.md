# HAULIX Customer Mobile App — Phase 03.47B

## S20–S50 Figma Visual Correction & Fidelity Verification

**Document ID:** `HAULIX-QA-P03.47B-010`  
**Phase:** 03.47B  
**Target:** W05 Search Stage Screens (`/search-expanded-20mi`, `/search-expanding-30mi`, `/search-expanded-40mi`, `/search-expanded-50mi`)  
**Figma Source Nodes:**

- S20: `844:4670` (EN), `844:6820` (ES)
- S30: `844:4769` (EN), `844:6919` (ES)
- S40: `844:4868` (EN), `844:7018` (ES)
- S50: `844:4967` (EN), `844:7117` (ES)

---

### 1. Defect Remediation Register

| Defect Item  | Description                                       | Root Cause                                                                                 | Engineering Fix Applied                                                                       | Verification Status     |
| ------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ----------------------- |
| **Defect A** | QA floating control overlaps title                | Fixed top-right floating pill collided with screen title                                   | Implemented `isCleanMode` toggle in sheet to hide pill; invisible restore target in top-right | **RESOLVED & VERIFIED** |
| **Defect B** | Map status text clipped near left edge            | Fixed container height $235\text{ dp}$ forced horizontal cropping on $320\text{ dp}$ width | Replaced fixed height with responsive `aspectRatio: 386 / 235`, eliminating horizontal crop   | **RESOLVED & VERIFIED** |
| **Defect C** | Header vertical spacing pushes content below fold | Excess top/bottom margins on title, location chip, and badge                               | Reduced font sizes ($28\to 24\text{ dp}$) and tightened margins ($16\to 10\text{ dp}$)        | **RESOLVED & VERIFIED** |
| **Defect D** | Floating zoom controls obscuring map              | Default `showControls={true}` rendered unwanted `[+]` and `[-]` buttons                    | Set `showControls={false}` across all search stage maps to match Figma source                 | **RESOLVED & VERIFIED** |
| **Defect E** | EN/ES layout symmetry and wrapping                | Spanish text expansion caused potential badge collisions                                   | Applied `flexShrink: 1` and responsive line height ($30\text{ dp}$) for clean multi-line wrap | **RESOLVED & VERIFIED** |

---

### 2. Visual Component Inspection vs. Figma Tokens

1. **Brand Wordmark Header:**
   - "HAUL" in `#FFFFFF`, "IX" in `#BAFF42` (`colors.brand`), with tagline `"WE HAUL IT ALL."`.
   - Exact token: `colors.brand`, `colors.primaryText`.

2. **5-Step Horizontal Progress Tracker:**
   - 5 nodes: `Booked` (complete), `Dispatch` (active pulsing), `Driver` (pending), `Arrival` (pending), `Service` (pending).
   - Synchronized line segments and active lime dot.

3. **Status Banner Capsule:**
   - Active pulse indicator dot in `#BAFF42`.
   - Status text: e.g., `"EXPANDING · 20 MI"`, `"EXPANDING · 30 MI"`.

4. **Native Vector Map Graphic:**
   - Dark cartographic styling (`#101614` background).
   - Phoenix metro geometry with authentic concentric radar rings ($10\text{ mi}$, $20\text{ mi}$, $30\text{ mi}$, $40\text{ mi}$, $50\text{ mi}$).
   - Left-edge status text 100% visible with zero horizontal crop.

5. **Dispatch Activity Cards:**
   - Background `#151A19` (`colors.surface`), border `#28342E` (`colors.elevated`).
   - Clean typography with PlusJakartaSans.

6. **Primary & Secondary CTAs:**
   - Primary: Solid `#BAFF42` (`colors.brand`), dark text `#0B0F0E`.
   - Secondary: Transparent outline, text `#BAFF42`.
