# Phase 02.9 — C10 English Android / APK QA checklist

## Visual fidelity

- [ ] Original Figma node `333:26` screenshot genuinely exported, or export blocker disclosed.
- [ ] Header, logo, notification bell, unread dot match Figma at device density.
- [ ] Top account status, customer card, `SM` avatar/camera badge (C10 only) match.
- [ ] Preferences and security shortcut cards match spacing and colors.
- [ ] All typography, row labels, mock values and lime icons match.
- [ ] Both action CTAs visible and pressable, no clipping or overlapping.
- [ ] Original sculpted bottom nav and active Account state match; nav fixed, content scrolls separately.
- [ ] 360 dp Android / 430 px Figma responsive comparison completed.
- [ ] Correct bottom safe area and app home/system bar, no duplicate fake iOS status bar.

## Unguarded frontend UI preview (explicit owner requirement)

- [ ] C10 accessible through direct route/deep-link in debug APK without auth state.
- [ ] C10 accessible through direct route/deep-link in **release APK** without `__DEV__` or release restriction; **mark pending if not built**.
- [ ] C09 `Go to My Account` navigates to C10 as a clearly documented **UI preview** (no fake OAuth or user session).
- [ ] C10 Sign out simply returns to C06; no invented backend logout or session.
- [ ] User fixture is static local demo data, never persisted as a verified session/account.
- [ ] No real backend auth or payment permissions bypassed; real integrations remain disabled/unimplemented.

## Scope & regression

- [ ] Customer shared bottom nav only in screens requiring it; C06–C09 auth screens have no bottom nav.
- [ ] `Deals` visual-only; no invented Deals route; unimplemented targets show notice.
- [ ] `Edit Profile`, `Saved Addresses`, `Change password`, `Profile photo`, notifications and language controls respond honestly without creating unrequested screens.
- [ ] English C10 only; C10 Spanish future phase, existing C06–C09 Spanish untouched.
- [ ] Existing C06–C09 routes and tests still pass; C09 contains no avatar badge.
- [ ] Quality gates: `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm doctor`.
- [ ] Screenshots and actual installed build variant documented; Expo Go ≠ APK validation.
