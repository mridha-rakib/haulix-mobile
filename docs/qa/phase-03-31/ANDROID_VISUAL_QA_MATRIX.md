# HAULIX Customer Mobile App — Phase 03.31

## Android Visual QA Matrix & Hardware Verification Report

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.31  
**Batch Scope:** 4 canonical screens × 2 languages (English & Spanish) = 8 localized versions  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Physical Device:** Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB` / Android 15 / Resolution: 720 × 1600 px / 320 dpi)  
**Metro Bundler:** Expo Go on port 8085 (reverse mapped via `adb reverse tcp:8085 tcp:8085`)  
**Execution Date:** November 19, 2026  
**Auditor:** Antigravity AI Agent  
**Verification Status:** **100% COMPLETE & VERIFIED ON PHYSICAL HARDWARE**

---

## 1. Hardware Connection & Recovery Diagnosis

1. **Host USB & Driver Layer:** Diagnosed physical Realme Note 60 hardware attached over USB (VID `22D9`, PID `2769`, Rev `0504`). Bound interface `MI_00` using WinUSB driver.
2. **Persistent ADB Daemon:** Started ADB server in non-daemon mode (`adb nodaemon server`). Physical device established persistent connection: `0B04731X200003BB device`.
3. **Metro Tunneling:** Configured `adb reverse tcp:8085 tcp:8085` and `adb reverse tcp:8081 tcp:8085`.
4. **Live Execution:** Loaded application bundle (1,943 modules) directly in Expo Go (`host.exp.exponent`).

---

## 2. Authoritative Figma References vs. Physical Android Screen Matrix

All 8 localized screen versions were tested, navigated, and captured directly on the physical Realme Note 60 device:

| Screen Variant   | Canonical Route               | Figma Node ID | Figma Dimensions | Physical Android Capture (Initial)                       | Physical Android Capture (Scrolled)                                        | Verification Status & Findings                                                                                                              |
| :--------------- | :---------------------------- | :------------ | :--------------- | :------------------------------------------------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **C23-C (EN)**   | `/correct-ai-items`           | `412:625`     | 430 × 1219 px    | [`c23c-en-android.png`](android/c23c-en-android.png)     | [`c23c-en-scrolled-android.png`](android/c23c-en-scrolled-android.png)     | PASS: Mattress count = 2 preserved, interactive increment controls, recalculation notice card, CTA buttons                                  |
| **C23-C (ES)**   | `/correct-ai-items`           | `987:10439`   | 430 × 1219 px    | [`c23c-es-android.png`](android/c23c-es-android.png)     | [`c23c-es-scrolled-android.png`](android/c23c-es-scrolled-android.png)     | PASS: Full Spanish copy parity ("Corregir detalles del objeto", "Colchón queen")                                                            |
| **C23-S (EN)**   | `/customer-confirmed-items`   | `412:683`     | 430 × 1319 px    | [`c23s-en-android.png`](android/c23s-en-android.png)     | [`c23s-en-scrolled-android.png`](android/c23s-en-scrolled-android.png)     | PASS: 3 confirmed items with authentic photos (`c18j-sofa.png`, `c18j-mattresses.png`, `c18j-table.png`), quotation inputs, feedback notice |
| **C23-S (ES)**   | `/customer-confirmed-items`   | `987:10506`   | 430 × 1319 px    | [`c23s-es-android.png`](android/c23s-es-android.png)     | [`c23s-es-scrolled-android.png`](android/c23s-es-scrolled-android.png)     | PASS: Full Spanish copy parity ("Tus objetos confirmados", "Datos de cotización registrados")                                               |
| **C23-R (EN)**   | `/rejected-ai-identification` | `412:861`     | 430 × 950 px     | [`c23r-en-android.png`](android/c23r-en-android.png)     | [`c23r-en-scrolled-android.png`](android/c23r-en-scrolled-android.png)     | PASS: Single item rejection card (`c18j-mattresses.png`), customer count 2 vs AI suggestion 1, audit preservation notice                    |
| **C23-R (ES)**   | `/rejected-ai-identification` | `987:10714`   | 430 × 950 px     | [`c23r-es-android.png`](android/c23r-es-android.png)     | [`c23r-es-scrolled-android.png`](android/c23r-es-scrolled-android.png)     | PASS: Full Spanish copy parity ("Una sugerencia de IA parece incorrecta", "Mantener los objetos validados del cliente")                     |
| **C24-ADM (EN)** | `/admin-review-pending`       | `412:1006`    | 430 × 1008 px    | [`c24adm-en-android.png`](android/c24adm-en-android.png) | [`c24adm-en-scrolled-android.png`](android/c24adm-en-scrolled-android.png) | PASS: Review case details, amber warning notice, outcome option guidance, honest prototype notice                                           |
| **C24-ADM (ES)** | `/admin-review-pending`       | `987:10887`   | 430 × 1008 px    | [`c24adm-es-android.png`](android/c24adm-es-android.png) | [`c24adm-es-scrolled-android.png`](android/c24adm-es-scrolled-android.png) | PASS: Full Spanish copy parity ("Revisión pendiente de tarifas", "Caso de revisión · ficticio")                                             |

---

## 3. Physical Hardware Interaction & Anti-Fabrication Verification

Specific interactive verification tests were conducted directly on the Realme Note 60 hardware:

1. **C23-C Explicit Corrections & State Preservation:**
   - Exercised interactive quantity stepper on Mattress item (`input tap` on `+` button).
   - Confirmed increment from 2 to 3 units, dynamic update of quantity badge, and recalculation advisory notice.
   - Captured evidence: [`c23c-plus-android.png`](android/c23c-plus-android.png).
2. **C23-S Customer Confirmation & Quote Processing Notice:**
   - Navigated from C23-C to C23-S (`c23s_from_c23c.png`).
   - Tapped primary CTA "Calculate Confirmed Quote".
   - Verified that the app displays the truthful prototype notice banner (`"Quotation calculations are processed by HAULIX backend pricing services. This prototype does not generate binding quote amounts."`) without fabricating mock prices.
   - Captured evidence: [`c23s_notice.png`](android/c23s_notice.png).
3. **C23-R Never Overwrites Customer Inventory:**
   - Inspected rejected AI identification view.
   - Customer's explicit intake count of 2 queen mattresses is displayed alongside the erroneous AI suggestion of 1 unit.
   - Tapped primary CTA "Correct count in review" (`input tap 360 1100`).
   - Verified safe transition to `/correct-ai-items` (C23-C) with inventory data intact.
   - Captured evidence: [`c23r-to-c23c-android.png`](android/c23r-to-c23c-android.png).
4. **C24-ADM Strictly Prohibits Fabricated Admin Approvals:**
   - Exercised primary CTA "Simulate Approved Example".
   - Verified that the app renders an explicit disclaimer banner: `"This is an intake prototype example. Official admin approval and dispatch authorization are handled by the HAULIX operations backend."`
   - Captured evidence: [`c24adm-notice-android.png`](android/c24adm-notice-android.png).
5. **Back Navigation & Hardware Key Parity:**
   - Dispatched hardware back key event (`input keyevent KEYCODE_BACK`) on C23-S.
   - App reliably popped back to C23-C without state corruption.
   - Captured evidence: [`c23c_via_back.png`](android/c23c_via_back.png).

---

## 4. Key Verification Invariants

1. **Strict Invariant: Mattress Quantity = 2:**
   - In C23-C, customer-confirmed inventory retains quantity = 2, with interactive controls allowing adjustments.
   - In C23-S, customer-confirmed items carries forward quantity = 2.
   - In C23-R, AI suggestion of 1 is clearly labeled incorrect, preserving customer's 2 units.
2. **Photography Integrity:**
   - C23-S displays 3 authentic photos (`c18j-sofa.png`, `c18j-mattresses.png`, `c18j-table.png`) at 90 × 74 px with 8px radius.
   - C23-R displays the authentic mattress photo (`c18j-mattresses.png`) at 90 × 74 px.
   - C23-C and C24-ADM strictly adhere to text field / case card layout without photo layers.
3. **No Fabricated Business Logic:**
   - Quotation calculations, Admin approvals, and Admin change requests display honest prototype disclaimer notices without mock calculation or approval bypass.
