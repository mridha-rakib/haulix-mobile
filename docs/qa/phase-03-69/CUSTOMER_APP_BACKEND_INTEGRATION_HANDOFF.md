# Customer App Backend Integration Handoff

**Phase:** Phase 03.69  
**Application:** `apps/customer`  
**Handoff Scope:** Customer Mobile Frontend -> Production Backend & Services

---

## 1. Architecture Overview

The HAULIX Customer Mobile Application frontend is designed with zero-guard demonstration architecture:
- All screens, navigation transitions, error recovery states, and form inputs are 100% functional in-memory.
- Simulated states strictly follow the real API contracts established in Signed SRS v1.6.
- The backend engineering team can connect live REST / GraphQL endpoints by replacing the mock service handlers in `apps/customer/src/services/` and `ratingDraftStore.ts`.

---

## 2. Core Service Contracts for Backend Integration

### 1. Authentication (`POST /api/v1/auth/phone`)
- **Request:** `{ phone: string }`
- **Response:** `{ challengeId: string, expiresAt: string }`
- **Verify:** `POST /api/v1/auth/verify-otp` with `{ challengeId, otpCode }`
- **Session:** Returns JWT `{ accessToken, refreshToken, user: { id, name, phone, role: "customer" } }`

### 2. Item Intake & AI Recognition (`POST /api/v1/intake/ai-recognition`)
- **Payload:** Multipart form data containing uploaded item photos.
- **Response:**
  ```json
  {
    "items": [
      { "id": "item-1", "category": "furniture", "name": "3-Seat Sofa", "quantity": 1 },
      { "id": "item-2", "category": "mattress", "name": "Queen Mattress", "quantity": 2 },
      { "id": "item-3", "category": "furniture", "name": "Dining Table", "quantity": 1 }
    ],
    "estimatedQuote": { "amount": 356.00, "currency": "USD" }
  }
  ```

### 3. Payment Authorization Hold & Capture (Stripe Integration)
- **Pre-Auth:** `POST /api/v1/payments/create-hold` -> Returns Stripe PaymentIntent with `capture_method: "manual"`.
- **Capture:** `POST /api/v1/payments/capture` -> Executed upon delivery completion or 24h auto-closure.

### 4. Service Rating & Moderation (`POST /api/v1/reviews/submit`)
- **Payload Schema:**
  ```json
  {
    "bookingId": "HX-AZ-DEMO-0042",
    "rating": 5,
    "comment": "Driver and helper were on time and very professional.",
    "submittedAt": "2026-11-25T10:20:00Z"
  }
  ```
- **Validation Rules (from FINAL-02):**
  - `rating`: Strict integer between 1 and 5.
  - Ineligible bookings (`isEligible === false`) must return HTTP 403 Forbidden.
  - Idempotency: Duplicate submissions for the same `bookingId` should return HTTP 200 with existing snapshot.
