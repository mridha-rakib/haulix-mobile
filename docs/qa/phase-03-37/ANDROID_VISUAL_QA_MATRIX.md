# HAULIX Mobile — Phase 03.37

## Android Visual QA Evidence Matrix

**Device Model:** Realme Note 60 (`RMX3930`)  
**Serial:** `0B04731X200003BB`  
**Android OS:** Android 15 (API 35)  
**Display Resolution:** 720 × 1600 px  
**Date of Verification:** 2026-11-20  
**Verification Method:** Physical ADB screen capture (`adb exec-out screencap -p`)

---

## 1. Canonical Screen Variants Evidence Matrix (8 Variants × 2 Views)

| Screen ID | Variant | Figma Reference                              | Android Initial View                               | Android Scrolled View                                | Visual Status     |
| :-------- | :------ | :------------------------------------------- | :------------------------------------------------- | :--------------------------------------------------- | :---------------- |
| **C27-V** | English | [c27v-en-figma.png](figma/c27v-en-figma.png) | [c27v-en-initial.png](android/c27v-en-initial.png) | [c27v-en-scrolled.png](android/c27v-en-scrolled.png) | PASS · 100% Match |
| **C27-V** | Spanish | [c27v-es-figma.png](figma/c27v-es-figma.png) | [c27v-es-initial.png](android/c27v-es-initial.png) | [c27v-es-scrolled.png](android/c27v-es-scrolled.png) | PASS · 100% Match |
| **C27-R** | English | [c27r-en-figma.png](figma/c27r-en-figma.png) | [c27r-en-initial.png](android/c27r-en-initial.png) | [c27r-en-scrolled.png](android/c27r-en-scrolled.png) | PASS · 100% Match |
| **C27-R** | Spanish | [c27r-es-figma.png](figma/c27r-es-figma.png) | [c27r-es-initial.png](android/c27r-es-initial.png) | [c27r-es-scrolled.png](android/c27r-es-scrolled.png) | PASS · 100% Match |
| **C27-N** | English | [c27n-en-figma.png](figma/c27n-en-figma.png) | [c27n-en-initial.png](android/c27n-en-initial.png) | [c27n-en-scrolled.png](android/c27n-en-scrolled.png) | PASS · 100% Match |
| **C27-N** | Spanish | [c27n-es-figma.png](figma/c27n-es-figma.png) | [c27n-es-initial.png](android/c27n-es-initial.png) | [c27n-es-scrolled.png](android/c27n-es-scrolled.png) | PASS · 100% Match |
| **C28-C** | English | [c28c-en-figma.png](figma/c28c-en-figma.png) | [c28c-en-initial.png](android/c28c-en-initial.png) | [c28c-en-scrolled.png](android/c28c-en-scrolled.png) | PASS · 100% Match |
| **C28-C** | Spanish | [c28c-es-figma.png](figma/c28c-es-figma.png) | [c28c-es-initial.png](android/c28c-es-initial.png) | [c28c-es-scrolled.png](android/c28c-es-scrolled.png) | PASS · 100% Match |

---

## 2. Interaction Journeys Evidence Matrix (Journeys A through G)

| Journey ID    | Flow Description                             | Interaction Steps                                                  | Captured Hardware Artifacts                                                                                                                                                              | Status               |
| :------------ | :------------------------------------------- | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| **Journey A** | Invalid Same-Day Service Time Flow           | `C27` -> `C27-S` -> `C27-V` -> `C27-S`                             | [journey-a-1-c27s.png](android/journey-a-1-c27s.png)<br/>[journey-a-2-c27v.png](android/journey-a-2-c27v.png)<br/>[journey-a-3-c27s-returned.png](android/journey-a-3-c27s-returned.png) | VERIFIED · 100% PASS |
| **Journey B** | Unavailable / Stale Slot Recovery Flow       | `C27` -> `C27-R` -> `C27-S`                                        | [journey-b-1-c27r.png](android/journey-b-1-c27r.png)<br/>[journey-b-2-c27s-refreshed.png](android/journey-b-2-c27s-refreshed.png)                                                        | VERIFIED · 100% PASS |
| **Journey C** | No Eligible Driver Capacity Flow             | `C27` -> `C27-A` -> `C27-N` -> `C27-S`                             | [journey-c-1-c27a.png](android/journey-c-1-c27a.png)<br/>[journey-c-2-c27n.png](android/journey-c-2-c27n.png)<br/>[journey-c-3-c27s-later.png](android/journey-c-3-c27s-later.png)       | VERIFIED · 100% PASS |
| **Journey D** | Terms Consent Acknowledgment Flow            | `C28` -> Click consent checkbox -> `C28-C`                         | [journey-d-1-c28-unconsented.png](android/journey-d-1-c28-unconsented.png)<br/>[journey-d-2-c28c-accepted.png](android/journey-d-2-c28c-accepted.png)                                    | VERIFIED · 100% PASS |
| **Journey E** | Review Terms Again Navigation Flow           | `C28-C` -> Click "Review terms again" -> `C28`                     | [journey-e-1-c28-reviewed.png](android/journey-e-1-c28-reviewed.png)                                                                                                                     | VERIFIED · 100% PASS |
| **Journey F** | Secure Payment Future Boundary Notice        | `C28-C` -> Click "Continue to secure payment" -> C29 Notice Banner | [journey-f-1-c29-notice.png](android/journey-f-1-c29-notice.png)                                                                                                                         | VERIFIED · 100% PASS |
| **Journey G** | Fee-Free Cancellation Future Boundary Notice | `C27-N` -> Click "Cancel without fee" -> C27-X Notice Banner       | [journey-g-1-c27x-notice.png](android/journey-g-1-c27x-notice.png)                                                                                                                       | VERIFIED · 100% PASS |

---

## 3. Physical Device Inspection Notes

- **Contrast & Legibility:** Checked on Realme Note 60 outdoor display mode. High-contrast typography (`#F6F8F6`) over surface dark backgrounds (`#080B0B`, `#151A19`) is legible and clear.
- **Touch Targets:** All primary buttons are sized at 52 px height with minimum 12 px padding, satisfying accessibility standards.
- **Safe Area Insets:** Tested on real Android status bar (64 px inset) and gesture navigation bar (96 px inset); content never collides with system UI.
