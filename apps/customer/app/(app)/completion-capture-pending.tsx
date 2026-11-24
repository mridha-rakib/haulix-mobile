import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  W08BookingCard,
  W08Header,
  W08PaymentCard,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionCapturePendingScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-confirm");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handleCapturedDemo = () => {
    router.push("/completion-capture-success");
  };

  const handleFailedDemo = () => {
    router.push("/completion-capture-failed");
  };

  const handleBack = () => {
    router.push("/completion-confirm");
  };

  return (
    <HaulixSafeArea>
      <View className="flex-1 bg-surface-dark">
        <W08Header
          title={t("w08CapturePending.screenTitle")}
          badgeText={t("w08CapturePending.screenBadge")}
          badgeVariant="warning"
          onBack={handleBack}
        />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-xl font-bold text-white mt-4 mb-1">
            {t("w08CapturePending.heading")}
          </Text>
          <Text className="text-sm text-neutral-400 mb-4">{t("w08CapturePending.subheading")}</Text>

          <W08BookingCard />

          <W08PaymentCard
            title={t("w08CapturePending.paymentDetailsTitle")}
            statusBadgeText={t("w08CapturePending.paymentBadge")}
            statusBadgeVariant="warning"
            items={[
              {
                label: t("w08CapturePending.quotedAmountLabel"),
                value: t("w08CapturePending.quotedAmountValue"),
              },
              {
                label: t("w08CapturePending.stripeStatusLabel"),
                value: t("w08CapturePending.stripeStatusValue"),
              },
              {
                label: t("w08CapturePending.payoutProtectionLabel"),
                value: t("w08CapturePending.payoutProtectionValue"),
              },
              {
                label: t("w08CapturePending.cardHoldLabel"),
                value: t("w08CapturePending.cardHoldValue"),
              },
            ]}
            helperNotice={t("w08CapturePending.paymentHelper")}
          />

          <View className="mt-6 gap-3">
            <TouchableOpacity
              className="bg-brand py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleCapturedDemo}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08CapturePending.capturedDemoButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleFailedDemo}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-200 font-medium text-sm">
                {t("w08CapturePending.failedDemoButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2.5 items-center active:opacity-70"
              onPress={() => router.push("/my-jobs")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-400 text-xs">
                {t("w08CapturePending.tertiaryJobsLink")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}
