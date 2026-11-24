import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  W08BookingCard,
  W08Header,
  W08ReceiptCard,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionReceiptScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (showRatingModal) {
        setShowRatingModal(false);
        return true;
      }
      router.push("/completion-capture-success");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router, showRatingModal]);

  const handleRateService = () => {
    setShowRatingModal(true);
  };

  const handleRefundedState = () => {
    router.push("/completion-receipt-refunded");
  };

  const handleBack = () => {
    router.push("/completion-capture-success");
  };

  return (
    <HaulixSafeArea>
      <View className="flex-1 bg-surface-dark">
        <W08Header
          title={t("w08Receipt.screenTitle")}
          badgeText={t("w08Receipt.screenBadge")}
          badgeVariant="success"
          onBack={handleBack}
        />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-xl font-bold text-white mt-4 mb-1">
            {t("w08Receipt.screenTitle")}
          </Text>
          <Text className="text-sm text-neutral-400 mb-4">{t("w08Receipt.screenSubtitle")}</Text>

          <W08BookingCard />

          <W08ReceiptCard
            title={t("w08Receipt.receiptDetailsTitle")}
            statusBadgeText={t("w08Receipt.screenBadge")}
            statusBadgeVariant="success"
            items={[
              {
                label: t("w08Receipt.quotedBookingLabel"),
                value: t("w08Receipt.quotedBookingValue"),
              },
              {
                label: t("w08Receipt.approvedExtrasLabel"),
                value: t("w08Receipt.approvedExtrasValue"),
              },
              {
                label: t("w08Receipt.taxesLabel"),
                value: t("w08Receipt.taxesValue"),
              },
              {
                label: t("w08Receipt.tipLabel"),
                value: t("w08Receipt.tipValue"),
              },
              {
                label: t("w08Receipt.capturedTotalLabel"),
                value: t("w08Receipt.capturedTotalValue"),
              },
              {
                label: t("w08Receipt.refundLabel"),
                value: t("w08Receipt.refundValue"),
              },
            ]}
          />

          <View className="mt-6 gap-3">
            <TouchableOpacity
              className="bg-brand py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleRateService}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08Receipt.rateServiceButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleRefundedState}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-200 font-medium text-sm">
                {t("w08Receipt.refundedStateButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2.5 items-center active:opacity-70"
              onPress={() => router.push("/my-jobs")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-400 text-xs">{t("w08Receipt.tertiaryJobsLink")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          visible={showRatingModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowRatingModal(false)}
        >
          <View className="flex-1 bg-black/80 justify-center items-center px-6">
            <View className="bg-surface-elevated border border-neutral-700 rounded-2xl p-6 w-full max-w-sm">
              <Text className="text-lg font-bold text-white mb-2">
                {t("w08Receipt.ratingNoticeTitle")}
              </Text>
              <Text className="text-sm text-neutral-300 mb-6 leading-relaxed">
                {t("w08Receipt.ratingNoticeBody")}
              </Text>
              <TouchableOpacity
                className="bg-brand py-3 rounded-xl items-center active:opacity-90"
                onPress={() => setShowRatingModal(false)}
                activeOpacity={0.8}
              >
                <Text className="text-neutral-900 font-bold text-sm">
                  {t("w08Receipt.ratingNoticeClose")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </HaulixSafeArea>
  );
}
