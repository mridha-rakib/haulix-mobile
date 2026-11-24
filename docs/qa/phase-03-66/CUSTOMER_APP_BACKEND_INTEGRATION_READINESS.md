# HAULIX Customer Mobile App — Backend Integration Readiness Report

## Production API Dependencies, Contract Interfaces, Zero-Guard Boundaries & Delivery Plan

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Audit Phase:** Phase 03.66 Comprehensive Final Audit  
**Date:** November 24, 2026

---

## 1. Zero-Guard Prototype Architecture

The HAULIX Customer Mobile App frontend was designed as a pure zero-guard demonstration prototype:
- **No Mock Stubs in Components:** Screens do not fabricate successful backend mutations locally.
- **Controlled In-Memory Fixtures:** Fixtures (`c10DemoProfile`, `c32Dispatch`, `ratingDraftStore`) provide rich, deterministic demo state without writing to remote servers.
- **Honest Prototype Disclosures:** Footers and modals explicitly inform reviewers that actions are for demonstration purposes.

---

## 2. Production Service Dependencies Register

| Service Domain | Production Backend Infrastructure | Dependent Frontend Screens | Required Contract / Endpoint | Integration Status |
|---|---|---|---|---|
| **Identity & Auth** | Node.js Auth Service + Neon PostgreSQL | `/sign-in`, `/create-account`, `/verify-phone` | `POST /auth/login`<br>`POST /auth/register`<br>`POST /auth/verify-otp` | Pending Phase 04 Backend Delivery |
| **SMS Gateway** | Twilio Messaging API | `/verify-phone`, `/edit-profile` | `POST /sms/send-otp` | Pending Twilio Credentials Setup |
| **Customer Profile** | Customer Profile Microservice | `/account`, `/edit-profile` | `GET /customers/me`<br>`PATCH /customers/me` | Contract Defined in Fixture Schema |
| **Item Recognition** | Gemini Vision / AI Pipeline | `/ai-recognition`, `/item-photos` | `POST /ai/recognize-items` | Advisory UI Ready for Payload |
| **Geocoding & Maps** | Google Maps API / Mapbox SDK | `/add-pickup-address`, `/service-area` | `GET /geo/autocomplete`<br>`GET /geo/reverse` | SVG Vector Map Ready for Tile Swap |
| **Pricing Engine** | Dynamic Quote Engine | `/illustrative-quote`, `/job-details` | `POST /quotes/calculate` | $356 Baseline Symmetrical Fixture |
| **Payment & 3DS** | Stripe Elements SDK + Webhooks | `/choose-payment-method`, `/completion-receipt` | `POST /payments/create-intent`<br>`POST /payments/capture` | 3DS & Capture UI Ready for Stripe SDK |
| **Realtime Dispatch** | Redis Geospatial + WebSocket | `/searching-for-driver`, `/active-service-en-route` | `WS /dispatch/stream`<br>`GET /dispatch/status` | Polling & Simulated Step Ready for WS |
| **Review & Ratings** | Ratings & Moderation Service | `/completion-rating`, `/completion-rating-sent` | `POST /reviews/submit`<br>`GET /reviews/status` | `ratingDraftStore` Ready for API Hook |

---

## 3. Transition Strategy to Production (Phase 04)

1. **API Client Layer:** Implement `@haulix/api-client` package with typed TanStack React Query hooks.
2. **Environment Switching:** Toggle between zero-guard demo mode and live API mode via `EXPO_PUBLIC_USE_MOCK_API=false`.
3. **Authentication Middleware:** Introduce session token interceptors with automatic token refresh in `app/_layout.tsx`.
4. **Offline Resiliency:** Add SQLite / WatermelonDB sync for offline cargo and chat persistence during active transit.
