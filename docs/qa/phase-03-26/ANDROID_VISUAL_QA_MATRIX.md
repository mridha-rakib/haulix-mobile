# Phase 03.26 — Physical Android Visual QA Matrix

## 1. Test Device Information

- **Brand / Model:** Realme Note 60 (`RMX3930`)
- **Device Serial:** `0B04731X200003BB`
- **Android Version:** Android 15 (API 35) / Build `U.R4T2.1778116777`
- **Display Resolution:** 720 × 1600 px (~260 dpi)
- **Runtime Environment:** Expo SDK 58 / React Native (Metro on port 8085 via ADB reverse)

---

## 2. Real Device Visual QA Verification Matrix

| Screen | Variant | Reference Figma Node | Android Capture File | Visual Target Match | Functional Verification | Result |
|:---|:---|:---|:---|:---|:---|:---:|
| **C21-A** | English Overview | `394:290` | `c21a-en-overview.png` | Step chip, heading, context badge, intake review card | Clean typography, accurate colors & padding | **PASS** |
| **C21-A** | English Scrolled | `394:290` | `c21a-en-scrolled.png` | Safety assessment card, review required badge, CTAs, footer | Smooth scroll, primary & secondary action triggers | **PASS** |
| **C21-A** | English Notice | `394:290` | `c21a-en-notice.png` | Upcoming W03 notice banner upon tapping primary CTA | Honest W03 notice, dismiss action works | **PASS** |
| **C21-A** | Spanish Overview | `980:11066` | `c21a-es-overview.png` | Localized Spanish title, subtitle, context badge, intake card | Exact Spanish copy from Figma | **PASS** |
| **C21-A** | Spanish Scrolled | `980:11066` | `c21a-es-scrolled.png` | Spanish safety assessment card, review required badge, CTAs | Full Spanish text, review badge | **PASS** |
| **C21-A** | Spanish Notice | `980:11066` | `c21a-es-notice.png` | Localized Spanish upcoming W03 notice banner | Spanish notice text & dismiss button | **PASS** |
| **C21-T** | English Overview | `394:392` | `c21t-en-overview.png` | Step chip, mattress heading, context badge, intake card | 2 queen mattresses, dimensions, unconfirmed photo | **PASS** |
| **C21-T** | English Scrolled | `394:392` | `c21t-en-scrolled.png` | Safety card, review badge, CTAs, footer | Safe handling & disposal review, edit CTA | **PASS** |
| **C21-T** | English Notice | `394:392` | `c21t-en-notice.png` | Upcoming W03 notice banner upon tapping primary CTA | Honest mattress W03 notice, dismiss action | **PASS** |
| **C21-T** | Spanish Overview | `980:11126` | `c21t-es-overview.png` | Spanish mattress header, context badge, data card | Exact Spanish mattress intake copy | **PASS** |
| **C21-T** | Spanish Scrolled | `980:11126` | `c21t-es-scrolled.png` | Spanish safety card, review badge, CTAs, footer | Full Spanish text, review badge | **PASS** |
| **C21-T** | Spanish Notice | `980:11126` | `c21t-es-notice.png` | Localized Spanish upcoming W03 notice banner | Spanish notice text & dismiss button | **PASS** |
| **C21-G** | English Overview | `394:494` | `c21g-en-overview.png` | Step chip, garage heading, context badge, intake card | Boxes & shelving, photo requirements | **PASS** |
| **C21-G** | English Scrolled | `394:494` | `c21g-en-scrolled.png` | Safety card, review badge, CTAs, footer | Unknown liquids / contaminated load policy, edit CTA | **PASS** |
| **C21-G** | English Notice | `394:494` | `c21g-en-notice.png` | Upcoming W03 notice banner upon tapping primary CTA | Honest garage W03 notice, dismiss action | **PASS** |
| **C21-G** | Spanish Overview | `980:11186` | `c21g-es-overview.png` | Spanish garage header, context badge, data card | Exact Spanish garage cleanout intake copy | **PASS** |
| **C21-G** | Spanish Scrolled | `980:11186` | `c21g-es-scrolled.png` | Spanish safety card, review badge, CTAs, footer | Full Spanish text, review badge | **PASS** |
| **C21-G** | Spanish Notice | `980:11186` | `c21g-es-notice.png` | Localized Spanish upcoming W03 notice banner | Spanish notice text & dismiss button | **PASS** |
| **W03-HANDOFF** | English Overview | `382:2161` | `w03handoff-en-overview.png` | Step chip, heading, context badge, payload card | 3 types / 4 pieces / 4 images, pickup & access | **PASS** |
| **W03-HANDOFF** | English Scrolled | `382:2161` | `w03handoff-en-scrolled.png` | Anchor card, review badge, guidance, CTAs, footer | Handoff anchor, begin AI review CTA, edit items CTA | **PASS** |
| **W03-HANDOFF** | English Notice | `382:2161` | `w03handoff-en-notice.png` | Upcoming C22 notice banner upon tapping primary CTA | Honest C22 upcoming notice, dismiss action | **PASS** |
| **W03-HANDOFF** | Spanish Overview | `980:10514` | `w03handoff-es-overview.png` | Spanish handoff header, context badge, payload card | Exact Spanish handoff text from Figma | **PASS** |
| **W03-HANDOFF** | Spanish Scrolled | `980:10514` | `w03handoff-es-scrolled.png` | Spanish anchor card, review badge, guidance, CTAs | Punto de enlace, no cotización, CTAs | **PASS** |
| **W03-HANDOFF** | Spanish Notice | `980:10514` | `w03handoff-es-notice.png` | Localized Spanish upcoming C22 notice banner | Spanish notice text & dismiss button | **PASS** |

---

## 3. Visual Comparison & Parity Assessment

1. **Card Layout & Typography Hierarchy:** Screen headings render at `25px Inter-Bold` (`#F6F8F6`), subtitles at `12px Inter-Regular` (`#ADB7B1`), section headers at `16px Inter-SemiBold`.
2. **Context Badges:** All context badges use the distinctive dark green container (`#1A2510`) with neon lime checkmark and text (`#BAFF42`), matching Figma design tokens.
3. **Policy Review Badges:** "Review required" / "Revisión necesaria" badge displays consistently across all four screens with elevated surface (`#222827`) and secondary text color (`#ADB7B1`).
4. **Interactive Action Gating:** Primary CTAs render with `#BAFF42` neon lime background and `#080B0B` dark text; when pressed, they reliably trigger honest upcoming W03 notice banners without fabricated pricing, driver dispatch, or quotation simulation. Secondary CTAs correctly route backward to previous service configuration screens.
