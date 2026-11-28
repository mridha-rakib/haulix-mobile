# HAULIX Driver/Worker — DW-FINAL Visual Comparison Matrix

**Milestone:** DW-FINAL Consolidated Frontend QA  
**Reference Viewport:** `360dp` logical width (Realme Note 60, 720 × 1600 px @ 320dpi)  
**Design Tokens Package:** `@haulix/design-tokens`  
**Date:** November 28, 2026  

---

## 1. Design Token Compliance

All screens and overlays strictly use tokens from Figma file `meiXxwUNJaDo0a3mhcHBXv`:
- **Backgrounds:** Primary `#080B0B`, Surface `#111815`, Card/Elevated `#16201B`
- **Brand Accents:** Brand Lime `#BAFF42`, Accent Hover `#9EE82C`
- **Text:** Primary `#FFFFFF`, Secondary `#8E9E99`, Muted `#586963`
- **Status:** Success `#10B981`, Warning `#F59E0B`, Danger `#EF4444`, Info `#3B82F6`
- **Typography:** `fontFamily: "Inter"`, scaling from `10px` captions to `32px` hero displays
- **Touch Targets:** Minimum `44 × 44dp` interactive hitSlop on all interactive pressables.

---

## 2. Canonical States Inventory (68 Canonical Screens)

All 68 canonical states are fully implemented in `apps/driver`:
- DW01..DW04, DW43, DW44, DW58..DW61, DW66: Authentication & Role Intake (11 states)
- DW05..DW08, DW33, DW38, DW56: Document Upload & Verification (7 states)
- DW09, DW31, DW39: Operational Home & Availability (3 states)
- DW10..DW16, DW48, DW49: Job Offers & Dispatch Matching (9 states)
- DW17, DW18, DW34, DW47, DW50, DW62: Navigation, Active Transit & Chat (6 states)
- DW19..DW22, DW35, DW36: On-Site Arrival & Scope Change (6 states)
- DW23..DW25, DW37: Completion Evidence & Review Window (4 states)
- DW26, DW27, DW40, DW41, DW51..DW54, DW67, DW68: Wallet, Ledger & Cash Out (9 states)
- DW28..DW30, DW32, DW42, DW45, DW46, DW55, DW57, DW63..DW65: Profile & Settings (13 states)

**Total:** 68 Canonical States × 2 Locales = 136 Bilingual Screens + 14 Supporting Overlays = 150 Visual Variants.
