# HAULIX Driver/Worker Mobile App — DW-D01
# Requirements Reconciliation & Role Architecture

**Platform:** HAULIX Mobile Platform  
**Target Applications:** `apps/driver`  
**Phase:** DW-D01  
**Authoritative References:** Signed HAULIX SRS v1.6 & Approved Amendments, Authoritative Figma `meiXxwUNJaDo0a3mhcHBXv`  
**Launch Scope:** Arizona, USA (Initial Regional Operations)

---

## 1. Executive Summary & Requirements Traceability

The HAULIX Driver and Worker Mobile App provides the operational interface for logistics crew members executing moving, delivery, and item transport services.

### Formal SRS Verification & Authoritative Crosswalk:
The primary source of truth is the **Signed HAULIX SRS v1.6 and approved amendments**.
In addition to repository architecture, the authoritative Figma design workspace (`meiXxwUNJaDo0a3mhcHBXv`) contains the dedicated **Signed SRS v1.6 Requirement-to-Screen Crosswalk (Frame `1329:1824`)** directly transcribing Appendix C p.24 of the signed document. Every driver and helper workflow and screen ID in this design system traces directly to these authenticated requirement clauses:
- `WK-01–02, 13–15`: Account setup, credential verification, profile, service radius (`DW02–07, DW36–40, DW55–60`).
- `WK-03–06, 12, 18–19`: Verified Helper invitations and crew readiness (`DW13–16, DW48–49, DW62–65`).
- `DP-01–18, BK-08–09`: Dispatch matching, tiered radius offer expiry, GPS and live status (`DW09–12, DW17, DW19, DW28, DW34`).
- `CM-01–04, 07–09, 11–13`: Job chat, recorded voice notes, image exchange, extra-work scope adjustments (`DW18, DW20, DW47, DW51–53`).
- `WK-07–11, 17; PY-08–10, 16–29`: Worker ledger, 65/35 split, 100% tip pass-through, standard payout & eligible Instant Cash Out (`DW23–26, DW35, DW40, DW54, DW67–68`).
- `NT-01–10, NFR-02/06/14/15`: Location privacy, push notifications, and English/Spanish localization (`DW17, DW30, DW34, DW42, DW50`).

---

## 2. Driver vs Worker (Helper) Role Architecture

In accordance with Critical Monorepo Rule #3 (**Preserve Role Boundaries**):
- **Never simulate role switching locally:** Primary Driver vs Helper/Worker roles are determined **EXCLUSIVELY** by backend eligibility data, vehicle certifications, and driver license verification records.
- There is **NO client-side UI toggle** permitting an operational user to arbitrarily swap roles.

### Role Definitions:
1. **Primary Driver:**
   - Certified commercial or qualified independent driver with verified driver's license, vehicle registration, and active commercial/personal auto insurance.
   - Responsible for vehicle navigation, transit timeline management, customer PIN verification on arrival, and primary job dispatch acceptance.
2. **Helper / Worker:**
   - Certified crew assistant responsible for item loading, handling, carrying, unloading, and physical verification.
   - Assigned to jobs requiring 2+ crew members (e.g. bulky furniture, multi-story stairs, heavy appliances).
   - Does not manage vehicle routing or vehicle-level documentation, but has independent job acceptance, check-in, arrival confirmation, completion checklists, and earnings tracking.
3. **Applicant / Pending Verification User:**
   - Registered account holder whose identity, motor vehicle record (MVR), background check, or insurance documents are under review.
   - Limited strictly to onboarding, document re-upload, and verification status tracking.
4. **Suspended / Restricted User:**
   - Operational user with temporarily locked availability due to expired documents, dispute investigations, or policy violations.

---

## 3. Operational Role & Permissions Matrix

| Operational Action / Capability | Applicant | Helper / Worker | Primary Driver | Admin Control |
|:---|:---:|:---:|:---:|:---:|
| **Account Registration & Login** | Yes | Yes | Yes | Manage |
| **Identity & Document Upload** | Yes | Yes | Yes | Review / Approve |
| **Driver's License & Vehicle Registration** | N/A | N/A | **Mandatory** | Verify |
| **Manage Availability (Online / Offline)** | No | **Yes** | **Yes** | Override |
| **Receive & Inspect Job Offers** | No | **Yes** | **Yes** | Dispatch |
| **Accept / Decline Job Offer** | No | **Yes** | **Yes** | Monitor |
| **View Turn-by-Turn GPS Navigation** | No | Optional / Map View | **Primary Route** | Track |
| **Verify Customer Arrival PIN** | No | View Status | **Enter PIN** | Support Override |
| **Item Inventory Verification & Photo Capture** | No | **Yes (Co-Verify)** | **Yes (Primary)** | Audit |
| **Request Scope Revision / Extra Items** | No | Flag to Driver | **Submit to Customer** | Review / Arbitrate |
| **Capture Proof of Delivery (2 Tiles)** | No | **Capture Photos** | **Capture Photos** | Review |
| **Submit Job Completion** | No | Confirm Ready | **Submit Final** | Auto-Close / Audit |
| **View Individual Job Earnings** | No | **Worker Payout** | **Driver Payout** | Ledger Audit |
| **Request Instant Payout / Direct Deposit** | No | **Eligible Workers (with fee disclosure)** | **Eligible Drivers (with fee disclosure)** | Payout Process |
| **Report Safety Incident / Dispute** | No | **Yes** | **Yes** | Urgent Triage |

---

## 4. Cross-Application State Alignment (Customer ↔ Driver ↔ Worker ↔ Admin)

| Operational Event | Customer View (`apps/customer`) | Primary Driver View (`apps/driver`) | Helper / Worker View (`apps/driver`) | Admin View (Dashboard) | State Owner |
|:---|:---|:---|:---|:---|:---|
| **Booking Placed** | Searching for driver / Hold pending | N/A (queued for dispatch) | N/A (queued for dispatch) | Pending Dispatch | System |
| **Job Offered** | Matching in progress | **Job Offer Sheet (Tiered Radius Expiry: 10/20/30/40/50 mi @ 0/2/4/6/8m; 15m cap)** | Job Offer Sheet (Tiered Radius Expiry) | Broadcast Active | System |
| **Driver Accepted** | Driver matched (`HX-DRV-08`) | Assigned; Awaiting departure | Assigned; Awaiting departure | Crew Confirmed | Driver / System |
| **Departure** | Driver en route; Live map | **Turn-by-turn Navigation** | In-transit passenger view | In-Transit Tracking | Primary Driver |
| **Arrival at Pickup** | Driver arrived; Prepare for pickup | **Arrival confirmed; Request PIN** | Arrival confirmed | On-Site Arrival | Primary Driver |
| **PIN Verification** | Customer shares 4-digit PIN | **Enters PIN to unlock job** | Status: Verified | Verified Audit | Customer + Driver |
| **Loading & Scope Review** | Loading in progress | Inspects items; Flags discrepancies | Assists loading & photo check | Loading Timeline | Driver & Worker |
| **Scope Revision** | Review extra items & added price | **Pending customer approval** | Status: Scope pending | Flagged in Ledger | Driver -> Customer |
| **Transport to Dropoff** | In-transit to destination | Navigation to Dropoff | Route progress | GPS Tracking | Primary Driver |
| **Arrival & Unloading** | Unloading in progress | At destination; Unloading | Unloading items | On-Site Unload | Driver & Worker |
| **Proof of Delivery** | Awaiting completion review | **Captures 2 delivery photos** | Co-submits completion check | Proof Received | Driver & Worker |
| **Customer Review Window** | 24-Hour Review Window active | **Service complete; Capture pending** | Service complete; Capture pending | Dispute Window Active | System (24h Timer) |
| **Payment Capture** | Card charged; Receipt available | Payment captured; Earnings confirmed | Payment captured; Earnings confirmed | Captured Total | Stripe / Backend |
| **Payout Distribution** | In-app receipt downloaded | **Driver payout available in wallet** | **Worker payout available in wallet** | Payout Batch Dispatched | Payout Engine |
