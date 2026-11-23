/**
 * HAULIX Customer Mobile App — Phase 03.58
 * Screen: Cancellation Not Completed (W07 Canonical State: CANCEL_FAILED)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:7356 (EN: "W07-EN / CANCEL_FAILED · Cancellation not completed")
 * - Frame ID: 893:7762 (ES: "W07-ES / CANCEL_FAILED · Cancelación no completada")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Communicates that the cancellation attempt did not complete; booking remains active.
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32AlertTriangleIcon,
  C32BriefcaseIcon,
  C32CalendarIcon,
  C32CreditCardIcon,
  C32InfoIcon,
} from "../../src/components/dispatch/C32Icons";

export default function JobCancelFailedScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ previewLocale?: string }>();

  useEffect(() => {
    if (params.previewLocale && params.previewLocale !== i18n?.language) {
      changeLocale(params.previewLocale as "en" | "es");
    }
  }, [params.previewLocale, i18n]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push({
        pathname: "/job-cancel-check",
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

  const handleRecheckState = useCallback(() => {
    router.push({
      pathname: "/job-cancel-check",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleKeepOriginalBooking = useCallback(() => {
    router.push({
      pathname: "/job-details",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleContactSupport = useCallback(() => {
    router.push({
      pathname: "/job-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-cancel-failed-header">
        <Pressable
          accessibilityLabel={t("w07CancelFailed.backA11y")}
          accessibilityRole="button"
          onPress={handleBack}
          style={styles.backCircle}
          testID="w07-cancel-failed-back-button"
        >
          <Text style={styles.backArrowText}>←</Text>
        </Pressable>

        <View style={styles.wordmarkContainer}>
          <Text style={styles.wordmarkHaul}>{t("w07CancelFailed.brandHaul")}</Text>
          <Text style={styles.wordmarkIx}>{t("w07CancelFailed.brandIx")}</Text>
        </View>

        <View style={styles.moreButton}>
          <Text style={styles.moreText}>{t("w07CancelFailed.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-cancel-failed-scroll"
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{t("w07CancelFailed.screenTitle")}</Text>
          <Text style={styles.heroSubtitle}>{t("w07CancelFailed.screenSubtitle")}</Text>
        </View>

        {/* Status / Workflow policy badge */}
        <View style={styles.badgeBanner}>
          <View style={styles.badgeIconWrapper}>
            <C32AlertTriangleIcon color={colors.warning} size={18} />
          </View>
          <Text style={styles.badgeText}>{t("w07CancelFailed.badgeFailed")}</Text>
        </View>

        {/* Card: Booking and visual reference */}
        <View style={styles.cardContainer}>
          <View style={styles.bookingCardInner}>
            <View style={styles.sofaThumbnail}>
              <C32BriefcaseIcon color={colors.secondaryText} size={28} />
            </View>
            <View style={styles.bookingMeta}>
              <Text style={styles.bookingRefText}>{t("w07CancelFailed.bookingRef")}</Text>
              <Text style={styles.bookingServiceText}>{t("w07CancelFailed.serviceCategory")}</Text>
              <Text style={styles.bookingItemsText}>{t("w07CancelFailed.itemSummary")}</Text>
              <View style={styles.scheduleRow}>
                <C32CalendarIcon color={colors.secondaryText} size={14} />
                <Text style={styles.scheduleText}>{t("w07CancelFailed.serviceSchedule")}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Card: Policy-sensitive cancellation */}
        <View style={styles.cardContainer}>
          <Text style={styles.policyHeading}>{t("w07CancelFailed.policyHeading")}</Text>
          <Text style={styles.policySubtitle}>{t("w07CancelFailed.policySubheading")}</Text>

          <View style={styles.dividerSubtle} />

          {/* Cancellation rules */}
          <View style={styles.ruleRow}>
            <View style={styles.ruleIconWrapper}>
              <C32InfoIcon color={colors.brand} size={18} />
            </View>
            <View style={styles.ruleContent}>
              <Text style={styles.ruleTitle}>{t("w07CancelFailed.rule1Title")}</Text>
              <Text style={styles.ruleDesc}>{t("w07CancelFailed.rule1Desc")}</Text>
            </View>
          </View>

          <View style={styles.ruleRow}>
            <View style={styles.ruleIconWrapper}>
              <C32InfoIcon color={colors.brand} size={18} />
            </View>
            <View style={styles.ruleContent}>
              <Text style={styles.ruleTitle}>{t("w07CancelFailed.rule2Title")}</Text>
              <Text style={styles.ruleDesc}>{t("w07CancelFailed.rule2Desc")}</Text>
            </View>
          </View>

          <View style={styles.ruleRow}>
            <View style={styles.ruleIconWrapper}>
              <C32CreditCardIcon color={colors.warning} size={18} />
            </View>
            <View style={styles.ruleContent}>
              <Text style={styles.ruleTitle}>{t("w07CancelFailed.rule3Title")}</Text>
              <Text style={styles.ruleDesc}>{t("w07CancelFailed.rule3Desc")}</Text>
            </View>
          </View>

          <View style={styles.dividerSubtle} />

          {/* Potential Fee Summary */}
          <View style={styles.feeSummaryContainer}>
            <View style={styles.feeInfoLeft}>
              <Text style={styles.feeLabel}>{t("w07CancelFailed.potentialFeeHeading")}</Text>
              <Text style={styles.feeAmount}>{t("w07CancelFailed.potentialFeeAmount")}</Text>
            </View>
            <Text style={styles.feeNote}>{t("w07CancelFailed.potentialFeeNote")}</Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionSection}>
          <Pressable
            accessibilityRole="button"
            onPress={handleRecheckState}
            style={styles.primaryButton}
            testID="w07-cancel-failed-recheck-button"
          >
            <Text style={styles.primaryButtonText}>{t("w07CancelFailed.primaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleKeepOriginalBooking}
            style={styles.secondaryButton}
            testID="w07-cancel-failed-keep-button"
          >
            <Text style={styles.secondaryButtonText}>{t("w07CancelFailed.secondaryCta")}</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleContactSupport}
            style={styles.tertiaryLink}
            testID="w07-cancel-failed-support-link"
          >
            <Text style={styles.tertiaryText}>{t("w07CancelFailed.tertiaryCta")}</Text>
          </Pressable>
        </View>

        {/* Prototype Disclaimer */}
        <Text style={styles.disclaimerText}>{t("w07CancelFailed.prototypeDisclaimer")}</Text>
      </ScrollView>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.elevated,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrowText: {
    fontSize: 20,
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
  },
  wordmarkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wordmarkHaul: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
  },
  wordmarkIx: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.brand,
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  moreText: {
    fontSize: 20,
    color: colors.secondaryText,
    fontFamily: fontFamily.bold,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  heroSection: {
    gap: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  badgeBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.elevated,
  },
  badgeIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 186, 74, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    color: colors.warning,
    letterSpacing: 0.5,
  },
  cardContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },
  bookingCardInner: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  sofaThumbnail: {
    width: 80,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#1c2420",
    alignItems: "center",
    justifyContent: "center",
  },
  bookingMeta: {
    flex: 1,
    gap: 3,
  },
  bookingRefText: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
  },
  bookingServiceText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  bookingItemsText: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  scheduleText: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
  },
  policyHeading: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.primaryText,
  },
  policySubtitle: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 16,
  },
  dividerSubtle: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 4,
  },
  ruleRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  ruleIconWrapper: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  ruleContent: {
    flex: 1,
    gap: 2,
  },
  ruleTitle: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  ruleDesc: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    lineHeight: 15,
  },
  feeSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  feeInfoLeft: {
    gap: 2,
  },
  feeLabel: {
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  feeAmount: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.warning,
  },
  feeNote: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    maxWidth: 130,
    textAlign: "right",
  },
  actionSection: {
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.bold,
    color: colors.surface,
  },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: colors.primaryText,
  },
  tertiaryLink: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tertiaryText: {
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
    color: colors.brand,
  },
  disclaimerText: {
    fontSize: 10,
    fontFamily: fontFamily.regular,
    color: colors.secondaryText,
    textAlign: "center",
    marginTop: 4,
  },
});
