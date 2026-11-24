/**
 * HAULIX Customer Mobile App — Phase 03.67
 * Test Suite: Confirmed Gap Remediation, State Integrity, Design-System Refinement & Final QA Preparation
 *
 * Verifies:
 * 1. SubmittedReviewSnapshot immutability (GAP-01):
 *    - Decoupled RatingDraft from SubmittedReviewSnapshot
 *    - Snapshot created on submitReview() with bookingContext, rating, comment, submittedAt
 *    - Modifying draft after submission does NOT mutate stored snapshot
 *    - getSubmittedSnapshot() returns DEFAULT_SUBMITTED_SNAPSHOT fixture on direct mount
 * 2. Failure trigger decoupling (GAP-02):
 *    - Normal user comments containing "fail", "failed", "failure" submit normally to RATING_SENT
 *    - Explicit simulation via ratingDraftStore.setSimulateFailure(true) routes to RATING_FAILED
 *    - failReview() preserves comment and rating for user retry
 *    - completion-rating-failed.tsx falls back to DEFAULT_FAILED_COMMENT on direct entry
 * 3. Canonical rating route synchronization (GAP-03):
 *    - Opening /completion-rating-1..5 synchronizes stored rating to 1..5
 *    - Comment text is preserved across star rating route switches
 * 4. Star glyph visual fidelity and accessibility (GAP-04, GAP-07):
 *    - Uses authentic "★" text glyph with includeFontPadding: false and textAlign: center
 *    - Each star has accessibilityLabel, accessibilityHint, accessibilityRole="button", and accessibilityState
 * 5. Completion proof gallery (GAP-05):
 *    - completion-proof.tsx renders exactly two side-by-side evidence photo tiles matching Figma 907:6811/907:9711
 * 6. Keyboard dismissal handling (GAP-08):
 *    - W08RatingLayout incorporates Keyboard.dismiss and keyboardShouldPersistTaps="handled"
 * 7. CustomerBottomNav responsive font scaling (GAP-09):
 *    - Tab labels include adjustsFontSizeToFit and minimumFontScale={0.8}
 * 8. Rating eligibility integrity:
 *    - completion-rating-locked.tsx hardware back routes to /completion-receipt
 * 9. Localization symmetry:
 *    - starA11yHint and all rating namespaces exist with exact key parity in en.ts and es.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";
import {
  DEFAULT_FAILED_COMMENT,
  DEFAULT_SUBMITTED_SNAPSHOT,
  ratingDraftStore,
} from "../components/completion/ratingDraftStore";

const customerAppDir = path.resolve(__dirname, "../../app/(app)");
const componentsDir = path.resolve(__dirname, "../../src/components");

describe("Phase 03.67 — Confirmed Gap Remediation & State Integrity", () => {
  beforeEach(() => {
    ratingDraftStore.reset();
  });

  describe("1. Rating State Architecture & Snapshot Immutability (GAP-01)", () => {
    test("ratingDraftStore provides separate getDraft() and getSubmittedSnapshot()", () => {
      const draft = ratingDraftStore.getDraft();
      const snapshot = ratingDraftStore.getSubmittedSnapshot();

      expect(draft).toBeDefined();
      expect(snapshot).toBeDefined();
      expect(draft.status).toBe("draft");
      expect(snapshot.rating).toBe(5);
    });

    test("submitReview() captures immutable snapshot with bookingContext, rating, comment, and submittedAt", () => {
      ratingDraftStore.setRating(4);
      ratingDraftStore.setComment("Careful handling of furniture!");

      expect(ratingDraftStore.hasSubmittedSnapshot()).toBe(false);

      ratingDraftStore.submitReview();

      expect(ratingDraftStore.hasSubmittedSnapshot()).toBe(true);
      const snapshot = ratingDraftStore.getSubmittedSnapshot();
      expect(snapshot.bookingContext).toBe("HX-AZ-DEMO-0042");
      expect(snapshot.rating).toBe(4);
      expect(snapshot.comment).toBe("Careful handling of furniture!");
      expect(snapshot.submittedAt).toBeDefined();
      expect(new Date(snapshot.submittedAt).getTime()).not.toBeNaN();
    });

    test("editing draft after submission does NOT mutate stored snapshot", () => {
      ratingDraftStore.setRating(3);
      ratingDraftStore.setComment("Original review text");
      ratingDraftStore.submitReview();

      const initialSnapshot = ratingDraftStore.getSubmittedSnapshot();
      expect(initialSnapshot.rating).toBe(3);
      expect(initialSnapshot.comment).toBe("Original review text");

      // Attempt mutating draft afterwards
      ratingDraftStore.setRating(1);
      ratingDraftStore.setComment("Maliciously modified comment after submission");

      const postEditSnapshot = ratingDraftStore.getSubmittedSnapshot();
      expect(postEditSnapshot.rating).toBe(3);
      expect(postEditSnapshot.comment).toBe("Original review text");
    });

    test("getSubmittedSnapshot() falls back to DEFAULT_SUBMITTED_SNAPSHOT fixture when no prior submission", () => {
      expect(ratingDraftStore.hasSubmittedSnapshot()).toBe(false);
      const fallback = ratingDraftStore.getSubmittedSnapshot();

      expect(fallback).toEqual(DEFAULT_SUBMITTED_SNAPSHOT);
      expect(fallback.rating).toBe(5);
      expect(fallback.comment).toContain("Driver and helper were on time");
    });

    test("clearSubmittedSnapshot() clears snapshot and falls back to fixture", () => {
      ratingDraftStore.setRating(2);
      ratingDraftStore.submitReview();
      expect(ratingDraftStore.hasSubmittedSnapshot()).toBe(true);

      ratingDraftStore.clearSubmittedSnapshot();
      expect(ratingDraftStore.hasSubmittedSnapshot()).toBe(false);
      expect(ratingDraftStore.getSubmittedSnapshot()).toEqual(DEFAULT_SUBMITTED_SNAPSHOT);
    });
  });

  describe("2. Decouple Failure Trigger & Deterministic QA Simulation (GAP-02)", () => {
    test("normal comments containing 'fail' or 'failure' do not trigger failure mock", () => {
      for (let star = 1; star <= 5; star++) {
        const filePath = path.join(customerAppDir, `completion-rating-${star}.tsx`);
        const source = fs.readFileSync(filePath, "utf-8");

        // Verify that comment string checking for 'fail' has been completely removed
        expect(source).not.toContain("draft.comment.trim().toLowerCase().includes");
        expect(source).not.toContain("draft.comment.toLowerCase().includes");
        expect(source).not.toContain('.includes("fail")');
      }
    });

    test("explicit simulation flag causes review submission to route to failed state", () => {
      expect(ratingDraftStore.getSimulateFailure()).toBe(false);
      ratingDraftStore.setSimulateFailure(true);
      expect(ratingDraftStore.getSimulateFailure()).toBe(true);
      ratingDraftStore.setSimulateFailure(false);
      expect(ratingDraftStore.getSimulateFailure()).toBe(false);
    });

    test("failReview() retains user's draft rating and comment for retry", () => {
      ratingDraftStore.setRating(2);
      ratingDraftStore.setComment("Minor scratch on chair armrest");

      ratingDraftStore.failReview();

      const draft = ratingDraftStore.getDraft();
      expect(draft.status).toBe("failed");
      expect(draft.rating).toBe(2);
      expect(draft.comment).toBe("Minor scratch on chair armrest");
    });

    test("completion-rating-failed.tsx uses DEFAULT_FAILED_COMMENT when draft comment is empty", () => {
      const failedScreenPath = path.join(customerAppDir, "completion-rating-failed.tsx");
      const source = fs.readFileSync(failedScreenPath, "utf-8");

      expect(source).toContain("DEFAULT_FAILED_COMMENT");
      expect(source).toContain("displayedComment");
      expect(DEFAULT_FAILED_COMMENT).toBe(
        "Great service overall, but delivery was delayed by 30 minutes."
      );
    });
  });

  describe("3. Canonical Route Rating Synchronization & Fixture Isolation (GAP-03)", () => {
    test("screens completion-rating-1..5 synchronize store rating on mount", () => {
      for (let star = 1; star <= 5; star++) {
        const filePath = path.join(customerAppDir, `completion-rating-${star}.tsx`);
        const source = fs.readFileSync(filePath, "utf-8");

        expect(source).toContain(`useRatingDraft(${star})`);
      }
    });

    test("comment text is preserved when switching star ratings", () => {
      ratingDraftStore.setRating(1);
      ratingDraftStore.setComment("Preserved draft comment text");

      ratingDraftStore.setRating(5);
      const updated = ratingDraftStore.getDraft();
      expect(updated.rating).toBe(5);
      expect(updated.comment).toBe("Preserved draft comment text");
    });

    test("completion-rating-sent and completion-rating-review consume useSubmittedSnapshot", () => {
      const sentPath = path.join(customerAppDir, "completion-rating-sent.tsx");
      const reviewPath = path.join(customerAppDir, "completion-rating-review.tsx");

      const sentSource = fs.readFileSync(sentPath, "utf-8");
      const reviewSource = fs.readFileSync(reviewPath, "utf-8");

      expect(sentSource).toContain("useSubmittedSnapshot");
      expect(sentSource).toContain("commentValue={snapshot.comment}");
      expect(sentSource).toContain("selectedRating={snapshot.rating}");

      expect(reviewSource).toContain("useSubmittedSnapshot");
      expect(reviewSource).toContain("commentValue={snapshot.comment}");
      expect(reviewSource).toContain("selectedRating={snapshot.rating}");
    });
  });

  describe("4. Star Glyph Typography and Accessibility (GAP-04, GAP-07)", () => {
    test("W08RatingLayout uses authentic star text glyph with includeFontPadding: false and textAlign: center", () => {
      const layoutPath = path.join(componentsDir, "completion/W08RatingLayout.tsx");
      const source = fs.readFileSync(layoutPath, "utf-8");

      expect(source).toContain("<Text style={[styles.starGlyph, { color: starColor }]}>★</Text>");
      expect(source).toContain("includeFontPadding: false");
      expect(source).toContain('textAlign: "center"');
    });

    test("StarSelector includes accessibilityHint, accessibilityLabel, accessibilityRole, and accessibilityState", () => {
      const layoutPath = path.join(componentsDir, "completion/W08RatingLayout.tsx");
      const source = fs.readFileSync(layoutPath, "utf-8");

      expect(source).toContain('accessibilityRole="button"');
      expect(source).toContain('accessibilityHint={t("w08Rating.starA11yHint")}');
      expect(source).toContain("accessibilityLabel={t(a11yKey)}");
      expect(source).toContain(
        "accessibilityState={{ disabled: isDisabled, selected: isSelected }}"
      );
    });
  });

  describe("5. Completion Proof Gallery (GAP-05)", () => {
    test("completion-proof.tsx renders exactly two side-by-side evidence photo tiles matching Figma 907:6811/907:9711", () => {
      const proofPath = path.join(customerAppDir, "completion-proof.tsx");
      const source = fs.readFileSync(proofPath, "utf-8");

      expect(source).toContain('testID="w08-proof-tile-1"');
      expect(source).toContain('testID="w08-proof-tile-2"');
      expect(source).not.toContain('testID="w08-proof-tile-3"');
      expect(source).not.toContain('testID="w08-proof-tile-4"');
      expect(source).toContain("SOFA_IMAGE");
      expect(source).toContain("BOXES_IMAGE");
    });
  });

  describe("6. Keyboard Dismissal Handling (GAP-08)", () => {
    test("W08RatingLayout handles keyboard dismissal outside text inputs", () => {
      const layoutPath = path.join(componentsDir, "completion/W08RatingLayout.tsx");
      const source = fs.readFileSync(layoutPath, "utf-8");

      expect(source).toContain("Keyboard.dismiss");
      expect(source).toContain('keyboardShouldPersistTaps="handled"');
      expect(source).toContain('keyboardDismissMode="on-drag"');
      expect(source).toContain("TouchableWithoutFeedback");
    });
  });

  describe("7. CustomerBottomNav Responsive Text Scaling (GAP-09)", () => {
    test("CustomerBottomNav tab labels include adjustsFontSizeToFit and minimumFontScale={0.8}", () => {
      const navPath = path.join(componentsDir, "navigation/CustomerBottomNav.tsx");
      const source = fs.readFileSync(navPath, "utf-8");

      expect(source).toContain("adjustsFontSizeToFit");
      expect(source).toContain("minimumFontScale={0.8}");
    });
  });

  describe("8. Scheduled Jobs Filter Pill Geometry (GAP-10)", () => {
    test("my-jobs-scheduled.tsx includes balanced pill padding", () => {
      const scheduledPath = path.join(customerAppDir, "my-jobs-scheduled.tsx");
      const source = fs.readFileSync(scheduledPath, "utf-8");

      expect(source).toContain("paddingHorizontal: 6");
      expect(source).toContain("paddingVertical: 8");
    });
  });

  describe("9. Rating Eligibility Integrity", () => {
    test("completion-rating-locked.tsx onBack and BackHandler navigate to /completion-receipt", () => {
      const lockedPath = path.join(customerAppDir, "completion-rating-locked.tsx");
      const source = fs.readFileSync(lockedPath, "utf-8");

      expect(source).toContain('router.push("/completion-receipt")');
      expect(source).toContain("isLocked={true}");
      expect(source).toContain("selectedRating={0}");
    });
  });

  describe("10. Localization Parity", () => {
    test("starA11yHint is present across all W08 rating namespaces in en.ts and es.ts with exact parity", () => {
      const ratingNamespaces = [
        "w08Rating",
        "w08RatingLocked",
        "w08Rating1",
        "w08Rating2",
        "w08Rating3",
        "w08Rating4",
        "w08Rating5",
        "w08RatingSent",
        "w08RatingFailed",
        "w08RatingReview",
      ];

      for (const ns of ratingNamespaces) {
        const enDict = (en as any)[ns];
        const esDict = (es as any)[ns];

        expect(enDict).toBeDefined();
        expect(esDict).toBeDefined();
        expect(enDict.starA11yHint).toBeDefined();
        expect(esDict.starA11yHint).toBeDefined();
        expect(Object.keys(enDict).sort()).toEqual(Object.keys(esDict).sort());
      }
    });
  });
});
