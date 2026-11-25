# HAULIX Driver & Worker Mobile App — Phase DW-D05
# Technical Specification: Job Communication & Message State Architecture

**Module Code:** DW-W05 (Pickup, Turn-by-turn Navigation & Communication)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Audited Canonical Screens:** `DW18 · Job messages` (`1086:459` EN, `1088:788` ES) & `DW47 · Message status` (`1301:837` EN, `1301:2079` ES)  
**Supporting Overlay:** `OV-06 · Call preview` (`1305:706` EN, `1305:716` ES)  
**Requirements Traceability:** Signed HAULIX SRS v1.6 (`CM-01–04`, `CM-07–09`, `CM-11–13`, Appendix C p.24, Crosswalk Frame `1329:1824`)

---

## 1. Architectural Scope & Privacy Boundaries

Job-scoped communication facilitates real-time coordination while strictly protecting customer and worker privacy:
1. **Job-Scoped Channel:** Communications are strictly bound to an active order (`order_id`). Customer contact details (personal phone number, email) are NEVER directly exposed to workers.
2. **Channel Participants:** Customer (`apps/customer`), Primary Driver (`apps/driver`), and assigned Helper (`apps/driver`).
3. **Channel Termination:** The communication channel automatically closes 2 hours after delivery sign-off (`DW22`), archiving chat history and disabling further messaging.

---

## 2. In-Job Messaging (`DW18`)

- **Screen Dimensions:** 430 × 932 px.
- **Node IDs:** EN `1086:459`, ES `1088:788`.
- **Message Types:**
  - **Text Messages:** Incoming customer messages (`1086:487`), outgoing driver messages (`1086:490`).
  - **Asynchronous Voice Notes (`1086:493`):** Audio waveform playback surface (`1239:780`) with play/pause toggle and duration indicator (e.g. `0:14`). Designed for hands-free listening while en route.
  - **Canned Quick Replies:** Pre-composed safety messages (e.g., *"Running 5 mins late due to traffic"*, *"Arrived at pickup location"*).
- **Message Composer (`1086:503`):**
  - Text input field with send action button (`1303:769`).
  - Voice record hold button.
  - Media attachment icon.
- **Navigation Architecture:**
  - Frame: `Navigation / 5 Tabs / Active Messages` (`1086:475` EN, `1088:804` ES).
  - Standardized bounds: `y = 844`, `height = 88` (triggers `1086:507`..`510` in EN and `1088:836`..`839` in ES).

---

## 3. Message Status & Delivery Lifecycle (`DW47`)

```
[Local Composition] ➔ [QUEUED (Local SQLite/MMKV)] ➔ [SUBMITTED (Server API ACK)]
                                                             │
                  ┌──────────────────────────────────────────┴──────────────────────────┐
                  ▼                                                                     ▼
     [DELIVERED (Client Receipt)]                                          [FAILED (Network / Timeout)]
                  │                                                                     │
                  ▼                                                                     ▼
       [READ (Customer Opened)]                                          [Retry / Support Escalation]
```

### 3.1 Screen Remediation (`RES-D05-01`)
- **Node IDs:** EN `1301:837`, ES `1301:2079`.
- **Pre-Audit Inconsistency:** Originally displayed `Navigation / Active Profile` (`1301:853` EN, `1301:2095` ES) with inactive messages icon and missing Profile navigation trigger.
- **Remediated State (Live Canvas):**
  - Frame renamed to `Navigation / 5 Tabs / Active Messages`.
  - Messages icon swapped to active instance `1314:304` (`Nav icon vector / Messages / Active`) with lime fill `#BAFF42` (`VariableID:5:7`).
  - Profile icon swapped to inactive instance `1314:316` (`Nav icon vector / Profile / Inactive`) with muted fill `#ADB7B1` (`VariableID:5:10`).
  - Trigger at `x: 340` (`1301:906` EN, `1301:2148` ES) updated to `NAV ROUTE / DW27 / Profile` (routing to `DW27` `1086:840` EN / `1088:1169` ES).
  - All trigger bounds standardized to `y = 844`, `height = 88`.

### 3.2 Status Presentation & Invariants
- Subtitle (`1301:908`): `Message queued for delivery`.
- Status card (`1301:912`): `SUBMITTED / PENDING NETWORK CONFIRMATION`.
- Server disclosure (`1301:914`): Explicitly informs the worker that message dispatch requires server acknowledgment and will automatically retry upon cellular reconnection.
- Action (`1301:918`): `RETURN TO CONVERSATION` ➔ navigates back to `DW18`.

---

## 4. Voice Call Protocol (`OV-06`)

- **Overlay Node IDs:** EN `1305:706`, ES `1305:716`.
- **Presentation:** Bottom modal sheet (430 × 218 px).
- **Masked Telephony:** Voice calls are routed via Twilio Voice masked proxy (or WebRTC VoIP), preventing disclosure of customer or worker private telephone numbers.
- **Demo Disclosure:** Overlay communicates future masked calling capabilities without executing premature native OS phone calls during prototype inspection.
