# HAULIX Phase 03.22 — Android Visual QA Matrix

**Hardware Device:** MEIZU Lucky 08 (`431QHFHM223EK`)  
**OS Version:** Android 14 (Flyme OS / API 34)  
**Display Specs:** 1264 × 2780 px, sw389dp / 520 dpi  
**Target Screens:** 4 canonical bilingual routes (8 localized screen variants)  
**Verification Method:** Physical Android device execution via Expo Go (SDK 58), automated screencap capture over persistent ADB daemon (`tcp:8085`).

---

## 1. Visual Verification Matrix

| # | Screen ID | Route / Variant | Language | Authoritative Figma Node | Physical Device Capture | Visual & Functional Result |
|---|-----------|-----------------|----------|--------------------------|-------------------------|----------------------------|
| 1 | C19-P-R | `/replace-item-photo` | English | `382:1546` (430 × 1003 px) | `c19pr-en-overview.png`<br>`c19pr-en-scrolled.png`<br>`c19pr-en-confirmed.png` | **PASS** — Target item card (Dining table · 1 unit), replace upload dropzone, replacement sample preview, and banner notice verified. |
| 2 | C19-P-R-ES | `/replace-item-photo` | Spanish | `980:9692` (430 × 1003 px) | `c19pr-es-overview.png`<br>`c19pr-es-scrolled.png`<br>`c19pr-es-confirmed.png` | **PASS** — Full Spanish translations (`Mesa de comedor`, `Elegir foto de reemplazo`, `Confirmar ejemplo de reemplazo`) aligned with zero English bleed. |
| 3 | C19-P-F | `/photo-upload-failed` | English | `382:1590` (430 × 1220 px) | `c19pf-en-overview.png`<br>`c19pf-en-scrolled.png`<br>`c19pf-en-retried.png` | **PASS** — Amber alert banner (`Upload failed`), failed item row with error badge and retry trigger, saved photos section intact. |
| 4 | C19-P-F-ES | `/photo-upload-failed` | Spanish | `980:9752` (430 × 1220 px) | `c19pf-es-overview.png`<br>`c19pf-es-scrolled.png`<br>`c19pf-es-retried.png` | **PASS** — Spanish alert banner (`Error en la subida`), retry CTA (`Reintentar subida fallida`), and continue to access details link verified. |
| 5 | C19-P-E | `/item-photos-empty` | English | `382:1644` (430 × 809 px) | `c19pe-en-overview.png`<br>`c19pe-en-attached.png` | **PASS** — Empty media illustration, warning card (`No photos attached`), non-blocking notice (`Manual inventory is still saved`), review item details link. |
| 6 | C19-P-E-ES | `/item-photos-empty` | Spanish | `980:9822` (430 × 809 px) | `c19pe-es-overview.png`<br>`c19pe-es-attached.png` | **PASS** — Spanish empty state copy (`Sin fotos adjuntas`, `El inventario manual se mantiene guardado`), full localized review link. |
| 7 | C20 | `/access-details` | English | `382:1680` (430 × 1672 px) | `c20-en-overview.png`<br>`c20-en-scrolled.png`<br>`c20-en-continued.png` | **PASS** — Pickup & drop-off access cards (stairs, elevator, parking, walking distance), labor advisory card, continue to restrictions CTA (`C20-R`). |
| 8 | C20-ES | `/access-details` | Spanish | `980:9874` (430 × 1672 px) | `c20-es-overview.png`<br>`c20-es-scrolled.png`<br>`c20-es-continued.png` | **PASS** — Symmetrical Spanish access details (`Detalles de acceso y mano de obra`, `Punto de recogida`, `Destino de entrega`, `Aviso de mano de obra`). |

---

## 2. Interaction & State Verifications

### C19-P-R: Replace Item Photo
- **Target Item Display:** Renders item name ("Dining table" / "Mesa de comedor"), category ("Living & dining" / "Salón y comedor"), and unit count ("1 unit" / "1 unidad").
- **Dropzone & Actions:** Dropzone dashed border (`border-elevated` / `#35403B`), actionable buttons for "Confirm replacement example" and "Keep existing photo ›".
- **Notice Banner:** Tapping confirm dynamically displays top notice banner ("Replacement photo queued for upload" / "Foto de reemplazo en cola de subida") with auto-dismiss.

### C19-P-F: Photo Upload Failure
- **Amber Warning Card:** Border and background tokens reflect warning state (`bg-warning/10`, `border-warning/30`), with alert triangle SVG icon.
- **Failed Item List:** Highlights failed media ("Living room couch" / "Sofá de sala"), showing file size ("4.2 MB"), network error description, and retry action.
- **Saved Media Section:** Pre-existing uploaded media ("Dining table · saved") displayed with verified badge.
- **Retry Action:** Tapping "Retry failed upload" triggers retry simulation banner ("Re-attempting upload of 1 failed photo..." / "Reintentando la subida de 1 foto fallida...").
- **Navigation:** Tapping "Continue with saved media ›" routes smoothly to `/access-details` (C20).

### C19-P-E: Empty Media State
- **Centered Empty Illustration:** Visual camera with strike-through / dash SVG vector.
- **Informative Disclaimer:** Clear statement that photos are optional and manual inventory remains saved.
- **Select Photos CTA:** Tapping "Select photos to attach" surfaces simulated media selection banner.
- **Return Link:** Tapping "Review item details ›" routes back to `/item-inventory` (C19).

### C20: Access & Labor Details
- **Location Pin Icons:** Renders SVG pin icon (`C20PinIcon`) matched from Figma Node `382:1741`.
- **Pickup & Drop-off Cards:** Displays flight count (e.g. 2 flights), elevator availability (Yes/No), parking distance (e.g. < 50 ft), and pathway notes.
- **Labor Advisory Card:** Highlights team recommendation (e.g. 2 Pros recommended for heavy/fragile furniture) without premature billing.
- **Service Restrictions CTA:** Tapping "Continue to service restrictions" shows banner informing user of upcoming C20-R phase, while "Edit item quantities ›" routes back to `/item-inventory`.

---

## 3. Design Token & Alignment Fidelity

- **Color Tokens:**
  - Background: `colors.background` (`#101514`)
  - Surface: `colors.surface` (`#151A19`)
  - Elevated / Subtle borders: `#35403B` / `colors.border`
  - Brand Accent: `colors.brand` (`#00E599`)
  - Amber Warning: `colors.warning` (`#F59E0B`)
  - Text Primary: `colors.text` (`#FFFFFF`)
  - Text Secondary: `colors.textMuted` (`#8E9994`)
- **Typography:**
  - Headers: `fontFamily.bold` (`PlusJakartaSans-Bold`)
  - Body: `fontFamily.regular` (`PlusJakartaSans-Regular`)
  - Medium/Semibold labels: `PlusJakartaSans-SemiBold`
- **Safe Area Insets:** Handled by `HaulixSafeArea` across hardware status bar (145 px on Meizu Lucky 08) and gesture navigation bar (81 px).

---

## 4. Hardware Verification & Authenticity

All screenshots in `docs/qa/phase-03-22/screenshots/` were captured on physical Android hardware:
- Model: `MEIZU_Lucky_08` (`431QHFHM223EK`)
- Source: Android shell `screencap -p` pulled via ADB
- Zero simulated or mock screenshots were utilized.
