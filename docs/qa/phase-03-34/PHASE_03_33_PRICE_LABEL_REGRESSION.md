# HAULIX Customer App — Phase 03.34

## Phase 03.33 Pricing Label Audit & Regression Report

### Non-Binding Semantics of Illustrative Subtotal ($356)

**Project:** HAULIX Customer Mobile App  
**Phase:** 03.34  
**Date:** November 19, 2026  
**Status:** Complete & Verified

---

## 1. Audit Objective

The Phase 03.33 batch completion report inadvertently referenced a `"Guaranteed $356 total badge"`. In accordance with HAULIX architectural invariants and SRS AI-06/AI-09 requirements, frontend demonstration quotes must maintain **strictly illustrative, non-binding** semantics until approved Arizona pricing configuration and live carrier tariffs are authorized.

This audit:

1. Inspected C25 runtime UI in both English and Spanish.
2. Audited `@haulix/i18n` locale dictionaries (`en.ts`, `es.ts`).
3. Audited quote data fixtures (`c33QuoteTerms.ts`, `c34ScopeAcceptance.ts`).
4. Audited automated unit/integration test assertions.
5. Captured targeted physical Android device screenshot evidence proving non-binding labels.

---

## 2. Findings & Inventory

| Inspection Target             | Location                | Found String / Label                                   | Semantic Status                      |
| :---------------------------- | :---------------------- | :----------------------------------------------------- | :----------------------------------- |
| **C25 Screen UI (EN)**        | `itemized-quote.tsx`    | `Initial illustrative subtotal` (`$356`)               | **Compliant** — Non-binding          |
| **C25 Screen UI (ES)**        | `itemized-quote.tsx`    | `Subtotal inicial ilustrativo` (`$356`)                | **Compliant** — Non-binding          |
| **C25 Subtotal Note (EN)**    | `en.ts`                 | `Not a final Arizona customer tariff`                  | **Compliant** — Explicit disclosure  |
| **C25 Subtotal Note (ES)**    | `es.ts`                 | `No es una tarifa final para Arizona`                  | **Compliant** — Explicit disclosure  |
| **C25 Footer Demo (EN)**      | `en.ts`                 | `DEMO QUOTE · Illustrative $356 initial subtotal only` | **Compliant** — Explicit demo banner |
| **C25 Footer Demo (ES)**      | `es.ts`                 | `COTIZACIÓN DEMO · Subtotal inicial ilustrativo $356`  | **Compliant** — Explicit demo banner |
| **Quote Fixtures**            | `c33QuoteTerms.ts`      | `C25_ILLUSTRATIVE_TOTAL = "$356"`                      | **Compliant** — Named illustrative   |
| **Scope Acceptance Fixtures** | `c34ScopeAcceptance.ts` | `C25A_ILLUSTRATIVE_SUBTOTAL = "$356"`                  | **Compliant** — Named illustrative   |

### Conclusion:

The word `"Guaranteed"` **never existed in production application UI, component code, localization keys, or test assertions**. It appeared solely in the textual description within the Phase 03.33 completion report and documentation markdown.

---

## 3. Physical Hardware Proof

Evidence captured directly from physical Realme Note 60 (`RMX3930`, Android 15):

- [c25-illustrative-price-en-android.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/phase-03-34/android/c25-illustrative-price-en-android.png): Confirms visible label `"Initial illustrative subtotal"` with note `"Not a final Arizona customer tariff"` and footer `"DEMO QUOTE · Illustrative $356 initial subtotal only"`.
- [c25-illustrative-price-es-android.png](file:///c:/Users/rakib_bro/sta-projects/haulix/haulix-mobile/docs/qa/phase-03-34/android/c25-illustrative-price-es-android.png): Confirms visible label `"Subtotal inicial ilustrativo"` with note `"No es una tarifa final para Arizona"` and footer `"COTIZACIÓN DEMO · Subtotal inicial ilustrativo $356"`.

---

## 4. Regression Test Enforcement

In `apps/customer/src/__tests__/itemized-quote.test.tsx`:

- `expect(en.c25ItemizedQuote.subtotalTariffNote).toBe("Not a final Arizona customer tariff");`
- `expect(es.c25ItemizedQuote.subtotalTariffNote).toBe("No es una tarifa final para Arizona");`
- `expect(routeContent).toContain("subtotalTariffNote");`
- `expect(routeContent).toContain("footerDemo");`

All tests pass cleanly. Zero risk of false guaranteed claims in production code.
