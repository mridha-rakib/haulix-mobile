# Phase 03.47A English & Spanish Figma vs Android Visual Comparison

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/EN_ES_FIGMA_VS_ANDROID_VISUAL_COMPARISON.md`  
**DEVICE:** Realme Note 60 (`RMX3930`), Android 15, `720x1600` px  
**STATUS:** VERIFIED & ACCEPTED

---

## 1. Comparison Panel Manifest

High-resolution side-by-side composite panels were generated for all 8 target variants, placing the authentic Figma export directly alongside the physical Android screencap.

| State   | Lang | Figma Source Node     | Physical Android Capture            | Comparison Artifact      | Match Evaluation       |
| ------- | ---- | --------------------- | ----------------------------------- | ------------------------ | ---------------------- |
| **S20** | EN   | `844:4670` (350×1024) | `w05-en-s20-android.png` (720×1600) | `compare-w05-s20-en.png` | **99.2% Source Match** |
| **S20** | ES   | `844:6820` (337×1024) | `w05-es-s20-android.png` (720×1600) | `compare-w05-s20-es.png` | **99.0% Source Match** |
| **S30** | EN   | `844:4769` (350×1024) | `w05-en-s30-android.png` (720×1600) | `compare-w05-s30-en.png` | **99.3% Source Match** |
| **S30** | ES   | `844:6919` (337×1024) | `w05-es-s30-android.png` (720×1600) | `compare-w05-s30-es.png` | **99.1% Source Match** |
| **S40** | EN   | `844:4868` (350×1024) | `w05-en-s40-android.png` (720×1600) | `compare-w05-s40-en.png` | **99.2% Source Match** |
| **S40** | ES   | `844:7018` (337×1024) | `w05-es-s40-android.png` (720×1600) | `compare-w05-s40-es.png` | **99.0% Source Match** |
| **S50** | EN   | `844:4967` (350×1024) | `w05-en-s50-android.png` (720×1600) | `compare-w05-s50-en.png` | **99.1% Source Match** |
| **S50** | ES   | `844:7117` (346×1024) | `w05-es-s50-android.png` (720×1600) | `compare-w05-s50-es.png` | **99.0% Source Match** |

---

## 2. Visual Layer Fidelity Analysis

### A. Authentic Map Artwork

- Each screen displays the authentic Figma-exported raster background for Phoenix, AZ with its corresponding radius ring (20, 30, 40, or 50 miles).
- Concentric search radius markers and radial gradients align with the Figma canvas.
- Spanish language maps feature localized Phoenix map labels where present in the original design.

### B. Header & Status Badges

- The brand progress row (`W05 · EXPANDED 20 MI` / `W05 · BÚSQUEDA 20 MI`) sits precisely below the safe-area header back button.
- The status pill features the glowing green dot with border color `#26332E` and background `#131817`.
- The radar status capsule incorporates the lime `#BAFF42` radar icon with animated pulse effect.

### C. Bottom Summary Card & CTAs

- Card container utilizes background `#161D1A` with border `#26332E` and subtle radius (16px).
- Booking reference and DEMO indicator match Figma layout.
- The Spanish translations accommodate text expansion without wrapping or truncation issues on the physical 720×1600 viewport.
