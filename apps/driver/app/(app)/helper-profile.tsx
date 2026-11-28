import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  BellIcon,
  ChevronRightIcon,
  DocumentIcon,
  GlobeIcon,
  HeadphonesIcon,
  LockIcon,
  LogOutIcon,
  ShieldIcon,
  StarIcon,
  UserIcon,
  WalletIcon,
} from "../../src/components/icons/DriverIcons";
import { ProfilePhotoOverlay } from "../../src/components/overlays/ProfilePhotoOverlay";
import { useDriverTranslation } from "../../src/i18n";
import { useWalletStore } from "../../src/stores/walletStore";
import { useWorkerProfileStore } from "../../src/stores/workerProfileStore";

export default function HelperProfileScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { setActiveRole } = useWalletStore();
  const { helperProfile } = useWorkerProfileStore();
  const [photoOverlayVisible, setPhotoOverlayVisible] = useState(false);

  const handleBack = () => {
    setActiveRole("driver");
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/profile" as Href);
    }
  };

  const handleSignOut = () => {
    router.replace("/(auth)/welcome" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back to Driver profile"
        >
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t("driver.helperProfile.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.helperProfile.memberSince")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Helper Identity Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <Pressable
              onPress={() => setPhotoOverlayVisible(true)}
              style={styles.avatarWrap}
              accessibilityRole="button"
              accessibilityLabel="Change profile photo"
            >
              <Image
                source={{ uri: helperProfile.avatarUrl }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
              <View style={styles.avatarBadge}>
                <ShieldIcon color="#0B0F0E" size={12} />
              </View>
            </Pressable>

            <View style={styles.profileIdentityCol}>
              <View style={styles.nameRow}>
                <Text style={styles.helperName}>{helperProfile.name}</Text>
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>{t("driver.helperProfile.roleTag")}</Text>
                </View>
              </View>

              <Text style={styles.memberSince}>{t("driver.helperProfile.memberSince")}</Text>

              <View style={styles.statsPillRow}>
                <View style={styles.statPill}>
                  <StarIcon color="#BAFF42" size={13} />
                  <Text style={styles.statPillText}>{t("driver.helperProfile.statsRating")}</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statPillTextJobs}>{t("driver.helperProfile.statsJobs")}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION 1: Personal Information */}
        <Text style={styles.sectionHeading}>{t("driver.helperProfile.sectionPersonalInfo")}</Text>
        <View style={styles.menuSection}>
          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/helper-personal-info" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperPersonalInfo.title")}
          >
            <View style={styles.menuIconWrap}>
              <UserIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.helperPersonalInfo.title")}</Text>
              <Text style={styles.menuDesc}>{t("driver.helperProfile.personalInfoDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/photo-contact" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.photoContact.title")}
          >
            <View style={styles.menuIconWrap}>
              <DocumentIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.photoContact.title")}</Text>
              <Text style={styles.menuDesc}>{t("driver.profile.photoContactDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>
        </View>

        {/* SECTION 2: Eligibility & Shift Schedule */}
        <Text style={styles.sectionHeading}>{t("driver.helperProfile.eligibilityDocs")}</Text>
        <View style={styles.menuSection}>
          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/helper-docs" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperProfile.eligibilityDocs")}
          >
            <View style={styles.menuIconWrap}>
              <ShieldIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.helperProfile.eligibilityDocs")}</Text>
              <Text style={styles.menuDesc}>{t("driver.helperProfile.eligibilityDocsDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/availability-settings" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperProfile.availabilitySettings")}
          >
            <View style={styles.menuIconWrap}>
              <GlobeIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.helperProfile.availabilitySettings")}</Text>
              <Text style={styles.menuDesc}>{t("driver.helperProfile.availabilityDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/payout-account" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperProfile.payoutAccount")}
          >
            <View style={styles.menuIconWrap}>
              <WalletIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.helperProfile.payoutAccount")}</Text>
              <Text style={styles.menuDesc}>{t("driver.helperProfile.payoutAccountDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>
        </View>

        {/* SECTION 3: Preferences & Security */}
        <Text style={styles.sectionHeading}>{t("driver.helperProfile.languageSecurity")}</Text>
        <View style={styles.menuSection}>
          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/language-security" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperProfile.languageSecurity")}
          >
            <View style={styles.menuIconWrap}>
              <LockIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.helperProfile.languageSecurity")}</Text>
              <Text style={styles.menuDesc}>{t("driver.profile.languageSecurityDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.menuDivider} />

          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/notification-settings" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperProfile.notificationSettings")}
          >
            <View style={styles.menuIconWrap}>
              <BellIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.helperProfile.notificationSettings")}</Text>
              <Text style={styles.menuDesc}>{t("driver.profile.notificationSettingsDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>
        </View>

        {/* SECTION 4: Help & Support */}
        <Text style={styles.sectionHeading}>{t("driver.helperProfile.helpSupport")}</Text>
        <View style={styles.menuSection}>
          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/help-support" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helperProfile.helpSupport")}
          >
            <View style={styles.menuIconWrap}>
              <HeadphonesIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>{t("driver.helperProfile.helpSupport")}</Text>
              <Text style={styles.menuDesc}>{t("driver.profile.helpSupportDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>
        </View>

        {/* Sign Out CTA */}
        <Pressable
          style={styles.signOutBtn}
          onPress={handleSignOut}
          accessibilityRole="button"
          accessibilityLabel={t("driver.helperProfile.signOut")}
        >
          <LogOutIcon color="#EF4444" size={18} />
          <Text style={styles.signOutBtnText}>{t("driver.helperProfile.signOut")}</Text>
        </Pressable>
      </ScrollView>

      {/* Photo Update Overlay */}
      <ProfilePhotoOverlay
        visible={photoOverlayVisible}
        onClose={() => setPhotoOverlayVisible(false)}
      />
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
    paddingTop: spacing[2],
    paddingBottom: spacing[10],
  },
  profileCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  profileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  avatarWrap: {
    position: "relative",
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: "#BAFF42",
    backgroundColor: "#1A2620",
  },
  avatarBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: "#BAFF42",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIdentityCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    flexWrap: "wrap",
  },
  helperName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  verifiedBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "#BAFF42",
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#BAFF42",
    textTransform: "uppercase",
  },
  memberSince: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  statsPillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: 8,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16201B",
    borderRadius: radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#22332B",
    gap: 4,
  },
  statPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statPillTextJobs: {
    fontSize: 11,
    fontWeight: "600",
    color: "#BAFF42",
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
  menuSection: {
    backgroundColor: "#111815",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[3],
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[3],
    gap: spacing[3],
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "#16201B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  menuTextCol: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  menuDesc: {
    fontSize: 11,
    color: "#8E9E99",
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#1C2A23",
    marginLeft: spacing[3] + 36 + spacing[3],
  },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderRadius: radius.full,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.25)",
    gap: spacing[2],
    marginTop: spacing[3],
  },
  signOutBtnText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
});
