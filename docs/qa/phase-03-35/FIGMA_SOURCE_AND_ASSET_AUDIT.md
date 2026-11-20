# HAULIX Customer App — Phase 03.35

## W04 Figma Source & Component Asset Audit

**Phase:** 03.35  
**Target:** 4 Canonical Screens × EN/ES = 8 Master Figma Frames  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Direct File URL:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe

---

## 1. Document Architecture & Node Mapping

The Figma file structure houses the master W04 native components on Page `1:2`:

- **Document Root:** `0:0`
- **Master Customer App Page:** `1:2` (`01 — Customer App (5 Screens)`)
  - **English Section:** `758:2` (`W04 — ENGLISH | Scheduling • Terms • Stripe Authorization • Recovery • Booking`)
    - Coordinates: `x: 110, y: 72300`, Size: `2230 × 7526 px`
  - **Spanish Section:** `758:3` (`W04 — ESPAÑOL | Programación • Términos • Autorización • Recuperación • Reserva`)
    - Coordinates: `x: 2900, y: 72300`, Size: `2230 × 7610 px`
- **Dedicated Workflow Page:** `432:737` (`Customer — W04 Scheduling & Payment · EN + ES`)
  - Contains Directory Frame `432:738` (`W04 / Workflow Page Directory`)

---

## 2. Canonical Node Audit Table

| Canonical ID | Language | Node ID   | Frame Name in Figma                                 | Canvas Width | Canvas Height | Direct Figma URL                                                                     |
| :----------- | :------- | :-------- | :-------------------------------------------------- | :----------- | :------------ | :----------------------------------------------------------------------------------- |
| **C27**      | English  | `763:2`   | `W04-EN / C27 · Choose your service time`           | 430 px       | 990 px        | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-2)   |
| **C27**      | Spanish  | `766:388` | `W04-ES / C27 · Elige cuándo necesitas el servicio` | 430 px       | 1023 px       | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-388) |
| **C27-A**    | English  | `763:71`  | `W04-EN / C27-A · Request service ASAP`             | 430 px       | 905 px        | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-71)  |
| **C27-A**    | Spanish  | `766:457` | `W04-ES / C27-A · Solicitar servicio cuanto antes`  | 430 px       | 905 px        | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-457) |
| **C27-S**    | English  | `763:133` | `W04-EN / C27-S · Select an available window`       | 430 px       | 1198 px       | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-133) |
| **C27-S**    | Spanish  | `766:519` | `W04-ES / C27-S · Elige un horario disponible`      | 430 px       | 1215 px       | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-519) |
| **C28**      | English  | `763:396` | `W04-EN / C28 · Review your booking`                | 430 px       | 1195 px       | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-396) |
| **C28**      | Spanish  | `766:782` | `W04-ES / C28 · Revisa tu reserva`                  | 430 px       | 1180 px       | [View in Figma](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-782) |

---

## 3. Reused Shared Design Components & Tokens

All 8 frames are constructed using the HAULIX design system components and design token variables:

### Reused Component Instances

1. **`Instance / Customer iOS Status Bar`:** iOS status bar with dynamic island, camera lens, optical ring, and cellular/Wi-Fi/battery indicators.
2. **`Action / Button · Primary`:** HAULIX primary brand button with Brand Lime background (`#BAFF42`), dark text, and rounded-xl corners.
3. **`Action / Button · Secondary`:** Outline button with elevated dark surface and stroke.
4. **`Instance / Customer Schedule Slot Available`:** Unselected interactive 2-hour appointment pill.
5. **`Instance / Customer Schedule Slot Selected`:** Selected appointment window pill with brand lime highlight.
6. **`Instance / Customer Booking Summary Pending`:** Booking summary preview card.
7. **`Consent Checkbox / Unchecked`:** Explicit terms acknowledgment checkbox.

### Vector Icons

- **Truck Vector Icon:** `Location / Arizona gated sample` (`Vector Icon / truck`)
- **Calendar Vector Icon:** `Status heading / icon` (`Vector Icon / calendar`)
- **Shield Vector Icon:** `Notice / business-rule feedback` (`Vector Icon / shield`)

### Design Token Variables

- **Surface & Backgrounds:** Bound to `VariableID:5:3` (`#080B0B` dark canvas background), `#151A19` elevated surface.
- **Brand Colors:** HAULIX Brand Lime (`#BAFF42`).
- **Typography:** Inter (`Regular`, `Semi Bold`, `Bold`).
