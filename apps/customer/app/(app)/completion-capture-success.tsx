import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  W08BookingCard,
  W08Header,
  W08PaymentCard,
} from "../../src/components/completion/W08CompletionCard";

export default function CompletionCaptureSuccessScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [modalType, setModalType] = useState<"receiptDemo" | "receiptPending" | null>(null);

  useEffect(() => {
    const onBackPress = () => {
      if (modalType) {
        setModalType(null);
        return true;
      }
      router.push("/completion-capture-pending");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router, modalType]);

  const handleBack = () => {
    router.push("/completion-capture-pending");
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
              onPress={() => setModalType("receiptDemo")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08CaptureSuccess.viewReceiptButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={() => setModalType("receiptPending")}
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

        <Modal
          visible={modalType !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setModalType(null)}
        >
          <View className="flex-1 bg-black/80 justify-center items-center px-6">
            <View className="bg-surface-elevated border border-neutral-700 rounded-2xl p-6 w-full max-w-sm">
              <Text className="text-lg font-bold text-white mb-2">
                {modalType === "receiptDemo"
                  ? t("w08CaptureSuccess.receiptModalTitle")
                  : t("w08CaptureSuccess.receiptPendingModalTitle")}
              </Text>
              <Text className="text-sm text-neutral-300 mb-6 leading-relaxed">
                {modalType === "receiptDemo"
                  ? t("w08CaptureSuccess.receiptModalBody")
                  : t("w08CaptureSuccess.receiptPendingModalBody")}
              </Text>
              <TouchableOpacity
                className="bg-brand py-3 rounded-xl items-center active:opacity-90"
                onPress={() => setModalType(null)}
                activeOpacity={0.8}
              >
                <Text className="text-neutral-900 font-bold text-sm">
                  {t("w08CaptureSuccess.receiptModalClose")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </HaulixSafeArea>
  );
}
