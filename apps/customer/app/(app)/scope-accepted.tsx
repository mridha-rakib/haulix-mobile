/**
 * HAULIX Customer Mobile App — Phase 03.34
 * Screen C26-A: Scope Accepted
 *
 * Authoritative Figma References:
 * - English: Node 412:1470 (430 × 971 px)
 * - Spanish: Node 987:11445 (430 × 971 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities (Queen mattresses = 2, total 4 pieces across 3 categories) are strictly preserved.
 * - Prototype-only scope acceptance state; no booking ID, no payment authorization, no driver dispatch.
 */

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
import {
  C25A_DEFAULT_DRAFT,
  C26A_NEXT_REQUIRED_STEPS,
} from "../../src/fixtures/c34ScopeAcceptance";

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return profile;
}

export default function ScopeAcceptedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
  const profile = useCustomerProfile(currentLocale);

  const customerName = currentLocale === "es" ? "SARAH MITCHELL" : profile.name.toUpperCase();
  const bookingId = C25A_DEFAULT_DRAFT.bookingId;

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
        pathname: "/quote-acceptance-review",
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

  const handleContinueToW04 = useCallback(() => {
    setNoticeMessage(t("c26aScopeAccepted.noticeW04Upcoming"));
  }, [t]);

  const handleRevisitEstimate = useCallback(() => {
    router.push({
      pathname: "/itemized-quote",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c26aScopeAccepted.backA11y")}
          testID="c26a-header-back"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c26a-scroll-container"
        >
          {/* Optional notice banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c26a-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismissButton}
                testID="c26a-notice-dismiss"
              >
                <Text style={styles.noticeDismissText}>{t("c26aScopeAccepted.noticeDismiss")}</Text>
              </Pressable>
            </View>
          )}

          {/* Flow Marker / W03 */}
          <View style={styles.flowMarker} testID="c26a-flow-marker">
            <Text style={styles.flowMarkerActive}>{t("c26aScopeAccepted.flowMarker")}</Text>
            <Text style={styles.flowMarkerSub}>{t("c26aScopeAccepted.flowSub")}</Text>
          </View>

          {/* Screen Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.screenTitle}>{t("c26aScopeAccepted.title")}</Text>
            <Text style={styles.screenSubtitle}>
              {t("c26aScopeAccepted.subtitle", { name: profile.name })}
            </Text>
          </View>

          {/* Customer / Saved Booking Ledger */}
          <View style={styles.ledgerBadge} testID="c26a-customer-chip">
            <Text style={styles.ledgerBadgeText}>
              {t("c26aScopeAccepted.customerContext", {
                name: customerName,
                bookingId,
              })}
            </Text>
          </View>

          {/* Section: Scope acceptance recorded (prototype) */}
          <View style={styles.cardSection} testID="c26a-success-section">
            <View style={styles.successNoticeCard}>
              <View style={styles.successNoticeIcon}>
                <Svg width={23} height={23} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={10} stroke="#00E599" strokeWidth={2} />
                  <Path
                    d="M8 12.5L10.5 15L16 9.5"
                    stroke="#00E599"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <View style={styles.successNoticeContent}>
                <Text style={styles.successNoticeTitle}>
                  {t("c26aScopeAccepted.noticeSuccessTitle")}
                </Text>
                <Text style={styles.successNoticeSupporting}>
                  {t("c26aScopeAccepted.noticeSuccessSupporting")}
                </Text>
              </View>
            </View>
          </View>

          {/* Section: Next required steps */}
          <View style={styles.cardSection} testID="c26a-steps-section">
            <Text style={styles.sectionTitle}>{t("c26aScopeAccepted.sectionStepsTitle")}</Text>
            {C26A_NEXT_REQUIRED_STEPS.map((step) => (
              <View key={step.id} style={styles.stepRow} testID={`c26a-${step.id}`}>
                <View style={styles.stepNumberBadge}>
                  <Text style={styles.stepNumberText}>{step.number}</Text>
                </View>
                <Text style={styles.stepText}>{t(`c26aScopeAccepted.${step.textKey}`)}</Text>
              </View>
            ))}
          </View>

          {/* Actions / Prototype Navigation */}
          <View style={styles.actionsContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={handleContinueToW04}
              testID="c26a-primary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c26aScopeAccepted.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>{t("c26aScopeAccepted.primaryCta")}</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={handleRevisitEstimate}
              testID="c26a-secondary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c26aScopeAccepted.secondaryCta")}
            >
              <Text style={styles.secondaryButtonText}>{t("c26aScopeAccepted.secondaryCta")}</Text>
            </Pressable>
          </View>

          {/* Developer Handoff / Rate Disclaimer */}
          <View style={styles.footerDisclaimer} testID="c26a-footer">
            <Text style={styles.footerDemoText}>{t("c26aScopeAccepted.footerDemo")}</Text>
            <Text style={styles.footerSrsText}>{t("c26aScopeAccepted.footerSrs")}</Text>
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
  noticeBanner: {
    backgroundColor: "#1A2510",
    borderWidth: 1,
    borderColor: "rgba(0, 229, 153, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 16,
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
  successNoticeCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 229, 153, 0.3)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  successNoticeIcon: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  successNoticeContent: {
    flex: 1,
    gap: 4,
  },
  successNoticeTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand,
    lineHeight: 18,
  },
  successNoticeSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.elevated,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 12,
  },
  stepNumberBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(0, 229, 153, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(0, 229, 153, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
  },
  stepText: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.primaryText,
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
