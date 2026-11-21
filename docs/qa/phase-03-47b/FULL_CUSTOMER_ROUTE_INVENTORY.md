# HAULIX Customer Mobile App — Phase 03.47B
## Full Customer Route Inventory & Deep-Link Reference

**Document ID:** `HAULIX-QA-P03.47B-005`  
**Phase:** 03.47B  
**Target:** Standalone Android APK (`com.haulix.customer`)  
**URL Scheme:** `haulix-customer://`

---

### 1. Comprehensive Route Catalog (W01–W05)

Every route in the HAULIX Customer Mobile App is accessible directly without authentication, booking prerequisite, or payment gate:

| Workflow | Screen Name | Route Path | testID | Deep Link URI |
|---|---|---|---|---|
| **W01** | Splash Screen | `/splash` | `splash-screen` | `haulix-customer:///splash` |
| **W01** | Onboarding Flow | `/onboarding` | `onboarding-screen` | `haulix-customer:///onboarding` |
| **W01** | Phone Entry | `/sign-in` | `sign-in-screen` | `haulix-customer:///sign-in` |
| **W01** | OTP Verification | `/verify-phone` | `verify-phone-screen` | `haulix-customer:///verify-phone` |
| **W01** | Create Account | `/create-account` | `create-account-screen` | `haulix-customer:///create-account` |
| **W01** | Service Area Gate | `/service-area` | `service-area-screen` | `haulix-customer:///service-area` |
| **W02** | Home / Service Discovery | `/home` | `home-screen` | `haulix-customer:///home` |
| **W02** | Moving Intake | `/moving-intake` | `moving-intake-screen` | `haulix-customer:///moving-intake` |
| **W02** | Retail Intake | `/retail-intake` | `retail-intake-screen` | `haulix-customer:///retail-intake` |
| **W02** | Bulky Item Intake | `/bulky-item-intake` | `bulky-item-screen` | `haulix-customer:///bulky-item-intake` |
| **W03** | Customer Confirmed Inventory | `/item-inventory` | `item-inventory-screen` | `haulix-customer:///item-inventory` |
| **W03** | Itemized Cargo Quote | `/itemized-quote` | `itemized-quote-screen` | `haulix-customer:///itemized-quote` |
| **W03** | Service Window Selection | `/choose-service-time` | `choose-service-time-screen` | `haulix-customer:///choose-service-time` |
| **W03** | Review Fresh Card Hold | `/review-fresh-card-hold` | `review-fresh-card-hold-screen` | `haulix-customer:///review-fresh-card-hold` |
| **W04** | Booking Terms Accepted | `/booking-terms-accepted` | `booking-terms-accepted-screen` | `haulix-customer:///booking-terms-accepted` |
| **W04** | C31-F Booking Not Confirmed | `/booking-not-confirmed` | `booking-not-confirmed-screen` | `haulix-customer:///booking-not-confirmed` |
| **W04** | C31-S Booking Recorded | `/booking-recorded` | `booking-recorded-screen` | `haulix-customer:///booking-recorded` |
| **W04** | C31-A ASAP Request Recorded | `/asap-request-recorded` | `asap-request-recorded-screen` | `haulix-customer:///asap-request-recorded` |
| **W05** | S10 Search 10-Mile Radius | `/searching-for-driver` | `searching-for-driver-screen` | `haulix-customer:///searching-for-driver` |
| **W05** | S20 Search Expanded 20-Mile | `/search-expanded-20mi` | `search-expanded-20mi-screen` | `haulix-customer:///search-expanded-20mi` |
| **W05** | S30 Search Expanding 30-Mile | `/search-expanding-30mi` | `search-expanding-30mi-screen` | `haulix-customer:///search-expanding-30mi` |
| **W05** | S40 Search Expanded 40-Mile | `/search-expanded-40mi` | `search-expanded-40mi-screen` | `haulix-customer:///search-expanded-40mi` |
| **W05** | S50 Search Expanded 50-Mile | `/search-expanded-50mi` | `search-expanded-50mi-screen` | `haulix-customer:///search-expanded-50mi` |
| **W05** | C32-B Driver Matched | `/driver-matched` | `driver-matched-screen` | `haulix-customer:///driver-matched` |
| **W05** | Helper Confirmed | `/helper-confirmed` | `helper-confirmed-screen` | `haulix-customer:///helper-confirmed` |
| **W05** | Driver Reassigned | `/driver-reassigned` | `driver-reassigned-screen` | `haulix-customer:///driver-reassigned` |
| **W05** | Driver Running Late | `/driver-late` | `driver-late-screen` | `haulix-customer:///driver-late` |
| **W05** | No Driver Available | `/no-driver-available` | `no-driver-available-screen` | `haulix-customer:///no-driver-available` |
| **W05** | Cancel Request Review | `/cancel-request-review` | `cancel-request-review-screen` | `haulix-customer:///cancel-request-review` |
| **W05** | Request Canceled | `/request-canceled` | `request-canceled-screen` | `haulix-customer:///request-canceled` |

---

### 2. Localization Parameter Support

Every route accepts the optional query parameter `previewLocale`:
- `haulix-customer://<route>?previewLocale=en` -> Forces English rendering.
- `haulix-customer://<route>?previewLocale=es` -> Forces Spanish rendering.

All routes are fully operational in both languages.
