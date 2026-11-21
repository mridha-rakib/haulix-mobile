# HAULIX Customer Mobile App — Phase 03.46

## Layout Hierarchy, Vertical Spacing & Density Remediation

**PHASE:** 03.46  
**WORKFLOW:** W05 — Dispatch & Assignment  
**DEVICE TARGET:** Realme Note 60 (`RMX3930`), 720 × 1600 px  
**DATE:** 2026-11-21

---

### 1. Architectural Layout Standard

Across all eight canonical W05 dispatch screens, the Figma design establishes a strict top-down visual cadence:

```
┌────────────────────────────────────────────────────────┐
│  FlowHeaderBack (Back Arrow + HAULIX® + Tagline)      │  <-- 56px fixed header
├────────────────────────────────────────────────────────┤
│  5-Step Dispatch Progress Track                        │  <-- Booked · Dispatch · Driver · Arrival · Service
├────────────────────────────────────────────────────────┤
│  Hero Section (Headline + Subtitle)                    │  <-- 24-26px bold, 13-14px subtitle
├────────────────────────────────────────────────────────┤
│  Location & Service Area Pill                          │  <-- Phoenix, AZ 85014 with status indicator
├────────────────────────────────────────────────────────┤
│  Authentic HaulixDispatchMap (386 × 235 px)            │  <-- 16px radius, border #1E2723
├────────────────────────────────────────────────────────┤
│  Screen Cards / Detail Panels / Timelines              │  <-- Bottom scrollable cards
├────────────────────────────────────────────────────────┤
│  Action Buttons (Primary CTA + Secondary CTA + Link)   │  <-- High-contrast touch actions
└────────────────────────────────────────────────────────┘
```

---

### 2. Discrepancies Remediated in Phase 03.46

#### Issue 1: Redundant Brand Wordmark Row

- **Previous State:** Screens contained a `<View style={styles.brandRow}>` rendering `HAULIX` and `WE HAUL IT ALL.` directly below `FlowHeaderBack`.
- **Remediation:** Removed the duplicated brand row. `FlowHeaderBack` already renders the authoritative centered wordmark and tagline.
- **Visual Impact:** Eliminated duplicate header branding, restored 44px of vertical screen real estate, and allowed the 5-step progress bar or hero header to sit at its authentic Figma vertical coordinate.

#### Issue 2: Map Frame Height Harmonization

- **Previous State:** Screens specified disparate map container heights (`height={340}`, `height={300}`, `height={290}`, `height={240}`).
- **Remediation:** Standardized default map viewport height to **235 px** (matching Figma's `386 × 235 px` nominal frame geometry, aspect ratio ~1.642).
- **Visual Impact:** Bottom cards and primary actions are now immediately visible above the fold on 720 × 1600 px Android displays without excessive initial scrolling.

#### Issue 3: C32-D Map Inclusion

- **Previous State:** Screen C32-D (`/cancellation-windows`) omitted the map component entirely, replacing it with an oversized text card.
- **Remediation:** Added `HaulixDispatchMap mode="cancellation_windows" height={235}` in exact compliance with Figma Frame `844:6162` (node `846:5210`).
- **Visual Impact:** C32-D now presents symmetrical design language with the other 7 W05 screens.

---

### 3. Screen-by-Screen Layout Verification

| Screen ID  | Canonical Route          | Progress Track           | Map Height | Card Padding | Scroll Ergonomics                    |
| ---------- | ------------------------ | ------------------------ | ---------- | ------------ | ------------------------------------ |
| **C32-A**  | `/searching-for-driver`  | Step 2 (Dispatch active) | 235 px     | 16 px        | Primary actions accessible           |
| **C32-B**  | `/driver-matched`        | Step 3 (Driver active)   | 235 px     | 16 px        | Driver profile card fully visible    |
| **C32-C**  | `/crew-tracking`         | Step 3 (Driver active)   | 235 px     | 16 px        | Timeline and contact card aligned    |
| **C32-D**  | `/cancellation-windows`  | Step 2 (Dispatch active) | 235 px     | 16 px        | 3-tier cancellation cards accessible |
| **W05-ND** | `/no-driver-available`   | Step 2 (Dispatch active) | 235 px     | 16 px        | Reschedule & fee-free CTAs visible   |
| **W05-DL** | `/driver-arrival-update` | Step 3 (Driver active)   | 235 px     | 16 px        | Arrival delay & driver info visible  |
| **W05-RA** | `/driver-reassigned`     | Step 3 (Driver active)   | 235 px     | 16 px        | Reassignment card & ETA visible      |
| **W05-CN** | `/request-canceled`      | Step 2 (Dispatch active) | 235 px     | 16 px        | $0 fee badge & recovery CTAs visible |

---

### 4. Hardware Verification Conclusion

Verified on physical **Realme Note 60** running Android 15:

- All screens exhibit proper typographic hierarchy.
- No text collisions or unexpected line overflows in either English or Spanish.
- Status: **PASSED & APPROVED**.
