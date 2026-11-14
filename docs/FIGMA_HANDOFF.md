# Figma Handoff Guide — HAULIX Mobile

**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`

This document explains how to translate HAULIX Figma designs into React Native components.

---

## Principles

1. **Figma is the source of truth.** Never invent visual values — always check Figma first.
2. **Tokens come from `@haulix/design-tokens`.** If a token is missing, add it to the package.
3. **Components come from `@haulix/ui`.** If a primitive is missing, add it there.
4. **No hardcoded styles.** All colors, spacing, and fonts must reference tokens.

---

## Color Token Mapping

| Figma Token       | TypeScript             | Value     |
| ----------------- | ---------------------- | --------- |
| `brand/neon-lime` | `colors.brand`         | `#BAFF42` |
| `bg/base`         | `colors.background`    | `#080B0B` |
| `bg/surface`      | `colors.surface`       | `#151A19` |
| `bg/elevated`     | `colors.elevated`      | `#222827` |
| `text/primary`    | `colors.primaryText`   | `#F6F8F6` |
| `text/secondary`  | `colors.secondaryText` | `#ADB7B1` |

---

## Typography

| Figma style | Token                             |
| ----------- | --------------------------------- |
| Regular     | `fontFamily.regular` → Inter 400  |
| Medium      | `fontFamily.medium` → Inter 500   |
| Semibold    | `fontFamily.semiBold` → Inter 600 |
| Bold        | `fontFamily.bold` → Inter 700     |

Font sizes follow the `fontSize` scale in design-tokens.

---

## Screen Implementation Process

### Step 1: Identify the screen in Figma

Open `Q946h4YBGgyLsjnPtdyQNe` and find the specific frame/screen.

### Step 2: Identify missing tokens

Compare Figma color/spacing values to `packages/design-tokens/src/`.
Add any missing tokens there first.

### Step 3: Identify missing primitives

Check if `@haulix/ui` has the needed primitive. If not, add it.

### Step 4: Create the route file

```
apps/customer/app/<route>.tsx
apps/driver/app/<route>.tsx
```

### Step 5: Implement using tokens and primitives

```tsx
import { colors, spacing } from "@haulix/design-tokens";
import { HaulixText, HaulixButton, HaulixSafeArea } from "@haulix/ui";

export default function MyScreen() {
  return <HaulixSafeArea>{/* Use design tokens, not hardcoded values */}</HaulixSafeArea>;
}
```

### Step 6: Verify

```bash
pnpm check && pnpm typecheck && pnpm test
```

---

## What NOT to Do

- ❌ Hardcode `#BAFF42` — use `colors.brand`
- ❌ Hardcode `padding: 16` — use `spacing[4]`
- ❌ Invent screens not in Figma
- ❌ Use placeholder/random layout when Figma spec exists
- ❌ Modify Figma file from code — Figma is read-only from development

---

## Requesting Missing Figma Specs

If a screen doesn't exist in Figma yet, do NOT invent it.
Create a stub with a `// TODO: Figma spec pending` comment and log to the team.

---

## Phase Scope

| Phase              | Scope                                          |
| ------------------ | ---------------------------------------------- |
| Phase 01 (current) | Infrastructure only — no Figma screens         |
| Phase 02           | Customer Welcome + Auth screens from Figma     |
| Phase 03           | Driver Welcome + Auth screens from Figma       |
| Phase 04+          | Protected app screens, booking, jobs, payments |
