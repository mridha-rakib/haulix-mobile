# Phase 02.5 — Acceptance Gate

**Pass requires all items:**

1. Exactly C08 English Default, node `331:75`, implemented as one Customer auth route only.
2. Accessible, functional six-digit numeric OTP control; correct focus, keyboard, masking, paste/backspace, and responsive layout.
3. Figma hierarchy: brand, heading, single-dot Arizona chip, phone card, six boxes, resend row, two buttons, demo disclaimer; no bottom navigation.
4. Existing Expo, NativeWind, strict TypeScript, shared UI tokens retained. No unapproved version changes, no component duplication.
5. No SMS sent, OTP verified, token/session issued, account created, or countdown/cooldown falsely claimed without backend.
6. Source Figma screenshot captured, real device screenshots produced and compared. Where blocked, clearly mark **not verified** instead of pass.
7. Actual tapping of `Change phone number` reaches appropriate _existing_ phone-editing screen or an explicit blocker is reported; no new phone-entry screen.
8. C06/C07 and language switching regression tests pass; all four pnpm quality commands reported.
9. Do not start C08 Spanish/expired/error, C09, or any other screen.

**Expected next:** User reviews C08 English QA, then Phase 02.6 — C08 Spanish, using same route and no duplicated implementation.
