# HAULIX Customer Mobile App — Phase 03.67 Prioritized Remediation Plan

## Actionable Sprint Plan Addressing Confirmed Audit Findings & APK Release Preparation

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Target Milestone:** Phase 03.67 Quality Remediation & Physical Device Validation  
**Date:** November 24, 2026

---

## 1. Executive Remediation Strategy

Phase 03.66 identified specific, actionable architectural, visual, and device gaps across the otherwise complete Customer App frontend.  
Phase 03.67 will resolve all confirmed findings before declaring final customer application sign-off:

1. **State Isolation & Immutability:** Decouple draft editing from submitted review records.
2. **Simulation Decoupling:** Remove keyword-based simulation triggers.
3. **Asset & Visual Polish:** Replace unicode glyphs with dedicated Figma SVG components.
4. **Physical Device Synchronization:** Build and deploy a fresh standalone APK containing W01–W08.

---

## 2. Prioritized Task Breakdown

### Milestone 1: Architectural & State Isolation (Priority: P0)

#### Task 1.1: Immutable Submitted Review Snapshot Store
- **Affected File:** `apps/customer/src/components/completion/ratingDraftStore.ts`
- **Objective:** Separate `currentDraft` (mutable during rating and composition) from `submittedReviewSnapshot` (immutable once `submitReview()` or `moderateReview()` is called).
- **Verification:** Unit tests confirming that modifying `currentDraft` after submission does not alter the review snapshot rendered by `/completion-rating-sent` or `/completion-rating-review`.

#### Task 1.2: Decoupled Failure Simulation
- **Affected Files:** `apps/customer/app/(app)/completion-rating-[1-5].tsx`, `ratingDraftStore.ts`
- **Objective:** Remove `draft.comment.toLowerCase().includes("fail")` check. Provide an explicit demo failure trigger (e.g. query parameter `?simulateFailure=1` or dedicated failure demonstration CTA).
- **Verification:** Ensure comments containing words like "failure" or "failed" submit normally unless explicit failure simulation mode is activated.

#### Task 1.3: Direct-Entry Demo Fixtures for QA Navigator
- **Affected Files:** `apps/customer/app/(app)/completion-rating-sent.tsx`, `completion-rating-review.tsx`
- **Objective:** When accessed directly via `DemoScreenNavigator` without prior user input, display a rich, authentic submitted review fixture (5 stars, *"Excellent crew, handled our sofa and dining table with great care!"*) instead of empty fallbacks.

---

### Milestone 2: Visual & Component Polish (Priority: P1)

#### Task 2.1: Dedicated SVG Vector Star Component
- **Affected File:** `apps/customer/src/components/completion/W08RatingLayout.tsx`
- **Objective:** Replace text character glyph `★` with dedicated SVG vector star geometry extracted from Figma node `907:8641`.
- **Verification:** Consistent sub-pixel vertical alignment across Android OEM fonts (Realme UI, OxygenOS, Pixel).

#### Task 2.2: Multi-Photo Completion Proof Gallery
- **Affected File:** `apps/customer/app/(app)/completion-proof.tsx`
- **Objective:** Upgrade the single-image proof view to a 4-photo multi-angle thumbnail grid (living room, truck bed, item wrapped, dropoff location) with zoom modal.

---

### Milestone 3: Accessibility & UX Ergonomics (Priority: P2)

#### Task 3.1: Screen Reader Accessibility Hints
- **Affected File:** `apps/customer/src/components/completion/W08RatingLayout.tsx`
- **Objective:** Add localized `accessibilityHint` to star selectors (e.g. *"Double tap to set rating to 4 stars"* / *"Toca dos veces para calificar con 4 estrellas"*).

#### Task 3.2: Tap-Outside Keyboard Dismissal
- **Affected File:** `apps/customer/src/components/completion/W08RatingLayout.tsx`
- **Objective:** Wrap rating scroll container with `keyboardShouldPersistTaps="handled"` and touch listener to dismiss mobile soft keyboard when tapping outside inputs.

---

### Milestone 4: Physical Device Build & ADB Deployment (Priority: P1)

#### Task 4.1: Standalone Preview APK Generation
- **Target Profile:** `preview` in `apps/customer/eas.json` (`buildType: "apk"`).
- **Command:** `eas build --platform android --profile preview --local` (or EAS Cloud).
- **Output:** `haulix-customer-preview-1.0.0.apk`.

#### Task 4.2: Physical Hardware Installation & Verification
- **Target Device:** Realme Note 60 (`0B04731X200003BB`), Android 15.
- **Command:** `adb -s 0B04731X200003BB install -r haulix-customer-preview-1.0.0.apk`.
- **Verification:** Verify `lastUpdateTime` advances and run on-device walkthrough of W07 and W08.

---

## 3. Acceptance Gate for Phase 03.67

Phase 03.67 will be considered complete when:
1. All 7 tasks above are implemented and verified.
2. Full automated test suite passes with 0 failures.
3. TypeScript typecheck passes with 0 errors.
4. Physical hardware holds fresh build containing all W01–W08 workflows.
