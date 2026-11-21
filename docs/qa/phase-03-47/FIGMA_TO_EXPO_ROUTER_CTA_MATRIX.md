# HAULIX Customer Mobile App — Phase 03.47
# Figma-to-Expo Router CTA Interaction & Navigation Matrix

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/FIGMA_TO_EXPO_ROUTER_CTA_MATRIX.md`  
**SCOPE:** Complete Forward/Back/Alternative CTA Wiring across W05  
**STATUS:** VERIFIED — 100% FUNCTIONAL INTERACTION  

---

## 1. Interaction Mapping Table

| Origin Screen | Action / Control | Figma Target Destination | Expo Router Route | State Mutated? | Verified Result |
|---|---|---|---|---|---|
| **S10** (`/searching-for-driver`) | Primary (Lime) | Next Search Stage (S20) | `/search-expanded-20mi` | None | Navigates forward to S20 |
| **S10** (`/searching-for-driver`) | Secondary (Dark)| Driver Matched | `/driver-matched` | `simulateDriverMatched()` | Navigates to Driver Matched |
| **S10** (`/searching-for-driver`) | Link (Underline)| Cancellation Windows | `/cancellation-windows` | None | Navigates to Cancellation |
| **S10** (`/searching-for-driver`) | Header Back | Booking Recorded | `/asap-request-recorded` | None | Returns upstream |
| **S20** (`/search-expanded-20mi`) | Primary (Lime) | Next Search Stage (S30) | `/search-expanding-30mi`| None | Navigates forward to S30 |
| **S20** (`/search-expanded-20mi`) | Secondary (Dark)| Driver Matched Preview | `/driver-matched` | `simulateDriverMatched()` | Navigates to Driver Matched |
| **S20** (`/search-expanded-20mi`) | Link (Underline)| Cancellation Options | `/cancellation-windows` | None | Navigates to Cancellation |
| **S20** (`/search-expanded-20mi`) | Header Back | Prior Search Stage (S10)| `/searching-for-driver` | None | Pops to S10 |
| **S30** (`/search-expanding-30mi`)| Primary (Lime) | Next Search Stage (S40) | `/search-expanded-40mi` | None | Navigates forward to S40 |
| **S30** (`/search-expanding-30mi`)| Secondary (Dark)| Driver Matched Preview | `/driver-matched` | `simulateDriverMatched()` | Navigates to Driver Matched |
| **S30** (`/search-expanding-30mi`)| Link (Underline)| Cancellation Options | `/cancellation-windows` | None | Navigates to Cancellation |
| **S30** (`/search-expanding-30mi`)| Header Back | Prior Search Stage (S20)| `/search-expanded-20mi` | None | Pops to S20 |
| **S40** (`/search-expanded-40mi`) | Primary (Lime) | Next Search Stage (S50) | `/search-expanded-50mi` | None | Navigates forward to S50 |
| **S40** (`/search-expanded-40mi`) | Secondary (Dark)| Driver Matched Preview | `/driver-matched` | `simulateDriverMatched()` | Navigates to Driver Matched |
| **S40** (`/search-expanded-40mi`) | Link (Underline)| Cancellation Options | `/cancellation-windows` | None | Navigates to Cancellation |
| **S40** (`/search-expanded-40mi`) | Header Back | Prior Search Stage (S30)| `/search-expanding-30mi`| None | Pops to S30 |
| **S50** (`/search-expanded-50mi`) | Primary (Lime) | Driver-Offer / No Driver| `/no-driver-available` | None | Navigates to No Driver |
| **S50** (`/search-expanded-50mi`) | Secondary (Dark)| Driver Matched Preview | `/driver-matched` | `simulateDriverMatched()` | Navigates to Driver Matched |
| **S50** (`/search-expanded-50mi`) | Link (Underline)| Cancellation Options | `/cancellation-windows` | None | Navigates to Cancellation |
| **S50** (`/search-expanded-50mi`) | Header Back | Prior Search Stage (S40)| `/search-expanded-40mi` | None | Pops to S40 |
| **No Driver** (`/no-driver-available`)| Primary (Lime) | Cancel Search | `/request-canceled` | `simulateFeeFreeExit()` | Navigates to Request Canceled |
| **No Driver** (`/no-driver-available`)| Secondary (Dark)| Reschedule (Demo) | `/searching-for-driver` | None | Restarts Search Demo |

---

## 2. Interaction Robustness

1. **Locale Persistence:** Every button transition appends `?previewLocale=<currentLocale>` to query parameters, ensuring language does not revert during navigation.
2. **Back-Stack Consistency:** Repeated navigation forward and backward does not produce blank screens or navigation loops.
3. **No Unhandled Promises:** All callbacks are wrapped in `useCallback` with safe asynchronous navigation semantics.
