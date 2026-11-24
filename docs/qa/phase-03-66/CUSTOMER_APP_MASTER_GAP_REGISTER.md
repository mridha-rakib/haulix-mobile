# HAULIX Customer Mobile App — Master Gap Register

## Consolidated Register of Confirmed Defects, Visual Mismatches, Technical Debt & Verification Limitations

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `@haulix/customer` (`apps/customer`)  
**Package:** `com.haulix.customer`  
**Audit Scope:** Workflows 01 through 08  
**Audit Phase:** Phase 03.66 Comprehensive Final Audit  
**Date:** November 24, 2026

---

## 1. Severity Classification Framework

- **P0 — Critical / Blocker:** Crashes, broken navigation, missing canonical states, unhandled exceptions.
- **P1 — High:** State mutation leaks, missing validation, accessibility failures, incorrect business rules.
- **P2 — Medium:** Visual rendering fidelity gaps (maps, complex vector curves), simulation coupling, direct-entry fixture missing.
- **P3 — Low:** Sub-pixel padding variances (1–2dp), unicode character glyph vs SVG icon, minor translation style nuances.

---

## 2. Comprehensive Master Gap Register

| Gap ID | Category | Severity | Affected Screens / Components | Defect Description & Observed Behavior | Root Cause | Target Remediation |
|---|---|---|---|---|---|---|
| **GAP-01** | Architecture / State | **P1 (High)** | `ratingDraftStore.ts`, `/completion-rating-sent`, `/completion-rating-review` | Submitted review screen displays mutable draft rather than an isolated immutable snapshot. If user edits draft again, submitted view changes. | Single singleton draft object in store without separate snapshot preservation. | Phase 03.67: Split store into `currentDraft` and `submittedReviewSnapshot`. |
| **GAP-02** | Flow / Simulation | **P2 (Med)** | `/completion-rating-[1-5].tsx` | Rating submission failure is simulated by checking if user comment contains the word `"fail"`, coupling demo behavior to comment text. | Testing convenience trigger embedded directly in text validation logic. | Phase 03.67: Decouple failure trigger to query param (`?simulateFailure=1`) or demo toggle. |
| **GAP-03** | Test / Demo Fixture | **P2 (Med)** | `/completion-rating-sent`, `/completion-rating-review` | Navigating directly via QA Navigator without prior review composition displays empty comment and default 5-star rating fallback. | Lack of seeded mock fixture for direct navigator deep links. | Phase 03.67: Seed rich default review fixture when mounting directly in demo mode. |
| **GAP-04** | Visual / Asset | **P2 (Med)** | `W08RatingLayout.tsx` (StarSelector) | Star rating selector renders character text glyph `★` instead of custom SVG vector asset matching Figma node `907:8641`. | Character font glyph used instead of SVG geometry; creates minor 1–2px vertical font alignment variance. | Phase 03.67: Implement dedicated SVG star component matching Figma specifications. |
| **GAP-05** | Visual / Component | **P2 (Med)** | `/completion-proof.tsx` | Proof screen displays a single static image asset (`c18j-sofa.png`) rather than a 4-photo multi-angle thumbnail gallery. | Static single image fallback placeholder used in initial implementation. | Phase 03.67: Build multi-thumbnail carousel and modal lightbox. |
| **GAP-06** | Hardware / APK | **P1 (High)** | Physical Device `0B04731X200003BB` | Connected Realme Note 60 device has `com.haulix.customer` installed, but `lastUpdateTime` (Nov 22) predates W07 & W08 implementations. | APK was not rebuilt or deployed to physical hardware since Phase 03.54. | Phase 03.67: Trigger EAS build or local APK generation and ADB push to hardware. |
| **GAP-07** | Accessibility | **P3 (Low)** | `W08RatingLayout.tsx` | Star selector buttons lack `accessibilityHint` announcing current selection state to talkback screen readers. | Omission of dynamic hint attribute on star button pressable. | Phase 03.67: Add localized `accessibilityHint` to star selectors. |
| **GAP-08** | Accessibility | **P3 (Low)** | `W08RatingLayout.tsx` | Review comment input does not dismiss mobile soft keyboard when user taps outside the input box. | ScrollView missing `keyboardShouldPersistTaps="handled"` or background dismiss listener. | Phase 03.67: Wrap container with tap-outside dismiss handler. |
| **GAP-09** | Visual / Layout | **P3 (Low)** | `CustomerBottomNav.tsx` | Sculpted bottom navigation curve uses fixed 430px base width SVG asset; may scale unevenly on narrow 320dp screens or wide foldables. | Fixed reference artboard dimensions in SVG path. | Phase 03.67: Enhance viewBox with dynamic width computation. |
| **GAP-10** | Visual / Layout | **P3 (Low)** | `/my-jobs-scheduled.tsx` | Segmented pill row in Scheduled tab has 2dp padding variance compared to Figma specification. | Minor styling token variance. | Phase 03.67: Tune padding to exact Figma spacing token. |
| **GAP-11** | Backend Contract | **P1 (High)** | All W01–W08 workflows | Frontend uses local mock fixtures and simulated zero-guard state; zero live backend REST/WebSocket endpoints connected. | Scheduled delivery program: complete frontend UI/UX first before connecting backend. | Phase 04: Backend API integration & schema contracts. |
| **GAP-12** | Documentation | **P2 (Med)** | `CUSTOMER_W01_TO_W08_MASTER_SCREEN_INVENTORY.md` | Outdated introductory paragraph associated W07 with completion/tipping and W08 with support/cancellation. | Copy-paste description drift from legacy planning document. | Resolved in Phase 03.66 documentation update. |

---

## 3. Risk Assessment & Verification Limitations

1. **Hardware Verification Limitation:** While ADB device connectivity is verified and package presence is confirmed, native on-device visual inspection for W07 and W08 remains blocked until a fresh APK is built.
2. **Backend Contract Risk:** Zero-guard architecture allows comprehensive UI validation, but live session handling, Stripe Webhook delays, and 3DS banking redirects remain unvalidated against live financial infrastructure.
3. **Draft Mutation Risk (GAP-01):** Medium severity for production, but low severity for prototype demonstration since users generally progress forward.
