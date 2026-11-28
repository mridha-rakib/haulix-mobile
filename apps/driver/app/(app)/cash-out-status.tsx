import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckmarkIcon, ClockTimerIcon } from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { formatCents, useWalletStore } from "../../src/stores/walletStore";

export default function CashOutStatusScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const params = useLocalSearchParams<{ txId?: string; status?: string }>();
  const { activeTransactionId, getTransactionById, getActiveWallet } = useWalletStore();

  const targetId = params.txId || activeTransactionId || "tx-po-01";
  const transaction = getTransactionById(targetId);
  const wallet = getActiveWallet();

  const isSuccess = params.status === "completed" || transaction?.status === "completed";
  const amountCents = transaction ? transaction.amountCents : wallet.availableBalanceCents;
  const feeCents = transaction ? transaction.feeCents : 1920;
  const netCents = transaction ? transaction.netCents : amountCents - feeCents;
  const destination =
    transaction?.destination ||
    `${wallet.payoutAccounts.instantDebitCard.cardBrand} ····${wallet.payoutAccounts.instantDebitCard.last4}`;
  const referenceId = transaction?.referenceId || "TX-PO-2026-0842";

  const handleBackToHome = () => {
    router.push("/(app)/(tabs)/home" as Href);
  };

  const handleViewHistory = () => {
    router.push("/(app)/payout-history" as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Status Header */}
        <View style={styles.heroSection}>
          <View style={[styles.badgeCircle, isSuccess && styles.badgeCircleSuccess]}>
            {isSuccess ? (
              <CheckmarkIcon color="#0B0F0E" size={32} />
            ) : (
              <ClockTimerIcon color="#0B0F0E" size={32} />
            )}
          </View>

          <View style={[styles.badgePill, isSuccess && styles.badgePillSuccess]}>
            <Text style={[styles.badgePillText, isSuccess && styles.badgePillTextSuccess]}>
              {isSuccess
                ? t("driver.cashOutStatus.badgeSuccess")
                : t("driver.cashOutStatus.badgeProcessing")}
            </Text>
          </View>

          <Text style={styles.title}>{t("driver.cashOutStatus.title")}</Text>
          <Text style={styles.subtitle}>
            {isSuccess
              ? t("driver.cashOutStatus.successNotice")
              : t("driver.cashOutStatus.statusNotice")}
          </Text>
        </View>

        {/* Transaction Summary Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t("driver.cashOutStatus.amountLabel")}</Text>
            <Text style={styles.rowValue}>{formatCents(amountCents)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t("driver.cashOutStatus.feeLabel")}</Text>
            <Text style={styles.rowValue}>
              {feeCents > 0 ? `-${formatCents(feeCents)}` : "$0.00"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.netLabel}>{t("driver.cashOutStatus.netLabel")}</Text>
            <Text style={styles.netValue}>{formatCents(netCents)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t("driver.cashOutStatus.methodLabel")}</Text>
            <Text style={styles.rowValueBold}>{destination}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t("driver.cashOutStatus.referenceLabel")}</Text>
            <Text style={styles.referenceText}>{referenceId}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleBackToHome}
            accessibilityRole="button"
            accessibilityLabel={t("driver.cashOutStatus.homeCta")}
          >
            <Text style={styles.primaryButtonText}>{t("driver.cashOutStatus.homeCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleViewHistory}
            accessibilityRole="button"
            accessibilityLabel={t("driver.cashOutStatus.historyCta")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.cashOutStatus.historyCta")}</Text>
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
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
  },
  heroSection: {
    alignItems: "center",
    marginBottom: spacing[6],
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
  badgeCircleSuccess: {
    backgroundColor: "#BAFF42",
  },
  badgePill: {
    backgroundColor: "#282313",
    borderWidth: 1,
    borderColor: "#55431A",
    paddingHorizontal: spacing[3],
    paddingVertical: 5,
    borderRadius: radius.full,
    marginBottom: spacing[2],
  },
  badgePillSuccess: {
    backgroundColor: "#192E24",
    borderColor: "#28523C",
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#E2B93B",
  },
  badgePillTextSuccess: {
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
    marginTop: 6,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: spacing[4],
  },
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[6],
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: "#8E9E99",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  rowValueBold: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  netLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  netValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#BAFF42",
  },
  referenceText: {
    fontSize: 12,
    fontFamily: "monospace",
    color: "#8E9E99",
  },
  divider: {
    height: 1,
    backgroundColor: "#22332B",
    marginVertical: spacing[2],
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
