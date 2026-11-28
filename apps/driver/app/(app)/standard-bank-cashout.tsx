import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, BankIcon, CheckmarkIcon } from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { formatCents, useWalletStore } from "../../src/stores/walletStore";

export default function StandardBankCashOutScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { activeRole, getActiveWallet, requestStandardCashOut } = useWalletStore();
  const wallet = getActiveWallet();

  const [amountStr, setAmountStr] = useState((wallet.availableBalanceCents / 100).toFixed(2));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/cash-out-methods" as Href);
    }
  };

  const handleFullBalance = () => {
    setErrorMessage(null);
    setAmountStr((wallet.availableBalanceCents / 100).toFixed(2));
  };

  const handleConfirmTransfer = () => {
    setErrorMessage(null);
    const num = Number.parseFloat(amountStr) || 0;
    const amountCents = Math.round(num * 100);

    const result = requestStandardCashOut(activeRole, amountCents);
    if (!result.success || !result.transaction) {
      setErrorMessage(
        result.errorMessage || "Transfer failed. Please check the amount and try again."
      );
      return;
    }
    router.push(`/(app)/cash-out-status?txId=${result.transaction.id}` as Href);
  };

  const directDeposit = wallet.payoutAccounts.directDeposit;

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
          <Text style={styles.headerTitle}>{t("driver.standardCashOut.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.standardCashOut.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Amount Input Card */}
        <View style={styles.card}>
          <Text style={styles.cardPrompt}>{t("driver.standardCashOut.amountPrompt")}</Text>

          <View style={styles.amountInputRow}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              keyboardType="numeric"
              value={amountStr}
              onChangeText={setAmountStr}
              placeholder="0.00"
              placeholderTextColor="#5C6E66"
            />
          </View>

          <Pressable
            style={styles.fullBalanceBtn}
            onPress={handleFullBalance}
            accessibilityRole="button"
            accessibilityLabel={t("driver.standardCashOut.allAvailableCta")}
          >
            <Text style={styles.fullBalanceBtnText}>
              {t("driver.standardCashOut.allAvailableCta")} (
              {formatCents(wallet.availableBalanceCents)})
            </Text>
          </Pressable>
        </View>

        {/* Destination Details Card */}
        <View style={styles.destinationCard}>
          <View style={styles.destinationTop}>
            <View style={styles.iconWrap}>
              <BankIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.destCol}>
              <Text style={styles.destLabel}>{t("driver.standardCashOut.destinationLabel")}</Text>
              <Text style={styles.destName}>
                {directDeposit.bankName} · Checking ending in {directDeposit.last4}
              </Text>
            </View>
          </View>
          <View style={styles.feeNotice}>
            <CheckmarkIcon color="#BAFF42" size={14} />
            <Text style={styles.feeNoticeText}>{t("driver.standardCashOut.feeFree")}</Text>
          </View>
        </View>

        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={handleConfirmTransfer}
            accessibilityRole="button"
            accessibilityLabel={t("driver.standardCashOut.confirmCta")}
          >
            <Text style={styles.primaryButtonText}>{t("driver.standardCashOut.confirmCta")}</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel={t("driver.standardCashOut.backCta")}
          >
            <Text style={styles.secondaryButtonText}>{t("driver.standardCashOut.backCta")}</Text>
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
    alignItems: "center",
  },
  cardPrompt: {
    fontSize: 13,
    color: "#8E9E99",
    marginBottom: spacing[2],
  },
  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[4],
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    marginRight: 4,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    minWidth: 120,
    textAlign: "center",
  },
  fullBalanceBtn: {
    backgroundColor: "#192E24",
    borderWidth: 1,
    borderColor: "#28523C",
    paddingHorizontal: spacing[3],
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  fullBalanceBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#BAFF42",
  },
  destinationCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[6],
  },
  destinationTop: {
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
  destName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 2,
  },
  feeNotice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#151F1A",
    padding: spacing[2],
    borderRadius: radius.md,
  },
  feeNoticeText: {
    fontSize: 12,
    color: "#BAFF42",
    fontWeight: "600",
  },
  errorBanner: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: radius.md,
    padding: spacing[3],
    marginBottom: spacing[3],
  },
  errorBannerText: {
    color: "#FCA5A5",
    fontSize: 13,
    fontWeight: "600",
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
