import { spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { RoleCard } from "../../src/components/ui/RoleCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function RegisterRoleSelectScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { setRole } = useDriverAuthStore();
  const [selectedRole, setSelectedRole] = useState<"PRIMARY_DRIVER" | "HELPER">("PRIMARY_DRIVER");

  const handleRoleSelect = (role: "PRIMARY_DRIVER" | "HELPER") => {
    setSelectedRole(role);
    setRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "PRIMARY_DRIVER") {
      router.push("/(auth)/driver-register");
    } else {
      router.push("/(auth)/helper-register");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.roleSelect.headerTitle")}
        subtitle={t("driver.roleSelect.headerSubtitle")}
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step Indicator Progress Bar Row (Figma 1085:39) */}
        <View style={styles.stepProgressBlock}>
          <View style={styles.stepProgressLabels}>
            <Text style={styles.stepTitleText}>{t("driver.roleSelect.stepTag")}</Text>
            <Text style={styles.stepCounterText}>{t("driver.roleSelect.stepProgress")}</Text>
          </View>
          <View style={styles.progressBarRow}>
            <View style={[styles.progressSegment, styles.segmentActive]} />
            <View style={styles.progressSegment} />
            <View style={styles.progressSegment} />
          </View>
        </View>

        {/* Driver Role Card (Figma 1085:46) */}
        <RoleCard
          driverRole="PRIMARY_DRIVER"
          title={t("driver.roleSelect.driverCardTitle")}
          tag={t("driver.roleSelect.driverTag")}
          description={t("driver.roleSelect.driverDescription")}
          chips={[t("driver.roleSelect.driverChip1"), t("driver.roleSelect.driverChip2")]}
          isSelected={selectedRole === "PRIMARY_DRIVER"}
          onSelect={() => handleRoleSelect("PRIMARY_DRIVER")}
        />

        <View style={{ height: spacing[1] }} />

        {/* Helper Role Card (Figma 1085:60) */}
        <RoleCard
          driverRole="HELPER"
          title={t("driver.roleSelect.helperCardTitle")}
          tag={t("driver.roleSelect.helperTag")}
          description={t("driver.roleSelect.helperDescription")}
          chips={[t("driver.roleSelect.helperChip1"), t("driver.roleSelect.helperChip2")]}
          isSelected={selectedRole === "HELPER"}
          onSelect={() => handleRoleSelect("HELPER")}
        />

        <View style={{ height: spacing[2] }} />

        {/* Legal & Role Architecture Notice */}
        <InfoCard
          title={t("driver.roleSelect.eligibilityTitle")}
          body={t("driver.roleSelect.eligibilityBody")}
          variant="highlight"
        />

        <View style={{ height: spacing[4] }} />

        {/* Action CTAs */}
        <ActionCtaButton
          label={
            selectedRole === "PRIMARY_DRIVER"
              ? t("driver.roleSelect.continueDriver")
              : t("driver.roleSelect.continueHelper")
          }
          onPress={handleContinue}
          variant="primary"
          size="default"
        />

        <View style={{ height: spacing[2.5] }} />

        <ActionCtaButton
          label={t("driver.roleSelect.alreadyHaveAccount")}
          onPress={() => router.push("/(auth)/sign-in")}
          variant="secondary"
          size="default"
        />

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>{t("driver.roleSelect.reviewNotice")}</Text>
        </View>
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
  stepProgressBlock: {
    marginBottom: spacing[3],
  },
  stepProgressLabels: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  stepTitleText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    color: "#BAFF42",
    letterSpacing: 0.8,
  },
  stepCounterText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#8E9E99",
  },
  progressBarRow: {
    flexDirection: "row",
    gap: 6,
  },
  progressSegment: {
    flex: 1,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#232C28",
  },
  segmentActive: {
    backgroundColor: "#BAFF42",
  },
  disclaimerBox: {
    marginTop: spacing[3],
    alignItems: "center",
  },
  disclaimerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11.5,
    color: "#687771",
    textAlign: "center",
  },
});
