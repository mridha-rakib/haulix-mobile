# HAULIX Driver/Worker Mobile App — Phase DW-D08

## Tip Distribution & Individual Worker Share Matrix

**Phase Reference:** DW-D08  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Crosswalk Gate:** `1329:1848` (`"worker tips 100%"`)  
**Direct Nodes:** `1086:755` (*"100% workers · default equal split"*), `1086:758` (*"65/35 applies to subtotal, not tips"*)

---

### 1. Gratuity Policy & Regulatory Compliance

In accordance with federal labor guidelines (FLSA Tip Regulations) and the HAULIX Platform Charter:
1. **Zero Platform Withholding:**
   - Tips provided by customers (either upfront during booking or added post-service within the 24-hour review window) are the exclusive property of the workers who performed the job.
   - HAULIX deducts **0.00%** platform fee from tips.
   - Credit card merchant processing fees on tips are fully absorbed by the platform service charge, ensuring the worker receives 100% of the customer's intended gratuity.
2. **Individual Transparency:**
   - Both the Primary Driver and Helper receive distinct itemized ledger entries in their respective mobile apps showing the exact tip amount attributed to the job and their individual payout allocation.

---

### 2. Crew Distribution Scenarios & Allocation Matrix

| Scenario # | Crew Composition | Customer Tip | Driver Share ($) | Helper Share ($) | Platform Deduction | Policy Basis / Figma Anchor |
|:---|:---|:---|:---|:---|:---|:---|
| **SC-01** | Solo Driver | $0.00 | $0.00 | N/A | $0.00 | Standard no-tip baseline |
| **SC-02** | Solo Driver | $25.00 | $25.00 (100%) | N/A | $0.00 | 100% worker allocation |
| **SC-03** | Driver + 1 Helper | $20.00 | $10.00 (50%) | $10.00 (50%) | $0.00 | Canvas `1086:755` default equal split |
| **SC-04** | Driver + 1 Helper (Odd Cent) | $15.25 | $7.63 | $7.62 | $0.00 | Odd-cent rule: remainder cent to Primary Driver |
| **SC-05** | Driver + 2 Helpers | $30.00 | $10.00 (33.33%) | $10.00 each | $0.00 | Equal division across 3 active crew members |
| **SC-06** | Driver Only (Helper No-Show) | $20.00 | $20.00 (100%) | $0.00 (Unverified) | $0.00 | Only verified checked-in crew qualify for tip share |
| **SC-07** | Post-Service Tip Adjustment | +$10.00 | +$5.00 | +$5.00 | $0.00 | Customer adds tip during 24h review window; credited dynamically |

---

### 3. Edge Cases & Dispute Protection

1. **Helper Check-in Verification:**
   - A Helper must have an authenticated check-in event (`DW16` Crew Readiness confirmation or verified arrival) to be eligible for tip distribution. If a Helper was cancelled or marked absent before arrival, 100% of the tip reverts to the Primary Driver.
2. **Post-Completion Tip Additions (Customer App W08 Integration):**
   - In Customer App W08 / C28, customers can add or increase a tip within 24 hours of job completion.
   - When a tip is added post-completion, the backend ledger automatically triggers a `LEDGER_TIP_INCREMENT` event, notifying both workers via push notification and updating their Available Balance in `DW23`.
3. **Dispute & Chargeback Isolation:**
   - In the event of a customer dispute or fraudulent chargeback, tips already disbursed to workers are protected under the HAULIX Worker Guarantee and are not clawed back from worker bank accounts unless worker malfeasance/fraud is substantiated by an audited investigation.
