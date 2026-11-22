import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C24P_CALCULATION_STEPS } from "../../src/fixtures/c32Quote";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function QuoteProcessingScreen() {
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
      router.push({
        pathname: "/customer-confirmed-items",
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    }
  }, [router, params.previewLocale]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleViewEstimate = useCallback(() => {
    router.push({
      pathname: "/illustrative-quote",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handlePricingErrorExample = useCallback(() => {
    router.push({
      pathname: "/quote-error-recovery",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c24pQuoteProcessing.backA11y")}
          testID="c24p-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c24p-scroll-container"
        >
          {/* Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c24p-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c24p-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>
                  {t("c24pQuoteProcessing.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c24p-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c24pQuoteProcessing.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c24pQuoteProcessing.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c24pQuoteProcessing.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c24pQuoteProcessing.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c24p-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c24pQuoteProcessing.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Estimate calculation */}
          <View style={styles.cardSection} testID="c24p-calculation-section">
            <Text style={styles.sectionTitle}>
              {t("c24pQuoteProcessing.sectionCalculationTitle")}
            </Text>

            {C24P_CALCULATION_STEPS.map((step) => (
              <View key={step.id} style={styles.progressRow} testID={`c24p-step-${step.stepKey}`}>
                <Text style={styles.progressLabel}>
                  {t(`c24pQuoteProcessing.${step.labelKey}`)}
                </Text>
                <Text style={styles.progressValue}>
                  {t(`c24pQuoteProcessing.${step.valueKey}`)}
                </Text>
              </View>
            ))}
          </View>

          {/* Section: Demonstration, not a live tariff */}
          <View style={styles.cardSection} testID="c24p-notice-section">
            <View style={styles.feedbackNoticeCard}>
              <View style={styles.feedbackNoticeIcon}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.feedbackNoticeContent}>
                <Text style={styles.feedbackNoticeTitle}>
                  {t("c24pQuoteProcessing.sectionNoticeTitle")}
                </Text>
                <Text style={styles.feedbackNoticeSupporting}>
                  {t("c24pQuoteProcessing.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>
              {t("c24pQuoteProcessing.guidancePrerequisites")}
            </Text>
            <Text style={styles.noticeParagraph}>
              {t("c24pQuoteProcessing.guidanceNoProvider")}
            </Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c24p-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleViewEstimate}
              accessibilityRole="button"
              accessibilityLabel={t("c24pQuoteProcessing.primaryCta")}
              testID="c24p-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c24pQuoteProcessing.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handlePricingErrorExample}
              accessibilityRole="button"
              accessibilityLabel={t("c24pQuoteProcessing.secondaryCta")}
              testID="c24p-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c24pQuoteProcessing.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c24p-footer">
            <Text style={styles.footerDemoText}>{t("c24pQuoteProcessing.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c24pQuoteProcessing.footerSrs")}</Text>
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
    paddingTop: 8,
    paddingBottom: 40,
    gap: 16,
  },
  noticeBanner: {
    backgroundColor: "#1A2510",
    borderWidth: 1,
    borderColor: colors.brand,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeBannerText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.brand,
    flex: 1,
    marginRight: 8,
  },
  noticeDismissButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#222827",
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.primaryText,
  },
  flowMarker: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
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
    gap: 6,
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
    lineHeight: 18,
  },
  ledgerBadge: {
    backgroundColor: "#1A2510",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "stretch",
  },
  ledgerBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 18,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
  },
  progressRow: {
    backgroundColor: colors.elevated,
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.primaryText,
    flex: 1,
    marginRight: 8,
  },
  progressValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: colors.brand,
    textAlign: "right",
  },
  feedbackNoticeCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  feedbackNoticeIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackNoticeContent: {
    flex: 1,
    gap: 3,
  },
  feedbackNoticeTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
  },
  feedbackNoticeSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
  },
  noticeParagraph: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  actionsContainer: {
    gap: 11,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    height: 52,
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerDisclaimer: {
    gap: 4,
    marginTop: 8,
  },
  footerDemoText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
  },
  footerSrsText: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: "#788580",
  },
});
