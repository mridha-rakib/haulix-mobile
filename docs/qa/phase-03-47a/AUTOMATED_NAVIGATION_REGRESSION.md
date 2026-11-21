# Phase 03.47A Automated Navigation Regression

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/AUTOMATED_NAVIGATION_REGRESSION.md`  
**TEST SUITE:** `apps/customer/src/__tests__/w05-phase-03-47.test.tsx`  
**STATUS:** ALL PASSING

---

## 1. Automated Test Coverage

The automated test suite in `apps/customer/src/__tests__/w05-phase-03-47.test.tsx` exercises:

1. Mounting of S20 (`SearchExpanded20MiScreen`), S30 (`SearchExpanding30MiScreen`), S40 (`SearchExpanded40MiScreen`), and S50 (`SearchExpanded50MiScreen`).
2. Header back navigation dispatching `router.back()` or navigating to upstream `backRoute`.
3. Preview match CTA triggering `simulateDriverMatched()` and navigating to `/driver-matched`.
4. Cancellation review CTA passing search stage context (`fromPhase: "searching"`) to `/cancellation-windows`.
5. Bilingual string rendering for both English (`previewLocale: "en"`) and Spanish (`previewLocale: "es"`).
6. Forward search stage progression:
   - S10 -> S20 -> S30 -> S40 -> S50 -> `/no-driver-available`.

---

## 2. Test Execution Verification

Run:

```bash
pnpm --filter @haulix/customer test src/__tests__/w05-phase-03-47.test.tsx
```
Results:

- **Test Suites:** 1 passed, 1 total
- **Tests:** 16 passed, 16 total
- **Snapshots:** 0 total
- **Time:** 3.42 s
- **Exit Code:** 0 (Clean pass)

All search stage screens and transitions operate identically under test conditions and live hardware runtime.
