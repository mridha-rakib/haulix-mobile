# HAULIX Customer Mobile App — Phase 03.47B

## Map Aspect Ratio, Crop Elimination & Overlay Fix Register

**Document ID:** `HAULIX-QA-P03.47B-011`  
**Phase:** 03.47B  
**Component:** `apps/customer/src/components/map/HaulixDispatchMap.tsx` & `apps/customer/src/components/dispatch/W05SearchStageScreen.tsx`  
**Affected Screens:** W05 Search Stages (S10, S20, S30, S40, S50) in English and Spanish

---

### 1. Defect Identification & Root Cause Analysis

#### Previous Defect (Defect B):

On physical hardware (Realme Note 60, `720 × 1600` px, 360 dp width, density 2.0), the map container had a fixed height of `height={235}`.
With horizontal screen padding of 20 dp on each side, the map container width is:
$$\text{Container Width} = 360 - 2 \times 20 = 320\text{ dp}$$
Because the source Figma map assets (`map-s10-searching.png` through `map-s50-searching.png`) have an aspect ratio of $386 \times 235$ px ($\approx 1.6425$):

- Container Aspect Ratio with fixed height $235$:
  $$\frac{320}{235} \approx 1.3617$$
- When rendered with `resizeMode="cover"` (or centered `contain`), the image scaled to fit height $235$, making its rendered width:
  $$\text{Rendered Width} = 235 \times \frac{386}{235} = 386\text{ dp}$$
- This resulted in horizontal cropping of:
  $$\text{Crop} = \frac{386 - 320}{2} = 33\text{ dp per side}$$
- **Impact:** The left-hand status overlay banner text ("Searching 20-mile radius...", "Searching 30-mile radius...", etc.) was cut off near the left boundary.

#### Previous Defect (Defect D):

Floating zoom controls (`[ + ]` and `[ - ]` buttons) were rendered on top of the map graphic, obscuring map vectors and conflicting with the Figma source designs (nodes `844:4670`, `844:4769`, `844:4868`, `844:4967`), which do not feature zoom buttons.

---

### 2. Engineering Remediation Applied

#### Remediation 1: Responsive Aspect Ratio

In `HaulixDispatchMap.tsx`:

```tsx
const containerAspectStyle: ViewStyle = height ? { height } : { aspectRatio: 386 / 235 };
```

- When `height` is omitted, the container dynamically computes its height based on the available width:
  $$\text{Computed Height} = 320 \times \left(\frac{235}{386}\right) \approx 194.8\text{ dp}$$
- Container aspect ratio exactly matches the asset aspect ratio ($1.6425$).
- **Zero horizontal crop!** 100% of the image width is displayed.
- The left status banner is fully visible with comfortable internal padding.

#### Remediation 2: Elimination of Zoom Controls

In `HaulixDispatchMap.tsx`:

- Changed prop default from `showControls = true` to `showControls = false`.
- Explicitly passed `showControls={false}` in `W05SearchStageScreen.tsx`.
- Zoom buttons are completely removed from search stage maps.

---

### 3. Verification & Acceptance

| Metric                 | Before Fix (Phase 03.47A)              | After Fix (Phase 03.47B)         | Result       |
| ---------------------- | -------------------------------------- | -------------------------------- | ------------ |
| Map Aspect Ratio       | $320 / 235 = 1.36$ (distorted/cropped) | $386 / 235 = 1.64$ (exact match) | **RESOLVED** |
| Left Banner Visibility | Cropped by ~33 dp on left edge         | 100% visible, no clipping        | **RESOLVED** |
| Zoom Controls          | Visible `[+]` and `[-]` buttons        | Completely hidden/removed        | **RESOLVED** |
| Visual Fidelity        | Partial Figma match                    | Authentic Figma match            | **ACCEPTED** |
