# HAULIX Customer Mobile App — Phase 03.47
# S20, S30, S40, S50 Search Progression Implementation Report

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/S20_S30_S40_S50_IMPLEMENTATION_REPORT.md`  
**COMPONENTS:** `W05SearchStageScreen.tsx` + 4 App Routes  
**STATUS:** COMPLETE & VERIFIED  

---

## 1. Architectural Strategy

Rather than duplicating four 500-line screen files with identical layout structures, Phase 03.47 implemented a reusable, strongly-typed component architecture:

- **Shared Core Component:** `apps/customer/src/components/dispatch/W05SearchStageScreen.tsx`
- **Route Wrappers (Under 30 lines each):**
  - `apps/customer/app/(app)/search-expanded-20mi.tsx` (Route `/search-expanded-20mi`)
  - `apps/customer/app/(app)/search-expanding-30mi.tsx` (Route `/search-expanding-30mi`)
  - `apps/customer/app/(app)/search-expanded-40mi.tsx` (Route `/search-expanded-40mi`)
  - `apps/customer/app/(app)/search-expanded-50mi.tsx` (Route `/search-expanded-50mi`)

This pattern prevents code bloat, simplifies maintenance, and ensures 100% layout and spacing consistency across the entire search sequence.

---

## 2. Stage Breakdown & Fidelity Comparison

### Stage S20: Search Expanded to 20 Miles
- **Figma Reference:** `844:4670` (EN) / `844:6820` (ES)
- **Map Mode:** `mode="s20"` (`map-s20-searching.png` / `map-s20-searching-es.png`)
- **Badge Capsule:** `EXPANDED · 20 MI` / `AMPLIADO · 20 MI`
- **Summary Text:** Contacting qualified drivers in the 20-mile zone.
- **Timeline Items:**
  1. Broadening search radius (expanding from initial 10-mile radius).
  2. Checking driver availability (querying verified haulers active in Phoenix).
  3. Auto-advance if unassigned (next tier triggers if no response within standard window).
- **Primary CTA:** "Continue to 30-mile search" → Navigates to `/search-expanding-30mi`.
- **Secondary CTA:** "Preview driver assignment" → Navigates to `/driver-matched`.
- **Alternative Link:** "Cancellation options" → Navigates to `/cancellation-windows`.

### Stage S30: Search Radius Expanding (30 Miles)
- **Figma Reference:** `844:4769` (EN) / `844:6919` (ES)
- **Map Mode:** `mode="s30"` (`map-s30-searching.png` / `map-s30-searching-es.png`)
- **Badge Capsule:** `EXPANDING · 30 MI` / `AMPLIANDO · 30 MI`
- **Summary Text:** Extending broadcast to intermediate metro coverage.
- **Timeline Items:**
  1. 30-mile coverage active (dispatch broadcast sent to tier-2 partners).
  2. Evaluating route matches (matching driver capacity with confirmed inventory).
  3. Standby for acceptance (drivers given priority acceptance window).
- **Primary CTA:** "Continue monitoring" → Navigates to `/search-expanded-40mi`.
- **Secondary CTA:** "Preview driver assignment" → Navigates to `/driver-matched`.
- **Alternative Link:** "Cancellation options" → Navigates to `/cancellation-windows`.

### Stage S40: Search Expanded to 40 Miles
- **Figma Reference:** `844:4868` (EN) / `844:7018` (ES)
- **Map Mode:** `mode="s40"` (`map-s40-searching.png` / `map-s40-searching-es.png`)
- **Badge Capsule:** `EXPANDED · 40 MI` / `AMPLIADO · 40 MI`
- **Summary Text:** Outer metro fleet pinged for availability.
- **Timeline Items:**
  1. Outer metro tier active (broadcast covers East and West Valley hubs).
  2. Incentive boost applied (higher acceptance priority for distant drivers).
  3. Final expansion pending (approaching maximum 50-mile system perimeter).
- **Primary CTA:** "Continue to 50-mile search" → Navigates to `/search-expanded-50mi`.
- **Secondary CTA:** "Preview driver assignment" → Navigates to `/driver-matched`.
- **Alternative Link:** "Cancellation options" → Navigates to `/cancellation-windows`.

### Stage S50: Searching Up to 50 Miles (Maximum Perimeter)
- **Figma Reference:** `844:4967` (EN) / `844:7117` (ES)
- **Map Mode:** `mode="s50"` (`map-s50-searching.png` / `map-s50-searching-es.png`)
- **Badge Capsule:** `MAX RADIUS · 50 MI` / `RADIO MÁXIMO · 50 MI`
- **Summary Text:** Final search radius reached. Awaiting acceptance or resolution.
- **Timeline Items:**
  1. Maximum radius reached (covering entire Maricopa County service perimeter).
  2. Extended response timer (allowing extra time for remote crews to respond).
  3. Recovery options ready (fee-free reschedule or cancel available if no match).
- **Primary CTA:** "Review driver-offer status" → Navigates to `/no-driver-available`.
- **Secondary CTA:** "Preview assignment" → Navigates to `/driver-matched`.
- **Alternative Link:** "Cancellation options" → Navigates to `/cancellation-windows`.

---

## 3. Verified UX Improvements

1. **Hardware Back Button:** Fully supported across all 4 stages, smoothly navigating backwards to the previous search stage.
2. **Deterministic State:** No random mock timers or forced navigation on mount.
3. **Locale Sync:** Query param `?previewLocale=es` instantaneously switches all headers, status badges, timeline items, buttons, and raster map images without screen flashing.
