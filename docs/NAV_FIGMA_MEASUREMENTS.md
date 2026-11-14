# Original Figma Nav vs Reported Android — C10

**Sources:** C10 Figma node `333:26`; shared C01 nav component `957:8794` / C10 instance `959:8556`. The supplied screenshot was attached by the project owner and is preserved under `evidence/`. These are observations, **not a confirmed diagnosis of Android code**.

## Grounded Figma 430×128 Reference

- Nav spans whole screen x=0..430; background edge with center raised curved dome; source `nav_sculpted_curve.svg` (exact exported Figma vector).
- Top curved-line side y≈23, peak x≈215/y≈2, lime Book circle 47×47 at x≈191.5/y=11; plus 24×24 at x≈203/y=22.
- Home icon x35/y38, My Jobs x≈119/y38, Deals x≈286/y38, Account x369/y38; icons 26×26.
- Labels top y≈72; active Account lime `#BAFF42`, inactive `#AAB5AF`.
- Original C01 iOS decorative home-indicator x151/y104, 128×4. **Omit this artificial home indicator on Android**, where system navigation is real, but do not create unused spacer in its place.

## Observed on User's Android Screenshot

- The visible five-tab navbar and Book button exist but appear visually different from Figma.
- Excessive black vertical space appears beneath the nav icon/label row and above the Android three-button system navigation area (the red outlined region); it must be eliminated.
- Confirm nav touches full viewport width rather than being inset by C10 horizontal content margins.
- There is a blue floating gear icon overlapping photo shortcut region; it may be OS/Expo developer overlay. Identify source before treating it as app UI.

## QA Diagnostic Requirements

Capture actual `useSafeAreaInsets().bottom`, root/account/navbar measured heights, `ScrollView` padding, system nav mode, and platform edge-to-edge behavior. Check for accidental duplicate safe-area padding, 128dp iOS nav scaffold on Android, internal/home-indicator spacer and footer outside the navbar. Re-test physically after correction. Do not guess exact root cause from screenshot alone.

Figma: https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe/HAULIX-UI-UX-Concept?node-id=333-26
