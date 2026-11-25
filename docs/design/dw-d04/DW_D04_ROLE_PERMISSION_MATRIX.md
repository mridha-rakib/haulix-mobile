# HAULIX Driver & Worker Mobile App — Phase DW-D04
# Role-Based Permissions & Authority Matrix: Primary Driver vs Crew Helper

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Architecture Policy:** Strict Server-Authoritative Role Enforcement (No Local Role Switching)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`RO-01–08`, `WK-01–06`, `DP-01–18`, Crosswalk Frame `1329:1824`)

---

## 1. Role Boundary Foundations

In the HAULIX platform architecture, Driver and Helper roles are strictly segregated based on verified physical and regulatory qualifications:

| Dimension | Primary Driver | Crew Helper |
|---|---|---|
| **Commercial Vehicle Ownership / Operation** | Required (Class D / CDL, Valid Reg, Commercial Insurance) | None (Passenger / Transit Only) |
| **Driving Record (MVR) Background Check** | Mandatory (Zero major moving violations) | Exempt |
| **Physical Identity Verification** | Government ID + Facial Biometric + SSN | Government ID + Facial Biometric + SSN |
| **Dispatch Authority** | Full Dispatch Acceptance (`DW10`–`DW11`) | Crew Invitation Acceptance Only (`DW14`–`DW15`) |
| **Vehicle Navigation Responsibility** | Turn-by-Turn GPS Driving Guidance (`DW17`) | Passenger / Meet-at-Site Routing (`DW62`) |
| **Customer Interaction Leadership** | Lead On-Site Agent, Start PIN Validation (`DW19`) | Labor Execution, Co-verification (`DW63`) |
| **Scope Revision / Price Proposals** | Authorized to Propose Extra Items (`DW20`) | Read-Only Visibility (`DW51`–`DW53`) |
| **Base Labor Payout Share** | 65% of net operational fare | 35% of net operational fare |
| **Tip Pass-Through** | 100% of driver-allocated tips | 100% of helper-allocated tips |

---

## 2. Screen-Level Access Control Matrix (DW-D04 Screens)

| Screen ID | Canonical Title | Primary Driver Access | Crew Helper Access | Access Rule / Enforcement Logic |
|:---:|:---|:---:|:---:|:---|
| **DW10** | Job offers | **FULL ACCESS** | **FORBIDDEN** | Helpers do not receive primary radial dispatch broadcasts. Redirect to `DW14` or `DW31`. |
| **DW11** | Job details | **FULL ACCESS** | **FORBIDDEN** | Full cargo pricing, vehicle match, and atomic acceptance reserved for Primary Drivers. |
| **DW12** | Offer unavailable | **FULL ACCESS** | **FORBIDDEN** | Recovery screen for peer drivers whose atomic acceptance was superseded. |
| **DW13** | Invite a Helper | **FULL ACCESS** | **FORBIDDEN** | Drivers initiate invitations for multi-person jobs. Helpers cannot invite helpers. |
| **DW14** | Helper invitations | **FORBIDDEN** | **FULL ACCESS** | Incoming crew invitations inbox for active helpers. Drivers receive dispatch, not crew invites. |
| **DW15** | Review invitation | **FORBIDDEN** | **FULL ACCESS** | Helper labor scope review and independent acceptance CTA. |
| **DW16** | Crew readiness | **FULL ACCESS** | **FULL ACCESS** | Shared mutual readiness checklist co-signed by both crew members before departure. |
| **DW48** | Choose a Helper | **FULL ACCESS** | **FORBIDDEN** | Driver searches and selects from available/favorite helper roster. |
| **DW49** | Invitation pending | **FULL ACCESS** | **FORBIDDEN** | Driver countdown waiting state with cancel invitation authority. |

---

## 3. Residual Verification Recovery Matrix (`RES-D03-04` on `DW33`)

When a worker's account experiences document rejection or expired credentials, navigation lands on `DW33 · Verification needs action` (`1086:1155` EN, `1088:1484` ES).
Because `DW33` is a single unified route in `apps/driver`, the client executes server-authoritative role branching:

```
                          [DW33: Verification Needs Action]
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
          (Role: PRIMARY_DRIVER)                        (Role: HELPER)
                   │                                           │
   ┌───────────────┴───────────────┐           ┌───────────────┴───────────────┐
   ▼                               ▼           ▼                               ▼
[Resubmit Docs]            [Eligibility Check] [Resubmit Docs]            [Eligibility Check]
   │                               │           │                               │
   ▼                               ▼           ▼                               ▼
[DW07: Driver Docs]        [DW05: Driver Verif] [DW56: Helper Docs]      [DW06: Helper Verif]
```

### 3.1 Primary Driver Recovery Route
- **Resubmit Documents Button (`1086:1185`):** Navigates to `DW07 · Driver documents` (`1085:254` EN, `1088:254` ES) to re-upload driver's license, vehicle registration, or commercial insurance policy.
- **Eligibility State Card (`1086:1178`):** Navigates to `DW05 · Driver verification` (`1085:154` EN, `1088:154` ES) to review DMV record or background screening notes.

### 3.2 Crew Helper Recovery Route
- **Resubmit Documents Button (`1086:1185`):** Dynamically branches to `DW56 · Helper eligibility & docs` (`1301:1633` EN, `1301:2875` ES) to re-upload government photo ID or facial selfie.
- **Eligibility State Card (`1086:1178`):** Dynamically branches to `DW06 · Helper verification` (`1085:207` EN, `1088:207` ES) to review identity check and background consent.
