# HAULIX Customer Mobile App — Phase 03.44A

## W05 Original Map Layer Specification

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.44A  
**TARGET:** High-Fidelity Dispatch & Tracking Map Vector Architecture  
**SOURCE REFERENCE:** Canonical Concept Node `111:13` (`C05 · Job Tracking`) & Master W05 Section `836:4571`

---

### Layer 1: Geographic Canvas Base & City Blocks

- **Base Fill:** `#0B0F0E` (HAULIX primary dark surface token)
- **Urban Blocks Grid:** `#141C19` with `#1C2421` borders, 4px corner radii.
- **Urban Parks / Open Spaces:** `#0F1D1A` with sage green stroke `#183027`.
- **Canal / Water Features:** `#091412` primary stroke (18px) with `#112520` inner depth flow (10px).
- **Aspect Ratio & Nominal Canvas:** 380 × 300 viewBox, dynamically scalable with zoom levels `0.75x` to `1.4x`.

---

### Layer 2: Street Network & Highway Geometry

- **Local Grid Roads:** `#1C2622` (width 2px) arranged along Phoenix arterial coordinates.
- **Primary Arterials (McDowell Rd, Thomas Rd, Central Ave, 7th St):** `#2A3A34` (width 4.5px) with rounded caps and joins.
- **Highway Expressway Corridor (I-10 Papago Freeway):**
  - Outer Casing: `#1F2D27` (width 8px).
  - Inner Core: `#364A42` (width 5px).
  - Geometry: Smooth cubic Bézier curve `C110 40, 220 50, 380 35` crossing the northern canvas.

---

### Layer 3: Road-Following Route Polyline

- **Active Tracking Route (Mode: `en_route`):**
  - Core Stroke: `#BAFF42` (HAULIX Brand Neon Lime), width 4.5px.
  - Glowing Route Halo: `rgba(186, 255, 66, 0.25)`, width 11px.
  - Polyline Path: Strictly follows the rectilinear street network:
    - Starts at Driver en-route location `(180, 120)` on Thomas Rd.
    - Proceeds east along Thomas Rd to 7th St junction `(280, 120)`.
    - Turns south along 7th St to `(280, 225)`.
    - Turns west into pickup access road `(275, 225)`.
    - **Never cuts diagonally across urban blocks.**
- **Matched Driver Preliminary Route (Mode: `matched`):**
  - Core Stroke: `#38BDF8` (Sky Blue), width 3.5px with `strokeDasharray="6,4"`.
  - Ambient Glow: `rgba(56, 189, 248, 0.35)`, width 7px.

---

### Layer 4: Interactive Markers & Vehicle Orientation

- **Pickup Anchor Marker:**
  - Outer Ground Pulse Halo: Circle radius 14px (28px diameter), `rgba(186, 255, 66, 0.20)` fill, `#BAFF42` 1px border with `strokeDasharray="3,2"`.
  - Core Pin: `C32LocationPinIcon` (24px, `#BAFF42`) centered over pickup anchor `(275, 225)`.
- **Driver Van Marker (Mode: `en_route`):**
  - Concentric Expanding Halo: Radius 22px, `rgba(186, 255, 66, 0.25)`.
  - Inner Contrast Disc: Radius 16px, `#0B0F0E` with `#BAFF42` border (2.5px).
  - Van Silhouette: High-roof cargo van oriented in direction of travel.
- **Search Radar Marker (Mode: `searching`):**
  - Concentric Expanding Pulses: 3 radial waves expanding to radius 80px, 55px, and 32px with `#BAFF42` gradient fills.

---

### Layer 5: Floating Map Controls & Overlays

- **Floating Status Capsule:**
  - Position: Top-center of viewport (`top: 14px`, `alignItems: "center"`).
  - Background: `rgba(11, 15, 14, 0.94)`, border `#26332E`, radius 20px.
  - Searching Badge: Pulsing lime dot + `t("c32Map.searchingBadge")`.
  - Matched Badge: Blue dot + `t("c32Map.matchedBadge")`.
  - En Route Badge: Lime dot + `t("c32Map.crewEnRouteBadge")`.
- **Right Action Rail:**
  - Zoom Pill: Radius 10px, border `#26332E`, background `rgba(22, 29, 26, 0.92)`. Plus (`#BAFF42`) and Minus (`#ADB7B1`) with 1px divider.
  - Recenter Crosshair: 38 × 38 px circle, `#161D1A` background, `#26332E` border, `#BAFF42` reticle.
  - Recenter Toast: Temporary floating pill `t("c32Map.recenterNotice")` appears on recenter.
