# HAULIX Driver/Worker Mobile App — Phase DW-D08

## English & Spanish Screen and Overlay Inventory

**Phase Reference:** DW-D08  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Scope:** 9 Canonical States / 18 Bilingual Core Frames + 1 Supporting Overlay / 2 Bilingual Frames = 20 Total Frames

---

### 1. Bilingual Screen & Overlay Master Inventory

| State ID | Screen Name | English Node ID | Spanish Node ID | Dimensions | Active Tab / Context | Key Interactions / Hotspots | Screenshot Reference |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **DW23** | Earnings overview | `1086:670` | `1088:999` | 430 × 932 | Earnings | `1086:720` Cash out now ➔ `DW25`<br>`1086:722` View details ➔ `DW24` | `dw23-earnings-overview-en-1086-670.png`<br>`dw23-earnings-overview-es-1088-999.png` |
| **DW24** | Worker earnings detail | `1086:728` | `1088:1057` | 430 × 932 | Earnings | Back button ➔ `DW23`<br>Crew note ➔ `1086:755`<br>65/35 note ➔ `1086:758` | `dw24-worker-earnings-detail-en-1086-728.png`<br>`dw24-worker-earnings-detail-es-1088-1057.png` |
| **DW25** | Instant Cash Out / Methods | `1086:765` | `1088:1094` | 430 × 932 | Earnings | `1086:798` Instant transfer ➔ `DW68`<br>`1086:800` Standard transfer ➔ `DW67` | `dw25-instant-cash-out-en-1086-765.png`<br>`dw25-instant-cash-out-es-1088-1094.png` |
| **DW26** | Cash Out status | `1086:802` | `1088:1131` | 430 × 932 | Earnings | `1086:837` Back to home ➔ `DW09`<br>`1086:838` View history ➔ `DW35` | `dw26-cash-out-status-en-1086-802.png`<br>`dw26-cash-out-status-es-1088-1131.png` |
| **DW35** | Payout history | `1086:1215` | `1088:1544` | 430 × 932 | Earnings | Back button ➔ `DW23`<br>Failed payout item ➔ `DW54`<br>Export statement link | `dw35-payout-history-en-1086-1215.png`<br>`dw35-payout-history-es-1088-1544.png` |
| **DW40** | Payout account | `1270:930` | `1270:1881` | 430 × 932 | Profile | Tap account row ➔ `OV-02`<br>Back button ➔ `DW27` | `dw40-payout-account-en-1270-930.png`<br>`dw40-payout-account-es-1270-1881.png` |
| **DW54** | Payout failed | `1301:1445` | `1301:2687` | 430 × 932 | Earnings | Primary CTA ➔ `OV-02` / `DW40`<br>Support CTA ➔ `DW30`<br>Nav hotspots to Home, Jobs, Messages, Profile (`DW27`) | `dw54-payout-failed-en-1301-1445.png`<br>`dw54-payout-failed-es-1301-2687.png` |
| **DW67** | Standard bank Cash Out | `1325:1804` | `1325:1938` | 430 × 932 | Earnings | `1325:1863` Confirm transfer ➔ `DW26`<br>Back button ➔ `DW25` | `dw67-standard-cash-out-en-1325-1804.png`<br>`dw67-standard-cash-out-es-1325-1938.png` |
| **DW68** | Instant fee & payout review | `1325:1866` | `1325:2000` | 430 × 932 | Earnings | `1325:1924` Confirm & transfer ➔ `DW26`<br>Back / cancel ➔ `DW25` | `dw68-instant-fee-review-en-1325-1866.png`<br>`dw68-instant-fee-review-es-1325-2000.png` |
| **OV-02** | Update payout method preview | `1282:529` | `1282:539` | 430 × 280 | Modal Sheet | Add bank account / debit card inputs<br>Save method ➔ `DW40` | `ov02-payout-method-en-1282-529.png`<br>`ov02-payout-method-es-1282-539.png` |

---

### 2. Bilingual Copy & Terminology Alignment

| English Term | Spanish Term | Context & Usage |
|:---|:---|:---|
| Available for Cash Out | Disponible para retiro | Headline balance metric on `DW23` |
| Cash Out Now | Retirar fondos ahora | Primary button on `DW23` |
| Worker earnings detail | Detalle de ganancias del trabajador | Screen title on `DW24` |
| 65/35 applies to subtotal, not tips | 65/35 se aplica al subtotal, no a las propinas | Regulatory transparency note on `DW24` |
| 100% workers · default equal split | 100% para trabajadores · división igual por defecto | Tip pass-through disclosure on `DW24` |
| Instant Cash Out | Retiro instantáneo | Fast transfer option on `DW25` / `DW68` |
| Standard Bank Transfer | Transferencia bancaria estándar | 1-3 business day transfer option on `DW67` |
| Provider-calculated fee | Tarifa calculada por el proveedor | Disclosed fee on `DW68` |
| Transfer processing | Procesando transferencia | Status badge on `DW26` |
| Payout failed | Pago fallido | Error recovery screen `DW54` |
| Update payout method | Actualizar método de pago | Primary CTA on `DW54` & `OV-02` |
