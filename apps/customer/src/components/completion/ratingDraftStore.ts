/**
 * HAULIX Customer Mobile App — Phase 03.68
 * Shared In-Memory Rating Draft Model & Store
 *
 * Implements:
 * - Decoupled mutable RatingDraft from immutable SubmittedReviewSnapshot (GAP-01)
 * - Deterministic fallback fixtures on direct entry (GAP-03)
 * - Explicit QA failure simulation mechanism with lifecycle clearing (GAP-02, RES-05)
 * - Flow & booking context isolation (RES-02)
 * - Rating validation & duplicate submission protection (RES-04)
 * - Safe hook lifecycle without render-phase mutation (RES-06)
 * - Explicit frontend rating eligibility state (RES-01)
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
const submittedSnapshotsByBooking = new Map<string, SubmittedReviewSnapshot>();
let simulateFailureFlag = false;
let ratingEligibleFlag = true;
let isSubmittingFlag = false;

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

  getSubmittedSnapshot(bookingContext?: string): SubmittedReviewSnapshot {
    const key = bookingContext || currentDraft.bookingContext || "HX-AZ-DEMO-0042";
    const found = submittedSnapshotsByBooking.get(key);
    return found ? { ...found } : { ...DEFAULT_SUBMITTED_SNAPSHOT };
  },

  hasSubmittedSnapshot(bookingContext?: string): boolean {
    const key = bookingContext || currentDraft.bookingContext || "HX-AZ-DEMO-0042";
    return submittedSnapshotsByBooking.has(key);
  },

  setSubmittedSnapshot(snapshot: SubmittedReviewSnapshot | null, bookingContext?: string) {
    const key =
      bookingContext ||
      snapshot?.bookingContext ||
      currentDraft.bookingContext ||
      "HX-AZ-DEMO-0042";
    if (snapshot) {
      submittedSnapshotsByBooking.set(key, Object.freeze({ ...snapshot }));
    } else {
      submittedSnapshotsByBooking.delete(key);
    }
    notifySnapshot();
  },

  clearSubmittedSnapshot(bookingContext?: string) {
    const key = bookingContext || currentDraft.bookingContext || "HX-AZ-DEMO-0042";
    submittedSnapshotsByBooking.delete(key);
    notifySnapshot();
  },

  isRatingEligible(): boolean {
    return ratingEligibleFlag;
  },

  setRatingEligible(eligible: boolean) {
    ratingEligibleFlag = eligible;
    notify();
  },

  setSimulateFailure(simulate: boolean) {
    simulateFailureFlag = simulate;
  },

  getSimulateFailure(): boolean {
    return simulateFailureFlag;
  },

  clearSimulateFailure() {
    simulateFailureFlag = false;
  },

  isSubmitting(): boolean {
    return isSubmittingFlag;
  },

  setIsSubmitting(submitting: boolean) {
    isSubmittingFlag = submitting;
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

  startNewFlow(bookingContext = "HX-AZ-DEMO-0042", isEligible = true): RatingDraft {
    currentDraft = {
      bookingContext,
      rating: null,
      comment: "",
      status: "draft",
    };
    ratingEligibleFlag = isEligible;
    simulateFailureFlag = false;
    isSubmittingFlag = false;
    notify();
    notifySnapshot();
    return { ...currentDraft };
  },

  submitReview(): RatingDraft {
    if (currentDraft.rating === null || currentDraft.rating < 1 || currentDraft.rating > 5) {
      throw new Error("Cannot submit review: Rating must be selected (between 1 and 5 stars)");
    }

    const finalRating = currentDraft.rating as RatingValue;
    const bContext = currentDraft.bookingContext || "HX-AZ-DEMO-0042";
    const snapshot: SubmittedReviewSnapshot = Object.freeze({
      bookingContext: bContext,
      rating: finalRating,
      comment: currentDraft.comment,
      submittedAt: new Date().toISOString(),
    });

    submittedSnapshotsByBooking.set(bContext, snapshot);
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

  reset(
    initialRating: RatingValue | null = null,
    initialComment = "",
    bookingContext = "HX-AZ-DEMO-0042"
  ) {
    currentDraft = {
      bookingContext,
      rating: initialRating,
      comment: initialComment,
      status: "draft",
    };
    submittedSnapshotsByBooking.clear();
    simulateFailureFlag = false;
    ratingEligibleFlag = true;
    isSubmittingFlag = false;
    notify();
    notifySnapshot();
  },
};

export function useSubmittedSnapshot(bookingContext?: string): SubmittedReviewSnapshot {
  const [snapshot, setSnapshot] = useState<SubmittedReviewSnapshot>(() =>
    ratingDraftStore.getSubmittedSnapshot(bookingContext)
  );

  useEffect(() => {
    const listener = () => {
      setSnapshot(ratingDraftStore.getSubmittedSnapshot(bookingContext));
    };
    snapshotListeners.add(listener);
    return () => {
      snapshotListeners.delete(listener);
    };
  }, [bookingContext]);

  return snapshot;
}

export function useRatingDraft(canonicalRating?: RatingValue) {
  const [draft, setDraft] = useState<RatingDraft>(() => ratingDraftStore.getDraft());

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
    clearSimulateFailure: ratingDraftStore.clearSimulateFailure,
    isRatingEligible: ratingDraftStore.isRatingEligible,
    setRatingEligible: ratingDraftStore.setRatingEligible,
    startNewFlow: ratingDraftStore.startNewFlow,
  };
}
