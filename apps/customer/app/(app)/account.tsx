import { colors, fontFamily, fontSize, radius, spacing } from "@haulix/design-tokens";
import { changeLocale, getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixButton, HaulixSafeArea } from "@haulix/ui";
import * as FileSystem from "expo-file-system/legacy";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  AccountShieldIcon,
  AddressPinIcon,
  BookingStarIcon,
  CameraBadgeIcon,
  ChangePasswordIcon,
  CustomerPersonIcon,
  HeaderBackIcon,
  HeaderBellIcon,
  LanguageGlobeIcon,
  PaymentCardIcon,
  PhoneVerifiedIcon,
  ProfilePhotoIcon,
  VerifiedStatusIcon,
} from "../../src/components/account/C10Icons";
import {
  ProfilePhotoActionSheet,
  STORAGE_KEY_PROFILE_PHOTO,
} from "../../src/components/account/ProfilePhotoActionSheet";
import { ChevronRightIcon } from "../../src/components/auth/AuthIcons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";
import {
  c10DemoProfile,
  computeInitials,
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";

/**
 * C10 — Account Overview (English Default)
 *
 * Source:
 *   - Figma node: 333:26 ("C10 · Account Overview / Default [CU-04, CU-05, CU-07, CU-09]")
 *   - Reference Artboard: 430 × 1580 px
 *
 * Owner Policy (Frontend UI Preview):
 * 1. Unguarded frontend preview: Accessible in debug and release APK without auth blockers.
 * 2. Uses strictly local mock fixture (c10DemoProfile) with Sarah Mitchell profile data.
 * 3. Never writes demo identity to persistent storage or claims backend verified state.
 * 4. Sign-out acts as a clean local navigation action back to C06 Sign-in.
 * 5. Authentic circular SM avatar (72×72) with camera badge (21×21) as designed in C10 Figma.
 * 6. Features the original C01 sculpted bottom navbar (instance 959:8556) with Account active.
 */
async function resolveStoredPhotoUri(stored: string): Promise<string | null> {
  if (!stored.startsWith("file://")) return stored;
  try {
    const info = await FileSystem.getInfoAsync(stored);
    return info.exists ? stored : null;
  } catch {
    return null;
  }
}

function getDisplayProfile(demoProfile: ReturnType<typeof getC10DemoProfile>) {
  return {
    name: demoProfile.name,
    email: demoProfile.email,
    sessionChip: demoProfile.sessionChip,
    phone: demoProfile.phone,
    isPhoneVerified: demoProfile.isPhoneVerified,
  };
}

export default function AccountOverviewScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);
  const [, setProfileVersion] = useState(0);

  const currentLocale = (getCurrentLocale() as "en" | "es") || "en";
  const demoProfile = getC10DemoProfile(currentLocale);
  const displayProfile = getDisplayProfile(demoProfile);
  const initials =
    demoProfile.initials || c10DemoProfile.initials || computeInitials(demoProfile.name);

  useEffect(() => {
    Promise.all([loadProfileEdits("en"), loadProfileEdits("es")]).then(() => {
      setProfileVersion((v) => v + 1);
    });
    const unsubscribe = subscribeToProfileEdits(() => {
      setProfileVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function loadStoredPhoto() {
      try {
        const stored = await SecureStore.getItemAsync(STORAGE_KEY_PROFILE_PHOTO);
        if (!stored) return;
        const validUri = await resolveStoredPhotoUri(stored);
        if (validUri) {
          setPhotoUri(validUri);
        } else {
          await SecureStore.deleteItemAsync(STORAGE_KEY_PROFILE_PHOTO);
          setPhotoUri(null);
        }
      } catch (err) {
        console.warn("Could not load stored profile photo:", err);
      }
    }
    loadStoredPhoto();
  }, []);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/sign-in");
    }
  };

  const handleSignOut = () => {
    // Frontend-only sign out navigation
    router.replace("/(auth)/sign-in");
  };

  const handleLanguageSwitch = async () => {
    const current = getCurrentLocale();
    const nextLocale = current === "en" ? "es" : "en";
    await changeLocale(nextLocale);
    setNoticeMessage(null);
  };

  const handleActionNotice = (label: string) => {
    setNoticeMessage(`${label}: ${t("account.pendingNoticeMessage")}`);
  };

  return (
    <HaulixSafeArea edges={["top", "left", "right"]}>
      <View style={styles.rootContainer}>
        {/* Main Scrollable Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c10-account-screen"
        >
          {/* 1. Header (Figma node 333:30) */}
          <View style={styles.headerRow}>
            {/* Back Button Circle */}
            <Pressable
              style={styles.headerCircleButton}
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel={t("common.back")}
              hitSlop={8}
              testID="c10-header-back"
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
              testID="c10-header-bell"
            >
              <HeaderBellIcon size={22} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>

          {/* Interactive Notice Banner (for pending actions) */}
          {noticeMessage && (
            <View style={styles.noticeBox} testID="c10-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                accessibilityRole="button"
                accessibilityLabel={t("account.dismissNotice")}
                hitSlop={8}
              >
                <Text style={styles.noticeDismiss}>{t("account.dismissNotice")}</Text>
              </Pressable>
            </View>
          )}

          {/* 2. Intro Section (Figma node 333:36 / ES 347:325) */}
          <View style={styles.introSection}>
            <Text style={styles.introTitle}>{t("account.title")}</Text>
            <Text style={styles.introSubtitle}>{t("account.subtitle")}</Text>
          </View>

          {/* 3. Session-Status Chip (Figma node 333:39 / ES 347:328) */}
          <View style={styles.statusChip} testID="c10-status-chip">
            <AccountShieldIcon size={21} color={colors.brand} />
            <View style={styles.statusChipDot} />
            <Text style={styles.statusChipText}>{displayProfile.sessionChip}</Text>
          </View>

          {/* 4. Verified Customer Card (Figma node 333:43 / ES 347:332) */}
          <View style={styles.card} testID="c10-verified-customer-card">
            <Text style={styles.cardHeaderTitle}>{t("account.verifiedCustomerHeader")}</Text>

            {/* Customer Name & SM / BL Avatar Row */}
            <View style={styles.customerRow}>
              <View style={styles.customerDetailCol}>
                <View style={styles.fieldLabelRow}>
                  <CustomerPersonIcon size={18} color={colors.brand} />
                  <Text style={styles.fieldLabel}>{t("account.customerLabel")}</Text>
                </View>
                <Text style={styles.fieldValueBold}>{displayProfile.name}</Text>
              </View>

              {/* Authentic C10 Circular Avatar with Camera Badge */}
              <Pressable
                style={styles.avatarContainer}
                onPress={() => setIsPhotoSheetOpen(true)}
                accessibilityRole="button"
                accessibilityLabel={t("account.profilePhoto")}
                hitSlop={8}
                testID="c10-sm-avatar"
              >
                <View style={styles.avatarCircle}>
                  {photoUri ? (
                    <Image
                      source={{ uri: photoUri }}
                      style={styles.avatarImage}
                      resizeMode="cover"
                      testID="c10-avatar-image"
                    />
                  ) : (
                    <Text style={styles.avatarInitials}>{initials}</Text>
                  )}
                </View>
                <View style={styles.cameraBadgeCircle} testID="c10-camera-badge">
                  <CameraBadgeIcon size={13} color="#101915" />
                </View>
              </Pressable>
            </View>

            {/* Email Row */}
            <View style={styles.cardRow}>
              <Text style={styles.fieldLabel}>{t("account.emailLabel")}</Text>
              <Text style={styles.fieldValue}>{displayProfile.email}</Text>
            </View>

            {/* Phone Row */}
            <View style={styles.cardRow}>
              <View style={styles.fieldLabelRow}>
                <PhoneVerifiedIcon
                  size={18}
                  color={displayProfile.isPhoneVerified ? colors.brand : "#ADB7B1"}
                />
                <Text style={styles.fieldLabel}>
                  {displayProfile.isPhoneVerified
                    ? t("account.phoneLabel")
                    : currentLocale === "es"
                      ? "Teléfono (pendiente)"
                      : "Phone · unverified"}
                </Text>
              </View>
              <Text style={styles.fieldValueBold}>{displayProfile.phone}</Text>
            </View>

            {/* Verified Status Banner */}
            <View style={styles.verifiedStatusPill}>
              <VerifiedStatusIcon size={20} color="#48D796" />
              <Text style={styles.verifiedStatusText}>
                {t("account.accountVerifiedStatus") || demoProfile.serviceArea}
              </Text>
            </View>
          </View>

          {/* 5. Account & Preferences Card (Figma node 333:66 / ES 347:355) */}
          <View style={styles.card} testID="c10-preferences-card">
            <Text style={styles.cardHeaderTitle}>{t("account.preferencesHeader")}</Text>

            {/* Saved pickup address */}
            <View style={styles.preferenceRow}>
              <AddressPinIcon size={20} color={colors.brand} style={styles.preferenceIcon} />
              <View style={styles.preferenceTextCol}>
                <Text style={styles.fieldLabel}>{t("account.savedAddressLabel")}</Text>
                <Text style={styles.fieldValue}>
                  {t("account.savedAddressValue") || demoProfile.savedAddress}
                </Text>
              </View>
            </View>

            {/* Language */}
            <View style={styles.preferenceRow}>
              <LanguageGlobeIcon size={20} color={colors.brand} style={styles.preferenceIcon} />
              <View style={styles.preferenceTextCol}>
                <Text style={styles.fieldLabel}>{t("account.languageLabel")}</Text>
                <Text style={styles.fieldValue}>
                  {t("account.languageValue") || demoProfile.language}
                </Text>
              </View>
            </View>

            {/* Payment methods */}
            <View style={styles.preferenceRow}>
              <PaymentCardIcon size={20} color={colors.brand} style={styles.preferenceIcon} />
              <View style={styles.preferenceTextCol}>
                <Text style={styles.fieldLabel}>{t("account.paymentMethodsLabel")}</Text>
                <Text style={styles.fieldValue}>
                  {t("account.paymentMethodsValue") || demoProfile.paymentMethod}
                </Text>
              </View>
            </View>

            {/* Active booking */}
            <View style={[styles.preferenceRow, { borderBottomWidth: 0 }]}>
              <BookingStarIcon size={20} color={colors.brand} style={styles.preferenceIcon} />
              <View style={styles.preferenceTextCol}>
                <Text style={styles.fieldLabel}>{t("account.activeBookingLabel")}</Text>
                <Text style={styles.fieldValue}>
                  {t("account.activeBookingValue") || demoProfile.activeBooking}
                </Text>
              </View>
            </View>
          </View>

          {/* 6. Sign Out & Language Switch Links (Figma 343:100 / 347:385, 348:127 / 348:133) */}
          <View style={styles.linksRow}>
            <Pressable
              onPress={handleSignOut}
              accessibilityRole="button"
              accessibilityLabel={t("account.signOut")}
              hitSlop={8}
              testID="c10-sign-out"
            >
              <Text style={styles.linkText}>{t("account.signOut")}</Text>
            </Pressable>

            <Pressable
              onPress={handleLanguageSwitch}
              accessibilityRole="button"
              accessibilityLabel={t("account.languageSwitch")}
              hitSlop={8}
              testID="c10-language-switch"
            >
              <Text style={styles.linkText}>{t("account.languageSwitch")}</Text>
            </Pressable>
          </View>

          {/* 7. Security & Profile Photo Shortcuts (Figma node 936:8494 / ES 937:8494) */}
          <View style={styles.card} testID="c10-shortcuts-card">
            <Text style={styles.shortcutsHeaderTitle}>{t("account.securityShortcutsHeader")}</Text>

            {/* Change Password Shortcut */}
            <Pressable
              style={styles.shortcutItem}
              onPress={() => handleActionNotice(t("account.changePassword"))}
              accessibilityRole="button"
              accessibilityLabel={t("account.changePassword")}
              hitSlop={8}
              testID="c10-change-password"
            >
              <ChangePasswordIcon size={20} color={colors.brand} />
              <Text style={styles.shortcutText}>{t("account.changePassword")}</Text>
              <ChevronRightIcon size={16} color={colors.brand} />
            </Pressable>

            {/* Profile Photo Shortcut */}
            <Pressable
              style={styles.shortcutItem}
              onPress={() => setIsPhotoSheetOpen(true)}
              accessibilityRole="button"
              accessibilityLabel={t("account.profilePhoto")}
              hitSlop={8}
              testID="c10-profile-photo-shortcut"
            >
              <ProfilePhotoIcon size={20} color={colors.brand} />
              <Text style={styles.shortcutText}>{t("account.profilePhoto")}</Text>
              <ChevronRightIcon size={16} color={colors.brand} />
            </Pressable>
          </View>

          {/* 8. Action Buttons (Figma nodes 333:95 / ES 347:386, 333:98 / ES 347:388) */}
          <View style={styles.actionsContainer}>
            <HaulixButton
              label={t("account.editProfile")}
              variant="primary"
              fullWidth
              onPress={() => router.push("/(app)/edit-profile")}
              testID="c10-edit-profile-btn"
            />

            <Pressable
              onPress={() => handleActionNotice(t("account.savedAddresses"))}
              accessibilityRole="button"
              accessibilityLabel={t("account.savedAddresses")}
              testID="c10-saved-addresses-btn"
            >
              {({ pressed }) => (
                <View style={[styles.secondaryButton, pressed && styles.secondaryButtonPressed]}>
                  <Text style={styles.secondaryButtonText}>{t("account.savedAddresses")}</Text>
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>

        {/* 9. Original Sculpted Bottom Navigation (Figma instance 959:8556 / ES 965:10500) */}
        <CustomerBottomNav activeTab="account" onShowNotice={(msg) => setNoticeMessage(msg)} />

        {/* 10. Profile Photo Action Sheet (Frontend-Only Preview) */}
        <ProfilePhotoActionSheet
          visible={isPhotoSheetOpen}
          currentPhotoUri={photoUri}
          initials={initials}
          onClose={() => setIsPhotoSheetOpen(false)}
          onPhotoSaved={(uri) => setPhotoUri(uri)}
          onPhotoRemoved={() => setPhotoUri(null)}
        />
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.background, // #080B0B
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 138, // Reserve ample space for the 108px sculpted bottom nav
  },

  // 1. Header (Figma 333:30)
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[4],
    height: 48,
  },
  headerCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: colors.elevated, // #222827
    alignItems: "center",
    justifyContent: "center",
  },
  wordmarkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordmarkHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    letterSpacing: 1,
    color: colors.primaryText, // #F6F8F6
  },
  wordmarkIx: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    letterSpacing: 1,
    color: colors.brand, // #BAFF42
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand, // #BAFF42
  },

  // Informatory Notice Banner
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

  // 2. Page Intro (Figma 333:36)
  introSection: {
    marginBottom: spacing[4],
  },
  introTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    color: colors.primaryText,
    marginBottom: 4,
  },
  introSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.secondaryText,
  },

  // 3. Session-Status Chip (Figma 333:39)
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101913",
    borderWidth: 1,
    borderColor: "#1F3826",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 43,
    marginBottom: spacing[4],
  },
  statusChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
    marginHorizontal: 8,
  },
  statusChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.brand,
  },

  // Cards Base Style
  card: {
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: colors.elevated, // #222827
    borderRadius: radius["2xl"], // 18px
    padding: 18,
    marginBottom: spacing[4],
  },
  cardHeaderTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.primaryText,
    marginBottom: spacing[3],
  },

  // 4. Verified Customer Card Elements
  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: "rgba(34, 40, 39, 0.6)",
    marginBottom: spacing[3],
  },
  customerDetailCol: {
    flex: 1,
    justifyContent: "center",
  },
  fieldLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 6,
  },
  fieldLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText, // #ADB7B1
  },
  fieldValueBold: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.primaryText,
  },
  fieldValue: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.primaryText,
  },

  // Authentic C10 SM Avatar + Camera Badge
  avatarContainer: {
    width: 72,
    height: 72,
    position: "relative",
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#151A19",
    borderWidth: 2,
    borderColor: colors.brand, // #BAFF42
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  avatarInitials: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primaryText, // #F6F8F6
  },
  cameraBadgeCircle: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.brand, // #BAFF42
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#151A19",
  },

  cardRow: {
    marginBottom: spacing[3],
  },
  verifiedStatusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#19231D",
    borderWidth: 1,
    borderColor: "#263E2F",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    marginTop: spacing[1],
  },
  verifiedStatusText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: "#E6ECE8",
  },

  // 5. Preferences Rows
  preferenceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(34, 40, 39, 0.6)",
    gap: 12,
  },
  preferenceIcon: {
    width: 24,
    alignItems: "center",
  },
  preferenceTextCol: {
    flex: 1,
  },

  // 6. Links Row (Sign out & Language)
  linksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[4],
    paddingHorizontal: 4,
  },
  linkText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand, // #BAFF42
  },

  // 7. Security Shortcuts
  shortcutsHeaderTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.brand,
    marginBottom: spacing[3],
  },
  shortcutItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.elevated, // #222827
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    gap: 10,
  },
  shortcutText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
    flex: 1,
  },

  // 8. Action CTAs
  actionsContainer: {
    gap: 12,
    marginBottom: spacing[4],
  },
  secondaryButton: {
    width: "100%",
    height: 54,
    borderRadius: radius.xl,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#35403B",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
    borderColor: colors.brand,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.base,
    color: colors.brand,
  },
});
