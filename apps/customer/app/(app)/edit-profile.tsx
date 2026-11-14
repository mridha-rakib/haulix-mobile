import { colors, fontFamily, radius } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  AccountShieldIcon,
  EditNameIcon,
  EditPhoneShieldIcon,
  HeaderBackIcon,
  HeaderBellIcon,
} from "../../src/components/account/C10Icons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";
import {
  computeInitials,
  getC10DemoProfile,
  loadProfileEdits,
  saveProfileEdits,
} from "../../src/fixtures/c10DemoProfile";

/**
 * C10-E — Edit Profile / Editing (English Default)
 *
 * Source:
 *   - Figma node: 333:116 ("C10-E · Edit Profile / Editing [CU-04, CU-02]")
 *   - Frame: 430 × 1003 px
 *
 * Owner Policy:
 * 1. Unguarded frontend preview: Accessible in debug and release APK without auth blockers.
 * 2. Uses strictly local mock fixture with Sarah Mitchell profile data.
 * 3. Never writes demo identity to remote backend or claims server verified state.
 * 4. Local name/email save: Updates local English demo preview state.
 * 5. Phone changes: Require verification before use; SMS verification is not connected
 *    in this frontend demo, so phone change remains pending and is not saved to verified state.
 * 6. Cancel Editing: Discards unsaved edits and returns to C10 Account Overview.
 */
interface FormErrors {
  nameError: string | null;
  emailError: string | null;
  phoneError: string | null;
}

function validateInputs(
  name: string,
  email: string,
  phone: string,
  currentLocale: "en" | "es",
  t: (key: string) => string
): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {
    nameError: null,
    emailError: null,
    phoneError: null,
  };
  let isValid = true;

  const trimmedName = name.trim();
  if (!trimmedName) {
    errors.nameError = t("editProfile.errorNameRequired");
    isValid = false;
  } else if (trimmedName.length < 2) {
    errors.nameError =
      currentLocale === "es"
        ? "El nombre completo debe tener al menos 2 caracteres."
        : "Full name must be at least 2 characters.";
    isValid = false;
  }

  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    errors.emailError = t("editProfile.errorEmailInvalid");
    isValid = false;
  }

  const cleanedDigits = phone.replace(/\D/g, "");
  if (cleanedDigits.length < 10) {
    errors.phoneError = t("editProfile.errorPhoneInvalid");
    isValid = false;
  }

  return { isValid, errors };
}

function computeSaveAction(
  name: string,
  email: string,
  initialName: string,
  initialEmail: string,
  isPhoneChanged: boolean,
  t: (k: string) => string
): { canSave: boolean; notice: string | null } {
  if (isPhoneChanged) {
    return {
      canSave: false,
      notice: t("editProfile.phonePendingVerificationNotice"),
    };
  }
  const hasChanges = name.trim() !== initialName.trim() || email.trim() !== initialEmail.trim();
  if (!hasChanges) {
    return {
      canSave: false,
      notice: t("editProfile.noChangesNotice"),
    };
  }
  return {
    canSave: true,
    notice: t("editProfile.savedLocallyNotice"),
  };
}

interface NoticeBannerProps {
  message: string | null;
  isSuccess: boolean;
  isPhoneChanged: boolean;
  onRestorePhone: () => void;
  restoreLabel: string;
}

const NoticeBanner: React.FC<NoticeBannerProps> = ({
  message,
  isSuccess,
  isPhoneChanged,
  onRestorePhone,
  restoreLabel,
}) => {
  if (!message) return null;
  return (
    <View
      style={[
        styles.noticeBanner,
        isSuccess ? styles.noticeBannerSuccess : styles.noticeBannerWarning,
      ]}
      testID="c10e-notice-banner"
    >
      <Text
        style={[styles.noticeText, isSuccess ? styles.noticeTextSuccess : styles.noticeTextWarning]}
      >
        {message}
      </Text>
      {isPhoneChanged && !isSuccess && (
        <Pressable
          style={styles.restoreButton}
          onPress={onRestorePhone}
          testID="c10e-phone-restore-btn"
        >
          <Text style={styles.restoreButtonText}>{restoreLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

const CustomerChip: React.FC<{
  name: string;
  isEs: boolean;
  fallback: string;
}> = ({ name, isEs, fallback }) => {
  const label = name.trim()
    ? `${name.trim().toUpperCase()}  ·  ${isEs ? "CUENTA DE CLIENTE" : "CUSTOMER ACCOUNT"}`
    : fallback;
  return (
    <View style={styles.statusChipContainer}>
      <AccountShieldIcon size={18} color={colors.brand} />
      <Text style={styles.statusChipText}>{label}</Text>
    </View>
  );
};

export default function EditProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const currentLocale = (getCurrentLocale() as "en" | "es") || "en";
  const baseProfile = getC10DemoProfile(currentLocale);

  const initialName = baseProfile.name;
  const initialEmail = baseProfile.email;
  const initialPhone = baseProfile.phone;

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [isSuccessNotice, setIsSuccessNotice] = useState(false);

  useEffect(() => {
    loadProfileEdits(currentLocale).then(() => {
      const updated = getC10DemoProfile(currentLocale);
      setName(updated.name);
      setEmail(updated.email);
      setPhone(updated.phone);
    });
  }, [currentLocale]);

  const isPhoneChanged = phone.trim() !== initialPhone.trim();

  const validateForm = (): boolean => {
    const { isValid, errors } = validateInputs(
      name,
      email,
      phone,
      currentLocale,
      t as (k: string) => string
    );
    setNameError(errors.nameError);
    setEmailError(errors.emailError);
    setPhoneError(errors.phoneError);
    return isValid;
  };

  const handleSave = async () => {
    setNoticeMessage(null);
    setIsSuccessNotice(false);

    if (!validateForm()) {
      return;
    }

    const action = computeSaveAction(
      name,
      email,
      initialName,
      initialEmail,
      isPhoneChanged,
      t as (k: string) => string
    );
    if (!action.canSave) {
      setNoticeMessage(action.notice);
      setIsSuccessNotice(false);
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const initials = computeInitials(trimmedName);

    await saveProfileEdits(currentLocale, {
      name: trimmedName,
      email: trimmedEmail,
      initials,
    });

    setIsSuccessNotice(true);
    setNoticeMessage(action.notice);

    setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(app)/account");
      }
    }, 400);
  };

  const handleCancel = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(app)/account");
    }
  };

  const handleRestorePhone = () => {
    setPhone(initialPhone);
    setPhoneError(null);
    setNoticeMessage(null);
  };

  return (
    <HaulixSafeArea edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.rootContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          testID="c10e-edit-profile-screen"
        >
          {/* 1. Header (Figma node 333:120) */}
          <View style={styles.headerRow}>
            {/* Back Button Circle */}
            <Pressable
              style={styles.headerCircleButton}
              onPress={handleCancel}
              accessibilityRole="button"
              accessibilityLabel={t("common.back")}
              hitSlop={8}
              testID="c10e-header-back"
            >
              <HeaderBackIcon size={21} />
            </Pressable>

            {/* Wordmark Center */}
            <View style={styles.wordmarkContainer}>
              <Text style={styles.wordmarkHaul}>HAUL</Text>
              <Text style={styles.wordmarkIx}>IX</Text>
            </View>

            {/* Notification Bell Circle with Unread Dot */}
            <Pressable
              style={styles.headerCircleButton}
              onPress={() => setNoticeMessage(t("account.notificationNoticeMessage"))}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              hitSlop={8}
              testID="c10e-header-bell"
            >
              <HeaderBellIcon size={22} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>

          {/* Interactive Notice Banner */}
          <NoticeBanner
            message={noticeMessage}
            isSuccess={isSuccessNotice}
            isPhoneChanged={isPhoneChanged}
            onRestorePhone={handleRestorePhone}
            restoreLabel={t("editProfile.restoreOriginalPhone")}
          />

          {/* 2. Intro Heading & Description (Figma node 333:126) */}
          <View style={styles.introContainer}>
            <Text style={styles.screenTitle}>{t("editProfile.screenTitle")}</Text>
            <Text style={styles.screenDescription}>{t("editProfile.screenDescription")}</Text>
          </View>

          {/* 3. Customer Demo-Status Chip (Figma node 333:129) */}
          <CustomerChip
            name={name}
            isEs={currentLocale === "es"}
            fallback={t("editProfile.customerAccountBadge")}
          />

          {/* 4. Profile Information Card (Figma node 333:133) */}
          <View style={styles.card} testID="c10e-profile-card">
            <Text style={styles.cardHeaderTitle}>{t("editProfile.cardTitle")}</Text>

            {/* Field 1: FULL NAME (Figma node 333:137) */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t("editProfile.labelFullName")}</Text>
              <View style={[styles.inputBox, nameError ? styles.inputBoxError : null]}>
                <EditNameIcon size={21} color={colors.brand} />
                <TextInput
                  style={styles.inputWithIcon}
                  value={name}
                  onChangeText={(val) => {
                    setName(val);
                    if (nameError) setNameError(null);
                  }}
                  placeholder={t("editProfile.defaultFullName")}
                  placeholderTextColor="#506057"
                  autoCapitalize="words"
                  autoCorrect={false}
                  accessibilityLabel={t("editProfile.labelFullName")}
                  testID="c10e-input-name"
                />
              </View>
              {nameError && (
                <Text style={styles.errorText} testID="c10e-error-name">
                  {nameError}
                </Text>
              )}
            </View>

            {/* Field 2: EMAIL (Figma node 333:140) */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t("editProfile.labelEmail")}</Text>
              <View style={[styles.inputBox, emailError ? styles.inputBoxError : null]}>
                <TextInput
                  style={styles.inputDirect}
                  value={email}
                  onChangeText={(val) => {
                    setEmail(val);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder={t("editProfile.defaultEmail")}
                  placeholderTextColor="#506057"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  accessibilityLabel={t("editProfile.labelEmail")}
                  testID="c10e-input-email"
                />
              </View>
              {emailError && (
                <Text style={styles.errorText} testID="c10e-error-email">
                  {emailError}
                </Text>
              )}
            </View>

            {/* Field 3: PHONE (Figma node 333:146) */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t("editProfile.labelPhone")}</Text>
              <View style={[styles.inputBox, phoneError ? styles.inputBoxError : null]}>
                <EditPhoneShieldIcon size={21} color={colors.brand} />
                <TextInput
                  style={styles.inputWithIcon}
                  value={phone}
                  onChangeText={(val) => {
                    setPhone(val);
                    if (phoneError) setPhoneError(null);
                  }}
                  placeholder={t("editProfile.defaultPhone")}
                  placeholderTextColor="#506057"
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  accessibilityLabel={t("editProfile.labelPhone")}
                  testID="c10e-input-phone"
                />
              </View>
              {phoneError && (
                <Text style={styles.errorText} testID="c10e-error-phone">
                  {phoneError}
                </Text>
              )}
            </View>

            {/* Phone Guidance (Figma node 333:149) */}
            <Text style={styles.phoneGuidance}>{t("editProfile.phoneGuidance")}</Text>
          </View>

          {/* 5. Primary Action Button: Save Changes (Figma node 333:150) */}
          <View style={styles.actionsContainer}>
            <Pressable
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel={t("editProfile.saveChanges")}
              testID="c10e-save-btn"
            >
              {({ pressed }) => (
                <View style={[styles.primaryButton, pressed && styles.primaryButtonPressed]}>
                  <Text style={styles.primaryButtonText}>{t("editProfile.saveChanges")}</Text>
                </View>
              )}
            </Pressable>

            {/* 6. Secondary Action Button: Cancel Editing (Figma node 333:153) */}
            <Pressable
              onPress={handleCancel}
              accessibilityRole="button"
              accessibilityLabel={t("editProfile.cancelEditing")}
              testID="c10e-cancel-btn"
            >
              {({ pressed }) => (
                <View style={[styles.secondaryButton, pressed && styles.secondaryButtonPressed]}>
                  <Text style={styles.secondaryButtonText}>{t("editProfile.cancelEditing")}</Text>
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>

        {/* 7. Shared Sculpted Bottom Navigation (Figma node 965:9598) */}
        <CustomerBottomNav activeTab="account" onShowNotice={(msg) => setNoticeMessage(msg)} />
      </KeyboardAvoidingView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 140,
  },

  // Header row
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 61,
  },
  headerCircleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  wordmarkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordmarkHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  wordmarkIx: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },

  // Notice banner
  noticeBanner: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  noticeBannerWarning: {
    backgroundColor: "#1C1A10",
    borderColor: "#57481A",
  },
  noticeBannerSuccess: {
    backgroundColor: "#101D15",
    borderColor: "#1F4A2C",
  },
  noticeText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  noticeTextWarning: {
    color: "#F6D268",
  },
  noticeTextSuccess: {
    color: colors.brand,
  },
  restoreButton: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#2B2615",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F6D268",
  },
  restoreButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: "#F6D268",
  },

  // Intro
  introContainer: {
    marginTop: 18,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.primaryText,
  },
  screenDescription: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.secondaryText,
    marginTop: 4,
  },

  // Customer status chip
  statusChipContainer: {
    marginTop: 18,
    height: 43,
    backgroundColor: "#101913",
    borderWidth: 1,
    borderColor: "#1F3826",
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.5,
  },

  // Card
  card: {
    marginTop: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 18,
    padding: 20,
  },
  cardHeaderTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
    marginBottom: 6,
  },

  // Fields
  fieldGroup: {
    marginTop: 14,
  },
  fieldLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputBox: {
    height: 54,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: "#2D3534",
    borderRadius: 11,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  inputBoxError: {
    borderColor: "#FF5C5C",
  },
  inputWithIcon: {
    flex: 1,
    marginLeft: 12,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
    paddingVertical: 0,
  },
  inputDirect: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
    paddingVertical: 0,
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#FF5C5C",
    marginTop: 4,
    marginLeft: 2,
  },
  phoneGuidance: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: "#6D7D73",
    marginTop: 14,
  },

  // Actions
  actionsContainer: {
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    height: 54,
    backgroundColor: colors.brand,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#080B0B",
  },
  secondaryButton: {
    height: 54,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: colors.brand,
  },
});
