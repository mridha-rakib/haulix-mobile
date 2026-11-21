# HAULIX Customer Mobile App — Phase 03.44

## Cancellation Policy Source Traceability & Signed SRS Audit

### 1. Traceability Scope

- **Requirements Source:** Signed HAULIX SRS v1.6 requirements `CAN-01`, `CAN-02`, `CAN-03`, `DISP-01`, and `BK-06`.
- **Figma Reference:** Sections `836:4571` (EN) and `836:4572` (ES), Predecessor handoffs `763:1290` / `766:1676`.

---

### 2. Policy Rule Traceability Matrix

| Policy Rule                     | Condition & Time Window                         | Commercial Fee            | Source Requirement  | User Disclosure Copy                                                                                                                                            | Enforcement Mode                         |
| :------------------------------ | :---------------------------------------------- | :------------------------ | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| **Tier 1: Searching Phase**     | While dispatch is querying verified drivers     | **$0.00 (100% Free)**     | `CAN-01`, `BK-06`   | _"Cancel at any moment while dispatch searches. In this prototype, simulated card pre-authorization is released without financial charge."_                     | **Automatic Fee-Free Exit**              |
| **Tier 2: Grace Period**        | First 5 minutes after driver match is confirmed | **$0.00 (Grace Window)**  | `CAN-02`, `DISP-03` | _"First 5 minutes after a driver accepts. Review crew credentials with full flexibility and zero cancellation fee."_                                            | **Automatic Grace Exit**                 |
| **Tier 3: Post-Grace En Route** | >5 minutes post-match while crew is traveling   | **$100.00 (Conditional)** | `CAN-03`            | _"If cancelled while crew is en route past 5 min, an illustrative conditional $100 fee applies unless arrival is delayed > 15 min or mutual waiver is logged."_ | **Conditional / Waiver Review Required** |
| **Delay Waiver**                | Driver arrival delayed > 15 minutes beyond ETA  | **$0.00 (Fee Waived)**    | `CAN-03-W`          | _"Support assistance request noted. Illustrative delay waiver logged."_                                                                                         | **Waiver Request Trigger**               |

---

### 3. Truthful Card Hold Wording (P0-POLICY-01 Remediation)

The previous implementation stated:

> _"Your pre-authorization card hold is released immediately."_

This was misleading because no live Stripe or banking API call occurs in this prototype.

In Phase 03.44, this copy was remediated across both languages:

- **English:** `"DEMONSTRATION POLICY · Non-binding illustrative example. In this prototype, no actual card hold or financial settlement was processed."`
- **Spanish:** `"POLÍTICA DE DEMOSTRACIÓN · Ejemplo ilustrativo no vinculante. En este prototipo no se ha procesado ninguna retención bancaria real ni liquidación financiera."`
