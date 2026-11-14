# Android QA Checklist — C08 OTP English Default (one screen)

Evidence directory: `docs/qa/c08/`. Use genuine device capture, not exported Figma imagery as proof of app execution.

- [ ] Confirm current Git status/base changes and ADB device identity; verify Expo development build/Expo Go mechanism explicitly.
- [ ] Capture Figma `331:75` **original reference screenshot** and store as `figma-C08-en-reference.png` in QA docs. No screenshot is supplied in this ZIP.
- [ ] Capture device initial top/full view as `android-C08-en-initial.png` and compare visually at 430px reference.
- [ ] Confirm no OS clock/dynamic-island drawings: native Android status bar and safe areas work.
- [ ] Verify HAULIX wordmark, 28px heading, two-line description, Phoenix chip, card dimensions, number, icon/chevron, bottom disclaimer.
- [ ] OTP six slots: responsive geometry ~50×58 with 8px gap at design width; focused first box outline; never overflow on small screen.
- [ ] Tapping any slot opens numeric keyboard; capture `android-C08-en-keyboard.png`.
- [ ] One numeric digit, multi-digit typing, paste of six digits, backspace, delete-to-empty and non-digit filtering; capture `android-C08-en-otp-interaction.png`.
- [ ] Value is not logged or persisted or leaked into accessible alert text; no test code is shown as real SMS or pre-entered token.
- [ ] Verify & Continue with incomplete code: local validation only; capture `android-C08-en-validation.png`.
- [ ] Six digits submitted: _explicit_ backend-unavailable notice, no OTP success/session/navigation; capture `android-C08-en-backend-not-connected.png`.
- [ ] Resend row: does not claim any SMS sent or invent server cooldown; capture `android-C08-en-resend-unavailable.png`.
- [ ] Tap Change phone number and verify correct existing screen navigation **via touch**, no hardware back shortcut; capture `android-C08-en-change-number-navigation.png`.
- [ ] No OTP error/expired/Spanish screen accidentally added, no bottom navbar on auth, no dev fixture buttons visible.
- [ ] Check keyboard obscuration/scroll and large font/small-width overflow; document tested settings.
- [ ] Run `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm doctor`, Metro, and note actual results.
- [ ] Regression smoke: C06 English+Spanish switch, C07 English+Spanish, C07 consent, C07→C06 link navigation still function.
- [ ] Record side-by-side comparisons including limitations and unexplained differences in the report.

**Stop condition:** Not approved until user reviews actual screenshot evidence and reports any mismatch. A successful agent build does not automatically certify pixel perfect design.
