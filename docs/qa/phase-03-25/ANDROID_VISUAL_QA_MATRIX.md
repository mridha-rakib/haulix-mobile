# Phase 03.25 — Physical Android Visual QA Matrix

## 1. Test Device Information

- **Brand / Model:** MEIZU Lucky 08 (`MeizuVenus`)
- **Device Serial:** `431QHFHM223EK`
- **Android Version:** Android 14 (API 34)
- **Display Resolution:** 1264 × 2780 px (~450 dpi)
- **Runtime Environment:** Expo SDK 58 / React Native (Metro on port 8085 via ADB reverse)

---

## 2. Real Device Visual QA Verification Matrix

| Screen         | Variant          | Reference Figma Node | Android Capture File        | Visual Target Match                                     | Functional Verification                        |  Result  |
| :------------- | :--------------- | :------------------- | :-------------------------- | :------------------------------------------------------ | :--------------------------------------------- | :------: |
| **C20-RETAIL** | English Overview | `392:265`            | `c20retail-en-overview.png` | Step chip, header, context badge, store pickup card     | Clean rendering, accurate colors & padding     | **PASS** |
| **C20-RETAIL** | English Scrolled | `392:265`            | `c20retail-en-scrolled.png` | Delivery card, exception review card, actions, footer   | Smooth scroll, primary & secondary CTAs        | **PASS** |
| **C20-RETAIL** | Spanish Overview | `980:10668`          | `c20retail-es-overview.png` | Localized Spanish title, subtitle, confirmation card    | Exact Spanish copy from Figma                  | **PASS** |
| **C20-RETAIL** | Spanish Scrolled | `980:10668`          | `c20retail-es-scrolled.png` | Spanish delivery card, manual exception card, CTAs      | Full Spanish text, review badge                | **PASS** |
| **C21-RETAIL** | English Overview | `392:456`            | `c21retail-en-overview.png` | Header, context badge, confirm card, policy card        | 4-point intake data, review badge              | **PASS** |
| **C21-RETAIL** | English Notice   | `392:456`            | `c21retail-en-notice.png`   | Upcoming W03 notice banner upon tapping primary CTA     | Honest W03 notice, dismiss action              | **PASS** |
| **C21-RETAIL** | Spanish Overview | `980:10886`          | `c21retail-es-overview.png` | Spanish header, confirm card, policy review card        | Exact Spanish translations                     | **PASS** |
| **C21-RETAIL** | Spanish Notice   | `980:10886`          | `c21retail-es-notice.png`   | Localized Spanish upcoming W03 notice banner            | Spanish notice text & dismiss button           | **PASS** |
| **C21-M**      | English Overview | `392:354`            | `c21m-en-overview.png`      | Moving header, context badge, moving intake data card   | Route & inventory data, stair policy check     | **PASS** |
| **C21-M**      | English Notice   | `392:354`            | `c21m-en-notice.png`        | Upcoming W03 notice banner upon tapping primary CTA     | Honest moving W03 notice, dismiss action       | **PASS** |
| **C21-M**      | Spanish Overview | `980:10766`          | `c21m-es-overview.png`      | Spanish moving review header, data card, policy card    | Exact Spanish moving intake copy               | **PASS** |
| **C21-M**      | Spanish Notice   | `980:10766`          | `c21m-es-notice.png`        | Localized Spanish upcoming W03 notice banner            | Spanish moving notice text & dismiss button    | **PASS** |
| **C21-F**      | English Overview | `394:188`            | `c21f-en-overview.png`      | Furniture review header, context badge, dimensions card | Sofa dimensions, safety assessment card        | **PASS** |
| **C21-F**      | English Notice   | `394:188`            | `c21f-en-notice.png`        | Upcoming W03 notice banner upon tapping primary CTA     | Honest furniture W03 notice, dismiss action    | **PASS** |
| **C21-F**      | Spanish Overview | `980:11006`          | `c21f-es-overview.png`      | Spanish furniture review header, data card, policy card | Exact Spanish furniture intake copy            | **PASS** |
| **C21-F**      | Spanish Notice   | `980:11006`          | `c21f-es-notice.png`        | Localized Spanish upcoming W03 notice banner            | Spanish furniture notice text & dismiss button | **PASS** |

---

## 3. Visual Comparison & Parity Assessment

1. **Card Layout & Typography Hierarchy:** Screen headings render at `25px Inter-Bold` (`#F6F8F6`), subtitles at `12px Inter-Regular` (`#ADB7B1`), section headers at `16px Inter-SemiBold`.
2. **Context Badges:** All context badges use the distinctive dark green container (`#1A2510`) with neon lime checkmark and text (`#BAFF42`), matching Figma design tokens.
3. **Policy Review Badges:** "Review required" / "Revisión necesaria" badge displays consistently across all four screens with elevated surface (`#222827`) and secondary text color (`#ADB7B1`).
4. **Interactive Action Gating:** Primary CTAs render with `#BAFF42` neon lime background and `#080B0B` dark text; when pressed, they reliably trigger honest upcoming W03 notice banners without fabricated pricing, driver dispatch, or quotation simulation. Secondary CTAs correctly route backward to previous service configuration screens.
