import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlertCircleIcon, ArrowLeftIcon, InfoIcon } from "../../src/components/icons/DriverIcons";
import { PayoutMethodOverlay } from "../../src/components/overlays/PayoutMethodOverlay";
import { useDriverTranslation } from "../../src/i18n";
import { formatCents, useWalletStore } from "../../src/stores/walletStore";

export default function PayoutFailedScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const params = useLocalSearchParams<{ txId?: string }>();
  const { activeRole, getTransactionById, retryFailedPayout } = useWalletStore();
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const targetTx = getTransactionById(params.txId || "tx-po-03");
  const amount = targetTx ? formatCents(targetTx.amountCents) : "$850.00";
  const reason =
    targetTx?.failureReason || "Bank transfer declined: Invalid routing or closed account";
  const refId = targetTx?.referenceId || "TX-PO-2026-0599";

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/payout-history" as Href);
    }
  };

  const handleRetry = () => {
    if (targetTx) {
      retryFailedPayout(activeRole, targetTx.id);
    }
    router.push("/(app)/cash-out-status" as Href);
  };

  const handleReturnEarnings = () => {
    router.push("/(app)/(tabs)/earnings" as Href);
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
          <Text style={styles.headerTitle}>{t("driver.payoutFailed.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.payoutFailed.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Error Hero */}
        <View style={styles.heroSection}>
          <View style={styles.badgeCircle}>
            <AlertCircleIcon color="#FF5C5C" size={32} />
          </View>

          <View style={styles.badgePill}>
            <Text style={styles.badgePillText}>{t("driver.payoutFailed.badgeFailed")}</Text>
          </View>

          <Text style={styles.title}>{t("driver.payoutFailed.title")}</Text>
          <Text style={styles.amountText}>{amount}</Text>
          <Text style={styles.refText}>{refId}</Text>
        </View>

        {/* Explanation Card */}
        <View style={styles.card}>
          <Text style={styles.explanationText}>{t("driver.payoutFailed.explanation")}</Text>

          <View style={styles.reasonBox}>
            <View style={styles.reasonHeaderRow}>
              <InfoIcon color="#FF5C5C" size={16} />
              <Text style={styles.reasonHeaderTitle}>{t("driver.payoutFailed.reasonLabel")}</Text>
            </View>
            <Text style={styles.reasonBodyText}>{reason}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => setOverlayVisible(true)}
            accessibilityRole="button"
            accessibilityLabel={t("driver.payoutFailed.updateMethodCta")}
          >
            <Text style={styles.primaryButtonText}>{t("driver.payoutFailed.updateMethodCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleRetry}
            accessibilityRole="button"
            accessibilityLabel={t("driver.payoutFailed.retryCta")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.payoutFailed.retryCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.tertiaryButton}
            onPress={handleReturnEarnings}
            accessibilityRole="button"
            accessibilityLabel={t("driver.payoutFailed.returnEarningsCta")}
          >
            <Text style={styles.tertiaryButtonText}>
              {t("driver.payoutFailed.returnEarningsCta")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* OV-02 Modal */}
      <PayoutMethodOverlay visible={isOverlayVisible} onClose={() => setOverlayVisible(false)} />
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
  heroSection: {
    alignItems: "center",
    marginBottom: spacing[5],
    marginTop: spacing[2],
  },
  badgeCircle: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: "#331616",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  badgePill: {
    backgroundColor: "#331616",
    borderWidth: 1,
    borderColor: "#7A2E2E",
    paddingHorizontal: spacing[3],
    paddingVertical: 5,
    borderRadius: radius.full,
    marginBottom: spacing[2],
  },
  badgePillText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: "#FF5C5C",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  amountText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FF8E8E",
    marginTop: 6,
  },
  refText: {
    fontSize: 12,
    fontFamily: "monospace",
    color: "#8E9E99",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[6],
  },
  explanationText: {
    fontSize: 13,
    color: "#D0D9D5",
    lineHeight: 18,
    marginBottom: spacing[3],
  },
  reasonBox: {
    backgroundColor: "#2A1414",
    borderWidth: 1,
    borderColor: "#662828",
    borderRadius: radius.lg,
    padding: spacing[3],
  },
  reasonHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: 4,
  },
  reasonHeaderTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF5C5C",
  },
  reasonBodyText: {
    fontSize: 13,
    color: "#FFD0D0",
    lineHeight: 17,
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
  tertiaryButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  tertiaryButtonText: {
    color: "#8E9E99",
    fontSize: 14,
    fontWeight: "600",
  },
});
