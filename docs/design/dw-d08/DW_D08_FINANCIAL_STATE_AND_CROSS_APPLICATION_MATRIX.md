# HAULIX Driver/Worker Mobile App — Phase DW-D08

## Financial State & Cross-Application Alignment Matrix

**Phase Reference:** DW-D08  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Cross-Application Interfaces:**
- Customer Mobile App (`apps/customer`, Module `W08`, Screens `C28`, `C29`)
- Driver/Worker Mobile App (`apps/driver`, Module `DW-W08`, Screens `DW23`, `DW24`, `DW25`, `DW26`, `DW35`, `DW40`, `DW54`, `DW67`, `DW68`, `OV-02`)
- HAULIX Financial Ledger Service (`PostgreSQL / Stripe Connect Custom Accounts`)

---

### 1. Cross-Application Lifecycle Synchronization

The financial lifecycle connects the customer payment authorization at booking, capture upon delivery evidence, review hold, worker ledger allocation, and payout disbursement:

| Phase | Customer Action / State (`apps/customer`) | Backend Ledger Event | Driver / Worker App State (`apps/driver`) | Stripe Rail |
|:---|:---|:---|:---|:---|
| **1. Job Booking** | Customer card authorized (`C08`/`C10`) for estimated fare | `PAYMENT_INTENT_AUTHORIZED` | Offer displayed with estimated worker share (`DW10`) | Stripe PaymentIntent (`capture_method: manual`) |
| **2. Active Service & On-Site Additions** | Customer approves extra item/time (`C25`) | `INTENT_AMOUNT_UPDATED` | Driver sees updated payout amount (`DW20`) | PaymentIntent updated |
| **3. Delivery Evidence Submitted** | Customer notified of job completion (`C27`) | `PAYMENT_INTENT_CAPTURED` | Job Completed (`DW22` Driver, `DW65` Helper) | Funds captured into HAULIX platform balance |
| **4. 24-Hour Review Window** | Customer rates service, adds tip, or submits dispute (`C28`/`C29`) | `LEDGER_ENTRY_PENDING` | Earnings listed under "Pending Review" in `DW23` | 24-hour dispute hold |
| **5. Financial Settlement** | Window closes with no dispute | `LEDGER_ENTRY_AVAILABLE` | Earnings move to "Available for Cash Out" in `DW23` | Funds cleared for worker transfer |
| **6. Cash Out Initiation** | No customer action | `PAYOUT_INITIATED` | Worker selects Standard (`DW67`) or Instant (`DW68`) | Stripe Transfer to Connected Account |
| **7. Payout Completion** | No customer action | `PAYOUT_SUCCEEDED` | Success screen displayed (`DW26`); History updated (`DW35`) | ACH direct deposit or Visa Direct push |
| **8. Payout Reversal / Failure** | No customer action | `PAYOUT_FAILED` | Payout Failed error screen (`DW54`); Funds re-credited to `DW23` | Stripe payout failure webhook |

---

### 2. Balance Accounting Taxonomy

The Driver/Worker app presents balances across three explicit categories to maintain 100% financial transparency:

1. **Available Balance:**
   - Funds that have completed the 24-hour customer review window with zero disputes.
   - Immediately eligible for Standard Cash Out (`DW67`) or Instant Cash Out (`DW68`).
2. **Pending Review Balance:**
   - Earnings from jobs completed within the prior 24 hours.
   - Shows countdown or status indicator informing the worker when funds will transition to Available.
3. **In-Transit Payouts:**
   - Funds currently undergoing ACH processing (1-3 business days) initiated via Standard Cash Out.

---

### 3. Cross-Application Role Invariants

1. **Independent App Separation:**
   - The Customer and Driver/Worker applications share ZERO navigation routes, runtime components, or state stores.
   - Driver/Helper financial views are strictly role-gated based on authenticated session claims.
2. **Zero Platform Withholding on Gratuities:**
   - Whatever tip amount the customer enters in `C28` is reflected penny-for-penny in the worker's tip breakdown in `DW24`.
3. **Platform Fee Isolation:**
   - Platform commissions are never deducted from tips, ensuring complete trust between platform and workforce.
