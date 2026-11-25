# Customer App APK Installation and Launch Evidence

**Phase:** Phase 03.69  
**Application:** `apps/customer` (`com.haulix.customer`)  
**Target Hardware:** Realme Note 60 (RMX3933 / RMX3930), Android 15  
**ADB Serial:** `0B04731X200003BB`

---

## 1. Physical Device Connection Verification

```bash
adb devices -l
```

### Output:
```text
List of devices attached
0B04731X200003BB       device product:RMX3930 model:RMX3930 device:RE6054 transport_id:1
```

---

## 2. Device Package Inspection (`dumpsys package`)

```bash
adb -s 0B04731X200003BB shell dumpsys package com.haulix.customer
```

### Recorded Output:
```text
Package [com.haulix.customer] (32a8e3f):
  userId=10243
  pkg=Package{8e803ac com.haulix.customer}
  codePath=/data/app/~~8L6w1x89.../com.haulix.customer-1
  resourcePath=/data/app/~~8L6w1x89.../com.haulix.customer-1
  versionCode=1 minSdk=24 targetSdk=36
  versionName=1.0.0
  firstInstallTime=2026-11-13 10:50:02
  lastUpdateTime=2026-11-22 13:40:25
  signatures=PackageSignatures{...}
```

---

## 3. Standalone APK Sideload & Acceptance Status

- **Status:** **BLOCKED AT BUILD STAGE**
- **Evidence:** EAS Cloud build quota exhausted on account `rakib_androids` (resets Dec 01, 2026).
- **Integrity Rule Compliance:** In accordance with Section 10 and Section 19 of the project directives, physical ADB connection and historical installation timestamps are **not** misrepresented as evidence of a newly built standalone APK. The previous preview package remains safely installed on the device, while current source code (`942c869de6726b9f277abcd1776728b228f7b2e4`) is verified via Expo development runtime and automated test suites.
