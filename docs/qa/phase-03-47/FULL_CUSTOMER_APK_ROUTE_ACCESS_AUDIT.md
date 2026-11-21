# HAULIX Customer Mobile App — Phase 03.47
# Full Customer APK Route Access & Deep-Link Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/FULL_CUSTOMER_APK_ROUTE_ACCESS_AUDIT.md`  
**DEVICE:** Realme Note 60 (RMX3930, Android 15, 720 × 1600 px)  
**STATUS:** VERIFIED — 100% UNRESTRICTED ACCESS  

---

## 1. Executive Summary

This audit validates that every customer screen in the HAULIX Android APK can be opened directly, without authentication guards, prerequisite bookings, or state redirects. All screens render deterministically and maintain full Back-navigation integrity.

---

## 2. Route Accessibility Matrix

| Category | Route | Direct Link | Guard Status | Fallback / Fixture | Result |
|---|---|---|---|---|---|
| **Root** | `/` (Home) | `haulix-customer:///` | NONE | Default Home state | PASS |
| **Auth** | `/login` | `haulix-customer://login` | NONE | Interactive demo form | PASS |
| **Auth** | `/create-account` | `haulix-customer://create-account` | NONE | Interactive demo form | PASS |
| **Auth** | `/social-return` | `haulix-customer://social-return` | NONE | Auth return handler | PASS |
| **W01** | `/profile` | `haulix-customer://profile` | NONE | User demo profile | PASS |
| **W01** | `/edit-profile` | `haulix-customer://edit-profile` | NONE | User demo profile | PASS |
| **W02** | `/item-inventory` | `haulix-customer://item-inventory` | NONE | Confirmed item list | PASS |
| **W02** | `/add-pickup-address`| `haulix-customer://add-pickup-address`| NONE | Address form | PASS |
| **W02** | `/moving-destination`| `haulix-customer://moving-destination`| NONE | Moving intake state | PASS |
| **W03** | `/choose-service-time`| `haulix-customer://choose-service-time`| NONE | Scheduling slots | PASS |
| **W03** | `/select-available-window`| `haulix-customer://select-available-window`| NONE | Service windows | PASS |
| **W04** | `/review-booking` | `haulix-customer://review-booking` | NONE | Booking overview | PASS |
| **W04** | `/choose-payment-method`| `haulix-customer://choose-payment-method`| NONE | Card setup | PASS |
| **W04** | `/asap-request-recorded`| `haulix-customer://asap-request-recorded`| NONE | ASAP outcome | PASS |
| **W04** | `/booking-recorded` | `haulix-customer://booking-recorded` | NONE | Scheduled outcome | PASS |
| **W05 (S10)** | `/searching-for-driver` | `haulix-customer://searching-for-driver` | NONE | `c32Dispatch.ts` | PASS |
| **W05 (S20)** | `/search-expanded-20mi` | `haulix-customer://search-expanded-20mi` | NONE | `w05S20` tokens | PASS |
| **W05 (S30)** | `/search-expanding-30mi`| `haulix-customer://search-expanding-30mi`| NONE | `w05S30` tokens | PASS |
| **W05 (S40)** | `/search-expanded-40mi` | `haulix-customer://search-expanded-40mi` | NONE | `w05S40` tokens | PASS |
| **W05 (S50)** | `/search-expanded-50mi` | `haulix-customer://search-expanded-50mi` | NONE | `w05S50` tokens | PASS |
| **W05** | `/driver-matched` | `haulix-customer://driver-matched` | NONE | Marcus Vance crew | PASS |
| **W05** | `/crew-tracking` | `haulix-customer://crew-tracking` | NONE | Active telemetry | PASS |
| **W05** | `/driver-arrival-update`| `haulix-customer://driver-arrival-update`| NONE | Late arrival notice | PASS |
| **W05** | `/driver-reassigned` | `haulix-customer://driver-reassigned` | NONE | Sarah L. replacement | PASS |
| **W05** | `/no-driver-available` | `haulix-customer://no-driver-available` | NONE | Recovery options | PASS |
| **W05** | `/cancellation-windows`| `haulix-customer://cancellation-windows`| NONE | Tiered policy | PASS |
| **W05** | `/request-canceled` | `haulix-customer://request-canceled` | NONE | Fee-free result | PASS |

---

## 3. Back-Navigation Stability

Every tested screen provides:
1. **FlowHeaderBack Button:** Calls `router.back()` if navigation history exists, or falls back to an upstream route.
2. **Android Hardware Back Button:** Handled via `BackHandler.addEventListener("hardwareBackPress", ...)`, ensuring the device back gesture pops the screen smoothly without crashing or exiting to the OS home screen.

---

## 4. Verification Conclusion

Zero route guards block navigation. Every customer screen in the codebase can be tested directly on physical devices using standard Android deep-link commands or the floating QA Screen Navigator.
