/**
 * HAULIX Customer Mobile App — Phase 03.37
 * Screen C28-C: Terms Accepted for This Quote
 *
 * Authoritative Figma References:
 * - English: Node 763:467 (430 × 1128 px) — W04-EN / C28-C · Terms accepted for this quote
 * - Spanish: Node 766:853 (430 × 1178 px) — W04-ES / C28-C · Condiciones aceptadas para esta cotización
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities and active draft preserved.
 * - Checked checkbox reflects explicit client-side consent given on C28.
 * - Zero fabricated backend bookings, no real payment authorization, no live Stripe transactions.
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
  getEffectiveConfirmedItems,
  getEffectiveServiceType,
  getW04Draft,
  SAMPLE_DATES,
  SAMPLE_WINDOWS,
  type SchedulingDateOption,
  type ServiceWindowOption,
  subscribeToW04Draft,
  type TimingMode,
} from "../../src/fixtures/c36Scheduling";

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

function LocationPinIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={10} r={3} stroke={colors.brand} strokeWidth={2} />
    </Svg>
  );
}

function CheckboxCheckedIcon() {
  return (
    <View style={styles.checkboxBoxActive}>
      <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20 6L9 17L4 12"
          stroke="#080B0B"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

function computeTimeSummary(
  timingMode: TimingMode | null,
  locale: string,
  selectedDate: SchedulingDateOption,
  selectedWindow: ServiceWindowOption
): string {
  if (timingMode === "asap") {
    return locale === "es" ? "Lo antes posible · Sujeto a conductor" : "ASAP · Subject to driver";
  }
  const dateFormatted = locale === "es" ? selectedDate.fullDateEs : selectedDate.fullDateEn;
  const windowFormatted = locale === "es" ? selectedWindow.shortEs : selectedWindow.shortEn;
  const separator = locale === "es" ? " • " : " · ";
  return `${dateFormatted}${separator}${windowFormatted} MST`;
}

export default function BookingTermsAcceptedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  useEffect(() => {
    return subscribeToW04Draft((nextDraft) => {
      setDraft(nextDraft);
    });
  }, []);

  const currentLocale = params.previewLocale === "es" ? "es" : i18n.language === "es" ? "es" : "en";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n.language]);

  const handleBack = useCallback(() => {
    router.push({
      pathname: "/review-booking",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleReviewTermsAgain = useCallback(() => {
    router.push({
      pathname: "/review-booking",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleContinueToSecurePayment = useCallback(() => {
    router.push({
      pathname: "/choose-payment-method",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const selectedDate = SAMPLE_DATES.find((d) => d.id === draft.selectedDateId) ?? SAMPLE_DATES[0];
  const selectedWindow =
    SAMPLE_WINDOWS.find((w) => w.id === draft.selectedWindowId) ?? SAMPLE_WINDOWS[0];

  const timeSummary = computeTimeSummary(
    draft.timingMode,
    currentLocale,
    selectedDate,
    selectedWindow
  );

  const pickupArea = currentLocale === "es" ? draft.pickupAreaEs : draft.pickupAreaEn;
  const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c28cBookingTermsAccepted.backA11y")}
          testID="c28c-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c28c-scroll-view"
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
            <Text style={styles.progressLabel} testID="c28c-progress-label">
              {t("c28cBookingTermsAccepted.progressLabel")}
            </Text>
            <View style={styles.progressBarRow}>
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={[styles.progressSegment, styles.progressSegmentActive]} />
              <View style={styles.progressSegment} />
              <View style={styles.progressSegment} />
            </View>
          </View>

          {/* Screen Title & Subtitle */}
          <View style={styles.titleContainer}>
            <Text style={styles.screenTitle} testID="c28c-screen-title">
              {t("c28cBookingTermsAccepted.screenTitle")}
            </Text>
            <Text style={styles.screenSubtitle}>
              {t("c28cBookingTermsAccepted.screenSubtitle")}
            </Text>
          </View>

          {/* Location Badge */}
          <View style={styles.locationChip}>
            <LocationPinIcon />
            <Text style={styles.locationChipText}>{t("c28cBookingTermsAccepted.serviceArea")}</Text>
          </View>

          {/* Future Payment Handoff Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c28c-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismiss}
                accessibilityRole="button"
                accessibilityLabel={t("c28cBookingTermsAccepted.dismissNotice")}
              >
                <Text style={styles.noticeDismissText}>
                  {t("c28cBookingTermsAccepted.dismissNotice")}
                </Text>
              </Pressable>
            </View>
          )}

          {/* Main Card Container */}
          <View style={styles.mainCard} testID="c28c-main-card">
            <View style={styles.sectionHeadingRow}>
              <ShieldIcon />
              <Text style={styles.sectionHeading}>
                {t("c28cBookingTermsAccepted.sectionHeading")}
              </Text>
            </View>

            <Text style={styles.serviceTitle} testID="c28c-service-title">
              {getEffectiveServiceType(draft, currentLocale)}
            </Text>
            <Text style={styles.serviceNote}>{t("c28cBookingTermsAccepted.serviceNote")}</Text>

            {/* Pending Booking Summary Capsule */}
            <View style={styles.bookingCapsule}>
              <View style={styles.pendingBadgeRow}>
                <View style={styles.pendingBadge}>
                  <Text style={styles.pendingBadgeText}>
                    {t("c28cBookingTermsAccepted.pendingBadge")}
                  </Text>
                </View>
              </View>
              <Text style={styles.capsuleTitle}>{t("c28cBookingTermsAccepted.bookingTitle")}</Text>
              <Text style={styles.capsuleSupporting} testID="c28c-time-summary">
                {t("c28cBookingTermsAccepted.bookingSupporting", {
                  timeSummary,
                })}
              </Text>
            </View>

            {/* Booking at a Glance */}
            <View style={styles.glanceContainer}>
              <Text style={styles.glanceHeading}>
                {t("c28cBookingTermsAccepted.glanceHeading")}
              </Text>

              {/* Row 1: Pickup Area */}
              <View style={styles.glanceRow}>
                <Text style={styles.glanceKey}>
                  {t("c28cBookingTermsAccepted.pickupAreaLabel")}
                </Text>
                <Text style={styles.glanceValue} testID="c28c-pickup-area">
                  {pickupArea}
                </Text>
              </View>

              {/* Row 2: Confirmed Items */}
              <View style={styles.glanceRow}>
                <Text style={styles.glanceKey}>
                  {t("c28cBookingTermsAccepted.confirmedItemsLabel")}
                </Text>
                <Text style={styles.glanceValue} testID="c28c-confirmed-items">
                  {confirmedItems}
                </Text>
              </View>

              {/* Row 3: Illustrative Quote */}
              <View style={[styles.glanceRow, styles.quoteRow]}>
                <Text style={styles.quoteKey}>{t("c28cBookingTermsAccepted.pricingLabel")}</Text>
                <Text style={styles.quoteValue} testID="c28c-quote-value">
                  {draft.illustrativeSubtotal}
                </Text>
              </View>

              {/* Row 4: Cancellation Policy */}
              <View style={styles.policyRow}>
                <Text style={styles.policyText}>
                  {t("c28cBookingTermsAccepted.cancellationPolicy")}
                </Text>
              </View>
            </View>

            {/* Explicit Consent Checkbox (Checked Representation) */}
            <Pressable
              style={styles.consentRow}
              onPress={handleReviewTermsAgain}
              testID="c28c-consent-checkbox"
              accessibilityRole="checkbox"
              accessibilityState={{ checked: true }}
              accessibilityLabel={t("c28cBookingTermsAccepted.consentText")}
            >
              <CheckboxCheckedIcon />
              <Text style={styles.consentText}>{t("c28cBookingTermsAccepted.consentText")}</Text>
            </Pressable>

            {/* Terms Review Notice Panel */}
            <View style={styles.warningPanel} testID="c28c-notice-panel">
              <View style={styles.warningHeadingRow}>
                <ShieldIcon />
                <Text style={styles.warningHeading}>
                  {t("c28cBookingTermsAccepted.noticeTitle")}
                </Text>
              </View>
              <Text style={styles.warningBody}>
                {t("c28cBookingTermsAccepted.noticeExplanation")}
              </Text>
            </View>
          </View>

          {/* Actions / CTAs */}
          <View style={styles.actionsContainer}>
            {/* Primary CTA: Continue to secure payment */}
            <Pressable
              style={styles.primaryButton}
              onPress={handleContinueToSecurePayment}
              testID="c28c-primary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c28cBookingTermsAccepted.primaryCta")}
            >
              <Text style={styles.primaryButtonText}>
                {t("c28cBookingTermsAccepted.primaryCta")}
              </Text>
            </Pressable>

            {/* Secondary CTA: Review terms again */}
            <Pressable
              style={styles.secondaryButton}
              onPress={handleReviewTermsAgain}
              testID="c28c-secondary-cta"
              accessibilityRole="button"
              accessibilityLabel={t("c28cBookingTermsAccepted.secondaryCta")}
            >
              <Text style={styles.secondaryButtonText}>
                {t("c28cBookingTermsAccepted.secondaryCta")}
              </Text>
            </Pressable>
          </View>

          {/* Prototype Footer Note */}
          <Text style={styles.prototypeFooterNote}>{t("c28cBookingTermsAccepted.uiNote")}</Text>
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
    paddingTop: 12,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    marginBottom: 16,
  },
  brandHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.primaryText,
    letterSpacing: -0.5,
  },
  brandIx: {
    color: colors.brand,
  },
  tagline: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.secondaryText,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.brand,
    textTransform: "uppercase",
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
    backgroundColor: colors.elevated,
  },
  progressSegmentActive: {
    backgroundColor: colors.brand,
  },
  titleContainer: {
    marginBottom: 14,
  },
  screenTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    lineHeight: 32,
    color: colors.primaryText,
    marginBottom: 6,
  },
  screenSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondaryText,
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.elevated,
    marginBottom: 20,
  },
  locationChipText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.primaryText,
  },
  noticeBanner: {
    backgroundColor: "rgba(0, 229, 153, 0.12)",
    borderWidth: 1,
    borderColor: colors.brand,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  noticeBannerText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.primaryText,
    marginBottom: 8,
  },
  noticeDismiss: {
    alignSelf: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  noticeDismissText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
  },
  mainCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 24,
  },
  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  sectionHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 1.2,
    color: colors.brand,
    textTransform: "uppercase",
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
  bookingCapsule: {
    backgroundColor: colors.elevated,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  pendingBadgeRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  pendingBadge: {
    backgroundColor: "rgba(0, 229, 153, 0.15)",
    borderWidth: 1,
    borderColor: colors.brand,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pendingBadgeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.brand,
    textTransform: "uppercase",
  },
  capsuleTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.primaryText,
    marginBottom: 4,
  },
  capsuleSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    color: colors.secondaryText,
  },
  glanceContainer: {
    backgroundColor: colors.elevated,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  glanceHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.brand,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  glanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.elevated,
  },
  glanceKey: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    color: colors.secondaryText,
    textTransform: "uppercase",
  },
  glanceValue: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    color: colors.primaryText,
    maxWidth: "60%",
    textAlign: "right",
  },
  quoteRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.elevated,
  },
  quoteKey: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
  },
  quoteValue: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.brand,
  },
  policyRow: {
    paddingTop: 10,
  },
  policyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 17,
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  checkboxBoxActive: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  consentText: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
    lineHeight: 18,
  },
  warningPanel: {
    backgroundColor: "#1C170E",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(242, 201, 76, 0.4)",
    padding: 14,
  },
  warningHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  warningHeading: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    letterSpacing: 1,
    color: "#F2C94C",
    textTransform: "uppercase",
  },
  warningBody: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.secondaryText,
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: "#080B0B",
  },
  secondaryButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.primaryText,
  },
  prototypeFooterNote: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: colors.secondaryText,
    textAlign: "center",
    lineHeight: 16,
  },
});
