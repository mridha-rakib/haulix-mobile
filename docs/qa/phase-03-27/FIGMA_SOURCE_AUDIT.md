# Phase 03.27 — Figma Source & Navigation Integration Audit

## 1. Authoritative Figma Frame Mapping

| Screen ID         | Screen Name                               | Node ID (EN) | Node ID (ES) | Canvas Size   | Route Path              |
| :---------------- | :---------------------------------------- | :----------- | :----------- | :------------ | :---------------------- |
| **W03-M-HANDOFF** | Moving AI Review Entry Preview            | `392:405`    | `980:10826`  | 430 × 1043 px | `/moving-ai-handoff`    |
| **W03-A-HANDOFF** | Appliance Removal AI Review Entry Preview | `394:341`    | `980:11306`  | 430 × 1043 px | `/appliance-ai-handoff` |
| **W03-T-HANDOFF** | Mattress Removal AI Review Entry Preview  | `394:443`    | `980:11366`  | 430 × 1043 px | `/mattress-ai-handoff`  |
| **W03-G-HANDOFF** | Garage Cleanout AI Review Entry Preview   | `394:545`    | `980:11426`  | 430 × 1043 px | `/garage-ai-handoff`    |

---

## 2. Canonical Routing & Flow Integration

### A. Moving Journey

```mermaid
flowchart LR
    C21M["C21-M: Moving Intake Review\n(/moving-intake-review)"] -->|"Confirm draft for AI review"| W03M["W03-M-HANDOFF: Moving AI Review Entry\n(/moving-ai-handoff)"]
    W03M -->|"Review moving scope"| NoticeW03M["Honest W03 Notice Banner\n(No fake pricing/dispatch)"]
    W03M -->|"Edit moving details"| C18M["C18-M: Moving Intake\n(/moving-intake)"]
```

### B. Appliance Removal Journey

```mermaid
flowchart LR
    C21A["C21-A: Appliance Intake Review\n(/appliance-intake-review)"] -->|"Confirm draft for AI review"| W03A["W03-A-HANDOFF: Appliance AI Review Entry\n(/appliance-ai-handoff)"]
    W03A -->|"Review appliance data"| NoticeW03A["Honest W03 Notice Banner\n(No fake quoting)"]
    W03A -->|"Edit appliance details"| C18A["C18-A: Appliance Intake\n(/appliance-intake)"]
```

### C. Mattress Removal Journey

```mermaid
flowchart LR
    C21T["C21-T: Mattress Intake Review\n(/mattress-intake-review)"] -->|"Confirm draft for AI review"| W03T["W03-T-HANDOFF: Mattress AI Review Entry\n(/mattress-ai-handoff)"]
    W03T -->|"Review mattress details"| NoticeW03T["Honest W03 Notice Banner\n(No fake disposal rates)"]
    W03T -->|"Edit mattress details"| C18T["C18-T: Mattress Intake\n(/mattress-intake)"]
```

### D. Garage Cleanout Journey

```mermaid
flowchart LR
    C21G["C21-G: Garage Intake Review\n(/garage-intake-review)"] -->|"Confirm draft for AI review"| W03G["W03-G-HANDOFF: Garage AI Review Entry\n(/garage-ai-handoff)"]
    W03G -->|"Review garage scope"| NoticeW03G["Honest W03 Notice Banner\n(No fake estimation)"]
    W03G -->|"Edit garage details"| C18G["C18-G: Garage Intake\n(/garage-intake)"]
```

---

## 3. Customer Profile & Persona Isolation

- **Integrated Runtime:** Uses customer booking context with verified tokens (`colors.brand` neon lime `#BAFF42`, green badge container `#1A2510`, dark background `#080B0B`).
- **Dynamic Customer Persona Resolution:**
  - **English Variants:** Primary customer persona `Sarah Mitchell` (or `Daniel Ruiz` depending on active profile state).
  - **Spanish Variants:** Dynamically resolves to `Bryan Lopez Mendoza` (as specified in Section 8 of the Phase 03.27 specification).
- **Service Draft Isolation:**
  - `W03-M-HANDOFF`: `SARAH MITCHELL · HX-DEMO-MOV-1042` (2 bedroom apartment, elevator, origin & destination addresses, 14 verified inventory items).
  - `W03-A-HANDOFF`: `SARAH MITCHELL · HX-DEMO-APPL-1036` (Commercial double-door refrigerator, ground level, disconnect pending, ~240 lb).
  - `W03-T-HANDOFF`: `SARAH MITCHELL · HX-DEMO-MATT-1037` (2 Queen mattresses + box spring, 2nd floor stairs, bagged, dry condition).
  - `W03-G-HANDOFF`: `SARAH MITCHELL · HX-DEMO-GAR-1040` (2-car garage ~50% volume, wood & metal shelving, boxes, no hazardous materials).
- **Truthful Architecture:**
  - Prototype frontend handoff only.
  - Zero simulated artificial intelligence inference or fabricated recognition models.
  - Zero mock pricing calculations, instant dispatch, payment processing, or quotation simulation.
