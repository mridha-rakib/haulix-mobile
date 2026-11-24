# HAULIX Customer Mobile App — Workflow 08 Implementation Handoff

## W08 Completion Proof, Final Payment, Receipt, Ratings & Service Recovery

**Authoritative Figma File:** `meiXxwUNJaDo0a3mhcHBXv` (Student Team)  
**Parent Section References:** W08 Delivery Completion & Wrap-Up  
**Initial Canonical Frame:** `907:6811` (EN: `W08-EN / PROOF · Review completion proof`) · `907:9711` (ES: `W08-ES / PROOF · Revisar prueba de finalización`)  
**Target Device Baseline:** Realme Note 60, Android 15, 360dp logical width  
**Total Canonical States:** 28 canonical states (56 bilingual English/Spanish variants)

---

## 1. Workflow 08 Mission & Overview

With Workflow 07 complete (34/34 canonical states, 68 bilingual variants), Workflow 08 is the final customer workflow in the HAULIX Customer Mobile App.

Workflow 08 encompasses the critical delivery completion handshake:

1. **Delivery Completion Proof:** Reviewing dropoff photos, cargo condition, and delivery signoff.
2. **Payment Finalization:** Authorizing final captured charges ($356.00 quote baseline + any approved extras/surges).
3. **Receipt & Cost Breakdown:** Itemized billing statement, payment method summary, and receipt download/emailing.
4. **Ratings, Reviews & Driver Tipping:** 5-star rating system, driver tip selector ($10, $20, $30, custom), and helper tip allocation.
5. **Service Recovery & Delivery Issues:** Damaged items report, missing goods claim, and customer satisfaction resolution.

---

## 2. Inbound Bridges to Workflow 08

1. **From W06 (Active Service):**
   `/active-service-completion-bridge` (W06 canonical state 26 `W08_HANDOFF`, EN `882:7891`, ES `883:8255`) routes directly to the initial W08 screen:
   `router.push({ pathname: "/completion-proof", params: { ... } });`

2. **From W07 (My Jobs History & Details):**
   Completed jobs in `/my-jobs-history` and `/job-details-history` link to view final receipts and post-delivery ratings.

---

## 3. Implementation Rules for W08

1. **Zero Route Guards:**
   Pure frontend UX demonstration. No real backend authorization holds, Stripe capture webhooks, or driver completion triggers.
2. **Symmetrical English/Spanish Coverage:**
   Every screen must have 100% bilingual parity in `packages/i18n`.
3. **Realme Note 60 360dp Responsive Design:**
   Ensure layouts fit 360dp logical width with zero horizontal clipping or text overlap.
4. **Master Inventory & QA Navigator Registration:**
   All 28 canonical states must be registered in `DemoScreenNavigator.tsx` with their authentic Figma node IDs.
