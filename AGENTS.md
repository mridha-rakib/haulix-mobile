# AGENTS.md — Instructions for Coding Agents

> This file is for future coding agents (Claude, Gemini, GPT, Cursor, etc.) working on HAULIX Mobile.
> Read this before making any changes.

---

## Critical Rules

### 1. Respect Figma Tokens & Styling Foundation

- ALL design tokens must come from the HAULIX Figma file: `Q946h4YBGgyLsjnPtdyQNe`
- Import tokens from `@haulix/design-tokens` or use synchronized NativeWind classes configured in `@haulix/design-tokens/tailwind-preset`
- If a token is missing, check Figma before inventing a value
- Never create a "close enough" color — use the exact token

```tsx
// ✅ Correct (NativeWind className using HAULIX tokens)
<View className="bg-surface p-4 rounded-xl border border-elevated" />
<Text className="text-brand font-semibold text-base">HAULIX</Text>

// ✅ Correct (StyleSheet using design token imports)
import { colors, spacing } from "@haulix/design-tokens";
<View style={{ backgroundColor: colors.surface, padding: spacing[4] }} />

// ❌ Wrong — hardcoded arbitrary values
<View className="bg-[#151A19] p-[16px]" />
<View style={{ backgroundColor: "#151A19", padding: 16 }} />
```

#### NativeWind vs React Native StyleSheet:

- **Use NativeWind `className`** for layout, spacing, flexbox, surface backgrounds, borders, padding, margins, and standard typography variants.
- **Use React Native `StyleSheet` / `style`** for dynamic runtime calculations, animated styles (e.g. Reanimated shared values), or complex platform-specific transforms.
- Do NOT mix conflicting styles; NativeWind classes take layout precedence, with inline `style` as override.

### 2. No Fabricated Backend States

- Never implement fake authentication flows that always succeed
- Never hardcode successful API responses in components
- Never simulate role switching locally — Driver/Helper roles come from the server only
- Loading and error states must be real states, not bypassed

### 3. Preserve Role Boundaries

- Customer and Driver apps are INDEPENDENT — no shared routes or navigation
- Driver role (Primary Driver vs Helper) is determined EXCLUSIVELY by backend eligibility data
- Never add a UI toggle for switching roles locally

### 4. Reuse Shared Components

- Before creating a new component, check `packages/ui` first
- New reusable primitives go in `packages/ui`, not inside an app
- App-specific components stay in `apps/<app>/src/components`

### 5. Run Checks After Changes

After any modification, run:

```bash
pnpm check          # Biome lint/format
pnpm typecheck      # TypeScript
pnpm test           # Tests
```

Pre-commit hooks will catch issues, but run checks manually during development.

---

## Architecture

```
Figma tokens → @haulix/design-tokens → @haulix/ui → apps
```

Each app has:

- `app/_layout.tsx` — root Expo Router layout (QueryClient, fonts, SafeArea)
- `app/(auth)/` — authentication screens (no bottom nav)
- `app/(app)/` — protected screens (authenticated users only)
- `src/components/ErrorBoundary.tsx` — root error boundary

---

## Package Responsibilities

| Package                 | Add here                           | Do NOT add here                  |
| ----------------------- | ---------------------------------- | -------------------------------- |
| `@haulix/design-tokens` | Figma-sourced tokens only          | Business logic, React components |
| `@haulix/logger`        | Log formatting, redaction          | Analytics, tracking, A/B testing |
| `@haulix/utils`         | Pure functions, type guards        | React hooks, platform APIs       |
| `@haulix/i18n`          | Translation strings, locale config | UI rendering                     |
| `@haulix/ui`            | Shared primitive components        | Screen-level layouts, navigation |

---

## Logging

Use the structured logger — never use raw `console.log` for application code:

```ts
import { createLogger } from "@haulix/logger";
const logger = createLogger("CUSTOMER"); // or "DRIVER" or "SHARED"

logger.debug("Fetching jobs", { userId: id }); // Dev-only
logger.info("Job accepted");
logger.warn("Retry attempt", { count: 3 });
logger.error("Payment failed", error); // Logs stack trace
```

**Never log:** passwords, tokens, credit card data, SSN, emails, phone numbers.

---

## Navigation Rules

- Authentication screens (`(auth)/`) must NEVER show bottom navigation
- Modal routes must be separate from normal page routes
- Use Expo Router's file-based routing — no manual NavigationContainer

---

## Environment Variables

- `EXPO_PUBLIC_*` values are public — no secrets
- Use `.env.example` as the template
- Real credentials go in EAS secrets or backend only

---

## Figma Handoff Process

See [`docs/FIGMA_HANDOFF.md`](docs/FIGMA_HANDOFF.md) for the step-by-step screen implementation process.

**Current Phase:** Infrastructure, Branding & Styling Foundation (Phase 01, Phase 01.1, Phase 01.2 completed)
**Next Phase:** Figma → React Native screen implementation (Phase 02)
