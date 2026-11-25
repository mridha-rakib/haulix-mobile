# HAULIX Driver & Worker Mobile App — Phase DW-D02
# Credential Verification & Eligibility Requirements Specification

**Phase:** DW-D02  
**Target Module:** DW-W02 (Driver & Helper Eligibility & Document Management)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Primary Requirements Source:** Signed HAULIX SRS v1.6 (Crosswalk Frame `1329:1824`, Appendix C p.24)  
**Launch Scope:** Arizona, USA (Initial Regional Operations)  

---

## 1. Requirements Provenance & Hierarchy

To maintain complete architectural integrity, all requirements governing credential intake, eligibility verification, and document management are categorized by source authority:

### Category A: Requirements Verified Against the Visibly Signed SRS v1.6
*Source: 24-page PDF with client and provider ink signatures on page 24 (19–20 October 2026).*
- **`WK-01` (Worker Registration & Intake):** Driver and Helper workers register with basic personal details (legal name, verified mobile phone, email, secure credentials).
- **`WK-02` (Mandatory Identity Verification):** All field personnel must submit valid government photo ID and undergo identity matching prior to any operational dispatch eligibility.
- **`WK-13` (Commercial Driver Requirements):** Primary Drivers must submit a valid Arizona Driver's License, proof of active vehicle registration (truck/van/trailer), and active commercial or personal auto insurance with courier/delivery endorsement.
- **`WK-14` (Helper Laborer Requirements):** Moving helpers require government ID, selfie match, and criminal background check. Personal vehicle ownership, vehicle registration, and driver's licenses are **NOT** required for helper-only work.
- **`WK-15` (Service Radius & Operating Coverage):** Operating coverage is configured per driver (10 to 50 miles in Arizona). Changes to driver coverage and vehicle classification remain subject to server authorization.

### Category B: Requirements Supported by the Figma Requirements Crosswalk (`1329:1824`)
- **Server-Authoritative Eligibility Gate:** Verification status is determined strictly by the server. UI submission places an applicant into `PENDING REVIEW` (`DW08`). The client UI cannot grant dispatch eligibility or unlock the operational dashboard.
- **Document Rejection Handling (`DW33`):** Rejections require itemized reasons from verification staff (e.g., blurry image, expired document). The UI must enforce a strict "No bypass" rule: never display a rejected or unverified worker as dispatch-eligible.
- **Post-Onboarding Document Management (`DW38` / `DW56`):** Crew members maintain document validity post-approval. Expiring or expired documents trigger warning badges (`Needs update` / `Pending`) without permitting role swapping.

### Category C: Requirements Supported by Approved Technical Documentation
- **Image Capture Standards:** Documents must be submitted as clear JPG/PNG photos showing full margins, legible text, and uncropped corners.
- **Two-Sided DL Capture:** Driver's licenses require both front and back captures to support barcode/AAMVA parsing.
- **Strict Role Isolation:** Primary Driver credentials and Helper credentials use separate database models and separate verification queues.

### Category D: Unverified Assumptions (Strictly Excluded from DW-D02)
- **Instant Automated Approval:** Document submission does **NOT** grant instant approval. Verification turnaround times are dependent on third-party MVR and background check providers.
- **Arbitrary Local Role Switching:** Operational users cannot toggle between Driver and Helper roles locally inside the client.

### Category E: Production Backend Dependencies
- Third-party identity verification provider (e.g. Persona / Stripe Identity).
- Third-party background screening & MVR provider (e.g. Checkr).
- Cloud storage document upload endpoint with signed URLs and encryption at rest.

---

## 2. Driver Credential Requirements Matrix (Arizona Launch Scope)

| Credential Type | Mandatory For | Upload Requirements | Verification Rule | Rejection Criteria |
|:---|:---:|:---|:---|:---|
| **Government Photo ID** | All Drivers | Color photo, front side, valid date | Name & DOB match account intake | Expired, blurred, cropped, name mismatch |
| **Driver's License (DL)** | Primary Driver | Front and back photos, Class D or CDL | Valid AZ license (or active reciprocal) | Suspended, expired, non-matching license number |
| **Vehicle Registration** | Primary Driver | Official AZ MVD registration document | VIN and plate match vehicle intake | Expired registration, VIN mismatch |
| **Auto Insurance** | Primary Driver | Insurance certificate / binder card | Policy active, vehicle VIN listed | Lapsed coverage, policyholder name mismatch |
| **Vehicle Inspection Details** | Primary Driver | Make, model, year, cargo type | Meets minimum cargo capacity | Subcompact vehicle, salvage title without inspection |
| **Background Screening (MVR)** | Primary Driver | Consent signature via electronic intake | Clean driving record (no major DUIs/moving violations) | Disqualifying criminal or driving record |

---

## 3. Helper Credential Requirements Matrix

| Credential Type | Mandatory For | Upload Requirements | Verification Rule | Rejection Criteria |
|:---|:---:|:---|:---|:---|
| **Government Photo ID** | Crew Helper | Color photo, front side, valid date | Full legal name & DOB match | Expired, unreadable, name mismatch |
| **Live Selfie / Match** | Crew Helper | Frontal selfie photo | Biometric match to photo ID | Facial mismatch, occluded face, low lighting |
| **Work Eligibility** | Crew Helper | Tax ID / SSN / Legal work status | Arizona contractor compliance | Invalid tax documentation |
| **Criminal Background** | Crew Helper | Electronic consent disclosure | Identity screening compliance | Disqualifying criminal history |
| **Vehicle / DL** | **EXCLUDED** | **NOT REQUIRED** | **No vehicle check permitted for helpers** | N/A |
