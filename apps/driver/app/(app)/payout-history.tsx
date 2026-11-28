import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  BankIcon,
  ChevronRightIcon,
  DownloadIcon,
  ZapIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { formatCents, type PayoutTransaction, useWalletStore } from "../../src/stores/walletStore";

type FilterTab = "all" | "completed" | "processing" | "failed";

function TransactionRow({
  tx,
  onPress,
  failureCtaLabel,
}: {
  tx: PayoutTransaction;
  onPress: () => void;
  failureCtaLabel: string;
}) {
  const isFailed = tx.status === "failed";
  const isCompleted = tx.status === "completed";
  const isInstant = tx.method === "instant_card";

  const badgeBg = isFailed ? "#2A1414" : isCompleted ? "#192E24" : "#282313";
  const badgeBorder = isFailed ? "#662828" : isCompleted ? "#28523C" : "#55431A";
  const badgeText = isFailed ? "#FF5C5C" : isCompleted ? "#BAFF42" : "#E2B93B";

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Payout ${formatCents(tx.netCents)}, ${tx.status}`}
    >
      <View style={styles.cardTop}>
        <View style={styles.iconWrap}>
          {isInstant ? (
            <ZapIcon color="#BAFF42" size={18} />
          ) : (
            <BankIcon color="#BAFF42" size={18} />
          )}
        </View>
        <View style={styles.metaCol}>
          <Text style={styles.destinationText}>{tx.destination}</Text>
          <Text style={styles.refText}>{tx.referenceId}</Text>
        </View>
        <View style={styles.amountCol}>
          <Text style={[styles.amountText, isFailed && styles.amountTextFailed]}>
            {formatCents(tx.netCents)}
          </Text>
          <View
            style={[styles.statusBadge, { backgroundColor: badgeBg, borderColor: badgeBorder }]}
          >
            <Text style={[styles.statusBadgeText, { color: badgeText }]}>
              {tx.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {isFailed ? (
        <View style={styles.failureRow}>
          <Text style={styles.failureReason}>{tx.failureReason}</Text>
          <View style={styles.viewFailureAction}>
            <Text style={styles.viewFailureText}>{failureCtaLabel}</Text>
            <ChevronRightIcon color="#FF5C5C" size={14} />
          </View>
        </View>
      ) : null}
    </Pressable>
  );
}

export default function PayoutHistoryScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { getActiveWallet } = useWalletStore();
  const wallet = getActiveWallet();
  const [filter, setFilter] = useState<FilterTab>("all");

  const filteredTransactions = wallet.transactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.status === filter;
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/earnings" as Href);
    }
  };

  const handleSelectTransaction = (tx: PayoutTransaction) => {
    if (tx.status === "failed") {
      router.push(`/(app)/payout-failed?txId=${tx.id}` as Href);
    } else {
      router.push(`/(app)/cash-out-status?txId=${tx.id}&status=${tx.status}` as Href);
    }
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
          <Text style={styles.headerTitle}>{t("driver.payoutHistory.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.payoutHistory.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Filter Chips */}
        <View style={styles.filterRow}>
          {(["all", "completed", "processing", "failed"] as const).map((tab) => {
            const isActive = filter === tab;
            const labelMap: Record<FilterTab, string> = {
              all: t("driver.payoutHistory.filterAll"),
              completed: t("driver.payoutHistory.filterCompleted"),
              processing: t("driver.payoutHistory.filterProcessing"),
              failed: t("driver.payoutHistory.filterFailed"),
            };

            return (
              <Pressable
                key={tab}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setFilter(tab)}
                accessibilityRole="button"
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {labelMap[tab]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Transactions List */}
        <View style={styles.list}>
          {filteredTransactions.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>{t("driver.payoutHistory.emptyHistory")}</Text>
            </View>
          ) : (
            filteredTransactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                tx={tx}
                onPress={() => handleSelectTransaction(tx)}
                failureCtaLabel={t("driver.payoutHistory.viewFailureCta")}
              />
            ))
          )}
        </View>

        {/* Export Statement CTA */}
        <Pressable
          style={styles.exportButton}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel={t("driver.payoutHistory.exportCta")}
        >
          <DownloadIcon color="#FFFFFF" size={16} />
          <Text style={styles.exportButtonText}>{t("driver.payoutHistory.exportCta")}</Text>
        </Pressable>
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
  filterRow: {
    flexDirection: "row",
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  filterChip: {
    paddingVertical: 7,
    paddingHorizontal: spacing[3],
    borderRadius: radius.full,
    backgroundColor: "#16201B",
    borderWidth: 1,
    borderColor: "#24342C",
  },
  filterChipActive: {
    backgroundColor: "#22332A",
    borderColor: "#28523C",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E9E99",
  },
  filterChipTextActive: {
    color: "#BAFF42",
    fontWeight: "700",
  },
  list: {
    gap: spacing[3],
    marginBottom: spacing[6],
  },
  emptyCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[6],
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#22332B",
  },
  emptyText: {
    color: "#8E9E99",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: "#192E24",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  metaCol: {
    flex: 1,
  },
  destinationText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  refText: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
    fontFamily: "monospace",
  },
  amountCol: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  amountTextFailed: {
    color: "#FF8E8E",
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
  failureRow: {
    marginTop: spacing[3],
    paddingTop: spacing[3],
    borderTopWidth: 1,
    borderColor: "#2A1414",
  },
  failureReason: {
    fontSize: 12,
    color: "#FF8E8E",
    marginBottom: 4,
  },
  viewFailureAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewFailureText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF5C5C",
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    backgroundColor: "#16201B",
    borderRadius: radius.full,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#24342C",
  },
  exportButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
