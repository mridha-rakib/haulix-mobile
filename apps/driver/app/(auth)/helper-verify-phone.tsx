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
  const { verifyMockOtp, loginMock, setRole, onboardingDraft } = useDriverAuthStore();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (code.length < 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);
    const valid = verifyMockOtp(code);
    if (!valid && code !== "123456") {
      setError(t("driver.phoneVerification.invalidCodeError"));
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setRole("HELPER");
      loginMock(onboardingDraft.email || "helper@haulix.com", "HELPER");
      setLoading(false);
      router.replace("/(app)/(tabs)");
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.helperPhoneVerification.title")}
        subtitle={t("driver.helperPhoneVerification.subtitle")}
        step="03 / 03"
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <InfoCard
          title={t("driver.helperPhoneVerification.statusTitle")}
          body={t("driver.helperPhoneVerification.statusBody")}
          variant="highlight"
        />

        <View style={{ height: spacing[5] }} />

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
          disabled={code.length < 6}
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
