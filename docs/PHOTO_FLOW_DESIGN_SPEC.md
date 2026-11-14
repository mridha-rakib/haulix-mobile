# Proposed Profile Photo Action Sheet — Frontend-Only C10 English

**Classification:** newly specified interaction design **not present as its own Figma screen**. Source Figma C10 (`333:26`) shows the `SM` circular avatar/camera badge at `941:8494` and the shortcut `Profile photo · Add / change / remove` under Security & Profile Photo. The existing C10-E (`333:116`) is a separate editing form for customer contact details; it does not define a photo picker flow.

## Interaction model

| From state           | Action                               | Next visible state                                          | Local change                  |
| -------------------- | ------------------------------------ | ----------------------------------------------------------- | ----------------------------- |
| Initials-only avatar | Tap avatar/camera or photo shortcut  | Photo actions sheet, add actions                            | None                          |
| No-photo sheet       | Choose from gallery                  | Native picker → crop → confirmation preview                 | None until Save               |
| No-photo sheet       | Take photo                           | Camera permission → OS camera → crop → confirmation preview | None until Save               |
| Preview              | Save photo                           | Account avatar shows local image + camera badge             | Locally save image URI/file   |
| Preview              | Cancel                               | Return to previous state                                    | No change                     |
| Has-photo sheet      | Change from gallery / Take new photo | OS picker/camera → preview                                  | Old photo stays until Save    |
| Has-photo sheet      | Remove photo                         | Confirm removal dialog                                      | No change until confirmed     |
| Confirm removal      | Remove                               | Account avatar reverts to SM initials                       | Delete local reference/file   |
| Confirm removal      | Keep photo                           | Photo sheet                                                 | None                          |
| Any OS interaction   | Cancel/deny/fail                     | Explain or return to prior state safely                     | None                          |
| App restart          | Navigate back to C10                 | Saved local avatar restored, or SM initials if removed      | Device-only local persistence |

## Visual specification (design proposal)

- Black dimming overlay, native accessible modal/bottom sheet with 20–24dp top corner radius.
- Surface `#151A19`, elevated rows `#222827`, lime accent `#BAFF42`, primary text `#F6F8F6`, muted text `#ADB7B1`, thin border `#35403B`.
- Top grab-handle 36×4, header **Profile photo**, large 88–96dp circular image/initials preview and optional line **Stored locally for frontend preview**.
- Minimum 44dp touchable rows. Labels **Choose from gallery**, **Take photo**, **Change from gallery**, **Take new photo**, **Remove photo**, **Save photo**, **Cancel**. Dangerous remove requires **Remove profile photo?** → **Remove / Keep photo**.
- After saving, the existing C10 avatar has the original Figma 72×72 size with 21×21 camera badge in the current account card; replacement uses clipped `Image` inside same circle. Keep original `SM` initials fallback.
- Scroll/safe-area-aware sheet; text scales and long localization handled gracefully when the C10 Spanish phase is implemented.

This flow may use Expo image-picker for genuinely working local frontend image selection and camera capture, with app-private persistent storage. It does **not** perform server upload or user account updates. Do not introduce mocked server success notices.
