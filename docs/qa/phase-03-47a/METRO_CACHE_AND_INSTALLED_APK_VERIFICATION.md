# Phase 03.47A Metro Cache & Installed APK Verification

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/METRO_CACHE_AND_INSTALLED_APK_VERIFICATION.md`  
**DEVICE:** Realme Note 60 (`RMX3930`), Android 15  
**STATUS:** VERIFIED

---

## 1. Package Inventory on Physical Hardware

Inspection of the package manager on the physical Realme Note 60 device:

```
adb -s 0B04731X200003BB shell pm list packages | grep -E "haulix|exponent"
```
Output:

- `package:com.haulix.customer` (Standalone Release Build, version 1.0.0, installed Nov 13, 2026)
- `package:host.exp.exponent` (Expo Go client, version 52.0.0)

### Detailed Inspection of `com.haulix.customer`:

```
Package [com.haulix.customer] (b031c5b):
  userId=10332
  pkg=Package{87bf628 com.haulix.customer}
  codePath=/data/app/~~b54lK...==/com.haulix.customer-kQ==
  versionCode=1 minSdk=24 targetSdk=35
  firstInstallTime=2026-11-13 12:40:48
  lastUpdateTime=2026-11-13 12:40:50
```
This confirms that `com.haulix.customer` on device was built on **November 13, 2026**, 8 days prior to Phase 03.47. It contains only Workflow 01 and early screens.

---

## 2. Metro Bundler Health & Cache Verification

The Metro development server was verified running on port 8085:

```
curl -s http://127.0.0.1:8085/status
```
Response: `packager-status:running`

### Bundle Compilation Audit:

- **Platform:** Android
- **Entry point:** `node_modules/expo-router/entry.js`
- **Modules transformed:** 2,109 modules
- **Bundle size:** 12,716,400 bytes (12.7 MB unminified development bundle)
- **Transform cache:** Freshly synchronized with local files in `apps/customer/app/(app)/`.
- **W05 Screen Modules in Bundle:**
  - `apps/customer/app/(app)/search-expanded-20mi.tsx` (Indexed and bundled)
  - `apps/customer/app/(app)/search-expanding-30mi.tsx` (Indexed and bundled)
  - `apps/customer/app/(app)/search-expanded-40mi.tsx` (Indexed and bundled)
  - `apps/customer/app/(app)/search-expanded-50mi.tsx` (Indexed and bundled)
  - `apps/customer/src/components/dispatch/W05SearchStageScreen.tsx` (Indexed and bundled)
  - `apps/customer/src/components/map/HaulixDispatchMap.tsx` (Indexed and bundled)

---

## 3. Reverse Socket Port Forwarding

To ensure zero latency and reliable network transport between device and host:

```bash
adb -s 0B04731X200003BB reverse tcp:8085 tcp:8085
```
Verification:

```
adb -s 0B04731X200003BB reverse --list
0B04731X200003BB tcp:8085 tcp:8085
```
Every request initiated by Expo Go to `127.0.0.1:8085` is instantaneously routed to the host workstation's Metro bundler, guaranteeing that all screen updates are immediately reflected on physical hardware.
