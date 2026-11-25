# HAULIX Driver/Worker Mobile App — Phase DW-D09

## Notification Architecture & Operational Alert Preferences Specification

**Phase Reference:** DW-D09  
**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv`  
**Canvas Page:** `1:3` (`02 — HAULIX Driver & Worker App · iOS Android · EN ES`)  
**Core Screens:**
- `DW30 · Notifications Activity Feed` (EN `1086:1009`, ES `1088:1338`)
- `DW42 · Notification Settings & Preferences` (EN `1270:1154`, ES `1270:2105`)

---

### 1. Notification Feed Architecture (`DW30`)

`DW30` serves as the centralized notification inbox for operational alerts, dispatch offers, crew invitations, verification updates, and financial settlement notices:

| Alert Category | Visible Item on Canvas | Deep-Link Destination Node | Urgency Level | Push Behavior |
|:---|:---|:---|:---:|:---|
| **Job Offers** | *"New job offer · $120.00"* | `DW11` (`1086:162` EN / `1088:491` ES) | High | Sound + Vibration + Heads-up Banner |
| **Helper Invites** | *"Helper invitation from Marcus R."* | `DW15` (`1086:328` EN / `1088:657` ES) | High | Sound + Immediate Modal alert |
| **Verification** | *"Document verification approved"* | `DW05` (`1085:154` EN / `1088:154` ES) | Medium | Standard in-app + Silent Push |
| **Earnings & Payout** | *"Instant payout completed · $379.42"* | `DW26` (`1086:802` EN / `1088:1131` ES) | Medium | Standard Push + Badge increment |
| **Safety / Compliance**| *"Vehicle insurance expires in 7 days"*| `DW38` (`1270:665` EN / `1270:1616` ES) | High | Persistent In-app banner + Email |

---

### 2. Notification Preferences & Gating (`DW42`)

Workers can independently customize delivery channels in `DW42` (`1270:1154` EN / `1270:2105` ES):

1. **Push Notifications:**
   - New Dispatch Offers (Critical — cannot be disabled when Online).
   - In-Transit Customer/Crew Messages.
   - Payout Status & Cash Out Confirmations.
2. **SMS Text Alerts:**
   - Urgent Crew Arrival Alerts.
   - 2FA Security Codes & Verification Challenges.
   - Emergency Safety Broadcasts.
3. **Email Summaries:**
   - Weekly Earnings Statements & Tax Receipts.
   - Regulatory Document Expiration Notices.
4. **Sound & Haptics:**
   - Distinct high-priority audio alert for dispatch matching countdown timers (`DW10`/`DW14`).
