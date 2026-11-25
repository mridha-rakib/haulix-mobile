# HAULIX Driver/Worker Mobile App — Phase DW-D09

## Help, Support, Dispute Escalation & Emergency Safety Assistance Specification

**Phase Reference:** DW-D09  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Core Screens:**
- `DW29 · Help & support Hub` (EN `1086:962`, ES `1088:1291`)
- `DW45 · Contact support Request Form` (EN `1301:662`, ES `1301:1904`)
- `DW46 · Request received Confirmation` (EN `1301:754`, ES `1301:1996`)
- `OV-04 · Emergency Safety Assistance Sheet` (EN `1286:532`, ES `1286:543`)

---

### 1. Help & Support Architecture (`DW29`)

`DW29` provides structured support entry points for non-urgent operational inquiries, payment issues, and account assistance:

| Support Row on Canvas | Purpose & Scope | Target Destination |
|:---|:---|:---|
| **Report a job issue** (`1086:990`) | Damage reports, customer disputes, parking/access problems | Navigates to `DW45` (Contact Support) |
| **Payment & cash out** (`1086:993`) | Inquiries regarding pending balances, instant cash-out fees, bank clearing | Navigates to `DW26` / `DW35` |
| **Verification assistance** (`1086:996`)| Rejected documents, license updates, background check appeals | Navigates to `DW33` (Verification Action) |
| **Contact support** (`1086:999`) | General non-emergency ticket submission | Navigates to `DW45` (Contact Support) |

---

### 2. Support Ticket Submission Workflow (`DW45` ➔ `DW46`)

1. **Form Controls (`DW45`):**
   - **Category Picker (`1301:739`):** Job, Payment, Account, or Verification.
   - **Job ID (Optional, `1301:743`):** Numerical or alphanumeric trip identifier.
   - **Description Field (`1301:747`):** Multi-line text explaining the operational incident.
   - **Asynchronous Notice (`1301:749`):** *"Support is asynchronous · For immediate danger, contact emergency services"*.
   - **Submit CTA (`1301:752`):** Primary green button routing to `DW46`.
2. **Confirmation Screen (`DW46`):**
   - Displays Ticket ID reference badge.
   - Reassurance copy: *"A real ticket number and response updates will be delivered via email and notifications"*.
   - CTA (`1301:835`): Navigates back to `DW29`.

---

### 3. Emergency Safety Assistance (`OV-04`)

- **Node Identity:** EN `1286:532`, ES `1286:543` (430 × 275 px modal bottom sheet).
- **Trigger:** Tapping the emergency shield icon available during active transit (`DW17`) or on-site labor (`DW19`/`DW63`).
- **Immediate Escalation Actions:**
  1. **Call 911 (Emergency Services):** Prominent red primary button initiating immediate native phone call (`tel:911`).
  2. **Call HAULIX Critical Safety Line:** Direct dial to 24/7 dedicated dispatch safety team.
  3. **Share Live Location:** Transmits real-time vehicle GPS coordinates to emergency dispatch.
- **Strict Boundary Rule:** Safety calls route directly to native OS telephony and backend incident logs without fabricating mock local states.
