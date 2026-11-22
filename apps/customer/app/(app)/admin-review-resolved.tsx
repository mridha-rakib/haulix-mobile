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

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AdminReviewResolvedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
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
        pathname: "/admin-review-pending",
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

  const handleViewQuote = useCallback(() => {
    router.push({
      pathname: "/illustrative-quote",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReviewItems = useCallback(() => {
    router.push({
      pathname: "/customer-confirmed-items",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c24admSAdminReviewResolved.backA11y")}
          testID="c24adms-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c24adms-scroll-container"
        >
          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c24adms-flow-marker">
            <Text style={styles.flowMarkerActive}>
              {t("c24admSAdminReviewResolved.flowMarker")}
            </Text>
            <Text style={styles.flowMarkerSub}>{t("c24admSAdminReviewResolved.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c24admSAdminReviewResolved.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c24admSAdminReviewResolved.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c24adms-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c24admSAdminReviewResolved.customerContext", {
                name: customerName.toUpperCase(),
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Illustrative review outcome: approved */}
          <View style={styles.cardSection} testID="c24adms-outcome-section">
            <View style={styles.feedbackNoticeCard}>
              <View style={styles.feedbackNoticeIcon}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke={colors.brand} strokeWidth={2} />
                  <Path
                    d="M8 12l2.5 2.5L16 9"
                    stroke={colors.brand}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.feedbackNoticeContent}>
                <Text style={styles.feedbackNoticeTitle}>
                  {t("c24admSAdminReviewResolved.sectionNoticeTitle")}
                </Text>
                <Text style={styles.feedbackNoticeSupporting}>
                  {t("c24admSAdminReviewResolved.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>
              {t("c24admSAdminReviewResolved.guidanceRulesNeeded")}
            </Text>
            <Text style={styles.noticeParagraph}>
              {t("c24admSAdminReviewResolved.guidanceValidated")}
            </Text>
          </View>

          {/* Section: Confirmed scope */}
          <View style={styles.cardSection} testID="c24adms-scope-section">
            <Text style={styles.sectionTitle}>
              {t("c24admSAdminReviewResolved.sectionScopeTitle")}
            </Text>
            <Text style={styles.scopeItemText}>{t("c24admSAdminReviewResolved.scopeItems")}</Text>
            <Text style={styles.scopeDetailText}>
              {t("c24admSAdminReviewResolved.scopeDetails")}
            </Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c24adms-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleViewQuote}
              accessibilityRole="button"
              accessibilityLabel={t("c24admSAdminReviewResolved.primaryCta")}
              testID="c24adms-primary-cta"
            >
              <Text style={styles.primaryButtonText}>
                {t("c24admSAdminReviewResolved.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleReviewItems}
              accessibilityRole="button"
              accessibilityLabel={t("c24admSAdminReviewResolved.secondaryCta")}
              testID="c24adms-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c24admSAdminReviewResolved.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c24adms-footer">
            <Text style={styles.footerDemoText}>{t("c24admSAdminReviewResolved.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c24admSAdminReviewResolved.footerSrs")}</Text>
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
  scopeItemText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  scopeDetailText: {
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
