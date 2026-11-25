# HAULIX Driver & Worker Mobile App — Phase DW-D02
## Credential Verification, Eligibility, Document Management & Figma Design Gap Closure Delivery Report

**Execution Status:** COMPLETE & VERIFIED  
**Repository:** `mridha-rakib/haulix-mobile`  
**Existing Application:** `apps/driver`  
**Android Package:** `com.haulix.driver`  
**Branch:** `main`  
**Verified DW-D01 Baseline Commit:** `16303ed52802daaf9bd3fb352174339e1ff90c17`  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Driver/Worker Canvas:** Page `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Direct Figma URL:** https://www.figma.com/design/meiXxwUNJaDo0a3mhcHBXv/HAULIX-%E2%80%94-UI-UX-Concept--Copy-?node-id=1-3  
**Requirements Crosswalk:** Frame `1329:1824` (Signed SRS v1.6 Appendix C p.24)  
**Developer Handoff Index:** Frame `1091:3`  
**UX Audit Board:** Frame `1317:1805`  
**Target Hardware Baseline:** Realme Note 60 (RMX3933), Android 15, 360dp logical width  

---

## 1. Verified DW-D01 Baseline

- **Verified Commit:** `16303ed52802daaf9bd3fb352174339e1ff90c17`
- **Verification Command:** `git rev-parse HEAD` & `git rev-parse origin/main` confirmed identical baseline on branch `main`.
- **Pre-Execution Working Tree:** Clean (`nothing to commit, working tree clean`).
- **Monorepo Guardrails Maintained:**
  - Zero modifications to Customer App (`apps/customer`).
  - Zero React Native code introduced in `apps/driver`.
  - Zero duplicate Expo applications or repositories created.
  - Zero modifications to Admin Dashboard designs.

---

## 2. Requirements Sources Inspected

1. **HAULIX Signed SRS v1.6:** Appendix C p.24 (Signed 19–20 October 2026).
2. **Authoritative Figma Requirements Crosswalk (`1329:1824`):** Transcribes exact requirement codes:
   - `WK-01–02, 13–15`: Account, verification, profile, service radius (`DW02–07, DW36–40, DW55–60`).
   - `WK-03–06, 12, 18–19`: Verified Helper invitations / crew readiness (`DW13–16, DW48–49, DW62–65`).
   - `DP-01–18, BK-08–09`: Dispatch, offer expiry, status and GPS (`DW09–12, DW17, DW19, DW28, DW34`).
   - `CM-01–04, 07–09, 11–13`: Job chat, recorded voice, images, extra-work (`DW18, DW20, DW47, DW51–53`).
   - `WK-07–11, 17; PY-08–10, 16–29`: Worker ledger, 65/35 platform commission split, 100% tip pass-through, standard/instant cash out (`DW23–26, DW35, DW40, DW54, DW67–68`).
   - `NT-01–10, NFR-02/06/14/15`: Location privacy, notifications, and English/Spanish localization (`DW17, DW30, DW34, DW42, DW50`).
3. **Driver/Worker Handoff Index (`1091:3`):** Complete catalog of all 68 core screen states in English and Spanish.
4. **UX Audit Board (`1317:1805`):** Verified 68 state pairs, 136 localized frames, 136/136 handoff links valid, 739 prototype node destinations checked.

---

## 3. Signed SRS Availability

- The source document is confirmed as a 24-page PDF with visible client and provider ink signatures dated 19–20 October 2026 on page 24.
- All functional requirements, acceptance criteria, and operational rules cited in this phase correlate directly with the signed acknowledgment copy as transcribed in Figma Frame `1329:1824`.

---

## 4. Driver Eligibility Audit (`DW05`, `DW07`, `DW38`)

- **`DW05 · Driver verification` (`1085:154` / `1088:154`):**
  - Requires 4 eligibility pillars: Government photo ID, Driver's license, Vehicle & insurance details, Background check.
  - Features prominent server-authoritative gate notice: *"Verification status is determined by the server. Approval is required before dispatch eligibility."*
  - Provides a clean fallback CTA: *"Continue as Helper instead"*, routing to `DW06`.
- **`DW07 · Driver documents` (`1085:254` / `1088:254`):**
  - Explicitly specifies two-sided DL requirement: *"Driver's license: Front and back images required"*.
  - Covers vehicle registration (*"Truck / van / trailer"*) and insurance certificate (*"Current policy on eligible vehicle"*).
  - Features camera/gallery upload tile with JPG/PNG format indicator.
  - Submitting routes to `DW08 · Verification status`.
- **`DW38 · Documents & vehicle` (`1270:665` / `1270:1616`):**
  - Post-approval driver management hub displaying real-world document lifecycle states: Driver License [Verified], Government ID [Verified], Insurance [Pending], Vehicle Registration [Needs update], Vehicle Details [Completed].
  - Prevents bypassing initial eligibility checks while providing renewal upload actions routing back to `DW07`.

---

## 5. Helper Eligibility Audit (`DW06`, `DW56`)

- **`DW06 · Helper verification` (`1085:207` / `1088:207`):**
  - Helper eligibility is strictly distinct from Driver eligibility.
  - Requires **ONLY** 3 items: Identity & selfie, Background check, Work eligibility.
  - **Zero Vehicle/DL Requirements:** Helpers are not prompted for driver's licenses, vehicles, or insurance.
  - **Crew Independence Callout:** *"Your acceptance is your own: A Driver cannot accept a job on your behalf. You must individually accept eligible crew invitations."*
  - Submitting routes directly to `DW08 · Verification status`.
- **`DW56 · Helper eligibility & documents` (`1301:1633` / `1301:2875`):**
  - Post-approval helper document review hub.
  - Policy callout explicitly reinforces role boundaries: *"Helper verification: No vehicle or driver license required for helper-only work."*
  - Explains: *"Role-specific requirement: Driver vehicle documents apply only to Driver eligibility."*

---

## 6. Document Verification Findings

- Document requirements strictly align with Arizona commercial transport standards and signed SRS requirements.
- Identity proofing requires government-issued photo ID.
- Helpers require a live facial selfie match to prevent account sharing and identity fraud.
- Drivers require front and back driver's license photos to permit OCR parsing of license data and expiration dates.
- Vehicle registration and auto insurance are verified to guarantee cargo transport compliance.

---

## 7. Verification Status & Recovery Findings (`DW08`, `DW33`)

- **`DW08 · Verification status` (`1085:298` / `1088:298`):**
  - Enforces `PENDING REVIEW` state: *"Job acceptance remains unavailable until eligibility is confirmed."*
  - The UI does not grant dispatch access; it offers sandbox demonstration links to Driver home (`DW09`) and Helper home (`DW31`).
- **`DW33 · Verification needs action` (`1086:1155` / `1088:1484`):**
  - Dedicated rejection and expiration recovery state.
  - Displays specific failure reasons provided by verification staff (e.g. *"Identity document: image unclear or expired"*).
  - Explicit Monorepo Policy Callout embedded in UI: *"No bypass: Never display a rejected worker as verified or dispatch eligible."*
  - Provides direct one-tap recovery routes to resubmit via `DW07` or contact support via `DW29`.

---

## 8. Confirmed Design Gaps

- **DW-W02 Gap Analysis Result:** **0 Gaps.**
- All 7 canonical states (`DW05`, `DW06`, `DW07`, `DW08`, `DW33`, `DW38`, `DW56`) already existed on Page `1:3` with 100% visual completeness, Auto Layout structure, and native component instances.
- Zero screens required new frame generation.
- Full details documented in `docs/design/dw-d02/DW_D02_FIGMA_GAP_CLOSURE_REGISTER.md`.

---

## 9. Actual Figma Corrections

- In accordance with the prompt's instruction (*"If an existing design is already correct, preserve it and document the supporting evidence. Do not introduce unnecessary changes merely to demonstrate activity"*), all 14 existing bilingual frames were verified as completely accurate and preserved intact.
- Prototype link validation confirmed 136/136 handoff links and 739 prototype reaction destinations valid.

---

## 10. Existing Designs Preserved

- The full 68-screen English section (`1085:2`) and 68-screen Spanish section (`1088:2`) are preserved intact.
- The 14 prototype overlays in Section `1281:518` are preserved intact.
- The Handoff Index (`1091:3`), SRS Crosswalk (`1329:1824`), and UX Audit Board (`1317:1805`) are preserved intact.

---

## 11. Exact EN/ES Node Mappings

| Screen | Canonical Title | Primary Role | EN Node | ES Node | Primary Next Transition |
|:---:|:---|:---:|:---:|:---:|:---|
| **DW05** | Driver verification | Primary Driver | `1085:154` | `1088:154` | Upload documents ➔ `DW07`; Continue as Helper ➔ `DW06` |
| **DW06** | Helper verification | Crew Helper | `1085:207` | `1088:207` | Submit verification ➔ `DW08`; Back to role ➔ `DW02` |
| **DW07** | Driver documents | Primary Driver | `1085:254` | `1088:254` | Submit for review ➔ `DW08`; Back to checklist ➔ `DW05` |
| **DW08** | Verification status | All Applicants | `1085:298` | `1088:298` | View Driver demo ➔ `DW09`; View Helper demo ➔ `DW31` |
| **DW33** | Verification needs action | All Workers | `1086:1155` | `1088:1484` | Resubmit ➔ `DW07`; Check state ➔ `DW05`; Support ➔ `DW29` |
| **DW38** | Documents & vehicle | Primary Driver | `1270:665` | `1270:1616` | Back ➔ `DW27`; Upload/update ➔ `DW07` |
| **DW56** | Helper eligibility & docs | Crew Helper | `1301:1633` | `1301:2875` | Back ➔ `DW55`; Review details ➔ `DW06` |

---

## 12. Fourteen DW-D02 Screenshot References

All 14 core screenshots were captured via Figma MCP `get_screenshot` and verified in `docs/design/dw-d02/screenshots/`:

| File Name | Screen | Node ID | Byte Size | Status |
|:---|:---:|:---:|:---:|:---:|
| `dw05-driver-verification-en-1085-154.png` | DW05 EN | `1085:154` | 47,606 B | Verified |
| `dw05-driver-verification-es-1088-154.png` | DW05 ES | `1088:154` | 51,131 B | Verified |
| `dw06-helper-verification-en-1085-207.png` | DW06 EN | `1085:207` | 39,764 B | Verified |
| `dw06-helper-verification-es-1088-207.png` | DW06 ES | `1088:207` | 42,617 B | Verified |
| `dw07-driver-documents-en-1085-254.png` | DW07 EN | `1085:254` | 40,474 B | Verified |
| `dw07-driver-documents-es-1088-254.png` | DW07 ES | `1088:254` | 43,913 B | Verified |
| `dw08-verification-status-en-1085-298.png` | DW08 EN | `1085:298` | 41,782 B | Verified |
| `dw08-verification-status-es-1088-298.png` | DW08 ES | `1088:298` | 42,789 B | Verified |
| `dw33-verification-needs-action-en-1086-1155.png` | DW33 EN | `1086:1155` | 45,727 B | Verified |
| `dw33-verification-needs-action-es-1088-1484.png` | DW33 ES | `1088:1484` | 51,954 B | Verified |
| `dw38-documents-vehicle-en-1270-665.png` | DW38 EN | `1270:665` | 53,260 B | Verified |
| `dw38-documents-vehicle-es-1270-1616.png` | DW38 ES | `1270:1616` | 55,540 B | Verified |
| `dw56-helper-eligibility-documents-en-1301-1633.png` | DW56 EN | `1301:1633` | 47,143 B | Verified |
| `dw56-helper-eligibility-documents-es-1301-2875.png` | DW56 ES | `1301:2875` | 44,885 B | Verified |

---

## 13. DW-D01 Remaining Screenshot Evidence

In compliance with Section 13, all remaining 13 onboarding screenshots were captured and committed to `docs/design/dw-d01/screenshots/`, establishing 100% visual evidence for all 22 bilingual variants:
- `dw03-signin-es-1088-80.png` (39,136 B)
- `dw04-phone-verification-es-1088-114.png` (37,542 B)
- `dw43-reset-password-es-1301-1798.png` (31,274 B)
- `dw44-check-inbox-en-1301-611.png` (27,226 B)
- `dw44-check-inbox-es-1301-1853.png` (27,436 B)
- `dw58-driver-account-es-1309-1429.png` (40,573 B)
- `dw59-helper-account-en-1309-772.png` (37,114 B)
- `dw59-helper-account-es-1309-1495.png` (41,567 B)
- `dw60-helper-phone-en-1309-838.png` (30,961 B)
- `dw60-helper-phone-es-1309-1561.png` (35,229 B)
- `dw61-phone-signin-en-1309-896.png` (33,614 B)
- `dw61-phone-signin-es-1309-1619.png` (34,495 B)
- `dw66-code-issue-es-1309-1991.png` (26,791 B)

---

## 14. Prototype Navigation Results

- Audited 739 interactive reactions on Page `1:3`.
- Driver onboarding advances linearly: `DW02` ➔ `DW58` ➔ `DW04` ➔ `DW05` ➔ `DW07` ➔ `DW08`.
- Helper onboarding advances linearly: `DW02` ➔ `DW59` ➔ `DW60` ➔ `DW06` ➔ `DW08`.
- Rejection recovery advances: `DW33` ➔ `DW07` (Resubmit) or `DW29` (Support).
- Document management routes back cleanly to `DW27` (Driver) and `DW55` (Helper).

---

## 15. Role-Permission Verification

- **Monorepo Critical Rule #3 Strict Compliance:** No client-side role toggle exists in operational states.
- Role selection during onboarding (`DW02`) acts purely as intake preference routing to role-specific credential intake (`DW58`/`DW59`).
- Driver capabilities require verified DL, vehicle, and insurance; Helpers are strictly restricted to crew assistant tasks without vehicle burdens.

---

## 16. Complete 68-State Master Inventory

Published in:
- [DRIVER_WORKER_MASTER_68_STATE_INVENTORY.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/driver-final/DRIVER_WORKER_MASTER_68_STATE_INVENTORY.md)
Contains every screen from `DW01` through `DW68` mapped to its primary workflow, applicable role, EN node, ES node, prototype status, and primary design audit package.

---

## 17. Supporting Overlay Inventory

Published in:
- [DRIVER_WORKER_SUPPORTING_OVERLAY_INVENTORY.md](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/design/driver-final/DRIVER_WORKER_SUPPORTING_OVERLAY_INVENTORY.md)
Catalogs all 14 modal overlay frames in Section `1281:518` across 7 bilingual types (Profile photo, Payout, Security, Emergency, Availability, Call, Location).

---

## 18. Remaining Requirements Uncertainties

1. **Third-Party MVR / Background Check Turnaround:** Exact turnaround SLA (e.g. 24–72 hours) depends on third-party provider integration (Checkr/Persona) and is server-managed.
2. **Stripe Custom vs Express Account Configuration:** Stripe onboarding flows are external webview or OAuth redirects (`CP` gate in SRS crosswalk).

---

## 19. Verified GitHub Commit

- **Commit Message:** `docs(driver): complete credential and eligibility design audit (DW-D02)`
- **Target Branch:** `main`
- **Full 40-Character Commit SHA:** `398faf9b5bfcf6503eaab2f78d3cce78de6a3334`
- **Direct GitHub Commit URL:** https://github.com/mridha-rakib/haulix-mobile/commit/398faf9b5bfcf6503eaab2f78d3cce78de6a3334

---

## 20. DW-D03 Readiness

Phase DW-D02 is complete and verified. The platform is 100% prepared to advance to **Phase DW-D03: Operational Home & Availability Dashboard**:
- Target Workflow: **DW-W03 (Operational Home & Command Center)**.
- Target Screens: `DW09 · Driver dashboard`, `DW31 · Helper dashboard`, `DW39 · Availability settings`.
- Deliverables: Shift readiness checklists, Online/Offline availability toggles, GPS background disclosures, and service radius adjustments.
