import { spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { HaulixFormField } from "../../src/components/ui/HaulixFormField";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();

  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    const targetEmail = inputVal.trim() || "driver.demo@haulix.com";
    setInputVal(targetEmail);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/(auth)/reset-confirmation");
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.forgotPassword.title")}
        subtitle={t("driver.forgotPassword.subtitle")}
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <InfoCard
          title={t("driver.forgotPassword.infoTitle")}
          body={t("driver.forgotPassword.infoBody")}
          variant="highlight"
        />

        <View style={{ height: spacing[4] }} />

        <HaulixFormField
          label={t("driver.forgotPassword.fieldLabel")}
          value={inputVal}
          onChangeText={(val) => {
            setInputVal(val);
            if (error) setError(undefined);
          }}
          placeholder={t("driver.forgotPassword.placeholder")}
          keyboardType="email-address"
          autoCapitalize="none"
          error={error}
        />

        <View style={{ height: spacing[2] }} />

        <InfoCard
          title={t("driver.forgotPassword.privacyTitle")}
          body={t("driver.forgotPassword.privacyBody")}
          variant="neutral"
        />

        <View style={{ height: spacing[6] }} />

        <ActionCtaButton
          label={t("driver.forgotPassword.sendCta")}
          onPress={handleSend}
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
});
