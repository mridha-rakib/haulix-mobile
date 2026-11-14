# C10 EN→ES · Navbar and Photo Regression Invariants

## Navbar: root cause from Phase 02.9.1

Previous Android bug: double safe-area bottom padding generated a large unwanted black strip. The correction (as reported) uses root safe area on `top,left,right`, with navbar handling Android `insets.bottom` exactly once; base nav height around **80dp**, plus bottom inset as appropriate. **Do not reset the root to full 4-edge safe area or add another bottom padding within the navbar.**

- Keep the C01 original shared _sculpted continuous curved edge_ vector and `Active=Account` styling. Do not recreate curve with rectangles or arbitrary border radii.
- Figma Spanish navbar: instance `965:10500`, 430×128 reference, `Locale=ES`. `Mis trabajos` is wider (`x=90, w=83`) than English; labels must never clip at 360dp.
- No blank dead region; controls above Android OS nav/gesture bar, not hidden or double inset.
- `Saved Addresses` must scroll fully above navbar, including lower CTA/touch target.
- Do not put bottom navbar on auth screens C06/C07/C08/C09.
- Implement localized label prop or i18n using same `CustomerBottomNav.tsx`, without copy-pasting a second Spanish component.
- Only navigate to **implemented** destinations. Deals is visual-only in the original design. Never invent a Deals route.

## Photo flow: keep real frontend functionality

- Reuse `ProfilePhotoActionSheet.tsx` and existing image picker, camera, crop, preview, save, remove-with-confirm.
- Both avatar/camera badge and shortcut row open the same sheet.
- Local persistence survives app restart; test actual file durability. Never assume selected `file://` URI is permanent if it is in a temporary cache.
- Existing English `SM` default initials; Spanish `BL` initials. User-selected image is preserved across language changes; after remove, correct locale initials appear.
- Translate all **app-owned** sheet labels and errors. Native camera/gallery UI belongs to Android and may use system language.
- Do not add platform auth guards, native permissions beyond existing camera/gallery needs, backend upload, or fake success records.

## Other behavioral contracts

- C10 ES: `Editar perfil` and `Direcciones guardadas` must not open unimplemented routes; preserve existing honest notice or equivalent frontend-only behavior.
- `Cerrar sesión` returns to C06 Sign-in without inventing real session revocation.
- EN↔ES language switch works both directions without losing photo persistence or reverting navbar correction.
- Test at 360dp Realme/Android 15 and optionally another width; compare Figma visual while allowing Android status/navigation differences.
