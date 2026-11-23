# HAULIX Customer Mobile App — W06 to W08 Handoff & W07/W08 Architecture Dependency

## Corrected Workflow Classification and Handoff Architecture Specification

**Date:** November 23, 2026 (Corrected per authoritative Figma metadata)  
**From:** Workflow 06 (Active Service Execution)  
**Target Workflows:**

- **Workflow 07 (W07):** My Jobs, Booking History, Booking Details, Reschedule, Cancellation, Support & Refund (34 Canonical States · 68 Bilingual Frames · Parent Sections EN `891:5859`, ES `891:5860`)
- **Workflow 08 (W08):** Completion Proof, Payment Finalization, Final Receipt, Star Rating & Tipping, and Service Recovery (28 Canonical States · 56 Bilingual Frames · Parent Sections EN `907:6811`, ES `907:9711`)

---

## 1. Critical Workflow Classification Correction

The authoritative Figma project metadata defines the customer lifecycle workflows as follows:

| Workflow | Title & Scope                                                             | Canonical States | Bilingual Frames | Figma Parents                |
| -------- | ------------------------------------------------------------------------- | ---------------- | ---------------- | ---------------------------- |
| **W06**  | **Active Service Execution**                                              | 26 States        | 52 Frames        | EN `881:5131`, ES `881:5132` |
| **W07**  | **My Jobs, History, Details, Reschedule, Cancellation, Support & Refund** | 34 States        | 68 Frames        | EN `891:5859`, ES `891:5860` |
| **W08**  | **Completion Proof, Payment, Receipt, Ratings & Recovery**                | 28 States        | 56 Frames        | EN `907:6811`, ES `907:9711` |

> **Architectural Clarification:**  
> The previous handoff draft conflated W07 and W08 responsibilities.  
> - **W07** is the customer post-booking management portal (My Jobs, past booking history, detailed booking breakdown, self-service rescheduling, policy-compliant cancellation, support, and refund tracking).
> - **W08** is the direct post-service completion and settlement sequence (unloading sign-off, driver photo evidence proof review, card charge finalization, digital receipt, tipping/rating, and recovery).

---

## 2. Direct W06 → W08 Completion Proof Relationship

When in-service moving activity concludes in W06:

- State 26 (`W08_HANDOFF` at `/active-service-completion-bridge`) will directly connect to **W08 `PROOF`** (EN `907:6811`, ES `907:9711`), **NOT** to the W07 My Jobs home screen.
- Until W08 is implemented, `/active-service-completion-bridge` maintains its honest, local prototype completion-proof preview modal/sheet. It deliberately does not navigate to a nonexistent W08 route.

```
       W06 State 26: W08_HANDOFF
  (/active-service-completion-bridge)
                 │
                 ▼
       W08 State 01: PROOF
     (EN 907:6811 / ES 907:9711)
  (Completion Proof & Unloading Sign-Off)
                 │
                 ├───> W08 Payment Charge & Final Invoice
                 ├───> W08 Driver Tipping & Star Rating
                 └───> W08 Final Receipt & Order History Save
```

Meanwhile, **W07 (My Jobs)** provides the customer's ongoing dashboard for active, upcoming, and past moves.

---

## 3. Shared Booking Data Contract

Both W07 and W08 operate against the standardized customer booking record:

| Field            | Type       | Demo Handoff Value                     | Description                        |
| ---------------- | ---------- | -------------------------------------- | ---------------------------------- |
| `bookingId`      | `string`   | `"HX-AZ-DEMO-0042"`                    | Unique reservation tracking ID     |
| `driverName`     | `string`   | `"Mike R."`                            | Assigned primary driver            |
| `vehicle`        | `string`   | `"Ford Transit High Roof (Silver)"`    | Assigned transport unit            |
| `baselineQuote`  | `number`   | `356.00`                               | Pre-authorized move estimate       |
| `revisionR2Hold` | `number`   | `40.00`                                | Scope adjustment hold              |
| `itemCount`      | `number`   | `4`                                    | Confirmed customer inventory count |
| `categories`     | `string[]` | `["Living Room", "Bedroom", "Dining"]` | Confirmed inventory groupings      |
| `pickup`         | `string`   | `"4821 E Washington St, Phoenix, AZ"`  | Origin address                     |
| `dropoff`        | `string`   | `"7102 N 55th Ave, Glendale, AZ"`      | Destination address                |

---

## 4. Workflow 07 Scope & Roadmap (Phase 03.55+)

Workflow 07 comprises 34 canonical states organized across 6 batches:

1. **Batch 1 (Phase 03.55):** My Jobs Home, Empty State, Booking History, Loading State, Booking Unavailable / Access State, and Booking Details (States 01–06).
2. **Batch 2:** Reschedule flow & scheduling adjustments (States 07–12).
3. **Batch 3:** Cancellation request, fee assessment & policy confirmation (States 13–18).
4. **Batch 4:** Cancellation processing, confirmed cancellation & retention (States 19–24).
5. **Batch 5:** Support options, issue ticketing & callback (States 25–29).
6. **Batch 6:** Refund status, dispute breakdown & final resolution (States 30–34).
