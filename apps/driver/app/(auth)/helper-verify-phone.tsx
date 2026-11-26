import { spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { HaulixOtpInput } from "../../src/components/ui/HaulixOtpInput";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function HelperVerifyPhoneScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { loginMock, setRole, onboardingDraft } = useDriverAuthStore();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    const finalCode = code.length === 6 ? code : "123456";
    setCode(finalCode);
    setLoading(true);

    setTimeout(() => {
      setRole("HELPER");
      loginMock(onboardingDraft.email || "helper@haulix.com", "HELPER");
      setLoading(false);
      router.replace("/(app)/(tabs)");
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.helperPhoneVerification.title")}
        subtitle={t("driver.helperPhoneVerification.subtitle")}
        onBack={() => router.back()}
      />

      <View style={styles.stepperContainer}>
        <View style={styles.stepperBarsRow}>
          <View style={[styles.stepperBar, styles.stepperBarActive]} />
          <View style={[styles.stepperBar, styles.stepperBarActive]} />
          <View style={[styles.stepperBar, styles.stepperBarActive]} />
        </View>
        <View style={styles.stepperLabelsRow}>
          <Text style={styles.stepperRoleText}>HELPER VERIFICATION</Text>
          <Text style={styles.stepperStepText}>STEP 03 / 03</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.phoneTagBox}>
          <Text style={styles.phoneTagText}>
            {onboardingDraft.phone || "+1 (602) 555-0142  ·  Demo"}
          </Text>
        </View>

        <InfoCard
          title={t("driver.helperPhoneVerification.statusTitle")}
          body={t("driver.helperPhoneVerification.statusBody")}
          variant="highlight"
        />

        <View style={{ height: spacing[4] }} />

        <HaulixOtpInput
          value={code}
          onChange={(val) => {
            setCode(val);
            if (error) setError(undefined);
          }}
          error={error}
        />

        <View style={{ height: spacing[5] }} />

        <ActionCtaButton
          label={t("driver.helperPhoneVerification.verifyCta")}
          onPress={handleVerify}
          variant="primary"
          size="large"
          loading={loading}
        />

        <View style={{ height: spacing[3] }} />

        <ActionCtaButton
          label={t("driver.checkInbox.backToSignIn")}
          onPress={() => router.push("/(auth)/sign-in")}
          variant="outline"
          size="large"
        />

        <View style={{ height: spacing[4] }} />

        <Pressable
          onPress={() => router.push("/(auth)/code-help")}
          style={({ pressed }) => [styles.helpLink, pressed && styles.helpLinkPressed]}
        >
          <Text style={styles.helpLinkText}>{t("driver.helperPhoneVerification.expiredCta")}</Text>
        </Pressable>

        <View style={{ height: spacing[4] }} />

        <InfoCard
          title={t("driver.helperPhoneVerification.securityTitle")}
          body={t("driver.helperPhoneVerification.securityBody")}
          variant="neutral"
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
  stepperContainer: {
    paddingHorizontal: spacing[4],
    marginBottom: spacing[3],
  },
  stepperBarsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: spacing[2],
  },
  stepperBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1D2522",
  },
  stepperBarActive: {
    backgroundColor: "#BAFF42",
  },
  stepperLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepperRoleText: {
    fontFamily: "Inter_700Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    color: "#BAFF42",
    textTransform: "uppercase",
  },
  stepperStepText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    letterSpacing: 0.8,
    color: "#687771",
  },
  phoneTagBox: {
    backgroundColor: "#151A19",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2B3532",
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: spacing[3],
  },
  phoneTagText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  helpLink: {
    alignItems: "center",
    paddingVertical: spacing[1.5],
  },
  helpLinkPressed: {
    opacity: 0.7,
  },
  helpLinkText: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#ADB8B0",
    textDecorationLine: "underline",
  },
});
