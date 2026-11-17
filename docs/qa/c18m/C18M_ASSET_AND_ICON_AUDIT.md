# C18-M Moving Service Intake — Asset & Icon Audit

**Authoritative Figma Node:** `382:881` (`C18-M · Moving intake / W02 [BK-02, BK-03, SV-14]`, 430 × 1643 px)  
**File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Date:** 2026-11-17  
**Phase:** 03.17 (English ONLY)

---

## 1. Visual & Icon Inventory

| # | Visual Element | Figma Node ID | Original Asset Available | Type | Intended Dimensions | Stroke Width / Fill | Color Token | Placement / Role | React Native Implementation |
| :-: | :--- | :-: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | **Status Bar** | `436:2251` (`429:277`) | Yes (Figma instance) | Native / System | 386 × 38 px | None | Transparent / System | Top safe area | Native React Native `StatusBar` / `HaulixSafeArea` (Android standard) |
| 2 | **Flow Header Back Button** | `436:2264` (`429:296`) | Yes | SVG / Component | 42 × 42 px | 1.5px stroke | `#BAFF42` / `#151A19` bg | Floating header y=81 px | [FlowHeaderBack.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/components/navigation/FlowHeaderBack.tsx) |
| 3 | **Step Indicator** | `382:889` | N/A | Text / Pill | 386 × 33 px | None / Surface | `#BAFF42` & `#ADB7B1` | y=158 px | Native `<Text>` inside `#151A19` rounded container |
| 4 | **Customer Booking Context Check** | `382:896` | Yes | SVG Vector | 17 × 17 px | 1.275px stroke | `#BAFF42` (Lime) | Inside `#1A2510` olive badge at y=323 px | `C18MCheckIcon` (reused original SVG vector in `C18MIcons.tsx`) |
| 5 | **Customer Booking Badge** | `382:895` | N/A | Container / Pill | 386 × 39 px | Border `#1F3826` / `#1A2510` bg | `#BAFF42` text | Below header at y=323 px | Native `<View>` with dynamic customer binding |
| 6 | **Moving Route Section Heading** | `382:900` | N/A | Text / Header | 354 × 27 px | None | `#F6F8F6` (Inter SemiBold 16px) | Section A header y=379 px | Native `<Text>` with optional restrained route icon |
| 7 | **Route: Customer Row** | `382:902` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 1 | Native `<View>` two-line layout with `C18MUserIcon` |
| 8 | **Route: Pickup Row** | `382:906` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 2 | Native `<View>` two-line layout with `C18MPickupPinIcon` |
| 9 | **Route: Drop-off Row** | `382:910` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 3 | Native `<View>` two-line layout with `C18MDropoffPinIcon` |
| 10 | **Route: Requested Scope Row** | `382:914` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section A Row 4 | Native `<View>` two-line layout with `C18MScopeIcon` |
| 11 | **Inventory & Access Heading** | `382:919` | N/A | Text / Header | 354 × 27 px | None | `#F6F8F6` (Inter SemiBold 16px) | Section B header y=765 px | Native `<Text>` with optional restrained inventory icon |
| 12 | **Inventory: Large Items Row** | `382:921` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 1 | Native `<View>` two-line layout with `C18MLargeItemsIcon` |
| 13 | **Inventory: Estimated Weight Row** | `382:925` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 2 | Native `<View>` two-line layout with `C18MWeightIcon` |
| 14 | **Inventory: Origin Stairs Row** | `382:929` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 3 | Native `<View>` two-line layout with `C18MStairsIcon` |
| 15 | **Inventory: Destination Stairs Row** | `382:933` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 4 | Native `<View>` two-line layout with `C18MStairsIcon` |
| 16 | **Inventory: Packing Request Row** | `382:937` | N/A | Component / Card | 354 × 64 px | Elevated container | `#222827` bg, `#ADB7B1` label, `#F6F8F6` value | Section B Row 5 | Native `<View>` two-line layout with `C18MPackageIcon` |
| 17 | **Crew Assessment Heading** | `382:942` | N/A | Text / Header | 354 × 27 px | None | `#F6F8F6` (Inter SemiBold 16px) | Section C header y=1228 px | Native `<Text>` with crew shield accent |
| 18 | **Review Required Checkmark** | `382:945` | Yes | SVG Vector | 18 × 18 px | 1.35px stroke | `#FFC85A` (Amber) | Inside `Review required` badge y=1285 px | `C18MReviewCheckIcon` (reused original SVG vector in `C18MIcons.tsx`) |
| 19 | **Primary CTA: Continue Moving Details** | `382:952` (`7:50`) | Yes (Figma component) | ActionButton | 386 × 52 px | Solid Fill `#BAFF42` | `#080B0B` (Dark text) | Action group y=1422 px | Native `<Pressable>` with HAULIX Lime styling |
| 20 | **Secondary CTA: Return to Service List** | `382:954` | N/A | Container / Button | 386 × 56 px | 1px border `#35403B` | `#BAFF42` text | Action group y=1489 px | Native `<Pressable>` with surface styling |
| 21 | **Footer SRS / Demo Disclosures** | `382:956` | N/A | Text Group | 386 × 48 px | None | `#788580` / 10px Inter | Screen bottom y=1562 px | Native `<Text>` centered footnote |

---

## 2. Original Vector Assets Verification

The following original SVG vector assets were extracted directly from the authenticated Figma node `382:881` and downloaded to `docs/qa/c18m/`:

1. `check1.svg` (Node `382:896`):
   - ViewBox: `0 0 17 17`
   - Path: `M2.83333 9.20833L6.375 12.75L14.1667 4.95833`
   - Stroke width: `1.275`
   - Stroke color: `#BAFF42` (HAULIX Brand Lime)
   - Verified usage: Customer Booking Context Pill
2. `check2.svg` (Node `382:945`):
   - ViewBox: `0 0 18 18`
   - Path: `M3 9.75L6.75 13.5L15 5.25`
   - Stroke width: `1.35`
   - Stroke color: `#FFC85A` (HAULIX Amber Warning/Review)
   - Verified usage: Load and Crew Assessment "Review required" status chip

---

## 3. Premium Icon Enhancements (Owner Guidelines)

In strict accordance with project-owner instructions:
- **No Photographic Hero Images:** The C18-M Figma frame is an information card architecture without a photo hero. No decorative truck photography or artificial stock photos are injected.
- **Consistent Geometric Icon Family:** Restrained, semantic line icons matching the approved HAULIX 24×24 grid and 2px stroke width are provided in [C18MIcons.tsx](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/customer/src/components/discovery/C18MIcons.tsx) for detail rows, enhancing visual polish while maintaining exact Figma text hierarchy and alignment.
- **Accessible Contrast:** All text, badges, borders, and icons adhere to `#080B0B` base background, `#151A19` surface, `#222827` elevated cards, and `#35403B` borders.
