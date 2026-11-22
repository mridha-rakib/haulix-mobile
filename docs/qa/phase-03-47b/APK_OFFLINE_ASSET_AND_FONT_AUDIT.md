# HAULIX Customer Mobile App — Phase 03.47B

## Standalone APK Offline Asset & Font Audit

**Document ID:** `HAULIX-QA-P03.47B-014`  
**Phase:** 03.47B  
**Target:** Standalone Android APK (`com.haulix.customer`)

---

### 1. Asset Bundling & Offline Architecture

In standalone mode, all assets are bundled directly inside the APK package file. No remote asset requests or Metro HTTP streaming occurs.

#### Embedded Fonts:

- `PlusJakartaSans-Bold.ttf`
- `PlusJakartaSans-SemiBold.ttf`
- `PlusJakartaSans-Medium.ttf`
- `PlusJakartaSans-Regular.ttf`
- `SpaceMono-Regular.ttf`

#### Embedded Dispatch Map Assets:

- `map-s10-searching.png` ($386 \times 235$ px)
- `map-s20-searching.png` ($386 \times 235$ px)
- `map-s30-searching.png` ($386 \times 235$ px)
- `map-s40-searching.png` ($386 \times 235$ px)
- `map-s50-searching.png` ($386 \times 235$ px)

#### Vehicle & UI Graphics:

- Pickup truck illustration (`pickup-truck.png`)
- Cargo van illustration (`cargo-van.png`)
- Box truck illustration (`box-truck.png`)
- Brand icons and vector markers

---

### 2. Offline Mode Test Execution

1. **Hardware Verification:**  
   Device: Realme Note 60 (`RMX3930`), Android 15.
2. **Airplane Mode:**  
   Airplane mode enabled (`adb shell cmd connectivity airplane-mode enable`).
3. **Cache Invalidation:**  
   App process restarted in airplane mode.
4. **Result:**  
   All fonts render with correct typography hierarchy. All map graphics and illustrations render instantly with zero latency and zero network activity.
