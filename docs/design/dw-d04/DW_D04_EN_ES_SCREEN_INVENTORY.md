# HAULIX Driver & Worker Mobile App — Phase DW-D04
# Bilingual Screen Inventory & Node Mapping (English & Spanish)

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Page `1:3`)  
**Target Application:** `apps/driver` (`com.haulix.driver`)  
**Audited Canonical States:** `DW10`–`DW16`, `DW48`, `DW49` (9 Canonical Screens / 18 Bilingual Variants)

---

## 1. Bilingual Screen Inventory Table

| State ID | English Screen Name | English Node ID | Spanish Screen Name | Spanish Node ID | Logical Resolution | Screenshot File (PNG) |
|:---:|:---|:---:|:---|:---:|:---:|:---|
| **DW10** | DW10 · Job offers | `1086:81` | DW10 · Job offers · iOS ES | `1088:410` | 430 × 932 px | `dw10-job-offers-en-1086-81.png`<br>`dw10-job-offers-es-1088-410.png` |
| **DW11** | DW11 · Job details | `1086:162` | DW11 · Job details · iOS ES | `1088:491` | 430 × 932 px | `dw11-job-details-en-1086-162.png`<br>`dw11-job-details-es-1088-491.png` |
| **DW12** | DW12 · Offer unavailable | `1086:205` | DW12 · Offer unavailable · iOS ES | `1088:534` | 430 × 932 px | `dw12-offer-unavailable-en-1086-205.png`<br>`dw12-offer-unavailable-es-1088-534.png` |
| **DW13** | DW13 · Invite a Helper | `1086:231` | DW13 · Invite a Helper · iOS ES | `1088:560` | 430 × 932 px | `dw13-invite-helper-en-1086-231.png`<br>`dw13-invite-helper-es-1088-560.png` |
| **DW14** | DW14 · Helper invitations | `1086:268` | DW14 · Helper invitations · iOS ES | `1088:597` | 430 × 932 px | `dw14-helper-invitations-en-1086-268.png`<br>`dw14-helper-invitations-es-1088-597.png` |
| **DW15** | DW15 · Review invitation | `1086:328` | DW15 · Review invitation · iOS ES | `1088:657` | 430 × 932 px | `dw15-review-invitation-en-1086-328.png`<br>`dw15-review-invitation-es-1088-657.png` |
| **DW16** | DW16 · Crew readiness | `1086:365` | DW16 · Crew readiness · iOS ES | `1088:694` | 430 × 932 px | `dw16-crew-readiness-en-1086-365.png`<br>`dw16-crew-readiness-es-1088-694.png` |
| **DW48** | DW48 · Choose a Helper · EN · UX Gap Completion | `1301:920` | DW48 · Elegir ayudante · ES · UX Gap Completion | `1301:2162` | 430 × 932 px | `dw48-choose-helper-en-1301-920.png`<br>`dw48-choose-helper-es-1301-2162.png` |
| **DW49** | DW49 · Invitation pending · EN · UX Gap Completion | `1301:1010` | DW49 · Invitación pendiente · ES · UX Gap Completion | `1301:2252` | 430 × 932 px | `dw49-invitation-pending-en-1301-1010.png`<br>`dw49-invitation-pending-es-1301-2252.png` |

---

## 2. Localization Fidelity & Text Parity Analysis

1. **Offer Card Distance & Radius:**
   - EN: `10 mi radius` | ES: `Radio de 10 mi`
   - EN: `1 Driver + 1 Helper` | ES: `1 conductor + 1 ayudante`
2. **Guaranteed Payout Disclosure:**
   - EN: `Est. Payout $142.50` | ES: `Pago est. $142.50`
   - EN: `Tips: 100% to crew` | ES: `Propinas: 100% para el equipo`
3. **Crew Formation & Readiness:**
   - EN: `Invite a Helper` | ES: `Invitar a un ayudante`
   - EN: `Invitation pending` | ES: `Invitación pendiente`
   - EN: `Confirm readiness` | ES: `Confirmar preparación`
4. **Bottom Navigation Standard:**
   - Both English and Spanish screens feature standardized 430 × 88 navigation containers at `y: 844`, with active Jobs tab highlighting and verified prototype navigation triggers.
