# HAULIX Customer App — Phase 03.33

## Original Asset and SVG Vector Audit

### W03 — Quote Error Recovery, Revision, Itemized Terms & Expiry

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.33  
**Date:** November 19, 2026  
**Status:** Complete & Verified

---

## 1. Asset Provenance Overview

In accordance with HAULIX design standards, no placeholder icons or unlicensed third-party assets are used in Phase 03.33. All visual glyphs and emblems are authored as scalable vector SVG graphics (`react-native-svg`) matching the exact geometry, stroke widths, and fills in the Figma design system.

---

## 2. Screen-by-Screen Vector Inventory

### 2.1 C24-F — Quote Error Recovery

- **Error Emblem Vector:**
  - Dimensions: 64 × 64 dp (container `w-16 h-16 rounded-full bg-error/15 border border-error/30`)
  - Icon: SVG Alert Circle / Warning triangle glyph with exclamation mark
  - Stroke: `#FF5C5C` (error token)
  - Provenance: Directly derived from Figma node `412:965` / `987:10837`
- **Navigation Chevron:**
  - Dimensions: 24 × 24 dp
  - Icon: Left arrow chevron for back navigation (`#FFFFFF`)

### 2.2 C24-REV — Quote Revision Requested

- **Revision Emblem Vector:**
  - Dimensions: 64 × 64 dp (container `w-16 h-16 rounded-full bg-warning/15 border border-warning/30`)
  - Icon: SVG Recalculate / Refresh sync circular arrows glyph
  - Stroke: `#FFB800` (warning token)
  - Provenance: Directly derived from Figma node `412:1214` / `987:11137`
- **Change Pill Badges:**
  - Compact category indicator pills with exact badge styling

### 2.3 C25 — Itemized Quote & Terms

- **Verified Price Emblem:**
  - Dimensions: 56 × 56 dp (container `w-14 h-14 rounded-2xl bg-brand/15 border border-brand/30`)
  - Icon: SVG Shield Check / Guaranteed pricing emblem
  - Stroke: `#00E599` (brand token)
  - Provenance: Directly derived from Figma node `412:1260` / `987:11193`
- **Itemized Category Row Glyphs:**
  - Labor glyph (2 workers icon / tools)
  - Vehicle glyph (truck & trailer icon)
  - Heavy item fee glyph (weight / barbell / mattress fee)
  - Distance & logistics glyph (map route icon)
  - Fuel & regulatory surcharge glyph (pump / fuel icon)
  - Service guarantee glyph (shield star / $0 fee row)
- **Info Callout Vector:**
  - SVG Info circle inside terms card (`#00E599` / `#9BA3AF`)

### 2.4 C25-X — Quote Expired Refresh

- **Expired Time Emblem:**
  - Dimensions: 64 × 64 dp (container `w-16 h-16 rounded-full bg-white/10 border border-white/20`)
  - Icon: SVG Clock / Timer expired with exclamation glyph
  - Stroke: `#9BA3AF` / `#FF5C5C`
  - Provenance: Directly derived from Figma node `412:1429` / `987:11394`
- **Expiry Counter / Timestamp Vector:**
  - Inline clock glyph next to expiration explanation text

---

## 3. Photographic Media Audit

- **Photographic Media:** None present or required by Figma specification for these four quotation status and itemized breakdown screens.
- **Pure Vector Delivery:** 100% vector SVG rendering ensures crisp fidelity at all display densities without network rasterization latency or image clipping on Android devices.
