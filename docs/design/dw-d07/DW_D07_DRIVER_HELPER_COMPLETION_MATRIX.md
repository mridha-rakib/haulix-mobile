# DW-D07: Driver & Helper Completion Matrix

## 1. Role Segregation in Completion Workflows

In accordance with HAULIX architecture, completion evidence capture and submission maintain distinct roles for Primary Driver and Crew Helper.

---

## 2. Detailed Completion Matrix

| Responsibility / Action | Primary Driver (`DW21` / `DW22`) | Crew Helper (`DW64` / `DW65`) | Contractual Governance |
|---|:---:|:---:|---|
| **Capture Cargo Delivery Proof** | **MANDATORY** | PROHIBITED | Primary Driver holds legal transit liability. |
| **Capture Task Labor Photos** | Optional | **MANDATORY** | Helper documents assigned labor tasks. |
| **Initiate Final Review Window** | **MANDATORY** | PROHIBITED | Helper work submission alone does not mark booking complete. |
| **Receive Review Notification** | **YES** | **YES** | Both workers receive push when customer review window opens. |
| **Access Job Completed Summary** | **YES** (`DW22`) | NO (`DW65` submission confirmation) | Driver sees overall delivery summary; Helper sees pending share posting. |
| **Access Wallet / Earnings Hub** | **YES** (`DW23`) | **YES** (`DW24`) | Each worker accesses their individual earnings breakdown. |

---

## 3. Prototype Routing Integrity

- `DW21`: Header / Return CTA routes back to `DW17` (Active Job) or `DW19` (On-Site Progress). Primary CTA routes to `DW22`.
- `DW22`: View earnings CTA routes to `DW23`. My jobs CTA routes to `DW28`.
- `DW64`: Primary CTA routes to `DW65`. Back CTA routes to `DW63`.
- `DW65`: Primary CTA routes to `DW31` (Helper Dashboard). Back CTA routes to `DW63`.
