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

export default function CompletionReauthScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      router.push("/completion-auth-expired");
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, [router]);

  const handlePreviewReauth = () => {
    router.push("/completion-capture-pending");
  };

  const handleContactSupport = () => {
    router.push("/job-support");
  };

  const handleBack = () => {
    router.push("/completion-auth-expired");
  };

  return (
    <HaulixSafeArea>
      <View className="flex-1 bg-surface-dark">
        <W08Header
          title={t("w08Reauth.screenTitle")}
          badgeText={t("w08Reauth.screenBadge")}
          badgeVariant="warning"
          onBack={handleBack}
        />

        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-xl font-bold text-white mt-4 mb-1">
            {t("w08Reauth.screenTitle")}
          </Text>
          <Text className="text-sm text-neutral-400 mb-4">{t("w08Reauth.screenSubtitle")}</Text>

          <W08BookingCard />

          <W08PaymentCard
            title={t("w08Reauth.paymentDetailsTitle")}
            statusBadgeText={t("w08Reauth.screenBadge")}
            statusBadgeVariant="warning"
            items={[
              {
                label: t("w08Reauth.quotedAmountLabel"),
                value: t("w08Reauth.quotedAmountValue"),
              },
              {
                label: t("w08Reauth.stripeStatusLabel"),
                value: t("w08Reauth.stripeStatusValue"),
              },
              {
                label: t("w08Reauth.payoutProtectionLabel"),
                value: t("w08Reauth.payoutProtectionValue"),
              },
              {
                label: t("w08Reauth.cardHoldLabel"),
                value: t("w08Reauth.cardHoldValue"),
              },
            ]}
          />

          <View className="mt-6 gap-3">
            <TouchableOpacity
              className="bg-brand py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handlePreviewReauth}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-900 font-bold text-base">
                {t("w08Reauth.previewReauthButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-surface-elevated border border-neutral-700 py-3.5 px-4 rounded-xl items-center active:opacity-90"
              onPress={handleContactSupport}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-200 font-medium text-sm">
                {t("w08Reauth.contactSupportButton")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="py-2.5 items-center active:opacity-70"
              onPress={() => router.push("/my-jobs")}
              activeOpacity={0.8}
            >
              <Text className="text-neutral-400 text-xs">{t("w08Reauth.tertiaryJobsLink")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}
