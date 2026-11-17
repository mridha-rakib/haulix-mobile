# Owner-approved premium visual acceptance — Spanish C16

**Owner reference:** `references/OWNER_C16_PREMIUM_TARGET.png` (screen capture, **688×2048 screenshot pixels**; not Figma frame dp). Source was supplied by product owner. This image has an incorrect `C10` step indicator; correct implementation uses `C16`.

**Preexisting accepted React Native implementation** (according to prior agent report):

- `apps/customer/app/(app)/service-area.tsx` — premium address and eligibility cards, four icon-led actions.
- `apps/customer/src/components/discovery/C16Icons.tsx` — ten SVG component exports.
- `apps/customer/src/components/navigation/FlowHeaderBack.tsx` — fixed header with visible Back.

| Element           | Must remain visibly present in Spanish                                | Verification                                   |
| ----------------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| Back              | white arrow in dark 39px roundel, 42px frame, >=48dp hit area         | screenshots top / bottom + tap + hardware back |
| Header            | centered HAULIX, original tagline, no duplicated native status bar    | top screenshot                                 |
| Step indicator    | W02 Spanish, correct `C16` code                                       | top screenshot                                 |
| Pickup heading    | prominent green location pin icon                                     | address screenshot                             |
| Street row        | white Home SVG + divider + label/value                                | address screenshot                             |
| City row          | white Buildings SVG + divider                                         | address screenshot                             |
| State row         | white folded Map SVG + divider                                        | address screenshot                             |
| ZIP row           | white Envelope SVG + divider                                          | address screenshot                             |
| Eligibility title | lime shield-check icon                                                | eligibility screenshot                         |
| Status strip      | green check icon and Spanish demo-only label                          | eligibility screenshot                         |
| Primary CTA       | lime fill, dark location-pin icon + Spanish text                      | bottom screenshot                              |
| Secondary CTAs    | dark outlined, lime swap-arrows/crosshair/info icons + Spanish labels | bottom screenshot                              |
| Footer            | demo disclaimer, metadata; no bottom tab bar                          | bottom screenshot                              |

**Prohibited regressions:** premium icons removed; plain Figma simple rows replacing rich rows; icon clipped by long Spanish labels; 2-line title overlapping neighboring elements; back covered by header/status bar, missing after scroll, or unclickable; screenshot pasted as a background; unauthorized backend checking; fake C17 navigation; Spanish name shows Sarah Mitchell; English C16 starts showing Spanish copy.

**QA must compare actual device to owner screenshot** and to corrected English C16 Android screenshots. Mention any justified difference (longer Spanish text, native status bar, dynamic customer name) without silently weakening design.
