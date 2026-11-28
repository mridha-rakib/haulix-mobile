import { spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { HaulixFormField } from "../../src/components/ui/HaulixFormField";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function SignInScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { loginMock } = useDriverAuthStore();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorIdentifier, setErrorIdentifier] = useState<string | undefined>();
  const [errorPassword, setErrorPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    // Instant mock sign-in for preview testing without backend requirement
    const loginIdentifier = identifier.trim() || "driver@haulix.com";
    setLoading(true);
    setTimeout(() => {
      loginMock(loginIdentifier, "PRIMARY_DRIVER");
      setLoading(false);
      router.replace("/(app)/(tabs)");
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.signIn.title")}
        subtitle={t("driver.signIn.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcomeHeadline}>{t("driver.signIn.welcomeBack")}</Text>

        <HaulixFormField
          label={t("driver.signIn.emailOrPhone")}
          value={identifier}
          onChangeText={(val) => {
            setIdentifier(val);
            if (errorIdentifier) setErrorIdentifier(undefined);
          }}
          placeholder="name@example.com or phone"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errorIdentifier}
        />

        <HaulixFormField
          label={t("driver.signIn.password")}
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (errorPassword) setErrorPassword(undefined);
          }}
          placeholder="••••••••"
          isPassword
          error={errorPassword}
        />

        <View style={styles.forgotRow}>
          <Pressable
            onPress={() => router.push("/(auth)/forgot-password")}
            style={({ pressed }) => [
              styles.forgotPressable,
              pressed && styles.forgotPressablePressed,
            ]}
          >
            <Text style={styles.forgotText}>{t("driver.signIn.forgotPassword")}</Text>
          </Pressable>
        </View>

        <ActionCtaButton
          label={t("driver.signIn.submit")}
          onPress={handleSignIn}
          variant="primary"
          size="default"
          loading={loading}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t("driver.signIn.or")}</Text>
          <View style={styles.dividerLine} />
        </View>

        <ActionCtaButton
          label={t("driver.signIn.continueWithPhone")}
          onPress={() => router.push("/(auth)/phone-sign-in")}
          variant="secondary"
          size="default"
        />

        <View style={{ height: spacing[5] }} />

        <InfoCard title="" body={t("driver.signIn.securityNote")} variant="neutral" />
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
    paddingBottom: spacing[6],
  },
  welcomeHeadline: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: "#FFFFFF",
    marginTop: spacing[2],
    marginBottom: spacing[5],
  },
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: spacing[4],
    marginTop: -spacing[1],
  },
  forgotPressable: {
    paddingVertical: spacing[1],
  },
  forgotPressablePressed: {
    opacity: 0.6,
  },
  forgotText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#BAFF42",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2B3532",
  },
  dividerText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#687771",
    marginHorizontal: spacing[3],
  },
});
