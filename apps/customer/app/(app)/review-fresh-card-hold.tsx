/**
 * HAULIX Customer Mobile App — Phase 03.40
 * Screen C30-C: Review a Fresh Card Hold (Commercial Consent Checkpoint)
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 773:836 (430 × 1109 px)
 * - Spanish Variant: Node 773:1053 (430 × 1124 px)
 *
 * Upstream Entry:
 * - From C30-R (/restore-secure-authorization) via "Proceed to hold review" CTA.
 * - From C30-E (/card-hold-expired) via "Review fresh hold" trigger.
 *
 * Consent & Financial Safety Rules:
 * - Explicit customer consent is required: User must check the agreement box before proceeding.
 * - Pure frontend demonstration: No real Stripe card hold, capture, or reservation of funds occurs.
 * - Symmetrical non-binding estimate strictly $356.00 USD.
 * - Outgoing routing:
 *   - "Acknowledge and proceed" -> /new-authorization-consent (C30-CA).
 *   - "Cancel and return to payment methods" -> /choose-payment-method (C29).
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  acknowledgeFreshHoldConsent,
  getEffectiveConfirmedItems,
  getW04Draft,
  recordFreshHoldReview,
  subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function LockBadgeIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={11} width={18} height={11} rx={2} stroke={colors.brand} strokeWidth={2} />
      <Path
        d="M7 11V7a5 5 0 0110 0v4"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function CheckboxCheckIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17l-5-5"
        stroke={colors.background}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function InfoCircleAmberIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke="#F2C94C" strokeWidth={2} />
      <Path d="M12 16v-4M12 8h.01" stroke="#F2C94C" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export default function ReviewFreshCardHoldScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);
  const [consentChecked, setConsentChecked] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const currentLocale = (params.previewLocale ??
    (i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  useEffect(() => {
    recordFreshHoldReview();
    return subscribeToW04Draft((updated) => setDraft({ ...updated }));
  }, []);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/restore-secure-authorization",
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

  const handleToggleConsent = useCallback(() => {
    setConsentChecked((prev) => {
      const next = !prev;
      if (next) {
        setValidationError(null);
      }
      return next;
    });
  }, []);

  const handleAcknowledgeAndProceed = useCallback(() => {
    if (!consentChecked) {
      setValidationError(t("c30cReviewFreshCardHold.validationError"));
      return;
    }
    acknowledgeFreshHoldConsent();
    router.push({
      pathname: "/new-authorization-consent",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [consentChecked, router, params.previewLocale, t]);

  const handleCancel = useCallback(() => {
    router.push({
      pathname: "/choose-payment-method",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c30c-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c30cReviewFreshCardHold.backA11y")}
          testID="c30c-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c30c-scroll-view"
        >
          {/* Brand Row */}
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
            <Text style={styles.progressLabel} testID="c30c-progress-label">
              {t("c30cReviewFreshCardHold.progressLabel")}
            </Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "75%" }]} />
            </View>
          </View>

          {/* Screen Title & Subtitle */}
          <View style={styles.headerBlock}>
            <Text style={styles.screenTitle} testID="c30c-title">
              {t("c30cReviewFreshCardHold.screenTitle")}
            </Text>
            <Text style={styles.screenSubtitle} testID="c30c-subtitle">
              {t("c30cReviewFreshCardHold.screenSubtitle")}
            </Text>
          </View>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c30c-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c30cReviewFreshCardHold.serviceArea")}</Text>
          </View>

          {/* Status Badge Capsule */}
          <View style={styles.statusBadgeCapsule} testID="c30c-status-badge">
            <LockBadgeIcon />
            <Text style={styles.statusBadgeText}>{t("c30cReviewFreshCardHold.statusBadge")}</Text>
          </View>

          {/* Hold Review Details Card */}
          <View style={styles.cardContainer} testID="c30c-hold-card">
            <Text style={styles.cardHeaderTitle}>
              {t("c30cReviewFreshCardHold.holdSummaryHeading")}
            </Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c30cReviewFreshCardHold.holdAmountLabel")}</Text>
              <Text style={styles.detailAmountValue} testID="c30c-hold-amount">
                {t("c30cReviewFreshCardHold.holdAmountValue")}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c30cReviewFreshCardHold.holdTypeLabel")}</Text>
              <Text style={styles.detailTextValue}>
                {t("c30cReviewFreshCardHold.holdTypeValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{t("c30cReviewFreshCardHold.policyLabel")}</Text>
              <Text style={[styles.detailTextValue, { maxWidth: "60%", textAlign: "right" }]}>
                {t("c30cReviewFreshCardHold.policyValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {currentLocale === "es" ? "ARTÍCULOS CONFIRMADOS" : "CONFIRMED ITEMS"}
              </Text>
              <Text style={[styles.detailTextValue, { maxWidth: "60%", textAlign: "right" }]}>
                {confirmedItems}
              </Text>
            </View>

            <Text style={styles.explanationText}>
              {t("c30cReviewFreshCardHold.holdNoticeText")}
            </Text>
          </View>

          {/* Terms Consent Checkbox Card */}
          <Pressable
            style={[
              styles.consentCard,
              consentChecked && styles.consentCardChecked,
              validationError ? styles.consentCardError : null,
            ]}
            onPress={handleToggleConsent}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: consentChecked }}
            accessibilityLabel={t("c30cReviewFreshCardHold.consentCheckboxText")}
            testID="c30c-consent-checkbox"
          >
            <View style={[styles.checkboxSquare, consentChecked && styles.checkboxSquareChecked]}>
              {consentChecked && <CheckboxCheckIcon />}
            </View>
            <Text style={styles.consentText}>
              {t("c30cReviewFreshCardHold.consentCheckboxText")}
            </Text>
          </Pressable>

          {/* Validation Error Message */}
          {validationError && (
            <View style={styles.errorBox} testID="c30c-validation-error">
              <InfoCircleAmberIcon />
              <Text style={styles.errorText}>{validationError}</Text>
            </View>
          )}

          {/* Primary Action Button */}
          <Pressable
            onPress={handleAcknowledgeAndProceed}
            accessibilityRole="button"
            accessibilityLabel={t("c30cReviewFreshCardHold.primaryCta")}
            testID="c30c-primary-cta"
          >
            <View style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                {t("c30cReviewFreshCardHold.primaryCta")}
              </Text>
            </View>
          </Pressable>

          {/* Secondary Action Button */}
          <Pressable
            onPress={handleCancel}
            accessibilityRole="button"
            accessibilityLabel={t("c30cReviewFreshCardHold.secondaryCta")}
            testID="c30c-secondary-cta"
          >
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>
                {t("c30cReviewFreshCardHold.secondaryCta")}
              </Text>
            </View>
          </Pressable>

          {/* Prototype Disclaimer */}
          <View style={styles.footerNoteContainer}>
            <Text style={styles.footerNoteText}>{t("c30cReviewFreshCardHold.uiNote")}</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 16,
  },
  brandHaul: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    letterSpacing: 1.5,
  },
  brandIx: {
    color: colors.brand,
  },
  tagline: {
    fontSize: 10,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 1.2,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: colors.elevated,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.brand,
    borderRadius: 2,
  },
  headerBlock: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 26,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    lineHeight: 32,
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  locationChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.elevated,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  locationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
    marginRight: 6,
  },
  locationText: {
    fontSize: 11,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  statusBadgeCapsule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(186, 255, 66, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(186, 255, 66, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 10,
    marginBottom: 20,
  },
  statusBadgeText: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    letterSpacing: 1,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 18,
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.secondaryText,
    letterSpacing: 1,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
    minHeight: 26,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    lineHeight: 16,
  },
  detailAmountValue: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.brand,
    flexShrink: 0,
    textAlign: "right",
  },
  detailTextValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  divider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 12,
  },
  explanationText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
    marginTop: 6,
  },
  consentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161D1A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  consentCardChecked: {
    borderColor: colors.brand,
    backgroundColor: "rgba(186, 255, 66, 0.05)",
  },
  consentCardError: {
    borderColor: "#F2C94C",
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.secondaryText,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSquareChecked: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  consentText: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    color: colors.primaryText,
    lineHeight: 18,
    flex: 1,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(242, 201, 76, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(242, 201, 76, 0.3)",
    borderRadius: 10,
    padding: 10,
    gap: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: "#F2C94C",
    flex: 1,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.background,
    letterSpacing: 0.3,
  },
  secondaryButton: {
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.elevated,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
  },
  footerNoteContainer: {
    alignItems: "center",
    paddingVertical: 12,
  },
  footerNoteText: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    opacity: 0.7,
    textAlign: "center",
  },
});
