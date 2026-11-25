import { useTranslation } from "@haulix/i18n";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { ratingDraftStore } from "../../src/components/completion/ratingDraftStore";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRatingLockedScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    // Explicitly record ineligibility for this demonstration flow
    ratingDraftStore.setRatingEligible(false);
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-receipt");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handlePrimaryPress = () => {
    router.push("/completion-receipt");
  };

  const handleSecondaryPress = () => {
    router.push("/my-jobs-history");
  };

  const handleTertiaryPress = () => {
    router.push("/my-jobs");
  };

  const handleBack = () => {
    router.push("/completion-receipt");
  };

  return (
    <W08RatingLayout
      backA11y={t("w08RatingLocked.backA11y")}
      cardQuestion={t("w08RatingLocked.cardQuestion")}
      cardTitle={t("w08RatingLocked.cardTitle")}
      commentLabel={t("w08RatingLocked.commentLabel")}
      commentPlaceholder={t("w08RatingLocked.commentPlaceholder")}
      disclaimerText={t("w08RatingLocked.prototypeDisclaimer")}
      eligibilityLabel={t("w08RatingLocked.eligibilityLabel")}
      eligibilityText={t("w08RatingLocked.eligibilityText")}
      headerBadge={t("w08RatingLocked.screenBadge")}
      heroSubtitle={t("w08RatingLocked.screenSubtitle")}
      heroTitle={t("w08RatingLocked.screenTitle")}
      isLocked={true}
      onBack={handleBack}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08RatingLocked.checkCompletionButton")}
      secondaryButtonLabel={t("w08RatingLocked.backToHistoryButton")}
      selectedRating={0}
      tertiaryButtonLabel={t("w08RatingLocked.tertiaryJobsLink")}
      testID="completion-rating-locked-screen"
    />
  );
}
