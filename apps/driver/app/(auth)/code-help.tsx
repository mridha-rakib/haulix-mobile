import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function CodeHelpScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { resetOtpCountdown } = useDriverAuthStore();

  const handleReturn = () => {
    resetOtpCountdown();
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.codeIssue.title")}
        subtitle={t("driver.codeIssue.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statusBox}>
          <Text style={styles.statusTitle}>{t("driver.codeIssue.statusTitle")}</Text>
          <Text style={styles.statusBody}>{t("driver.codeIssue.statusBody")}</Text>
        </View>

        <InfoCard
          title={t("driver.codeIssue.securityTitle")}
          body={t("driver.codeIssue.securityBody")}
          variant="highlight"
        />

        <View style={{ height: spacing[4] }} />

        <InfoCard
          title="Common Delivery Issues"
          body="• Network carrier delay: Wait 30 seconds before retrying&#10;• SMS spam filters: Check your filtered messages folder&#10;• Wrong number: Return to registration to update your contact"
          variant="neutral"
        />

        <View style={{ height: spacing[6] }} />

        <ActionCtaButton
          label={t("driver.codeIssue.returnCta")}
          onPress={handleReturn}
          variant="primary"
          size="large"
        />

        <View style={{ height: spacing[3] }} />

        <ActionCtaButton
          label={t("driver.codeIssue.resendSmsCta")}
          onPress={handleReturn}
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
  statusBox: {
    backgroundColor: "#18201D",
    borderRadius: radius.lg,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#35403B",
    marginBottom: spacing[4],
  },
  statusTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#BAFF42",
    marginBottom: spacing[1],
  },
  statusBody: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#F6F8F6",
  },
});
