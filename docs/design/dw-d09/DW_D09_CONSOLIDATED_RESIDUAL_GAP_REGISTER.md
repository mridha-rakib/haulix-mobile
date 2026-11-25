# HAULIX Driver/Worker Mobile App

## Consolidated Residual Design Gap Register (Phases DW-D01 through DW-D09)

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Scope:** Complete 68-State Canonical Inventory & 14 Supporting Overlays  
**Status:** ALL PHASES AUDITED, REMEDIATED & CLOSED (100%)

---

### 1. Cumulative Phase-by-Phase Remediation Summary

| Phase | Module / Domain | Canonical Screens | Overlays | Key Identified Defects / Gaps | Remediation Applied | Final Status |
|:---:|:---|:---:|:---:|:---|:---|:---:|
| **DW-D01** | DW-W01: Onboarding & Auth | 11 states (22 core) | — | Verification code issue routing ambiguity; language toggle alignment | Verified role intake bifurcations (DW58 Driver vs DW59 Helper); aligned phone OTP | **CLOSED** |
| **DW-D02** | DW-W02: Eligibility & Docs | 7 states (14 core) | — | Document rejection action flow; Helper-specific eligibility decoupling | Reconciled DW33 action flow to DW07/DW06; verified DW56 Helper docs | **CLOSED** |
| **DW-D03** | DW-W03: Operational Dashboard | 3 states (6 core) | OV-05 (2 frames) | Navbar touch targets at 75px; Helper Profile link typo pointing to DW27 | Remediated Helper Profile to DW55; standardized navbar triggers to 88px at y=844 | **CLOSED** |
| **DW-D04** | DW-W04: Offers & Crew | 9 states (18 core) | — | Radius tiering inconsistencies; Helper invitation countdown bounds | Audited DW10–DW16, DW48–DW49; verified mutual crew checklist reactions | **CLOSED** |
| **DW-D05** | DW-W05: Pickup & Nav | 6 states (12 core) | OV-06, OV-07 (4 frames) | Geolocation tracking policy ambiguity; offline reconnection flow | Reconciled location privacy gate (tracking strictly during active job); audited OV-06/07 | **CLOSED** |
| **DW-D06** | DW-W06: Active Service | 6 states (12 core) | — | Dual customer & admin approval state navbars set to wrong active tab | Remediated DW51–DW53 navbars from Active Profile to Active Jobs | **CLOSED** |
| **DW-D07** | DW-W07: Proof & Delivery | 4 states (8 core) | — | Legacy 75px hotspot heights on DW64_ES and DW65_ES | Standardized Helper proof triggers to canonical 88px at y=844 | **CLOSED** |
| **DW-D08** | DW-W08: Earnings & Payout | 9 states (18 core) | OV-02 (2 frames) | DW54 Payout Failed had Active Profile navbar; missing Profile hotspot; DW25 demo link misnamed; 28 legacy 75px triggers | Remediated DW54 to Active Earnings with Lime accent; added Profile hotspot routing to DW27; renamed DW25 links; standardized 28 triggers to 88px | **CLOSED** |
| **DW-D09** | DW-W09: Profile & Support | 13 states (26 core) | OV-01, OV-03, OV-04 (6 frames) | 104 navigation hotspots across 13 states using legacy 75px height; DW29 support buttons unlinked | Standardized 104 hotspots to 88px at y=844; connected DW29 support rows to DW45 form | **CLOSED** |

---

### 2. Standardized Global Architectural Invariants

1. **48dp+ / 88px Touch-Target Standard:**
   - All bottom navigation touch-target rectangles across all 68 canonical states are standardized to `height = 88px`, positioned at `y = 844px`, completely covering the 48dp Android / 44pt iOS touch accessibility requirements.
2. **Active Tab Highlight Standard:**
   - Active tab icon fill: Lime Green `#BAFF42` (`VariableID:5:7`).
   - Inactive tab icon fill: Muted Slate `#ADB7B1` (`VariableID:5:10`).
   - Active tab text label: Medium weight, Lime Green.
3. **Role-Specific Independence:**
   - Primary Drivers and Helpers share zero routes; navigation hotspots consistently target role-specific screens (e.g. `DW09` vs `DW31`, `DW10` vs `DW14`, `DW27` vs `DW55`).
4. **Bilingual Parity:**
   - 100% of screens and overlays exist in paired English (`1085:2`) and Spanish (`1088:2`) layouts with zero missing translations.
