import { radius, spacing } from "@haulix/design-tokens";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDriverTranslation } from "../../i18n";

interface EmergencyContactOverlayProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * OV04 Emergency Contact Overlay
 * Sourced directly from approved Figma node 1286:532 (EN) and 1286:543 (ES).
 * Informational preview of the registered emergency contact with zero real dialing or SMS.
 */
export function EmergencyContactOverlay({ visible, onClose }: EmergencyContactOverlayProps) {
  const { t } = useDriverTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handleBar} />

          {/* Title */}
          <Text style={styles.title}>{t("driver.emergencyOverlay.title")}</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>{t("driver.emergencyOverlay.subtitle")}</Text>

          {/* Preview Values Card */}
          <View style={styles.previewCard}>
            <Text style={styles.previewRow}>
              {t("driver.emergencyOverlay.previewNameLabel")} ·{" "}
              {t("driver.emergencyOverlay.contactName")}
            </Text>
            <Text style={styles.previewRow}>
              {t("driver.emergencyOverlay.previewPhoneLabel")} ·{" "}
              {t("driver.emergencyOverlay.contactPhone")}
            </Text>
          </View>

          {/* Disclaimer Note */}
          <Text style={styles.disclaimerText}>{t("driver.emergencyOverlay.disclaimer")}</Text>

          {/* Close Action Button */}
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t("driver.emergencyOverlay.closeCta")}
          >
            <Text style={styles.closeButtonText}>{t("driver.emergencyOverlay.closeCta")}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#080B0B",
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[3],
    paddingBottom: spacing[8],
    borderWidth: 1,
    borderColor: "#1C2A23",
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: "#2C3D34",
    alignSelf: "center",
    marginBottom: spacing[4],
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#F6F8F6",
    letterSpacing: -0.3,
    marginBottom: spacing[1],
  },
  subtitle: {
    fontSize: 12,
    color: "#ADB8B0",
    lineHeight: 18,
    marginBottom: spacing[4],
  },
  previewCard: {
    backgroundColor: "#151A19",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22332B",
    gap: 7,
    marginBottom: spacing[3],
  },
  previewRow: {
    fontSize: 13,
    fontWeight: "600",
    color: "#F6F8F6",
  },
  disclaimerText: {
    fontSize: 11,
    color: "#ADB8B0",
    lineHeight: 16,
    marginBottom: spacing[5],
  },
  closeButton: {
    backgroundColor: "#BAFF42",
    borderRadius: radius.lg,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#050605",
    fontSize: 14,
    fontWeight: "700",
  },
});
