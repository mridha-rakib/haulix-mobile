# Figma Design Audit — C08 Phone Verification (English Default)

**Source:** Existing HAULIX file `Q946h4YBGgyLsjnPtdyQNe`, Working Copies page `293:9`, exact screen node `331:75` — _C08 · Phone Verification / Default [CU-02, NFR-01]_.

**Verified:** read-only `get_design_context`, node inspection and original screenshot. Reference size **430 × 788 px**. This is the only screen in scope.

## Frame hierarchy and geometry (coordinates relative to 430px screen)

| Element                     | Figma node |   X |   Y | Width | Height | Notes                                                   |
| --------------------------- | ---------- | --: | --: | ----: | -----: | ------------------------------------------------------- |
| Status-bar mock             | `435:404`  |  22 |  22 |   386 |     38 | Figma artwork only; on Android use native OS status bar |
| HAULIX logo / brand group   | `331:79`   |  22 |  81 |   386 |     89 | Wordmark + tagline                                      |
| Heading / description group | `331:84`   |  22 | 191 |   386 |     78 | Title 28px Inter Bold                                   |
| Arizona availability badge  | `331:87`   |  22 | 290 |   386 |     38 | One lime dot only                                       |
| OTP verification card       | `331:89`   |  22 | 349 |   386 |    236 | Dark surface, rounded corners                           |
| OTP entry row               | `331:91`   |  39 | 398 |   340 |     58 | 6 equal slots                                           |
| Resend/info row             | `331:105`  |  39 | 510 |   349 |     58 | Row text + right chevron                                |
| Actions group               | `331:110`  |  22 | 606 |   386 |    127 | Two 58px CTA regions with 11px gap                      |
| Safety / demo notice        | `331:117`  |  22 | 754 |   375 |     12 | Visible in this frame                                   |

Card phone number heading `331:90` is 17px Inter Semi Bold. Card first content inset: 17px.

### Six-digit input slots

- Container `331:91` is **340 × 58 px**.
- `331:92`, `331:94`, `331:96`, `331:98`, `331:100`, `331:102` are six **50 × 58 px** slot frames.
- Slot starting X positions inside the OTP container: 0, 58, 116, 174, 232, 290 → **8px gaps**.
- Each contains a **•** text node; first slot has active lime outline (`#BAFF42`), others no accent outline.
- Slot surface resembles `#222827`. Text is near-white `#F6F8F6`.
- Figma's six dot glyphs illustrate the input; they are not evidence a code was entered. Runtime must never prepopulate a real verification code or claim receipt of a text message.
- On narrow devices, reduce slot widths/gap proportionally; avoid horizontal overflow.

## Exact visible English text

| Component           | Copy                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| Brand tagline       | `WE HAUL IT ALL.`                                                    |
| Heading             | `Verify your number.`                                                |
| Description         | `Enter the one-time code sent to the registered demo number.`        |
| Availability badge  | `● PHOENIX, ARIZONA • HAULIX CUSTOMER`                               |
| Phone fixture       | `+1 602-555-0142`                                                    |
| Security help       | `Code expires after the verification window. Never share this code.` |
| Resend row title    | `Did not receive a code?`                                            |
| Resend row subtitle | `Resend available after cooldown`                                    |
| Primary button      | `Verify & Continue`                                                  |
| Secondary button    | `Change phone number`                                                |
| Safety disclosure   | `DEMO ONLY • No real authentication or messaging`                    |

## Main button detail

- Primary CTA `331:111`/instance `331:112`: lime `#BAFF42`, **54px-high inner button**, framed within 386×58 wrapper; default styled (NOT a visibly disabled instance).
- Secondary CTA `331:114`/instance `331:115`: `#151A19` surface + subtle border, lime label, 54px inner button.
- Do not visually invent another disabled state for the default reference; code can validate incomplete OTP before performing a protected action. No fake verification success.

## Typography and palette

- Font: Inter (use existing family and app assets).
- Title: 28 / 36, weight 700.
- Body: approx 13, weight 400.
- Service/location badge: 11, weight 600.
- Digit/dot: 20, weight 600.
- Resend title: 14, weight 600; subtitle 11 regular.
- Brand lime: `#BAFF42`; background: `#080B0B`; card: `#151A19`; elevated/OTP fill: `#222827`; text near-white: `#F6F8F6`; secondary text `#ADB7B1`.
- 430px is design reference, not an instruction to hardcode 430dp on Android.

## Explicitly out of scope

- C08-P Phone Sign-in Entry `331:253`.
- C08-E OTP Expired `331:281`.
- C08 Spanish `347:179`.
- Other loading, error, resend-success, or verified-success Figma states.
- C07 account creation backend, real SMS provider, auth token/session.

## Figma fidelity caveat

Original Figma screenshot was viewed during this inspection but **not bundled**: Figma-hosted temporary image URL was inaccessible to the local file container. Antigravity must capture its own high-fidelity reference directly from the Figma node and compare physical Android screenshots before claiming pixel-level fidelity.
