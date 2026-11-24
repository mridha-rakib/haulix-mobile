import { useTranslation } from "@haulix/i18n";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useSubmittedSnapshot } from "../../src/components/completion/ratingDraftStore";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRatingSentScreen() {
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
    router.push("/completion-rating-review");
  };

  const handleTertiaryPress = () => {
    router.push("/my-jobs");
  };

  const handleBack = () => {
    router.push("/my-jobs-history");
  };

  return (
    <W08RatingLayout
      backA11y={t("w08RatingSent.backA11y")}
      cardQuestion={t("w08RatingSent.cardQuestion")}
      cardTitle={t("w08RatingSent.cardTitle")}
      commentLabel={t("w08RatingSent.commentLabel")}
      commentPlaceholder={t("w08RatingSent.commentPlaceholder")}
      commentValue={snapshot.comment}
      disclaimerText={t("w08RatingSent.prototypeDisclaimer")}
      eligibilityLabel={t("w08RatingSent.eligibilityLabel")}
      eligibilityText={t("w08RatingSent.eligibilityText")}
      headerBadge={t("w08RatingSent.screenBadge")}
      heroSubtitle={t("w08RatingSent.screenSubtitle")}
      heroTitle={t("w08RatingSent.screenTitle")}
      onBack={handleBack}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08RatingSent.goToJobsButton")}
      readOnly={true}
      secondaryButtonLabel={t("w08RatingSent.moderationStatusButton")}
      selectedRating={snapshot.rating}
      tertiaryButtonLabel={t("w08RatingSent.tertiaryJobsLink")}
      testID="completion-rating-sent-screen"
    />
  );
}
