# HAULIX Driver & Worker Mobile App — Phase DW-D04
# Cross-Application Lifecycle & State Alignment: Customer, Driver, Helper & Admin

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Customer App Reference:** `apps/customer` (`com.haulix.customer`, frozen at `942c869de6726b9f277abcd1776728b228f7b2e4`)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`ST-01–15`, `DP-01–18`, `BK-01–14`, Crosswalk Frame `1329:1824`)

---

## 1. Unified 4-Actor Lifecycle State Machine

The moving order lifecycle coordinates four autonomous entities:
1. **Customer Mobile Client (`apps/customer`)**
2. **Primary Driver Mobile Client (`apps/driver`, Role: `PRIMARY_DRIVER`)**
3. **Crew Helper Mobile Client (`apps/driver`, Role: `HELPER`)**
4. **Operations / Dispatch Admin Console (`web/admin`)**

```
Order Created & Authorized
          │
          ▼
┌───────────────────┐
│   BROADCASTING    │ ➔ Customer: C11 (Matching Drivers) | Driver: DW10 (Offer Card) | Admin: Active Broadcast
└─────────┬─────────┘
          │ (Driver Taps "Accept Job" on DW11)
          ▼
┌───────────────────┐
│ DISPATCH_ACCEPTED │ ➔ Customer: C12 (Driver Assigned) | Driver: DW11➔DW13 | Admin: Primary Assigned
└─────────┬─────────┘
          │ (Driver Selects Helper on DW48 & Invites on DW49)
          ▼
┌───────────────────┐
│  INVITING_HELPER  │ ➔ Driver: DW49 (Pending) | Helper: DW14➔DW15 (Review) | Admin: Crew In Formation
└─────────┬─────────┘
          │ (Helper Taps "Accept Invitation" on DW15)
          ▼
┌───────────────────┐
│    CREW_FORMED    │ ➔ Customer: C12 (2-Person Crew Confirmed) | Driver & Helper: DW16 (Readiness)
└─────────┬─────────┘
          │ (Both Confirm Safety Checklist on DW16)
          ▼
┌───────────────────┐
│EN_ROUTE_TO_PICKUP │ ➔ Customer: C13 (Vehicle En Route) | Driver: DW17 (Turn-by-turn) | Helper: DW62
└───────────────────┘
```

---

## 2. Cross-Application State Matrix

| Backend State Enum | Customer App Screen (`apps/customer`) | Primary Driver Screen (`apps/driver`) | Crew Helper Screen (`apps/driver`) | Admin Dispatch Console | Financial / Billing Status |
|---|---|---|---|---|---|
| `ORDER_BROADCASTING` | `C11 · Finding your driver` | `DW10 · Job offers` | `DW31 · Helper home (Online)` | Broadcast monitor (Expanding rings 1–5) | Payment Pre-authorized (Stripe hold) |
| `DRIVER_ASSIGNED` | `C12 · Driver assigned` | `DW13 · Invite a Helper` (if 2-person) or `DW17` (solo) | `DW31 · Helper home` | Driver locked; Helper unassigned | Pre-auth maintained |
| `HELPER_INVITED` | `C12 · Assembling crew` | `DW49 · Invitation pending` | `DW14 · Helper invitations` / `DW15 · Review` | Crew invitation timer active (3m) | Pre-auth maintained |
| `CREW_FORMED` | `C12 · Crew confirmed` | `DW16 · Crew readiness` | `DW16 · Crew readiness` | 2-person crew locked | Pre-auth maintained |
| `EN_ROUTE_TO_PICKUP` | `C13 · Driver on the way` | `DW17 · Active job / Navigation` | `DW62 · Helper active job` | Real-time GPS stream active | Pre-auth maintained |
| `DISPATCH_EXPIRED` | `C11 · Expanding search` | `DW12 · Offer unavailable` | `DW31 · Helper home` | Dispatch escalation ticket created | No charge |
| `INVITATION_EXPIRED`| `C12 · Assembling crew` | `DW48 · Choose a Helper` (Retry) | `DW14 · Helper invitations (Expired)` | Auto-invite fallback triggered | Pre-auth maintained |

---

## 3. Financial Integrity & Fare Transparency

1. **Customer Charge vs Driver Payout:**
   - Customer sees total all-inclusive estimate on `C07`–`C09` (Base fee + Mileage + Labor + Equipment + Service Fee).
   - Driver sees **Net Worker Payout** on `DW10` and `DW11` (Contracted 65% base fare + mileage + heavy items + 100% tip pass-through).
   - Helper sees **Net Labor Share** on `DW14` and `DW15` (Contracted 35% base fare + labor share + 100% helper tip pass-through).
   - The platform never exposes internal commission cuts or merchant processing deductions as worker deductions.
2. **Cancellation Protections:**
   - If customer cancels after `DISPATCH_ACCEPTED` (> 5 min window), cancellation fee applies, and driver/helper receive compensation per SRS `BK-12`.
