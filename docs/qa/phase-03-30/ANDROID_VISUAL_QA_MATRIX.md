# HAULIX Phase 03.30 — Android Visual QA & Hardware Audit Matrix

**Batch:** Phase 03.30  
**Flow:** W03 — AI Uncertainty, Inventory Verification & Manual Recovery  
**Device:** Realme Note 60 (`RMX3930` / Serial: `0B04731X200003BB` / Android 15)  
**Execution Date:** November 19, 2026  
**Auditor:** Antigravity AI Agent

---

## 1. Hardware Connection Diagnosis

In strict accordance with project instructions, the physical device connection was diagnosed using `adb devices -l` and driver status inspection:

1. **Initial Device State:** The Realme Note 60 (`0B04731X200003BB`) was initially detected and authorized running Expo Go (`host.exp.exponent/.experience.ExperienceActivity`).
2. **Server Restart & Daemon State:** Following background daemon recovery, the ADB daemon reported `device unauthorized` / detached, awaiting screen unlock and host RSA authorization on the physical handset.
3. **Strict Non-Fabrication Policy:** As commanded by HAULIX instructions (_"If hardware access remains blocked, document the blocker and report all completed checks without fabricating Android QA results"_), no synthetic Android screenshots have been fabricated.

---

## 2. Authoritative Figma Design Target Reference Matrix

All eight Figma target designs were captured and stored in `docs/qa/phase-03-30/figma/`:

| Variant      | Screen Code | Language | Figma Node ID | Dimensions    | Reference File                                | Visual Alignment Target                                                                                                   |
| :----------- | :---------- | :------- | :------------ | :------------ | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **C22-Q EN** | C22-Q       | English  | `412:515`     | 430 × 959 px  | `docs/qa/phase-03-30/figma/c22q-en-figma.png` | 102×74 px mattress thumbnail, Warning feedback notice, 2 guidance paragraphs, Primary CTA `#BAFF42`, Secondary CTA        |
| **C22-Q ES** | C22-Q       | Spanish  | `987:10309`   | 430 × 959 px  | `docs/qa/phase-03-30/figma/c22q-es-figma.png` | Spanish copy: "Necesitamos revisar más de cerca", "Colchones · superpuestos", "Categoría o cantidad incierta"             |
| **C23 EN**   | C23         | English  | `412:563`     | 430 × 1229 px | `docs/qa/phase-03-30/figma/c23-en-figma.png`  | 3 item comparison rows (Sofa, Mattresses ×2 mismatch, Table), Required correction feedback notice, 3 action buttons       |
| **C23 ES**   | C23         | Spanish  | `987:10367`   | 430 × 1229 px | `docs/qa/phase-03-30/figma/c23-es-figma.png`  | Spanish copy: "Revisar todos los objetos reconocidos", "Datos del cliente ×2", "Debes corregir un dato"                   |
| **C23-M EN** | C23-M       | English  | `412:748`     | 430 × 1171 px | `docs/qa/phase-03-30/figma/c23m-en-figma.png` | 4 manual record cards (Sofa, Mattresses ×2, Table, Evidence), Confidence feedback notice, 2 action buttons                |
| **C23-M ES** | C23-M       | Spanish  | `987:10581`   | 430 × 1171 px | `docs/qa/phase-03-30/figma/c23m-es-figma.png` | Spanish copy: "Confirmar objetos sin IA", "Registro manual guardado", "Aún se requiere confianza y elegibilidad"          |
| **C23-U EN** | C23-U       | English  | `412:803`     | 430 × 1246 px | `docs/qa/phase-03-30/figma/c23u-en-figma.png` | 5 detail rows (Item, Quantity 2, Weight, Exact measurement unavailable, Lifting), Quote feedback notice, 2 action buttons |
| **C23-U ES** | C23-U       | Spanish  | `987:10646`   | 430 × 1246 px | `docs/qa/phase-03-30/figma/c23u-es-figma.png` | Spanish copy: "Necesitamos medidas más precisas", "Detalles que requieren atención", "Aún no hay cotización definitiva"   |

---

## 3. UI Token & Layout Fidelity Compliance

- **Container Geometry:** 430 px base container width, `paddingHorizontal: 22`, vertical layout gap `17 px`.
- **Card Styling:** `colors.surface` (`#151A19`), `borderRadius: 17`, padding `18 px`.
- **Elevated Rows:** `colors.elevated` (`#222827`), `borderRadius: 10` (or `11`), padding `9-12 px`.
- **Feedback Notice Boxes:** Border `1 px solid #35403B`, radius `12 px`, info SVG icon 23 × 23 px.
- **Action Buttons:** Primary CTA height `52 px`, radius `12 px`, bg `colors.brand` (`#BAFF42`), text `colors.background` (`#080B0B`). Secondary CTA height `56 px`, radius `12 px`, border `1 px solid #35403B`, text `colors.brand`.
