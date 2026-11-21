/**
 * HAULIX Customer Mobile App — Phase 03.40
 * Screen C30-CA: New Authorization Consent Recorded
 *
 * Authoritative Figma Reference:
 * - English Variant: Node 773:905 (430 × 1142 px)
 * - Spanish Variant: Node 773:1122 (430 × 1157 px)
 *
 * Upstream Entry:
 * - From C30-C (/review-fresh-card-hold) via "Acknowledge and proceed" CTA.
 *
 * Critical Consent Provenance:
 * - Represents a local demonstration acknowledgement under policy version 2026.11-v2.
 * - Under no circumstances is this an actual server-side legal consent or financial hold.
 * - Symmetrical non-binding estimate strictly $356.00 USD.
 * - Outgoing routing:
 *   - "Check booking status" -> /checking-booking-status (C31-P).
 *   - "Review hold details" -> /review-fresh-card-hold (C30-C).
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
  getW04Draft,
  subscribeToW04Draft,
} from "../../src/fixtures/c36Scheduling";

function CheckCircleBrandIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={10}
        fill="rgba(186, 255, 66, 0.15)"
        stroke={colors.brand}
        strokeWidth={2}
      />
      <Path
        d="M8 12l3 3 5-5"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ShieldCheckIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke={colors.brand}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function NewAuthorizationConsentScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();
  const [draft, setDraft] = useState(getW04Draft);

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
      router.push({
        pathname: "/review-fresh-card-hold",
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

  const handleCheckBookingStatus = useCallback(() => {
    router.push({
      pathname: "/checking-booking-status",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleReviewHoldDetails = useCallback(() => {
    router.push({
      pathname: "/review-fresh-card-hold",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const confirmedItems = getEffectiveConfirmedItems(draft, currentLocale);

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID="c30ca-screen">
        <FlowHeaderBack
          onBack={handleBack}
          backA11y={t("c30caNewAuthorizationConsent.backA11y")}
          testID="c30ca-header-back"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c30ca-scroll-view"
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
            <Text style={styles.progressLabel} testID="c30ca-progress-label">
              {t("c30caNewAuthorizationConsent.progressLabel")}
            </Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "75%" }]} />
            </View>
          </View>

          {/* Screen Title & Subtitle */}
          <View style={styles.headerBlock}>
            <Text style={styles.screenTitle} testID="c30ca-title">
              {t("c30caNewAuthorizationConsent.screenTitle")}
            </Text>
            <Text style={styles.screenSubtitle} testID="c30ca-subtitle">
              {t("c30caNewAuthorizationConsent.screenSubtitle")}
            </Text>
          </View>

          {/* Location Chip */}
          <View style={styles.locationChip} testID="c30ca-location-chip">
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>{t("c30caNewAuthorizationConsent.serviceArea")}</Text>
          </View>

          {/* Consent Recorded Status Badge */}
          <View style={styles.statusBadgeCapsule} testID="c30ca-status-badge">
            <CheckCircleBrandIcon />
            <Text style={styles.statusBadgeText}>
              {t("c30caNewAuthorizationConsent.statusBadge")}
            </Text>
          </View>

          {/* Recorded Consent Details Card */}
          <View style={styles.cardContainer} testID="c30ca-details-card">
            <Text style={styles.cardHeaderTitle}>
              {t("c30caNewAuthorizationConsent.consentHeading")}
            </Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t("c30caNewAuthorizationConsent.consentStatusLabel")}
              </Text>
              <Text style={styles.detailTextValueBrand}>
                {t("c30caNewAuthorizationConsent.consentStatusValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t("c30caNewAuthorizationConsent.termsVersionLabel")}
              </Text>
              <Text style={styles.detailTextValue}>
                {t("c30caNewAuthorizationConsent.termsVersionValue")}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {t("c30caNewAuthorizationConsent.authorizedScopeLabel")}
              </Text>
              <Text style={styles.detailTextValue} testID="c30ca-scope-value">
                {t("c30caNewAuthorizationConsent.authorizedScopeValue")}
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

            <View style={styles.divider} />

            <View style={styles.handoffBox}>
              <ShieldCheckIcon />
              <Text style={styles.handoffText}>
                {t("c30caNewAuthorizationConsent.handoffExplanation")}
              </Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
            onPress={handleCheckBookingStatus}
            accessibilityRole="button"
            accessibilityLabel={t("c30caNewAuthorizationConsent.primaryCta")}
            testID="c30ca-primary-cta"
          >
            <Text style={styles.primaryButtonText}>
              {t("c30caNewAuthorizationConsent.primaryCta")}
            </Text>
          </Pressable>

          {/* Secondary Action Button */}
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
            onPress={handleReviewHoldDetails}
            accessibilityRole="button"
            accessibilityLabel={t("c30caNewAuthorizationConsent.secondaryCta")}
            testID="c30ca-secondary-cta"
          >
            <Text style={styles.secondaryButtonText}>
              {t("c30caNewAuthorizationConsent.secondaryCta")}
            </Text>
          </Pressable>

          {/* Prototype Disclaimer */}
          <View style={styles.footerNoteContainer}>
            <Text style={styles.footerNoteText}>{t("c30caNewAuthorizationConsent.uiNote")}</Text>
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
    marginBottom: 20,
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
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.secondaryText,
  },
  detailTextValue: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  detailTextValueBrand: {
    fontSize: 13,
    fontFamily: fontFamily.bold,
    color: colors.brand,
  },
  divider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 14,
  },
  handoffBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161D1A",
    borderRadius: 10,
    padding: 12,
    gap: 10,
  },
  handoffText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    flex: 1,
    lineHeight: 18,
  },
  primaryButton: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
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
