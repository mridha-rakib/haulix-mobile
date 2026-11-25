# HAULIX Driver & Worker Mobile App
# Authoritative Supporting Prototype Overlay Inventory

**Application:** `apps/driver` (`com.haulix.driver`)  
**Design Space:** Page `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Supporting Overlay Section Node:** `1281:518`  
**Total Overlay Frames:** 14 frames (7 bilingual overlay types)  
**Viewport:** 430 × 218–377 px modal bottom-sheet and action dialog overlays  

---

## 1. Supporting Overlay Inventory Table

| Overlay ID | Functional Purpose | EN Node ID | EN Frame Name | ES Node ID | ES Frame Name | Dimensions | Connected Parent Screens | Primary Interactive Trigger | Audit Status |
|:---:|:---|:---:|:---|:---:|:---|:---:|:---|:---|:---:|
| **OV-01** | Profile Photo Upload & Camera Action | `1281:519` | `QA Overlay / Change profile photo / EN` | `1282:518` | `QA Overlay / photo-es` | 430 × 352 (EN) / 430 × 377 (ES) | `DW37`, `DW55` | Tap profile avatar or "Change Photo" button | Scheduled (DW-D09) |
| **OV-02** | Payout Confirmation & Account Switch | `1282:529` | `QA Overlay / payout-en` | `1282:539` | `QA Overlay / payout-es` | 430 × 280 | `DW25`, `DW40`, `DW67`, `DW68` | Tap "Change Payout Account" or "Confirm Withdrawal" | **Audited & Verified (DW-D08)** |
| **OV-03** | Security & 2FA Verification Modal | `1282:549` | `QA Overlay / security-en` | `1282:559` | `QA Overlay / security-es` | 430 × 280 | `DW32`, `DW41` | Tap "Enable 2FA" or "Security Challenge" | Scheduled (DW-D09) |
| **OV-04** | Emergency & Safety Assistance Sheet | `1286:532` | `QA Overlay / emergency-en` | `1286:543` | `QA Overlay / emergency-es` | 430 × 275 | `DW17`, `DW19`, `DW62`, `DW63` | Tap Emergency Shield icon (`911` / HAULIX Safety line) | Scheduled (DW-D09) |
| **OV-05** | Availability Schedule & Radius Sheet | `1286:554` | `QA Overlay / availability-en` | `1286:568` | `QA Overlay / availability-es` | 430 × 298 | `DW09`, `DW31`, `DW39` | Tap "Adjust Hours" or "Service Radius Filter" | **Audited & Verified (DW-D03)** |
| **OV-06** | Direct Call / Voice Communications | `1305:706` | `QA Overlay / call-en` | `1305:716` | `QA Overlay / call-es` | 430 × 218 | `DW18`, `DW47` | Tap phone call icon in in-transit chat | **Audited & Verified (DW-D05)** |
| **OV-07** | Live Location Sharing Permissions | `1305:726` | `QA Overlay / location-en` | `1305:735` | `QA Overlay / location-es` | 430 × 233 (EN) / 430 × 218 (ES) | `DW17`, `DW34`, `DW50`, `DW62` | Tap GPS location retry / system permission alert | **Audited & Verified (DW-D05)** |

---

## 2. Monorepo Role & Architectural Boundary Rules

1. **Independent Overlays vs. Canonical Screens:**
   - These 14 overlays are supporting sheets (`FRAME` containers designed for modal overlay presentation in Figma prototypes).
   - They do **NOT** count toward the 68 core canonical states.
2. **Strict Language Parity:**
   - Every English QA overlay has an exact Spanish counterpart with translated button actions and localized safety/disclosure copy.
3. **No Unauthenticated Execution:**
   - Overlays operate strictly within the authenticated context of their parent screens. Emergency actions (`OV-04`) route directly to native OS telephony (`tel:911`) and HAULIX Safety Dispatch without creating mock local states.
