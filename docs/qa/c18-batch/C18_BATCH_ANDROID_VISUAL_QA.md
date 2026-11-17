# Phase 03.19: C18 Batch — Physical Android QA Report

**Device Under Test:** Realme Note 60 (`0B04731X200003BB`, Android 15)  
**Host & Bundler:** Metro Bundler running on `tcp:8085` via `adb reverse`  
**Scope:** 4 Canonical Routes × 2 Languages = 8 Localized Screen Variants  
**Figma Source File:** `Q946h4YBGgyLsjnPtdyQNe` (HAULIX UI/UX Concept)

---

## 1. Real-Device Android Visual Manifest

All screenshots were captured on the physical Realme Note 60 device and stored in `docs/qa/c18-batch/`:

| Index | Screen Name | Language | Figma Node | Physical Android Screenshot | Dimensions / Size | Visual & Functional Pass Status |
|---|---|---|---|---|---|---|
| **1** | C18-J Junk Intake | English | `382:805` | [android-C18J-en-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18J-en-overview.png) | 720 × 1600 px (170 KB) | **PASS** — Genuine sofa, mattress, table photos rendered; summary metric strip verified |
| **2** | C18-J Junk Intake | Spanish | `977:9100` | [android-C18J-es-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18J-es-overview.png) | 720 × 1600 px (196 KB) | **PASS** — Spanish copy (`Solicitud de retiro de chatarra`, `Sofá de tres plazas`); dynamic customer profile Bryan Lopez |
| **3** | C18-F Furniture Handling | English | `382:959` | [android-C18F-en-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18F-en-overview.png) | 720 × 1600 px (166 KB) | **PASS** — 4 handling tiers with custom icons; inventory specifications and access cards verified |
| **4** | C18-F Furniture Handling | Spanish | `977:9286` | [android-C18F-es-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18F-es-overview.png) | 720 × 1600 px (170 KB) | **PASS** — Spanish tier rows (`Retiro de muebles`, `Retiro de electrodomésticos`, `Retiro de colchones`); handling note |
| **5** | C18-G Garage Cleanout | English | `382:1056` | [android-C18G-en-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18G-en-overview.png) | 720 × 1600 px (166 KB) | **PASS** — Space scope (`Single residential garage`), collection access, hazardous screening card |
| **6** | C18-G Garage Cleanout | Spanish | `977:9399` | [android-C18G-es-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18G-es-overview.png) | 720 × 1600 px (170 KB) | **PASS** — Spanish garage intake (`Garaje residencial individual · un espacio`); warning notice for chemicals and asbestos |
| **7** | C18-R Retail Store Pickup | English | `382:1115` | [android-C18R-en-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18R-en-overview.png) | 720 × 1600 px (173 KB) | **PASS** — Store details (`Home Depot · Phoenix`), order identifier (`HD-DEMO-58321`), delivery card & API notice |
| **8** | C18-R Retail Store Pickup | Spanish | `977:9474` | [android-C18R-es-overview.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/c18-batch/android-C18R-es-overview.png) | 720 × 1600 px (221 KB) | **PASS** — Spanish store pickup (`Recogida de compra en tienda`, `Estanterías en paquete plano ×2`); retail API disclaimer |

---

## 2. Interaction & Visual Fidelity Checks

1. **Breadcrumb / Step Chips:**
   - English renders: `W02 · SERVICE DISCOVERY & INTAKE / C18-X`
   - Spanish renders: `W02 · SERVICIOS Y RECEPCIÓN / C18-X`
2. **Customer Isolation & Dynamic Profile:**
   - English profile: Displays dynamic `SARAH MITCHELL · HX-DEMO-1027`
   - Spanish profile: Displays dynamic `BRYAN LOPEZ MENDOZA · HX-DEMO-1027`
3. **CTA Navigation & Disclosures:**
   - C18-J Primary CTA triggers C19 notice; Secondary CTA navigates to `/service-discovery`.
   - C18-F Primary CTA triggers C21-F notice; Secondary CTA navigates to `/service-discovery`. Tier taps trigger informative banners for C18-A, C18-T, and assembly add-on.
   - C18-G Primary CTA triggers C21-G notice; Secondary CTA navigates to `/service-discovery`.
   - C18-R Primary CTA triggers C20-RETAIL notice; Secondary CTA triggers C18-R-E notice.
4. **Figma Visual Parity:**
   - 100% genuine photographic item thumbnails for C18-J extracted from Figma.
   - Exact token colors: `#BAFF42` (brand accent), `#080B0B` (background base), `#151A19` (card surface), `#222827` (card border/elevated), `#F6F8F6` (primary text), `#ADB7B1` (secondary text), `#FFC85A` (warning badge).
