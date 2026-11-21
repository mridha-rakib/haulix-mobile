# HAULIX Customer Mobile App — Phase 03.47
# Batch 3 Source Frame & Map Asset Manifest

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/BATCH_3_SOURCE_FRAME_AND_ASSET_MANIFEST.md`  
**FIGMA SOURCE:** Student Team Authorized Copy `meiXxwUNJaDo0a3mhcHBXv`  
**STATUS:** 100% AUTHENTIC SOURCE-EXTRACTED ASSETS  

---

## 1. Batch 3 Master Compositions

| State | Scope | English Figma Node | Spanish Figma Node | Exported Reference File | Status |
|---|---|---|---|---|---|
| **S20** | 20-Mile Radius | `844:4670` | `844:6820` | `w05-en-s20-844-4670-figma.png` / `w05-es-s20-844-6820-figma.png` | VERIFIED |
| **S30** | 30-Mile Radius | `844:4769` | `844:6919` | `w05-en-s30-844-4769-figma.png` / `w05-es-s30-844-6919-figma.png` | VERIFIED |
| **S40** | 40-Mile Radius | `844:4868` | `844:7018` | `w05-en-s40-844-4868-figma.png` / `w05-es-s40-844-7018-figma.png` | VERIFIED |
| **S50** | 50-Mile Radius | `844:4967` | `844:7117` | `w05-en-s50-844-4967-figma.png` / `w05-es-s50-844-7117-figma.png` | VERIFIED |

---

## 2. Authentic Map Node & Raster Inventory

All map nodes were extracted directly via the Figma API from `meiXxwUNJaDo0a3mhcHBXv`:

### English Search Progression Maps (`apps/customer/assets/maps/`)

| File Name | Figma Node | Size (Bytes) | Geometry / Crop Characteristics |
|---|---|---|---|
| `map-s10-searching.png` | `846:5131` | 169,643 | 10-mile radius radar pulse over Phoenix metro |
| `map-s20-searching.png` | `846:5136` | 159,615 | 20-mile expanded circular radar perimeter |
| `map-s30-searching.png` | `846:5141` | 184,831 | 30-mile intermediate valley broadcast coverage |
| `map-s40-searching.png` | `846:5146` | 159,567 | 40-mile outer perimeter covering East/West hubs |
| `map-s50-searching.png` | `846:5151` | 159,435 | 50-mile maximum service area perimeter boundary |

### Spanish Localized Map Assets (`apps/customer/assets/maps/`)

| File Name | Figma Node | Size (Bytes) | Localized Label Verification |
|---|---|---|---|
| `map-s10-searching-es.png` | `846:5235` | 177,286 | Localized Spanish search perimeter |
| `map-s20-searching-es.png` | `846:5240` | 168,681 | Localized Spanish 20-mile search radar |
| `map-s30-searching-es.png` | `846:5245` | 192,102 | Localized Spanish 30-mile search radar |
| `map-s40-searching-es.png` | `846:5250` | 168,717 | Localized Spanish 40-mile search radar |
| `map-s50-searching-es.png` | `846:5255` | 168,595 | Localized Spanish 50-mile search radar |
| `map-driver-matched-es.png`| `846:5264` | 181,460 | Localized Spanish driver pickup marker |
| `map-crew-tracking-es.png` | `846:5282` | 171,239 | Localized Spanish active route & ETA marker |
| `map-driver-late-es.png`   | `846:5298` | 171,350 | Localized Spanish delay notification marker |
| `map-driver-reassigned-es.png`| `846:5292` | 179,489 | Localized Spanish reassigned driver route |
| `map-no-driver-es.png`     | `846:5309` | 180,658 | Localized Spanish 50-mi perimeter exhausted |
| `map-cancellation-windows-es.png`| `846:5314`| 170,402 | Localized Spanish fee-free policy markers |
| `map-request-canceled-es.png`| `846:5319` | 170,556 | Localized Spanish canceled booking status |

---

## 3. Storage & Packaging Rules

- **Offline Bundling:** All map PNGs are stored locally in `apps/customer/assets/maps/` and bundled directly into the standalone APK.
- **Zero Third-Party Map SDK Dependencies:** Does not depend on Google Maps API keys, Mapbox tokens, or runtime vector tile servers.
- **Zero Dynamic Canvas Blurring:** Raster images are sharp, crisp, 2x retina assets perfectly scaled inside the 235px high map viewport.
