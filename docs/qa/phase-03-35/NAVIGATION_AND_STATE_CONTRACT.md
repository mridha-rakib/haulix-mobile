# HAULIX Customer App — Phase 03.35

## W04 Navigation Topology & State Contract

**Phase:** 03.35  
**Workflow:** W04 Scheduling & Payment  
**Upstream Origin:** `/scope-accepted` (C26-A)  
**Batch Scope:** Screens C27, C27-A, C27-S, C28

---

## 1. Upstream Navigation Entry

The customer enters W04 from the verified Phase 03.34 endpoint:

- **Source Route:** `apps/customer/app/(app)/scope-accepted.tsx` (C26-A)
- **Source CTA:** `Continue to Schedule & Payment` / `Continuar a programación y pago`
- **Destination:** C27 (`/choose-service-time`)

---

## 2. Interactive In-Figma Reaction Map

The authoritative Figma prototype links between the 4 screens have been extracted directly from the Figma document:

### A. Screen C27 (763:2 / 766:388)

| Trigger Element                           | Node ID (EN / ES)       | Event      | Target Screen | Node ID (EN / ES)     | Action / Transition         |
| :---------------------------------------- | :---------------------- | :--------- | :------------ | :-------------------- | :-------------------------- |
| **"As soon as possible" Card**            | `815:4572` / `818:4572` | `ON_CLICK` | **C27-A**     | `763:71` / `766:457`  | NAVIGATE / Dissolve (160ms) |
| **"Request ASAP" Secondary CTA**          | `763:65` / `766:431`    | `ON_CLICK` | **C27-A**     | `763:71` / `766:457`  | NAVIGATE / Dissolve (160ms) |
| **"Schedule for later" Card**             | `815:4580` / `818:4580` | `ON_CLICK` | **C27-S**     | `763:133` / `766:519` | NAVIGATE / Dissolve (160ms) |
| **"Choose a scheduled time" Primary CTA** | `763:62` / `766:429`    | `ON_CLICK` | **C27-S**     | `763:133` / `766:519` | NAVIGATE / Dissolve (160ms) |
| **"Preview unavailable slot" Link**       | `763:68` / `766:433`    | `ON_CLICK` | **C27-R**     | `763:269` / `766:655` | NAVIGATE / Dissolve (160ms) |

### B. Screen C27-A (763:71 / 766:457)

| Trigger Element                         | Node ID (EN / ES)       | Event      | Target Screen | Node ID (EN / ES)     | Action / Transition         |
| :-------------------------------------- | :---------------------- | :--------- | :------------ | :-------------------- | :-------------------------- |
| **"Continue if available" Primary CTA** | `763:124` / `766:498`   | `ON_CLICK` | **C28**       | `763:396` / `766:782` | NAVIGATE / Dissolve (160ms) |
| **"No driver available" Secondary CTA** | `763:127` / `766:500`   | `ON_CLICK` | **C27-N**     | `763:336` / `766:722` | NAVIGATE / Dissolve (160ms) |
| **"Change timing" Tertiary Link**       | `763:130` / `766:502`   | `ON_CLICK` | **C27**       | `763:2` / `766:388`   | NAVIGATE / Dissolve (160ms) |
| **"Schedule for later" Card**           | `815:4597` / `818:4597` | `ON_CLICK` | **C27-S**     | `763:133` / `766:519` | NAVIGATE / Dissolve (160ms) |

### C. Screen C27-S (763:133 / 766:519)

| Trigger Element                      | Node ID (EN / ES)       | Event      | Target Screen | Node ID (EN / ES)     | Action / Transition         |
| :----------------------------------- | :---------------------- | :--------- | :------------ | :-------------------- | :-------------------------- |
| **"Continue to review" Primary CTA** | `763:193` / `766:560`   | `ON_CLICK` | **C28**       | `763:396` / `766:782` | NAVIGATE / Dissolve (160ms) |
| **"Try invalid same-day time" CTA**  | `763:196` / `766:562`   | `ON_CLICK` | **C27-V**     | `763:202` / `766:588` | NAVIGATE / Dissolve (160ms) |
| **"Preview stale slot" Link**        | `763:199` / `766:564`   | `ON_CLICK` | **C27-R**     | `763:269` / `766:655` | NAVIGATE / Dissolve (160ms) |
| **"As soon as possible" Card**       | `815:4606` / `818:4606` | `ON_CLICK` | **C27-A**     | `763:71` / `766:457`  | NAVIGATE / Dissolve (160ms) |

### D. Screen C28 (763:396 / 766:782)

| Trigger Element                     | Node ID (EN / ES)     | Event      | Target Screen | Node ID (EN / ES)     | Action / Transition         |
| :---------------------------------- | :-------------------- | :--------- | :------------ | :-------------------- | :-------------------------- |
| **Consent Checkbox (Check Action)** | `768:774` / `768:783` | `ON_CLICK` | **C28-C**     | `763:467` / `766:853` | NAVIGATE / Dissolve (160ms) |
| **"Policy was updated" CTA**        | `763:461` / `766:828` | `ON_CLICK` | **C28-U**     | `763:536` / `766:922` | NAVIGATE / Dissolve (160ms) |
| **"Edit service time" Link**        | `763:464` / `766:830` | `ON_CLICK` | **C27-S**     | `763:133` / `766:519` | NAVIGATE / Dissolve (160ms) |

---

## 3. Data & State Contract

```typescript
export type W04TimingMode = "asap" | "scheduled";

export interface W04ScheduleSelection {
  timingMode: W04TimingMode | null;
  selectedDate: string; // e.g. "2026-11-03"
  selectedWindow: string; // e.g. "10:00 AM – 12:00 PM MST"
  advanceNoticeMinutes: number; // minimum 60 for same-day
  isServerVerified: boolean;
}

export interface W04BookingTermsState {
  cancellationPolicyAccepted: boolean;
  conditionalPostAssignmentFee: number; // $100.00 USD
  illustrativeSubtotal: number; // $356.00 USD
  pickupAreaDisplay: string; // "Phoenix, AZ 85004 · demo"
  confirmedItemsSummary: string; // "1 sofa + 2 chairs" or preserved inventory
}
```

---

## 4. Error & Edge Cases

1. **Same-Day Slot Under 60 Minutes (`C27-V`):**
   - Condition: Customer selects a same-day time window starting in less than 60 minutes.
   - Behavior: Trigger validation alert or navigate to C27-V (`This time is too soon`); prompt selection of a later window.
2. **Slot Stale / Concurrently Taken (`C27-R`):**
   - Condition: Server checks availability and finds the selected slot has been booked.
   - Behavior: Route to C27-R (`That slot is no longer available`); suggest adjacent window.
3. **No Active Drivers Online (`C27-N`):**
   - Condition: Customer selects ASAP but no verified driver with appropriate vehicle capacity is available.
   - Behavior: Route to C27-N (`No eligible driver found`); suggest scheduled window.
4. **Unchecked Legal Consent:**
   - Condition: Customer taps "Continue to payment" on C28 without checking the consent box.
   - Behavior: Button remains disabled; tapping checkbox navigates to C28-C which enables payment progression.
