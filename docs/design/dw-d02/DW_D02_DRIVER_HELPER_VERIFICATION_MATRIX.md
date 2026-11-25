# HAULIX Driver & Worker Mobile App — Phase DW-D02
# Driver vs. Helper Verification & Role Separation Matrix

**Phase:** DW-D02  
**Target Module:** DW-W02 (Driver & Helper Eligibility & Document Management)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Signed SRS Reference:** `WK-01–02`, `WK-13–15` (Appendix C p.24)  

---

## 1. Architectural Role Boundary Summary

In compliance with Monorepo Critical Rule #3 (**Preserve Role Boundaries**):
- Primary Driver and Helper roles are **STRICTLY SEPARATED** at the credential intake, document verification, and operational state layers.
- A Helper **CANNOT** gain Primary Driver dispatch capabilities by local selection or screen routing.
- Primary Driver eligibility requires vehicle ownership/leasing, valid driver's license, active registration, and commercial/personal auto insurance.
- Helper eligibility requires **ONLY** personal identity verification, live selfie match, and criminal background screening. Helpers are strictly prohibited from being blocked by vehicle or driver's license requirements.

---

## 2. Side-by-Side Credential & Verification Comparison

| Feature / Requirement | Primary Driver (`DW05`, `DW07`, `DW38`) | Crew Helper (`DW06`, `DW56`, `DW57`) | Architectural Enforcement Rule |
|:---|:---|:---|:---|
| **Primary Intake Screen** | `DW05 · Driver verification` (`1085:154` / `1088:154`) | `DW06 · Helper verification` (`1085:207` / `1088:207`) | Distinct entry routes from role preference (`DW02` ➔ `DW58`/`DW59`) |
| **Government Photo ID** | **Mandatory** (Front side) | **Mandatory** (Front side) | Shared primitive, verified separately |
| **Live Biometric Selfie** | Mandatory during background check | **Mandatory** (Selfie / identity match) | Prevents account sharing and identity spoofing |
| **Driver's License (DL)** | **Mandatory** (Front & back photos, AZ Class D/CDL) | **EXCLUDED** (No DL required) | UI explicitly states: "No driver license required for helper-only work" |
| **Vehicle Registration** | **Mandatory** (AZ MVD vehicle registration) | **EXCLUDED** (No vehicle required) | Helpers do not transport cargo independently |
| **Auto Insurance** | **Mandatory** (Policy certificate with vehicle VIN) | **EXCLUDED** (No auto insurance required) | Insurance coverage is attached to the operating vehicle |
| **Vehicle Make/Model/Plate** | **Mandatory** (Truck / Cargo Van / Box Truck) | **EXCLUDED** (No vehicle profile) | Driver vehicle specs determine dispatch cargo sizing |
| **MVR Driving Record Check** | **Mandatory** (Motor Vehicle Record screening) | **EXCLUDED** (No driving record check) | Helpers do not operate motor vehicles on shift |
| **Criminal Background Check** | **Mandatory** (Electronic disclosure consent) | **Mandatory** (Electronic disclosure consent) | Both roles enter customer homes and handle property |
| **Crew Independence Notice** | Driver manages route & customer arrival PIN | **Mandatory Banner:** "Your acceptance is your own. A Driver cannot accept a job on your behalf." | Helper must personally accept dispatches |
| **Operational Home Handoff** | Routes to `DW09 · Driver dashboard` on approval | Routes to `DW31 · Helper dashboard` on approval | Completely distinct dashboard architectures |
| **Post-Approval Management** | `DW38 · Documents & vehicle` (`1270:665` / `1270:1616`) | `DW56 · Helper eligibility & docs` (`1301:1633` / `1301:2875`) | Separate document review and update hubs |
| **Role Switch Capability** | Can opt to "Continue as Helper instead" during onboarding | Cannot upgrade to Driver without submitting vehicle & DL credentials | Role escalation is strictly server-verified |

---

## 3. UI Content & Language Symmetry Audit

### Driver Verification (`DW05`):
- **English (`1085:154`):** "Complete required eligibility checks before job offers." / "Government photo ID" / "Driver's license" / "Vehicle & insurance details" / "Background check".
- **Spanish (`1088:154`):** "Completa las verificaciones requeridas para recibir ofertas." / "Identificación oficial con foto" / "Licencia de conducir" / "Datos del vehículo y del seguro" / "Verificación de antecedentes".

### Helper Verification (`DW06`):
- **English (`1085:207`):** "Helpers independently confirm their eligibility." / "Identity & selfie" / "Background check" / "Work eligibility" / "Your acceptance is your own: A Driver cannot accept a job on your behalf. You must individually accept eligible crew invitations."
- **Spanish (`1088:207`):** "Los Ayudantes verifican su elegibilidad por separado." / "Identidad y selfie" / "Verificación de antecedentes" / "Elegibilidad laboral" / "Tú decides si aceptas: Un Conductor no puede aceptar trabajos por ti. Debes aceptar cada invitación elegible personalmente."

### Driver Document Management (`DW38`):
- **English (`1270:665`):** Driver License [Verified], Government ID [Verified], Insurance [Pending], Vehicle Registration [Needs update], Vehicle Details [Completed].
- **Spanish (`1270:1616`):** Licencia de conducir [Verificado], Identificación oficial [Verificado], Seguro [Pendiente], Registro del vehículo [Actualizar], Datos del vehículo [Completo].

### Helper Document Management (`DW56`):
- **English (`1301:1633`):** "Helper verification: No vehicle or driver license required for helper-only work." / Government photo ID / Selfie / identity match / Background screening / "Role-specific requirement: Driver vehicle documents apply only to Driver eligibility."
- **Spanish (`1301:2875`):** "Verificación de ayudante: No se requieren licencia ni vehículo si solo es Ayudante." / Identificación oficial / Selfie e identidad / Antecedentes / "Requisito por rol: Los documentos de vehículo aplican al Conductor."
