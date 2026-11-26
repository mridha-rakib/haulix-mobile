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

export default function DriverRegisterScreen() {
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
    if (!fullName.trim()) newErrors.fullName = t("driver.driverRegister.errorName");
    if (!email.trim() || !email.includes("@"))
      newErrors.email = t("driver.driverRegister.errorEmail");
    if (!phone.trim()) newErrors.phone = t("driver.driverRegister.errorPhone");
    if (!password || password.length < 8)
      newErrors.password = t("driver.driverRegister.errorPassword");
    if (!termsAccepted) newErrors.terms = t("driver.driverRegister.errorTerms");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setRole("PRIMARY_DRIVER");
    updateDraft({ fullName, email, phone, role: "PRIMARY_DRIVER" });
    router.push("/(auth)/verify-phone");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.driverRegister.title")}
        subtitle={t("driver.driverRegister.subtitle")}
        step="02 / 03"
        onBack={() => router.back()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HaulixFormField
          label={t("driver.driverRegister.fullNameLabel")}
          value={fullName}
          onChangeText={(v) => {
            setFullName(v);
            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
          }}
          placeholder={t("driver.driverRegister.fullNamePlaceholder")}
          error={errors.fullName}
        />

        <HaulixFormField
          label={t("driver.driverRegister.emailLabel")}
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          placeholder={t("driver.driverRegister.emailPlaceholder")}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <HaulixFormField
          label={t("driver.driverRegister.phoneLabel")}
          value={phone}
          onChangeText={(v) => {
            setPhone(v);
            if (errors.phone) setErrors({ ...errors, phone: undefined });
          }}
          placeholder={t("driver.driverRegister.phonePlaceholder")}
          keyboardType="phone-pad"
          error={errors.phone}
        />

        <HaulixFormField
          label={t("driver.driverRegister.passwordLabel")}
          value={password}
          onChangeText={(v) => {
            setPassword(v);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          placeholder={t("driver.driverRegister.passwordPlaceholder")}
          isPassword
          error={errors.password}
        />

        <TermsConsentCheckbox
          checked={termsAccepted}
          onChange={(checked) => {
            setTermsAccepted(checked);
            if (errors.terms) setErrors({ ...errors, terms: undefined });
          }}
          title={t("driver.driverRegister.termsTitle")}
          subtitle={t("driver.driverRegister.termsSubtitle")}
          error={errors.terms}
        />

        <View style={{ height: spacing[4] }} />

        <InfoCard
          title="Vehicle & Commercial Requirements"
          body="Valid driver's license, vehicle registration, and commercial insurance will be verified during vehicle intake."
          variant="highlight"
        />

        <View style={{ height: spacing[6] }} />

        <ActionCtaButton
          label={t("driver.driverRegister.continueCta")}
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
