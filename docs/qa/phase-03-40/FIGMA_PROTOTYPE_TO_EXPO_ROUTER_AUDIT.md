# HAULIX Phase 03.40 — Figma Prototype to Expo Router Audit

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.40  
**Scope:** Navigation Routes, Transitions, Back Navigation & State Propagation  
**Audit Date:** 2026-11-21

---

## 1. Route Mapping & Prototype Interactions

| Screen ID  | Canonical Route File                                       | Primary CTA Target                                          | Secondary CTA Target              | Header Back Target                                                          |
| :--------- | :--------------------------------------------------------- | :---------------------------------------------------------- | :-------------------------------- | :-------------------------------------------------------------------------- |
| **C30-R**  | `apps/customer/app/(app)/restore-secure-authorization.tsx` | `/review-fresh-card-hold` (C30-C)                           | `/choose-payment-method` (C29)    | `/payment-authorization-declined` (C30-D) or `/choose-payment-method` (C29) |
| **C30-C**  | `apps/customer/app/(app)/review-fresh-card-hold.tsx`       | `/new-authorization-consent` (C30-CA) _(requires checkbox)_ | `/choose-payment-method` (C29)    | `/restore-secure-authorization` (C30-R)                                     |
| **C30-CA** | `apps/customer/app/(app)/new-authorization-consent.tsx`    | `/checking-booking-status` (C31-P)                          | `/review-fresh-card-hold` (C30-C) | `/review-fresh-card-hold` (C30-C)                                           |
| **C31-P**  | `apps/customer/app/(app)/checking-booking-status.tsx`      | `/(app)/home` (Root Return)                                 | N/A                               | `/new-authorization-consent` (C30-CA)                                       |

---

## 2. Upstream Linkage Audit (Resolution of Phase 03.39 Transitions)

### C30-D (Payment Authorization Declined) Upstream Routing:

- **Prior State:** C30-D contained an assistance action that previously displayed an inline notice.
- **Phase 03.40 State:** In `payment-authorization-declined.tsx`, tapping the recovery assistance trigger routes directly to `/restore-secure-authorization` (C30-R), closing the customer recovery loop.

### C30-E (Card Hold Expired) Upstream Routing:

- **Prior State:** C30-E offered renewal without a dedicated hold terms review destination.
- **Phase 03.40 State:** In `card-hold-expired.tsx`, the primary assistance button connects directly to `/review-fresh-card-hold` (C30-C), providing customer clarity on new hold duration and terms.

### C29-P (Authorizing Your Payment) Upstream Simulation:

- **Prior State:** C29-P simulation displayed a static notice upon completion.
- **Phase 03.40 State:** In `payment-authorization-pending.tsx`, triggering simulated success navigates forward to `/checking-booking-status` (C31-P), accurately demonstrating the transition into the dispatch queue.

---

## 3. Back-Stack & History Integrity

- **Predictable History:** Pressing the top-left back button (`<BackArrowIcon />`) invokes `router.back()`. If no prior stack exists (e.g. direct deep link), the route falls back to its logical upstream canonical route.
- **Tab Bar Suppression:** All 4 screens run under the `(app)` group without displaying bottom tab navigation, strictly adhering to the booking checkout workflow isolation rule.
