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

export default function CompletionCaptureSuccessScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-capture-pending");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handleBack = () => {
    router.push("/completion-capture-pending");
  };

  const handleViewReceipt = () => {
    router.push("/completion-receipt");
  };

  const handleReceiptPending = () => {
    router.push("/completion-receipt-pending");
  };

  return (
    <HaulixSafeArea>
      <View className="flex-1 bg-surface-dark">
        <W08Header
          title={t("w08CaptureSuccess.screenTitle")}
          badgeText={t("w08CaptureSuccess.screenBadge")}
          badgeVariant="success"
          onBack={handleBack}
        />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-xl font-bold text-white mt-4 mb-1">
            {t("w08CaptureSuccess.heading")}
          </Text>
          <Text className="text-sm text-neutral-400 mb-4">{t("w08CaptureSuccess.subheading")}</Text>

          <W08BookingCard />

          <W08PaymentCard
            title={t("w08CaptureSuccess.paymentDetailsTitle")}
            statusBadgeText={t("w08CaptureSuccess.paymentBadge")}
            statusBadgeVariant="success"
            items={[
              {
                label: t("w08CaptureSuccess.quotedAmountLabel"),
                value: t("w08CaptureSuccess.quotedAmountValue"),
              },
              {
                label: t("w08CaptureSuccess.stripeStatusLabel"),
                value: t("w08CaptureSuccess.stripeStatusValue"),
              },
              {
                label: t("w08CaptureSuccess.payoutProtectionLabel"),
                value: t("w08CaptureSuccess.payoutProtectionValue"),
              },
              {
                label: t("w08CaptureSuccess.cardHoldLabel"),
                value: t("w08CaptureSuccess.cardHoldValue"),
              },
            ]}
            helperNotice={t("w08CaptureSuccess.paymentHelper")}
          />

          <View className="mt-6 gap-3">
            <TouchableOpacity
              className="bg-brand py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleViewReceipt}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08CaptureSuccess.viewReceiptButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleReceiptPending}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-200 font-medium text-sm">
                {t("w08CaptureSuccess.receiptPendingButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2.5 items-center active:opacity-70"
              onPress={() => router.push("/my-jobs")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-400 text-xs">
                {t("w08CaptureSuccess.tertiaryJobsLink")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}
