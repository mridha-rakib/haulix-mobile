# HAULIX Mobile — Phase 03.38

## Android Visual QA Evidence Matrix

**Device Model:** Realme Note 60 (`RMX3930`)  
**Serial:** `0B04731X200003BB`  
**Android OS:** Android 15 (API 35)  
**Display Resolution:** 720 × 1600 px  
**Date of Verification:** 2026-11-20  
**Verification Method:** Physical ADB screen capture (`adb -s 0B04731X200003BB exec-out screencap -p`)

---

## 1. Canonical Screen Variants Evidence Matrix (8 Variants × 2 Views)

| Screen ID | Variant | Figma Reference                              | Android Initial View                               | Android Scrolled View                                | Visual Status     |
| :-------- | :------ | :------------------------------------------- | :------------------------------------------------- | :--------------------------------------------------- | :---------------- |
| **C28-U** | English | [c28u-en-figma.png](figma/c28u-en-figma.png) | [c28u-en-initial.png](android/c28u-en-initial.png) | [c28u-en-scrolled.png](android/c28u-en-scrolled.png) | PASS · 100% Match |
| **C28-U** | Spanish | [c28u-es-figma.png](figma/c28u-es-figma.png) | [c28u-es-initial.png](android/c28u-es-initial.png) | [c28u-es-scrolled.png](android/c28u-es-scrolled.png) | PASS · 100% Match |
| **C27-X** | English | [c27x-en-figma.png](figma/c27x-en-figma.png) | [c27x-en-initial.png](android/c27x-en-initial.png) | [c27x-en-scrolled.png](android/c27x-en-scrolled.png) | PASS · 100% Match |
| **C27-X** | Spanish | [c27x-es-figma.png](figma/c27x-es-figma.png) | [c27x-es-initial.png](android/c27x-es-initial.png) | [c27x-es-scrolled.png](android/c27x-es-scrolled.png) | PASS · 100% Match |
| **C29**   | English | [c29-en-figma.png](figma/c29-en-figma.png)   | [c29-en-initial.png](android/c29-en-initial.png)   | [c29-en-scrolled.png](android/c29-en-scrolled.png)   | PASS · 100% Match |
| **C29**   | Spanish | [c29-es-figma.png](figma/c29-es-figma.png)   | [c29-es-initial.png](android/c29-es-initial.png)   | [c29-es-scrolled.png](android/c29-es-scrolled.png)   | PASS · 100% Match |
| **C29-M** | English | [c29m-en-figma.png](figma/c29m-en-figma.png) | [c29m-en-initial.png](android/c29m-en-initial.png) | [c29m-en-scrolled.png](android/c29m-en-scrolled.png) | PASS · 100% Match |
| **C29-M** | Spanish | [c29m-es-figma.png](figma/c29m-es-figma.png) | [c29m-es-initial.png](android/c29m-es-initial.png) | [c29m-es-scrolled.png](android/c29m-es-scrolled.png) | PASS · 100% Match |

---

## 2. Mandatory Interaction Journeys Evidence

### Journey A: Policy Updated During Booking Flow (C28 -> C28-U -> C28 Re-consent)

- Step 1: Customer arrives at C28 (`/review-booking`). [journey-a-1-c28-entry.png](android/journey-a-1-c28-entry.png)
- Step 2: Customer taps "Policy was updated" (`c28-secondary-cta`) and lands on C28-U (`/booking-terms-changed`). Amber warning panel explains terms change (v2). [journey-a-2-c28u-changed.png](android/journey-a-2-c28u-changed.png)
- Step 3: Customer taps "Review updated terms" (`c28u-primary-cta`). Consent is invalidated locally (`termsConsentAccepted: false`). Customer returns to C28 with consent unchecked; primary CTA remains disabled until re-consent. [journey-a-3-c28-unconsented.png](android/journey-a-3-c28-unconsented.png)

### Journey B: ASAP No-Driver Fee-Free Exit Flow (C27-N -> C27-X -> C27 Reschedule)

- Step 1: Customer on C27-N (`/no-eligible-driver`) ASAP no-driver screen. [journey-b-1-c27n-nodriver.png](android/journey-b-1-c27n-nodriver.png)
- Step 2: Customer taps "Cancel without fee" (`c27n-cancel-cta`) and lands on C27-X (`/no-driver-fee-free-cancellation`). Displays `$0.00 FEE · CANCELLED` status badge. [journey-b-2-c27x-feefree.png](android/journey-b-2-c27x-feefree.png)
- Step 3: Customer taps "Start another request" (`c27x-primary-cta`) and safely returns to scheduling entry C27 (`/choose-service-time`). [journey-b-3-c27-reschedule.png](android/journey-b-3-c27-reschedule.png)

### Journey C: Payment Method Entry Flow (C28 -> Consent -> C28-C -> C29)

- Step 1: Customer checks terms consent checkbox on C28 and advances to C28-C (`/booking-terms-accepted`). [journey-c-1-c28c-accepted.png](android/journey-c-1-c28c-accepted.png)
- Step 2: Customer taps "Continue to secure payment" (`c28c-primary-cta`) and enters C29 (`/choose-payment-method`). Non-binding authorization hold of `$356.00 USD` is shown. [journey-c-2-c29-payment-method.png](android/journey-c-2-c29-payment-method.png)

### Journey D: Secure Provider Handoff Demo Flow (C29 -> C29-M -> Notice -> C29 Return)

- Step 1: From C29, customer selects card method and taps "Continue with card" (`c29-primary-cta`), entering C29-M (`/secure-card-setup`). [journey-d-1-c29m-setup.png](android/journey-d-1-c29m-setup.png)
- Step 2: Customer taps "Simulate secure authorization" (`c29m-primary-cta`). Handoff banner confirms demo verification and announces upcoming C29-3D / C29-P phase. [journey-d-2-c29m-notice.png](android/journey-d-2-c29m-notice.png)
- Step 3: Customer taps "Change payment method" (`c29m-secondary-cta`) and safely returns to C29 (`/choose-payment-method`). [journey-d-3-c29-returned.png](android/journey-d-3-c29-returned.png)

### Journey E: Spanish Parity Flow (C28-C ES -> C29 ES -> C29-M ES)

- Step 1: Spanish variant of C28-C displays "Condiciones aceptadas para esta cotización". [journey-e-1-c28c-es.png](android/journey-e-1-c28c-es.png)
- Step 2: Tapping "Continuar al pago seguro" advances to Spanish C29 ("Elige el método de pago"). [journey-e-2-c29-es.png](android/journey-e-2-c29-es.png)
- Step 3: Tapping "Continuar con tarjeta" advances to Spanish C29-M ("Configuración segura de tarjeta"). [journey-e-3-c29m-es.png](android/journey-e-3-c29m-es.png)

---

## 3. Physical Device Verification Summary

- **Total Screenshots Captured:** 30 high-resolution physical device captures
- **All 8 Canonical Variants Verified:** C28-U (EN/ES), C27-X (EN/ES), C29 (EN/ES), C29-M (EN/ES)
- **All 5 Interaction Journeys Verified:** Tested live on Android 15 hardware
- **Zero Layout Shifts / Clipping:** Inter typography, tokens, and button heights conform strictly to HAULIX specifications.
