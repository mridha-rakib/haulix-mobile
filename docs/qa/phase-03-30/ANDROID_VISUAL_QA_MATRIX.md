# HAULIX Phase 03.30 — Android Visual QA & Hardware Audit Matrix

**Batch:** Phase 03.30  
**Flow:** W03 — AI Uncertainty, Inventory Verification & Manual Recovery  
**Device:** Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB` / Android 15 / Resolution: 720 × 1600 px / 320 dpi)  
**Metro Bundler:** Expo Go on port 8085 (reverse mapped via `adb reverse tcp:8085 tcp:8085`)  
**Execution Date:** November 19, 2026  
**Auditor:** Antigravity AI Agent  
**Verification Status:** **100% COMPLETE & VERIFIED ON PHYSICAL HARDWARE**

---

## 1. Hardware Connection & Recovery Diagnosis

The physical Android handset was diagnosed, restored, and authorized:

1. **Host USB & Driver Layer:** Verified WinUSB device driver bound to interface `MI_00` (Hardware ID `USB\VID_22D9&PID_2769&REV_0504&MI_00`).
2. **Persistent ADB Daemon:** Started persistent daemon listening on port 5037 (`adb nodaemon server`). Physical device handshake confirmed: `0B04731X200003BB device`.
3. **Metro Tunneling & Reverse Proxy:** Configured reverse socket forwarding (`adb reverse tcp:8085 tcp:8085`).
4. **Target Execution Environment:** Live bundle compiled and executed in Expo Go (`host.exp.exponent`) with 1,943 JavaScript modules.

---

## 2. Authoritative Figma vs. Physical Android Screen Matrix (8 Localized Versions)

All 8 localized screen variants were tested, exercised, and captured directly from the physical Realme Note 60 handset.

| Variant      | Screen Code | Language | Figma Node ID | Figma Dimensions | Physical Android Capture (Initial)                   | Physical Android Capture (Scrolled)                                    | Verification Notes                                                                                       |
| :----------- | :---------- | :------- | :------------ | :--------------- | :--------------------------------------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| **C22-Q EN** | C22-Q       | English  | `412:515`     | 430 × 959 px     | [`c22q-en-android.png`](android/c22q-en-android.png) | [`c22q-en-scrolled-android.png`](android/c22q-en-scrolled-android.png) | PASS: 102×74 px mattress photo, warning notice card, guidance paragraphs, correct `#BAFF42` primary CTA  |
| **C22-Q ES** | C22-Q       | Spanish  | `987:10309`   | 430 × 959 px     | [`c22q-es-android.png`](android/c22q-es-android.png) | [`c22q-es-scrolled-android.png`](android/c22q-es-scrolled-android.png) | PASS: Full Spanish copy parity ("Necesitamos revisar más de cerca", "Colchones · superpuestos")          |
| **C23 EN**   | C23         | English  | `412:563`     | 430 × 1229 px    | [`c23-en-android.png`](android/c23-en-android.png)   | [`c23-en-scrolled-android.png`](android/c23-en-scrolled-android.png)   | PASS: 3 comparison rows (Sofa, Mattresses ×2 mismatch, Table), required correction notice, 3 action CTAs |
| **C23 ES**   | C23         | Spanish  | `987:10367`   | 430 × 1229 px    | [`c23-es-android.png`](android/c23-es-android.png)   | [`c23-es-scrolled-android.png`](android/c23-es-scrolled-android.png)   | PASS: Full Spanish copy parity ("Revisar todos los objetos reconocidos", "Datos del cliente ×2")         |
| **C23-M EN** | C23-M       | English  | `412:748`     | 430 × 1171 px    | [`c23m-en-android.png`](android/c23m-en-android.png) | [`c23m-en-scrolled-android.png`](android/c23m-en-scrolled-android.png) | PASS: 4 manual record cards (Sofa, Mattresses ×2, Table, Evidence), confidence notice, 2 action CTAs     |
| **C23-M ES** | C23-M       | Spanish  | `987:10581`   | 430 × 1171 px    | [`c23m-es-android.png`](android/c23m-es-android.png) | [`c23m-es-scrolled-android.png`](android/c23m-es-scrolled-android.png) | PASS: Full Spanish copy parity ("Confirmar objetos sin IA", "Registro manual guardado")                  |
| **C23-U EN** | C23-U       | English  | `412:803`     | 430 × 1246 px    | [`c23u-en-android.png`](android/c23u-en-android.png) | [`c23u-en-scrolled-android.png`](android/c23u-en-scrolled-android.png) | PASS: 5 detail rows (Item, Quantity 2, Weight, Exact measurement unavailable, Lifting), quote notice     |
| **C23-U ES** | C23-U       | Spanish  | `987:10646`   | 430 × 1246 px    | [`c23u-es-android.png`](android/c23u-es-android.png) | [`c23u-es-scrolled-android.png`](android/c23u-es-scrolled-android.png) | PASS: Full Spanish copy parity ("Necesitamos medidas más precisas", "Detalles que requieren atención")   |

---

## 3. Physical Hardware Interaction & Navigation Verification

In addition to static captures, live physical gestures, hardware key events, and inter-screen route transitions were exercised on the device:

1. **CTA Forward Navigation (C22-Q → C23):**
   - User tapped primary CTA on C22-Q (`input tap 360 1100`).
   - App smoothly navigated to `/verify-suggested-inventory` (C23).
   - Captured evidence: [`c22q-to-c23-android.png`](android/c22q-to-c23-android.png).
2. **Android Hardware Back Press:**
   - Dispatched Android hardware back event (`input keyevent KEYCODE_BACK`).
   - App reliably popped top route and returned to C22-Q without visual glitches or unhandled rejection errors.
   - Captured evidence: [`c22q-back-nav-android.png`](android/c22q-back-nav-android.png).
3. **Touch Scrolling Parity:**
   - Swipe gestures (`input swipe 360 1200 360 400 300`) verified continuous vertical scrolling across all 4 screens.
   - Safe areas, header back pin, and bottom CTA touch targets remain accessible and responsive under Android 15 gesture navigation.

---

## 4. UI Token & Invariant Compliance

- **Container Geometry:** 360 dp viewport (720 physical pixels), `paddingHorizontal: 22`, vertical layout gap `17 px`.
- **Card Styling:** `colors.surface` (`#151A19`), `borderRadius: 17`, padding `18 px`.
- **Elevated Rows:** `colors.elevated` (`#222827`), `borderRadius: 10` or `11`, padding `9-12 px`.
- **Feedback Notice Boxes:** Border `1 px solid #35403B`, radius `12 px`, info SVG icon 23 × 23 px.
- **Action Buttons:** Primary CTA height `52 px`, radius `12 px`, bg `colors.brand` (`#BAFF42`), text `colors.background` (`#080B0B`). Secondary CTA height `56 px`, radius `12 px`, border `1 px solid #35403B`, text `colors.brand`.
- **Mattress Quantity Invariant:** Preserved customer quantity = 2 queen mattresses across C22-Q, C23, C23-M, and C23-U. AI suggestions never overwrite customer intake data.
