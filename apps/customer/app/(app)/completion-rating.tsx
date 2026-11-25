import { useTranslation } from "@haulix/i18n";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import {
  type RatingValue,
  ratingDraftStore,
  useRatingDraft,
} from "../../src/components/completion/ratingDraftStore";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRatingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ bookingContext?: string }>();
  const bookingContext = params.bookingContext;
  const { draft, setRating, setComment } = useRatingDraft(undefined, bookingContext);

  // RES-01 / FINAL-01: Ineligible/locked flow redirect protection
  useEffect(() => {
    if (
      !ratingDraftStore.isRatingEligible() ||
      !ratingDraftStore.isRatingEligible(bookingContext)
    ) {
      router.replace("/completion-rating-locked");
    }
  }, [router, bookingContext]);

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-receipt");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handleSelectRating = (star: number) => {
    setRating(star as RatingValue);
    switch (star) {
      case 1:
        router.push("/completion-rating-1");
        break;
      case 2:
        router.push("/completion-rating-2");
        break;
      case 3:
        router.push("/completion-rating-3");
        break;
      case 4:
        router.push("/completion-rating-4");
        break;
      case 5:
        router.push("/completion-rating-5");
        break;
      default:
        router.push("/completion-rating-5");
    }
  };

  const handlePrimaryPress = () => {
    const target = draft.rating || 5;
    handleSelectRating(target);
  };

  const handleSecondaryPress = () => {
    router.push("/completion-rating-locked");
  };

  const handleTertiaryPress = () => {
    router.push("/my-jobs");
  };

  const handleBack = () => {
    router.push("/completion-receipt");
  };

  return (
    <W08RatingLayout
      backA11y={t("w08Rating.backA11y")}
      cardQuestion={t("w08Rating.cardQuestion")}
      cardTitle={t("w08Rating.cardTitle")}
      commentLabel={t("w08Rating.commentLabel")}
      commentPlaceholder={t("w08Rating.commentPlaceholder")}
      commentValue={draft.comment}
      disclaimerText={t("w08Rating.prototypeDisclaimer")}
      eligibilityLabel={t("w08Rating.eligibilityLabel")}
      eligibilityText={t("w08Rating.eligibilityText")}
      headerBadge={t("w08Rating.screenBadge")}
      heroSubtitle={t("w08Rating.screenSubtitle")}
      heroTitle={t("w08Rating.screenTitle")}
      onBack={handleBack}
      onChangeComment={setComment}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onSelectRating={handleSelectRating}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08Rating.selectStarsButton")}
      secondaryButtonLabel={t("w08Rating.reviewEligibilityButton")}
      selectedRating={draft.rating || 0}
      tertiaryButtonLabel={t("w08Rating.tertiaryJobsLink")}
      testID="completion-rating-screen"
    />
  );
}
