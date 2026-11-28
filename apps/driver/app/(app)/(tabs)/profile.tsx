import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
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
} from "../../../src/components/icons/DriverIcons";
import { ProfilePhotoOverlay } from "../../../src/components/overlays/ProfilePhotoOverlay";
import { useDriverTranslation } from "../../../src/i18n";
import { useWalletStore } from "../../../src/stores/walletStore";
import { useWorkerProfileStore } from "../../../src/stores/workerProfileStore";

interface ProfileSectionProps {
  onOpenPhoto: () => void;
  onSignOut: () => void;
}

function DriverProfileView({ onOpenPhoto, onSignOut }: ProfileSectionProps) {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { driverProfile } = useWorkerProfileStore();

  return (
    <>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>{t("driver.profile.title")}</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileTopRow}>
          <Pressable
            onPress={onOpenPhoto}
            style={styles.avatarWrap}
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
          >
            <Image
              source={{ uri: driverProfile.avatarUrl }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <View style={styles.avatarBadge}>
              <ShieldIcon color="#0B0F0E" size={12} />
            </View>
          </Pressable>

          <View style={styles.profileIdentityCol}>
            <View style={styles.nameRow}>
              <Text style={styles.driverName}>{driverProfile.name}</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedBadgeText}>{t("driver.profile.roleTag")}</Text>
              </View>
            </View>

            <Text style={styles.memberSince}>{t("driver.profile.memberSince")}</Text>

            <View style={styles.statsPillRow}>
              <View style={styles.statPill}>
                <StarIcon color="#BAFF42" size={13} />
                <Text style={styles.statPillText}>{t("driver.profile.statsRating")}</Text>
              </View>
              <View style={styles.statPill}>
                <Text style={styles.statPillTextJobs}>{t("driver.profile.statsJobs")}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* SECTION 1: Personal Information */}
      <Text style={styles.sectionHeading}>{t("driver.profile.sectionPersonalInfo")}</Text>
      <View style={styles.menuSection}>
        <Pressable
          style={styles.menuRow}
          onPress={() => router.push("/(app)/personal-info" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.personalInfo.title")}
        >
          <View style={styles.menuIconWrap}>
            <UserIcon color="#BAFF42" size={20} />
          </View>
          <View style={styles.menuTextCol}>
            <Text style={styles.menuTitle}>{t("driver.personalInfo.title")}</Text>
            <Text style={styles.menuDesc}>{t("driver.profile.personalInfoDesc")}</Text>
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

      {/* SECTION 2: Vehicle & Operations */}
      <Text style={styles.sectionHeading}>{t("driver.profile.sectionVehicleWork")}</Text>
      <View style={styles.menuSection}>
        <Pressable
          style={styles.menuRow}
          onPress={() => router.push("/(app)/vehicle-docs" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.profile.documentsVehicle")}
        >
          <View style={styles.menuIconWrap}>
            <ShieldIcon color="#BAFF42" size={20} />
          </View>
          <View style={styles.menuTextCol}>
            <Text style={styles.menuTitle}>{t("driver.profile.documentsVehicle")}</Text>
            <Text style={styles.menuDesc}>{t("driver.profile.documentsVehicleDesc")}</Text>
          </View>
          <ChevronRightIcon color="#8E9E99" size={18} />
        </Pressable>

        <View style={styles.menuDivider} />

        <Pressable
          style={styles.menuRow}
          onPress={() => router.push("/(app)/availability-settings" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.profile.availabilitySettings")}
        >
          <View style={styles.menuIconWrap}>
            <GlobeIcon color="#BAFF42" size={20} />
          </View>
          <View style={styles.menuTextCol}>
            <Text style={styles.menuTitle}>{t("driver.profile.availabilitySettings")}</Text>
            <Text style={styles.menuDesc}>{t("driver.profile.availabilityDesc")}</Text>
          </View>
          <ChevronRightIcon color="#8E9E99" size={18} />
        </Pressable>

        <View style={styles.menuDivider} />

        <Pressable
          style={styles.menuRow}
          onPress={() => router.push("/(app)/payout-account" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.profile.payoutAccount")}
        >
          <View style={styles.menuIconWrap}>
            <WalletIcon color="#BAFF42" size={20} />
          </View>
          <View style={styles.menuTextCol}>
            <Text style={styles.menuTitle}>{t("driver.profile.payoutAccount")}</Text>
            <Text style={styles.menuDesc}>{t("driver.profile.payoutAccountDesc")}</Text>
          </View>
          <ChevronRightIcon color="#8E9E99" size={18} />
        </Pressable>
      </View>

      {/* SECTION 3: Preferences & Security */}
      <Text style={styles.sectionHeading}>{t("driver.profile.sectionSecurityPrefs")}</Text>
      <View style={styles.menuSection}>
        <Pressable
          style={styles.menuRow}
          onPress={() => router.push("/(app)/language-security" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.profile.languageSecurity")}
        >
          <View style={styles.menuIconWrap}>
            <LockIcon color="#BAFF42" size={20} />
          </View>
          <View style={styles.menuTextCol}>
            <Text style={styles.menuTitle}>{t("driver.profile.languageSecurity")}</Text>
            <Text style={styles.menuDesc}>{t("driver.profile.languageSecurityDesc")}</Text>
          </View>
          <ChevronRightIcon color="#8E9E99" size={18} />
        </Pressable>

        <View style={styles.menuDivider} />

        <Pressable
          style={styles.menuRow}
          onPress={() => router.push("/(app)/notification-settings" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.profile.notificationSettings")}
        >
          <View style={styles.menuIconWrap}>
            <BellIcon color="#BAFF42" size={20} />
          </View>
          <View style={styles.menuTextCol}>
            <Text style={styles.menuTitle}>{t("driver.profile.notificationSettings")}</Text>
            <Text style={styles.menuDesc}>{t("driver.profile.notificationSettingsDesc")}</Text>
          </View>
          <ChevronRightIcon color="#8E9E99" size={18} />
        </Pressable>
      </View>

      {/* SECTION 4: Support & Hub */}
      <Text style={styles.sectionHeading}>{t("driver.profile.sectionSupport")}</Text>
      <View style={styles.menuSection}>
        <Pressable
          style={styles.menuRow}
          onPress={() => router.push("/(app)/help-support" as Href)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.profile.helpSupport")}
        >
          <View style={styles.menuIconWrap}>
            <HeadphonesIcon color="#BAFF42" size={20} />
          </View>
          <View style={styles.menuTextCol}>
            <Text style={styles.menuTitle}>{t("driver.profile.helpSupport")}</Text>
            <Text style={styles.menuDesc}>{t("driver.profile.helpSupportDesc")}</Text>
          </View>
          <ChevronRightIcon color="#8E9E99" size={18} />
        </Pressable>
      </View>

      {/* Sign Out CTA */}
      <Pressable
        style={styles.signOutBtn}
        onPress={onSignOut}
        accessibilityRole="button"
        accessibilityLabel={t("driver.profile.signOut")}
      >
        <LogOutIcon color="#EF4444" size={18} />
        <Text style={styles.signOutBtnText}>{t("driver.profile.signOut")}</Text>
      </Pressable>
    </>
  );
}

function HelperProfileView({ onOpenPhoto, onSignOut }: ProfileSectionProps) {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { helperProfile } = useWorkerProfileStore();

  return (
    <>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>{t("driver.helperProfile.title")}</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileTopRow}>
          <Pressable
            onPress={onOpenPhoto}
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
              <Text style={styles.driverName}>{helperProfile.name}</Text>
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
        onPress={onSignOut}
        accessibilityRole="button"
        accessibilityLabel={t("driver.helperProfile.signOut")}
      >
        <LogOutIcon color="#EF4444" size={18} />
        <Text style={styles.signOutBtnText}>{t("driver.helperProfile.signOut")}</Text>
      </Pressable>
    </>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { activeRole } = useWalletStore();
  const [photoOverlayVisible, setPhotoOverlayVisible] = useState(false);

  const handleSignOut = () => {
    router.replace("/(auth)/welcome" as Href);
  };

  const isHelper = activeRole === "helper";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {isHelper ? (
          <HelperProfileView
            onOpenPhoto={() => setPhotoOverlayVisible(true)}
            onSignOut={handleSignOut}
          />
        ) : (
          <DriverProfileView
            onOpenPhoto={() => setPhotoOverlayVisible(true)}
            onSignOut={handleSignOut}
          />
        )}
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
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[10],
  },
  screenHeader: {
    marginBottom: spacing[3],
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.4,
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
    backgroundColor: "#1B2A22",
  },
  avatarBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: "#BAFF42",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#111815",
  },
  profileIdentityCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  verifiedBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.3)",
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  memberSince: {
    fontSize: 12,
    color: "#8E9E99",
    marginBottom: spacing[2],
  },
  statsPillRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#16231C",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BAFF42",
  },
  statPillTextJobs: {
    fontSize: 12,
    fontWeight: "600",
    color: "#CFE0D8",
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "800",
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
    overflow: "hidden",
    marginBottom: spacing[3],
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[3],
    paddingVertical: 14,
    gap: spacing[3],
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "#16231C",
    justifyContent: "center",
    alignItems: "center",
  },
  menuTextCol: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  menuDesc: {
    fontSize: 12,
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
  },
  signOutBtnText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "700",
  },
});
