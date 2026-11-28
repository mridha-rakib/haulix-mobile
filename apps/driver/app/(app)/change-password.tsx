import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  CheckmarkIcon,
  EyeIcon,
  EyeOffIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hasLength = newPassword.length >= 8;
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/language-security" as Href);
    }
  };

  const handleUpdate = () => {
    setErrorMessage(null);
    if (!currentPassword) {
      setErrorMessage("Please enter your current password.");
      return;
    }
    if (!hasLength || !hasNumber || !hasSpecial) {
      setErrorMessage("New password does not meet complexity requirements.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      handleBack();
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t("driver.changePassword.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.changePassword.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {success ? (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerText}>{t("driver.changePassword.successNotice")}</Text>
          </View>
        ) : null}

        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Inputs Card */}
        <View style={styles.card}>
          {/* Current Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.changePassword.currentPasswordLabel")}</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                secureTextEntry={!showCurrent}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="••••••••"
                placeholderTextColor="#5C6E66"
              />
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setShowCurrent(!showCurrent)}
                accessibilityRole="button"
                accessibilityLabel="Toggle current password visibility"
              >
                {showCurrent ? (
                  <EyeOffIcon color="#8E9E99" size={20} />
                ) : (
                  <EyeIcon color="#8E9E99" size={20} />
                )}
              </Pressable>
            </View>
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.changePassword.newPasswordLabel")}</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="••••••••"
                placeholderTextColor="#5C6E66"
              />
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setShowNew(!showNew)}
                accessibilityRole="button"
                accessibilityLabel="Toggle new password visibility"
              >
                {showNew ? (
                  <EyeOffIcon color="#8E9E99" size={20} />
                ) : (
                  <EyeIcon color="#8E9E99" size={20} />
                )}
              </Pressable>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.changePassword.confirmPasswordLabel")}</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                placeholderTextColor="#5C6E66"
              />
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setShowConfirm(!showConfirm)}
                accessibilityRole="button"
                accessibilityLabel="Toggle confirm password visibility"
              >
                {showConfirm ? (
                  <EyeOffIcon color="#8E9E99" size={20} />
                ) : (
                  <EyeIcon color="#8E9E99" size={20} />
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {/* Requirements Checklist */}
        <View style={styles.requirementsBox}>
          <Text style={styles.reqHeader}>Password Requirements:</Text>

          <View style={styles.reqRow}>
            <View style={[styles.reqDot, hasLength && styles.reqDotActive]}>
              {hasLength ? <CheckmarkIcon color="#0B0F0E" size={10} /> : null}
            </View>
            <Text style={[styles.reqText, hasLength && styles.reqTextActive]}>
              {t("driver.changePassword.reqLength")}
            </Text>
          </View>

          <View style={styles.reqRow}>
            <View style={[styles.reqDot, hasNumber && styles.reqDotActive]}>
              {hasNumber ? <CheckmarkIcon color="#0B0F0E" size={10} /> : null}
            </View>
            <Text style={[styles.reqText, hasNumber && styles.reqTextActive]}>
              {t("driver.changePassword.reqNumber")}
            </Text>
          </View>

          <View style={styles.reqRow}>
            <View style={[styles.reqDot, hasSpecial && styles.reqDotActive]}>
              {hasSpecial ? <CheckmarkIcon color="#0B0F0E" size={10} /> : null}
            </View>
            <Text style={[styles.reqText, hasSpecial && styles.reqTextActive]}>
              {t("driver.changePassword.reqSpecial")}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleUpdate}
            accessibilityRole="button"
            accessibilityLabel={t("driver.changePassword.updatePasswordCta")}
          >
            <Text style={styles.primaryButtonText}>
              {t("driver.changePassword.updatePasswordCta")}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel={t("driver.changePassword.cancelCta")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.changePassword.cancelCta")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0F0E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
    gap: spacing[3],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "#16201B",
    borderWidth: 1,
    borderColor: "#24342C",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  successBanner: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    borderWidth: 1,
    borderColor: "#BAFF42",
    borderRadius: radius.md,
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  successBannerText: {
    color: "#BAFF42",
    fontSize: 13,
    fontWeight: "700",
  },
  errorBanner: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: radius.md,
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  errorBannerText: {
    color: "#FCA5A5",
    fontSize: 13,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
    gap: spacing[3],
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E9E99",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputWrap: {
    position: "relative",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "#16201B",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#24342C",
    color: "#FFFFFF",
    fontSize: 15,
    paddingHorizontal: spacing[3],
    paddingVertical: 12,
    paddingRight: 48,
  },
  eyeBtn: {
    position: "absolute",
    right: 12,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  requirementsBox: {
    backgroundColor: "#142019",
    borderRadius: radius.lg,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22382B",
    marginBottom: spacing[4],
    gap: 8,
  },
  reqHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  reqDot: {
    width: 16,
    height: 16,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "#2E4536",
    backgroundColor: "#18261E",
    justifyContent: "center",
    alignItems: "center",
  },
  reqDotActive: {
    backgroundColor: "#BAFF42",
    borderColor: "#BAFF42",
  },
  reqText: {
    fontSize: 12,
    color: "#8E9E99",
  },
  reqTextActive: {
    color: "#D0D9D5",
    fontWeight: "600",
  },
  actionContainer: {
    gap: spacing[2],
  },
  primaryButton: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#0B0F0E",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "#16201B",
    borderRadius: radius.full,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
