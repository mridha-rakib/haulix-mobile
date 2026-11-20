/**
 * HAULIX Customer Mobile App — Phase 03.36
 * Screen C27-A: Request Service ASAP
 *
 * Authoritative Figma References:
 * - English: Node 763:71 (430 × 905 px) — W04-EN / C27-A · Request service ASAP
 * - Spanish: Node 766:457 (430 × 905 px) — W04-ES / C27-A · Solicitar servicio cuanto antes
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities (Queen mattresses = 2, total 4 pieces across 3 categories) are strictly preserved.
 * - Symmetrical illustrative subtotal is strictly $356.00 USD (non-binding).
 * - Zero fabricated backend bookings, no real driver assignment, no live Stripe transactions.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import { getW04Draft, subscribeToW04Draft, updateW04Draft } from "../../src/fixtures/c36Scheduling";

function TruckIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 3H15V16H1V3Z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 8H19L23 12V16H15V8Z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={5.5} cy={18.5} r={2.5} stroke={colors.brand} strokeWidth={2} />
      <Circle cx={18.5} cy={18.5} r={2.5} stroke={colors.brand} strokeWidth={2} />
    </Svg>
  );
}

function CalendarIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={4} width={18} height={18} rx={2} stroke={colors.brand} strokeWidth={2} />
      <Path d="M16 2V6M8 2V6M3 10H21" stroke={colors.brand} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L3 7V12C3 17.5 7 21.5 12 22C17 21.5 21 17.5 21 12V7L12 2Z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 8V12M12 16H12.01" stroke={colors.brand} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export default function RequestServiceAsapScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    updateW04Draft({ timingMode: "asap" });
    return subscribeToW04Draft((updated) => setDraft({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace({
        pathname: "/choose-service-time",
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

  const handleContinueIfAvailable = useCallback(() => {
    updateW04Draft({ timingMode: "asap" });
    router.push({
      pathname: "/review-booking",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleNoDriverAvailable = useCallback(() => {
    setNoticeMessage(t("c27aRequestServiceAsap.futureNoticeNoDriver"));
  }, [t]);

  const handleChangeTiming = useCallback(() => {
    router.push({
      pathname: "/choose-service-time",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleSwitchToScheduled = useCallback(() => {
    updateW04Draft({ timingMode: "scheduled" });
    router.push({
      pathname: "/select-available-window",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c27aRequestServiceAsap.backA11y")}
          testID="c27a-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c27a-scroll-view"
        >
          {/* Brand Header */}
          <View style={styles.brandRow}>
            <Text style={styles.brandHaul}>
              HAUL<Text style={styles.brandIx}>IX</Text>
            </Text>
            <Text style={styles.tagline}>
              {currentLocale === "es" ? "LO RECOGEMOS TODO." : "WE HAUL IT ALL."}
            </Text>
          </View>

          {/* 4-Step Progress Indicator */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel} testID="c27a-progress-label">
              {t("c27aRequestServiceAsap.progressLabel")}
            </Text>
            <View style={styles.progressBarRow}>
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
            </View>
          </View>

          {/* Screen Title & Subtitle */}
          <View style={styles.titleContainer}>
            <Text style={styles.screenTitle} testID="c27a-screen-title">
              {t("c27aRequestServiceAsap.screenTitle")}
            </Text>
            <Text style={styles.screenSubtitle}>{t("c27aRequestServiceAsap.screenSubtitle")}</Text>
          </View>

          {/* Location Badge */}
          <View style={styles.locationChip}>
            <TruckIcon />
            <Text style={styles.locationText} testID="c27a-location-text">
              {t("c27aRequestServiceAsap.serviceArea")}
            </Text>
          </View>

          {/* Service Window Card */}
          <View style={styles.cardContainer}>
            <View style={styles.sectionHeadingRow}>
              <CalendarIcon />
              <Text style={styles.sectionHeading}>
                {t("c27aRequestServiceAsap.sectionHeading")}
              </Text>
            </View>

            <Text style={styles.serviceTitle} testID="c27a-service-title">
              {draft.serviceType}
            </Text>
            <Text style={styles.serviceNote}>{t("c27aRequestServiceAsap.serviceNote")}</Text>

            {/* Timing Options */}
            <View style={styles.timingChoicesContainer}>
              {/* Option 1: ASAP (Selected) */}
              <View
                style={[styles.timingCard, styles.timingCardSelected]}
                testID="c27a-timing-asap"
                accessibilityRole="radio"
                accessibilityState={{ selected: true }}
              >
                <View style={styles.radioIndicator}>
                  <View style={styles.radioDot} />
                </View>
                <View style={styles.timingCardTextContainer}>
                  <Text style={styles.timingCardTitle}>
                    {t("c27aRequestServiceAsap.asapTitle")}
                  </Text>
                  <Text style={styles.timingCardAssistance}>
                    {t("c27aRequestServiceAsap.asapAssistance")}
                  </Text>
                </View>
              </View>

              {/* Option 2: Schedule for later (Clickable to switch) */}
              <Pressable
                style={styles.timingCard}
                onPress={handleSwitchToScheduled}
                testID="c27a-timing-schedule"
                accessibilityRole="radio"
                accessibilityState={{ selected: false }}
              >
                <View style={styles.radioIndicator}>
                  <View style={styles.radioCircle} />
                </View>
                <View style={styles.timingCardTextContainer}>
                  <Text style={styles.timingCardTitle}>
                    {t("c27aRequestServiceAsap.scheduleTitle")}
                  </Text>
                  <Text style={styles.timingCardAssistance}>
                    {t("c27aRequestServiceAsap.scheduleAssistance")}
                  </Text>
                </View>
              </Pressable>
            </View>

            {/* ASAP Eligibility Disclaimer Box */}
            <View style={styles.eligibilityContainer}>
              <Text style={styles.eligibilityText}>
                {t("c27aRequestServiceAsap.asapEligibility")}
              </Text>
            </View>
          </View>

          {/* In-app Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c27a-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismiss}
                accessibilityRole="button"
                accessibilityLabel={t("c27aRequestServiceAsap.dismissNotice")}
              >
                <Text style={styles.noticeDismissText}>
                  {t("c27aRequestServiceAsap.dismissNotice")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Availability Check Notice Card */}
          <View style={styles.noticeCard}>
            <View style={styles.noticeHeaderRow}>
              <ShieldIcon />
              <Text style={styles.noticeCardTitle}>{t("c27aRequestServiceAsap.noticeTitle")}</Text>
            </View>
            <Text style={styles.noticeCardExplanation}>
              {t("c27aRequestServiceAsap.noticeExplanation")}
            </Text>
          </View>

          {/* Actions / CTAs */}
          <View style={styles.actionsContainer}>
            {/* Primary CTA: Continue if available */}
            <Pressable
              style={styles.primaryButton}
              onPress={handleContinueIfAvailable}
              testID="c27a-primary-cta"
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>{t("c27aRequestServiceAsap.primaryCta")}</Text>
            </Pressable>

            {/* Secondary CTA: No driver available */}
            <Pressable
              style={styles.secondaryButton}
              onPress={handleNoDriverAvailable}
              testID="c27a-secondary-cta"
              accessibilityRole="button"
            >
              <Text style={styles.secondaryButtonText}>
                {t("c27aRequestServiceAsap.secondaryCta")}
              </Text>
            </Pressable>

            {/* Tertiary Action: Change timing */}
            <Pressable
              style={styles.tertiaryButton}
              onPress={handleChangeTiming}
              testID="c27a-alternative-cta"
              accessibilityRole="button"
            >
              <Text style={styles.tertiaryButtonText}>
                {t("c27aRequestServiceAsap.alternativeCta")}
              </Text>
            </Pressable>
          </View>

          {/* Footer UI Disclaimer */}
          <Text style={styles.uiNote}>{t("c27aRequestServiceAsap.uiNote")}</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 16,
  },
  brandHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: colors.primaryText,
    letterSpacing: 1.5,
  },
  brandIx: {
    color: colors.brand,
  },
  tagline: {
    fontFamily: fontFamily.regular,
    fontSize: 10,
    color: colors.secondaryText,
    letterSpacing: 1,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
    letterSpacing: 1,
    marginBottom: 8,
  },
  progressBarRow: {
    flexDirection: "row",
    gap: 6,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1F2625",
  },
  progressSegmentActive: {
    backgroundColor: colors.brand,
  },
  titleContainer: {
    marginBottom: 16,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.primaryText,
    marginBottom: 6,
    lineHeight: 30,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111716",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1E2726",
    alignSelf: "flex-start",
    marginBottom: 20,
    gap: 8,
  },
  locationText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
    letterSpacing: 1,
  },
  serviceTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.primaryText,
    marginBottom: 4,
  },
  serviceNote: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: 16,
  },
  timingChoicesContainer: {
    gap: 12,
    marginBottom: 16,
  },
  timingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101615",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222C2A",
    padding: 14,
    gap: 12,
  },
  timingCardSelected: {
    borderColor: colors.brand,
    backgroundColor: "#131C1A",
  },
  radioIndicator: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.secondaryText,
  },
  radioDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.brand,
    borderWidth: 3,
    borderColor: colors.background,
  },
  timingCardTextContainer: {
    flex: 1,
  },
  timingCardTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.primaryText,
    marginBottom: 2,
  },
  timingCardAssistance: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  eligibilityContainer: {
    backgroundColor: "#0D1312",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1A2322",
  },
  eligibilityText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  noticeBanner: {
    backgroundColor: "#1A2B23",
    borderColor: colors.brand,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
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
  },
  noticeDismiss: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.brand,
    borderRadius: 6,
  },
  noticeDismissText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.background,
  },
  noticeCard: {
    backgroundColor: "#111817",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222D2B",
    padding: 14,
    marginBottom: 24,
  },
  noticeHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  noticeCardTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.brand,
    letterSpacing: 1,
  },
  noticeCardExplanation: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.background,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: "#141A19",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.elevated,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  tertiaryButton: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  tertiaryButtonText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.secondaryText,
    textDecorationLine: "underline",
  },
  uiNote: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#4A5A57",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
