# HAULIX Customer Mobile App — Phase 03.47

# Authentic Map Crop & Overlay Comparison

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/AUTHENTIC_MAP_CROP_AND_OVERLAY_COMPARISON.md`  
**SCOPE:** Viewport Crop, Aspect Ratio, Floating Overlay Controls & Zoom Behavior  
**STATUS:** SOURCE VERIFIED — VISUAL MATCH ACCEPTED

---

## 1. Overview & Problem

In prior iterations, map viewports exhibited discrepancies compared to Figma frames:

- Unnecessary interactive buttons (zoom in/out, recenter, target crosshairs) overlaid directly on top of map geography, obscuring route polyline and pickup markers.
- Inconsistent aspect ratios caused distorted map scaling.
- Text labels in map rasters were clipped by container border radiuses.

---

## 2. Source Geometry Audit

Figma frames (`844:4670`, `844:4769`, `844:4868`, `844:4967`) define the map viewport as:

- **Card Container:** Dark rounded rectangle (`borderRadius: 14`, `borderColor: #1E2724`, `borderWidth: 1`).
- **Aspect Ratio:** `398 × 235` (approx 1.69:1).
- **Background Fill:** `#0B0F0E` (HAULIX dark map canvas).
- **Overlays in Figma:** The original approved frames contain **zero floating zoom buttons** or intrusive crosshairs. Floating controls were an artifact of earlier generic React Native map templates.

---

## 3. Remediation Applied

1. **Intrusive Control Removal:** Removed intrusive floating zoom-in/zoom-out and recenter buttons from the standard map view. If QA debugging controls are needed, they are accessed via developer tools or the QA Navigator without polluting canonical UI.
2. **Standard Height Normalization:** Set `height={235}` consistently across all W05 screens.
3. **`resizeMode="cover"` with Center Alignment:** Configured the underlying `<Image />` component with `resizeMode="cover"` and centered alignment, ensuring that the Phoenix metro radar pulses, vehicle markers, and route paths remain perfectly framed within the card bounds on both 720px and 1080px device viewports.
4. **Subtle Gradient Edge Fade:** Added a gentle border fade to prevent harsh clipping of map grid lines at container edges.

---

## 4. Device Inspection Results

On the Realme Note 60 (720 × 1600 px screen):

- The map card spans full content width with 16px horizontal margins.
- Aspect ratio is rendered cleanly with no horizontal scrolling or clipped labels.
- Phoenix downtown and Maricopa County perimeter markers are clearly visible and legible.
