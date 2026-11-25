# HAULIX Driver & Worker Mobile App — Phase DW-D04
# Prototype Navigation & Interaction Matrix (DW-D04)

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Audited Canonical States:** `DW10`–`DW16`, `DW48`, `DW49` (9 Canonical Screens / 18 Bilingual Variants)

---

## 1. Prototype Transition & Route Matrix

| Source State | Source Node (EN / ES) | Trigger Element | Destination State | Destination Node (EN / ES) | Transition / Animation | Navigation Type |
|:---:|:---:|:---|:---:|:---:|:---:|:---:|
| **DW10** | `1086:81` / `1088:410` | Offer Card (`1086:88` / `1088:417`) | **DW11** | `1086:162` / `1088:491` | Dissolve (160ms, Ease-out) | Push / Detail |
| **DW10** | `1086:81` / `1088:410` | Nav Tab / Home (`1086:158` / `1088:487`) | **DW09** | `1086:3` / `1088:332` | Instant / Tab Switch | Bottom Navigation |
| **DW10** | `1086:81` / `1088:410` | Nav Tab / Earnings (`1086:159` / `1088:488`) | **DW23** | `1086:670` / `1088:999` | Instant / Tab Switch | Bottom Navigation |
| **DW10** | `1086:81` / `1088:410` | Nav Tab / Messages (`1086:160` / `1088:489`) | **DW18** | `1086:459` / `1088:788` | Instant / Tab Switch | Bottom Navigation |
| **DW10** | `1086:81` / `1088:410` | Nav Tab / Profile (`1086:161` / `1088:490`) | **DW27** | `1086:840` / `1088:1169` | Instant / Tab Switch | Bottom Navigation |
| **DW11** | `1086:162` / `1088:491` | Button / Accept Job (`1086:201` / `1088:530`) | **DW13** | `1086:231` / `1088:560` | Dissolve (160ms, Ease-out) | Action / Flow |
| **DW11** | `1086:162` / `1088:491` | Link / Decline (`1086:203` / `1088:532`) | **DW10** | `1086:81` / `1088:410` | Dissolve (160ms, Ease-out) | Back / Decline |
| **DW12** | `1086:205` / `1088:534` | Link / View other jobs (`1086:229` / `1088:558`) | **DW09** | `1086:3` / `1088:332` | Dissolve (160ms, Ease-out) | Flow Recovery |
| **DW13** | `1086:231` / `1088:560` | Card / Search Helpers (`1086:247` / `1088:576`) | **DW48** | `1301:920` / `1301:2162` | Dissolve (160ms, Ease-out) | Push / Search |
| **DW13** | `1086:231` / `1088:560` | Link / Continue solo (`1086:266` / `1088:595`) | **DW17** | `1086:405` / `1088:734` | Dissolve (160ms, Ease-out) | Solo Bypass |
| **DW14** | `1086:268` / `1088:597` | Button / Review (`1086:319` / `1088:648`) | **DW15** | `1086:328` / `1088:657` | Dissolve (160ms, Ease-out) | Push / Review |
| **DW14** | `1086:268` / `1088:597` | Nav Tab / Home (`1086:327` / `1088:656`) | **DW31** | `1086:1058` / `1088:1387` | Instant / Tab Switch | Bottom Navigation |
| **DW14** | `1086:268` / `1088:597` | Nav Tab / Earnings (`1086:324` / `1088:653`) | **DW23** | `1086:670` / `1088:999` | Instant / Tab Switch | Bottom Navigation |
| **DW14** | `1086:268` / `1088:597` | Nav Tab / Messages (`1086:325` / `1088:654`) | **DW18** | `1086:459` / `1088:788` | Instant / Tab Switch | Bottom Navigation |
| **DW14** | `1086:268` / `1088:597` | Nav Tab / Helper Profile (`1086:326` / `1088:655`) | **DW55** | `1301:1534` / `1301:2776` | Instant / Tab Switch | Bottom Navigation |
| **DW15** | `1086:328` / `1088:657` | Button / Accept (`1086:361` / `1088:690`) | **DW16** | `1086:365` / `1088:694` | Dissolve (160ms, Ease-out) | Action / Accept |
| **DW15** | `1086:328` / `1088:657` | Link / Decline (`1086:363` / `1088:692`) | **DW14** | `1086:268` / `1088:597` | Dissolve (160ms, Ease-out) | Back / Decline |
| **DW16** | `1086:365` / `1088:694` | Button / Confirm Readiness (`1086:401` / `1088:730`) | **DW17** (Driver) / **DW62** (Helper) | `1086:405` / `1309:954` | Dissolve (160ms, Ease-out) | Departure Lock |
| **DW48** | `1301:920` / `1301:2162` | Helper Card / Invite (`1301:964` / `1301:2206`) | **DW49** | `1301:1010` / `1301:2252` | Dissolve (160ms, Ease-out) | Push / Send Invite |
| **DW48** | `1301:920` / `1301:2162` | Nav Tab / Profile (`1301:987` / `1301:2229`) | **DW27** | `1086:840` / `1088:1169` | Instant / Tab Switch | Bottom Navigation |
| **DW49** | `1301:1010` / `1301:2252` | Button / Cancel Invite (`1301:1052` / `1301:2294`) | **DW48** | `1301:920` / `1301:2162` | Dissolve (160ms, Ease-out) | Cancel / Back |
| **DW49** | `1301:1010` / `1301:2252` | Nav Tab / Profile (`1301:1077` / `1301:2319`) | **DW27** | `1086:840` / `1088:1169` | Instant / Tab Switch | Bottom Navigation |

---

## 2. Standardized Interaction Bounds Verification

All navigation trigger layers (`NAV ROUTE / *`) have been verified and standardized to exact bounding coordinates:
- **Vertical Position:** `y = 844`
- **Height:** `height = 88`
- **Bounding Box:** Enclosed strictly within `(y: 844..932)`, eliminating all previous 31px screen content intrusion defects (`RES-D03-01`).
