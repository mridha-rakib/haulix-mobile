# HAULIX Driver & Worker Mobile App

# Frontend Technical Architecture & Routing Specification

**Application:** `apps/driver`  
**Android Package:** `com.haulix.driver`  
**Design Reference:** Page `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Design Tokens:** `@haulix/design-tokens` (Figma token set `Q946h4YBGgyLsjnPtdyQNe`)  
**Styling Engine:** NativeWind 4.2.7 (Tailwind CSS preset with token mappings)  
**Framework:** Expo SDK 58.0.23, React Native 0.88.1, Expo Router 58.0.30  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width

---

## 1. Directory Tree & Route Hierarchy

```
apps/driver/
├── app.json                                 # Expo configuration (Package: com.haulix.driver)
├── app/
│   ├── _layout.tsx                          # Root layout (QueryClientProvider, SafeAreaProvider, ErrorBoundary)
│   ├── (auth)/                              # Unauthenticated flows (NO bottom navigation)
│   │   ├── _layout.tsx                      # Stack layout for auth screens
│   │   ├── index.tsx                        # DW01 Welcome / Splash
│   │   ├── role-select.tsx                  # DW02 Role Intake (Driver vs Helper)
│   │   ├── phone.tsx                        # DW03 Phone Entry
│   │   ├── otp.tsx                          # DW04 OTP Verification
│   │   ├── login.tsx                        # DW43 Existing Account Login
│   │   ├── forgot-password.tsx              # DW44 Forgot Password
│   │   └── onboarding/
│   │       ├── driver-identity.tsx          # DW58 Driver Identity / SSN
│   │       ├── helper-identity.tsx          # DW59 Helper Identity / SSN
│   │       ├── driver-background.tsx        # DW60 Driver Background Check Disclosure
│   │       ├── helper-background.tsx        # DW61 Helper Background Check Disclosure
│   │       └── reset-sent.tsx               # DW66 Password Reset Email Sent
│   │
│   ├── (app)/                               # Authenticated root (Session validated via useAuthStore)
│   │   ├── _layout.tsx                      # Authenticated shell layout & role guard
│   │   ├── (tabs)/                          # 5-Tab Navigation Layout
│   │   │   ├── _layout.tsx                  # Tab navigator with custom bottom tab bar
│   │   │   ├── index.tsx                    # Tab 1: Home (Dynamically renders DW09 Driver or DW31 Helper)
│   │   │   ├── jobs.tsx                     # Tab 2: Job Offers / Dispatch Matching (DW10, DW11, DW12)
│   │   │   ├── active.tsx                   # Tab 3: Active Job / Live Dispatch (DW17, DW19, DW21, DW62, DW63, DW64)
│   │   │   ├── earnings.tsx                 # Tab 4: Earnings Overview (DW23, DW24, DW25, DW26, DW54, DW67, DW68)
│   │   │   └── profile.tsx                  # Tab 5: Profile & Settings (DW27 Driver, DW55 Helper)
│   │   │
│   │   ├── (driver)/                        # Driver-isolated routes
│   │   │   ├── vehicle-registration.tsx     # DW05 Vehicle Registration
│   │   │   ├── vehicle-insurance.tsx        # DW06 Vehicle Insurance
│   │   │   ├── driver-license.tsx           # DW07 Driver License
│   │   │   ├── driver-pending.tsx           # DW08 Driver Documents Under Review
│   │   │   ├── invite-helper.tsx            # DW13 Invite a Helper
│   │   │   ├── helper-invitations.tsx       # DW14 Manage Helper Invitations
│   │   │   ├── crew-readiness.tsx           # DW16 Crew Readiness Confirmation
│   │   │   └── scope-additions.tsx          # DW51, DW52 Additional Work Requests
│   │   │
│   │   ├── (helper)/                        # Helper-isolated routes
│   │   │   ├── helper-id-upload.tsx         # DW56 Helper ID & Verification
│   │   │   ├── helper-pending.tsx           # DW33 Helper Application Under Review
│   │   │   ├── review-invitation.tsx        # DW15 Review Driver Dispatch Invitation
│   │   │   ├── invitation-expired.tsx       # DW48 Dispatch Invitation Expired
│   │   │   ├── invitation-declined.tsx      # DW49 Dispatch Invitation Declined
│   │   │   ├── helper-work-proof.tsx        # DW64 Helper Work Evidence Submission
│   │   │   └── helper-work-complete.tsx     # DW65 Helper Work Completed
│   │   │
│   │   └── (shared)/                        # Shared modal, operational & setting routes
│   │       ├── transit-chat.tsx             # DW18 In-Transit Crew & Customer Messaging
│   │       ├── active-inventory.tsx         # DW20 Active Item Checklist
│   │       ├── completion-evidence.tsx      # DW21 Multi-angle Photo Proof
│   │       ├── job-completed.tsx            # DW22 Job Completed Summary
│   │       ├── payout-history.tsx           # DW35 Historical Disbursements
│   │       ├── payout-account.tsx           # DW40 Payout Account Settings
│   │       ├── personal-info.tsx            # DW36 Personal Information
│   │       ├── photo-contact.tsx            # DW37 Photo & Contact Details
│   │       ├── vehicle-documents.tsx        # DW38 Documents Repository
│   │       ├── availability.tsx             # DW39 Availability & Shift Settings
│   │       ├── change-password.tsx          # DW41 Security Credentials
│   │       ├── notification-settings.tsx    # DW42 Push Preferences
│   │       ├── support.tsx                  # DW29 Help & Support Home
│   │       ├── ticket-list.tsx              # DW45 Support Ticket History
│   │       ├── ticket-detail.tsx            # DW46 Support Ticket Chat
│   │       ├── network-recovery.tsx         # DW34, DW50 Connection Loss & GPS Error
│   │       └── overlays/                    # Supporting Prototype Overlay Sheets
│   │           ├── photo-modal.tsx          # OV-01
│   │           ├── payout-modal.tsx         # OV-02
│   │           ├── security-modal.tsx       # OV-03
│   │           ├── emergency-sheet.tsx      # OV-04
│   │           ├── availability-sheet.tsx   # OV-05
│   │           ├── call-modal.tsx           # OV-06
│   │           └── location-sheet.tsx       # OV-07
│   │
│   └── +not-found.tsx                       # Fallback 404 handler
```

---

## 2. Shared Navigation Tab Bar Architecture

1. **Canvas Anchor:** Master Frame `1084:26` (`Driver / Bottom Navigation · Five Tabs`), Icon Set `1314:320`.
2. **Tab Roles & Invariants:**
   - Tab 1: **Home** (Icon `1314:286`, Active `1314:288` `#BAFF42`). Routes to `DW09` for Driver or `DW31` for Helper.
   - Tab 2: **Jobs** (Icon `1314:290`, Active `1314:292` `#BAFF42`). Displays available job offers or invitations.
   - Tab 3: **Active** (Icon `1314:294`, Active `1314:296` `#BAFF42`). Dynamic operational hub (routing, transit, completion).
   - Tab 4: **Earnings** (Icon `1314:298`, Active `1314:300` `#BAFF42`). Wallet balance, cash out, transaction ledger.
   - Tab 5: **Profile** (Icon `1314:302`, Active `1314:304` `#BAFF42`). Settings, verification, documents, safety.
3. **Role-Aware Navigation Guards:**
   - Primary Drivers and Helpers share Tab 4 (Earnings), Tab 2 (Jobs/Offers), and Tab 3 (Active Job), but Tab 1 (Home) and Tab 5 (Profile) adapt their card layouts and document links to the worker's authenticated role claims (`user.role === 'PRIMARY_DRIVER' ? DW09 : DW31`).

---

## 3. Styling Engine & Token Invariants

- **Tokens Source:** `@haulix/design-tokens`
- **NativeWind Preset:** Configure `tailwind.config.js` to extend colors from `@haulix/design-tokens/tailwind-preset`:
  - `bg-surface` (`#151A19`)
  - `bg-elevated` (`#1E2523`)
  - `text-brand` / `text-accent` (`#BAFF42` Lime)
  - `border-elevated` (`#2B3532`)
  - `text-secondary` (`#8E9E99`)
- **Strict Rule:** Never hardcode arbitrary hex colors (e.g. `bg-[#151A19]`). Always use NativeWind utility classes or token imports.
- **Viewport Resilience:** All screens designed for 430px canvas must scale gracefully to 360dp width (Realme Note 60) using flexible flexbox layouts, `px-4`, and auto-wrapping text.
