import { spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { HaulixFormField } from "../../src/components/ui/HaulixFormField";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { TermsConsentCheckbox } from "../../src/components/ui/TermsConsentCheckbox";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function HelperRegisterScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { setRole, updateDraft } = useDriverAuthStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    terms?: string;
  }>({});

  const handleContinue = () => {
    const newErrors: typeof errors = {};
    if (!fullName.trim()) newErrors.fullName = t("driver.helperRegister.errorName");
    if (!email.trim() || !email.includes("@"))
      newErrors.email = t("driver.helperRegister.errorEmail");
    if (!phone.trim()) newErrors.phone = t("driver.helperRegister.errorPhone");
    if (!password || password.length < 8)
      newErrors.password = t("driver.helperRegister.errorPassword");
    if (!termsAccepted) newErrors.terms = t("driver.helperRegister.errorTerms");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setRole("HELPER");
    updateDraft({ fullName, email, phone, role: "HELPER" });
    router.push("/(auth)/helper-verify-phone");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.helperRegister.title")}
        subtitle={t("driver.helperRegister.subtitle")}
        step="02 / 03"
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HaulixFormField
          label={t("driver.helperRegister.fullNameLabel")}
          value={fullName}
          onChangeText={(v) => {
            setFullName(v);
            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
          }}
          placeholder={t("driver.helperRegister.fullNamePlaceholder")}
          error={errors.fullName}
        />

        <HaulixFormField
          label={t("driver.helperRegister.emailLabel")}
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          placeholder={t("driver.helperRegister.emailPlaceholder")}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <HaulixFormField
          label={t("driver.helperRegister.phoneLabel")}
          value={phone}
          onChangeText={(v) => {
            setPhone(v);
            if (errors.phone) setErrors({ ...errors, phone: undefined });
          }}
          placeholder={t("driver.helperRegister.phonePlaceholder")}
          keyboardType="phone-pad"
          error={errors.phone}
        />

        <HaulixFormField
          label={t("driver.helperRegister.passwordLabel")}
          value={password}
          onChangeText={(v) => {
            setPassword(v);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          placeholder={t("driver.helperRegister.passwordPlaceholder")}
          isPassword
          error={errors.password}
        />

        <TermsConsentCheckbox
          checked={termsAccepted}
          onChange={(checked) => {
            setTermsAccepted(checked);
            if (errors.terms) setErrors({ ...errors, terms: undefined });
          }}
          title={t("driver.helperRegister.termsTitle")}
          subtitle={t("driver.helperRegister.termsSubtitle")}
          error={errors.terms}
        />

        <View style={{ height: spacing[4] }} />

        <InfoCard
          title="Independent Crew Member"
          body="No truck required. Helpers assist with loading, packing, and heavy lifting. You accept or decline crew invites on your own schedule."
          variant="highlight"
        />

        <View style={{ height: spacing[6] }} />

        <ActionCtaButton
          label={t("driver.helperRegister.continueCta")}
          onPress={handleContinue}
          variant="primary"
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
