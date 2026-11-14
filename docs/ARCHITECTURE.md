# Architecture — HAULIX Mobile

## Monorepo Overview

```
pnpm workspaces + Turborepo
       │
       ├── apps/customer   (Expo SDK 58, React Native 0.88, Expo Router)
       ├── apps/driver     (Expo SDK 58, React Native 0.88, Expo Router)
       │
       └── packages/
           ├── design-tokens   (Figma → TypeScript tokens)
           ├── logger          (structured dev logger)
           ├── utils           (pure utility functions)
           ├── i18n            (i18next + react-i18next)
           └── ui              (React Native primitives)
```

## Dependency Flow

```
Figma (Q946h4YBGgyLsjnPtdyQNe)
        ↓ export tokens
@haulix/design-tokens
        ↓ consumed by
@haulix/ui  ──────────────────────────┐
@haulix/logger                        │
@haulix/utils                         ↓
@haulix/i18n                   apps/customer
                                apps/driver
```

## Why Two Independent Apps?

Customer and Driver are separate apps because:

1. Different App Store identities (`com.haulix.customer`, `com.haulix.driver`)
2. Different UX flows, navigation, and permissions
3. Independent release cadences
4. Driver app requires background location permissions not needed by Customer

They share infrastructure only (design system, logger, utilities, i18n).

## Styling Architecture (NativeWind & Design Tokens)

Styling is built on a shared, token-first foundation:

```
Figma (Q946h4YBGgyLsjnPtdyQNe)
        ↓ (Authoritative values)
@haulix/design-tokens (colors, spacing, typography, radius)
        ↓ (Tailwind Preset)
@haulix/design-tokens/tailwind-preset
        ├─────────────────────────────┐
        ↓                             ↓
apps/customer (NativeWind v4)   apps/driver (NativeWind v4)
  - global.css                    - global.css
  - tailwind.config.js            - tailwind.config.js
  - metro.config.js               - metro.config.js
```

### Key Architectural Tenets:

1. **Single Source of Truth:** Colors (`#BAFF42` brand, `#080B0B` background, `#151A19` surface, `#222827` elevated), Inter typography scales, and base 4px spacing live strictly in `@haulix/design-tokens`.
2. **Zero Drift:** `packages/design-tokens/src/preset.test.ts` unit-tests and guarantees that the Tailwind preset matches TypeScript token definitions 1:1.
3. **Dual Component Compatibility:** Shared primitives in `@haulix/ui` accept both Tailwind utility class names (`className`) and explicit props/styles.
4. **Build Tooling:** Expo SDK 58 Metro bundler is wrapped with `withNativeWind` and Babel uses `jsxImportSource: "nativewind"` + `nativewind/babel` + `react-native-reanimated/plugin`.

## How Packages Are Consumed

Internal packages use `workspace:*` protocol in package.json:

```json
"@haulix/design-tokens": "workspace:*"
```

This means pnpm symlinks the local package — no npm publishing needed.

Turborepo handles build ordering so packages build before apps.

## Screen Implementation Process (Phase 02+)

1. Open Figma file: `Q946h4YBGgyLsjnPtdyQNe`
2. Identify the screen to implement
3. Check if any tokens are missing from `@haulix/design-tokens` → add them
4. Check if any primitives are missing from `@haulix/ui` → add them
5. Create the screen component in `apps/<app>/app/<route>.tsx`
6. Connect to real API via TanStack Query hooks in `apps/<app>/src/hooks/`
7. Run `pnpm check && pnpm typecheck && pnpm test`

## State Management

- **Server state**: TanStack Query (`@tanstack/react-query`)
- **Client/UI state**: Zustand (`zustand`)
- **Forms**: React Hook Form + Zod validation
- **Auth tokens**: Expo SecureStore (never AsyncStorage for sensitive data)

## Navigation Architecture

```
Expo Router (file-based)
├── _layout.tsx          Root: QueryClient, fonts, SafeArea, ErrorBoundary
├── index.tsx            Redirect based on auth state (from server)
├── (auth)/              Public screens — no bottom nav
│   ├── _layout.tsx
│   ├── welcome.tsx
│   ├── sign-in.tsx      (Phase 02)
│   └── otp.tsx          (Phase 02)
└── (app)/               Protected screens
    ├── _layout.tsx      Add bottom navigation here in Phase 02
    └── index.tsx
```

## TypeScript Configuration

All packages inherit `tsconfig.base.json` with strict mode enabled.
Apps add `jsx: "react-native"` and appropriate `lib` targets.

## Testing Strategy

| Level     | Tool                                | Location                   |
| --------- | ----------------------------------- | -------------------------- |
| Unit      | Jest + @babel/preset-typescript     | `packages/*/src/*.test.ts` |
| Component | Jest + React Native Testing Library | `apps/*/src/**/*.test.tsx` |
| E2E       | Maestro (future phase)              | `e2e/` (not yet created)   |
