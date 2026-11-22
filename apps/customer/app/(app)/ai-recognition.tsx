import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderStart } from "../../src/components/navigation/FlowHeaderStart";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C22_EVIDENCE_ITEMS } from "../../src/fixtures/c28AiHandoffs";

const EVIDENCE_IMAGES: Record<string, ImageSourcePropType> = {
  sofa: require("../../assets/images/intake/c18j-sofa.png"),
  mattresses: require("../../assets/images/intake/c18j-mattresses.png"),
  table: require("../../assets/images/intake/c18j-table.png"),
  boxes: require("../../assets/images/intake/c19p-boxes.png"),
};

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AIRecognitionScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{
    previewLocale?: string;
    photoCount?: string;
  }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
  const customerFirstName = customerName.split(" ")[0] ?? customerName;
  const bookingId = "HX-DEMO-1027";

  // Real local media state: default 4 demo photos attached
  const photoCount = params.photoCount !== undefined ? Number.parseInt(params.photoCount, 10) : 4;
  const hasValidMedia = photoCount >= 4;

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/ai-review-handoff");
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleAnalyzePhotos = useCallback(() => {
    if (!hasValidMedia) {
      setNoticeMessage(t("c22AiRecognition.noticeMissingMedia"));
      return;
    }
    // Navigate to C22-P processing demo simulation
    router.push({
      pathname: "/ai-processing",
      params: { previewLocale: currentLocale },
    });
  }, [hasValidMedia, router, currentLocale, t]);

  const handleReviewManual = useCallback(() => {
    setNoticeMessage(t("c22AiRecognition.noticeReviewManual"));
  }, [t]);

  const handleNoPhotos = useCallback(() => {
    router.push({
      pathname: "/ai-missing-photos",
      params: { previewLocale: currentLocale },
    });
  }, [router, currentLocale]);

  const handleOfflineRecovery = useCallback(() => {
    router.push({
      pathname: "/ai-offline-recovery",
      params: { previewLocale: currentLocale },
    });
  }, [router, currentLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        {/* FlowHeaderStart has centered brand wordmark without back button */}
        <FlowHeaderStart testID="c22-flow-header-start" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c22-scroll-container"
        >
          {/* Upcoming Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c22-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c22-notice-dismiss"
                accessibilityRole="button"
                accessibilityLabel={t("c22AiRecognition.noticeDismiss")}
              >
                <Text style={styles.noticeDismissText}>{t("c22AiRecognition.noticeDismiss")}</Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker */}
          <View style={styles.flowMarkerCard} testID="c22-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c22AiRecognition.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c22AiRecognition.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle} testID="c22-title">
              {t("c22AiRecognition.title")}
            </Text>
            <Text style={styles.screenSubtitle} testID="c22-subtitle">
              {t("c22AiRecognition.subtitle")}
            </Text>
          </View>

          {/* Customer Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c22-ledger-badge">
            <Text style={styles.ledgerBadgeText}>
              {`✓  ${customerName.toUpperCase()}  ·  ${bookingId}`}
            </Text>
          </View>

          {/* Section: Intake Ready */}
          <View style={styles.intakeReadyCard} testID="c22-intake-card">
            <Text style={styles.cardHeading}>{t("c22AiRecognition.sectionIntakeTitle")}</Text>
            <Text style={styles.intakeLine}>
              {t("c22AiRecognition.intakeBooking", { bookingId })}
            </Text>
            <Text style={styles.intakeLine}>
              {t("c22AiRecognition.intakeCustomerLocation", {
                name: customerName,
              })}
            </Text>
            <Text style={styles.intakeLine}>
              {t("c22AiRecognition.intakeItemsPhotos", {
                itemCount: 3,
                pieceCount: 4,
                photoCount: photoCount,
              })}
            </Text>
          </View>

          {/* Section: Uploaded Evidence */}
          <View style={styles.evidenceCard} testID="c22-evidence-card">
            <Text style={styles.cardHeading}>{t("c22AiRecognition.sectionEvidenceTitle")}</Text>

            {C22_EVIDENCE_ITEMS.map((item) => (
              <View key={item.id} style={styles.photoRow} testID={`c22-photo-row-${item.id}`}>
                <Image
                  source={EVIDENCE_IMAGES[item.imageKey]}
                  style={styles.photoThumb}
                  resizeMode="cover"
                  testID={`c22-thumb-${item.id}`}
                />
                <View style={styles.photoInfo}>
                  <Text style={styles.photoTitle}>{t(`c22AiRecognition.${item.labelKey}`)}</Text>
                  <Text style={styles.photoSubtitle}>
                    {t("c22AiRecognition.evidenceDisclaimer")}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Section: AI Advisory Notice */}
          <View style={styles.advisoryCard} testID="c22-advisory-card">
            <View style={styles.feedbackNoticeBox}>
              <View style={styles.infoIconWrapper}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke={colors.brand} strokeWidth={2} />
                  <Path
                    d="M12 16V12M12 8H12.01"
                    stroke={colors.brand}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <View style={styles.feedbackTextWrapper}>
                <Text style={styles.feedbackTitle}>
                  {t("c22AiRecognition.sectionAdvisoryTitle")}
                </Text>
                <Text style={styles.feedbackSupporting}>
                  {t("c22AiRecognition.advisorySupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.advisoryBodyText}>
              {t("c22AiRecognition.advisoryText", { customerFirstName })}
            </Text>
          </View>

          {/* Actions: Prototype Navigation */}
          <View style={styles.actionGroup}>
            <Pressable
              onPress={handleAnalyzePhotos}
              style={styles.primaryButton}
              testID="c22-primary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22AiRecognition.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>{t("c22AiRecognition.primaryCta")}</Text>
            </Pressable>

            <Pressable
              onPress={handleReviewManual}
              style={styles.outlineButton}
              testID="c22-secondary-manual-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22AiRecognition.secondaryReviewManualCta")}
            >
              <Text style={styles.outlineButtonText}>
                {t("c22AiRecognition.secondaryReviewManualCta")}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleNoPhotos}
              style={styles.outlineButton}
              testID="c22-secondary-nophotos-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22AiRecognition.secondaryNoPhotosCta")}
            >
              <Text style={styles.outlineButtonText}>
                {t("c22AiRecognition.secondaryNoPhotosCta")}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleOfflineRecovery}
              style={styles.outlineButton}
              testID="c22-secondary-offline-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22AiRecognition.secondaryOfflineCta")}
            >
              <Text style={styles.outlineButtonText}>
                {t("c22AiRecognition.secondaryOfflineCta")}
              </Text>
            </Pressable>
          </View>

          {/* Footer Demo Rate Disclaimer */}
          <View style={styles.footerSection} testID="c22-footer">
            <Text style={styles.footerText}>{t("c22AiRecognition.footerDemo")}</Text>
            <Text style={styles.footerSubText}>{t("c22AiRecognition.footerSrs")}</Text>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  noticeBanner: {
    backgroundColor: colors.surface,
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeText: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
    lineHeight: 18,
    marginRight: 10,
  },
  noticeDismissButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.brand,
    borderRadius: 8,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.background,
  },
  flowMarkerCard: {
    backgroundColor: colors.surface,
    height: 34,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  flowMarkerActive: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
  },
  flowMarkerSub: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
  },
  headingSection: {
    marginBottom: 16,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    color: colors.primaryText,
    lineHeight: 30,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  ledgerBadge: {
    backgroundColor: "#1A2510",
    borderRadius: 8,
    height: 37,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  ledgerBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.3,
  },
  intakeReadyCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#35403B",
  },
  cardHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
    marginBottom: 10,
  },
  intakeLine: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
    marginBottom: 6,
  },
  evidenceCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#35403B",
    gap: 12,
  },
  photoRow: {
    backgroundColor: colors.elevated,
    borderRadius: 10,
    height: 91,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 9,
    paddingRight: 12,
  },
  photoThumb: {
    width: 102,
    height: 74,
    borderRadius: 9,
  },
  photoInfo: {
    marginLeft: 11,
    flex: 1,
    justifyContent: "center",
  },
  photoTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.primaryText,
    marginBottom: 4,
  },
  photoSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
    lineHeight: 15,
  },
  advisoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#35403B",
    gap: 12,
  },
  feedbackNoticeBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35403B",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIconWrapper: {
    marginRight: 12,
  },
  feedbackTextWrapper: {
    flex: 1,
  },
  feedbackTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
    lineHeight: 18,
  },
  feedbackSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 2,
  },
  advisoryBodyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  actionGroup: {
    gap: 11,
    marginTop: 8,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.background,
  },
  outlineButton: {
    backgroundColor: colors.surface,
    borderColor: "#35403B",
    borderWidth: 1,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  outlineButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerSection: {
    alignItems: "flex-start",
    gap: 4,
  },
  footerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
  },
  footerSubText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
  },
});
