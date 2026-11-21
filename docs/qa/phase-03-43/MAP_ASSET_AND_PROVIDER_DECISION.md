# HAULIX Customer Mobile App — Phase 03.43

## Architectural Decision Record: High-Fidelity Vector Map vs. Live SDK Providers

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.43  
**Status:** Approved Architectural Decision  
**Date:** 2026-11-21

---

### 1. Context & Technical Evaluation

Phase 03.43 requires implementing four canonical screens of Workflow 05 (Dispatch & Assignment) with extreme visual fidelity to the original HAULIX Figma designs (`Q946h4YBGgyLsjnPtdyQNe`).

The prompt requires evaluating three candidate implementation strategies:

- **Case A:** Static Map Screenshot / Raster Fill
- **Case B:** High-Fidelity Vector Map Artwork (`react-native-svg` + `react-native-reanimated`)
- **Case C:** External Live Map Provider SDK (`react-native-maps`, Mapbox, or Google Maps)

---

### 2. Provider & Library Comparison Matrix

| Evaluation Criteria                | Case A: Static Image Fill                                       | Case B: Native Vector Map (`react-native-svg`) [CHOSEN]                                  | Case C: Live Provider (`react-native-maps` / Mapbox)                                  |
| :--------------------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| **Figma Visual Parity**            | Low / Rigid (Cannot adapt to dynamic viewports or theme tokens) | **Maximum (100% token-matched colors, exact road hierarchy, exact route halo)**          | Low / Inaccurate (Default Google/Apple/Mapbox tiles deviate from HAULIX palette)      |
| **Marker Customization**           | None (Static)                                                   | **High (Custom SVG vehicle icon with heading, glowing radar pulses, pickup pins)**       | Medium (Requires complex custom callout rendering)                                    |
| **Expo SDK 58 Compatibility**      | 100%                                                            | **100% (`react-native-svg` 15.16.0 already installed & verified)**                       | High risk (Requires Google Maps API keys, native linking, billing, dev-client builds) |
| **Network & Offline Independence** | High (Bundled)                                                  | **100% Offline, Deterministic, Zero Network Latency**                                    | Dependent on external tile servers; breaks offline; requires API quota                |
| **State & Navigation Safety**      | High                                                            | **High (Deterministic testable props; zero side-effects or GPS permission leaks)**       | Risky (Requires background location permissions; potential runtime crashes)           |
| **Upgrade Path to Production**     | Dead end                                                        | **Clean Separation (Map viewport container acts as drop-in interface for future tiles)** | Early lock-in before backend dispatch endpoints exist                                 |

---

### 3. Decision: Adopt Case B (High-Fidelity Reusable Vector Map Component)

We choose **Case B: Dedicated Native Vector Map Component (`HaulixDispatchMap.tsx`)** built using `react-native-svg` and `react-native-reanimated`.

#### Justification:

1. **P0 Visual Strictness:** The project owner mandate explicitly warns against generic or unrelated default map styles:
   > _"Do not create an approximate or generic map... Do not use an unrelated Google Maps or Mapbox default style and claim it matches Figma."_
   Case B guarantees that every road line, highway casing, park area, route glow, radar ping, and vehicle marker exactly references `@haulix/design-tokens` (`colors.background`, `colors.surface`, `colors.elevated`, `colors.brand`, `#38BDF8`).
2. **Zero Fabricated GPS / External Dependencies:** Phase 03.43 is a pure frontend implementation. Case B prevents fabricating live GPS coordinates or making unauthorized calls to Google/Mapbox cloud APIs without credentials.
3. **Smooth Interactive Controls:** Case B supports interactive zoom states (+/-), recentering, active pulse animations, and responsive scaling across both Android and iOS devices.
4. **Future-Proof Interface:** The component exposes standard props (`mode: 'searching' | 'matched' | 'tracking'`, `pickupLocation`, `driverLocation`, `routeWaypoints`, `zoomLevel`, `onRecenter`), establishing a clean interface that can transition seamlessly to a vector tile renderer when real-time backend dispatch telemetry is integrated in Phase 05.
