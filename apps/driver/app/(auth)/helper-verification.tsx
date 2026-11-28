import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CheckmarkIcon,
  HelperUsersIcon,
  ShieldIcon,
  UserIcon,
} from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";
import { useDocumentStore } from "../../src/stores/documentStore";

export default function HelperVerificationScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { setRole } = useDriverAuthStore();
  const { submitForReview } = useDocumentStore();

  const handleSubmit = () => {
    setRole("HELPER");
    submitForReview("HELPER");
    router.push("/(auth)/verification-status");
  };

  const handleBackToRole = () => {
    router.push("/(auth)/register");
  };

  const checklistItems = [
    {
      id: "identity",
      title: t("driver.helperVerification.itemIdentity"),
      icon: <UserIcon size={20} color="#BAFF42" />,
    },
    {
      id: "background",
      title: t("driver.helperVerification.itemBackground"),
      icon: <ShieldIcon size={20} color="#BAFF42" />,
    },
    {
      id: "eligibility",
      title: t("driver.helperVerification.itemEligibility"),
      icon: <CheckmarkIcon size={20} color="#BAFF42" />,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.helperVerification.title")}
        subtitle={t("driver.helperVerification.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 3 Checklist Cards */}
        <View style={styles.checklistGroup}>
          {checklistItems.map((item) => (
            <View key={item.id} style={styles.checklistCard}>
              <View style={styles.cardLeft}>
                <View style={styles.iconBox}>{item.icon}</View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <CheckmarkIcon size={16} color="#BAFF42" />
            </View>
          ))}
        </View>

        <View style={{ height: spacing[4] }} />

        {/* Crew Independence Callout */}
        <InfoCard
          title={t("driver.helperVerification.calloutTitle")}
          body={t("driver.helperVerification.calloutBody")}
          icon={<HelperUsersIcon size={22} color="#BAFF42" />}
          variant="highlight"
        />

        <View style={{ height: spacing[6] }} />

        {/* Action CTAs */}
        <ActionCtaButton
          label={t("driver.helperVerification.submitCta")}
          onPress={handleSubmit}
          variant="primary"
          size="large"
        />

        <View style={{ height: spacing[3] }} />

        <ActionCtaButton
          label={t("driver.helperVerification.backRoleSelectCta")}
          onPress={handleBackToRole}
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
  checklistGroup: {
    gap: spacing[2.5],
  },
  checklistCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#151A19",
    borderRadius: radius.xl,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderWidth: 1,
    borderColor: "#232C28",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "#1A221F",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#F6F8F6",
    flex: 1,
  },
});
