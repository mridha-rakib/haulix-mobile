# HAULIX Customer Mobile App — Phase 03.43

## Dispatch Demo State Integrity Audit

### 1. Architectural Guardrails & Invariants

| Guardrail                          | Mandate                                                                          | Implementation Mechanism                                                                                | Verification Status |
| :--------------------------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :------------------ |
| **Zero Live GPS Streaming**        | Do NOT establish WebSocket or MQTT GPS connections to real driver locations      | Deterministic vector polyline coordinates in `c32Dispatch.ts` and `HaulixDispatchMap.tsx`               | **VERIFIED**        |
| **Zero Fabricated Backend Queues** | Do NOT claim real backend matching servers or driver database records are active | Transparent prototype notices: `"Demonstration dispatch matching · No real drivers queried or charged"` | **VERIFIED**        |
| **Zero Live Stripe Charges**       | Do NOT process or capture actual payment cards                                   | Pre-auth hold is displayed as simulated: `"Simulated $356.00 · $0.00 Charged"`                          | **VERIFIED**        |
| **Strict Role Boundaries**         | Do NOT permit local customer toggling into Driver / Helper mode                  | Role is fixed in demo crew fixture (`Primary Driver` vs `Helper`); customer app has zero driver routes  | **VERIFIED**        |
| **Scope Preservation**             | Customer confirmed draft must remain 4 pieces across 3 categories                | Imported directly from `W03_CUSTOMER_CONFIRMED_INVENTORY`                                               | **VERIFIED**        |
| **Symmetrical Non-Binding Quote**  | Quote must equal exactly $356.00 USD                                             | Consistent across all W04 & W05 cards and disclosures                                                   | **VERIFIED**        |

---

### 2. State Machine Transitions

```
[searching] (C32-A)
    ├── cancelSearchCta (fee-free) ───> [cancellation_windows] (C32-D) ───> [cancelled_fee_free]
    └── simulateMatchCta ─────────────> [matched] (C32-B)
                                            ├── viewCancellationTerms ────> [cancellation_windows] (C32-D)
                                            └── trackLiveCta ─────────────> [en_route] (C32-C)
                                                                                └── cancellationOptions ──> [cancellation_windows] (C32-D)
```

- In-memory event bus with `subscribeToW05DispatchState` allows state updates across screen instances.
- State resets deterministically via `resetDispatchDemo()`.
