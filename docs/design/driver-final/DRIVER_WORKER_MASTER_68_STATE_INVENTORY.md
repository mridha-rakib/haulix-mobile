# HAULIX Driver & Worker Mobile App
# Authoritative Master 68-State Canonical Screen Inventory

**Application:** `apps/driver` (`com.haulix.driver`)  
**Design Space:** Page `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Figma Canvas URL:** https://www.figma.com/design/meiXxwUNJaDo0a3mhcHBXv/HAULIX-%E2%80%94-UI-UX-Concept--Copy-?node-id=1-3  
**Authoritative Baseline:** 68 unique canonical states · 136 localized screens (68 English + 68 Spanish)  
**Requirements Source:** Signed HAULIX SRS v1.6 (Crosswalk Frame `1329:1824`, Handoff Index `1091:3`, UX Audit Board `1317:1805`)  
**Verified Audit Coverage:** 68 / 68 Canonical States (136 / 136 Localized Variants) — 100% Complete

---

## 1. Authoritative 68-State Master Inventory Table

| DW ID | Canonical Title | Primary Workflow | Applicable Role | EN Node | ES Node | Prototype Status | Primary Design Audit Package |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **DW01** | Welcome | DW-W01 (Onboarding) | All Users | `1085:3` | `1088:3` | Verified (Get started ➔ DW02, Sign in ➔ DW03, EN ↔ ES) | **DW-D01 (Audited & Verified)** |
| **DW02** | Create your account | DW-W01 (Onboarding) | Applicants | `1085:39` | `1088:39` | Verified (Role toggle: Driver ➔ DW58, Helper ➔ DW59) | **DW-D01 (Audited & Verified)** |
| **DW03** | Sign in | DW-W01 (Onboarding) | Returning Users | `1085:80` | `1088:80` | Verified (Forgot pw ➔ DW43, Phone login ➔ DW61) | **DW-D01 (Audited & Verified)** |
| **DW04** | Phone verification | DW-W01 (Onboarding) | All Applicants | `1085:114` | `1088:114` | Verified (6-digit OTP, Resend ➔ DW66, Submit ➔ DW05) | **DW-D01 (Audited & Verified)** |
| **DW05** | Driver verification | DW-W02 (Eligibility) | Primary Driver | `1085:154` | `1088:154` | Verified (Checklist ➔ DW07, Switch to Helper ➔ DW06) | **DW-D02 (Audited & Verified)** |
| **DW06** | Helper verification | DW-W02 (Eligibility) | Crew Helper | `1085:207` | `1088:207` | Verified (Submit ➔ DW08, Back to role ➔ DW02) | **DW-D02 (Audited & Verified)** |
| **DW07** | Driver documents | DW-W02 (Eligibility) | Primary Driver | `1085:254` | `1088:254` | Verified (Submit ➔ DW08, Back ➔ DW05) | **DW-D02 (Audited & Verified)** |
| **DW08** | Verification status | DW-W02 (Eligibility) | All Applicants | `1085:298` | `1088:298` | Verified (Driver demo ➔ DW09, Helper demo ➔ DW31) | **DW-D02 (Audited & Verified)** |
| **DW09** | Driver dashboard | DW-W03 (Operational Home) | Primary Driver | `1086:3` | `1088:332` | Verified (Go Online toggle, Active dispatch card) | **DW-D03 (Audited & Verified)** |
| **DW10** | Job offers | DW-W04 (Offers & Crew) | Primary Driver | `1086:81` | `1088:410` | Verified (Tiered radius offer cards, Accept / Decline) | **DW-D04 (Audited & Verified)** |
| **DW11** | Job details | DW-W04 (Offers & Crew) | Primary Driver | `1086:162` | `1088:491` | Verified (Item breakdown, Cargo sizing, Accept CTA) | **DW-D04 (Audited & Verified)** |
| **DW12** | Offer unavailable | DW-W04 (Offers & Crew) | Primary Driver | `1086:205` | `1088:534` | Verified (Expired / taken by peer, Return to home) | **DW-D04 (Audited & Verified)** |
| **DW13** | Invite a Helper | DW-W04 (Offers & Crew) | Primary Driver | `1086:231` | `1088:560` | Verified (Helper roster lookup, Send invitation) | **DW-D04 (Audited & Verified)** |
| **DW14** | Helper invitations | DW-W04 (Offers & Crew) | Crew Helper | `1086:268` | `1088:597` | Verified (Incoming crew invites, Accept / Decline) | **DW-D04 (Audited & Verified)** |
| **DW15** | Review invitation | DW-W04 (Offers & Crew) | Crew Helper | `1086:328` | `1088:657` | Verified (Job scope, Driver profile, Confirm match) | **DW-D04 (Audited & Verified)** |
| **DW16** | Crew readiness | DW-W04 (Offers & Crew) | Driver & Helper | `1086:365` | `1088:694` | Verified (Mutual confirmation checklist, Departure) | **DW-D04 (Audited & Verified)** |
| **DW17** | Active job | DW-W05 (Pickup & Nav) | Primary Driver | `1086:405` | `1088:734` | Verified (Turn-by-turn routing, Arrival button) | **DW-D05 (Audited & Verified)** |
| **DW18** | Job messages | DW-W05 (Pickup & Nav) | Driver & Helper | `1086:459` | `1088:788` | Verified (Customer/Crew chat, Voice notes, Media) | **DW-D05 (Audited & Verified)** |
| **DW19** | On-site job progress | DW-W06 (Active Service) | Primary Driver | `1086:512` | `1088:841` | Verified (Milestone progression, Service in progress, Evidence handoff) | **DW-D06 (Audited & Verified)** |
| **DW20** | Additional work approval | DW-W06 (Active Service) | Primary Driver | `1086:562` | `1088:891` | Verified (Extra item proposal, Dual Admin & Customer gate) | **DW-D06 (Audited & Verified)** |
| **DW21** | Completion evidence | DW-W07 (Proof & Dispute) | Primary Driver | `1086:596` | `1088:925` | Verified (Two-photo delivery proof, Server verification, Review notice) | **DW-D07 (Audited & Verified)** |
| **DW22** | Job completed | DW-W07 (Proof & Dispute) | Driver & Helper | `1086:637` | `1088:966` | Verified (Completion confirmation, Earnings calculation notice, Non-payout preview) | **DW-D07 (Audited & Verified)** |
| **DW23** | Earnings overview | DW-W08 (Wallet & Cashout) | Driver & Helper | `1086:670` | `1088:999` | Verified (Ledger balance, Weekly payout schedule) | **DW-D08 (Audited & Verified)** |
| **DW24** | Worker earnings detail | DW-W08 (Wallet & Cashout) | Crew Helper | `1086:728` | `1088:1057` | Verified (65/35 base share, 100% tip pass-through) | **DW-D08 (Audited & Verified)** |
| **DW25** | Instant Cash Out | DW-W08 (Wallet & Cashout) | Eligible Crew | `1086:765` | `1088:1094` | Verified (Eligibility check, Fee disclosure, Debit route) | **DW-D08 (Audited & Verified)** |
| **DW26** | Cash Out status | DW-W08 (Wallet & Cashout) | Eligible Crew | `1086:802` | `1088:1131` | Verified (Stripe transfer confirmation, Return to wallet) | **DW-D08 (Audited & Verified)** |
| **DW27** | Profile & Documents | DW-W09 (Profile & Settings) | Primary Driver | `1086:840` | `1088:1169` | Verified (Profile overview, Settings navigation) | **DW-D09 (Audited & Verified)** |
| **DW28** | My jobs | DW-W09 (History & Support) | Driver & Helper | `1086:911` | `1088:1240` | Verified (Completed trips, History details, Receipts) | **DW-D09 (Audited & Verified)** |
| **DW29** | Help & support | DW-W09 (History & Support) | Driver & Helper | `1086:962` | `1088:1291` | Verified (FAQ, Safety dispatch, Support tickets) | **DW-D09 (Audited & Verified)** |
| **DW30** | Notifications | DW-W09 (History & Support) | Driver & Helper | `1086:1009` | `1088:1338` | Verified (System alerts, Broadcasts, Reminders) | **DW-D09 (Audited & Verified)** |
| **DW31** | Helper dashboard | DW-W03 (Operational Home) | Crew Helper | `1086:1058` | `1088:1387` | Verified (Helper availability toggle, Invitation feed) | **DW-D03 (Audited & Verified)** |
| **DW32** | Language & security | DW-W09 (Profile & Settings) | Driver & Helper | `1086:1108` | `1088:1437` | Verified (Locale picker, 2FA settings, Password change) | **DW-D09 (Audited & Verified)** |
| **DW33** | Verification needs action | DW-W02 (Eligibility) | All Workers | `1086:1155` | `1088:1484` | Verified (Rejection reason, Resubmit ➔ DW07/DW06) | **DW-D02 (Audited & Verified)** |
| **DW34** | Connection interrupted | DW-W05 (Pickup & Nav) | Driver & Helper | `1086:1188` | `1088:1517` | Verified (Offline state banner, Local cache, Reconnect) | **DW-D05 (Audited & Verified)** |
| **DW35** | Payout history | DW-W08 (Wallet & Cashout) | Driver & Helper | `1086:1215` | `1088:1544` | Verified (Itemized payout logs, Bank settlement dates) | **DW-D08 (Audited & Verified)** |
| **DW36** | Personal information | DW-W09 (Profile & Settings) | Primary Driver | `1270:428` | `1270:1379` | Verified (Name, Phone, Email, Address, Tax SSN/EIN) | **DW-D09 (Audited & Verified)** |
| **DW37** | Photo & contact | DW-W09 (Profile & Settings) | Primary Driver | `1270:550` | `1270:1501` | Verified (Profile photo upload overlay, Emergency contact) | **DW-D09 (Audited & Verified)** |
| **DW38** | Documents & vehicle | DW-W02 (Eligibility) | Primary Driver | `1270:665` | `1270:1616` | Verified (DL, Vehicle reg, Insurance status cards ➔ DW07) | **DW-D02 (Audited & Verified)** |
| **DW39** | Availability settings | DW-W03 (Operational Home) | Primary Driver | `1270:793` | `1270:1744` | Verified (Operating hours, Service radius 10–50 mi) | **DW-D03 (Audited & Verified)** |
| **DW40** | Payout account | DW-W08 (Wallet & Cashout) | Driver & Helper | `1270:930` | `1270:1881` | Verified (Stripe Express connect, Bank routing/account) | **DW-D08 (Audited & Verified)** |
| **DW41** | Change password | DW-W09 (Profile & Settings) | Driver & Helper | `1270:1047` | `1270:1998` | Verified (Current pw, New pw, Confirm pw) | **DW-D09 (Audited & Verified)** |
| **DW42** | Notification settings | DW-W09 (Profile & Settings) | Driver & Helper | `1270:1154` | `1270:2105` | Verified (Push toggles, Job offers, Earnings, System) | **DW-D09 (Audited & Verified)** |
| **DW43** | Password recovery | DW-W01 (Onboarding) | Returning Users | `1301:556` | `1301:1798` | Verified (Email input, Send reset link ➔ DW44) | **DW-D01 (Audited & Verified)** |
| **DW44** | Reset confirmation | DW-W01 (Onboarding) | Returning Users | `1301:611` | `1301:1853` | Verified (Check inbox view, Return to sign in ➔ DW03) | **DW-D01 (Audited & Verified)** |
| **DW45** | Support request | DW-W09 (History & Support) | Driver & Helper | `1301:662` | `1301:1904` | Verified (Category picker, Description, Attachment upload) | **DW-D09 (Audited & Verified)** |
| **DW46** | Support confirmation | DW-W09 (History & Support) | Driver & Helper | `1301:754` | `1301:1996` | Verified (Ticket ID assigned, Return to home) | **DW-D09 (Audited & Verified)** |
| **DW47** | Message status | DW-W05 (Pickup & Nav) | Driver & Helper | `1301:837` | `1301:2079` | Verified (Read receipt, Delivery state, Network retry) | **DW-D05 (Audited & Verified)** |
| **DW48** | Choose a Helper | DW-W04 (Offers & Crew) | Primary Driver | `1301:920` | `1301:2162` | Verified (Helper search, Favorite crew, Proximity sort) | **DW-D04 (Audited & Verified)** |
| **DW49** | Invitation pending | DW-W04 (Offers & Crew) | Primary Driver | `1301:1010` | `1301:2252` | Verified (Countdown to Helper response, Cancel invite) | **DW-D04 (Audited & Verified)** |
| **DW50** | Location and network | DW-W05 (Pickup & Nav) | Driver & Helper | `1301:1097` | `1301:2339` | Verified (GPS permission prompt, Location troubleshooting) | **DW-D05 (Audited & Verified)** |
| **DW51** | Extra work pending | DW-W06 (Active Service) | Driver & Helper | `1301:1190` | `1301:2432` | Verified (Dual Admin & Customer pending state, Remediated Active Jobs nav) | **DW-D06 (Audited & Verified)** |
| **DW52** | Extra work approved | DW-W06 (Active Service) | Driver & Helper | `1301:1279` | `1301:2521` | Verified (Dual approval confirmed, Remediated Active Jobs nav) | **DW-D06 (Audited & Verified)** |
| **DW53** | Extra work declined | DW-W06 (Active Service) | Driver & Helper | `1301:1362` | `1301:2604` | Verified (Extra work rejected, Proceed original scope, Remediated Active Jobs nav) | **DW-D06 (Audited & Verified)** |
| **DW54** | Payout failed | DW-W08 (Wallet & Cashout) | Driver & Helper | `1301:1445` | `1301:2687` | Verified (Bank decline reason, Update account details) | **DW-D08 (Audited & Verified)** |
| **DW55** | Helper profile | DW-W09 (Profile & Settings) | Crew Helper | `1301:1534` | `1301:2776` | Verified (Helper profile hub, Documents, Earnings link) | **DW-D09 (Audited & Verified)** |
| **DW56** | Helper eligibility & docs | DW-W02 (Eligibility) | Crew Helper | `1301:1633` | `1301:2875` | Verified (Gov ID, Selfie, Background check status ➔ DW06) | **DW-D02 (Audited & Verified)** |
| **DW57** | Helper personal info | DW-W09 (Profile & Settings) | Crew Helper | `1302:696` | `1302:787` | Verified (Legal name, Phone, Address, Tax SSN/EIN) | **DW-D09 (Audited & Verified)** |
| **DW58** | Driver account details | DW-W01 (Onboarding) | Primary Driver | `1309:706` | `1309:1429` | Verified (Driver name, Email, Mobile phone, Password) | **DW-D01 (Audited & Verified)** |
| **DW59** | Helper account details | DW-W01 (Onboarding) | Crew Helper | `1309:772` | `1309:1495` | Verified (Helper name, Email, Mobile phone, Password) | **DW-D01 (Audited & Verified)** |
| **DW60** | Helper phone verification | DW-W01 (Onboarding) | Crew Helper | `1309:838` | `1309:1561` | Verified (Helper 6-digit OTP, Continue ➔ DW06) | **DW-D01 (Audited & Verified)** |
| **DW61** | Phone sign-in verification | DW-W01 (Onboarding) | Returning Users | `1309:896` | `1309:1619` | Verified (Passwordless OTP login for registered crew) | **DW-D01 (Audited & Verified)** |
| **DW62** | Helper active job | DW-W05 (Pickup & Nav) | Crew Helper | `1309:954` | `1309:1677` | Verified (Passenger navigation, Arrival confirmation) | **DW-D05 (Audited & Verified)** |
| **DW63** | Helper on-site progress | DW-W06 (Active Service) | Crew Helper | `1309:1052` | `1309:1759` | Verified (Labor task checklist, Safety rules, Independent evidence handoff) | **DW-D06 (Audited & Verified)** |
| **DW64** | Helper work evidence | DW-W07 (Proof & Dispute) | Crew Helper | `1309:1147` | `1309:1838` | Verified (Helper labor photo proof, Task evidence, Standardized 88px nav) | **DW-D07 (Audited & Verified)** |
| **DW65** | Helper work submitted | DW-W07 (Proof & Dispute) | Crew Helper | `1309:1243` | `1309:1918` | Verified (Helper completion confirmation, Payable share disclosure, Standardized 88px nav) | **DW-D07 (Audited & Verified)** |
| **DW66** | Verification code issue | DW-W01 (Onboarding) | All Applicants | `1309:1332` | `1309:1991` | Verified (SMS resend, Call me, Edit phone modal) | **DW-D01 (Audited & Verified)** |
| **DW67** | Standard bank Cash Out | DW-W08 (Wallet & Cashout) | Driver & Helper | `1325:1804` | `1325:1938` | Verified (ACH settlement, 2–3 business days, Free) | **DW-D08 (Audited & Verified)** |
| **DW68** | Instant fee & payout review | DW-W08 (Wallet & Cashout) | Eligible Crew | `1325:1866` | `1325:2000` | Verified (1.5% fee disclosure, Net payout preview) | **DW-D08 (Audited & Verified)** |
