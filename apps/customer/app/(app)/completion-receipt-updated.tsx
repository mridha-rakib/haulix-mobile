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

export default function CompletionReceiptUpdatedScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-receipt");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handleViewReconciled = () => {
    router.push("/completion-receipt");
  };

  const handleDispute = () => {
    router.push("/completion-issue");
  };

  const handleBack = () => {
    router.push("/completion-receipt");
  };

  return (
    <HaulixSafeArea>
      <View className="flex-1 bg-surface-dark">
        <W08Header
          title={t("w08ReceiptUpdated.screenTitle")}
          badgeText={t("w08ReceiptUpdated.screenBadge")}
          badgeVariant="success"
          onBack={handleBack}
        />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-xl font-bold text-white mt-4 mb-1">
            {t("w08ReceiptUpdated.screenTitle")}
          </Text>
          <Text className="text-sm text-neutral-400 mb-4">
            {t("w08ReceiptUpdated.screenSubtitle")}
          </Text>

          <W08BookingCard />

          <W08ReceiptCard
            title={t("w08ReceiptUpdated.receiptDetailsTitle")}
            statusBadgeText={t("w08ReceiptUpdated.screenBadge")}
            statusBadgeVariant="success"
            items={[
              {
                label: t("w08ReceiptUpdated.quotedBookingLabel"),
                value: t("w08ReceiptUpdated.quotedBookingValue"),
              },
              {
                label: t("w08ReceiptUpdated.approvedExtrasLabel"),
                value: t("w08ReceiptUpdated.approvedExtrasValue"),
              },
              {
                label: t("w08ReceiptUpdated.taxesLabel"),
                value: t("w08ReceiptUpdated.taxesValue"),
              },
              {
                label: t("w08ReceiptUpdated.tipLabel"),
                value: t("w08ReceiptUpdated.tipValue"),
              },
              {
                label: t("w08ReceiptUpdated.capturedTotalLabel"),
                value: t("w08ReceiptUpdated.capturedTotalValue"),
              },
              {
                label: t("w08ReceiptUpdated.refundLabel"),
                value: t("w08ReceiptUpdated.refundValue"),
              },
            ]}
          />

          <View className="mt-6 gap-3">
            <TouchableOpacity
              className="bg-brand py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleViewReconciled}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08ReceiptUpdated.viewReconciledReceiptButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleDispute}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-200 font-medium text-sm">
                {t("w08ReceiptUpdated.disputeTransactionButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2.5 items-center active:opacity-70"
              onPress={() => router.push("/my-jobs")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-400 text-xs">
                {t("w08ReceiptUpdated.tertiaryJobsLink")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}
