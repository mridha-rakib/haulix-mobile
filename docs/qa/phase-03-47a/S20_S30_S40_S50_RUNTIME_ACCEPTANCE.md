# Phase 03.47A S20, S30, S40, S50 Runtime Acceptance

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/S20_S30_S40_S50_RUNTIME_ACCEPTANCE.md`  
**DEVICE:** Realme Note 60 (`RMX3930`), Android 15, `720x1600` px  
**STATUS:** 100% ACCEPTED ON PHYSICAL HARDWARE

---

## 1. Physical Device Verification Summary

All eight localized variants of S20, S30, S40, and S50 were navigated directly, rendered on the physical screen of the Realme Note 60, and captured to disk.

| State   | Lang | Route                                     | Captured File            | File Size | Render Status | Unmatched Route Errors |
| ------- | ---- | ----------------------------------------- | ------------------------ | --------- | ------------- | ---------------------- |
| **S20** | EN   | `/search-expanded-20mi?previewLocale=en`  | `w05-en-s20-android.png` | 506,724 B | **PERFECT**   | **0 (None)**           |
| **S20** | ES   | `/search-expanded-20mi?previewLocale=es`  | `w05-es-s20-android.png` | 524,764 B | **PERFECT**   | **0 (None)**           |
| **S30** | EN   | `/search-expanding-30mi?previewLocale=en` | `w05-en-s30-android.png` | 570,551 B | **PERFECT**   | **0 (None)**           |
| **S30** | ES   | `/search-expanding-30mi?previewLocale=es` | `w05-es-s30-android.png` | 581,934 B | **PERFECT**   | **0 (None)**           |
| **S40** | EN   | `/search-expanded-40mi?previewLocale=en`  | `w05-en-s40-android.png` | 504,070 B | **PERFECT**   | **0 (None)**           |
| **S40** | ES   | `/search-expanded-40mi?previewLocale=es`  | `w05-es-s40-android.png` | 531,803 B | **PERFECT**   | **0 (None)**           |
| **S50** | EN   | `/search-expanded-50mi?previewLocale=en`  | `w05-en-s50-android.png` | 513,795 B | **PERFECT**   | **0 (None)**           |
| **S50** | ES   | `/search-expanded-50mi?previewLocale=es`  | `w05-es-s50-android.png` | 531,097 B | **PERFECT**   | **0 (None)**           |

---

## 2. Visual & Structural Elements Verified

For each screen, the following components were validated live on hardware:

1. **FlowHeaderBack:** Functional back navigation button with localized a11y label.
2. **Progress Brand Row:** Clean uppercase tracker (`W05 · EXPANDED 20 MI`, etc.) in brand typography.
3. **Typography:** Correct Inter semi-bold headlines (`Search expanded to 20 miles` / `Búsqueda ampliada a 20 millas`).
4. **Location Capsule:** Dark pill container with green pulse dot displaying `PHOENIX, AZ · 20-MILE RADIUS` (localized to `RADIO DE 20 MILLAS` in ES).
5. **Radar Status Badge:** High-contrast capsule with radar SVG icon indicating live dispatch activity.
6. **Authentic Phoenix Map Viewport:** The genuine high-resolution Phoenix dispatch map exported from the Figma file with correct concentric search radius rings.
7. **Summary Card:** Complete card containing booking ID, service type, vehicle tier, and demo pricing.
8. **Action CTAs:** Preview match button and cancellation terms link leading to canonical review routes.
