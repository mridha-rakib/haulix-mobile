import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, InfoIcon } from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useWorkerProfileStore } from "../../src/stores/workerProfileStore";

export default function HelperPersonalInfoScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { helperProfile, updateHelperProfile } = useWorkerProfileStore();

  const [name, setName] = useState(helperProfile.name);
  const [email, setEmail] = useState(helperProfile.email);
  const [phone, setPhone] = useState(helperProfile.phone);
  const [address, setAddress] = useState(helperProfile.address);
  const [cityStateZip, setCityStateZip] = useState(helperProfile.cityStateZip);
  const [isSaved, setIsSaved] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/helper-profile" as Href);
    }
  };

  const handleSave = () => {
    updateHelperProfile({
      name,
      email,
      phone,
      address,
      cityStateZip,
    });
    setIsSaved(true);
    setTimeout(() => {
      handleBack();
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back to Helper Profile"
        >
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t("driver.helperPersonalInfo.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.helperPersonalInfo.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {isSaved ? (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerText}>{t("driver.personalInfo.savedSuccess")}</Text>
          </View>
        ) : null}

        {/* Form Fields Card */}
        <View style={styles.formCard}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.helperPersonalInfo.fullNameLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#5C6E66"
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.helperPersonalInfo.emailLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#5C6E66"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.helperPersonalInfo.phoneLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#5C6E66"
            />
          </View>

          {/* Street Address */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.helperPersonalInfo.addressLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={address}
              onChangeText={setAddress}
              placeholderTextColor="#5C6E66"
            />
          </View>

          {/* City State Zip */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {t("driver.helperPersonalInfo.cityStateZipLabel")}
            </Text>
            <TextInput
              style={styles.textInput}
              value={cityStateZip}
              onChangeText={setCityStateZip}
              placeholderTextColor="#5C6E66"
            />
          </View>

          {/* Tax ID */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.helperPersonalInfo.taxIdLabel")}</Text>
            <TextInput
              style={[styles.textInput, styles.readOnlyInput]}
              value={helperProfile.taxIdMasked}
              editable={false}
            />
            <View style={styles.taxNoticeRow}>
              <InfoIcon color="#BAFF42" size={14} />
              <Text style={styles.taxNoticeText}>{t("driver.personalInfo.taxIdNotice")}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleSave}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperPersonalInfo.saveChanges")}
          >
            <Text style={styles.primaryButtonText}>
              {t("driver.helperPersonalInfo.saveChanges")}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperPersonalInfo.cancel")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.helperPersonalInfo.cancel")}</Text>
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
  formCard: {
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
  textInput: {
    backgroundColor: "#16201B",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#24342C",
    color: "#FFFFFF",
    fontSize: 15,
    paddingHorizontal: spacing[3],
    paddingVertical: 12,
  },
  readOnlyInput: {
    backgroundColor: "#121A16",
    color: "#8E9E99",
    borderColor: "#1C2A22",
  },
  taxNoticeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  taxNoticeText: {
    fontSize: 11,
    color: "#8E9E99",
    flex: 1,
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
