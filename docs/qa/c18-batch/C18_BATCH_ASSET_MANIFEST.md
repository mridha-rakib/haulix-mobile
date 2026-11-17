# Phase 03.19: C18 Batch Asset Manifest

This document records the exact assets used across C18-J, C18-F, C18-G, and C18-R intake screens.

---

## 1. Photographic Assets (C18-J Junk Removal)

Extracted directly from authoritative Figma node `382:805`:

| File Name             | Dimensions   | Size        | Purpose                         | Source Figma Node             |
| --------------------- | ------------ | ----------- | ------------------------------- | ----------------------------- |
| `c18j-sofa.png`       | 160 × 160 px | 5,705 bytes | 3-seat sofa item thumbnail      | `382:822` (Item 1 image fill) |
| `c18j-mattresses.png` | 160 × 160 px | 6,375 bytes | Queen mattresses item thumbnail | `382:836` (Item 2 image fill) |
| `c18j-table.png`      | 160 × 160 px | 7,770 bytes | Dining table item thumbnail     | `382:850` (Item 3 image fill) |

- **Workspace Path:** `apps/customer/assets/images/intake/`
- **QA Doc Copy:** `docs/qa/c18-batch/`

---

## 2. Vector Icons & Visual Components

All icons are precision SVGs implemented in `apps/customer/src/components/discovery/C18BatchIcons.tsx` or reused from existing HAULIX component suites (`C15Icons`, `C17Icons`, `C18MIcons`):

| Icon Component        | Figma Context                       | Visual Attributes                                            |
| --------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `C18JunkIcon`         | C18-J header & service card         | Dump truck / waste container vector (`#BAFF42` or `#A1A1AA`) |
| `C18FurnitureIcon`    | C18-F service tier row 1            | Armchair / sofa vector                                       |
| `C18ApplianceIcon`    | C18-F service tier row 2            | Refrigerator / appliance vector                              |
| `C18MattressIcon`     | C18-F service tier row 3            | Bed / mattress vector                                        |
| `C18ToolsIcon`        | C18-F service tier row 4            | Wrench / hammer assembly vector                              |
| `C18GarageIcon`       | C18-G header & scope card           | Garage door / residential storage vector                     |
| `C18RetailIcon`       | C18-R header & store card           | Storefront / retail shopping bag vector                      |
| `C18HazardShieldIcon` | C18-G & C18-R disclaimer            | Warning triangle / shield with alert icon                    |
| `C18CheckBadgeIcon`   | Customer chip & review confirmation | Circular checkmark badge (`#BAFF42`)                         |

---

## 3. Reference Visuals

The 8 full-frame genuine Figma exports are preserved in `docs/qa/c18-batch/`:

1. `figma-C18J-en-reference.png` (69,384 B)
2. `figma-C18J-es-reference.png` (73,748 B)
3. `figma-C18F-en-reference.png` (51,763 B)
4. `figma-C18F-es-reference.png` (53,366 B)
5. `figma-C18G-en-reference.png` (58,080 B)
6. `figma-C18G-es-reference.png` (59,184 B)
7. `figma-C18R-en-reference.png` (53,135 B)
8. `figma-C18R-es-reference.png` (54,093 B)
