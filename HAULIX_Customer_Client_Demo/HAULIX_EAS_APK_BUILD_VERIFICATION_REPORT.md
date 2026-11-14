# HAULIX — Expo EAS APK Build Verification & Recovery Report

**Execution Date:** November 13, 2026  
**Target:** HAULIX Customer Mobile Application (`@haulix/customer`)  
**Repository:** `haulix-mobile` Turborepo monorepo  
**Verification Method:** EAS CLI Project Audit + Remote S3 Artifact Validation + Physical Android 15 Installation & Smoke Test

---

## 1. Executive Summary & Discrepancy Resolution

The reported EAS APK build `474570bb-2847-43ca-b4c7-adcc98b35130` **exists, is completely finished, and is actively hosted on EAS CDN**.

### Why the build was not visible on the default Expo dashboard:

1. **Account Context Mismatch (Personal vs Team):**  
   The authenticated user (`rmridha.diu@gmail.com`) owns two account contexts on Expo:
   - Personal Account: **`rakib_androids`**
   - Team Account: **`rakibandroidss-team`**  
     If your browser dashboard is currently viewing `rakibandroidss-team`, `@rakib_androids/haulix-customer` does not show up on that team's project list. Switching the top-left account dropdown to **`rakib_androids`** immediately reveals the project.
2. **Project Overview Filter (Production/Development vs Internal Builds):**  
   The build was created under profile `client-demo`, which uses `"distribution": "internal"` to generate an installable `.apk` rather than a Play Store `.aab`. On the main project overview page, EAS only renders status summaries for **"Production builds"** and **"Development builds"** (both correctly show "None"). To see internal APK builds, navigate to the **"Builds"** tab in the left sidebar.
3. **Direct Dashboard URL:**  
   Navigate directly to:  
   👉 **`https://expo.dev/accounts/rakib_androids/projects/haulix-customer/builds`**  
   👉 **`https://expo.dev/accounts/rakib_androids/projects/haulix-customer/builds/474570bb-2847-43ca-b4c7-adcc98b35130`**

---

## 2. Verified EAS Cloud Build & Artifact Metadata

All details were fetched directly from the live EAS service:

```bash
$ eas whoami
rakib_androids (rmridha.diu@gmail.com)
Accounts:
• rakib_androids (Role: Owner)
• rakibandroidss-team (Role: Owner)

$ eas project:info
fullName  @rakib_androids/haulix-customer
ID        d414e6fe-00cc-40df-97e2-af4f3e2027c8
```

| Parameter                        | Authoritative Value                                                                                                                                                                                                            |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Expo Account**                 | `rakib_androids` (`rmridha.diu@gmail.com`)                                                                                                                                                                                     |
| **Expo Project Full Name**       | `@rakib_androids/haulix-customer`                                                                                                                                                                                              |
| **Expo Project ID**              | `d414e6fe-00cc-40df-97e2-af4f3e2027c8`                                                                                                                                                                                         |
| **EAS Build ID**                 | `474570bb-2847-43ca-b4c7-adcc98b35130`                                                                                                                                                                                         |
| **Build Status**                 | `finished`                                                                                                                                                                                                                     |
| **Build Profile**                | `client-demo`                                                                                                                                                                                                                  |
| **Distribution Type**            | `internal`                                                                                                                                                                                                                     |
| **Platform**                     | `Android` (APK)                                                                                                                                                                                                                |
| **SDK Version**                  | `58.0.0`                                                                                                                                                                                                                       |
| **Application ID**               | `com.haulix.customer`                                                                                                                                                                                                          |
| **Version / Version Code**       | `1.0.0` / `1`                                                                                                                                                                                                                  |
| **Build Dashboard URL**          | [https://expo.dev/accounts/rakib_androids/projects/haulix-customer/builds/474570bb-2847-43ca-b4c7-adcc98b35130](https://expo.dev/accounts/rakib_androids/projects/haulix-customer/builds/474570bb-2847-43ca-b4c7-adcc98b35130) |
| **EAS Application Archive URL**  | [https://expo.dev/artifacts/eas/dW2cyB_buE6YQ_esvUMYekBuW3_8_UmCIygTm_UCwmQ.apk](https://expo.dev/artifacts/eas/dW2cyB_buE6YQ_esvUMYekBuW3_8_UmCIygTm_UCwmQ.apk)                                                               |
| **Artifact Filename**            | `application-474570bb-2847-43ca-b4c7-adcc98b35130.apk`                                                                                                                                                                         |
| **HTTP Status / Content-Length** | `HTTP 200 OK` · `100,722,135 bytes` (~96.05 MB)                                                                                                                                                                                |
| **Local File Location**          | `HAULIX_Customer_Client_Demo/HAULIX_Customer_Demo.apk`                                                                                                                                                                         |
| **Zipped Handoff Package**       | `HAULIX_Customer_Client_Demo.zip` (`47,292,980 bytes`)                                                                                                                                                                         |

---

## 3. Remote Artifact & Local File Verification

Direct HTTP header check of the public EAS download link confirmed the valid APK binary:

```http
HTTP/1.1 200 OK
Date: Fri, 13 Nov 2026 06:39:01 GMT
Content-Type: application/octet-stream
Content-Length: 100722135
Content-Disposition: attachment; filename="application-474570bb-2847-43ca-b4c7-adcc98b35130.apk"
ETag: "8520e2d02c47917c04df6020f8054774"
```

Inspection of internal APK archive entries:

- `AndroidManifest.xml` (Length: 13,868 bytes)
- `classes.dex` (Length: 6,364,780 bytes)
- `resources.arsc` (Length: 1,380,860 bytes)
- Target package: `com.haulix.customer`

---

## 4. Physical Android Hardware Verification

**Device Under Test:**

- Model: Realme Note 60 (RMX3930)
- Serial: `0B04731X200003BB`
- Operating System: Android 15 (API 35)
- Display Resolution: 720 × 1600 px (360dp, density 2.0)

### 4.1 Fresh Installation Test

```bash
$ adb install -r -d "c:\Users\rakib_bro\sta-projects\haulix\haulix-mobile\HAULIX_Customer_Client_Demo\HAULIX_Customer_Demo.apk"
Performing Streamed Install
Success
```

### 4.2 Application Launch & Verification

```bash
$ adb shell am start -n com.haulix.customer/.MainActivity -a android.intent.action.MAIN -c android.intent.category.LAUNCHER
Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=com.haulix.customer/.MainActivity }
```

### 4.3 Screen & Feature Verification Matrix

| Screen                        | Route / State                   | Verification Result                                                                                                        |
| :---------------------------- | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| **Screen Navigator**          | Floating `[ QA Screens ]` Modal | Instant 1-tap switching across all 9 screen states and languages without requiring mock credentials.                       |
| **C06 Email Sign-in (EN)**    | `/sign-in` (English)            | Verified dark palette `#080B0B`, Lime button `#BEF264`, show/hide password, and form validation.                           |
| **C06 Iniciar Sesión (ES)**   | `/sign-in` (Spanish)            | Verified Spanish translations matching Figma node `347:86`.                                                                |
| **C07 Create Account (EN)**   | `/create-account` (English)     | Verified 8+ character password rules, legal consent checkboxes, Phoenix badge.                                             |
| **C07 Crear Cuenta (ES)**     | `/create-account` (Spanish)     | Verified Spanish translations matching Figma node `347:130`.                                                               |
| **C08 Phone OTP (EN)**        | `/verify-phone` (English)       | Verified 6-digit OTP fields, automated keyboard focus, masked phone `+1 602-555-0142`.                                     |
| **C08 Verificación OTP (ES)** | `/verify-phone` (Spanish)       | Verified Spanish translations matching Figma node `347:179`.                                                               |
| **C09 Social Return (EN)**    | `/social-return` (English)      | Verified Sarah Mitchell card from Figma node `331:118` with **no extra avatar badge**.                                     |
| **C09 Retorno Social (ES)**   | `/social-return` (Spanish)      | Verified Bryan Lopez card from Figma node `347:283`.                                                                       |
| **C10 Account Overview**      | `/account` (English)            | Verified verified customer card, Arizona chip, active booking indicator.                                                   |
| **C10 Bottom Navbar**         | Custom SVG Concave Navbar       | Verified zero dead strip above Android system navigation bar; floating center circular `+` button in `#080B0B` footer.     |
| **C10 Profile Photo Sheet**   | Bottom Action Sheet             | Verified options: "Take photo", "Choose from gallery", "Cancel". Avatar persists locally across restarts via AsyncStorage. |

---

## 5. Configuration Updates Applied

1. **`apps/customer/eas.json`**:
   Added `"android": { "buildType": "apk" }` to the `preview` profile as well as `client-demo`, ensuring that running `eas build --platform android --profile preview` generates an installable `.apk` by default.
2. **`apps/customer/src/components/demo/DemoScreenNavigator.tsx`**:
   Normalized internal route paths to clean canonical URLs (`/sign-in`, `/create-account`, `/verify-phone`, `/social-return`, `/account`) using `router.replace()` for smooth one-tap switching during hardware testing.
3. **Static Analysis & Typecheck:**
   - 156 files checked via Biome with **0 errors and 0 warnings**.
   - All 7 workspaces passed strict TypeScript compilation (`turbo run typecheck`).
