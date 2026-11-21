# HAULIX Customer Mobile App — Phase 03.47B
## W05 Twelve Canonical Dispatch Routes — EN & ES QA Matrix

**Document ID:** `HAULIX-QA-P03.47B-009`  
**Phase:** 03.47B  
**Target:** Standalone Android APK (`com.haulix.customer`)  
**Figma File:** `meiXxwUNJaDo0a3mhcHBXv`

---

### 1. The 12 Canonical W05 Dispatch States

| Route Index | Canonical State | Route Path | Figma Frame EN | Figma Frame ES | Deep Link URI | Status |
|---|---|---|---|---|---|---|
| **01** | S10 (Searching 10-mi) | `/searching-for-driver` | `Section 836:4571` | `Section 836:4572` | `haulix-customer:///searching-for-driver` | **VERIFIED** |
| **02** | S20 (Expanded 20-mi) | `/search-expanded-20mi` | `844:4670` | `844:6820` | `haulix-customer:///search-expanded-20mi` | **VERIFIED** |
| **03** | S30 (Expanding 30-mi) | `/search-expanding-30mi` | `844:4769` | `844:6919` | `haulix-customer:///search-expanding-30mi` | **VERIFIED** |
| **04** | S40 (Expanded 40-mi) | `/search-expanded-40mi` | `844:4868` | `844:7018` | `haulix-customer:///search-expanded-40mi` | **VERIFIED** |
| **05** | S50 (Expanded 50-mi) | `/search-expanded-50mi` | `844:4967` | `844:7117` | `haulix-customer:///search-expanded-50mi` | **VERIFIED** |
| **06** | Driver Matched | `/driver-matched` | `Section 836:4571` | `Section 836:4572` | `haulix-customer:///driver-matched` | **VERIFIED** |
| **07** | Helper Confirmed | `/helper-confirmed` | `844:5741` | `844:7988` | `haulix-customer:///helper-confirmed` | **VERIFIED** |
| **08** | Driver Reassigned | `/driver-reassigned` | `844:5643` | `844:7890` | `haulix-customer:///driver-reassigned` | **VERIFIED** |
| **09** | Driver Running Late | `/driver-late` | `844:5839` | `844:8086` | `haulix-customer:///driver-late` | **VERIFIED** |
| **10** | No Driver Available | `/no-driver-available` | `844:6156` | `844:8306` | `haulix-customer:///no-driver-available` | **VERIFIED** |
| **11** | Cancel Review | `/cancel-request-review` | `844:6058` | `844:8208` | `haulix-customer:///cancel-request-review` | **VERIFIED** |
| **12** | Request Canceled | `/request-canceled` | `844:6254` | `844:8404` | `haulix-customer:///request-canceled` | **VERIFIED** |

---

### 2. Physical Android Device Execution Matrix

All 12 routes in both English (`previewLocale=en`) and Spanish (`previewLocale=es`) have been deep-linked and inspected on physical hardware (Realme Note 60, Android 15, `720 × 1600` px):
- 0 route crashes
- 0 unhandled exceptions
- 0 missing translation keys
- 0 layout regressions
