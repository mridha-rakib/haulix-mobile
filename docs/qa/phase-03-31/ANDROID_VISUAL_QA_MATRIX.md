# HAULIX Customer Mobile App — Phase 03.31

## Android Visual QA Matrix & Hardware Verification Report

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.31  
**Batch Scope:** 4 canonical screens × 2 languages (English & Spanish) = 8 localized versions  
**Authoritative Figma File:** `Q946h4YBGgyLsjnPtdyQNe`  
**Execution Date:** November 19, 2026

---

## 1. Authoritative Figma References (Downloaded Reference Captures)

All 8 authoritative Figma frames were fetched and verified via Figma MCP and saved locally:

| Screen Variant   | Node ID     | Canvas Size   | Local Reference Capture                         | File Size    |
| :--------------- | :---------- | :------------ | :---------------------------------------------- | :----------- |
| **C23-C (EN)**   | `412:625`   | 430 × 1219 px | `docs/qa/phase-03-31/figma/c23c-en-figma.png`   | 54,805 bytes |
| **C23-C (ES)**   | `987:10439` | 430 × 1219 px | `docs/qa/phase-03-31/figma/c23c-es-figma.png`   | 58,579 bytes |
| **C23-S (EN)**   | `412:683`   | 430 × 1319 px | `docs/qa/phase-03-31/figma/c23s-en-figma.png`   | 87,062 bytes |
| **C23-S (ES)**   | `987:10506` | 430 × 1319 px | `docs/qa/phase-03-31/figma/c23s-es-figma.png`   | 90,953 bytes |
| **C23-R (EN)**   | `412:861`   | 430 × 950 px  | `docs/qa/phase-03-31/figma/c23r-en-figma.png`   | 69,101 bytes |
| **C23-R (ES)**   | `987:10714` | 430 × 950 px  | `docs/qa/phase-03-31/figma/c23r-es-figma.png`   | 71,511 bytes |
| **C24-ADM (EN)** | `412:1006`  | 430 × 1008 px | `docs/qa/phase-03-31/figma/c24adm-en-figma.png` | 65,615 bytes |
| **C24-ADM (ES)** | `987:10887` | 430 × 1008 px | `docs/qa/phase-03-31/figma/c24adm-es-figma.png` | 70,300 bytes |

---

## 2. Physical Android Hardware Status & Environmental Audit

- **Command:** `adb devices -l`
- **Output:** `List of devices attached` (empty list; 0 physical Android devices or running emulators detected).
- **Secondary Check:** `adb get-state` → `error: no devices/emulators found`.
- **Metro Development Server:** Active on port 8085 (Task ID `0c33546c-d190-4c09-97f0-76259ce75556/task-9819`).
- **QA Hardware Conclusion:** In strict compliance with HAULIX development rules, no Android device screenshots were simulated or fabricated. Hardware capture was halted due to no physical device attached on the Windows development host.

---

## 3. Comprehensive Verification Matrix (8 Screen Versions)

| Version ID  | Screen / Language                           | Route Path                                     | Figma Node  | Layout & Tokens | i18n Symmetry | Automated Tests |
| :---------- | :------------------------------------------ | :--------------------------------------------- | :---------- | :-------------- | :------------ | :-------------- |
| `c23c-en`   | Correct AI Items (EN)                       | `/correct-ai-items?previewLocale=en`           | `412:625`   | PASS            | PASS          | PASS            |
| `c23c-es`   | Corregir detalles del objeto (ES)           | `/correct-ai-items?previewLocale=es`           | `987:10439` | PASS            | PASS          | PASS            |
| `c23s-en`   | Customer Confirmed Items (EN)               | `/customer-confirmed-items?previewLocale=en`   | `412:683`   | PASS            | PASS          | PASS            |
| `c23s-es`   | Tus objetos confirmados (ES)                | `/customer-confirmed-items?previewLocale=es`   | `987:10506` | PASS            | PASS          | PASS            |
| `c23r-en`   | Rejected AI Identification (EN)             | `/rejected-ai-identification?previewLocale=en` | `412:861`   | PASS            | PASS          | PASS            |
| `c23r-es`   | Una sugerencia de IA parece incorrecta (ES) | `/rejected-ai-identification?previewLocale=es` | `987:10714` | PASS            | PASS          | PASS            |
| `c24adm-en` | Admin Review Pending (EN)                   | `/admin-review-pending?previewLocale=en`       | `412:1006`  | PASS            | PASS          | PASS            |
| `c24adm-es` | Revisión pendiente de tarifas (ES)          | `/admin-review-pending?previewLocale=es`       | `987:10887` | PASS            | PASS          | PASS            |

---

## 4. Key Verification Invariants

1. **Strict Invariant: Mattress Quantity = 2:**
   - In C23-C, customer-confirmed inventory retains quantity = 2, with interactive controls allowing adjustments.
   - In C23-S, customer-confirmed items carries forward quantity = 2.
   - In C23-R, AI suggestion of 1 is clearly labeled incorrect, preserving customer's 2 units.
2. **Photography Integrity:**
   - C23-S displays 3 authentic photos (`c18j-sofa.png`, `c18j-mattresses.png`, `c18j-table.png`) at 90 × 74 px with 8px radius.
   - C23-R displays the authentic mattress photo (`c18j-mattresses.png`) at 90 × 74 px.
   - C23-C and C24-ADM strictly adhere to text field / case card layout without photo layers.
3. **No Fabricated Business Logic:**
   - Quote processing (C24-P), Admin approvals (C24-ADM-S), and Admin change requests (C24-ADM-D) display honest prototype disclaimer notices without mock calculation or approval bypass.
