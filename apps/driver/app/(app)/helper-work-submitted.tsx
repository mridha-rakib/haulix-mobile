import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckmarkIcon, ClockTimerIcon, WalletIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";

export default function HelperWorkSubmittedScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();

  // Helper payable share estimate calculation (e.g. $45.00)
  const helperShareEstimate = 45.0;

  const handleBackHome = () => {
    router.push("/(app)/(tabs)" as Href);
  };

  const handleViewEarnings = () => {
    router.push("/(app)/(tabs)/earnings" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Success Header */}
        <View style={styles.heroSection}>
          <View style={styles.badgeCircle}>
            <CheckmarkIcon color="#0B0F0E" size={32} />
          </View>

          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>
              {t("driver.helperWorkSubmitted.badgeSubmitted")}
            </Text>
          </View>

          <Text style={styles.title}>{t("driver.helperWorkSubmitted.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.helperWorkSubmitted.subtitle")}</Text>
        </View>

        {/* Notice Banner: Individual proof submitted · overall job completion pending */}
        <View style={styles.pendingNoticeBanner}>
          <ClockTimerIcon color="#BAFF42" size={18} />
          <Text style={styles.pendingNoticeText}>
            {t("driver.helperWorkSubmitted.awaitingFinalizationNotice")}
          </Text>
        </View>

        {/* Payable Share Disclosure Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconWrap}>
              <WalletIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>
                {t("driver.helperWorkSubmitted.payableShareTitle")}
              </Text>
              <Text style={styles.cardSubtitle}>
                {t("driver.helperWorkSubmitted.payableShareDesc")}
              </Text>
            </View>
          </View>

          <View style={styles.shareAmountBox}>
            <Text style={styles.shareAmountLabel}>Estimated Payable Share</Text>
            <Text style={styles.shareAmountValue}>${helperShareEstimate.toFixed(2)}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            accessibilityLabel={t("driver.helperWorkSubmitted.backHomeCta")}
            accessibilityRole="button"
            onPress={handleBackHome}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {t("driver.helperWorkSubmitted.backHomeCta")}
            </Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("driver.helperWorkSubmitted.viewEarningsCta")}
            accessibilityRole="button"
            onPress={handleViewEarnings}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {t("driver.helperWorkSubmitted.viewEarningsCta")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Master Bottom Navigation - Jobs Active */}
      <DriverBottomNav activeTab="jobs" />
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
    paddingTop: spacing[4],
    paddingBottom: 100,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: spacing[5],
    marginTop: spacing[2],
  },
  badgeCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: "#BAFF42",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  badgePill: {
    backgroundColor: "#192E24",
    borderWidth: 1,
    borderColor: "#28523C",
    paddingHorizontal: spacing[3],
    paddingVertical: 5,
    borderRadius: radius.full,
    marginBottom: spacing[2],
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#BAFF42",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#8E9E99",
    marginTop: 4,
    textAlign: "center",
  },
  pendingNoticeBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#131E18",
    borderWidth: 1,
    borderColor: "#254231",
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    marginBottom: spacing[4],
    gap: spacing[2],
  },
  pendingNoticeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BAFF42",
    textAlign: "center",
    flex: 1,
  },
  card: {
    backgroundColor: "#151A19",
    borderColor: "#24332F",
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing[4],
    marginBottom: spacing[5],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing[3],
  },
  cardIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: "#1C2422",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
    marginTop: 2,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8E9E99",
    marginTop: 4,
  },
  shareAmountBox: {
    backgroundColor: "#0F1413",
    borderWidth: 1,
    borderColor: "#1E2A27",
    borderRadius: radius.lg,
    padding: spacing[3],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing[2],
  },
  shareAmountLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E9E99",
  },
  shareAmountValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#BAFF42",
  },
  actionContainer: {
    gap: spacing[3],
  },
  primaryButton: {
    backgroundColor: "#BAFF42",
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0B0F0E",
    letterSpacing: 0.2,
  },
  secondaryButton: {
    backgroundColor: "#151A19",
    borderColor: "#24332F",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
