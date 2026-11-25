# Customer App Authoritative Screen QA Matrix

**Phase:** Phase 03.68  
**Application:** `apps/customer`  
**Total Routes:** 215 Unique Routes  
**Total Demo Entries:** 423 Registered Routes  
**Authoritative Figma:** `meiXxwUNJaDo0a3mhcHBXv`

---

## 1. Workflow Architecture & Screen Inventory Overview

| Workflow Module | Primary Focus | Canonical States | EN/ES Variants | Public Route Count | Status |
|:---|:---|:---:|:---:|:---:|:---:|
| **W01 — Authentication & Onboarding** | Welcome, Phone Login, OTP Verification, Profile Creation | 14 | 28 | 14 | **VERIFIED** |
| **W02 — Service Intake & Item Capture** | Category Selection, Photo Intake, AI Extraction, Manual Edit | 28 | 56 | 28 | **VERIFIED** |
| **W03 — Access Details & Scheduling** | Origin/Destination Access, Time Slots, ASAP, Capacity | 22 | 44 | 22 | **VERIFIED** |
| **W04 — Quote Review & Payment Auth** | Itemized Quote, Payment Hold, Security, Terms, Revisions | 24 | 48 | 24 | **VERIFIED** |
| **W05 — Dispatch & Driver Matching** | Matching, Driver Assigned, Vehicle Details, Window Conflicts | 20 | 40 | 20 | **VERIFIED** |
| **W06 — Active Service & Live Tracking** | Driver En Route, Live Map, On-Site Arrival, Loading, Transport | 26 | 52 | 26 | **VERIFIED** |
| **W07 — Delivery & Service Exceptions** | Delivery Arrival, Unloading, Gate Issues, Customer Unavailable | 34 | 68 | 34 | **VERIFIED** |
| **W08 — Completion, Receipt & Ratings** | Proof of Delivery, Auto-Closure, Card Charge, Receipts, Ratings | 28 | 56 | 28 | **VERIFIED** |
| **Account & Profile Management** | Account Home, Edit Profile, Payment Methods, Order History | 19 | 38 | 19 | **VERIFIED** |
| **Total Scope** | **Entire HAULIX Customer Mobile Experience** | **215** | **423** | **215** | **VERIFIED** |

---

## 2. Authoritative W08 Screen Inventory & Node Traceability

| State ID | Canonical Screen Name | Route Path | EN Figma Node | ES Figma Node | Functional Status | Visual Parity |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| 01 | Completion Proof Delivery | `/completion-proof` | `907:6811` | `907:9711` | PASS | 100% |
| 02 | Completion Missing Proof | `/completion-missing-proof` | `907:6913` | `907:9813` | PASS | 100% |
| 03 | Completion Restricted Evidence | `/completion-restricted-evidence` | `907:7015` | `907:9915` | PASS | 100% |
| 04 | Completion Customer Confirmed | `/completion-confirmed` | `907:7117` | `907:10017` | PASS | 100% |
| 05 | Completion Issue Reported | `/completion-issue-reported` | `907:7219` | `907:10119` | PASS | 100% |
| 06 | Completion Resolution Pending | `/completion-resolution-pending` | `907:7321` | `907:10221` | PASS | 100% |
| 07 | Completion Auto-Closed 24h Policy | `/completion-auto-closed-policy` | `907:7423` | `907:10323` | PASS | 100% |
| 08 | Completion Auto-Closed Confirmation | `/completion-auto-closed-confirmed` | `907:7525` | `907:10425` | PASS | 100% |
| 09 | Completion Dispute Window Elapsed | `/completion-dispute-elapsed` | `907:7627` | `907:10527` | PASS | 100% |
| 10 | Completion Dispute Exception Active | `/completion-dispute-exception` | `907:7729` | `907:10629` | PASS | 100% |
| 11 | Completion Payment Capture Processing | `/completion-payment-capture-pending` | `907:7831` | `907:10731` | PASS | 100% |
| 12 | Completion Payment Captured | `/completion-payment-captured` | `907:7933` | `907:10833` | PASS | 100% |
| 13 | Completion Authorization Expired | `/completion-auth-expired` | `907:8035` | `907:10935` | PASS | 100% |
| 14 | Completion Fresh Authorization Setup | `/completion-fresh-auth-setup` | `907:8137` | `907:11037` | PASS | 100% |
| 15 | Completion Fresh Authorization Pending | `/completion-fresh-auth-pending` | `907:8239` | `907:11139` | PASS | 100% |
| 16 | Completion Fresh Authorization Success | `/completion-fresh-auth-success` | `907:8341` | `907:11241` | PASS | 100% |
| 17 | Completion Receipt Available | `/completion-receipt` | `907:8443` | `907:11343` | PASS | 100% |
| 18 | Completion Receipt Downloaded | `/completion-receipt-downloaded` | `907:8545` | `907:11445` | PASS | 100% |
| 19 | Completion Rating Star 0 Initial | `/completion-rating` | `907:8647` | `907:11547` | PASS | 100% |
| 20 | Completion Rating Star 1 Selected | `/completion-rating-1` | `907:8749` | `907:11649` | PASS | 100% |
| 21 | Completion Rating Star 2 Selected | `/completion-rating-2` | `907:8851` | `907:11751` | PASS | 100% |
| 22 | Completion Rating Star 3 Selected | `/completion-rating-3` | `907:8953` | `907:11853` | PASS | 100% |
| 23 | Completion Rating Star 4 Selected | `/completion-rating-4` | `907:9055` | `907:11955` | PASS | 100% |
| 24 | Completion Rating Star 5 Selected | `/completion-rating-5` | `907:9157` | `907:12057` | PASS | 100% |
| 25 | Completion Rating Locked Ineligible | `/completion-rating-locked` | `907:9259` | `907:12159` | PASS | 100% |
| 26 | Completion Rating Submitting State | `/completion-rating-submitting` | `907:9361` | `907:12261` | PASS | 100% |
| 27 | Completion Rating Submission Failed | `/completion-rating-failed` | `907:9463` | `907:12363` | PASS | 100% |
| 28 | Completion Rating Submitted Success | `/completion-rating-submitted` | `907:9565` | `907:12465` | PASS | 100% |
