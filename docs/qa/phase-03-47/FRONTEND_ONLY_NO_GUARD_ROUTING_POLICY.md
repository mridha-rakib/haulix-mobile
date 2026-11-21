# HAULIX Customer Mobile App — Phase 03.47
# Frontend-Only No-Guard Routing Policy & Architecture

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/FRONTEND_ONLY_NO_GUARD_ROUTING_POLICY.md`  
**AUTHORITY:** Absolute Project Owner Instruction  
**STATUS:** ACTIVE & ENFORCED  

---

## 1. Executive Owner Mandate

The project owner has explicitly established the following architectural directive:

> **"We are developing only the frontend. The complete Android APK routing and customer journey must remain testable. Do not use guards that block access to screens or interrupt the navigation flow."**

This instruction overrides any prior architectural proposals that advocated for blocking unauthenticated users, gating screens behind mock backend state, or requiring prerequisite booking/payment/dispatch conditions before screen entry.

---

## 2. Mandatory Implementation Rules

To ensure full APK flow testability, developer agility, and unrestricted manual/automated QA, the HAULIX Customer Mobile App adheres to the following rules:

1. **NO Authentication Guards:** Testers can navigate to any screen in `(app)/` or `(auth)/` without logging in.
2. **NO Route Protection Guards:** No middleware or layout wrappers intercept navigation to redirect away from a screen.
3. **NO Forced Login Redirects:** Unauthenticated sessions do not bounce testers to `/sign-in` or `/onboarding`.
4. **NO User-Role or Account-Status Restrictions:** Primary Driver, Helper, or Customer role distinctions exist only as static presentation properties; no role-switching blocks screens.
5. **NO Booking-Completion Prerequisite Guards:** Downstream screens (e.g., quotes, reviews, tracking, cancellation) are directly accessible via deep link or QA Navigator.
6. **NO Dispatch-State Prerequisites:** Screens such as S20, S30, S40, S50, Driver Matched, or Crew Tracking do not require an active dispatch job to open.
7. **NO Driver-Assignment Prerequisites:** Driver profile and telemetry screens render high-fidelity demo fixtures on direct entry.
8. **NO Payment-Status Prerequisites:** Payment confirmation, card authentication, or hold expiration screens do not check external payment gateways.
9. **NO Cancellation-Eligibility Route Guards:** Cancellation review and request-canceled screens remain directly openable without active booking penalties.
10. **NO Onboarding-Completion Restrictions:** New installs can jump straight to any workflow state.
11. **NO Mandatory Backend Response Timing:** All screens load deterministically with local fallback fixtures.
12. **NO Live Telemetry or WebSocket Gates:** Map animations and telemetries run via local timers and simulated coordinates.

---

## 3. Frontend Architecture Boundary vs Backend Reality

| Concern | Frontend Demo Architecture | Production Backend (Future Phases) |
|---|---|---|
| **Route Entry** | Direct, unrestricted, deep-linkable | Authenticated session + ACL check |
| **State Resolution** | Deterministic local fixtures (`c32Dispatch.ts`) | REST / GraphQL / WebSocket API |
| **Card Hold** | Simulated $356.00 USD authorization | Stripe PaymentIntent pre-authorization |
| **Driver Matching** | Local progression: S10 → S20 → S30 → S40 → S50 | Redis Geospatial + Celery matching engine |
| **Cancellation** | Deterministic fee-free / $100 waiver logic | Stripe capture/refund + Ledger entry |
| **Screen Discovery** | QA Screen Navigator (floating drawer) | Normal user-driven product flow |

---

## 4. Verification & Audit Results

An audit of the entire customer route tree confirmed:
- `app/_layout.tsx`: Root layout provides QueryClient, SafeAreaProvider, and stack routing with zero authentication redirects.
- `app/(app)/_layout.tsx`: Protected layout group renders child screens directly without route-guard interception.
- `apps/customer/src/hooks/useAppBootstrap.ts`: Initializes fonts and i18n without blocking screen access.
- All screen components use `router.push` and `router.back` for forward/backward user actions, never automatic redirect-on-mount.

---

## 5. Conclusion

Unrestricted routing ensures the project owner and QA team can test every implemented screen on physical Android devices immediately, without prerequisites, failed backend mock calls, or session expiration barriers.
