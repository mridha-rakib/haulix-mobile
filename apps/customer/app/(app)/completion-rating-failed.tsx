import { useTranslation } from "@haulix/i18n";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useRatingDraft } from "../../src/components/completion/ratingDraftStore";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRatingFailedScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { draft } = useRatingDraft();

  const retryRoute = draft.rating
    ? (`/completion-rating-${draft.rating}` as const)
    : ("/completion-rating-5" as const);

  useEffect(() => {
    const onBackPress = () => {
      router.push(retryRoute);
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router, retryRoute]);

  const handlePrimaryPress = () => {
    router.push(retryRoute);
  };

  const handleSecondaryPress = () => {
    router.push("/job-support");
  };

  const handleTertiaryPress = () => {
    router.push("/my-jobs");
  };

  const handleBack = () => {
    router.push(retryRoute);
  };

  return (
    <W08RatingLayout
      backA11y={t("w08RatingFailed.backA11y")}
      cardQuestion={t("w08RatingFailed.cardQuestion")}
      cardTitle={t("w08RatingFailed.cardTitle")}
      commentLabel={t("w08RatingFailed.commentLabel")}
      commentPlaceholder={t("w08RatingFailed.commentPlaceholder")}
      commentValue={draft.comment}
      disclaimerText={t("w08RatingFailed.prototypeDisclaimer")}
      eligibilityLabel={t("w08RatingFailed.eligibilityLabel")}
      eligibilityText={t("w08RatingFailed.eligibilityText")}
      headerBadge={t("w08RatingFailed.screenBadge")}
      heroSubtitle={t("w08RatingFailed.screenSubtitle")}
      heroTitle={t("w08RatingFailed.screenTitle")}
      onBack={handleBack}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08RatingFailed.retryReviewButton")}
      readOnly={true}
      secondaryButtonLabel={t("w08RatingFailed.getSupportButton")}
      selectedRating={draft.rating || 5}
      tertiaryButtonLabel={t("w08RatingFailed.tertiaryJobsLink")}
      testID="completion-rating-failed-screen"
    />
  );
}
