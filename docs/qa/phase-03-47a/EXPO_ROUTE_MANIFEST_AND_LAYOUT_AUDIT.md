# Phase 03.47A Expo Route Manifest & Layout Audit

**PROJECT:** HAULIX Customer Mobile App  
**PHASE:** 03.47A Critical Hotfix  
**DOCUMENT:** `docs/qa/phase-03-47a/EXPO_ROUTE_MANIFEST_AND_LAYOUT_AUDIT.md`  
**WORKSPACE:** `apps/customer/app/`  
**STATUS:** VERIFIED & CONFORMANT

---

## 1. Expo Router Layout Hierarchy

The HAULIX Customer Mobile App layout hierarchy is strictly organized to ensure uninhibited frontend testing:

```
apps/customer/app/
├── _layout.tsx                     # Root Layout (QueryClient, SafeArea, FontLoader, QA Drawer)
├── (auth)/                         # Authentication Screens (Strictly zero bottom nav)
│   ├── login.tsx
│   ├── register.tsx
│   ├── forgot-password.tsx
│   └── _layout.tsx
└── (app)/                          # Protected / Core Flow Screens (No route-blocking guards)
    ├── _layout.tsx                 # App Stack Layout
    ├── searching-for-driver.tsx    # S10 (Initial Search - 10 mi)
    ├── search-expanded-20mi.tsx    # S20 (Expanded Search - 20 mi) [PHASE 03.47]
    ├── search-expanding-30mi.tsx   # S30 (Expanding Radius - 30 mi) [PHASE 03.47]
    ├── search-expanded-40mi.tsx    # S40 (Expanded Search - 40 mi) [PHASE 03.47]
    ├── search-expanded-50mi.tsx    # S50 (Searching Max - 50 mi) [PHASE 03.47]
    ├── driver-matched.tsx          # ASSIGNED (Driver Matched)
    ├── crew-tracking.tsx           # HELPER_CONFIRMED (Crew En Route)
    ├── driver-arrival-update.tsx   # DRIVER_LATE (Driver Delayed)
    ├── driver-reassigned.tsx       # REASSIGNED (Driver Reassigned)
    ├── no-driver-available.tsx     # NO_DRIVER (No Driver at 50 mi)
    ├── cancellation-windows.tsx    # CANCEL_REVIEW (Review Windows)
    └── request-canceled.tsx        # CANCELED (Fee-Free Cancellation)
```

---

## 2. Route Configuration Audit

Each route file in `apps/customer/app/(app)/` is registered as a standard Expo Router stack screen:

| Route Path               | File Target                                         | Export Type        | Auth Guards Present? |
| ------------------------ | --------------------------------------------------- | ------------------ | -------------------- |
| `/searching-for-driver`  | `apps/customer/app/(app)/searching-for-driver.tsx`  | `default function` | **NONE (Open)**      |
| `/search-expanded-20mi`  | `apps/customer/app/(app)/search-expanded-20mi.tsx`  | `default function` | **NONE (Open)**      |
| `/search-expanding-30mi` | `apps/customer/app/(app)/search-expanding-30mi.tsx` | `default function` | **NONE (Open)**      |
| `/search-expanded-40mi`  | `apps/customer/app/(app)/search-expanded-40mi.tsx`  | `default function` | **NONE (Open)**      |
| `/search-expanded-50mi`  | `apps/customer/app/(app)/search-expanded-50mi.tsx`  | `default function` | **NONE (Open)**      |
| `/driver-matched`        | `apps/customer/app/(app)/driver-matched.tsx`        | `default function` | **NONE (Open)**      |
| `/crew-tracking`         | `apps/customer/app/(app)/crew-tracking.tsx`         | `default function` | **NONE (Open)**      |
| `/driver-arrival-update` | `apps/customer/app/(app)/driver-arrival-update.tsx` | `default function` | **NONE (Open)**      |
| `/driver-reassigned`     | `apps/customer/app/(app)/driver-reassigned.tsx`     | `default function` | **NONE (Open)**      |
| `/no-driver-available`   | `apps/customer/app/(app)/no-driver-available.tsx`   | `default function` | **NONE (Open)**      |
| `/cancellation-windows`  | `apps/customer/app/(app)/cancellation-windows.tsx`  | `default function` | **NONE (Open)**      |
| `/request-canceled`      | `apps/customer/app/(app)/request-canceled.tsx`      | `default function` | **NONE (Open)**      |

---

## 3. Layout Stack Options Verification

In `apps/customer/app/(app)/_layout.tsx`, all four search stage routes are configured with:

```tsx
<Stack.Screen
  name="search-expanded-20mi"
  options={{
    headerShown: false,
    animation: "fade",
  }}
/>
<Stack.Screen
  name="search-expanding-30mi"
  options={{
    headerShown: false,
    animation: "fade",
  }}
/>
<Stack.Screen
  name="search-expanded-40mi"
  options={{
    headerShown: false,
    animation: "fade",
  }}
/>
<Stack.Screen
  name="search-expanded-50mi"
  options={{
    headerShown: false,
    animation: "fade",
  }}
/>
```
This ensures seamless, uninhibited route mounting without default native navigation bars, enabling full screen custom UI matching Figma.
