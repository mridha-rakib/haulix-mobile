# HAULIX Driver & Worker Mobile App
# Phase DW-F00 Foundation & Monorepo Handoff Specification

**Application:** `apps/driver` (`com.haulix.driver`)  
**Monorepo Location:** `c:\Users\rakib_bro\sta-projects\haulix\haulix-mobile\apps\driver`  
**Execution Phase:** DW-F00 (Engineering Implementation Milestone 0)  
**Acceptance Classification:** Pre-requisite for React Native Screen Implementation  

---

## 1. Objective & Scope

Phase DW-F00 establishes the technical runtime foundation for `apps/driver` within the HAULIX monorepo without implementing individual screen features. It addresses the missing `app.json` configuration, aligns NativeWind styling tokens, mounts the Expo Router root provider hierarchy, and creates the authoritative 5-tab navigation shell.

---

## 2. Mandatory Engineering Actions

### 2.1 Action 1: Create Authoritative `apps/driver/app.json`
`apps/driver` currently lacks an `app.json` manifest. Before running Expo commands or EAS builds, create `apps/driver/app.json`:

```json
{
  "expo": {
    "name": "HAULIX Driver",
    "slug": "haulix-driver",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#151A19"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.haulix.driver"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#151A19"
      },
      "package": "com.haulix.driver",
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "HAULIX requires your location to match nearby pickup requests and provide turn-by-turn navigation."
        }
      ],
      [
        "expo-camera",
        {
          "cameraPermission": "HAULIX requires camera access to capture required service completion evidence and vehicle inspection documents."
        }
      ]
    ],
    "scheme": "haulix-driver"
  }
}
```

### 2.2 Action 2: Configure NativeWind Preset & Token Invariants
Ensure `apps/driver/tailwind.config.js` extends the authoritative `@haulix/design-tokens/tailwind-preset`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("@haulix/design-tokens/tailwind-preset")],
  theme: {
    extend: {}
  },
  plugins: []
};
```

### 2.3 Action 3: Establish Root Layout & Providers
Mount in `apps/driver/app/_layout.tsx`:
1. `QueryClientProvider` (TanStack Query)
2. `SafeAreaProvider` (`react-native-safe-area-context`)
3. `ErrorBoundary` from `src/components/ErrorBoundary.tsx`
4. Global dark background `#151A19` (`bg-surface`)

### 2.4 Action 4: Build Authoritative 5-Tab Navigator Shell
Construct `apps/driver/app/(app)/(tabs)/_layout.tsx` implementing the 5 tabs matching Figma Master Frame `1084:26` and Icon Set `1314:320`:
- **Tab 1: Home** (Dynamic Driver `DW09` vs Helper `DW31`)
- **Tab 2: Jobs** (`DW10` Offers & Invitations)
- **Tab 3: Active** (`DW17` Live Transit & Dispatch)
- **Tab 4: Earnings** (`DW23` Wallet & Cash Out)
- **Tab 5: Profile** (Dynamic Driver `DW27` vs Helper `DW55`)

---

## 3. Monorepo Quality Gate Checklist
Before marking DW-F00 complete, the engineering team must verify:
- [ ] `apps/driver/app.json` exists and validates with Expo CLI.
- [ ] `pnpm --filter @haulix/driver check` (Biome linting & formatting passes).
- [ ] `pnpm --filter @haulix/driver typecheck` (TypeScript compiler passes with zero errors).
- [ ] No regression or code modifications in `apps/customer`.
- [ ] All design tokens imported exclusively from `@haulix/design-tokens`.
