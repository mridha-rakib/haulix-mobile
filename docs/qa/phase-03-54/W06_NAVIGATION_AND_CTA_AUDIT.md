# HAULIX Customer Mobile App — W06 Navigation and CTA Audit

## Detailed Action & Transition Mapping for All 26 Canonical States

**Scope:** Customer App Workflow 06 (Active Service)  
**Verification Date:** November 23, 2026  
**Auditor:** HAULIX Engineering

---

## 1. Primary Flow & Step-by-Step Transitions

```
[W05 Dispatch Entry Bridge] -> /job-active-bridge
            │
            ▼
01. PRE (Awaiting Departure) -> /active-service-awaiting-departure
            │ (Driver departs)
            ▼
02. ENROUTE (In Transit) ------> /active-service-en-route
            │ (Arrival at pickup)
            ▼
06. ARRIVED (Driver Arrived) --> /active-service-driver-arrived
            │ (Start loading)
            ▼
07. WORKING (Service Active) --> /active-service-working
            │
            ├─────────────┬─────────────┬─────────────┐
            ▼             ▼             ▼             ▼
       [Communication]  [GPS Tracking]  [Scope Mod]  [Exceptions]
          08-11           10-12            16-22        23 (No-show)
          (Chat)        (Live/Off/Den)   (R2 Revisions) 24 (Closed)
            │             │             │             │
            └─────────────┴─────────────┴─────────────┘
                                  │
                                  ▼
           26. W08_HANDOFF (/active-service-completion-bridge)
                                  │
                                  ▼
              [Upcoming W07/W08 Delivery Proof & Rating]
```

---

## 2. Comprehensive State-by-State CTA Mapping

| State                    | Primary CTA Action & Target                                     | Secondary CTA / Alternate Actions                     | Back Button Destination                               |
| ------------------------ | --------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| 01. PRE                  | View Driver Live Status (`/active-service-en-route`)            | Contact Support (`/active-service-support`)           | Entry Bridge (`/job-active-bridge`)                   |
| 02. ENROUTE              | Open In-Transit Map / Progress (`/active-service-working`)      | Call Driver / Chat (`/active-service-chat`)           | PRE (`/active-service-awaiting-departure`)            |
| 03. ETA_PENDING          | Refresh Provider Sync (`/active-service-en-route`)              | Direct Call (`/active-service-call-forwarding`)       | Enroute (`/active-service-en-route`)                  |
| 04. GPS_OFFLINE          | Retry Signal Connection (`/active-service-en-route`)            | Direct Phone Call (`/active-service-call-forwarding`) | Enroute (`/active-service-en-route`)                  |
| 05. GPS_DENIED           | Learn Sharing Permissions (`/active-service-support`)           | Call Driver (`/active-service-call-forwarding`)       | Enroute (`/active-service-en-route`)                  |
| 06. ARRIVED              | Confirm Security PIN 8492 (`/active-service-working`)           | Driver Chat (`/active-service-chat`)                  | Enroute (`/active-service-en-route`)                  |
| 07. WORKING              | Review Live Service Scope (`/active-service-extra-request`)     | Open Chat (`/active-service-chat`)                    | Arrival (`/active-service-driver-arrived`)            |
| 08. CHAT                 | Send Text Message (`/active-service-chat-sent`)                 | Attach Photo/Voice (`/active-service-media`)          | Working (`/active-service-working`)                   |
| 09. CHAT_EMPTY           | Tap Preset Suggestion -> Composer                               | Call Driver (`/active-service-call-forwarding`)       | Working (`/active-service-working`)                   |
| 10. CHAT_FAILED          | Retry Delivery (`/active-service-chat-sent`)                    | Edit Message / Call Driver                            | Working (`/active-service-working`)                   |
| 11. CHAT_SENT            | View Conversation (`/active-service-chat`)                      | Return to Job (`/active-service-working`)             | Working (`/active-service-working`)                   |
| 12. MEDIA                | Capture / Attach Photo (`/active-service-media-sent`)           | Cancel Attachment (`/active-service-chat`)            | Chat (`/active-service-chat`)                         |
| 13. MEDIA_DENIED         | Continue in Text Chat (`/active-service-chat`)                  | Review System Permissions                             | Chat (`/active-service-chat`)                         |
| 14. MEDIA_FAILED         | Retry Upload (`/active-service-media-sent`)                     | Discard Photo (`/active-service-chat`)                | Chat (`/active-service-chat`)                         |
| 15. MEDIA_SENT           | View Attachment in Chat (`/active-service-chat`)                | Return to Job (`/active-service-working`)             | Chat (`/active-service-chat`)                         |
| 16. EXTRA_REQUEST        | Submit for Admin Review (`/active-service-extra-admin-pending`) | Keep Current Scope (`/active-service-working`)        | Working (`/active-service-working`)                   |
| 17. EXTRA_ADMIN_PENDING  | Preview Pending Approval (`/active-service-extra-approved`)     | Return to Active Job (`/active-service-working`)      | Working (`/active-service-working`)                   |
| 18. EXTRA_ADMIN_REJECTED | Acknowledge & Continue (`/active-service-working`)              | Contact Support (`/active-service-support`)           | Working (`/active-service-working`)                   |
| 19. EXTRA_APPROVED       | Accept Revision R2 (`/active-service-extra-accepted`)           | Decline Revision (`/active-service-extra-declined`)   | Admin Pending (`/active-service-extra-admin-pending`) |
| 20. EXTRA_EXPIRED        | Review New Request (`/active-service-extra-request`)            | Return to Original Scope (`/active-service-working`)  | Working (`/active-service-working`)                   |
| 21. EXTRA_ACCEPTED       | Proceed to Completion (`/active-service-completion-bridge`)     | Return to Active Job (`/active-service-working`)      | Extra Approved (`/active-service-extra-approved`)     |
| 22. EXTRA_DECLINED       | Continue Original Job (`/active-service-working`)               | Open Chat (`/active-service-chat`)                    | Extra Approved (`/active-service-extra-approved`)     |
| 23. NO_SHOW              | Confirm No-Show Exception                                       | Contact Support (`/active-service-support`)           | Working (`/active-service-working`)                   |
| 24. GPS_CLOSED           | Review Service Handoff (`/active-service-completion-bridge`)    | Contact Support (`/active-service-support`)           | Working (`/active-service-working`)                   |
| 25. SUPPORT              | Call Support Line / Initiate Chat                               | Request Immediate Callback                            | Previous Screen / Working                             |
| 26. W08_HANDOFF          | Begin Delivery Review & Sign-Off                                | Preview Delivery Photos                               | Working (`/active-service-working`)                   |

---

## 3. Key Architectural Rules Verified

1. **Cycle Prevention:**
   - Previous versions of `EXTRA_ACCEPTED` and `GPS_CLOSED` navigated backward to `/job-active-bridge`.
   - Now corrected to push forward to `/active-service-completion-bridge`.
   - `/active-service-completion-bridge` explicitly transitions toward W08 delivery verification.
2. **Context-Sensitive Support Separation:**
   - Dispatch Search Support: `/dispatch-support` (W05 context).
   - In-Service Active Support: `/active-service-support` (W06 context with driver Mike R. and booking HX-AZ-DEMO-0042).
