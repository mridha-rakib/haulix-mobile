# HAULIX Driver & Worker Mobile App — Phase DW-D05
# Role Context & Shared Navigation Routing Matrix (DW-D05)

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Audited Screens:** `DW17`, `DW18`, `DW34`, `DW47`, `DW50`, `DW62`  
**Architecture Policy:** Role Context Preservation across Shared Workflow Screens

---

## 1. Role-Aware Navigation Destination Matrix

Shared screens (`DW18`, `DW34`, `DW47`, `DW50`) can be entered by either Primary Drivers or Crew Helpers. The mobile client must preserve the user's authenticated role when rendering bottom navigation and back routing:

| Screen ID | Canonical Title | Primary User Context | Active Tab | Home Tab Destination | Jobs Tab Destination | Earnings Tab Destination | Messages Tab Destination | Profile Tab Destination |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **DW17** | Active job | Primary Driver | *None (Full Map)* | `DW09` | `DW10` / `DW11` | `DW23` | `DW18` | `DW27` |
| **DW62** | Helper active job | Crew Helper | **Jobs** | `DW31` (Helper Home) | `DW14` / `DW62` | `DW24` (Helper Earnings) | `DW18` | `DW55` (Helper Profile) |
| **DW18** | Job messages | **Primary Driver Context** | **Messages** | `DW09` (`1086:3`) | `DW10` (`1086:81`) | `DW23` (`1086:670`) | *Current Screen* | `DW27` (`1086:840`) |
| **DW18** | Job messages | **Crew Helper Context** | **Messages** | `DW31` (`1086:1058`) | `DW14` (`1086:268`) | `DW24` (`1086:728`) | *Current Screen* | `DW55` (`1301:1534`) |
| **DW34** | Connection interrupted | Primary Driver | *Error Overlay* | Returns to `DW17` or `DW09` | N/A | N/A | N/A | N/A |
| **DW34** | Connection interrupted | Crew Helper | *Error Overlay* | Returns to `DW62` or `DW31` | N/A | N/A | N/A | N/A |
| **DW47** | Message status | Primary Driver Context | **Messages** | `DW09` | `DW10` | `DW23` | Returns to `DW18` | `DW27` |
| **DW47** | Message status | Crew Helper Context | **Messages** | `DW31` | `DW14` | `DW24` | Returns to `DW18` | `DW55` |
| **DW50** | Location & connection | Primary Driver Context | **Profile** | `DW09` | `DW10` | `DW23` | `DW18` | `DW27` |
| **DW50** | Location & connection | Crew Helper Context | **Profile** | `DW31` | `DW14` | `DW24` | `DW18` | `DW55` |

---

## 2. Header Back Navigation Protocol

1. **Active Job Screens (`DW17` / `DW62`):**
   - No top Header Back button is rendered during active en-route navigation to prevent accidental cancellation.
   - Workers must confirm arrival (`DW19`/`DW63`) or access support (`DW29`) to alter assignment state.
2. **Job Messages (`DW18`):**
   - Header Back arrow returns to the originating active job screen (`DW17` for Driver, `DW62` for Helper).
3. **Message Status (`DW47`):**
   - Header Back button or "Return to conversation" primary button (`1301:918`) returns to `DW18`.
4. **Connection Interrupted (`DW34`):**
   - "Retry connection" button returns to originating screen upon handshake restoration.
