# HAULIX Driver & Worker Mobile App

# Requirements Traceability Matrix (DW-FINAL)

**Application:** `apps/driver` (`com.haulix.driver`)  
**Design Space:** Page `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Requirements Crosswalk Frame:** `1329:1824`  
**Handoff Index Frame:** `1091:3`  
**UX Audit Board Frame:** `1317:1805`  
**Primary Requirement Source Status:** `BLOCKED_REQUIREMENT_SOURCE` (Physical signed SRS v1.6 document absent from repository; authoritative functional requirements mirrored in Figma Crosswalk `1329:1824`).

---

## 1. Work Package & Crosswalk Traceability

| Package ID | Workflow Domain                                  | Crosswalk Anchor | Core Policy Gate                                                                                |                            Canonical Screen IDs                            |   Localized Screen Count   |                   Supporting Overlays                    |  Verification Status  |
| :--------: | :----------------------------------------------- | :--------------: | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------: | :------------------------: | :------------------------------------------------------: | :-------------------: |
| **DW-W01** | Onboarding, Role Intake & Authentication         | Row `1329:1826`  | Role selection (Driver vs Helper), phone OTP, identity, background check disclosure             |               `DW01–DW04`, `DW43–DW44`, `DW58–DW61`, `DW66`                | 11 EN / 11 ES (22 screens) |                           N/A                            | **VERIFIED & CLOSED** |
| **DW-W02** | Driver & Helper Eligibility & Documents          | Row `1329:1830`  | Driver license, vehicle registration, insurance, helper eligibility, pending review             |                    `DW05–DW08`, `DW33`, `DW38`, `DW56`                     |  7 EN / 7 ES (14 screens)  |                           N/A                            | **VERIFIED & CLOSED** |
| **DW-W03** | Operational Home & Availability Dashboard        | Row `1329:1834`  | Driver online/offline toggle, dispatch radar, helper operational home, radius preferences       |                           `DW09`, `DW31`, `DW39`                           |  3 EN / 3 ES (6 screens)   |               `OV-05` (Availability Sheet)               | **VERIFIED & CLOSED** |
| **DW-W04** | Job Offers, Dispatch Matching & Crew Formation   | Row `1329:1838`  | Offer countdown, job details, offer expired, invite helper, review invitation, crew readiness   |                          `DW10–DW16`, `DW48–DW49`                          |  9 EN / 9 ES (18 screens)  |                           N/A                            | **VERIFIED & CLOSED** |
| **DW-W05** | Pickup Routing, Navigation, Chat & Connection    | Row `1329:1842`  | Turn-by-turn navigation, in-transit chat, GPS retry, call action, offline reconnection          |                `DW17–DW18`, `DW34`, `DW47`, `DW50`, `DW62`                 |  6 EN / 6 ES (12 screens)  |            `OV-06` (Call), `OV-07` (Location)            | **VERIFIED & CLOSED** |
| **DW-W06** | Active Service, Item Inventory & Scope Revisions | Row `1329:1845`  | On-site item checklist, additional work request, customer approval wait, scope adjustment       |                      `DW19–DW20`, `DW51–DW53`, `DW63`                      |  6 EN / 6 ES (12 screens)  |                           N/A                            | **VERIFIED & CLOSED** |
| **DW-W07** | Completion Evidence, Proof & Review Window       | Row `1329:1846`  | Multi-angle photo evidence, customer signature, 24h review notice, helper work submission       |                          `DW21–DW22`, `DW64–DW65`                          |  4 EN / 4 ES (8 screens)   |                           N/A                            | **VERIFIED & CLOSED** |
| **DW-W08** | Worker Ledger, Cash Out & Payout Processing      | Row `1329:1848`  | 65/35 subtotal split, 100% tip pass-through, instant cash out fee disclosure, payout failure    |              `DW23–DW26`, `DW35`, `DW40`, `DW54`, `DW67–DW68`              |  9 EN / 9 ES (18 screens)  |                 `OV-02` (Payout Method)                  | **VERIFIED & CLOSED** |
| **DW-W09** | Profile Settings, History & Safety Support       | Row `1329:1850`  | Worker profile, past jobs, support tickets, notifications, language & security, emergency sheet | `DW27–DW30`, `DW32`, `DW36–DW37`, `DW41–DW42`, `DW45–DW46`, `DW55`, `DW57` | 13 EN / 13 ES (26 screens) | `OV-01` (Photo), `OV-03` (Security), `OV-04` (Emergency) | **VERIFIED & CLOSED** |

---

## 2. Canonical State to Screen Mapping Summary

- **Total Canonical States:** 68 (`DW01` through `DW68`)
- **Total Localized Screens:** 136 screens (68 English + 68 Spanish)
- **Total Prototype Overlays:** 14 frames (7 English + 7 Spanish)
- **Detailed State Registry:** Refer to [DRIVER_WORKER_IMPLEMENTATION_REGISTRY.json](file:///C:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/driver-final/DRIVER_WORKER_IMPLEMENTATION_REGISTRY.json) for full node IDs, dimensions, routes, and component bindings.
