import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftIcon,
  BankIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "../../src/components/icons/DriverIcons";
import { PayoutMethodOverlay } from "../../src/components/overlays/PayoutMethodOverlay";
import { useDriverTranslation } from "../../src/i18n";
import { useWalletStore } from "../../src/stores/walletStore";

export default function PayoutAccountScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ overlay?: string }>();
  const { t } = useDriverTranslation();
  const { getActiveWallet } = useWalletStore();
  const wallet = getActiveWallet();
  const [isOverlayVisible, setOverlayVisible] = useState(params.overlay === "ov02");

  useEffect(() => {
    if (params.overlay === "ov02") {
      setOverlayVisible(true);
    }
  }, [params.overlay]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(app)/(tabs)/earnings" as Href);
    }
  };

  const directDeposit = wallet.payoutAccounts.directDeposit;
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
          <Text style={styles.headerTitle}>{t("driver.payoutAccount.title")}</Text>
          <Text style={styles.headerSubtitle}>{t("driver.payoutAccount.subtitle")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Direct Deposit Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconWrap}>
              <BankIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.cardTitleCol}>
              <Text style={styles.cardTitle}>{t("driver.payoutAccount.primaryAccountTitle")}</Text>
              <Text style={styles.cardDesc}>
                {directDeposit.bankName} · {directDeposit.accountType} ending in{" "}
                {directDeposit.last4}
              </Text>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>{t("driver.payoutAccount.statusActive")}</Text>
            </View>
          </View>
          <Text style={styles.cardSub}>
            Routing number ending in {directDeposit.routingLast4} · Standard transfer (1-3 days
            free)
          </Text>
        </View>

        {/* Instant Debit Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconWrap}>
              <CreditCardIcon color="#BAFF42" size={20} />
            </View>
            <View style={styles.cardTitleCol}>
              <Text style={styles.cardTitle}>{t("driver.payoutAccount.debitCardTitle")}</Text>
              <Text style={styles.cardDesc}>
                {debitCard.cardBrand} ending in {debitCard.last4}
              </Text>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>{t("driver.payoutAccount.statusActive")}</Text>
            </View>
          </View>
          <Text style={styles.cardSub}>
            Expires {debitCard.expiry} · Eligible for instant 15-30 minute disbursements
          </Text>
        </View>

        {/* Primary CTA: Update payout method */}
        <Pressable
          style={styles.primaryButton}
          onPress={() => setOverlayVisible(true)}
          accessibilityRole="button"
          accessibilityLabel={t("driver.payoutAccount.updateCta")}
        >
          <Text style={styles.primaryButtonText}>{t("driver.payoutAccount.updateCta")}</Text>
        </Pressable>

        {/* Security Notice Card */}
        <View style={styles.securityCard}>
          <ShieldCheckIcon color="#BAFF42" size={18} />
          <Text style={styles.securityText}>{t("driver.payoutAccount.securityNotice")}</Text>
        </View>
      </ScrollView>

      {/* OV-02 Overlay Modal */}
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
  card: {
    backgroundColor: "#111815",
    borderRadius: radius.xl,
    padding: spacing[4],
    borderWidth: 1,
    borderColor: "#22332B",
    marginBottom: spacing[4],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
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
  cardTitleCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardDesc: {
    fontSize: 13,
    color: "#D0D9D5",
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: "#192E24",
    borderWidth: 1,
    borderColor: "#28523C",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  activeBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  cardSub: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 4,
    lineHeight: 16,
  },
  primaryButton: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: spacing[4],
    marginTop: spacing[2],
  },
  primaryButtonText: {
    color: "#0B0F0E",
    fontSize: 15,
    fontWeight: "800",
  },
  securityCard: {
    flexDirection: "row",
    gap: spacing[3],
    backgroundColor: "#131E18",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#243B2E",
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: "#8E9E99",
    lineHeight: 17,
  },
});
