# HAULIX Customer Mobile App — Phase 03.45

## W05 Dispatch State Integrity & Financial Safety Report

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.45  
**WORKFLOW:** W05 Dispatch & Assignment  
**FIXTURE:** `apps/customer/src/fixtures/c32Dispatch.ts`

---

### 1. State Invariant Governance

All W05 dispatch screens strictly enforce the project-wide demonstration invariants:

| Parameter              | Invariant Value                                                           | Source Standard           | Enforcement Mechanism                            |
| :--------------------- | :------------------------------------------------------------------------ | :------------------------ | :----------------------------------------------- |
| **Booking Reference**  | `#HLX-7829-BK`                                                            | W04 Outcome Milestone     | Static typed fixture binding in `c32Dispatch.ts` |
| **Illustrative Hold**  | `$356.00 USD` (Uncaptured)                                                | Pre-auth hold contract    | Symmetrical display in all cards & modals        |
| **Customer Inventory** | 4 pieces across 3 categories (1 sofa, 2 queen mattresses, 1 dining table) | Customer draft inventory  | Symmetrically rendered in EN/ES                  |
| **Pickup Location**    | `1234 E Example Lane, Phoenix, AZ 85014`                                  | Customer intake address   | Map coordinate & header chip binding             |
| **Vehicle Assignment** | `Ford Transit High Roof · White (#AZ-HLX29)`                              | Demonstration driver card | Typed vehicle data model                         |
| **Assigned Crew**      | `Marcus Vance` (Rating 4.9 · 312 jobs completed)                          | Demonstration crew model  | Verified badge with ratings                      |

---

### 2. Financial & Operational Safety Guardrails

In strict conformance with Section 11 & 12:

1. **Zero Fake Backend Claims:** The application does not claim to connect to a production dispatch engine, live GPS telemetry, or live driver communication channels.
2. **Zero Live Stripe Charges:** The hold amount of `$356.00 USD` is explicitly disclosed as a simulated pre-authorization hold with zero captured funds.
3. **Transparent Demo Notices:** Every screen renders a persistent, unobtrusive UI footer notice:
   - English: `"UI PROTOTYPE · Live crew tracking · Simulated coordinates"`
   - Spanish: `"PROTOTIPO UI · Seguimiento en vivo de equipo · Coordenadas simuladas"`
4. **Cancellation Policy Demonstration:** The 5-minute grace period, conditional $100 fee, and delay-waiver policy are strictly presented as demonstration terms.
