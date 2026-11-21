# HAULIX Customer Mobile App — Phase 03.47

# W05 Source vs Android Visual Acceptance Matrix

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/W05_SOURCE_VS_ANDROID_VISUAL_ACCEPTANCE.md`  
**DEVICE:** Realme Note 60 (RMX3930, Android 15, 720 × 1600 px)  
**FIGMA SOURCE:** Student Team Authorized Copy `meiXxwUNJaDo0a3mhcHBXv`  
**ACCEPTANCE CRITERIA:** Strictly evidence-based statuses (No fabricated percentage claims)

---

## 1. Acceptance Classification Standard

In compliance with project owner directives, visual acceptance is reported using honest categorical statuses rather than arbitrary percentage scores:

- `SOURCE VERIFIED — VISUAL MATCH ACCEPTED`: Visual hierarchy, tokens, typography, map artwork, and controls match Figma source within technical tolerance.
- `SOURCE VERIFIED — DIFFERENCES REMAIN`: Implemented and functional, but residual minor differences exist (e.g. system font metrics, scroll vs fixed bottom bar).
- `ANDROID QA BLOCKED`: Hardware or system issue prevented physical device capture.
- `SOURCE ASSET UNAVAILABLE`: Upstream Figma frame not exported.
- `IMPLEMENTED — NOT FULLY VERIFIED`: Route works, pending physical device review.

---

## 2. Visual Acceptance Matrix

| Screen ID  | Screen Name            | Route                    | Locale | Figma Frame | Android Screenshot                                   | Comparison Image                   | Status                                      |
| ---------- | ---------------------- | ------------------------ | ------ | ----------- | ---------------------------------------------------- | ---------------------------------- | ------------------------------------------- |
| **S20-EN** | Search Expanded 20 Mi  | `/search-expanded-20mi`  | `en`   | `844:4670`  | `w05-en-s20-android.png`                             | `compare-w05-s20-en.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **S20-ES** | Búsqueda 20 Mi         | `/search-expanded-20mi`  | `es`   | `844:6820`  | `w05-es-s20-android.png`                             | `compare-w05-s20-es.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **S30-EN** | Search Expanding 30 Mi | `/search-expanding-30mi` | `en`   | `844:4769`  | `w05-en-s30-android.png`                             | `compare-w05-s30-en.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **S30-ES** | Ampliando a 30 Mi      | `/search-expanding-30mi` | `es`   | `844:6919`  | `w05-es-s30-android.png`                             | `compare-w05-s30-es.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **S40-EN** | Search Expanded 40 Mi  | `/search-expanded-40mi`  | `en`   | `844:4868`  | `w05-en-s40-android.png`                             | `compare-w05-s40-en.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **S40-ES** | Búsqueda 40 Mi         | `/search-expanded-40mi`  | `es`   | `844:7018`  | `w05-es-s40-android.png`                             | `compare-w05-s40-es.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **S50-EN** | Searching Up to 50 Mi  | `/search-expanded-50mi`  | `en`   | `844:4967`  | `w05-en-s50-android.png`                             | `compare-w05-s50-en.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **S50-ES** | Búsqueda hasta 50 Mi   | `/search-expanded-50mi`  | `es`   | `844:7117`  | `w05-es-s50-android.png`                             | `compare-w05-s50-es.png`           | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **ND-ES**  | No Hay Conductor       | `/no-driver-available`   | `es`   | `844:8220`  | `w05-es-no-driver-remediated-android.png`            | `compare-w05-nd-es-remediated.png` | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **CN-ES**  | Solicitud Cancelada    | `/request-canceled`      | `es`   | `844:8404`  | `w05-es-canceled-remediated-android.png`             | (Verified on device)               | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |
| **CW-ES**  | Ventanas Cancelación   | `/cancellation-windows`  | `es`   | `844:8312`  | `w05-es-cancellation-windows-remediated-android.png` | (Verified on device)               | **SOURCE VERIFIED — VISUAL MATCH ACCEPTED** |

---

## 3. Element-by-Element Analysis of Batch 3 Screens

1. **Header & Navigation:** Clean `FlowHeaderBack` icon aligned left with 16px padding. Wordmark duplication removed.
2. **Typography & Styling:** Inter font weights (Bold, SemiBold, Medium, Regular) rendered sharply via `@haulix/design-tokens`.
3. **Location Chip:** Service area pill rendered with green status dot and border `#1E2724`.
4. **Status Capsule:** Glowing lime border (`rgba(186, 255, 66, 0.35)`) and dark green pill containing the radar icon.
5. **Authentic Map Raster:** S20, S30, S40, S50 authentic PNGs render without distortion, clipped borders, or intrusive floating controls.
6. **Summary Card:** Symmetrical non-binding quote `$356.00 · DEMO` and booking ref `HX-AZ-DEMO-0042` match Figma values exactly.
7. **Dispatch Timeline Card:** 3-step vertical progress line with active brand indicators.
8. **Primary CTA (Lime Button):** 52px height, `#BAFF42` background, `#0B0F0E` bold text, rounded 14px.
9. **Secondary CTA (Dark Border):** Transparent fill, 1px border `#26332E`, 50px height, `#ADB7B1` text.
10. **Recovery Link:** Underlined green link navigating to cancellation options.
