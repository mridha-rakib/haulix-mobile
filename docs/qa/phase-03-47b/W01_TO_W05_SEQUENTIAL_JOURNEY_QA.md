# HAULIX Customer Mobile App — Phase 03.47B

## W01 to W05 Sequential Customer Journey QA Audit

**Document ID:** `HAULIX-QA-P03.47B-008`  
**Phase:** 03.47B  
**Target:** Standalone Android APK (`com.haulix.customer`)

---

### 1. Complete End-to-End Walkthrough

The HAULIX Customer application frontend supports a fluid, continuous journey from brand introduction to post-dispatch resolution:

```
[W01: Splash & Onboarding]
       ↓
[W01: Phone Entry & OTP]
       ↓
[W02: Service Selection (Moving)]
       ↓
[W02: Intake & Inventory Confirmation]
       ↓
[W03: Itemized Cargo Quote ($356.00)]
       ↓
[W03: Scheduled Service Window]
       ↓
[W04: Booking Terms & Simulated Hold]
       ↓
[W05: Dispatch Search (S10 → S20 → S30 → S40 → S50)]
       ↓
[W05: Driver Assigned (Sarah L. / Ford F-150)]
       ↓
[W05: Helper Confirmed / Exceptions (Driver Late, Reassign, Cancel)]
```

---

### 2. State Fidelity Across Transitions

1. **W01 → W02 Transition:**
   - User verifies phone and lands on `/home`. Service cards (Moving, Delivery, Disposal, Large Items) respond with active border highlighting and clear subtext.

2. **W02 → W03 Transition:**
   - Confirmed cargo items (1 Sofa, 2 Queen Mattresses, 1 Dining Table) flow into `/itemized-quote` without loss of inventory count or volume calculation.

3. **W03 → W04 Transition:**
   - Quote selection carries the illustrative estimate ($356.00) into booking confirmation (`/booking-terms-accepted`, `/booking-recorded`), clearly disclosing simulated card pre-authorization with $0.00 actual capture.

4. **W04 → W05 Transition:**
   - Booking confirmation transitions smoothly into `/searching-for-driver` (S10) and expanding search radii (S20, S30, S40, S50) with synchronized timeline dots and authentic Phoenix cartography.

5. **W05 Dispatch Transitions:**
   - Search progression connects cleanly to `/driver-matched`, `/helper-confirmed`, and exception handling states (`/driver-late`, `/driver-reassigned`, `/cancel-request-review`, `/request-canceled`).

---

### 3. Verification Signoff

The sequential user experience operates smoothly with zero dead-ends, zero blocking gates, and consistent dark-mode styling across all 5 workflows.
