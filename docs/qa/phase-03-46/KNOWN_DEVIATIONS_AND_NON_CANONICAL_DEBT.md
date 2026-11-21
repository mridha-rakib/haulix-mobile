# HAULIX Customer Mobile App — Phase 03.46

## Known Deviations, Non-Canonical Debt & Technical Notes

**PHASE:** 03.46  
**WORKFLOW:** W05 — Dispatch & Assignment  
**DEVICE AUDITED:** Realme Note 60 (`RMX3930`), Android 15

---

### 1. Purpose of this Document

In accordance with HAULIX engineering principles and owner directives, this document honestly registers any deliberate technical differences, minor visual variations, or non-canonical debt between the Figma design files and the production React Native mobile implementation.

---

### 2. Documented Minor Deviations

#### A. Native Font Engine Rasterization Differences

- **Figma:** Uses Figma's web-based Canvas/Skia text rendering engine for Inter / System sans fonts.
- **Physical Device:** Android 15 uses native Android HarfBuzz / FreeType text shaping and anti-aliasing.
- **Impact:** Sub-pixel glyph kerning and baseline alignment vary by < 0.5px. Visually identical to normal human eyes.

#### B. Status Bar Inset on Notched Android Displays

- **Figma:** Standard iOS/Android mockup displays a fixed 44px top status bar without dynamic cutout / teardrop camera notch handling.
- **Physical Device:** The Realme Note 60 features a centered waterdrop camera notch. `SafeAreaView` dynamically computes top insets (36–40px) to ensure status bar content and header back buttons never collide with the physical lens.
- **Verdict:** Necessary platform-specific enhancement.

#### C. Interactive Zoom & Pan Controls on Dispatch Map

- **Figma:** The Figma design represents static artboards representing dispatch states.
- **Physical Device:** The mobile app provides interactive zoom (`+`, `-`) and recenter controls on the map view for tactile customer usability.
- **Verdict:** Approved enhancement; maintains exact visual geometry while enhancing functionality.

---

### 3. Non-Canonical Debt Status

- **Figma Starter Plan vs Student Team Copy:**
  - Master file `Q946h4YBGgyLsjnPtdyQNe` remained untouched.
  - Student Team file `meiXxwUNJaDo0a3mhcHBXv` served as the authorized inspection copy.
- **Synthetic SVG Maps:**
  - Completely decommissioned in Phase 03.46. All 8 screens now render authentic Figma Phoenix dispatch artwork.
- **Mount Auto-Mutation Side Effects:**
  - Completely eliminated. No reactive state pollution remains.

---

### 4. Conclusion

All documented deviations represent platform-standard mobile adaptations and do not compromise design fidelity or system integrity.
