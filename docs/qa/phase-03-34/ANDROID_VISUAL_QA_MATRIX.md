# HAULIX Customer App — Phase 03.34

## Android Visual QA Matrix & Interactive Verification

### W03 — Quote Acceptance, Unapproved Rates & Scope Confirmation Recovery

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.34  
**Device:** Physical Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB`)  
**OS Version:** Android 15  
**Screen Resolution:** 720 × 1600 px  
**Date:** November 19, 2026  
**Status:** PASS (28 Genuine Device Screen Captures)

---

## 1. Hardware Screen Variants Matrix (8 Initial Views + 8 Scrolled Views)

| Screen Code | Name                      | Locale | Initial View File     | Scrolled View File             | Status   | Notes                                                                               |
| :---------- | :------------------------ | :----- | :-------------------- | :----------------------------- | :------- | :---------------------------------------------------------------------------------- |
| **C25-A**   | Quote Acceptance Review   | EN     | `c25a-en-android.png` | `c25a-en-scrolled-android.png` | **PASS** | Booking draft, $356 subtotal, acceptance info card, primary/secondary/recovery CTAs |
| **C25-A**   | Quote Acceptance Review   | ES     | `c25a-es-android.png` | `c25a-es-scrolled-android.png` | **PASS** | Symmetrical Spanish copy, booking draft, demo disclosures                           |
| **C25-E**   | Unapproved Rate Rules     | EN     | `c25e-en-android.png` | `c25e-en-scrolled-android.png` | **PASS** | Pricing configuration unavailable notice, Admin review CTA                          |
| **C25-E**   | Unapproved Rate Rules     | ES     | `c25e-es-android.png` | `c25e-es-scrolled-android.png` | **PASS** | Symmetrical Spanish copy, rate review request CTA, quote review return              |
| **C26-A**   | Scope Accepted            | EN     | `c26a-en-android.png` | `c26a-en-scrolled-android.png` | **PASS** | Prototype success notice, 3 required next steps pills, continue CTA                 |
| **C26-A**   | Scope Accepted            | ES     | `c26a-es-android.png` | `c26a-es-scrolled-android.png` | **PASS** | Symmetrical Spanish copy, 3 steps pills, estimate return CTA                        |
| **C26-R**   | Scope Acceptance Recovery | EN     | `c26r-en-android.png` | `c26r-en-scrolled-android.png` | **PASS** | Save failed error card, retry CTA, estimate review return CTA                       |
| **C26-R**   | Scope Acceptance Recovery | ES     | `c26r-es-android.png` | `c26r-es-scrolled-android.png` | **PASS** | Symmetrical Spanish copy, non-duplication guidance, safe retry CTA                  |

---

## 2. Interactive Navigation & Transition Verification (12 Captures)

| Test ID    | Interaction / Flow   | Evidence Capture File                   | Expected Behavior                             | Actual Behavior                                   | Result   |
| :--------- | :------------------- | :-------------------------------------- | :-------------------------------------------- | :------------------------------------------------ | :------- |
| **IT-01**  | C25 → C25-A          | `c25-to-c25a-android.png`               | Tap "Review quote acceptance" on C25          | Navigates cleanly to C25-A acceptance review      | **PASS** |
| **IT-02**  | C25 → C25-E          | `c25-to-c25e-android.png`               | Tap "See unavailable-price state" on C25      | Navigates cleanly to C25-E unapproved rates       | **PASS** |
| **IT-03**  | C25-A → C26-A        | `c25a-to-c26a-android.png`              | Tap "Accept scope & continue" primary CTA     | Navigates to C26-A scope accepted                 | **PASS** |
| **IT-04**  | C25-A → C26-R        | `c25a-to-c26r-android.png`              | Tap "Simulate acceptance error example"       | Navigates to C26-R recovery screen                | **PASS** |
| **IT-05**  | C26-A Notice         | `c26a-notice-android.png`               | Tap "Continue to Schedule & Payment"          | Displays upcoming W04 banner; no fake payments    | **PASS** |
| **IT-06**  | C26-A → C25          | `c26a-to-c25-android.png`               | Tap "Revisit itemized estimate" secondary CTA | Safely returns to C25 price breakdown             | **PASS** |
| **IT-07**  | C25-E → C24-ADM      | `c25e-to-c24adm-android.png`            | Tap "Request service-rate review" primary CTA | Navigates to C24-ADM Admin review pending         | **PASS** |
| **IT-08**  | C25-E → C25          | `c25e-to-c25-android.png`               | Tap "Back to quote review" secondary CTA      | Safely returns to C25 itemized quote review       | **PASS** |
| **IT-09**  | C26-R → C25-A        | `c26r-to-c25a-android.png`              | Tap "Retry accepting scope" primary CTA       | Replaces route cleanly back to C25-A              | **PASS** |
| **IT-10**  | C26-R Back           | `c26r-back-nav-android.png`             | Press Android hardware back key               | Safely pops back to C25-A                         | **PASS** |
| **REG-01** | C25 Price Audit (EN) | `c25-illustrative-price-en-android.png` | Verify illustrative subtotal on C25 EN        | Confirms non-binding label and tariff disclaimer  | **PASS** |
| **REG-02** | C25 Price Audit (ES) | `c25-illustrative-price-es-android.png` | Verify illustrative subtotal on C25 ES        | Confirms non-binding Spanish label and disclaimer | **PASS** |

---

## 3. Physical Hardware Execution Notes

- **Device:** Realme Note 60 (`RMX3930`), Serial `0B04731X200003BB`, running Android 15.
- **Port:** Local Metro port 8085 via ADB reverse socket forwarding (`adb reverse tcp:8085 tcp:8085`).
- **Visual Accuracy:** Fonts render using system fallbacks with crisp NativeWind line heights; SVG icons render cleanly without artifacts or clipping; touch targets exceed the standard 44 × 44 dp accessibility threshold.
