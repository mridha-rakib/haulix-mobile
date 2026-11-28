import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckmarkIcon, HeadphonesIcon, InfoIcon } from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useSupportStore } from "../../src/stores/supportStore";

export default function RequestReceivedScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const params = useLocalSearchParams<{ ticketId?: string }>();
  const { lastTicket, getTicketById } = useSupportStore();

  const ticket = (params.ticketId ? getTicketById(params.ticketId) : null) || lastTicket;
  const ticketId = ticket?.ticketId || params.ticketId || "TKT-2026-8941";

  const handleReturnSupport = () => {
    router.push("/(app)/help-support" as Href);
  };

  const handleReturnHome = () => {
    router.push("/(app)/(tabs)" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.badgeCircle}>
            <CheckmarkIcon color="#0B0F0E" size={32} />
          </View>

          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>REQUEST QUEUED</Text>
          </View>

          <Text style={styles.title}>{t("driver.requestReceived.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.requestReceived.subtitle")}</Text>
        </View>

        {/* Ticket Reference Card */}
        <View style={styles.ticketCard}>
          <View style={styles.ticketRow}>
            <View style={styles.iconWrap}>
              <HeadphonesIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.ticketTextCol}>
              <Text style={styles.ticketLabel}>{t("driver.requestReceived.ticketRefLabel")}</Text>
              <Text style={styles.ticketIdText}>{ticketId}</Text>
            </View>
          </View>
        </View>

        {/* Notice Card */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeHeader}>
            <InfoIcon color="#BAFF42" size={18} />
            <Text style={styles.noticeTitle}>{t("driver.requestReceived.noticeTitle")}</Text>
          </View>
          <Text style={styles.noticeBody}>{t("driver.requestReceived.noticeBody")}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleReturnSupport}
            accessibilityRole="button"
            accessibilityLabel={t("driver.requestReceived.returnToSupportCta")}
          >
            <Text style={styles.primaryButtonText}>
              {t("driver.requestReceived.returnToSupportCta")}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleReturnHome}
            accessibilityRole="button"
            accessibilityLabel={t("driver.requestReceived.returnHomeCta")}
          >
            <Text style={styles.secondaryButtonText}>
              {t("driver.requestReceived.returnHomeCta")}
            </Text>
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
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
    paddingBottom: spacing[8],
  },
  heroSection: {
    alignItems: "center",
    marginBottom: spacing[6],
  },
  badgeCircle: {
    width: 68,
    height: 68,
    borderRadius: radius.full,
    backgroundColor: "#BAFF42",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  badgePill: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: "#BAFF42",
    marginBottom: spacing[3],
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E9E99",
    marginTop: 6,
    textAlign: "center",
  },
  ticketCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  ticketRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: "#16201B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  ticketTextCol: {
    flex: 1,
  },
  ticketLabel: {
    fontSize: 12,
    color: "#8E9E99",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  ticketIdText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#BAFF42",
    letterSpacing: 1,
    marginTop: 2,
  },
  noticeCard: {
    backgroundColor: "#142019",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22382B",
    marginBottom: spacing[6],
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: 6,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#BAFF42",
  },
  noticeBody: {
    fontSize: 13,
    color: "#D0D9D5",
    lineHeight: 18,
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
