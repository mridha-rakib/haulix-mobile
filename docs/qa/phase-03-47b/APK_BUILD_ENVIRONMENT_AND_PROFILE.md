# HAULIX Customer Mobile App — Phase 03.47B
## APK Build Environment & Profile Specification

**Document ID:** `HAULIX-QA-P03.47B-001`  
**Phase:** 03.47B  
**Target:** Standalone Android APK (`com.haulix.customer`)  
**EAS Account:** `@rakib_androids`  
**EAS Project:** `haulix-customer` (ID: `d414e6fe-00cc-40df-97e2-af4f3e2027c8`)  
**Build Profile:** `client-demo`  
**Distribution:** Internal (Direct APK Download)  
**Target Device:** Realme Note 60 (`RMX3930`), Android 15, Screen 720 × 1600 px  
**ADB Serial:** `0B04731X200003BB`

---

### 1. Build Profile Configuration

The client demonstration build profile is configured in `apps/customer/eas.json` and mirrored in the monorepo root `eas.json` to guarantee exact compilation:

```json
{
  "build": {
    "client-demo": {
      "developmentClient": false,
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      },
      "env": {
        "EXPO_PUBLIC_APP_ENV": "demo",
        "EXPO_PUBLIC_ENABLE_QA_NAVIGATOR": "true"
      }
    }
  }
}
```

#### Key Profile Directives:
- `developmentClient: false`: Compiles standalone production-mode Hermes bundle with offline assets; does not include Expo dev launcher or Metro client.
- `android.buildType: "apk"`: Instructs EAS cloud builder to output a standalone `.apk` package instead of an Android App Bundle (`.aab`) suitable for direct sideloading and ADB physical device testing.
- `EXPO_PUBLIC_APP_ENV: "demo"`: Informs app code of client demonstration mode without triggering public production security guardrails.
- `EXPO_PUBLIC_ENABLE_QA_NAVIGATOR: "true"`: Explicitly preserves `DemoScreenNavigator` in standalone release builds so reviewers and developers can jump directly to any implemented screen.

---

### 2. Native Toolchain & Credentials

| Component | Specification |
|---|---|
| **Expo SDK** | `58.0.0` |
| **React Native** | `0.79.x` (Hermes Engine Enabled) |
| **Android Min SDK** | `24` (Android 7.0+) |
| **Android Target SDK** | `34` (Android 14/15) |
| **Android Keystore** | Expo Cloud Remote Keystore (`hNKsh88etw`) |
| **Package ID** | `com.haulix.customer` |
| **Version Code** | `1` |
| **Version Name** | `1.0.0` |
| **Custom URL Scheme** | `haulix-customer://` |

---

### 3. Hermes Compilation & Asset Embedding

In standalone APK builds, Metro is completely detached:
1. All TypeScript and TSX components are compiled and bundled into bytecode via Hermes compiler (`index.android.bundle`).
2. All static images, vector assets, and map graphics (including `map-s10-searching.png` through `map-s50-searching.png`) are bundled into `assets/` and `res/drawable*` directories inside the APK.
3. Font files (`PlusJakartaSans`, `SpaceMono`) are packaged in `assets/fonts/` and registered with the Android FontManager.
4. Deep linking scheme `haulix-customer://` is registered in `AndroidManifest.xml` with `<intent-filter>` for `android.intent.action.VIEW`.

---

### 4. Build Environment Verification Signoff

- **Build Host:** EAS Cloud (Ubuntu 22.04 LTS runner, OpenJDK 17, Android SDK Command-line Tools)
- **Local Host:** Windows 11 Pro, JDK 17.0.20, Android SDK Tools installed
- **Physical Device:** Realme Note 60 (`RMX3930`), Android 15 (`API 35`), connected via ADB
- **Acceptance Status:** **PASSED / VERIFIED**
