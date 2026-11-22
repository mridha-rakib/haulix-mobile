# Development Guide — HAULIX Mobile

## Setup

```bash
git clone <repo> && cd haulix-mobile
pnpm install
pnpm doctor        # Verify environment
```

## Running Apps

| Command             | Description                 |
| ------------------- | --------------------------- |
| `pnpm dev:customer` | Customer Metro on port 8081 |
| `pnpm dev:driver`   | Driver Metro on port 8082   |
| `pnpm dev:all`      | Both servers simultaneously |

Then:

- Press `a` for Android emulator
- Press `i` for iOS simulator
- Press `w` for web browser
- Scan QR with Expo Go

## Code Quality

```bash
pnpm check         # Check everything
pnpm check:fix     # Auto-fix
pnpm typecheck     # TS only
pnpm test          # Tests
```

**Pre-commit hook** runs `biome check --write` on staged files automatically.

## Styling with NativeWind

The monorepo uses **NativeWind v4** backed by Tailwind CSS v3 and synchronized `@haulix/design-tokens`.

### Recommended Patterns:

```tsx
import { HaulixSafeArea, HaulixText, HaulixButton, HaulixView } from "@haulix/ui";
import { View } from "react-native";

export default function MyScreen() {
  return (
    <HaulixSafeArea>
      {/* Container with background and responsive constraints */}
      <View className="flex-1 px-4 py-6 w-full max-w-md self-center">
        <HaulixText variant="brand" size="2xl" weight="bold" className="mb-2">
          Title
        </HaulixText>

        {/* Surface card */}
        <HaulixView surface="surface" className="p-4 rounded-xl border border-elevated mb-4">
          <HaulixText variant="secondary" size="sm">
            Content on surface card
          </HaulixText>
        </HaulixView>

        {/* Buttons */}
        <HaulixButton label="Continue" variant="primary" fullWidth className="mt-auto" />
      </View>
    </HaulixSafeArea>
  );
}
```

### When to use NativeWind vs React Native StyleSheet:

- **NativeWind:** Flexbox layouts, grid alignments, margins/paddings, colors, borders, typography weights.
- **StyleSheet:** Dynamic runtime dimensions, native animated transforms, performance-critical loops.

### Dev Styling Verification Screen:

In `__DEV__` mode, navigate to `/styling-preview` to inspect live brand tokens, typography scales, button interaction states, and Spanish/English localization layout symmetry.

## Adding a New Screen

1. Create the route file: `apps/<app>/app/<route>.tsx`
2. Use tokens from `@haulix/design-tokens`
3. Use primitives from `@haulix/ui`
4. Use logger from `@haulix/logger`
5. Add a test in `apps/<app>/src/__tests__/`

## Adding a Shared Utility

1. Add the function to `packages/utils/src/index.ts`
2. Add a test in `packages/utils/src/utils.test.ts`
3. Run `pnpm --filter @haulix/utils test`

## Adding a Translation

1. Add English key to `packages/i18n/src/locales/en.ts`
2. Add Spanish translation to `packages/i18n/src/locales/es.ts`
3. Use in components: `const { t } = useTranslation(); t("common.loading")`

## Debugging

### Expo Terminal

Metro bundler output is in the terminal. `console.log` output appears here but
use `@haulix/logger` methods for structured logging.

### React Native DevTools

Press `j` in Metro terminal, or open the DevTools URL shown.

### Android Logcat

```bash
# Filter by app
adb logcat --pid=$(adb shell pidof -s com.haulix.customer) *:D
```

### iOS Native Logs

```bash
# In Xcode: Window → Devices and Simulators → View Device Logs
# Or use Console.app filtered by "haulix"
```

## Environment Variables

```bash
# Customer
cp apps/customer/.env.example apps/customer/.env.local

# Driver  
cp apps/driver/.env.example apps/driver/.env.local
```

Edit `.env.local` with your local dev values. Never commit it.

## EAS Build Setup (before first native build)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Register projects (do this once, from each app directory)
cd apps/customer && eas init
cd apps/driver && eas init
```

## Common Issues

### Metro bundler conflict

If both apps fail to start, verify they use different ports:

- Customer: `expo start --port 8081`
- Driver: `expo start --port 8082`

### TypeScript errors in .expo/types

Run `pnpm dev:customer` once to generate the `expo-env.d.ts` file.

### pnpm install fails

Ensure pnpm 11.x is installed: `npm install -g pnpm@11.25.0`
