# HAULIX Customer Mobile App — Phase 03.35
## W04 Scheduling & Payment — Design-First Foundation Report
### Four Canonical Screens × English + Spanish = Eight Native Figma Frames

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.35  
**Figma File Key:** `Q946h4YBGgyLsjnPtdyQNe`  
**Direct Figma URL:** https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe  
**Repository:** `git@github.com:mridha-rakib/haulix-mobile.git`  
**Phase Character:** Design-First Foundation & Architectural Handoff (No application code modified)

---

## 1. Executive Summary

Phase 03.35 establishes the implementation-ready design foundation for **W04 Scheduling & Payment**, covering the earliest four sequential screens of the documented customer journey:
1. **C27:** Choose your service time / Elige cuándo necesitas el servicio
2. **C27-A:** Request service ASAP / Solicitar servicio cuanto antes
3. **C27-S:** Select an available window / Elige un horario disponible
4. **C28:** Review your booking / Revisa tu reserva

All 8 native editable frames (4 English + 4 Spanish) have been audited, inspected, and cross-referenced directly from the authoritative Figma master sections on Page `1:2`:
- **English Master Section `758:2`:** `W04 — ENGLISH | Scheduling • Terms • Stripe Authorization • Recovery • Booking`
- **Spanish Master Section `758:3`:** `W04 — ESPAÑOL | Programación • Términos • Autorización • Recuperación • Reserva`

High-resolution visual evidence has been captured and stored under `docs/qa/phase-03-35/figma/`. Complete design contracts, navigation reactions, and implementation specifications have been authored to enable immediate, defect-free execution in Phase 03.36.

---

## 2. Canonical Screen Manifest

| Screen ID | Title (EN / ES) | Canonical Node ID (EN / ES) | Frame Dimensions | SRS Traceability |
| :--- | :--- | :--- | :--- | :--- |
| **C27** | Choose your service time /<br>Elige cuándo necesitas el servicio | `763:2` / `766:388` | 430 × 990 px /<br>430 × 1023 px | `SCH-01`, `SCH-02` |
| **C27-A** | Request service ASAP /<br>Solicitar servicio cuanto antes | `763:71` / `766:457` | 430 × 905 px /<br>430 × 905 px | `SCH-01`, `SCH-03` |
| **C27-S** | Select an available window /<br>Elige un horario disponible | `763:133` / `766:519` | 430 × 1198 px /<br>430 × 1215 px | `SCH-01`, `SCH-04` |
| **C28** | Review your booking /<br>Revisa tu reserva | `763:396` / `766:782` | 430 × 1195 px /<br>430 × 1180 px | `BK-01`, `BK-02`, `BK-03` |

---

## 3. Direct Figma & Screenshot References

1. **C27 (Choose your service time):**
   - EN: [Figma Node 763:2](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-2) | Screenshot: `docs/qa/phase-03-35/figma/c27-en-figma.png`
   - ES: [Figma Node 766:388](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-388) | Screenshot: `docs/qa/phase-03-35/figma/c27-es-figma.png`
2. **C27-A (Request service ASAP):**
   - EN: [Figma Node 763:71](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-71) | Screenshot: `docs/qa/phase-03-35/figma/c27a-en-figma.png`
   - ES: [Figma Node 766:457](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-457) | Screenshot: `docs/qa/phase-03-35/figma/c27a-es-figma.png`
3. **C27-S (Select an available window):**
   - EN: [Figma Node 763:133](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-133) | Screenshot: `docs/qa/phase-03-35/figma/c27s-en-figma.png`
   - ES: [Figma Node 766:519](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-519) | Screenshot: `docs/qa/phase-03-35/figma/c27s-es-figma.png`
4. **C28 (Review your booking):**
   - EN: [Figma Node 763:396](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=763-396) | Screenshot: `docs/qa/phase-03-35/figma/c28-en-figma.png`
   - ES: [Figma Node 766:782](https://www.figma.com/design/Q946h4YBGgyLsjnPtdyQNe?node-id=766-782) | Screenshot: `docs/qa/phase-03-35/figma/c28-es-figma.png`

---

## 4. Key Architectural & Safety Invariants

1. **Clean Prototype Separation:** All scheduling screens carry explicit disclaimers (*"UI PROTOTYPE · Illustrative data and payments · Not a real booking"* / *"PROTOTIPO UI · Datos y pagos simulados · No es reserva real"*).
2. **Pricing Transparency:** Quote remains non-binding ($356.00 illustrative W03 subtotal).
3. **Cancellation Terms Enforcement:** In C28, the primary action button is disabled until the customer explicitly checks the consent checkbox for booking and cancellation terms.
4. **Strict Safety Guardrails:** No live Stripe API calls, no payment authorization, no automatic driver assignment, and no backend booking records created.

---

## 5. Implementation Readiness Status

The design foundation for W04 screens C27, C27-A, C27-S, and C28 is **100% complete, audited, and implementation-ready**. Phase 03.36 may begin application route coding immediately upon authorization.

---

## 6. Strict Hard Stop

In strict compliance with Phase 03.35 instructions:
- **Zero production application routes were added or modified.**
- **No real Stripe or backend integrations were built.**
- **Work terminates here pending explicit authorization.**
