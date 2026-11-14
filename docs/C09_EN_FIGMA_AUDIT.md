# C09 English — Authoritative Figma Inspection

- File key: `Q946h4YBGgyLsjnPtdyQNe`
- Node: `331:118`
- Name: **C09 · Social Sign-in Return / Success [CU-03, NFR-01]**
- Frame: **430×743 px**, 26px radius, background `#080B0B`
- Parent: AUTH — ENGLISH | Login · Registration · Verification
- Direct design URL: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=331-118

## Important design interpretation

**This is a completed social-provider callback UI state**, not a login provider selection page. It displays the fictional success copy **“Account connected.”** for a demo profile. The Figma includes an explicit disclaimer that authentication is fictional: **“DEMO ONLY • No real authentication or messaging”**. Do NOT infer the production OAuth service has been implemented or that matching of existing customer records is active.

## Visual hierarchy / geometry

| Node ID   | Element                    | x,y                | Dimensions | Notes                                              |
| --------- | -------------------------- | ------------------ | ---------- | -------------------------------------------------- |
| `435:417` | iOS status bar _reference_ | 22,22              | 386×38     | Illustration; respect platform's native status bar |
| `331:122` | HAULIX wordmark/tagline    | 22,81              | 386×89     | Text-based branding; reuse existing                |
| `331:127` | Intro                      | 22,191             | 386×78     | Title 28px bold Inter, subtitle 13px               |
| `331:130` | Arizona chip               | 22,290             | 386×38     | Background `#1A2510`, 12px corner radius           |
| `331:132` | Provider card              | 22,349             | 386×191    | Surface `#151A19`, 18px corner radius              |
| `331:133` | Status row                 | 17,17 inside card  | 349×45     | Elevated `#222827`, radius 10; status dot          |
| `331:136` | Fictional customer row     | 17,73 inside card  | 349×58     | Name, email, chevron                               |
| `331:141` | Explanation                | 17,142 inside card | 345×32     | Secondary `#ADB7B1`                                |
| `331:142` | Buttons container          | 22,561             | 386×127    | 2 stacked button containers 58px high              |
| `331:144` | Primary button             | inset 10,2         | 366×54     | `#BAFF42`, radius 12                               |
| `331:147` | Secondary button           | inset 10,2         | 366×54     | Fill `#151A19`, border `#35403B`, radius 12        |
| `331:149` | Demo disclaimer            | 22,709             | 375×12     | Muted `#788580`                                    |

Use responsive React Native layout (430 reference, not a fixed production screen size). Status bar / SafeArea behavior must be native; don't duplicate a decorative iOS status bar on Android.

## Exact source copy (English)

| Meaning           | Literal Figma text                                                            |
| ----------------- | ----------------------------------------------------------------------------- |
| Brand             | `HAUL` + `IX`                                                                 |
| Tagline           | `WE HAUL IT ALL.`                                                             |
| Heading           | `Account connected.`                                                          |
| Subtitle          | `The provider completed sign-in for this fictional HAULIX demo profile.`      |
| Arizona chip      | `● PHOENIX, ARIZONA • HAULIX CUSTOMER`                                        |
| Provider status   | `Google sign-in returned successfully`                                        |
| Demo name         | `Sarah Mitchell`                                                              |
| Demo email        | `sarah.mitchell@example.test`                                                 |
| Explanation       | `Your existing customer records are available after secure account matching.` |
| Primary CTA       | `Go to My Account`                                                            |
| Secondary CTA     | `Sign in another way`                                                         |
| Footer disclaimer | `DEMO ONLY • No real authentication or messaging`                             |

The demo identity is a Figma fixture only. Never write it into any real user profile, secure storage, app-wide login state, or backend.

## Colors / fonts

- Brand lime: `#BAFF42`
- Background: `#080B0B`
- Card: `#151A19`
- Elevated status: `#222827`
- Availability chip: `#1A2510`
- Secondary button border: `#35403B`
- Muted text: `#788580`
- Secondary text: `#ADB7B1`
- Main text: `#F6F8F6`
- Font: Inter; title 28px bold.

## Visible assets

- No source raster image fills (`rawImages` from asset inspection = empty).
- No new bespoke SVG is required to replicate the C09 content: status dot and chevron can reuse existing primitives and existing icons where exact.
- Figma `download_assets` returns 6 vectors of the illustrative iOS status bar. Reuse existing/native platform status indicator behavior rather than injecting a separate iOS status bar asset into Android.
- The original Figma screenshot was viewed, but a PNG binary was not transferred to the local ZIP. It must be exported by the Agent if permitted; no Figma temporary asset URLs in runtime code.

## Acceptance interpretation

Implement **the visual preview state only in development/QA**; never wire it to unauthenticated Google/Apple buttons. A production build must not expose fictional sign-in success through route navigation or a deep link. `Go to My Account` must not enter any authenticated route until real verified backend/OAuth matching exists. The secondary button may return to existing C06 Sign-in.
