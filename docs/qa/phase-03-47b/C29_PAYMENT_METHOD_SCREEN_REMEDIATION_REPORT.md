# HAULIX Customer Mobile App — Phase 03.47B Addendum
## Screen C29 (`/choose-payment-method`) Visual Fidelity, Layout & Android Standalone APK Remediation Report

**Document ID:** `docs/qa/phase-03-47b/C29_PAYMENT_METHOD_SCREEN_REMEDIATION_REPORT.md`  
**Phase:** 03.47B Addendum (P0 Payment Screen Remediation)  
**Affected Route:** `/choose-payment-method`  
**Source File:** `apps/customer/app/(app)/choose-payment-method.tsx`  
**Figma Source Authority:** Student Team Copy `meiXxwUNJaDo0a3mhcHBXv`  
- **English Frame:** Node `763:605` (`430 × 1093` px)  
- **Spanish Frame:** Node `766:991` (`430 × 1108` px)  
**Target Hardware:** Realme Note 60 (`RMX3930`), Android 15, `720 × 1600` px  
**Date:** 2026-11-21  
**Status:** REMEDIATED & QUALITY-VERIFIED

---

## 1. Executive Summary & Problem Diagnosis

The project owner reported that a physical Android screenshot of the Spanish Choose Payment Method screen (`/choose-payment-method`) was visually broken. 

A thorough root-cause forensic investigation revealed four key findings:

1. **NativeWind / CSS-Interop Function-Style Stripping on Android:**  
   In React Native 0.76+ with NativeWind v4 (`react-native-css-interop`), passing dynamic function styles (`style={({ pressed }) => [...]}`) to `<Pressable>` components stripped all inner StyleSheet declarations during Android layout passes whenever no `className` was provided.
   - For `methodCard`: The card container lost `flexDirection: "row"`, `backgroundColor: colors.surface`, `borderColor: colors.elevated`, and `borderRadius: 14`. As a result, its child elements (card icon, title/subtitle, radio button) collapsed into a vertical column on a transparent background.
   - For `primaryButton`: The button lost its `backgroundColor: colors.brand` (#BAFF42). Because `primaryButtonText` specifies `color: colors.background` (#080B0B), the text was rendered dark-on-dark, appearing completely missing/invisible.
   - For `secondaryButton`: The button lost its background and border container, leaving only unboxed text (`Revisar condiciones`).

2. **Figma Asset Misalignment in Previous QA Documentation:**  
   Inspection of `docs/qa/phase-03-38/figma/` revealed that `c29-en-figma.png` and `c29-es-figma.png` had identical file sizes and contents as `c28u-en-figma.png` and `c28u-es-figma.png` (the C28 Terms screen). Authentic Figma frame PNGs for Node `763:605` (English) and Node `766:991` (Spanish) were directly retrieved from the authorized student copy via Figma MCP (`get_screenshot`).

3. **Untranslated Metadata Labels:**  
   The metadata labels `LOCATION`, `TIMING`, and `ITEMS` were hardcoded in uppercase English within `choose-payment-method.tsx`. In the Spanish locale, they failed to render as `UBICACIÓN`, `HORARIO`, and `ARTÍCULOS`.

4. **Runtime Environment Artifacts:**  
   The earlier screenshot showed a floating circular settings cog icon (`[⚙]`). This icon is the native Expo Go / Metro development menu overlay. In a standalone production/demo APK (`com.haulix.customer`), Expo Go overlays do not exist. Furthermore, our floating `QA Screens` pill has been integrated with Clean Mode, allowing it to be hidden completely during visual capture.

---

## 2. Technical Remediation Actions Taken

### 2.1 View-Wrapped Resilient Layout Pattern
To eliminate the NativeWind function-stripping defect on Android, all interactive components were refactored to place layout, background, border, and typography styles on `<View>` containers inside `<Pressable>`:

```tsx
// ✅ Bulletproof React Native Android pattern (immune to css-interop style-stripping)
<Pressable
  onPress={() => handleSelectMethod("card")}
  accessibilityRole="radio"
  accessibilityState={{ selected: selectedMethod === "card" }}
  testID="c29-method-card"
>
  <View
    style={[
      styles.methodOptionCard,
      selectedMethod === "card" && styles.methodOptionCardSelected,
    ]}
  >
    <View style={styles.methodIconContainer}>
      <CreditCardIcon selected={selectedMethod === "card"} />
    </View>
    <View style={styles.methodInfo}>
      <Text style={styles.methodTitle}>{t("c29ChoosePaymentMethod.testCardTitle")}</Text>
      <Text style={styles.methodSubtitle}>{t("c29ChoosePaymentMethod.testCardSubtitle")}</Text>
    </View>
    <RadioIcon selected={selectedMethod === "card"} />
  </View>
</Pressable>
```

The same resilient pattern was applied to:
- `primaryButton`: `<Pressable onPress={handleContinueWithCard}><View style={styles.primaryButton}><Text style={styles.primaryButtonText}>...</Text></View></Pressable>`
- `secondaryButton`: `<Pressable onPress={handleReviewTermsAgain}><View style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>...</Text></View></Pressable>`
- Adjacent W04 screens: `secure-card-setup.tsx` (C29-M), `card-hold-expired.tsx` (C30-E), `payment-authorization-declined.tsx` (C30-D), `payment-authorization-pending.tsx` (C29-P), `confirm-card-authentication.tsx` (C29-3D), and `review-fresh-card-hold.tsx` (C30-C).

### 2.2 Complete i18n Localization
Added the missing metadata keys to `@haulix/i18n` in both `en.ts` and `es.ts`:

| Key | English (`en.ts`) | Spanish (`es.ts`) |
|---|---|---|
| `metaLocation` | `LOCATION` | `UBICACIÓN` |
| `metaTiming` | `TIMING` | `HORARIO` |
| `metaItems` | `ITEMS` | `ARTÍCULOS` |
| `cardAuthorization` | `CARD AUTHORIZATION` | `TARJETA Y AUTORIZACIÓN` |
| `furnitureRemovalTitle` | `FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS` | `RETIRO DE MUEBLES · 1 SOFÁ + 2 SILLAS` |
| `furnitureRemovalSubtitle` | `Area: Downtown Phoenix, Arizona · illustrative address` | `Zona: centro de Phoenix, Arizona · dirección de ejemplo` |
| `pendingStatus` | `PENDING` | `PENDIENTE` |
| `pendingTitle` | `Furniture removal · Phoenix` | `Retiro de muebles · Phoenix` |
| `pendingSupporting` | `Demo · Nov 3 · 10 AM–12 PM MST` | `Ejemplo · 3 nov. · 10–12 MST` |
| `quoteReference` | `Illustrative W03 quote` | `Cotización de referencia` |
| `selectedMethodHeading` | `SELECTED PAYMENT METHOD` | `MÉTODO DE PAGO SELECCIONADO` |
| `testCardTitle` | `Visa  •••• 4242` | `Visa  •••• 4242` |
| `testCardSubtitle` | `Test card • tokenized method` | `Tarjeta de prueba • método tokenizado` |
| `addOrChangeCard` | `Add or change card` | `Añadir o cambiar tarjeta` |
| `providerCardNote` | `Card details are handled by the provider, not stored here.` | `El proveedor gestiona la tarjeta. No almacenamos sus datos completos.` |
| `secureNoticeHeading` | `SECURE AUTHORIZATION` | `AUTORIZACIÓN SEGURA` |
| `secureNoticeBody` | `Demo method: Visa •••• 4242. Stripe test example; the app never handles raw card data.` | `Método demo: Visa •••• 4242. Ejemplo de Stripe; nunca se muestran datos completos.` |
| `previewDeclineCta` | `Preview decline recovery` | `Ver recuperación por rechazo` |
| `previewExpiredLink` | `Preview expired hold` | `Ver retención vencida` |

### 2.3 4-Phase Progress Timeline
Aligned the progress indicator with the authentic Figma C29 frame by implementing 4 discrete horizontal bar segments:
- Steps 1, 2, and 3: Active Neon Lime (`#BAFF42`, 5px height, 3px border radius).
- Step 4: Upcoming Elevated Dark (`#222827`, 5px height, 3px border radius).

### 2.4 $356.00 Reference Quote & Summary Placement
The total authorization hold summary card (`$356.00`) is placed prominently within the primary scroll view, below the brand header, progress indicator, title, and service area chip. It does not collide with or get obscured by `FlowHeaderBack` at the initial scroll position, and smoothly scrolls underneath during vertical gesture interaction.

---

## 3. Verification & Quality Gates

1. **Automated Unit Tests:**  
   Updated `apps/customer/src/__tests__/choose-payment-method.test.tsx` with assertions verifying:
   - Route file existence and demo navigator registration.
   - Outgoing route transitions (`/secure-card-setup`, `/booking-terms-accepted`).
   - Exact translation strings and localized metadata labels (`LOCATION`/`UBICACIÓN`, `TIMING`/`HORARIO`, `ITEMS`/`ARTÍCULOS`).
   - View-wrapped button and card styling avoiding Android style-stripping (`routeContent does not match /<Pressable[^>]*style=\{\(\{ pressed \}\)/`).
   - Secure handoff disclosures (no real Stripe transactions, no card credential storage).
   - **Result:** 111/111 test suites passed, 727/727 customer tests passed.

2. **Static Analysis & Typecheck:**  
   - `pnpm check`: 732 files checked, 0 errors.
   - `pnpm typecheck`: 7/7 monorepo packages checked, 0 type errors.

---

## 4. Figma Source Frame Identity Reference

- **English C29:** Node `763:605` (`430 × 1093` px)  
  Saved as: `docs/qa/phase-03-47b/figma/c29-en-763-605-figma.png`
- **Spanish C29:** Node `766:991` (`430 × 1108` px)  
  Saved as: `docs/qa/phase-03-47b/figma/c29-es-766-991-figma.png`
