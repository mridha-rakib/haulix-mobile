/**
 * HAULIX Customer Mobile App — Phase 03.34
 * Screen C25-A: Quote Acceptance Review
 *
 * Authoritative Figma References:
 * - English: Node 412:1335 (430 × 1252 px)
 * - Spanish: Node 987:11278 (430 × 1252 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities (Queen mattresses = 2, total 4 pieces across 3 categories) are strictly preserved.
 * - Displays illustrative $356 subtotal; no real booking, charge, payment authorization or Stripe transaction.
 */

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
  C25A_DEFAULT_DRAFT,
  C25A_ILLUSTRATIVE_SUBTOTAL,
} from "../../src/fixtures/c34ScopeAcceptance";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function QuoteAcceptanceReviewScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "SARAH MITCHELL" : profile.name.toUpperCase();
  const bookingId = C25A_DEFAULT_DRAFT.bookingId;
  const pickupAddress = profile.savedAddress
    ? `${profile.savedAddress}, AZ 85014`
    : C25A_DEFAULT_DRAFT.pickupAddress;

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/itemized-quote",
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

  const handleAcceptScope = useCallback(() => {
    router.push({
      pathname: "/scope-accepted",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleBackToBreakdown = useCallback(() => {
    handleBack();
  }, [handleBack]);

  const handleSimulateRecovery = useCallback(() => {
    router.push({
      pathname: "/scope-acceptance-recovery",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c25aQuoteAcceptanceReview.backA11y")}
          testID="c25a-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c25a-scroll-container"
        >
          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c25a-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c25aQuoteAcceptanceReview.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c25aQuoteAcceptanceReview.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c25aQuoteAcceptanceReview.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c25aQuoteAcceptanceReview.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c25a-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c25aQuoteAcceptanceReview.customerContext", {
                name: customerName,
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Your booking draft */}
          <View style={styles.cardSection} testID="c25a-draft-section">
            <Text style={styles.sectionTitle}>
              {t("c25aQuoteAcceptanceReview.sectionDraftTitle")}
            </Text>
            <Text style={styles.draftParagraph} testID="c25a-draft-case">
              {t("c25aQuoteAcceptanceReview.draftCase", {
                bookingId,
                name: profile.name,
              })}
            </Text>
            <Text style={styles.draftParagraph} testID="c25a-draft-items">
              {t("c25aQuoteAcceptanceReview.draftItems", {
                serviceType: C25A_DEFAULT_DRAFT.serviceType,
                itemSummary: C25A_DEFAULT_DRAFT.itemSummary,
              })}
            </Text>
            <Text style={styles.draftParagraph} testID="c25a-draft-pickup">
              {t("c25aQuoteAcceptanceReview.draftPickup", {
                pickupAddress,
              })}
            </Text>
          </View>

          {/* Section: Initial example price */}
          <View style={styles.cardSection} testID="c25a-price-section">
            <Text style={styles.sectionTitle}>
              {t("c25aQuoteAcceptanceReview.sectionPriceTitle")}
            </Text>
            <View style={styles.heroTotalCard} testID="c25a-hero-total">
              <Text style={styles.heroTotalAmount}>{C25A_ILLUSTRATIVE_SUBTOTAL}</Text>
              <Text style={styles.heroTotalSubtitle}>
                {t("c25aQuoteAcceptanceReview.priceDemoAmount")}
              </Text>
              <Text style={styles.heroTotalNote}>
                {t("c25aQuoteAcceptanceReview.priceNoAdjustment")}
              </Text>
            </View>
          </View>

          {/* Section: What acceptance means */}
          <View style={styles.cardSection} testID="c25a-means-section">
            <Text style={styles.sectionTitle}>
              {t("c25aQuoteAcceptanceReview.sectionMeansTitle")}
            </Text>
            <View style={styles.infoNoticeCard}>
              <View style={styles.infoNoticeIcon}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke="#38BDF8" strokeWidth={2} />
                  <Line
                    x1={12}
                    y1={11}
                    x2={12}
                    y2={17}
                    stroke="#38BDF8"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                  <Circle cx={12} cy={7} r={1} fill="#38BDF8" />
                </Svg>
              </View>
              <View style={styles.infoNoticeContent}>
                <Text style={styles.infoNoticeTitle}>
                  {t("c25aQuoteAcceptanceReview.noticeMeansTitle")}
                </Text>
                <Text style={styles.infoNoticeSupporting}>
                  {t("c25aQuoteAcceptanceReview.noticeMeansSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>
              {t("c25aQuoteAcceptanceReview.noticeMeansExplanation")}
            </Text>
          </View>

          {/* Actions / Prototype Navigation */}
          <View style={styles.actionsContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={handleAcceptScope}
              testID="c25a-primary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c25aQuoteAcceptanceReview.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>
                {t("c25aQuoteAcceptanceReview.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleBackToBreakdown}
              testID="c25a-secondary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c25aQuoteAcceptanceReview.secondaryCta")}
            >
              <Text style={styles.secondaryButtonText}>
                {t("c25aQuoteAcceptanceReview.secondaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.ghostButton}
              onPress={handleSimulateRecovery}
              testID="c25a-recovery-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c25aQuoteAcceptanceReview.recoveryCta")}
            >
              <Text style={styles.ghostButtonText}>
                {t("c25aQuoteAcceptanceReview.recoveryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Developer Handoff / Rate Disclaimer */}
          <View style={styles.footerDisclaimer} testID="c25a-footer">
            <Text style={styles.footerDemoText}>{t("c25aQuoteAcceptanceReview.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c25aQuoteAcceptanceReview.footerSrs")}</Text>
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
    paddingTop: 12,
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
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
    color: colors.primaryText,
  },
  draftParagraph: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  heroTotalCard: {
    backgroundColor: colors.brand,
    borderRadius: 13,
    paddingHorizontal: 17,
    paddingTop: 13,
    paddingBottom: 12,
    gap: 4,
    alignItems: "center",
  },
  heroTotalAmount: {
    fontFamily: fontFamily.bold,
    fontSize: 34,
    color: colors.background,
  },
  heroTotalSubtitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.background,
  },
  heroTotalNote: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.background,
    textAlign: "center",
  },
  infoNoticeCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(56, 189, 248, 0.3)",
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
    color: "#38BDF8",
    lineHeight: 18,
  },
  infoNoticeSupporting: {
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
  ghostButton: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostButtonText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.secondaryText,
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
