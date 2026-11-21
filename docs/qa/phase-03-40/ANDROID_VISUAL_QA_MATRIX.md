# HAULIX Phase 03.40 — Android Visual QA Matrix

**Device:** Realme Note 60 (`RMX3930`, Serial: `0B04731X200003BB`)  
**Operating System:** Android 15 (API 35)  
**Display:** 720 × 1600 px, 320 DPI (xhdpi equivalent)  
**Execution Environment:** Expo Go on real physical hardware (No emulators)  
**QA Date:** 2026-11-21

---

## 1. Canonical Variant Test Matrix (16 Screenshots)

| Screenshot File         | Language | Screen ID | Dimension  | Key Visual Checkpoints Verified                                            | Result |
| :---------------------- | :------- | :-------- | :--------- | :------------------------------------------------------------------------- | :----- |
| `c30r-en-initial.png`   | English  | C30-R     | 720 × 1600 | Amber shield hero, "RECOVERY READY" badge, title, overview card            | PASS   |
| `c30r-en-scrolled.png`  | English  | C30-R     | 720 × 1600 | 3 recovery steps list, primary & secondary CTAs, demo pill                 | PASS   |
| `c30r-es-initial.png`   | Spanish  | C30-R     | 720 × 1600 | Spanish title "Restablecer autorización segura", "LISTO PARA RECUPERACIÓN" | PASS   |
| `c30r-es-scrolled.png`  | Spanish  | C30-R     | 720 × 1600 | Spanish step descriptions, "Continuar a revisión de retención" CTA         | PASS   |
| `c30c-en-initial.png`   | English  | C30-C     | 720 × 1600 | Lock icon, "$356.00 USD" amount in lime `#BAFF42`, hold breakdown          | PASS   |
| `c30c-en-scrolled.png`  | English  | C30-C     | 720 × 1600 | Interactive checkbox, policy disclaimer, "Agree & Continue" button         | PASS   |
| `c30c-es-initial.png`   | Spanish  | C30-C     | 720 × 1600 | Spanish title "Revisar una nueva retención de tarjeta", "$356.00 USD"      | PASS   |
| `c30c-es-scrolled.png`  | Spanish  | C30-C     | 720 × 1600 | Spanish checkbox text, policy terms, "Aceptar y continuar" button          | PASS   |
| `c30ca-en-initial.png`  | English  | C30-CA    | 720 × 1600 | Brand green shield, "CONSENT RECORDED (v2)" badge, summary card            | PASS   |
| `c30ca-en-scrolled.png` | English  | C30-CA    | 720 × 1600 | Next steps list, "Check Booking Status" CTA, demo disclaimer notice        | PASS   |
| `c30ca-es-initial.png`  | Spanish  | C30-CA    | 720 × 1600 | Spanish title "Nuevo consentimiento de autorización registrado"            | PASS   |
| `c30ca-es-scrolled.png` | Spanish  | C30-CA    | 720 × 1600 | Spanish next steps, "Verificar estado de reserva" primary button           | PASS   |
| `c31p-en-initial.png`   | English  | C31-P     | 720 × 1600 | Radar animation, "SEARCHING DISPATCH QUEUE", live spinner                  | PASS   |
| `c31p-en-scrolled.png`  | English  | C31-P     | 720 × 1600 | Step progress timeline (3 steps), Phase notice, "Return to Home" CTA       | PASS   |
| `c31p-es-initial.png`   | Spanish  | C31-P     | 720 × 1600 | Spanish title "Verificando estado de reserva", spinner, radar pulse        | PASS   |
| `c31p-es-scrolled.png`  | Spanish  | C31-P     | 720 × 1600 | Spanish milestone labels, honest demo boundary, "Volver al inicio"         | PASS   |

---

## 2. Critical QA Journeys Test Matrix (18 Screenshots)

| Journey ID & Name                       | Step Screenshot File                        | Route / Action       | Verified Behavior                                        | Result |
| :-------------------------------------- | :------------------------------------------ | :------------------- | :------------------------------------------------------- | :----- |
| **Journey A** — Authorization Recovery  | `journey-a-1-c30d-declined-view.png`        | C30-D                | Customer views payment declined screen                   | PASS   |
|                                         | `journey-a-2-c30r-restoration-view.png`     | C30-D → C30-R        | Tap support recovery triggers navigation to C30-R        | PASS   |
|                                         | `journey-a-3-c30r-scrolled-notice.png`      | C30-R scrolled       | Customer reviews 3 clear recovery steps                  | PASS   |
| **Journey B** — Fresh Hold Review       | `journey-b-1-c30r-advance.png`              | C30-R                | Customer taps "Continue to Hold Review"                  | PASS   |
|                                         | `journey-b-2-c30c-fresh-hold-view.png`      | C30-C initial        | Arrives at C30-C with full hold breakdown                | PASS   |
|                                         | `journey-b-3-c30c-validation-triggered.png` | C30-C CTA unselected | Tapping CTA without checkbox displays inline amber error | PASS   |
|                                         | `journey-b-4-c30c-checkbox-checked.png`     | C30-C checkbox tap   | Tapping checkbox sets checkmark, clears validation error | PASS   |
| **Journey C** — Authorization Consent   | `journey-c-1-c30ca-consent-recorded.png`    | C30-C → C30-CA       | Advance to C30-CA with updated consent status v2         | PASS   |
|                                         | `journey-c-2-c30ca-scrolled-policy.png`     | C30-CA scrolled      | Customer reviews policy & next steps                     | PASS   |
| **Journey D** — Booking Status Checking | `journey-d-1-c31p-status-checking.png`      | C30-CA → C31-P       | Advance to C31-P queue search with active pulse          | PASS   |
|                                         | `journey-d-2-c31p-scrolled-roadmap.png`     | C31-P scrolled       | Timeline displays Step 1 done, Step 2 in progress        | PASS   |
|                                         | `journey-d-3-c31p-return-home.png`          | C31-P primary CTA    | Return to Home / root without fake confirmation          | PASS   |
| **Journey E** — Upstream Regressions    | `journey-e-1-c30e-expired-view.png`         | C30-E                | Customer views expired card hold screen                  | PASS   |
|                                         | `journey-e-2-c30e-to-c30c.png`              | C30-E → C30-C        | Assistance trigger routes to fresh hold review           | PASS   |
|                                         | `journey-e-3-c29p-to-c31p.png`              | C29-P → C31-P        | Simulated success navigates directly to C31-P            | PASS   |
| **Journey F** — Full Spanish Parity     | `journey-f-1-c30r-es.png`                   | C30-R (ES)           | Spanish C30-R renders with complete accentuation         | PASS   |
|                                         | `journey-f-2-c30c-es.png`                   | C30-C (ES)           | Spanish C30-C renders exact hold terms & amounts         | PASS   |
|                                         | `journey-f-3-c30ca-es.png`                  | C30-CA (ES)          | Spanish C30-CA displays consent registered status        | PASS   |
|                                         | `journey-f-4-c31p-es.png`                   | C31-P (ES)           | Spanish C31-P displays queue status & milestones         | PASS   |
