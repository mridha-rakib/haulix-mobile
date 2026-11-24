# HAULIX Customer Mobile App — Functional Navigation & CTA Audit

## End-to-End Route Flow, Action Triggers, Back Handling & Bottom Navigation Audit

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Audit Scope:** Workflows 01 through 08  
**Audit Phase:** Phase 03.66 Comprehensive Final Audit  
**Date:** November 24, 2026

---

## 1. Navigation Architecture & Principles

The HAULIX Customer Mobile App uses Expo Router file-based routing (`expo-router`) configured under `apps/customer/app/`:

- **Unrestricted Frontend Routing:** Zero client-side route guards, session redirects, or auth checks block access to any screen.
- **Hardware Back Handling:** Every modal and full-screen route implements a dedicated `BackHandler` listener returning cleanly to its parent state.
- **Zero Orphan Screens:** Every canonical screen has verified forward and backward routes.
- **Deep Link Direct Entry:** All 215 canonical routes mount directly via URL or QA Navigator without dependency on prior memory state.

---

## 2. Canonical Customer Bottom Navigation Audit

### Bottom Navigation Inclusion Matrix

`CustomerBottomNav` (`apps/customer/src/components/navigation/CustomerBottomNav.tsx`) follows strict placement rules matching Figma:

| Screen / Flow       | Route Path                    | Bottom Nav Status   | Active Tab | Verified Justification                                   |
| ------------------- | ----------------------------- | ------------------- | ---------- | -------------------------------------------------------- |
| Customer Home       | `/(app)`                      | ✅ Present          | `home`     | Root dashboard landing screen                            |
| Customer Account    | `/account`                    | ✅ Present          | `account`  | Root customer profile tab                                |
| Edit Profile        | `/edit-profile`               | ✅ Present          | `account`  | Sub-view of Account tab                                  |
| Profile Updated     | `/profile-updated`            | ✅ Present          | `account`  | Feedback sub-view of Account                             |
| My Jobs Active      | `/my-jobs`                    | ✅ Present          | `jobs`     | Root bookings dashboard tab                              |
| My Jobs Empty       | `/my-jobs-empty`              | ✅ Present          | `jobs`     | Zero-booking state of Jobs tab                           |
| My Jobs History     | `/my-jobs-history`            | ✅ Present          | `jobs`     | Archive state of Jobs tab                                |
| My Jobs Scheduled   | `/my-jobs-scheduled`          | ✅ Present          | `jobs`     | Scheduled state of Jobs tab                              |
| My Jobs Loading     | `/my-jobs-loading`            | ✅ Present          | `jobs`     | Skeleton loading state of Jobs tab                       |
| Auth Screens        | `/sign-in`, `/create-account` | ❌ Strictly Omitted | None       | Auth screens must never display bottom tabs              |
| Intake & Booking    | W02, W03, W04 screens         | ❌ Strictly Omitted | None       | Wizard flow uses full-screen flow headers                |
| Dispatch Search     | W05 dispatch screens          | ❌ Strictly Omitted | None       | Real-time map search uses immersive layout               |
| Active Service      | W06 in-service screens        | ❌ Strictly Omitted | None       | Active job tracking uses dedicated status overlay        |
| Completion & Rating | W08 proof & rating screens    | ❌ Strictly Omitted | None       | Delivery sign-off and review use dedicated action sheets |

### Bottom Navigation Tab Actions

1. `home`: Navigates to `/(app)` via `router.replace`.
2. `jobs`: Navigates to `/my-jobs` via `router.replace`.
3. `book`: Center elevated button. Pushes `/service-discovery` (W02 Service Discovery entry).
4. `deals`: Displays non-blocking notification: _"Deals: Concept preview in Figma library. Not an active route."_
5. `account`: Navigates to `/(app)/account` via `router.replace`.

---

## 3. Workflow-by-Workflow CTA & Navigation Health

### W01 (Onboarding & Auth)

- `/sign-in` → `/create-account` (secondary), `/verify-phone` (primary simulation), `/(app)` (skip/demo).
- `/account` → `/edit-profile` (primary), `/my-jobs` (secondary), `/sign-in` (sign out).

### W02–W04 (Intake, Estimation & Booking)

- Linear forward progression: Category Intake → Photo Upload → AI Analysis → Manual Item Verification → Illustrative Quote ($356.00) → Schedule Window → Payment Method → 3D Secure Demo (C29-3D) → Booking Recorded.
- Recovery CTAs: Retake photo, manual inventory fallback, slot conflict retry, hold expired recovery.

### W05 (Dispatch & Assignment)

- Radius expansion steps (10 → 20 → 30 → 40 → 50 mi) advance automatically or via manual skip.
- Matched state (`/driver-matched`) navigates to driver details (`/driver-profile-details`) or crew tracking (`/crew-tracking`).
- Exceptions (`/driver-no-show`, `/no-driver-available`) route to fee-free cancellation (`/no-driver-fee-free-cancellation`) or reschedule (`/dispatch-reschedule`).

### W06 (Active Service Execution)

- En-route tracking advances to driver arrived (`/active-service-driver-arrived`) and working (`/active-service-working`).
- Chat & media upload flows preserve message/attachment drafts on error (`/active-service-chat-failed`, `/active-service-media-failed`).
- Scope revision R2 (+$40) enforces Admin review gate (`/active-service-extra-admin-pending`) before customer accept/decline.

### W07 (My Jobs & Support Lifecycle)

- Reschedule flows cleanly branch into Free Reschedule (`>=24h`) vs Admin Review (`<24h`).
- Cancellation flows branch into $100 Fee Review vs $0 Fee-Free Resolution.
- Support hub routes across 4 categorized topics (Driver, Service, Payment, Other) and refund dispute review.

### W08 (Completion Proof, Receipts & Ratings)

- Proof review (`/completion-proof`) routes to confirmation or issue intake (`/completion-issue`).
- Receipt views route to rating entry (`/completion-rating`).
- Star selector (1–5) routes to corresponding star review composition screens.
- **Bounce-Back Fix Verified:** `completion-rating-locked.tsx` BackHandler and primary CTA now route to `/completion-receipt`, eliminating the silent bounce-back loop.
- Review submission routes to `/completion-rating-sent` (or `/completion-rating-failed` upon failure trigger).

---

## 4. Confirmed Navigation Gaps & Recommendations

1. **NAV-01 (Rating Failure Simulation Decoupling):**  
   _Current:_ Failure simulation triggers when comment contains `"fail"`.  
   _Remediation:_ Provide an explicit simulation trigger button or query parameter `?simulateFailure=1` so customer comment text is not inspected for routing logic.
2. **NAV-02 (Direct Route Fallback Fixtures):**  
   _Current:_ Direct entry to `/completion-rating-sent` when no draft was submitted defaults to 5 stars and empty comment.  
   _Remediation:_ Seed an explicit immutable demo snapshot fixture when mounting directly via QA Navigator.
