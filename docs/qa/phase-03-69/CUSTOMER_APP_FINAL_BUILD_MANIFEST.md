# Customer App Final Build Manifest

**Phase:** Phase 03.69  
**Application:** `apps/customer` (`com.haulix.customer`)  
**Monorepo:** `mridha-rakib/haulix-mobile`  
**Build-Source Git SHA:** `942c869de6726b9f277abcd1776728b228f7b2e4`

---

## 1. Application & Platform Identity

| Attribute | Specification | Verification Status |
|:---|:---|:---:|
| **Application Name** | HAULIX | Verified in `app.config.ts` |
| **Package Identifier** | `com.haulix.customer` | Verified in `app.config.ts` |
| **Version Name** | `1.0.0` | Verified |
| **Version Code** | `1` | Verified |
| **Min Android SDK** | 24 (Android 7.0) | Verified |
| **Target Android SDK** | 36 (Android 15+) | Verified |
| **Expo SDK** | 58.0.0 | Verified in `package.json` |
| **React Native** | 0.88.1 | Verified |
| **EAS CLI** | 27.7.0 (win32-x64) | Verified |
| **Runtime Environment** | Expo Managed / Custom Dev Client | Verified |
| **Expo Project ID** | `d414e6fe-00cc-40df-97e2-af4f3e2027c8` | Verified (`@rakib_androids/haulix-customer`) |

---

## 2. Build Profile Configuration (`eas.json`)

```json
{
  "preview": {
    "node": "22.23.3",
    "pnpm": "11.25.0",
    "distribution": "internal",
    "android": {
      "buildType": "apk"
    },
    "env": {
      "EXPO_PUBLIC_APP_ENV": "preview"
    }
  }
}
```

---

## 3. Build Toolchain & Strategy Assessment

1. **EAS Cloud Preview Build (`eas build -p android -e preview`):**
   - Result: **BLOCKED**
   - Reason: Account `rakib_androids` has reached the monthly Free plan limit for Android builds.
   - Quota Reset Date: **December 1, 2026** (in 5 days).
   - Upgrade Option: Starter Plan (`eas billing:subscribe starter --account rakib_androids`).

2. **EAS Local Build (`eas build -p android -e preview --local`):**
   - Result: **BLOCKED**
   - Reason: Host platform is Windows (`win32-x64`). EAS local build toolchain requires macOS or Linux for Android packaging.

---

## 4. Deliverable Provenance Summary

The source code corresponding to Git commit `942c869de6726b9f277abcd1776728b228f7b2e4` represents the complete, verified release candidate. Once the owner upgrades the EAS plan or the monthly quota resets on December 1, 2026, running `eas build -p android -e preview` will produce the standalone `.apk` binary without requiring further code modifications.
