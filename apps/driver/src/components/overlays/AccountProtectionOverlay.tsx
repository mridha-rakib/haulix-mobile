import { radius, spacing } from "@haulix/design-tokens";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDriverTranslation } from "../../i18n";
import { useWalletStore } from "../../stores/walletStore";
import { useWorkerProfileStore } from "../../stores/workerProfileStore";
import { CheckmarkIcon, ShieldIcon } from "../icons/DriverIcons";

interface AccountProtectionOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export function AccountProtectionOverlay({ visible, onClose }: AccountProtectionOverlayProps) {
  const { t } = useDriverTranslation();
  const { activeRole } = useWalletStore();
  const { getProfileForRole } = useWorkerProfileStore();
  const profile = getProfileForRole(activeRole);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handleBar} />

          <View style={styles.shieldHeader}>
            <View style={styles.shieldIconWrap}>
              <ShieldIcon color="#BAFF42" size={32} />
            </View>
            <View style={styles.shieldTextCol}>
              <Text style={styles.title}>{t("driver.securityOverlay.title")}</Text>
              <Text style={styles.subtitle}>{t("driver.securityOverlay.subtitle")}</Text>
            </View>
          </View>

          {/* Security Status Box */}
          <View style={styles.statusBox}>
            <View style={styles.statusRow}>
              <CheckmarkIcon color="#BAFF42" size={16} />
              <Text style={styles.statusTitle}>{t("driver.securityOverlay.statusTitle")}</Text>
            </View>
            <Text style={styles.statusDesc}>{t("driver.securityOverlay.statusDesc")}</Text>
          </View>

          {/* Protection Factors */}
          <View style={styles.factorsList}>
            <View style={styles.factorItem}>
              <View style={styles.factorDot} />
              <View style={styles.factorCol}>
                <Text style={styles.factorLabel}>Two-Factor Authentication</Text>
                <Text style={styles.factorValue}>Active · SMS verification to {profile.phone}</Text>
              </View>
            </View>

            <View style={styles.factorItem}>
              <View style={styles.factorDot} />
              <View style={styles.factorCol}>
                <Text style={styles.factorLabel}>Device Cryptographic Binding</Text>
                <Text style={styles.factorValue}>Enforced · Authorized mobile hardware token</Text>
              </View>
            </View>

            <View style={styles.factorItem}>
              <View style={styles.factorDot} />
              <View style={styles.factorCol}>
                <Text style={styles.factorLabel}>Payout Destination Lock</Text>
                <Text style={styles.factorValue}>
                  24-hour verification hold on new banking destinations
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.closeBtn}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t("driver.securityOverlay.closeCta")}
          >
            <Text style={styles.closeBtnText}>{t("driver.securityOverlay.closeCta")}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#111815",
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing[5],
    borderTopWidth: 1,
    borderColor: "#22332B",
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#2E4036",
    borderRadius: radius.full,
    alignSelf: "center",
    marginBottom: spacing[4],
  },
  shieldHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    marginBottom: spacing[4],
  },
  shieldIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.full,
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    borderWidth: 1,
    borderColor: "#BAFF42",
    justifyContent: "center",
    alignItems: "center",
  },
  shieldTextCol: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  statusBox: {
    backgroundColor: "#142019",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22382B",
    marginBottom: spacing[4],
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginBottom: 4,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#BAFF42",
  },
  statusDesc: {
    fontSize: 12,
    color: "#8E9E99",
    lineHeight: 17,
  },
  factorsList: {
    gap: spacing[3],
    marginBottom: spacing[5],
  },
  factorItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[3],
  },
  factorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#BAFF42",
    marginTop: 6,
  },
  factorCol: {
    flex: 1,
  },
  factorLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  factorValue: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  closeBtn: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
  },
  closeBtnText: {
    color: "#0B0F0E",
    fontSize: 15,
    fontWeight: "800",
  },
});
