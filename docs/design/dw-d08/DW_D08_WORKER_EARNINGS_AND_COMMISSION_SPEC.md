# HAULIX Driver/Worker Mobile App — Phase DW-D08

## Worker Earnings Ledger & Commission Allocation Specification

**Phase Reference:** DW-D08  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Crosswalk Policy Row:** `1329:1848`, Text Layer `1329:1852`  
**Core Screens:** `DW23` (`1086:670` / `1088:999`), `DW24` (`1086:728` / `1088:1057`), `DW35` (`1086:1215` / `1088:1544`)

---

### 1. Executive Summary & Policy Authority

This specification governs the earnings ledger calculations, platform commission allocation, subtotal splitting, and balance accrual across the HAULIX Driver/Worker platform.

The authoritative requirements are grounded in signed SRS v1.6 and Requirements Crosswalk Frame `1329:1824`, Row `1329:1848`, Text Layer `1329:1852`:
> **"GATE: 65/35 on pre-tax/pre-tip subtotal; worker tips 100%; fee/net before consent; Stripe account/provider CP."**

#### Foundational Principles
1. **Commission Scope (65/35 Subtotal Rule):**
   - The platform commission applies **exclusively** to the pre-tax, pre-tip booking subtotal.
   - 65% of the pre-tax, pre-tip subtotal is allocated to the Worker Compensation Pool.
   - 35% of the pre-tax, pre-tip subtotal is retained by the HAULIX Platform as technology and dispatch commission.
2. **Tip Inviolability (100% Pass-Through Rule):**
   - 100% of customer tips are passed directly to active participating workers.
   - The HAULIX platform levies **zero** commission, processing fee, or service charge on worker tips.
   - On `DW24` (`1086:758`): *"65/35 applies to subtotal, not tips"*.
3. **Ledger Transparency:**
   - Every completed job generates an immutable ledger entry breaking down base fare, distance/weight surcharges, platform fee, tip amount, individual crew share, and net payable.

---

### 2. Mathematical Earnings & Commission Architecture

#### 2.1 Formula Definitions

For any completed job $J$:
$$\text{Customer Total} = \text{Subtotal} + \text{Taxes} + \text{Platform Service Fee} + \text{Customer Tip}$$

Where:
- $\text{Subtotal} = \text{Base Fare} + \text{Mileage Rate} \times \text{Miles} + \text{Heavy Item Surcharges} + \text{Stairs/Access Surcharges} + \text{Approved On-Site Additions}$
- $\text{Worker Subtotal Pool} = \text{Subtotal} \times 0.65$
- $\text{Platform Commission} = \text{Subtotal} \times 0.35$
- $\text{Worker Tip Pool} = \text{Customer Tip} \times 1.00$

$$\text{Total Worker Earnings Pool} = \text{Worker Subtotal Pool} + \text{Worker Tip Pool}$$

#### 2.2 Crew Allocation Models

##### Model A: Solo Driver Operation (1 Worker)
- **Role:** Primary Driver ($D$)
- $\text{Driver Earnings} = \text{Worker Subtotal Pool} + \text{Customer Tip}$
- Example (`DW24` Baseline):
  - Job Subtotal: $120.00
  - Platform Commission (35%): $42.00
  - Worker Pool (65%): $78.00
  - Customer Tip: $20.00
  - Driver Net Payout: $78.00 + $20.00 = $98.00

##### Model B: Driver + Helper Crew (2 Workers)
When a Helper ($H$) participates on the dispatch assignment:
- **Subtotal Share:**
  - 65% of the pre-tax, pre-tip booking subtotal is allocated to the total Worker Compensation Pool, while 35% is retained by the HAULIX platform.
  - Allocation between Primary Driver and Helper is determined by dispatch contract parameters, vehicle provision, and crew assignment terms (do NOT assume an unverified 50/50 base subtotal split).
  - $\text{Driver Subtotal Share} = \text{Worker Subtotal Pool} \times \omega_D$
  - $\text{Helper Subtotal Share} = \text{Worker Subtotal Pool} \times \omega_H$
  - Where $\omega_D + \omega_H = 1.00$ (determined by server-side crew contract, not hardcoded locally).
- **Tip Share:**
  - Authoritative Rule (`1086:755`): *"100% workers · default equal split"*.
  - Gratuities are 100% pass-through to workers with zero platform withholding.
  - $\text{Driver Tip} = \text{Customer Tip} \times 0.50$
  - $\text{Helper Tip} = \text{Customer Tip} \times 0.50$

---

### 3. Screen-by-Screen Ledger UX Audit

#### 3.1 DW23 · Earnings Overview (`1086:670` / `1088:999`)
- **Primary Metrics (Reconciled to Live Canvas Nodes):**
  - Available for Cash Out: Large high-contrast display (`$1,280.00` DEMO on canvas `1086:670`).
  - Completed Jobs Count: Throughput counter (`5 completed jobs` on canvas `1086:670`).
  - Pending Earnings: Segregated balance (`Separate ledger` / 24-hour review hold).
  - Tip Allocation: Explicit policy callout (`100% to workers`).
  - Note: Earlier handoff documentation claiming speculative values of `$385.20` or `18 jobs` is superseded by live canvas values.
- **Primary Action:**
  - `Cash Out Now` primary CTA (`1086:720`), navigating to `DW25` (`1086:765`).
  - `View Breakdown & Payouts` secondary CTA (`1086:722`), navigating to `DW24` (`1086:728`).
- **Recent Activity Ledger:**
  - List of recent job completions with timestamp, job ID, role indicator, and net earnings.
  - Status chips: `Available`, `Pending Review`, `Processing Cash Out`.

#### 3.2 DW24 · Worker Earnings Detail (`1086:728` / `1088:1057`)
- **Detailed Financial Breakdown Card:**
  - Gross Job Subtotal: Itemized line.
  - Platform Fee (35%): Disclosed deduction line.
  - Worker 65% Subtotal: Line item before tips.
  - Customer Tip (100%): Distinct green-highlighted pass-through line.
  - Crew Allocation Note (`1086:755`): Explicit explanation of multi-worker split.
  - Regulatory Footnote (`1086:758`): *"65/35 applies to subtotal, not tips"*.
- **Navigation:**
  - Back button returning to `DW23`.
  - Link to `DW35` (`Payout History`).

#### 3.3 DW35 · Payout History (`1086:1215` / `1088:1544`)
- **Payout Transaction List:**
  - Historical payouts grouped by month / week.
  - Destination indicators: Direct Deposit (`Bank of America ****4128`), Instant Payout (`Visa Debit ****9012`).
  - Status badges: `Paid`, `Processing`, `Failed` (routes to `DW54`).
  - Download Monthly Tax Statement / Export CSV link.

---

### 4. Technical Implementation Directives for Engineering

1. **Precision & Rounding:**
   - All financial math in `@haulix/utils` must use integer cents (`bigint` or integer arithmetic) to prevent IEEE 754 floating-point inaccuracies.
   - Cent split rounding residual: Any odd cent ($0.01) resulting from equal division is credited to the Primary Driver account to avoid fractional balances.
2. **Ledger Immutability:**
   - Once a job reaches `JOB_COMPLETED` and the customer 24-hour review window elapses without dispute, ledger records are locked in PostgreSQL (`haulix_ledger_entries`).
3. **Localization Compliance:**
   - English: Currency format `$1,234.56`.
   - Spanish: Currency format `$1.234,56` or standard USD representation for US Hispanic markets (`$1,234.56 USD`).
