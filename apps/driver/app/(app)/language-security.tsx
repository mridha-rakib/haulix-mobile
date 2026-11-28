import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LockIcon,
  ShieldIcon,
} from "../../src/components/icons/DriverIcons";
import { AccountProtectionOverlay } from "../../src/components/overlays/AccountProtectionOverlay";
import { useDriverTranslation } from "../../src/i18n";

export default function LanguageSecurityScreen() {
  const router = useRouter();
  const { t, currentLocale, setLanguage } = useDriverTranslation();
  const params = useLocalSearchParams<{ overlay?: string }>();
  const [securityOverlayVisible, setSecurityOverlayVisible] = useState(params.overlay === "ov03");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/profile" as Href);
    }
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
          <Text style={styles.headerTitle}>{t("driver.languageSecurity.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.languageSecurity.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Language Preference Section */}
        <Text style={styles.sectionHeading}>{t("driver.languageSecurity.languageSection")}</Text>
        <Text style={styles.sectionSubheading}>{t("driver.languageSecurity.languageDesc")}</Text>

        <View style={styles.card}>
          {/* English Option */}
          <Pressable
            style={styles.languageOption}
            onPress={() => setLanguage("en")}
            accessibilityRole="radio"
            accessibilityState={{ checked: currentLocale === "en" }}
            accessibilityLabel="Select English language"
          >
            <View style={styles.langLeft}>
              <View style={styles.radioOuter}>
                {currentLocale === "en" ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.langName}>{t("driver.languageSecurity.englishOption")}</Text>
            </View>
            {currentLocale === "en" ? (
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>Active</Text>
              </View>
            ) : null}
          </Pressable>

          <View style={styles.divider} />

          {/* Spanish Option */}
          <Pressable
            style={styles.languageOption}
            onPress={() => setLanguage("es")}
            accessibilityRole="radio"
            accessibilityState={{ checked: currentLocale === "es" }}
            accessibilityLabel="Select Spanish language"
          >
            <View style={styles.langLeft}>
              <View style={styles.radioOuter}>
                {currentLocale === "es" ? <View style={styles.radioInner} /> : null}
              </View>
              <Text style={styles.langName}>{t("driver.languageSecurity.spanishOption")}</Text>
            </View>
            {currentLocale === "es" ? (
              <View style={styles.activePill}>
                <Text style={styles.activePillText}>Activo</Text>
              </View>
            ) : null}
          </Pressable>
        </View>

        {/* Security Section */}
        <Text style={styles.sectionHeading}>{t("driver.languageSecurity.securitySection")}</Text>

        <View style={styles.card}>
          {/* Change Password */}
          <Pressable
            style={styles.menuRow}
            onPress={() => router.push("/(app)/change-password" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.languageSecurity.changePasswordTitle")}
          >
            <View style={styles.menuIconWrap}>
              <LockIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <Text style={styles.menuTitle}>
                {t("driver.languageSecurity.changePasswordTitle")}
              </Text>
              <Text style={styles.menuDesc}>{t("driver.languageSecurity.changePasswordDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.divider} />

          {/* 2FA Status */}
          <Pressable
            style={styles.menuRow}
            onPress={() => setSecurityOverlayVisible(true)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.languageSecurity.twoFactorTitle")}
          >
            <View style={styles.menuIconWrap}>
              <ShieldIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <View style={styles.titleBadgeRow}>
                <Text style={styles.menuTitle}>{t("driver.languageSecurity.twoFactorTitle")}</Text>
                <View style={styles.activePillSmall}>
                  <Text style={styles.activePillTextSmall}>Active</Text>
                </View>
              </View>
              <Text style={styles.menuDesc}>{t("driver.languageSecurity.twoFactorDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.divider} />

          {/* Biometric */}
          <Pressable
            style={styles.menuRow}
            onPress={() => setSecurityOverlayVisible(true)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.languageSecurity.biometricTitle")}
          >
            <View style={styles.menuIconWrap}>
              <ShieldIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.menuTextCol}>
              <View style={styles.titleBadgeRow}>
                <Text style={styles.menuTitle}>{t("driver.languageSecurity.biometricTitle")}</Text>
                <View style={styles.activePillSmall}>
                  <Text style={styles.activePillTextSmall}>Configured</Text>
                </View>
              </View>
              <Text style={styles.menuDesc}>{t("driver.languageSecurity.biometricDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>
        </View>

        {/* View Security Details Button */}
        <Pressable
          style={styles.securityPreviewBtn}
          onPress={() => setSecurityOverlayVisible(true)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.languageSecurity.accountProtectionPreviewCta")}
        >
          <Text style={styles.securityPreviewBtnText}>
            {t("driver.languageSecurity.accountProtectionPreviewCta")}
          </Text>
        </Pressable>
      </ScrollView>

      {/* Account Protection Overlay */}
      <AccountProtectionOverlay
        visible={securityOverlayVisible}
        onClose={() => setSecurityOverlayVisible(false)}
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
    paddingBottom: spacing[8],
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: spacing[2],
    marginBottom: 4,
  },
  sectionSubheading: {
    fontSize: 12,
    color: "#8E9E99",
    marginBottom: spacing[3],
  },
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
    overflow: "hidden",
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing[4],
  },
  langLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: "#BAFF42",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
    backgroundColor: "#BAFF42",
  },
  langName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  activePill: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "#BAFF42",
  },
  activePillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#BAFF42",
    textTransform: "uppercase",
  },
  divider: {
    height: 1,
    backgroundColor: "#1C2A23",
    marginLeft: spacing[4],
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    gap: spacing[3],
  },
  menuIconWrap: {
    width: 38,
    height: 38,
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
  titleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  activePillSmall: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.full,
  },
  activePillTextSmall: {
    fontSize: 9,
    fontWeight: "800",
    color: "#BAFF42",
    textTransform: "uppercase",
  },
  menuDesc: {
    fontSize: 11,
    color: "#8E9E99",
    marginTop: 2,
  },
  securityPreviewBtn: {
    backgroundColor: "#16201B",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  securityPreviewBtnText: {
    color: "#BAFF42",
    fontSize: 14,
    fontWeight: "700",
  },
});
