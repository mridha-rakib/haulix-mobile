# HAULIX Customer Mobile App — Phase 03.67
# Customer App Rating State Architecture Remediation

**Repository:** `mridha-rakib/haulix-mobile`  
**Application:** `apps/customer`  
**Component:** `apps/customer/src/components/completion/ratingDraftStore.ts`  
**Date:** November 24, 2026  
**Status:** IMPLEMENTED & INDEPENDENTLY VERIFIED

---

## 1. Context and Problem Statement (GAP-01 & GAP-02)

In Phase 03.65, initial review submission and moderation screens were introduced (`completion-rating-sent.tsx`, `completion-rating-failed.tsx`, `completion-rating-review.tsx`). The audit in Phase 03.66 identified two state architecture issues:

1. **Snapshot Mutability Leak (GAP-01):** The store maintained a single mutable `RatingDraft` object. When a user submitted a review, `draft.status` was set to `"sent"`, but subsequent draft modifications directly altered what was displayed in `/completion-rating-sent` and `/completion-rating-review`. Furthermore, direct entry into these screens without an existing submission resulted in incomplete or empty views.
2. **Comment-Dependent Mock Trigger (GAP-02):** In `completion-rating-[1-5].tsx`, submission logic checked whether `draft.comment.toLowerCase().includes("fail")`. Real users writing positive or neutral feedback such as *"This mover never fails to impress"* or *"The latch didn't fail"* were erroneously redirected to the mock failure screen.

---

## 2. Remediated Architecture

### 2.1 Decoupled Data Models

The store now enforces a strict separation between mutable in-progress draft state and immutable submitted review snapshots:

```typescript
export type RatingValue = 1 | 2 | 3 | 4 | 5;
export type ReviewStatus = "draft" | "sent" | "failed" | "under-moderation";

// Mutable draft state (actively edited by user)
export interface RatingDraft {
  bookingContext: string;
  rating: RatingValue | null;
  comment: string;
  status: ReviewStatus;
}

// Immutable snapshot (frozen upon submission)
export interface SubmittedReviewSnapshot {
  readonly bookingContext: string;
  readonly rating: RatingValue;
  readonly comment: string;
  readonly submittedAt: string;
}
```

### 2.2 Deterministic Default Fixtures

To ensure zero-guard direct navigation from `DemoScreenNavigator` renders realistic, beautiful UI without requiring prior session history, deterministic fixtures are provided:

```typescript
export const DEFAULT_SUBMITTED_SNAPSHOT: SubmittedReviewSnapshot = Object.freeze({
  bookingContext: "HX-AZ-DEMO-0042",
  rating: 5,
  comment: "Driver and helper were on time, extremely professional, and handled all 4 furniture pieces with care.",
  submittedAt: "2026-11-23T14:32:00.000Z",
});

export const DEFAULT_FAILED_COMMENT =
  "Great service overall, but delivery was delayed by 30 minutes.";
```

### 2.3 Store Implementation & Immutability Guarantee

```typescript
let currentDraft: RatingDraft = { ...DEFAULT_DRAFT };
let submittedSnapshot: SubmittedReviewSnapshot | null = null;
let simulateFailureFlag = false;

export const ratingDraftStore = {
  getDraft(): RatingDraft {
    return { ...currentDraft };
  },

  getSubmittedSnapshot(): SubmittedReviewSnapshot {
    return submittedSnapshot
      ? { ...submittedSnapshot }
      : { ...DEFAULT_SUBMITTED_SNAPSHOT };
  },

  hasSubmittedSnapshot(): boolean {
    return submittedSnapshot !== null;
  },

  setSubmittedSnapshot(snapshot: SubmittedReviewSnapshot | null) {
    submittedSnapshot = snapshot ? Object.freeze({ ...snapshot }) : null;
    notifySnapshot();
  },

  submitReview(): RatingDraft {
    const finalRating = (currentDraft.rating || 5) as RatingValue;
    submittedSnapshot = Object.freeze({
      bookingContext: currentDraft.bookingContext || "HX-AZ-DEMO-0042",
      rating: finalRating,
      comment: currentDraft.comment,
      submittedAt: new Date().toISOString(),
    });
    currentDraft = { ...currentDraft, status: "sent" };
    notify();
    notifySnapshot();
    return { ...currentDraft };
  },

  failReview(): RatingDraft {
    currentDraft = { ...currentDraft, status: "failed" };
    notify();
    return { ...currentDraft };
  },

  setSimulateFailure(simulate: boolean) {
    simulateFailureFlag = simulate;
  },

  getSimulateFailure(): boolean {
    return simulateFailureFlag;
  },
  
  // ...
};
```

### 2.4 Canonical Route Synchronization Hook

When mounting canonical star screens (`/completion-rating-1` through `/completion-rating-5`), the hook automatically synchronizes the store rating to that screen's canonical value while preserving any existing comment text:

```typescript
export function useRatingDraft(canonicalRating?: RatingValue) {
  const [draft, setDraft] = useState<RatingDraft>(() => {
    const existing = ratingDraftStore.getDraft();
    if (canonicalRating !== undefined && existing.rating !== canonicalRating) {
      existing.rating = canonicalRating;
      ratingDraftStore.setRating(canonicalRating);
    }
    return existing;
  });

  useEffect(() => {
    if (canonicalRating !== undefined && ratingDraftStore.getDraft().rating !== canonicalRating) {
      ratingDraftStore.setRating(canonicalRating);
    }
  }, [canonicalRating]);
  // ...
}
```

### 2.5 Terminal Screen Consumption

`/completion-rating-sent.tsx` and `/completion-rating-review.tsx` consume the immutable snapshot via `useSubmittedSnapshot()`:

```typescript
export default function CompletionRatingSentScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const snapshot = useSubmittedSnapshot();

  return (
    <W08RatingLayout
      commentValue={snapshot.comment}
      selectedRating={snapshot.rating}
      readOnly={true}
      // ...
    />
  );
}
```

Any subsequent modification to the draft (via back navigation or programmatic draft reset) has zero effect on `snapshot`.

---

## 3. Failure Simulation Decoupling

In `completion-rating-[1-5].tsx`, submission logic now checks the explicit simulation trigger:

```typescript
  const handlePrimaryPress = () => {
    const shouldFail = ratingDraftStore.getSimulateFailure() || params.simulateFailure === "1";
    if (shouldFail) {
      failReview();
      router.push("/completion-rating-failed");
    } else {
      submitReview();
      router.push("/completion-rating-sent");
    }
  };
```

- Any review comment containing "fail", "failed", "failure" submits normally to `/completion-rating-sent`.
- QA engineers can simulate failure by calling `ratingDraftStore.setSimulateFailure(true)` or navigating with query parameter `?simulateFailure=1`.
- When failure occurs, `failReview()` retains the user's rating and comment so that clicking "Retry review" restores their text without data loss.

---

## 4. Test Verification

Verified by automated tests in `apps/customer/src/__tests__/customer-final-remediation-phase-03-67.test.tsx`:

- `submitReview() captures immutable snapshot with bookingContext, rating, comment, and submittedAt` (PASSED)
- `editing draft after submission does NOT mutate stored snapshot` (PASSED)
- `getSubmittedSnapshot() falls back to DEFAULT_SUBMITTED_SNAPSHOT fixture when no prior submission` (PASSED)
- `normal comments containing 'fail' or 'failure' do not trigger failure mock` (PASSED)
- `explicit simulation flag causes review submission to route to failed state` (PASSED)
- `failReview() retains user's draft rating and comment for retry` (PASSED)
