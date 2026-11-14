# Edit Profile — Frontend-only Behavior & Data Semantics

This document specifies **frontend QA behavior**, not new SRS backend contracts.

## Preload / Data model

- Open C10-E from existing `apps/customer/app/(app)/account.tsx` on the English Account Overview. Use current locale-bound English **fictional** demo profile, initially Sarah Mitchell, the example email and Arizona sample phone.
- Reuse the existing source-of-truth `c10DemoProfile.ts` fixtures. Never mutate them in place or add mock JWT/OAuth sessions.
- Create a minimal, typed frontend draft/preview overlay scoped to the English demo profile if necessary to reflect saved edits on C10. Store only what is appropriate for local frontend QA, and don't overwrite the Spanish Bryan fixture when switching locale.
- If you need persistent demo previews after relaunch, use a uniquely named _demo-only_ storage key, document its scope and provide a reset path. Do not claim remote persistence.

## Input functionality

- Full name: editable text, trims whitespace and rejects blank/whitespace-only submissions.
- Email: editable with `keyboardType="email-address"`, auto-capitalization disabled, basic local syntax validation; input remains mock data, not proof of email verification.
- Phone: `keyboardType="phone-pad"`, preserve `+1` display and editable formatting. Validate basic format for frontend; don't silently accept invalid characters or claim that a changed number is verified.
- Inline validation, focus/blur, keyboard navigation, accessibility labels, and keyboard avoidance on Android; make controls reachable above the fixed navbar.
- Treat Figma values as default demo presentation, not claims about an actual user.

## Save Changes

- If no changes, handle consistently (e.g. disabled primary state or honest local notice), without fake network request.
- For valid **name/email-only** changes: update local English demo preview state, show a truthful `Saved locally for frontend preview` notice, return to existing C10 overview without implementing the separate C10-S success page.
- If the **phone number changes**, do not apply it to a field labeled "verified". Keep the phone edit as pending in form state and show an explicit informational message: `Phone changes require verification. SMS verification is not connected in this frontend demo.` Let user restore original number to save the other valid edits. No actual OTP send, backend API or identity verification.
- Block invalid Save with on-screen errors (no successful route, no mock server response).
- Never navigate to `C10-S`, `C10-F` or a fabricated production success screen in this phase.

## Cancel Editing and leaving

- Cancel returns to C10 without applying unsaved draft values; no mutation of persisted fixture.
- Back button also returns to account and handles unsaved changes predictably; prefer a simple confirmation only if user has changes and native UX needs it (not required by Figma).
- Preserve active EN locale and any existing Profile Photo local state.
- Keep C10 Spanish untouched, including Bryan Lopez/BL default and Spanish navbar.

## Navigation & QA

- Do not introduce `__DEV__` gating, login/session guard or server dependency that blocks accessing frontend screens from client-demo APK.
- Reuse `CustomerBottomNav` with Account active, **not** a duplicate nav implementation. Never add bottom nav to C06–C09 auth screens.
- Deals remains visual-only (no unapproved route).
- Keep the QA screen navigator functional if it already exists; don't expose secret backend tokens or accounts.
