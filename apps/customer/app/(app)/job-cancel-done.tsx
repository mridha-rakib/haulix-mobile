/**
 * HAULIX Customer Mobile App — Phase 03.57
 * Screen: Cancellation Outcome (W07 Canonical State: CANCEL_DONE)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:7269 (EN: "W07-EN / CANCEL_DONE · Cancellation outcome")
 * - Frame ID: 893:7675 (ES: "W07-ES / CANCEL_DONE · Resultado de cancelación")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Confirms illustrative cancellation outcome (server-verified status, no live cancellation executed).
 * - Direct navigation to My Jobs (/my-jobs) or Cancelled Details (/job-details-cancelled).
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { BackHandler, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  C32BriefcaseIcon,
  C32CalendarIcon,
  C32CreditCardIcon,
  C32InfoIcon,
} from "../../src/components/dispatch/C32Icons";

export default function JobCancelDoneScreen() {
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
        pathname: "/my-jobs",
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

  const handleBackToMyJobs = useCallback(() => {
    router.push({
      pathname: "/my-jobs",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleViewCancellationDetail = useCallback(() => {
    router.push({
      pathname: "/job-details-cancelled",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  const handleNeedAssistance = useCallback(() => {
    router.push({
      pathname: "/active-service-support",
      params: params.previewLocale ? { previewLocale: params.previewLocale } : {},
    });
  }, [router, params.previewLocale]);

  return (
    <HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
      {/* Brand Header */}
      <View style={styles.headerRow} testID="w07-cancel-done-header">
        <Pressable
          accessibilityLabel={t("w07CancelDone.backA11y")}
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBack}
          style={styles.backButton}
          testID="w07-cancel-done-back-btn"
        >
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <View style={styles.brandTitleContainer}>
          <Text style={styles.brandHaul}>{t("w07CancelDone.brandHaul")}</Text>
          <Text style={styles.brandIx}>{t("w07CancelDone.brandIx")}</Text>
        </View>
        <View style={styles.menuDotsContainer}>
          <Text style={styles.menuDotsText}>{t("w07CancelDone.menuDots")}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID="w07-cancel-done-scroll"
      >
        {/* Title and Subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.screenTitle} testID="w07-cancel-done-title">
            {t("w07CancelDone.screenTitle")}
          </Text>
          <Text style={styles.screenSubtitle} testID="w07-cancel-done-subtitle">
            {t("w07CancelDone.screenSubtitle")}
          </Text>
        </View>

        {/* Done / Cancelled Badge */}
        <View style={styles.sectionBadge} testID="w07-cancel-done-badge">
          <View style={styles.sectionBadgeIconWrap}>
            <C32InfoIcon size={14} color={colors.secondaryText} />
          </View>
          <Text style={styles.sectionBadgeText}>{t("w07CancelDone.badgeDone")}</Text>
        </View>

        {/* Booking Card */}
        <View style={styles.bookingCard} testID="w07-cancel-done-booking-card">
          <View style={styles.bookingCardTop}>
            <View style={styles.bookingImagePlaceholder}>
              <C32BriefcaseIcon size={24} color={colors.secondaryText} />
            </View>
            <View style={styles.bookingCardInfo}>
              <Text style={styles.bookingRefText}>{t("w07CancelDone.bookingRef")}</Text>
              <Text style={styles.bookingCategoryText}>{t("w07CancelDone.serviceCategory")}</Text>
              <Text style={styles.bookingItemsText}>
                {t("w07CancelDone.itemSummary")} · 4 pieces across 3 categories
              </Text>
            </View>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.bookingScheduleRow}>
            <C32CalendarIcon size={14} color={colors.secondaryText} />
            <Text style={styles.bookingScheduleText}>{t("w07CancelDone.serviceSchedule")}</Text>
          </View>
        </View>

        {/* Policy Card with 3 rules */}
        <View style={styles.policyCard} testID="w07-cancel-done-policy-card">
          <Text style={styles.policyHeading}>{t("w07CancelDone.policyHeading")}</Text>
          <Text style={styles.policySubheading}>{t("w07CancelDone.policySubheading")}</Text>

          <View style={styles.ruleItem}>
            <View style={styles.ruleBullet} />
            <View style={styles.ruleContent}>
              <Text style={styles.ruleTitle}>{t("w07CancelDone.rule1Title")}</Text>
              <Text style={styles.ruleDesc}>{t("w07CancelDone.rule1Desc")}</Text>
            </View>
          </View>

          <View style={styles.ruleItem}>
            <View style={styles.ruleBullet} />
            <View style={styles.ruleContent}>
              <Text style={styles.ruleTitle}>{t("w07CancelDone.rule2Title")}</Text>
              <Text style={styles.ruleDesc}>{t("w07CancelDone.rule2Desc")}</Text>
            </View>
          </View>

          <View style={styles.ruleItem}>
            <View style={styles.ruleBullet} />
            <View style={styles.ruleContent}>
              <Text style={styles.ruleTitle}>{t("w07CancelDone.rule3Title")}</Text>
              <Text style={styles.ruleDesc}>{t("w07CancelDone.rule3Desc")}</Text>
            </View>
          </View>
        </View>

        {/* Potential Fee Card (Server-verified) */}
        <View style={styles.feeCard} testID="w07-cancel-done-amount-card">
          <View style={styles.feeIconWrap}>
            <C32CreditCardIcon size={20} color={colors.secondaryText} />
          </View>
          <View style={styles.feeTextWrap}>
            <Text style={styles.feeHeading}>{t("w07CancelDone.potentialFeeHeading")}</Text>
            <Text style={styles.feeAmount}>{t("w07CancelDone.potentialFeeAmount")}</Text>
            <Text style={styles.feeNote}>{t("w07CancelDone.potentialFeeNote")}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          accessibilityLabel={t("w07CancelDone.primaryCta")}
          accessibilityRole="button"
          onPress={handleBackToMyJobs}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          testID="w07-cancel-done-primary-cta"
        >
          <Text style={styles.primaryButtonText}>{t("w07CancelDone.primaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07CancelDone.secondaryCta")}
          accessibilityRole="button"
          onPress={handleViewCancellationDetail}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
          testID="w07-cancel-done-secondary-cta"
        >
          <Text style={styles.secondaryButtonText}>{t("w07CancelDone.secondaryCta")}</Text>
        </Pressable>

        <Pressable
          accessibilityLabel={t("w07CancelDone.altLink")}
          accessibilityRole="button"
          onPress={handleNeedAssistance}
          style={({ pressed }) => [styles.linkButton, pressed && styles.linkButtonPressed]}
          testID="w07-cancel-done-alt-link"
        >
          <Text style={styles.linkButtonText}>{t("w07CancelDone.altLink")}</Text>
        </Pressable>

        {/* UI Prototype Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{t("w07CancelDone.prototypeDisclaimer")}</Text>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  backChevron: {
    color: colors.primaryText,
    fontSize: 22,
    fontFamily: fontFamily.semiBold,
    marginTop: -2,
  },
  brandTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandHaul: {
    color: colors.primaryText,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    letterSpacing: 2,
  },
  brandIx: {
    color: colors.brand,
    fontSize: 20,
    fontFamily: fontFamily.bold,
    letterSpacing: 2,
  },
  menuDotsContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  menuDotsText: {
    color: colors.secondaryText,
    fontSize: 16,
    fontFamily: fontFamily.bold,
    letterSpacing: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  titleContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  screenTitle: {
    color: colors.primaryText,
    fontSize: 22,
    fontFamily: fontFamily.bold,
    lineHeight: 28,
  },
  screenSubtitle: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    marginTop: 4,
    lineHeight: 20,
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(173, 183, 177, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(173, 183, 177, 0.28)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 16,
  },
  sectionBadgeIconWrap: {
    marginRight: 6,
  },
  sectionBadgeText: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: fontFamily.bold,
    letterSpacing: 0.5,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bookingCardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookingImagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  bookingCardInfo: {
    flex: 1,
  },
  bookingRefText: {
    color: colors.brand,
    fontSize: 12,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.5,
  },
  bookingCategoryText: {
    color: colors.primaryText,
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    marginTop: 2,
  },
  bookingItemsText: {
    color: colors.secondaryText,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.elevated,
    marginVertical: 12,
  },
  bookingScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bookingScheduleText: {
    color: colors.secondaryText,
    fontSize: 13,
    fontFamily: fontFamily.medium,
    marginLeft: 8,
  },
  policyCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  policyHeading: {
    color: colors.primaryText,
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    marginBottom: 4,
  },
  policySubheading: {
    color: colors.secondaryText,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginBottom: 16,
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  ruleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
    marginTop: 6,
    marginRight: 10,
  },
  ruleContent: {
    flex: 1,
  },
  ruleTitle: {
    color: colors.primaryText,
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
  },
  ruleDesc: {
    color: colors.secondaryText,
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginTop: 2,
  },
  feeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  feeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(173, 183, 177, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  feeTextWrap: {
    flex: 1,
  },
  feeHeading: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.5,
  },
  feeAmount: {
    color: colors.primaryText,
    fontSize: 18,
    fontFamily: fontFamily.bold,
    marginTop: 2,
  },
  feeNote: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: fontFamily.regular,
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  primaryButtonPressed: {
    opacity: 0.88,
  },
  primaryButtonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: fontFamily.bold,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.elevated,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.elevated,
  },
  secondaryButtonText: {
    color: colors.primaryText,
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
  },
  linkButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  linkButtonPressed: {
    opacity: 0.7,
  },
  linkButtonText: {
    color: colors.brand,
    fontSize: 13,
    fontFamily: fontFamily.semiBold,
  },
  disclaimerContainer: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  disclaimerText: {
    color: colors.secondaryText,
    fontSize: 11,
    fontFamily: fontFamily.regular,
    textAlign: "center",
  },
});
