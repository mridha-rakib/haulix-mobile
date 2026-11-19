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
import {
  C25_ILLUSTRATIVE_FORMULA,
  C25_ILLUSTRATIVE_TOTAL,
  C25_ITEMIZED_CHARGES,
} from "../../src/fixtures/c33QuoteTerms";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function ItemizedQuoteScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

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
        pathname: "/illustrative-quote",
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

  const handleReviewAcceptance = useCallback(() => {
    setNoticeMessage(t("c25ItemizedQuote.noticeAcceptanceScheduled"));
  }, [t]);

  const handleChangeInventory = useCallback(() => {
    router.push({
      pathname: "/quote-revision",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleUnavailableState = useCallback(() => {
    setNoticeMessage(t("c25ItemizedQuote.noticeUnavailableScheduled"));
  }, [t]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c25ItemizedQuote.backA11y")}
          testID="c25-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c25-scroll-container"
        >
          {/* Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c25-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c25-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>{t("c25ItemizedQuote.noticeDismiss")}</Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c25-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c25ItemizedQuote.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c25ItemizedQuote.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c25ItemizedQuote.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c25ItemizedQuote.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c25-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c25ItemizedQuote.customerContext", {
                name: customerName,
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Estimate reference */}
          <View style={styles.cardSection} testID="c25-reference-section">
            <Text style={styles.sectionTitle}>{t("c25ItemizedQuote.sectionReferenceTitle")}</Text>
            <Text style={styles.referenceParagraph}>
              {t("c25ItemizedQuote.referenceCase", { name: profile.name })}
            </Text>
            <Text style={styles.referenceParagraph}>{t("c25ItemizedQuote.referenceItems")}</Text>
            <Text style={styles.referenceParagraph}>{t("c25ItemizedQuote.referenceCrew")}</Text>
          </View>

          {/* Section: Example itemized charges */}
          <View style={styles.cardSection} testID="c25-charges-section">
            <Text style={styles.sectionTitle}>{t("c25ItemizedQuote.sectionChargesTitle")}</Text>
            {C25_ITEMIZED_CHARGES.map((charge) => (
              <View key={charge.id} style={styles.chargeRow} testID={`c25-${charge.id}`}>
                <Text style={styles.chargeLabel}>{t(`c25ItemizedQuote.${charge.labelKey}`)}</Text>
                <Text style={styles.chargeAmount}>{charge.amount}</Text>
              </View>
            ))}
          </View>

          {/* Section: Initial illustrative subtotal */}
          <View style={styles.cardSection} testID="c25-subtotal-section">
            <Text style={styles.sectionTitle}>{t("c25ItemizedQuote.sectionSubtotalTitle")}</Text>
            <View style={styles.heroTotalCard} testID="c25-hero-total">
              <Text style={styles.heroTotalAmount}>{C25_ILLUSTRATIVE_TOTAL}</Text>
              <Text style={styles.heroTotalFormula}>{C25_ILLUSTRATIVE_FORMULA}</Text>
              <Text style={styles.heroTotalNote}>{t("c25ItemizedQuote.subtotalTariffNote")}</Text>
            </View>
          </View>

          {/* Section: Price disclosure */}
          <View style={styles.cardSection} testID="c25-disclosure-section">
            <View style={styles.infoNoticeCard}>
              <View style={styles.infoNoticeIcon}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke={colors.brand} strokeWidth={2} />
                  <Line
                    x1={12}
                    y1={8}
                    x2={12}
                    y2={12}
                    stroke={colors.brand}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <Circle cx={12} cy={16} r={1} fill={colors.brand} />
                </Svg>
              </View>
              <View style={styles.infoNoticeContent}>
                <Text style={styles.infoNoticeTitle}>
                  {t("c25ItemizedQuote.sectionDisclosureTitle")}
                </Text>
                <Text style={styles.infoNoticeSupporting}>
                  {t("c25ItemizedQuote.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.disclosureParagraph}>{t("c25ItemizedQuote.disclosureTaxes")}</Text>
            <Text style={styles.disclosureParagraph}>
              {t("c25ItemizedQuote.disclosureArizona")}
            </Text>
            <Text style={styles.disclosureParagraph}>
              {t("c25ItemizedQuote.disclosureAdditionalWork")}
            </Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c25-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleReviewAcceptance}
              accessibilityRole="button"
              accessibilityLabel={t("c25ItemizedQuote.primaryCta")}
              testID="c25-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c25ItemizedQuote.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleChangeInventory}
              accessibilityRole="button"
              accessibilityLabel={t("c25ItemizedQuote.secondaryCta")}
              testID="c25-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>{t("c25ItemizedQuote.secondaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleUnavailableState}
              accessibilityRole="button"
              accessibilityLabel={t("c25ItemizedQuote.tertiaryCta")}
              testID="c25-tertiary-cta"
            >
              <Text style={styles.secondaryButtonText}>{t("c25ItemizedQuote.tertiaryCta")}</Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c25-footer">
            <Text style={styles.footerDemoText}>{t("c25ItemizedQuote.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c25ItemizedQuote.footerSrs")}</Text>
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
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  noticeBannerText: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primaryText,
    lineHeight: 16,
  },
  noticeDismissButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.brand,
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
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
  },
  referenceParagraph: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  chargeRow: {
    backgroundColor: colors.elevated,
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chargeLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.primaryText,
  },
  chargeAmount: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
  },
  heroTotalCard: {
    backgroundColor: colors.brand,
    borderRadius: 13,
    paddingHorizontal: 17,
    paddingTop: 13,
    paddingBottom: 12,
    gap: 6,
  },
  heroTotalAmount: {
    fontFamily: fontFamily.bold,
    fontSize: 33,
    color: colors.background,
  },
  heroTotalFormula: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.background,
  },
  heroTotalNote: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.background,
  },
  infoNoticeCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#35403B",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoNoticeIcon: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  infoNoticeContent: {
    flex: 1,
    gap: 4,
  },
  infoNoticeTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
    lineHeight: 18,
  },
  infoNoticeSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
  },
  disclosureParagraph: {
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
