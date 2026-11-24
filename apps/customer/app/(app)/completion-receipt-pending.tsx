import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  W08BookingCard,
  W08Header,
  W08ReceiptCard,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionReceiptPendingScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-capture-success");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handleReviewStatus = () => {
    router.push("/completion-receipt");
  };

  const handleCaptureFailure = () => {
    router.push("/completion-capture-failed");
  };

  const handleBack = () => {
    router.push("/completion-capture-success");
  };

  return (
    <HaulixSafeArea>
      <View className="flex-1 bg-surface-dark">
        <W08Header
          title={t("w08ReceiptPending.screenTitle")}
          badgeText={t("w08ReceiptPending.screenBadge")}
          badgeVariant="warning"
          onBack={handleBack}
        />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-xl font-bold text-white mt-4 mb-1">
            {t("w08ReceiptPending.screenTitle")}
          </Text>
          <Text className="text-sm text-neutral-400 mb-4">
            {t("w08ReceiptPending.screenSubtitle")}
          </Text>

          <W08BookingCard />

          <W08ReceiptCard
            title={t("w08ReceiptPending.receiptDetailsTitle")}
            statusBadgeText={t("w08ReceiptPending.screenBadge")}
            statusBadgeVariant="warning"
            items={[
              {
                label: t("w08ReceiptPending.quotedBookingLabel"),
                value: t("w08ReceiptPending.quotedBookingValue"),
              },
              {
                label: t("w08ReceiptPending.approvedExtrasLabel"),
                value: t("w08ReceiptPending.approvedExtrasValue"),
              },
              {
                label: t("w08ReceiptPending.taxesLabel"),
                value: t("w08ReceiptPending.taxesValue"),
              },
              {
                label: t("w08ReceiptPending.tipLabel"),
                value: t("w08ReceiptPending.tipValue"),
              },
              {
                label: t("w08ReceiptPending.capturedTotalLabel"),
                value: t("w08ReceiptPending.capturedTotalValue"),
              },
              {
                label: t("w08ReceiptPending.refundLabel"),
                value: t("w08ReceiptPending.refundValue"),
              },
            ]}
          />

          <View className="mt-6 gap-3">
            <TouchableOpacity
              className="bg-brand py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleReviewStatus}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08ReceiptPending.reviewReceiptStatusButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleCaptureFailure}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-200 font-medium text-sm">
                {t("w08ReceiptPending.captureFailureButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2.5 items-center active:opacity-70"
              onPress={() => router.push("/my-jobs")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-400 text-xs">
                {t("w08ReceiptPending.tertiaryJobsLink")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}
