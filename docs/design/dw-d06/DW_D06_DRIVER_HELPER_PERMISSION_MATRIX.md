# DW-D06: Driver & Helper Permission Matrix

## 1. Role-Based Access Control (RBAC) Architecture

In alignment with signed HAULIX SRS v1.6 (§2.3.2 and §3.2.1), Primary Drivers and Crew Helpers maintain strictly segregated responsibilities during the active service phase.

---

## 2. On-Site Operational Permissions

| Capability / Action | Primary Driver | Crew Helper | Role Separation Rationale |
|---|:---:|:---:|---|
| **Confirm Vehicle Arrival** | **ALLOWED** (`DW17`) | PROHIBITED | Only Primary Driver operates the vehicle and confirms transit arrival at pickup geofence. |
| **Confirm Individual Helper Arrival** | PROHIBITED | **ALLOWED** (`DW62`) | Helper confirms personal on-site check-in independently; Driver cannot check in on behalf of Helper. |
| **View Milestone Progression** | **ALLOWED** (`DW19`) | READ-ONLY (`DW63`) | Driver manages the core service timeline; Helper sees labor tasks and status. |
| **Initiate Additional Work Proposal** | **ALLOWED** (`DW20`) | PROHIBITED | Driver holds contractual vehicle and scope authority. |
| **View Extra Work Pending Status** | **ALLOWED** (`DW51`) | **ALLOWED** (`DW51`) | Both workers need visibility into pending scope decisions. |
| **Review Approved Extra Scope** | **ALLOWED** (`DW52`) | **ALLOWED** (`DW52`) | Both workers must be informed of additional loading labor authorized. |
| **Review Declined Extra Scope** | **ALLOWED** (`DW53`) | **ALLOWED** (`DW53`) | Both workers must be informed that extra work was rejected. |
| **Submit Individual Labor Evidence** | N/A (DW21 overall) | **ALLOWED** (`DW63` ➔ `DW64`) | Helper captures photos of their specific assigned labor. |
| **Mark Overall Job Complete** | **ALLOWED** (`DW21` ➔ `DW22`) | PROHIBITED | Only Primary Driver can submit full completion evidence and initiate review window. |

---

## 3. Navigation Boundaries

- **Primary Driver (`DW19`, `DW51`, `DW52`, `DW53`):** Navigation tabs route to Driver-specific destinations (`Home ➔ DW09`, `Jobs ➔ DW10`, `Profile ➔ DW27`).
- **Crew Helper (`DW63`):** Navigation tabs route to Helper-specific destinations (`Home ➔ DW31`, `Jobs ➔ DW14`, `Profile ➔ DW55`).
- Cross-role navigation contamination is strictly prevented by dedicated role layouts and runtime navigation guards.
