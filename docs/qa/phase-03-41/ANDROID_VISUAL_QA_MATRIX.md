# HAULIX Customer Mobile App — Phase 03.41

## Android Visual QA Matrix: Physical Device Verification

**Physical Device:** Realme Note 60 (`RMX3930`, Serial: `0B04731X200003BB`)  
**OS Version:** Android 15  
**Screen Resolution:** 720 × 1600 px (320 DPI)  
**Execution Environment:** ADB via USB, Metro Packager reversed on port 8085  
**Audit Date:** 2026-11-21

---

### 1. Canonical Variant QA Matrix (12 Images)

| Variant ID   | Locale  | State         | Screen File Path         | Visual QA Status                                                  | Image Filename         |
| :----------- | :------ | :------------ | :----------------------- | :---------------------------------------------------------------- | :--------------------- |
| **C31-S-EN** | English | Initial View  | `/booking-recorded`      | PASS — Correct green check icon, title, hold disclosure, and CTAs | `c31s-en-initial.png`  |
| **C31-S-EN** | English | Scrolled View | `/booking-recorded`      | PASS — Smooth scroll, full view of steps and disclaimers          | `c31s-en-scrolled.png` |
| **C31-S-ES** | Spanish | Initial View  | `/booking-recorded`      | PASS — Accurate Spanish translations, preserved typography        | `c31s-es-initial.png`  |
| **C31-S-ES** | Spanish | Scrolled View | `/booking-recorded`      | PASS — Spanish buttons and disclaimer alignment                   | `c31s-es-scrolled.png` |
| **C31-A-EN** | English | Initial View  | `/asap-request-recorded` | PASS — Sky blue lightning bolt, priority badge, and ETA           | `c31a-en-initial.png`  |
| **C31-A-EN** | English | Scrolled View | `/asap-request-recorded` | PASS — Priority dispatch timeline and dual actions                | `c31a-en-scrolled.png` |
| **C31-A-ES** | Spanish | Initial View  | `/asap-request-recorded` | PASS — Full Spanish parity, priority badge and messaging          | `c31a-es-initial.png`  |
| **C31-A-ES** | Spanish | Scrolled View | `/asap-request-recorded` | PASS — Spanish cancel action and timeline steps                   | `c31a-es-scrolled.png` |
| **C31-F-EN** | English | Initial View  | `/booking-not-confirmed` | PASS — Amber clock hero, warning badge, zero-charge notice        | `c31f-en-initial.png`  |
| **C31-F-EN** | English | Scrolled View | `/booking-not-confirmed` | PASS — Recovery options, choose another window CTA                | `c31f-en-scrolled.png` |
| **C31-F-ES** | Spanish | Initial View  | `/booking-not-confirmed` | PASS — Spanish warning state, uncaptured hold status              | `c31f-es-initial.png`  |
| **C31-F-ES** | Spanish | Scrolled View | `/booking-not-confirmed` | PASS — Spanish options card and recovery button                   | `c31f-es-scrolled.png` |

---

### 2. End-to-End Critical User Journeys Matrix (29 Images)

| Journey       | Description                                    | Steps Captured                                                | Visual Result                                                                                                       |
| :------------ | :--------------------------------------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------ |
| **Journey A** | Scheduled Booking Flow (C26-A → C31-S)         | 11 screens: `journey-a-1-c26a` to `journey-a-11-c31s`         | PASS — Seamless linear progression through scope, scheduling, review, payment setup, 3DS, hold, and final recording |
| **Journey B** | ASAP Request Flow (C27 → C31-A)                | 5 screens: `journey-b-1-c27` to `journey-b-5-c31a`            | PASS — Rapid progression from ASAP selection directly to ASAP priority recording                                    |
| **Journey C** | Not-Confirmed Recovery (C31-P → C31-F → C27-S) | 3 screens: `journey-c-1-c31p` to `journey-c-3-c27s-alternate` | PASS — Queue status flags unconfirmed state, user recovers by selecting alternative available window                |
| **Journey D** | Scheduling Recovery (C27-V / C27-R)            | 2 screens: `journey-d-1-c27v`, `journey-d-2-c27r`             | PASS — Clear recovery guidance for invalid time selections and unavailable windows                                  |
| **Journey E** | No-Driver Fee-Free Exit (C27-N → C27-X)        | 2 screens: `journey-e-1-c27n`, `journey-e-2-c27x`             | PASS — Transparent cancellation with guaranteed $0.00 fee                                                           |
| **Journey F** | Terms Changed Notification (C28-U)             | 1 screen: `journey-f-1-c28u`                                  | PASS — Accurate disclosure of modified terms before checkout                                                        |
| **Journey G** | Payment Recovery & Consent (C30-D → C30-E)     | 5 screens: `journey-g-1-c30d` to `journey-g-5-c30e`           | PASS — Complete payment error recovery, restoration, fresh hold consent, and expired hold handling                  |
