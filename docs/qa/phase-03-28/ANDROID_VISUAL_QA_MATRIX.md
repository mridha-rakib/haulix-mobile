# Phase 03.28 — Physical Android Visual QA Matrix

## 1. Test Device Information

- **Brand / Model:** Realme Note 60 (`RMX3930`)
- **Device Serial:** `0B04731X200003BB`
- **Android Version:** Android 15 (API 35) / Build `U.R4T2.1778116777`
- **Display Resolution:** 720 × 1600 px (~260 dpi)
- **Runtime Environment:** Expo SDK 58 / React Native (Metro on port 8085 via ADB reverse)

---

## 2. Real Device Visual QA Verification Matrix

| Screen    | Variant          | Reference Figma Node | Android Capture File   | Visual Target Match                                                | Functional Verification                            |  Result  |
| :-------- | :--------------- | :------------------- | :--------------------- | :----------------------------------------------------------------- | :------------------------------------------------- | :------: |
| **W03-F** | English Overview | `394:239`            | `w03f-en-overview.png` | Step chip, heading, context badge, intake review card              | Clean typography, accurate colors & padding        | **PASS** |
| **W03-F** | English Scrolled | `394:239`            | `w03f-en-scrolled.png` | Scope card, review badge, CTAs, footer                             | Smooth scroll, primary & secondary action triggers | **PASS** |
| **W03-F** | English Notice   | `394:239`            | `w03f-en-notice.png`   | Upcoming W03 notice banner upon tapping primary CTA                | Honest C22-D-FUR notice, dismiss action works      | **PASS** |
| **W03-F** | Spanish Overview | `980:11246`          | `w03f-es-overview.png` | Localized Spanish title, subtitle, context badge, intake card      | Exact Spanish copy from Figma                      | **PASS** |
| **W03-F** | Spanish Scrolled | `980:11246`          | `w03f-es-scrolled.png` | Spanish scope card, review badge, CTAs                             | Full Spanish text, review badge                    | **PASS** |
| **W03-F** | Spanish Notice   | `980:11246`          | `w03f-es-notice.png`   | Localized Spanish upcoming W03 notice banner                       | Spanish notice text & dismiss button               | **PASS** |
| **W03-R** | English Overview | `392:507`            | `w03r-en-overview.png` | Step chip, retail heading, context badge, intake card              | Home Depot order, destination, packaged shelving   | **PASS** |
| **W03-R** | English Scrolled | `392:507`            | `w03r-en-scrolled.png` | Scope card, review badge, CTAs, footer                             | Packaging & delivery access review, edit CTA       | **PASS** |
| **W03-R** | English Notice   | `392:507`            | `w03r-en-notice.png`   | Upcoming W03 notice banner upon tapping primary CTA                | Honest retail C22-D-RET notice, dismiss action     | **PASS** |
| **W03-R** | Spanish Overview | `980:10946`          | `w03r-es-overview.png` | Spanish retail header, context badge, data card                    | Exact Spanish retail handoff copy                  | **PASS** |
| **W03-R** | Spanish Scrolled | `980:10946`          | `w03r-es-scrolled.png` | Spanish scope card, review badge, CTAs, footer                     | Full Spanish text, review badge                    | **PASS** |
| **W03-R** | Spanish Notice   | `980:10946`          | `w03r-es-notice.png`   | Localized Spanish upcoming W03 notice banner                       | Spanish notice text & dismiss button               | **PASS** |
| **C22**   | English Overview | `412:195`            | `c22-en-overview.png`  | Flow marker, title, subtitle, saved booking ledger, intake card    | FlowHeaderStart (no back arrow), sharp layout      | **PASS** |
| **C22**   | English Scrolled | `412:195`            | `c22-en-scrolled.png`  | 4 photo rows (Sofa, Mattresses, Table, Other), advisory card, CTAs | 4 original images, advisory note, 4 action buttons | **PASS** |
| **C22**   | English Notice   | `412:195`            | `c22-en-notice.png`    | Upcoming notice upon tapping secondary action                      | Honest C23-M / C22-E / C22-O notice                | **PASS** |
| **C22**   | Spanish Overview | `987:9929`           | `c22-es-overview.png`  | Spanish flow marker, title, subtitle, ledger, intake card          | Exact Spanish copy from Figma                      | **PASS** |
| **C22**   | Spanish Scrolled | `987:9929`           | `c22-es-scrolled.png`  | Spanish 4 photo rows, advisory card, CTAs, footer                  | 4 original images, Spanish advisory note, CTAs     | **PASS** |
| **C22**   | Spanish Notice   | `987:9929`           | `c22-es-notice.png`    | Localized Spanish upcoming notice banner                           | Spanish notice text & dismiss button               | **PASS** |
| **C22-P** | English Overview | `412:262`            | `c22p-en-overview.png` | Flow marker, title, subtitle, ledger, 4 progress rows              | Complete, Processing, Pending, Pending statuses    | **PASS** |
| **C22-P** | English Scrolled | `412:262`            | `c22p-en-scrolled.png` | 2 analyzed evidence photos (Sofa, Mattresses), notice, CTAs        | 2 original photos, simulated state notice          | **PASS** |
| **C22-P** | English Notice   | `412:262`            | `c22p-en-notice.png`   | Upcoming notice upon tapping primary / secondary CTAs              | Honest C22-D / C22-F / C22-Q notices               | **PASS** |
| **C22-P** | Spanish Overview | `987:10006`          | `c22p-es-overview.png` | Spanish flow marker, title, subtitle, ledger, progress rows        | Exact Spanish progress rows from Figma             | **PASS** |
| **C22-P** | Spanish Scrolled | `987:10006`          | `c22p-es-scrolled.png` | Spanish evidence photos, notice, CTAs, footer                      | 2 original photos, Spanish state notice            | **PASS** |
| **C22-P** | Spanish Notice   | `987:10006`          | `c22p-es-notice.png`   | Localized Spanish upcoming notice banner                           | Spanish notice text & dismiss button               | **PASS** |

---

## 3. Visual Comparison & Parity Assessment

1. **Card Layout & Typography Hierarchy:** Screen headings render at `25px Inter-Bold` (`#F6F8F6`), subtitles at `12px Inter-Regular` (`#ADB7B1`), section headers at `16px–17px Inter-SemiBold`.
2. **Context & Ledger Badges:** Badges use the distinctive dark green container (`#1A2510`) with neon lime checkmark and text (`#BAFF42`), matching Figma design tokens.
3. **Flow Header Behavior:**
   - W03-F, W03-R, and C22-P correctly utilize `FlowHeaderBack` with native circle back button and centered HAULIX wordmark.
   - C22 correctly utilizes `FlowHeaderStart` with centered HAULIX wordmark and **no back button**, strictly adhering to Figma Node `412:195`.
4. **Original Image Fidelity:** C22 renders 4 crisp original photographic thumbnails (Sofa, Queen Mattresses, Dining Table, Other Junk), while C22-P renders 2 original thumbnails (Sofa, Mattresses), matching Figma layout and 9px corner radii.
5. **Interactive Action Gating:** Primary CTAs render with `#BAFF42` neon lime background and `#080B0B` dark text; when pressed, they reliably trigger honest upcoming notice banners without fabricated pricing, driver dispatch, or quotation simulation.
