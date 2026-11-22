# HAULIX Customer Mobile App — Phase 03.44

## Cancellation State and Eligibility Audit (P0-CANCEL-01)

### 1. Defect Analysis & Previous Vulnerability

In Phase 03.43:

1. `cancellation-windows.tsx` unconditionally executed `simulateFeeFreeExit()` when tapping the cancellation button, even if the customer arrived from the active `en_route` phase where a conditional $100 fee applies.
2. Opening `cancellation-windows.tsx` immediately overwrote `dispatchState.phase` to `"cancellation_windows"`, obliterating the prior dispatch phase.
3. The Back button and `handleKeepBooking` always navigated to `/crew-tracking`, breaking navigation when entered from `/searching-for-driver` or `/driver-matched`.

---

### 2. Remediation Architecture

#### A. Origin Phase Preservation:

- Screens now pass `{ fromPhase: "searching" | "matched" | "en_route" }` when navigating to `/cancellation-windows`.
- `setDispatchPhase("cancellation_windows", true)` preserves `previousPhase`.

#### B. Context-Aware Return Navigation:

- From `searching`: Returns to `/searching-for-driver`.
- From `matched`: Returns to `/driver-matched`.
- From `en_route`: Returns to `/crew-tracking`.

#### C. Enforced Cancellation Eligibility:

```ts
export function isCancellationFeeFree(phase: DispatchSearchPhase): boolean {
  return phase === "searching" || phase === "matched";
}
```

- If `effectiveOriginPhase === "searching"`: Fee-free cancellation ($0.00) allowed.
- If `effectiveOriginPhase === "matched"`: 5-minute grace window ($0.00) allowed.
- If `effectiveOriginPhase === "en_route"`: Fee-free exit is **BLOCKED**. The screen displays a warning banner and prompts for delay waiver review or support contact.

---

### 3. Verification Test Evidence

Verified by automated Jest suite:

```
√ verifies state transitions between searching, matched, en_route, and conditional cancellation safety (1 ms)
```
When `simulateFeeFreeExit()` is called in `en_route` phase:

- `isCancelled` remains `false`.
- `phase` remains `en_route`.
- `cancelReason` is recorded as `"requires_delay_waiver_review"`.
