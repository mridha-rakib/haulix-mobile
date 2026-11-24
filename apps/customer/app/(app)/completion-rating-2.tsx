import { useTranslation } from "@haulix/i18n";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { type RatingValue, useRatingDraft } from "../../src/components/completion/ratingDraftStore";
import { W08RatingLayout } from "../../src/components/completion/W08RatingLayout";

export default function CompletionRating2Screen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { draft, setRating, setComment, submitReview, failReview } = useRatingDraft(2);

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-rating");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handleSelectRating = (star: number) => {
    if (star === 2) {
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
    if (draft.comment.trim().toLowerCase().includes("fail")) {
      failReview();
      router.push("/completion-rating-failed");
    } else {
      submitReview();
      router.push("/completion-rating-sent");
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
      backA11y={t("w08Rating2.backA11y")}
      cardQuestion={t("w08Rating2.cardQuestion")}
      cardTitle={t("w08Rating2.cardTitle")}
      commentLabel={t("w08Rating2.commentLabel")}
      commentPlaceholder={t("w08Rating2.commentPlaceholder")}
      commentValue={draft.comment}
      disclaimerText={t("w08Rating2.prototypeDisclaimer")}
      eligibilityLabel={t("w08Rating2.eligibilityLabel")}
      eligibilityText={t("w08Rating2.eligibilityText")}
      headerBadge={t("w08Rating2.screenBadge")}
      heroSubtitle={t("w08Rating2.screenSubtitle")}
      heroTitle={t("w08Rating2.screenTitle")}
      onBack={handleBack}
      onChangeComment={setComment}
      onPrimaryPress={handlePrimaryPress}
      onSecondaryPress={handleSecondaryPress}
      onSelectRating={handleSelectRating}
      onTertiaryPress={handleTertiaryPress}
      primaryButtonLabel={t("w08Rating2.submitReviewButton")}
      secondaryButtonLabel={t("w08Rating2.changeRatingButton")}
      selectedRating={2}
      tertiaryButtonLabel={t("w08Rating2.tertiaryJobsLink")}
      testID="completion-rating-2-screen"
    />
  );
}
