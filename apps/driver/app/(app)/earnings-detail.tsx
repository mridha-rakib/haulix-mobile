import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  ClockTimerIcon,
  InfoIcon,
  StarIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import {
  calculateFareCommissionBreakdown,
  formatCents,
  useWalletStore,
} from "../../src/stores/walletStore";

export default function EarningsDetailScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const params = useLocalSearchParams<{ jobId?: string }>();
  const { getActiveWallet } = useWalletStore();
  const wallet = getActiveWallet();

  // Find job in recentJobs or fallback
  const jobRecord = params.jobId
    ? wallet.recentJobs.find((j) => j.jobId === params.jobId)
    : wallet.recentJobs[0];

  const subtotalCents = jobRecord ? jobRecord.subtotalCents : 12000;
  const tipCents = jobRecord ? jobRecord.tipCents : 2000;
  const isDisputeHeld = jobRecord?.status === "dispute_hold";

  const breakdown = calculateFareCommissionBreakdown(subtotalCents, tipCents, 1);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/earnings" as Href);
    }
  };

  const handleCashOut = () => {
    router.push("/(app)/cash-out-methods" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Back to earnings"
        >
          <ArrowLeftIcon color="#FFFFFF" size={24} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>{t("driver.earningsDetail.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.earningsDetail.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Breakdown Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t("driver.earningsDetail.breakdownTitle")}</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t("driver.earningsDetail.subtotalRow")}</Text>
            <Text style={styles.rowValue}>{formatCents(breakdown.subtotalCents)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabelNegative}>{t("driver.earningsDetail.commissionRow")}</Text>
            <Text style={styles.rowValueNegative}>-{formatCents(breakdown.platformFeeCents)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabelHighlight}>{t("driver.earningsDetail.workerPoolRow")}</Text>
            <Text style={styles.rowValueHighlight}>{formatCents(breakdown.workerPoolCents)}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.tipLabelRow}>
              <StarIcon color="#BAFF42" size={14} />
              <Text style={styles.tipLabel}>{t("driver.earningsDetail.tipRow")}</Text>
            </View>
            <Text style={styles.tipValue}>+{formatCents(breakdown.tipCents)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t("driver.earningsDetail.totalPayable")}</Text>
            <Text style={styles.totalValue}>{formatCents(breakdown.totalNetCents)}</Text>
          </View>
        </View>

        {/* Regulatory & Split Notice */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeRow}>
            <InfoIcon color="#BAFF42" size={16} />
            <Text style={styles.noticeTitle}>{t("driver.earningsDetail.regulatoryNote")}</Text>
          </View>
          <Text style={styles.noticeBody}>{t("driver.earningsDetail.crewSplitNote")}</Text>
        </View>

        {/* Review & Settlement Status */}
        <View style={[styles.statusCard, isDisputeHeld && styles.disputeCard]}>
          <View style={styles.statusHeaderRow}>
            {isDisputeHeld ? (
              <AlertTriangleIcon color="#EF4444" size={18} />
            ) : (
              <ClockTimerIcon color="#BAFF42" size={18} />
            )}
            <Text style={[styles.statusTitle, isDisputeHeld && styles.disputeTitle]}>
              {isDisputeHeld ? "Dispute Hold Active" : t("driver.earningsDetail.statusLabel")}
            </Text>
          </View>
          <Text style={styles.statusBody}>
            {isDisputeHeld
              ? "This payout is temporarily held for customer review / dispute resolution. Support will contact you if additional documentation is required."
              : "Held under 24-hour review window. Direct deposit and instant cash-out will be unlocked upon final customer review completion."}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleCashOut}
            accessibilityRole="button"
            accessibilityLabel={t("driver.earningsDetail.cashOutCta")}
          >
            <Text style={styles.primaryButtonText}>{t("driver.earningsDetail.cashOutCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel={t("driver.earningsDetail.returnCta")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.earningsDetail.returnCta")}</Text>
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
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: spacing[4],
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: "#D0D9D5",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  rowLabelNegative: {
    fontSize: 14,
    color: "#FF8E8E",
  },
  rowValueNegative: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF8E8E",
  },
  rowLabelHighlight: {
    fontSize: 14,
    fontWeight: "600",
    color: "#BAFF42",
  },
  rowValueHighlight: {
    fontSize: 14,
    fontWeight: "700",
    color: "#BAFF42",
  },
  tipLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tipLabel: {
    fontSize: 14,
    color: "#BAFF42",
    fontWeight: "600",
  },
  tipValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#BAFF42",
  },
  divider: {
    height: 1,
    backgroundColor: "#22332B",
    marginVertical: spacing[3],
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#BAFF42",
  },
  noticeCard: {
    backgroundColor: "#131E18",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#243B2E",
    marginBottom: spacing[4],
  },
  noticeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: 4,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#BAFF42",
  },
  noticeBody: {
    fontSize: 12,
    color: "#8E9E99",
  },
  statusCard: {
    backgroundColor: "#111815",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  statusHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: 6,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statusBody: {
    fontSize: 12,
    color: "#8E9E99",
    lineHeight: 16,
  },
  disputeCard: {
    borderColor: "#EF4444",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
  },
  disputeTitle: {
    color: "#EF4444",
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
