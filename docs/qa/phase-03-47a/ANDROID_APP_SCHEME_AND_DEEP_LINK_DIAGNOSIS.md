# Phase 03.47A Android App Scheme & Deep Link Diagnosis

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/ANDROID_APP_SCHEME_AND_DEEP_LINK_DIAGNOSIS.md`  
**DEVICE:** Realme Note 60 (`RMX3930`), Android 15  
**STATUS:** DIAGNOSED & FULLY DOCUMENTED

---

## 1. URI Schemes in the HAULIX Customer Architecture

The application defines and supports two distinct deep-link environments:

1. **Custom Scheme (Production / Standalone Build):**
   - Scheme: `haulix-customer://`
   - Manifest: Defined in `app.json` (`"scheme": "haulix-customer"`).
   - Format: `haulix-customer:///<route>?<params>`
   - Target: `com.haulix.customer` (when compiled as a development client or release APK).

2. **Expo Packager Scheme (Expo Go Development Runtime):**
   - Scheme: `exp://`
   - Authority: `127.0.0.1:8085` (via ADB reverse socket)
   - Route Separator: `/--/`
   - Format: `exp://127.0.0.1:8085/--/<route>?<params>`
   - Target: `host.exp.exponent`

---

## 2. Deep-Link Invocation Diagnostic Matrix

| Intent Command                                                                                                                | Target Package        | Outcome                         | Explanation                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `am start -a android.intent.action.VIEW -d "haulix-customer://search-expanded-20mi" com.haulix.customer`                      | `com.haulix.customer` | **FAILED (Unmatched Route)**    | Launches stale release APK installed on device (Nov 13 build) where W05 routes do not exist.                                 |
| `am start -a android.intent.action.VIEW -d "haulix-customer://search-expanded-20mi" host.exp.exponent`                        | `host.exp.exponent`   | **FAILED (Activity Not Found)** | Expo Go does not register the custom scheme `haulix-customer://` in its Android manifest intent filters.                     |
| `am start -a android.intent.action.VIEW -d "exp://127.0.0.1:8085/search-expanded-20mi" host.exp.exponent`                     | `host.exp.exponent`   | **FAILED (Packager 404)**       | Missing the `/--/` separator causes Metro packager to treat the path as a bundle asset request rather than an app route.     |
| `am start -a android.intent.action.VIEW -d "exp://127.0.0.1:8085/--/search-expanded-20mi?previewLocale=en" host.exp.exponent` | `host.exp.exponent`   | **SUCCESS (100% UI Render)**    | Direct invocation of live Metro bundle; Expo Router maps `/--/search-expanded-20mi` cleanly to `(app)/search-expanded-20mi`. |

---

## 3. Recommended Automated Test Invocation Standard

For all future testing on physical Android devices using the live Metro connection:

```bash
# Set reverse socket forwarding
adb -s <SERIAL> reverse tcp:8085 tcp:8085

# Launch route with language preview
adb -s <SERIAL> shell am start -a android.intent.action.VIEW \
  -d "exp://127.0.0.1:8085/--/<ROUTE_NAME>?previewLocale=<en|es>" \
  host.exp.exponent
```
This guarantees that changes in the repository are immediately testable on physical hardware without requiring a full native APK re-compilation.
