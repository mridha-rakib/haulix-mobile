# HAULIX Customer Mobile App — Phase 03.44

## Map Before / After Visual QA & Remediation Analysis

### 1. Defect & Remediation Summary

| Defect ID        | Severity      | Root Cause                                                                                                                                  | Remediated Behavior in Phase 03.44                                                                                 | Status                 |
| :--------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | :--------------------- |
| **P1-I18N-01**   | P1 (High)     | `HaulixDispatchMap.tsx` contained hardcoded English strings for badges, buttons, tooltips, and accessibility labels                         | All map copy moved to `@haulix/i18n` under `c32Map` namespace with 100% symmetrical Spanish translations           | **RESOLVED**           |
| **P0-CANCEL-01** | P0 (Critical) | `cancellation-windows.tsx` allowed unconditional fee-free exit regardless of dispatch phase, and lost the originating phase upon navigation | Added `fromPhase` tracking, context-aware back navigation, and conditional cancellation checks enforcing fee rules | **RESOLVED**           |
| **P0-POLICY-01** | P0 (Critical) | Cancellation copy claimed pre-auth card hold was "released immediately" at a bank                                                           | Disclosed honestly as simulated prototype release with zero actual banking transactions                            | **RESOLVED**           |
| **P1-DEMO-01**   | P1 (High)     | Driver, vehicle, phone, and rating data could be mistaken for live production assignment                                                    | Added clear demonstration disclosures and mock contact toasts                                                      | **RESOLVED**           |
| **P0-MAP-01**    | P0 (Blocker)  | Direct Figma MCP screenshots blocked by Starter-plan rate limit                                                                             | Formally documented as an acceptance blocker rather than falsely claiming 100% pixel fidelity                      | **DOCUMENTED BLOCKER** |
| **P0-MAP-03**    | P0 (Blocker)  | ADB reported device in `unauthorized` state                                                                                                 | Formally documented as a hardware acceptance blocker                                                               | **DOCUMENTED BLOCKER** |

---

### 2. Detailed Before vs. After Breakdown

#### Map UI & Overlays:

- **Before:**
  - Badge in searching mode: `"RADAR ACTIVE · DISPATCH SEARCHING"` (Hardcoded EN on Spanish screen).
  - Recenter Toast: `"Camera centered on route"` (Hardcoded EN on Spanish screen).
  - Zoom Pill: `"Zoom In"`, `"Zoom Out"` (Hardcoded EN accessibility labels).
- **After:**
  - English: `"RADAR ACTIVE · DISPATCH SEARCHING"`, `"Camera centered on route"`, `"Zoom In"`, `"Zoom Out"`.
  - Spanish: `"RADAR ACTIVO · BÚSQUEDA DE DESPACHO"`, `"Cámara centrada en la ruta"`, `"Acercar mapa"`, `"Alejar mapa"`.

#### Cancellation Safety:

- **Before:**
  - Tapping fee-free exit while en route marked the booking cancelled fee-free, violating business rules.
  - Pressing Back always returned to `/crew-tracking`, even if entered from `/searching-for-driver`.
- **After:**
  - If origin is `searching`: Fee-free cancellation ($0.00). Back returns to `/searching-for-driver`.
  - If origin is `matched`: Grace period cancellation ($0.00). Back returns to `/driver-matched`.
  - If origin is `en_route`: Conditional $100 fee applies unless delay waiver is granted. Back returns to `/crew-tracking`.
