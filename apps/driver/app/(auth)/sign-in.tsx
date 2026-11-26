import { radius, spacing } from "@haulix/design-tokens";
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
    let hasError = false;
    if (!identifier.trim()) {
      setErrorIdentifier(t("driver.signIn.validationEmailRequired"));
      hasError = true;
    } else {
      setErrorIdentifier(undefined);
    }

    if (!password) {
      setErrorPassword(t("driver.signIn.validationPasswordRequired"));
      hasError = true;
    } else if (password.length < 8) {
      setErrorPassword(t("driver.signIn.validationPasswordLength"));
      hasError = true;
    } else {
      setErrorPassword(undefined);
    }

    if (hasError) return;

    setLoading(true);
    setTimeout(() => {
      loginMock(identifier, "PRIMARY_DRIVER");
      setLoading(false);
      router.replace("/(app)/(tabs)");
    }, 600);
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
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>{t("driver.signIn.welcomeBack")}</Text>
          <Text style={styles.welcomeSubtitle}>HAULIX Driver & Helper Network</Text>
        </View>

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
          size="large"
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
          variant="outline"
          size="large"
        />

        <View style={{ height: spacing[4] }} />

        <InfoCard
          title="Account Security"
          body={t("driver.signIn.securityNote")}
          variant="neutral"
        />

        <View style={{ height: spacing[4] }} />

        <Pressable onPress={() => router.push("/(auth)/register")} style={styles.registerLink}>
          <Text style={styles.registerLinkText}>
            Don't have an account? <Text style={styles.registerHighlight}>Create Account</Text>
          </Text>
        </Pressable>
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
  welcomeCard: {
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#2B3532",
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  welcomeTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#F6F8F6",
  },
  welcomeSubtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#ADB8B0",
    marginTop: 2,
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
    fontFamily: "Inter_500Medium",
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
  registerLink: {
    alignItems: "center",
    paddingVertical: spacing[2],
  },
  registerLinkText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#ADB8B0",
  },
  registerHighlight: {
    fontFamily: "Inter_600SemiBold",
    color: "#BAFF42",
    textDecorationLine: "underline",
  },
});
