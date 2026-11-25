# DW-D06: Customer & Admin Approval Gate Matrix

## 1. Approval Policy Reconciliation

Authoritative Requirements Crosswalk Frame `1329:1824`, Row `1329:1843`, Text Layer `1329:1847` mandates:
> `"GATE: Extra work requires BOTH Admin approval and Customer acceptance; CM-10/13 privacy policy P."`

This matrix defines the authorization lifecycle, required decision states, and timeout policies for scope modifications.

---

## 2. Dual-Gate Approval Matrix

| Stage | Actor | Screen / System | Required Input | Resulting State | Failure / Timeout Action |
|---|---|---|---|---|---|
| **1. Proposal** | Primary Driver | Driver App `DW20` | Item photo, service category, proposed additional labor description | `SCOPE_CHANGE_PROPOSED` | Driver cancels on `DW20` ➔ Returns to `DW19` |
| **2. Admin Review** | Platform Admin | Admin Portal (Ops) | Tariff validation, vehicle capacity check, crew safety review | `ADMIN_APPROVED` or `ADMIN_DECLINED` | Auto-declined after 15 min idle ➔ Routes to `DW53` |
| **3. Customer Consent** | Customer | Customer App (`C21`/Modal) | Updated quote review, card pre-authorization approval | `CUSTOMER_ACCEPTED` or `CUSTOMER_REJECTED` | Auto-rejected after 10 min window ➔ Routes to `DW53` |
| **4. Backend Commit** | Core Backend | Transaction Ledger | Dual authorization verification, credit hold adjustment | `EXTRA_WORK_AUTHORIZED` | Transition event pushed via WebSocket to `DW52` |

---

## 3. Decision Outcomes & Operational Invariants

- **Full Approval (`DW52`):** Both Admin and Customer confirm. The ledger adds the authorized line item. Driver and Helper return to active job execution with the revised manifest.
- **Admin Rejection (`DW53`):** Admin rejects due to safety, vehicle weight limits, or policy violations. Customer is not prompted. Crew proceeds with original scope only.
- **Customer Rejection (`DW53`):** Customer declines price or elects not to move the extra items. Crew proceeds with original scope only; zero cancellation fee applies to original booking.
- **No Unilateral Surcharges:** Neither Driver nor Helper has authority to bypass Admin or Customer authorization gates.
