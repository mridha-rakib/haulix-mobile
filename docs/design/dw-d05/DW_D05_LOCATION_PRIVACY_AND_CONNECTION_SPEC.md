# HAULIX Driver & Worker Mobile App — Phase DW-D05
# Technical Specification: Location Privacy, Permission Recovery & Connection Resilience

**Module Code:** DW-W05 (Pickup, Turn-by-turn Navigation & Communication)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Audited Canonical Screens:** `DW34 · Connection interrupted` (`1086:1188` EN, `1088:1517` ES) & `DW50 · Location & connection` (`1301:1097` EN, `1301:2339` ES)  
**Supporting Overlay:** `OV-07 · Location preview` (`1305:726` EN, `1305:735` ES)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`NT-01–10`, `NFR-02`, `NFR-03`, Crosswalk Frame `1329:1824`)

---

## 1. Location Privacy Architecture & Requirements Reconciliation

To reconcile conflicting assertions regarding location tracking, the following strict policy is derived from the Signed SRS and approved architecture:

| Operational State | Driver Location Policy | Helper Location Policy | Purpose & Regulatory Boundary |
|---|---|---|---|
| **OFFLINE** | **NO TRACKING** | **NO TRACKING** | Absolute privacy. Background location services are completely terminated. |
| **ONLINE (Available)** | **Low-Frequency Polling (30s–60s)** | **Low-Frequency Polling (60s)** | Radial dispatch proximity matching (`DP-01–18`). Required to receive nearby job offers. |
| **EN_ROUTE_TO_PICKUP** | **High-Frequency Streaming (5s)** | **Stationary / Transit (15s–30s)** | Powers customer live tracking map (`C13`) and vehicle arrival detection. |
| **ON-SITE (Loading/Unloading)** | **Stationary Geofence (60s)** | **Stationary Geofence (60s)** | Verification of continued presence at service location. |
| **IN_TRANSIT (To Dropoff)** | **High-Frequency Streaming (5s)** | **Transit Tracking (15s–30s)** | Customer destination tracking (`C15`). |
| **TRIP COMPLETED** | **Reverts to Online/Offline Setting** | **Reverts to Online/Offline Setting** | Active job tracking terminates immediately upon final delivery sign-off (`DW22`). |

### 1.1 The "Going Offline During Active Assignment" Invariant
- If a worker toggles their status to `OFFLINE` while actively assigned to an order (`EN_ROUTE_TO_PICKUP` through `UNLOADING`), the offline toggle affects **FUTURE DISPATCHES ONLY**.
- The worker will receive no further job broadcasts.
- However, location tracking for the **CURRENT ACTIVE ORDER CANNOT BE TERMINATED**, as customer ETA calculations and safety monitoring are contractual prerequisites (`BK-08`, `NFR-02`).
- Location streaming stops only when the booking reaches terminal status (`COMPLETED` or `CANCELLED`).

---

## 2. Location & Connection Recovery (`DW50`)

- **Screen Dimensions:** 430 × 932 px.
- **Node IDs:** EN `1301:1097`, ES `1301:2339`.
- **Purpose:** Diagnostic hub for troubleshooting denied OS permissions or degraded GNSS hardware signals.
- **Diagnostic Rows:**
  - `Location permission row` (`1301:1175` / `1301:2417`): Displays current OS permission state (`Always Allow` vs `While In Use` vs `Denied`). Directs user to device settings.
  - `Network status row` (`1301:1179` / `1301:2421`): Cellular/Wi-Fi signal strength and API latency.
- **Action CTAs:**
  - `Retry connection · demo` (`1301:1186` / `1301:2428`): Triggers reconnection handshake and re-evaluates location provider.
  - `Contact support` (`1301:1188` / `1301:2430`): Escalates to operational dispatcher.
- **Navigation Context:**
  - Owned by Profile / Settings domain (`Navigation / Active Profile` at `y: 844, height: 88`). All trigger bounds standardized to `y: 844..932`.

---

## 3. Connection Interruption & Offline Resilience (`DW34`)

- **Screen Dimensions:** 430 × 932 px.
- **Node IDs:** EN `1086:1188`, ES `1088:1517`.
- **Offline Invariant (`NFR-03`):**
  - Cellular dead zones (e.g. underground parkades, remote Arizona freight corridors) must not crash the client application.
  - When connection is lost, `DW34` surfaces an offline notification banner while preserving active trip state in local memory.
  - Critical timestamps (arrival time, customer PIN entries, photo proof) are signed and stored locally in encrypted storage.
- **Recovery Actions:**
  - `Retry connection · demo` (`1086:1211` / `1088:1540`): In prototype, links to `DW09`. In technical implementation, retry executes an exponential backoff ping and returns the user directly to their **originating screen** (`DW17` for driver navigation, `DW62` for helper status, `DW18` for messages).
  - `Support` (`1086:1213` / `1088:1542`): Navigates to `DW29 · Help & support`.

---

## 4. Location Permission Supporting Overlay (`OV-07`)

- **Overlay Node IDs:** EN `1305:726`, ES `1305:735`.
- **Presentation:** Bottom modal sheet (430 × 233 px EN, 430 × 218 px ES).
- **Content:** Educational disclosure explaining why "Always Allow" location permission is required for accurate radial dispatch matching and customer safety tracking.
- **Action:** `OPEN SETTINGS` / `ABRIR AJUSTES` ➔ communicates deep link to OS application settings.
