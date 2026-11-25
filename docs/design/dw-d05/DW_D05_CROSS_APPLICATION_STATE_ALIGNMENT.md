# HAULIX Driver & Worker Mobile App — Phase DW-D05
# Cross-Application Lifecycle & State Alignment: Customer, Driver, Helper & Admin

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Customer App Reference:** `apps/customer` (Frozen at `942c869de6726b9f277abcd1776728b228f7b2e4`)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`ST-01–15`, `DP-12–16`, `BK-08–09`, Crosswalk Frame `1329:1824`)

---

## 1. Cross-Application State Alignment Matrix (Transit & Arrival)

| Operational Event | Customer App (`apps/customer`) | Primary Driver App (`apps/driver`) | Crew Helper App (`apps/driver`) | Admin Operations Console | Backend State Enum |
|---|---|---|---|---|---|
| **Departure / En Route** | `C13 · Driver on the way` (Live vehicle marker, ETA badge, Customer chat) | `DW17 · Active job` (Turn-by-turn routing, ETA, Speed, Chat CTA) | `DW62 · Helper active job` (Transit status, Driver tracking, Arrival CTA) | Live fleet tracking map, GPS stream verification | `EN_ROUTE_TO_PICKUP` |
| **Driver Arrives at Pickup** | `C13 · Driver has arrived` (Notification banner, Arrival prompt) | `DW19 · On-site job progress` (Enter customer PIN card, Geofence cleared) | `DW62` (Driver arrived notice) | Timestamp recorded: `driver_arrived_at` | `DRIVER_ARRIVED` |
| **Helper Arrives at Pickup** | Notification: "Your crew is assembled" | `DW19` (Helper arrived indicator) | `DW63 · Helper on-site progress` (Labor checklist unlocked) | Timestamp recorded: `helper_arrived_at` | `CREW_ARRIVED` |
| **Customer Messaging** | `C14 · Order chat` (Customer text composer, Audio playback) | `DW18 · Job messages` (Driver composer, Audio playback) | `DW18 · Job messages` (Helper view / chat participation) | Full message log monitor, Safety flagging | N/A (Sub-state `MESSAGE_DISPATCH`) |
| **Cellular Connection Lost** | `C13` (Last known GPS location held, "Connecting..." banner) | `DW34 · Connection interrupted` (Offline banner, Local action caching) | `DW34 · Connection interrupted` (Offline banner, Local action caching) | Worker heartbeat timeout alert (after 60s) | Sub-state `WORKER_OFFLINE_INTERMITTENT` |
| **Location Signal Lost / Denied** | `C13` ("Driver location updating...") | `DW50 · Location & connection` (OS permission recovery instructions) | `DW50 · Location & connection` (OS permission recovery instructions) | GPS accuracy degradation warning | Sub-state `GPS_DEGRADED` |
| **Service Commencement (PIN Verified)**| `C15 · In progress` (Loading checklist) | `DW19 · Loading in progress` (Item inventory sign-off) | `DW63 · Loading in progress` (Labor tasks) | Job active, Timer started | `LOADING_IN_PROGRESS` |

---

## 2. Real-Time Tracking & Event Invariants

1. **Independent Arrival Invariant:**
   - Driver arrival (`DW17` ➔ `DW19`) is recorded separately from Helper arrival (`DW62` ➔ `DW63`).
   - Customer PIN entry on `DW19` remains locked until BOTH workers are confirmed on site for multi-person bookings.
2. **Customer Privacy Invariant:**
   - Driver vehicle location is shared with the customer ONLY while the order status is `EN_ROUTE_TO_PICKUP` and `IN_TRANSIT`.
   - Driver location streaming terminates immediately upon arrival at destination and completion sign-off (`DW22`).
