# HAULIX Customer Mobile App — Phase 03.45

## W05 Remaining Work & Next Batch Plan

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.45  
**WORKFLOW:** W05 Dispatch & Assignment

---

### 1. W05 Completion Status Assessment

Workflow 05 currently has:

- **Canonical Screens Delivered:** 4 screens (`C32-A`, `C32-B`, `C32-C`, `C32-D`)
- **Localized Variants:** 8 variants (English and Spanish)
- **Physical Device QA:** 100% verified on Realme Note 60 hardware (Android 15)
- **Map Visual Overlay Comparison:** Blocked by Figma MCP team Starter limit
- **Remaining Child Frames in Section 836:4571 / 836:4572:** 16 frames per language section

In strict compliance with Section 21:

> _"Do not mark the entire W05 workflow complete based solely on this batch._  
> *A global W05 acceptance requires: Complete canonical W05 inventory, all approved W05 screens delivered, all English/Spanish variants, all critical navigation verified, outstanding Figma map acceptance resolved, SRS and commercial-rule gaps reviewed, complete physical Android QA."*

---

### 2. Next Batch Implementation Plan (Batch 2 Unblocking Protocol)

To implement the next batch of W05 screens:

1. **Step 1: Provide Source PNG Exports**
   Export 1x PNGs for the candidate exception and reassignment screens under Section `836:4571` (English) and `836:4572` (Spanish) into:
   - `docs/qa/phase-03-45/figma/`

2. **Step 2: Authenticate Frame Dimensions & Hierarchy**
   Upon receipt of the PNG exports:
   - Match each PNG to its canonical screen ID and title.
   - Extract exact layout measurements, card paddings, font weights, and color tokens.

3. **Step 3: Frontend Implementation & Bilingual Localization**
   - Create canonical Expo Router routes in `apps/customer/app/(app)/`.
   - Add symmetric English and Spanish translation keys to `@haulix/i18n`.
   - Implement responsive layout with `HaulixSafeArea` and design tokens.

4. **Step 4: Physical Hardware QA**
   - Load screens via local Metro bundler on Realme Note 60.
   - Capture initial and scrolled viewports for all variants into `docs/qa/phase-03-45/android/`.
   - Generate pixel differential comparisons against source PNGs.

5. **Step 5: Automated Regression Testing**
   - Author Jest unit tests for each new screen.
   - Verify all monorepo checks pass (`pnpm check`, `pnpm typecheck`, `pnpm test`).
