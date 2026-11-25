/**
 * HAULIX Customer Mobile App — Phase 03.69
 * Shared In-Memory Rating Draft Model & Store
 *
 * Implements:
 * - Multi-booking flow and draft isolation (FINAL-01, RES-02)
 * - Strict integer (1..5) and eligibility submission validation (FINAL-02)
 * - Idempotent submission and duplicate tap protection (FINAL-03)
 * - Booking-bound submitted snapshot retrieval and distinct QA fixtures (FINAL-04)
 * - Failure simulation lifecycle with reset on retry (RES-05)
 * - Safe hook lifecycle without render-phase mutation (RES-06)
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

export const DEFAULT_BOOKING_CONTEXT = "HX-AZ-DEMO-0042";

export const DEFAULT_SUBMITTED_SNAPSHOT: SubmittedReviewSnapshot = Object.freeze({
  bookingContext: DEFAULT_BOOKING_CONTEXT,
  rating: 5,
  comment:
    "Driver and helper were on time, extremely professional, and handled all 4 furniture pieces with care.",
  submittedAt: "2026-11-23T14:32:00.000Z",
});

export const DEFAULT_FAILED_COMMENT =
  "Great service overall, but delivery was delayed by 30 minutes.";

const draftsByBooking = new Map<string, RatingDraft>();
const submittedSnapshotsByBooking = new Map<string, SubmittedReviewSnapshot>();
const eligibilityByBooking = new Map<string, boolean>();
const simulateFailureByBooking = new Map<string, boolean>();

let activeBookingContext: string = DEFAULT_BOOKING_CONTEXT;
let isSubmittingFlag = false;

const listeners = new Set<() => void>();
const snapshotListeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function notifySnapshot() {
  for (const listener of snapshotListeners) {
    listener();
  }
}

function resolveContext(bookingContext?: string): string {
  return bookingContext || activeBookingContext || DEFAULT_BOOKING_CONTEXT;
}

function getOrCreateDraft(key: string): RatingDraft {
  let draft = draftsByBooking.get(key);
  if (!draft) {
    draft = {
      bookingContext: key,
      rating: null,
      comment: "",
      status: "draft",
    };
    draftsByBooking.set(key, draft);
  }
  return draft;
}

export const ratingDraftStore = {
  getActiveBookingContext(): string {
    return activeBookingContext;
  },

  setActiveBookingContext(bookingContext: string) {
    activeBookingContext = bookingContext;
    notify();
    notifySnapshot();
  },

  getDraft(bookingContext?: string): RatingDraft {
    const key = resolveContext(bookingContext);
    return { ...getOrCreateDraft(key) };
  },

  getSubmittedSnapshot(bookingContext?: string): SubmittedReviewSnapshot {
    const key = resolveContext(bookingContext);
    const found = submittedSnapshotsByBooking.get(key);
    return found ? { ...found } : { ...DEFAULT_SUBMITTED_SNAPSHOT, bookingContext: key };
  },

  hasSubmittedSnapshot(bookingContext?: string): boolean {
    const key = resolveContext(bookingContext);
    return submittedSnapshotsByBooking.has(key);
  },

  setSubmittedSnapshot(snapshot: SubmittedReviewSnapshot | null, bookingContext?: string) {
    const key = bookingContext || snapshot?.bookingContext || activeBookingContext;
    if (snapshot) {
      submittedSnapshotsByBooking.set(key, Object.freeze({ ...snapshot, bookingContext: key }));
    } else {
      submittedSnapshotsByBooking.delete(key);
    }
    notifySnapshot();
  },

  clearSubmittedSnapshot(bookingContext?: string) {
    const key = resolveContext(bookingContext);
    submittedSnapshotsByBooking.delete(key);
    notifySnapshot();
  },

  isRatingEligible(bookingContext?: string): boolean {
    const key = resolveContext(bookingContext);
    if (eligibilityByBooking.has(key)) {
      return eligibilityByBooking.get(key) === true;
    }
    // If the booking ID explicitly represents a locked demonstration fixture, default false
    if (key.includes("LOCKED")) {
      return false;
    }
    return true;
  },

  setRatingEligible(eligible: boolean, bookingContext?: string) {
    const key = resolveContext(bookingContext);
    eligibilityByBooking.set(key, eligible);
    notify();
  },

  setSimulateFailure(simulate: boolean, bookingContext?: string) {
    const key = resolveContext(bookingContext);
    simulateFailureByBooking.set(key, simulate);
  },

  getSimulateFailure(bookingContext?: string): boolean {
    const key = resolveContext(bookingContext);
    return simulateFailureByBooking.get(key) ?? false;
  },

  clearSimulateFailure(bookingContext?: string) {
    const key = resolveContext(bookingContext);
    simulateFailureByBooking.set(key, false);
  },

  isSubmitting(): boolean {
    return isSubmittingFlag;
  },

  setIsSubmitting(submitting: boolean) {
    isSubmittingFlag = submitting;
  },

  setRating(rating: RatingValue | null, bookingContext?: string) {
    const key = resolveContext(bookingContext);
    const current = getOrCreateDraft(key);
    draftsByBooking.set(key, { ...current, rating });
    notify();
  },

  setComment(comment: string, bookingContext?: string) {
    const key = resolveContext(bookingContext);
    const current = getOrCreateDraft(key);
    draftsByBooking.set(key, { ...current, comment });
    notify();
  },

  setStatus(status: ReviewStatus, bookingContext?: string) {
    const key = resolveContext(bookingContext);
    const current = getOrCreateDraft(key);
    draftsByBooking.set(key, { ...current, status });
    notify();
  },

  startNewFlow(bookingContext = DEFAULT_BOOKING_CONTEXT, isEligible = true): RatingDraft {
    activeBookingContext = bookingContext;
    const newDraft: RatingDraft = {
      bookingContext,
      rating: null,
      comment: "",
      status: "draft",
    };
    draftsByBooking.set(bookingContext, newDraft);
    eligibilityByBooking.set(bookingContext, isEligible);
    simulateFailureByBooking.set(bookingContext, false);
    isSubmittingFlag = false;
    notify();
    notifySnapshot();
    return { ...newDraft };
  },

  submitReview(bookingContext?: string): RatingDraft {
    const bContext = resolveContext(bookingContext);

    // FINAL-02: Eligibility validation at shared submission boundary
    if (!this.isRatingEligible(bContext)) {
      throw new Error("Cannot submit review: Service is not eligible for rating");
    }

    // FINAL-03: Idempotent submission protection (does not overwrite existing snapshot)
    if (submittedSnapshotsByBooking.has(bContext)) {
      const existing = getOrCreateDraft(bContext);
      return { ...existing, status: "sent" };
    }

    const current = getOrCreateDraft(bContext);
    const rating = current.rating;

    // FINAL-02: Strict integer (1..5) validation; rejects null, undefined, 0, >5, fractional (e.g. 3.5), NaN
    if (
      rating === null ||
      rating === undefined ||
      typeof rating !== "number" ||
      Number.isNaN(rating) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      throw new Error("Cannot submit review: Rating must be selected (between 1 and 5 stars)");
    }

    const finalRating = rating as RatingValue;
    const snapshot: SubmittedReviewSnapshot = Object.freeze({
      bookingContext: bContext,
      rating: finalRating,
      comment: current.comment,
      submittedAt: new Date().toISOString(),
    });

    submittedSnapshotsByBooking.set(bContext, snapshot);
    const updatedDraft: RatingDraft = { ...current, status: "sent" };
    draftsByBooking.set(bContext, updatedDraft);
    notify();
    notifySnapshot();
    return { ...updatedDraft };
  },

  failReview(bookingContext?: string): RatingDraft {
    const bContext = resolveContext(bookingContext);
    const current = getOrCreateDraft(bContext);
    const updatedDraft: RatingDraft = { ...current, status: "failed" };
    draftsByBooking.set(bContext, updatedDraft);
    notify();
    return { ...updatedDraft };
  },

  moderateReview(bookingContext?: string): RatingDraft {
    const bContext = resolveContext(bookingContext);
    const current = getOrCreateDraft(bContext);
    const updatedDraft: RatingDraft = { ...current, status: "under-moderation" };
    draftsByBooking.set(bContext, updatedDraft);
    notify();
    return { ...updatedDraft };
  },

  reset(
    initialRating: RatingValue | null = null,
    initialComment = "",
    bookingContext = DEFAULT_BOOKING_CONTEXT
  ) {
    activeBookingContext = bookingContext;
    draftsByBooking.clear();
    submittedSnapshotsByBooking.clear();
    eligibilityByBooking.clear();
    simulateFailureByBooking.clear();
    isSubmittingFlag = false;

    const freshDraft: RatingDraft = {
      bookingContext,
      rating: initialRating,
      comment: initialComment,
      status: "draft",
    };
    draftsByBooking.set(bookingContext, freshDraft);
    eligibilityByBooking.set(bookingContext, true);

    notify();
    notifySnapshot();
  },
};

export function useSubmittedSnapshot(bookingContext?: string): SubmittedReviewSnapshot {
  const bContext = resolveContext(bookingContext);
  const [snapshot, setSnapshot] = useState<SubmittedReviewSnapshot>(() =>
    ratingDraftStore.getSubmittedSnapshot(bContext)
  );

  useEffect(() => {
    const listener = () => {
      setSnapshot(ratingDraftStore.getSubmittedSnapshot(bContext));
    };
    snapshotListeners.add(listener);
    return () => {
      snapshotListeners.delete(listener);
    };
  }, [bContext]);

  return snapshot;
}

export function useRatingDraft(canonicalRating?: RatingValue, bookingContext?: string) {
  const bContext = resolveContext(bookingContext);
  const [draft, setDraft] = useState<RatingDraft>(() => ratingDraftStore.getDraft(bContext));

  useEffect(() => {
    if (
      canonicalRating !== undefined &&
      ratingDraftStore.getDraft(bContext).rating !== canonicalRating
    ) {
      if (bContext === DEFAULT_BOOKING_CONTEXT) {
        ratingDraftStore.setRating(canonicalRating);
      } else {
        ratingDraftStore.setRating(canonicalRating, bContext);
      }
    }
  }, [canonicalRating, bContext]);

  useEffect(() => {
    const listener = () => {
      setDraft(ratingDraftStore.getDraft(bContext));
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, [bContext]);

  return {
    draft,
    setRating: (rating: RatingValue | null) => ratingDraftStore.setRating(rating, bContext),
    setComment: (comment: string) => ratingDraftStore.setComment(comment, bContext),
    setStatus: (status: ReviewStatus) => ratingDraftStore.setStatus(status, bContext),
    submitReview: () => ratingDraftStore.submitReview(bContext),
    failReview: () => ratingDraftStore.failReview(bContext),
    moderateReview: () => ratingDraftStore.moderateReview(bContext),
    resetDraft: ratingDraftStore.reset,
    setSimulateFailure: (simulate: boolean) =>
      ratingDraftStore.setSimulateFailure(simulate, bContext),
    getSimulateFailure: () => ratingDraftStore.getSimulateFailure(bContext),
    clearSimulateFailure: () => ratingDraftStore.clearSimulateFailure(bContext),
    isRatingEligible: () => ratingDraftStore.isRatingEligible(bContext),
    setRatingEligible: (eligible: boolean) =>
      ratingDraftStore.setRatingEligible(eligible, bContext),
    startNewFlow: ratingDraftStore.startNewFlow,
  };
}
