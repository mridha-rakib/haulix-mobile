import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CheckmarkIcon,
  ClockTimerIcon,
  InfoIcon,
  StarIcon,
  WalletIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useCompletionEvidenceStore } from "../../src/stores/completionEvidenceStore";

export default function JobCompletedScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { activeJobId, getCompletionRecord } = useCompletionEvidenceStore();
  const record = getCompletionRecord(activeJobId);

  const handleViewEarnings = () => {
    router.push("/(app)/(tabs)/earnings" as Href);
  };

  const handleMyJobs = () => {
    router.push("/(app)/(tabs)/jobs" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Success Celebration Header */}
        <View style={styles.heroSection}>
          <View style={styles.badgeCircle}>
            <CheckmarkIcon color="#0B0F0E" size={32} />
          </View>

          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>
              {t("driver.jobCompleted.badgeEvidenceReceived")}
            </Text>
          </View>

          <Text style={styles.title}>{t("driver.jobCompleted.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.jobCompleted.subtitle")}</Text>
        </View>

        {/* Notice Banner: Evidence received · final payout pending */}
        <View style={styles.pendingNoticeBanner}>
          <ClockTimerIcon color="#BAFF42" size={18} />
          <Text style={styles.pendingNoticeText}>
            {t("driver.jobCompleted.payoutPendingNotice")}
          </Text>
        </View>

        {/* Card 1: Earnings Calculation */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardIconWrap}>
              <WalletIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>
                {t("driver.jobCompleted.earningsCalculationTitle")}
              </Text>
              <Text style={styles.cardSubtitle}>
                {t("driver.jobCompleted.earningsCalculationDesc")}
              </Text>
            </View>
            <Text style={styles.earningsAmount}>${record.finalEarningsEstimate.toFixed(2)}</Text>
          </View>
        </View>

        {/* Card 2: Tips & Add-ons */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardIconWrap}>
              <StarIcon color="#BAFF42" size={18} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{t("driver.jobCompleted.tipsTitle")}</Text>
              <Text style={styles.cardSubtitle}>{t("driver.jobCompleted.tipsDesc")}</Text>
            </View>
            <Text style={styles.tipsAmount}>+${record.tipsAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Review Window & Non-payment preview notice */}
        <View style={styles.reviewWindowCard}>
          <View style={styles.reviewHeaderRow}>
            <InfoIcon color="#BAFF42" size={18} />
            <Text style={styles.reviewHeaderTitle}>24-Hour Review Window Policy</Text>
          </View>
          <Text style={styles.reviewBodyText}>{t("driver.jobCompleted.reviewWindowNotice")}</Text>
          <View style={styles.nonPaymentBox}>
            <Text style={styles.nonPaymentText}>{t("driver.jobCompleted.nonPaymentNotice")}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            accessibilityLabel={t("driver.jobCompleted.viewEarningsCta")}
            accessibilityRole="button"
            onPress={handleViewEarnings}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>{t("driver.jobCompleted.viewEarningsCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("driver.jobCompleted.myJobsCta")}
            accessibilityRole="button"
            onPress={handleMyJobs}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.jobCompleted.myJobsCta")}</Text>
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
    paddingTop: spacing[4],
    paddingBottom: spacing[8],
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
    fontSize: 26,
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
    fontSize: 13,
    fontWeight: "700",
    color: "#BAFF42",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#151A19",
    borderColor: "#24332F",
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: "#1C2422",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
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
    color: "#8E9E99",
    marginTop: 2,
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#BAFF42",
    marginLeft: spacing[2],
  },
  tipsAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E5E7EB",
    marginLeft: spacing[2],
  },
  reviewWindowCard: {
    backgroundColor: "#141918",
    borderColor: "#24332F",
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[3],
    marginTop: spacing[2],
    marginBottom: spacing[5],
  },
  reviewHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  reviewHeaderTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BAFF42",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  reviewBodyText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8E9E99",
    marginBottom: spacing[2],
  },
  nonPaymentBox: {
    backgroundColor: "#1D2623",
    borderRadius: radius.md,
    paddingVertical: 6,
    paddingHorizontal: spacing[2],
  },
  nonPaymentText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#D1D5DB",
    textAlign: "center",
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
