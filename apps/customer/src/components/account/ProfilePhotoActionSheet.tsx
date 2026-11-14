import { colors, fontFamily, radius, spacing } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import type React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Path, Rect, Svg } from "react-native-svg";
import { ProfilePhotoIcon } from "./C10Icons";

export const STORAGE_KEY_PROFILE_PHOTO = "haulix_c10_profile_photo";

export interface ProfilePhotoActionSheetProps {
  visible: boolean;
  currentPhotoUri: string | null;
  initials?: string;
  onClose: () => void;
  onPhotoSaved: (uri: string) => void;
  onPhotoRemoved: () => void;
}

type SheetState = "idle" | "preview" | "confirm_remove";

function GalleryIcon({ size = 20, color = colors.brand }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
        fill={color}
      />
      <Path
        d="M21 15L16 10L5 21"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TrashIcon({ size = 20, color = "#FF5252" }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6H5H21"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6H19Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 11V17M14 11V17"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface IdleActionsProps {
  hasPhoto: boolean;
  onPickGallery: () => void;
  onTakePhoto: () => void;
  onRequestRemove: () => void;
  onCancel: () => void;
}

function IdleActions({
  hasPhoto,
  onPickGallery,
  onTakePhoto,
  onRequestRemove,
  onCancel,
}: IdleActionsProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.actionsGroup}>
      <Pressable
        style={styles.actionRow}
        onPress={onPickGallery}
        accessibilityRole="button"
        accessibilityLabel={hasPhoto ? t("photo.changeGallery") : t("photo.chooseGallery")}
        testID="c10-photo-gallery-btn"
      >
        <GalleryIcon size={20} color={colors.brand} />
        <Text style={styles.actionRowText}>
          {hasPhoto ? t("photo.changeGallery") : t("photo.chooseGallery")}
        </Text>
      </Pressable>

      <Pressable
        style={styles.actionRow}
        onPress={onTakePhoto}
        accessibilityRole="button"
        accessibilityLabel={hasPhoto ? t("photo.takeNewPhoto") : t("photo.takePhoto")}
        testID="c10-photo-camera-btn"
      >
        <ProfilePhotoIcon size={20} color={colors.brand} />
        <Text style={styles.actionRowText}>
          {hasPhoto ? t("photo.takeNewPhoto") : t("photo.takePhoto")}
        </Text>
      </Pressable>

      {hasPhoto && (
        <Pressable
          style={[styles.actionRow, styles.actionRowDanger]}
          onPress={onRequestRemove}
          accessibilityRole="button"
          accessibilityLabel={t("photo.remove")}
          testID="c10-photo-remove-btn"
        >
          <TrashIcon size={20} color="#FF5252" />
          <Text style={styles.actionRowTextDanger}>{t("photo.remove")}</Text>
        </Pressable>
      )}

      <Pressable
        style={styles.cancelButton}
        onPress={onCancel}
        accessibilityRole="button"
        accessibilityLabel={t("photo.cancel")}
        testID="c10-photo-cancel-btn"
      >
        <Text style={styles.cancelButtonText}>{t("photo.cancel")}</Text>
      </Pressable>
    </View>
  );
}

interface PreviewActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

function PreviewActions({ onSave, onCancel }: PreviewActionsProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.actionsGroup} testID="c10-photo-preview-actions">
      <Pressable
        style={styles.saveButton}
        onPress={onSave}
        accessibilityRole="button"
        accessibilityLabel={t("photo.save")}
        testID="c10-photo-save-btn"
      >
        <Text style={styles.saveButtonText}>{t("photo.save")}</Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={onCancel}
        accessibilityRole="button"
        accessibilityLabel={t("photo.cancel")}
        testID="c10-photo-cancel-preview-btn"
      >
        <Text style={styles.cancelButtonText}>{t("photo.cancel")}</Text>
      </Pressable>
    </View>
  );
}

interface ConfirmRemoveActionsProps {
  onConfirm: () => void;
  onKeep: () => void;
}

function ConfirmRemoveActions({ onConfirm, onKeep }: ConfirmRemoveActionsProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.actionsGroup} testID="c10-photo-remove-confirm-actions">
      <Pressable
        style={styles.dangerConfirmButton}
        onPress={onConfirm}
        accessibilityRole="button"
        accessibilityLabel={t("photo.confirmRemove")}
        testID="c10-photo-confirm-remove-btn"
      >
        <Text style={styles.dangerConfirmButtonText}>{t("photo.confirmRemove")}</Text>
      </Pressable>

      <Pressable
        style={styles.cancelButton}
        onPress={onKeep}
        accessibilityRole="button"
        accessibilityLabel={t("photo.keep")}
        testID="c10-photo-keep-btn"
      >
        <Text style={styles.cancelButtonText}>{t("photo.keep")}</Text>
      </Pressable>
    </View>
  );
}

/**
 * ProfilePhotoActionSheet
 *
 * Frontend-only profile photo bottom sheet for C10 My Account.
 * Follows docs/PHOTO_FLOW_DESIGN_SPEC.md.
 */
export const ProfilePhotoActionSheet: React.FC<ProfilePhotoActionSheetProps> = ({
  visible,
  currentPhotoUri,
  initials = "SM",
  onClose,
  onPhotoSaved,
  onPhotoRemoved,
}) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [sheetState, setSheetState] = useState<SheetState>("idle");
  const [pendingUri, setPendingUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setSheetState("idle");
      setPendingUri(null);
      setErrorMessage(null);
      setLoading(false);
    }
  }, [visible]);

  const handlePickFromGallery = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPendingUri(result.assets[0].uri);
        setSheetState("preview");
      }
    } catch (err: unknown) {
      console.warn("Gallery error:", err);
      setErrorMessage(t("photo.selectError"));
    } finally {
      setLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    try {
      setErrorMessage(null);
      setLoading(true);

      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        setErrorMessage(t("photo.cameraPermissionError"));
        setLoading(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPendingUri(result.assets[0].uri);
        setSheetState("preview");
      }
    } catch (err: unknown) {
      console.warn("Camera error:", err);
      setErrorMessage(t("photo.selectError"));
    } finally {
      setLoading(false);
    }
  };

  const handleSavePending = async () => {
    if (!pendingUri) return;
    try {
      setLoading(true);
      let durableUri = pendingUri;
      if (FileSystem.documentDirectory) {
        const dest = `${FileSystem.documentDirectory}haulix_c10_avatar.jpg`;
        await FileSystem.copyAsync({ from: pendingUri, to: dest });
        durableUri = dest;
      }
      await SecureStore.setItemAsync(STORAGE_KEY_PROFILE_PHOTO, durableUri);
      onPhotoSaved(durableUri);
      onClose();
    } catch (err: unknown) {
      console.warn("Failed to save profile photo:", err);
      setErrorMessage(t("photo.saveError"));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRemove = async () => {
    try {
      setLoading(true);
      if (
        currentPhotoUri &&
        FileSystem.documentDirectory &&
        currentPhotoUri.startsWith(FileSystem.documentDirectory)
      ) {
        await FileSystem.deleteAsync(currentPhotoUri, { idempotent: true });
      }
      await SecureStore.deleteItemAsync(STORAGE_KEY_PROFILE_PHOTO);
      onPhotoRemoved();
      onClose();
    } catch (err: unknown) {
      console.warn("Failed to remove profile photo:", err);
      setErrorMessage(t("photo.removeError"));
    } finally {
      setLoading(false);
    }
  };

  const displayUri = sheetState === "preview" ? pendingUri : currentPhotoUri;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (!loading) onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <Pressable
          style={styles.backdropPressable}
          onPress={() => {
            if (!loading) onClose();
          }}
          accessibilityLabel={t("photo.cancel")}
          accessibilityRole="button"
        />

        <View
          style={[
            styles.sheetContainer,
            { paddingBottom: Math.max(insets.bottom, 16) + spacing[3] },
          ]}
          testID="c10-photo-action-sheet"
        >
          <View style={styles.grabHandleContainer}>
            <View style={styles.grabHandle} />
          </View>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              {sheetState === "confirm_remove"
                ? t("photo.removeConfirmTitle")
                : sheetState === "preview"
                  ? t("photo.previewTitle")
                  : t("photo.title")}
            </Text>
            <Text style={styles.headerSubtitle}>
              {sheetState === "confirm_remove"
                ? t("photo.removeConfirmSubtitle", { initials })
                : sheetState === "preview"
                  ? t("photo.previewSubtitle")
                  : t("photo.sheetSubtitle")}
            </Text>
          </View>

          {errorMessage && (
            <View style={styles.errorBanner} testID="c10-photo-error-banner">
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <View style={styles.previewSection}>
            <View style={styles.previewCircle} testID="c10-photo-preview-circle">
              {displayUri ? (
                <Image
                  source={{ uri: displayUri }}
                  style={styles.previewImage}
                  resizeMode="cover"
                  testID="c10-photo-preview-image"
                />
              ) : (
                <Text style={styles.previewInitials}>{initials}</Text>
              )}
            </View>
          </View>

          {loading && (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={colors.brand} />
              <Text style={styles.loadingText}>{t("photo.processing")}</Text>
            </View>
          )}

          {sheetState === "idle" && !loading && (
            <IdleActions
              hasPhoto={Boolean(currentPhotoUri)}
              onPickGallery={handlePickFromGallery}
              onTakePhoto={handleTakePhoto}
              onRequestRemove={() => setSheetState("confirm_remove")}
              onCancel={onClose}
            />
          )}

          {sheetState === "preview" && !loading && (
            <PreviewActions
              onSave={handleSavePending}
              onCancel={() => {
                setPendingUri(null);
                setSheetState("idle");
                setErrorMessage(null);
              }}
            />
          )}

          {sheetState === "confirm_remove" && !loading && (
            <ConfirmRemoveActions
              onConfirm={handleConfirmRemove}
              onKeep={() => setSheetState("idle")}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    justifyContent: "flex-end",
  },
  backdropPressable: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#35403B",
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  grabHandleContainer: {
    alignItems: "center",
    paddingVertical: 6,
  },
  grabHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#35403B",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 6,
    marginBottom: spacing[4],
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.primaryText,
  },
  headerSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondaryText,
    marginTop: 4,
    textAlign: "center",
  },
  errorBanner: {
    backgroundColor: "#2A1515",
    borderWidth: 1,
    borderColor: "#5C2626",
    borderRadius: radius.md,
    padding: spacing[2],
    marginBottom: spacing[3],
  },
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#FF8F8F",
    textAlign: "center",
  },
  previewSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[5],
  },
  previewCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#080D0C",
    borderWidth: 2,
    borderColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  previewImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  previewInitials: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    color: colors.primaryText,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: spacing[3],
  },
  loadingText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.secondaryText,
  },
  actionsGroup: {
    gap: 10,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: radius.xl,
    paddingHorizontal: 16,
    height: 52,
    gap: 12,
  },
  actionRowDanger: {
    backgroundColor: "#221616",
    borderColor: "#4A2525",
  },
  actionRowText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.primaryText,
  },
  actionRowTextDanger: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: "#FF5252",
  },
  saveButton: {
    backgroundColor: colors.brand,
    borderRadius: radius.xl,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: "#080D0C",
  },
  dangerConfirmButton: {
    backgroundColor: "#E53E3E",
    borderRadius: radius.xl,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  dangerConfirmButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: "#FFFFFF",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderRadius: radius.xl,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.secondaryText,
  },
});
