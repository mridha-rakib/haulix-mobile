import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
        step="01 / 03"
        onBack={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Step Indicator Badge */}
        <View style={styles.stepBadgeRow}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>{t("driver.roleSelect.stepTag")}</Text>
          </View>
          <Text style={styles.stepCounter}>{t("driver.roleSelect.stepProgress")}</Text>
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

        <View style={{ height: spacing[3] }} />

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

        <View style={{ height: spacing[4] }} />

        {/* Legal & Role Architecture Notice */}
        <InfoCard
          title={t("driver.roleSelect.eligibilityTitle")}
          body={t("driver.roleSelect.eligibilityBody")}
          variant="highlight"
        />

        <View style={{ height: spacing[6] }} />

        {/* Main CTA */}
        <ActionCtaButton
          label={
            selectedRole === "PRIMARY_DRIVER"
              ? t("driver.roleSelect.continueDriver")
              : t("driver.roleSelect.continueHelper")
          }
          onPress={handleContinue}
          variant="primary"
          size="large"
        />

        <View style={{ height: spacing[3] }} />

        {/* Already have an account link */}
        <Pressable
          onPress={() => router.push("/(auth)/sign-in")}
          style={({ pressed }) => [styles.signInLink, pressed && styles.signInLinkPressed]}
        >
          <Text style={styles.signInLinkText}>{t("driver.roleSelect.alreadyHaveAccount")}</Text>
        </Pressable>

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
  stepBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  stepBadge: {
    backgroundColor: "#1A221E",
    paddingHorizontal: spacing[2.5],
    paddingVertical: spacing[1],
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  stepBadgeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 10,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  stepCounter: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#8E9E99",
  },
  signInLink: {
    paddingVertical: spacing[2],
    alignItems: "center",
  },
  signInLinkPressed: {
    opacity: 0.7,
  },
  signInLinkText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#ADB8B0",
    textDecorationLine: "underline",
  },
  disclaimerBox: {
    marginTop: spacing[3],
    alignItems: "center",
  },
  disclaimerText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#687771",
    textAlign: "center",
  },
});
