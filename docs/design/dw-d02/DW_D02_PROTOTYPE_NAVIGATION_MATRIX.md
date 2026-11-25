# HAULIX Driver & Worker Mobile App — Phase DW-D02
# Prototype Navigation & Interaction Matrix

**Phase:** DW-D02  
**Target Module:** DW-W02 (Driver & Helper Eligibility & Document Management)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Verified Connections:** 739 total prototype connections inspected across Page `1:3`  

---

## 1. Verified Prototype Interaction Workflows

### Flow 1: Driver Applicant Credential Intake Flow
```text
DW02 — Create your account (1085:39)
  │  [Selects "Primary Driver" in Component 1193:1072]
  ▼
DW58 — Driver account details (1309:706)
  │  [Enters profile & taps "Continue"]
  ▼
DW04 — Phone verification (1085:114)
  │  [Submits 6-digit OTP]
  ▼
DW05 — Driver verification (1085:154)
  │  [Inspects checklist & taps "Upload driver documents" (1085:203)]
  ▼
DW07 — Driver documents (1085:254)
  │  [Uploads DL, Reg, Insurance & taps "Submit for review" (1085:294)]
  ▼
DW08 — Verification status (1085:298)
  │  [Status: "PENDING REVIEW" · Dispatches locked]
  │  [Taps "View sample Driver home" (1085:325)]
  ▼
DW09 — Driver dashboard (1086:3) [Sandbox / Demo Preview]
```

### Flow 2: Helper Applicant Credential Intake Flow
```text
DW02 — Create your account (1085:39)
  │  [Selects "Crew Helper" in Component 1193:1072]
  ▼
DW59 — Helper account details (1309:772)
  │  [Enters profile & taps "Continue"]
  ▼
DW60 — Helper phone verification (1309:838)
  │  [Submits 6-digit OTP]
  ▼
DW06 — Helper verification (1085:207)
  │  [Consents to ID & background check & taps "Submit verification" (1085:250)]
  ▼
DW08 — Verification status (1085:298)
  │  [Status: "PENDING REVIEW" · Dispatches locked]
  │  [Taps "View sample Helper home ›" (1085:329)]
  ▼
DW31 — Helper dashboard (1086:1058) [Sandbox / Demo Preview]
```

### Flow 3: Document Verification Rejection & Recovery Flow
```text
DW33 — Verification needs action (1086:1155)
  │  [Banner: "A document was rejected or expired"]
  ├──► Row "Identity document" (1086:1175) ───────────────► DW07 — Driver documents (1085:254)
  ├──► Row "Eligibility state" (1086:1178) ───────────────► DW05 — Driver verification (1085:154)
  ├──► CTA "Resubmit documents" (1086:1184) ─────────────► DW07 — Driver documents (1085:254)
  └──► CTA "Contact support" (1086:1186) ────────────────► DW29 — Help & support (1086:962)
```

### Flow 4: Existing Driver Post-Approval Document Management
```text
DW27 — Profile & Documents (1086:840)
  │  [Taps "Documents & vehicle" row]
  ▼
DW38 — Documents & vehicle (1270:665)
  ├──► Back button (1270:737) ───────────────────────────► DW27 — Profile & Documents (1086:840)
  ├──► Row "Driver License" (1270:740) ──────────────────► DW07 — Driver documents (1085:254)
  ├──► Row "Government ID" (1270:749) ───────────────────► DW07 — Driver documents (1085:254)
  ├──► Row "Insurance" (1270:758) ───────────────────────► DW07 — Driver documents (1085:254)
  ├──► Row "Vehicle Registration" (1270:767) ────────────► DW07 — Driver documents (1085:254)
  ├──► Row "Vehicle Details" (1270:776) ─────────────────► DW07 — Driver documents (1085:254)
  └──► CTA "Upload or update a document" (1270:784) ─────► DW07 — Driver documents (1085:254)
```

### Flow 5: Existing Helper Post-Approval Document Management
```text
DW55 — Helper profile (1301:1534)
  │  [Taps "Helper eligibility & documents" row]
  ▼
DW56 — Helper eligibility & documents (1301:1633)
  ├──► Back button (1301:1705) ──────────────────────────► DW55 — Helper profile (1301:1534)
  ├──► Row "Government photo ID" (1301:1711) ────────────► DW06 — Helper verification (1085:207)
  ├──► Row "Selfie / identity match" (1301:1715) ────────► DW06 — Helper verification (1085:207)
  ├──► Row "Background screening" (1301:1719) ───────────► DW06 — Helper verification (1085:207)
  └──► CTA "Review verification details" (1301:1726) ────► DW06 — Helper verification (1085:207)
```

---

## 2. Spanish Parity Navigation Verification

All Spanish peer frames have identical prototype connections that route exclusively to their corresponding Spanish destinations:
- `DW05 ES` (`1088:154`) ➔ `DW07 ES` (`1088:254`) and `DW06 ES` (`1088:207`).
- `DW06 ES` (`1088:207`) ➔ `DW08 ES` (`1088:298`) and `DW02 ES` (`1088:39`).
- `DW07 ES` (`1088:254`) ➔ `DW08 ES` (`1088:298`) and `DW05 ES` (`1088:154`).
- `DW08 ES` (`1088:298`) ➔ `DW09 ES` (`1088:332`) and `DW31 ES` (`1088:1387`).
- `DW33 ES` (`1088:1484`) ➔ `DW07 ES` (`1088:254`) and `DW29 ES` (`1088:1291`).
- `DW38 ES` (`1270:1616`) ➔ `DW27 ES` (`1088:1169`) and `DW07 ES` (`1088:254`).
- `DW56 ES` (`1301:2875`) ➔ `DW55 ES` (`1301:2776`) and `DW06 ES` (`1088:207`).
