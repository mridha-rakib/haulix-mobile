/**
 * HAULIX Customer Mobile App — Phase 03.65
 * Shared In-Memory Rating Draft Model & Store
 *
 * Provides controlled draft persistence across rating screens:
 * - Preserves comment drafts when transitioning between star ratings (1..5)
 * - Restores draft in failure recovery (RATING_FAILED)
 * - Captures submitted review snapshots for RATING_SENT and RATING_REVIEW
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

const DEFAULT_DRAFT: RatingDraft = {
  bookingContext: "HX-AZ-DEMO-0042",
  rating: null,
  comment: "",
  status: "draft",
};

let currentDraft: RatingDraft = { ...DEFAULT_DRAFT };
const listeners = new Set<(draft: RatingDraft) => void>();

function notify() {
  for (const listener of listeners) {
    listener({ ...currentDraft });
  }
}

export const ratingDraftStore = {
  getDraft(): RatingDraft {
    return { ...currentDraft };
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
    currentDraft = { ...currentDraft, status: "sent" };
    notify();
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

  reset(initialRating: RatingValue | null = null, initialComment: string = "") {
    currentDraft = {
      bookingContext: "HX-AZ-DEMO-0042",
      rating: initialRating,
      comment: initialComment,
      status: "draft",
    };
    notify();
  },
};

export function useRatingDraft(defaultRating?: RatingValue) {
  const [draft, setDraft] = useState<RatingDraft>(() => {
    const existing = ratingDraftStore.getDraft();
    if (defaultRating && existing.rating === null) {
      existing.rating = defaultRating;
      ratingDraftStore.setRating(defaultRating);
    }
    return existing;
  });

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
  };
}
