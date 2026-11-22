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

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function AdminReviewPendingScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;

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
        pathname: "/measurement-clarification",
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

  const handleApprovedExample = useCallback(() => {
    router.push({
      pathname: "/admin-review-resolved",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleProvideMoreDetail = useCallback(() => {
    router.push({
      pathname: "/measurement-clarification",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleChangesExample = useCallback(() => {
    router.push({
      pathname: "/admin-clarification-requested",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c24admAdminReviewPending.backA11y")}
          testID="c24adm-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c24adm-scroll-container"
        >
          {/* Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c24adm-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c24adm-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>
                  {t("c24admAdminReviewPending.noticeDismiss")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c24adm-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c24admAdminReviewPending.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c24admAdminReviewPending.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c24admAdminReviewPending.title")}</Text>
            <Text style={styles.screenSubtitle}>{t("c24admAdminReviewPending.subtitle")}</Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c24adm-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c24admAdminReviewPending.customerContext", {
                name: customerName.toUpperCase(),
              })}
            </Text>
          </View>

          {/* Section: Review case · fictional */}
          <View style={styles.cardSection} testID="c24adm-case-section">
            <Text style={styles.sectionTitle}>
              {t("c24admAdminReviewPending.sectionCaseTitle")}
            </Text>
            <Text style={styles.caseDetailText}>{t("c24admAdminReviewPending.caseLine1")}</Text>
            <Text style={styles.caseDetailText}>{t("c24admAdminReviewPending.caseConcern")}</Text>
            <Text style={styles.caseDetailText}>{t("c24admAdminReviewPending.caseStatus")}</Text>
          </View>

          {/* Section: No definitive amount yet */}
          <View style={styles.cardSection} testID="c24adm-notice-section">
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
                  {t("c24admAdminReviewPending.sectionNoticeTitle")}
                </Text>
                <Text style={styles.feedbackNoticeSupporting}>
                  {t("c24admAdminReviewPending.noticeSupporting")}
                </Text>
              </View>
            </View>
            <Text style={styles.noticeParagraph}>
              {t("c24admAdminReviewPending.guidanceOutcome")}
            </Text>
            <Text style={styles.noticeParagraph}>
              {t("c24admAdminReviewPending.guidanceRequired")}
            </Text>
          </View>

          {/* Action CTAs */}
          <View style={styles.actionsContainer} testID="c24adm-actions">
            <Pressable
              style={styles.primaryButton}
              onPress={handleApprovedExample}
              accessibilityRole="button"
              accessibilityLabel={t("c24admAdminReviewPending.primaryCta")}
              testID="c24adm-primary-cta"
            >
              <Text style={styles.primaryButtonText}>
                {t("c24admAdminReviewPending.primaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleProvideMoreDetail}
              accessibilityRole="button"
              accessibilityLabel={t("c24admAdminReviewPending.secondaryCta")}
              testID="c24adm-secondary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c24admAdminReviewPending.secondaryCta")}
              </Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleChangesExample}
              accessibilityRole="button"
              accessibilityLabel={t("c24admAdminReviewPending.tertiaryCta")}
              testID="c24adm-tertiary-cta"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c24admAdminReviewPending.tertiaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Disclaimer / Footer */}
          <View style={styles.footerDisclaimer} testID="c24adm-footer">
            <Text style={styles.footerDemoText}>{t("c24admAdminReviewPending.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c24admAdminReviewPending.footerSrs")}</Text>
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
    color: colors.primaryText,
    fontFamily: fontFamily.medium,
    fontSize: 13,
    flex: 1,
  },
  noticeDismissButton: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  noticeDismissText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
  },
  flowMarker: {
    backgroundColor: colors.surface,
    height: 34,
    borderRadius: 9,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  flowMarkerActive: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  flowMarkerSub: {
    color: "#788580",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
  headingSection: {
    gap: 8,
  },
  screenTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 25,
    lineHeight: 32,
  },
  screenSubtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  ledgerBadge: {
    backgroundColor: "#1A2510",
    height: 37,
    borderRadius: 8,
    paddingLeft: 12,
    justifyContent: "center",
  },
  ledgerBadgeText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: 17,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 17,
  },
  caseDetailText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  feedbackNoticeCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  feedbackNoticeIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackNoticeContent: {
    flex: 1,
    gap: 2,
  },
  feedbackNoticeTitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
  feedbackNoticeSupporting: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  noticeParagraph: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
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
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    color: colors.background,
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#35403B",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
  },
  footerDisclaimer: {
    gap: 7,
    marginTop: 8,
    paddingBottom: 16,
  },
  footerDemoText: {
    color: "#788580",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
  footerSrsText: {
    color: "#788580",
    fontFamily: fontFamily.regular,
    fontSize: 10,
  },
});
