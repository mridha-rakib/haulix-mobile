import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { HaulixOtpInput } from "../../src/components/ui/HaulixOtpInput";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { verifyMockOtp, otpCountdown, resetOtpCountdown, loginMock, onboardingDraft } =
    useDriverAuthStore();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = useDriverAuthStore.getState().otpCountdown;
      if (current > 0) {
        useDriverAuthStore.setState({ otpCountdown: current - 1 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    if (code.length < 6) {
      setError("Please enter the full 6-digit code");
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
      loginMock(onboardingDraft.email || "driver@haulix.com", "PRIMARY_DRIVER");
      setLoading(false);
      router.replace("/(app)/(tabs)");
    }, 600);
  };

  const handleResend = () => {
    resetOtpCountdown();
    setError(undefined);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.phoneVerification.title")}
        subtitle={t("driver.phoneVerification.subtitle")}
        step="03 / 03"
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.phoneTagBox}>
          <Text style={styles.phoneTagText}>
            {onboardingDraft.phone
              ? `${onboardingDraft.phone}  ·  Verification`
              : t("driver.phoneVerification.phoneDemoTag")}
          </Text>
        </View>

        <View style={styles.otpSection}>
          <HaulixOtpInput
            value={code}
            onChange={(val) => {
              setCode(val);
              if (error) setError(undefined);
            }}
            error={error}
          />
        </View>

        {/* Resend / Countdown Row */}
        <View style={styles.countdownRow}>
          {otpCountdown > 0 ? (
            <Text style={styles.countdownText}>
              {t("driver.phoneVerification.resendAction", { seconds: otpCountdown })}
            </Text>
          ) : (
            <Pressable
              onPress={handleResend}
              style={({ pressed }) => [styles.resendButton, pressed && styles.resendButtonPressed]}
            >
              <Text style={styles.resendText}>{t("driver.phoneVerification.resendReady")}</Text>
            </Pressable>
          )}
        </View>

        <ActionCtaButton
          label={t("driver.phoneVerification.verifyAndContinue")}
          onPress={handleVerify}
          variant="primary"
          size="large"
          loading={loading}
          disabled={code.length < 6}
        />

        <View style={{ height: spacing[4] }} />

        {/* Code Issue Link (DW66 navigation) */}
        <Pressable
          onPress={() => router.push("/(auth)/code-help")}
          style={({ pressed }) => [styles.helpLink, pressed && styles.helpLinkPressed]}
        >
          <Text style={styles.helpLinkText}>{t("driver.phoneVerification.expiredRecovery")}</Text>
        </Pressable>

        <View style={{ height: spacing[4] }} />

        <InfoCard
          title="Security Information"
          body={t("driver.phoneVerification.codeExpires")}
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
  phoneTagBox: {
    alignSelf: "flex-start",
    backgroundColor: "#1E2523",
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#35403B",
    marginBottom: spacing[5],
  },
  phoneTagText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#BAFF42",
  },
  otpSection: {
    marginBottom: spacing[4],
  },
  countdownRow: {
    alignItems: "center",
    marginBottom: spacing[6],
  },
  countdownText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#8E9E99",
  },
  resendButton: {
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[3],
  },
  resendButtonPressed: {
    opacity: 0.7,
  },
  resendText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#BAFF42",
    textDecorationLine: "underline",
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
