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
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C22P_EVIDENCE_ITEMS } from "../../src/fixtures/c28AiHandoffs";

const EVIDENCE_IMAGES: Record<string, ImageSourcePropType> = {
  sofa: require("../../assets/images/intake/c18j-sofa.png"),
  mattresses: require("../../assets/images/intake/c18j-mattresses.png"),
};

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AIProcessingScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
  const bookingId = "HX-DEMO-1027";

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/ai-recognition");
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleViewResult = useCallback(() => {
    router.push({
      pathname: "/ai-suggested-items",
      params: { previewLocale: currentLocale },
    });
  }, [router, currentLocale]);

  const handleNetworkFailureExample = useCallback(() => {
    router.push({
      pathname: "/ai-recognition-failed",
      params: { previewLocale: currentLocale },
    });
  }, [router, currentLocale]);

  const handleUncertainExample = useCallback(() => {
    router.push({
      pathname: "/ai-uncertain-result",
      params: { previewLocale: currentLocale },
    });
  }, [router, currentLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c22pAiProcessing.backA11y")}
          testID="c22p-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c22p-scroll-container"
        >
          {/* Upcoming Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c22p-notice-banner">
              <Text style={styles.noticeText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c22p-notice-dismiss"
                accessibilityRole="button"
                accessibilityLabel={t("c22pAiProcessing.noticeDismiss")}
              >
                <Text style={styles.noticeDismissText}>{t("c22pAiProcessing.noticeDismiss")}</Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker */}
          <View style={styles.flowMarkerCard} testID="c22p-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c22pAiProcessing.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c22pAiProcessing.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle} testID="c22p-title">
              {t("c22pAiProcessing.title")}
            </Text>
            <Text style={styles.screenSubtitle} testID="c22p-subtitle">
              {t("c22pAiProcessing.subtitle")}
            </Text>
          </View>

          {/* Customer Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c22p-ledger-badge">
            <Text style={styles.ledgerBadgeText}>
              {`✓  ${customerName.toUpperCase()}  ·  ${bookingId}`}
            </Text>
          </View>

          {/* Section: Recognition Progress */}
          <View style={styles.progressCard} testID="c22p-progress-card">
            <Text style={styles.cardHeading}>{t("c22pAiProcessing.sectionProgressTitle")}</Text>

            {/* Row 1: Upload Validation */}
            <View style={styles.progressRow} testID="c22p-row-upload-validation">
              <Text style={styles.progressLabel}>
                {t("c22pAiProcessing.progressUploadValidation")}
              </Text>
              <Text style={styles.progressStatusDone}>
                {t("c22pAiProcessing.progressUploadValidationStatus")}
              </Text>
            </View>

            {/* Row 2: Item Classification */}
            <View style={styles.progressRow} testID="c22p-row-item-classification">
              <Text style={styles.progressLabel}>
                {t("c22pAiProcessing.progressItemClassification")}
              </Text>
              <Text style={styles.progressStatusActive}>
                {t("c22pAiProcessing.progressItemClassificationStatus")}
              </Text>
            </View>

            {/* Row 3: Compare to customer list */}
            <View style={styles.progressRow} testID="c22p-row-compare-list">
              <Text style={styles.progressLabel}>{t("c22pAiProcessing.progressCompareList")}</Text>
              <Text style={styles.progressStatusPending}>
                {t("c22pAiProcessing.progressCompareListStatus")}
              </Text>
            </View>

            {/* Row 4: Safety/uncertainty checks */}
            <View style={styles.progressRow} testID="c22p-row-safety-checks">
              <Text style={styles.progressLabel}>{t("c22pAiProcessing.progressSafetyChecks")}</Text>
              <Text style={styles.progressStatusPending}>
                {t("c22pAiProcessing.progressSafetyChecksStatus")}
              </Text>
            </View>
          </View>

          {/* Section: Evidence being analyzed */}
          <View style={styles.evidenceCard} testID="c22p-evidence-card">
            <Text style={styles.cardHeading}>{t("c22pAiProcessing.sectionEvidenceTitle")}</Text>

            {C22P_EVIDENCE_ITEMS.map((item) => (
              <View key={item.id} style={styles.photoRow} testID={`c22p-photo-row-${item.id}`}>
                <Image
                  source={EVIDENCE_IMAGES[item.imageKey]}
                  style={styles.photoThumb}
                  resizeMode="cover"
                  testID={`c22p-thumb-${item.id}`}
                />
                <View style={styles.photoInfo}>
                  <Text style={styles.photoTitle}>{t(`c22pAiProcessing.${item.labelKey}`)}</Text>
                  <Text style={styles.photoSubtitle}>
                    {t("c22pAiProcessing.evidenceDisclaimer")}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Section: Processing State Notice */}
          <View style={styles.stateNoticeCard} testID="c22p-state-notice-card">
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
                  {t("c22pAiProcessing.sectionProcessingStateTitle")}
                </Text>
                <Text style={styles.feedbackSupporting}>
                  {t("c22pAiProcessing.processingStateSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.stateBodyText}>{t("c22pAiProcessing.processingStateText")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionGroup}>
            <Pressable
              onPress={handleViewResult}
              style={styles.primaryButton}
              testID="c22p-primary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22pAiProcessing.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>{t("c22pAiProcessing.primaryCta")}</Text>
            </Pressable>

            <Pressable
              onPress={handleNetworkFailureExample}
              style={styles.outlineButton}
              testID="c22p-secondary-network-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22pAiProcessing.secondaryNetworkFailureCta")}
            >
              <Text style={styles.outlineButtonText}>
                {t("c22pAiProcessing.secondaryNetworkFailureCta")}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleUncertainExample}
              style={styles.outlineButton}
              testID="c22p-secondary-uncertain-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c22pAiProcessing.secondaryUncertainCta")}
            >
              <Text style={styles.outlineButtonText}>
                {t("c22pAiProcessing.secondaryUncertainCta")}
              </Text>
            </Pressable>
          </View>

          {/* Footer Demo Rate Disclaimer */}
          <View style={styles.footerSection} testID="c22p-footer">
            <Text style={styles.footerText}>{t("c22pAiProcessing.footerDemo")}</Text>
            <Text style={styles.footerSubText}>{t("c22pAiProcessing.footerSrs")}</Text>
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
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#35403B",
    gap: 10,
  },
  cardHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
    marginBottom: 4,
  },
  progressRow: {
    backgroundColor: colors.elevated,
    borderRadius: 9,
    height: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  progressLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.primaryText,
  },
  progressStatusDone: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
  },
  progressStatusActive: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
  },
  progressStatusPending: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.secondaryText,
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
  stateNoticeCard: {
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
  stateBodyText: {
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
