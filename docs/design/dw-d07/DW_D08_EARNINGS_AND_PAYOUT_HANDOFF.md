# DW-D08: Worker Ledger, Cash Out & Payout Processing Handoff

## 1. Scope of Next Phase (DW-D08)

Phase DW-D08 covers the worker earnings ledger, fee transparency disclosures, Stripe Connect integration points, Instant vs. Standard Cash Out options, and transfer failure recovery (Module `DW-W08`).

---

## 2. Authoritative Screen Scope for DW-D08

| State | Canonical Screen Title | Primary Role | English Node ID | Spanish Node ID | Primary Workflow Scope |
|:---:|---|:---:|:---:|:---:|---|
| **DW23** | Earnings overview | Driver & Helper | `1086:670` | `1088:999` | Available balance, weekly earnings ledger, payout button. |
| **DW24** | Worker earnings detail | Crew Helper | `1086:728` | `1088:1057` | Itemized earnings breakdown, 65/35 base share, 100% tip pass-through. |
| **DW25** | Instant Cash Out | Eligible Crew | `1086:765` | `1088:1094` | Instant fee disclosure (1.5%), debit card selection, confirm transfer. |
| **DW26** | Cash Out status | Eligible Crew | `1086:802` | `1088:1131` | Transfer confirmation, Stripe transaction ID, return to wallet. |
| **DW35** | Payout history | Driver & Helper | `1086:1228` | `1088:1557` | Settled ACH and Instant transfer history, downloadable statements. |
| **DW40** | Bank accounts | Driver & Helper | `1270:860` | `1270:1811` | Linked checking accounts, debit cards, micro-deposit verification. |
| **DW54** | Payout failed | Driver & Helper | `1301:1445` | `1301:2687` | Bank decline reason, account update prompt, support escalation. |
| **DW67** | Standard bank Cash Out | Driver & Helper | `1325:1804` | `1325:1938` | ACH settlement (2–3 business days, zero fee). |
| **DW68** | Instant fee & payout review | Eligible Crew | `1325:1866` | `1325:2000` | Net payout review before final consent. |

Total Scope: **9 Canonical States / 18 Bilingual Screen Variants**.

---

## 3. Prerequisite Governance

- Pre-tax and pre-tip subtotal split (65% Driver/Vehicle, 35% Helper) in compliance with signed SRS v1.6 (§3.3.1).
- 100% tip pass-through to participating workers.
- Fee and net payout disclosure prior to consent.
- Boundary: Await explicit project owner authorization before initiating Phase DW-D08 execution.
