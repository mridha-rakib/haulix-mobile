import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function QuoteErrorRecoveryScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "SARAH MITCHELL" : profile.name.toUpperCase();
  const bookingId = "HX-DEMO-1027";

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
        pathname: "/quote-processing",
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

  const handleRetryCalculation = useCallback(() => {
    router.push({
      pathname: "/quote-processing",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleSendToAdmin = useCallback(() => {
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
          backA11y={t("c24fQuoteErrorRecovery.backA11y")}
          testID="c24f-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c24f-scroll-container"
        >
          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c24f-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c24fQuoteErrorRecovery.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c24fQuoteErrorRecovery.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c24fQuoteErrorRecovery.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c24fQuoteErrorRecovery.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c24f-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c24fQuoteErrorRecovery.customerContext", {
                name: customerName,
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Calculation could not be completed */}
          <View style={styles.cardSection} testID="c24f-error-section">
            <View style={styles.errorNoticeCard}>
              <View style={styles.errorNoticeIcon}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke="#F36D6D" strokeWidth={2} />
                  <Line
                    x1={12}
                    y1={8}
                    x2={12}
                    y2={12}
                    stroke="#F36D6D"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <Circle cx={12} cy={16} r={1} fill="#F36D6D" />
                </Svg>
              </View>
              <View style={styles.errorNoticeContent}>
                <Text style={styles.errorNoticeTitle}>
                  {t("c24fQuoteErrorRecovery.noticeTitle")}
                </Text>
                <Text style={styles.errorNoticeSupporting}>
                  {t("c24fQuoteErrorRecovery.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>{t("c24fQuoteErrorRecovery.guidance")}</Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c24f-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleRetryCalculation}
              accessibilityRole="button"
              accessibilityLabel={t("c24fQuoteErrorRecovery.primaryCta")}
              testID="c24f-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c24fQuoteErrorRecovery.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleSendToAdmin}
              accessibilityRole="button"
              accessibilityLabel={t("c24fQuoteErrorRecovery.secondaryCta")}
              testID="c24f-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c24fQuoteErrorRecovery.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c24f-footer">
            <Text style={styles.footerDemoText}>{t("c24fQuoteErrorRecovery.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c24fQuoteErrorRecovery.footerSrs")}</Text>
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
  },
  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
    gap: 12,
  },
  errorNoticeCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F36D6D",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  errorNoticeIcon: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  errorNoticeContent: {
    flex: 1,
    gap: 4,
  },
  errorNoticeTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
    lineHeight: 18,
  },
  errorNoticeSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
  },
  noticeParagraph: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  actionsContainer: {
    gap: 11,
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.background,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35403B",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
  },
  footerDisclaimer: {
    gap: 7,
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
