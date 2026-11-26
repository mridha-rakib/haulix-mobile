import { spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
    const finalName = fullName.trim() || "Elena Ramos";
    const finalEmail = email.trim() || "elena.helper@haulix.com";
    const finalPhone = phone.trim() || "+1 (602) 555-0142";

    setRole("HELPER");
    updateDraft({ fullName: finalName, email: finalEmail, phone: finalPhone, role: "HELPER" });
    router.push("/(auth)/helper-verify-phone");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlowHeader
        title={t("driver.helperRegister.title")}
        subtitle={t("driver.helperRegister.subtitle")}
        onBack={() => router.back()}
      />

      <View style={styles.stepperContainer}>
        <View style={styles.stepperBarsRow}>
          <View style={[styles.stepperBar, styles.stepperBarActive]} />
          <View style={[styles.stepperBar, styles.stepperBarActive]} />
          <View style={styles.stepperBar} />
        </View>
        <View style={styles.stepperLabelsRow}>
          <Text style={styles.stepperRoleText}>HELPER ACCOUNT</Text>
          <Text style={styles.stepperStepText}>STEP 02 / 03</Text>
        </View>
      </View>

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
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
});
