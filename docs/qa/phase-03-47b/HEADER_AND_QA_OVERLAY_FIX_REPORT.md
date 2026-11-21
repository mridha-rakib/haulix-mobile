# HAULIX Customer Mobile App — Phase 03.47B
## Header, QA Overlay & Clean Screenshot Mode Report

**Document ID:** `HAULIX-QA-P03.47B-012`  
**Phase:** 03.47B  
**Component:** `apps/customer/src/components/demo/DemoScreenNavigator.tsx` & `apps/customer/src/components/dispatch/W05SearchStageScreen.tsx`

---

### 1. Defect Identification & User Requirements

#### User Directives:
1. **Defect A:** The floating `[ QA Screens ]` button overlapped the screen title and brand header on physical Android displays, obstructing visual QA review.
2. **Defect C:** The header vertical spacing was excessive, pushing critical bottom-sheet information below the fold on standard $720 \times 1600$ px screens.
3. **Clean Visual Capture Mode Requirement:** Reviewers require capturing authentic, pristine screenshots identical to the Figma source without any QA helper overlays, while maintaining a non-intrusive mechanism to restore the navigator at will.

---

### 2. Engineering Remediation Applied

#### A. Dual-Mode DemoScreenNavigator
In `DemoScreenNavigator.tsx`:
1. Introduced `isCleanMode` boolean state (default `false`).
2. When `isCleanMode === false`:
   - The floating pill `[ • QA Screens ]` renders at the top-right (`testID="demo-screen-navigator-trigger"`).
3. Inside the screen selector modal bottom sheet:
   - Added `[ Hide QA Pill for Clean Screenshots ]` button (`testID="demo-clean-mode-toggle"`).
   - Pressing this button sets `isCleanMode = true` and closes the modal.
4. When `isCleanMode === true`:
   - The floating pill is completely unmounted.
   - A transparent $32 \times 32$ dp touch target is mounted at the top-right corner (`testID="restore-qa-navigator"`).
   - Touching the top-right corner instantly sets `isCleanMode = false`, restoring the QA pill.

#### B. Header & Vertical Rhythm Optimization
In `W05SearchStageScreen.tsx`:
- Reduced `screenTitle` font size from 28 to 24 dp, line height from 34 to 30 dp.
- Reduced `screenSubtitle` font size to 13 dp, line height to 18 dp.
- Reduced `brandRow` bottom margin from 12 to 8 dp.
- Reduced `locationChip` bottom margin from 14 to 10 dp.
- Reduced `statusBadgeCapsule` bottom margin from 14 to 10 dp.
- Reduced `mapCardWrap` bottom margin from 16 to 12 dp.

---

### 3. Verification & Acceptance

- **Clean Screenshot Mode:** Verified functional via both manual touch and ADB touch simulation (`input tap 330 30`).
- **Header Overlap:** Zero overlap. The brand header (`HAULIX`) and title (`Searching 20-mile radius...`) are completely unobstructed.
- **Above-the-Fold Density:** Map, progress tracker, and status summary cards are immediately visible without initial scrolling on Realme Note 60.
