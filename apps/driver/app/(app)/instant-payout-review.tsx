import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  CreditCardIcon,
  InfoIcon,
  ZapIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { formatCents, useWalletStore } from "../../src/stores/walletStore";

export default function InstantPayoutReviewScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { activeRole, getActiveWallet, getInstantFeeQuote, requestInstantCashOut } =
    useWalletStore();
  const wallet = getActiveWallet();

  const requestedCents = wallet.availableBalanceCents;
  const { feeCents, netCents } = getInstantFeeQuote(requestedCents);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/cash-out-methods" as Href);
    }
  };

  const handleUseStandard = () => {
    router.push("/(app)/standard-bank-cashout" as Href);
  };

  const handleConfirmTransfer = () => {
    const tx = requestInstantCashOut(activeRole, requestedCents);
    router.push(`/(app)/cash-out-status?txId=${tx.id}` as Href);
  };

  const debitCard = wallet.payoutAccounts.instantDebitCard;

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
          <Text style={styles.headerTitle}>{t("driver.instantPayoutReview.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.instantPayoutReview.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Breakdown Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{t("driver.instantPayoutReview.requestedAmount")}</Text>
            <Text style={styles.rowValue}>{formatCents(requestedCents)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabelNegative}>
              {t("driver.instantPayoutReview.providerFeeRow")}
            </Text>
            <Text style={styles.rowValueNegative}>-{formatCents(feeCents)}</Text>
          </View>

          <View style={styles.feeNoticeBox}>
            <InfoIcon color="#BAFF42" size={14} />
            <Text style={styles.feeNoticeText}>{t("driver.instantPayoutReview.feeNotice")}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.netRow}>
            <Text style={styles.netLabel}>
              {t("driver.instantPayoutReview.netAmountEmphasized")}
            </Text>
            <Text style={styles.netValue}>{formatCents(netCents)}</Text>
          </View>
        </View>

        {/* Transfer Destination Card */}
        <View style={styles.destCard}>
          <View style={styles.destRow}>
            <View style={styles.iconWrap}>
              <CreditCardIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.destCol}>
              <Text style={styles.destLabel}>{t("driver.instantPayoutReview.destinationRow")}</Text>
              <Text style={styles.destValue}>
                {debitCard.cardBrand} ending in {debitCard.last4}
              </Text>
            </View>
          </View>

          <View style={styles.arrivalRow}>
            <ZapIcon color="#BAFF42" size={16} />
            <Text style={styles.arrivalLabel}>{t("driver.instantPayoutReview.arrivalRow")}:</Text>
            <Text style={styles.arrivalValue}>
              {t("driver.instantPayoutReview.arrivalEstimate")}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleConfirmTransfer}
            accessibilityRole="button"
            accessibilityLabel={t("driver.instantPayoutReview.confirmCta")}
          >
            <Text style={styles.primaryButtonText}>
              {t("driver.instantPayoutReview.confirmCta")}
            </Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleUseStandard}
            accessibilityRole="button"
            accessibilityLabel={t("driver.instantPayoutReview.useStandardCta")}
          >
            <Text style={styles.secondaryButtonText}>
              {t("driver.instantPayoutReview.useStandardCta")}
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
  rowLabelNegative: {
    fontSize: 14,
    color: "#FF8E8E",
  },
  rowValueNegative: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF8E8E",
  },
  feeNoticeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    backgroundColor: "#131E18",
    padding: spacing[2],
    borderRadius: radius.md,
    marginTop: spacing[2],
  },
  feeNoticeText: {
    fontSize: 11,
    color: "#8E9E99",
  },
  divider: {
    height: 1,
    backgroundColor: "#22332B",
    marginVertical: spacing[3],
  },
  netRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  netLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  netValue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#BAFF42",
  },
  destCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[6],
  },
  destRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "#192E24",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  destCol: {
    flex: 1,
  },
  destLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E9E99",
    letterSpacing: 0.5,
  },
  destValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },
  arrivalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#151F1A",
    padding: spacing[2],
    borderRadius: radius.md,
  },
  arrivalLabel: {
    fontSize: 12,
    color: "#8E9E99",
  },
  arrivalValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BAFF42",
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
