# HAULIX Mobile Platform
# Customer App Design System Reuse Handoff (for Driver & Worker Mobile App)

**Source Application:** `apps/customer` (`@haulix/customer`)  
**Target Application:** `apps/driver` (`@haulix/driver`)  
**Shared Packages:** `@haulix/design-tokens`, `@haulix/ui`, `@haulix/i18n`, `@haulix/logger`, `@haulix/utils`  
**Date:** November 24, 2026  
**Status:** READY FOR DRIVER / WORKER IMPLEMENTATION HANDOFF

---

## 1. Purpose

This document provides a comprehensive architectural handoff for the engineering team responsible for implementing the HAULIX Driver and Worker Mobile Application (`apps/driver`).

Having brought the Customer Mobile App through complete W01–W08 implementation and Phase 03.67 gap remediation, all design system tokens, layout patterns, and shared component architectures are established and verified.

---

## 2. Architecture & Monorepo Boundaries

```
Figma Tokens (meiXxwUNJaDo0a3mhcHBXv)
   ↓
@haulix/design-tokens (Color tokens, spacing, typography, radii)
   ↓
@haulix/ui (Primitive shared components: SafeArea, Cards, Buttons)
   ↓
apps/customer (Customer App)    apps/driver (Driver App)
```

### Critical Rules for Driver App Implementation:
1. **Never fabricate role switching:** Driver roles (Primary Driver vs Helper) come EXCLUSIVELY from backend eligibility data, not local UI toggles.
2. **Never import Customer routes into Driver app:** Customer and Driver apps are completely independent Expo Router applications with zero shared routes or navigation.
3. **Always reuse packages:** Reusable primitives belong in `packages/ui` or `packages/design-tokens`, not inside `apps/driver`.
4. **Style precedence:** Use NativeWind classes for layout, flexbox, surface backgrounds, borders, padding, and margins; use React Native `StyleSheet` for dynamic platform calculations or animated styles.

---

## 3. Shared Design System Tokens (`@haulix/design-tokens`)

### 3.1 Colors
```typescript
import { colors } from "@haulix/design-tokens";

// Primary Background & Surface Tokens
colors.background;     // "#080b0b" / "#080D0C" (Canvas deep dark)
colors.surface;        // "#151a19" (Card backgrounds)
colors.elevated;       // "#222827" / "#35403b" (Borders, card dividers, elevated inputs)

// Brand Accents
colors.brand;          // "#BAFF42" (HAULIX signature electric lime)
colors.brandHover;     // "#A3E635"
colors.brandMuted;     // "rgba(186, 255, 66, 0.15)"

// Typography Colors
colors.primaryText;    // "#f5f9f7" / "#FFFFFF" (Primary headings & values)
colors.secondaryText;  // "#aabbb1" / "#AAB5AF" (Labels, captions, helper text)
colors.mutedText;      // "#6b7d75"

// Status Tokens
colors.success;        // "#34D399" (Settled, completed, on-time)
colors.warning;        // "#FBBF24" (Expiring, review required)
colors.error;          // "#F87171" (Declined, cancelled, dispute hold)
colors.info;           // "#60A5FA"
```

### 3.2 Typography Tokens
```typescript
import { fontFamily } from "@haulix/design-tokens";

fontFamily.regular;    // Standard body text
fontFamily.medium;     // Secondary labels & buttons
fontFamily.semiBold;   // Card headers & highlights
fontFamily.bold;       // Hero titles & primary CTAs
```

### 3.3 Text Glyph Rendering Guideline (Android)
For standalone text glyphs (such as star ratings `★` or chevron icons `‹`), always include:
```typescript
{
  includeFontPadding: false,
  textAlign: "center",
}
```
This guarantees vertical centering parity on Android devices.

---

## 4. Reusable Shared UI Components (`@haulix/ui`)

### 4.1 `HaulixSafeArea`
A SafeArea container that cleanly manages Android status bar, gesture navigation bar, and hardware insets:
```tsx
import { HaulixSafeArea } from "@haulix/ui";

<HaulixSafeArea edges={["top", "bottom"]}>
  {/* Screen Content */}
</HaulixSafeArea>
```

### 4.2 Reusable Card Architecture (from `W08CompletionCard.tsx`)
Driver app should adopt symmetric card patterns:
- **`W08Header` / Screen Header:** Left chevron button, centered title or brand mark, status badge or right action.
- **`W08StatusBadge`:** Pill container with 10px typography, uppercase lettering, and status-colored border.
- **`W08BookingCard`:** Structured dispatch reference card displaying booking ref, category, item count, and schedule.
- **`W08PrototypeDisclaimer`:** Standardized prototype disclaimer footer.

---

## 5. Localization (`@haulix/i18n`)

All strings must be defined with exact key symmetry in `packages/i18n/src/locales/en.ts` and `es.ts`:
```tsx
import { useTranslation } from "@haulix/i18n";

const { t } = useTranslation();
<Text>{t("driverJob.startRouteButton")}</Text>
```

---

## 6. Logging (`@haulix/logger`)

Never use raw `console.log`. Use structured logging:
```tsx
import { createLogger } from "@haulix/logger";

const logger = createLogger("DRIVER");
logger.info("Driver arrived at pickup", { bookingId: "HX-AZ-DEMO-0042" });
logger.warn("Route delayed due to traffic", { delayMinutes: 15 });
logger.error("Failed to upload completion proof", error);
```

---

## 7. Quality Gate Checklist for Driver App

Every feature branch in `apps/driver` must pass:
```bash
pnpm check          # Biome linting and formatting
pnpm typecheck      # TypeScript compilation across all packages
pnpm test           # Jest automated test suites
```
