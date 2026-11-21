# HAULIX Customer Mobile App — Phase 03.41

## Figma Prototype to Expo Router Audit: Booking Outcomes

**Phase:** 03.41  
**Audit Scope:** Verification of interaction graphs, incoming/outgoing routes, and hardware back button behavior  
**Audit Date:** 2026-11-21

---

### 1. Prototype Navigation Graph Verification

```
[ C30-CA: New Authorization Consent ]
                  │
                  ▼
[ C31-P: Checking Booking Status ]
   ├── (Scheduled Success Trigger) ──▶ [ C31-S: Booking Recorded ]
   │                                         ├── "Return to Home" ──▶ [ / (Home Screen) ]
   │                                         └── "View Details" ──▶ [ /booking-recorded ]
   │
   ├── (ASAP Success Trigger) ────────▶ [ C31-A: ASAP Request Recorded ]
   │                                         ├── "Return to Home" ──▶ [ / (Home Screen) ]
   │                                         └── "Cancel Request" ──▶ [ Modal Notice ]
   │
   ├── (Unconfirmed Trigger) ─────────▶ [ C31-F: Booking Not Yet Confirmed ]
   │                                         ├── "Choose Another Window" ──▶ [ C27-S: /select-available-window ]
   │                                         └── "Keep Waiting & Return Home" ──▶ [ / (Home Screen) ]
   │
   └── "Return to Home" (Default CTA) ──▶ [ / (Home Screen) ]
```

---

### 2. Route Manifest & Parameter Bindings

| Screen ID | File Path                                           | Canonical Route          | Query Params Supported         | Hardware Back Destination                    |
| :-------- | :-------------------------------------------------- | :----------------------- | :----------------------------- | :------------------------------------------- |
| **C31-S** | `apps/customer/app/(app)/booking-recorded.tsx`      | `/booking-recorded`      | `previewLocale?: "en" \| "es"` | `/checking-booking-status` or previous stack |
| **C31-A** | `apps/customer/app/(app)/asap-request-recorded.tsx` | `/asap-request-recorded` | `previewLocale?: "en" \| "es"` | `/checking-booking-status` or previous stack |
| **C31-F** | `apps/customer/app/(app)/booking-not-confirmed.tsx` | `/booking-not-confirmed` | `previewLocale?: "en" \| "es"` | `/checking-booking-status` or previous stack |

---

### 3. Upstream Route Audit & Resolution of Issue A

- **Issue A Identified in Phase 03.40:** C30-E (`card-hold-expired.tsx`) previously navigated to `/schedule-service-window` on the secondary recovery CTA. That path was ambiguous compared to the canonical scheduling route C27 (`/choose-service-time`).
- **Resolution in Phase 03.41:**
  - In `apps/customer/app/(app)/card-hold-expired.tsx`, updated `handleSelectNewWindow` to route strictly to `/choose-service-time`.
  - Updated unit tests in `card-hold-expired.test.tsx` to assert `/choose-service-time`.
  - Result: 100% of recovery routes across W04 now land on canonical, existing screen endpoints.
