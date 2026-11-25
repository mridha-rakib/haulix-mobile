# HAULIX Driver & Worker Mobile App — Phase DW-D03
# Prototype Navigation & State Transition Matrix

**Phase:** DW-D03  
**Target Module:** Operational Home & Navigation (DW-W03)  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Verified Connections:** 739 total prototype connections inspected across Page `1:3`  

---

## 1. Verified Operational Home Workflows

### Flow 1: Driver Operational Command Flow
```text
DW09 — Driver dashboard (1086:3 / 1088:332)
  ├──► Toggle "ONLINE" / "OFFLINE" ──────────────────────► Connects to WebSocket dispatch stream
  ├──► Card "Furniture Removal" (1086:42) ───────────────► DW11 — Job details (1086:162 / 1088:491)
  ├──► Card "Junk Removal / Demo" (1086:57) ─────────────► DW10 — Job offers (1086:81 / 1088:410)
  ├──► Tab "Jobs" (1086:24) ─────────────────────────────► DW28 — My jobs (1086:911 / 1088:1240)
  ├──► Tab "Earnings" (1086:26) ─────────────────────────► DW23 — Earnings overview (1086:670 / 1088:999)
  ├──► Tab "Messages" (1086:28) ─────────────────────────► DW18 — Job messages (1086:459 / 1088:788)
  └──► Tab "Profile" (1086:30 / 1086:80) ────────────────► DW27 — Profile & Documents (1086:840 / 1088:1169)
```

### Flow 2: Helper Operational Command Flow
```text
DW31 — Helper dashboard (1086:1058 / 1088:1387)
  ├──► Toggle "ONLINE" / "OFFLINE" ──────────────────────► Independent Helper availability stream
  ├──► Row "Invitations waiting" (1086:1090) ────────────► DW14 — Helper invitations (1086:268 / 1088:597)
  ├──► Row "Current assignment" (1086:1094) ─────────────► DW15 — Review invitation (1086:328 / 1088:657)
  ├──► Row "Your earnings" (1086:1098) ──────────────────► DW23 — Earnings overview (1086:670 / 1088:999)
  ├──► Tab "Jobs" ───────────────────────────────────────► DW28 — My jobs (1086:911 / 1088:1240)
  ├──► Tab "Earnings" ───────────────────────────────────► DW24 — Worker earnings detail (1086:728 / 1088:1057)
  ├──► Tab "Messages" ───────────────────────────────────► DW18 — Job messages (1086:459 / 1088:788)
  └──► Tab "Profile" (1086:1107 / 1088:1436) ────────────► DW55 — Helper profile (1301:1534 / 1301:2776)
```

### Flow 3: Driver Availability Settings Flow
```text
DW27 — Profile & Documents (1086:840 / 1088:1169)
  │  [Taps "Availability settings" row]
  ▼
DW39 — Availability settings (1270:793 / 1270:1744)
  ├──► Back button (1270:865) ───────────────────────────► Native BACK action (Returns to DW27)
  ├──► Days selector (Mon..Sun) ─────────────────────────► Multi-select toggle
  ├──► Working hours (8:00 AM – 6:00 PM) ────────────────► Time picker modal
  ├──► Service radius (50 mi) ───────────────────────────► Radius picker modal
  ├──► Vacation mode toggle ─────────────────────────────► Pause dispatch toggle
  └──► CTA "Save availability" (1270:928) ───────────────► Native BACK action (Persists & returns to DW27)
```

---

## 2. Helper Verification Recovery Resolution (`DW33`)

### Problem Identified:
On `DW33 · Verification needs action` (`1086:1155` / `1088:1484`), all document resubmission and eligibility links navigate to `DW07` (Driver documents) and `DW05` (Driver verification). If a Helper reaches this state, following these links presents vehicle registration and driver's license requirements that Helpers do not have.

### Architectural Resolution:
The application state machine enforces role-conditional recovery dispatch:
```text
DW33 — Verification needs action
  │
  ├──► If Worker Role == "DRIVER":
  │      ├── "Resubmit documents" ───────────────────────► DW07 — Driver documents (1085:254 / 1088:254)
  │      └── "Row Eligibility state" ────────────────────► DW05 — Driver verification (1085:154 / 1088:154)
  │
  └──► If Worker Role == "HELPER":
         ├── "Resubmit documents" ───────────────────────► DW06 — Helper verification (1085:207 / 1088:207)
         └── "Row Eligibility state" ────────────────────► DW56 — Helper eligibility & docs (1301:1633 / 1301:2875)
```
Support link on `DW33` (`1086:1186` / `1088:1515`) navigates to `DW29 · Help & support` (`1086:962` / `1088:1291`) for both roles.
