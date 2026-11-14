# C10-E English — Verified Figma Audit

- **Source**: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=333-116
- File key: `Q946h4YBGgyLsjnPtdyQNe`
- Page: `05 — Working Copies · Safe Refinements`
- Node: `333:116` `C10-E · Edit Profile / Editing [CU-04, CU-02]`
- Frame: **430 × 1003**, background `#080B0B`; horizontal margin **22 px** (content width **386 px**).
- This is the _editing_ state. Related C10-S success (`333:171`) and C10-F failure (`335:627`) are separate Figma states, **not** in this phase.

## Vertical geometry (relative to frame)

| Layer                     | Node       |   x |   y |   w |   h | Notes                                                                         |
| ------------------------- | ---------- | --: | --: | --: | --: | ----------------------------------------------------------------------------- |
| Status illustration       | `435:577`  |  22 |  22 | 386 |  38 | Use platform native safe area; do not paint fake iOS status over Android bars |
| HAULIX header             | `333:120`  |  22 |  79 | 386 |  61 | Back circle 42×42, centered brand, bell w unread dot                          |
| Intro                     | `333:126`  |  22 | 159 | 386 |  62 | Title 28px, description 13px                                                  |
| Customer demo-status chip | `333:129`  |  22 | 240 | 386 |  43 | `SARAH MITCHELL  ·  CUSTOMER ACCOUNT`                                         |
| Profile info card         | `333:133`  |  22 | 302 | 386 | 378 | Surface `#151A19`, radius 18, padding 20                                      |
| Primary action frame      | `333:150`  |  22 | 699 | 386 |  58 | 364 × 54 primary button centered, lime `#BAFF42`                              |
| Secondary action frame    | `333:153`  |  22 | 776 | 386 |  58 | 364 × 54 dark outlined secondary                                              |
| Shared C01 bottom navbar  | `965:9598` |   0 | 853 | 430 | 128 | Active `Account`, Locale `EN`; platform-safe bottom placement                 |

## Card details

| Content               | Relative x | Relative y |   w |   h | Style / exact text                                          |
| --------------------- | ---------: | ---------: | --: | --: | ----------------------------------------------------------- |
| `Profile information` |         20 |         20 | 340 |  21 | 17px Inter Semibold                                         |
| `FULL NAME`           |         20 |         53 | 335 |  13 | 11px Inter Semibold                                         |
| Name field            |         20 |         78 | 345 |  54 | `#222827`, radius 11, icon 21px, `Sarah Mitchell`           |
| `EMAIL`               |         20 |        144 | 335 |  13 | 11px Inter Semibold                                         |
| Email field           |         20 |        169 | 345 |  54 | `sarah.mitchell@example.test`                               |
| `PHONE`               |         20 |        235 | 335 |  13 | 11px Inter Semibold                                         |
| Phone field           |         20 |        260 | 345 |  54 | Phone shield 21px; `+1 602-555-0142`                        |
| Phone guidance        |         20 |        326 | 343 |  32 | `Phone changes require successful verification before use.` |

Editable input text 13px Inter Medium and primary text `#F6F8F6`. Field elevation `#222827`. Base screen `#080B0B`; cards `#151A19`. Reuse shared design tokens.

## Exact visible copy

- `Edit profile`
- `Only customer-owned contact details can be edited here.`
- `SARAH MITCHELL  ·  CUSTOMER ACCOUNT`
- `Profile information`
- `FULL NAME`: `Sarah Mitchell`
- `EMAIL`: `sarah.mitchell@example.test`
- `PHONE`: `+1 602-555-0142`
- `Phone changes require successful verification before use.`
- `Save Changes`
- `Cancel Editing`
- Nav: `Home`, `My Jobs`, `Book`, `Deals`, `Account`

Hidden demo-branch `339:181` and hidden footnote `333:170` MUST NOT be added to the visible screen.

## Assets

Two exact new SVGs exported from this frame:

- `333:137` → `edit_name.svg`
- `333:146` → `edit_phone_shield.svg`

Nine **original shared** C10/C01 vector files were carried over from the prior C10 English Figma handoff (header / status / navbar). Agent should prefer existing typed `C10Icons.tsx`, existing navigation component, and original assets already in repo. Do not duplicate components or use temporary `figma.com/api/mcp/asset` URLs in runtime.

**Important:** Figma is a static visual state, not backend proof of verified phone or successful save.
