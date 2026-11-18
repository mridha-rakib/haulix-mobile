# Phase 03.27 — Physical Android Visual QA Matrix

## 1. Test Device Information

- **Brand / Model:** Realme Note 60 (`RMX3930`)
- **Device Serial:** `0B04731X200003BB`
- **Android Version:** Android 15 (API 35) / Build `U.R4T2.1778116777`
- **Display Resolution:** 720 × 1600 px (~260 dpi)
- **Runtime Environment:** Expo SDK 58 / React Native (Metro on port 8085 via ADB reverse)

---

## 2. Real Device Visual QA Verification Matrix

| Screen    | Variant          | Reference Figma Node | Android Capture File   | Visual Target Match                                           | Functional Verification                            |  Result  |
| :-------- | :--------------- | :------------------- | :--------------------- | :------------------------------------------------------------ | :------------------------------------------------- | :------: |
| **W03-M** | English Overview | `392:405`            | `w03m-en-overview.png` | Step chip, heading, context badge, intake review card         | Clean typography, accurate colors & padding        | **PASS** |
| **W03-M** | English Scrolled | `392:405`            | `w03m-en-scrolled.png` | Scope card, review badge, CTAs, footer                        | Smooth scroll, primary & secondary action triggers | **PASS** |
| **W03-M** | English Notice   | `392:405`            | `w03m-en-notice.png`   | Upcoming W03 notice banner upon tapping primary CTA           | Honest W03 notice, dismiss action works            | **PASS** |
| **W03-M** | Spanish Overview | `980:10826`          | `w03m-es-overview.png` | Localized Spanish title, subtitle, context badge, intake card | Exact Spanish copy from Figma                      | **PASS** |
| **W03-M** | Spanish Scrolled | `980:10826`          | `w03m-es-scrolled.png` | Spanish scope card, review badge, CTAs                        | Full Spanish text, review badge                    | **PASS** |
| **W03-M** | Spanish Notice   | `980:10826`          | `w03m-es-notice.png`   | Localized Spanish upcoming W03 notice banner                  | Spanish notice text & dismiss button               | **PASS** |
| **W03-A** | English Overview | `394:341`            | `w03a-en-overview.png` | Step chip, appliance heading, context badge, intake card      | Double-door refrigerator, dimensions, weight       | **PASS** |
| **W03-A** | English Scrolled | `394:341`            | `w03a-en-scrolled.png` | Scope card, review badge, CTAs, footer                        | Disconnect notice & safe handling, edit CTA        | **PASS** |
| **W03-A** | English Notice   | `394:341`            | `w03a-en-notice.png`   | Upcoming W03 notice banner upon tapping primary CTA           | Honest appliance W03 notice, dismiss action        | **PASS** |
| **W03-A** | Spanish Overview | `980:11306`          | `w03a-es-overview.png` | Spanish appliance header, context badge, data card            | Exact Spanish appliance handoff copy               | **PASS** |
| **W03-A** | Spanish Scrolled | `980:11306`          | `w03a-es-scrolled.png` | Spanish scope card, review badge, CTAs, footer                | Full Spanish text, review badge                    | **PASS** |
| **W03-A** | Spanish Notice   | `980:11306`          | `w03a-es-notice.png`   | Localized Spanish upcoming W03 notice banner                  | Spanish notice text & dismiss button               | **PASS** |
| **W03-T** | English Overview | `394:443`            | `w03t-en-overview.png` | Step chip, mattress heading, context badge, intake card       | 2 Queen mattresses + box spring, dry condition     | **PASS** |
| **W03-T** | English Scrolled | `394:443`            | `w03t-en-scrolled.png` | Scope card, review badge, CTAs, footer                        | Safe disposal & recycling, edit CTA                | **PASS** |
| **W03-T** | English Notice   | `394:443`            | `w03t-en-notice.png`   | Upcoming W03 notice banner upon tapping primary CTA           | Honest mattress W03 notice, dismiss action         | **PASS** |
| **W03-T** | Spanish Overview | `980:11366`          | `w03t-es-overview.png` | Spanish mattress header, context badge, data card             | Exact Spanish mattress handoff copy                | **PASS** |
| **W03-T** | Spanish Scrolled | `980:11366`          | `w03t-es-scrolled.png` | Spanish scope card, review badge, CTAs, footer                | Full Spanish text, review badge                    | **PASS** |
| **W03-T** | Spanish Notice   | `980:11366`          | `w03t-es-notice.png`   | Localized Spanish upcoming W03 notice banner                  | Spanish notice text & dismiss button               | **PASS** |
| **W03-G** | English Overview | `394:545`            | `w03g-en-overview.png` | Step chip, garage heading, context badge, intake card         | 2-car garage ~50% volume, shelving & boxes         | **PASS** |
| **W03-G** | English Scrolled | `394:545`            | `w03g-en-scrolled.png` | Scope card, review badge, CTAs, footer                        | Hazardous material exclusions, edit CTA            | **PASS** |
| **W03-G** | English Notice   | `394:545`            | `w03g-en-notice.png`   | Upcoming W03 notice banner upon tapping primary CTA           | Honest garage W03 notice, dismiss action           | **PASS** |
| **W03-G** | Spanish Overview | `980:11426`          | `w03g-es-overview.png` | Spanish garage header, context badge, data card               | Exact Spanish garage cleanout handoff copy         | **PASS** |
| **W03-G** | Spanish Scrolled | `980:11426`          | `w03g-es-scrolled.png` | Spanish scope card, review badge, CTAs, footer                | Full Spanish text, review badge                    | **PASS** |
| **W03-G** | Spanish Notice   | `980:11426`          | `w03g-es-notice.png`   | Localized Spanish upcoming W03 notice banner                  | Spanish notice text & dismiss button               | **PASS** |

---

## 3. Visual Comparison & Parity Assessment

1. **Card Layout & Typography Hierarchy:** Screen headings render at `25px Inter-Bold` (`#F6F8F6`), subtitles at `12px Inter-Regular` (`#ADB7B1`), section headers at `16px Inter-SemiBold`.
2. **Context Badges:** All context badges use the distinctive dark green container (`#1A2510`) with neon lime checkmark and text (`#BAFF42`), matching Figma design tokens.
3. **Scope Review Badges:** "Review required" / "Revisión necesaria" badge displays consistently across all four screens with elevated surface (`#222827`) and secondary text color (`#ADB7B1`).
4. **Interactive Action Gating:** Primary CTAs render with `#BAFF42` neon lime background and `#080B0B` dark text; when pressed, they reliably trigger honest upcoming W03 notice banners without fabricated pricing, driver dispatch, or quotation simulation. Secondary CTAs correctly route backward to previous service configuration screens.
