import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  W08BookingCard,
  W08DecisionCard,
  W08Header,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionAutoEligibleScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-no-reply");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handlePreviewCapture = () => {
    router.push("/completion-capture-pending");
  };

  const handleSeeBlocked = () => {
    router.push("/completion-auto-blocked");
  };

  const handleBack = () => {
    router.push("/completion-no-reply");
  };

  return (
    <HaulixSafeArea>
      <View className="flex-1 bg-surface-dark">
        <W08Header
          title={t("w08AutoEligible.screenTitle")}
          badgeText={t("w08AutoEligible.screenBadge")}
          badgeVariant="success"
          onBack={handleBack}
        />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-xl font-bold text-white mt-4 mb-1">
            {t("w08AutoEligible.heading")}
          </Text>
          <Text className="text-sm text-neutral-400 mb-4">{t("w08AutoEligible.subheading")}</Text>

          <W08BookingCard />

          <W08DecisionCard
            title={t("w08AutoEligible.closurePolicyTitle")}
            statusBadgeText={t("w08AutoEligible.closureBadge")}
            statusBadgeVariant="success"
            items={[
              {
                label: t("w08AutoEligible.decisionNoticeLabel"),
                value: t("w08AutoEligible.decisionNoticeValue"),
              },
              {
                label: t("w08AutoEligible.elapsedLabel"),
                value: t("w08AutoEligible.elapsedValue"),
              },
              {
                label: t("w08AutoEligible.payoutLabel"),
                value: t("w08AutoEligible.payoutValue"),
              },
              {
                label: t("w08AutoEligible.nextStepLabel"),
                value: t("w08AutoEligible.nextStepValue"),
              },
            ]}
            helperNotice={t("w08AutoEligible.closureHelper")}
          />

          <View className="mt-6 gap-3">
            <TouchableOpacity
              className="bg-brand py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handlePreviewCapture}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08AutoEligible.previewCaptureButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleSeeBlocked}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-200 font-medium text-sm">
                {t("w08AutoEligible.seeBlockedButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2.5 items-center active:opacity-70"
              onPress={() => router.push("/my-jobs")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-400 text-xs">
                {t("w08AutoEligible.tertiaryJobsLink")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}
