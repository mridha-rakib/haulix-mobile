import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BankIcon,
  ChevronRightIcon,
  ClockTimerIcon,
  ReceiptIcon,
  StarIcon,
} from "../../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../../src/i18n";
import {
  formatCents,
  type JobActivityRecord,
  useWalletStore,
} from "../../../src/stores/walletStore";

function ActivityRow({ item, onPress }: { item: JobActivityRecord; onPress: () => void }) {
  const isAvailable = item.status === "available";
  const isDispute = item.status === "dispute_hold";

  const statusColor = isDispute ? "#FF5C5C" : isAvailable ? "#BAFF42" : "#E2B93B";
  const statusBg = isDispute ? "#2A1414" : isAvailable ? "#192E24" : "#282313";
  const statusBorder = isDispute ? "#662828" : isAvailable ? "#28523C" : "#55431A";

  const statusLabel = isDispute ? "Dispute Hold" : isAvailable ? "Available" : "Pending Review";

  return (
    <Pressable
      style={styles.activityRow}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.jobTitle}, ${formatCents(item.netPayableCents)}`}
    >
      <View style={styles.activityLeft}>
        <Text style={styles.activityTitle}>{item.jobTitle}</Text>
        <Text style={styles.activityMeta}>
          {item.jobId} · {item.date}
        </Text>
      </View>

      <View style={styles.activityRight}>
        <Text style={styles.activityAmount}>+{formatCents(item.netPayableCents)}</Text>
        <View
          style={[styles.statusBadge, { backgroundColor: statusBg, borderColor: statusBorder }]}
        >
          <Text style={[styles.statusBadgeText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function EarningsScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { getActiveWallet } = useWalletStore();
  const wallet = getActiveWallet();

  const handleCashOutNow = () => {
    router.push("/(app)/cash-out-methods" as Href);
  };

  const handleViewBreakdown = () => {
    router.push("/(app)/earnings-detail" as Href);
  };

  const handlePayoutHistory = () => {
    router.push("/(app)/payout-history" as Href);
  };

  const handlePayoutAccount = () => {
    router.push("/(app)/payout-account" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t("driver.earningsOverview.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.earningsOverview.subtitle")}</Text>
        </View>
        <View style={styles.headerIcons}>
          <Pressable
            onPress={handlePayoutHistory}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={t("driver.earningsOverview.payoutHistoryCta")}
          >
            <ReceiptIcon color="#BAFF42" size={20} />
          </Pressable>
          <Pressable
            onPress={handlePayoutAccount}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={t("driver.earningsOverview.payoutAccountCta")}
          >
            <BankIcon color="#BAFF42" size={20} />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Card: Available Balance */}
        <View style={styles.heroCard}>
          <Text style={styles.availableLabel}>{t("driver.earningsOverview.availableLabel")}</Text>
          <Text style={styles.availableAmount}>{formatCents(wallet.availableBalanceCents)}</Text>
          <Text style={styles.completedJobsText}>
            {t("driver.earningsOverview.completedJobsSummary")}
          </Text>

          <View style={styles.heroActions}>
            <Pressable
              style={styles.cashOutButton}
              onPress={handleCashOutNow}
              accessibilityRole="button"
              accessibilityLabel={t("driver.earningsOverview.cashOutCta")}
            >
              <Text style={styles.cashOutButtonText}>
                {t("driver.earningsOverview.cashOutCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.breakdownButton}
              onPress={handleViewBreakdown}
              accessibilityRole="button"
              accessibilityLabel={t("driver.earningsOverview.viewDetailsCta")}
            >
              <Text style={styles.breakdownButtonText}>
                {t("driver.earningsOverview.viewDetailsCta")}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Pending Review Ledger Card */}
        <View style={styles.pendingCard}>
          <View style={styles.pendingHeaderRow}>
            <ClockTimerIcon color="#BAFF42" size={18} />
            <Text style={styles.pendingTitle}>{t("driver.earningsOverview.pendingNotice")}</Text>
            <Text style={styles.pendingAmount}>{formatCents(wallet.pendingBalanceCents)}</Text>
          </View>
          <Text style={styles.pendingDesc}>{t("driver.earningsOverview.pendingDesc")}</Text>

          <View style={styles.tipCallout}>
            <StarIcon color="#BAFF42" size={14} />
            <Text style={styles.tipCalloutText}>{t("driver.earningsOverview.tipCallout")}</Text>
          </View>
        </View>

        {/* Quick Links Row */}
        <View style={styles.quickLinks}>
          <Pressable
            style={styles.linkCard}
            onPress={handlePayoutHistory}
            accessibilityRole="button"
            accessibilityLabel={t("driver.earningsOverview.payoutHistoryCta")}
          >
            <ReceiptIcon color="#BAFF42" size={18} />
            <Text style={styles.linkCardText}>{t("driver.earningsOverview.payoutHistoryCta")}</Text>
            <ChevronRightIcon color="#8E9E99" size={16} />
          </Pressable>

          <Pressable
            style={styles.linkCard}
            onPress={handlePayoutAccount}
            accessibilityRole="button"
            accessibilityLabel={t("driver.earningsOverview.payoutAccountCta")}
          >
            <BankIcon color="#BAFF42" size={18} />
            <Text style={styles.linkCardText}>{t("driver.earningsOverview.payoutAccountCta")}</Text>
            <ChevronRightIcon color="#8E9E99" size={16} />
          </Pressable>
        </View>

        {/* Recent Activity Section */}
        <Text style={styles.sectionHeader}>{t("driver.earningsOverview.recentActivityTitle")}</Text>

        <View style={styles.activityList}>
          {wallet.recentJobs.map((item) => (
            <ActivityRow key={item.id} item={item} onPress={handleViewBreakdown} />
          ))}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: "row",
    gap: spacing[2],
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "#16201B",
    borderWidth: 1,
    borderColor: "#24342C",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
  },
  heroCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  availableLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#BAFF42",
    marginBottom: 4,
  },
  availableAmount: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.6,
  },
  completedJobsText: {
    fontSize: 13,
    color: "#8E9E99",
    marginTop: 4,
    marginBottom: spacing[4],
  },
  heroActions: {
    gap: spacing[2],
  },
  cashOutButton: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
  },
  cashOutButtonText: {
    color: "#0B0F0E",
    fontSize: 15,
    fontWeight: "800",
  },
  breakdownButton: {
    backgroundColor: "#19241E",
    borderRadius: radius.full,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#283A30",
  },
  breakdownButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  pendingCard: {
    backgroundColor: "#131E18",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#243B2E",
    marginBottom: spacing[4],
  },
  pendingHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: 4,
  },
  pendingTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#BAFF42",
  },
  pendingAmount: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  pendingDesc: {
    fontSize: 12,
    color: "#8E9E99",
    lineHeight: 16,
    marginBottom: spacing[2],
  },
  tipCallout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1B2A22",
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    borderRadius: radius.sm,
    alignSelf: "flex-start",
  },
  tipCalloutText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#BAFF42",
  },
  quickLinks: {
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  linkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111815",
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    borderWidth: 1,
    borderColor: "#22332B",
    gap: spacing[3],
  },
  linkCardText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: spacing[3],
  },
  activityList: {
    gap: spacing[2],
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111815",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22332B",
  },
  activityLeft: {
    flex: 1,
    marginRight: spacing[2],
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  activityMeta: {
    fontSize: 12,
    color: "#8E9E99",
  },
  activityRight: {
    alignItems: "flex-end",
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
