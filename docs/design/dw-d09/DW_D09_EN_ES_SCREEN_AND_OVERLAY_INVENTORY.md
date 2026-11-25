# HAULIX Driver/Worker Mobile App — Phase DW-D09

## English & Spanish Screen and Overlay Inventory

**Phase Reference:** DW-D09  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Scope:** 13 Canonical States / 26 Bilingual Core Frames + 3 Supporting Overlays / 6 Bilingual Frames = 32 Total Frames

---

### 1. Bilingual Screen & Overlay Master Inventory

| State ID | Screen Name | English Node ID | Spanish Node ID | Dimensions | Active Tab / Context | Key Interactions / Hotspots | Screenshot Reference |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **DW27** | Driver profile | `1086:840` | `1088:1169` | 430 × 932 | Active Profile | Links to DW36 (Personal Info), DW38 (Vehicle/Docs), DW39 (Availability), DW40 (Payouts), DW32 (Security) | `dw27-driver-profile-en-1086-840.png`<br>`dw27-driver-profile-es-1088-1169.png` |
| **DW28** | My jobs | `1086:911` | `1088:1240` | 430 × 932 | Jobs | Rows link to DW22 (Completed), DW12 (Expired), DW11 (Details) | `dw28-my-jobs-en-1086-911.png`<br>`dw28-my-jobs-es-1088-1240.png` |
| **DW29** | Help & support | `1086:962` | `1088:1291` | 430 × 932 | Profile | Rows link to DW45 (Contact Support), DW26 (Payments), DW33 (Verification) | `dw29-help-support-en-1086-962.png`<br>`dw29-help-support-es-1088-1291.png` |
| **DW30** | Notifications | `1086:1009` | `1088:1338` | 430 × 932 | Messages | Alert feed linking to DW11 (Offer), DW15 (Invite), DW05 (Verification), DW26 (Payout) | `dw30-notifications-en-1086-1009.png`<br>`dw30-notifications-es-1088-1338.png` |
| **DW32** | Language & security | `1086:1108` | `1088:1437` | 430 × 932 | Profile | Locale picker (EN ↔ ES), Links to DW41 (Password) and OV-03 (2FA) | `dw32-language-security-en-1086-1108.png`<br>`dw32-language-security-es-1088-1437.png` |
| **DW36** | Personal information | `1270:428` | `1270:1379` | 430 × 932 | Active Profile | Driver legal name, phone, address, tax W-9 SSN/EIN inputs | `dw36-personal-information-en-1270-428.png`<br>`dw36-personal-information-es-1270-1379.png` |
| **DW37** | Photo & contact | `1270:550` | `1270:1501` | 430 × 932 | Active Profile | Avatar preview, Tap photo ➔ OV-01, Emergency contact inputs | `dw37-photo-contact-en-1270-550.png`<br>`dw37-photo-contact-es-1270-1501.png` |
| **DW41** | Change password | `1270:1047` | `1270:1998` | 430 × 932 | Active Profile | Current pw, new pw, confirm pw fields, submit button | `dw41-change-password-en-1270-1047.png`<br>`dw41-change-password-es-1270-1998.png` |
| **DW42** | Notification settings | `1270:1154` | `1270:2105` | 430 × 932 | Active Profile | Toggles for Job offers, Messages, Earnings, System alerts | `dw42-notification-settings-en-1270-1154.png`<br>`dw42-notification-settings-es-1270-2105.png` |
| **DW45** | Contact support | `1301:662` | `1301:1904` | 430 × 932 | Active Profile | Category dropdown, Job ID, description textarea, Submit ➔ DW46 | `dw45-contact-support-en-1301-662.png`<br>`dw45-contact-support-es-1301-1904.png` |
| **DW46** | Request received | `1301:754` | `1301:1996` | 430 × 932 | Active Profile | Ticket confirmation badge, Back CTA ➔ DW29 | `dw46-request-received-en-1301-754.png`<br>`dw46-request-received-es-1301-1996.png` |
| **DW55** | Helper profile | `1301:1534` | `1301:2776` | 430 × 932 | Active Profile | Helper-specific hub: DW57 (Personal Info), DW56 (Identity), DW39, DW40, DW32 | `dw55-helper-profile-en-1301-1534.png`<br>`dw55-helper-profile-es-1301-2776.png` |
| **DW57** | Helper personal information | `1302:696` | `1302:787` | 430 × 932 | Active Profile | Helper legal name, phone, address, tax W-9 SSN/ITIN inputs | `dw57-helper-personal-info-en-1302-696.png`<br>`dw57-helper-personal-info-es-1302-787.png` |
| **OV-01** | Profile photo upload | `1281:519` | `1282:518` | 430 × 352 / 377 | Modal Sheet | Camera selfie, photo library picker, dismiss sheet | `ov01-profile-photo-en-1281-519.png`<br>`ov01-profile-photo-es-1282-518.png` |
| **OV-03** | Security verification | `1282:549` | `1282:559` | 430 × 280 | Modal Sheet | 2FA challenge / Biometric verification dialog | `ov03-security-preview-en-1282-549.png`<br>`ov03-security-preview-es-1282-559.png` |
| **OV-04** | Emergency assistance | `1286:532` | `1286:543` | 430 × 275 | Modal Sheet | Dial 911, Call HAULIX Safety line, Share GPS | `ov04-emergency-contact-en-1286-532.png`<br>`ov04-emergency-contact-es-1286-543.png` |
