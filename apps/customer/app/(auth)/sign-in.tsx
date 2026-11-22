import { colors, fontFamily, fontSize, radius, spacing } from "@haulix/design-tokens";
import { changeLocale, getCurrentLocale, type SupportedLocale, useTranslation } from "@haulix/i18n";
import { HaulixButton, HaulixSafeArea, HaulixTextField } from "@haulix/ui";
import { Link, useRouter } from "expo-router";
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
  GoogleLogoIcon,
  PasswordEyeIcon,
} from "../../src/components/auth/AuthIcons";

/**
 * C06 — Email Sign-in (Bilingual: English Default / Spanish)
 *
 * Source:
 *   - English: HAULIX Figma Q946h4YBGgyLsjnPtdyQNe, node 331:2
 *   - Spanish: HAULIX Figma Q946h4YBGgyLsjnPtdyQNe, node 347:86 (visible PREMIUM_ES)
 * Reference Artboard: 430 × 1180 px
 */
export default function SignInScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [locale, setLocale] = useState<SupportedLocale>(getCurrentLocale());
  const isSpanish = locale === "es";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailErrorKey, setEmailErrorKey] = useState<string | undefined>();
  const [passwordErrorKey, setPasswordErrorKey] = useState<string | undefined>();
  const [infoNoticeKey, setInfoNoticeKey] = useState<string | null>(null);

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailErrorKey(undefined);
    setPasswordErrorKey(undefined);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailErrorKey("signIn.emailRequired");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailErrorKey("signIn.emailInvalid");
      isValid = false;
    }

    if (!password) {
      setPasswordErrorKey("signIn.passwordRequired");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordErrorKey("signIn.passwordTooShort");
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = () => {
    setInfoNoticeKey(null);
    // Frontend demo continuation: navigate to Customer Home (/(app)) without fake credentials
    router.replace("/(app)");
  };

  const handleForgotPassword = () => {
    setInfoNoticeKey("signIn.forgotPasswordNotice");
  };

  const handlePhoneCode = () => {
    router.push("/(auth)/verify-phone");
  };

  const handleAppleSignIn = () => {
    setInfoNoticeKey("signIn.appleNotice");
  };

  const handleGoogleSignIn = () => {
    setInfoNoticeKey("signIn.googleNotice");
  };

  const handleLanguageSwitch = async () => {
    const nextLocale: SupportedLocale = isSpanish ? "en" : "es";
    await changeLocale(nextLocale);
    setLocale(nextLocale);
  };

  const handleCreateAccount = () => {
    router.push("/(auth)/create-account");
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
          {/* 1. Header: HAULIX Wordmark & Tagline (Figma node 641:259 / 691:445) */}
          <View style={styles.brandHeader}>
            <View style={styles.wordmarkRow}>
              <Text style={styles.wordmarkWhite}>HAUL</Text>
              <Text style={styles.wordmarkLime}>IX</Text>
            </View>
            <Text style={styles.tagline}>{t("brand.tagline")}</Text>
          </View>

          {/* 2. Welcome Heading & Intro Copy (Figma node 641:264 / 691:447-448) */}
          <View style={styles.headingSection}>
            <Text style={styles.welcomeTitle}>{t("signIn.title")}</Text>
            <Text style={styles.welcomeSubtitle}>{t("signIn.subtitle")}</Text>
          </View>

          {/* 3. Arizona Availability Chip (Figma node 641:267 / 691:450) */}
          <View style={styles.availabilityChip}>
            <View style={styles.availabilityDot} />
            <Text style={styles.availabilityText}>{t("signIn.availability")}</Text>
          </View>

          {/* Informational Notice Banner (Dismissible) */}
          {infoNoticeKey ? (
            <View style={styles.noticeBox} accessibilityRole="alert">
              <Text style={styles.noticeText}>{t(infoNoticeKey)}</Text>
              <Pressable
                onPress={() => setInfoNoticeKey(null)}
                hitSlop={8}
                accessibilityLabel={t("signIn.dismissNotice")}
              >
                <Text style={styles.noticeDismiss}>{t("common.dismiss")}</Text>
              </Pressable>
            </View>
          ) : null}

          {/* 4. Credentials Card (Figma node 641:269 / 691:451) */}
          <View style={styles.credentialsCard}>
            <HaulixTextField
              label={t("signIn.emailLabel")}
              placeholder={t("signIn.emailPlaceholder")}
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

            <HaulixTextField
              label={t("signIn.passwordLabel")}
              placeholder={t("signIn.passwordPlaceholder")}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordErrorKey) setPasswordErrorKey(undefined);
              }}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              error={passwordErrorKey ? t(passwordErrorKey) : undefined}
              leftIcon={<AuthLockIcon size={20} color="#BAD6C4" />}
              rightIcon={
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  hitSlop={12}
                  accessibilityLabel={
                    isPasswordVisible ? t("signIn.hidePassword") : t("signIn.showPassword")
                  }
                  accessibilityRole="button"
                >
                  <PasswordEyeIcon size={20} color="#A1B3A8" visible={isPasswordVisible} />
                </Pressable>
              }
            />

            <Text style={styles.credentialsHint}>{t("signIn.credentialsHint")}</Text>
          </View>

          {/* 5. Forgot Password Link (Figma node 641:320 / 691:503) */}
          <View style={styles.forgotPasswordContainer}>
            <Pressable
              onPress={handleForgotPassword}
              hitSlop={8}
              accessibilityRole="link"
              accessibilityLabel={t("signIn.forgotPassword")}
            >
              <Text style={styles.forgotPasswordText}>{t("signIn.forgotPassword")}</Text>
            </Pressable>
          </View>

          {/* 6. Sign In & Phone Code CTAs (Figma node 641:324 / 691:506) */}
          <View style={styles.actionsBlock}>
            <HaulixButton
              label={t("signIn.submit")}
              variant="primary"
              fullWidth
              onPress={handleSignIn}
            />

            <View style={styles.ctaSpacing} />

            <Pressable
              style={styles.secondaryButton}
              onPress={handlePhoneCode}
              accessibilityRole="button"
              accessibilityLabel={t("signIn.phoneCode")}
            >
              <Text style={styles.secondaryButtonText}>{t("signIn.phoneCode")}</Text>
            </Pressable>
          </View>

          {/* 7. OR CONTINUE WITH Divider (Figma node 691:470) */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t("signIn.orProvider")}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* 8. Social Provider Actions (Figma node 641:287 / 691:469) */}
          <View style={styles.providersBlock}>
            <Pressable
              style={styles.providerButton}
              onPress={handleAppleSignIn}
              accessibilityRole="button"
              accessibilityLabel={t("signIn.apple")}
            >
              <View style={styles.providerIconWrapper}>
                <AppleLogoIcon size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.providerButtonText}>{t("signIn.apple")}</Text>
            </Pressable>

            <View style={styles.providerSpacing} />

            <Pressable
              style={styles.providerButton}
              onPress={handleGoogleSignIn}
              accessibilityRole="button"
              accessibilityLabel={t("signIn.google")}
            >
              <View style={styles.providerIconWrapper}>
                <GoogleLogoIcon size={20} />
              </View>
              <Text style={styles.providerButtonText}>{t("signIn.google")}</Text>
            </Pressable>
          </View>

          {/* 9. Language Switch (Figma node 641:323 / 691:505) */}
          <View style={styles.languageSwitchContainer}>
            <Pressable
              onPress={handleLanguageSwitch}
              hitSlop={12}
              style={styles.languageSwitchButton}
              accessibilityRole="button"
              accessibilityLabel={t("signIn.switchLanguage")}
            >
              <Text style={styles.languageSwitchText}>{t("signIn.switchLanguage")}</Text>
            </Pressable>
          </View>

          {/* 10. Create Account Footer (Figma node 641:329 / 691:511) */}
          <View style={styles.footerContainer}>
            <Pressable
              onPress={handleCreateAccount}
              hitSlop={8}
              accessibilityRole="link"
              accessibilityLabel={t("signIn.createAccountFull")}
              style={styles.footerRow}
            >
              <Text style={styles.footerMuted}>{t("signIn.createAccountPrompt")}</Text>
              <Text style={styles.footerHighlight}>{t("signIn.createAccountAction")}</Text>
            </Pressable>
          </View>

          {/* Dev Shortcut (Testing/Preview) */}
          {__DEV__ && (
            <View style={styles.devContainer}>
              <Link href="/styling-preview" asChild>
                <Pressable hitSlop={6}>
                  <Text style={styles.devLinkText}>{t("signIn.devStylingPreview")}</Text>
                </Pressable>
              </Link>
            </View>
          )}
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

  // 1. Brand Wordmark & Tagline
  brandHeader: {
    marginBottom: spacing[6],
  },
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  wordmarkWhite: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    color: colors.primaryText,
    letterSpacing: -1,
  },
  wordmarkLime: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    color: colors.brand,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 2,
    marginTop: spacing[1],
  },

  // 2. Heading
  headingSection: {
    marginBottom: spacing[5],
  },
  welcomeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.primaryText,
    marginBottom: spacing[1],
  },
  welcomeSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.secondaryText,
  },

  // 3. Arizona Availability Chip
  availabilityChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#1A2510",
    borderWidth: 1,
    borderColor: "#2B3B1A",
    borderRadius: radius.full,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: spacing[6],
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.brand,
    marginRight: 8,
  },
  availabilityText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.brand,
  },

  // Notice Banner
  noticeBox: {
    backgroundColor: "#1C2422",
    borderWidth: 1,
    borderColor: colors.brand,
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  noticeText: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    lineHeight: 18,
    color: colors.primaryText,
    marginBottom: spacing[2],
  },
  noticeDismiss: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs,
    color: colors.brand,
    alignSelf: "flex-end",
  },

  // 4. Credentials Card
  credentialsCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: radius["2xl"],
    padding: 18,
    marginBottom: spacing[3],
  },
  fieldSpacing: {
    height: spacing[3],
  },
  credentialsHint: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#73817A",
    marginTop: spacing[2],
  },

  // 5. Forgot Password
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: spacing[6],
  },
  forgotPasswordText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.brand,
  },

  // 6. Action Buttons
  actionsBlock: {
    marginBottom: spacing[6],
  },
  ctaSpacing: {
    height: spacing[3],
  },
  secondaryButton: {
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#2C3432",
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.primaryText,
  },

  // 7. Divider
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[6],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.elevated,
  },
  dividerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.secondaryText,
    marginHorizontal: spacing[3],
  },

  // 8. Social Providers
  providersBlock: {
    marginBottom: spacing[8],
  },
  providerButton: {
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#2C3432",
    borderRadius: radius.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  providerIconWrapper: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 24,
  },
  providerButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: "#FFFFFF",
  },
  providerSpacing: {
    height: spacing[3],
  },

  // 9. Spanish Language Switch
  languageSwitchContainer: {
    alignItems: "center",
    marginBottom: spacing[5],
  },
  languageSwitchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: radius.full,
  },
  languageSwitchText: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.secondaryText,
  },

  // 10. Create Account Footer
  footerContainer: {
    alignItems: "center",
    marginBottom: spacing[4],
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerMuted: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
  },
  footerHighlight: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.brand,
  },

  // Dev link
  devContainer: {
    alignItems: "center",
    marginTop: spacing[2],
  },
  devLinkText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#54635D",
  },
});
