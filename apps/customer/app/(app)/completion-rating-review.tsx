import { useTranslation } from "@haulix/i18n";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useSubmittedSnapshot } from "../../src/components/completion/ratingDraftStore";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRatingReviewScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const snapshot = useSubmittedSnapshot();

  useEffect(() => {
    const onBackPress = () => {
      router.push("/my-jobs-history");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handlePrimaryPress = () => {
    router.push("/my-jobs-history");
  };

  const handleSecondaryPress = () => {
    router.push("/job-support");
  };

  const handleTertiaryPress = () => {
    router.push("/my-jobs");
  };

  const handleBack = () => {
    router.push("/my-jobs-history");
  };

  return (
    <W08RatingLayout
      backA11y={t("w08RatingReview.backA11y")}
      cardQuestion={t("w08RatingReview.cardQuestion")}
      cardTitle={t("w08RatingReview.cardTitle")}
      commentLabel={t("w08RatingReview.commentLabel")}
      commentPlaceholder={t("w08RatingReview.commentPlaceholder")}
      commentValue={snapshot.comment}
      disclaimerText={t("w08RatingReview.prototypeDisclaimer")}
      eligibilityLabel={t("w08RatingReview.eligibilityLabel")}
      eligibilityText={t("w08RatingReview.eligibilityText")}
      headerBadge={t("w08RatingReview.screenBadge")}
      heroSubtitle={t("w08RatingReview.screenSubtitle")}
      heroTitle={t("w08RatingReview.screenTitle")}
      onBack={handleBack}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08RatingReview.backToHistoryButton")}
      readOnly={true}
      secondaryButtonLabel={t("w08RatingReview.contactSupportButton")}
      selectedRating={snapshot.rating}
      tertiaryButtonLabel={t("w08RatingReview.tertiaryJobsLink")}
      testID="completion-rating-review-screen"
    />
  );
}
