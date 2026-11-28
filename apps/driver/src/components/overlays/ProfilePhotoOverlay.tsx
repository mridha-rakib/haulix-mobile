import { radius, spacing } from "@haulix/design-tokens";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDriverTranslation } from "../../i18n";
import { useWalletStore } from "../../stores/walletStore";
import { useWorkerProfileStore } from "../../stores/workerProfileStore";
import { CameraIcon, DocumentIcon, TrashIcon } from "../icons/DriverIcons";

interface ProfilePhotoOverlayProps {
  visible: boolean;
  onClose: () => void;
  onPhotoSelected?: (uri: string) => void;
}

export function ProfilePhotoOverlay({
  visible,
  onClose,
  onPhotoSelected,
}: ProfilePhotoOverlayProps) {
  const { t } = useDriverTranslation();
  const { activeRole } = useWalletStore();
  const { updateAvatar } = useWorkerProfileStore();

  const handleCamera = () => {
    const mockCameraUri =
      activeRole === "driver"
        ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400";
    updateAvatar(activeRole, mockCameraUri);
    onPhotoSelected?.(mockCameraUri);
    onClose();
  };

  const handleGallery = () => {
    const mockGalleryUri =
      activeRole === "driver"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400";
    updateAvatar(activeRole, mockGalleryUri);
    onPhotoSelected?.(mockGalleryUri);
    onClose();
  };

  const handleRemove = () => {
    const placeholder = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";
    updateAvatar(activeRole, placeholder);
    onPhotoSelected?.(placeholder);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handleBar} />

          <Text style={styles.title}>{t("driver.photoOverlay.title")}</Text>
          <Text style={styles.subtitle}>{t("driver.photoOverlay.subtitle")}</Text>

          <View style={styles.optionsList}>
            <Pressable
              style={styles.optionRow}
              onPress={handleCamera}
              accessibilityRole="button"
              accessibilityLabel={t("driver.photoOverlay.takePhoto")}
            >
              <View style={styles.iconCircle}>
                <CameraIcon color="#BAFF42" size={20} />
              </View>
              <Text style={styles.optionText}>{t("driver.photoOverlay.takePhoto")}</Text>
            </Pressable>

            <Pressable
              style={styles.optionRow}
              onPress={handleGallery}
              accessibilityRole="button"
              accessibilityLabel={t("driver.photoOverlay.chooseGallery")}
            >
              <View style={styles.iconCircle}>
                <DocumentIcon color="#BAFF42" size={20} />
              </View>
              <Text style={styles.optionText}>{t("driver.photoOverlay.chooseGallery")}</Text>
            </Pressable>

            <Pressable
              style={[styles.optionRow, styles.removeRow]}
              onPress={handleRemove}
              accessibilityRole="button"
              accessibilityLabel={t("driver.photoOverlay.removePhoto")}
            >
              <View style={[styles.iconCircle, styles.removeIconCircle]}>
                <TrashIcon color="#EF4444" size={20} />
              </View>
              <Text style={styles.removeOptionText}>{t("driver.photoOverlay.removePhoto")}</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.cancelBtn}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t("driver.photoOverlay.cancel")}
          >
            <Text style={styles.cancelBtnText}>{t("driver.photoOverlay.cancel")}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: "#8E9E99",
    marginTop: 4,
    marginBottom: spacing[4],
  },
  optionsList: {
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16201B",
    borderRadius: radius.lg,
    padding: spacing[3],
    borderWidth: 1,
    borderColor: "#22332B",
    gap: spacing[3],
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: "#1C2A23",
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  removeRow: {
    borderColor: "rgba(239, 68, 68, 0.3)",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
  },
  removeIconCircle: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  removeOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FCA5A5",
  },
  cancelBtn: {
    backgroundColor: "#1A2620",
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#283D32",
  },
  cancelBtnText: {
    color: "#D0D9D5",
    fontSize: 14,
    fontWeight: "600",
  },
});
