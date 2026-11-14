# C10 Account Overview (English) — Verified Figma Inspection

- File: `Q946h4YBGgyLsjnPtdyQNe`
- Source page: `05 — Working Copies · Safe Refinements` / Customer W01 Working Copies
- Node `333:26`, title `C10 · Account Overview / Default [CU-04, CU-05, CU-07, CU-09]`
- Source: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=333-26
- Frame size: **430 × 1580 px**. Long artboard; responsive scrolling is required on phones.

## Verified visible root section geometry (in frame coordinates, px)

| Node       | Section                                           |   X |    Y |   W |   H |
| ---------- | ------------------------------------------------- | --: | ---: | --: | --: |
| `333:30`   | Header / Brand                                    |  22 |   79 | 386 |  61 |
| `333:36`   | Page intro                                        |  22 |  159 | 386 |  78 |
| `333:39`   | Session-status chip                               |  22 |  256 | 386 |  43 |
| `333:43`   | Verified customer card                            |  22 |  318 | 386 | 340 |
| `333:66`   | Account & preferences card                        |  22 |  677 | 386 | 353 |
| `343:100`  | Sign out label                                    |  22 | 1049 | 379 |  15 |
| `348:127`  | Español switch                                    |  22 | 1083 | 378 |  15 |
| `936:8494` | Security & profile photo shortcuts                |  22 | 1117 | 386 | 140 |
| `333:95`   | Edit Profile CTA                                  |  22 | 1276 | 386 |  58 |
| `333:98`   | Saved Addresses CTA                               |  22 | 1353 | 386 |  58 |
| `959:8556` | Shared C01 bottom nav (Active=Account; Locale=EN) |   0 | 1430 | 430 | 128 |

## Verified strings

`My Account` · `Manage your HAULIX customer profile and booking preferences.` · `SARAH MITCHELL · CUSTOMER ACCOUNT` · `Verified customer` · `Customer` / `Sarah Mitchell` · `Email` / `sarah.mitchell@example.test` · `Phone · verified` / `+1 602-555-0142` · `Account verified · Arizona service area` · `Account & preferences` · `Saved pickup address` / `1234 E Example Lane, Phoenix` · `Language` / `English (United States)` · `Payment methods` / `TEST payment reference saved` · `Active booking` / `HX-DEMO-1027 · Junk Removal` · `↗ Sign out` · `🌐 Español · Cambiar idioma` · `SECURITY & PROFILE PHOTO` · `Change password` · `Profile photo · Add / change / remove` · `Edit Profile` · `Saved Addresses` · bottom nav `Home`, `My Jobs`, `Book`, `Deals`, `Account`.

## Visual/interaction distinctions

- **C10 actually includes the `SM` circular avatar**, camera badge and profile photo shortcut. The previous C09 removal of an incorrect avatar does not apply to C10.
- Shared bottom nav is exact original C01 sculpted curve, 430 × 128, Account active. Its Figma library description identifies Deals as visual-only, not a released route.
- Figma's iOS status bar is an illustrative design reference, not a directive to overlay a fake 9:41 status on Android.
- Fictional customer/account/payment/booking text comes from Figma for visual QA. No real account verified / payment saved / booking active state may be inferred from it.
- 19 individually extracted SVG source vectors are supplied; native text and circles (avatar initials) are implemented with React Native, not a raster photo.
- Reference screenshot **not embedded** in package; obtain directly from the source Figma link for visual comparison.
- **Owner's revised requirement:** no frontend auth/`__DEV__`/release guard may prevent testing designs in APK while only frontend UI is being built. Real backend security is a separate future phase.
