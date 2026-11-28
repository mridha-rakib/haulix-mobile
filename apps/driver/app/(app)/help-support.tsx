import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ClockTimerIcon,
  MessageSquareIcon,
  PhoneIcon,
  ShieldIcon,
  WalletIcon,
} from "../../src/components/icons/DriverIcons";
import { EmergencyContactOverlay } from "../../src/components/overlays/EmergencyContactOverlay";
import { useDriverTranslation } from "../../src/i18n";

export default function HelpSupportScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const params = useLocalSearchParams<{ overlay?: string }>();
  const [emergencyOverlayVisible, setEmergencyOverlayVisible] = useState(params.overlay === "ov04");

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/profile" as Href);
    }
  };

  const handleCallDispatcher = () => {
    Linking.openURL("tel:18005554285").catch(() => {});
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
          <Text style={styles.headerTitle}>{t("driver.helpSupport.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.helpSupport.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Urgent Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyTopRow}>
            <View style={styles.emergencyIconWrap}>
              <AlertTriangleIcon color="#FFFFFF" size={20} />
            </View>
            <View style={styles.emergencyTextCol}>
              <Text style={styles.emergencyTitle}>
                {t("driver.helpSupport.urgentAssistanceTitle")}
              </Text>
              <Text style={styles.emergencyDesc}>
                {t("driver.helpSupport.urgentAssistanceDesc")}
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.emergencyCtaBtn}
            onPress={() => setEmergencyOverlayVisible(true)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helpSupport.urgentCta")}
          >
            <Text style={styles.emergencyCtaBtnText}>{t("driver.helpSupport.urgentCta")}</Text>
          </Pressable>
        </View>

        {/* Support Topics Heading */}
        <Text style={styles.sectionHeading}>Browse Help Topics</Text>

        {/* Topic 1: Job & Transit Issues */}
        <View style={styles.topicSection}>
          <Pressable
            style={styles.topicRow}
            onPress={() => router.push("/(app)/contact-support?category=job" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helpSupport.topicJobIssue")}
          >
            <View style={styles.topicIconWrap}>
              <ClockTimerIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.topicTextCol}>
              <Text style={styles.topicTitle}>{t("driver.helpSupport.topicJobIssue")}</Text>
              <Text style={styles.topicDesc}>{t("driver.helpSupport.topicJobIssueDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.topicDivider} />

          {/* Topic 2: Earnings & Payouts */}
          <Pressable
            style={styles.topicRow}
            onPress={() => router.push("/(app)/contact-support?category=payment" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helpSupport.topicPayments")}
          >
            <View style={styles.topicIconWrap}>
              <WalletIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.topicTextCol}>
              <Text style={styles.topicTitle}>{t("driver.helpSupport.topicPayments")}</Text>
              <Text style={styles.topicDesc}>{t("driver.helpSupport.topicPaymentsDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>

          <View style={styles.topicDivider} />

          {/* Topic 3: Account & Verification */}
          <Pressable
            style={styles.topicRow}
            onPress={() => router.push("/(app)/contact-support?category=account" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helpSupport.topicVerification")}
          >
            <View style={styles.topicIconWrap}>
              <ShieldIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.topicTextCol}>
              <Text style={styles.topicTitle}>{t("driver.helpSupport.topicVerification")}</Text>
              <Text style={styles.topicDesc}>{t("driver.helpSupport.topicVerificationDesc")}</Text>
            </View>
            <ChevronRightIcon color="#8E9E99" size={18} />
          </Pressable>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("/(app)/contact-support" as Href)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helpSupport.contactSupportCta")}
          >
            <MessageSquareIcon color="#0B0F0E" size={18} />
            <Text style={styles.primaryButtonText}>
              {t("driver.helpSupport.contactSupportCta")}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleCallDispatcher}
            accessibilityRole="button"
            accessibilityLabel={t("driver.helpSupport.callDispatcherCta")}
          >
            <PhoneIcon color="#BAFF42" size={18} />
            <Text style={styles.secondaryButtonText}>
              {t("driver.helpSupport.callDispatcherCta")} (1-800-555-HAUL)
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Emergency Overlay */}
      <EmergencyContactOverlay
        visible={emergencyOverlayVisible}
        onClose={() => setEmergencyOverlayVisible(false)}
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
  emergencyBanner: {
    backgroundColor: "rgba(239, 68, 68, 0.12)",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#EF4444",
    marginBottom: spacing[4],
  },
  emergencyTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[3],
    marginBottom: spacing[3],
  },
  emergencyIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  emergencyTextCol: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#EF4444",
  },
  emergencyDesc: {
    fontSize: 12,
    color: "#D0D9D5",
    marginTop: 3,
    lineHeight: 16,
  },
  emergencyCtaBtn: {
    backgroundColor: "#EF4444",
    borderRadius: radius.full,
    paddingVertical: 12,
    alignItems: "center",
  },
  emergencyCtaBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: spacing[2],
  },
  topicSection: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
    overflow: "hidden",
  },
  topicRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing[4],
    gap: spacing[3],
  },
  topicIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: "#16201B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  topicTextCol: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  topicDesc: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
    lineHeight: 16,
  },
  topicDivider: {
    height: 1,
    backgroundColor: "#1C2A23",
    marginLeft: spacing[4] + 40 + spacing[3],
  },
  actionContainer: {
    gap: spacing[3],
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 14,
    gap: spacing[2],
  },
  primaryButtonText: {
    color: "#0B0F0E",
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16201B",
    borderRadius: radius.full,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#24342C",
    gap: spacing[2],
  },
  secondaryButtonText: {
    color: "#BAFF42",
    fontSize: 14,
    fontWeight: "700",
  },
});
