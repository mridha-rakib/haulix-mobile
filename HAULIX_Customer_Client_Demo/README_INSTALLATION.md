# HAULIX Customer App — Client Demo Installation Guide

**Build Version:** 1.0.0 (Build 1)  
**Package Name:** `com.haulix.customer`  
**Target Environment:** Client Demo / Frontend Preview  
**Expo SDK:** 58 (React Native 0.76+, Expo Router v4)  
**Build Profile:** `client-demo` (Standalone Internal APK)

---

## 1. Quick Installation Methods

### Option A: Direct Installation via USB Debugging (Recommended for Developers & QA)

1. Connect your Android phone to your PC via USB cable.
2. Ensure **USB Debugging** is enabled in `Settings > Developer Options`.
3. Open a terminal / command prompt in this folder and run:

   ```bash
   adb install -r HAULIX_Customer_Demo.apk
   ```
4. Once installation displays `Success`, launch **HAULIX** from your app drawer.

---

### Option B: Direct Installation on Phone (Over-The-Air / Sideloading)

1. Transfer `HAULIX_Customer_Demo.apk` to your phone via Google Drive, WhatsApp, Slack, USB, or direct download link.
2. Tap the downloaded `.apk` file on your phone.
3. If prompted with _"For your security, your phone is not allowed to install unknown apps from this source"_:
   - Tap **Settings** in the dialog.
   - Toggle **Allow from this source** to ON.
   - Return to the installer and tap **Install**.
4. If Android Play Protect shows a verification warning (_"Unrecognized app"_):
   - Tap **More details**.
   - Tap **Install anyway** (standard for internal QA builds signed with development/internal keys).
5. Tap **Open** to launch the HAULIX Customer App.

---

## 2. Navigating the Demo Screens

This standalone APK includes a dedicated **Floating QA Navigation Menu** (`[ QA Screens ]`) available at the top-right of every screen, allowing immediate 1-tap switching between all implemented frontend states without requiring authentication credentials:

| Button Label                    | Screen Code | Description                                                                                |
| ------------------------------- | ----------- | ------------------------------------------------------------------------------------------ |
| **C06 · Sign In (EN)**          | `C06`       | Email Sign-in with live validation & Spanish switch (Figma Node `331:2`)                   |
| **C06 · Iniciar Sesión (ES)**   | `C06 (ES)`  | Spanish localized Sign-in screen (Figma Node `347:2`)                                      |
| **C07 · Create Account (EN)**   | `C07`       | Create Account with real-time requirements (Figma Node `331:39`)                           |
| **C07 · Crear Cuenta (ES)**     | `C07 (ES)`  | Spanish localized registration screen (Figma Node `347:90`)                                |
| **C08 · OTP Verification (EN)** | `C08`       | 6-digit OTP verification with countdown timer (Figma Node `331:75`)                        |
| **C08 · Verificación OTP (ES)** | `C08 (ES)`  | Spanish localized OTP verification screen (Figma Node `347:179`)                           |
| **C09 · Social Return (EN)**    | `C09`       | Social sign-in return preview · Sarah Mitchell (Figma Node `331:118`)                      |
| **C09 · Retorno Social (ES)**   | `C09 (ES)`  | Spanish social return preview · Bryan Lopez (Figma Node `347:283`)                         |
| **C10 · Account Overview (EN)** | `C10`       | Full account overview with interactive profile photo & sculpted nav (Figma Node `331:162`) |

---

## 3. Natural In-App User Journey

You can also experience the natural flow through the app without using the quick switcher:

1. **C06 Sign In:**
   - Tap _"Use a one-time phone code"_ to transition smoothly to **C08 Phone Verification**.
   - Tap _"Español"_ / _"English"_ at the bottom to switch language instantly.
   - Tap _"Create account"_ to transition to **C07**.
2. **C07 Create Account:**
   - Fill in demo fields (e.g. `John Doe`, `john@example.com`, password with 8+ chars and 1 number).
   - Tap _"Create Account"_ to automatically progress to **C08 Phone Verification**.
3. **C08 Phone Verification:**
   - Enter any 6 digits (e.g. `123456`) in the OTP boxes.
   - Tap _"Verify & Continue"_ to seamlessly enter **C10 Account Overview**.
4. **C10 Account Overview:**
   - Tap **"Profile photo · Add / change / remove"** to open the native bottom sheet.
   - Test **Take photo** or **Choose from gallery** (complete with 1:1 square cropping tool).
   - Notice the persistent avatar updates immediately across app restarts!
   - Tap **"Remove photo"** to revert to the default `SM` monogram badge.
   - Test the custom sculpted center action button (`+`) and bottom tab navigation.
   - Tap **Sign out** or the header Back button to return to C06.

---

## 4. Hardware & System Compatibility

- **Supported OS:** Android 8.0 (Oreo / API 26) through Android 15 (Vanilla Ice Cream / API 35).
- **Architecture:** Universal APK (`arm64-v8a`, `armeabi-v7a`, `x86_64`).
- **Screen Sizes:** Optimized for 360dp, 375dp, 390dp, 412dp, and 430dp standard viewports.
- **Edge-to-Edge:** Full native edge-to-edge rendering with zero dead strips above system navigation bars.
