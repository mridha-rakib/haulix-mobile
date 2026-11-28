# HAULIX Driver/Worker — DW-FINAL Navigation & Interaction Matrix

**Milestone:** DW-FINAL Consolidated Frontend QA & Release Verification  
**Date:** November 28, 2026  
**Reference Hardware:** Realme Note 60 (`0B04731X200003BB`), Android 15  
**Architecture:** Expo Router v4 (Typed Routes, Zero Route Guards, Frontend Mock Mode)  

---

## 1. Master Tab Bar Navigation (Figma 1084:26)

The root tab navigator is located at `apps/driver/app/(app)/(tabs)/_layout.tsx`.
It provides persistent bottom navigation for all authenticated application routes with dynamic role switching:

| Tab | Tab Name | Route | Driver View | Helper View | Badge / Indicator | Figma Nodes |
|---|---|---|---|---|---|---|
| **1** | Home | `/(app)/(tabs)` | DW09 (Operational Home, Active Offers, Rating) | DW31 (Helper Home, Crew Invitations) | Active Green Dot when ONLINE | `1084:26`, `1085:388`, `1086:1049` |
| **2** | Jobs | `/(app)/(tabs)/jobs` | DW10 (Job Offers Listing) | DW28 (Job History) | Available Offers Count | `1084:26`, `1085:470` |
| **3** | Earnings | `/(app)/(tabs)/earnings` | DW23 (Driver Available Balance & Recent Jobs) | DW23 (Helper Allocated Earnings Share) | Payout Ready Indicator | `1084:26`, `1086:714` |
| **4** | Messages | `/(app)/(tabs)/messages` | DW16 (Dispatch & Active Job Chat) | DW16 (Dispatch & Driver Crew Chat) | Unread Messages Badge | `1084:26`, `1085:810` |
| **5** | Profile | `/(app)/(tabs)/profile` | DW27 (Driver Profile, Docs, Vehicle) | DW55 (Helper Profile, Qualifications) | Verification Status Pill | `1084:26`, `1086:840` |

---

## 2. Supporting Overlays Activation & Dismissal Matrix

All 7 supporting overlays (14 bilingual variants) are accessible directly via query parameters or modal triggers:

| Overlay ID | Figma (EN / ES) | Purpose & Content | Trigger Parameter | Component File | Dismissal Action | Status |
|---|---|---|---|---|---|---|
| **OV01** | `1281:519` / `1282:518` | Profile Photo Update (Camera, Gallery, Remove) | `overlay=ov01` | `ProfilePhotoOverlay.tsx` | Tap backdrop or Cancel button | **PASS** |
| **OV02** | `1282:529` / `1282:539` | Update Payout Method (Bank account vs Debit card) | `overlay=ov02` | `PayoutMethodOverlay.tsx` | Tap backdrop or Close (X) | **PASS** |
| **OV03** | `1282:549` / `1282:559` | Account Protection (Device binding, 2FA, Security lock) | `overlay=ov03` | `SecurityShieldOverlay.tsx` | Tap 'Got it' or backdrop | **PASS** |
| **OV04** | `1286:532` / `1286:543` | Emergency Contact Review (Jamie Johnson, +1 415 555-0144) | `overlay=ov04` | `EmergencyContactOverlay.tsx` | Tap 'Close' or backdrop (zero dialing) | **PASS** |
| **OV05** | `1286:554` / `1286:568` | Availability Preferences (Hours, Radius, Shift) | `overlay=ov05` | `AvailabilityPreferencesOverlay.tsx` | Tap 'Save Preferences' or backdrop | **PASS** |
| **OV06** | `1305:706` / `1305:716` | Telephony Disclosure (Masked phone call preview) | `modal=call` | `NativeCallPreviewOverlay.tsx` | Full-width Close button (zero external call) | **PASS** |
| **OV07** | `1305:726` / `1305:735` | Location Permission Sheet (GPS rationale & grant preview) | `modal=location` | `LocationPermissionOverlay.tsx` | Full-width Dismiss button | **PASS** |

---

## 3. Canonical Screen Controls & Route Interaction Matrix (68 Canonical Screens)

| Screen ID | Screen Title | Canonical Route | Entry Point | Primary Interactive Controls | Back Behavior | Supporting Overlays | Status |
|---|---|---|---|---|---|---|---|
| **DW01** | Welcome | `/(auth)/welcome` | APP_LAUNCH | Get started -> DW02<br/>Sign in -> DW03<br/>Language toggle | EXIT_APP | None | **PASS** |
| **DW02** | Create your account | `/(auth)/register` | DW01 | Select Driver -> DW58<br/>Select Helper -> DW59<br/>Sign in -> DW03 | NAVIGATE_BACK | None | **PASS** |
| **DW03** | Sign in | `/(auth)/sign-in` | DW01, DW02 | Email/Password login<br/>Phone login -> DW61<br/>Forgot password -> DW43 | NAVIGATE_BACK | None | **PASS** |
| **DW04** | Phone verification | `/(auth)/verify-phone` | DW58, DW59 | Submit 6-digit OTP -> DW05/DW06<br/>Resend code -> DW66 | NAVIGATE_BACK | None | **PASS** |
| **DW05** | Driver verification | `/(auth)/driver-verification` | DW04, DW30 | Review requirements -> DW07<br/>Switch to Helper -> DW06 | NAVIGATE_BACK | None | **PASS** |
| **DW06** | Helper verification | `/(auth)/helper-verification` | DW04, DW05 | Upload ID & Selfie -> DW08<br/>Switch to Driver -> DW02 | NAVIGATE_BACK | None | **PASS** |
| **DW07** | Driver documents | `/(auth)/driver-documents` | DW05, DW33, DW38 | Upload DL, Reg, Insurance -> DW08 | NAVIGATE_BACK | None | **PASS** |
| **DW08** | Verification status | `/(auth)/verification-status` | DW06, DW07 | Driver Demo -> DW09<br/>Helper Demo -> DW31 | NAVIGATE_BACK | None | **PASS** |
| **DW09** | Driver dashboard | `/(driver)/dashboard` | AUTH_SUCCESS, NAV_HOME | Toggle Go Online<br/>View active dispatch<br/>Adjust radius -> OV-05 | EXIT_APP | OV-05 | **PASS** |
| **DW10** | Job offers | `/(driver)/offers` | DW09, NAV_JOBS, DW30 | View Offer Details -> DW11<br/>Decline Offer<br/>Timer Expiration -> DW12 | NAVIGATE_BACK | None | **PASS** |
| **DW11** | Job details | `/(driver)/offers/[id]` | DW10, DW28, DW30 | Accept Offer -> DW13/DW17<br/>Decline Offer -> DW10 | NAVIGATE_BACK | None | **PASS** |
| **DW12** | Offer unavailable | `/(driver)/offers/[id]/expired` | DW10, DW28 | Return to Dashboard -> DW09 | NAVIGATE_BACK | None | **PASS** |
| **DW13** | Invite a Helper | `/(driver)/crew/invite` | DW11 | Search Helper -> DW48<br/>Send Invite -> DW49<br/>Proceed Solo -> DW17 | NAVIGATE_BACK | None | **PASS** |
| **DW14** | Helper invitations | `/(helper)/invitations` | DW31, DW30 | Review Invitation -> DW15<br/>Decline Invitation | EXIT_APP | None | **PASS** |
| **DW15** | Review invitation | `/(helper)/invitations/[id]` | DW14, DW30 | Accept Crew Invite -> DW16<br/>Decline Invite -> DW14 | NAVIGATE_BACK | None | **PASS** |
| **DW16** | Crew readiness | `/(shared)/crew/readiness` | DW13, DW15 | Mutual Readiness Confirm -> DW17/DW62 | NAVIGATE_BACK | None | **PASS** |
| **DW17** | Active job | `/(driver)/active-job` | DW16, DW09 | Turn-by-turn navigation<br/>Message Crew/Customer -> DW18<br/>Confirm Arrival -> DW19<br/>Emergency -> OV-04 | CONFIRM_EXIT | OV-04, OV-07 | **PASS** |
| **DW18** | Job messages | `/(shared)/messages/[id]` | DW17, DW19, DW62, DW63, NAV_MESSAGES | Send Text Message<br/>Call -> OV-06<br/>Message Status -> DW47 | NAVIGATE_BACK | OV-06 | **PASS** |
| **DW19** | On-site job progress | `/(driver)/on-site` | DW17 | Complete Milestones<br/>Propose Extra Work -> DW20<br/>Proceed to Evidence -> DW21 | CONFIRM_EXIT | OV-04 | **PASS** |
| **DW20** | Additional work approval | `/(driver)/on-site/extra-work` | DW19 | Select Extra Items<br/>Submit Approval Request -> DW51 | NAVIGATE_BACK | None | **PASS** |
| **DW21** | Completion evidence | `/(driver)/completion/evidence` | DW19 | Capture Photo 1 & 2<br/>Submit Delivery Proof -> DW22 | NAVIGATE_BACK | None | **PASS** |
| **DW22** | Job completed | `/(shared)/completion/summary` | DW21, DW28 | View Earnings Breakdown -> DW24<br/>Return to Home -> DW09/DW31 | NAVIGATE_BACK | None | **PASS** |
| **DW23** | Earnings overview | `/(shared)/earnings` | NAV_EARNINGS, DW22, DW26 | Cash Out Now -> DW25<br/>View Details -> DW24 | EXIT_APP | None | **PASS** |
| **DW24** | Worker earnings detail | `/(shared)/earnings/details` | DW23 | Itemized Subtotal Breakdown<br/>100% Tip Share<br/>Payout History -> DW35 | NAVIGATE_BACK | None | **PASS** |
| **DW25** | Instant Cash Out | `/(shared)/earnings/cash-out` | DW23 | Select Instant -> DW68<br/>Select Standard -> DW67 | NAVIGATE_BACK | OV-02 | **PASS** |
| **DW26** | Cash Out status | `/(shared)/earnings/cash-out/status` | DW67, DW68, DW30 | Return Home -> DW09<br/>View History -> DW35 | NAVIGATE_BACK | None | **PASS** |
| **DW27** | Profile & Documents | `/(driver)/profile` | NAV_PROFILE, DW09 | Personal Info -> DW36<br/>Vehicle/Docs -> DW38<br/>Availability -> DW39<br/>Payout -> DW40<br/>Security -> DW32 | EXIT_APP | None | **PASS** |
| **DW28** | My jobs | `/(shared)/jobs/history` | NAV_JOBS, DW27, DW55 | Filter Completed/Cancelled<br/>Trip Receipt -> DW22<br/>Offer Details -> DW11 | EXIT_APP | None | **PASS** |
| **DW29** | Help & support | `/(shared)/support` | DW27, DW55 | Report Job Issue -> DW45<br/>Payment Help -> DW26/DW35<br/>Verification Help -> DW33<br/>Contact Support -> DW45 | NAVIGATE_BACK | None | **PASS** |
| **DW30** | Notifications | `/(shared)/notifications` | DW27, DW55 | Offer Alert -> DW11<br/>Crew Alert -> DW15<br/>Verification Alert -> DW05<br/>Payout Alert -> DW26 | NAVIGATE_BACK | None | **PASS** |
| **DW31** | Helper dashboard | `/(helper)/dashboard` | AUTH_SUCCESS, NAV_HOME | Toggle Helper Availability<br/>View Pending Invites -> DW14 | EXIT_APP | OV-05 | **PASS** |
| **DW32** | Language & security | `/(shared)/settings/security` | DW27, DW55 | Language Switcher (EN/ES)<br/>Change Password -> DW41<br/>2FA Preview -> OV-03 | NAVIGATE_BACK | OV-03 | **PASS** |
| **DW33** | Verification needs action | `/(auth)/verification-action` | DW08, DW29 | Resubmit Driver Docs -> DW07<br/>Resubmit Helper Identity -> DW06/DW56 | NAVIGATE_BACK | None | **PASS** |
| **DW34** | Connection interrupted | `/(shared)/network/offline` | SYSTEM_NETWORK_DROP | Retry Connection<br/>Offline Queue Status | NAVIGATE_BACK | OV-07 | **PASS** |
| **DW35** | Payout history | `/(shared)/earnings/payouts` | DW23, DW24, DW26 | View Past Payouts<br/>Failed Payout -> DW54<br/>Export Statement | NAVIGATE_BACK | None | **PASS** |
| **DW36** | Personal information | `/(driver)/profile/personal` | DW27 | Edit Name, Email, Phone, Address<br/>Save Changes | NAVIGATE_BACK | None | **PASS** |
| **DW37** | Photo & contact | `/(driver)/profile/contact` | DW27 | Change Photo -> OV-01<br/>Update Emergency Contact -> OV-04 | NAVIGATE_BACK | OV-01, OV-04 | **PASS** |
| **DW38** | Documents & vehicle | `/(driver)/profile/vehicle-docs` | DW27 | View License, Reg, Insurance Status<br/>Upload Renewal -> DW07 | NAVIGATE_BACK | None | **PASS** |
| **DW39** | Availability settings | `/(shared)/settings/availability` | DW27, DW55, DW09, DW31 | Set Operating Days/Hours<br/>Adjust Radius (10-50 mi) -> OV-05 | NAVIGATE_BACK | OV-05 | **PASS** |
| **DW40** | Payout account | `/(shared)/settings/payout-account` | DW27, DW55, DW23 | View Bank Account & Debit Card<br/>Change Payout Method -> OV-02 | NAVIGATE_BACK | OV-02 | **PASS** |
| **DW41** | Change password | `/(shared)/settings/password` | DW32 | Submit Current & New Password | NAVIGATE_BACK | None | **PASS** |
| **DW42** | Notification settings | `/(shared)/settings/notifications` | DW27, DW55 | Toggle Push, SMS, Email Channels | NAVIGATE_BACK | None | **PASS** |
| **DW43** | Password recovery | `/(auth)/forgot-password` | DW03 | Submit Email -> DW44 | NAVIGATE_BACK | None | **PASS** |
| **DW44** | Reset confirmation | `/(auth)/reset-confirmation` | DW43 | Check Inbox notice<br/>Return to Sign In -> DW03 | NAVIGATE_BACK | None | **PASS** |
| **DW45** | Contact support | `/(shared)/support/contact` | DW29 | Select Category, Describe Issue<br/>Submit Ticket -> DW46 | NAVIGATE_BACK | None | **PASS** |
| **DW46** | Request received | `/(shared)/support/confirmation` | DW45 | View Ticket ID Badge<br/>Return to Support -> DW29 | NAVIGATE_BACK | None | **PASS** |
| **DW47** | Message status | `/(shared)/messages/[id]/status` | DW18 | Inspect Delivery & Read Receipts<br/>Retry Send | NAVIGATE_BACK | None | **PASS** |
| **DW48** | Choose a Helper | `/(driver)/crew/choose-helper` | DW13 | Search Helper by Name/Proximity<br/>Select Helper -> DW49 | NAVIGATE_BACK | None | **PASS** |
| **DW49** | Invitation pending | `/(driver)/crew/invitation-pending` | DW13, DW48 | Response Countdown Timer<br/>Cancel Invitation | NAVIGATE_BACK | None | **PASS** |
| **DW50** | Location & connection | `/(shared)/network/location-connection` | SYSTEM_GPS_ERROR, DW17 | System Location Permission Retry -> OV-07 | NAVIGATE_BACK | OV-07 | **PASS** |
| **DW51** | Extra work pending | `/(shared)/service/extra-work-pending` | DW20 | Dual Admin/Customer Approval Status<br/>Cancel Extra Work | NAVIGATE_BACK | None | **PASS** |
| **DW52** | Extra work approved | `/(shared)/service/extra-work-approved` | DW51 | Confirmed Revised Scope Notice<br/>Proceed Service -> DW19/DW63 | NAVIGATE_BACK | None | **PASS** |
| **DW53** | Extra work declined | `/(shared)/service/extra-work-declined` | DW51 | Declined Scope Notice<br/>Resume Original Scope -> DW19/DW63 | NAVIGATE_BACK | None | **PASS** |
| **DW54** | Payout failed | `/(shared)/earnings/payout-failed` | DW35, DW26 | Update Payout Method -> DW40/OV-02<br/>Contact Support -> DW45<br/>Return to Earnings -> DW23 | NAVIGATE_BACK | OV-02 | **PASS** |
| **DW55** | Helper profile | `/(helper)/profile` | NAV_PROFILE, DW31 | Helper Personal Info -> DW57<br/>Helper Docs -> DW56<br/>Availability -> DW39<br/>Payout -> DW40<br/>Security -> DW32 | EXIT_APP | None | **PASS** |
| **DW56** | Helper eligibility & docs | `/(helper)/profile/documents` | DW55, DW08 | View Gov ID, Selfie, Background Status<br/>Re-upload -> DW06 | NAVIGATE_BACK | None | **PASS** |
| **DW57** | Helper personal information | `/(helper)/profile/personal` | DW55 | Edit Helper Name, Email, Phone, Address<br/>Save Changes | NAVIGATE_BACK | None | **PASS** |
| **DW58** | Driver account details | `/(auth)/driver-register` | DW02 | Submit Name, Email, Phone, Password -> DW04 | NAVIGATE_BACK | None | **PASS** |
| **DW59** | Helper account details | `/(auth)/helper-register` | DW02 | Submit Name, Email, Phone, Password -> DW04 | NAVIGATE_BACK | None | **PASS** |
| **DW60** | Helper phone verification | `/(auth)/helper-verify-phone` | DW59 | Submit 6-digit OTP -> DW06<br/>Resend Code -> DW66 | NAVIGATE_BACK | None | **PASS** |
| **DW61** | Phone sign-in verification | `/(auth)/phone-sign-in` | DW03 | Submit Phone OTP -> Dashboard | NAVIGATE_BACK | None | **PASS** |
| **DW62** | Helper active job | `/(helper)/active-job` | DW16, DW31 | View Transit Route / ETA<br/>Chat Crew -> DW18<br/>Confirm Arrival -> DW63<br/>Emergency -> OV-04 | CONFIRM_EXIT | OV-04 | **PASS** |
| **DW63** | Helper on-site progress | `/(helper)/on-site` | DW62 | Labor Task Checklist<br/>Safety Rules Acknowledgment<br/>Submit Work -> DW64 | CONFIRM_EXIT | OV-04 | **PASS** |
| **DW64** | Helper work evidence | `/(helper)/completion/evidence` | DW63 | Capture Labor Task Photo<br/>Submit Evidence -> DW65 | NAVIGATE_BACK | None | **PASS** |
| **DW65** | Helper work submitted | `/(helper)/completion/summary` | DW64 | View Helper Share Notice<br/>Return to Home -> DW31 | NAVIGATE_BACK | None | **PASS** |
| **DW66** | Verification code issue | `/(auth)/code-help` | DW04, DW60 | SMS Resend<br/>Automated Voice Call<br/>Edit Phone Number | NAVIGATE_BACK | None | **PASS** |
| **DW67** | Standard bank Cash Out | `/(shared)/earnings/cash-out/standard` | DW25 | Review ACH Transfer Terms<br/>Confirm Transfer -> DW26 | NAVIGATE_BACK | None | **PASS** |
| **DW68** | Instant fee & payout review | `/(shared)/earnings/cash-out/instant` | DW25 | Review Quoted Fee & Net Payout<br/>Confirm Instant Transfer -> DW26 | NAVIGATE_BACK | None | **PASS** |

---

## 4. Navigation Integrity Verification

- **Zero Route Guards:** All 68 canonical screens and 7 overlays are accessible in standalone frontend mock preview.
- **No Dead Ends:** Every screen features an explicit back button, close button, or bottom navigation tab bar.
- **Hardware Back Handler:** Physical Android back button cleanly navigates to the preceding screen or dismisses active modals.
- **Clean State Reset:** The floating demo navigator and settings menus offer one-tap state resets to `DW01` without persistent side effects.
