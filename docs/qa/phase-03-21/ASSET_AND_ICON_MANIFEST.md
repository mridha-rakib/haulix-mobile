# HAULIX Phase 03.21 — Asset and Icon Manifest

**Batch Scope:** Accelerated Batch: 4 Screens × English + Spanish (W02 — Inventory Editing, Validation & Item Photos)  
**Date:** November 18, 2026  
**Auditor:** Antigravity AI Engineer

---

## 1. Visual Photo Assets

| Asset Name                        | Target File Path                                         | Dimensions            | Figma Source Node       | Purpose / Usage                                                                |
| :-------------------------------- | :------------------------------------------------------- | :-------------------- | :---------------------- | :----------------------------------------------------------------------------- |
| **Sofa Photo**                    | `apps/customer/assets/images/intake/c18j-sofa.png`       | 110 × 81 px (display) | `382:1505` / `980:9630` | Living room sofa photo attached to HX-DEMO-1027 on C19-P                       |
| **Queen Mattresses Photo**        | `apps/customer/assets/images/intake/c18j-mattresses.png` | 110 × 81 px (display) | `382:1510` / `980:9635` | Stacked queen mattresses photo on C19-P                                        |
| **Dining Table Photo**            | `apps/customer/assets/images/intake/c18j-table.png`      | 110 × 81 px (display) | `382:1515` / `980:9640` | Dining table with chairs photo on C19-P                                        |
| **Additional Junk / Boxes Photo** | `apps/customer/assets/images/intake/c19p-boxes.png`      | 110 × 81 px (display) | `382:1520` / `980:9645` | Additional junk / moving boxes photo on C19-P (newly downloaded via Figma MCP) |

---

## 2. Vector Icons & UI Assets

| Icon / Component                | Source                       | Rendering Mechanism                   | Color Tokens                                                        | Screen Usage                                                |
| :------------------------------ | :--------------------------- | :------------------------------------ | :------------------------------------------------------------------ | :---------------------------------------------------------- |
| **Back Chevron**                | HAULIX Shared Flow Header    | `lucide-react-native` (`ChevronLeft`) | `#F6F8F6` inside `#222827` circular button                          | Header navigation on all 4 screens                          |
| **HAULIX Wordmark & Tagline**   | `@haulix/ui` Brand Header    | Native Text & Layout                  | `#F6F8F6` ("HAUL"), `#BAFF42` ("IX"), `#ADB7B1` ("We Haul It All.") | Centered header on all 4 screens                            |
| **Customer Context Checkmark**  | HAULIX Shared Context Pill   | `lucide-react-native` (`Check`)       | `#BAFF42` inside `#1A2510` pill                                     | Sarah Mitchell / Bryan Lopez context badge on all 4 screens |
| **Completed Demo Checkmark**    | Status Card Badge            | `lucide-react-native` (`Check`)       | `#ADB7B1` / `#788580` inside `#222827` badge                        | "Completed in this demo" badge on C19-E, C19-A, C19-P       |
| **Warning / Action Alert Icon** | Validation Card Badge        | `lucide-react-native` (`AlertCircle`) | `#EF4444` inside `#222827` badge                                    | "Action required" badge on C19-V                            |
| **Primary Action Button**       | `@haulix/ui` Button          | NativePressable                       | Background: `#BAFF42`, Text: `#080B0B`                              | Primary action on all 4 screens                             |
| **Secondary Action Button**     | Custom HAULIX Outline Button | NativePressable                       | Background: `#151A19`, Border: `#35403B`, Text: `#BAFF42`           | Secondary action on all 4 screens                           |

---

## 3. Figma Screenshot Archive

| Screenshot Filename | Source Node ID | Resolution                      | Frame Title                                      |
| :------------------ | :------------- | :------------------------------ | :----------------------------------------------- |
| `c19e-en-figma.png` | `382:1306`     | 351 × 1024 px (430 × 1257 orig) | C19-E · Manual item correction / W02 (EN)        |
| `c19e-es-figma.png` | `980:9388`     | 351 × 1024 px (430 × 1257 orig) | C19-E-ES · Solicitud y revisión / W02 (ES)       |
| `c19a-en-figma.png` | `382:1365`     | 351 × 1024 px (430 × 1257 orig) | C19-A · Add item manually / W02 (EN)             |
| `c19a-es-figma.png` | `980:9463`     | 351 × 1024 px (430 × 1257 orig) | C19-A-ES · Solicitud y revisión / W02 (ES)       |
| `c19v-en-figma.png` | `382:1424`     | 347 × 1024 px (430 × 1272 orig) | C19-V · Missing dimensions validation / W02 (EN) |
| `c19v-es-figma.png` | `980:9538`     | 347 × 1024 px (430 × 1272 orig) | C19-V-ES · Solicitud y revisión / W02 (ES)       |
| `c19p-en-figma.png` | `382:1483`     | 300 × 1024 px (430 × 1470 orig) | C19-P · Item photo uploads / W02 (EN)            |
| `c19p-es-figma.png` | `980:9613`     | 300 × 1024 px (430 × 1470 orig) | C19-P-ES · Solicitud y revisión / W02 (ES)       |
