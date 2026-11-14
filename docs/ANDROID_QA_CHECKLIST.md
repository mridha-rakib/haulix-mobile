# Phase 02.9.1 — C10 Android QA Acceptance Checklist

## Navbar (blocking)

- [ ] Figma source C01 shared curve, five icons and central Book circle match C10 reference.
- [ ] No extra dead black region between bottom nav labels and Android's own 3-button navigation controls.
- [ ] No double bottom inset; measured root/nav/scroll layouts recorded.
- [ ] Navbar full viewport width and fixed, _not_ in scrolling account content.
- [ ] Final Saved Addresses CTA can scroll fully above navbar; nothing occluded.
- [ ] Account active lime, other 4 tabs muted as designed.
- [ ] Book circle centered, no extra thick glow or non-Figma decoration.
- [ ] No fake iOS white home indicator on Android; Android native system bar remains usable.
- [ ] Tabs have accessible hit areas; unimplemented destinations do not show fake page success.
- [ ] Auth C06–C09 have **no** navbar.
- [ ] Test 360dp Android, narrow screen, 3-button mode; test gesture mode if available.

## Photo management (blocking)

- [ ] Both the 72dp C10 avatar/camera control and Security & Profile Photo shortcut open **one** reusable sheet.
- [ ] Initial state: `SM` avatar, gallery and camera actions; remove unavailable.
- [ ] Gallery picker opens, cancel leaves old photo unchanged.
- [ ] Camera permission request and denial/cancel states handled; camera UI opens on Android.
- [ ] Image crop 1:1 where available; preview Save/Cancel state, Save updates circular avatar.
- [ ] Replace photo works and does not lose current avatar if canceled.
- [ ] Remove photo requires confirmation; confirmed removal returns `SM` initials.
- [ ] Saved local photo survives navigation and app relaunch; no cloud upload or fake user verification.
- [ ] Sheet/dialog safe areas, accessibility, Android Back, backdrop tap and portrait layout correct.
- [ ] Sensitive personal images are not copied into public QA artifacts.

## General

- [ ] C10 overall layout preserved, no duplicated content or card overlap.
- [ ] Blue gear floating overlay source identified (OS/Expo/app) and any app-owned debug overlay removed.
- [ ] `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm doctor` all pass.
- [ ] Frontend preview remains navigable in tested APK without authentication gates.
- [ ] Report clearly distinguishes APK installed vs Expo Go; includes before/after screenshots and measured cause.
- [ ] STOP after C10 correction; do not begin C10 Spanish or another screen.
