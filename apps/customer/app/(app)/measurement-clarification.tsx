import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C23U_CLARIFICATION_DETAILS } from "../../src/fixtures/c30Verification";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function MeasurementClarificationScreen() {
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
      router.push("/verify-suggested-inventory");
    }
  }, [router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleCorrectMeasurements = useCallback(() => {
    setNoticeMessage(t("c23uMeasurementClarification.noticeCorrectMeasurements"));
  }, [t]);

  const handleAdminReview = useCallback(() => {
    setNoticeMessage(t("c23uMeasurementClarification.noticeAdminReview"));
  }, [t]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c23uMeasurementClarification.backA11y")}
          testID="c23u-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c23u-scroll-container"
        >
          {/* Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c23u-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c23u-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>
                  {t("c23uMeasurementClarification.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c23u-flow-marker">
            <Text style={styles.flowMarkerActive}>
              {t("c23uMeasurementClarification.flowMarker")}
            </Text>
            <Text style={styles.flowMarkerSub}>{t("c23uMeasurementClarification.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c23uMeasurementClarification.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c23uMeasurementClarification.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c23u-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c23uMeasurementClarification.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Details needing attention */}
          <View style={styles.sectionCard} testID="c23u-details-card">
            <Text style={styles.cardHeading}>
              {t("c23uMeasurementClarification.sectionAttentionTitle")}
            </Text>

            {C23U_CLARIFICATION_DETAILS.map((detail) => {
              let label = "";
              let value = "";

              if (detail.fieldKey === "item") {
                label = t("c23uMeasurementClarification.fieldItemLabel");
                value = t("c23uMeasurementClarification.fieldItemValue");
              } else if (detail.fieldKey === "quantity") {
                label = t("c23uMeasurementClarification.fieldQuantityLabel");
                value = t("c23uMeasurementClarification.fieldQuantityValue");
              } else if (detail.fieldKey === "weight") {
                label = t("c23uMeasurementClarification.fieldWeightLabel");
                value = t("c23uMeasurementClarification.fieldWeightValue");
              } else if (detail.fieldKey === "exact") {
                label = t("c23uMeasurementClarification.fieldExactLabel");
                value = t("c23uMeasurementClarification.fieldExactValue");
              } else {
                label = t("c23uMeasurementClarification.fieldLiftingLabel");
                value = t("c23uMeasurementClarification.fieldLiftingValue");
              }

              return (
                <View
                  key={detail.id}
                  style={styles.fieldRow}
                  testID={`c23u-field-${detail.fieldKey}`}
                >
                  <Text style={styles.fieldLabel}>{label}</Text>
                  <Text style={styles.fieldValue}>{value}</Text>
                </View>
              );
            })}
          </View>

          {/* Section: No definitive quote yet */}
          <View style={styles.sectionCard} testID="c23u-quote-card">
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
                  {t("c23uMeasurementClarification.sectionQuoteTitle")}
                </Text>
                <Text style={styles.feedbackSupporting}>
                  {t("c23uMeasurementClarification.quoteSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.guidanceTextPrimary}>
              {t("c23uMeasurementClarification.quoteGuidance1")}
            </Text>
            <Text style={styles.guidanceTextSecondary}>
              {t("c23uMeasurementClarification.quoteGuidance2")}
            </Text>
          </View>

          {/* Actions / Prototype Navigation */}
          <View style={styles.actionGroup}>
            <Pressable
              onPress={handleCorrectMeasurements}
              style={styles.primaryButton}
              accessibilityRole="button"
              accessibilityLabel={t("c23uMeasurementClarification.primaryCta")}
              testID="c23u-correct-measurements-btn"
            >
              <Text style={styles.primaryButtonText}>
                {t("c23uMeasurementClarification.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              onPress={handleAdminReview}
              style={styles.secondaryButton}
              accessibilityRole="button"
              accessibilityLabel={t("c23uMeasurementClarification.secondaryCta")}
              testID="c23u-admin-review-btn"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c23uMeasurementClarification.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Developer Handoff / Rate Disclaimer */}
          <View style={styles.footerDisclaimer}>
            <Text style={styles.footerDisclaimerText}>
              {t("c23uMeasurementClarification.footerDemo")}
            </Text>
            <Text style={styles.footerDisclaimerSub}>
              {t("c23uMeasurementClarification.footerSrs")}
            </Text>
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
  fieldRow: {
    backgroundColor: colors.elevated,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 9,
    paddingBottom: 7,
    gap: 5,
    minHeight: 63,
  },
  fieldLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.secondaryText,
  },
  fieldValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.primaryText,
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
