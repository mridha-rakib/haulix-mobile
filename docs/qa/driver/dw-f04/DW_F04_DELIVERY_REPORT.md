# HAULIX Driver/Worker — DW-F04 Delivery Report
**Offers, Dispatch Matching & Crew Management**

- **Milestone Code:** DW-F04
- **Date:** November 27, 2026
- **Target Application:** `apps/driver` (`com.haulix.driver`)
- **Base Verification Commit:** `03234238aca8505c0c23d91bc448a4ee805d91f1`
- **Device Verification Target:** Realme Note 60 (`0B04731X200003BB`, Android 15, `360dp` Logical Viewport, 720×1600 px)
- **Authoritative Design Source:** Figma File `meiXxwUNJaDo0a3mhcHBXv`, Driver/Worker Page `1:3`

---

## 1. Executive Summary

Milestone **DW-F04 (Offers, Dispatch Matching & Crew Management)** has been fully implemented, localized into English and Spanish, verified against automated unit test suites, and validated on a physical Android device (**Realme Note 60**).

All 9 canonical screen states (18 bilingual screen variants) conform to approved Figma designs, design tokens (`@haulix/design-tokens`), and strict guard-free navigation principles. Additionally, all identified DW-F03 residual issues (role-specific availability preference isolation, draft save/cancel semantics, vacation mode synchronization, and localization in `AvailabilityOverlay`) have been completely resolved and verified.

Cumulative progress now stands at **30 of 68 canonical states (44.1%)**, **60 of 136 bilingual variants**, and **2 of 14 supporting overlays** across the authoritative 9-milestone roadmap.

---

## 2. Canonical Screen & Variant Traceability Matrix

| Canonical ID | Screen Name & Purpose | Route | English Node | Spanish Node | Physical Device Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DW10** | Job offers radar & filter hub | `/(app)/job-offers` | `1086:81` | `1088:410` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw10-device-job-offers-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw10-device-job-offers-es.png) |
| **DW11** | Job details, items, route & payout | `/(app)/job-details` | `1086:162` | `1088:491` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw11-device-job-details-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw11-device-job-details-es.png) |
| **DW12** | Offer unavailable & expiry recovery | `/(app)/offer-unavailable` | `1086:205` | `1088:534` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw12-device-offer-unavailable-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw12-device-offer-unavailable-es.png) |
| **DW13** | Invite a Helper crew selection hub | `/(app)/invite-helper` | `1086:231` | `1088:560` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw13-device-invite-helper-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw13-device-invite-helper-es.png) |
| **DW14** | Helper invitations inbox | `/(app)/helper-invitations` | `1086:268` | `1088:597` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw14-device-helper-invitations-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw14-device-helper-invitations-es.png) |
| **DW15** | Helper review invitation | `/(app)/review-invitation` | `1086:328` | `1088:657` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw15-device-review-invitation-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw15-device-review-invitation-es.png) |
| **DW16** | Crew readiness mutual confirmation | `/(app)/crew-readiness` | `1086:365` | `1088:694` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw16-device-crew-readiness-en.png) | [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw16-device-crew-readiness-es.png) |
| **DW48** | Choose a Helper candidate roster | `/(app)/choose-helper` | `1301:920` | `1301:2162` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw48-device-choose-helper-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw48-device-choose-helper-es.png) |
| **DW49** | Invitation pending wait state | `/(app)/invitation-pending` | `1301:1010` | `1301:2252` | [EN](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw49-device-invitation-pending-en.png) · [ES](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/driver/dw-f04/dw49-device-invitation-pending-es.png) |

---

## 3. Mock Dispatch & Crew State Architecture

Implemented in [`apps/driver/src/stores/dispatchCrewStore.ts`](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/driver/src/stores/dispatchCrewStore.ts):

1. **Deterministic Job Offers Lifecycle:**
   - Pre-loaded Phoenix & Arizona metropolitan job offers (`HX-AZ-DEMO-0042`, `OFFER-DEMO-02`, `OFFER-DEMO-03`).
   - Atomic acceptance concurrency: once an offer is accepted, subsequent accept attempts throw an atomic assignment lock (`ALREADY_ASSIGNED`), preventing double-dispatch.
   - Status filtering: Available, Invitations, Expired with real-time badge counters.

2. **Helper Crew Invitation & Matching Engine:**
   - Candidate roster with verified badges, star ratings, proximity distances, and vehicle heavy-lifting qualifications.
   - Independent decision requirement disclosure: invitations require independent helper acceptance in their own account before crew readiness can be satisfied.
   - Countdown timer simulation (60s) for pending invitation responses with expiration handling.

3. **Mutual Crew Readiness Checklist:**
   - Mutual confirmation cards: Primary Driver accepted state + Helper individual response (`PENDING`, `ACCEPTED`, `DECLINED`).
   - Guard-free departure button: enables Departure preview once crew readiness conditions are met or solo operation is selected.

4. **Interactive Dispatch Scenarios Matrix:**
   - `AVAILABLE`: 3 active jobs ready for review.
   - `EXPIRED`: Offers timed out, routing to DW12 recovery state.
   - `ACCEPTED`: Job locked to Primary Driver, ready for helper invite or solo execution.
   - `PENDING_INVITE`: Invitation dispatched to Elena Torres, pending response.
   - `ACCEPTED_INVITE`: Elena Torres accepted, crew complete.
   - `DECLINED_INVITE`: Helper declined, returns driver to Choose Helper roster.
   - `CREW_INCOMPLETE`: Driver accepted, helper not yet confirmed.
   - `CREW_READY`: Both Driver and Helper confirmed, Departure CTA active.

---

## 4. Targeted DW-F03 Residual Corrections

The following specific gaps from DW-F03 were resolved:

1. **Role-Specific Availability Isolation:**
   - Updated [`apps/driver/src/stores/availabilityStore.ts`](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/driver/src/stores/availabilityStore.ts) to separate `driverPreferences` from `helperPreferences`.
   - Modifying driver service radius (e.g. 25 mi) or shift hours no longer mutates helper crew radius (e.g. 15 mi).

2. **Draft Save & Cancel Semantics:**
   - Refactored [`apps/driver/app/(app)/availability-settings.tsx`](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/driver/app/(app)/availability-settings.tsx) with isolated local draft state (`draftPreferences`, `draftOnline`).
   - Tapping Back or Cancel discards uncommitted edits; only tapping Save commits to persistent store.

3. **Vacation Mode Synchronization:**
   - When `vacationMode` is toggled ON, the worker's operational status is forced to `OFFLINE`.
   - Re-toggling OFF restores previous active availability.

4. **Localization Completeness in Overlays:**
   - Localized all radius options, day names, shift presets, and disclaimers dynamically in [`AvailabilityOverlay.tsx`](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/driver/src/components/overlays/AvailabilityOverlay.tsx).

---

## 5. QA Screen Navigator & Clean Mode Enhancements

Updated [`apps/driver/src/components/demo/DriverDemoScreenNavigator.tsx`](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/apps/driver/src/components/demo/DriverDemoScreenNavigator.tsx):

- Registered all 18 DW-F04 screen variants in `DRIVER_DEMO_SCREENS`.
- Added **Clean Screenshot Mode**: toggling Clean Mode (or passing `clean=1` via URL parameter) hides the floating QA dock so screenshots capture 100% unobstructed Figma UI. An invisible trigger in the top-right corner allows restoring the dock at any time.
- Integrated **Dispatch & Crew Scenario Pills** directly in the QA dock.
- Deep link parameter synchronization in `_layout.tsx`: `lang=en|es`, `role=PRIMARY_DRIVER|HELPER`, `clean=1|0`, and `scenario=...` allow direct automated navigation via ADB.

---

## 6. Quality Gates & Verification Evidence

```bash
# 1. TypeScript Compilation (apps/driver)
pnpm --filter @haulix/driver typecheck
# Result: 0 errors (tsc --noEmit passed)

# 2. Biome Lint & Format Check
pnpm exec biome check apps/driver
# Result: Checked 77 files. 0 errors, 0 warnings.

# 3. Automated Test Suites
pnpm --filter @haulix/driver test
# Result: 6 test suites passed, 58 tests passed (0 failures)
# Includes comprehensive src/__tests__/dw-f04-dispatch-crew.test.ts (14 tests)

# 4. Production Bundle Export
npx expo export --platform android --clear
# Result: Exported dist (Android bundle 4.9MB HBC, 37 assets, 0 errors)
```

---

## 7. Progress & Roadmap Synchronization

Authoritative progress in [`docs/design/driver-final/DW_FRONTEND_IMPLEMENTATION_TRACKER.json`](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/driver-final/DW_FRONTEND_IMPLEMENTATION_TRACKER.json):

- **Canonical States Completed:** 30 / 68 (44.1%)
- **Bilingual Screen Variants:** 60 / 136 (44.1%)
- **Supporting Overlay Variants:** 2 / 14 (14.3%)
- **Next Milestone:** **DW-F05 Active Job Execution & Navigation** (DW17 through DW25: Route preview, pickup checklist, cargo verification, load inspection, en-route navigation, arrival confirmation).
