# HAULIX Customer Mobile App — Phase 03.41

## Figma Source Audit: Booking Outcomes (C31-S, C31-A, C31-F)

**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Page:** `432:737 — Customer — W04 Scheduling & Payment · EN + ES`  
**Phase:** 03.41  
**Audit Date:** 2026-11-21

---

### 1. Authoritative Frame Geometry & Hierarchy

The final 3 canonical W04 screens correspond directly to authoritative node hierarchies in the Figma file:

#### 1. Screen C31-S: Your Booking Is Recorded

- **English Variant:** Node `763:1089` (430 × 1001 px)
- **Spanish Variant:** Node `766:1475` (430 × 1001 px)
- **Layout Architecture:**
  - Back action header with high-contrast arrow (`#161D1A` background, `#26332E` border)
  - HAULIX brand masthead with tracking +2
  - Hero Status Icon: Success check inside layered circle with 12% translucent green backdrop (`#BAFF42`)
  - Screen Headline: _"Your booking is recorded"_ / _"Su reserva ha sido registrada"_
  - Subtitle: _"A driver will be assigned as your scheduled window approaches. We will notify you when dispatch begins."_ / _"Se asignará un conductor a medida que se acerque su franja programada..."_
  - Service Location Chip: _"LOS ANGELES METRO & SURROUNDING AREAS"_
  - Status Capsule: _"BOOKING RECORDED · DRIVER ASSIGNMENT PENDING"_
  - Request Summary Card (`#131817` background, `#1E2724` border, 16px radius):
    - Booking Reference: `#HLX-7829-BK` in `#BAFF42`
    - Estimated Hold: `$356.00 USD` in `#BAFF42` (bold 18px)
    - Confirmed Items: Preserved 4 pieces across 3 categories
    - Service Window: Selected date and 2-hour window
  - What to Expect Steps Card:
    - Step 1: Booking recorded (checked green)
    - Step 2: Driver assignment (active spinner)
    - Step 3: Service window (pending ring)
  - Commercial Disclosure: Pre-authorization hold notice confirming zero captured funds
  - Primary Action Button: _"Return to Home"_ (`#BAFF42` background, `#0B0F0E` text, 52px height, 14px radius)
  - Secondary Action Button: _"View Request Details"_ (transparent, `#26332E` border, 50px height)

#### 2. Screen C31-A: Your ASAP Request Is Recorded

- **English Variant:** Node `763:1155` (430 × 1001 px)
- **Spanish Variant:** Node `766:1541` (430 × 1034 px)
- **Layout Architecture:**
  - Hero Status Icon: High-visibility Lightning Bolt inside sky blue circle (`#38BDF8`)
  - Screen Headline: _"Your ASAP request is recorded"_ / _"Su solicitud ASAP ha sido registrada"_
  - Subtitle: _"Priority dispatch is actively searching for the nearest available driver..."_
  - Status Capsule: _"ASAP PRIORITY · DISPATCH SEARCHING"_ (Sky blue accent)
  - Request Summary Card:
    - Priority Tier: _"ASAP Priority Dispatch"_ in `#38BDF8`
    - Estimated Hold: `$356.00 USD`
    - Arrival Window: _"Next Available (Estimated 30–60 min)"_
  - Dispatch Timeline Steps Card:
    - Step 1: Request recorded (checked green)
    - Step 2: Searching drivers (active sky blue indicator)
    - Step 3: Driver en route (pending ring)
  - Primary Action Button: _"Return to Home"_
  - Secondary Action Button: _"Cancel ASAP Request"_

#### 3. Screen C31-F: Booking Not Yet Confirmed

- **English Variant:** Node `763:1221` (430 × 1007 px)
- **Spanish Variant:** Node `766:1607` (430 × 1040 px)
- **Layout Architecture:**
  - Hero Status Icon: Pending Clock inside warning amber circle (`#F59E0B`)
  - Screen Headline: _"Booking not yet confirmed"_ / _"Reserva aún no confirmada"_
  - Subtitle: _"We could not immediately secure a driver for your exact requested window..."_
  - Status Capsule: _"UNCONFIRMED · CARD HOLD NOT CHARGED"_ (`#F59E0B` warning text and border)
  - Status Details Card:
    - Current Status: _"Awaiting Driver Availability"_ in `#F59E0B`
    - Hold Status: _"Uncaptured ($356.00 USD active hold)"_
    - Requested Window: Date and time requested
  - Options & Recovery Guidance Card:
    - Option 1: Choose another service window (recommended)
    - Option 2: Keep waiting in queue
  - Primary Action Button: _"Choose Another Window"_ (Navigates to `/select-available-window`)
  - Secondary Action Button: _"Keep Waiting & Return Home"_

---

### 2. Design Token Conformance

| Design Token           | Figma Spec Value | Implementation Binding                                | Verification Status |
| :--------------------- | :--------------- | :---------------------------------------------------- | :------------------ |
| `colors.background`    | `#0B0F0E`        | Background surface                                    | Verified 100%       |
| `colors.brand`         | `#BAFF42`        | Primary brand accent                                  | Verified 100%       |
| `colors.warning`       | `#F59E0B`        | Unconfirmed/Amber state                               | Verified 100%       |
| `colors.primaryText`   | `#FFFFFF`        | Primary headings & values                             | Verified 100%       |
| `colors.secondaryText` | `#8A9E96`        | Subtitles, labels, borders                            | Verified 100%       |
| `colors.surface`       | `#131817`        | Card backgrounds                                      | Verified 100%       |
| `colors.elevated`      | `#1E2724`        | Card borders & dividers                               | Verified 100%       |
| Typography             | Inter            | `fontFamily.regular`, `.medium`, `.semiBold`, `.bold` | Verified 100%       |
