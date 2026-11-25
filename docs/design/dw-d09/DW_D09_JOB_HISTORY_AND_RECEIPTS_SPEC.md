# HAULIX Driver/Worker Mobile App — Phase DW-D09

## Job History, Route Evidence & Trip Receipts Specification

**Phase Reference:** DW-D09  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Core Screen:** `DW28 · My jobs` (EN `1086:911`, ES `1088:1240`)  
**Related Cross-References:** `DW22` (Completed Job, `1086:637`), `DW12` (Expired Offer, `1086:205`), `DW11` (Job Details, `1086:162`), `DW35` (Payout History, `1086:1215`)

---

### 1. Job History Architecture (`DW28`)

`DW28` displays historical dispatch assignments, completed moves, and cancelled requests for the authenticated worker:

#### 1.1 List Structure & Filtering
- **Segmented Tabs:**
  - `Completed`: Successfully delivered jobs with verified delivery evidence.
  - `Cancelled / Expired`: Offers missed or cancelled before service commencement.
- **Card Hierarchy on Canvas:**
  1. **Row 1 (`1086:943` EN / `1088:1272` ES):**
     - Job ID: `HX-AZ-DEMO-0042`
     - Status: `Completed · Verified`
     - Payout: `$98.00` (Driver Net Share)
     - Tap Target: Navigates to `DW22` (`Job completed` summary).
  2. **Row 2 (`1086:947` EN / `1088:1276` ES):**
     - Job ID: `OFFER-DEMO-03`
     - Status: `Expired / Unavailable`
     - Tap Target: Navigates to `DW12` (`Offer unavailable` notice).
  3. **Row 3 (`1086:951` EN / `1088:1280` ES):**
     - Job ID: `OFFER-DEMO-02`
     - Status: `Completed · Solo Move`
     - Payout: `$145.00`
     - Tap Target: Navigates to `DW11` (`Job details`).

---

### 2. Itemized Trip Receipt Components

When viewing a completed job receipt:
1. **Origin & Destination:** Pickup and delivery street addresses, timestamps, and total transit mileage.
2. **Item Inventory Checklist:** Final confirmed cargo inventory (including approved on-site add-ons from `DW20`).
3. **Delivery Evidence Thumbnails:** Links to the two geotagged delivery proof photos captured during `DW21`.
4. **Earnings & Tip Reconciliation:** Line-item breakdown of base earnings, distance compensation, platform fee, and customer tip, cross-linked to the immutable financial ledger (`DW24`/`DW35`).
