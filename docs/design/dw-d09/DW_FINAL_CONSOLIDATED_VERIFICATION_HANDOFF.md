# HAULIX Driver/Worker Mobile App

## Consolidated Verification Handoff — Design to Engineering (Phase 02)

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Design Audit Status:** 100% COMPLETE (68 / 68 Canonical States, 136 / 136 Core Variants, 14 / 14 Overlays)  
**Target Codebase:** `apps/driver` (`com.haulix.driver`)  
**Target Device Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  
**Signed SRS Baseline:** Signed HAULIX SRS v1.6 (Crosswalk Frame `1329:1824`, Handoff Index `1091:3`, UX Audit Board `1317:1805`)

---

### 1. Complete Canonical Screen Formula Verification

Across 9 phased design packages (DW-D01 through DW-D09), the complete 68-state inventory has been audited, visually inspected, localized, and verified on the live Figma canvas:

$$\sum_{k=1}^{9} \text{DW-D0}k = 11 + 7 + 3 + 9 + 6 + 6 + 4 + 9 + 13 = 68 \text{ Canonical States}$$
$$68 \times 2 = 136 \text{ Bilingual Core Screens (68 EN + 68 ES)}$$
$$+ 14 \text{ Supporting Overlays (7 EN + 7 ES)} = 150 \text{ Verified Frames Total}$$

---

### 2. Engineering Architecture & Implementation Blueprints

When implementing screens in `apps/driver`, engineering agents must strictly adhere to the following architecture:

#### 2.1 Styling & Token Integration
- All colors, typography, spacing, and borders must be imported from `@haulix/design-tokens` or applied via synchronized NativeWind utility classes:
  - Background surface: `bg-surface` (`#151A19`)
  - Elevated card background: `bg-elevated` (`#1D2321`)
  - Brand Accent (Active Tabs, CTAs): `bg-brand` / `text-brand` (`#BAFF42` Lime)
  - Secondary / Borders: `border-elevated` (`#2A332F`)
  - Typography Primary: `text-white`
  - Typography Muted: `text-muted` (`#ADB7B1`)
- Zero arbitrary hardcoded hex codes.

#### 2.2 Role-Based Routing Architecture (Expo Router)
- Application directory structure:
  - `apps/driver/app/(auth)/`: Unauthenticated onboarding & verification (`DW01–DW08`, `DW43–DW44`, `DW58–DW61`, `DW66`). No bottom navigation bar.
  - `apps/driver/app/(driver)/`: Primary Driver authenticated stack (`DW09–DW13`, `DW16–DW20`, `DW21–DW22`, `DW27`, `DW36–DW38`).
  - `apps/driver/app/(helper)/`: Crew Helper authenticated stack (`DW31`, `DW14–DW15`, `DW62–DW65`, `DW55–DW57`).
  - `apps/driver/app/(shared)/`: Shared wallet, notifications, settings, and support (`DW23–DW26`, `DW28–DW30`, `DW32`, `DW34`, `DW35`, `DW39–DW42`, `DW45–DW46`, `DW54`, `DW67–DW68`).

#### 2.3 Strict Touch-Target & Sizing Standard
- Minimum interactive touch-target dimensions: **48dp × 48dp** (Standardized navbar touch targets at `h=88, y=844`).
- Support horizontal padding of 16dp / 22px corresponding to 360dp Android logical viewport.

---

### 3. Safety, Financial & Regulatory Invariants

1. **Location Privacy (`1329:1857`):** Background GPS tracking is strictly active only between Departure (`DW16`/`DW17`) and Completion Evidence submission (`DW21`). Terminate GPS immediately upon completion.
2. **65/35 Commission Allocation (`1329:1852`):** Platform fee applies strictly to pre-tax, pre-tip booking subtotal. Tips are 100% pass-through to workers with 0% platform deductions.
3. **Instant Cash Out Fee Disclosure (`1325:1914`):** Live provider fee must be disclosed on `DW68` before obtaining worker consent.
4. **Independent Monorepo Separation:** Customer App (`apps/customer`) remains frozen at release candidate commit `942c869de6726b9f277abcd1776728b228f7b2e4`.
