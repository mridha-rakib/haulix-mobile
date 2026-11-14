# HAULIX Mobile

> Two independent Expo React Native applications sharing infrastructure through a pnpm/Turborepo monorepo.

**Figma Source:** `Q946h4YBGgyLsjnPtdyQNe`

---

## Applications

| App             | Purpose              | Port | Bundle ID                          |
| --------------- | -------------------- | ---- | ---------------------------------- |
| `apps/customer` | HAULIX Customer      | 8081 | `com.haulix.customer` _(proposed)_ |
| `apps/driver`   | HAULIX Driver/Helper | 8082 | `com.haulix.driver` _(proposed)_   |

---

## Prerequisites

| Tool     | Version        |
| -------- | -------------- |
| Node.js  | ≥ 20 LTS       |
| pnpm     | 11.25.0        |
| Expo CLI | via `npx expo` |
| Git      | any recent     |

---

## Quick Start

```bash
# 1. Clone
git clone <repo-url> haulix-mobile
cd haulix-mobile

# 2. Install
pnpm install

# 3. Start apps
pnpm dev:customer     # Metro on :8081
pnpm dev:driver       # Metro on :8082
pnpm dev:all          # Both simultaneously
```

---

## Developer Commands

```bash
pnpm dev:customer     # Start Customer Expo dev server (port 8081)
pnpm dev:driver       # Start Driver Expo dev server (port 8082)
pnpm dev:all          # Start both servers concurrently

pnpm lint             # Run Biome linter
pnpm format           # Format all files with Biome
pnpm check            # Full Biome check (lint + format)
pnpm check:fix        # Auto-fix Biome issues
pnpm typecheck        # TypeScript strict check across all packages
pnpm test             # Run all Jest tests
pnpm doctor           # Health check the development environment
```

---

## Project Structure

```
haulix-mobile/
├── apps/
│   ├── customer/          # HAULIX Customer app (Expo Router)
│   │   ├── app/           # Expo Router file-based routes
│   │   │   ├── _layout.tsx       # Root layout
│   │   │   ├── index.tsx         # Redirect → /(auth)/welcome
│   │   │   ├── (auth)/           # Auth route group (no bottom nav)
│   │   │   └── (app)/            # Protected route group
│   │   ├── src/
│   │   │   └── components/
│   │   │       └── ErrorBoundary.tsx
│   │   ├── assets/        # Place PNG assets here (see assets/README.md)
│   │   ├── app.config.ts
│   │   ├── eas.json
│   │   └── package.json
│   └── driver/            # HAULIX Driver/Helper app (independent)
│       └── ...            # Mirrors customer structure
│
├── packages/
│   ├── design-tokens/     # @haulix/design-tokens — Figma-sourced tokens
│   ├── logger/            # @haulix/logger — structured dev logger
│   ├── utils/             # @haulix/utils — shared utilities
│   ├── i18n/              # @haulix/i18n — English + Spanish l10n
│   └── ui/                # @haulix/ui — shared primitive components
│
├── .github/workflows/ci.yml
├── biome.json             # Single linting/formatting config
├── turbo.json             # Turborepo pipeline
├── pnpm-workspace.yaml
├── tsconfig.base.json     # Shared TypeScript strict config
└── AGENTS.md              # Instructions for coding agents
```

---

## Shared Packages

| Package                 | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| `@haulix/design-tokens` | Colors, spacing, radius, typography from Figma      |
| `@haulix/logger`        | Structured logger with app context prefixes         |
| `@haulix/utils`         | Utility functions (clamp, debounce, assertDefined…) |
| `@haulix/i18n`          | i18next + react-i18next (English + Spanish)         |
| `@haulix/ui`            | Primitive components (HaulixText, HaulixButton…)    |

Import them in apps:

```ts
import { colors } from "@haulix/design-tokens";
import { createLogger } from "@haulix/logger";
import { HaulixButton } from "@haulix/ui";
```

---

## Environment Variables

Each app has a `.env.example`. Copy and configure:

```bash
cp apps/customer/.env.example apps/customer/.env.local
cp apps/driver/.env.example apps/driver/.env.local
```

**Rules:**

- `EXPO_PUBLIC_*` values are bundled in the JS — **never put secrets here**
- Private keys belong in backend environment or EAS secrets only

---

## Styling Foundation (NativeWind & Design Tokens)

Styling is powered by **NativeWind v4** synchronized with authoritative Figma tokens via `@haulix/design-tokens`:

- **Authoritative Tokens:** `packages/design-tokens` provides colors, Inter typography, spacing, and border radius.
- **Tailwind Preset:** `@haulix/design-tokens/tailwind-preset` exposes the tokens to Tailwind and NativeWind.
- **Utility Classes:** Use `bg-brand`, `bg-background`, `bg-surface`, `bg-elevated`, `text-primary-text`, `text-secondary-text`, `font-semibold`, etc.
- **Shared Primitives:** Reusable components in `@haulix/ui` (`HaulixButton`, `HaulixText`, `HaulixView`, `HaulixSafeArea`) accept both `className` and explicit design-token props.
- **Dev Styling Preview:** In development mode (`__DEV__`), both Customer and Driver provide a live styling verification screen at `/styling-preview` demonstrating brand colors, typography, button states, and localization (EN / ES).

---

## Testing

```bash
pnpm test                       # All packages + apps
pnpm --filter @haulix/logger test   # Single package
```

---

## Code Quality

Biome handles all linting and formatting — no ESLint or Prettier needed:

```bash
pnpm check         # Lint + format check
pnpm check:fix     # Auto-fix
```

Pre-commit hooks run automatically via Husky + lint-staged.

---

## EAS Builds

```bash
# From the app directory
cd apps/customer
npx eas build --profile development --platform ios
```

**Note:** EAS project IDs are PENDING — register them before the first build:

```bash
npx eas init   # run from each app directory
```

---

## Debugging

### Expo CLI terminal

Expo Metro bundler output appears in the terminal where `pnpm dev:*` runs.

### React Native DevTools

Open the DevTools overlay in Expo Go or by pressing `j` in the Metro terminal.

### Android Logcat

```bash
adb logcat --pid=$(adb shell pidof -s com.haulix.customer)
```

### iOS native logs

Use Xcode → Window → Devices and Simulators → View Device Logs.

---

## Next Steps (Phase 02)

After infrastructure is verified:

1. Export assets from Figma file `Q946h4YBGgyLsjnPtdyQNe`
2. Implement Customer welcome/auth screens
3. Implement Driver welcome/auth screens
4. Connect to real backend API

See [`docs/FIGMA_HANDOFF.md`](docs/FIGMA_HANDOFF.md) for the handoff process.
