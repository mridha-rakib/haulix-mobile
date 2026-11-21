# HAULIX Customer Mobile App — Phase 03.47B
## Standalone APK vs. Expo Go Runtime Differences

**Document ID:** `HAULIX-QA-P03.47B-003`  
**Phase:** 03.47B  
**Target:** Standalone Android APK (`com.haulix.customer`) vs Expo Go (`host.exp.exponent`)

---

### 1. Comparative Architecture Overview

| Architectural Dimension | Expo Go Sandbox (`host.exp.exponent`) | Standalone APK (`com.haulix.customer`) |
|---|---|---|
| **Host Application Package** | `host.exp.exponent` | `com.haulix.customer` |
| **JavaScript Execution Engine** | Dev Hermes / JSI Sandbox | Production Hermes Bytecode (`index.android.bundle`) |
| **Bundle Delivery** | Dynamic HTTP streaming from Metro (`http://192.168.x.x:8085`) | Pre-compiled embedded bytecode inside APK archive |
| **Network Dependence** | Mandatory continuous Wi-Fi/LAN connection to Metro host | **Zero network dependence** — 100% offline self-contained |
| **URL Scheme Routing** | `exp://192.168.x.x:8085/--/<route>` | Authentic custom scheme: `haulix-customer://<route>` |
| **Static Asset Resolution** | Dynamic asset server via Metro HTTP proxy | Native Android asset extraction from `res/drawable-*` & `assets/` |
| **Deep Link CLI Trigger** | `adb shell am start -d "exp://..." host.exp.exponent` | `adb shell am start -d "haulix-customer://<route>" com.haulix.customer` |
| **Process Lifecycle** | Controlled by Expo Go sandbox activity | Native Android application lifecycle (`.MainActivity`) |
| **Splash & App Icon** | Expo Go generic splash & icon | Authentic HAULIX dark brand icon & splash screen |

---

### 2. Standalone Verification Methodology

To definitively prove that the test execution is running in the true standalone APK and not via Expo Go:

1. **Metro Server Termination:**  
   The background Metro bundler task is terminated (`pnpm exec expo start` stopped).
2. **Expo Go Process Killed:**  
   `adb shell am force-stop host.exp.exponent` is executed.
3. **Native Activity Launch:**  
   `adb shell am start -n com.haulix.customer/.MainActivity -a android.intent.action.MAIN -c android.intent.category.LAUNCHER`
4. **Focused Window Inspection:**  
   `adb shell "dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'"` is inspected to confirm:
   `mCurrentFocus=Window{... u0 com.haulix.customer/com.haulix.customer.MainActivity}`

---

### 3. Custom Scheme Universal Deep-Linking

Under Expo Go, routes were nested under an Expo URL wrapper. In the standalone APK, Expo Router registers `haulix-customer://` directly into Android's intent resolver.

All routes can be entered directly from ADB:
```bash
# Example S20 Search Stage in English
adb shell am start -a android.intent.action.VIEW -d "haulix-customer:///search-expanded-20mi?previewLocale=en" com.haulix.customer

# Example S50 Search Stage in Spanish
adb shell am start -a android.intent.action.VIEW -d "haulix-customer:///search-expanded-50mi?previewLocale=es" com.haulix.customer
```

---

### 4. Conclusion

The standalone APK eliminates all fragility associated with Metro caching, local Wi-Fi routing, network drops, or Expo Go development client discrepancies. It delivers the authentic user experience matching production store builds.
