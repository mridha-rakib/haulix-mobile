# C09 Security Gates — Mandatory

Figma C09 depicts a **fictional social sign-in success demo**, and HAULIX authentication services are not yet connected.

## Do not fabricate identity or authorization

- Do not treat a tap on Continue with Google/Apple as an actual OAuth callback or successful login.
- Do not generate a mock token, user session, verified provider payload, role assignment, or stored account.
- Do not show a production user `Account connected.` unless an actual identity provider OAuth result and backend authorization / account matching have been independently verified.
- Do not write the fictional Sarah Mitchell fixture anywhere persistent or into app-level auth context.
- Do not navigate to My Account or authenticated tabs from demo UI.
- Do not allow direct/deep-link access in a production build to a success-looking screen representing fictional authentication.
- Do not silently add Google/Apple SDKs, create OAuth client IDs, or register social providers in this single-screen phase.

## Safe implementation in current phase

Option A (preferred): Development-only visual QA component and route using an explicit `__DEV__` runtime guard. The route displays a clearly labeled fictional demo preview when development mode is on. In production, route access must show a neutral 'Authentication unavailable' message with a path back to existing C06 Sign-in; no success UI or fake identity.

Option B: A non-routed development fixture in the existing preview infrastructure, provided it is actually viewable and QA-able on Android and cannot be reached in production.

Use Figma exact static copy in the **dev-only design preview**. Show the Figma disclaimer. Any `Go to My Account` click should display an honest no-backend notice or remain disabled; never enter the app authenticated. `Sign in another way` may safely navigate to C06.

For future production integration, the success state may only be reachable **after** a provider authorization callback, integrity validation (e.g. OAuth state/PKCE), backend identity verification, and approved account matching / role authorization. Scope excludes implementing these now.

Any mismatch with requirements should be reported rather than hidden.
