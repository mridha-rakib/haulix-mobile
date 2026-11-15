# Figma Audit — C15 English Service Discovery

**Checked:** 2026-11-14. Source file key: `Q946h4YBGgyLsjnPtdyQNe`. **Authoritative visible node:** `382:126` (`C15 · Service discovery / W02 [BK-01, SV-01, AI-12]`), **430×1791**. This is in the W02 Service Discovery & Intake working-copy section. Frame was inspected via Figma node hierarchy, `get_design_context`, and screenshot. Design reference: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=382-126

## Verified visual anatomy (coordinates relative to frame)

| Visible element                                  | Node       |   x |    y | Width | Height |
| ------------------------------------------------ | ---------- | --: | ---: | ----: | -----: |
| Status bar prototype (not for Android rendering) | `436:1944` |  22 |   26 |   386 |     38 |
| HAULIX Flow Header · Start                       | `436:1957` |  22 |   81 |   386 |     60 |
| W02 step chip                                    | `382:134`  |  22 |  158 |   386 |     33 |
| Screen heading                                   | `382:137`  |  22 |  208 |   386 |     98 |
| Customer demo chip                               | `382:140`  |  22 |  323 |   386 |     39 |
| Service area                                     | `382:144`  |  22 |  379 |   386 |    160 |
| Available services card                          | `382:149`  |  22 |  556 |   386 |    684 |
| For Sarah Mitchell card                          | `382:221`  |  22 | 1257 |   386 |    162 |
| Four CTAs group                                  | `382:230`  |  22 | 1436 |   386 |    257 |
| Demo footer                                      | `382:238`  |  22 | 1710 |   386 |     48 |

The seven service rows are `354×76` with top coordinates within available-services container: `57, 146, 235, 324, 413, 502, 591`, i.e. 89px step. Item-to-item gap 13px. Each row contains icon, 265px text column, chevron. Seven row nodes (in order): `382:152`, `382:160`, `382:171`, `382:179`, `382:187`, `382:195`, `382:203`.

## Important distinctions from C01 Home

- This screen has **seven service choices**, NOT eight; `Assembly Add-on` is not shown.
- **NO bottom navbar** (booking-flow / step screen). Flow Header Start **omits notification bell**. Native Android status bar must be used instead of simulated iOS 9:41 UI.
- This screen contains **no raster photographs**. Reuse SVG-only design assets and existing brand typography.
- Figma initial selected service reflected in CTA/demo text: `Junk Removal`.
- Brand palette: `#080B0B` background, `#BAFF42` lime, `#F6F8F6` primary text, `#ADB7B1` secondary text. Preserve source card/elevation colors.

## Exact destination graph (Figma hyperlinks; all future screens)

| C15 source                            | Target            | Figma destination node | Current app action                    |
| ------------------------------------- | ----------------- | ---------------------- | ------------------------------------- |
| Junk Removal row                      | C18-J intake      | `382:805`              | Select preview + upcoming notice only |
| Moving row                            | C18-M intake      | `382:881`              | Select preview + upcoming notice only |
| Furniture Pickup row                  | C18-F intake      | `382:959`              | Select preview + upcoming notice only |
| Appliance Removal row                 | C18-A intake      | `387:177`              | Select preview + upcoming notice only |
| Mattress Removal row                  | C18-T intake      | `387:274`              | Select preview + upcoming notice only |
| Garage Cleanout row                   | C18-G intake      | `382:1056`             | Select preview + upcoming notice only |
| Store Pickup row                      | C18-R intake      | `382:1115`             | Select preview + upcoming notice only |
| `Select Junk Removal` primary         | C15-S selected    | `382:241`              | Upcoming state disclosure only        |
| `Check Service Area ›`                | C16 eligibility   | `382:323`              | Upcoming state disclosure only        |
| `View location restrictions ›`        | C16-F out of area | `382:419`              | Upcoming state disclosure only        |
| `Service not listed? Check options ›` | C15-E not matched | `382:287`              | Upcoming state disclosure only        |

**Provenance note:** The 7 cards and exact EN wording/dimensions above come directly from visible C15 frame. Behavior for unbuilt screens is an honest frontend fallback, not a screenshot-driven design feature.
