# Phase 03.25 — Figma Source & Navigation Integration Audit

## 1. Authoritative Figma Frame Mapping

| Screen ID      | Screen Name                    | Node ID (EN) | Node ID (ES) | Canvas Size   | Route Path                     |
| :------------- | :----------------------------- | :----------- | :----------- | :------------ | :----------------------------- |
| **C20-RETAIL** | Review store collection access | `392:265`    | `980:10668`  | 430 × 1720 px | `/retail-collection-readiness` |
| **C21-RETAIL** | Retail pickup intake review    | `392:456`    | `980:10886`  | 430 × 1043 px | `/retail-intake-review`        |
| **C21-M**      | Moving intake review           | `392:354`    | `980:10766`  | 430 × 1043 px | `/moving-intake-review`        |
| **C21-F**      | Furniture Pickup intake review | `394:188`    | `980:11006`  | 430 × 1043 px | `/furniture-intake-review`     |

---

## 2. Canonical Routing & Flow Integration

### A. Retail Collection Flow

```mermaid
flowchart LR
    C18R["C18-R: Retail Store Pickup Intake\n(/retail-intake)"] -->|"Review store collection access"| C20R["C20-RETAIL: Store Collection Readiness\n(/retail-collection-readiness)"]
    C20R -->|"Review retail booking intake"| C21R["C21-RETAIL: Retail Intake Review\n(/retail-intake-review)"]
    C20R -->|"Try missing-order validation"| C18RE["C18-R-E: Missing Order Validation\n(/retail-order-missing)"]
    C21R -->|"Confirm intake · Continue to W03"| NoticeW03["Honest W03 Notice Banner\n(No fake pricing/dispatch)"]
    C21R -->|"Edit retail order"| C20R
```

### B. Residential Moving Flow

```mermaid
flowchart LR
    C18M["C18-M: Moving Intake\n(/moving-intake)"] --> C20M["C20-M: Moving Access\n(/moving-access)"]
    C20M -->|"Review moving intake"| C21M["C21-M: Moving Intake Review\n(/moving-intake-review)"]
    C21M -->|"Confirm intake · Continue to W03"| NoticeW03M["Honest W03 Notice Banner\n(No fake quoting)"]
    C21M -->|"Edit moving details"| C20M
```

### C. Bulky Furniture Removal Flow

```mermaid
flowchart LR
    C18F["C18-F: Furniture Pickup Intake\n(/bulky-item-intake)"] -->|"Review furniture intake"| C21F["C21-F: Furniture Intake Review\n(/furniture-intake-review)"]
    C21F -->|"Confirm draft for AI review"| NoticeW03F["Honest W03 Notice Banner\n(No fake quoting)"]
    C21F -->|"Edit furniture scope"| C18F
```

---

## 3. Customer Profile & Persona Isolation

- **Integrated Runtime:** Uses dynamic customer profile from `useCustomerProfile` (`Sarah Mitchell` for EN, `Bryan Lopez` for ES).
- **Service Fixture Isolation:** The illustrative persona references in Figma (`Emily Parker` for retail, `Daniel Ruiz` for moving, `Sarah Mitchell` for furniture) are encapsulated within `c25ServiceReviews.ts` to provide faithful visual alignment while keeping profile state dynamic.
