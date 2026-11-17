# HAULIX Customer App — Icon & Visual Design Gap Audit

**Date:** November 15, 2026  
**Audited Targets:** C01 Home, C15 Service Discovery, C15-S Service Selected, C16 Service Area Eligibility  
**Platform Reference:** Android 15 (Realme Note 60 `RMX3930`, 720 × 1600 px @ 320 dpi)  
**Authoritative Sources:**

- Owner Target: `references/OWNER_C16_PREMIUM_TARGET.png`
- Primary Figma: Node `382:323` (C16), Node `382:241` (C15-S), Node `382:126` (C15), Node `439:3498` (C01), Node `436:2024` (Flow Header · Back)

---

## 1. Executive Summary

This audit evaluates the iconographic consistency, styling tokens, and layout mechanics across all intake and discovery screens built to date in the HAULIX Customer App. The audit specifically inspects the root cause of the previous **Back Button Visibility Regression** on scrollable screens, documents the newly introduced **C16 Premium Icon Suite**, and establishes design tokens and architectural guidelines to prevent visual drift in subsequent booking intake phases (C17, C18, W03).

---

## 2. Root Cause Analysis: Flow Header Back Visibility

### 2.1 The Issue

On `service-selected.tsx` (C15-S), user QA reported that when scrolling down to view steps or action buttons, the Flow Header and its back arrow scrolled off-screen, stranding the customer without a visible in-app back mechanism.

### 2.2 Root Cause

Previously, `C15SFlowHeaderBack` was rendered inside the `ScrollView`’s `contentContainer`. On devices with screen heights under 1000dp or when users scrolled downward, all elements inside `ScrollView` moved up and out of viewport bounds.

### 2.3 Centralized Solution

1. **Component Extraction:** Created `apps/customer/src/components/navigation/FlowHeaderBack.tsx` conforming to Figma Node `436:2024`:
   - Nominal `42 × 42 px` button with `39 × 39 px` inner circle (`#151A19`, border `#222B27`).
   - `23 × 23 px` chevron arrow (`#F6F8F6`, strokeWidth: 2, round linecap/join).
   - Centered `HAULIX` wordmark (`HAUL` white, `IX` brand lime, registered trademark symbol).
   - Tagline `"We Haul It All."` (`#8FA397`).
   - Hit area expanded with `hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}` delivering an effective touch target ≥ `48 × 48 dp`.
   - Structural styles: `height: 56`, `backgroundColor: colors.background` (`#080D0C`), `zIndex: 20`, `elevation: 4`.
2. **Pinned Placement:** Mounted `FlowHeaderBack` directly inside `HaulixSafeArea` **above** the `ScrollView`. The header remains firmly anchored at the top at all times, visible before, during, and after any scroll depth.

---

## 3. Screen-by-Screen Icon Inventory & Gap Analysis

| Screen               | Route                    | Icons Used                                                                                                         | Container / Badge Style                                                     | Vertical Divider            | Status                             |
| :------------------- | :----------------------- | :----------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :-------------------------- | :--------------------------------- |
| **C01 Home**         | `/(app)/index.tsx`       | 12 SVG Icons (Junk, Moving, Furniture, Appliance, Mattress, Garage, Store, Assembly, Search, Location, Home, Bell) | Grid tile containers (`#151A19`, border `#222B27`), lime `#BAFF42` stroke   | N/A                         | Fully aligned with Node `439:3498` |
| **C15 Discovery**    | `/service-discovery.tsx` | 7 Category SVGs (`C15Icons.tsx`) + `ContextCheckIcon`                                                              | Large list cards (`#151A19`, border `#222B27`), lime `#BAFF42` leading icon | N/A                         | Fully aligned with Node `382:126`  |
| **C15-S Selected**   | `/service-selected.tsx`  | `C15SSelectedTruckIcon`, `ContextCheckIcon`, Category icons, Pinned `FlowHeaderBack`                               | Inner selected card (`#101614`, 2px lime border `#BAFF42`), SELECTED badge  | N/A                         | Corrected with pinned header       |
| **C16 Service Area** | `/service-area.tsx`      | 10 Premium SVGs (`C16Icons.tsx`), Pinned `FlowHeaderBack`                                                          | Circular badges with `rgba(186, 255, 66, 0.12)`, dark tiles `#101614`       | 1px vertical line `#222B27` | Premium target aligned             |

---

## 4. C16 Premium Icon Suite Specifications

All 10 icons are implemented as responsive, typed SVG components in `apps/customer/src/components/discovery/C16Icons.tsx`:

1. **`C16LocationPinIcon`** (`24 × 24` viewBox):
   - Used in `Requested pickup region` header badge (lime `#BAFF42` inside 32px circular pill).
   - Used in primary `Use this location` CTA (dark `#080D0C` on lime button).
2. **`C16HomeIcon`** (`24 × 24` viewBox):
   - Used in `Street address` row. Stroke: `#BAFF42`.
3. **`C16BuildingsIcon`** (`24 × 24` viewBox):
   - Used in `City` row. Dual-building architectural line art. Stroke: `#BAFF42`.
4. **`C16MapFoldIcon`** (`24 × 24` viewBox):
   - Used in `State` row. 3-panel folded map line art. Stroke: `#BAFF42`.
5. **`C16PostalEnvelopeIcon`** (`24 × 24` viewBox):
   - Used in `ZIP code` row. Flapped envelope line art. Stroke: `#BAFF42`.
6. **`C16ShieldCheckIcon`** (`24 × 24` viewBox):
   - Used in `Arizona request – Demo eligible` header badge. Stroke: `#BAFF42`.
7. **`C16DemoCheckIcon`** (`20 × 20` viewBox):
   - Used in `Completed in this demo` status ribbon. Stroke: `#BAFF42`.
8. **`C16SwapArrowsIcon`** (`24 × 24` viewBox):
   - Used in `Choose another location ›` secondary CTA. Stroke: `#BAFF42`.
9. **`C16CrosshairIcon`** (`24 × 24` viewBox):
   - Used in `See outside-zone response ›` secondary CTA. Stroke: `#BAFF42`.
10. **`C16InfoCircleIcon`** (`24 × 24` viewBox):
    - Used in `Location permission help ›` secondary CTA. Stroke: `#BAFF42`.

---

## 5. Architectural Recommendations for Upcoming Phases

1. **Intake Flow Navigation (C17, C18, W03):**
   - Must import and mount `FlowHeaderBack` directly above `ScrollView` inside `HaulixSafeArea`.
   - Never nest `FlowHeaderBack` inside `ScrollView` or inside sub-sections.
2. **Iconography Standard:**
   - Always export typed functional components via `react-native-svg` with `size` and `color` props defaulting to HAULIX design tokens.
   - For CTA buttons, secondary buttons must pair lime `#BAFF42` icons with dark backgrounds, while primary buttons must pair dark `#080D0C` icons with lime `#BAFF42` backgrounds.
3. **Multi-Item Cards:**
   - When displaying structured address or attribute rows, adopt the C16 pattern: `26px` icon wrap, `1px` vertical line `#222B27`, followed by a 2-line column (`11px` label `#8FA397` + `15px` value `#F6F8F6`).
