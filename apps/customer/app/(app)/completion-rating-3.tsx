import { useTranslation } from "@haulix/i18n";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRating3Screen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (showModal) {
        setShowModal(false);
        return true;
      }
      router.push("/completion-rating");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router, showModal]);

  const handleSelectRating = (star: number) => {
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
        router.push("/completion-rating");
    }
  };

  const handlePrimaryPress = () => {
    setShowModal(true);
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
      disclaimerText={t("w08Rating3.prototypeDisclaimer")}
      eligibilityLabel={t("w08Rating3.eligibilityLabel")}
      eligibilityText={t("w08Rating3.eligibilityText")}
      headerBadge={t("w08Rating3.screenBadge")}
      heroSubtitle={t("w08Rating3.screenSubtitle")}
      heroTitle={t("w08Rating3.screenTitle")}
      modalBody={t("w08Rating3.modalBody")}
      modalCloseText={t("w08Rating3.modalClose")}
      modalTitle={t("w08Rating3.modalTitle")}
      onBack={handleBack}
      onCloseBoundaryModal={() => setShowModal(false)}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onSelectRating={handleSelectRating}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08Rating3.submitReviewButton")}
      secondaryButtonLabel={t("w08Rating3.changeRatingButton")}
      selectedRating={3}
      showBoundaryModal={showModal}
      tertiaryButtonLabel={t("w08Rating3.tertiaryJobsLink")}
      testID="completion-rating-3-screen"
    />
  );
}
