import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, CameraIcon } from "../../src/components/icons/DriverIcons";
import { ProfilePhotoOverlay } from "../../src/components/overlays/ProfilePhotoOverlay";
import { useDriverTranslation } from "../../src/i18n";
import { useWalletStore } from "../../src/stores/walletStore";
import { useWorkerProfileStore } from "../../src/stores/workerProfileStore";

export default function PhotoContactScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const params = useLocalSearchParams<{ overlay?: string }>();
  const { activeRole } = useWalletStore();
  const { getProfileForRole, updateDriverProfile, updateHelperProfile } = useWorkerProfileStore();
  const profile = getProfileForRole(activeRole);

  const [overlayVisible, setOverlayVisible] = useState(params.overlay === "ov01");
  const [contactName, setContactName] = useState(profile.emergencyContact.name);
  const [relationship, setRelationship] = useState(profile.emergencyContact.relationship);
  const [phone, setPhone] = useState(profile.emergencyContact.phone);
  const [isSaved, setIsSaved] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/profile" as Href);
    }
  };

  const handleSave = () => {
    const updatedContact = {
      name: contactName,
      relationship,
      phone,
    };
    if (activeRole === "driver") {
      updateDriverProfile({ emergencyContact: updatedContact });
    } else {
      updateHelperProfile({ emergencyContact: updatedContact });
    }
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
          accessibilityLabel="Back to Profile"
        >
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t("driver.photoContact.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.photoContact.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {isSaved ? (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerText}>{t("driver.personalInfo.savedSuccess")}</Text>
          </View>
        ) : null}

        {/* Section 1: Profile Photo */}
        <Text style={styles.sectionHeading}>{t("driver.photoContact.profilePhotoSection")}</Text>
        <View style={styles.photoCard}>
          <View style={styles.photoPreviewRow}>
            <Image
              source={{ uri: profile.avatarUrl }}
              style={styles.avatarLarge}
              resizeMode="cover"
            />
            <View style={styles.photoActionCol}>
              <Pressable
                style={styles.changePhotoBtn}
                onPress={() => setOverlayVisible(true)}
                accessibilityRole="button"
                accessibilityLabel={t("driver.photoContact.changePhotoCta")}
              >
                <CameraIcon color="#0B0F0E" size={16} />
                <Text style={styles.changePhotoBtnText}>
                  {t("driver.photoContact.changePhotoCta")}
                </Text>
              </Pressable>
              <Text style={styles.photoGuidelines}>{t("driver.photoContact.photoGuidelines")}</Text>
            </View>
          </View>
        </View>

        {/* Section 2: Emergency Contact */}
        <Text style={styles.sectionHeading}>{t("driver.photoContact.emergencySection")}</Text>
        <View style={styles.contactCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.photoContact.contactNameLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={contactName}
              onChangeText={setContactName}
              placeholderTextColor="#5C6E66"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.photoContact.relationshipLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={relationship}
              onChangeText={setRelationship}
              placeholderTextColor="#5C6E66"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t("driver.photoContact.contactPhoneLabel")}</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#5C6E66"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleSave}
            accessibilityRole="button"
            accessibilityLabel={t("driver.photoContact.saveChanges")}
          >
            <Text style={styles.primaryButtonText}>{t("driver.photoContact.saveChanges")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel={t("driver.photoContact.cancel")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.photoContact.cancel")}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Profile Photo Overlay */}
      <ProfilePhotoOverlay visible={overlayVisible} onClose={() => setOverlayVisible(false)} />
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
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: spacing[2],
    marginTop: spacing[2],
  },
  photoCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  photoPreviewRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: "#BAFF42",
    backgroundColor: "#16201B",
  },
  photoActionCol: {
    flex: 1,
    gap: 8,
  },
  changePhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingHorizontal: spacing[4],
    paddingVertical: 10,
    gap: 6,
    alignSelf: "flex-start",
  },
  changePhotoBtnText: {
    color: "#0B0F0E",
    fontSize: 13,
    fontWeight: "800",
  },
  photoGuidelines: {
    fontSize: 11,
    color: "#8E9E99",
    lineHeight: 16,
  },
  contactCard: {
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
