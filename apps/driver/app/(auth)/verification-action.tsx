import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function VerificationActionScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { role } = useDriverAuthStore();

  const handleResubmit = () => {
    if (role === "PRIMARY_DRIVER") {
      router.push("/(auth)/driver-documents");
    } else {
      router.push("/(auth)/helper-verification");
    }
  };

  const handleContactSupport = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.verificationAction.title")}
        subtitle={t("driver.verificationAction.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Action Required Banner Card */}
        <View style={styles.actionBannerCard}>
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>
              {t("driver.verificationAction.actionRequiredBadge")}
            </Text>
          </View>
          <Text style={styles.bannerTitle}>{t("driver.verificationAction.bannerTitle")}</Text>
          <Text style={styles.bannerSub}>{t("driver.verificationAction.bannerSub")}</Text>
        </View>

        <View style={{ height: spacing[3] }} />

        {/* Detail Item 1: Identity Document */}
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{t("driver.verificationAction.itemIdentityTitle")}</Text>
          <Text style={styles.detailSub}>{t("driver.verificationAction.itemIdentitySub")}</Text>
        </View>

        <View style={{ height: spacing[2.5] }} />

        {/* Detail Item 2: Eligibility State */}
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>
            {t("driver.verificationAction.itemEligibilityTitle")}
          </Text>
          <Text style={styles.detailSub}>{t("driver.verificationAction.itemEligibilitySub")}</Text>
        </View>

        <View style={{ height: spacing[4] }} />

        {/* Monorepo Policy Callout */}
        <InfoCard
          title={t("driver.verificationAction.noBypassTitle")}
          body={t("driver.verificationAction.noBypassBody")}
          variant="highlight"
        />

        <View style={{ height: spacing[6] }} />

        {/* Action CTAs */}
        <ActionCtaButton
          label={t("driver.verificationAction.resubmitCta")}
          onPress={handleResubmit}
          variant="primary"
          size="large"
        />

        <View style={{ height: spacing[3] }} />

        <ActionCtaButton
          label={t("driver.verificationAction.contactSupportCta")}
          onPress={handleContactSupport}
          variant="outline"
          size="large"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#080B0B",
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  actionBannerCard: {
    backgroundColor: "#181313",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#3D2222",
  },
  actionBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#2B1919",
    paddingHorizontal: spacing[2.5],
    paddingVertical: 4,
    borderRadius: radius.md,
    marginBottom: spacing[2.5],
  },
  actionBadgeText: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    letterSpacing: 0.8,
    color: "#FF6B6B",
    textTransform: "uppercase",
  },
  bannerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  bannerSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#ADB8B0",
  },
  detailCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#232C28",
  },
  detailTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
    marginBottom: 4,
  },
  detailSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    lineHeight: 16,
    color: "#8E9E99",
  },
});
