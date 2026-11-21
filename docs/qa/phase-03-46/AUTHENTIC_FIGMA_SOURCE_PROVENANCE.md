# HAULIX Customer Mobile App — Phase 03.46

## Authentic Figma Source Provenance & Asset Forensics

**PHASE:** 03.46  
**WORKFLOW:** W05 — Dispatch & Assignment  
**FIGMA SOURCE:** Authorized Student Team Copy (`meiXxwUNJaDo0a3mhcHBXv`)  
**PARENT SECTIONS:** `836:4571` (English) / `836:4572` (Spanish)  
**CANONICAL SCREENS AUDITED:** 8 screens (16 localized variants)  
**DATE:** 2026-11-21

---

### 1. Executive Summary

Phase 03.46 resolves the primary project owner mandate: replacing synthetic/generic SVG map approximations with **authentic Figma Phoenix dispatch artwork assets** sourced directly from the authorized HAULIX design. All eight canonical W05 dispatch screens have been audited against their exact Figma master nodes, and their visual artwork layers have been extracted and bound into `@haulix/customer`.

---

### 2. Figma Master Node & Asset Inventory

The authentic Figma design represents Phoenix cartographic artwork via 386 × 235 px frames housed under Section `836:4571` (EN) and `836:4572` (ES).

| Screen ID  | Canonical Route          | Figma Frame Node (EN / ES) | Map Artwork Frame ID | Asset File in `@haulix/customer`                         |
| ---------- | ------------------------ | -------------------------- | -------------------- | -------------------------------------------------------- |
| **C32-A**  | `/searching-for-driver`  | `844:4571` / `844:6721`    | `846:5131`           | `apps/customer/assets/maps/map-s10-searching.png`        |
| **C32-B**  | `/driver-matched`        | `844:5165` / `844:7315`    | `846:5160`           | `apps/customer/assets/maps/map-driver-matched.png`       |
| **C32-C**  | `/crew-tracking`         | `844:5522` / `844:7672`    | `846:5178`           | `apps/customer/assets/maps/map-crew-tracking.png`        |
| **C32-D**  | `/cancellation-windows`  | `844:6162` / `844:8312`    | `846:5210`           | `apps/customer/assets/maps/map-cancellation-windows.png` |
| **W05-ND** | `/no-driver-available`   | `844:6070` / `844:8220`    | `846:5205`           | `apps/customer/assets/maps/map-no-driver.png`            |
| **W05-DL** | `/driver-arrival-update` | `844:5859` / `844:8009`    | `846:5194`           | `apps/customer/assets/maps/map-driver-late.png`          |
| **W05-RA** | `/driver-reassigned`     | `844:5740` / `844:7890`    | `846:5188`           | `apps/customer/assets/maps/map-driver-reassigned.png`    |
| **W05-CN** | `/request-canceled`      | `844:6254` / `844:8404`    | `846:5215`           | `apps/customer/assets/maps/map-request-canceled.png`     |

---

### 3. Driver Avatar Provenance

In addition to map artwork, Phase 03.46 verified the exact identity and assets of driver profiles in Figma:

1. **Mike R. (Assigned Driver / Driver Late)**
   - Figma Node: `844:5220` (`DRIVER IMAGE / ASSIGNED`)
   - Asset URL: `https://www.figma.com/api/mcp/asset/4a9e6da6-b9cb-4a8c-9c94-e6a23cc664e7.png`
   - Local Asset: `apps/customer/assets/images/driver-mike.png`
   - Characteristics: Authentic driver wearing HAULIX cap with `#BAFF42` lime circular border.

2. **Sarah L. (Reassigned Driver)**
   - Figma Node: `878:5131` (`Driver avatar / neutral Sarah L`)
   - Asset URL: `https://www.figma.com/api/mcp/asset/8f415644-df46-432c-8c75-6004cee86cef.png`
   - Local Asset: `apps/customer/assets/images/driver-sarah.png`
   - Characteristics: Minimalist silhouette avatar with `#BAFF42` lime circular border.

---

### 4. Integrity and Preservation Constraints

- **Starter File Protection:** Master Starter file `Q946h4YBGgyLsjnPtdyQNe` was strictly unmutated. All read operations and asset exports were executed exclusively against Student Team copy `meiXxwUNJaDo0a3mhcHBXv`.
- **Zero API Billing / Offline Independence:** All 8 authentic map assets are bundled natively in the app bundle. Zero Google Maps SDK billing keys, third-party tile servers, or network calls are required.
