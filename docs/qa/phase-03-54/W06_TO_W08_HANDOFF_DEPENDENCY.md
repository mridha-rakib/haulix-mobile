# HAULIX Customer Mobile App — W06 to W07/W08 Handoff Dependency

## Transition Architecture Specification from Active Service to Completion & Support

**Date:** November 23, 2026  
**From:** Workflow 06 (Active Service Execution)  
**To:** Workflow 07 (Delivery Completion, Proof & Tipping) and Workflow 08 (Support & Claims)

---

## 1. Handoff Contract Overview

When active moving service concludes, the customer transitions from in-service tracking (`W06`) to delivery proof sign-off, tipping, and rating (`W07`), or issue escalation (`W08`).

State 26 (`W08_HANDOFF` at `/active-service-completion-bridge`) acts as the deterministic frontend bridge connecting active service to downstream completion.

```
       W06 State 26: W08_HANDOFF
  (/active-service-completion-bridge)
                 │
                 ├───> W07 Delivery Sign-Off & Photo Proof
                 ├───> W07 Driver Tipping & Star Rating
                 ├───> W07 Final Receipt & Card Charge Finalization
                 │
                 └───> W08 Damage Claims / Dispute Resolution
```

---

## 2. Shared Data Contract

Downstream workflows inherit the following immutable booking payload:

| Field            | Type       | Handoff Value                          | Description                               |
| ---------------- | ---------- | -------------------------------------- | ----------------------------------------- |
| `bookingId`      | `string`   | `"HX-AZ-DEMO-0042"`                    | Unique reservation tracking ID            |
| `driverName`     | `string`   | `"Mike R."`                            | Assigned primary driver                   |
| `vehicle`        | `string`   | `"Ford Transit High Roof (Silver)"`    | Assigned transport unit                   |
| `baselineQuote`  | `number`   | `356.00`                               | Pre-authorized move estimate              |
| `revisionR2Hold` | `number`   | `40.00`                                | Authorized scope adjustment (if accepted) |
| `itemCount`      | `number`   | `4` (or `5` if R2 accepted)            | Total piece count                         |
| `categories`     | `string[]` | `["Living Room", "Bedroom", "Dining"]` | Inventory groupings                       |
| `proofPhotos`    | `string[]` | 4 proof image assets                   | Delivered goods verification              |

---

## 3. Workflow 07 Target Scope (Next Implementation Phase)

The upcoming implementation phase will tackle **Workflow 07 (W07)**:

- **Parent Frames:** English Section `891:5859`, Spanish Section `891:5860`
- **Estimated Scope:** 34 canonical states (68 bilingual frames)
- **Key Flow Stages:**
  1. Delivery Verification & Room Inspection
  2. Photo Sign-Off & Customer Signature Pad
  3. Final Invoice Presentation ($356.00 + $40.00 adjustment)
  4. Tip Selection (15%, 20%, 25%, Custom, None)
  5. Driver & Helper Star Rating with Compliment Tags
  6. Final Order Receipt & Navigation Home
