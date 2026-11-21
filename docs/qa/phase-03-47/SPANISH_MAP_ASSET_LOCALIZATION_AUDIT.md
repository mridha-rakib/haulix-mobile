# HAULIX Customer Mobile App — Phase 03.47
# Spanish Map Asset Localization Audit & P0 Remediation

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47  
**DOCUMENT:** `docs/qa/phase-03-47/SPANISH_MAP_ASSET_LOCALIZATION_AUDIT.md`  
**DEFECT REMEDIATION:** P0 — Eliminated English Raster Labels on Spanish Screens  
**STATUS:** RESOLVED & VERIFIED ON PHYSICAL ANDROID  

---

## 1. Problem Statement (Phase 03.46 Defect)

Independent inspection of Phase 03.46 physical Android screenshots revealed a critical localization flaw:
On Spanish dispatch screens (e.g., `/no-driver-available?previewLocale=es`), the map displayed hardcoded English raster text:
- `Searched up to 50 mi`
- `Pickup`

Although the surrounding React Native text was localized into Spanish, the map image was referencing English assets (`MAP_SOURCES.no_driver`), violating bilingual acceptance requirements.

---

## 2. Root Cause Analysis

1. `HaulixDispatchMap.tsx` had a single hardcoded image dictionary `MAP_SOURCES` pointing exclusively to English PNG files.
2. The component ignored the `locale` parameter for image asset resolution.
3. Authentic Spanish map frames in Figma (`Section 836:4572`) had not been exported as dedicated assets.

---

## 3. Implemented Remediation

1. **Extraction of All 12 Authentic Spanish Maps:** Downloaded all 12 localized Spanish map nodes directly from the Figma Student Team copy `meiXxwUNJaDo0a3mhcHBXv` into `apps/customer/assets/maps/`:
   - `map-s10-searching-es.png`
   - `map-s20-searching-es.png`
   - `map-s30-searching-es.png`
   - `map-s40-searching-es.png`
   - `map-s50-searching-es.png`
   - `map-driver-matched-es.png`
   - `map-crew-tracking-es.png`
   - `map-driver-late-es.png`
   - `map-driver-reassigned-es.png`
   - `map-no-driver-es.png`
   - `map-cancellation-windows-es.png`
   - `map-request-canceled-es.png`

2. **Typed Asset Resolver:** Built `resolveW05MapAsset(mode: MapMode, locale?: "en" | "es")`:
   ```tsx
   export function resolveW05MapAsset(
     mode: MapMode,
     locale?: "en" | "es"
   ): ImageSourcePropType {
     const isSpanish = locale === "es";
     const dict = isSpanish ? MAP_SOURCES_ES : MAP_SOURCES_EN;
     return dict[mode] ?? MAP_SOURCES_EN[mode] ?? MAP_SOURCES_EN.searching;
   }
   ```

3. **Prop Propagation:** Updated all 8 existing screens + 4 new search screens to pass `locale={currentLocale}` to `<HaulixDispatchMap />`.

---

## 4. Physical Android Verification

- Captured fresh screenshot of `/no-driver-available?previewLocale=es` (`w05-es-no-driver-remediated-android.png`).
- Verified on physical Realme Note 60: Map now shows authentic Spanish text (`Búsqueda hasta 50 mi`, `Punto de recogida`) matching Figma node `846:5309`.
- Zero English raster labels remain on Spanish screens.
