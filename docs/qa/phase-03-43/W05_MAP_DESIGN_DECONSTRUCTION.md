# HAULIX Customer Mobile App — Phase 03.43

## W05 Map Design Deconstruction: Layers, Geometry & Visual Hierarchy

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.43  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Focus:** Visual Layer Deconstruction of HAULIX Map Architecture (P0 Visual Requirement)  
**Date:** 2026-11-21

---

### 1. The P0 Visual Mandate

> _"THE MAP DESIGN MUST MATCH THE ORIGINAL FIGMA DESIGN AS CLOSELY AS TECHNICALLY POSSIBLE._  
> *This is the highest visual priority of Phase 03.43.*  
> *Do not create an approximate or generic map.*  
> *Do not substitute a random map screenshot.*  
> *Do not use an unrelated Google Maps or Mapbox default style and claim it matches Figma.*  
> *The map must look like the actual Figma map—not merely like a map from a similar application."*

---

### 2. Multi-Layer Map Anatomy

The original HAULIX map composition (demonstrated in canonical concept `111:13: C05 · Job Tracking` and Master W05 Section `836:4571`) is composed of five distinct visual layers:

```
┌──────────────────────────────────────────────────────────┐
│  Layer 5: Floating Map Controls & Overlays              │  (Zoom +/- pills, Recenter crosshair, ETA status badge)
├──────────────────────────────────────────────────────────┤
│  Layer 4: Interactive Markers & Vehicle Orientation     │  (Pickup pin, Driver Van with heading & glow ring)
├──────────────────────────────────────────────────────────┤
│  Layer 3: Road-Following Route Polyline                 │  (Neon lime #BAFF42 with translucent glow halo)
├──────────────────────────────────────────────────────────┤
│  Layer 2: Geographic Road Grid & Natural Landmarks      │  (Highways, arterials, local streets, parks, water)
├──────────────────────────────────────────────────────────┤
│  Layer 1: Dark Mode Geographic Canvas Base              │  (Deep charcoal #0B0F0E background, city block fills)
└──────────────────────────────────────────────────────────┘
```

---

### 3. Layer-by-Layer Specifications

#### Layer 1: Dark Mode Geographic Canvas Base

- **Base Canvas Fill:** `#0B0F0E` (HAULIX dark background token)
- **City Blocks / Urban Fill:** `#141C19` (elevated block silhouette with 4px corner bevels)
- **Open Spaces / Parks:** `#0F1D1A` with subtle sage green undertone
- **Water Features (Canals / Rivers):** `#091412` with subtle depth borders

#### Layer 2: Road Grid Geometry (Phoenix Metro Corridor)

- **Primary Highways / Freeways (I-10 corridor):**
  - Fill / Stroke: `#364A42` (width 6px) with double-line styling
  - Casing / Underlay: `#1F2D27` (width 8px)
- **Major Arterial Roads (Central Ave, 7th St, McDowell Rd, Thomas Rd):**
  - Fill / Stroke: `#2A3A34` (width 4px)
- **Secondary Local Streets:**
  - Fill / Stroke: `#1C2622` (width 2px)
- **Intersection Nodes:** Smooth rounded joins (`strokeLinejoin="round"`, `strokeLinecap="round"`)

#### Layer 3: Road-Following Route Polyline

- **Route Line Stroke:** `#BAFF42` (HAULIX brand neon lime)
- **Route Width:** 4.5px
- **Route Glow / Halo:** Semi-transparent stroke `rgba(186, 255, 66, 0.22)` at width 9px directly beneath the core line
- **Geometry Rule:** Strict curved path that follows the street network grid from driver location through turns along 7th St and McDowell Rd to the pickup location. **Never a straight diagonal line across blocks.**

#### Layer 4: Interactive Markers & Vehicle Orientation

- **Pickup Marker:**
  - Outer ring: 28px diameter, `#BAFF42` at 20% opacity
  - Core pin: 16px diameter, `#BAFF42` solid fill, 2px white `#FFFFFF` inner ring, 4px `#0B0F0E` center dot
  - Text badge: "Pickup · Phoenix, AZ" pill chip floating above
- **Driver Vehicle Marker:**
  - High-roof cargo van silhouette facing the direction of travel (heading angle ~35° NE)
  - Vehicle fill: `#38BDF8` (Sky blue active indicator) with `#0B0F0E` cabin details
  - Animated pulse halo: Concentric circles expanding outward to signify live progress
- **Search Radar Marker (C32-A specific):**
  - Central pulsing beacon at pickup location
  - 3 concentric pulse waves with radial gradients expanding outward from 40px to 140px

#### Layer 5: Floating Map Controls & Overlays

- **Zoom Control Pill:**
  - Position: Floating right edge, 16px from margin
  - Background: `#161D1A` with `#26332E` border, 8px radius
  - Buttons: Plus (+) and Minus (-) separated by 1px `#26332E` divider
  - Icon color: `#BAFF42` / `#F6F8F6`
- **Recenter Button:**
  - Position: Directly beneath zoom pill
  - Size: 40 × 40 px circle
  - Background: `#161D1A`, border: `#26332E`
  - Icon: High-precision crosshair in `#BAFF42`
- **ETA Status Floating Badge:**
  - Position: Top-center of map viewport
  - Capsule styling: Background `rgba(11, 15, 14, 0.90)`, border `#26332E`, radius 20px
  - Content: Neon dot + "ON THE WAY · 11 MIN" in `#BAFF42` bold typography

---

### 4. Bottom Sheet Proportions & Card Geometry

- **Sheet Surface Background:** `#131817` (`colors.surface`)
- **Top Border / Divider:** `#1E2724` (`colors.elevated`)
- **Drag Handle:** 36 × 4 px rounded capsule in `#2A3A34`
- **Viewport Balance:** Map occupies the top 50–55% of the screen height, allowing the bottom sheet to display driver credentials, vehicle details, progress timeline, and action buttons without clipping the route or vehicle marker.
