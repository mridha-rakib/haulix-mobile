# C15-S English — Read-only Authoritative Figma Audit

**Figma file:** `Q946h4YBGgyLsjnPtdyQNe`  
**Source node:** `382:241` — `C15-S · Junk Removal selected / W02 [BK-01, BK-02, SV-01]`  
**Canvas:** 430 × 1015 px, dark background `#080B0B`, source marked as W02 Service Discovery & Intake  
**URL:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=382-241

## Visible original hierarchy (local coordinates, root 430 × 1015)

| Layer                               | Node                |                   x |   y | width | height | Notes                                                   |
| ----------------------------------- | ------------------- | ------------------: | --: | ----: | -----: | ------------------------------------------------------- |
| iOS status bar, _illustrative only_ | 436:1963            |                  22 |  26 |   386 |     38 | On Android use real system StatusBar                    |
| Flow Header · Back                  | 436:1976            |                  22 |  81 |   386 |     60 | Back circle, centered HAUL/IX wordmark, We Haul It All. |
| Step indicator                      | 382:249             |                  22 | 158 |   386 |     33 | `W02 · SERVICE DISCOVERY & INTAKE / C15-S`              |
| Heading                             | 382:252             |                  22 | 208 |   386 |     98 | `Junk Removal`, subtitle                                |
| Booking context chip                | 382:255             |                  22 | 323 |   386 |     39 | SARAH MITCHELL · HX-DEMO-1027                           |
| Selected service card               | 382:259             |                  22 | 379 |   386 |    221 | Title and selected tile                                 |
| Inner selected tile                 | I382:262 (instance) | 16 relative to card |  57 |   340 |    121 | Lime stroke, SVG truck 31×31, green SELECTED label      |
| How this booking works card         | 382:272             |                  22 | 617 |   386 |    160 | Three explanatory lines                                 |
| Actions (2)                         | 382:278             |                  22 | 794 |   386 |    123 | Continue to service area and Change service             |
| Footer                              | 382:284             |                  22 | 934 |   386 |     48 | DEMO ONLY, no real booking                              |
| Explicit back hit area              | 436:1985            |                  22 |  90 |    42 |     42 | Navigation / Back to C15                                |

### Selected tile content

- `SELECTED` — source instance `I382:262;317:83`
- `Junk Removal` — source instance `I382:262;317:84`
- `Non-hazardous junk and bulky-item pickup` — source instance `I382:262;317:85`
- SVG **truck** (`I382:262;317:79`) even for Junk Removal: preserve this exact icon for screenshot fidelity in default Junk state. Do not silently substitute the C15 trash icon in this approved default state. Alternate service visuals (not supplied as C15-S variants) may reuse existing C15 semantic icons but must not be called Figma-verified.
- `Illustrative draft · No price calculated yet` — `382:271`

### Exact screen copy

**Heading**: `Junk Removal`  
**Subtitle**: `Selected for booking HX-DEMO-1027. Confirm where the crew will collect your items.`  
**Chip**: `SARAH MITCHELL · HX-DEMO-1027`  
**Card heading**: `Selected service`  
**Second card**: `How this booking works`

Steps:

1. `Confirm eligible Arizona pickup address`
2. `Describe items, access and upload supporting photos`
3. `Review corrected AI suggestions in W03 before a quote`

Buttons (source nested instance copy inspected):

- `Continue to service area` — CTA `I382:280;7:51`, link `382:279` → Figma C16 `382:323`
- `Change service   ›` — `382:283`, link `382:282` → C15

Footer:

- `DEMO ONLY  ·  No confirmed booking, rates or payment`
- `SRS  BK-01, BK-02, SV-01  ·  430 px / vertical scroll`

## Source fidelity vs runtime behavior

The Figma authoring frame displays **only Junk Removal selected**, as an exemplar. The previously built C15 supports selecting any of the **seven** permitted categories. The same C15-S component must show the chosen service in runtime without hardcoding Junk Removal as every service. That dynamic behavior is a frontend inference and **not an independently approved C15-S variant**. Preserve default screenshot fidelity for Junk.

Unlike Home/Account, this is part of the **W02 booking flow with a Back header**, and the **bottom navigation must not appear**. Original image or photo assets are not present in this C15-S frame. Do not draw the iOS status bar in Android.

Two original SVG fragments exported from the exact Figma source and packaged:

- `I382:262;317:79` — selected tile truck icon (31×31)
- `I436:1976;429:298` — back arrow (23×23)

Other components (wordmark, native CTA, color system, C15 icons, notice banner) should be reused from the local repo.
