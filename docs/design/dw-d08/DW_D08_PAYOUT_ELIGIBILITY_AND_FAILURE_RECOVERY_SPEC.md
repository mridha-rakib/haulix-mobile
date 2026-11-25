# HAULIX Driver/Worker Mobile App — Phase DW-D08

## Payout Eligibility, Account Gating & Failure Recovery Specification

**Phase Reference:** DW-D08  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Core Screens:**
- `DW40 · Payout Account Settings` (EN `1270:930`, ES `1270:1881`)
- `DW54 · Payout Failed Recovery` (EN `1301:1445`, ES `1301:2687`)
- `OV-02 · Update Payout Method Bottom Sheet` (EN `1282:529`, ES `1282:539`)

---

### 1. Payout Eligibility Gates

Before a Driver or Helper can trigger a Cash Out (`DW25`), the worker account must pass four automated verification gates:

```
[KYC / Identity Verification] ──> [Stripe Custom/Express Account Active] ──> [Verified Bank / Card] ──> [Available Unencumbered Balance >= Min]
```

1. **Gate 1: Worker Identity & KYC Verification (Stripe Connect):**
   - Driver / Helper identity verified via SSN / ITIN and government ID (`DW02`–`DW08` onboarding).
   - Stripe account status must be `payouts_enabled: true` and `requirements.currently_due: []`.
2. **Gate 2: Active Disbursement Instrument:**
   - At least one verified Direct Deposit bank account or eligible Instant Debit Card attached to the worker profile in `DW40`.
3. **Gate 3: Balance Availability:**
   - Worker must have an available balance of at least `$1.00` for standard bank transfers or `$5.00` for instant cash out.
   - Pending earnings subject to customer 24h review hold or active safety investigations are segregated into `PENDING_REVIEW` and cannot be cashed out.
4. **Gate 4: Platform Security & Risk Screening:**
   - Account free from temporary financial freezes (e.g. suspicious payout destination change within the last 24 hours triggers a fraud velocity delay).

---

### 2. Payout Failure Modes & Error Taxonomy

When a payout cannot be executed, the system routes the worker to `DW54` (`1301:1445` EN / `1301:2687` ES) with an actionable failure explanation:

| Error Code | Failure Description | Root Cause | Primary Worker Recovery Action | UI Text / Anchor (`DW54`) |
|:---|:---|:---|:---|:---|
| `ERR_PAYOUT_BANK_REJECTED` | Bank Account Closed / Invalid Routing | Invalid routing number or closed recipient checking account | Tap `Update Payout Method` (opens `OV-02` / `DW40`) | "Your bank rejected the transfer. Please review your account details." |
| `ERR_PAYOUT_CARD_EXPIRED` | Instant Debit Card Expired / Inactive | Debit card expired or replaced by issuing bank | Update card details in `OV-02` | "Your debit card has expired or is no longer active." |
| `ERR_PAYOUT_INSTANT_UNSUPPORTED` | Card Not Eligible for Instant Transfer | Issuing bank does not participate in Visa Direct / Mastercard Send | Switch to Standard Bank ACH (`DW67`) | "Your card issuing bank does not support instant transfers." |
| `ERR_PAYOUT_KYC_DOCUMENT_NEEDED` | Stripe Compliance Hold | Stripe requested additional proof of address / tax verification | Complete ID verification in `DW40` / Web Portal | "Additional identity verification is required by our payments partner." |
| `ERR_PAYOUT_VELOCITY_LIMIT` | Daily Limit Exceeded | Worker exceeded 24h instant payout maximum ($2,000) | Wait 24h or use Standard Transfer (`DW67`) | "You have reached your daily instant cash-out limit." |

---

### 3. DW54 Payout Recovery Flow Architecture

1. **Navigation Context & Tab Alignment:**
   - `DW54` is situated under the **Earnings** tab (`Navigation / 5 Tabs / Active Earnings`).
   - The Active Earnings icon (`1314:298`) is highlighted in Lime green (`#BAFF42`), with inactive tab icons for Home, Jobs, Messages, and Profile.
   - Navigation hotspots allow seamless exit to Home (`DW09`), Jobs (`DW10`), Messages (`DW18`), or Profile (`DW27`).
2. **Actionable Remediation CTAs:**
   - **Primary CTA:** `Update Payout Method` (Navigates to `OV-02` bottom sheet or `DW40`).
   - **Secondary CTA:** `Contact Worker Support` (Navigates to `DW30` / support ticket submission).
   - **Tertiary Link:** `Return to Earnings Overview` (Navigates back to `DW23`).
3. **Automated Fund Reversal Guarantee:**
   - If a payout fails at the clearing house or network level, the attempted cash-out amount (plus any quoted fee) is immediately credited back to the worker's Available Balance in `DW23`.
   - The worker never experiences fund loss due to network rejection.
