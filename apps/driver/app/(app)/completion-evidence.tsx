import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlertTriangleIcon,
  CameraIcon,
  CheckmarkIcon,
  ChevronLeftIcon,
  ShieldIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import {
  type EvidenceItem,
  useCompletionEvidenceStore,
} from "../../src/stores/completionEvidenceStore";

const MOCK_IMAGES = {
  sofaBefore: require("../../assets/evidence/evidence-sofa-before.png"),
  roomAfter: require("../../assets/evidence/evidence-room-after.png"),
};

interface PhotoCardProps {
  title: string;
  subtitle: string;
  evidence: EvidenceItem | null;
  imageSource: ImageSourcePropType;
  isEs: boolean;
  tapToUploadText: string;
  onToggle: () => void;
}

function PhotoCard({
  title,
  subtitle,
  evidence,
  imageSource,
  isEs,
  tapToUploadText,
  onToggle,
}: PhotoCardProps) {
  const hasPhoto = Boolean(evidence);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardIconWrap}>
          <CameraIcon color="#BAFF42" size={20} />
        </View>
        <View style={styles.cardHeaderInfo}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
        <View
          style={[styles.badgePill, hasPhoto ? styles.badgePillSuccess : styles.badgePillWarning]}
        >
          <Text
            style={[
              styles.badgePillText,
              hasPhoto ? styles.badgePillTextSuccess : styles.badgePillTextWarning,
            ]}
          >
            {hasPhoto ? "ATTACHED" : "REQUIRED"}
          </Text>
        </View>
      </View>

      {hasPhoto ? (
        <View style={styles.previewContainer}>
          <Image
            accessibilityLabel={`${title} evidence`}
            resizeMode="cover"
            source={imageSource}
            style={styles.previewImage}
          />
          <View style={styles.previewMeta}>
            <Text style={styles.previewLabel} numberOfLines={2}>
              {isEs ? evidence?.labelEs : evidence?.labelEn}
            </Text>
            <View style={styles.previewMetaRow}>
              <CheckmarkIcon color="#BAFF42" size={14} />
              <Text style={styles.previewTimestamp}>
                {evidence?.capturedAt} · ISO 8601 verified
              </Text>
            </View>
          </View>
          <Pressable
            accessibilityLabel={`Replace ${title}`}
            accessibilityRole="button"
            onPress={onToggle}
            style={styles.changePhotoButton}
          >
            <Text style={styles.changePhotoText}>{tapToUploadText}</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          accessibilityLabel={`Capture ${title}`}
          accessibilityRole="button"
          onPress={onToggle}
          style={styles.emptyUploadBox}
        >
          <CameraIcon color="#8E9E99" size={28} />
          <Text style={styles.emptyUploadText}>{tapToUploadText}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default function CompletionEvidenceScreen() {
  const router = useRouter();
  const { t, currentLocale } = useDriverTranslation();
  const isEs = currentLocale === "es";

  const {
    activeJobId,
    getCompletionRecord,
    attachDriverEvidence,
    removeDriverEvidence,
    submitDriverCompletion,
    retryDriverSubmission,
  } = useCompletionEvidenceStore();

  const record = getCompletionRecord(activeJobId);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleReturn = () => {
    router.push("/(app)/on-site-progress" as Href);
  };

  const handleToggleBeforePhoto = () => {
    if (record.driverEvidence.before) {
      removeDriverEvidence(activeJobId, "before");
    } else {
      attachDriverEvidence(
        activeJobId,
        "before",
        "assets/evidence/evidence-sofa-before.png",
        "Living room sofa · Pre-existing condition documented",
        "Sofá de sala · Condición previa documentada"
      );
    }
    setLocalError(null);
  };

  const handleToggleAfterPhoto = () => {
    if (record.driverEvidence.after) {
      removeDriverEvidence(activeJobId, "after");
    } else {
      attachDriverEvidence(
        activeJobId,
        "after",
        "assets/evidence/evidence-room-after.png",
        "Cleared living room space · Furniture loaded safely",
        "Espacio despejado en sala · Muebles cargados con seguridad"
      );
    }
    setLocalError(null);
  };

  const handleSubmit = () => {
    setLocalError(null);
    const result = submitDriverCompletion(activeJobId);
    if (!result.success) {
      const errorMsg = result.error || t("driver.completionEvidence.missingEvidenceAlert");
      setLocalError(errorMsg);
      Alert.alert(t("driver.completionEvidence.missingEvidenceTitle"), errorMsg, [{ text: "OK" }]);
      return;
    }

    router.push("/(app)/job-completed" as Href);
  };

  const handleRetry = () => {
    setLocalError(null);
    const retryResult = retryDriverSubmission(activeJobId);
    if (retryResult.success) {
      router.push("/(app)/job-completed" as Href);
    }
  };

  const isFailed = record.driverSubmissionStatus === "FAILED";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Return"
            accessibilityRole="button"
            hitSlop={12}
            onPress={handleReturn}
            style={styles.backButton}
          >
            <ChevronLeftIcon color="#FFFFFF" size={24} />
          </Pressable>
          <View style={styles.headerTitles}>
            <Text style={styles.headerCategory}>{t("driver.completionEvidence.headerLabel")}</Text>
            <Text style={styles.title}>{t("driver.completionEvidence.title")}</Text>
            <Text style={styles.subtitle}>{t("driver.completionEvidence.subtitle")}</Text>
          </View>
        </View>

        {/* Error / Failure Banner if any */}
        {(localError || isFailed) && (
          <View style={styles.errorBanner}>
            <AlertTriangleIcon color="#EF4444" size={20} />
            <View style={styles.errorTextWrap}>
              <Text style={styles.errorTitle}>
                {localError || "Submission failed · Network simulation error"}
              </Text>
              {isFailed && (
                <Pressable onPress={handleRetry} style={styles.retryChip}>
                  <Text style={styles.retryChipText}>Retry Submission</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}

        {/* Card 1: Before-service Photo */}
        <PhotoCard
          evidence={record.driverEvidence.before}
          imageSource={MOCK_IMAGES.sofaBefore}
          isEs={isEs}
          onToggle={handleToggleBeforePhoto}
          subtitle={t("driver.completionEvidence.beforeSubtitle")}
          tapToUploadText={t("driver.completionEvidence.tapToUpload")}
          title={t("driver.completionEvidence.beforeTitle")}
        />

        {/* Card 2: After-service Photo */}
        <PhotoCard
          evidence={record.driverEvidence.after}
          imageSource={MOCK_IMAGES.roomAfter}
          isEs={isEs}
          onToggle={handleToggleAfterPhoto}
          subtitle={t("driver.completionEvidence.afterSubtitle")}
          tapToUploadText={t("driver.completionEvidence.tapToUpload")}
          title={t("driver.completionEvidence.afterTitle")}
        />

        {/* Notice Banner */}
        <View style={styles.noticeBox}>
          <ShieldIcon color="#BAFF42" size={22} style={styles.noticeIcon} />
          <Text style={styles.noticeText}>{t("driver.completionEvidence.verificationNotice")}</Text>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionContainer}>
          <Pressable
            accessibilityLabel={t("driver.completionEvidence.submitCta")}
            accessibilityRole="button"
            onPress={handleSubmit}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>{t("driver.completionEvidence.submitCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityLabel={t("driver.completionEvidence.returnCta")}
            accessibilityRole="button"
            onPress={handleReturn}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {t("driver.completionEvidence.returnCta")}
            </Text>
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
  scrollContent: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[8],
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing[4],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#24332F",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
    marginTop: 2,
  },
  headerTitles: {
    flex: 1,
  },
  headerCategory: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#BAFF42",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: "#8E9E99",
    marginTop: 2,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A1414",
    borderColor: "#DC2626",
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  errorTextWrap: {
    flex: 1,
    marginLeft: spacing[2],
  },
  errorTitle: {
    fontSize: 13,
    color: "#FCA5A5",
    fontWeight: "600",
  },
  retryChip: {
    marginTop: 6,
    alignSelf: "flex-start",
    backgroundColor: "#DC2626",
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    borderRadius: radius.md,
  },
  retryChipText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#151A19",
    borderColor: "#24332F",
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing[4],
    marginBottom: spacing[4],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[3],
  },
  cardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: "#1C2422",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#8E9E99",
    marginTop: 2,
  },
  badgePill: {
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  badgePillSuccess: {
    backgroundColor: "#192E24",
    borderWidth: 1,
    borderColor: "#28523C",
  },
  badgePillWarning: {
    backgroundColor: "#332212",
    borderWidth: 1,
    borderColor: "#66441E",
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  badgePillTextSuccess: {
    color: "#BAFF42",
  },
  badgePillTextWarning: {
    color: "#F59E0B",
  },
  previewContainer: {
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: "#0F1413",
    borderWidth: 1,
    borderColor: "#1E2A27",
  },
  previewImage: {
    width: "100%",
    height: 140,
    backgroundColor: "#1A2220",
  },
  previewMeta: {
    padding: spacing[3],
    backgroundColor: "#151A19",
    borderTopWidth: 1,
    borderTopColor: "#1E2A27",
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 4,
  },
  previewMetaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewTimestamp: {
    fontSize: 11,
    color: "#8E9E99",
    marginLeft: 6,
  },
  changePhotoButton: {
    paddingVertical: spacing[2],
    alignItems: "center",
    backgroundColor: "#1A2220",
    borderTopWidth: 1,
    borderTopColor: "#24332F",
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#BAFF42",
  },
  emptyUploadBox: {
    height: 120,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: "#2D3E3A",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F1413",
  },
  emptyUploadText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8E9E99",
    marginTop: spacing[2],
  },
  noticeBox: {
    flexDirection: "row",
    backgroundColor: "#131C1A",
    borderColor: "#24332F",
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing[3],
    marginBottom: spacing[5],
    alignItems: "flex-start",
  },
  noticeIcon: {
    marginRight: spacing[2],
    marginTop: 2,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#8E9E99",
  },
  actionContainer: {
    marginTop: spacing[2],
    gap: spacing[3],
  },
  primaryButton: {
    backgroundColor: "#BAFF42",
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0B0F0E",
    letterSpacing: 0.2,
  },
  secondaryButton: {
    backgroundColor: "#151A19",
    borderColor: "#24332F",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
