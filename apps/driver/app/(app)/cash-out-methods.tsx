import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  BankIcon,
  CreditCardIcon,
  ZapIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { formatCents, useWalletStore } from "../../src/stores/walletStore";

export default function CashOutMethodsScreen() {
  const router = useRouter();
  const { t } = useDriverTranslation();
  const { getActiveWallet } = useWalletStore();
  const wallet = getActiveWallet();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/earnings" as Href);
    }
  };

  const handleSelectInstant = () => {
    router.push("/(app)/instant-payout-review" as Href);
  };

  const handleSelectStandard = () => {
    router.push("/(app)/standard-bank-cashout" as Href);
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
          <Text style={styles.headerTitle}>{t("driver.cashOutMethods.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.cashOutMethods.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Available Balance Header */}
        <View style={styles.balanceBanner}>
          <Text style={styles.balanceLabel}>
            {t("driver.cashOutMethods.availableBalanceLabel")}
          </Text>
          <Text style={styles.balanceAmount}>{formatCents(wallet.availableBalanceCents)}</Text>
        </View>

        {/* Option 1: Instant Cash Out */}
        <View style={styles.methodCard}>
          <View style={styles.methodTopRow}>
            <View style={styles.iconWrap}>
              <ZapIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.methodTitles}>
              <Text style={styles.methodTitle}>
                {t("driver.cashOutMethods.instantOptionTitle")}
              </Text>
              <Text style={styles.methodSub}>
                {t("driver.cashOutMethods.instantOptionSubtitle")}
              </Text>
            </View>
            <View style={styles.badgeFastest}>
              <Text style={styles.badgeFastestText}>
                {t("driver.cashOutMethods.instantOptionBadge")}
              </Text>
            </View>
          </View>

          <View style={styles.methodInfoBox}>
            <CreditCardIcon color="#8E9E99" size={16} />
            <Text style={styles.methodInfoText}>
              {wallet.payoutAccounts.instantDebitCard.cardBrand} ending in{" "}
              {wallet.payoutAccounts.instantDebitCard.last4}
            </Text>
          </View>

          <Pressable
            style={styles.instantButton}
            onPress={handleSelectInstant}
            accessibilityRole="button"
            accessibilityLabel={t("driver.cashOutMethods.instantCta")}
          >
            <Text style={styles.instantButtonText}>{t("driver.cashOutMethods.instantCta")}</Text>
          </Pressable>
        </View>

        {/* Option 2: Standard Bank Transfer */}
        <View style={styles.methodCard}>
          <View style={styles.methodTopRow}>
            <View style={styles.iconWrap}>
              <BankIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.methodTitles}>
              <Text style={styles.methodTitle}>
                {t("driver.cashOutMethods.standardOptionTitle")}
              </Text>
              <Text style={styles.methodSub}>
                {t("driver.cashOutMethods.standardOptionSubtitle")}
              </Text>
            </View>
            <View style={styles.badgeFree}>
              <Text style={styles.badgeFreeText}>
                {t("driver.cashOutMethods.standardOptionBadge")}
              </Text>
            </View>
          </View>

          <View style={styles.methodInfoBox}>
            <BankIcon color="#8E9E99" size={16} />
            <Text style={styles.methodInfoText}>
              {wallet.payoutAccounts.directDeposit.bankName} ending in{" "}
              {wallet.payoutAccounts.directDeposit.last4}
            </Text>
          </View>

          <Pressable
            style={styles.standardButton}
            onPress={handleSelectStandard}
            accessibilityRole="button"
            accessibilityLabel={t("driver.cashOutMethods.standardCta")}
          >
            <Text style={styles.standardButtonText}>{t("driver.cashOutMethods.standardCta")}</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.cancelButton}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel={t("driver.cashOutMethods.cancelCta")}
        >
          <Text style={styles.cancelButtonText}>{t("driver.cashOutMethods.cancelCta")}</Text>
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
  balanceBanner: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8E9E99",
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 4,
  },
  methodCard: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  methodTopRow: {
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
  methodTitles: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  methodSub: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  badgeFastest: {
    backgroundColor: "#BAFF42",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  badgeFastestText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#0B0F0E",
  },
  badgeFree: {
    backgroundColor: "#1F2B24",
    borderWidth: 1,
    borderColor: "#2E4738",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  badgeFreeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#BAFF42",
  },
  methodInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    backgroundColor: "#16201B",
    paddingHorizontal: spacing[3],
    paddingVertical: 10,
    borderRadius: radius.md,
    marginBottom: spacing[4],
  },
  methodInfoText: {
    fontSize: 13,
    color: "#D0D9D5",
  },
  instantButton: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
  },
  instantButtonText: {
    color: "#0B0F0E",
    fontSize: 14,
    fontWeight: "800",
  },
  standardButton: {
    backgroundColor: "#19241E",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#283A30",
  },
  standardButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#8E9E99",
    fontSize: 14,
    fontWeight: "600",
  },
});
