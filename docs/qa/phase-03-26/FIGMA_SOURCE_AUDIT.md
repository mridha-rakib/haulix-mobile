# Phase 03.26 — Figma Source & Navigation Integration Audit

## 1. Authoritative Figma Frame Mapping

| Screen ID       | Screen Name                                                 | Node ID (EN) | Node ID (ES) | Canvas Size   | Route Path                 |
| :-------------- | :---------------------------------------------------------- | :----------- | :----------- | :------------ | :------------------------- |
| **C21-A**       | Appliance Removal intake review                             | `394:290`    | `980:11066`  | 430 × 1043 px | `/appliance-intake-review` |
| **C21-T**       | Mattress Removal intake review                              | `394:392`    | `980:11126`  | 430 × 1043 px | `/mattress-intake-review`  |
| **C21-G**       | Garage Cleanout intake review                               | `394:494`    | `980:11186`  | 430 × 1043 px | `/garage-intake-review`    |
| **W03-HANDOFF** | AI Recognition & Quotation available / Solicitud y revisión | `382:2161`   | `980:10514`  | 430 × 1043 px | `/ai-review-handoff`       |

---

## 2. Canonical Routing & Flow Integration

### A. Appliance Removal Flow

```mermaid
flowchart LR
    C18A["C18-A: Appliance Removal Intake\n(/appliance-intake)"] -->|"Confirm draft for AI review"| C21A["C21-A: Appliance Intake Review\n(/appliance-intake-review)"]
    C21A -->|"Confirm draft for AI review"| NoticeW03A["Honest W03 Notice Banner\n(No fake pricing/dispatch)"]
    C21A -->|"Edit appliance details"| C18A
```

### B. Mattress Removal Flow

```mermaid
flowchart LR
    C18T["C18-T: Mattress Removal Intake\n(/mattress-intake)"] -->|"Confirm draft for AI review"| C21T["C21-T: Mattress Intake Review\n(/mattress-intake-review)"]
    C21T -->|"Confirm draft for AI review"| NoticeW03T["Honest W03 Notice Banner\n(No fake quoting)"]
    C21T -->|"Edit mattress details"| C18T
```

### C. Garage Cleanout Flow

```mermaid
flowchart LR
    C18G["C18-G: Garage Cleanout Intake\n(/garage-intake)"] -->|"Confirm draft for AI review"| C21G["C21-G: Garage Intake Review\n(/garage-intake-review)"]
    C21G -->|"Confirm draft for AI review"| NoticeW03G["Honest W03 Notice Banner\n(No fake estimating)"]
    C21G -->|"Edit garage details"| C18G
```

### D. Junk Removal AI Review Handoff

```mermaid
flowchart LR
    C21S["C21-S: Intake Draft Saved\n(/intake-draft-saved)"] -->|"Continue to AI item recognition"| W03H["W03-HANDOFF: AI Review Entry Preview\n(/ai-review-handoff)"]
    W03H -->|"Begin AI-assisted item review"| NoticeC22["Honest C22 Upcoming Notice\n(No fake AI/dispatch)"]
    W03H -->|"Edit items"| C19["C19: Item Inventory\n(/item-inventory)"]
```

---

## 3. Customer Profile & Persona Isolation

- **Integrated Runtime:** Uses customer booking context with verified tokens (`colors.brand` neon lime `#BAFF42`, green badge container `#1A2510`).
- **Service Draft Isolation:**
  - `C21-A`: `SARAH MITCHELL · HX-DEMO-APPL-1036` (Washing machine ×1 · 27 × 29 × 39 in · ~170 lb)
  - `C21-T`: `SARAH MITCHELL · HX-DEMO-MATT-1037` (Queen mattresses ×2 · 80 × 60 × 11 in each)
  - `C21-G`: `SARAH MITCHELL · HX-DEMO-GAR-1040` (Cardboard boxes and shelving · exact count not supplied)
  - `W03-HANDOFF`: `SARAH MITCHELL · HX-DEMO-1027` (3 item types / 4 pieces · 4 attached demo images)
- **Truthful Architecture:** No artificial quotation, fake AI inference, or simulated driver dispatch has been fabricated.
