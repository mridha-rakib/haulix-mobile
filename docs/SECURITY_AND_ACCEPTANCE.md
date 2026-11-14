# C09 Spanish Security Gates & Acceptance

**This screen is an isolated, fictional post-auth return design preview.** The real HAULIX authentication backend and social OAuth verification are not connected.

1. Preserve the existing `__DEV__` guard and safe non-development fallback in `social-return.tsx`. Never expose fictional success contents in a release build, even when the route is deep-linked. Do not treat `expo export` as signed APK/runtime verification.
2. Do **not** route C06 `Continue with Google`/`Continue with Apple` to C09 under normal UX without verified OAuth flow. Keep existing honest unavailable notices.
3. `Ir a mi cuenta` MUST NOT enter customer authenticated routes; show localized, truthful unavailable-service notice instead.
4. `Elegir otro acceso` MUST navigate to the existing C06 `/(auth)/sign-in`, preserving Spanish locale; verify by **touch**, not only hardware Back.
5. Do not issue fake tokens, save fictional user data, or mark auth state as true in any store/context.
6. Keep fictional `Bryan Lopez` fixture only inside dev-only preview rendering. English preview retains its own fictional fixture `Sarah Mitchell`; this does **not** imply a real user's identity changes with language.
7. Remove/avoid the extra circular avatar in **both** locales (corrected in Phase 02.7 Final QA).
8. No new C09 ES screen, no fake provider OAuth callbacks, no implementation of C10, no backend service claims.
9. Regression: C06, C07, C08 in EN/ES still operate; production sign-in remains gated.
10. Release verification: if a real standalone signed/test release build cannot be generated/run, record **pending**. Bundling or static code inspection is not proof.

**Acceptance evidence:** actual Android before/after or Spanish screenshots; Figma vs Android design comparison when screenshot access exists; quality check command output; tests covering `__DEV__` and fallback; report of unresolved release-build security test.
