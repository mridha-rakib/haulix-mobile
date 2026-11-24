/**
 * HAULIX Customer Mobile App — Phase 03.67
 * Shared In-Memory Rating Draft Model & Store
 *
 * Implements:
 * - Decoupled mutable RatingDraft from immutable SubmittedReviewSnapshot (GAP-01)
 * - Deterministic fallback fixtures on direct entry (GAP-03)
 * - Explicit QA failure simulation mechanism (GAP-02)
 * - Canonical rating route synchronization (GAP-03)
 * - Pure in-memory architecture without private data persistence or URL leakage
 */

import { useEffect, useState } from "react";

export type RatingValue = 1 | 2 | 3 | 4 | 5;

export type ReviewStatus = "draft" | "sent" | "failed" | "under-moderation";

export interface RatingDraft {
  bookingContext: string;
  rating: RatingValue | null;
  comment: string;
  status: ReviewStatus;
}

export interface SubmittedReviewSnapshot {
  readonly bookingContext: string;
  readonly rating: RatingValue;
  readonly comment: string;
  readonly submittedAt: string;
}

const DEFAULT_DRAFT: RatingDraft = Object.freeze({
  bookingContext: "HX-AZ-DEMO-0042",
  rating: null,
  comment: "",
  status: "draft",
});

export const DEFAULT_SUBMITTED_SNAPSHOT: SubmittedReviewSnapshot = Object.freeze({
  bookingContext: "HX-AZ-DEMO-0042",
  rating: 5,
  comment:
    "Driver and helper were on time, extremely professional, and handled all 4 furniture pieces with care.",
  submittedAt: "2026-11-23T14:32:00.000Z",
});

export const DEFAULT_FAILED_COMMENT =
  "Great service overall, but delivery was delayed by 30 minutes.";

let currentDraft: RatingDraft = { ...DEFAULT_DRAFT };
let submittedSnapshot: SubmittedReviewSnapshot | null = null;
let simulateFailureFlag = false;

const listeners = new Set<(draft: RatingDraft) => void>();
const snapshotListeners = new Set<(snapshot: SubmittedReviewSnapshot) => void>();

function notify() {
  for (const listener of listeners) {
    listener({ ...currentDraft });
  }
}

function notifySnapshot() {
  const snap = ratingDraftStore.getSubmittedSnapshot();
  for (const listener of snapshotListeners) {
    listener(snap);
  }
}

export const ratingDraftStore = {
  getDraft(): RatingDraft {
    return { ...currentDraft };
  },

  getSubmittedSnapshot(): SubmittedReviewSnapshot {
    return submittedSnapshot ? { ...submittedSnapshot } : { ...DEFAULT_SUBMITTED_SNAPSHOT };
  },

  hasSubmittedSnapshot(): boolean {
    return submittedSnapshot !== null;
  },

  setSubmittedSnapshot(snapshot: SubmittedReviewSnapshot | null) {
    submittedSnapshot = snapshot ? Object.freeze({ ...snapshot }) : null;
    notifySnapshot();
  },

  clearSubmittedSnapshot() {
    submittedSnapshot = null;
    notifySnapshot();
  },

  setSimulateFailure(simulate: boolean) {
    simulateFailureFlag = simulate;
  },

  getSimulateFailure(): boolean {
    return simulateFailureFlag;
  },

  setRating(rating: RatingValue | null) {
    currentDraft = { ...currentDraft, rating };
    notify();
  },

  setComment(comment: string) {
    currentDraft = { ...currentDraft, comment };
    notify();
  },

  setStatus(status: ReviewStatus) {
    currentDraft = { ...currentDraft, status };
    notify();
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

  moderateReview(): RatingDraft {
    currentDraft = { ...currentDraft, status: "under-moderation" };
    notify();
    return { ...currentDraft };
  },

  reset(initialRating: RatingValue | null = null, initialComment = "") {
    currentDraft = {
      bookingContext: "HX-AZ-DEMO-0042",
      rating: initialRating,
      comment: initialComment,
      status: "draft",
    };
    submittedSnapshot = null;
    simulateFailureFlag = false;
    notify();
    notifySnapshot();
  },
};

export function useSubmittedSnapshot(): SubmittedReviewSnapshot {
  const [snapshot, setSnapshot] = useState<SubmittedReviewSnapshot>(() =>
    ratingDraftStore.getSubmittedSnapshot()
  );

  useEffect(() => {
    const listener = (newSnapshot: SubmittedReviewSnapshot) => {
      setSnapshot(newSnapshot);
    };
    snapshotListeners.add(listener);
    return () => {
      snapshotListeners.delete(listener);
    };
  }, []);

  return snapshot;
}

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

  useEffect(() => {
    const listener = (newDraft: RatingDraft) => {
      setDraft(newDraft);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    draft,
    setRating: ratingDraftStore.setRating,
    setComment: ratingDraftStore.setComment,
    setStatus: ratingDraftStore.setStatus,
    submitReview: ratingDraftStore.submitReview,
    failReview: ratingDraftStore.failReview,
    moderateReview: ratingDraftStore.moderateReview,
    resetDraft: ratingDraftStore.reset,
    setSimulateFailure: ratingDraftStore.setSimulateFailure,
    getSimulateFailure: ratingDraftStore.getSimulateFailure,
  };
}
