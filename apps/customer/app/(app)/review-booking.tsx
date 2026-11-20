/**
 * HAULIX Customer Mobile App — Phase 03.36
 * Screen C28: Review Your Booking
 *
 * Authoritative Figma References:
 * - English: Node 763:396 (430 × 1195 px) — W04-EN / C28 · Review your booking
 * - Spanish: Node 766:782 (430 × 1180 px) — W04-ES / C28 · Revisa tu reserva
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
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getW04Draft,
  SAMPLE_DATES,
  SAMPLE_WINDOWS,
  subscribeToW04Draft,
  updateW04Draft,
} from "../../src/fixtures/c36Scheduling";

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

function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M3 5C3 3.89543 3.89543 3 5 3H15C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5Z"
        fill={checked ? colors.brand : "transparent"}
        stroke={checked ? colors.brand : colors.secondaryText}
        strokeWidth={2}
      />
      {checked && (
        <Path
          d="M6 10L9 13L14 7"
          stroke={colors.background}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  );
}

type FallbackRoute = "/request-service-asap" | "/select-available-window";

function getFallbackRoute(timingMode: string | null): FallbackRoute {
  return timingMode === "asap" ? "/request-service-asap" : "/select-available-window";
}

function computeTimeSummary(
  timingMode: string | null,
  currentLocale: "en" | "es",
  selectedDate: (typeof SAMPLE_DATES)[number],
  selectedWindow: (typeof SAMPLE_WINDOWS)[number]
) {
  if (timingMode === "asap") {
    return currentLocale === "es"
      ? "Lo antes posible · Sujeto a conductor"
      : "ASAP · Subject to driver";
  }
  return currentLocale === "es"
    ? `${selectedDate.fullDateEs} · ${selectedWindow.shortEs} MST`
    : `${selectedDate.fullDateEn} · ${selectedWindow.shortEn} MST`;
}

export default function ReviewBookingScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    return subscribeToW04Draft((updated) => setDraft({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      const fallback = getFallbackRoute(draft.timingMode);
      router.replace({
        pathname: fallback,
        params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
      });
    }
  }, [router, draft.timingMode, params.previewLocale]);

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      handleBack();
      return true;
    });
    return () => sub.remove();
  }, [handleBack]);

  const handleToggleConsent = useCallback(() => {
    const nextConsent = !draft.termsConsentAccepted;
    updateW04Draft({ termsConsentAccepted: nextConsent });
    if (nextConsent) {
      setValidationError(null);
    }
  }, [draft.termsConsentAccepted]);

  const handleContinueToPayment = useCallback(() => {
    if (!draft.termsConsentAccepted) {
      setValidationError(t("c28ReviewBooking.consentValidationError"));
      return;
    }
    setNoticeMessage(t("c28ReviewBooking.futureNoticePaymentHandoff"));
  }, [draft.termsConsentAccepted, t]);

  const handlePolicyUpdated = useCallback(() => {
    setNoticeMessage(t("c28ReviewBooking.futureNoticePolicyUpdated"));
  }, [t]);

  const handleEditServiceTime = useCallback(() => {
    const editRoute = getFallbackRoute(draft.timingMode);
    router.push({
      pathname: editRoute,
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, draft.timingMode, params.previewLocale]);

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
  const confirmedItems = currentLocale === "es" ? draft.confirmedItemsEs : draft.confirmedItemsEn;

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c28ReviewBooking.backA11y")}
          testID="c28-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c28-scroll-view"
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
            <Text style={styles.progressLabel} testID="c28-progress-label">
              {t("c28ReviewBooking.progressLabel")}
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
            <Text style={styles.screenTitle} testID="c28-screen-title">
              {t("c28ReviewBooking.screenTitle")}
            </Text>
            <Text style={styles.screenSubtitle}>{t("c28ReviewBooking.screenSubtitle")}</Text>
          </View>

          {/* Location Badge */}
          <View style={styles.locationChip}>
            <TruckIcon />
            <Text style={styles.locationText} testID="c28-location-text">
              {t("c28ReviewBooking.serviceArea")}
            </Text>
          </View>

          {/* Main Booking Summary & Terms Card */}
          <View style={styles.cardContainer}>
            <View style={styles.sectionHeadingRow}>
              <ShieldIcon />
              <Text style={styles.sectionHeading}>{t("c28ReviewBooking.sectionHeading")}</Text>
            </View>

            <Text style={styles.serviceTitle} testID="c28-service-title">
              {draft.serviceType}
            </Text>
            <Text style={styles.serviceNote}>{t("c28ReviewBooking.serviceNote")}</Text>

            {/* Pending Booking Summary Capsule */}
            <View style={styles.bookingCapsule}>
              <View style={styles.pendingBadgeRow}>
                <View style={styles.pendingBadge}>
                  <Text style={styles.pendingBadgeText}>{t("c28ReviewBooking.pendingBadge")}</Text>
                </View>
              </View>
              <Text style={styles.capsuleTitle}>{t("c28ReviewBooking.bookingTitle")}</Text>
              <Text style={styles.capsuleSupporting} testID="c28-time-summary">
                {t("c28ReviewBooking.bookingSupporting", { timeSummary })}
              </Text>
            </View>

            {/* Booking At A Glance Details */}
            <View style={styles.glanceContainer}>
              <Text style={styles.glanceHeading}>{t("c28ReviewBooking.glanceHeading")}</Text>

              {/* Row 1: Pickup Area */}
              <View style={styles.glanceRow}>
                <Text style={styles.glanceKey}>{t("c28ReviewBooking.pickupAreaLabel")}</Text>
                <Text style={styles.glanceValue} testID="c28-pickup-area">
                  {pickupArea}
                </Text>
              </View>

              {/* Row 2: Confirmed Items */}
              <View style={styles.glanceRow}>
                <Text style={styles.glanceKey}>{t("c28ReviewBooking.confirmedItemsLabel")}</Text>
                <Text style={styles.glanceValue} testID="c28-confirmed-items">
                  {confirmedItems}
                </Text>
              </View>

              {/* Row 3: Illustrative Quote */}
              <View style={[styles.glanceRow, styles.quoteRow]}>
                <Text style={styles.quoteKey}>{t("c28ReviewBooking.pricingLabel")}</Text>
                <Text style={styles.quoteValue} testID="c28-pricing-sample">
                  {draft.illustrativeSubtotal}
                </Text>
              </View>
            </View>

            {/* Cancellation Policy Disclosure */}
            <View style={styles.cancellationPolicyContainer}>
              <Text style={styles.cancellationPolicyText}>
                {t("c28ReviewBooking.cancellationPolicy")}
              </Text>
            </View>

            {/* Explicit Consent Checkbox */}
            <Pressable
              style={styles.consentRow}
              onPress={handleToggleConsent}
              testID="c28-consent-checkbox"
              accessibilityRole="checkbox"
              accessibilityState={{ checked: draft.termsConsentAccepted }}
            >
              <CheckboxIcon checked={draft.termsConsentAccepted} />
              <Text style={styles.consentText}>{t("c28ReviewBooking.consentText")}</Text>
            </Pressable>

            {/* Consent Validation Error Prompt */}
            {validationError && (
              <View style={styles.validationErrorContainer} testID="c28-validation-error">
                <Text style={styles.validationErrorText}>{validationError}</Text>
              </View>
            )}
          </View>

          {/* In-app Notice Banner */}
          {noticeMessage && (
            <View style={styles.noticeBanner} testID="c28-notice-banner">
              <Text style={styles.noticeBannerText}>{noticeMessage}</Text>
              <Pressable
                onPress={() => setNoticeMessage(null)}
                style={styles.noticeDismiss}
                accessibilityRole="button"
                accessibilityLabel={t("c28ReviewBooking.dismissNotice")}
              >
                <Text style={styles.noticeDismissText}>{t("c28ReviewBooking.dismissNotice")}</Text>
              </Pressable>
            </View>
          )}

          {/* Review Before Accepting Notice Card */}
          <View style={styles.noticeCard}>
            <View style={styles.noticeHeaderRow}>
              <ShieldIcon />
              <Text style={styles.noticeCardTitle}>{t("c28ReviewBooking.noticeTitle")}</Text>
            </View>
            <Text style={styles.noticeCardExplanation}>
              {t("c28ReviewBooking.noticeExplanation")}
            </Text>
          </View>

          {/* Actions / CTAs */}
          <View style={styles.actionsContainer}>
            {/* Primary CTA: Continue to payment (Gated by Consent) */}
            <Pressable
              style={[
                styles.primaryButton,
                !draft.termsConsentAccepted && styles.primaryButtonDisabled,
              ]}
              onPress={handleContinueToPayment}
              testID="c28-primary-cta"
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.primaryButtonText,
                  !draft.termsConsentAccepted && styles.primaryButtonTextDisabled,
                ]}
              >
                {t("c28ReviewBooking.primaryCta")}
              </Text>
            </Pressable>

            {/* Secondary CTA: Policy was updated */}
            <Pressable
              style={styles.secondaryButton}
              onPress={handlePolicyUpdated}
              testID="c28-secondary-cta"
              accessibilityRole="button"
            >
              <Text style={styles.secondaryButtonText}>{t("c28ReviewBooking.secondaryCta")}</Text>
            </Pressable>

            {/* Tertiary Action: Edit service time */}
            <Pressable
              style={styles.tertiaryButton}
              onPress={handleEditServiceTime}
              testID="c28-alternative-cta"
              accessibilityRole="button"
            >
              <Text style={styles.tertiaryButtonText}>{t("c28ReviewBooking.alternativeCta")}</Text>
            </Pressable>
          </View>

          {/* Footer UI Disclaimer */}
          <Text style={styles.uiNote}>{t("c28ReviewBooking.uiNote")}</Text>
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
  bookingCapsule: {
    backgroundColor: "#101615",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222C2A",
    padding: 14,
    marginBottom: 16,
  },
  pendingBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  pendingBadge: {
    backgroundColor: "#2B2613",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5A4C1C",
  },
  pendingBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: "#F6C844",
    letterSpacing: 0.5,
  },
  capsuleTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.primaryText,
    marginBottom: 2,
  },
  capsuleSupporting: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  glanceContainer: {
    backgroundColor: "#0D1312",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1A2322",
    marginBottom: 16,
  },
  glanceHeading: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.secondaryText,
    letterSpacing: 1,
    marginBottom: 12,
  },
  glanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#17201E",
  },
  glanceKey: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.secondaryText,
  },
  glanceValue: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
  },
  quoteRow: {
    borderBottomWidth: 0,
    paddingTop: 10,
    paddingBottom: 2,
  },
  quoteKey: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: colors.brand,
  },
  quoteValue: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.brand,
  },
  cancellationPolicyContainer: {
    backgroundColor: "#111817",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1E2726",
    marginBottom: 16,
  },
  cancellationPolicyText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  consentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },
  consentText: {
    flex: 1,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.primaryText,
    lineHeight: 18,
  },
  validationErrorContainer: {
    backgroundColor: "#2B1616",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#7A2E2E",
    padding: 10,
    marginTop: 10,
  },
  validationErrorText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: "#FFA8A8",
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
  primaryButtonDisabled: {
    backgroundColor: "#1A2321",
    borderWidth: 1,
    borderColor: "#2A3634",
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    color: colors.background,
    letterSpacing: 0.5,
  },
  primaryButtonTextDisabled: {
    color: "#4F625F",
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
