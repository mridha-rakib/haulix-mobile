# DW-D06: Cross-Application State Alignment Matrix

## 1. System Integration Overview

This document maps active service and scope revision events across all four HAULIX platforms: Customer Mobile App (`apps/customer`), Driver App (`apps/driver`), Helper Experience, and the Admin Web Portal.

---

## 2. Real-Time State Alignment Matrix

| Lifecycle Event | Customer App | Driver App | Helper Role | Admin Portal | State Authority & Transport |
|---|---|---|---|---|---|
| **Driver Arrived at Pickup** | `C14 · Driver Arrived` | `DW19 · On-site Progress` | `DW62 · Awaiting Arrival` | `DRIVER_ARRIVED` | Server Geofence / REST |
| **Helper Arrived at Pickup** | `C14 · Driver Arrived` (Crew badge) | `DW19 · On-site Progress` | `DW63 · On-site Progress` | `CREW_ARRIVED` | Helper Self-Checkin / REST |
| **Labor Commenced** | `C14 · Service in Progress` | `DW19 · Work Started` | `DW63 · Labor Tasks` | `IN_PROGRESS` | Server Timestamp / WebSocket |
| **Scope Change Identified** | No change (Unaware) | `DW20 · Additional Work` | `DW63 · On-site Progress` | No change | Local Draft on Driver Device |
| **Scope Proposal Submitted** | `C20 · Chat Notice` / Push | `DW51 · Extra Work Pending` | `DW51 · Extra Work Pending` | `EXTRA_WORK_REVIEW` | REST `POST /scope-change` |
| **Admin Authorizes Tariff** | Push: `Approval Required` | `DW51 · Waiting Customer` | `DW51 · Waiting Customer` | `ADMIN_ACCEPTED` | Admin Action / WebSocket |
| **Customer Accepts Quote** | `C21 · Quote Updated` | `DW52 · Extra Work Approved` | `DW52 · Extra Work Approved` | `SCOPE_COMMITTED` | Customer Payment Re-auth |
| **Customer Declines Quote** | `C14 · Service in Progress` | `DW53 · Extra Work Declined` | `DW53 · Extra Work Declined` | `SCOPE_REJECTED` | Customer Rejection / WebSocket |
| **Helper Completes Labor** | No change | `DW19 · Ready for Completion` | `DW64 · Helper Evidence` | `HELPER_COMPLETED` | Helper Upload / REST |
| **Overall Service Finished** | `C17 · Completion Review` | `DW21 · Completion Proof` | `DW65 · Helper Submitted` | `PENDING_REVIEW` | Driver Proof Upload / REST |

---

## 3. Financial Consistency & Demonstration Fixtures

- **Customer App Fixture:** 1 sofa, 2 queen mattresses, 1 dining table (4 pieces across 3 categories), total illustrative quote $356.00 USD.
- **Driver App Figma Canvas:** Demonstrates illustrative scope `Furniture removal · 1 sofa + 2 chairs`.
- **Consistency Rule:** Demonstration fixtures on design mockups represent independent illustrative scenarios. Production implementations dynamically bind to backend booking items.
