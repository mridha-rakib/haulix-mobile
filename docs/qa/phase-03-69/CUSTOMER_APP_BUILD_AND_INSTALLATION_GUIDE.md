# Customer App Build & Installation Guide

**Phase:** Phase 03.69  
**Application:** `apps/customer` (`com.haulix.customer`)  
**Package:** `apps/customer`

---

## 1. Prerequisites

- **Node.js:** >= 20.x (Recommended: v22.x or v24.x)
- **Package Manager:** pnpm 10.x / 11.x
- **EAS CLI:** `npm install -g eas-cli` (v27.x+)
- **Android Device / Emulator:** Android 7.0+ (Tested: Realme Note 60, Android 15, 360dp)
- **ADB:** Android SDK Platform-Tools installed and added to system PATH

---

## 2. Generating Standalone Android Preview APK via EAS Cloud

Once the monthly quota resets on December 1, 2026 (or after subscribing to EAS Starter Plan):

```bash
# 1. Navigate to customer app directory
cd apps/customer

# 2. Authenticate with Expo (if not logged in)
eas login

# 3. Trigger EAS Android Preview build
eas build --platform android --profile preview

# 4. Once build finishes, download the .apk artifact from the generated Expo URL
```

---

## 3. Sideloading APK to Physical Android Device via ADB

```bash
# 1. Connect target device with USB debugging enabled
adb devices -l

# 2. Sideload and install the downloaded APK
adb -s 0B04731X200003BB install -r <path-to-downloaded-apk>.apk

# 3. Verify installation
adb -s 0B04731X200003BB shell dumpsys package com.haulix.customer | Select-String "versionName|lastUpdateTime"

# 4. Launch application independently
adb -s 0B04731X200003BB shell am start -n com.haulix.customer/.MainActivity
```

---

## 4. Running Application in Local Development Mode

To run and explore the application immediately without waiting for standalone APK packaging:

```bash
# 1. From repository root
pnpm install

# 2. Start Expo development server for Customer App
cd apps/customer
pnpm start

# 3. Press 'a' in terminal or launch custom dev client on connected Android device
```
