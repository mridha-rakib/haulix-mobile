import { radius, spacing } from "@haulix/design-tokens";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDriverTranslation } from "../../i18n";
import { useWalletStore } from "../../stores/walletStore";
import { BankIcon, CreditCardIcon, ShieldCheckIcon } from "../icons/DriverIcons";

export interface PayoutMethodOverlayProps {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export function PayoutMethodOverlay({ visible, onClose, onSave }: PayoutMethodOverlayProps) {
  const { t } = useDriverTranslation();
  const { getActiveWallet } = useWalletStore();
  const wallet = getActiveWallet();

  const [selectedMethod, setSelectedMethod] = useState<"bank" | "card">("bank");

  const directDeposit = wallet.payoutAccounts.directDeposit;
  const debitCard = wallet.payoutAccounts.instantDebitCard;

  const handleSave = () => {
    if (onSave) onSave();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.dragHandle} />

          <Text style={styles.title}>{t("driver.payoutMethodOverlay.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.payoutMethodOverlay.subtitle")}</Text>

          {/* Instrument Selector Cards */}
          <View style={styles.optionList}>
            {/* Bank Direct Deposit Option */}
            <Pressable
              style={[styles.optionCard, selectedMethod === "bank" && styles.optionCardActive]}
              onPress={() => setSelectedMethod("bank")}
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedMethod === "bank" }}
              accessibilityLabel={`${t("driver.payoutMethodOverlay.bankOption")}, ${directDeposit.bankName} ending in ${directDeposit.last4}`}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconWrap}>
                  <BankIcon color="#BAFF42" size={20} />
                </View>
                <View style={styles.optionTexts}>
                  <Text style={styles.optionTitle}>
                    {t("driver.payoutMethodOverlay.bankOption")}
                  </Text>
                  <Text style={styles.optionSub}>
                    {directDeposit.bankName} · Checking ending in {directDeposit.last4}
                  </Text>
                </View>
              </View>

              <View
                style={[styles.radioCircle, selectedMethod === "bank" && styles.radioCircleActive]}
              >
                {selectedMethod === "bank" ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>

            {/* Instant Debit Card Option */}
            <Pressable
              style={[styles.optionCard, selectedMethod === "card" && styles.optionCardActive]}
              onPress={() => setSelectedMethod("card")}
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedMethod === "card" }}
              accessibilityLabel={`${t("driver.payoutMethodOverlay.cardOption")}, ${debitCard.cardBrand} ending in ${debitCard.last4}`}
            >
              <View style={styles.optionLeft}>
                <View style={styles.iconWrap}>
                  <CreditCardIcon color="#BAFF42" size={20} />
                </View>
                <View style={styles.optionTexts}>
                  <Text style={styles.optionTitle}>
                    {t("driver.payoutMethodOverlay.cardOption")}
                  </Text>
                  <Text style={styles.optionSub}>
                    {debitCard.cardBrand} ending in {debitCard.last4} · Exp {debitCard.expiry}
                  </Text>
                </View>
              </View>

              <View
                style={[styles.radioCircle, selectedMethod === "card" && styles.radioCircleActive]}
              >
                {selectedMethod === "card" ? <View style={styles.radioDot} /> : null}
              </View>
            </Pressable>
          </View>

          {/* Masked Instrument Disclosure */}
          <View style={styles.securityBox}>
            <ShieldCheckIcon color="#BAFF42" size={16} />
            <Text style={styles.securityText}>
              {t("driver.payoutMethodOverlay.securityNotice")}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionRow}>
            <Pressable
              style={styles.primaryButton}
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel={t("driver.payoutMethodOverlay.saveCta")}
            >
              <Text style={styles.primaryButtonText}>
                {t("driver.payoutMethodOverlay.saveCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={t("driver.payoutMethodOverlay.cancelCta")}
            >
              <Text style={styles.cancelButtonText}>
                {t("driver.payoutMethodOverlay.cancelCta")}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#111815",
    borderTopLeftRadius: radius["2xl"],
    borderTopRightRadius: radius["2xl"],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[8],
    borderTopWidth: 1,
    borderColor: "#22332B",
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2E3F37",
    alignSelf: "center",
    marginBottom: spacing[3],
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: "#8E9E99",
    marginTop: 2,
    marginBottom: spacing[4],
  },
  optionList: {
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#16201B",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#24342C",
  },
  optionCardActive: {
    borderColor: "#BAFF42",
    backgroundColor: "#19261F",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "#1E2E25",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  optionTexts: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  optionSub: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#5C6E66",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing[2],
  },
  radioCircleActive: {
    borderColor: "#BAFF42",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#BAFF42",
  },
  securityBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    backgroundColor: "#151F1A",
    borderRadius: radius.md,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  securityText: {
    flex: 1,
    fontSize: 11,
    color: "#8E9E99",
    lineHeight: 15,
  },
  actionRow: {
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
    fontWeight: "700",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: radius.full,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#8E9E99",
    fontSize: 14,
    fontWeight: "600",
  },
});
