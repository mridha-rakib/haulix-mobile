# HAULIX Driver/Worker Mobile App — Phase DW-D09

## Account Security, Credential Protection & Language Localization Specification

**Phase Reference:** DW-D09  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Core Screens:**
- `DW32 · Language & security` (EN `1086:1108`, ES `1088:1437`)
- `DW41 · Change password` (EN `1270:1047`, ES `1270:1998`)
- `OV-03 · Security preview / 2FA modal` (EN `1282:549`, ES `1282:559`)

---

### 1. Account Security Architecture

The HAULIX Driver/Worker platform enforces strict security controls to protect worker identity, banking credentials, and sensitive dispatch data:

#### 1.1 Password Policy & Change Flow (`DW41`)
- **Inputs:** Current Password, New Password, Confirm New Password.
- **Complexity Requirements:**
  - Minimum 8 characters.
  - At least 1 uppercase letter ($A–Z$).
  - At least 1 lowercase letter ($a–z$).
  - At least 1 numerical digit ($0–9$).
  - At least 1 special character (`!@#$%^&*`).
- **Security Validation:**
  - Password inputs enforce `secureTextEntry` with show/hide eye toggle.
  - Rate limiting: Maximum 5 failed attempts within 15 minutes before temporary account cooldown.
  - On password modification: All other active session tokens (JWTs) are invalidated immediately across all devices except the current session.

#### 1.2 Two-Factor Authentication (2FA) & Sensitive Challenge (`OV-03`)
- **Node Identity:** EN `1282:549`, ES `1282:559` (430 × 280 px modal bottom sheet).
- **Triggering Events:**
  1. Updating Direct Deposit banking or debit card payout instruments (`DW40` / `OV-02`).
  2. Initiating Instant Cash Out exceeding `$500.00` (`DW25` / `DW68`).
  3. Modifying account email or mobile phone number.
- **Verification Rails:**
  - Option A: SMS One-Time Passcode (6-digit OTP delivered via Twilio Verify).
  - Option B: Biometric Challenge (Face ID / Touch ID / Android BiometricPrompt via `expo-local-authentication`).

---

### 2. Language Switching & Bilingual Architecture

#### 2.1 Canonical Bilingual Parity (`DW32`)
- **Supported Locales:**
  - English (`en-US`) — Canvas Section `1085:2`
  - Spanish (`es-US` / `es-419`) — Canvas Section `1088:2`
- **Locale Persistence:**
  - Stored locally via `AsyncStorage` / `@haulix/i18n` storage provider and synced to the worker's backend profile.
  - Immediate runtime re-render with zero application restart required.
- **Bilingual Terminology Standards:**
  - Profile ➔ Perfil
  - Security & Password ➔ Seguridad y contraseña
  - Change password ➔ Cambiar contraseña
  - Current password ➔ Contraseña actual
  - New password ➔ Nueva contraseña
  - Two-Factor Authentication ➔ Autenticación en dos pasos
  - Save changes ➔ Guardar cambios
