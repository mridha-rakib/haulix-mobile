# HAULIX Customer App — Phase 03.33

## Android Visual QA Matrix & Interactive Verification

### W03 — Quote Error Recovery, Revision, Itemized Terms & Expiry

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.33  
**Device:** Physical Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB`)  
**OS Version:** Android 15  
**Screen Resolution:** 720 × 1600 px  
**Date:** November 19, 2026  
**Status:** PASS (26 Genuine Device Screen Captures)

---

## 1. Hardware Screen Variants Matrix (8 Initial Views + 8 Scrolled Views)

| Screen Code | Name                     | Locale | Initial View File       | Scrolled View File               | Status   | Notes                                                             |
| :---------- | :----------------------- | :----- | :---------------------- | :------------------------------- | :------- | :---------------------------------------------------------------- |
| **C24-F**   | Quote Error Recovery     | EN     | `c24f-en-android.png`   | `c24f-en-scrolled-android.png`   | **PASS** | Error emblem, retry primary CTA, Admin escalate secondary CTA     |
| **C24-F**   | Quote Error Recovery     | ES     | `c24f-es-android.png`   | `c24f-es-scrolled-android.png`   | **PASS** | Symmetrical Spanish copy, badge, actions and demo disclaimer      |
| **C24-REV** | Quote Revision Requested | EN     | `c24rev-en-android.png` | `c24rev-en-scrolled-android.png` | **PASS** | Revision notice, confirmed items summary, recalculate CTA         |
| **C24-REV** | Quote Revision Requested | ES     | `c24rev-es-android.png` | `c24rev-es-scrolled-android.png` | **PASS** | Symmetrical Spanish copy, measurement link, demo disclaimer       |
| **C25**     | Itemized Quote & Terms   | EN     | `c25-en-android.png`    | `c25-en-scrolled-android.png`    | **PASS** | $356 total badge, 6 itemized charge rows, full terms card         |
| **C25**     | Itemized Quote & Terms   | ES     | `c25-es-android.png`    | `c25-es-scrolled-android.png`    | **PASS** | Symmetrical Spanish breakdown, guarantee badge, scheduled banners |
| **C25-X**   | Quote Expired Refresh    | EN     | `c25x-en-android.png`   | `c25x-en-scrolled-android.png`   | **PASS** | Expired clock emblem, refresh estimate CTA, review previous CTA   |
| **C25-X**   | Quote Expired Refresh    | ES     | `c25x-es-android.png`   | `c25x-es-scrolled-android.png`   | **PASS** | Symmetrical Spanish copy, timestamp explanation, demo footer      |

---

## 2. Interactive Navigation & Transition Verification (10 Captures)

| Test ID   | Interaction / Flow | Evidence Capture File        | Expected Behavior                              | Actual Behavior                                        | Result   |
| :-------- | :----------------- | :--------------------------- | :--------------------------------------------- | :----------------------------------------------------- | :------- |
| **IT-01** | C24-P → C24-F      | `c24p-to-c24f-android.png`   | Tap "Pricing engine error example"             | Navigates cleanly to C24-F error recovery              | **PASS** |
| **IT-02** | C24-F → C24-P      | `c24f-to-c24p-android.png`   | Tap "Try quotation again" primary CTA          | Retries calculation cycle on C24-P                     | **PASS** |
| **IT-03** | C24-F → C24-ADM    | `c24f-to-c24adm-android.png` | Tap "Send to Admin review" secondary CTA       | Escalate to C24-ADM pending review screen              | **PASS** |
| **IT-04** | C24-Q → C24-REV    | `c24q-to-c24rev-android.png` | Tap "Edit details & recalculate" secondary CTA | Navigates to C24-REV quote revision requested          | **PASS** |
| **IT-05** | C24-REV → C23-C    | `c24rev-to-c23c-android.png` | Tap "Edit item measurements" secondary CTA     | Navigates to C23-C item measurement correction         | **PASS** |
| **IT-06** | C24-Q → C25        | `c24q-to-c25-android.png`    | Tap "Review full price breakdown" primary CTA  | Navigates to C25 full itemized quote & terms           | **PASS** |
| **IT-07** | C25 Notice Banner  | `c25-notice-android.png`     | Tap "Review quote acceptance" primary CTA      | Displays acceptance scheduled banner; no fake payments | **PASS** |
| **IT-08** | C25 Hardware Back  | `c25-back-nav-android.png`   | Press Android hardware back key                | Safely pops route back to C24-Q overview               | **PASS** |
| **IT-09** | C24-Q → C25-X      | `c24q-to-c25x-android.png`   | Tap "Expired quote example" tertiary CTA       | Navigates to C25-X quote expired refresh screen        | **PASS** |
| **IT-10** | C25-X → C25        | `c25x-to-c25-android.png`    | Tap "Review previous example" secondary CTA    | Navigates to C25 previous itemized quote breakdown     | **PASS** |

---

## 3. Physical Hardware Execution Notes

- **Device:** Realme Note 60 (`RMX3930`), Model `0B04731X200003BB`, running Android 15.
- **Port:** Local Metro port 8085 via ADB reverse socket forwarding (`adb reverse tcp:8085 tcp:8085`).
- **Visual Accuracy:** Fonts render using system fallbacks with crisp NativeWind line heights; SVG icons render cleanly without artifacts or clipping; touch targets exceed the standard 44 × 44 dp accessibility threshold.
