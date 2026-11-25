# DW-D07: Figma Gap Closure Register

## 1. Register Overview

This register tracks all defects, visual misalignments, navigation anomalies, and requirement reconciliations addressed during Phase DW-D07.

---

## 2. Gap Closure Items

| Gap ID | Affected Screen(s) | Source Requirement | Actual Finding | Applied Canvas Correction / Resolution | Resulting Node(s) | Status |
|---|---|---|---|---|---|:---:|
| **RES-D07-01** | `DW64_ES`, `DW65_ES` | Canonical 88px navbar standard | Navigation hotspot trigger bounds in Spanish variants were legacy 75px height (`y=848, h=75`). | Standardized all 8 hotspot trigger heights to 88px (`y=844, h=88`). | `1309:1894`–`1897`, `1309:1974`–`1977` | **REFINED_AND_VERIFIED** |
| **RES-D07-02** | Crosswalk Row `1329:1853` | Crosswalk Text `1329:1857` | Previous handoffs contained ambiguous assertions about continuous background tracking. | Reconciled requirement: Location tracking occurs strictly during active job transit (`DW17`). Upon completion (`DW21` ➔ `DW22`), tracking terminates. | Documented in `DW_D07_DELIVERY_REPORT.md` | **REFINED_AND_VERIFIED** |
| **RES-D07-03** | `DW21_ES` (`1088:925`) | Customer W08 24h Review Window | Verified Spanish canvas copy: `"Las reglas de 24 horas del cliente se aplican aparte."` | Confirmed review window integration and aligned with Customer W08 specifications. | `1088:961` | **VERIFIED_EXISTING** |
| **RES-D07-04** | DW-D06 Handoff Discrepancy | Operational Architecture | DW-D06 handoff contained arbitrary 15-min / 10-min approval timeout claims. | Clarified that exact approval timeouts are server-configurable parameters rather than fixed client-enforced constants. | Documented in `DW_D07_REVIEW_WINDOW_AND_DISPUTE_HOLD_SPEC.md` | **REFINED_AND_VERIFIED** |
| **RES-D07-05** | `DW22` (`1086:665`) | Financial Lifecycle | Financial non-settlement disclosure: `"This preview does not trigger payment or cash out."` | Formally established 6-stage financial settlement lifecycle separating completion from payout. | Documented in `DW_D07_FINANCIAL_SETTLEMENT_LIFECYCLE_SPEC.md` | **VERIFIED_EXISTING** |
