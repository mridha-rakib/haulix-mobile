import { useTranslation } from "@haulix/i18n";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import {
  type RatingValue,
  ratingDraftStore,
  useRatingDraft,
} from "../../src/components/completion/ratingDraftStore";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRating3Screen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ simulateFailure?: string }>();
  const { draft, setRating, setComment, submitReview, failReview } = useRatingDraft(3);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-rating");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handleSelectRating = (star: number) => {
    if (star === 3) {
      return;
    }
    setRating(star as RatingValue);
    switch (star) {
      case 1:
        router.replace("/completion-rating-1");
        break;
      case 2:
        router.replace("/completion-rating-2");
        break;
      case 3:
        router.replace("/completion-rating-3");
        break;
      case 4:
        router.replace("/completion-rating-4");
        break;
      case 5:
        router.replace("/completion-rating-5");
        break;
      default:
        router.replace("/completion-rating");
    }
  };

  const handlePrimaryPress = () => {
    if (isSubmitting || ratingDraftStore.isSubmitting() || draft.status === "sent") {
      return;
    }
    setIsSubmitting(true);
    ratingDraftStore.setIsSubmitting(true);
    try {
      const shouldFail = ratingDraftStore.getSimulateFailure() || params.simulateFailure === "1";
      if (shouldFail) {
        failReview();
        router.push("/completion-rating-failed");
      } else {
        submitReview();
        router.push("/completion-rating-sent");
      }
    } catch {
      // Handled safely without crash
    } finally {
      setIsSubmitting(false);
      ratingDraftStore.setIsSubmitting(false);
    }
  };

  const handleSecondaryPress = () => {
    router.push("/completion-rating");
  };

  const handleTertiaryPress = () => {
    router.push("/my-jobs");
  };

  const handleBack = () => {
    router.push("/completion-rating");
  };

  return (
    <W08RatingLayout
      backA11y={t("w08Rating3.backA11y")}
      cardQuestion={t("w08Rating3.cardQuestion")}
      cardTitle={t("w08Rating3.cardTitle")}
      commentLabel={t("w08Rating3.commentLabel")}
      commentPlaceholder={t("w08Rating3.commentPlaceholder")}
      commentValue={draft.comment}
      disclaimerText={t("w08Rating3.prototypeDisclaimer")}
      eligibilityLabel={t("w08Rating3.eligibilityLabel")}
      eligibilityText={t("w08Rating3.eligibilityText")}
      headerBadge={t("w08Rating3.screenBadge")}
      heroSubtitle={t("w08Rating3.screenSubtitle")}
      heroTitle={t("w08Rating3.screenTitle")}
      onBack={handleBack}
      onChangeComment={setComment}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onSelectRating={handleSelectRating}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08Rating3.submitReviewButton")}
      secondaryButtonLabel={t("w08Rating3.changeRatingButton")}
      selectedRating={3}
      tertiaryButtonLabel={t("w08Rating3.tertiaryJobsLink")}
      testID="completion-rating-3-screen"
    />
  );
}
