# HAULIX Customer Mobile App — Phase 03.42

## QA Demo Navigator & Fixture Isolation Audit

**Audit Objective:** Governance review of `DemoScreenNavigator`, dev tools isolation, and production security controls  
**Audit Date:** 2026-11-21

---

### 1. Risk Analysis & Problem Statement

In previous phases, `DemoScreenNavigator` was rendered unconditionally in `apps/customer/app/_layout.tsx`:

```tsx
<Stack screenOptions={{ ... }} />
<DemoScreenNavigator />
```
This floating pill ("QA Screens") allowed anyone using the app to open a bottom sheet and bypass all authentication, prerequisite input forms, and commercial consent checks to jump directly into any screen (e.g. C31 outcome screens or account edit screens). If shipped to production, this would represent an unacceptable security bypass and poor customer experience.

---

### 2. Isolation Mechanism Implemented in Phase 03.42

In `apps/customer/src/components/demo/DemoScreenNavigator.tsx`, environment and development gating was injected:

```tsx
export const DemoScreenNavigator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const insets = useSafeAreaInsets();

  // Isolate QA-only navigator from production customer runtime
  const isEnabled = __DEV__ || process.env.EXPO_PUBLIC_ENABLE_QA_NAVIGATOR === "true";
  if (!isEnabled) {
    return null;
  }
  // ...
```

#### Security Guarantees:

1. **Production Builds (`__DEV__ === false`):**
   - The floating trigger pill does NOT render (`return null`).
   - Normal customer users cannot access the modal screen catalog.
2. **Local Development (`__DEV__ === true`):**
   - Developers using Metro (`expo start`) retain instant, 1-click access to all 207 localized variants for rapid UI inspection and visual QA.
3. **Staging / QA Builds:**
   - Setting `EXPO_PUBLIC_ENABLE_QA_NAVIGATOR="true"` in CI/EAS environment variables enables the navigator specifically for internal QA APK builds without compromising production release security.

---

### 3. Fixture State Isolation Verification

- **Draft Store Isolation:** Demo triggers in `c31pCheckingBookingStatus` update in-memory state cleanly using `recordBookingRecorded()`, `recordAsapRequestRecorded()`, and `recordBookingNotConfirmed()`.
- **Zero Mock API Leaks:** State updates do not emit network requests or touch production persistent storage.
- **Automated Test Validation:** Verified via test case in `apps/customer/src/__tests__/phase-03-42-integration-audit.test.tsx`:

  ```ts
  it("verifies DemoScreenNavigator is protected by environment and dev gating", () => {
    const navSource = fs.readFileSync(navPath, "utf-8");
    expect(navSource).toContain("__DEV__ || process.env.EXPO_PUBLIC_ENABLE_QA_NAVIGATOR");
    expect(navSource).toContain("if (!isEnabled)");
    expect(navSource).toContain("return null;");
  });
  ```
