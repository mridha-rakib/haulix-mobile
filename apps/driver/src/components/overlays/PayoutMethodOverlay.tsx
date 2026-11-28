import { radius, spacing } from "@haulix/design-tokens";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDriverTranslation } from "../../i18n";
import { useWalletStore } from "../../stores/walletStore";
import { ShieldCheckIcon } from "../icons/DriverIcons";

export interface PayoutMethodOverlayProps {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export function PayoutMethodOverlay({ visible, onClose, onSave }: PayoutMethodOverlayProps) {
  const { t } = useDriverTranslation();
  const { activeRole, updateDirectDepositAccount, updateInstantDebitCard } = useWalletStore();
  const [selectedType, setSelectedType] = useState<"bank" | "card">("bank");

  const [routingNumber, setRoutingNumber] = useState("1024");
  const [accountNumber, setAccountNumber] = useState("4109");
  const [cardNumber, setCardNumber] = useState("9012");
  const [expiry, setExpiry] = useState("08/28");
  const [cvv, setCvv] = useState("123");

  const handleSave = () => {
    if (selectedType === "bank") {
      updateDirectDepositAccount(activeRole, {
        bankName: "Chase Bank",
        last4: accountNumber.slice(-4) || "4109",
        routingLast4: routingNumber.slice(-4) || "1024",
      });
    } else {
      updateInstantDebitCard(activeRole, {
        cardBrand: "Visa",
        last4: cardNumber.slice(-4) || "9012",
        expiry: expiry || "08/28",
      });
    }
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

          {/* Type Toggle */}
          <View style={styles.typeSelector}>
            <Pressable
              style={[styles.typeOption, selectedType === "bank" && styles.typeOptionActive]}
              onPress={() => setSelectedType("bank")}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.typeOptionText,
                  selectedType === "bank" && styles.typeOptionTextActive,
                ]}
              >
                {t("driver.payoutMethodOverlay.bankOption")}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.typeOption, selectedType === "card" && styles.typeOptionActive]}
              onPress={() => setSelectedType("card")}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.typeOptionText,
                  selectedType === "card" && styles.typeOptionTextActive,
                ]}
              >
                {t("driver.payoutMethodOverlay.cardOption")}
              </Text>
            </Pressable>
          </View>

          {/* Input Fields */}
          {selectedType === "bank" ? (
            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Routing Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("driver.payoutMethodOverlay.routingPlaceholder")}
                  placeholderTextColor="#5C6E66"
                  value={routingNumber}
                  onChangeText={setRoutingNumber}
                  keyboardType="numeric"
                  maxLength={9}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Account Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("driver.payoutMethodOverlay.accountPlaceholder")}
                  placeholderTextColor="#5C6E66"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  keyboardType="numeric"
                />
              </View>
            </View>
          ) : (
            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("driver.payoutMethodOverlay.cardPlaceholder")}
                  placeholderTextColor="#5C6E66"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>

              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Expiry</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t("driver.payoutMethodOverlay.expPlaceholder")}
                    placeholderTextColor="#5C6E66"
                    value={expiry}
                    onChangeText={setExpiry}
                    maxLength={5}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={t("driver.payoutMethodOverlay.cvvPlaceholder")}
                    placeholderTextColor="#5C6E66"
                    value={cvv}
                    onChangeText={setCvv}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
          )}

          {/* Security Notice */}
          <View style={styles.securityBox}>
            <ShieldCheckIcon color="#8E9E99" size={16} />
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
  typeSelector: {
    flexDirection: "row",
    backgroundColor: "#16201B",
    borderRadius: radius.lg,
    padding: 4,
    marginBottom: spacing[4],
    borderWidth: 1,
    borderColor: "#24342C",
  },
  typeOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: radius.md,
  },
  typeOptionActive: {
    backgroundColor: "#23332A",
  },
  typeOptionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E9E99",
  },
  typeOptionTextActive: {
    color: "#BAFF42",
    fontWeight: "700",
  },
  formSection: {
    marginBottom: spacing[4],
    gap: spacing[3],
  },
  inputGroup: {},
  rowInputs: {
    flexDirection: "row",
    gap: spacing[3],
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8E9E99",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#16201B",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#24342C",
    paddingHorizontal: spacing[3],
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
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
