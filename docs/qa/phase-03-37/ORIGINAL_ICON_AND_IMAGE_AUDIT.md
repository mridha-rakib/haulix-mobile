# HAULIX Mobile — Phase 03.37

## Original SVG Icons and Image Assets Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.37  
**Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Execution Date:** 2026-11-20

---

## 1. Icon Implementation & Origin Mapping

Every icon rendered across the four canonical screens (C27-V, C27-R, C27-N, C28-C) is implemented as a lightweight, resolution-independent SVG vector derived from the authoritative Figma master components:

| Component                  | Vector Implementation                                                                                                                     | Origin / Source                          | Usage in Screens           |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------- |
| **Flow Header Back Arrow** | `<Path d="M15 18l-6-6 6-6" stroke="#BAFF42" strokeWidth={2}/>`                                                                            | `FlowHeaderBack` shared component        | C27-V, C27-R, C27-N, C28-C |
| **Location Pin Icon**      | `<Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><Circle cx={12} cy={10} r={3}/>`                                                 | Figma Node `763:202` / `LocationChip`    | C27-V, C27-R, C27-N, C28-C |
| **Calendar Clock Icon**    | `<Rect x={3} y={4} width={18} height={18} rx={2}/><Path d="M16 2V6M8 2V6M3 10H21"/>`                                                      | Figma Node `763:202` / `SectionHeading`  | C27-V, C27-R, C27-N        |
| **Alert Triangle Icon**    | `<Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><Path d="M12 9v4M12 17h.01"/>`            | Figma Warning Panels (`#F2C94C`)         | C27-V, C27-R, C27-N, C28-C |
| **Clock Blocked Icon**     | `<Circle cx={12} cy={12} r={10}/><Path d="M12 6v6l4 2"/><Path d="M4 4l16 16"/>`                                                           | Figma Node `763:202` / `BlockedSlot`     | C27-V                      |
| **Truck Icon**             | `<Path d="M1 3H15V16H1V3Z"/><Path d="M15 8H19L23 12V16H15V8Z"/><Circle cx={5.5} cy={18.5} r={2.5}/><Circle cx={18.5} cy={18.5} r={2.5}/>` | Figma Node `763:336` / `StatusCapsule`   | C27-N                      |
| **Shield Terms Icon**      | `<Path d="M12 2L3 7V12C3 17.5 7 21.5 12 22C17 21.5 21 17.5 21 12V7L12 2Z"/><Path d="M12 8V12M12 16H12.01"/>`                              | Figma Node `763:467` / `DetailsTerms`    | C28-C                      |
| **Checkmark Icon**         | `<Path d="M20 6L9 17L4 12" stroke="#080B0B" strokeWidth={2.5}/>`                                                                          | Figma Node `763:467` / `ConsentCheckbox` | C28-C                      |

---

## 2. Photographic Asset Handling

- **Scope Check:** W04 scheduling recovery screens are focused on scheduling rules, capacity alerts, and legal terms acceptance. Unlike W03 item verification, these screens do not embed item photo thumbnails in the Figma master frames.
- **Inventory Continuity:** Photographic assets uploaded during W02/W03 (sofa, mattresses, dining table) remain persisted in the customer intake draft store and are ready for downstream order management.

---

## 3. Visual Assets Quality Verification

- SVGs scale losslessly on physical Android displays (tested on Realme Note 60 at 720 × 1600 px).
- Colors adhere strictly to token definitions (`#BAFF42`, `#080B0B`, `#151A19`, `#222827`, `#F2C94C`).
- Zero blurred bitmaps, raster artifacts, or placeholder graphics.
