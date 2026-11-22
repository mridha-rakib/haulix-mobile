import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
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

const MATTRESS_IMAGE: ImageSourcePropType = require("../../assets/images/intake/c18j-mattresses.png");

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AIUncertainResultScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
  const bookingId = "HX-DEMO-1027";

  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n?.language]);

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

  const handleCorrectList = useCallback(() => {
    router.push({
      pathname: "/correct-ai-items",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleAdminReview = useCallback(() => {
    router.push({
      pathname: "/admin-review-pending",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c22qAiUncertainResult.backA11y")}
          testID="c22q-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c22q-scroll-container"
        >
          {/* Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c22q-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c22q-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>
                  {t("c22qAiUncertainResult.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c22q-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c22qAiUncertainResult.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c22qAiUncertainResult.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c22qAiUncertainResult.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c22qAiUncertainResult.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c22q-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c22qAiUncertainResult.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Image needs clarification */}
          <View style={styles.sectionCard} testID="c22q-clarification-card">
            <Text style={styles.cardHeading}>
              {t("c22qAiUncertainResult.sectionClarificationTitle")}
            </Text>
            <View style={styles.photoRow} testID="c22q-photo-row">
              <View style={styles.photoThumbWrapper}>
                <Image
                  source={MATTRESS_IMAGE}
                  style={styles.photoThumb}
                  resizeMode="cover"
                  accessibilityLabel={t("c22qAiUncertainResult.photoTitle")}
                  testID="c22q-mattress-image"
                />
              </View>
              <View style={styles.photoDetails}>
                <Text style={styles.photoTitleText}>{t("c22qAiUncertainResult.photoTitle")}</Text>
                <Text style={styles.photoSubtitleText}>
                  {t("c22qAiUncertainResult.photoSubtitle")}
                </Text>
              </View>
            </View>
          </View>

          {/* Section: Category or count uncertain */}
          <View style={styles.sectionCard} testID="c22q-uncertain-card">
            <View style={styles.feedbackNoticeBox}>
              <View style={styles.infoIconWrapper}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke="#ADB7B1" strokeWidth={2} />
                  <Path
                    d="M12 16V12M12 8H12.01"
                    stroke="#ADB7B1"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
              <View style={styles.feedbackTextWrapper}>
                <Text style={styles.feedbackTitle}>
                  {t("c22qAiUncertainResult.sectionUncertainTitle")}
                </Text>
                <Text style={styles.feedbackSupporting}>
                  {t("c22qAiUncertainResult.uncertainSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.guidanceTextPrimary}>
              {t("c22qAiUncertainResult.uncertainGuidance1")}
            </Text>
            <Text style={styles.guidanceTextSecondary}>
              {t("c22qAiUncertainResult.uncertainGuidance2")}
            </Text>
          </View>

          {/* Actions / Prototype Navigation */}
          <View style={styles.actionGroup}>
            <Pressable
              onPress={handleCorrectList}
              style={styles.primaryButton}
              accessibilityRole="button"
              accessibilityLabel={t("c22qAiUncertainResult.primaryCta")}
              testID="c22q-correct-list-btn"
            >
              <Text style={styles.primaryButtonText}>{t("c22qAiUncertainResult.primaryCta")}</Text>
            </Pressable>

            <Pressable
              onPress={handleAdminReview}
              style={styles.secondaryButton}
              accessibilityRole="button"
              accessibilityLabel={t("c22qAiUncertainResult.secondaryCta")}
              testID="c22q-admin-review-btn"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c22qAiUncertainResult.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Developer Handoff / Rate Disclaimer */}
          <View style={styles.footerDisclaimer}>
            <Text style={styles.footerDisclaimerText}>{t("c22qAiUncertainResult.footerDemo")}</Text>
            <Text style={styles.footerDisclaimerSub}>{t("c22qAiUncertainResult.footerSrs")}</Text>
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
    paddingTop: 10,
    paddingBottom: 34,
    gap: 17,
  },
  noticeBanner: {
    backgroundColor: "#1C2422",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.brand,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeBannerText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.primaryText,
    lineHeight: 18,
    marginRight: 10,
  },
  noticeDismissButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.elevated,
    borderRadius: 6,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
  },
  flowMarker: {
    height: 34,
    backgroundColor: colors.surface,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
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
    gap: 8,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 25,
    color: colors.primaryText,
    lineHeight: 30,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
  },
  ledgerBadge: {
    height: 37,
    backgroundColor: "#1A2510",
    borderRadius: 8,
    justifyContent: "center",
    paddingLeft: 12,
  },
  ledgerBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
    gap: 12,
  },
  cardHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
  },
  photoRow: {
    backgroundColor: colors.elevated,
    borderRadius: 10,
    height: 91,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 9,
    gap: 11,
  },
  photoThumbWrapper: {
    width: 102,
    height: 74,
    borderRadius: 9,
    overflow: "hidden",
  },
  photoThumb: {
    width: 102,
    height: 74,
    borderRadius: 9,
  },
  photoDetails: {
    flex: 1,
    gap: 6,
  },
  photoTitleText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.primaryText,
  },
  photoSubtitleText: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
  },
  feedbackNoticeBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35403B",
    paddingLeft: 16,
    paddingRight: 13,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 92,
  },
  infoIconWrapper: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackTextWrapper: {
    flex: 1,
    gap: 7,
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
  },
  guidanceTextPrimary: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 16,
  },
  guidanceTextSecondary: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#ADB7B1",
    lineHeight: 16,
  },
  actionGroup: {
    gap: 11,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.background,
  },
  secondaryButton: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35403B",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerDisclaimer: {
    gap: 7,
  },
  footerDisclaimerText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
  },
  footerDisclaimerSub: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
  },
});
