# DW-D06: Extra Work Approval & Scope Specification

## 1. Architectural Scope

This specification details the end-to-end workflow, pricing boundaries, and authorization gates for scope modifications initiated during on-site active service.

---

## 2. Scope Revision Workflow

```
[ DW19: Driver Identifies Additional Scope ]
                    │
                    ▼
[ DW20: Driver Formulates Proposal ]
  - Original Scope Reference (e.g. 1 sofa + 2 chairs)
  - Extra Item / Service Description
  - Estimated Additional Surcharge
                    │
                    ▼
[ DW51: Extra Work Pending Dual Gate ]
  ├── Gate 1: Platform Admin Technical/Pricing Review
  └── Gate 2: Customer Mobile Acceptance & Payment Re-auth
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
[ DW52: Approved ]      [ DW53: Declined ]
  - Scope Updated         - No Additional Charge
  - Return to DW19        - Return to Original DW19
```

---

## 3. Financial & Billing Invariants

1. **Proposed != Billable:** A proposed extra-work item submitted on `DW20` is NOT billable until both Admin and Customer authorizations are secured.
2. **Helper Role Boundary:** Crew Helpers have read-only visibility into revised scopes once approved; they **cannot** formulate, submit, negotiate, or approve scope revisions or financial adjustments.
3. **No Unilateral Driver Markups:** Drivers cannot modify the base price directly; extra charges follow system-defined service tariffs.
4. **Scope Declined Continuity (`DW53`):** If a customer or admin declines extra work, the booking is **NOT cancelled**. The crew continues execution of the originally approved scope.

---

## 4. Demo Previews vs. Runtime Actions

In `DW51`, interactive controls `Preview approved state` (`1301:1275`) and `Preview declined state` (`1301:1277`) exist exclusively for design inspection. In the production application (`apps/driver`), these buttons will be omitted; state transitions will be driven by incoming server WebSocket notifications (`EXTRA_WORK_APPROVED` / `EXTRA_WORK_DECLINED`).
