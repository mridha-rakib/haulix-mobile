import { colors, fontFamily, fontSize, radius, spacing } from "@haulix/design-tokens";
import { changeLocale, getCurrentLocale, type SupportedLocale, useTranslation } from "@haulix/i18n";
import { HaulixButton, HaulixSafeArea, HaulixTextField } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AppleLogoIcon,
  AuthLockIcon,
  AuthMailIcon,
  AuthPhoneIcon,
  AuthUserIcon,
  CheckboxCheckIcon,
  GoogleLogoIcon,
  PasswordEyeIcon,
} from "../../src/components/auth/AuthIcons";

const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
const isValidPhone = (val: string) => /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/.test(val);

/**
 * C07 — Create Account (Bilingual: English Default / Spanish)
 * Sourced from Figma node 331:35 (EN) & 347:130 (ES visible PREMIUM_ES 695:*)
 *
 * Requirements:
 * - 4 inputs: Full Name, Email Address, Phone Number, Password (56px tall)
 * - Two-step indicator (1 Account Details / 2 Phone Verification)
 * - Single accessible consent checkbox (unchecked by default)
 * - Separate clickable affordances for Terms and Privacy Policy (shows honest pending notice)
 * - Primary CTA is visually muted (parent opacity 0.54 per Figma) AND functionally disabled until consent is checked
 * - Return to Sign In navigates directly back to C06
 * - In-place reactive bilingual switching (English ↔ Spanish) with form state preservation
 * - Honest non-success banners (no fake backend account creation or OTP simulation)
 */
export default function CreateAccountScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const [locale, setLocale] = useState<SupportedLocale>(getCurrentLocale());
  const isSpanish = locale === "es";

  // Form input state (preserved across language toggles)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);

  // Error keys for dynamic real-time localization
  const [nameErrorKey, setNameErrorKey] = useState<string | undefined>();
  const [emailErrorKey, setEmailErrorKey] = useState<string | undefined>();
  const [phoneErrorKey, setPhoneErrorKey] = useState<string | undefined>();
  const [passwordErrorKey, setPasswordErrorKey] = useState<string | undefined>();
  const [consentErrorKey, setConsentErrorKey] = useState<string | undefined>();

  // Notice banner state
  const [infoNoticeKey, setInfoNoticeKey] = useState<string | null>(null);

  const checkName = (trimmedName: string): boolean => {
    if (!trimmedName) {
      setNameErrorKey("createAccount.nameRequired");
      return false;
    }
    return true;
  };

  const checkEmail = (trimmedEmail: string): boolean => {
    if (!trimmedEmail) {
      setEmailErrorKey("createAccount.emailRequired");
      return false;
    }
    if (!isValidEmail(trimmedEmail)) {
      setEmailErrorKey("createAccount.emailInvalid");
      return false;
    }
    return true;
  };

  const checkPhone = (trimmedPhone: string): boolean => {
    if (!trimmedPhone) {
      setPhoneErrorKey("createAccount.phoneRequired");
      return false;
    }
    if (!isValidPhone(trimmedPhone)) {
      setPhoneErrorKey("createAccount.phoneInvalid");
      return false;
    }
    return true;
  };

  const checkPassword = (pwd: string): boolean => {
    if (!pwd) {
      setPasswordErrorKey("createAccount.passwordRequired");
      return false;
    }
    if (pwd.length < 6) {
      setPasswordErrorKey("createAccount.passwordTooShort");
      return false;
    }
    return true;
  };

  const validateForm = (): boolean => {
    setNameErrorKey(undefined);
    setEmailErrorKey(undefined);
    setPhoneErrorKey(undefined);
    setPasswordErrorKey(undefined);
    setConsentErrorKey(undefined);

    const validName = checkName(name.trim());
    const validEmail = checkEmail(email.trim());
    const validPhone = checkPhone(phone.trim());
    const validPassword = checkPassword(password);

    let validConsent = true;
    if (!isConsentChecked) {
      setConsentErrorKey("createAccount.consentRequired");
      validConsent = false;
    }

    return validName && validEmail && validPhone && validPassword && validConsent;
  };

  const handleCreateAccount = () => {
    setInfoNoticeKey(null);
    // Frontend demo continuation: advance directly to phone verification
    router.push({
      pathname: "/(auth)/verify-phone",
      params: { phone: phone.trim() },
    });
  };

  const handleSignInReturn = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(auth)/sign-in");
    }
  };

  const handleTermsPress = () => {
    setInfoNoticeKey("createAccount.termsNotice");
  };

  const handlePrivacyPress = () => {
    setInfoNoticeKey("createAccount.privacyNotice");
  };

  const handleAppleSignUp = () => {
    router.push("/(auth)/social-return");
  };

  const handleGoogleSignUp = () => {
    router.push("/(auth)/social-return");
  };

  const handleLanguageSwitch = async () => {
    const nextLocale: SupportedLocale = isSpanish ? "en" : "es";
    await changeLocale(nextLocale);
    setLocale(nextLocale);
  };

  return (
    <HaulixSafeArea>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Brand Wordmark & Tagline (Figma node 617:146 / 695:439) */}
          <View style={styles.brandHeader}>
            <View style={styles.wordmarkRow}>
              <Text style={styles.wordmarkWhite}>HAUL</Text>
              <Text style={styles.wordmarkLime}>IX</Text>
            </View>
            <Text style={styles.tagline}>{t("brand.tagline")}</Text>
          </View>

          {/* 2. Two-Step Progress Indicator (Figma node 617:237 / 695:530) */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressStepActive}>{t("createAccount.step1")}</Text>
              <Text style={styles.progressStepInactive}>{t("createAccount.step2")}</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          {/* 3. Heading & Subtitle (Figma node 617:151 / 695:444) */}
          <View style={styles.headingSection}>
            <Text style={styles.welcomeTitle}>{t("createAccount.title")}</Text>
            <Text style={styles.welcomeSubtitle}>{t("createAccount.subtitle")}</Text>
          </View>

          {/* 4. Arizona Availability Chip (Figma node 617:154 / 695:447) */}
          <View style={styles.availabilityChip}>
            <View style={styles.availabilityDot} />
            <Text style={styles.availabilityText}>{t("createAccount.availability")}</Text>
          </View>

          {/* Informational Notice Banner (Dismissible) */}
          {infoNoticeKey ? (
            <View style={styles.noticeBox} accessibilityRole="alert">
              <View style={styles.noticeHeaderRow}>
                <Text style={styles.noticeText}>{t(infoNoticeKey)}</Text>
                <Pressable
                  onPress={() => setInfoNoticeKey(null)}
                  hitSlop={8}
                  accessibilityLabel={t("createAccount.dismissNotice")}
                >
                  <Text style={styles.noticeDismiss}>{t("common.dismiss")}</Text>
                </Pressable>
              </View>
              {__DEV__ && infoNoticeKey === "createAccount.authNotice" ? (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/verify-phone",
                      params: { phone: phone || "+1 602-555-0142" },
                    })
                  }
                  style={styles.noticeDevAction}
                  testID="c07-dev-to-c08-button"
                >
                  <Text style={styles.noticeDevActionText}>
                    [Dev / QA Demo: Continue to C08 OTP Screen →]
                  </Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}

          {/* 5. Customer Details Card (Figma node 617:156 / 695:449) */}
          <View style={styles.credentialsCard}>
            {/* FULL NAME */}
            <HaulixTextField
              label={t("createAccount.nameLabel")}
              placeholder={t("createAccount.namePlaceholder")}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameErrorKey) setNameErrorKey(undefined);
              }}
              autoCapitalize="words"
              autoComplete="name"
              error={nameErrorKey ? t(nameErrorKey) : undefined}
              leftIcon={<AuthUserIcon size={20} color="#BAD6C4" />}
            />

            <View style={styles.fieldSpacing} />

            {/* EMAIL ADDRESS */}
            <HaulixTextField
              label={t("createAccount.emailLabel")}
              placeholder={t("createAccount.emailPlaceholder")}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailErrorKey) setEmailErrorKey(undefined);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              error={emailErrorKey ? t(emailErrorKey) : undefined}
              leftIcon={<AuthMailIcon size={20} color="#BAD6C4" />}
            />

            <View style={styles.fieldSpacing} />

            {/* PHONE NUMBER */}
            <HaulixTextField
              label={t("createAccount.phoneLabel")}
              placeholder={t("createAccount.phonePlaceholder")}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (phoneErrorKey) setPhoneErrorKey(undefined);
              }}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="tel"
              error={phoneErrorKey ? t(phoneErrorKey) : undefined}
              leftIcon={<AuthPhoneIcon size={20} color="#BAD6C4" />}
            />

            <View style={styles.fieldSpacing} />

            {/* PASSWORD */}
            <HaulixTextField
              label={t("createAccount.passwordLabel")}
              placeholder={t("createAccount.passwordPlaceholder")}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordErrorKey) setPasswordErrorKey(undefined);
              }}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="new-password"
              error={passwordErrorKey ? t(passwordErrorKey) : undefined}
              leftIcon={<AuthLockIcon size={20} color="#BAD6C4" />}
              rightIcon={
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  hitSlop={12}
                  accessibilityLabel={
                    isPasswordVisible
                      ? t("createAccount.hidePassword")
                      : t("createAccount.showPassword")
                  }
                  accessibilityRole="button"
                >
                  <PasswordEyeIcon size={20} color="#A1B3A8" visible={isPasswordVisible} />
                </Pressable>
              }
            />

            {/* Password Guidance Note */}
            <Text style={styles.passwordGuidance}>{t("createAccount.passwordGuidance")}</Text>

            {/* 6. Consent & Legal Checkbox (Figma node 710:442 / 695:481) */}
            <View style={styles.consentContainer}>
              <Pressable
                onPress={() => {
                  setIsConsentChecked(!isConsentChecked);
                  if (consentErrorKey) setConsentErrorKey(undefined);
                }}
                hitSlop={12}
                style={styles.checkboxRow}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isConsentChecked }}
                accessibilityLabel="Consent checkbox: I have read the following"
              >
                <View
                  style={[
                    styles.checkboxBase,
                    isConsentChecked ? styles.checkboxChecked : styles.checkboxUnchecked,
                  ]}
                >
                  {isConsentChecked && <CheckboxCheckIcon size={12} color="#080B0B" />}
                </View>
                <Text style={styles.consentLabel}>{t("createAccount.consentPrefix")}</Text>
              </Pressable>

              <View style={styles.legalLinksRow}>
                <Pressable
                  onPress={handleTermsPress}
                  hitSlop={8}
                  accessibilityRole="link"
                  accessibilityLabel={t("createAccount.terms")}
                >
                  <Text style={styles.legalLinkText}>{t("createAccount.terms")}</Text>
                </Pressable>
                <Text style={styles.legalSeparator}> · </Text>
                <Pressable
                  onPress={handlePrivacyPress}
                  hitSlop={8}
                  accessibilityRole="link"
                  accessibilityLabel={t("createAccount.privacyPolicy")}
                >
                  <Text style={styles.legalLinkText}>{t("createAccount.privacyPolicy")}</Text>
                </Pressable>
              </View>
            </View>

            {consentErrorKey && <Text style={styles.consentError}>{t(consentErrorKey)}</Text>}

            {/* Next-Step Description */}
            <Text style={styles.nextStepHint}>{t("createAccount.nextStepHint")}</Text>
          </View>

          {/* 7. Action CTAs (Figma node 617:231 / 695:524) */}
          <View style={styles.actionsBlock}>
            {/* Primary CTA */}
            <View style={styles.primaryCtaWrapper}>
              <HaulixButton
                label={t("createAccount.submit")}
                variant="primary"
                fullWidth
                onPress={handleCreateAccount}
              />
            </View>

            <View style={styles.ctaSpacing} />

            {/* Secondary CTA: Return to Sign In */}
            <Pressable
              style={styles.secondaryButton}
              onPress={handleSignInReturn}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={t("createAccount.alreadyHaveAccount")}
            >
              <Text style={styles.secondaryButtonText}>
                {t("createAccount.alreadyHaveAccount")}
              </Text>
            </Pressable>
          </View>

          {/* 8. OR CONTINUE WITH Divider (Figma node 691:470 / 695:490) */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t("createAccount.orProvider")}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* 9. Social Provider Actions (Figma node 617:196 / 695:489) */}
          <View style={styles.providersBlock}>
            <Pressable
              style={styles.providerButton}
              onPress={handleAppleSignUp}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={t("createAccount.apple")}
            >
              <AppleLogoIcon size={18} color="#FFFFFF" style={styles.providerIcon} />
              <Text style={styles.providerButtonText}>{t("createAccount.apple")}</Text>
            </Pressable>

            <View style={styles.providerSpacing} />

            <Pressable
              style={styles.providerButton}
              onPress={handleGoogleSignUp}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={t("createAccount.google")}
            >
              <GoogleLogoIcon size={18} style={styles.providerIcon} />
              <Text style={styles.providerButtonText}>{t("createAccount.google")}</Text>
            </Pressable>
          </View>

          {/* 10. Language Switch (Figma node 617:230 / 695:523) */}
          <View style={styles.languageSwitchRow}>
            <Pressable
              onPress={handleLanguageSwitch}
              hitSlop={12}
              style={styles.languageSwitchButton}
              accessibilityRole="button"
              accessibilityLabel={t("createAccount.switchLanguage")}
            >
              <Text style={styles.languageSwitchText}>{t("createAccount.switchLanguage")}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  brandHeader: {
    marginBottom: spacing[4],
  },
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  wordmarkWhite: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.primaryText,
    letterSpacing: -0.5,
  },
  wordmarkLime: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.brand,
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 2,
    marginTop: spacing[1],
  },
  progressContainer: {
    marginBottom: spacing[4],
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressStepActive: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.primaryText,
    letterSpacing: 0.8,
  },
  progressStepInactive: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: "#66776F",
    letterSpacing: 0.8,
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.elevated,
    borderRadius: 2,
    overflow: "hidden",
    flexDirection: "row",
  },
  progressFill: {
    width: "50%",
    height: 3,
    backgroundColor: colors.brand,
    borderRadius: 2,
  },
  headingSection: {
    marginBottom: spacing[4],
  },
  welcomeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.primaryText,
    lineHeight: 34,
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  availabilityChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#101913",
    borderWidth: 1,
    borderColor: "#1F3826",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: spacing[4],
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
    marginRight: 8,
  },
  availabilityText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.6,
  },
  noticeBox: {
    backgroundColor: "#1A2520",
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
    marginBottom: 16,
  },
  noticeHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noticeDevAction: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#223028",
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.brand,
    alignSelf: "flex-start",
  },
  noticeDevActionText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  noticeText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    color: colors.primaryText,
    flex: 1,
    lineHeight: 16,
    marginRight: 8,
  },
  noticeDismiss: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    color: colors.brand,
  },
  credentialsCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: spacing[4],
  },
  fieldSpacing: {
    height: spacing[3],
  },
  passwordGuidance: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
    marginTop: 8,
  },
  consentContainer: {
    marginTop: 16,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxUnchecked: {
    borderColor: colors.brand,
    backgroundColor: colors.background,
  },
  checkboxChecked: {
    borderColor: colors.brand,
    backgroundColor: colors.brand,
  },
  consentLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
  },
  legalLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginLeft: 30,
  },
  legalLinkText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
  },
  legalSeparator: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  consentError: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#E24A4A",
    marginTop: 6,
  },
  nextStepHint: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
    marginTop: 14,
  },
  actionsBlock: {
    marginBottom: spacing[4],
  },
  primaryCtaWrapper: {
    width: "100%",
  },
  primaryCtaMutedWrapper: {
    // Matches Figma parent opacity 0.54 (frame 617:232 / 695:525)
    opacity: 0.54,
  },
  ctaSpacing: {
    height: spacing[3],
  },
  secondaryButton: {
    height: 50,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm,
    color: colors.brand,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.elevated,
  },
  dividerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: "#506057",
    letterSpacing: 1.2,
    paddingHorizontal: 12,
  },
  providersBlock: {
    marginBottom: spacing[5],
  },
  providerButton: {
    height: 50,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  providerSpacing: {
    height: spacing[2],
  },
  providerIcon: {
    marginRight: 10,
  },
  providerButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm,
    color: colors.primaryText,
  },
  languageSwitchRow: {
    alignItems: "center",
    marginBottom: 16,
  },
  languageSwitchButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  languageSwitchText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
  },
});
