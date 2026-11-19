# HAULIX Phase 03.29 — Android Visual QA Matrix

**Device Model:** Realme Note 60 (`RMX3930` / `0B04731X200003BB`)  
**Operating System:** Android 15 (API 35)  
**Display:** 720 × 1600 px (~260 dpi)
**Bundler:** Metro Dev Server on port 8085 via ADB reverse port forwarding  
**Date:** November 19, 2026  
**Status:** **100% VERIFIED ON PHYSICAL HARDWARE**

---

## 1. Physical Verification Matrix (24 Real Device Screenshots)

| Screen Code | Variant & Node        | Overview Capture       | Scrolled Capture       | Notice / Action Capture |                        Visual & Functional Compliance                         |
| :---------- | :-------------------- | :--------------------- | :--------------------- | :---------------------- | :---------------------------------------------------------------------------: |
| **C22-D**   | Spanish (`987:10084`) | `c22d-es-overview.png` | `c22d-es-scrolled.png` | `c22d-es-notice.png`    |    **PASS** — Authentic photos, quantity mismatch card, Bryan Lopez ledger    |
| **C22-D**   | English (`412:328`)   | `c22d-en-overview.png` | `c22d-en-scrolled.png` | `c22d-en-notice.png`    |  **PASS** — 3 items, mattress customerQty=2 preserved, Sarah Mitchell ledger  |
| **C22-F**   | Spanish (`987:10154`) | `c22f-es-overview.png` | `c22f-es-scrolled.png` | `c22f-es-notice.png`    | **PASS** — Service unavailable red card, "4 adjuntos" summary, retry preview  |
| **C22-F**   | English (`412:388`)   | `c22f-en-overview.png` | `c22f-en-scrolled.png` | `c22f-en-notice.png`    | **PASS** — Error border, "4 attachments", no quote published, manual details  |
| **C22-O**   | Spanish (`987:10209`) | `c22o-es-overview.png` | `c22o-es-scrolled.png` | `c22o-es-notice.png`    |    **PASS** — Red offline icon, retained draft disclosure, safe try again     |
| **C22-O**   | English (`412:433`)   | `c22o-en-overview.png` | `c22o-en-scrolled.png` | `c22o-en-notice.png`    |      **PASS** — No network card, draft preserved, simulated retry notice      |
| **C22-E**   | Spanish (`987:10259`) | `c22e-es-overview.png` | `c22e-es-scrolled.png` | `c22e-es-notice.png`    | **PASS** — No uploaded photos card, non-fabrication disclosure, review photos |
| **C22-E**   | English (`412:474`)   | `c22e-en-overview.png` | `c22e-en-scrolled.png` | `c22e-en-notice.png`    |  **PASS** — Neutral info card, customer details intact, manual confirmation   |

---

## 2. Key Screen Observations & Figma Parity

### C22-D: AI Suggested Items / Quantity Mismatch

- **Authentic Photos:** Renders all three genuine intake photos (`c18j-sofa.png`, `c18j-mattresses.png`, `c18j-table.png`) at 90 × 74 px with 8px radius.
- **Quantity Non-Fabrication:** The customer-entered mattress quantity of 2 is preserved. The AI suggestion of 1 is clearly labeled as an unconfirmed mismatch requiring customer correction.
- **Header Pinning:** `FlowHeaderBack` stays securely anchored at the top of the screen during scrolling.

### C22-F: Recognition Failed / Preserved Draft

- **Error Tone:** Features `#F36D6D` border and red SVG indicator without crashing or resetting state.
- **Draft Preservation:** Preserves all 4 attachments and active customer draft; clearly states that no booking or payment has been created.
- **Spanish Translation Correction:** Correctly renders `4 adjuntos` rather than the unlocalized English string `4 attachments`.

### C22-O: Offline Recovery

- **Truthful Disclosure:** Clearly discloses that this is a simulated offline recovery state rather than fabricating live hardware network disconnections.
- **Safe Recovery:** "Try again" safely re-verifies navigation back to AI recognition. "Review manual inventory" presents an honest upcoming C23-M notice.

### C22-E: Missing Photo Evidence

- **Zero Photo Non-Fabrication:** Confirms zero photos in empty media state; explicitly states that no visual measurements will be fabricated from absent images.
- **Navigation:** Primary CTA smoothly returns to intake photo management; secondary CTA links to manual detail entry.

---

## 3. Hardware Test Environment

- **Device:** Realme Note 60 (`RMX3930`)
- **Android Version:** Android 15 (API 35)
- **Screen Resolution:** 720 × 1600 px (320 dpi density bucket)
- **Port Forwarding:** `tcp:8085 -> tcp:8085`, `tcp:8081 -> tcp:8085`
- **Expo Version:** Expo SDK 58 runtime inside Expo Go
